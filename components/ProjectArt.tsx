/*
  Generated artwork for each project. A heatmap made of layered radial
  gradients (cheap to draw, no filters) with a fine cell grid on top, plus a
  small SVG motif that is different for every project. Everything is
  deterministic per project so the art never changes between visits.
*/

function rng(seed: number) {
  let t = seed >>> 0;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

const HEAT = (x: number, y: number, s: number) =>
  `radial-gradient(circle at ${x}% ${y}%, rgba(255,214,110,${0.75 * s}) 0%, rgba(255,128,48,${0.65 * s}) ${7 * s}%, rgba(227,38,59,${0.5 * s}) ${17 * s}%, rgba(110,8,22,${0.35 * s}) ${30 * s}%, transparent ${46 * s}%)`;

const BLOBS: Record<string, [number, number, number][]> = {
  'ai-image-detection': [[50, 38, 1], [30, 70, 0.6], [74, 64, 0.5]],
  'finrag-ai': [[28, 40, 0.8], [66, 30, 0.7], [56, 72, 0.6]],
  'medrisk-ml': [[78, 30, 1], [40, 66, 0.55]],
  'ml-engineer-skills': [[24, 30, 0.7], [70, 76, 0.6]],
  'permit-wait': [[46, 46, 0.9], [62, 56, 0.6], [34, 62, 0.5]],
  'toronto-ai-ml-internship-radar': [[50, 50, 0.9], [72, 34, 0.45]],
  'realtime-face-recognition': [[50, 44, 0.95], [30, 74, 0.4]],
};

function Motif({ slug, seed }: { slug: string; seed: number }) {
  const r = rng(seed);
  const stroke = 'rgba(255,255,255,0.85)';
  switch (slug) {
    case 'ai-image-detection':
      return (
        <g>
          <rect x="300" y="110" width="200" height="230" fill="none" stroke="rgba(227,38,59,0.8)" strokeWidth="1.5" />
          {[
            [300, 110, 1, 1],
            [500, 110, -1, 1],
            [300, 340, 1, -1],
            [500, 340, -1, -1],
          ].map(([x, y, dx, dy], i) => (
            <path key={i} d={`M${x} ${y + 22 * dy} V${y} H${x + 22 * dx}`} fill="none" stroke="#fff" strokeWidth="3" />
          ))}
          <rect x="300" y="84" width="170" height="22" fill="#e3263b" />
          <text x="308" y="99" fill="#fff" fontSize="12" fontFamily="var(--font-mono)" fontWeight="600" letterSpacing="1">
            SYNTHETIC · 0.97
          </text>
        </g>
      );
    case 'finrag-ai': {
      const nodes = Array.from({ length: 11 }, () => [120 + r() * 560, 70 + r() * 320]);
      const edges: [number, number][] = [];
      nodes.forEach((_, i) => {
        const j = (i + 1 + Math.floor(r() * 3)) % nodes.length;
        edges.push([i, j]);
      });
      const path = [0, 3, 6, 9];
      return (
        <g>
          {edges.map(([a, b], i) => (
            <line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} stroke="rgba(255,255,255,0.22)" />
          ))}
          <polyline
            points={path.map((i) => nodes[i].join(',')).join(' ')}
            fill="none"
            stroke="#e3263b"
            strokeWidth="2.5"
          />
          {nodes.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={path.includes(i) ? 7 : 4} fill={path.includes(i) ? '#fff' : 'rgba(255,255,255,0.6)'} />
          ))}
        </g>
      );
    }
    case 'medrisk-ml': {
      const pts = Array.from({ length: 14 }, (_, i) => {
        const x = 80 + i * 49;
        const y = 380 - Math.pow(i / 13, 1.8) * 270 - r() * 26;
        return [x, y];
      });
      return (
        <g>
          <line x1="60" y1="190" x2="760" y2="190" stroke="rgba(255,255,255,0.4)" strokeDasharray="6 8" />
          <text x="64" y="180" fill="rgba(255,255,255,0.6)" fontSize="11" fontFamily="var(--font-mono)">
            RISK THRESHOLD
          </text>
          <polyline points={pts.map((p) => p.join(',')).join(' ')} fill="none" stroke="#fff" strokeWidth="2.5" />
          {pts.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="4" fill={y < 190 ? '#e3263b' : '#fff'} />
          ))}
        </g>
      );
    }
    case 'ml-engineer-skills':
      return (
        <g fontFamily="var(--font-mono)" fontSize="15">
          <rect x="90" y="90" width="620" height="270" fill="rgba(9,9,9,0.82)" stroke="rgba(255,255,255,0.15)" />
          <circle cx="112" cy="110" r="5" fill="#e3263b" />
          <circle cx="130" cy="110" r="5" fill="rgba(255,255,255,0.3)" />
          <circle cx="148" cy="110" r="5" fill="rgba(255,255,255,0.3)" />
          <text x="112" y="160" fill="rgba(255,255,255,0.9)">$ mlcheck run ./project</text>
          <text x="112" y="196" fill="rgba(255,255,255,0.65)">  ok    train and test splits</text>
          <text x="112" y="226" fill="#ff5a6b">  fail  target leaks into features</text>
          <text x="112" y="256" fill="rgba(255,255,255,0.65)">  ok    baseline beaten by 11.4%</text>
          <text x="112" y="286" fill="#ff5a6b">  warn  accuracy on imbalanced data</text>
          <rect className="caret" x="112" y="306" width="10" height="18" fill="#fff" />
        </g>
      );
    case 'permit-wait': {
      const dots = Array.from({ length: 70 }, () => {
        const a = r() * Math.PI * 2;
        const d = Math.pow(r(), 0.7) * 170;
        return [400 + Math.cos(a) * d * 1.5, 220 + Math.sin(a) * d * 0.75];
      });
      return (
        <g>
          <path d="M40 380 C 220 340, 380 400, 560 360 S 760 350, 780 360" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
          <text x="560" y="404" fill="rgba(255,255,255,0.55)" fontSize="11" fontFamily="var(--font-mono)">
            LAKE ONTARIO
          </text>
          {dots.map(([x, y], i) => (
            <circle key={i} cx={x} cy={Math.min(y, 340)} r={i % 9 === 0 ? 5 : 2.5} fill={i % 9 === 0 ? '#fff' : 'rgba(255,255,255,0.55)'} />
          ))}
        </g>
      );
    }
    case 'toronto-ai-ml-internship-radar':
      return (
        <g>
          {[60, 110, 160, 210].map((rad) => (
            <circle key={rad} cx="400" cy="225" r={rad} fill="none" stroke="rgba(255,255,255,0.2)" />
          ))}
          <line x1="190" y1="225" x2="610" y2="225" stroke="rgba(255,255,255,0.12)" />
          <line x1="400" y1="15" x2="400" y2="435" stroke="rgba(255,255,255,0.12)" />
          {[
            [470, 140],
            [330, 300],
            [520, 270],
            [300, 160],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="6" fill="#fff" />
          ))}
        </g>
      );
    case 'realtime-face-recognition': {
      const pts: [number, number][] = [];
      for (let i = 0; i < 26; i++) {
        const a = (i / 26) * Math.PI * 2;
        pts.push([400 + Math.cos(a) * 110, 220 + Math.sin(a) * 145]);
      }
      const inner: [number, number][] = [
        [360, 190], [440, 190], [345, 192], [375, 188], [425, 188], [455, 192],
        [400, 230], [392, 255], [408, 255], [370, 290], [400, 296], [430, 290],
      ];
      return (
        <g>
          {pts.concat(inner).map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="3.2" fill="rgba(255,255,255,0.85)" />
          ))}
          <rect x="270" y="60" width="260" height="320" fill="none" stroke="#e3263b" strokeWidth="1.5" />
          <rect x="270" y="36" width="138" height="22" fill="#e3263b" />
          <text x="278" y="51" fill="#fff" fontSize="12" fontFamily="var(--font-mono)" fontWeight="600" letterSpacing="1">
            MATCH · 0.94
          </text>
        </g>
      );
    }
    default:
      return <g stroke={stroke} />;
  }
}

export default function ProjectArt({ slug, index, className = '' }: { slug: string; index: number; className?: string }) {
  const blobs = BLOBS[slug] ?? [[50, 50, 0.8]];
  return (
    <div className={`relative overflow-hidden bg-[#0b0b0b] ${className}`}>
      <div className="absolute inset-0" style={{ background: blobs.map(([x, y, s]) => HEAT(x, y, s)).join(',') }} />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'linear-gradient(rgba(9,9,9,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(9,9,9,0.9) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
        }}
      />
      {slug === 'toronto-ai-ml-internship-radar' && (
        <div className="radar-wrap absolute inset-0" aria-hidden="true">
          <div className="radar-sweep-html">
            <div />
          </div>
        </div>
      )}
      <svg viewBox="0 0 800 450" preserveAspectRatio="xMidYMid meet" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <Motif slug={slug} seed={index * 977 + 13} />
      </svg>
      <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
    </div>
  );
}
