'use client';

import { useEffect } from 'react';

/*
  Multiplayer cursor build effect.
  Every element marked with data-build starts hidden. A swarm of labelled
  cursors flies in, drags a selection box over each element, and the
  element is revealed as the box closes. The first batch (everything
  visible on load) is the intro; later batches run as sections scroll in.
*/

const LABELS = [
  'PyTorch', 'SQL', 'pandas', 'FastAPI', 'MLflow', 'SHAP', 'FAISS', 'XGBoost',
  'Docker', 'NumPy', 'LangChain', 'Grad CAM', 'sklearn', 'BM25', 'Azure',
  'pytest', 'Git', 'R', 'LightGBM', 'Python',
];

const ARROW =
  '<svg width="18" height="22" viewBox="0 0 18 22" aria-hidden="true"><path d="M1.5 1.5 L1.5 17 L5.6 13.3 L8.4 20 L11.3 18.8 L8.6 12.2 L14.2 12.2 Z" fill="currentColor" stroke="#090909" stroke-width="1.3" stroke-linejoin="round"/></svg>';

type Cursor = { el: HTMLDivElement; x: number; y: number };

const EASE = 'cubic-bezier(0.65, 0, 0.35, 1)';
const rand = (a: number, b: number) => a + Math.random() * (b - a);
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

function moveTo(c: Cursor, x: number, y: number, duration: number) {
  const from = `translate(${c.x}px, ${c.y}px)`;
  const to = `translate(${x}px, ${y}px)`;
  c.x = x;
  c.y = y;
  const anim = c.el.animate([{ transform: from }, { transform: to }], {
    duration,
    easing: EASE,
    fill: 'forwards',
  });
  return anim.finished.then(() => {
    c.el.style.transform = to;
    anim.cancel();
  });
}

export default function CursorBuild() {
  useEffect(() => {
    const root = document.documentElement;
    (window as any).__cbReady = true;

    let layer: HTMLDivElement | null = null;
    let labelIndex = Math.floor(Math.random() * LABELS.length);
    let killed = false;
    const skipAll = { value: false };

    const settle = (el: HTMLElement) => {
      el.classList.add('is-built');
      window.setTimeout(() => el.classList.add('is-settled'), 800);
    };

    const revealAll = () => {
      document.querySelectorAll<HTMLElement>('[data-build]').forEach(settle);
    };

    if (!root.classList.contains('cb-armed')) {
      revealAll();
      return;
    }

    layer = document.createElement('div');
    layer.className = 'cb-layer';
    document.body.appendChild(layer);

    const isMobile = window.innerWidth < 768;

    const spawn = (sx: number, sy: number, i: number): Cursor => {
      const el = document.createElement('div');
      const variant = i % 3 === 0 ? 'is-red' : i % 3 === 1 ? '' : 'is-dim';
      el.className = `cb-cursor ${variant}`;
      const label = LABELS[labelIndex++ % LABELS.length];
      el.innerHTML = `${ARROW}<span class="cb-tag">${label}</span>`;
      el.style.transform = `translate(${sx}px, ${sy}px)`;
      layer!.appendChild(el);
      return { el, x: sx, y: sy };
    };

    const plusMark = (x: number, y: number) => {
      const p = document.createElement('div');
      p.className = 'cb-plus';
      p.style.transform = `translate(${x}px, ${y}px)`;
      layer!.appendChild(p);
      p.animate([{ opacity: 0 }, { opacity: 1, offset: 0.15 }, { opacity: 1, offset: 0.7 }, { opacity: 0 }], {
        duration: 1600,
        fill: 'forwards',
      }).finished.then(() => p.remove());
    };

    const build = async (el: HTMLElement, c: Cursor, speed: number) => {
      if (el.classList.contains('is-built')) return;
      if (skipAll.value) {
        settle(el);
        return;
      }
      const r = el.getBoundingClientRect();
      const x0 = r.left + window.scrollX;
      const y0 = r.top + window.scrollY;
      const w = Math.max(r.width, 8);
      const h = Math.max(r.height, 8);

      await moveTo(c, x0, y0, rand(320, 520) * speed);
      if (skipAll.value) {
        settle(el);
        return;
      }
      plusMark(x0, y0);

      const box = document.createElement('div');
      box.className = 'cb-box';
      box.style.transform = `translate(${x0}px, ${y0}px)`;
      layer!.appendChild(box);

      const drag = Math.min(700, 260 + Math.sqrt(w * h) * 0.6) * speed;
      box.animate([{ width: '0px', height: '0px' }, { width: `${w}px`, height: `${h}px` }], {
        duration: drag,
        easing: EASE,
        fill: 'forwards',
      });
      await moveTo(c, x0 + w, y0 + h, drag);
      plusMark(x0 + w, y0 + h);

      settle(el);
      box.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 450, delay: 120, fill: 'forwards' })
        .finished.then(() => box.remove());
    };

    const exit = async (c: Cursor) => {
      const vw = window.innerWidth;
      const side = Math.random() < 0.5 ? -60 : vw + 60;
      const y = window.scrollY + rand(-80, window.innerHeight + 80);
      c.el.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 650, delay: 150, fill: 'forwards' });
      await moveTo(c, side, y, rand(500, 800));
      c.el.remove();
    };

    const entryPoint = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const sy = window.scrollY;
      const edge = Math.floor(Math.random() * 4);
      if (edge === 0) return [rand(0, vw), sy - 40];
      if (edge === 1) return [vw + 40, sy + rand(0, vh)];
      if (edge === 2) return [rand(0, vw), sy + vh + 40];
      return [-40, sy + rand(0, vh)];
    };

    const runBatch = async (targets: HTMLElement[], count: number, speed: number) => {
      // Build top to bottom, left to right, so the page assembles in reading order.
      targets.sort((a, b) => {
        const ra = a.getBoundingClientRect();
        const rb = b.getBoundingClientRect();
        return Math.abs(ra.top - rb.top) > 24 ? ra.top - rb.top : ra.left - rb.left;
      });
      const cursors = Array.from({ length: count }, (_, i) => {
        const [sx, sy] = entryPoint();
        return spawn(sx, sy, i);
      });
      let next = 0;
      await Promise.all(
        cursors.map(async (c, i) => {
          await sleep(i * 55 * speed);
          while (next < targets.length && !killed) {
            const t = targets[next++];
            await build(t, c, speed);
            await sleep(rand(20, 90) * speed);
          }
          await exit(c);
        }),
      );
    };

    // ---------- Intro: everything visible on first paint ----------
    const all = Array.from(document.querySelectorAll<HTMLElement>('[data-build]'));
    const vh = window.innerHeight;
    const introTargets = all.filter((el) => el.getBoundingClientRect().top < vh * 0.98);

    const skipBtn = document.createElement('button');
    skipBtn.className = 'cb-skip';
    skipBtn.type = 'button';
    skipBtn.textContent = 'Skip intro';
    skipBtn.onclick = () => {
      skipAll.value = true;
      introTargets.forEach(settle);
      skipBtn.remove();
    };
    document.body.appendChild(skipBtn);

    const introCount = Math.min(isMobile ? 8 : 18, introTargets.length);
    const introDone = runBatch(introTargets, introCount, isMobile ? 0.8 : 1).then(() => {
      skipBtn.remove();
      skipAll.value = false;
    });

    // ---------- Scroll batches ----------
    // Hidden elements are fully clipped, which IntersectionObserver treats as
    // never visible, so visibility is checked directly on scroll instead.
    const queued = new WeakSet<HTMLElement>();
    let introFinished = false;
    let pending: HTMLElement[] = [];
    let flushTimer: number | undefined;
    let ticking = false;

    const flush = () => {
      const batch = pending.filter((el) => !el.classList.contains('is-built'));
      pending = [];
      if (!batch.length || killed) return;
      const count = Math.min(isMobile ? 4 : 7, Math.max(2, Math.ceil(batch.length / 1.6)));
      runBatch(batch, count, 0.7);
    };

    const scan = () => {
      if (killed) return;
      const vhNow = window.innerHeight;
      document.querySelectorAll<HTMLElement>('[data-build]:not(.is-built)').forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.bottom < 0) {
          // Scrolled past before its cursors arrived: reveal instantly.
          settle(el);
        } else if (introFinished && r.top < vhNow * 0.9 && !queued.has(el)) {
          queued.add(el);
          pending.push(el);
        }
      });
      if (pending.length) {
        window.clearTimeout(flushTimer);
        flushTimer = window.setTimeout(flush, 70);
      }
    };

    const onScroll = () => {
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

    // Elements added later (filters, route changes) join the queue.
    const mo = new MutationObserver((muts) => {
      let added = false;
      muts.forEach((m) =>
        m.addedNodes.forEach((n) => {
          if (!(n instanceof HTMLElement)) return;
          if (n.matches('[data-build]') || n.querySelector('[data-build]')) added = true;
        }),
      );
      if (!added) return;
      if (root.classList.contains('motion-off')) revealAll();
      else onScroll();
    });
    mo.observe(document.body, { childList: true, subtree: true });

    // Motion toggle from the header.
    const onMotion = () => {
      if (root.classList.contains('motion-off')) {
        killed = true;
        skipAll.value = true;
        revealAll();
        skipBtn.remove();
        layer?.replaceChildren();
      }
    };
    window.addEventListener('motionchange', onMotion);

    return () => {
      killed = true;
      mo.disconnect();
      window.removeEventListener('motionchange', onMotion);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      skipBtn.remove();
      layer?.remove();
      revealAll();
    };
  }, []);

  return null;
}
