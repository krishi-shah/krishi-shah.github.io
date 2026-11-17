// One source of truth for roles, education, toolkit and recognition.
// Used by the home page sections, the resume page and the Ask box.

export type Role = { title: string; company: string; period: string; location: string; description: string[]; skills: string[] };

export const experiences: Role[] = [
  {
    title: 'AI Undergraduate Researcher, supervised by Prof. Mona Nasery',
    company: 'York University',
    period: 'May 2026 – Aug 2026',
    location: 'Toronto, ON',
    description: [
      'Fine-tuned EfficientNet-B3 on 120,000 images to 96.96% test accuracy and 0.9971 AUC-ROC.',
      'Temperature scaling at T = 1.2189 brought expected calibration error to 0.0026.',
      'A resolution-matched control showed the earlier cross-generator scores were reading resampling artifacts. Matched-resolution detection fell to 35–62%.',
      'Evaluated transfer across StyleGAN, Stable Diffusion 3, Flux, Midjourney v6, Janus-Pro, and GPT-4o.',
    ],
    skills: ['PyTorch', 'EfficientNet', 'Calibration', 'Grad-CAM'],
  },
  {
    title: 'Software Developer, Analytics',
    company: 'All Good Accounting',
    period: 'Feb 2026 – Apr 2026',
    location: 'Toronto, ON',
    description: [
      'Built a financial reporting application that replaced a manual Excel process, through the Level UP industry program.',
      'Scoped requirements with the client and shipped views that non-technical staff could run without developer support.',
    ],
    skills: ['Python', 'SQL', 'Reporting'],
  },
  {
    title: 'Software Developer Co-op · Co-op of the Year Nominee',
    company: 'Ontario Government',
    period: 'Jan 2025 – Dec 2025',
    location: 'Toronto, ON',
    description: [
      'Rewrote the validation layer in Python and SQL across 10+ workflows and cut reported data errors by about 30%.',
      'Refactored schemas, queries, and indexes behind 5+ applications, improving query performance 25%.',
      'Built test suites and release automation in Azure DevOps, cutting deployment time 40% and moving the team to same-day releases.',
    ],
    skills: ['Python', 'SQL', 'PostgreSQL', 'Azure DevOps'],
  },
  {
    title: 'Data Science Intern',
    company: 'NFOX Technologies',
    period: 'Nov 2022 – Jan 2023',
    location: 'Gujarat, India',
    description: [
      'Compared Random Forest, SVM, and Gradient Boosting on 10K+ churn records, moving accuracy from 73% to 85%. Feature engineering produced nearly all of the gain.',
      'Benchmarked a BERT classifier against bag-of-words baselines until a 15% lift justified the extra training cost.',
      'Built Tableau dashboards for KPI and financial metrics.',
    ],
    skills: ['Python', 'scikit-learn', 'BERT', 'Tableau'],
  },
  {
    title: 'Data Analytics Intern',
    company: 'Suven Consultants and Technology',
    period: 'May 2022 – Jul 2022',
    location: 'Gujarat, India',
    description: [
      'Built reusable Python and SQL pipelines across 5+ datasets that informed 3 product decisions.',
      'Designed 3 Power BI dashboards and cut manual reporting effort by 50%.',
    ],
    skills: ['Python', 'SQL', 'Power BI'],
  },
];

export const volunteerExperience: Role[] = [
  {
    title: 'Lead Developer and Executive',
    company: 'York University Data Science Club',
    period: 'Oct 2024 – Oct 2025',
    location: 'Toronto, ON',
    description: [
      'Set technical direction for a 12-person team across 5+ machine learning projects, including scoping, code review, and mentorship.',
      'Published 8 technical articles in Level Up Coding and CodeX during the role.',
    ],
    skills: ['Mentorship', 'Code review', 'Machine Learning'],
  },
  {
    title: 'Student Ambassador and Week Zero Leader',
    company: 'Lassonde School of Engineering, York University',
    period: 'Summer 2024',
    location: 'Toronto, ON',
    description: [
      'Represented Lassonde to prospective and incoming students.',
      'Led Week Zero orientation for first-year engineering and computer science cohorts.',
    ],
    skills: ['Leadership', 'Mentoring'],
  },
];

export const EDUCATION = [
  {
    school: 'York University, Lassonde School of Engineering',
    credential: 'BSc Honours, Computer Science',
    detail: 'Expected Aug 2027 · Toronto',
    notes: 'Applied Machine Learning, Statistics for Data Science, Data Mining, Big Data Analytics, Database Systems. Research project EECS 4080 supervised by Prof. Mona Nasery.',
  },
  {
    school: 'Parul University',
    credential: 'Diploma, Computer Engineering · GPA 3.9',
    detail: '2020 to 2023 · Gujarat, India',
    notes: '5x University Gold Medalist for highest GPA overall. Dean’s List.',
  },
];

// The toolkit, laid out as the path a model takes from data to production.
export const PIPELINE = [
  { stage: 'Data', note: 'Collect, clean, query', items: ['Python', 'SQL', 'R', 'PostgreSQL', 'Bash'] },
  { stage: 'Model', note: 'Train and tune', items: ['PyTorch', 'TensorFlow', 'scikit learn', 'XGBoost', 'LightGBM', 'CNNs'] },
  { stage: 'Retrieve', note: 'LLMs and RAG', items: ['LangChain', 'FAISS', 'BM25', 'Hugging Face', 'FinBERT'] },
  { stage: 'Evaluate', note: 'Measure and explain', items: ['ROC AUC', 'Calibration', 'SHAP', 'Grad CAM', 'Fairlearn'] },
  { stage: 'Deploy', note: 'Ship and monitor', items: ['MLflow', 'FastAPI', 'Docker', 'GitHub Actions', 'Azure'] },
];

export const RECOGNITION = [
  { title: 'Co-op of the Year Nominee', org: 'Ontario Government', year: '2025' },
  { title: 'Lead Developer and Executive', org: 'York University Data Science Club', year: '2024' },
  { title: '8 Technical Articles', org: 'Level Up Coding and CodeX', year: '2024' },
  { title: '5x University Gold Medalist', org: 'Parul University, highest GPA overall', year: '2023' },
  { title: "Dean's List", org: 'Parul University', year: '2023' },
  { title: 'Published Author', org: 'The Awakening Code', year: 'Book' },
];

