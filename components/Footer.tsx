'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { getSiteConfig } from '@/lib/content';

const site = getSiteConfig();
const NAME = ['KRISHI', 'SHAH'];

function torontoTime() {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Toronto',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
    .format(new Date())
    .replace('a.m.', 'AM')
    .replace('p.m.', 'PM');
}

export default function Footer() {
  const [time, setTime] = useState('');
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    setTime(torontoTime());
    const id = window.setInterval(() => setTime(torontoTime()), 15000);
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setInView(true), { threshold: 0.25 });
    if (ref.current) io.observe(ref.current);
    return () => {
      window.clearInterval(id);
      io.disconnect();
    };
  }, []);

  let letterIndex = 0;

  return (
    <footer className="relative overflow-hidden border-t border-line">
      <div className="mx-auto max-w-[1400px] px-5 pt-14 sm:px-10">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <p className="eyebrow text-bone/55">Local time</p>
            <p className="num mt-2 text-2xl font-semibold text-bone">
              Toronto, <span suppressHydrationWarning>{time || '·'}</span>
            </p>
          </div>
          <div>
            <p className="eyebrow text-bone/55">Status</p>
            <p className="mt-2 flex items-center gap-2.5 text-[15px] font-semibold text-bone">
              <span className="relative flex h-2.5 w-2.5">
                <span className="footer-ping absolute inset-0 rounded-full bg-red" />
                <span className="relative h-2.5 w-2.5 rounded-full bg-red" />
              </span>
              Open to Winter 2027
            </p>
          </div>
          <div className="flex flex-wrap items-start gap-x-6 gap-y-2 sm:justify-end">
            {[
              ['GitHub', site.social.github],
              ['LinkedIn', site.social.linkedin],
              ['Medium', site.social.medium],
              ['Email', `mailto:${site.email}`],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                className="eyebrow text-bone/70 transition-colors hover:text-red"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div ref={ref} className={`footer-name mt-10 overflow-hidden px-4 sm:mt-14 ${inView ? 'is-in' : ''}`} data-name>
        <span className="sr-only">Krishi Shah</span>
        <div className="flex justify-center font-display uppercase leading-[0.82] text-bone" aria-hidden="true">
          {NAME.join(' ')
            .split('')
            .map((ch, i) => {
              const idx = ch === ' ' ? -1 : letterIndex++;
              return ch === ' ' ? (
                <span key={i} className="w-[0.22em]" />
              ) : (
                <span key={i} className="footer-letter-mask">
                  <span className="footer-letter" style={{ transitionDelay: `${idx * 45}ms` }}>
                    {ch}
                  </span>
                </span>
              );
            })}
        </div>
      </div>

      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-6 sm:px-10">
        <span className="eyebrow text-bone/55">© {new Date().getFullYear()} Krishi Shah</span>
        <button
          type="button"
          onClick={() => {
            const lenis = (window as any).__lenis;
            window.dispatchEvent(new Event('navjump'));
            if (lenis) lenis.scrollTo(0, { duration: 1.4 });
            else window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="eyebrow flex items-center gap-2 text-bone/60 transition-colors hover:text-red"
        >
          Back to top <ArrowUp className="h-3.5 w-3.5" />
        </button>
      </div>
    </footer>
  );
}
