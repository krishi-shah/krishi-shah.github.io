export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-4 px-5 py-8 sm:flex-row sm:items-center sm:px-10">
        <span className="font-display text-2xl text-bone">
          KRISHI<sup className="ml-0.5 text-[10px] text-red">®</sup>
        </span>
        <span className="text-[11px] font-semibold uppercase tracking-wider text-dim">
          © {new Date().getFullYear()} Krishi Shah. Every claim has a test.
        </span>
      </div>
    </footer>
  );
}
