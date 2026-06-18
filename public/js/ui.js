document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
    navLinks.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => navLinks.classList.remove('open'))
    );
  }

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

// Persian-Engish Toggle
const i18n = {
  en: {
    nav: {
      whatWeDo: "What We Do",
      howItWorks: "How It Works",
      caseStudies: "Case Studies",
      team: "Team",
      submit: "Submit a Problem",
    },
    hero: {
      eyebrow: "University-Affiliated Research Center · Dept. of Mathematics",
      title: "Turning complex problems into practical solutions.",
      subtitle:
        "We translate difficult, real-world challenges into rigorous mathematical and computational work — then deliver answers people can actually act on.",
    },
    toggleLabel: "Switch to Persian",
    toggleText: "فارسی",
  },
  fa: {
    nav: {
      whatWeDo: "آنچه انجام می‌دهیم",
      howItWorks: "نحوه کار",
      caseStudies: "مطالعات موردی",
      team: "تیم",
      submit: "ارسال مسئله",
    },
    hero: {
      eyebrow: "مرکز پژوهشی وابسته به دانشگاه · گروه ریاضی",
      title: "تبدیل مسائل پیچیده به راه‌حل‌های عملی.",
      subtitle:
        "ما چالش‌های دشوار و واقعی را به کارهای دقیق ریاضی و محاسباتی تبدیل می‌کنیم — و سپس پاسخ‌هایی ارائه می‌دهیم که واقعاً قابل استفاده باشند.",
    },
    toggleLabel: "تغییر به انگلیسی",
    toggleText: "English",
  },
};

function setLanguage(lang) {
  const isFa = lang === "fa";
  const dict = i18n[lang];

  document.documentElement.lang = lang;
  document.documentElement.dir = isFa ? "rtl" : "ltr";

  // Navigation
  document.querySelector('a[href="#what-we-do"]').textContent = dict.nav.whatWeDo;
  document.querySelector('a[href="#how-it-works"]').textContent = dict.nav.howItWorks;
  document.querySelector('a[href="#case-studies"]').textContent = dict.nav.caseStudies;
  document.querySelector('a[href="#team"]').textContent = dict.nav.team;
  document.querySelector('a[href="#submit"]').textContent = dict.nav.submit;

  // Hero text example
  const heroEyebrow = document.querySelector(".hero .eyebrow");
  const heroTitle = document.querySelector(".hero h1");
  const heroSub = document.querySelector(".hero-sub");

  if (heroEyebrow) heroEyebrow.textContent = dict.hero.eyebrow;
  if (heroTitle) heroTitle.textContent = dict.hero.title;
  if (heroSub) heroSub.textContent = dict.hero.subtitle;

  // Toggle
  const langToggle = document.getElementById("langToggle");
  if (langToggle) {
    langToggle.textContent = dict.toggleText;
    langToggle.setAttribute("aria-label", dict.toggleLabel);
  }

  localStorage.setItem("site-lang", lang);
}

document.getElementById("langToggle")?.addEventListener("click", () => {
  const current = document.documentElement.lang || "en";
  setLanguage(current === "en" ? "fa" : "en");
});

document.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("site-lang") || "en";
  setLanguage(saved);
});


/// TRANSLATION:
/*
// English to Persian translation map for visible page text
const translations = {
  en: {
    "PSMMC — Problem Solving & Mathematical Modeling Center":
      "PSMMC — Problem Solving & Mathematical Modeling Center",
    "A university-affiliated center that translates complex real-world problems into rigorous mathematical and computational solutions.":
      "A university-affiliated center that translates complex real-world problems into rigorous mathematical and computational solutions.",

    "What We Do": "What We Do",
    "How It Works": "How It Works",
    "Case Studies": "Case Studies",
    "Team": "Team",
    "Submit a Problem": "Submit a Problem",
    "Toggle menu": "Toggle menu",

    "University-Affiliated Research Center · Dept. of Mathematics":
      "University-Affiliated Research Center · Dept. of Mathematics",
    "Turning complex problems into practical solutions.":
      "Turning complex problems into practical solutions.",
    "We translate difficult, real-world challenges into rigorous mathematical and computational work — then deliver answers people can actually act on.":
      "We translate difficult, real-world challenges into rigorous mathematical and computational work — then deliver answers people can actually act on.",
    "Schedule a Consultation": "Schedule a Consultation",

    "Real-World Challenge": "Real-World Challenge",
    "Problem Formulation": "Problem Formulation",
    "Mathematical Model": "Mathematical Model",
    "Analysis & Computation": "Analysis & Computation",
    "Actionable Solution": "Actionable Solution",

    Optimization: "Optimization",
    "Statistics & Data Science": "Statistics & Data Science",
    "Scientific Computing": "Scientific Computing",
    "Operations Research": "Operations Research",
    "Machine Learning": "Machine Learning",
    "Decision Support": "Decision Support",

    "Areas of expertise": "Areas of expertise",
    "A single front door into a wide range of mathematical and computational disciplines — assembled into the right team for each problem.":
      "A single front door into a wide range of mathematical and computational disciplines — assembled into the right team for each problem.",

    "Mathematical Modeling": "Mathematical Modeling",
    "Translating real-world systems into precise equations and structures.":
      "Translating real-world systems into precise equations and structures.",
    "Finding the best decision among many feasible options.":
      "Finding the best decision among many feasible options.",
    "Improving how complex systems and processes run.":
      "Improving how complex systems and processes run.",
    "Statistics & Data Analytics": "Statistics & Data Analytics",
    "Extracting reliable insight from noisy, real-world data.":
      "Extracting reliable insight from noisy, real-world data.",
    "Scientific Computing": "Scientific Computing",
    "Solving large-scale problems with numerical methods and code.":
      "Solving large-scale problems with numerical methods and code.",
    "Numerical Analysis": "Numerical Analysis",
    "Ensuring computational solutions stay accurate and stable.":
      "Ensuring computational solutions stay accurate and stable.",
    "Simulation": "Simulation",
    "Testing scenarios safely before committing real resources.":
      "Testing scenarios safely before committing real resources.",
    Forecasting: "Forecasting",
    "Anticipating demand, risk, and future system behavior.":
      "Anticipating demand, risk, and future system behavior.",
    "Machine Learning & AI": "Machine Learning & AI",
    "Learning patterns from data to support better decisions.":
      "Learning patterns from data to support better decisions.",
    "Network Science": "Network Science",
    "Understanding connectivity, flow, and structure in complex systems.":
      "Understanding connectivity, flow, and structure in complex systems.",
    "Decision Support Systems": "Decision Support Systems",
    "Turning analysis into tools people actually use.":
      "Turning analysis into tools people actually use.",
    "Scheduling & Resource Allocation": "Scheduling & Resource Allocation",
    "Assigning limited resources where they matter most.":
      "Assigning limited resources where they matter most.",
    "Dynamical Systems": "Dynamical Systems",
    "Modeling how systems evolve and change over time.":
      "Modeling how systems evolve and change over time.",
    "Financial Mathematics": "Financial Mathematics",
    "Quantifying risk and value in financial decisions.":
      "Quantifying risk and value in financial decisions.",
    "Industrial Mathematics": "Industrial Mathematics",
    "Applying mathematics directly to industry-scale challenges.":
      "Applying mathematics directly to industry-scale challenges.",

    "From first contact to closeout": "From first contact to closeout",
    "A clear, structured path — every problem is examined, classified, scoped, and resolved through the same disciplined process.":
      "A clear, structured path — every problem is examined, classified, scoped, and resolved through the same disciplined process.",
    "Submit Request": "Submit Request",
    "Describe the problem through a short online form.":
      "Describe the problem through a short online form.",
    "Discovery Meeting": "Discovery Meeting",
    "A 15–30 minute conversation to understand your objectives.":
      "A 15–30 minute conversation to understand your objectives.",
    Triage: "Triage",
    "Classified as a quick consult, short project, long-term collaboration, or referral.":
      "Classified as a quick consult, short project, long-term collaboration, or referral.",
    "Scope & Agreement": "Scope & Agreement",
    "Deliverables, timeline, confidentiality, IP, and data access defined.":
      "Deliverables, timeline, confidentiality, IP, and data access defined.",
    "Project Execution": "Project Execution",
    "An expert team works through the analysis.":
      "An expert team works through the analysis.",
    "Validation & Handoff": "Validation & Handoff",
    "Reports, models, software, and recommendations delivered.":
      "Reports, models, software, and recommendations delivered.",
    Closeout: "Closeout",
    "Feedback gathered, work archived, impact tracked.":
      "Feedback gathered, work archived, impact tracked.",

    "Built for academia, industry, and government alike":
      "Built for academia, industry, and government alike",
    "Academic Collaboration": "Academic Collaboration",
    "Cross-department partnerships that bring mathematical depth to research already underway.":
      "Cross-department partnerships that bring mathematical depth to research already underway.",
    Faculty: "Faculty",
    Researchers: "Researchers",
    "Graduate Students": "Graduate Students",
    Departments: "Departments",
    "Industry Partnerships": "Industry Partnerships",
    "Applied analysis for operational, strategic, and product challenges.":
      "Applied analysis for operational, strategic, and product challenges.",
    Companies: "Companies",
    Startups: "Startups",
    Manufacturers: "Manufacturers",
    "Government & Public Sector": "Government & Public Sector",
    "Evidence-based modeling for public systems, services, and policy questions.":
      "Evidence-based modeling for public systems, services, and policy questions.",
    Agencies: "Agencies",
    NGOs: "NGOs",
    Hospitals: "Hospitals",

    "Example Problems": "Example Problems",
    "The kind of questions we take on": "The kind of questions we take on",
    "Hospital shift scheduling": "Hospital shift scheduling",
    "Transportation optimization": "Transportation optimization",
    "Resource allocation": "Resource allocation",
    "Demand forecasting": "Demand forecasting",
    "Epidemiological modeling": "Epidemiological modeling",
    "Environmental simulation": "Environmental simulation",
    "Manufacturing optimization": "Manufacturing optimization",
    "Financial risk analysis": "Financial risk analysis",
    "Research data analysis": "Research data analysis",

    "Representative project concepts": "Representative project concepts",
    "The Center is newly established — these are illustrative project types we are built to take on, not a record of completed engagements yet.":
      "The Center is newly established — these are illustrative project types we are built to take on, not a record of completed engagements yet.",
    Healthcare: "Healthcare",
    "Hospital Scheduling Optimization": "Hospital Scheduling Optimization",
    "Balancing staff availability, shift fairness, and patient coverage using constraint-based optimization.":
      "Balancing staff availability, shift fairness, and patient coverage using constraint-based optimization.",
    Concept: "Concept",
    "Higher Education": "Higher Education",
    "University Timetable Optimization": "University Timetable Optimization",
    "Generating conflict-free, room-efficient course schedules across departments.":
      "Generating conflict-free, room-efficient course schedules across departments.",
    Environment: "Environment",
    "Water Resource Modeling": "Water Resource Modeling",
    "Simulating supply, demand, and distribution under varying climate scenarios.":
      "Simulating supply, demand, and distribution under varying climate scenarios.",
    Logistics: "Logistics",
    "Supply Chain Simulation": "Supply Chain Simulation",
    "Stress-testing distribution networks against disruption and demand volatility.":
      "Stress-testing distribution networks against disruption and demand volatility.",
    "Healthcare · AI": "Healthcare · AI",
    "AI for Healthcare": "AI for Healthcare",
    "Predictive models supporting triage, diagnosis support, and capacity planning.":
      "Predictive models supporting triage, diagnosis support, and capacity planning.",

    "Behind every healthcare system, transportation network, supply chain, financial market, and scientific discovery lies a mathematical structure waiting to be understood.":
      "Behind every healthcare system, transportation network, supply chain, financial market, and scientific discovery lies a mathematical structure waiting to be understood.",
    "We exist to reveal that structure — and turn it into better decisions.":
      "We exist to reveal that structure — and turn it into better decisions.",

    "University Supported": "University Supported",
    "Interdisciplinary Team": "Interdisciplinary Team",
    "Research Driven": "Research Driven",
    "Launching 2026": "Launching 2026",

    "Who you'll work with": "Who you'll work with",
    "Names to follow as the Center's roster is finalized — the structure below reflects how every engagement is staffed.":
      "Names to follow as the Center's roster is finalized — the structure below reflects how every engagement is staffed.",
    Director: "Director",
    "Name to be announced": "Name to be announced",
    Leadership: "Leadership",
    Strategy: "Strategy",
    "Faculty Consultants": "Faculty Consultants",
    "Roster in formation": "Roster in formation",
    Statistics: "Statistics",
    "Numerical Analysis": "Numerical Analysis",
    "Graduate Researchers": "Graduate Researchers",
    "Computational Math": "Computational Math",
    AI: "AI",
    "Student Fellows": "Student Fellows",
    "Applications opening soon": "Applications opening soon",

    "Tell us what you're working on": "Tell us what you're working on",
    "The most important step toward a solution is understanding the problem correctly. This goes to our intake team — expect a reply within a few business days.":
      "The most important step toward a solution is understanding the problem correctly. This goes to our intake team — expect a reply within a few business days.",
    "Response time": "Response time",
    "2–3 business days": "2–3 business days",
    "Discovery call": "Discovery call",
    "15–30 minutes": "15–30 minutes",
    Confidentiality: "Confidentiality",
    "NDA available on request": "NDA available on request",
    Name: "Name",
    "Organization / Department": "Organization / Department",
    Email: "Email",
    "Phone (optional)": "Phone (optional)",
    "Problem Description": "Problem Description",
    "What are you trying to solve?": "What are you trying to solve?",
    "Desired Outcome": "Desired Outcome",
    "What would a good result look like?": "What would a good result look like?",
    Timeline: "Timeline",
    Flexible: "Flexible",
    "Within 1 month": "Within 1 month",
    "1–3 months": "1–3 months",
    "3+ months": "3+ months",
    "Type of Support Requested": "Type of Support Requested",
    "Quick consultation": "Quick consultation",
    "Short project": "Short project",
    "Long-term collaboration": "Long-term collaboration",
    "Not sure yet": "Not sure yet",
    "Available Data": "Available Data",
    "e.g. spreadsheets, sensor logs, none yet":
      "e.g. spreadsheets, sensor logs, none yet",
    "Confidentiality Requirements": "Confidentiality Requirements",
    "e.g. NDA required, public research, no restrictions":
      "e.g. NDA required, public research, no restrictions",
    "Submit Project Request": "Submit Project Request",
    "Request received.": "Request received.",
    "Thank you — our intake team will follow up by email within 2–3 business days.":
      "Thank you — our intake team will follow up by email within 2–3 business days.",

    "Get in Touch": "Get in Touch",
    "Have a challenging problem?": "Have a challenging problem?",
    "Contact Our Team": "Contact Our Team",

    PSMMC: "PSMMC",
    "A university-backed center translating complex problems into mathematical and computational solutions.":
      "A university-backed center translating complex problems into mathematical and computational solutions.",
    Center: "Center",
    About: "About",
    Services: "Services",
    Work: "Work",
    Contact: "Contact",
    "Schedule a call": "Schedule a call",
    "© [year] Problem Solving & Mathematical Modeling Center · Department of Mathematics":
      "© [year] Problem Solving & Mathematical Modeling Center · Department of Mathematics",
    "Scope & Policies · Data Governance · Confidentiality":
      "Scope & Policies · Data Governance · Confidentiality",
  },

  fa: {
    "PSMMC — Problem Solving & Mathematical Modeling Center":
      "PSMMC — مرکز حل مسئله و مدل‌سازی ریاضی",
    "A university-affiliated center that translates complex real-world problems into rigorous mathematical and computational solutions.":
      "مرکزی وابسته به دانشگاه که مسائل پیچیده دنیای واقعی را به راه‌حل‌های دقیق ریاضی و محاسباتی تبدیل می‌کند.",

    "What We Do": "خدمات ما",
    "How It Works": "فرایند کار",
    "Case Studies": "مطالعه‌های موردی",
    "Team": "تیم",
    "Submit a Problem": "ارسال یک مسئله",
    "Toggle menu": "باز کردن منو",

    "University-Affiliated Research Center · Dept. of Mathematics":
      "مرکز پژوهشی وابسته به دانشگاه · گروه ریاضیات",
    "Turning complex problems into practical solutions.":
      "تبدیل مسائل پیچیده به راه‌حل‌های عملی.",
    "We translate difficult, real-world challenges into rigorous mathematical and computational work — then deliver answers people can actually act on.":
      "ما چالش‌های دشوار و واقعی را به کارهای دقیق ریاضی و محاسباتی تبدیل می‌کنیم — و سپس پاسخ‌هایی ارائه می‌دهیم که واقعاً بتوان بر اساس آن‌ها عمل کرد.",
    "Schedule a Consultation": "رزرو جلسه مشاوره",

    "Real-World Challenge": "چالش دنیای واقعی",
    "Problem Formulation": "صورت‌بندی مسئله",
    "Mathematical Model": "مدل ریاضی",
    "Analysis & Computation": "تحلیل و محاسبات",
    "Actionable Solution": "راه‌حل قابل اجرا",

    Optimization: "بهینه‌سازی",
    "Statistics & Data Science": "آمار و علم داده",
    "Scientific Computing": "محاسبات علمی",
    "Operations Research": "تحقیق در عملیات",
    "Machine Learning": "یادگیری ماشین",
    "Decision Support": "پشتیبانی تصمیم",

    "Areas of expertise": "حوزه‌های تخصص",
    "A single front door into a wide range of mathematical and computational disciplines — assembled into the right team for each problem.":
      "یک درگاه واحد برای دسترسی به طیف گسترده‌ای از شاخه‌های ریاضی و محاسباتی — و تشکیل تیم مناسب برای هر مسئله.",

    "Mathematical Modeling": "مدل‌سازی ریاضی",
    "Translating real-world systems into precise equations and structures.":
      "تبدیل سامانه‌های دنیای واقعی به معادلات و ساختارهای دقیق.",
    "Finding the best decision among many feasible options.":
      "یافتن بهترین تصمیم از میان گزینه‌های ممکن متعدد.",
    "Improving how complex systems and processes run.":
      "بهبود نحوه عملکرد سامانه‌ها و فرایندهای پیچیده.",
    "Statistics & Data Analytics": "آمار و تحلیل داده",
    "Extracting reliable insight from noisy, real-world data.":
      "استخراج بینش قابل‌اعتماد از داده‌های واقعی و نویزی.",
    "Scientific Computing": "محاسبات علمی",
    "Solving large-scale problems with numerical methods and code.":
      "حل مسائل مقیاس‌بالا با روش‌های عددی و کدنویسی.",
    "Numerical Analysis": "تحلیل عددی",
    "Ensuring computational solutions stay accurate and stable.":
      "اطمینان از دقیق و پایدار ماندن راه‌حل‌های محاسباتی.",
    "Simulation": "شبیه‌سازی",
    "Testing scenarios safely before committing real resources.":
      "آزمودن سناریوها به‌صورت ایمن پیش از تخصیص منابع واقعی.",
    Forecasting: "پیش‌بینی",
    "Anticipating demand, risk, and future system behavior.":
      "پیش‌بینی تقاضا، ریسک و رفتار آینده سامانه.",
    "Machine Learning & AI": "یادگیری ماشین و هوش مصنوعی",
    "Learning patterns from data to support better decisions.":
      "یادگیری الگوها از داده‌ها برای پشتیبانی از تصمیم‌های بهتر.",
    "Network Science": "علم شبکه",
    "Understanding connectivity, flow, and structure in complex systems.":
      "درک اتصال، جریان و ساختار در سامانه‌های پیچیده.",
    "Decision Support Systems": "سامانه‌های پشتیبانی تصمیم",
    "Turning analysis into tools people actually use.":
      "تبدیل تحلیل به ابزارهایی که واقعاً توسط افراد استفاده می‌شوند.",
    "Scheduling & Resource Allocation": "زمان‌بندی و تخصیص منابع",
    "Assigning limited resources where they matter most.":
      "تخصیص منابع محدود به جایی که بیشترین اهمیت را دارند.",
    "Dynamical Systems": "سامانه‌های دینامیکی",
    "Modeling how systems evolve and change over time.":
      "مدل‌سازی نحوه تحول و تغییر سامانه‌ها در طول زمان.",
    "Financial Mathematics": "ریاضیات مالی",
    "Quantifying risk and value in financial decisions.":
      "کمی‌سازی ریسک و ارزش در تصمیم‌های مالی.",
    "Industrial Mathematics": "ریاضیات صنعتی",
    "Applying mathematics directly to industry-scale challenges.":
      "به‌کارگیری مستقیم ریاضیات برای چالش‌های در مقیاس صنعتی.",

    "From first contact to closeout": "از اولین تماس تا جمع‌بندی نهایی",
    "A clear, structured path — every problem is examined, classified, scoped, and resolved through the same disciplined process.":
      "مسیری روشن و ساختارمند — هر مسئله با یک فرایند منظم و یکسان بررسی، طبقه‌بندی، محدوده‌بندی و حل می‌شود.",
    "Submit Request": "ثبت درخواست",
    "Describe the problem through a short online form.":
      "مسئله را از طریق یک فرم کوتاه آنلاین توضیح دهید.",
    "Discovery Meeting": "جلسه آشنایی و بررسی اولیه",
    "A 15–30 minute conversation to understand your objectives.":
      "یک گفت‌وگوی ۱۵ تا ۳۰ دقیقه‌ای برای درک اهداف شما.",
    Triage: "ارزیابی اولیه",
    "Classified as a quick consult, short project, long-term collaboration, or referral.":
      "به‌عنوان مشاوره سریع، پروژه کوتاه، همکاری بلندمدت یا ارجاع طبقه‌بندی می‌شود.",
    "Scope & Agreement": "تعیین دامنه و توافق",
    "Deliverables, timeline, confidentiality, IP, and data access defined.":
      "خروجی‌ها، زمان‌بندی، محرمانگی، مالکیت فکری و دسترسی به داده‌ها مشخص می‌شود.",
    "Project Execution": "اجرای پروژه",
    "An expert team works through the analysis.":
      "یک تیم متخصص روی تحلیل کار می‌کند.",
    "Validation & Handoff": "اعتبارسنجی و تحویل",
    "Reports, models, software, and recommendations delivered.":
      "گزارش‌ها، مدل‌ها، نرم‌افزارها و توصیه‌ها تحویل داده می‌شوند.",
    Closeout: "جمع‌بندی نهایی",
    "Feedback gathered, work archived, impact tracked.":
      "بازخورد جمع‌آوری می‌شود، کار بایگانی می‌شود و اثرگذاری پیگیری می‌شود.",

    "Built for academia, industry, and government alike":
      "طراحی‌شده برای دانشگاه، صنعت و دولت به یک اندازه",
    "Academic Collaboration": "همکاری‌های دانشگاهی",
    "Cross-department partnerships that bring mathematical depth to research already underway.":
      "همکاری‌های بین‌دپارتمانی که به پژوهش‌های در حال انجام عمق ریاضی می‌بخشند.",
    Faculty: "اعضای هیئت علمی",
    Researchers: "پژوهشگران",
    "Graduate Students": "دانشجویان تحصیلات تکمیلی",
    Departments: "دانشکده‌ها / گروه‌ها",
    "Industry Partnerships": "مشارکت‌های صنعتی",
    "Applied analysis for operational, strategic, and product challenges.":
      "تحلیل کاربردی برای چالش‌های عملیاتی، راهبردی و محصول.",
    Companies: "شرکت‌ها",
    Startups: "استارتاپ‌ها",
    Manufacturers: "تولیدکنندگان",
    "Government & Public Sector": "دولت و بخش عمومی",
    "Evidence-based modeling for public systems, services, and policy questions.":
      "مدل‌سازی مبتنی بر شواهد برای سامانه‌های عمومی، خدمات و پرسش‌های سیاست‌گذاری.",
    Agencies: "سازمان‌ها",
    NGOs: "سازمان‌های مردم‌نهاد",
    Hospitals: "بیمارستان‌ها",

    "Example Problems": "نمونه مسائل",
    "The kind of questions we take on": "از همان نوع پرسش‌هایی که می‌پذیریم",
    "Hospital shift scheduling": "زمان‌بندی شیفت بیمارستان",
    "Transportation optimization": "بهینه‌سازی حمل‌ونقل",
    "Resource allocation": "تخصیص منابع",
    "Demand forecasting": "پیش‌بینی تقاضا",
    "Epidemiological modeling": "مدل‌سازی اپیدمیولوژیک",
    "Environmental simulation": "شبیه‌سازی محیط‌زیستی",
    "Manufacturing optimization": "بهینه‌سازی تولید",
    "Financial risk analysis": "تحلیل ریسک مالی",
    "Research data analysis": "تحلیل داده‌های پژوهشی",

    "Representative project concepts": "نمونه مفهومی پروژه‌ها",
    "The Center is newly established — these are illustrative project types we are built to take on, not a record of completed engagements yet.":
      "این مرکز به‌تازگی تأسیس شده است — موارد زیر انواع پروژه‌های نمونه‌ای هستند که برای انجام آن‌ها آماده‌ایم، نه فهرستی از همکاری‌های انجام‌شده.",
    Healthcare: "سلامت",
    "Hospital Scheduling Optimization": "بهینه‌سازی زمان‌بندی بیمارستان",
    "Balancing staff availability, shift fairness, and patient coverage using constraint-based optimization.":
      "ایجاد تعادل میان دسترسی کارکنان، عدالت در شیفت‌ها و پوشش بیماران با استفاده از بهینه‌سازی مبتنی بر قیود.",
    Concept: "مفهوم",
    "Higher Education": "آموزش عالی",
    "University Timetable Optimization": "بهینه‌سازی برنامه هفتگی دانشگاه",
    "Generating conflict-free, room-efficient course schedules across departments.":
      "تولید برنامه‌های درسی بدون تداخل و بهینه از نظر استفاده از کلاس‌ها در میان گروه‌های مختلف.",
    Environment: "محیط‌زیست",
    "Water Resource Modeling": "مدل‌سازی منابع آب",
    "Simulating supply, demand, and distribution under varying climate scenarios.":
      "شبیه‌سازی عرضه، تقاضا و توزیع در سناریوهای اقلیمی مختلف.",
    Logistics: "لجستیک",
    "Supply Chain Simulation": "شبیه‌سازی زنجیره تأمین",
    "Stress-testing distribution networks against disruption and demand volatility.":
      "آزمودن تاب‌آوری شبکه‌های توزیع در برابر اختلال و نوسان تقاضا.",
    "Healthcare · AI": "سلامت · هوش مصنوعی",
    "AI for Healthcare": "هوش مصنوعی برای سلامت",
    "Predictive models supporting triage, diagnosis support, and capacity planning.":
      "مدل‌های پیش‌بینی‌کننده برای پشتیبانی از تریاژ، کمک به تشخیص و برنامه‌ریزی ظرفیت.",

    "Behind every healthcare system, transportation network, supply chain, financial market, and scientific discovery lies a mathematical structure waiting to be understood.":
      "پشت هر سامانه سلامت، شبکه حمل‌ونقل، زنجیره تأمین، بازار مالی و کشف علمی، ساختاری ریاضی نهفته است که منتظر درک شدن است.",
    "We exist to reveal that structure — and turn it into better decisions.":
      "ما برای آشکار کردن آن ساختار وجود داریم — و برای تبدیل آن به تصمیم‌های بهتر.",

    "University Supported": "مورد حمایت دانشگاه",
    "Interdisciplinary Team": "تیم میان‌رشته‌ای",
    "Research Driven": "مبتنی بر پژوهش",
    "Launching 2026": "آغاز فعالیت در ۲۰۲۶",

    "Who you'll work with": "با چه کسانی کار خواهید کرد",
    "Names to follow as the Center's roster is finalized — the structure below reflects how every engagement is staffed.":
      "نام‌ها پس از نهایی شدن فهرست اعضای مرکز اعلام خواهند شد — ساختار زیر نشان می‌دهد هر پروژه چگونه تیم‌بندی می‌شود.",
    Director: "مدیر",
    "Name to be announced": "نام در آینده اعلام می‌شود",
    Leadership: "رهبری",
    Strategy: "راهبرد",
    "Faculty Consultants": "مشاوران هیئت علمی",
    "Roster in formation": "فهرست در حال تکمیل",
    Statistics: "آمار",
    "Numerical Analysis": "تحلیل عددی",
    "Graduate Researchers": "پژوهشگران تحصیلات تکمیلی",
    "Computational Math": "ریاضیات محاسباتی",
    AI: "هوش مصنوعی",
    "Student Fellows": "همکاران دانشجویی",
    "Applications opening soon": "ثبت‌نام به‌زودی آغاز می‌شود",

    "Tell us what you're working on": "به ما بگویید روی چه چیزی کار می‌کنید",
    "The most important step toward a solution is understanding the problem correctly. This goes to our intake team — expect a reply within a few business days.":
      "مهم‌ترین گام به‌سوی راه‌حل، درک درست مسئله است. این فرم به تیم پذیرش ما ارسال می‌شود — انتظار پاسخ را ظرف چند روز کاری داشته باشید.",
    "Response time": "زمان پاسخ",
    "2–3 business days": "۲ تا ۳ روز کاری",
    "Discovery call": "تماس اولیه",
    "15–30 minutes": "۱۵ تا ۳۰ دقیقه",
    Confidentiality: "محرمانگی",
    "NDA available on request": "توافق‌نامه محرمانگی در صورت درخواست",
    Name: "نام",
    "Organization / Department": "سازمان / دپارتمان",
    Email: "ایمیل",
    "Phone (optional)": "تلفن (اختیاری)",
    "Problem Description": "توضیح مسئله",
    "What are you trying to solve?": "چه چیزی را می‌خواهید حل کنید؟",
    "Desired Outcome": "نتیجه مطلوب",
    "What would a good result look like?": "یک نتیجه خوب از نظر شما چه شکلی دارد؟",
    Timeline: "زمان‌بندی",
    Flexible: "انعطاف‌پذیر",
    "Within 1 month": "طی ۱ ماه",
    "1–3 months": "۱ تا ۳ ماه",
    "3+ months": "بیش از ۳ ماه",
    "Type of Support Requested": "نوع پشتیبانی درخواستی",
    "Quick consultation": "مشاوره سریع",
    "Short project": "پروژه کوتاه",
    "Long-term collaboration": "همکاری بلندمدت",
    "Not sure yet": "هنوز مطمئن نیستم",
    "Available Data": "داده‌های موجود",
    "e.g. spreadsheets, sensor logs, none yet":
      "مثلاً فایل‌های اکسل، گزارش‌های حسگر، یا هنوز هیچ‌کدام",
    "Confidentiality Requirements": "الزامات محرمانگی",
    "e.g. NDA required, public research, no restrictions":
      "مثلاً نیاز به NDA، پژوهش عمومی، بدون محدودیت",
    "Submit Project Request": "ارسال درخواست پروژه",
    "Request received.": "درخواست دریافت شد.",
    "Thank you — our intake team will follow up by email within 2–3 business days.":
      "سپاسگزاریم — تیم پذیرش ما ظرف ۲ تا ۳ روز کاری از طریق ایمیل پیگیری خواهد کرد.",

    "Get in Touch": "تماس با ما",
    "Have a challenging problem?": "مسئله‌ای چالش‌برانگیز دارید؟",
    "Contact Our Team": "تماس با تیم ما",

    PSMMC: "PSMMC",
    "A university-backed center translating complex problems into mathematical and computational solutions.":
      "مرکزی مورد حمایت دانشگاه که مسائل پیچیده را به راه‌حل‌های ریاضی و محاسباتی تبدیل می‌کند.",
    Center: "مرکز",
    About: "درباره",
    Services: "خدمات",
    Work: "همکاری‌ها",
    Contact: "تماس",
    "Schedule a call": "زمان‌بندی تماس",
    "© [year] Problem Solving & Mathematical Modeling Center · Department of Mathematics":
      "© [year] مرکز حل مسئله و مدل‌سازی ریاضی · گروه ریاضیات",
    "Scope & Policies · Data Governance · Confidentiality":
      "دامنه و سیاست‌ها · حاکمیت داده · محرمانگی",
  },
};


function setLanguage(lang) {
  const root = document.documentElement;
  const body = document.body;
  const isPersian = lang === 'fa';

  // Save preference
  localStorage.setItem('language', lang);

  // Set document direction and language
  root.lang = lang;
  root.dir = isPersian ? 'rtl' : 'ltr';
  body.classList.toggle('rtl', isPersian);
  body.classList.toggle('ltr', !isPersian);

  // Update any element with [data-i18n]
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    const value = translations[lang] && translations[lang][key];

    if (value !== undefined) {
      el.textContent = value;
    }
  });

  // Update placeholders with [data-i18n-placeholder]
  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    const key = el.getAttribute('data-i18n-placeholder');
    const value = translations[lang] && translations[lang][key];

    if (value !== undefined) {
      el.setAttribute('placeholder', value);
    }
  });

  // Update button states if you have a language toggle
  document.querySelectorAll('[data-lang]').forEach((btn) => {
    const active = btn.getAttribute('data-lang') === lang;
    btn.classList.toggle('active', active);
    btn.setAttribute('aria-pressed', active ? 'true' : 'false');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
    navLinks.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => navLinks.classList.remove('open'))
    );
  }

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Load saved language or default to English
  const savedLang = localStorage.getItem('language') || 'en';
  setLanguage(savedLang);

  // Wire language buttons
  document.querySelectorAll('[data-lang]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang');
      setLanguage(lang);
    });
  });
});
*/