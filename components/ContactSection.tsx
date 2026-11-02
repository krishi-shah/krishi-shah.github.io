import { ArrowUpRight, Mail } from 'lucide-react';
import { getSiteConfig } from '@/lib/content';
import Lines from '@/components/Lines';
import SectionNumber from '@/components/SectionNumber';

const site = getSiteConfig();

const CHANNELS = [
  { label: 'Email', value: site.email, href: `mailto:${site.email}` },
  { label: 'LinkedIn', value: 'in/krishi-shah3', href: site.social.linkedin },
  { label: 'GitHub', value: '@krishi-shah', href: site.social.github },
  { label: 'Based in', value: 'Toronto, Canada', href: '' },
];

export default function ContactSection() {
  return (
    <section id="contact" className="relative overflow-clip border-t border-line">
      <SectionNumber n="08" />
      <div className="relative mx-auto grid max-w-[1400px] gap-12 px-5 py-20 sm:px-10 sm:py-28 lg:grid-cols-[1.5fr_1fr]">
        <div>
          <div data-build>
            <p className="label">08 / Your next model</p>
            <h2 className="mt-3 font-display text-6xl uppercase leading-[0.9] sm:text-8xl">
              <Lines lines={['Let\u2019s build', <span key="t" className="text-bone/55">together.</span>]} />
            </h2>
            <p className="mt-6 max-w-md text-[15px] leading-7 text-bone/70">
              Have a problem worth modelling? Let&apos;s make something that works outside the notebook too.
            </p>
          </div>
          <a
            data-build
            data-magnetic
            href={`mailto:${site.email}`}
            className="mt-8 inline-flex items-center gap-6 bg-red px-6 py-4 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-red-bright"
          >
            Start a conversation <Mail className="h-4 w-4" />
          </a>

          <div className="mt-14 grid grid-cols-1 border-t border-line sm:grid-cols-2">
            {CHANNELS.map((c) => {
              const inner = (
                <>
                  <p className="eyebrow text-bone/55">{c.label}</p>
                  <p className="mt-2 flex items-center gap-2 text-[15px] font-semibold text-bone">
                    {c.value}
                    {c.href && <ArrowUpRight className="h-4 w-4 text-red opacity-0 transition-opacity group-hover:opacity-100" />}
                  </p>
                </>
              );
              return c.href ? (
                <a
                  data-build
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  className="group border-b border-line py-5 pr-6"
                >
                  {inner}
                </a>
              ) : (
                <div data-build key={c.label} className="border-b border-line py-5 pr-6">
                  {inner}
                </div>
              );
            })}
          </div>
        </div>

        <div data-build data-tilt="7" className="relative flex min-h-[380px] flex-col justify-between overflow-hidden bg-red p-8">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                'linear-gradient(rgba(0,0,0,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.35) 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }}
            aria-hidden="true"
          />
          <div className="relative flex items-start justify-between">
            <span className="font-display text-3xl text-white">
              KRISHI<sup className="text-xs">®</sup>
            </span>
            <span className="eyebrow text-right text-white/85">
              ML / Research
              <br />
              Data / Systems
            </span>
          </div>
          <div className="relative -mx-8 overflow-hidden">
            <span className="sr-only">Make it measurable.</span>
            {[0, 1].map((row) => (
              <div
                key={row}
                aria-hidden="true"
                className={`marquee-track flex w-max gap-6 whitespace-nowrap font-display text-6xl uppercase leading-[0.95] sm:text-7xl ${
                  row ? 'text-ink/80 [animation-direction:reverse]' : 'text-white'
                }`}
                style={{ animationDuration: '22s' }}
              >
                {Array.from({ length: 6 }, (_, i) => (
                  <span key={i}>{row ? 'Make it measurable ·' : 'Make it measurable ·'}</span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
