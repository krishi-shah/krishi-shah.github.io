import { ArrowDown, ArrowUpRight, Download, MapPin } from 'lucide-react';

const STATS = [
  { value: '0.997', suffix: '', label: 'AUC ROC on AI image detection' },
  { value: '1', suffix: 'yr', label: 'Production engineering, Ontario Government' },
  { value: '8', suffix: '+', label: 'Technical articles published', link: 'https://medium.com/@krishishah2021' },
];

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-[66px]">
      <div className="relative mx-auto min-h-[calc(100svh-66px)] max-w-[1400px] px-5 pb-10 sm:px-10">
        {/* Top labels */}
        <div className="relative z-20 flex items-start justify-between pt-7">
          <div data-build className="eyebrow leading-5">
            <div className="text-red">ML Engineer / Data Scientist</div>
            <div className="text-bone/80">Research · York University</div>
          </div>
          <div data-build className="eyebrow flex items-center gap-2 text-bone/80">
            <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-red" />
            <span className="hidden sm:inline">Open to Winter 2027 roles</span>
            <span className="sm:hidden">Open to work</span>
          </div>
        </div>

        {/* Giant word and portrait. On phones they sit in their own stage at the top;
            from lg up the wrapper is static so both pin to the full hero. */}
        <div className="relative mt-2 h-[min(118vw,520px)] sm:h-[560px] lg:static lg:mt-0 lg:h-auto">
          <div
            data-build
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-[6%] z-0 select-none lg:top-[13%]"
          >
            <div className="hero-word text-center font-display text-[24vw] uppercase lg:text-[22vw] xl:text-[19.5rem]">
              Portfolio
            </div>
          </div>

          <div
            data-build
            className="absolute -left-[20vw] -right-[20vw] bottom-0 z-10 mx-auto sm:inset-x-0 sm:w-[78vw] sm:max-w-[680px] lg:w-[46vw]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portrait.webp"
              alt="Krishi Shah"
              width={796}
              height={577}
              className="portrait-tint block h-auto w-full"
            />
          </div>
        </div>

        {/* Left column */}
        <div className="relative z-20 -mt-16 max-w-[420px] lg:mt-[9vh]">
          <p data-build className="-rotate-6 font-script text-5xl text-bone sm:text-6xl">
            Hello, I&apos;m
          </p>
          <h1 data-build className="mt-1 font-display text-[18vw] uppercase leading-[0.9] text-bone sm:text-[7.5rem]">
            Krishi<span className="red-dot" />
          </h1>
          <p data-build className="mt-6 text-2xl font-extrabold uppercase leading-tight text-red sm:text-[28px]">
            Applied ML &amp;
            <br />
            Data Science
          </p>
          <p data-build className="mt-5 max-w-[300px] text-[15px] leading-7 text-bone/75">
            Models that hold up. Claims that are tested. I take machine learning from raw data to calibrated,
            explainable systems in production.
          </p>
          <a
            data-build
            href="#work"
            className="mt-8 inline-flex items-center gap-6 bg-red px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-red-bright"
          >
            See my work <ArrowDown className="h-4 w-4" />
          </a>
          <p data-build className="mt-7 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-dim">
            <MapPin className="h-3.5 w-3.5 text-red" /> Toronto, Canada
          </p>
        </div>

        {/* Right column */}
        <div className="relative z-20 mt-16 w-full lg:absolute lg:right-10 lg:top-[38%] lg:mt-0 lg:w-[260px]">
          <div data-build className="mb-6 flex items-center gap-4">
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-red/40 text-xl text-red">
              ✳
            </span>
            <p className="text-[13px] leading-5 text-bone/85">
              Every model.
              <br />A measured claim.
            </p>
          </div>
          {STATS.map((s) => (
            <div data-build key={s.label} className="flex items-center gap-6 border-b border-line py-3.5">
              <div className="w-[88px] font-display text-[44px] leading-none text-red">
                {s.value}
                {s.suffix && <span className="ml-0.5 text-lg">{s.suffix}</span>}
              </div>
              <div className="eyebrow max-w-[140px] text-[10px] font-semibold leading-4 text-dim">
                {s.link ? (
                  <a href={s.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-bone">
                    {s.label} <ArrowUpRight className="h-3 w-3 text-red" />
                  </a>
                ) : (
                  s.label
                )}
              </div>
            </div>
          ))}
          <a
            data-build
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="eyebrow mt-5 inline-flex items-center gap-3 text-bone/85 hover:text-bone"
          >
            <Download className="h-4 w-4 text-red" /> Download CV
          </a>
        </div>
      </div>
      <div className="mx-auto h-px max-w-[1400px] bg-line" />
    </section>
  );
}
