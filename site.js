// Content editing: change navigation, cards, pages, documents, courses, contacts and translations here.
const LANG_KEY = "makpp-language";
const DEFAULT_LANG = "ua";

const DATA = {
  ua: {
    lang: "uk",
    langLabel: "UA",
    otherLang: "en",
    skip: "До основного змісту",
    brandSub: "Клінічна психологія та психотерапія",
    join: "Приєднатися",
    learnMore: "Дізнатися більше",
    goTo: "Перейти",
    details: "Детальніше",
    download: "Завантажити",
    register: "Зареєструватися",
    allProjects: "Усі проєкти",
    becomePartner: "Стати партнером",
    contactUs: "Зв'язатися",
    home: "Головна",
    sectionOverview: "Огляд розділу",
    breadcrumbsLabel: "Хлібні крихти",
    serviceInfo: "",
    sidebarTitle: "",
    sidebarText: "",
    quickAction: "",
    quickActionText: "",
    quickContacts: "Контакти",
    navLabel: "Головне меню",
    mobileNavLabel: "Мобільне меню",
    openMenu: "Відкрити меню",
    closeMenu: "Закрити меню",
    abstractAlt: "Абстрактна графіка асоціації",
    currentPrograms: "Актуальні програми",
    downloadMaterials: "Матеріали для завантаження",
    keyStages: "Ключові етапи",
    footer: {
      title: "МАКПП",
      description: "ГО “Міжнародна асоціація клінічних психологів та психотерапевтів” розвиває професійну психологічну допомогу, навчання, стандарти та партнерства у сфері психічного здоров'я.",
      quickLinks: "Швидкі посилання",
      contacts: "Контакти",
      socials: "Соціальні мережі",
      socialsText: "Офіційна сторінка асоціації у Facebook.",
      copyright: "© 2026 ГО «Міжнародна асоціація клінічних психологів та психотерапевтів». Усі права захищено."
    },
    nav: [
      {
        label: "Про нас",
        href: "about.html",
        children: [
          ["Про нас", "idea-history.html"],
          ["Правління", "board.html"],
          ["Структура", "structure.html"],
          ["Нормативні документи", "documents.html"],
          ["Контактна інформація", "contacts.html"]
        ]
      },
      {
        label: "Проєкти та ініціативи",
        href: "projects.html",
        children: [
          ["Активні проєкти", "projects.html#active"]
        ]
      },
      {
        label: "Психологам",
        href: "psychologists.html",
        children: [
          ["Членство", "membership.html"],
          ["Законодавство", "legislation.html"],
          ["Сертифікація", "certification.html"],
          ["Професійні стандарти", "psychologists.html#standards"],
          ["Корисні матеріали", "psychologists.html#materials"]
        ]
      },
      {
        label: "Навчання",
        href: "education.html",
        children: [
          ["Курси", "courses.html"],
          ["Вебінари", "webinars.html"],
          ["Програми підвищення кваліфікації", "education.html#programs"]
        ]
      }
    ],
    homePage: {
      eyebrow: "Професійна міжнародна асоціація",
      title: "Міжнародна асоціація клінічних психологів та психотерапевтів",
      lead: "Розвиваємо професійну психологічну допомогу, підтримуємо фахівців, впроваджуємо сучасні стандарти психотерапевтичної практики та зміцнюємо психічне здоров'я населення.",
      stats: [["8", "напрямів роботи"], ["3", "рівні підтримки"], ["24/7", "фокус на якості"]],
      aboutKicker: "Про асоціацію",
      aboutTitle: "Про асоціацію",
      aboutText: "МАКПП — професійна громадська організація, що об'єднує клінічних психологів, психотерапевтів та інших фахівців у сфері психічного здоров'я. Ми створюємо простір для навчання, етичної практики, супервізійної підтримки, досліджень і партнерських програм.",
      aboutButton: "Більше про МАКПП",
      goalKicker: "Наша мета",
      goalTitle: "Зміцнення психічного здоров'я через доступну професійну допомогу",
      goalText: "Мета організації представлена як система взаємопов'язаних напрямів, що посилюють фахівців, громади та якість психологічних послуг.",
      directionsKicker: "Напрями",
      directionsTitle: "Основні напрями",
      projectsKicker: "Проєкти та ініціативи",
      projectsTitle: "Практичні програми для фахівців і громад",
      psychologistsTitle: "Для психологів",
      educationTitle: "Навчання",
      partnershipKicker: "Партнерство",
      partnershipTitle: "Співпраця для розвитку системи психічного здоров'я",
      partnershipText: "Об'єднуємо зусилля з українськими та міжнародними партнерами для розвитку якісних програм психологічної допомоги, професійного навчання та досліджень у сфері психічного здоров'я."
    },
    goalItems: [
      ["Психологічні послуги", "Розвиток доступної, етичної та якісної допомоги для людей і громад."],
      ["Кваліфікація фахівців", "Безперервне навчання, супервізія та підтримка професійного зростання."],
      ["Травматерапія", "Практики допомоги людям, які пережили кризові та травматичні події."],
      ["Допомога в громадах", "Локальні маршрути підтримки та партнерства з громадськими ініціативами."],
      ["Сучасні методи психотерапії", "Впровадження підходів, що спираються на доказовість і професійні стандарти."],
      ["Міжнародні освітні стандарти", "Освітні програми, орієнтовані на міжнародний досвід і якість підготовки."],
      ["Дослідження психічного здоров'я", "Аналітика, оцінка потреб та розвиток даних для ефективних рішень."]
    ],
    directions: [
      ["Професійна спільнота", "Етична взаємодія, наставництво та підтримка фахівців на різних етапах професійного розвитку."],
      ["Клінічна психологія", "Розвиток доказово обґрунтованих підходів у консультуванні та міждисциплінарній взаємодії."],
      ["Психотерапія і травматерапія", "Підготовка спеціалістів до роботи з травмою, кризою, втратою та наслідками війни."],
      ["Навчання", "Курси, вебінари, супервізії та програми підвищення кваліфікації за міжнародними орієнтирами."],
      ["Сертифікація", "Прозорі критерії професійного визнання, підтвердження компетентності та безперервного навчання."],
      ["Дослідження", "Аналітика, польові дослідження й оцінка ефективності програм психічного здоров'я."],
      ["Гранти", "Залучення ресурсів для реалізації програм психологічної допомоги, професійної освіти та підтримки ментального здоров'я громад."],
      ["Міжнародне партнерство", "Співпраця з асоціаціями, фондами, університетами, медичними й гуманітарними інституціями."]
    ],
    statuses: {
      active: ["Активний", ""],
      draft: ["У розробці", "status-draft"],
      done: ["Завершений", "status-done"]
    },
    projects: [
      ["active", "Мережа травмаінформованої допомоги", "Координація фахівців для підтримки громад, ветеранів, родин військових та людей, які пережили кризові події."],
      ["draft", "Портал професійних стандартів", "Єдина база рекомендацій, документів, протоколів і практичних матеріалів для клінічних психологів та психотерапевтів."]
    ],
    psychologists: [
      ["Членство", "Професійна приналежність, участь у робочих групах, доступ до подій та партнерських можливостей для клінічних психологів і психотерапевтів.", "membership.html"],
      ["Сертифікація", "Підтвердження професійних компетентностей відповідно до вимог законодавства, професійних стандартів та принципів безперервного професійного розвитку.", "certification.html"],
      ["Законодавство", "Актуальні нормативно-правові документи, міжнародні рекомендації щодо розвитку клінічної психології та психотерапії в Україні та світі.", "legislation.html"],
      ["Професійні стандарти", "Етичні принципи, межі компетентності, вимоги до практики та документації.", "psychologists.html#standards"],
      ["Корисні матеріали", "Гайди, протоколи, чеклисти та добірки ресурсів для щоденної практики.", "psychologists.html#materials"]
    ],
    educationCards: [
      ["Курси", "Сертифікатні освітні програми з клінічної психології, психотерапії та травматерапії для фахівців сфери психічного здоров'я.", "courses.html"],
      ["Вебінари", "Онлайн-заходи з актуальних професійних тем, практичними інструментами, клінічними кейсами та живим обговоренням.", "webinars.html"],
      ["Програми підвищення кваліфікації", "Модульні програми підвищення кваліфікації з можливістю нарахування балів безперервного професійного розвитку (БПР).", "education.html#programs"],
      ["Супервізії / інтервізії", "Професійний простір для обговорення практичних кейсів, підтримки етичних стандартів, якості роботи та стійкості фахівців.", "education.html#supervision"]
    ],
    form: {
      title: "Написати нам",
      partnershipTitle: "Запит на партнерство",
      membershipTitle: "Заява на членство",
      name: "Ім'я",
      namePlaceholder: "Ваше ім'я",
      email: "Email",
      topic: "Тема",
      options: ["Членство", "Навчання", "Партнерство", "Медіа-запит"],
      message: "Повідомлення",
      messagePlaceholder: "Коротко опишіть запит",
      submit: "Надіслати запит",
      thanks: "Дякуємо. Форму можна підключити до CRM або поштового сервісу."
    },
    contacts: [["Email", "iacpp.info@gmail.com"], ["Телефон", "+380 99 537 2866"], ["Телефон", "+380 67 408 15 80"], ["Адреса", "м. Суми, вул. Атаманюка Романа, буд. 53, кв. 15"]],
    pages: {}
  },
  en: {
    lang: "en",
    langLabel: "EN",
    otherLang: "ua",
    skip: "Skip to main content",
    brandSub: "Clinical psychology and psychotherapy",
    join: "Join us",
    learnMore: "Learn more",
    goTo: "Open",
    details: "Details",
    download: "Download",
    register: "Register",
    allProjects: "All projects",
    becomePartner: "Become a partner",
    contactUs: "Contact us",
    home: "Home",
    sectionOverview: "Section overview",
    breadcrumbsLabel: "Breadcrumbs",
    serviceInfo: "",
    sidebarTitle: "",
    sidebarText: "",
    quickAction: "",
    quickActionText: "",
    quickContacts: "Contacts",
    navLabel: "Main menu",
    mobileNavLabel: "Mobile menu",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    abstractAlt: "Association abstract graphic",
    currentPrograms: "Current programs",
    downloadMaterials: "Download materials",
    keyStages: "Key stages",
    footer: {
      title: "IACPP",
      description: "The International Association of Clinical Psychologists and Psychotherapists develops professional psychological care, education, standards and partnerships in the field of mental health.",
      quickLinks: "Quick links",
      contacts: "Contacts",
      socials: "Social media",
      socialsText: "Official Facebook page of the association.",
      copyright: "© 2026 International Association of Clinical Psychologists and Psychotherapists. All rights reserved."
    },
    nav: [
      {
        label: "About us",
        href: "about.html",
        children: [
          ["About us", "idea-history.html"],
          ["Board of Directors", "board.html"],
          ["Structure", "structure.html"],
          ["Regulatory documents", "documents.html"],
          ["Contact information", "contacts.html"]
        ]
      },
      {
        label: "Projects and initiatives",
        href: "projects.html",
        children: [
          ["Active projects", "projects.html#active"]
        ]
      },
      {
        label: "For psychologists",
        href: "psychologists.html",
        children: [
          ["Membership", "membership.html"],
          ["Legislation", "legislation.html"],
          ["Certification", "certification.html"],
          ["Professional standards", "psychologists.html#standards"],
          ["Useful materials", "psychologists.html#materials"]
        ]
      },
      {
        label: "Education",
        href: "education.html",
        children: [
          ["Courses", "courses.html"],
          ["Webinars", "webinars.html"],
          ["Continuing education programs", "education.html#programs"]
        ]
      }
    ],
    homePage: {
      eyebrow: "Professional international association",
      title: "International Association of Clinical Psychologists and Psychotherapists",
      lead: "We develop professional psychological care, support specialists, implement modern standards of psychotherapeutic practice and strengthen the population's mental health.",
      stats: [["8", "areas of work"], ["3", "levels of support"], ["24/7", "focus on quality"]],
      aboutKicker: "About the association",
      aboutTitle: "About the association",
      aboutText: "IACPP is a professional NGO that brings together clinical psychologists, psychotherapists and other mental health specialists. We create a space for training, ethical practice, supervision, research and partnership programs.",
      aboutButton: "More about IACPP",
      goalKicker: "Our purpose",
      goalTitle: "Strengthening mental health through accessible professional care",
      goalText: "The association's purpose is presented as a system of connected priorities that strengthen specialists, communities and the quality of psychological services.",
      directionsKicker: "Areas",
      directionsTitle: "Main areas",
      projectsKicker: "Projects and initiatives",
      projectsTitle: "Practical programs for specialists and communities",
      psychologistsTitle: "For psychologists",
      educationTitle: "Education",
      partnershipKicker: "Partnership",
      partnershipTitle: "Collaboration to develop the mental health system",
      partnershipText: "We join efforts with Ukrainian and international partners to develop quality psychological care programs, professional education and mental health research."
    },
    goalItems: [
      ["Psychological services", "Development of accessible, ethical and high-quality care for people and communities."],
      ["Specialist qualification", "Continuous training, supervision and support for professional growth."],
      ["Trauma therapy", "Care practices for people who have experienced crisis and traumatic events."],
      ["Community support", "Local support pathways and partnerships with community initiatives."],
      ["Modern psychotherapy methods", "Implementation of approaches grounded in evidence and professional standards."],
      ["International education standards", "Educational programs aligned with international experience and training quality."],
      ["Mental health research", "Analytics, needs assessment and data development for effective decisions."]
    ],
    directions: [
      ["Professional community", "Ethical collaboration, mentorship and support for specialists at different stages of professional development."],
      ["Clinical psychology", "Development of evidence-based assessment, counselling and interdisciplinary collaboration."],
      ["Psychotherapy and trauma therapy", "Preparation of specialists to work with trauma, crisis, grief and the consequences of war."],
      ["Education", "Courses, webinars, supervision and continuing education programs aligned with international benchmarks."],
      ["Certification", "Transparent criteria for professional recognition, competence confirmation and continuous learning."],
      ["Research", "Analytics, field studies and evaluation of mental health program effectiveness."],
      ["Grants", "Resource mobilization for psychological care, education and community support programs."],
      ["International partnership", "Cooperation with associations, foundations, universities, medical and humanitarian institutions."]
    ],
    statuses: {
      active: ["Active", ""],
      draft: ["In development", "status-draft"],
      done: ["Completed", "status-done"]
    },
    projects: [
      ["active", "Trauma-informed care network", "Coordination of specialists to support communities, veterans, military families and people affected by crisis events."],
      ["draft", "Professional standards portal", "A single knowledge base of recommendations, documents, protocols and practical materials for clinical psychologists."]
    ],
    psychologists: [
      ["Membership", "Professional belonging, participation in working groups, access to events and partnership opportunities.", "membership.html"],
      ["Certification", "Confirmation of competencies, supervision experience and continuous professional development.", "certification.html"],
      ["Legislation", "Relevant regulatory materials and positions on the development of the profession in Ukraine.", "legislation.html"],
      ["Professional standards", "Ethical principles, limits of competence, practice requirements and documentation guidance.", "psychologists.html#standards"],
      ["Useful materials", "Guides, protocols, checklists and resource collections for everyday practice.", "psychologists.html#materials"]
    ],
    educationCards: [
      ["Courses", "Certificate educational programs in clinical psychology, psychotherapy and trauma therapy for mental health specialists.", "courses.html"],
      ["Webinars", "Online events on current professional topics with practical tools, clinical cases and live discussion.", "webinars.html"],
      ["Continuing education programs", "Modular continuing education programs with the possibility of earning continuing professional development (CPD) credits.", "education.html#programs"],
      ["Supervision / intervision", "A professional space for discussing practical cases, supporting ethical standards, quality of work and specialist resilience.", "education.html#supervision"]
    ],
    form: {
      title: "Write to us",
      partnershipTitle: "Partnership request",
      membershipTitle: "Membership application",
      name: "Name",
      namePlaceholder: "Your name",
      email: "Email",
      topic: "Topic",
      options: ["Membership", "Education", "Partnership", "Media request"],
      message: "Message",
      messagePlaceholder: "Briefly describe your request",
      submit: "Send request",
      thanks: "Thank you. The form can be connected to a CRM or email service."
    },
    contacts: [["Email", "iacpp.info@gmail.com"], ["Phone", "+380 99 537 2866"], ["Phone", "+380 67 408 15 80"], ["Address", "53 Romana Atamaniuka St., apt. 15, Sumy, Ukraine"]],
    pages: {}
  }
};

DATA.ua.pages = {
  about: {
    title: "Про асоціацію",
    lead: "МАКПП - професійна громадська організація, що об'єднує клінічних психологів, психотерапевтів та фахівців сфери психічного здоров'я.",
    sections: [
      ["text", "Наша мета", "Зміцнювати психічне здоров'я населення через розвиток доступних і професійних психологічних послуг, підвищення кваліфікації фахівців, впровадження сучасних методів психотерапії та травматерапії."],
      ["text", "Хто ми", "Ми об'єднуємо доказові підходи в клінічній психології та психотерапії, клінічну практику, дослідження й міжнародні стандарти для розвитку якісної допомоги, професійної освіти та підтримки громад."],
      ["cards", "Принципи роботи", [["Етичність", "Повага до гідності людини, конфіденційність, прозорість і відповідальність у професійній взаємодії."], ["Професійність і доказовість", "Опора на сучасні наукові підходи, клінічні рекомендації, міжнародний досвід і безперервний розвиток фахівців."], ["Доступність", "Розвиток психологічних сервісів, навчання та партнерств, які наближають якісну допомогу до людей і громад."]], 3]
    ]
  },
  "idea-history": {
    title: "Про нас",
    lead: "В умовах війни питання психічного здоров'я набуває особливого значення. МАКПП розвиває клінічну психологію, психотерапію, психологічне консультування та травматерапію як частину сучасної системи охорони здоров'я і відновлення людського капіталу України.",
    sections: [
      ["text", "Психічне здоров'я в умовах війни", "Україна щодня стикається з наслідками травматичного досвіду, втрат, вимушеного переміщення, участі у бойових діях, поранень, полону, розлуки з родиною, професійного вигорання та життя в умовах невизначеності. Це впливає не лише на окрему людину, а й на родини, громади, професійні спільноти та країну загалом."],
      ["text", "Розвиток напряму психічного здоров'я", "Саме тому діяльність нашої Громадської організації поступово розширилася у напрямку психології та психічного здоров'я. Після підписання меморандуму з Міжнародним інститутом післядипломної освіти цей напрям набув для нас ще більшого значення: ми почали активніше працювати з фахівцями у сфері психологічного консультування, клінічної психології, травматерапії та психотерапевтичної практики, не відмовляючись від медичного напряму, а посилюючи його психологічною та психотерапевтичною складовою."],
      ["text", "Відновлення людського капіталу", "Розвиток клінічної психології та психотерапії є важливою складовою відновлення людського капіталу України. Людський капітал - це не лише професійні знання, досвід і здатність працювати. Це також психологічна стійкість, емоційна витривалість, здатність людини відновлюватися після травматичних подій, підтримувати стосунки, повертатися до навчання, роботи, служби, громадського життя та брати участь у розвитку країни."],
      ["text", "Роль клінічних психологів і психотерапевтів", "Клінічні психологи та психотерапевти відіграють ключову роль у цьому процесі. Вони допомагають людям справлятися з наслідками травми, кризовими станами, втратою, тривогою, виснаженням, порушеннями адаптації та іншими психологічними труднощами, які можуть виникати внаслідок війни, тривалого стресу та складного життєвого досвіду."],
      ["text", "Реінтеграція людей у суспільство", "Окремим важливим напрямом нашої Асоціації є реінтеграція людей у суспільство: ветеранів і ветеранок, військовослужбовців після повернення з фронту, людей з досвідом полону, поранення чи втрати, внутрішньо переміщених осіб, членів родин військових, дітей та молоді, які зростають в умовах війни. Якісна психологічна та психотерапевтична допомога сприяє поверненню людини до активного життя, відновленню її ролі в родині, професійному середовищі та громаді."],
      ["text", "Психологія як частина охорони здоров'я", "Водночас наша Громадська організація не відмовилася від медичного напряму. Навпаки, ми розглядаємо психологію як важливу складову сучасної системи охорони здоров'я. Сфера охорони здоров'я сьогодні має значно ширше значення, ніж лише медична допомога у класичному розумінні. Психічне здоров'я, психологічна підтримка, клінічна психологія, психотерапія, травматерапія та розвиток професійних психологічних послуг стали невід'ємною частиною турботи про людину, громади та суспільство."],
      ["text", "Міст між медициною і соціальним відновленням", "Ми розглядаємо клінічну психологію та психотерапію як міст між медициною, психічним здоров'ям, соціальним відновленням і професійною допомогою людині. Саме тому Асоціація розвиває напрям клінічної психології, психотерапії, психологічного консультування та травматерапії як частину сучасної системи охорони здоров'я."],
      ["text", "Для чого створена Асоціація", "Міжнародна асоціація клінічних психологів та психотерапевтів створена для розвитку професійної спільноти, підвищення кваліфікації фахівців, впровадження сучасних доказових методів допомоги, підтримки реформ у сфері психічного здоров'я та формування культури звернення по психологічну і психотерапевтичну допомогу."],
      ["text", "Наше прагнення", "Ми прагнемо, щоб якісна психологічна та психотерапевтична допомога була доступною, професійною та етичною, а фахівці у сфері психічного здоров'я мали простір для навчання, супервізії, інтервізії, професійного зростання і міжнародної співпраці.<br><br><strong>Адже відновлення країни починається з відновлення людини.</strong>"]
    ]
  },
  board: {
    title: "Правління",
    lead: "Правління відповідає за стратегічний розвиток, етичні засади, партнерську політику та сталість програм МАКПП.",
    sections: [
      ["cards", "Склад правління", [["Наталія Нос", "Президент | Член правління", "МАКПП", "НН", "assets/natalia-nos.jpeg"], ["Людмила Агаркова", "Виконавчий директор | Член правління", "МАКПП", "ЛА", "assets/liudmyla-aharkova.jpeg"], ["Лілія Обшта", "Член правління", "МАКПП", "ЛО", "assets/liliia-obshta.jpeg"], ["Ольга Семенова", "Член правління", "МАКПП", "ОС", "assets/olha-semenova.jpeg"], ["Софія Сивак", "Член правління", "МАКПП", "СС", "assets/sofiia-syvak.jpeg"]], 3, true]
    ]
  },
  structure: {
    title: "Структура",
    lead: "Структура асоціації підтримує роботу напрямів, робочих груп і партнерських програм без зайвої бюрократії.",
    sections: [
      ["cards", "Напрями та групи", [["Клінічна практика", "Професійні рекомендації, міждисциплінарна взаємодія, робота зі складними випадками."], ["Освітній напрям", "Навчальні програми, вебінари, супервізії, методичні матеріали."], ["Проєктний офіс", "Планування ініціатив, грантові заявки, звітність і комунікація з партнерами."], ["Дослідницька група", "Оцінка потреб, аналіз ефективності програм, підготовка аналітичних матеріалів."]], 2],
      ["list", "Місця для майбутнього розширення", ["Реєстр членів асоціації", "Комітет з етики", "Регіональні координатори", "Експертні групи за напрямами психотерапії"]]
    ]
  },
  documents: {
    title: "Нормативні документи",
    lead: "У цьому розділі розміщуються статутні документи, положення, політики, протоколи й матеріали для завантаження у PDF.",
    sections: [
      ["documents", [["Статут ГО МАКПП", "Установчий документ організації, доступний для перегляду та завантаження у PDF.", "assets/statut-makpp.pdf"], ["Етичний кодекс", "PDF, місце для фінальної версії документа"], ["Положення про членство", "PDF, умови вступу, права та обов'язки членів"], ["Політика конфіденційності", "PDF, правила обробки даних і комунікації"]]],
      ["text", "Оновлення документів", "Файли можна замінити на реальні PDF у папці сайту, а посилання відредагувати у файлі site.js."]
    ]
  },
  contacts: {
    title: "Контактна інформація",
    lead: "Звертайтеся щодо членства, навчання, партнерства, грантів, медіа-запитів або участі в робочих групах.",
    sections: [["contacts"], ["form"]]
  },
  projects: {
    title: "Проєкти та ініціативи",
    lead: "МАКПП розвиває ініціативи, що посилюють професійну спільноту, підтримують громади та роблять психологічну допомогу доступнішою.",
    sections: [
      ["projects", "active", "Активні проєкти"]
    ]
  },
  psychologists: {
    title: "Психологам",
    lead: "Розділ для фахівців: членство, сертифікація, законодавство, професійні стандарти й практичні матеріали.",
    sections: [
      ["linkCards", "Напрями підтримки", "psychologists", 3],
      ["list", "Професійні стандарти", ["Етичні межі практики", "Документування консультаційної роботи", "Супервізійна підтримка", "Направлення до суміжних спеціалістів"], "standards"],
      ["documents", [["Чеклист первинної консультації", "PDF, місце для методичного матеріалу"], ["Гайд з кризового консультування", "PDF, місце для практичного посібника"], ["Форма інформованої згоди", "PDF/DOCX, місце для шаблону"]], "materials"]
    ]
  },
  membership: {
    title: "Членство",
    lead: "Членство в МАКПП відкриває доступ до професійної спільноти, навчання, супервізій, робочих груп і партнерських програм.",
    sections: [
      ["cards", "Переваги членства", [["Спільнота", "Професійне середовище для обміну досвідом, взаємної підтримки та розвитку."], ["Навчання", "Пріоритетний доступ до курсів, вебінарів, супервізій і спеціальних подій."], ["Участь у рішеннях", "Можливість долучатися до робочих груп, обговорення стандартів і проєктних напрямів."]], 3],
      ["form", "membership", "join-form"]
    ]
  },
  legislation: {
    title: "Законодавство",
    lead: "Матеріали цього розділу допомагають фахівцям орієнтуватися в нормативному полі психологічної та психотерапевтичної практики.",
    sections: [
      ["documents", [["Добірка нормативних актів", "PDF, місце для оновлюваної добірки"], ["Правові аспекти консультування", "PDF, місце для методичних рекомендацій"], ["Захист персональних даних", "PDF, місце для політики та шаблонів"]]],
      ["text", "Позиція асоціації", "МАКПП підтримує розвиток професійного регулювання, яке захищає клієнтів, визнає компетентність фахівців і сприяє доступу до якісних послуг."]
    ]
  },
  certification: {
    title: "Сертифікація",
    lead: "Сертифікація покликана підтвердити професійну компетентність фахівців, якість практики та сталість професійного розвитку.",
    sections: [
      ["cards", "Компоненти сертифікації", [["Освіта", "Профільна підготовка, спеціалізовані програми та підтверджені години навчання."], ["Практика", "Документований досвід роботи, межі компетентності та етична відповідальність."], ["Супервізія", "Регулярна супервізійна підтримка, рефлексія випадків і розвиток професійної якості."], ["Безперервний розвиток", "Участь у курсах, конференціях, інтервізіях і професійних заходах."]], 2]
    ]
  },
  education: {
    title: "Навчання",
    lead: "Навчальний напрям МАКПП поєднує курси, вебінари, супервізії та програми підвищення кваліфікації за міжнародними стандартами.",
    sections: [
      ["linkCards", "Формати навчання", "educationCards", 4],
      ["text", "Програми підвищення кваліфікації", "В розробці.", "programs"],
      ["list", "Супервізії / інтервізії", ["Групові супервізії для практиків", "Інтервізійні зустрічі за напрямами", "Підтримка фахівців, які працюють із травмою"], "supervision"]
    ]
  },
  courses: {
    title: "Курси",
    lead: "Курси МАКПП створені для системного підвищення кваліфікації клінічних психологів, психотерапевтів та інших фахівців психічного здоров'я.",
    sections: [
      ["courses", [["Основи клінічного консультування", "8 модулів", "Старт набору: буде оголошено"], ["Травматерапія в кризових умовах", "10 модулів", "Формат: онлайн + супервізійні групи"], ["Психотерапевтична робота з втратою", "6 модулів", "Для практиків із досвідом консультування"]]],
      ["text", "Місце для реєстрації", "До кожного курсу можна додати фото викладача, програму, PDF-опис, форму реєстрації та статус набору."]
    ]
  },
  webinars: {
    title: "Вебінари",
    lead: "Вебінари дають змогу швидко отримати прикладні знання, обговорити клінічні випадки та познайомитися з сучасними підходами.",
    sections: [
      ["courses", [["Травмаінформована комунікація", "90 хв", "Дата: буде оголошено"], ["Етика онлайн-консультування", "120 хв", "Формат: лекція та відповіді"], ["Професійне вигорання фахівців", "90 хв", "Для психологів і команд допомоги"]]],
      ["documents", [["Архів презентацій", "PDF, місце для матеріалів після подій"], ["Записи вебінарів", "Місце для посилань на відео"]]]
    ]
  },
  partnership: {
    title: "Партнерство",
    lead: "МАКПП відкрита до співпраці з громадськими організаціями, міжнародними партнерами, фондами, донорами, освітніми та медичними установами.",
    sections: [
      ["cards", "Формати співпраці", [["Спільні програми", "Освітні, гуманітарні та дослідницькі проєкти у сфері психічного здоров'я."], ["Гранти й донорство", "Планування, впровадження та оцінка програм підтримки населення і фахівців."], ["Навчальні партнерства", "Курси, обміни, міжнародні експерти, супервізійні програми та стажування."], ["Медичні й освітні установи", "Маршрути скерування, міждисциплінарна співпраця, підготовка команд."]], 2],
      ["form", "partnership"]
    ]
  }
};

DATA.en.pages = {
  about: {
    title: "About the association",
    lead: "IACPP is a professional non-governmental organization that unites clinical psychologists, psychotherapists and mental health specialists.",
    sections: [
      ["text", "Our goal", "To strengthen public mental health through the development of accessible and professional psychological services, advanced training for specialists, and the implementation of modern psychotherapy and trauma therapy methods."],
      ["text", "Who we are", "We bring together evidence-based approaches in clinical psychology and psychotherapy, clinical practice, research and international standards to develop quality care, professional education and community support."],
      ["cards", "Working principles", [["Ethics", "Respect for human dignity, confidentiality, transparency and responsibility in professional interaction."], ["Professionalism and evidence-based practice", "Reliance on current scientific approaches, clinical recommendations, international experience and continuous professional development."], ["Accessibility", "Development of psychological services, training and partnerships that bring quality care closer to people and communities."]], 3]
    ]
  },
  "idea-history": {
    title: "About us",
    lead: "In wartime, mental health becomes especially important. IACPP develops clinical psychology, psychotherapy, psychological counselling and trauma therapy as part of Ukraine's modern health care system and human capital recovery.",
    sections: [
      ["text", "Mental health in wartime", "Ukraine faces the consequences of traumatic experience, loss, displacement, combat participation, injuries, captivity, separation from family, professional burnout and life under uncertainty every day. This affects individuals, families, communities, professional groups and the country as a whole."],
      ["text", "Development of the mental health area", "That is why the activity of our non-governmental organization gradually expanded toward psychology and mental health. After signing a memorandum with the International Institute of Postgraduate Education, this area became even more important for us: we began working more actively with specialists in psychological counselling, clinical psychology, trauma therapy and psychotherapeutic practice, strengthening rather than replacing the medical direction."],
      ["text", "Recovery of human capital", "The development of clinical psychology and psychotherapy is an important part of restoring Ukraine's human capital. Human capital is not only professional knowledge, experience and capacity to work. It is also psychological resilience, emotional endurance and the ability to recover after traumatic events, maintain relationships, return to study, work, service and community life, and participate in the country's development."],
      ["text", "Role of clinical psychologists and psychotherapists", "Clinical psychologists and psychotherapists play a key role in this process. They help people cope with trauma consequences, crisis states, grief, anxiety, exhaustion, adjustment difficulties and other psychological challenges that may arise from war, prolonged stress and complex life experience."],
      ["text", "Reintegration into society", "A separate important area of the Association is the reintegration of people into society: veterans, service members returning from the front, people with experience of captivity, injury or loss, internally displaced persons, family members of service members, children and young people growing up during the war. Quality psychological and psychotherapeutic care helps people return to active life and restore their role in the family, professional environment and community."],
      ["text", "Psychology as part of health care", "At the same time, our organization has not abandoned the medical direction. On the contrary, we see psychology as an important component of the modern health care system. Mental health, psychological support, clinical psychology, psychotherapy, trauma therapy and the development of professional psychological services have become an integral part of care for people, communities and society."],
      ["text", "A bridge between medicine and social recovery", "We view clinical psychology and psychotherapy as a bridge between medicine, mental health, social recovery and professional help for people. That is why the Association develops clinical psychology, psychotherapy, psychological counselling and trauma therapy as part of the modern health care system."],
      ["text", "Why the Association exists", "The International Association of Clinical Psychologists and Psychotherapists was created to develop a professional community, improve specialists' qualifications, implement modern evidence-based methods of care, support mental health reforms and build a culture of seeking psychological and psychotherapeutic help."],
      ["text", "Our aspiration", "We strive for quality psychological and psychotherapeutic care to be accessible, professional and ethical, and for mental health specialists to have space for education, supervision, intervision, professional growth and international cooperation.<br><br><strong>Because the recovery of a country begins with the recovery of a person.</strong>"]
    ]
  },
  board: {
    title: "Board of Directors",
    lead: "The Board of Directors is responsible for strategic development, ethical principles, partnership policy and the sustainability of IACPP programs.",
    sections: [
      ["cards", "Board composition", [["Nataliia Nos", "President | Board Member", "IACPP", "NN", "assets/natalia-nos.jpeg"], ["Liudmyla Aharkova", "Executive Director | Board Member", "IACPP", "LA", "assets/liudmyla-aharkova.jpeg"], ["Liliia Obshta", "Board Member", "IACPP", "LO", "assets/liliia-obshta.jpeg"], ["Olha Semenova", "Board Member", "IACPP", "OS", "assets/olha-semenova.jpeg"], ["Sofiia Syvak", "Board Member", "IACPP", "SS", "assets/sofiia-syvak.jpeg"]], 3, true]
    ]
  },
  structure: {
    title: "Structure",
    lead: "The association's structure supports areas of work, working groups and partnership programs without unnecessary bureaucracy.",
    sections: [
      ["cards", "Areas and groups", [["Clinical practice", "Professional recommendations, interdisciplinary interaction and work with complex cases."], ["Education area", "Training programs, webinars, supervision and methodological materials."], ["Project office", "Initiative planning, grant applications, reporting and partner communication."], ["Research group", "Needs assessment, program effectiveness analysis and preparation of analytical materials."]], 2],
      ["list", "Future expansion spaces", ["Member registry", "Ethics committee", "Regional coordinators", "Expert groups by psychotherapy areas"]]
    ]
  },
  documents: {
    title: "Regulatory documents",
    lead: "This section contains statutory documents, regulations, policies, protocols and downloadable PDF materials.",
    sections: [
      ["documents", [["IACPP Statute", "The association's founding document, available to view and download as a PDF.", "assets/statut-makpp.pdf"], ["Code of Ethics", "PDF, space for the final document"], ["Membership Regulation", "PDF, admission terms, rights and responsibilities"], ["Privacy Policy", "PDF, data processing and communication rules"]]],
      ["text", "Document updates", "Files can be replaced with real PDFs in the website folder, and links can be edited in site.js."]
    ]
  },
  contacts: {
    title: "Contact information",
    lead: "Contact us regarding membership, education, partnerships, grants, media requests or participation in working groups.",
    sections: [["contacts"], ["form"]]
  },
  projects: {
    title: "Projects and initiatives",
    lead: "IACPP develops initiatives that strengthen the professional community, support communities and make psychological care more accessible.",
    sections: [
      ["projects", "active", "Active projects"]
    ]
  },
  psychologists: {
    title: "For psychologists",
    lead: "A section for specialists: membership, certification, legislation, professional standards and practical materials.",
    sections: [
      ["linkCards", "Support areas", "psychologists", 3],
      ["list", "Professional standards", ["Ethical boundaries of practice", "Documentation of counselling work", "Supervision support", "Referral to adjacent specialists"], "standards"],
      ["documents", [["Initial consultation checklist", "PDF, space for methodological material"], ["Crisis counselling guide", "PDF, space for practical guide"], ["Informed consent form", "PDF/DOCX, space for template"]], "materials"]
    ]
  },
  membership: {
    title: "Membership",
    lead: "Membership in IACPP provides access to a professional community, training, supervision, working groups and partnership programs.",
    sections: [
      ["cards", "Membership benefits", [["Community", "A professional environment for experience exchange, mutual support and development."], ["Education", "Priority access to courses, webinars, supervision and special events."], ["Participation in decisions", "An opportunity to join working groups and discuss standards and project areas."]], 3],
      ["form", "membership", "join-form"]
    ]
  },
  legislation: {
    title: "Legislation",
    lead: "Materials in this section help specialists navigate the regulatory field of psychological and psychotherapeutic practice.",
    sections: [
      ["documents", [["Collection of regulations", "PDF, space for an updated collection"], ["Legal aspects of counselling", "PDF, space for methodological recommendations"], ["Personal data protection", "PDF, space for policy and templates"]]],
      ["text", "Association position", "IACPP supports the development of professional regulation that protects clients, recognizes specialist competence and promotes access to quality services."]
    ]
  },
  certification: {
    title: "Certification",
    lead: "Certification is designed to confirm professional competence, quality of practice and sustainable professional development.",
    sections: [
      ["cards", "Certification components", [["Education", "Professional training, specialized programs and confirmed training hours."], ["Practice", "Documented work experience, boundaries of competence and ethical responsibility."], ["Supervision", "Regular supervision support, case reflection and development of professional quality."], ["Continuous development", "Participation in courses, conferences, intervision and professional events."]], 2]
    ]
  },
  education: {
    title: "Education",
    lead: "The IACPP education area combines courses, webinars, supervision and continuing education programs based on international standards.",
    sections: [
      ["linkCards", "Training formats", "educationCards", 4],
      ["text", "Continuing education programs", "In development.", "programs"],
      ["list", "Supervision / intervision", ["Group supervision for practitioners", "Intervision meetings by topic", "Support for specialists working with trauma"], "supervision"]
    ]
  },
  courses: {
    title: "Courses",
    lead: "IACPP courses are designed for systematic professional development of clinical psychologists, psychotherapists and other mental health specialists.",
    sections: [
      ["courses", [["Fundamentals of clinical counselling", "8 modules", "Enrollment start: to be announced"], ["Trauma therapy in crisis conditions", "10 modules", "Format: online + supervision groups"], ["Psychotherapeutic work with grief", "6 modules", "For practitioners with counselling experience"]]],
      ["text", "Registration space", "Each course can include a teacher photo, program, PDF description, registration form and enrollment status."]
    ]
  },
  webinars: {
    title: "Webinars",
    lead: "Webinars help specialists quickly gain applied knowledge, discuss clinical cases and become familiar with modern approaches.",
    sections: [
      ["courses", [["Trauma-informed communication", "90 min", "Date: to be announced"], ["Ethics of online counselling", "120 min", "Format: lecture and Q&A"], ["Professional burnout of specialists", "90 min", "For psychologists and care teams"]]],
      ["documents", [["Presentation archive", "PDF, space for post-event materials"], ["Webinar recordings", "Space for video links"]]]
    ]
  },
  partnership: {
    title: "Partnership",
    lead: "IACPP is open to cooperation with NGOs, international partners, foundations, donors, educational and medical institutions.",
    sections: [
      ["cards", "Cooperation formats", [["Joint programs", "Educational, humanitarian and research projects in the field of mental health."], ["Grants and donor support", "Planning, implementation and evaluation of programs supporting people and specialists."], ["Educational partnerships", "Courses, exchanges, international experts, supervision programs and internships."], ["Medical and educational institutions", "Referral pathways, interdisciplinary cooperation and team training."]], 2],
      ["form", "partnership"]
    ]
  }
};

function getLanguage() {
  const params = new URLSearchParams(window.location.search);
  const fromUrl = params.get("lang");
  if (DATA[fromUrl]) return fromUrl;
  const saved = localStorage.getItem(LANG_KEY);
  return DATA[saved] ? saved : DEFAULT_LANG;
}

function setLanguage(lang) {
  try {
    localStorage.setItem(LANG_KEY, lang);
  } catch (_error) {
    // Some mobile file viewers block localStorage; the page can still switch language in memory.
  }
  try {
    const url = new URL(window.location.href);
    if (["file:", "http:", "https:"].includes(url.protocol)) {
      url.searchParams.set("lang", lang);
      window.history.replaceState({}, "", url);
    }
  } catch (_error) {
    // content:// viewers on Android often block history changes.
  }
  renderSite(lang);
}

function currentFile() {
  const path = window.location.pathname.split("/").pop();
  return path || "index.html";
}

function currentPageKey() {
  return document.documentElement.dataset.page || "home";
}

function renderSite(lang = getLanguage()) {
  const data = DATA[lang];
  document.documentElement.lang = data.lang;
  document.body.classList.remove("menu-open");
  renderHeader(data, lang);
  renderFooter(data);
  if (currentPageKey() === "home") {
    renderHome(data);
  } else {
    renderPage(data, currentPageKey());
  }
  bindInteractions(data, lang);
  revealOnScroll();
  scrollToPageAnchor();
}

function renderHeader(data, lang) {
  const file = currentFile();
  const header = document.querySelector("[data-header]");
  header.innerHTML = `
    <a class="skip-link" href="#main">${data.skip}</a>
    <div class="container header-inner">
      <a class="brand" href="index.html${langQuery(lang)}" aria-label="${data.footer.title}, ${data.home}">
        <span class="brand-mark" aria-hidden="true">
          <img src="assets/iacpp-logo.svg" alt="">
        </span>
        <span class="brand-text"><span class="brand-name">${data.footer.title}</span><span class="brand-sub">${data.brandSub}</span></span>
      </a>
      <nav class="desktop-nav" aria-label="${data.navLabel}">${data.nav.map(item => desktopItem(item, file, lang)).join("")}</nav>
      <div class="header-actions">
        ${languageSwitch(data, lang)}
        <a class="btn btn-gold header-cta" href="${localizedHref("membership.html#join-form", lang)}">${data.join}</a>
      </div>
      <button class="menu-toggle" type="button" aria-label="${data.openMenu}" aria-expanded="false" aria-controls="mobile-menu"><span></span><span></span><span></span></button>
    </div>
    <div class="mobile-panel" id="mobile-menu">
      <nav class="mobile-nav" aria-label="${data.mobileNavLabel}">
        ${data.nav.map(item => mobileItem(item, data, lang)).join("")}
        <a class="btn btn-gold" href="${localizedHref("membership.html#join-form", lang)}">${data.join}</a>
      </nav>
    </div>`;
}

function desktopItem(item, file, lang) {
  const active = item.href === file || item.children.some(child => child[1].split("#")[0] === file);
  if (!item.children.length) {
    return `<div class="nav-item"><a class="nav-link" ${active ? 'aria-current="page"' : ""} href="${localizedHref(item.href, lang)}">${item.label}</a></div>`;
  }
  return `<div class="nav-item"><a class="nav-button" ${active ? 'aria-current="page"' : ""} href="${localizedHref(item.href, lang)}">${item.label}<span class="chevron" aria-hidden="true"></span></a><div class="dropdown">${item.children.map(child => `<a href="${localizedHref(child[1], lang)}" ${child[1].split("#")[0] === file ? 'aria-current="page"' : ""}>${child[0]}</a>`).join("")}</div></div>`;
}

function mobileItem(item, data, lang) {
  if (!item.children.length) {
    return `<a class="mobile-link" href="${localizedHref(item.href, lang)}">${item.label}</a>`;
  }
  return `<div class="mobile-group"><button class="mobile-summary" type="button">${item.label}<span class="chevron" aria-hidden="true"></span></button><div class="mobile-children"><a href="${localizedHref(item.href, lang)}">${data.sectionOverview}</a>${item.children.map(child => `<a href="${localizedHref(child[1], lang)}">${child[0]}</a>`).join("")}</div></div>`;
}

function languageSwitch(data, lang) {
  const other = data.otherLang;
  return `<div class="language-switch" aria-label="Language switcher">
    <button type="button" class="lang-option ${lang === "ua" ? "is-active" : ""}" data-lang="ua" aria-pressed="${lang === "ua"}">UA</button>
    <button type="button" class="lang-option ${lang === "en" ? "is-active" : ""}" data-lang="en" aria-pressed="${lang === "en"}">EN</button>
    <span class="visually-hidden">${other}</span>
  </div>`;
}

function renderFooter(data) {
  const footer = data.footer;
  const email = data.contacts.find(item => item[0] === "Email")?.[1] || "iacpp.info@gmail.com";
  const phones = data.contacts.filter(item => item[0] === "Телефон" || item[0] === "Phone").map(item => item[1]);
  const address = data.contacts.find(item => item[0] === "Адреса" || item[0] === "Address")?.[1] || "";
  document.querySelector("[data-footer]").innerHTML = `
    <div class="container footer-main">
      <div><div class="footer-title">${footer.title}</div><p>${footer.description}</p></div>
      <div><div class="footer-title">${footer.quickLinks}</div><div class="footer-links"><a href="${localizedHref("about.html", getLanguage())}">${data.nav[0].label}</a><a href="${localizedHref("projects.html", getLanguage())}">${data.nav[1].label}</a><a href="${localizedHref("psychologists.html", getLanguage())}">${data.nav[2].label}</a><a href="${localizedHref("education.html", getLanguage())}">${data.nav[3].label}</a></div></div>
      <div><div class="footer-title">${footer.contacts}</div><div class="footer-links"><a href="mailto:${email}">${email}</a>${phones.map(phone => `<a href="tel:+${phone.replace(/\D/g, "")}">${phone}</a>`).join("")}${address ? `<span>${address}</span>` : ""}</div></div>
      <div><div class="footer-title">${footer.socials}</div><p>${footer.socialsText}</p><div class="socials"><a href="https://www.facebook.com/share/1945fZi6ND/" target="_blank" rel="noopener" aria-label="Facebook">Fb</a></div></div>
    </div>
    <div class="footer-bottom"><div class="container">${footer.copyright}</div></div>`;
}

function renderHome(data) {
  const h = data.homePage;
  document.getElementById("main").innerHTML = `
    <section class="hero">
      <div class="container hero-inner">
        <div class="reveal">
          <p class="eyebrow">${h.eyebrow}</p>
          <h1>${h.title}</h1>
          <p class="lead">${h.lead}</p>
          <div class="hero-actions"><a class="btn btn-gold" href="${localizedHref("membership.html#join-form", getLanguage())}">${data.join}</a><a class="btn btn-outline" href="about.html${langQuery(getLanguage())}">${data.learnMore}</a></div>
        </div>
      </div>
    </section>
    <section class="section reveal"><div class="container"><div class="section-head"><div><p class="section-kicker">${h.aboutKicker}</p><h2 class="section-title">${h.aboutTitle}</h2><a class="btn btn-outline section-head-btn" href="about.html${langQuery(getLanguage())}">${h.aboutButton}</a></div><p class="section-copy">${h.aboutText}</p></div></div></section>
    <section class="section goal-section reveal"><div class="container"><div class="section-head"><div><p class="section-kicker">${h.goalKicker}</p><h2 class="section-title">${h.goalTitle}</h2></div><p class="section-copy">${h.goalText}</p></div>${goalMapBlock(data.goalItems)}</div></section>
    ${cardsBlock(h.directionsTitle, data.directions, 4, data, "", h.directionsKicker)}
    <section class="section section-soft reveal"><div class="container"><div class="section-head"><div><p class="section-kicker">${h.projectsKicker}</p><h2 class="section-title">${h.projectsTitle}</h2></div><a class="btn btn-outline" href="projects.html${langQuery(getLanguage())}">${data.allProjects}</a></div><div class="grid grid-3">${data.projects.map(project => projectCard(project, data)).join("")}</div></div></section>
    ${linkCardsBlock(h.psychologistsTitle, data.psychologists, 3, data)}
    ${linkCardsBlock(h.educationTitle, data.educationCards, 4, data, "section-soft")}
    <section class="section section-gold reveal"><div class="container"><div class="section-head"><div><p class="section-kicker">${h.partnershipKicker}</p><h2 class="section-title">${h.partnershipTitle}</h2></div><p class="section-copy">${h.partnershipText}</p></div><div class="section-actions"><a class="btn btn-primary" href="partnership.html${langQuery(getLanguage())}">${data.becomePartner}</a><a class="btn btn-outline" href="contacts.html${langQuery(getLanguage())}">${data.contactUs}</a></div></div></section>`;
}

function renderPage(data, pageKey) {
  const page = data.pages[pageKey] || data.pages.about;
  document.getElementById("main").innerHTML = `
    <section class="page-hero">
      <div class="container">
        <nav class="breadcrumbs" aria-label="${data.breadcrumbsLabel}"><a href="index.html${langQuery(getLanguage())}">${data.home}</a><span>/</span><span>${page.title}</span></nav>
        <h1 class="page-title">${page.title}</h1>
        <p class="lead">${page.lead}</p>
      </div>
    </section>
    <section class="section">
      <div class="container page-layout">
        <div class="content-panel">${page.sections.map(section => renderSection(section, data)).join("")}</div>
      </div>
    </section>`;
}

function goalMapBlock(items) {
  const nodes = items.map((item, index) => {
    const number = String(index + 1).padStart(2, "0");
    return `<article class="goal-node" style="--i:${index};" tabindex="0"><div class="goal-dot"><span>${number}</span></div><h3 class="goal-node-title">${item[0]}</h3><p class="goal-tooltip">${item[1]}</p></article>`;
  }).join("");
  return `<div class="goal-map" aria-label="Goal directions"><svg class="goal-map-line" viewBox="0 0 1200 170" preserveAspectRatio="none" aria-hidden="true"><path d="M40 82 C150 20 245 20 340 82 S525 144 620 82 805 20 900 82 1050 144 1160 82"/></svg><div class="goal-map-items">${nodes}</div></div>`;
}

function renderSection(section, data) {
  const type = section[0];
  if (type === "text") return textBlock(section[1], section[2], section[3] || "");
  if (type === "cards") return cardsBlock(section[1], section[2], section[3], data, section[5] || "", "", section[4]);
  if (type === "photo") return `<section class="reveal"><div class="photo-placeholder">${section[1]}</div></section>`;
  if (type === "timeline") return timelineBlock(section[1], data);
  if (type === "list") return listBlock(section[1], section[2], section[3] || "");
  if (type === "documents") return documentsBlock(section[1], data, section[2] || "");
  if (type === "contacts") return contactsBlock(data);
  if (type === "form") {
    const title = section[1] === "partnership" ? data.form.partnershipTitle : section[1] === "membership" ? data.form.membershipTitle : data.form.title;
    return contactForm(data, title, section[2] || "");
  }
  if (type === "projects") return projectsBlock(section[1], section[2], data);
  if (type === "linkCards") return linkCardsBlock(section[1], data[section[2]], section[3], data, "", false);
  if (type === "courses") return coursesBlock(section[1], data);
  return "";
}

function textBlock(title, text, id = "") {
  return `<section ${idAttr(id)} class="content-panel reveal"><h2 class="section-title">${title}</h2><p class="text-block">${text}</p></section>`;
}

function cardsBlock(title, items, columns = 3, data, id = "", kicker = "", people = false) {
  const cards = items.map((item, index) => {
    if (people) {
      const portrait = item[4]
        ? `<img src="${item[4]}" alt="${item[0]}">`
        : `<span>${item[3] || String(index + 1)}</span>`;
      return `<article class="card board-card"><div class="board-photo">${portrait}</div><h3>${item[0]}</h3><p>${item[1]}</p><small>${item[2] || ""}</small></article>`;
    }
    const icon = people ? `<div class="avatar-placeholder">${index + 1}</div>` : `<div class="card-icon">${String(index + 1).padStart(2, "0")}</div>`;
    return `<article class="card ${people ? "person-card" : ""}">${icon}<div><h3>${item[0]}</h3><p>${item[1]}</p></div></article>`;
  }).join("");
  return `<section ${idAttr(id)} class="${kicker ? "section " : "content-panel "}reveal"><div class="${kicker ? "container" : ""}">${kicker ? `<div class="section-head"><div><p class="section-kicker">${kicker}</p><h2 class="section-title">${title}</h2></div></div>` : `<h2 class="section-title">${title}</h2>`}<div class="grid grid-${columns}">${cards}</div></div></section>`;
}

function linkCardsBlock(title, items, columns = 3, data, extraClass = "", band = true) {
  const cards = items.map((item, index) => `<article class="card"><div class="card-icon">${String(index + 1).padStart(2, "0")}</div><h3>${item[0]}</h3><p>${item[1]}</p><a class="card-link" href="${localizedHref(item[2], getLanguage())}">${data.goTo}</a></article>`).join("");
  if (!band) {
    return `<section class="content-panel reveal"><h2 class="section-title">${title}</h2><div class="grid grid-${columns}">${cards}</div></section>`;
  }
  return `<section class="section ${extraClass} reveal"><div class="container"><div class="section-head"><div><p class="section-kicker">${title}</p><h2 class="section-title">${title}</h2></div></div><div class="grid grid-${columns}">${cards}</div></div></section>`;
}

function timelineBlock(items, data) {
  return `<section class="content-panel reveal"><h2 class="section-title">${data.keyStages}</h2><div class="timeline">${items.map(item => `<article class="timeline-item"><div class="timeline-date">${item[0]}</div><p>${item[1]}</p></article>`).join("")}</div></section>`;
}

function listBlock(title, items, id = "") {
  return `<section ${idAttr(id)} class="content-panel reveal"><h2 class="section-title">${title}</h2><ul class="list-clean">${items.map(item => `<li>${item}</li>`).join("")}</ul></section>`;
}

function documentsBlock(items, data, id = "") {
  return `<section ${idAttr(id)} class="content-panel reveal"><h2 class="section-title">${data.downloadMaterials}</h2><div class="grid">${items.map(item => {
    const href = item[2] || "#";
    return `<article class="document-row"><div class="pdf-icon">PDF</div><div><h3>${item[0]}</h3><p>${item[1]}</p></div><a class="btn btn-outline" href="${href}" aria-label="${data.download} ${item[0]}">${data.download}</a></article>`;
  }).join("")}</div></section>`;
}

function contactsBlock(data) {
  const email = data.contacts.find(item => item[0] === "Email")?.[1] || "";
  const phones = data.contacts.filter(item => item[0] === "Телефон" || item[0] === "Phone").map(item => item[1]);
  const address = data.contacts.find(item => item[0] === "Адреса" || item[0] === "Address")?.[1] || "";
  const phoneLabel = data.lang === "uk" ? "Телефони" : "Phones";
  const addressLabel = data.lang === "uk" ? "Адреса" : "Address";
  const items = [
    ["Email", email, "email"],
    [phoneLabel, phones, "phone"],
    [addressLabel, address, "text"]
  ].filter(item => Array.isArray(item[1]) ? item[1].length : item[1]);
  return `<section class="content-panel reveal"><h2 class="section-title">${data.quickContacts}</h2><div class="contact-grid">${items.map(item => contactCard(item)).join("")}</div></section>`;
}

function contactCard(item) {
  const [label, value, type] = item;
  const values = Array.isArray(value) ? value : [value];
  const lines = values.map(line => {
    if (type === "email") return `<a href="mailto:${line}">${line}</a>`;
    if (type === "phone") return `<a href="tel:+${line.replace(/\D/g, "")}">${line}</a>`;
    return `<span>${line}</span>`;
  }).join("");
  return `<article class="card contact-card"><h3>${label}</h3><div class="contact-lines">${lines}</div></article>`;
}

function projectsBlock(id, title, data) {
  return `<section id="${id}" class="content-panel reveal"><h2 class="section-title">${title}</h2><div class="grid grid-3">${data.projects.map(project => projectCard(project, data)).join("")}</div></section>`;
}

function projectCard(project, data) {
  const [label, className] = data.statuses[project[0]];
  return `<article class="card"><span class="status ${className}">${label}</span><h3>${project[1]}</h3><p>${project[2]}</p><a class="card-link" href="projects.html${langQuery(getLanguage())}">${data.details}</a></article>`;
}

function coursesBlock(items, data) {
  return `<section class="content-panel reveal"><h2 class="section-title">${data.currentPrograms}</h2><div class="grid grid-3">${items.map((item, index) => `<article class="card"><div class="card-icon">${String(index + 1).padStart(2, "0")}</div><h3>${item[0]}</h3><p><strong>${item[1]}</strong><br>${item[2]}</p><a class="card-link" href="#">${data.register}</a></article>`).join("")}</div></section>`;
}

function contactForm(data, title = data.form.title, id = "") {
  return `<section ${idAttr(id)} class="form-shell reveal"><h2 class="section-title">${title}</h2><form class="form-grid"><div class="field"><label for="name">${data.form.name}</label><input id="name" name="name" type="text" placeholder="${data.form.namePlaceholder}"></div><div class="field"><label for="email">${data.form.email}</label><input id="email" name="email" type="email" placeholder="name@example.com"></div><div class="field field-full"><label for="topic">${data.form.topic}</label><select id="topic" name="topic">${data.form.options.map(option => `<option>${option}</option>`).join("")}</select></div><div class="field field-full"><label for="message">${data.form.message}</label><textarea id="message" name="message" placeholder="${data.form.messagePlaceholder}"></textarea></div><div class="field field-full"><button class="btn btn-primary" type="submit">${data.form.submit}</button></div></form></section>`;
}

function idAttr(id) {
  return id ? `id="${id}"` : "";
}

function langQuery(lang) {
  return lang === DEFAULT_LANG ? "" : `?lang=${lang}`;
}

function localizedHref(href, lang) {
  const [path, hash = ""] = href.split("#");
  const query = langQuery(lang);
  return `${path}${query}${hash ? `#${hash}` : ""}`;
}

function bindInteractions(data, lang) {
  const toggle = document.querySelector(".menu-toggle");
  const panel = document.querySelector(".mobile-panel");
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open));
    toggle.setAttribute("aria-label", open ? data.openMenu : data.closeMenu);
    panel.classList.toggle("is-open", !open);
    document.body.classList.toggle("menu-open", !open);
  });

  document.querySelectorAll(".mobile-summary").forEach(button => {
    button.addEventListener("click", () => button.closest(".mobile-group").classList.toggle("is-open"));
  });

  document.querySelectorAll(".mobile-panel a").forEach(link => {
    link.addEventListener("click", () => {
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", data.openMenu);
      panel.classList.remove("is-open");
      document.body.classList.remove("menu-open");
    });
  });

  document.querySelectorAll("[data-lang]").forEach(button => {
    button.addEventListener("click", () => {
      const next = button.dataset.lang;
      if (next !== lang) setLanguage(next);
    });
  });

  document.querySelectorAll("form").forEach(form => {
    form.addEventListener("submit", event => {
      event.preventDefault();
      alert(data.form.thanks);
    });
  });
}

function revealOnScroll() {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach(item => item.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  items.forEach(item => observer.observe(item));
}

function scrollToPageAnchor() {
  const hash = window.location.hash.replace(/^#/, "");
  if (!hash || hash.includes(":")) return;
  requestAnimationFrame(() => document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" }));
}

renderSite();
