import { ArrowUpRight } from 'lucide-react';
import Lines from '@/components/Lines';

const ITEMS = [
  { title: 'Co-op of the Year Nominee', org: 'Ontario Government', year: '2025' },
  { title: 'Lead Developer and Executive', org: 'York University Data Science Club', year: '2024' },
  { title: '8 Technical Articles', org: 'Level Up Coding and CodeX', year: '2024' },
  { title: '5x University Gold Medalist', org: 'Parul University, highest GPA overall', year: '2023' },
  { title: "Dean's List", org: 'Parul University', year: '2023' },
  { title: 'Published Author', org: 'The Awakening Code', year: 'Book' },
];

export default function RecognitionSection() {
  return (
    <section id="recognition" className="border-y border-line bg-gradient-to-b from-[#0d0d0d] to-ink">
      <div className="mx-auto grid max-w-[1400px] gap-14 px-5 py-20 sm:px-10 sm:py-24 lg:grid-cols-[1fr_1.3fr]">
        <div>
          <div data-build>
            <p className="eyebrow text-red">Recognition &amp; milestones</p>
            <h2 className="mt-3 font-display text-5xl uppercase leading-[0.95] sm:text-7xl">
              <Lines lines={['The work.', <span key="r" className="text-red">The recognition.</span>]} />
            </h2>
          </div>
          <div data-build className="mt-10 flex items-center gap-5">
            <div className="relative flex h-28 w-28 shrink-0 items-center justify-center rounded-full border border-red/50">
              <div className="absolute inset-2 rounded-full border border-dashed border-red/30" aria-hidden="true" />
              <span className="font-display text-6xl leading-none text-bone">
                5<span className="text-3xl text-red">x</span>
              </span>
            </div>
            <div>
              <div className="eyebrow text-red">University gold medals</div>
              <p className="mt-1 text-[13px] text-dim">Highest GPA overall, Parul University</p>
            </div>
          </div>
          <p data-build className="mt-6 max-w-sm text-sm leading-7 text-bone/70">
            Work done carefully, and measured honestly.
            <br />
            The recognition is a reason to keep raising the bar.
          </p>
          <a
            data-build
            data-magnetic
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="eyebrow mt-8 inline-flex items-center gap-3 text-bone hover:text-red"
          >
            View resume <ArrowUpRight className="h-4 w-4 text-red" />
          </a>
        </div>

        <ol className="border-t border-line">
          {ITEMS.map((it, i) => (
            <li
              data-build
              key={it.title}
              className="group relative flex items-center gap-5 overflow-hidden border-b border-line py-5"
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-red/20 to-red/[0.03] transition-transform duration-700 ease-out-expo group-hover:scale-x-100"
              />
              <span className="relative w-6 pl-1 text-[11px] font-bold text-red">{String(i + 1).padStart(2, '0')}</span>
              <div className="relative flex-1 transition-transform duration-500 ease-out-expo group-hover:translate-x-2">
                <h3 className="text-lg font-semibold text-bone sm:text-xl">{it.title}</h3>
                <p className="mt-0.5 text-[12px] text-dim">{it.org}</p>
              </div>
              <span className="relative pr-1 font-display text-3xl text-red transition-all duration-500 ease-out-expo group-hover:-translate-x-3 group-hover:text-bone sm:text-4xl">
                {it.year}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
