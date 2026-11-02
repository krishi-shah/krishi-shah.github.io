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

const SKILLS = [
  { category: 'Languages', items: ['Python', 'SQL', 'R', 'Java', 'C++', 'Bash'] },
  { category: 'Machine learning', items: ['PyTorch', 'TensorFlow', 'scikit learn', 'XGBoost', 'LightGBM', 'CNNs'] },
  { category: 'LLMs and RAG', items: ['LangChain', 'FAISS', 'BM25', 'Hugging Face', 'FinBERT'] },
  { category: 'Evaluation', items: ['ROC AUC', 'Calibration', 'SHAP', 'Grad CAM', 'Fairlearn'] },
  { category: 'ML systems', items: ['MLflow', 'FastAPI', 'Docker', 'GitHub Actions', 'PostgreSQL', 'Azure'] },
];

export default function AboutSection() {
  return (
    <section id="about" className="relative overflow-clip border-t border-line">
      <SectionNumber n="02" />
      <div className="relative mx-auto max-w-[1400px] px-5 py-20 sm:px-10 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr]">
          <div data-build>
            <p className="label">02 / Behind the models</p>
            <h2 className="mt-3 font-display text-5xl uppercase leading-[0.95] sm:text-7xl">
              <Lines lines={['Not just accuracy.', <span key="c" className="text-bone/45">Claims that hold up.</span>]} />
            </h2>
          </div>
          <p data-build className="self-end text-[15px] leading-8 text-bone/75">
            I&apos;m Krishi, a final year Honours Computer Science student at York University. {site.longBio}
          </p>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-2">
          <div>
            <p data-build className="eyebrow border-b border-line pb-3 text-bone/45">Education</p>
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

          <div>
            <p data-build className="eyebrow border-b border-line pb-3 text-bone/45">Toolkit</p>
            {SKILLS.map((s) => (
              <div data-build key={s.category} className="flex flex-col gap-3 border-b border-line py-5 sm:flex-row sm:items-center">
                <span className="eyebrow w-40 shrink-0 text-bone/80">{s.category}</span>
                <div className="flex flex-wrap gap-2">
                  {s.items.map((i) => (
                    <span key={i} className="border border-line px-2.5 py-1 text-[12px] text-bone/80 transition-colors hover:border-red hover:text-bone">
                      {i}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
