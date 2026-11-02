'use client';

import { useEffect } from 'react';

/*
  Multiplayer cursor build effect.
  Every element marked with data-build starts hidden. A swarm of labelled
  cursors flies in, drags a selection box over each element, and the
  element is revealed as the box closes. Everything visible on load is the
  intro; later batches run just before sections scroll into view.

  Cursors live in a fixed, clipped layer so they can never widen or lengthen
  the page. Reveals use the Web Animations API, so nothing is left on the
  element afterwards (no lingering clip path, no overridden transitions).
*/

const LABELS = [
  'PyTorch', 'SQL', 'pandas', 'FastAPI', 'MLflow', 'SHAP', 'FAISS', 'XGBoost',
  'Docker', 'NumPy', 'LangChain', 'Grad CAM', 'sklearn', 'BM25', 'Azure',
  'pytest', 'Git', 'R', 'LightGBM', 'Python',
];

const ARROW =
  '<svg width="18" height="22" viewBox="0 0 18 22" aria-hidden="true"><path d="M1.5 1.5 L1.5 17 L5.6 13.3 L8.4 20 L11.3 18.8 L8.6 12.2 L14.2 12.2 Z" fill="currentColor" stroke="#090909" stroke-width="1.3" stroke-linejoin="round"/></svg>';

type Cursor = { el: HTMLDivElement; x: number; y: number; anim?: Animation };

const EASE = 'cubic-bezier(0.65, 0, 0.35, 1)';
const rand = (a: number, b: number) => a + Math.random() * (b - a);
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default function CursorBuild() {
  useEffect(() => {
    const root = document.documentElement;
    (window as any).__cbReady = true;

    const built = new WeakSet<HTMLElement>();
    const reveal = (el: HTMLElement, animate = true) => {
      if (built.has(el)) return;
      built.add(el);
      el.classList.add('is-built');
      if (animate && !root.classList.contains('motion-off')) {
        el.animate(
          [
            { clipPath: 'inset(0 100% 100% 0)', opacity: 0.2 },
            { clipPath: 'inset(-30px -30px -30px -30px)', opacity: 1 },
          ],
          { duration: 650, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' },
        );
      }
    };
    const revealAll = () =>
      document.querySelectorAll<HTMLElement>('[data-build]').forEach((el) => reveal(el, false));

    if (!root.classList.contains('cb-armed')) {
      revealAll();
      return;
    }

    let killed = false;
    let skipping = false;
    const isMobile = window.innerWidth < 768;
    let labelIndex = Math.floor(Math.random() * LABELS.length);

    // Fixed viewport layer; the stage inside it is shifted by the scroll offset,
    // so cursors are placed in page coordinates but never affect page size.
    const layer = document.createElement('div');
    layer.className = 'cb-layer';
    const stage = document.createElement('div');
    stage.className = 'cb-stage';
    layer.appendChild(stage);
    document.body.appendChild(layer);
    const syncStage = () => {
      stage.style.transform = `translate(${-window.scrollX}px, ${-window.scrollY}px)`;
    };
    syncStage();

    const moveTo = (c: Cursor, x: number, y: number, duration: number) => {
      c.anim?.cancel();
      const from = `translate(${c.x}px, ${c.y}px)`;
      const to = `translate(${x}px, ${y}px)`;
      c.x = x;
      c.y = y;
      c.el.style.transform = to;
      const anim = c.el.animate([{ transform: from }, { transform: to }], { duration, easing: EASE });
      c.anim = anim;
      return anim.finished.then(
        () => undefined,
        () => undefined,
      );
    };

    const spawn = (sx: number, sy: number, i: number): Cursor => {
      const el = document.createElement('div');
      const variant = i % 3 === 0 ? 'is-red' : i % 3 === 1 ? '' : 'is-dim';
      el.className = `cb-cursor ${variant}`;
      el.innerHTML = `${ARROW}<span class="cb-tag">${LABELS[labelIndex++ % LABELS.length]}</span>`;
      el.style.transform = `translate(${sx}px, ${sy}px)`;
      stage.appendChild(el);
      return { el, x: sx, y: sy };
    };

    const plusMark = (x: number, y: number) => {
      const p = document.createElement('div');
      p.className = 'cb-plus';
      p.style.transform = `translate(${x}px, ${y}px)`;
      stage.appendChild(p);
      p.animate([{ opacity: 0 }, { opacity: 1, offset: 0.15 }, { opacity: 1, offset: 0.7 }, { opacity: 0 }], {
        duration: 1400,
        fill: 'forwards',
      }).finished.then(() => p.remove(), () => p.remove());
    };

    const build = async (el: HTMLElement, c: Cursor, speed: number) => {
      if (built.has(el)) return;
      if (skipping || killed) return reveal(el, false);

      const r = el.getBoundingClientRect();
      const x0 = r.left + window.scrollX;
      const y0 = r.top + window.scrollY;
      const w = Math.max(r.width, 8);
      const h = Math.max(r.height, 8);

      await moveTo(c, x0, y0, rand(300, 460) * speed);
      if (built.has(el)) return;
      if (skipping || killed) return reveal(el, false);
      plusMark(x0, y0);

      const box = document.createElement('div');
      box.className = 'cb-box';
      box.style.transform = `translate(${x0}px, ${y0}px)`;
      stage.appendChild(box);
      const drag = Math.min(620, 240 + Math.sqrt(w * h) * 0.5) * speed;
      box.animate([{ width: '0px', height: '0px' }, { width: `${w}px`, height: `${h}px` }], {
        duration: drag,
        easing: EASE,
        fill: 'forwards',
      });
      await moveTo(c, x0 + w, y0 + h, drag);
      plusMark(x0 + w, y0 + h);

      reveal(el);
      box.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 380, delay: 100, fill: 'forwards' })
        .finished.then(() => box.remove(), () => box.remove());
    };

    const exit = async (c: Cursor) => {
      const vw = window.innerWidth;
      const x = Math.random() < 0.5 ? -80 : vw + 80;
      const y = window.scrollY + rand(0, window.innerHeight);
      c.el.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 500, delay: 120, fill: 'forwards' });
      await moveTo(c, x, y, rand(450, 700));
      c.el.remove();
    };

    const entryPoint = (): [number, number] => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const sy = window.scrollY;
      switch (Math.floor(Math.random() * 4)) {
        case 0:
          return [rand(0, vw), sy - 40];
        case 1:
          return [vw + 40, sy + rand(0, vh)];
        case 2:
          return [rand(0, vw), sy + vh + 40];
        default:
          return [-40, sy + rand(0, vh)];
      }
    };

    const runBatch = async (targets: HTMLElement[], count: number, speed: number) => {
      // Reading order: top to bottom, then left to right.
      const pos = new Map(targets.map((el) => [el, el.getBoundingClientRect()]));
      targets.sort((a, b) => {
        const ra = pos.get(a)!;
        const rb = pos.get(b)!;
        return Math.abs(ra.top - rb.top) > 24 ? ra.top - rb.top : ra.left - rb.left;
      });
      const cursors = Array.from({ length: count }, (_, i) => spawn(...entryPoint(), i));
      let next = 0;
      await Promise.all(
        cursors.map(async (c, i) => {
          await sleep(i * 45 * speed);
          while (next < targets.length && !killed) {
            await build(targets[next++], c, speed);
            await sleep(rand(15, 60) * speed);
          }
          await exit(c);
        }),
      );
    };

    // ---------- Intro ----------
    const vh = window.innerHeight;
    const introTargets = Array.from(document.querySelectorAll<HTMLElement>('[data-build]')).filter((el) => {
      const r = el.getBoundingClientRect();
      return r.top < vh && r.bottom > 0;
    });
    // Anything above the viewport on load (restored scroll position) just appears.
    document.querySelectorAll<HTMLElement>('[data-build]').forEach((el) => {
      if (el.getBoundingClientRect().bottom <= 0) reveal(el, false);
    });

    const skipBtn = document.createElement('button');
    skipBtn.className = 'cb-skip';
    skipBtn.type = 'button';
    skipBtn.textContent = 'Skip intro';
    skipBtn.onclick = () => {
      skipping = true;
      introTargets.forEach((el) => reveal(el, false));
      skipBtn.remove();
    };
    document.body.appendChild(skipBtn);

    const introDone = runBatch(introTargets, Math.min(isMobile ? 8 : 16, introTargets.length), isMobile ? 0.75 : 0.9).then(
      () => {
        skipBtn.remove();
        skipping = false;
      },
    );

    // ---------- Scroll batches ----------
    const queued = new WeakSet<HTMLElement>();
    let introFinished = false;
    let pending: HTMLElement[] = [];
    let flushTimer: number | undefined;
    let ticking = false;

    const flush = () => {
      const batch = pending.filter((el) => !built.has(el));
      pending = [];
      if (!batch.length || killed) return;
      const count = Math.min(isMobile ? 5 : 9, Math.max(3, Math.ceil(batch.length / 1.3)));
      runBatch(batch, count, isMobile ? 0.5 : 0.55);
      // Never leave content waiting on cursors for long.
      window.setTimeout(() => batch.forEach((el) => reveal(el)), 1600);
    };

    const scan = () => {
      if (killed) return;
      const vhNow = window.innerHeight;
      document.querySelectorAll<HTMLElement>('[data-build]:not(.is-built)').forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.bottom <= 0) {
          reveal(el, false); // scrolled past already
        } else if (introFinished && r.top < vhNow * 1.08 && !queued.has(el)) {
          // Start slightly before it enters, so cursors arrive as it does.
          queued.add(el);
          pending.push(el);
        }
      });
      if (pending.length) {
        window.clearTimeout(flushTimer);
        flushTimer = window.setTimeout(flush, 40);
      }
    };

    const onScroll = () => {
      syncStage();
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        scan();
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    introDone.then(() => {
      introFinished = true;
      scan();
    });

    // Keyboard users never land on something invisible.
    const onFocus = (e: FocusEvent) => {
      const el = (e.target as HTMLElement)?.closest?.('[data-build]') as HTMLElement | null;
      if (el) reveal(el, false);
    };
    document.addEventListener('focusin', onFocus);

    // Elements added later (filters) join the queue.
    const mo = new MutationObserver((muts) => {
      const added = muts.some((m) =>
        Array.from(m.addedNodes).some(
          (n) => n instanceof HTMLElement && (n.matches('[data-build]') || !!n.querySelector('[data-build]')),
        ),
      );
      if (!added) return;
      if (root.classList.contains('motion-off')) revealAll();
      else onScroll();
    });
    mo.observe(document.body, { childList: true, subtree: true });

    // Motion toggle from the header.
    const onMotion = () => {
      if (!root.classList.contains('motion-off')) return;
      killed = true;
      revealAll();
      skipBtn.remove();
      stage.replaceChildren();
    };
    window.addEventListener('motionchange', onMotion);

    return () => {
      killed = true;
      mo.disconnect();
      window.removeEventListener('motionchange', onMotion);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      document.removeEventListener('focusin', onFocus);
      skipBtn.remove();
      layer.remove();
      revealAll();
    };
  }, []);

  return null;
}
