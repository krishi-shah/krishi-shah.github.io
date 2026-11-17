'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight, CornerDownLeft } from 'lucide-react';
import { ask, SUGGESTIONS, type Card } from '@/lib/ask';

type Result = { q: string; hits: Card[] };

function go(href: string) {
  if (href.startsWith('#')) {
    const el = document.getElementById(href.slice(1));
    if (!el) return;
    window.dispatchEvent(new Event('navjump'));
    const still = document.documentElement.classList.contains('motion-off');
    el.scrollIntoView({ behavior: still ? 'auto' : 'smooth' });
    return;
  }
  window.location.href = href;
}

function Go({ href, className, children }: { href: string; className: string; children: React.ReactNode }) {
  return (
    <a
      href={href.startsWith('#') ? `/${href}` : href}
      className={className}
      onClick={(e) => {
        if (!href.startsWith('#')) return;
        e.preventDefault();
        go(href);
      }}
    >
      {children}
    </a>
  );
}

export default function AskSection() {
  const [q, setQ] = useState('');
  const [res, setRes] = useState<Result | null>(null);
  const input = useRef<HTMLInputElement>(null);
  const id = useId();

  const run = (text: string) => {
    const t = text.trim();
    if (!t) return;
    setQ(t);
    setRes({ q: t, hits: ask(t).map((h) => h.card) });
  };

  // The command bar can hand a question over to this box
  useEffect(() => {
    const onAsk = (e: Event) => {
      const text = (e as CustomEvent<string>).detail ?? '';
      window.dispatchEvent(new Event('navjump'));
      const box = input.current?.closest('form');
      if (box) window.scrollTo({ top: box.getBoundingClientRect().top + window.scrollY - 110, behavior: 'instant' as ScrollBehavior });
      run(text);
      requestAnimationFrame(() => input.current?.focus({ preventScroll: true }));
    };
    window.addEventListener('askquestion', onAsk);
    return () => window.removeEventListener('askquestion', onAsk);
  }, []);

  const [top, ...rest] = res?.hits ?? [];

  return (
    <section id="ask" className="relative overflow-clip border-t border-line bg-[#0c0c0c]">
      <div className="relative mx-auto grid max-w-[1400px] gap-12 px-5 py-20 sm:px-10 sm:py-24 lg:grid-cols-[1fr_1.5fr]">
        <div data-build>
          <p className="label">Ask before you email</p>
          <h2 className="mt-3 font-display text-5xl uppercase leading-[0.95] sm:text-7xl">
            Ask about
            <br />
            <span className="text-bone/55">Krishi.</span>
          </h2>
          <p className="mt-6 max-w-sm text-sm leading-7 text-bone/70">
            Availability, projects, stack, research. Ask in plain words and get the answer from this site, with a link
            to the details.
          </p>
          <p className="eyebrow mt-6 max-w-sm leading-6 text-bone/50">
            Keyword search over this site&apos;s own text. No AI model, so it can&apos;t make anything up.
          </p>
        </div>

        <div data-build>
          <form
            role="search"
            onSubmit={(e) => {
              e.preventDefault();
              run(q);
            }}
            className="ask-box flex items-center gap-3 border border-line bg-panel px-4 transition-colors focus-within:border-red"
          >
            <label htmlFor={id} className="sr-only">
              Ask a question about Krishi
            </label>
            <span className="num text-red" aria-hidden="true">
              &gt;
            </span>
            <input
              ref={input}
              id={id}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Is he available for Summer 2027?"
              autoComplete="off"
              enterKeyHint="search"
              className="h-16 min-w-0 flex-1 bg-transparent text-[16px] text-bone placeholder:text-bone/45 focus:outline-none"
            />
            <button
              type="submit"
              className="flex h-10 items-center gap-2 bg-red px-4 text-sm font-semibold text-white transition-colors hover:bg-red-bright"
            >
              Ask <CornerDownLeft className="h-4 w-4" aria-hidden="true" />
            </button>
          </form>

          <div className="mt-4 flex flex-wrap gap-2" aria-label="Suggested questions">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => run(s)}
                className="border border-line px-3 py-1.5 text-[13px] text-bone/75 transition-colors hover:border-red hover:text-bone"
              >
                {s}
              </button>
            ))}
          </div>

          <div aria-live="polite" className="mt-8 min-h-[180px]">
            {res && !top && (
              <div key={res.q} className="ask-answer border-l-2 border-bone/30 pl-5">
                <p className="eyebrow text-bone/55">No match</p>
                <p className="mt-2 text-[16px] leading-7 text-bone/85">
                  Nothing on this site answers that yet. Try asking about projects, experience, skills or availability,
                  or email him directly.
                </p>
                <Go href="#contact" className="eyebrow mt-4 inline-flex items-center gap-2 text-red-text hover:text-bone">
                  Contact options <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Go>
              </div>
            )}
            {top && (
              <div key={res!.q} className="ask-answer">
                <div className="border-l-2 border-red pl-5">
                  <p className="eyebrow text-red-text">{top.title}</p>
                  <p className="mt-2 text-[17px] leading-8 text-bone/90">{top.answer}</p>
                  <Go href={top.href} className="eyebrow mt-4 inline-flex items-center gap-2 text-bone transition-colors hover:text-red">
                    {top.cta} <ArrowUpRight className="h-4 w-4 text-red" aria-hidden="true" />
                  </Go>
                </div>
                {rest.length > 0 && (
                  <div className="mt-8">
                    <p className="eyebrow text-bone/45">Also related</p>
                    <ul className="mt-2 border-t border-line">
                      {rest.map((c) => (
                        <li key={c.id}>
                          <Go href={c.href} className="group flex w-full items-center justify-between gap-4 border-b border-line py-3 text-left">
                            <span className="text-[15px] font-semibold text-bone/85 group-hover:text-bone">{c.title}</span>
                            <ArrowRight className="h-4 w-4 shrink-0 text-bone/40 transition-transform group-hover:translate-x-1 group-hover:text-red" aria-hidden="true" />
                          </Go>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
