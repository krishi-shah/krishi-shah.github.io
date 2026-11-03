'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, Copy, Download, ExternalLink, Gauge, Search } from 'lucide-react';
import { getSiteConfig } from '@/lib/content';

const site = getSiteConfig();

type Cmd = { id: string; label: string; hint: string; group: string; icon: 'go' | 'copy' | 'cv' | 'link' | 'motion'; run: () => void };

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  window.dispatchEvent(new Event('navjump'));
  const still = document.documentElement.classList.contains('motion-off');
  el.scrollIntoView({ behavior: still ? 'auto' : 'smooth' });
}

const ICONS = { go: ArrowRight, copy: Copy, cv: Download, link: ExternalLink, motion: Gauge };

export default function CommandBar() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [sel, setSel] = useState(0);
  const [toast, setToast] = useState('');
  const input = useRef<HTMLInputElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  const say = (t: string) => {
    setToast(t);
    window.setTimeout(() => setToast(''), 1800);
  };

  const commands: Cmd[] = useMemo(
    () => [
      ...[
        ['home', 'Top'],
        ['work', 'Work'],
        ['results', 'Results'],
        ['recognition', 'Recognition'],
        ['about', 'About'],
        ['journey', 'Journey'],
        ['writing', 'Writing'],
        ['contact', 'Contact'],
      ].map(([id, label]) => ({
        id: `go-${id}`,
        label: `Go to ${label}`,
        hint: 'Section',
        group: 'Navigate',
        icon: 'go' as const,
        run: () => scrollToId(id),
      })),
      {
        id: 'copy-email',
        label: 'Copy email address',
        hint: site.email,
        group: 'Actions',
        icon: 'copy',
        run: () => {
          navigator.clipboard?.writeText(site.email).then(
            () => say('Email copied'),
            () => say(site.email),
          );
        },
      },
      { id: 'cv', label: 'Download CV', hint: 'PDF', group: 'Actions', icon: 'cv', run: () => window.open('/resume.pdf', '_blank') },
      { id: 'gh', label: 'Open GitHub', hint: '@krishi-shah', group: 'Links', icon: 'link', run: () => window.open(site.social.github, '_blank') },
      { id: 'li', label: 'Open LinkedIn', hint: 'in/krishi-shah3', group: 'Links', icon: 'link', run: () => window.open(site.social.linkedin, '_blank') },
      { id: 'md', label: 'Open Medium', hint: 'Articles', group: 'Links', icon: 'link', run: () => window.open(site.social.medium, '_blank') },
      {
        id: 'motion',
        label: 'Toggle motion',
        hint: 'Animations on or off',
        group: 'Actions',
        icon: 'motion',
        run: () => window.dispatchEvent(new Event('togglemotion')),
      },
    ],
    [],
  );

  const shown = commands.filter((c) => (c.label + ' ' + c.hint).toLowerCase().includes(q.trim().toLowerCase()));

  const close = useCallback(() => {
    setOpen(false);
    lastFocus.current?.focus?.();
  }, []);

  const openBar = useCallback(() => {
    lastFocus.current = document.activeElement as HTMLElement;
    setQ('');
    setSel(0);
    setOpen(true);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      const typing = t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable);
      if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey || !typing) && !e.altKey) {
        if (typing && !(e.metaKey || e.ctrlKey)) return;
        e.preventDefault();
        if (open) close();
        else openBar();
      }
    };
    const onOpen = () => openBar();
    window.addEventListener('keydown', onKey);
    window.addEventListener('opencommand', onOpen);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('opencommand', onOpen);
    };
  }, [open, close, openBar]);

  useEffect(() => {
    if (open) requestAnimationFrame(() => input.current?.focus());
  }, [open]);

  const run = (c: Cmd | undefined) => {
    if (!c) return;
    close();
    window.setTimeout(c.run, 60);
  };

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[14vh]" role="dialog" aria-modal="true" aria-label="Command bar">
          <button type="button" aria-label="Close" className="cmd-backdrop absolute inset-0 bg-black/75" onClick={close} />
          <div className="cmd-panel relative w-full max-w-[560px] border border-line bg-panel shadow-[0_30px_80px_rgba(0,0,0,0.6)]">
            <div className="flex items-center gap-3 border-b border-line px-4">
              <Search className="h-4 w-4 text-bone/50" />
              <input
                ref={input}
                value={q}
                onChange={(e) => {
                  setQ(e.target.value);
                  setSel(0);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') close();
                  if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    setSel((v) => Math.min(shown.length - 1, v + 1));
                  }
                  if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    setSel((v) => Math.max(0, v - 1));
                  }
                  if (e.key === 'Enter') run(shown[sel]);
                }}
                placeholder="Type a command or section"
                className="h-14 flex-1 bg-transparent text-[15px] text-bone placeholder:text-bone/55 focus:outline-none"
                aria-label="Search commands"
              />
              <kbd className="eyebrow border border-line px-1.5 py-0.5 text-bone/50">Esc</kbd>
            </div>
            <ul className="max-h-[52vh] overflow-y-auto py-2" role="listbox">
              {shown.length === 0 && <li className="px-4 py-6 text-center text-sm text-bone/50">No matches</li>}
              {shown.map((c, i) => {
                const Icon = ICONS[c.icon];
                const showGroup = i === 0 || shown[i - 1].group !== c.group;
                return (
                  <li key={c.id}>
                    {showGroup && <p className="eyebrow px-4 pb-1 pt-3 text-bone/35">{c.group}</p>}
                    <button
                      type="button"
                      role="option"
                      aria-selected={i === sel}
                      onMouseMove={() => setSel(i)}
                      onClick={() => run(c)}
                      className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-[14px] transition-colors ${
                        i === sel ? 'bg-red text-white' : 'text-bone/85'
                      }`}
                    >
                      <Icon className="h-4 w-4 shrink-0 opacity-80" />
                      <span className="flex-1">{c.label}</span>
                      <span className={`eyebrow ${i === sel ? 'text-white/80' : 'text-bone/55'}`}>{c.hint}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
            <div className="eyebrow flex items-center gap-4 border-t border-line px-4 py-2.5 text-bone/55">
              <span>↑ ↓ to move</span>
              <span>Enter to run</span>
              <span className="ml-auto">K to toggle</span>
            </div>
          </div>
        </div>
      )}
      {toast && (
        <div className="eyebrow fixed bottom-6 left-1/2 z-[101] -translate-x-1/2 bg-red px-4 py-2.5 text-white" role="status">
          {toast}
        </div>
      )}
    </>
  );
}
