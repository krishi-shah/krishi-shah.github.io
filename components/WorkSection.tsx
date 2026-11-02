'use client';

import { useMemo, useState } from 'react';
import { ArrowRight, ArrowUpRight, Search } from 'lucide-react';
import { getAllProjects } from '@/lib/content';

const projects = getAllProjects();

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

function categoryOf(p: (typeof projects)[number]) {
  return p.tags[0] || 'Tools';
}

/* A generated cover for each project: grid, scanlines, and the headline number. */
function Cover({ p, index }: { p: (typeof projects)[number]; index: number }) {
  const metric = p.metrics[0];
  const seed = index * 37;
  const bars = Array.from({ length: 22 }, (_, i) => 18 + ((Math.sin(seed + i * 1.7) + 1) / 2) * 62);
  return (
    <div className="relative aspect-[16/10] overflow-hidden bg-panel">
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      <div className="absolute inset-x-6 bottom-6 flex h-1/2 items-end gap-[3px] opacity-70 transition-opacity duration-500 group-hover:opacity-100">
        {bars.map((h, i) => (
          <div
            key={i}
            className="flex-1 bg-gradient-to-t from-red-deep to-red/70 transition-transform duration-700 ease-out-expo group-hover:scale-y-110"
            style={{ height: `${h}%`, transformOrigin: 'bottom', transitionDelay: `${i * 12}ms` }}
          />
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent" />
      <span className="absolute left-4 top-4 bg-ink/80 px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-bone/80">
        {categoryOf(p)}
      </span>
      <div className="absolute left-5 top-12 font-display text-5xl leading-none text-bone transition-transform duration-500 ease-out-expo group-hover:translate-x-1 sm:text-6xl">
        {metric ? metric.value : p.tech[0]}
      </div>
      <div className="absolute left-5 top-[6.6rem] text-[10px] font-bold uppercase tracking-wider text-dim sm:top-[7.6rem]">
        {metric ? metric.label : 'Open source'}
      </div>
    </div>
  );
}

export default function WorkSection() {
  const categories = useMemo(() => ['All', ...Array.from(new Set(projects.map(categoryOf)))], []);
  const [cat, setCat] = useState('All');
  const [q, setQ] = useState('');

  const shown = projects.filter((p) => {
    if (cat !== 'All' && categoryOf(p) !== cat) return false;
    if (!q.trim()) return true;
    const hay = `${p.title} ${p.tech.join(' ')} ${p.shortDescription}`.toLowerCase();
    return hay.includes(q.toLowerCase());
  });

  return (
    <section id="work" className="relative mx-auto max-w-[1400px] px-5 py-20 sm:px-10 sm:py-28">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div data-build>
          <p className="eyebrow text-red">01 / Selected work</p>
          <h2 className="mt-2 font-display text-5xl uppercase leading-none sm:text-6xl">
            Work that ships<span className="text-red">.</span>
          </h2>
        </div>
        <a
          data-build
          href="https://github.com/krishi-shah"
          target="_blank"
          rel="noreferrer"
          className="eyebrow flex items-center gap-3 text-bone hover:text-red"
        >
          All on GitHub <ArrowRight className="h-4 w-4" />
        </a>
      </div>

      <div data-build className="mt-10 flex flex-wrap items-center justify-between gap-4 border-b border-line pb-4">
        <div className="flex flex-wrap gap-x-7 gap-y-2">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCat(c)}
              className={`relative pb-1 text-[13px] transition-colors ${
                cat === c ? 'text-bone' : 'text-dim hover:text-bone'
              }`}
            >
              {c}
              <span
                className={`absolute -bottom-[17px] left-0 h-[2px] w-full bg-red transition-opacity ${
                  cat === c ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </button>
          ))}
        </div>
        <label className="flex items-center gap-2 text-[12px] text-dim">
          <Search className="h-4 w-4" />
          <span className="sr-only">Search projects</span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Title or stack"
            className="w-36 bg-transparent text-bone placeholder:text-dim focus:outline-none"
          />
        </label>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((p) => {
          const index = projects.indexOf(p);
          return (
            <a
              data-build
              key={p.slug}
              href={p.repo || `/projects/${p.slug}/`}
              target="_blank"
              rel="noreferrer"
              className="group block"
            >
              <Cover p={p} index={index} />
              <div className="mt-4 flex items-start gap-4">
                <span className="font-display text-4xl leading-none text-red">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="text-[15px] font-extrabold uppercase leading-tight text-bone">{p.title}</h3>
                  <p className="mt-1 text-[11px] uppercase tracking-wider text-dim">
                    {p.tech.slice(0, 2).join(' · ')} / {p.timeline || 'Ongoing'}
                  </p>
                  <p className="mt-3 text-[13px] leading-6 text-bone/65">{p.shortDescription}</p>
                </div>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-dim transition-colors group-hover:text-red" />
              </div>
            </a>
          );
        })}
        {shown.length === 0 && (
          <p className="col-span-full py-16 text-center text-sm text-dim">Nothing matches that search.</p>
        )}
      </div>

      {/* Organisations marquee */}
      <div className="mt-24 border-t border-line pt-8">
        <div data-build className="flex items-end justify-between">
          <p className="eyebrow leading-5 text-dim">
            Been part of
            <br />
            <span className="text-bone">the bigger picture.</span>
          </p>
        </div>
        <div data-build className="relative mt-8 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
          <div className="marquee-track flex w-max gap-14">
            {[...ORGS, ...ORGS].map((o, i) => (
              <span key={i} className="font-display text-3xl uppercase text-bone/25 transition-colors hover:text-bone sm:text-4xl">
                {o}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
