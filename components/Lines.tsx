import type { CSSProperties, ReactNode } from 'react';

/* Each line slides up from behind a mask once its block has been built. */
export default function Lines({ lines }: { lines: ReactNode[] }) {
  return (
    <>
      {lines.map((line, i) => (
        <span key={i} className="line-mask">
          <span className="line-inner" style={{ '--i': i } as CSSProperties}>
            {line}
          </span>
        </span>
      ))}
    </>
  );
}
