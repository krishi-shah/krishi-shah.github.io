'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

/*
  Page wide visual effects, all driven from one place:
  smooth scroll, custom cursor, magnetic buttons, scroll parallax,
  hero spotlight and portrait tilt, 3D card tilt, counting numbers,
  and the self drawing timeline. Mouse effects only run on devices with
  a fine pointer; motion effects stop when Motion is switched off.
*/

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

export default function Effects() {
  useEffect(() => {
    const root = document.documentElement;
    const motionOff = () => root.classList.contains('motion-off');
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const off: Array<() => void> = [];
    const on = <K extends keyof WindowEventMap>(
      t: Window | Document,
      type: K | string,
      fn: (e: any) => void,
      opts?: AddEventListenerOptions,
    ) => {
      t.addEventListener(type, fn, opts);
      off.push(() => t.removeEventListener(type, fn, opts));
    };

    // ---------------- Smooth scroll ----------------
    let lenis: Lenis | null = null;
    let lenisRaf = 0;
    const startLenis = () => {
      if (lenis || motionOff() || !fine) return;
      lenis = new Lenis({ lerp: 0.11, smoothWheel: true, anchors: { offset: -66 } });
      const loop = (t: number) => {
        lenis?.raf(t);
        lenisRaf = requestAnimationFrame(loop);
      };
      lenisRaf = requestAnimationFrame(loop);
    };
    const stopLenis = () => {
      cancelAnimationFrame(lenisRaf);
      lenis?.destroy();
      lenis = null;
    };
    startLenis();

    // ---------------- Custom cursor ----------------
    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let dot: HTMLDivElement | null = null;
    let ring: HTMLDivElement | null = null;
    let ringLabel: HTMLSpanElement | null = null;
    if (fine) {
      root.classList.add('has-cursor');
      dot = document.createElement('div');
      dot.className = 'cc-dot';
      ring = document.createElement('div');
      ring.className = 'cc-ring';
      ringLabel = document.createElement('span');
      ring.appendChild(ringLabel);
      document.body.append(ring, dot);

      on(window, 'mousemove', (e: MouseEvent) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot!.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
        root.classList.remove('cc-hidden');
      });
      on(document, 'mouseleave', () => root.classList.add('cc-hidden'));
      on(window, 'mousedown', () => ring!.classList.add('is-down'));
      on(window, 'mouseup', () => ring!.classList.remove('is-down'));
      on(document, 'mouseover', (e: MouseEvent) => {
        const t = e.target as HTMLElement;
        const labelled = t.closest?.('[data-cursor]') as HTMLElement | null;
        const interactive = t.closest?.('a, button, input, label, [role="slider"]');
        ring!.classList.toggle('is-hover', !!interactive);
        ring!.classList.toggle('has-label', !!labelled);
        ringLabel!.textContent = labelled?.dataset.cursor ?? '';
      });
    }

    // ---------------- Magnetic buttons ----------------
    const magnets = () => Array.from(document.querySelectorAll<HTMLElement>('[data-magnetic]'));
    const onMagnet = (e: MouseEvent) => {
      if (motionOff()) return;
      for (const el of magnets()) {
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const reach = Math.max(r.width, r.height) / 2 + 70;
        if (Math.hypot(dx, dy) < reach) {
          el.style.translate = `${dx * 0.28}px ${dy * 0.35}px`;
          el.classList.add('is-magnet');
        } else if (el.classList.contains('is-magnet')) {
          el.style.translate = '';
          el.classList.remove('is-magnet');
        }
      }
    };
    if (fine) on(window, 'mousemove', onMagnet);

    // ---------------- Hero spotlight and portrait tilt ----------------
    const hero = document.getElementById('home');
    const heroTilt = document.querySelector<HTMLElement>('[data-hero-tilt]');
    if (fine && hero) {
      on(hero, 'mousemove', (e: MouseEvent) => {
        const r = hero.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        hero.style.setProperty('--mx', `${px * 100}%`);
        hero.style.setProperty('--my', `${py * 100}%`);
        hero.classList.add('spot-on');
        if (heroTilt && !motionOff()) {
          heroTilt.style.transform = `perspective(1200px) rotateY(${(px - 0.5) * 7}deg) rotateX(${(0.5 - py) * 4}deg)`;
        }
      });
      on(hero, 'mouseleave', () => {
        hero.classList.remove('spot-on');
        if (heroTilt) heroTilt.style.transform = '';
      });
    }

    // ---------------- 3D card tilt ----------------
    let tiltEl: HTMLElement | null = null;
    if (fine) {
      on(document, 'mousemove', (e: MouseEvent) => {
        const el = (e.target as HTMLElement).closest?.('[data-tilt]') as HTMLElement | null;
        if (tiltEl && tiltEl !== el) {
          tiltEl.style.transform = '';
          tiltEl = null;
        }
        if (!el || motionOff()) return;
        tiltEl = el;
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        const k = Number(el.dataset.tilt || 8);
        el.style.transform = `perspective(900px) rotateX(${-py * k}deg) rotateY(${px * k}deg)`;
        el.style.setProperty('--gx', `${(px + 0.5) * 100}%`);
        el.style.setProperty('--gy', `${(py + 0.5) * 100}%`);
      });
    }

    // ---------------- Scroll driven: parallax, hero lag, timeline ----------------
    let ticking = false;
    const onScrollFrame = () => {
      ticking = false;
      const vh = window.innerHeight;
      const still = motionOff();

      document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
        if (still) return void (el.style.translate = '');
        const host = el.parentElement!.getBoundingClientRect();
        if (host.bottom < -200 || host.top > vh + 200) return;
        const offset = host.top + host.height / 2 - vh / 2;
        el.style.translate = `0 ${-offset * Number(el.dataset.parallax)}px`;
      });

      document.querySelectorAll<HTMLElement>('[data-lag]').forEach((el) => {
        if (still) return void (el.style.translate = '');
        const y = Math.min(window.scrollY, vh * 1.2);
        el.style.translate = `0 ${y * Number(el.dataset.lag)}px`;
      });

      document.querySelectorAll<HTMLElement>('[data-progress]').forEach((el) => {
        const r = el.getBoundingClientRect();
        const p = still ? 1 : clamp((vh * 0.6 - r.top) / r.height, 0, 1);
        el.style.setProperty('--p', p.toFixed(4));
      });
    };
    const requestFrame = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(onScrollFrame);
    };
    on(window, 'scroll', requestFrame, { passive: true });
    on(window, 'resize', requestFrame);
    onScrollFrame();

    // ---------------- Counting numbers ----------------
    const counted = new WeakSet<HTMLElement>();
    const countUp = (el: HTMLElement) => {
      if (counted.has(el)) return;
      counted.add(el);
      const target = el.dataset.count || el.textContent || '0';
      const value = parseFloat(target);
      const decimals = (target.split('.')[1] || '').length;
      if (motionOff() || Number.isNaN(value)) return;
      const start = performance.now();
      const dur = 1300;
      const step = (now: number) => {
        const t = clamp((now - start) / dur, 0, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = (value * eased).toFixed(decimals);
        if (t < 1) requestAnimationFrame(step);
        else el.textContent = target;
      };
      el.textContent = (0).toFixed(decimals);
      requestAnimationFrame(step);
    };
    const counterIO = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          counterIO.unobserve(el);
          // Wait until the cursors have revealed the number, then count.
          const host = el.closest('[data-build]');
          const started = performance.now();
          const wait = () => {
            const ready =
              !root.classList.contains('cb-armed') || !host || host.classList.contains('is-built');
            if (ready || performance.now() - started > 5000) countUp(el);
            else setTimeout(wait, 80);
          };
          wait();
        }),
      { threshold: 0.4 },
    );
    document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => counterIO.observe(el));

    // ---------------- Motion toggle ----------------
    on(window, 'motionchange', () => {
      if (motionOff()) {
        stopLenis();
        document.querySelectorAll<HTMLElement>('[data-magnetic],[data-parallax],[data-lag]').forEach((el) => {
          el.style.translate = '';
        });
        document.querySelectorAll<HTMLElement>('[data-tilt],[data-hero-tilt]').forEach((el) => {
          el.style.transform = '';
        });
      } else {
        startLenis();
      }
      onScrollFrame();
    });

    // Custom cursor ring follows with a little lag.
    let cursorRaf = 0;
    if (fine) {
      const follow = () => {
        ringX += (mouseX - ringX) * 0.2;
        ringY += (mouseY - ringY) * 0.2;
        ring!.style.transform = `translate(${ringX}px, ${ringY}px)`;
        cursorRaf = requestAnimationFrame(follow);
      };
      cursorRaf = requestAnimationFrame(follow);
    }

    return () => {
      off.forEach((f) => f());
      counterIO.disconnect();
      cancelAnimationFrame(cursorRaf);
      stopLenis();
      dot?.remove();
      ring?.remove();
      root.classList.remove('has-cursor');
    };
  }, []);

  return null;
}
