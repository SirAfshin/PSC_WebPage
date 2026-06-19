/**
 * i18n.js — bilingual (English / Persian) support for the PSC site.
 *
 * How it works:
 *  - Every translatable element in index.html carries a data-i18n="<key>"
 *    attribute. The key is simply the canonical English text.
 *  - translations.en is the identity map (English -> English) and
 *    translations.fa is the Persian translation of every key.
 *  - applyLanguage(lang) walks the DOM once and rewrites text content,
 *    placeholders, aria-labels, <title>, and <meta name="description">.
 *  - The chosen language is persisted in localStorage so it survives
 *    page reloads and repeat visits.
 *
 * To add a new translatable string elsewhere on the page:
 *   1. Add data-i18n="Your English Sentence" to the element.
 *   2. Add "Your English Sentence": "..." to BOTH translations.en
 *      (identity) and translations.fa (Persian) below.
 */

(function () {
  const STORAGE_KEY = 'site-lang';

  const translations = {
    en: {
      /* ---------- Meta ---------- */
      'meta.title': 'PSC — Problem Solving Center',
      'meta.description':
        'A university-affiliated center that translates complex real-world problems into rigorous mathematical and computational solutions.',

      /* ---------- Nav ---------- */
      'What We Do': 'What We Do',
      'How It Works': 'How It Works',
      'Case Studies': 'Case Studies',
      Team: 'Team',
      'Submit a Problem': 'Submit a Problem',
      'Toggle menu': 'Toggle menu',

      /* ---------- Hero ---------- */
      'University-Affiliated Research Center · Dept. of Mathematics':
        'University-Affiliated Research Center · Dept. of Mathematics',
      heroTitlePre: 'Turning complex problems into ',
      heroTitleEm: 'practical',
      heroTitlePost: ' solutions.',
      'We translate difficult, real-world challenges into rigorous mathematical and computational work — then deliver answers people can actually act on.':
        'We translate difficult, real-world challenges into rigorous mathematical and computational work — then deliver answers people can actually act on.',
      'Schedule a Consultation': 'Schedule a Consultation',

      'Real-World Challenge': 'Real-World Challenge',
      'Problem Formulation': 'Problem Formulation',
      'Mathematical Model': 'Mathematical Model',
      'Analysis & Computation': 'Analysis & Computation',
      'Actionable Solution': 'Actionable Solution',

      Optimization: 'Optimization',
      'Statistics & Data Science': 'Statistics & Data Science',
      'Scientific Computing': 'Scientific Computing',
      'Operations Research': 'Operations Research',
      'Machine Learning': 'Machine Learning',
      'Decision Support': 'Decision Support',

      /* ---------- What We Do ---------- */
      'Areas of expertise': 'Areas of expertise',
      'A single front door into a wide range of mathematical and computational disciplines — assembled into the right team for each problem.':
        'A single front door into a wide range of mathematical and computational disciplines — assembled into the right team for each problem.',

      'Mathematical Modeling': 'Mathematical Modeling',
      'Translating real-world systems into precise equations and structures.':
        'Translating real-world systems into precise equations and structures.',
      'Finding the best decision among many feasible options.':
        'Finding the best decision among many feasible options.',
      'Improving how complex systems and processes run.':
        'Improving how complex systems and processes run.',
      'Statistics & Data Analytics': 'Statistics & Data Analytics',
      'Extracting reliable insight from noisy, real-world data.':
        'Extracting reliable insight from noisy, real-world data.',
      'Solving large-scale problems with numerical methods and code.':
        'Solving large-scale problems with numerical methods and code.',
      'Numerical Analysis': 'Numerical Analysis',
      'Ensuring computational solutions stay accurate and stable.':
        'Ensuring computational solutions stay accurate and stable.',
      Simulation: 'Simulation',
      'Testing scenarios safely before committing real resources.':
        'Testing scenarios safely before committing real resources.',
      Forecasting: 'Forecasting',
      'Anticipating demand, risk, and future system behavior.':
        'Anticipating demand, risk, and future system behavior.',
      'Machine Learning & AI': 'Machine Learning & AI',
      'Learning patterns from data to support better decisions.':
        'Learning patterns from data to support better decisions.',
      'Network Science': 'Network Science',
      'Understanding connectivity, flow, and structure in complex systems.':
        'Understanding connectivity, flow, and structure in complex systems.',
      'Decision Support Systems': 'Decision Support Systems',
      'Turning analysis into tools people actually use.':
        'Turning analysis into tools people actually use.',
      'Scheduling & Resource Allocation': 'Scheduling & Resource Allocation',
      'Assigning limited resources where they matter most.':
        'Assigning limited resources where they matter most.',
      'Dynamical Systems': 'Dynamical Systems',
      'Modeling how systems evolve and change over time.':
        'Modeling how systems evolve and change over time.',
      'Financial Mathematics': 'Financial Mathematics',
      'Quantifying risk and value in financial decisions.':
        'Quantifying risk and value in financial decisions.',
      'Industrial Mathematics': 'Industrial Mathematics',
      'Applying mathematics directly to industry-scale challenges.':
        'Applying mathematics directly to industry-scale challenges.',

      /* ---------- How It Works ---------- */
      'From first contact to closeout': 'From first contact to closeout',
      'A clear, structured path — every problem is examined, classified, scoped, and resolved through the same disciplined process.':
        'A clear, structured path — every problem is examined, classified, scoped, and resolved through the same disciplined process.',
      '1': '1',
      '2': '2',
      '3': '3',
      '4': '4',
      '5': '5',
      '6': '6',
      '7': '7',
      'Submit Request': 'Submit Request',
      'Describe the problem through a short online form.':
        'Describe the problem through a short online form.',
      'Discovery Meeting': 'Discovery Meeting',
      'A 15–30 minute conversation to understand your objectives.':
        'A 15–30 minute conversation to understand your objectives.',
      Triage: 'Triage',
      'Classified as a quick consult, short project, long-term collaboration, or referral.':
        'Classified as a quick consult, short project, long-term collaboration, or referral.',
      'Scope & Agreement': 'Scope & Agreement',
      'Deliverables, timeline, confidentiality, IP, and data access defined.':
        'Deliverables, timeline, confidentiality, IP, and data access defined.',
      'Project Execution': 'Project Execution',
      'An expert team works through the analysis.':
        'An expert team works through the analysis.',
      'Validation & Handoff': 'Validation & Handoff',
      'Reports, models, software, and recommendations delivered.':
        'Reports, models, software, and recommendations delivered.',
      Closeout: 'Closeout',
      'Feedback gathered, work archived, impact tracked.':
        'Feedback gathered, work archived, impact tracked.',

      /* ---------- Who We Serve ---------- */
      'Who We Serve': 'Who We Serve',
      'Built for academia, industry, and government alike':
        'Built for academia, industry, and government alike',
      'Academic Collaboration': 'Academic Collaboration',
      'Cross-department partnerships that bring mathematical depth to research already underway.':
        'Cross-department partnerships that bring mathematical depth to research already underway.',
      Faculty: 'Faculty',
      Researchers: 'Researchers',
      'Graduate Students': 'Graduate Students',
      Departments: 'Departments',
      'Industry Partnerships': 'Industry Partnerships',
      'Applied analysis for operational, strategic, and product challenges.':
        'Applied analysis for operational, strategic, and product challenges.',
      Companies: 'Companies',
      Startups: 'Startups',
      Manufacturers: 'Manufacturers',
      'Government & Public Sector': 'Government & Public Sector',
      'Evidence-based modeling for public systems, services, and policy questions.':
        'Evidence-based modeling for public systems, services, and policy questions.',
      Agencies: 'Agencies',
      NGOs: 'NGOs',
      Hospitals: 'Hospitals',

      /* ---------- Example Problems ---------- */
      'Example Problems': 'Example Problems',
      'The kind of questions we take on': 'The kind of questions we take on',
      'Hospital shift scheduling': 'Hospital shift scheduling',
      'Transportation optimization': 'Transportation optimization',
      'Resource allocation': 'Resource allocation',
      'Demand forecasting': 'Demand forecasting',
      'Epidemiological modeling': 'Epidemiological modeling',
      'Environmental simulation': 'Environmental simulation',
      'Manufacturing optimization': 'Manufacturing optimization',
      'Financial risk analysis': 'Financial risk analysis',
      'Research data analysis': 'Research data analysis',

      /* ---------- Case Studies ---------- */
      'Representative project concepts': 'Representative project concepts',
      'The Center is newly established — these are illustrative project types we are built to take on, not a record of completed engagements yet.':
        'The Center is newly established — these are illustrative project types we are built to take on, not a record of completed engagements yet.',
      Healthcare: 'Healthcare',
      'Hospital Scheduling Optimization': 'Hospital Scheduling Optimization',
      'Balancing staff availability, shift fairness, and patient coverage using constraint-based optimization.':
        'Balancing staff availability, shift fairness, and patient coverage using constraint-based optimization.',
      Concept: 'Concept',
      'Higher Education': 'Higher Education',
      'University Timetable Optimization': 'University Timetable Optimization',
      'Generating conflict-free, room-efficient course schedules across departments.':
        'Generating conflict-free, room-efficient course schedules across departments.',
      Environment: 'Environment',
      'Water Resource Modeling': 'Water Resource Modeling',
      'Simulating supply, demand, and distribution under varying climate scenarios.':
        'Simulating supply, demand, and distribution under varying climate scenarios.',
      Logistics: 'Logistics',
      'Supply Chain Simulation': 'Supply Chain Simulation',
      'Stress-testing distribution networks against disruption and demand volatility.':
        'Stress-testing distribution networks against disruption and demand volatility.',
      'Healthcare · AI': 'Healthcare · AI',
      'AI for Healthcare': 'AI for Healthcare',
      'Predictive models supporting triage, diagnosis support, and capacity planning.':
        'Predictive models supporting triage, diagnosis support, and capacity planning.',

      /* ---------- Why Math ---------- */
      'Behind every healthcare system, transportation network, supply chain, financial market, and scientific discovery lies a mathematical structure waiting to be understood.':
        'Behind every healthcare system, transportation network, supply chain, financial market, and scientific discovery lies a mathematical structure waiting to be understood.',
      'We exist to reveal that structure — and turn it into better decisions.':
        'We exist to reveal that structure — and turn it into better decisions.',

      /* ---------- Status ---------- */
      'University Supported': 'University Supported',
      'Interdisciplinary Team': 'Interdisciplinary Team',
      'Research Driven': 'Research Driven',
      'Launching 2026': 'Launching 2026',

      /* ---------- Team ---------- */
      "Who you'll work with": "Who you'll work with",
      "Names to follow as the Center's roster is finalized — the structure below reflects how every engagement is staffed.":
        "Names to follow as the Center's roster is finalized — the structure below reflects how every engagement is staffed.",
      Director: 'Director',
      'Name to be announced': 'Name to be announced',
      Leadership: 'Leadership',
      Strategy: 'Strategy',
      'Faculty Consultants': 'Faculty Consultants',
      'Roster in formation': 'Roster in formation',
      Statistics: 'Statistics',
      'Graduate Researchers': 'Graduate Researchers',
      'Computational Math': 'Computational Math',
      AI: 'AI',
      'Student Fellows': 'Student Fellows',
      'Applications opening soon': 'Applications opening soon',

      /* ---------- Submit / Intake Form ---------- */
      "Tell us what you're working on": "Tell us what you're working on",
      'The most important step toward a solution is understanding the problem correctly. This goes to our intake team — expect a reply within a few business days.':
        'The most important step toward a solution is understanding the problem correctly. This goes to our intake team — expect a reply within a few business days.',
      'Response time': 'Response time',
      '2–3 business days': '2–3 business days',
      'Discovery call': 'Discovery call',
      '15–30 minutes': '15–30 minutes',
      Confidentiality: 'Confidentiality',
      'NDA available on request': 'NDA available on request',
      Name: 'Name',
      'Organization / Department': 'Organization / Department',
      Email: 'Email',
      'Phone (optional)': 'Phone (optional)',
      'Problem Description': 'Problem Description',
      'What are you trying to solve?': 'What are you trying to solve?',
      'Desired Outcome': 'Desired Outcome',
      'What would a good result look like?': 'What would a good result look like?',
      Timeline: 'Timeline',
      Flexible: 'Flexible',
      'Within 1 month': 'Within 1 month',
      '1–3 months': '1–3 months',
      '3+ months': '3+ months',
      'Type of Support Requested': 'Type of Support Requested',
      'Quick consultation': 'Quick consultation',
      'Short project': 'Short project',
      'Long-term collaboration': 'Long-term collaboration',
      'Not sure yet': 'Not sure yet',
      'Available Data': 'Available Data',
      'e.g. spreadsheets, sensor logs, none yet':
        'e.g. spreadsheets, sensor logs, none yet',
      'Confidentiality Requirements': 'Confidentiality Requirements',
      'e.g. NDA required, public research, no restrictions':
        'e.g. NDA required, public research, no restrictions',
      'Submit Project Request': 'Submit Project Request',
      'Request received.': 'Request received.',
      'Thank you — our intake team will follow up by email within 2–3 business days.':
        'Thank you — our intake team will follow up by email within 2–3 business days.',

      /* ---------- Final CTA ---------- */
      'Get in Touch': 'Get in Touch',
      'Have a challenging problem?': 'Have a challenging problem?',
      'The most important step toward a solution is understanding the problem correctly.':
        'The most important step toward a solution is understanding the problem correctly.',
      'Contact Our Team': 'Contact Our Team',

      /* ---------- Footer ---------- */
      'A university-backed center translating complex problems into mathematical and computational solutions.':
        'A university-backed center translating complex problems into mathematical and computational solutions.',
      Center: 'Center',
      About: 'About',
      Services: 'Services',
      Work: 'Work',
      Contact: 'Contact',
      'Schedule a call': 'Schedule a call',
      'Problem Solving Center · Department of Mathematics':
        'Problem Solving Center · Department of Mathematics',
      'Scope & Policies · Data Governance · Confidentiality':
        'Scope & Policies · Data Governance · Confidentiality'
    },

    fa: {
      /* ---------- Meta ---------- */
      'meta.title': 'PSC — مرکز حل مسئله',
      'meta.description':
        'مرکزی وابسته به دانشگاه که مسائل پیچیده دنیای واقعی را به راه‌حل‌های دقیق ریاضی و محاسباتی تبدیل می‌کند.',

      /* ---------- Nav ---------- */
      'What We Do': 'خدمات ما',
      'How It Works': 'فرایند کار',
      'Case Studies': 'مطالعه‌های موردی',
      Team: 'تیم',
      'Submit a Problem': 'ارسال یک مسئله',
      'Toggle menu': 'باز کردن منو',

      /* ---------- Hero ---------- */
      'University-Affiliated Research Center · Dept. of Mathematics':
        'مرکز پژوهشی وابسته به دانشگاه · گروه ریاضیات',
      heroTitlePre: 'تبدیل مسائل پیچیده به راه‌حل‌های ',
      heroTitleEm: 'عملی',
      heroTitlePost: '.',
      'We translate difficult, real-world challenges into rigorous mathematical and computational work — then deliver answers people can actually act on.':
        'ما چالش‌های دشوار و واقعی را به کارهای دقیق ریاضی و محاسباتی تبدیل می‌کنیم — و سپس پاسخ‌هایی ارائه می‌دهیم که واقعاً بتوان بر اساس آن‌ها عمل کرد.',
      'Schedule a Consultation': 'رزرو جلسه مشاوره',

      'Real-World Challenge': 'چالش دنیای واقعی',
      'Problem Formulation': 'صورت‌بندی مسئله',
      'Mathematical Model': 'مدل ریاضی',
      'Analysis & Computation': 'تحلیل و محاسبات',
      'Actionable Solution': 'راه‌حل قابل اجرا',

      Optimization: 'بهینه‌سازی',
      'Statistics & Data Science': 'آمار و علم داده',
      'Scientific Computing': 'محاسبات علمی',
      'Operations Research': 'تحقیق در عملیات',
      'Machine Learning': 'یادگیری ماشین',
      'Decision Support': 'پشتیبانی تصمیم',

      /* ---------- What We Do ---------- */
      'Areas of expertise': 'حوزه‌های تخصصی',
      'A single front door into a wide range of mathematical and computational disciplines — assembled into the right team for each problem.':
        'یک درگاه واحد برای دسترسی به طیف گسترده‌ای از شاخه‌های ریاضی و محاسباتی — و تشکیل تیم مناسب برای هر مسئله.',

      'Mathematical Modeling': 'مدل‌سازی ریاضی',
      'Translating real-world systems into precise equations and structures.':
        'تبدیل سامانه‌های دنیای واقعی به معادلات و ساختارهای دقیق.',
      'Finding the best decision among many feasible options.':
        'یافتن بهترین تصمیم از میان گزینه‌های ممکن متعدد.',
      'Improving how complex systems and processes run.':
        'بهبود نحوه عملکرد سامانه‌ها و فرایندهای پیچیده.',
      'Statistics & Data Analytics': 'آمار و تحلیل داده',
      'Extracting reliable insight from noisy, real-world data.':
        'استخراج بینش قابل‌اعتماد از داده‌های واقعی و نویزی.',
      'Solving large-scale problems with numerical methods and code.':
        'حل مسائل مقیاس‌بزرگ با روش‌های عددی و کدنویسی.',
      'Numerical Analysis': 'تحلیل عددی',
      'Ensuring computational solutions stay accurate and stable.':
        'اطمینان از دقیق و پایدار ماندن راه‌حل‌های محاسباتی.',
      Simulation: 'شبیه‌سازی',
      'Testing scenarios safely before committing real resources.':
        'آزمودن سناریوها به‌صورت ایمن پیش از تخصیص منابع واقعی.',
      Forecasting: 'پیش‌بینی',
      'Anticipating demand, risk, and future system behavior.':
        'پیش‌بینی تقاضا، ریسک و رفتار آینده سامانه.',
      'Machine Learning & AI': 'یادگیری ماشین و هوش مصنوعی',
      'Learning patterns from data to support better decisions.':
        'یادگیری الگوها از داده‌ها برای پشتیبانی از تصمیم‌های بهتر.',
      'Network Science': 'علم شبکه',
      'Understanding connectivity, flow, and structure in complex systems.':
        'درک اتصال، جریان و ساختار در سامانه‌های پیچیده.',
      'Decision Support Systems': 'سامانه‌های پشتیبانی تصمیم',
      'Turning analysis into tools people actually use.':
        'تبدیل تحلیل به ابزارهایی که واقعاً مورد استفاده قرار می‌گیرند.',
      'Scheduling & Resource Allocation': 'زمان‌بندی و تخصیص منابع',
      'Assigning limited resources where they matter most.':
        'تخصیص منابع محدود به جایی که بیشترین اهمیت را دارد.',
      'Dynamical Systems': 'سامانه‌های دینامیکی',
      'Modeling how systems evolve and change over time.':
        'مدل‌سازی نحوه تحول و تغییر سامانه‌ها در طول زمان.',
      'Financial Mathematics': 'ریاضیات مالی',
      'Quantifying risk and value in financial decisions.':
        'کمی‌سازی ریسک و ارزش در تصمیم‌های مالی.',
      'Industrial Mathematics': 'ریاضیات صنعتی',
      'Applying mathematics directly to industry-scale challenges.':
        'به‌کارگیری مستقیم ریاضیات در چالش‌های مقیاس صنعتی.',

      /* ---------- How It Works ---------- */
      'From first contact to closeout': 'از اولین تماس تا جمع‌بندی نهایی',
      'A clear, structured path — every problem is examined, classified, scoped, and resolved through the same disciplined process.':
        'مسیری روشن و ساختارمند — هر مسئله با یک فرایند منظم و یکسان بررسی، طبقه‌بندی، حدگذاری و حل می‌شود.',
      '1': '۱',
      '2': '۲',
      '3': '۳',
      '4': '۴',
      '5': '۵',
      '6': '۶',
      '7': '۷',
      'Submit Request': 'ثبت درخواست',
      'Describe the problem through a short online form.':
        'مسئله را از طریق یک فرم کوتاه آنلاین شرح دهید.',
      'Discovery Meeting': 'جلسه آشنایی اولیه',
      'A 15–30 minute conversation to understand your objectives.':
        'گفت‌وگویی ۱۵ تا ۳۰ دقیقه‌ای برای درک اهداف شما.',
      Triage: 'ارزیابی اولیه',
      'Classified as a quick consult, short project, long-term collaboration, or referral.':
        'به‌عنوان مشاوره سریع، پروژه کوتاه، همکاری بلندمدت یا ارجاع طبقه‌بندی می‌شود.',
      'Scope & Agreement': 'تعیین دامنه و توافق',
      'Deliverables, timeline, confidentiality, IP, and data access defined.':
        'خروجی‌ها، زمان‌بندی، محرمانگی، مالکیت فکری و دسترسی به داده مشخص می‌شود.',
      'Project Execution': 'اجرای پروژه',
      'An expert team works through the analysis.':
        'تیمی متخصص فرایند تحلیل را انجام می‌دهد.',
      'Validation & Handoff': 'اعتبارسنجی و تحویل',
      'Reports, models, software, and recommendations delivered.':
        'گزارش‌ها، مدل‌ها، نرم‌افزارها و توصیه‌ها تحویل داده می‌شود.',
      Closeout: 'جمع‌بندی نهایی',
      'Feedback gathered, work archived, impact tracked.':
        'بازخورد جمع‌آوری، کار بایگانی و میزان اثرگذاری پیگیری می‌شود.',

      /* ---------- Who We Serve ---------- */
      'Who We Serve': 'مخاطبان ما',
      'Built for academia, industry, and government alike':
        'طراحی‌شده برای دانشگاه، صنعت و دولت به یک اندازه',
      'Academic Collaboration': 'همکاری‌های دانشگاهی',
      'Cross-department partnerships that bring mathematical depth to research already underway.':
        'همکاری‌های میان‌دپارتمانی که به پژوهش‌های در حال انجام، عمق ریاضی می‌بخشند.',
      Faculty: 'اعضای هیئت علمی',
      Researchers: 'پژوهشگران',
      'Graduate Students': 'دانشجویان تحصیلات تکمیلی',
      Departments: 'دانشکده‌ها و گروه‌ها',
      'Industry Partnerships': 'مشارکت‌های صنعتی',
      'Applied analysis for operational, strategic, and product challenges.':
        'تحلیل کاربردی برای چالش‌های عملیاتی، راهبردی و محصول.',
      Companies: 'شرکت‌ها',
      Startups: 'استارتاپ‌ها',
      Manufacturers: 'تولیدکنندگان',
      'Government & Public Sector': 'دولت و بخش عمومی',
      'Evidence-based modeling for public systems, services, and policy questions.':
        'مدل‌سازی مبتنی بر شواهد برای سامانه‌های عمومی، خدمات و مسائل سیاست‌گذاری.',
      Agencies: 'سازمان‌ها',
      NGOs: 'سازمان‌های مردم‌نهاد',
      Hospitals: 'بیمارستان‌ها',

      /* ---------- Example Problems ---------- */
      'Example Problems': 'نمونه مسائل',
      'The kind of questions we take on': 'نمونه‌ای از پرسش‌هایی که بررسی می‌کنیم',
      'Hospital shift scheduling': 'زمان‌بندی شیفت بیمارستان',
      'Transportation optimization': 'بهینه‌سازی حمل‌ونقل',
      'Resource allocation': 'تخصیص منابع',
      'Demand forecasting': 'پیش‌بینی تقاضا',
      'Epidemiological modeling': 'مدل‌سازی اپیدمیولوژیک',
      'Environmental simulation': 'شبیه‌سازی محیط‌زیستی',
      'Manufacturing optimization': 'بهینه‌سازی تولید',
      'Financial risk analysis': 'تحلیل ریسک مالی',
      'Research data analysis': 'تحلیل داده‌های پژوهشی',

      /* ---------- Case Studies ---------- */
      'Representative project concepts': 'نمونه مفاهیم پروژه',
      'The Center is newly established — these are illustrative project types we are built to take on, not a record of completed engagements yet.':
        'این مرکز به‌تازگی تأسیس شده است؛ موارد زیر نمونه‌ای از انواع پروژه‌هایی هستند که برای انجام آن‌ها آماده‌ایم، نه فهرستی از همکاری‌های انجام‌شده.',
      Healthcare: 'سلامت',
      'Hospital Scheduling Optimization': 'بهینه‌سازی زمان‌بندی بیمارستان',
      'Balancing staff availability, shift fairness, and patient coverage using constraint-based optimization.':
        'ایجاد تعادل میان دسترسی کارکنان، عدالت در شیفت‌ها و پوشش بیماران با بهینه‌سازی مبتنی بر قید.',
      Concept: 'مفهوم',
      'Higher Education': 'آموزش عالی',
      'University Timetable Optimization': 'بهینه‌سازی برنامه هفتگی دانشگاه',
      'Generating conflict-free, room-efficient course schedules across departments.':
        'تولید برنامه‌های درسی بدون تداخل و بهینه از نظر استفاده از کلاس در میان گروه‌های مختلف.',
      Environment: 'محیط‌زیست',
      'Water Resource Modeling': 'مدل‌سازی منابع آب',
      'Simulating supply, demand, and distribution under varying climate scenarios.':
        'شبیه‌سازی عرضه، تقاضا و توزیع در سناریوهای مختلف اقلیمی.',
      Logistics: 'لجستیک',
      'Supply Chain Simulation': 'شبیه‌سازی زنجیره تأمین',
      'Stress-testing distribution networks against disruption and demand volatility.':
        'آزمودن تاب‌آوری شبکه‌های توزیع در برابر اختلال و نوسان تقاضا.',
      'Healthcare · AI': 'سلامت · هوش مصنوعی',
      'AI for Healthcare': 'هوش مصنوعی برای سلامت',
      'Predictive models supporting triage, diagnosis support, and capacity planning.':
        'مدل‌های پیش‌بینی‌کننده برای پشتیبانی از تریاژ، کمک به تشخیص و برنامه‌ریزی ظرفیت.',

      /* ---------- Why Math ---------- */
      'Behind every healthcare system, transportation network, supply chain, financial market, and scientific discovery lies a mathematical structure waiting to be understood.':
        'پشت هر سامانه سلامت، شبکه حمل‌ونقل، زنجیره تأمین، بازار مالی و کشف علمی، ساختاری ریاضی نهفته است که در انتظار درک شدن است.',
      'We exist to reveal that structure — and turn it into better decisions.':
        'ما برای آشکار کردن آن ساختار وجود داریم — و برای تبدیل آن به تصمیم‌های بهتر.',

      /* ---------- Status ---------- */
      'University Supported': 'مورد حمایت دانشگاه',
      'Interdisciplinary Team': 'تیم میان‌رشته‌ای',
      'Research Driven': 'مبتنی بر پژوهش',
      'Launching 2026': 'آغاز فعالیت در ۲۰۲۶',

      /* ---------- Team ---------- */
      "Who you'll work with": 'با چه کسانی همکاری خواهید کرد',
      "Names to follow as the Center's roster is finalized — the structure below reflects how every engagement is staffed.":
        'نام‌ها پس از نهایی شدن فهرست اعضای مرکز اعلام می‌شود؛ ساختار زیر نشان می‌دهد هر پروژه چگونه تیم‌بندی می‌شود.',
      Director: 'مدیر',
      'Name to be announced': 'نام در آینده اعلام می‌شود',
      Leadership: 'رهبری',
      Strategy: 'راهبرد',
      'Faculty Consultants': 'مشاوران هیئت علمی',
      'Roster in formation': 'فهرست در حال تکمیل',
      Statistics: 'آمار',
      'Graduate Researchers': 'پژوهشگران تحصیلات تکمیلی',
      'Computational Math': 'ریاضیات محاسباتی',
      AI: 'هوش مصنوعی',
      'Student Fellows': 'همکاران دانشجویی',
      'Applications opening soon': 'ثبت‌نام به‌زودی آغاز می‌شود',

      /* ---------- Submit / Intake Form ---------- */
      "Tell us what you're working on": 'مسئله خود را برای ما شرح دهید',
      'The most important step toward a solution is understanding the problem correctly. This goes to our intake team — expect a reply within a few business days.':
        'مهم‌ترین گام به‌سوی راه‌حل، درک درست مسئله است. این فرم به تیم پذیرش ما ارسال می‌شود؛ پاسخ را ظرف چند روز کاری دریافت خواهید کرد.',
      'Response time': 'زمان پاسخ‌گویی',
      '2–3 business days': '۲ تا ۳ روز کاری',
      'Discovery call': 'تماس اولیه',
      '15–30 minutes': '۱۵ تا ۳۰ دقیقه',
      Confidentiality: 'محرمانگی',
      'NDA available on request': 'توافق‌نامه محرمانگی در صورت درخواست',
      Name: 'نام',
      'Organization / Department': 'سازمان / دپارتمان',
      Email: 'ایمیل',
      'Phone (optional)': 'تلفن (اختیاری)',
      'Problem Description': 'توضیح مسئله',
      'What are you trying to solve?': 'به‌دنبال حل چه مسئله‌ای هستید؟',
      'Desired Outcome': 'نتیجه مطلوب',
      'What would a good result look like?': 'یک نتیجه خوب از نظر شما چه شکلی دارد؟',
      Timeline: 'زمان‌بندی',
      Flexible: 'انعطاف‌پذیر',
      'Within 1 month': 'ظرف ۱ ماه',
      '1–3 months': '۱ تا ۳ ماه',
      '3+ months': 'بیش از ۳ ماه',
      'Type of Support Requested': 'نوع پشتیبانی درخواستی',
      'Quick consultation': 'مشاوره سریع',
      'Short project': 'پروژه کوتاه‌مدت',
      'Long-term collaboration': 'همکاری بلندمدت',
      'Not sure yet': 'هنوز مشخص نیست',
      'Available Data': 'داده‌های موجود',
      'e.g. spreadsheets, sensor logs, none yet':
        'مثلاً فایل‌های اکسل، گزارش‌های حسگر، یا فعلاً هیچ‌کدام',
      'Confidentiality Requirements': 'الزامات محرمانگی',
      'e.g. NDA required, public research, no restrictions':
        'مثلاً نیاز به توافق‌نامه محرمانگی، پژوهش عمومی، یا بدون محدودیت',
      'Submit Project Request': 'ارسال درخواست پروژه',
      'Request received.': 'درخواست شما دریافت شد.',
      'Thank you — our intake team will follow up by email within 2–3 business days.':
        'سپاسگزاریم — تیم پذیرش ما ظرف ۲ تا ۳ روز کاری از طریق ایمیل پیگیری خواهد کرد.',

      /* ---------- Final CTA ---------- */
      'Get in Touch': 'تماس با ما',
      'Have a challenging problem?': 'مسئله‌ای چالش‌برانگیز دارید؟',
      'The most important step toward a solution is understanding the problem correctly.':
        'مهم‌ترین گام به‌سوی یک راه‌حل، درک درست مسئله است.',
      'Contact Our Team': 'تماس با تیم ما',

      /* ---------- Footer ---------- */
      'A university-backed center translating complex problems into mathematical and computational solutions.':
        'مرکزی مورد حمایت دانشگاه که مسائل پیچیده را به راه‌حل‌های ریاضی و محاسباتی تبدیل می‌کند.',
      Center: 'مرکز',
      About: 'درباره ما',
      Services: 'خدمات',
      Work: 'پروژه‌ها',
      Contact: 'تماس',
      'Schedule a call': 'رزرو تماس',
      'Problem Solving Center · Department of Mathematics':
        'مرکز حل مسئله · گروه ریاضیات',
      'Scope & Policies · Data Governance · Confidentiality':
        'دامنه و سیاست‌ها · حاکمیت داده · محرمانگی'
    }
  };

  function getStoredLang() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function storeLang(lang) {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      /* ignore (e.g. privacy mode) */
    }
  }

  function applyLanguage(lang) {
    const dict = translations[lang] || translations.en;

    document.documentElement.lang = lang === 'fa' ? 'fa' : 'en';
    document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (dict[key] !== undefined) el.textContent = dict[key];
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (dict[key] !== undefined) el.setAttribute('placeholder', dict[key]);
    });

    document.querySelectorAll('[data-i18n-aria-label]').forEach((el) => {
      const key = el.getAttribute('data-i18n-aria-label');
      if (dict[key] !== undefined) el.setAttribute('aria-label', dict[key]);
    });

    if (dict['meta.title']) document.title = dict['meta.title'];
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && dict['meta.description']) {
      metaDesc.setAttribute('content', dict['meta.description']);
    }

    const toggle = document.getElementById('langToggle');
    if (toggle) {
      const isFa = lang === 'fa';
      toggle.textContent = isFa ? 'English' : 'فارسی';
      toggle.setAttribute('aria-label', isFa ? 'Switch to English' : 'Switch to Persian');
    }

    document.body.setAttribute('data-lang', lang);

    document.dispatchEvent(new CustomEvent('psc:langchange', { detail: { lang } }));
  }

  function initLanguage() {
    const stored = getStoredLang();
    applyLanguage(stored === 'fa' ? 'fa' : 'en');
  }

  document.addEventListener('DOMContentLoaded', () => {
    initLanguage();

    const toggle = document.getElementById('langToggle');
    if (toggle) {
      toggle.addEventListener('click', () => {
        const current = document.documentElement.lang === 'fa' ? 'fa' : 'en';
        const next = current === 'fa' ? 'en' : 'fa';
        storeLang(next);
        applyLanguage(next);
      });
    }
  });
})();
