import { ArrowUpRight } from 'lucide-react';
import Lines from '@/components/Lines';
import SectionNumber from '@/components/SectionNumber';

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
    title: 'Software Developer, Analytics',
    company: 'All Good Accounting',
    period: 'Feb 2026 – Apr 2026',
    location: 'Toronto, ON',
    description: [
      'Built a financial reporting application that replaced a manual Excel process, through the Level UP industry program.',
      'Scoped requirements with the client and shipped views that non-technical staff could run without developer support.',
    ],
    skills: ['Python', 'SQL', 'Reporting'],
    gradient: 'from-violet-500 to-pink-500',
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

const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
function startKey(period: string) {
  const year = Number(period.match(/\d{4}/)?.[0] ?? 0);
  const lower = period.toLowerCase();
  const m = MONTHS.findIndex((mo) => lower.startsWith(mo));
  const month = m >= 0 ? m : lower.startsWith('summer') ? 5 : 0;
  return year * 12 + month;
}
function startYear(period: string) {
  return period.match(/\d{4}/)?.[0] ?? '';
}

const FRAMES = [
  ...experiences.map((r) => ({ ...r, kind: 'Experience' })),
  ...volunteerExperience.map((r) => ({ ...r, kind: 'Leadership' })),
].sort((a, b) => startKey(a.period) - startKey(b.period));

/* Phones and tablets: vertical timeline */
function Row({ r }: { r: Role }) {
  return (
    <article data-build className="grid gap-4 border-b border-line py-8">
      <div>
        <p className="eyebrow text-bone/80">{r.period}</p>
        <p className="eyebrow mt-1 text-bone/55">{r.location}</p>
      </div>
      <div>
        <h3 className="font-display text-3xl uppercase leading-tight text-bone">{r.company}</h3>
        <p className="mt-2 text-sm font-semibold text-bone/70">{r.title}</p>
      </div>
      <ul className="space-y-2">
        {r.description.map((d) => (
          <li key={d} className="flex gap-3 text-[14px] leading-6 text-bone/70">
            <span className="mt-[11px] h-px w-3 shrink-0 bg-bone/40" />
            {d}
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-2">
        {r.skills.map((sk) => (
          <span key={sk} className="eyebrow bg-panel2 px-2 py-1 text-bone/55">
            {sk}
          </span>
        ))}
      </div>
    </article>
  );
}

export default function ExperienceSection() {
  return (
    <section id="journey" className="relative overflow-clip border-t border-line bg-[#0c0c0c]">
      <SectionNumber n="06" />
      <div className="relative mx-auto max-w-[1400px] px-5 pt-20 sm:px-10 sm:pt-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div data-build>
            <p className="label">06 / The journey</p>
            <h2 className="mt-4 font-display text-5xl uppercase leading-[0.95] sm:text-7xl">
              <Lines
                lines={[
                  <>Keep shipping<span className="text-red">.</span></>,
                  <>Keep learning<span className="text-red">.</span></>,
                ]}
              />
            </h2>
          </div>
          <a
            data-build
            data-magnetic
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="eyebrow inline-flex items-center gap-3 border border-line px-5 py-3 text-bone transition-colors hover:border-red hover:text-red"
          >
            Resume <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>

      {/* Desktop: the section pins and the roles slide past like a film strip */}
      <div data-filmstrip className="relative hidden lg:block" style={{ height: 'calc(100svh + 2600px)' }}>
        <div data-build data-strip-stage className="sticky top-[66px] flex h-[calc(100svh-66px)] flex-col justify-center overflow-hidden">
          <div className="pointer-events-none absolute right-10 top-8 text-right">
            <p className="eyebrow text-bone/55">Year</p>
            <p data-strip-year className="num text-6xl font-semibold leading-none text-bone">
              {startYear(FRAMES[0].period)}
            </p>
          </div>

          <div data-strip-track className="flex w-max items-stretch will-change-transform" style={{ paddingLeft: 'max(40px, calc((100vw - 1400px) / 2 + 40px))', paddingRight: '30vw' }}>
            {FRAMES.map((r) => (
              <article
                key={r.company + r.period}
                data-strip-frame
                data-year={startYear(r.period)}
                className="group relative flex w-[440px] shrink-0 flex-col border-l border-line px-9 py-2 xl:w-[480px]"
              >
                <span className="outline-year font-display text-[8.5rem] leading-[0.85]">{startYear(r.period)}</span>
                <p className="eyebrow mt-6 flex items-center gap-3 text-bone/55">
                  <span className={r.kind === 'Leadership' ? 'text-bone/80' : 'text-red'}>{r.kind}</span>
                  <span>·</span>
                  {r.period}
                </p>
                <h3 className="mt-3 font-display text-4xl uppercase leading-[0.95] text-bone">{r.company}</h3>
                <p className="mt-2 text-[14px] font-semibold text-bone/70">{r.title}</p>
                <ul className="mt-5 space-y-2.5">
                  {r.description.slice(0, 2).map((d) => (
                    <li key={d} className="flex gap-3 text-[14px] leading-6 text-bone/65">
                      <span className="mt-[11px] h-px w-3 shrink-0 bg-bone/40" />
                      {d}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-2">
                  {r.skills.slice(0, 4).map((sk) => (
                    <span key={sk} className="eyebrow bg-panel2 px-2 py-1 text-bone/55">
                      {sk}
                    </span>
                  ))}
                </div>
                <span className="absolute -left-[5px] top-[4.2rem] h-[9px] w-[9px] rounded-full bg-bone/30 transition-colors group-[.is-current]:bg-red" />
              </article>
            ))}
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0">
            <div className="mx-auto flex max-w-[1400px] items-center gap-6 px-10 pb-6">
              <span className="eyebrow text-bone/55">{startYear(FRAMES[0].period)}</span>
              <span className="relative h-px flex-1 bg-line">
                <span data-strip-progress className="absolute inset-0 origin-left bg-red" style={{ transform: 'scaleX(0)' }} />
              </span>
              <span className="eyebrow text-bone/55">{startYear(FRAMES[FRAMES.length - 1].period)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Phones and tablets */}
      <div className="relative mx-auto max-w-[1400px] px-5 pb-20 sm:px-10 sm:pb-28 lg:hidden">
        <div data-progress className="relative mt-12 border-t border-line pl-6 sm:pl-10">
          <div className="absolute bottom-0 left-0 top-0 w-px bg-line" aria-hidden="true">
            <div className="progress-fill absolute inset-0 bg-red" />
            <div className="progress-dot absolute -left-[5px] -mt-[5px] h-[11px] w-[11px] rounded-full bg-red" />
          </div>
          {experiences.map((r) => (
            <Row key={r.company + r.period} r={r} />
          ))}
        </div>
        <p data-build className="label mt-16">Leadership</p>
        {volunteerExperience.map((r) => (
          <Row key={r.company} r={r} />
        ))}
      </div>
      <div className="hidden h-24 lg:block" />
    </section>
  );
}
