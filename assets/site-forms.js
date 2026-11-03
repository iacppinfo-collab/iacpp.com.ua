const MEMBERSHIP_ANNUAL_FEE = 800;
const FORM_TOPICS = ["membership", "education", "partnership", "media"];
const formDrafts = new Map();
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
    unavailable: "Надсилання через сайт наразі не підключене. Для зв'язку напишіть на",
    missing: "Заповніть це обов'язкове поле.", email: "Вкажіть коректний email, наприклад name@example.com.",
    invalid: "Перевірте виділені поля. Звернення не надіслано.",
    failed: "Звернення не надіслано: надсилання через сайт наразі недоступне. Дані залишилися у формі. Ви можете відкрити підготовлений лист у своїй поштовій програмі або написати нам напряму.",
    emailAction: "Відкрити лист у поштовій програмі", checking: "Перевіряємо дані..."
  } : {
    required: "Required field", note: "Fields marked * are required.", course: "Course / webinar",
    unavailable: "Website submission is not connected yet. Please email",
    missing: "Complete this required field.", email: "Enter a valid email, such as name@example.com.",
    invalid: "Check the highlighted fields. Your request has not been sent.",
    failed: "Your request has not been sent: website submission is currently unavailable. Your information remains in the form. You can open a prepared email in your mail app or contact us directly.",
    emailAction: "Open email in your mail app", checking: "Checking details..."
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
  return `<section id="${id}" class="form-shell"><h2 class="section-title" id="${id}-title">${title}</h2><p class="form-required-note">${c.note}</p><p class="form-availability">${c.unavailable} <a href="mailto:${email}">${email}</a>.</p><form class="form-grid" data-inquiry-form="${id}" novalidate aria-labelledby="${id}-title"><div class="field"><label for="name">${f.name} ${mark}</label><input id="name" name="name" type="text" autocomplete="name" maxlength="200" placeholder="${f.namePlaceholder}" ${attrs("name")}>${error("name")}</div><div class="field"><label for="email">${f.email} ${mark}</label><input id="email" name="email" type="email" autocomplete="email" inputmode="email" maxlength="254" placeholder="name@example.com" ${attrs("email")}>${error("email")}</div>${levelField}<div class="field field-full"><label for="topic">${f.topic} ${mark}</label><select id="topic" name="topic" ${attrs("topic")}>${f.options.map((option, index) => `<option value="${FORM_TOPICS[index]}">${option}</option>`).join("")}</select>${error("topic")}</div>${courseField}<div class="field field-full"><label for="message">${f.message} ${mark}</label><textarea id="message" name="message" placeholder="${f.messagePlaceholder}" ${attrs("message")}></textarea>${error("message")}</div><div class="field field-full"><button class="btn btn-primary" type="submit">${f.submit}</button><p class="form-status" role="alert" aria-atomic="true"></p><a class="form-email-action" href="mailto:${email}" hidden>${c.emailAction}</a></div></form></section>`;
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
      form.querySelector(".form-email-action").hidden = true;
      form.querySelector(".form-status").textContent = "";
    });
    form.addEventListener("submit", async event => {
      event.preventDefault();
      if (form.getAttribute("aria-busy") === "true") return;
      const button = form.querySelector('[type="submit"]');
      const status = form.querySelector(".form-status");
      form.setAttribute("aria-busy", "true");
      button.disabled = true;
      button.textContent = c.checking;
      try {
        const invalid = fields.filter(field => !validate(field));
        if (invalid.length) {
          status.textContent = c.invalid;
          invalid[0].focus();
          return;
        }
        rememberFormDrafts();
        await new Promise(resolve => requestAnimationFrame(resolve));
        // No delivery service is configured. Never claim a request was sent.
        const email = data.contacts.find(item => item[0] === "Email")[1];
        const topic = form.elements.topic.selectedOptions[0].textContent;
        const level = form.elements.namedItem("membership-level")?.selectedOptions[0]?.textContent;
        const course = form.elements.namedItem("course")?.value;
        const body = [
          `${data.form.name}: ${form.elements.name.value}`,
          `${data.form.email}: ${form.elements.email.value}`,
          level ? `${data.form.membershipLevel}: ${level} (${membershipPrice(data)})` : "",
          course ? `${c.course}: ${course}` : "",
          "", form.elements.message.value
        ].filter(line => line !== "").join("\n");
        const mail = form.querySelector(".form-email-action");
        mail.href = `mailto:${email}?subject=${encodeURIComponent(`${topic}${course ? `: ${course}` : ""}`)}&body=${encodeURIComponent(body)}`;
        mail.hidden = false;
        status.textContent = c.failed;
      } finally {
        button.disabled = false;
        button.textContent = data.form.submit;
        form.setAttribute("aria-busy", "false");
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
