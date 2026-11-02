import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5 text-center">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      <div className="relative">
        <div className="scan-box-static relative mx-auto inline-block px-10 py-6">
          <span className="c tl" />
          <span className="c tr" />
          <span className="c bl" />
          <span className="c br" />
          <span className="scan-tag">No match found · 0.000</span>
          <p className="font-display text-[clamp(6rem,24vw,16rem)] leading-[0.85] text-bone">404</p>
        </div>
        <p className="mt-10 font-display text-3xl uppercase text-bone sm:text-4xl">
          This page isn&apos;t in the training set<span className="text-red">.</span>
        </p>
        <p className="mx-auto mt-4 max-w-md text-[15px] leading-7 text-bone/60">
          The link may be old or mistyped. Everything that exists is one click away.
        </p>
        <a
          href="/"
          className="mt-9 inline-flex items-center gap-4 bg-red px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-red-bright"
        >
          <ArrowLeft className="h-4 w-4" /> Back to the portfolio
        </a>
      </div>
    </main>
  );
}
