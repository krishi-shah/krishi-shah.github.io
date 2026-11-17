import { ArrowUpRight } from 'lucide-react';
import Lines from '@/components/Lines';
import SectionNumber from '@/components/SectionNumber';
import { experiences, volunteerExperience, type Role as Role_ } from '@/lib/resume';

type Role = Role_;

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
            href="/resume/"
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
                  <span className={r.kind === 'Leadership' ? 'text-bone/80' : 'text-red-text'}>{r.kind}</span>
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
