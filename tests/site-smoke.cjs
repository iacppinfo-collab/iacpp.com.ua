const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const os = require('node:os');
const { execFileSync } = require('node:child_process');
const { pathToFileURL } = require('node:url');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');

const root = path.resolve(__dirname, '..');
const base = pathToFileURL(path.join(root, 'index.html')).href;
const source = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const original = execFileSync('git', ['show', 'HEAD:index.html'], { cwd: root, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
const inline = html => [...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)].find(match => match[1].includes('const DATA'))[1];
const dataFrom = html => {
  const script = inline(html);
  return JSON.parse(vm.runInNewContext(script.slice(0, script.indexOf('\nfunction getLanguage')) + `
    JSON.stringify(Object.fromEntries(['ua', 'en'].map(lang => [lang, {
      levels: DATA[lang].pages.membership.sections.find(s => s[0] === 'membershipCards')[3],
      documents: DATA[lang].pages.documents,
      courses: DATA[lang].pages.courses.sections[0],
      webinars: DATA[lang].pages.webinars.sections[0]
    }])))`));
};
assert.deepEqual(dataFrom(source), dataFrom(original), 'Eligibility, benefits, document data and course facts must not change');
const documentRenderer = html => html.slice(html.indexOf('function documentsBlock'), html.indexOf('function contactsBlock')).replace(/\r\n/g, '\n');
assert.equal(documentRenderer(source), documentRenderer(original), 'Document markup, including the Code of Ethics, must remain unchanged');
for (const match of source.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)) if (match[1].trim()) new vm.Script(match[1]);
new vm.Script(fs.readFileSync(path.join(root, 'assets/site-forms.js'), 'utf8'));

const routes = ['home', 'about', 'idea-history', 'board', 'structure', 'projects', 'psychologists', 'membership', 'education', 'programs', 'supervision', 'courses', 'webinars', 'contacts', 'documents', 'certification', 'legislation', 'news', 'partnership'];
const articles = ['july-practice-audit', 'emotion-wheel', 'child-learning-readiness', 'autumn-adaptation', 'psychologist-supervision', 'window-of-tolerance', 'life-on-hold'];
const settled = page => page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
const go = async (page, route, lang = 'ua') => {
  await page.goto(`${base}?lang=${lang}#${route}`, { waitUntil: 'domcontentloaded' });
  await page.locator('main h1').waitFor();
  await settled(page);
};
const visibleAnchor = async (page, id) => {
  await settled(page);
  const rect = await page.evaluate(id => ({ top: document.getElementById(id).getBoundingClientRect().top, header: document.querySelector('[data-header]').getBoundingClientRect().bottom }), id);
  assert.ok(rect.top >= rect.header - 1, `${id} covered by header: ${JSON.stringify(rect)}`);
};

(async () => {
  const browser = await chromium.launch({ headless: true, channel: process.env.BROWSER_CHANNEL || 'msedge' });
  let postCount = 0;
  let mockedDeliveries = 0;
  const errors = [];
  const unresolved = new Map();
  let screenChecks = 0;
  try {
    const context = await browser.newContext({ reducedMotion: 'reduce' });
    await context.route('**/*', route => {
      if (!['GET', 'HEAD'].includes(route.request().method())) {
        if (route.request().url() === 'https://formsubmit.co/ajax/iacpp.info@gmail.com' && route.request().method() === 'POST') {
          mockedDeliveries += 1;
          return route.fulfill({ status: 503, contentType: 'application/json', body: JSON.stringify({ success: false }) });
        }
        postCount += 1;
        return route.abort();
      }
      return route.continue();
    });
    const page = await context.newPage();
    page.setDefaultTimeout(10000);
    page.on('pageerror', error => errors.push(error.message));
    for (const width of [320, 390, 768, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      for (const lang of ['ua', 'en']) {
        const titles = new Set();
        const descriptions = new Set();
        for (const route of routes) {
          await go(page, route, lang);
          const state = await page.evaluate(() => ({
            width: innerWidth, scrollWidth: document.documentElement.scrollWidth,
            title: document.title, description: document.querySelector('meta[name="description"]').content,
            lang: document.documentElement.lang,
            empty: [...document.querySelectorAll('main a')].filter(a => !a.getAttribute('href') || a.getAttribute('href') === '#').map(a => a.closest('.document-row')?.querySelector('h3')?.textContent || a.textContent.trim())
          }));
          assert.ok(state.scrollWidth <= state.width, `${route}/${lang}/${width} has horizontal page overflow: ${state.scrollWidth}`);
          assert.equal(state.lang, lang === 'ua' ? 'uk' : 'en');
          assert.ok(state.title && state.description);
          assert.ok(!titles.has(state.title), `Duplicate title: ${state.title}`);
          assert.ok(!descriptions.has(state.description), `Duplicate description: ${state.description}`);
          titles.add(state.title);
          descriptions.add(state.description);
          if (lang === 'ua' && state.empty.length) unresolved.set(route, state.empty);
          if (route === 'membership') {
            const price = lang === 'ua' ? '800 грн на рік' : 'UAH 800 per year';
            assert.deepEqual(await page.locator('.membership-price').allTextContents(), Array(4).fill(price));
            assert.deepEqual(await page.locator('.comparison-price').allTextContents(), Array(4).fill(price));
            assert.equal(await page.locator('.form-membership-price').innerText(), price);
            if (width === 390 || width === 1440) await page.screenshot({ path: path.join(os.tmpdir(), `makpp-membership-${width}-${lang}.png`) });
            if (width === 320) {
              const scroll = page.locator('.comparison-scroll');
              await scroll.focus();
              await page.keyboard.press('End');
              await scroll.evaluate(el => { el.scrollLeft = el.scrollWidth; });
              assert.ok(await scroll.evaluate(el => el.scrollLeft > 0));
            }
          }
          screenChecks += 1;
        }
      }
    }

    for (const width of [390, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      for (const lang of ['ua', 'en']) {
        await go(page, 'membership', lang);
        for (const level of ['basic', 'professional', 'expert', 'honorary']) {
          await page.locator(`[data-membership-level="${level}"]`).click();
          await settled(page);
          assert.equal(await page.locator('#membership-level').inputValue(), level);
          assert.equal(await page.locator('#topic').inputValue(), 'membership');
          await visibleAnchor(page, 'join-form');
          await page.locator('#membership-level').selectOption('professional');
          assert.equal(await page.locator('#membership-level').inputValue(), 'professional');
        }
        await page.locator('#name').fill('Test <example>');
        await page.locator('#email').fill('invalid');
        await page.locator('#message').fill('Local validation test. Do not send.');
        await page.locator('form [type="submit"]').click();
        assert.equal(await page.locator('#email').getAttribute('aria-invalid'), 'true');
        assert.match(await page.locator('.field-error').allTextContents().then(items => items.join(' ')), /name@example.com/);
        await page.locator('#email').fill('local-test@example.invalid');
        await page.locator('form [type="submit"]').evaluate(button => {
          button.click();
          if (!button.disabled) throw new Error('Submit button was not locked');
          button.click();
        });
        await page.locator('.form-status[data-state="failed"]').waitFor();
        assert.match(await page.locator('.form-status').innerText(), lang === 'ua' ? /не надіслано/ : /not been sent/);
        assert.equal(await page.locator('#name').inputValue(), 'Test <example>');
        assert.equal(await page.locator('#message').inputValue(), 'Local validation test. Do not send.');
        assert.equal(await page.locator('form [type="submit"]').isEnabled(), true);
        assert.match(await page.locator('.form-email-action').getAttribute('href'), /^mailto:iacpp.info@gmail.com\?subject=/);
        await page.locator(`[data-lang="${lang === 'ua' ? 'en' : 'ua'}"]`).click();
        assert.equal(await page.locator('#name').inputValue(), 'Test <example>');
        assert.equal(await page.locator('#membership-level').inputValue(), 'professional');

        for (const route of ['courses', 'webinars']) {
          for (let index = 0; index < 3; index += 1) {
            await go(page, route, lang);
            const title = await page.locator('.card h3').nth(index).innerText();
            await page.locator('.course-inquiry').nth(index).click();
            await page.waitForURL('**#contacts:contact-form');
            await settled(page);
            assert.equal(await page.locator('#topic').inputValue(), 'education');
            assert.equal(await page.locator('#course').inputValue(), title);
            await visibleAnchor(page, 'contact-form');
            await page.goBack();
            await page.waitForURL(`**#${route}`);
            await page.goForward();
            await page.waitForURL('**#contacts:contact-form');
            await settled(page);
            assert.equal(await page.locator('#course').inputValue(), title);
            await page.reload({ waitUntil: 'domcontentloaded' });
            await visibleAnchor(page, 'contact-form');
          }
        }
      }
    }

    await go(page, 'courses');
    await page.locator('.course-inquiry').first().click();
    await page.waitForURL('**#contacts:contact-form');
    await page.locator('#message').fill('Keep this draft when switching languages.');
    await page.locator('[data-lang="en"]').click();
    assert.equal(await page.locator('#course').inputValue(), 'Fundamentals of clinical counselling');
    assert.equal(await page.locator('#topic').inputValue(), 'education');
    assert.equal(await page.locator('#message').inputValue(), 'Keep this draft when switching languages.');

    await page.setViewportSize({ width: 390, height: 844 });
    await go(page, 'home');
    await page.locator('.menu-toggle').click();
    assert.equal(await page.locator('.mobile-panel').getAttribute('aria-hidden'), 'false');
    assert.equal(await page.locator('#main').evaluate(el => el.inert), true);
    await page.locator('.mobile-summary').nth(1).click();
    await page.locator('.mobile-panel a[href="#education"]').click();
    await page.waitForURL('**#education');
    assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'), 'false');
    await page.locator('.menu-toggle').click();
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('.mobile-panel').evaluate(el => el.inert), true);
    assert.equal(await page.locator('.menu-toggle').evaluate(el => el === document.activeElement), true);
    await page.keyboard.press('Tab');
    await page.locator('.menu-toggle').focus();
    await page.keyboard.press('Tab');
    assert.equal(await page.evaluate(() => !!document.activeElement.closest('.mobile-panel')), false);
    for (const width of [390, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      for (const lang of ['ua', 'en']) {
        await go(page, 'education', lang);
        assert.deepEqual(await page.locator('main h2').allTextContents(), [lang === 'ua' ? 'Формати навчання' : 'Training formats']);
        assert.equal(await page.locator('main .card').count(), 4);
        const labels = lang === 'ua' ? ['Навчання', 'Супервізії / інтервізії', 'Сертифікація'] : ['Education', 'Supervision / intervision', 'Certification'];
        const group = page.locator(width === 390 ? '.mobile-group' : '.desktop-nav .nav-item').nth(1);
        if (width === 390) {
          await page.locator('.menu-toggle').click();
          await group.locator('.mobile-summary').click();
        } else {
          await group.locator('.nav-button').hover();
        }
        assert.deepEqual(await group.locator(width === 390 ? '.mobile-children a' : '.dropdown a').allTextContents(), labels);
        await group.locator('a[href="#supervision"]').click();
        await page.waitForURL('**#supervision');
        await settled(page);
        assert.equal(await page.locator('main h1').innerText(), labels[1]);
        assert.equal(await page.locator('#supervision-details li').count(), 3);
        assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'), 'false');
        for (const target of ['courses', 'webinars', 'programs', 'supervision']) {
          await go(page, 'education', lang);
          await page.locator(`main a[href="#${target}"]`).click();
          await page.waitForURL(`**#${target}`);
          await page.reload({ waitUntil: 'domcontentloaded' });
          await settled(page);
          assert.equal(await page.locator('main h1').count(), 1);
          assert.equal(await page.evaluate(() => document.querySelector('main h1').getBoundingClientRect().top >= document.querySelector('[data-header]').getBoundingClientRect().bottom), true);
          await page.goBack();
          await page.waitForURL('**#education');
          await page.goForward();
          await page.waitForURL(`**#${target}`);
        }
        for (const target of ['programs', 'supervision']) {
          await go(page, `education:${target}`, lang);
          await visibleAnchor(page, `${target}-details`);
          await page.reload({ waitUntil: 'domcontentloaded' });
          await visibleAnchor(page, `${target}-details`);
        }
      }
    }
    await page.setViewportSize({ width: 390, height: 844 });
    await go(page, 'membership:join-form', 'en');
    await visibleAnchor(page, 'join-form');

    for (const article of articles) {
      for (const lang of ['ua', 'en']) {
        await page.goto(pathToFileURL(path.join(root, `${article}.html`)).href + `?lang=${lang}`, { waitUntil: 'domcontentloaded' });
        assert.equal(await page.locator(`[data-lang-button="${lang}"]`).getAttribute('aria-pressed'), 'true');
        assert.equal(await page.locator('html').getAttribute('lang'), lang === 'ua' ? 'uk' : 'en');
        assert.ok(await page.locator('meta[name="description"]').getAttribute('content'));
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, `${article} overflow`);
        await page.locator(`[data-lang-button="${lang === 'ua' ? 'en' : 'ua'}"]`).click();
        const next = lang === 'ua' ? 'en' : 'ua';
        assert.equal(new URL(page.url()).searchParams.get('lang'), next);
        await page.locator('a[href$="#news"]:visible').first().click();
        await page.waitForURL('**#news');
        assert.equal(await page.locator('html').getAttribute('lang'), next === 'ua' ? 'uk' : 'en');
      }
    }

    const blockedStorage = await context.newPage();
    blockedStorage.on('pageerror', error => errors.push(error.message));
    await blockedStorage.addInitScript(() => Object.defineProperty(window, 'localStorage', { get() { throw new Error('Storage blocked'); } }));
    await go(blockedStorage, 'membership');
    assert.equal(await blockedStorage.locator('.membership-card').count(), 4);
    assert.equal(postCount, 0, 'Tests must never submit a real application');
    assert.equal(mockedDeliveries, 4);
    assert.deepEqual(errors, []);
    console.log(JSON.stringify({ screenChecks, formFlows: 'passed', courseFlows: 'passed', navigation: 'passed', protectedData: 'unchanged', postCount, mockedDeliveries, unresolved: Object.fromEntries(unresolved) }, null, 2));
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
