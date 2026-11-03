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
    layer.setAttribute('aria-hidden', 'true');
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

    // A cursor types the element in, letter by letter, behind a caret.
    const typeIn = async (el: HTMLElement, c: Cursor, x0: number, y0: number, w: number, h: number, speed: number) => {
      await moveTo(c, x0, y0 + h * 0.5, rand(320, 440) * speed);
      if (built.has(el)) return;
      if (skipping || killed) return reveal(el, false);
      const letters = Math.max(1, (el.textContent || '').trim().length);
      const dur = letters * 120 * speed + 120;
      built.add(el);
      el.classList.add('is-built');
      el.animate(
        [{ clipPath: 'inset(-30px 100% -30px -30px)' }, { clipPath: 'inset(-30px -30px -30px -30px)' }],
        { duration: dur, easing: `steps(${letters}, end)` },
      );
      const caret = document.createElement('div');
      caret.className = 'cb-caret';
      caret.style.height = `${h * 0.8}px`;
      stage.appendChild(caret);
      caret.animate(
        [
          { transform: `translate(${x0}px, ${y0 + h * 0.1}px)` },
          { transform: `translate(${x0 + w}px, ${y0 + h * 0.1}px)` },
        ],
        { duration: dur, easing: `steps(${letters}, end)`, fill: 'forwards' },
      );
      await moveTo(c, x0 + w, y0 + h * 0.5, dur);
      caret.animate([{ opacity: 1 }, { opacity: 0 }, { opacity: 1 }, { opacity: 0 }], { duration: 700, fill: 'forwards' })
        .finished.then(() => caret.remove(), () => caret.remove());
    };

    const build = async (el: HTMLElement, c: Cursor, speed: number) => {
      if (built.has(el)) return;
      if (skipping || killed) return reveal(el, false);

      const r = el.getBoundingClientRect();
      const x0 = r.left + window.scrollX;
      const y0 = r.top + window.scrollY;
      const w = Math.max(r.width, 8);
      const h = Math.max(r.height, 8);

      if (el.hasAttribute('data-type')) return typeIn(el, c, x0, y0, w, h, speed);

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

    let onExit: (() => void) | null = null;

    const runBatch = async (targets: HTMLElement[], count: number, speed: number, finale?: HTMLElement | null) => {
      // Reading order: top to bottom, then left to right.
      const pos = new Map(targets.map((el) => [el, el.getBoundingClientRect()]));
      targets.sort((a, b) => {
        const ra = pos.get(a)!;
        const rb = pos.get(b)!;
        return Math.abs(ra.top - rb.top) > 24 ? ra.top - rb.top : ra.left - rb.left;
      });
      const cursors = Array.from({ length: count }, (_, i) => spawn(...entryPoint(), i));
      let next = 0;
      const work = async (c: Cursor, i: number) => {
        await sleep(i * 45 * speed);
        while (next < targets.length && !killed) {
          await build(targets[next++], c, speed);
          await sleep(rand(15, 60) * speed);
        }
      };
      const leave = async (c: Cursor) => {
        await exit(c);
        onExit?.();
      };

      if (!finale) {
        await Promise.all(cursors.map(async (c, i) => {
          await work(c, i);
          await leave(c);
        }));
        return;
      }

      // Finale: everyone finishes, then swoops onto the button and clicks it together.
      await Promise.all(cursors.map((c, i) => work(c, i)));
      if (!skipping && !killed && finale.isConnected) {
        const r = finale.getBoundingClientRect();
        const cx = r.left + window.scrollX + r.width / 2;
        const cy = r.top + window.scrollY + r.height / 2;
        await Promise.all(
          cursors.map((c, i) => {
            const a = (i / cursors.length) * Math.PI * 2;
            const d = rand(8, 26);
            return moveTo(c, cx + Math.cos(a) * d, cy + Math.sin(a) * d * 0.6, rand(480, 640));
          }),
        );
        await sleep(80);
        const ripple = document.createElement('div');
        ripple.className = 'cb-ripple';
        ripple.style.transform = `translate(${cx}px, ${cy}px)`;
        stage.appendChild(ripple);
        ripple.animate(
          [
            { transform: `translate(${cx}px, ${cy}px) scale(1)`, opacity: 1 },
            { transform: `translate(${cx}px, ${cy}px) scale(9)`, opacity: 0 },
          ],
          { duration: 650, easing: 'ease-out', fill: 'forwards' },
        ).finished.then(() => ripple.remove(), () => ripple.remove());
        cursors.forEach((c) =>
          c.el.animate([{ scale: '1' }, { scale: '0.8' }, { scale: '1' }], { duration: 220 }),
        );
        finale.classList.remove('cb-clicked');
        void finale.offsetWidth;
        finale.classList.add('cb-clicked');
        window.setTimeout(() => finale.classList.remove('cb-clicked'), 900);
        await sleep(260);
      }
      await Promise.all(cursors.map((c, i) => sleep(i * 25).then(() => leave(c))));
    };

    // Live collaborators badge shown during the intro.
    const makeBadge = (n: number) => {
      const badge = document.createElement('div');
      badge.className = 'cb-badge';
      const colors = ['#e3263b', '#ffffff', '#ff8a96', '#2a2a2a'];
      const initials = ['', '', '', ''];
      badge.innerHTML =
        '<span class="live"></span><span class="avatars">' +
        initials.map((t, i) => `<span style="background:${colors[i]};color:${i === 1 ? '#090909' : '#fff'}">${t}</span>`).join('') +
        `</span><span class="count">${n} building live</span>`;
      layer.appendChild(badge);
      badge.animate([{ opacity: 0, transform: 'translateY(-6px)' }, { opacity: 1, transform: 'none' }], {
        duration: 400,
        fill: 'both',
      });
      let left = n;
      return {
        dec() {
          left = Math.max(0, left - 1);
          const el = badge.querySelector('.count');
          if (el) el.textContent = left ? `${left} building live` : 'Built live';
        },
        done() {
          badge.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 500, delay: 700, fill: 'forwards' })
            .finished.then(() => badge.remove(), () => badge.remove());
        },
      };
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
      stage.querySelectorAll('.cb-cursor').forEach((c) => c.remove());
      introTargets.forEach((el) => reveal(el, false));
      skipBtn.remove();
    };
    document.body.appendChild(skipBtn);

    const introCount = Math.min(isMobile ? 8 : 16, introTargets.length);
    const badge = makeBadge(introCount);
    onExit = () => badge.dec();
    const finale = document.querySelector<HTMLElement>('[data-finale]');
    const introDone = runBatch(introTargets, introCount, isMobile ? 0.75 : 0.9, finale).then(() => {
      onExit = null;
      badge.done();
      skipBtn.remove();
      skipping = false;
    });

    // ---------- Scroll batches ----------
    // Positions of unbuilt elements are measured once (and on resize), so
    // scrolling only compares numbers. Fast scrolls and nav jumps reveal
    // content immediately instead of sending cursors.
    const queued = new WeakSet<HTMLElement>();
    let introFinished = false;
    let pending: HTMLElement[] = [];
    let flushTimer: number | undefined;
    let ticking = false;
    let positions: { el: HTMLElement; top: number; bottom: number }[] = [];
    let lastY = window.scrollY;
    let jumpUntil = 0;

    const measure = () => {
      const sy = window.scrollY;
      positions = Array.from(document.querySelectorAll<HTMLElement>('[data-build]'))
        .filter((el) => !built.has(el))
        .map((el) => {
          const r = el.getBoundingClientRect();
          return { el, top: r.top + sy, bottom: r.bottom + sy };
        });
    };

    const quickReveal = (el: HTMLElement) => {
      if (built.has(el)) return;
      built.add(el);
      el.classList.add('is-built');
      if (!root.classList.contains('motion-off')) {
        el.animate([{ opacity: 0, transform: 'translateY(14px)' }, { opacity: 1, transform: 'none' }], {
          duration: 420,
          easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
        });
      }
    };

    // After the intro, sections simply fade up as they enter. No cursors while
    // scrolling: it keeps scrolling smooth and content never waits.
    const flush = () => {
      const batch = pending.filter((el) => !built.has(el));
      pending = [];
      if (!batch.length || killed) return;
      batch.forEach((el, i) => {
        if (i === 0) quickReveal(el);
        else window.setTimeout(() => quickReveal(el), Math.min(i, 6) * 45);
      });
    };

    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      ro.disconnect();
      // Let any last cursors leave, then remove the layer completely.
      window.setTimeout(() => {
        if (!stage.childElementCount) layer.remove();
      }, 2500);
    };

    const scan = () => {
      if (killed || !introFinished) return;
      const sy = window.scrollY;
      const vhNow = window.innerHeight;
      const speed = Math.abs(sy - lastY);
      lastY = sy;
      const fast = speed > vhNow * 0.12 || performance.now() < jumpUntil;
      let remaining = 0;
      for (const p of positions) {
        if (built.has(p.el)) continue;
        remaining++;
        const top = p.top - sy;
        const bottom = p.bottom - sy;
        if (bottom <= 0) {
          reveal(p.el, false);
        } else if (top < vhNow * 1.05 && !queued.has(p.el)) {
          queued.add(p.el);
          if (fast) quickReveal(p.el);
          else pending.push(p.el);
        }
      }
      if (pending.length) {
        window.clearTimeout(flushTimer);
        flushTimer = window.setTimeout(flush, 40);
      }
      if (remaining === 0) finish();
    };

    const onScroll = () => {
      if (stage.childElementCount) syncStage();
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        scan();
      });
    };
    let resizeTimer: number | undefined;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        measure();
        scan();
      }, 150);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    const ro = new ResizeObserver(onResize);
    ro.observe(document.body);

    // Clicking a nav link jumps straight there with no cursor detours.
    const onNav = (e: MouseEvent) => {
      const a = (e.target as HTMLElement)?.closest?.('a[href^="#"]');
      if (a) jumpUntil = performance.now() + 1600;
    };
    document.addEventListener('click', onNav, true);
    const onJump = () => (jumpUntil = performance.now() + 1600);
    window.addEventListener('navjump', onJump);

    introDone.then(() => {
      introFinished = true;
      measure();
      lastY = window.scrollY;
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
      if (root.classList.contains('motion-off') || !introFinished) {
        if (root.classList.contains('motion-off')) revealAll();
        return;
      }
      // Cards shown by a filter appear straight away.
      document.querySelectorAll<HTMLElement>('[data-build]:not(.is-built)').forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) quickReveal(el);
      });
      measure();
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
      window.removeEventListener('resize', onResize);
      document.removeEventListener('click', onNav, true);
      window.removeEventListener('navjump', onJump);
      ro.disconnect();
      document.removeEventListener('focusin', onFocus);
      skipBtn.remove();
      layer.remove();
      revealAll();
    };
  }, []);

  return null;
}
