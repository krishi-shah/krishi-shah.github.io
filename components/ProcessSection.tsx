'use client';

import { useCallback, useRef, useState } from 'react';
import { MoveHorizontal } from 'lucide-react';

/* Illustrative reliability diagram: predicted confidence vs observed accuracy. */
function Reliability({ calibrated }: { calibrated: boolean }) {
  const bins = Array.from({ length: 10 }, (_, i) => (i + 0.5) / 10);
  const acc = (c: number) => (calibrated ? c * 0.97 + 0.015 : Math.pow(c, 2.1) * 0.92 + 0.03);
  const W = 800;
  const H = 420;
  const pad = 50;
  const x = (v: number) => pad + v * (W - pad * 2);
  const y = (v: number) => H - pad - v * (H - pad * 2);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-full w-full" preserveAspectRatio="none" aria-hidden="true">
      <rect width={W} height={H} fill={calibrated ? '#140507' : '#0f0f0f'} />
      {Array.from({ length: 11 }, (_, i) => (
        <g key={i} stroke="rgba(255,255,255,0.06)">
          <line x1={x(i / 10)} x2={x(i / 10)} y1={y(0)} y2={y(1)} />
          <line y1={y(i / 10)} y2={y(i / 10)} x1={x(0)} x2={x(1)} />
        </g>
      ))}
      <line x1={x(0)} y1={y(0)} x2={x(1)} y2={y(1)} stroke="rgba(255,255,255,0.35)" strokeDasharray="6 6" />
      {bins.map((c) => (
        <rect
          key={c}
          x={x(c - 0.045)}
          width={x(0.09) - x(0)}
          y={y(acc(c))}
          height={y(0) - y(acc(c))}
          fill={calibrated ? '#e3263b' : '#3a3a3a'}
          opacity={calibrated ? 0.85 : 1}
        />
      ))}
      <polyline
        points={bins.map((c) => `${x(c)},${y(acc(c))}`).join(' ')}
        fill="none"
        stroke={calibrated ? '#ffffff' : '#8a8a8a'}
        strokeWidth="2"
      />
      <text x={x(0)} y={H - 16} fill="#8a8a8a" fontSize="13" fontFamily="sans-serif">
        CONFIDENCE
      </text>
      <text x={x(1)} y={H - 16} fill="#8a8a8a" fontSize="13" fontFamily="sans-serif" textAnchor="end">
        1.0
      </text>
    </svg>
  );
}

export default function ProcessSection() {
  const [pos, setPos] = useState(50);
  const box = useRef<HTMLDivElement>(null);

  const setFromX = useCallback((clientX: number) => {
    const r = box.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  }, []);

  return (
    <section className="mx-auto max-w-[1400px] px-5 py-20 sm:px-10 sm:py-24">
      <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:items-end">
        <div data-build>
          <p className="eyebrow text-red">A look under the model</p>
          <h2 className="mt-3 font-display text-5xl uppercase leading-[0.95] sm:text-6xl">
            From raw.
            <br />
            <span className="text-red">To calibrated.</span>
          </h2>
          <p className="mt-6 text-lg font-semibold text-bone">One detector. Two very different promises.</p>
          <p className="mt-3 max-w-sm text-sm leading-7 text-bone/65">
            A model can be accurate and still overconfident. Temperature scaling brought the AI image detector&apos;s
            expected calibration error to 0.0026, so a 90% score actually means 90%.
          </p>
          <p className="eyebrow mt-8 text-[10px] text-dim">
            AI image detection / 2026
            <br />
            <span className="text-bone/70">EfficientNet B3 · Temperature scaling · Grad CAM</span>
          </p>
        </div>

        <div data-build>
          <div
            ref={box}
            className="relative aspect-[16/9] cursor-ew-resize select-none overflow-hidden border border-line"
            onPointerDown={(e) => {
              (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
              setFromX(e.clientX);
            }}
            onPointerMove={(e) => {
              if (e.buttons) setFromX(e.clientX);
            }}
            role="slider"
            aria-label="Compare uncalibrated and calibrated model"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(pos)}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'ArrowLeft') setPos((p) => Math.max(0, p - 5));
              if (e.key === 'ArrowRight') setPos((p) => Math.min(100, p + 5));
            }}
          >
            <div className="absolute inset-0">
              <Reliability calibrated />
            </div>
            <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
              <Reliability calibrated={false} />
            </div>
            <span className="absolute left-3 top-3 bg-ink/80 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-dim">
              Uncalibrated
            </span>
            <span className="absolute right-3 top-3 bg-red px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
              Temperature scaled
            </span>
            <div className="absolute inset-y-0 w-px bg-white" style={{ left: `${pos}%` }}>
              <span className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-ink shadow-lg">
                <MoveHorizontal className="h-4 w-4" />
              </span>
            </div>
          </div>
          <div className="eyebrow mt-3 flex justify-between text-[10px] text-dim">
            <span>Drag to compare</span>
            <span>Illustrative reliability diagram</span>
          </div>
        </div>
      </div>
    </section>
  );
}
