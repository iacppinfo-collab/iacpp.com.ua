const MEMBERSHIP_ANNUAL_FEE = 800;
const FORM_TOPICS = ["membership", "education", "partnership", "media"];
const FORM_RECIPIENT = "iacpp.info@gmail.com";
const FORM_ENDPOINT = `https://formsubmit.co/ajax/${FORM_RECIPIENT}`;
const FORM_TIMEOUT_MS = 20000;
const formDrafts = new Map();
const formDeliveryStates = new Map();
let pendingFormFocus = "";

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
}

function membershipPrice(data) {
  return data.lang === "uk" ? `${MEMBERSHIP_ANNUAL_FEE} грн на рік` : `UAH ${MEMBERSHIP_ANNUAL_FEE} per year`;
}

function membershipComparisonBlock(levels, data) {
  const ua = data.lang === "uk";
  const labels = ua
    ? ["Порівняння рівнів членства", "Для кого", "Вартість членства", "Навчання (ЄКТС / БПР)", "Інтервізії / супервізії", "Конференції / форуми", "Основні можливості"]
    : ["Membership comparison", "Eligibility", "Membership fee", "Education (ECTS / CPD)", "Peer supervision / supervision", "Conferences / forums", "Key opportunities"];
  const discount = value => ua ? `Знижка ${value}%` : `${value}% discount`;
  const free = ua ? "Безоплатна участь" : "Free participation";
  const summaries = ua ? {
    basic: "Участь у дослідженнях і доступ до результатів.",
    professional: "Участь у навчанні як тренер; у проєктах як асистент без оплати; участь у дослідженнях і доступ до результатів.",
    expert: "Навчання як тренер; виступи; проєкти як тренер за домовленістю; головний дослідник, авторство статей і доступ до результатів.",
    honorary: "Проєкти як тренер; дослідження як головний дослідник; авторство наукових статей."
  } : {
    basic: "Research participation and access to findings.",
    professional: "Teaching as a trainer; unpaid project participation as an assistant; research participation and access to findings.",
    expert: "Teaching as a trainer; speaking; project work as a trainer by agreement; leading research, authorship and access to findings.",
    honorary: "Project work as a trainer; leading research; authorship of scientific articles."
  };
  const rows = [
    levels.map(level => level.eligibility),
    levels.map(() => membershipPrice(data)),
    [discount(10), discount(20), discount(20), free],
    [ua ? "Стандартна вартість. Супервізії після навчання з клінічної документації." : "Standard price. Supervision requires clinical documentation training.", discount(20), discount(20), free],
    [discount(10), discount(20), discount(50), free],
    levels.map(level => summaries[level.id])
  ];
  return `<section class="membership-comparison" aria-labelledby="membership-comparison-title"><h2 class="section-title" id="membership-comparison-title">${labels[0]}</h2><div class="comparison-scroll" role="region" aria-labelledby="membership-comparison-title" tabindex="0"><table class="comparison-table"><caption class="visually-hidden">${labels[0]}</caption><thead><tr><th scope="col">${ua ? "Критерій" : "Criterion"}</th>${levels.map(level => `<th scope="col">${level.title}</th>`).join("")}</tr></thead><tbody>${rows.map((values, index) => `<tr><th scope="row">${labels[index + 1]}</th>${values.map(value => `<td${index === 1 ? ' class="comparison-price"' : ""}>${value}</td>`).join("")}</tr>`).join("")}</tbody></table></div></section>`;
}

function formCopy(data) {
  return data.lang === "uk" ? {
    required: "Обов'язкове поле", note: "Поля з * обов'язкові.", course: "Курс / вебінар",
    delivery: "Ім'я, email і зміст звернення передаються через",
    privacy: "Не додавайте медичні дані або конфіденційну інформацію про клієнтів.",
    missing: "Заповніть це обов'язкове поле.", email: "Вкажіть коректний email, наприклад name@example.com.",
    invalid: "Перевірте виділені поля. Звернення не надіслано.",
    failed: "Звернення не надіслано: сервіс надсилання наразі не прийняв запит. Дані залишилися у формі. Спробуйте пізніше або напишіть нам напряму.",
    uncertain: "Не вдалося підтвердити надсилання через проблему зі з'єднанням. Дані залишилися у формі. Ви можете написати нам напряму; повторне надсилання може створити дублікат звернення.",
    activation: "Отримання звернень через сайт ще потребує підтвердження пошти з боку Асоціації. Дані залишилися у формі. Поки що напишіть нам напряму.",
    sent: "Звернення передано сервісу надсилання. Дякуємо!",
    sending: "Надсилаємо звернення...", emailAction: "Відкрити лист у поштовій програмі"
  } : {
    required: "Required field", note: "Fields marked * are required.", course: "Course / webinar",
    delivery: "Your name, email and request details are processed through",
    privacy: "Do not include medical data or confidential information about clients.",
    missing: "Complete this required field.", email: "Enter a valid email, such as name@example.com.",
    invalid: "Check the highlighted fields. Your request has not been sent.",
    failed: "Your request has not been sent: the delivery service did not accept it. Your information remains in the form. Please try later or email us directly.",
    uncertain: "We could not confirm submission because of a connection problem. Your information remains in the form. You can email us directly; submitting again may create a duplicate request.",
    activation: "Website submissions still require email verification by the Association. Your information remains in the form. Please email us directly for now.",
    sent: "Your request has been accepted by the delivery service. Thank you!",
    sending: "Sending your request...", emailAction: "Open email in your mail app"
  };
}

function accessibleContactForm(data, title, requestedId) {
  const id = requestedId || (currentPageKey() === "partnership" ? "partnership-form" : "contact-form");
  const f = data.form;
  const c = formCopy(data);
  const email = data.contacts.find(item => item[0] === "Email")[1];
  const levels = id === "join-form" ? data.pages.membership.sections.find(section => section[0] === "membershipCards")[3] : [];
  const mark = `<span class="required-mark" aria-hidden="true">*</span><span class="visually-hidden"> (${c.required})</span>`;
  const error = name => `<span class="field-error" id="${id}-${name}-error"></span>`;
  const attrs = name => `required aria-describedby="${id}-${name}-error"`;
  const levelField = levels.length ? `<div class="field field-full"><label for="membership-level">${f.membershipLevel} ${mark}</label><select id="membership-level" name="membership-level" ${attrs("level")}><option value="">${f.membershipLevelPlaceholder}</option>${levels.map(level => `<option value="${level.id}">${level.title}</option>`).join("")}</select>${error("level")}<p class="form-membership-price">${membershipPrice(data)}</p></div>` : "";
  const courseField = id === "contact-form" ? `<div class="field field-full course-field" hidden><label for="course">${c.course}</label><input id="course" name="course" type="text" readonly></div>` : "";
  return `<section id="${id}" class="form-shell"><h2 class="section-title" id="${id}-title">${title}</h2><p class="form-required-note">${c.note}</p><p class="form-availability">${c.delivery} <a href="https://formsubmit.co/privacy.pdf" target="_blank" rel="noopener noreferrer">FormSubmit</a>. ${c.privacy}</p><form class="form-grid" data-inquiry-form="${id}" novalidate aria-labelledby="${id}-title"><input class="form-honeypot" type="text" name="_honey" tabindex="-1" autocomplete="off" aria-hidden="true"><div class="field"><label for="name">${f.name} ${mark}</label><input id="name" name="name" type="text" autocomplete="name" maxlength="200" placeholder="${f.namePlaceholder}" ${attrs("name")}>${error("name")}</div><div class="field"><label for="email">${f.email} ${mark}</label><input id="email" name="email" type="email" autocomplete="email" inputmode="email" maxlength="254" placeholder="name@example.com" ${attrs("email")}>${error("email")}</div>${levelField}<div class="field field-full"><label for="topic">${f.topic} ${mark}</label><select id="topic" name="topic" ${attrs("topic")}>${f.options.map((option, index) => `<option value="${FORM_TOPICS[index]}">${option}</option>`).join("")}</select>${error("topic")}</div>${courseField}<div class="field field-full"><label for="message">${f.message} ${mark}</label><textarea id="message" name="message" maxlength="10000" placeholder="${f.messagePlaceholder}" ${attrs("message")}></textarea>${error("message")}</div><div class="field field-full"><button class="btn btn-primary" type="submit">${f.submit}</button><p class="form-status" role="status" aria-live="polite" aria-atomic="true"></p><a class="form-email-action" href="mailto:${email}" hidden>${c.emailAction}</a></div></form></section>`;
}

function inquiryPayload(form, data) {
  const topic = form.elements.topic.selectedOptions[0].textContent;
  const level = form.elements.namedItem("membership-level")?.selectedOptions[0]?.textContent;
  const course = form.elements.namedItem("course")?.value;
  const url = new URL("https://makpp.com.ua/");
  url.searchParams.set("lang", getLanguage());
  url.hash = `${currentPageKey()}:${form.dataset.inquiryForm}`;
  return {
    name: form.elements.name.value.trim(), email: form.elements.email.value.trim(),
    topic, message: form.elements.message.value.trim(),
    form: document.getElementById(`${form.dataset.inquiryForm}-title`).textContent,
    language: data.lang,
    ...(level ? { membership_level: level, membership_fee: membershipPrice(data) } : {}),
    ...(course ? { course } : {}),
    _subject: `${data.footer.title}: ${topic}${course ? `: ${course}` : ""}`,
    _replyto: form.elements.email.value.trim(), _template: "table", _honey: "", _url: url.href
  };
}

function inquiryMailto(payload, data) {
  const body = [
    `${data.form.name}: ${payload.name}`, `${data.form.email}: ${payload.email}`,
    payload.membership_level ? `${data.form.membershipLevel}: ${payload.membership_level} (${payload.membership_fee})` : "",
    payload.course ? `${formCopy(data).course}: ${payload.course}` : "", payload.message
  ].filter(Boolean).join("\n");
  return `mailto:${FORM_RECIPIENT}?subject=${encodeURIComponent(payload._subject)}&body=${encodeURIComponent(body)}`;
}

function renderFormDeliveryState(form, data) {
  const state = formDeliveryStates.get(form.dataset.inquiryForm);
  const c = formCopy(data);
  const busy = state?.status === "sending";
  const button = form.querySelector('[type="submit"]');
  const status = form.querySelector(".form-status");
  const mail = form.querySelector(".form-email-action");
  form.setAttribute("aria-busy", String(busy));
  button.disabled = busy;
  button.textContent = busy ? c.sending : data.form.submit;
  status.dataset.state = state?.status || "";
  status.textContent = state ? c[state.status] : "";
  mail.hidden = !state?.mailto || !["failed", "uncertain", "activation"].includes(state.status);
  mail.href = state?.mailto || `mailto:${FORM_RECIPIENT}`;
}

function refreshFormDeliveryState(id) {
  const form = document.querySelector(`[data-inquiry-form="${id}"]`);
  if (form) renderFormDeliveryState(form, DATA[getLanguage()]);
}

// Drafts remain only in memory; no personal information is persisted to storage.
function rememberFormDrafts() {
  document.querySelectorAll("[data-inquiry-form]").forEach(form => {
    const draft = { values: Object.fromEntries(new FormData(form)), courseKey: form.dataset.courseKey || "" };
    formDrafts.set(form.dataset.inquiryForm, draft);
  });
}

function courseTitle(key, data) {
  const [page, index] = key.split("/");
  return data.pages[page]?.sections.find(section => section[0] === "courses")?.[1]?.[Number(index)]?.[0] || "";
}

function focusPageSection(id, fieldId = "") {
  const section = document.getElementById(id);
  if (!section) return;
  section.classList.add("is-visible");
  const target = document.getElementById(fieldId) || section.querySelector("h1, h2") || section;
  if (!target.matches("input, select, textarea, button, a")) target.setAttribute("tabindex", "-1");
  target.focus({ preventScroll: true });
  const header = document.querySelector("[data-header]").getBoundingClientRect().height;
  window.scrollTo({ top: Math.max(0, window.scrollY + section.getBoundingClientRect().top - header - 24), behavior: "instant" });
}

function plainClick(event) {
  return !event.defaultPrevented && event.button === 0 && !event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey;
}

function bindInquiryForms(data) {
  document.querySelectorAll("[data-inquiry-form]").forEach(form => {
    const id = form.dataset.inquiryForm;
    const draft = formDrafts.get(id);
    if (draft) {
      Object.entries(draft.values).forEach(([name, value]) => { if (form.elements.namedItem(name)) form.elements.namedItem(name).value = value; });
      form.dataset.courseKey = draft.courseKey;
    } else {
      form.elements.topic.value = id === "partnership-form" ? "partnership" : "membership";
    }
    if (form.dataset.courseKey && form.elements.course) {
      form.elements.course.value = courseTitle(form.dataset.courseKey, data);
      form.querySelector(".course-field").hidden = !form.elements.course.value;
    }
    const c = formCopy(data);
    renderFormDeliveryState(form, data);
    const fields = [...form.querySelectorAll("[required]")];
    const validate = field => {
      const value = field.value.trim();
      const message = !value ? c.missing : field.type === "email" && (field.validity.typeMismatch || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) ? c.email : "";
      field.setAttribute("aria-invalid", String(!!message));
      document.getElementById(field.getAttribute("aria-describedby")).textContent = message;
      return !message;
    };
    fields.forEach(field => field.addEventListener("input", () => {
      if (field.getAttribute("aria-invalid") === "true") validate(field);
    }));
    form.addEventListener("input", () => {
      if (formDeliveryStates.get(id)?.status === "sending") return;
      formDeliveryStates.delete(id);
      renderFormDeliveryState(form, data);
    });
    form.addEventListener("submit", async event => {
      event.preventDefault();
      if (formDeliveryStates.get(id)?.status === "sending") return;
      const status = form.querySelector(".form-status");
      const invalid = fields.filter(field => !validate(field));
      if (invalid.length) {
        formDeliveryStates.delete(id);
        renderFormDeliveryState(form, data);
        status.dataset.state = "invalid";
        status.textContent = c.invalid;
        invalid[0].focus();
        return;
      }
      rememberFormDrafts();
      const payload = inquiryPayload(form, data);
      const state = { status: "sending", mailto: inquiryMailto(payload, data) };
      formDeliveryStates.set(id, state);
      if (form.elements.namedItem("_honey").value) {
        state.status = "failed";
        refreshFormDeliveryState(id);
        return;
      }
      refreshFormDeliveryState(id);
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), FORM_TIMEOUT_MS);
      try {
        const response = await fetch(FORM_ENDPOINT, {
          method: "POST", credentials: "omit", signal: controller.signal,
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(payload)
        });
        if (!response.ok) {
          state.status = "failed";
          return;
        }
        const result = await response.json();
        // Acceptance by the service does not prove delivery to the recipient's inbox.
        if (typeof result?.message === "string" && /activat|verif|confirm|check.{0,20}(email|inbox)/i.test(result.message)) state.status = "activation";
        else if (result?.success === true || result?.success === "true") state.status = "sent";
        else if (result?.success === false || result?.success === "false") state.status = "failed";
        else state.status = "uncertain";
      } catch (_error) {
        state.status = "uncertain";
      } finally {
        clearTimeout(timeout);
        refreshFormDeliveryState(id);
      }
    });
  });

  document.querySelectorAll("[data-membership-level], [data-course-page]").forEach(link => link.addEventListener("click", event => {
    if (!plainClick(event)) return;
    event.preventDefault();
    rememberFormDrafts();
    const membership = !!link.dataset.membershipLevel;
    const id = membership ? "join-form" : "contact-form";
    const draft = formDrafts.get(id) || { values: {}, courseKey: "" };
    draft.values.topic = membership ? "membership" : "education";
    if (membership) draft.values["membership-level"] = link.dataset.membershipLevel;
    else draft.courseKey = `${link.dataset.coursePage}/${link.dataset.courseIndex}`;
    formDrafts.set(id, draft);
    const existing = document.querySelector(`[data-inquiry-form="${id}"]`);
    if (existing && membership) {
      existing.elements.namedItem("membership-level").value = draft.values["membership-level"];
      existing.elements.topic.value = "membership";
    }
    pendingFormFocus = membership ? "membership-level" : "name";
    const href = link.getAttribute("href");
    if (location.hash === href) renderStandalone(true);
    else location.hash = href;
  }));
}

function updatePageMetadata(data) {
  const key = currentPageKey();
  const page = data.pages[key];
  const ua = data.lang === "uk";
  const title = key === "home" ? data.homePage.title : page?.title || data.home;
  const descriptions = ua ? {
    membership: `Рівні членства МАКПП: вимоги, переваги, знижки та форма заяви. Вартість кожного рівня: ${membershipPrice(data)}.`,
    courses: "Курси МАКПП для фахівців психічного здоров'я. Наявна інформація про програми та звернення щодо набору.",
    webinars: "Вебінари МАКПП: теми, наявна інформація про формат і звернення щодо участі.",
    news: "Статті МАКПП про клінічну психологію, психотерапію, професійний розвиток і психічне здоров'я."
  } : {
    membership: `IACPP membership levels: eligibility, benefits, discounts and the application form. Each level costs ${membershipPrice(data)}.`,
    courses: "IACPP courses for mental health professionals. Available programme information and enrollment enquiries.",
    webinars: "IACPP webinars: topics, available format information and participation enquiries.",
    news: "IACPP articles on clinical psychology, psychotherapy, professional development and mental health."
  };
  document.title = `${title} | ${data.footer.title}`;
  document.querySelector('meta[name="description"]').content = descriptions[key] || (key === "home" ? data.homePage.lead : page?.lead) || title;
}
