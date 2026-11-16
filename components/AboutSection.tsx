import { getSiteConfig } from '@/lib/content';
import Lines from '@/components/Lines';
import SectionNumber from '@/components/SectionNumber';

const site = getSiteConfig();

const EDUCATION = [
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
const PIPELINE = [
  { stage: 'Data', note: 'Collect, clean, query', items: ['Python', 'SQL', 'R', 'PostgreSQL', 'Bash'] },
  { stage: 'Model', note: 'Train and tune', items: ['PyTorch', 'TensorFlow', 'scikit learn', 'XGBoost', 'LightGBM', 'CNNs'] },
  { stage: 'Retrieve', note: 'LLMs and RAG', items: ['LangChain', 'FAISS', 'BM25', 'Hugging Face', 'FinBERT'] },
  { stage: 'Evaluate', note: 'Measure and explain', items: ['ROC AUC', 'Calibration', 'SHAP', 'Grad CAM', 'Fairlearn'] },
  { stage: 'Deploy', note: 'Ship and monitor', items: ['MLflow', 'FastAPI', 'Docker', 'GitHub Actions', 'Azure'] },
];

export default function AboutSection() {
  return (
    <section id="about" className="relative overflow-clip border-t border-line">
      <SectionNumber n="05" />
      <div className="relative mx-auto max-w-[1400px] px-5 py-20 sm:px-10 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr]">
          <div data-build>
            <p className="label">05 / Behind the models</p>
            <h2 className="mt-3 font-display text-5xl uppercase leading-[0.95] sm:text-7xl">
              <Lines lines={['Not just accuracy.', <span key="c" className="text-bone/55">Claims that hold up.</span>]} />
            </h2>
          </div>
          <p data-build className="self-end text-[15px] leading-8 text-bone/75">
            I&apos;m Krishi, a final year Honours Computer Science student at York University. {site.longBio}
          </p>
        </div>

        <p data-build className="eyebrow mt-16 border-b border-line pb-3 text-bone/55">Education</p>
        <div className="grid gap-x-12 lg:grid-cols-2">
          {EDUCATION.map((e) => (
            <div data-build key={e.school} className="border-b border-line py-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-lg font-bold text-bone">{e.school}</h3>
                <span className="eyebrow text-bone/50">{e.detail}</span>
              </div>
              <p className="mt-1 text-sm font-semibold text-bone/80">{e.credential}</p>
              <p className="mt-3 text-[14px] leading-6 text-bone/55">{e.notes}</p>
            </div>
          ))}
        </div>

        <div data-build className="mt-16 flex flex-wrap items-end justify-between gap-3 border-b border-line pb-3">
          <p className="eyebrow text-bone/55">Toolkit, from data to production</p>
          <p className="eyebrow text-bone/40">Also: Java, C++</p>
        </div>
        <div data-anim className="pipeline relative mt-10 grid gap-y-10 lg:grid-cols-5">
          {/* The rail the stages sit on, with pulses travelling along it */}
          <div className="pipe-rail" aria-hidden="true">
            <span className="pipe-dot" />
            <span className="pipe-dot" style={{ animationDelay: '-1.4s' }} />
            <span className="pipe-dot" style={{ animationDelay: '-2.8s' }} />
          </div>
          {PIPELINE.map((st, i) => (
            <div data-build key={st.stage} className="pipe-stage group relative pl-12 lg:pl-0 lg:pr-6 lg:pt-12">
              <span className="pipe-node num">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="font-display text-3xl uppercase leading-none text-bone transition-colors group-hover:text-red">
                {st.stage}
              </h3>
              <p className="eyebrow mt-2 text-bone/55">{st.note}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {st.items.map((t) => (
                  <span key={t} className="pipe-chip border border-line px-2.5 py-1 text-[12px] text-bone/80">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
