/* Huge outlined section number that drifts behind the heading. */
export default function SectionNumber({ n }: { n: string }) {
  return (
    <div
      aria-hidden="true"
      data-parallax="0.12"
      className="outline-num pointer-events-none absolute -right-[2vw] top-8 select-none font-display text-[42vw] leading-[0.8] sm:top-4 sm:text-[22rem]"
    >
      {n}
    </div>
  );
}
