'use client';

import { useEffect } from 'react';

/*
  Swarm build: a swarm of multiplayer cursors builds the visible page live.

  Original implementation for this site. Choreography:
    1. the swarm orbits a mark in the middle of the screen, then fans out
    2. design tool rulers slide in and one cursor drags out a red guide
    3. cursors drag selection boxes with a crosshair and a live W x H badge,
       a placeholder fills the box, then the real content appears
    4. headings are typed in with an I beam and a caret
    5. repeated items are built once, then option dragged as copies with a
       red spacing measurement
    6. finale: everyone clicks the main button, flocks to the mouse, leaves

  It plays once per visit (see the arming script in layout.tsx) and can be
  replayed any time with a "swarmreplay" event. After the intro, sections
  simply fade in as they scroll into view, so scrolling stays smooth.
  Everything moves with transform or opacity inside one fixed, contained layer.
*/

const LABELS = [
  'PyTorch', 'SQL', 'pandas', 'FastAPI', 'MLflow', 'SHAP', 'FAISS', 'XGBoost',
  'Docker', 'NumPy', 'LangChain', 'Grad CAM', 'sklearn', 'BM25', 'Azure',
  'pytest', 'Git', 'R', 'LightGBM', 'Python',
];

const ICON_ARROW =
  '<svg width="18" height="22" viewBox="0 0 18 22" aria-hidden="true"><path d="M1.5 1.5 L1.5 17 L5.6 13.3 L8.4 20 L11.3 18.8 L8.6 12.2 L14.2 12.2 Z" fill="currentColor" stroke="#090909" stroke-width="1.3" stroke-linejoin="round"/></svg>';
const ICON_CROSS =
  '<svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true" style="transform:translate(-11px,-11px)"><path d="M11 1v7M11 14v7M1 11h7M14 11h7" stroke="#090909" stroke-width="3.2" stroke-linecap="round"/><path d="M11 1v7M11 14v7M1 11h7M14 11h7" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>';
const ICON_BEAM =
  '<svg width="12" height="22" viewBox="0 0 12 22" aria-hidden="true" style="transform:translate(-6px,-11px)"><path d="M2 1.5h3l1 1 1-1h3M6 2.5v17M2 20.5h3l1-1 1 1h3" fill="none" stroke="#090909" stroke-width="3" stroke-linecap="round"/><path d="M2 1.5h3l1 1 1-1h3M6 2.5v17M2 20.5h3l1-1 1 1h3" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>';

type Cursor = { el: HTMLDivElement; icon: HTMLSpanElement; x: number; y: number; anim?: Animation };

const EASE = 'cubic-bezier(0.65, 0, 0.35, 1)';
const rand = (a: number, b: number) => a + Math.random() * (b - a);
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export default function CursorBuild() {
  useEffect(() => {
    const root = document.documentElement;
    (window as any).__cbReady = true;
    const motionOff = () => root.classList.contains('motion-off');
    const isMobile = window.innerWidth < 768;

    const built = new WeakSet<HTMLElement>();
    const reveal = (el: HTMLElement, animate = true) => {
      if (built.has(el)) return;
      built.add(el);
      el.classList.add('is-built');
      if (animate && !motionOff()) {
        el.animate(
          [
            { clipPath: 'inset(0 100% 100% 0)', opacity: 0.2 },
            { clipPath: 'inset(-30px -30px -30px -30px)', opacity: 1 },
          ],
          { duration: 600, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' },
        );
      }
    };
    const fadeIn = (el: HTMLElement) => {
      if (built.has(el)) return;
      built.add(el);
      el.classList.add('is-built');
      if (!motionOff()) {
        el.animate([{ opacity: 0, transform: 'translateY(14px)' }, { opacity: 1, transform: 'none' }], {
          duration: 420,
          easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
        });
      }
    };
    const revealAll = () => document.querySelectorAll<HTMLElement>('[data-build]').forEach((el) => reveal(el, false));

    // ---------------- Layer ----------------
    const layer = document.createElement('div');
    layer.className = 'cb-layer';
    layer.setAttribute('aria-hidden', 'true');
    const stage = document.createElement('div');
    stage.className = 'cb-stage';
    layer.appendChild(stage);
    const ensureLayer = () => {
      if (!layer.isConnected) document.body.appendChild(layer);
    };
    const syncStage = () => {
      stage.style.transform = `translate3d(${-window.scrollX}px, ${-window.scrollY}px, 0)`;
    };

    let mouse: [number, number] | null = null;
    const onMouse = (e: MouseEvent) => (mouse = [e.clientX, e.clientY]);
    window.addEventListener('mousemove', onMouse, { passive: true });

    // ---------------- Cursor primitives ----------------
    let labelIndex = Math.floor(Math.random() * LABELS.length);
    const spawn = (sx: number, sy: number, i: number): Cursor => {
      const el = document.createElement('div');
      const variant = i % 3 === 0 ? 'is-red' : i % 3 === 1 ? '' : 'is-dim';
      el.className = `cb-cursor ${variant}`;
      const icon = document.createElement('span');
      icon.className = 'cb-icon';
      icon.innerHTML = ICON_ARROW;
      const tag = document.createElement('span');
      tag.className = 'cb-tag';
      tag.textContent = LABELS[labelIndex++ % LABELS.length];
      el.append(icon, tag);
      el.style.transform = `translate3d(${sx}px, ${sy}px, 0)`;
      stage.appendChild(el);
      return { el, icon, x: sx, y: sy };
    };
    const setIcon = (c: Cursor, kind: 'arrow' | 'cross' | 'beam') => {
      c.icon.innerHTML = kind === 'cross' ? ICON_CROSS : kind === 'beam' ? ICON_BEAM : ICON_ARROW;
    };
    const place = (c: Cursor, x: number, y: number) => {
      c.anim?.cancel();
      c.x = x;
      c.y = y;
      c.el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };
    const moveTo = (c: Cursor, x: number, y: number, duration: number) => {
      c.anim?.cancel();
      const from = `translate3d(${c.x}px, ${c.y}px, 0)`;
      const to = `translate3d(${x}px, ${y}px, 0)`;
      c.x = x;
      c.y = y;
      c.el.style.transform = to;
      const anim = c.el.animate([{ transform: from }, { transform: to }], { duration, easing: EASE });
      c.anim = anim;
      return anim.finished.then(() => undefined, () => undefined);
    };
    const press = (c: Cursor) => c.el.animate([{ scale: '1' }, { scale: '0.82' }, { scale: '1' }], { duration: 200 });
    const fadeOut = (el: Element, delay = 0, dur = 380) =>
      (el as HTMLElement)
        .animate([{ opacity: 1 }, { opacity: 0 }], { duration: dur, delay, fill: 'forwards' })
        .finished.then(() => el.remove(), () => el.remove());

    const plusMark = (x: number, y: number) => {
      const p = document.createElement('div');
      p.className = 'cb-plus';
      p.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      stage.appendChild(p);
      p.animate([{ opacity: 0 }, { opacity: 1, offset: 0.15 }, { opacity: 1, offset: 0.7 }, { opacity: 0 }], {
        duration: 1300,
        fill: 'forwards',
      }).finished.then(() => p.remove(), () => p.remove());
    };

    // Drag a selection box from (x0,y0) to (x0+w,y0+h) with a live size badge.
    const dragBox = (c: Cursor, x0: number, y0: number, w: number, h: number, duration: number, cls = '') =>
      new Promise<HTMLDivElement>((resolve) => {
        const box = document.createElement('div');
        box.className = `cb-box ${cls}`;
        box.style.transform = `translate3d(${x0}px, ${y0}px, 0)`;
        const size = document.createElement('span');
        size.className = 'cb-size';
        box.appendChild(size);
        stage.appendChild(box);
        c.anim?.cancel();
        const start = performance.now();
        const step = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const e = easeInOut(t);
          const cw = w * e;
          const ch = h * e;
          box.style.width = `${cw}px`;
          box.style.height = `${ch}px`;
          size.textContent = `${Math.round(cw)} × ${Math.round(ch)}`;
          c.x = x0 + cw;
          c.y = y0 + ch;
          c.el.style.transform = `translate3d(${c.x}px, ${c.y}px, 0)`;
          if (t < 1 && !skipping) requestAnimationFrame(step);
          else resolve(box);
        };
        requestAnimationFrame(step);
      });

    // ---------------- Build actions ----------------
    let skipping = false;
    let killed = false;

    const typeIn = async (el: HTMLElement, c: Cursor, x0: number, y0: number, w: number, h: number, speed: number) => {
      await moveTo(c, x0, y0, rand(300, 420) * speed);
      if (built.has(el) || skipping || killed) return reveal(el, false);
      setIcon(c, 'cross');
      const box = await dragBox(c, x0, y0, w, h, 260 * speed, 'is-text');
      setIcon(c, 'beam');
      const letters = Math.max(1, (el.textContent || '').trim().length);
      const dur = letters * 110 * speed + 100;
      built.add(el);
      el.classList.add('is-built');
      el.animate(
        [{ clipPath: 'inset(-30px 100% -30px -30px)' }, { clipPath: 'inset(-30px -30px -30px -30px)' }],
        { duration: dur, easing: `steps(${letters}, end)` },
      );
      const caret = document.createElement('div');
      caret.className = 'cb-caret';
      caret.style.height = `${h * 0.78}px`;
      stage.appendChild(caret);
      caret.animate(
        [
          { transform: `translate3d(${x0}px, ${y0 + h * 0.11}px, 0)` },
          { transform: `translate3d(${x0 + w}px, ${y0 + h * 0.11}px, 0)` },
        ],
        { duration: dur, easing: `steps(${letters}, end)`, fill: 'forwards' },
      );
      place(c, x0, y0 + h * 0.5);
      await moveTo(c, x0 + w + 6, y0 + h * 0.5, dur);
      fadeOut(box, 0, 300);
      caret
        .animate([{ opacity: 1 }, { opacity: 0 }, { opacity: 1 }, { opacity: 0 }], { duration: 700, fill: 'forwards' })
        .finished.then(() => caret.remove(), () => caret.remove());
      setIcon(c, 'arrow');
    };

    // Option drag a copy of the master into place, with a spacing measurement.
    const duplicate = async (el: HTMLElement, master: HTMLElement, c: Cursor, speed: number) => {
      const started = performance.now();
      while (!built.has(master) && performance.now() - started < 2500 && !skipping && !killed) await sleep(60);
      if (built.has(el) || skipping || killed || !built.has(master)) return reveal(el, false);
      const m = master.getBoundingClientRect();
      const t = el.getBoundingClientRect();
      const sx = window.scrollX;
      const sy = window.scrollY;
      const mx = m.left + sx;
      const my = m.top + sy;
      await moveTo(c, mx + m.width * 0.5, my + m.height * 0.5, rand(280, 380) * speed);
      if (skipping || killed) return reveal(el, false);
      press(c);
      const ghost = master.cloneNode(true) as HTMLElement;
      ghost.querySelectorAll('[data-build],[data-count]').forEach((n) => {
        n.removeAttribute('data-build');
        n.removeAttribute('data-count');
      });
      ghost.removeAttribute('data-build');
      ghost.removeAttribute('data-dup');
      ghost.className = `${ghost.className} cb-ghost`;
      ghost.style.width = `${m.width}px`;
      ghost.style.height = `${m.height}px`;
      ghost.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
      stage.appendChild(ghost);
      const tx = t.left + sx;
      const ty = t.top + sy;
      const dur = 420 * speed + 160;
      ghost.animate(
        [{ transform: `translate3d(${mx}px, ${my}px, 0)` }, { transform: `translate3d(${tx}px, ${ty}px, 0)` }],
        { duration: dur, easing: EASE, fill: 'forwards' },
      );
      // Red spacing measurement between the master and the copy.
      const dy = Math.round(t.top - m.top);
      let measure: HTMLDivElement | null = null;
      if (dy > 4 && Math.abs(t.left - m.left) < 4) {
        measure = document.createElement('div');
        measure.className = 'cb-measure';
        measure.style.transform = `translate3d(${mx - 12}px, ${my}px, 0)`;
        measure.style.height = `${dy}px`;
        measure.innerHTML = `<span>${dy}</span>`;
        stage.appendChild(measure);
        measure.animate([{ opacity: 0 }, { opacity: 1 }], { duration: dur * 0.6, delay: dur * 0.4, fill: 'both' });
      }
      await moveTo(c, tx + t.width * 0.5, ty + t.height * 0.5, dur);
      press(c);
      reveal(el, false);
      el.animate([{ opacity: 0.4 }, { opacity: 1 }], { duration: 300 });
      fadeOut(ghost, 0, 200);
      if (measure) fadeOut(measure, 500, 400);
    };

    const build = async (el: HTMLElement, c: Cursor, speed: number) => {
      if (built.has(el)) return;
      if (skipping || killed) return reveal(el, false);

      const dupGroup = el.dataset.dup;
      if (dupGroup) {
        const master = document.querySelector<HTMLElement>(`[data-dup="${dupGroup}"]`);
        if (master && master !== el) return duplicate(el, master, c, speed);
      }

      const r = el.getBoundingClientRect();
      const x0 = r.left + window.scrollX;
      const y0 = r.top + window.scrollY;
      const w = Math.max(r.width, 8);
      const h = Math.max(r.height, 8);
      if (el.hasAttribute('data-type')) return typeIn(el, c, x0, y0, w, h, speed);

      await moveTo(c, x0, y0, rand(280, 440) * speed);
      if (built.has(el)) return;
      if (skipping || killed) return reveal(el, false);
      plusMark(x0, y0);
      setIcon(c, 'cross');
      const drag = Math.min(600, 230 + Math.sqrt(w * h) * 0.5) * speed;
      const box = await dragBox(c, x0, y0, w, h, drag);
      plusMark(x0 + w, y0 + h);
      setIcon(c, 'arrow');
      reveal(el);
      fadeOut(box, 90, 360);
    };

    const exit = async (c: Cursor) => {
      const vw = window.innerWidth;
      const x = Math.random() < 0.5 ? -80 : vw + 80;
      const y = window.scrollY + rand(0, window.innerHeight);
      c.el.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 480, delay: 100, fill: 'forwards' });
      await moveTo(c, x, y, rand(450, 680));
      c.el.remove();
    };

    // ---------------- Scene pieces ----------------
    const rulers = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const top = document.createElement('div');
      top.className = 'cb-ruler cb-ruler-top';
      const left = document.createElement('div');
      left.className = 'cb-ruler cb-ruler-left';
      for (let x = 100; x < vw; x += 100) top.insertAdjacentHTML('beforeend', `<span style="left:${x}px">${x}</span>`);
      for (let y = 100; y < vh; y += 100) left.insertAdjacentHTML('beforeend', `<span style="top:${y}px">${y}</span>`);
      layer.append(top, left);
      if (!motionOff()) {
        top.animate([{ transform: 'translateY(-100%)' }, { transform: 'none' }], { duration: 420, easing: EASE });
        left.animate([{ transform: 'translateX(-100%)' }, { transform: 'none' }], { duration: 420, easing: EASE });
      }
      return {
        remove() {
          const opts = { duration: 380, easing: EASE, fill: 'forwards' as const };
          top.animate([{ transform: 'none' }, { transform: 'translateY(-100%)' }], opts).finished.then(() => top.remove(), () => top.remove());
          left.animate([{ transform: 'none' }, { transform: 'translateX(-100%)' }], opts).finished.then(() => left.remove(), () => left.remove());
        },
      };
    };

    // One cursor pulls a red guide out of the left ruler to the content edge.
    const dragGuide = async (c: Cursor, targetX: number) => {
      const guide = document.createElement('div');
      guide.className = 'cb-guide';
      const tag = document.createElement('span');
      tag.className = 'cb-guide-tag';
      guide.appendChild(tag);
      layer.appendChild(guide);
      const y = window.innerHeight * 0.55;
      await moveTo(c, 10, window.scrollY + y, 380);
      press(c);
      const start = performance.now();
      const dur = 620;
      await new Promise<void>((res) => {
        const step = (now: number) => {
          const t = Math.min(1, (now - start) / dur);
          const x = 10 + (targetX - 10) * easeInOut(t);
          guide.style.transform = `translate3d(${x}px, 0, 0)`;
          tag.textContent = `x ${Math.round(x)}`;
          c.x = x;
          c.y = window.scrollY + y;
          c.el.style.transform = `translate3d(${c.x}px, ${c.y}px, 0)`;
          if (t < 1 && !skipping) requestAnimationFrame(step);
          else res();
        };
        requestAnimationFrame(step);
      });
      return guide;
    };

    // The swarm orbits a mark in the middle of the screen before fanning out.
    const orbit = async (cursors: Cursor[]) => {
      const cx = window.innerWidth / 2;
      const cy = window.scrollY + window.innerHeight * 0.46;
      const mark = document.createElement('div');
      mark.className = 'cb-mark';
      mark.innerHTML = '<span>K</span><i></i>';
      mark.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      stage.appendChild(mark);
      mark.animate([{ opacity: 0, scale: '0.6' }, { opacity: 1, scale: '1' }], { duration: 320, fill: 'both', easing: EASE });
      const dur = 1250;
      await Promise.all(
        cursors.map((c, i) => {
          const radius = rand(70, 150) * (isMobile ? 0.7 : 1);
          const a0 = (i / cursors.length) * Math.PI * 2;
          const frames: Keyframe[] = [];
          const turns = 1.15;
          for (let k = 0; k <= 16; k++) {
            const p = k / 16;
            const a = a0 + p * Math.PI * 2 * turns;
            const rr = radius * (0.6 + 0.4 * Math.min(1, p * 2.5));
            frames.push({ transform: `translate3d(${cx + Math.cos(a) * rr}px, ${cy + Math.sin(a) * rr * 0.62}px, 0)`, offset: p });
          }
          const start = `translate3d(${c.x}px, ${c.y}px, 0)`;
          frames.unshift({ transform: start, offset: 0 });
          frames[1].offset = 0.22;
          for (let k = 2; k < frames.length; k++) frames[k].offset = 0.22 + ((k - 1) / 16) * 0.78;
          const last = frames[frames.length - 1].transform as string;
          const m = /translate3d\(([-\d.]+)px, ([-\d.]+)px/.exec(last)!;
          c.x = Number(m[1]);
          c.y = Number(m[2]);
          c.el.style.transform = last;
          c.anim?.cancel();
          const anim = c.el.animate(frames, { duration: dur, easing: 'linear' });
          c.anim = anim;
          return anim.finished.then(() => undefined, () => undefined);
        }),
      );
      fadeOut(mark, 0, 300);
    };

    // After the finale click, the swarm flocks around the visitor's mouse.
    const flock = async (cursors: Cursor[]) => {
      if (!mouse || isMobile) return;
      const [mx, my] = mouse;
      await Promise.all(
        cursors.map((c, i) => {
          const a = (i / cursors.length) * Math.PI * 2 + rand(-0.3, 0.3);
          const d = rand(46, 96);
          return moveTo(c, mx + Math.cos(a) * d, window.scrollY + my + Math.sin(a) * d, rand(380, 560));
        }),
      );
      await sleep(260);
    };

    const toolbar = (agents: number, total: number, onSkip: () => void) => {
      const bar = document.createElement('div');
      bar.className = 'cb-toolbar';
      bar.innerHTML =
        '<span class="live"></span><span class="avatars"><span></span><span></span><span></span><span></span></span>' +
        `<span class="stat"><b data-agents>${agents}</b> agents · <b data-layers>0</b> / ${total} layers</span>`;
      const skip = document.createElement('button');
      skip.type = 'button';
      skip.textContent = 'Skip';
      skip.onclick = onSkip;
      bar.appendChild(skip);
      document.body.appendChild(bar);
      bar.animate([{ opacity: 0, transform: 'translate(-50%, 10px)' }, { opacity: 1, transform: 'translate(-50%, 0)' }], {
        duration: 380,
        fill: 'both',
        easing: EASE,
      });
      const layersEl = bar.querySelector('[data-layers]')!;
      const agentsEl = bar.querySelector('[data-agents]')!;
      return {
        setLayers: (n: number) => (layersEl.textContent = String(n)),
        setAgents: (n: number) => (agentsEl.textContent = String(n)),
        done: () => {
          skip.remove();
          bar.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 450, delay: 600, fill: 'forwards' })
            .finished.then(() => bar.remove(), () => bar.remove());
        },
        remove: () => bar.remove(),
      };
    };

    // ---------------- The full swarm run ----------------
    let running = false;
    const runSwarm = async (targets: HTMLElement[], opts: { finale?: HTMLElement | null }) => {
      if (running || !targets.length) return;
      running = true;
      skipping = false;
      ensureLayer();
      syncStage();
      const onScroll = () => syncStage();
      window.addEventListener('scroll', onScroll, { passive: true });

      const speed = isMobile ? 0.72 : 0.85;
      const count = Math.min(isMobile ? 8 : 16, targets.length);
      const pos = new Map(targets.map((el) => [el, el.getBoundingClientRect()]));
      targets.sort((a, b) => {
        const ra = pos.get(a)!;
        const rb = pos.get(b)!;
        return Math.abs(ra.top - rb.top) > 24 ? ra.top - rb.top : ra.left - rb.left;
      });

      let layersDone = 0;
      const bar = toolbar(count, targets.length, () => {
        skipping = true;
        stage.querySelectorAll('.cb-cursor').forEach((n) => n.remove());
        targets.forEach((el) => reveal(el, false));
      });
      const tick = window.setInterval(() => {
        layersDone = targets.filter((el) => built.has(el)).length;
        bar.setLayers(layersDone);
      }, 120);

      // Spawn just outside the edges, then orbit together.
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const sy = window.scrollY;
      const cursors = Array.from({ length: count }, (_, i) => {
        const a = (i / count) * Math.PI * 2;
        return spawn(vw / 2 + Math.cos(a) * vw * 0.62, sy + vh / 2 + Math.sin(a) * vh * 0.62, i);
      });
      const ruler = rulers();
      await orbit(cursors);

      // A red guide is pulled to the left content edge while the others fan out.
      const edgeEl = document.querySelector<HTMLElement>('#home h1') ?? targets[0];
      const edgeX = edgeEl.getBoundingClientRect().left;
      let guide: HTMLDivElement | null = null;
      const guideJob = skipping ? Promise.resolve() : dragGuide(cursors[0], edgeX).then((g) => void (guide = g));

      let next = 0;
      const work = async (c: Cursor, i: number) => {
        if (i === 0) await guideJob;
        await sleep(i * 40 * speed);
        while (next < targets.length && !killed) {
          await build(targets[next++], c, speed);
          await sleep(rand(10, 50) * speed);
        }
      };
      await Promise.all(cursors.map((c, i) => work(c, i)));

      // Finale: click the main button together, flock to the mouse, then leave.
      const finale = opts.finale;
      if (finale && finale.isConnected && !skipping && !killed) {
        const r = finale.getBoundingClientRect();
        const cx = r.left + window.scrollX + r.width / 2;
        const cy = r.top + window.scrollY + r.height / 2;
        await Promise.all(
          cursors.map((c, i) => {
            const a = (i / cursors.length) * Math.PI * 2;
            const d = rand(8, 26);
            return moveTo(c, cx + Math.cos(a) * d, cy + Math.sin(a) * d * 0.6, rand(460, 620));
          }),
        );
        await sleep(70);
        const ripple = document.createElement('div');
        ripple.className = 'cb-ripple';
        stage.appendChild(ripple);
        ripple
          .animate(
            [
              { transform: `translate3d(${cx}px, ${cy}px, 0) scale(1)`, opacity: 1 },
              { transform: `translate3d(${cx}px, ${cy}px, 0) scale(9)`, opacity: 0 },
            ],
            { duration: 620, easing: 'ease-out', fill: 'forwards' },
          )
          .finished.then(() => ripple.remove(), () => ripple.remove());
        cursors.forEach(press);
        finale.classList.remove('cb-clicked');
        void finale.offsetWidth;
        finale.classList.add('cb-clicked');
        window.setTimeout(() => finale.classList.remove('cb-clicked'), 900);
        await sleep(240);
        await flock(cursors);
      }

      ruler.remove();
      if (guide) fadeOut(guide, 0, 300);
      window.clearInterval(tick);
      bar.setLayers(targets.length);
      bar.setAgents(0);
      bar.done();
      let left = cursors.length;
      await Promise.all(
        cursors.map((c, i) =>
          sleep(i * 22).then(() => exit(c)).then(() => bar.setAgents(--left)),
        ),
      );
      window.removeEventListener('scroll', onScroll);
      running = false;
      skipping = false;
    };

    // ---------------- Replay on demand ----------------
    const onReplay = () => {
      if (running || motionOff()) return;
      const vh = window.innerHeight;
      const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-build]')).filter((el) => {
        const r = el.getBoundingClientRect();
        return r.top < vh && r.bottom > 0 && r.height > 0 && !el.closest('[data-showcase],[data-filmstrip]');
      });
      if (!targets.length) return;
      root.classList.add('cb-armed');
      targets.forEach((el) => {
        built.delete(el);
        el.classList.remove('is-built');
      });
      const finale = document.querySelector<HTMLElement>('[data-finale]');
      const inView = finale && targets.some((t) => t === finale);
      runSwarm(targets, { finale: inView ? finale : null });
    };
    window.addEventListener('swarmreplay', onReplay);

    const baseCleanup = () => {
      killed = true;
      window.removeEventListener('swarmreplay', onReplay);
      window.removeEventListener('mousemove', onMouse);
      layer.remove();
      document.querySelectorAll('.cb-toolbar').forEach((n) => n.remove());
    };

    if (!root.classList.contains('cb-armed')) {
      revealAll();
      return baseCleanup;
    }

    // ---------------- Intro (first visit only) ----------------
    const vh = window.innerHeight;
    const introTargets = Array.from(document.querySelectorAll<HTMLElement>('[data-build]')).filter((el) => {
      const r = el.getBoundingClientRect();
      return r.top < vh && r.bottom > 0;
    });
    document.querySelectorAll<HTMLElement>('[data-build]').forEach((el) => {
      if (el.getBoundingClientRect().bottom <= 0) reveal(el, false);
    });
    const introDone = runSwarm(introTargets, { finale: document.querySelector<HTMLElement>('[data-finale]') });

    // ---------------- After the intro: sections fade up as they enter ----------------
    const queued = new WeakSet<HTMLElement>();
    let introFinished = false;
    let positions: { el: HTMLElement; top: number; bottom: number }[] = [];
    let ticking = false;

    const measure = () => {
      const sy = window.scrollY;
      positions = Array.from(document.querySelectorAll<HTMLElement>('[data-build]'))
        .filter((el) => !built.has(el))
        .map((el) => {
          const r = el.getBoundingClientRect();
          return { el, top: r.top + sy, bottom: r.bottom + sy };
        });
    };

    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      ro.disconnect();
    };

    const scan = () => {
      if (killed || !introFinished) return;
      const sy = window.scrollY;
      const vhNow = window.innerHeight;
      let remaining = 0;
      let n = 0;
      for (const p of positions) {
        if (built.has(p.el)) continue;
        remaining++;
        const top = p.top - sy;
        const bottom = p.bottom - sy;
        if (bottom <= 0) reveal(p.el, false);
        else if (top < vhNow * 1.02 && !queued.has(p.el)) {
          queued.add(p.el);
          const el = p.el;
          const delay = Math.min(n++, 6) * 45;
          if (delay) window.setTimeout(() => fadeIn(el), delay);
          else fadeIn(el);
        }
      }
      if (remaining === 0) finish();
    };
    const onScroll = () => {
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

    introDone.then(() => {
      introFinished = true;
      measure();
      scan();
    });

    // Keyboard users never land on something invisible.
    const onFocus = (e: FocusEvent) => {
      const el = (e.target as HTMLElement)?.closest?.('[data-build]') as HTMLElement | null;
      if (el) reveal(el, false);
    };
    document.addEventListener('focusin', onFocus);

    const onMotion = () => {
      if (!motionOff()) return;
      skipping = true;
      revealAll();
      stage.replaceChildren();
      document.querySelectorAll('.cb-toolbar').forEach((n) => n.remove());
    };
    window.addEventListener('motionchange', onMotion);

    return () => {
      baseCleanup();
      window.removeEventListener('motionchange', onMotion);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('focusin', onFocus);
      ro.disconnect();
      revealAll();
    };
  }, []);

  return null;
}
