'use client';

import { useEffect } from 'react';

/*
  Easter egg. Type ↑ ↑ ↓ ↓ ← → ← → B A (or tap the KRISHI logo five times on a phone)
  and a swarm of cursors flies in, spells HIRE KRISHI, holds for a moment, then scatters.
  Everything moves with transform and opacity in one fixed layer that is removed afterwards.
*/

const CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

const ARROW =
  '<svg width="10" height="12" viewBox="0 0 18 22" aria-hidden="true"><path d="M1.5 1.5 L1.5 17 L5.6 13.3 L8.4 20 L11.3 18.8 L8.6 12.2 L14.2 12.2 Z" fill="currentColor" stroke="#090909" stroke-width="1.6" stroke-linejoin="round"/></svg>';

const EASE_IN_OUT = 'cubic-bezier(0.65, 0, 0.35, 1)';
const EASE_OUT = 'cubic-bezier(0.16, 1, 0.3, 1)';
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const rand = (a: number, b: number) => a + Math.random() * (b - a);

// Sample points inside the rendered text, aiming for about `target` points
function samplePoints(lines: string[], boxW: number, boxH: number, target: number) {
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(boxW);
  canvas.height = Math.round(boxH);
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) return [];
  const lineH = boxH / lines.length;
  let size = lineH * 0.92;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = `${size}px Anton, Impact, sans-serif`;
  const widest = Math.max(...lines.map((l) => ctx.measureText(l).width));
  if (widest > boxW * 0.96) size *= (boxW * 0.96) / widest;
  ctx.font = `${size}px Anton, Impact, sans-serif`;
  ctx.fillStyle = '#000';
  lines.forEach((l, i) => ctx.fillText(l, boxW / 2, lineH * (i + 0.5)));
  const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  const inside = (x: number, y: number) => data[(Math.floor(y) * canvas.width + Math.floor(x)) * 4 + 3] > 140;

  let step = Math.sqrt((boxW * boxH * 0.3) / target);
  let pts: [number, number][] = [];
  for (let tries = 0; tries < 8; tries++) {
    pts = [];
    for (let y = step / 2; y < boxH; y += step) {
      for (let x = step / 2; x < boxW; x += step) if (inside(x, y)) pts.push([x, y]);
    }
    if (pts.length > target * 1.15) step *= 1.08;
    else if (pts.length < target * 0.85) step *= 0.93;
    else break;
  }
  return pts;
}

export default function KonamiSwarm() {
  useEffect(() => {
    let pos = 0;
    let running = false;

    const play = async () => {
      if (running) return;
      running = true;
      const still = document.documentElement.classList.contains('motion-off');
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const narrow = vw < 700;
      const boxW = Math.min(vw * 0.86, 1100);
      const boxH = narrow ? Math.min(vh * 0.42, boxW * 0.9) : Math.min(vh * 0.36, boxW * 0.26);
      const ox = (vw - boxW) / 2;
      const oy = (vh - boxH) / 2 - (narrow ? 10 : 20);
      const target = narrow ? 240 : 460;

      const layer = document.createElement('div');
      layer.className = 'konami-layer';
      layer.setAttribute('role', 'status');
      const veil = document.createElement('div');
      veil.className = 'konami-veil';
      const caption = document.createElement('div');
      caption.className = 'konami-caption';
      caption.innerHTML = '<span>↑↑↓↓←→←→BA</span> Cheat code accepted. Let’s talk.';
      const group = document.createElement('div');
      group.className = 'konami-group';
      layer.append(veil, group, caption);
      document.body.appendChild(layer);
      veil.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 500, fill: 'forwards' });

      if (document.fonts?.load) await document.fonts.load('80px Anton').catch(() => {});
      const pts = samplePoints(narrow ? ['HIRE', 'KRISHI'] : ['HIRE KRISHI'], boxW, boxH, target);

      if (still || pts.length === 0) {
        // Motion off: show the words directly
        const word = document.createElement('div');
        word.className = 'konami-word';
        word.textContent = 'Hire Krishi';
        layer.appendChild(word);
        caption.style.opacity = '1';
        await sleep(2600);
        layer.remove();
        running = false;
        return;
      }

      // Each cursor starts just outside a random screen edge. Targets are ranked left to right
      // so the words assemble in reading order. Cursors are created in small batches across
      // frames so the page never stalls.
      const ranked = pts.map((p, i) => ({ p, i })).sort((a, b) => a.p[0] - b.p[0]);
      const rank = new Array<number>(pts.length);
      ranked.forEach((r, k) => (rank[r.i] = k));
      const cursors: { el: HTMLDivElement; tx: number; ty: number }[] = [];
      const t0 = performance.now();
      for (let start = 0; start < pts.length; start += 60) {
        const frag = document.createDocumentFragment();
        const batch: { el: HTMLDivElement; sx: number; sy: number; tx: number; ty: number; k: number }[] = [];
        for (let i = start; i < Math.min(pts.length, start + 60); i++) {
          const [px, py] = pts[i];
          const el = document.createElement('div');
          el.className = `konami-cursor ${i % 4 === 0 ? 'is-white' : i % 4 === 1 ? 'is-pink' : ''}`;
          el.innerHTML = ARROW;
          const side = Math.floor(Math.random() * 4);
          const sx = side === 0 ? -30 : side === 1 ? vw + 30 : rand(-30, vw + 30);
          const sy = side === 2 ? -30 : side === 3 ? vh + 30 : rand(-30, vh + 30);
          el.style.transform = `translate3d(${sx}px, ${sy}px, 0)`;
          frag.appendChild(el);
          batch.push({ el, sx, sy, tx: ox + px, ty: oy + py, k: rank[i] });
        }
        group.appendChild(frag);
        const elapsed = performance.now() - t0;
        batch.forEach((c) => {
          const delay = Math.max(0, (c.k / pts.length) * 800 + rand(0, 160) - elapsed);
          const midX = (c.sx + c.tx) / 2 + rand(-120, 120);
          const midY = (c.sy + c.ty) / 2 + rand(-120, 120);
          c.el.animate(
            [
              { transform: `translate3d(${c.sx}px, ${c.sy}px, 0)` },
              { transform: `translate3d(${midX}px, ${midY}px, 0)`, offset: 0.55 },
              { transform: `translate3d(${c.tx}px, ${c.ty}px, 0)` },
            ],
            { duration: rand(900, 1250), delay, easing: EASE_IN_OUT, fill: 'forwards' },
          );
          cursors.push({ el: c.el, tx: c.tx, ty: c.ty });
        });
        await new Promise((r) => requestAnimationFrame(r));
      }
      await sleep(2050);
      caption.animate([{ opacity: 0, transform: 'translate(-50%, 8px)' }, { opacity: 1, transform: 'translate(-50%, 0)' }], {
        duration: 400,
        easing: EASE_OUT,
        fill: 'forwards',
      });

      // A small ripple while holding, so it feels alive
      cursors.forEach((c) => {
        c.el.style.transform = `translate3d(${c.tx}px, ${c.ty}px, 0)`;
        c.el.animate(
          [
            { transform: `translate3d(${c.tx}px, ${c.ty}px, 0)` },
            { transform: `translate3d(${c.tx}px, ${c.ty - 5}px, 0)` },
            { transform: `translate3d(${c.tx}px, ${c.ty}px, 0)` },
          ],
          { duration: 600, delay: ((c.tx - ox) / boxW) * 500, easing: EASE_IN_OUT },
        );
      });
      await sleep(2100);

      // Scatter away from the centre and fade out
      const cx = vw / 2;
      const cy = vh / 2;
      for (let start = 0; start < cursors.length; start += 50) {
        cursors.slice(start, start + 50).forEach((c) => {
          const ang = Math.atan2(c.ty - cy, c.tx - cx) + rand(-0.4, 0.4);
          const dist = Math.max(vw, vh) * rand(1.0, 1.3);
          c.el.animate(
            [
              { transform: `translate3d(${c.tx}px, ${c.ty}px, 0)` },
              { transform: `translate3d(${c.tx + Math.cos(ang) * dist}px, ${c.ty + Math.sin(ang) * dist}px, 0)` },
            ],
            { duration: rand(700, 1000), delay: rand(0, 120), easing: 'cubic-bezier(0.5, 0, 0.75, 0)', fill: 'forwards' },
          );
        });
        await new Promise((r) => requestAnimationFrame(r));
      }
      caption.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 500, delay: 300, fill: 'forwards' });
      veil.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 700, delay: 400, fill: 'forwards' });
      await sleep(1250);
      layer.remove();
      running = false;
    };

    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (key === CODE[pos]) {
        pos++;
        if (pos === CODE.length) {
          pos = 0;
          play();
        }
      } else {
        pos = key === CODE[0] ? 1 : 0;
      }
    };

    // Phones: tap the logo five times quickly
    let taps: number[] = [];
    const onTap = (e: MouseEvent) => {
      const logo = (e.target as HTMLElement).closest('[data-logo]');
      if (!logo) return;
      const now = performance.now();
      taps = [...taps.filter((t) => now - t < 1600), now];
      if (taps.length >= 5) {
        taps = [];
        e.preventDefault();
        play();
      }
    };

    window.addEventListener('keydown', onKey);
    document.addEventListener('click', onTap, true);
    (window as any).__konami = play;
    return () => {
      window.removeEventListener('keydown', onKey);
      document.removeEventListener('click', onTap, true);
    };
  }, []);

  return null;
}
