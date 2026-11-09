const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const { pathToFileURL } = require('node:url');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');

const endpoint = 'https://formsubmit.co/ajax/iacpp.info@gmail.com';
const base = pathToFileURL(path.resolve(__dirname, '../index.html')).href;
const membershipEnabled = /const MEMBERSHIP_ENABLED = true;/.test(fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8'));

(async () => {
  const browser = await chromium.launch({ headless: true, channel: process.env.BROWSER_CHANNEL || 'msedge' });
  const requests = [];
  const errors = [];
  let unexpectedRequests = 0;
  let mode = 'success';
  let release;
  try {
    const context = await browser.newContext({ reducedMotion: 'reduce' });
    // Every non-read request is fulfilled or aborted locally, never sent to a service.
    await context.route('**/*', async route => {
      const request = route.request();
      if (['GET', 'HEAD'].includes(request.method())) return route.continue();
      if (request.url() !== endpoint || request.method() !== 'POST') {
        unexpectedRequests += 1;
        return route.abort();
      }
      requests.push(request.postDataJSON());
      if (mode === 'hold') await new Promise(resolve => { release = resolve; });
      if (mode === 'network') return route.abort('failed');
      if (mode === 'timeout') return;
      if (mode === 'html') return route.fulfill({ status: 200, contentType: 'text/html', body: '<p>Unexpected response</p>' });
      const responses = {
        success: { success: 'true', message: 'Form submitted successfully.' },
        boolean: { success: true },
        hold: { success: true },
        rejected: { success: 'false', message: 'Unable to submit form.' },
        unknown: { message: 'OK' },
        activation: { success: true, message: 'Please activate this form by confirming your email address.' }
      };
      return route.fulfill({
        status: mode === 'server' ? 503 : mode === 'rate-limit' ? 429 : 200,
        contentType: 'application/json', body: JSON.stringify(responses[mode] || { success: false })
      });
    });
    const page = await context.newPage();
    page.on('pageerror', error => errors.push(error.message));
    // Exercise the real abort path without waiting twenty seconds for the timeout case.
    await page.addInitScript(() => {
      const nativeTimeout = window.setTimeout;
      window.setTimeout = (callback, delay, ...args) => nativeTimeout(callback, window.__shortFormTimeout && delay === 20000 ? 50 : delay, ...args);
    });
    const go = async (route = 'contacts', lang = 'ua') => {
      await page.goto(`${base}?lang=${lang}#${route}`, { waitUntil: 'domcontentloaded' });
      await page.reload({ waitUntil: 'domcontentloaded' });
      await page.locator('form').waitFor();
    };
    const fill = async () => {
      await page.locator('#name').fill('Local Test <example>');
      await page.locator('#email').fill('example@example.invalid');
      await page.locator('#message').fill('Mocked request only. Do not send.');
    };
    const submit = () => page.locator('form [type="submit"]').click();
    const waitState = state => page.locator(`.form-status[data-state="${state}"]`).waitFor();

    await go();
    await submit();
    assert.equal(requests.length, 0);
    await fill();
    await page.locator('#email').fill('invalid');
    await submit();
    assert.equal(await page.locator('#email').getAttribute('aria-invalid'), 'true');
    assert.equal(requests.length, 0);

    for (const width of [390, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      for (const lang of ['ua', 'en']) {
        for (const route of ['contacts', 'membership', 'partnership'].filter(route => membershipEnabled || route !== 'membership')) {
          await go(route, lang);
          await fill();
          if (route === 'membership') await page.locator('#membership-level').selectOption('expert');
          mode = lang === 'ua' ? 'success' : 'boolean';
          await submit();
          await waitState('sent');
          const payload = requests.at(-1);
          assert.equal(payload.name, 'Local Test <example>');
          assert.equal(payload.email, 'example@example.invalid');
          assert.equal(payload._replyto, payload.email);
          assert.equal(payload._template, 'table');
          assert.equal(payload._honey, '');
          assert.ok(payload.form && payload.topic && payload.message);
          assert.equal(payload.language, lang === 'ua' ? 'uk' : 'en');
          assert.match(payload._url, /^https:\/\/makpp\.com\.ua\//);
          assert.equal(payload._url.includes('C:'), false);
          assert.equal(payload._url.includes('example.invalid'), false);
          assert.equal(await page.locator('.form-email-action').isVisible(), false);
          assert.equal(await page.locator('form [type="submit"]').isEnabled(), true);
          assert.equal(await page.locator('#name').inputValue(), 'Local Test <example>');
          if (width === 390 && lang === 'ua' && route === 'contacts') await page.locator('.form-shell').screenshot({ path: path.join(os.tmpdir(), 'makpp-form-mobile.png') });
          if (route === 'membership') {
            assert.equal(payload.membership_level, lang === 'ua' ? 'Експертний' : 'Expert');
            assert.equal(payload.membership_fee, lang === 'ua' ? '800 грн на рік' : 'UAH 800 per year');
          }
          assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
        }
        await page.goto(`${base}?lang=${lang}#courses`);
        const title = await page.locator('.card h3').first().innerText();
        await page.locator('.course-inquiry').first().click();
        await fill();
        await submit();
        await waitState('sent');
        assert.equal(requests.at(-1).course, title);
        assert.ok(requests.at(-1)._subject.endsWith(title));
      }
    }

    for (const lang of ['ua', 'en']) {
      for (const [responseMode, expected] of [['rejected', 'failed'], ['server', 'failed'], ['rate-limit', 'failed'], ['network', 'uncertain'], ['html', 'uncertain'], ['unknown', 'uncertain'], ['activation', 'activation'], ['timeout', 'uncertain']]) {
        await go('contacts', lang);
        await fill();
        mode = responseMode;
        if (mode === 'timeout') await page.evaluate(() => { window.__shortFormTimeout = true; });
        await submit();
        await waitState(expected);
        assert.equal(await page.locator('#name').inputValue(), 'Local Test <example>');
        assert.equal(await page.locator('#email').inputValue(), 'example@example.invalid');
        assert.equal(await page.locator('#message').inputValue(), 'Mocked request only. Do not send.');
        assert.equal(await page.locator('form [type="submit"]').isEnabled(), true);
        assert.match(await page.locator('.form-email-action').getAttribute('href'), /^mailto:iacpp.info@gmail.com\?subject=/);
        assert.equal(await page.locator('.form-email-action').isVisible(), true);
        if (lang === 'ua' && responseMode === 'activation') await page.locator('.form-shell').screenshot({ path: path.join(os.tmpdir(), 'makpp-form-activation.png') });
      }
    }

    await go();
    await fill();
    await page.locator('[name="_honey"]').evaluate(el => { el.value = 'bot'; });
    const beforeHoneypot = requests.length;
    await submit();
    await waitState('failed');
    assert.equal(requests.length, beforeHoneypot);

    await go();
    await fill();
    mode = 'hold';
    const beforePending = requests.length;
    const pendingRequest = page.waitForRequest(request => request.url() === endpoint).catch(error => ({ error }));
    await page.locator('form [type="submit"]').evaluate(button => {
      button.click();
      if (!button.disabled) throw new Error('Submit button is not disabled');
      button.click();
    });
    await waitState('sending');
    const pendingResult = await pendingRequest;
    if (pendingResult.error) throw pendingResult.error;
    await page.locator('[data-lang="en"]').click();
    assert.equal(await page.locator('form [type="submit"]').isDisabled(), true);
    assert.match(await page.locator('.form-status').innerText(), /Sending/);
    await page.evaluate(() => { location.hash = '#education'; });
    await page.waitForURL('**#education');
    await page.goBack();
    await page.waitForURL('**#contacts');
    assert.equal(await page.locator('form [type="submit"]').isDisabled(), true);
    await page.locator('form').evaluate(form => form.requestSubmit());
    assert.equal(requests.length, beforePending + 1);
    assert.ok(release);
    release();
    await waitState('sent');
    assert.match(await page.locator('.form-status').innerText(), /accepted/);
    await page.locator('.form-shell').screenshot({ path: path.join(os.tmpdir(), 'makpp-form-success.png') });

    assert.equal(unexpectedRequests, 0);
    assert.deepEqual(errors, []);
    console.log(JSON.stringify({ mockedRequests: requests.length, realSubmissions: 0, payloads: 'passed', successAndFailureStates: 'passed', duplicateProtection: 'passed', languageSwitchDuringSubmission: 'passed', viewports: [390, 1440] }, null, 2));
  } finally {
    if (release) release();
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
