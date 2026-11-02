'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

/*
  Page wide visual effects, run from a single animation frame loop.

  Performance rules followed here:
  - Event handlers only record input; all DOM work happens once per frame.
  - Each frame reads layout first, then writes, so the browser never has to
    recalculate layout in the middle of a frame.
  - Scroll effects use positions measured once (and again on resize), so
    scrolling does no measuring at all.
  - Everything that moves is moved with transform or opacity only, on its
    own compositor layer, so the browser never repaints large areas.
  - The loop stops when nothing is moving.
*/

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

type Cached = { el: HTMLElement; top: number; height: number; k: number };

export default function Effects() {
  useEffect(() => {
    const root = document.documentElement;
    const motionOff = () => root.classList.contains('motion-off');
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const cleanups: Array<() => void> = [];
    const listen = (t: EventTarget, type: string, fn: (e: any) => void, opts?: AddEventListenerOptions) => {
      t.addEventListener(type, fn, opts);
      cleanups.push(() => t.removeEventListener(type, fn, opts));
    };

    // ---------------- Elements (queried once) ----------------
    const hero = document.getElementById('home');
    const heroSpot = document.querySelector<HTMLElement>('[data-hero-spot]');
    const heroTilt = document.querySelector<HTMLElement>('[data-hero-tilt]');
    const magnets = Array.from(document.querySelectorAll<HTMLElement>('[data-magnetic]'));
    const parallaxEls = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'));
    const lagEls = Array.from(document.querySelectorAll<HTMLElement>('[data-lag]'));
    const progressEls = Array.from(document.querySelectorAll<HTMLElement>('[data-progress]'));

    // ---------------- Cached geometry ----------------
    let vh = window.innerHeight;
    let parallax: Cached[] = [];
    let progress: (Cached & { fill: HTMLElement | null; dot: HTMLElement | null })[] = [];
    const measure = () => {
      vh = window.innerHeight;
      const sy = window.scrollY;
      // Clear transforms we own so measurements are of the resting layout.
      parallax = parallaxEls.map((el) => {
        const host = el.parentElement!.getBoundingClientRect();
        return { el, top: host.top + sy, height: host.height, k: Number(el.dataset.parallax) || 0 };
      });
      progress = progressEls.map((el) => {
        const r = el.getBoundingClientRect();
        return {
          el,
          top: r.top + sy,
          height: r.height,
          k: 0,
          fill: el.querySelector<HTMLElement>('.progress-fill'),
          dot: el.querySelector<HTMLElement>('.progress-dot'),
        };
      });
      scrollDirty = true;
      kick();
    };

    // ---------------- Input state ----------------
    let mouseX = -200;
    let mouseY = -200;
    let ringX = -200;
    let ringY = -200;
    let mouseDirty = false;
    let scrollDirty = true;
    let tiltTarget: HTMLElement | null = null;
    let tiltPrev: HTMLElement | null = null;
    let heroActive = false;
    const magnetOn = new Set<HTMLElement>();

    // ---------------- Custom cursor elements ----------------
    let dot: HTMLDivElement | null = null;
    let ring: HTMLDivElement | null = null;
    let ringLabel: HTMLSpanElement | null = null;
    if (fine) {
      root.classList.add('has-cursor');
      dot = document.createElement('div');
      dot.className = 'cc-dot';
      ring = document.createElement('div');
      ring.className = 'cc-ring';
      const ringInner = document.createElement('div');
      ringInner.className = 'cc-ring-inner';
      ringLabel = document.createElement('span');
      ring.append(ringInner, ringLabel);
      document.body.append(ring, dot);
    }

    // ---------------- The frame loop ----------------
    let raf = 0;
    let running = false;
    const kick = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(frame);
    };

    const frame = () => {
      running = false;
      const still = motionOff();
      let keepGoing = false;

      // ---- READS (layout is clean here) ----
      const sy = window.scrollY;
      const magnetRects = mouseDirty && fine && !still ? magnets.map((m) => m.getBoundingClientRect()) : null;
      const heroRect = mouseDirty && heroActive && hero ? hero.getBoundingClientRect() : null;
      const tiltRect = mouseDirty && tiltTarget && !still ? tiltTarget.getBoundingClientRect() : null;

      // ---- WRITES ----
      if (fine && dot && ring) {
        dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
        const dx = mouseX - ringX;
        const dy = mouseY - ringY;
        if (Math.abs(dx) > 0.15 || Math.abs(dy) > 0.15) {
          ringX += dx * 0.22;
          ringY += dy * 0.22;
          keepGoing = true;
        } else {
          ringX = mouseX;
          ringY = mouseY;
        }
        ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      if (magnetRects) {
        magnetRects.forEach((r, i) => {
          const el = magnets[i];
          const dx = mouseX - (r.left + r.width / 2);
          const dy = mouseY - (r.top + r.height / 2);
          const reach = Math.max(r.width, r.height) / 2 + 60;
          if (Math.hypot(dx, dy) < reach) {
            el.style.transform = `translate3d(${dx * 0.25}px, ${dy * 0.32}px, 0)`;
            if (!magnetOn.has(el)) {
              magnetOn.add(el);
              el.classList.add('is-magnet');
            }
          } else if (magnetOn.has(el)) {
            magnetOn.delete(el);
            el.classList.remove('is-magnet');
            el.style.transform = '';
          }
        });
      }

      if (heroRect && heroSpot) {
        const px = (mouseX - heroRect.left) / heroRect.width;
        const py = (mouseY - heroRect.top) / heroRect.height;
        heroSpot.style.transform = `translate3d(${mouseX - heroRect.left}px, ${mouseY - heroRect.top}px, 0)`;
        if (heroTilt && !still) {
          heroTilt.style.transform = `perspective(1400px) rotateY(${(px - 0.5) * 6}deg) rotateX(${(0.5 - py) * 3}deg)`;
        }
      }

      if (tiltPrev && tiltPrev !== tiltTarget) {
        tiltPrev.style.transform = '';
        const g = tiltPrev.querySelector<HTMLElement>('.card-glare');
        if (g) g.style.opacity = '';
        tiltPrev = null;
      }
      if (tiltRect && tiltTarget) {
        const px = (mouseX - tiltRect.left) / tiltRect.width - 0.5;
        const py = (mouseY - tiltRect.top) / tiltRect.height - 0.5;
        const k = Number(tiltTarget.dataset.tilt || 8);
        tiltTarget.style.transform = `perspective(900px) rotateX(${(-py * k).toFixed(2)}deg) rotateY(${(px * k).toFixed(2)}deg)`;
        const g = tiltTarget.querySelector<HTMLElement>('.card-glare');
        if (g) {
          g.style.transform = `translate3d(${(px + 0.5) * tiltRect.width}px, ${(py + 0.5) * tiltRect.height}px, 0)`;
          g.style.opacity = '1';
        }
        tiltPrev = tiltTarget;
      }
      mouseDirty = false;

      if (scrollDirty) {
        scrollDirty = false;
        // Section numbers drift; only those near the screen are touched.
        for (const p of parallax) {
          if (still) {
            p.el.style.transform = '';
            continue;
          }
          const top = p.top - sy;
          if (top > vh + 300 || top + p.height < -300) continue;
          const offset = top + p.height / 2 - vh / 2;
          p.el.style.transform = `translate3d(0, ${(-offset * p.k).toFixed(1)}px, 0)`;
        }
        // Hero layers drift at different speeds while the hero is visible.
        if (sy < vh * 1.3) {
          for (const el of lagEls) {
            el.style.transform = still ? '' : `translate3d(0, ${(sy * Number(el.dataset.lag)).toFixed(1)}px, 0)`;
          }
        }
        // Timeline line draws itself.
        for (const p of progress) {
          const t = still ? 1 : clamp((sy + vh * 0.6 - p.top) / p.height, 0, 1);
          if (p.fill) p.fill.style.transform = `scaleY(${t.toFixed(4)})`;
          if (p.dot) p.dot.style.transform = `translate3d(0, ${(t * p.height).toFixed(1)}px, 0)`;
        }
      }

      if (keepGoing) kick();
    };

    // ---------------- Input listeners (record only) ----------------
    if (fine) {
      listen(window, 'mousemove', (e: MouseEvent) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        mouseDirty = true;
        kick();
      }, { passive: true });
      listen(document, 'mouseleave', () => root.classList.add('cc-hidden'));
      listen(document, 'mouseenter', () => root.classList.remove('cc-hidden'));
      listen(window, 'mousedown', () => ring!.classList.add('is-down'));
      listen(window, 'mouseup', () => ring!.classList.remove('is-down'));
      let lastHover: Element | null = null;
      listen(document, 'mouseover', (e: MouseEvent) => {
        const t = e.target as HTMLElement;
        if (t === lastHover) return;
        lastHover = t;
        const labelled = t.closest?.('[data-cursor]') as HTMLElement | null;
        const interactive = !!t.closest?.('a, button, input, label, [role="slider"]');
        ring!.classList.toggle('is-hover', interactive && !labelled);
        ring!.classList.toggle('has-label', !!labelled);
        const text = labelled?.dataset.cursor ?? '';
        if (ringLabel!.textContent !== text) ringLabel!.textContent = text;
        tiltTarget = (t.closest?.('[data-tilt]') as HTMLElement | null) ?? null;
        heroActive = !!hero && hero.contains(t);
        hero?.classList.toggle('spot-on', heroActive);
        if (!heroActive && heroTilt) heroTilt.style.transform = '';
      });
    }

    // ---------------- Smooth scroll ----------------
    let lenis: Lenis | null = null;
    let lenisRaf = 0;
    const startLenis = () => {
      if (lenis || motionOff() || !fine) return;
      lenis = new Lenis({
        lerp: 0.14,
        smoothWheel: true,
        anchors: { offset: -66, duration: 1.1, easing: easeOutExpo },
      });
      lenis.on('scroll', () => {
        scrollDirty = true;
        kick();
      });
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
    listen(window, 'scroll', () => {
      scrollDirty = true;
      kick();
    }, { passive: true });

    // Remeasure when the layout really changes.
    let measureTimer: number | undefined;
    const scheduleMeasure = () => {
      window.clearTimeout(measureTimer);
      measureTimer = window.setTimeout(measure, 120);
    };
    listen(window, 'resize', scheduleMeasure);
    const ro = new ResizeObserver(scheduleMeasure);
    ro.observe(document.body);
    document.fonts?.ready.then(scheduleMeasure);
    measure();

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
      const step = (now: number) => {
        const t = clamp((now - start) / 1200, 0, 1);
        el.textContent = (value * (1 - Math.pow(1 - t, 3))).toFixed(decimals);
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
          const host = el.closest('[data-build]');
          const started = performance.now();
          const wait = () => {
            const ready = !root.classList.contains('cb-armed') || !host || host.classList.contains('is-built');
            if (ready || performance.now() - started > 5000) countUp(el);
            else window.setTimeout(wait, 100);
          };
          wait();
        }),
      { threshold: 0.4 },
    );
    document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => counterIO.observe(el));

    // ---------------- Motion toggle ----------------
    listen(window, 'motionchange', () => {
      if (motionOff()) {
        stopLenis();
        magnets.forEach((el) => (el.style.transform = ''));
        if (heroTilt) heroTilt.style.transform = '';
        document.querySelectorAll<HTMLElement>('[data-tilt]').forEach((el) => (el.style.transform = ''));
      } else {
        startLenis();
      }
      scrollDirty = true;
      kick();
    });

    return () => {
      cleanups.forEach((f) => f());
      counterIO.disconnect();
      ro.disconnect();
      cancelAnimationFrame(raf);
      stopLenis();
      dot?.remove();
      ring?.remove();
      root.classList.remove('has-cursor');
    };
  }, []);

  return null;
}
