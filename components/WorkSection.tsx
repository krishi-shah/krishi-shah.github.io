import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { getAllProjects } from '@/lib/content';
import Lines from '@/components/Lines';
import SectionNumber from '@/components/SectionNumber';
import ProjectArt from '@/components/ProjectArt';

const projects = getAllProjects();
const total = String(projects.length).padStart(2, '0');

const ORGS = [
  'Ontario Government',
  'York University',
  'Lassonde',
  'All Good Accounting',
  'NFOX Technologies',
  'Suven Consultants',
  'Code Clause',
  'Level Up Coding',
  'CodeX',
  'York Data Science Club',
];

function headlineOf(p: (typeof projects)[number]) {
  const m = p.metrics[0];
  return { value: p.headline ?? m?.value ?? p.tech[0], label: p.headlineLabel ?? m?.label ?? 'Open source' };
}

function Details({ p }: { p: (typeof projects)[number] }) {
  const h = headlineOf(p);
  return (
    <>
      <p className="eyebrow text-bone/55">
        {p.tags[0] ?? 'Tools'} · {p.timeline || 'Ongoing'}
      </p>
      <h3 className="mt-3 font-display text-[clamp(2.4rem,4.4vw,4.2rem)] uppercase leading-[0.92] text-bone">{p.title}</h3>
      <p className="mt-4 line-clamp-3 max-w-md text-[15px] leading-7 text-bone/70">{p.longDescription || p.shortDescription}</p>
      <div className="mt-6 flex items-end gap-4 border-t border-line pt-5">
        <span className="num text-5xl font-semibold leading-none text-red">{h.value}</span>
        <span className="eyebrow pb-1 text-bone/55">{h.label}</span>
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {p.tech.map((t) => (
          <span key={t} className="eyebrow border border-line px-2.5 py-1.5 text-bone/70">
            {t}
          </span>
        ))}
      </div>
      <div className="mt-7 flex flex-wrap items-center gap-3">
        <a
          href={`/projects/${p.slug}/`}
          data-magnetic
          className="inline-flex w-fit items-center gap-5 bg-red px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-red-bright"
        >
          Read the case study <ArrowRight className="h-4 w-4" />
        </a>
        <a
          href={p.repo}
          target="_blank"
          rel="noreferrer"
          className="inline-flex w-fit items-center gap-3 border border-line px-5 py-3.5 text-sm font-semibold text-bone transition-colors hover:border-red hover:text-red"
        >
          Code <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </>
  );
}

export default function WorkSection() {
  return (
    <section id="work" className="relative overflow-clip border-t border-line">
      <SectionNumber n="01" />
      <div className="relative mx-auto max-w-[1400px] px-5 pt-20 sm:px-10 sm:pt-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div data-build>
            <p className="label">01 / Selected work</p>
            <h2 className="mt-4 font-display text-5xl uppercase leading-none sm:text-7xl">
              <Lines
                lines={[
                  <>
                    Work that ships<span className="text-red">.</span>
                  </>,
                ]}
              />
            </h2>
          </div>
          <a
            data-build
            data-magnetic
            href="https://github.com/krishi-shah"
            target="_blank"
            rel="noreferrer"
            className="eyebrow flex items-center gap-3 text-bone transition-colors hover:text-red"
          >
            All on GitHub <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>

      {/* Desktop: one project fills the screen at a time while the section is pinned */}
      <div
        data-showcase
        className="relative hidden lg:block"
        style={{ height: `calc(${projects.length - 1} * 80svh + 100svh)` }}
      >
        <div data-build className="sticky top-[66px] h-[calc(100svh-66px)] overflow-hidden">
          {projects.map((p, i) => (
            <article
              key={p.slug}
              data-slide
              className="absolute inset-0 bg-ink"
              style={{ zIndex: i + 1, transform: i === 0 ? 'none' : 'translate3d(0,100%,0)' }}
            >
              <div className="mx-auto grid h-full max-w-[1400px] grid-cols-12 gap-10 px-10 pb-16 pt-8">
                <a
                  href={`/projects/${p.slug}/`}
                  className="relative col-span-7 block h-full overflow-hidden"
                  aria-label={`${p.title} case study`}
                  data-cursor="View"
                >
                  <ProjectArt slug={p.slug} index={i} className="h-full w-full" />
                  <span aria-hidden="true" className="num absolute left-6 top-5 text-[8rem] font-semibold leading-none text-white/10">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </a>
                <div className="col-span-5 flex flex-col justify-center">
                  <Details p={p} />
                </div>
              </div>
              <div data-slide-dim className="pointer-events-none absolute inset-0 bg-black opacity-0" />
            </article>
          ))}

          {/* Counter and progress stay put while slides move */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[60]">
            <div className="mx-auto flex max-w-[1400px] items-center gap-6 px-10 pb-6">
              <span className="num text-sm text-bone">
                <span data-slide-counter>01</span>
                <span className="text-bone/55"> / {total}</span>
              </span>
              <span className="relative h-px flex-1 bg-line">
                <span data-slide-progress className="absolute inset-0 origin-left bg-red" style={{ transform: 'scaleX(0)' }} />
              </span>
              <span className="eyebrow text-bone/55">Scroll</span>
            </div>
          </div>
        </div>
      </div>

      {/* Phones and tablets: large stacked cards */}
      <div className="mx-auto max-w-[1400px] px-5 pt-12 sm:px-10 lg:hidden">
        <div className="space-y-14">
          {projects.map((p, i) => {
            const h = headlineOf(p);
            return (
              <a data-build key={p.slug} href={`/projects/${p.slug}/`} className="group block">
                <div className="relative">
                  <ProjectArt slug={p.slug} index={i} className="aspect-[16/10] w-full" />
                  <span aria-hidden="true" className="num absolute left-4 top-3 text-6xl font-semibold leading-none text-white/15">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <p className="eyebrow mt-5 text-bone/55">
                  {p.tags[0] ?? 'Tools'} · {p.timeline || 'Ongoing'}
                </p>
                <div className="mt-2 flex items-start justify-between gap-4">
                  <h3 className="font-display text-4xl uppercase leading-[0.95] text-bone">{p.title}</h3>
                  <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-bone/50 transition-transform group-hover:translate-x-1" />
                </div>
                <p className="mt-3 text-[15px] leading-7 text-bone/70">{p.shortDescription}</p>
                <p className="mt-4 flex items-baseline gap-3">
                  <span className="num text-3xl font-semibold text-red">{h.value}</span>
                  <span className="eyebrow text-bone/55">{h.label}</span>
                </p>
              </a>
            );
          })}
        </div>
      </div>

      {/* Organisations */}
      <div className="mx-auto max-w-[1400px] px-5 pb-20 pt-20 sm:px-10 sm:pb-28">
        <div className="border-t border-line pt-8">
          <p data-build className="label">Been part of the bigger picture</p>
          <div
            data-build
            className="relative mt-8 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]"
          >
            <div className="marquee-track flex w-max gap-14">
              {[...ORGS, ...ORGS].map((o, i) => (
                <span key={i} className="font-display text-3xl uppercase text-bone/25 transition-colors hover:text-bone sm:text-4xl">
                  {o}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
