const WORDS = ['Calibrated', 'Explainable', 'Deployed', 'Measured', 'Reproducible', 'Tested'];

function Band({ reverse, tone }: { reverse?: boolean; tone: 'red' | 'dark' }) {
  const items = [...WORDS, ...WORDS, ...WORDS];
  return (
    <div
      className={`absolute left-[-10%] w-[120%] py-4 ${
        tone === 'red' ? 'bg-red text-ink' : 'border-y border-line bg-ink text-bone'
      }`}
      style={{ transform: `rotate(${reverse ? 2.2 : -2.2}deg)`, top: reverse ? '52%' : '18%' }}
    >
      <div
        className="marquee-track flex w-max items-center gap-8 whitespace-nowrap"
        style={{ animationDuration: '38s', animationDirection: reverse ? 'reverse' : 'normal' }}
      >
        {[0, 1].map((half) => (
          <div key={half} className="flex items-center gap-8" aria-hidden={half === 1}>
            {items.map((w, i) => (
              <span key={i} className="flex items-center gap-8 font-display text-3xl uppercase sm:text-5xl">
                {w}
                <span className={tone === 'red' ? 'text-ink/50' : 'text-red'}>✳</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* Two bands crossing at slight angles, scrolling in opposite directions. */
export default function Ribbons() {
  return (
    <div data-anim className="relative h-[170px] overflow-hidden sm:h-[230px]" aria-hidden="true">
      <Band tone="dark" reverse />
      <Band tone="red" />
    </div>
  );
}
