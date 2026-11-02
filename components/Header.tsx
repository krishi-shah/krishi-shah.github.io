'use client';

import { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';

const NAV = [
  { id: 'work', label: 'Work' },
  { id: 'recognition', label: 'Recognition' },
  { id: 'about', label: 'About' },
  { id: 'journey', label: 'Journey' },
  { id: 'writing', label: 'Writing' },
  { id: 'contact', label: 'Contact' },
];

export default function Header() {
  const [active, setActive] = useState('');
  const [motionOn, setMotionOn] = useState(true);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setMotionOn(!document.documentElement.classList.contains('motion-off'));

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
      let current = '';
      for (const n of NAV) {
        const el = document.getElementById(n.id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) current = n.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleMotion = () => {
    const next = !motionOn;
    setMotionOn(next);
    const root = document.documentElement;
    try {
      localStorage.setItem('motion', next ? 'on' : 'off');
    } catch {}
    root.classList.toggle('motion-off', !next);
    window.dispatchEvent(new Event('motionchange'));
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-ink/85 backdrop-blur-md">
      <div
        className="absolute left-0 top-0 h-[2px] bg-red transition-[width] duration-150"
        style={{ width: `${progress * 100}%` }}
        aria-hidden="true"
      />
      <div className="mx-auto flex h-[66px] max-w-[1400px] items-center justify-between px-5 sm:px-10">
        <a href="#home" data-build className="font-display text-[26px] leading-none tracking-tight text-bone">
          KRISHI<sup className="ml-0.5 align-super text-[11px] text-red">®</sup>
        </a>

        <nav data-build className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className={`flex items-center gap-2 text-[13px] transition-colors ${
                active === n.id ? 'text-bone' : 'text-dim hover:text-bone'
              }`}
            >
              <span
                className={`h-1 w-1 rounded-full bg-red transition-opacity ${active === n.id ? 'opacity-100' : 'opacity-0'}`}
              />
              {n.label}
            </a>
          ))}
        </nav>

        <div data-build className="flex items-center gap-6">
          <button
            type="button"
            onClick={toggleMotion}
            className="hidden items-center gap-2 text-[12px] text-dim transition-colors hover:text-bone sm:flex"
            aria-pressed={motionOn}
          >
            <span className="flex gap-[2px]" aria-hidden="true">
              <span className={`h-2.5 w-[3px] ${motionOn ? 'bg-bone' : 'bg-dim'}`} />
              <span className={`h-2.5 w-[3px] ${motionOn ? 'bg-bone' : 'bg-dim'}`} />
            </span>
            Motion {motionOn ? 'on' : 'off'}
          </button>
          <a
            href="#contact"
            className="hidden items-center gap-2 text-[14px] font-semibold text-bone sm:flex"
          >
            Let&apos;s talk <ArrowUpRight className="h-4 w-4 text-red" />
          </a>
          <button
            type="button"
            className="text-bone lg:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-ink px-6 py-5 lg:hidden">
          <div className="flex items-center justify-between">
            <span className="font-display text-[26px]">
              KRISHI<sup className="ml-0.5 text-[11px] text-red">®</sup>
            </span>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close menu">
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="mt-12 flex flex-col gap-4" aria-label="Mobile">
            {NAV.map((n, i) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                onClick={() => setOpen(false)}
                className="flex items-baseline gap-4 border-b border-line pb-4 font-display text-4xl uppercase"
              >
                <span className="font-sans text-xs text-red">0{i + 1}</span>
                {n.label}
              </a>
            ))}
          </nav>
          <button
            type="button"
            onClick={toggleMotion}
            className="mt-auto self-start text-sm text-dim"
          >
            Motion {motionOn ? 'on' : 'off'}
          </button>
        </div>
      )}
    </header>
  );
}
