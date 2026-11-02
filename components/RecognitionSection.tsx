import { ArrowUpRight } from 'lucide-react';

const ITEMS = [
  { title: 'Co-op of the Year Nominee', org: 'Ontario Government', year: '2025' },
  { title: 'Lead Developer and Executive', org: 'York University Data Science Club', year: '2024' },
  { title: '8 Technical Articles', org: 'Level Up Coding and CodeX', year: '2024' },
  { title: '5x University Gold Medalist', org: 'Parul University, highest GPA overall', year: '2023' },
  { title: "Dean's List", org: 'Parul University', year: '2023' },
  { title: 'Published Author', org: 'The Awakening Code', year: 'Book' },
];

function Laurel({ flip = false }: { flip?: boolean }) {
  // Leaves placed along a curved stem, each rotated to follow it.
  const leaves = Array.from({ length: 7 }, (_, i) => {
    const t = i / 6;
    const a = Math.PI * (0.95 - t * 0.75);
    const cx = 44 + Math.cos(a) * 34;
    const cy = 50 - Math.sin(a) * 40 + t * 2;
    const rot = (-a * 180) / Math.PI + 90 + (i % 2 ? 28 : -28);
    return { cx, cy, rot, s: 1 - t * 0.35 };
  });
  return (
    <svg
      viewBox="0 0 50 100"
      className={`h-24 w-12 text-red ${flip ? '-scale-x-100' : ''}`}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M44 96 C 14 82, 6 52, 16 14" fill="none" stroke="currentColor" strokeWidth="1.5" />
      {leaves.map((l, i) => (
        <ellipse
          key={i}
          cx={l.cx - 20}
          cy={l.cy + 30 - i * 2}
          rx={3.4 * l.s}
          ry={9 * l.s}
          transform={`rotate(${l.rot} ${l.cx - 20} ${l.cy + 30 - i * 2})`}
        />
      ))}
    </svg>
  );
}

export default function RecognitionSection() {
  return (
    <section id="recognition" className="border-y border-line bg-gradient-to-b from-[#0d0d0d] to-ink">
      <div className="mx-auto grid max-w-[1400px] gap-14 px-5 py-20 sm:px-10 sm:py-24 lg:grid-cols-[1fr_1.3fr]">
        <div>
          <div data-build>
            <p className="eyebrow text-red">Recognition &amp; milestones</p>
            <h2 className="mt-3 font-display text-5xl uppercase leading-[0.95] sm:text-7xl">
              The work.
              <br />
              <span className="text-red">The recognition.</span>
            </h2>
          </div>
          <div data-build className="mt-10 flex items-center gap-2">
            <Laurel />
            <div className="text-center">
              <div className="font-display text-7xl leading-none text-bone">
                5<span className="text-3xl text-red">x</span>
              </div>
              <div className="eyebrow mt-2 text-[10px] text-red">Gold medals</div>
            </div>
            <Laurel flip />
          </div>
          <p data-build className="mt-6 max-w-sm text-sm leading-7 text-bone/70">
            Work done carefully, and measured honestly.
            <br />
            The recognition is a reason to keep raising the bar.
          </p>
          <a
            data-build
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
              className="group flex items-center gap-5 border-b border-line py-5 transition-colors hover:bg-white/[0.02]"
            >
              <span className="w-6 text-[11px] font-bold text-red">{String(i + 1).padStart(2, '0')}</span>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-bone sm:text-xl">{it.title}</h3>
                <p className="mt-0.5 text-[12px] text-dim">{it.org}</p>
              </div>
              <span className="font-display text-3xl text-red transition-transform duration-500 ease-out-expo group-hover:-translate-x-2 sm:text-4xl">
                {it.year}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
