import { ArrowUpRight } from 'lucide-react';

const experiences = [
  {
    title: 'AI Research Assistant, supervised by Prof. Mona Nasery',
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
    gradient: 'from-emerald-500 to-cyan-500',
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
    gradient: 'from-cyan-500 to-violet-500',
  },
  {
    title: 'Software Developer, Analytics',
    company: 'All Good Accounting',
    period: 'Feb 2025 – Apr 2025',
    location: 'Toronto, ON',
    description: [
      'Built a financial reporting application that replaced a manual Excel process, through the Level UP industry program.',
      'Scoped requirements with the client and shipped views that non-technical staff could run without developer support.',
    ],
    skills: ['Python', 'SQL', 'Reporting'],
    gradient: 'from-violet-500 to-pink-500',
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
    gradient: 'from-emerald-500 to-violet-500',
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
    gradient: 'from-cyan-500 to-emerald-500',
  },
];

const volunteerExperience = [
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

type Role = { title: string; company: string; period: string; location: string; description: string[]; skills: string[] };

function Row({ r, i }: { r: Role; i: number }) {
  return (
    <article data-build className="group grid gap-4 border-b border-line py-8 lg:grid-cols-[180px_1fr_1.4fr] lg:gap-10">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-wider text-red">{r.period}</p>
        <p className="mt-1 text-[11px] uppercase tracking-wider text-dim">{r.location}</p>
      </div>
      <div>
        <h3 className="font-display text-2xl uppercase leading-tight text-bone sm:text-3xl">{r.company}</h3>
        <p className="mt-2 text-sm font-semibold text-bone/70">{r.title}</p>
      </div>
      <div>
        <ul className="space-y-2">
          {r.description.map((d) => (
            <li key={d} className="flex gap-3 text-[14px] leading-6 text-bone/70">
              <span className="mt-[10px] h-[3px] w-3 shrink-0 bg-red" />
              {d}
            </li>
          ))}
        </ul>
        <div className="mt-4 flex flex-wrap gap-2">
          {r.skills.map((s) => (
            <span key={s} className="bg-panel2 px-2 py-1 text-[11px] text-dim">
              {s}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

export default function ExperienceSection() {
  return (
    <section id="journey" className="border-t border-line bg-[#0c0c0c]">
      <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-10 sm:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div data-build>
            <p className="eyebrow text-red">03 / The journey</p>
            <h2 className="mt-3 font-display text-5xl uppercase leading-[0.95] sm:text-7xl">
              Keep shipping<span className="text-red">.</span> Keep learning<span className="text-red">.</span>
            </h2>
          </div>
          <a
            data-build
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 border border-line px-5 py-3 text-[12px] font-bold uppercase tracking-wider text-bone transition-colors hover:border-red hover:text-red"
          >
            Resume <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-12 border-t border-line">
          {experiences.map((r, i) => (
            <Row key={r.company + r.period} r={r} i={i} />
          ))}
        </div>

        <p data-build className="eyebrow mt-16 border-b border-line pb-3 text-dim">Leadership</p>
        {volunteerExperience.map((r, i) => (
          <Row key={r.company} r={r} i={i} />
        ))}
      </div>
    </section>
  );
}
