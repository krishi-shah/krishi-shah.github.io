import { ArrowDown, ArrowUpRight, Download, MapPin } from 'lucide-react';

const STATS = [
  { value: '0.997', suffix: '', label: 'AUC ROC on AI image detection' },
  { value: '1', suffix: 'yr', label: 'Production engineering, Ontario Government' },
  { value: '8', suffix: '+', label: 'Technical articles published', link: 'https://medium.com/@krishishah2021' },
];

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-[66px]">
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <div data-hero-spot className="hero-spot" />
      </div>
      <div className="relative mx-auto min-h-[calc(100svh-66px)] max-w-[1400px] px-5 pb-10 sm:px-10">
        {/* Top labels */}
        <div className="hero-top relative z-20 flex items-start justify-between pt-7">
          <div data-build className="eyebrow leading-5">
            <div className="text-bone/90">ML Engineer / Data Scientist</div>
            <div className="text-bone/50">Research · York University</div>
          </div>
          <div data-build className="eyebrow flex items-center gap-2 text-bone/80">
            <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-red" />
            <span className="hidden sm:inline">Open to Summer 2027 roles</span>
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
            <div data-lag="0.28">
              <div className="hero-word text-center font-display text-[24vw] uppercase lg:text-[22vw] xl:text-[19.5rem]">
                Portfolio
              </div>
            </div>
          </div>

          <div
            data-build
            className="absolute -left-[20vw] -right-[20vw] bottom-0 z-10 mx-auto sm:inset-x-0 sm:w-[78vw] sm:max-w-[680px] lg:w-[46vw]"
          >
            <div data-lag="0.08">
              <div data-hero-tilt className="relative">
                {/* Soft red light behind the subject so the photo sits in the scene */}
                <div
                  aria-hidden="true"
                  className="absolute inset-x-[4%] bottom-0 top-[-6%]"
                  style={{
                    background:
                      'radial-gradient(50% 55% at 50% 48%, rgba(227,38,59,0.30), rgba(227,38,59,0.10) 55%, transparent 75%)',
                  }}
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/portrait.webp"
                  srcSet="/images/portrait-800.webp 800w, /images/portrait-1200.webp 1200w, /images/portrait.webp 1561w"
                  sizes="(min-width: 1024px) 46vw, (min-width: 640px) 78vw, 140vw"
                  fetchPriority="high"
                  alt="Krishi Shah"
                  width={1561}
                  height={1141}
                  className="portrait-tint relative block h-auto w-full"
                />
                {/* The portrait gets scanned by an AI image detector */}
                <div className="scan-wrap pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
                  <div className="scan-heat" style={{ left: '30%', top: '4%', width: '38%', height: '56%' }} />
                  <div className="scan-sweep" />
                </div>
                <div
                  className="scan-box pointer-events-none absolute"
                  style={{ left: '35%', top: '10%', width: '28%', height: '44%' }}
                  aria-hidden="true"
                >
                  <span className="c tl" />
                  <span className="c tr" />
                  <span className="c bl" />
                  <span className="c br" />
                  <span className="scan-tag">
                    Real image <span className="opacity-60">·</span>{' '}
                    <span data-count="0.997" data-count-delay="1550">0.997</span>
                  </span>
                  <span className="scan-sub">class: human · model: effnet b3</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Left column */}
        <div className="hero-left relative z-20 -mt-16 max-w-[420px] lg:mt-[9vh]">
          <p data-build className="hero-hello -rotate-6 font-script text-5xl text-bone sm:text-6xl">
            Hello, I&apos;m
          </p>
          <h1 data-build data-type className="mt-1 w-fit font-display text-[18vw] uppercase leading-[0.9] text-bone sm:text-[7.5rem]">
            Krishi<span className="red-dot" />
          </h1>
          <p data-build className="hero-role mt-6 text-2xl font-extrabold uppercase leading-tight text-bone sm:text-[28px]">
            Applied ML &amp;
            <br />
            Data Science
          </p>
          <p data-build className="hero-copy mt-5 max-w-[300px] text-[15px] leading-7 text-bone/75">
            Models that hold up. Claims that are tested. I take machine learning from raw data to calibrated,
            explainable systems in production.
          </p>
          <a
            data-build
            data-magnetic
            data-finale
            href="#work"
            className="mt-8 inline-flex items-center gap-6 bg-red px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-red-bright"
          >
            See my work <ArrowDown className="h-4 w-4" />
          </a>
          <p data-build className="hero-loc eyebrow mt-7 flex items-center gap-2 text-bone/55">
            <MapPin className="h-3.5 w-3.5" /> Toronto, Canada
          </p>
        </div>

        {/* Right column */}
        <div className="hero-right relative z-20 mt-16 w-full lg:absolute lg:right-10 lg:top-[38%] lg:mt-0 lg:w-[260px]">
          <div data-build className="mb-6 flex items-center gap-4">
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-xl text-bone/70">
              ✳
            </span>
            <p className="text-[14px] leading-5 text-bone/85">
              Every model.
              <br />A measured claim.
            </p>
          </div>
          {STATS.map((s) => (
            <div data-build data-dup="stat" key={s.label} className="flex items-center gap-6 border-b border-line py-3.5">
              <div className="num w-[96px] text-[34px] font-semibold leading-none text-red">
                <span data-count={s.value}>{s.value}</span>
                {s.suffix && <span className="ml-0.5 text-base text-red/80">{s.suffix}</span>}
              </div>
              <div className="eyebrow max-w-[150px] leading-[1.45] text-bone/55">
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
            className="eyebrow mt-5 inline-flex items-center gap-3 text-bone/85 transition-colors hover:text-red"
          >
            <Download className="h-4 w-4" /> Download CV
          </a>
        </div>
      </div>
      <div className="mx-auto h-px max-w-[1400px] bg-line" />
    </section>
  );
}
