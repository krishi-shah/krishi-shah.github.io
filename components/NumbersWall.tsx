import Lines from '@/components/Lines';
import SectionNumber from '@/components/SectionNumber';

const FIGURES = [
  { value: '120000', display: '120,000', unit: '', caption: 'Images fine tuned on', source: 'AI image detection research, York University' },
  { value: '0.9971', display: '0.9971', unit: '', caption: 'AUC ROC on held out test set', source: 'EfficientNet B3 detector, 2026' },
  { value: '0.0026', display: '0.0026', unit: '', caption: 'Expected calibration error', source: 'After temperature scaling' },
  { value: '30', display: '30', unit: '%', caption: 'Fewer reported data errors', source: 'Validation rewrite, Ontario Government' },
  { value: '40', display: '40', unit: '%', caption: 'Faster deployments', source: 'Release automation, Ontario Government' },
  { value: '25', display: '25', unit: '%', caption: 'Faster queries', source: 'Schema and index work, Ontario Government' },
  { value: '50', display: '50', unit: '%', caption: 'Less manual reporting', source: 'Power BI dashboards, Suven Consultants' },
  { value: '8', display: '8', unit: '', caption: 'Technical articles published', source: 'Level Up Coding and CodeX' },
];

export default function NumbersWall() {
  return (
    <section id="results" className="relative overflow-clip border-t border-line">
      <SectionNumber n="02" />
      <div className="relative mx-auto max-w-[1400px] px-5 py-20 sm:px-10 sm:py-28">
        <div data-build className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="label">02 / Results</p>
            <h2 className="mt-4 font-display text-5xl uppercase leading-[0.95] sm:text-7xl">
              <Lines
                lines={[
                  <>
                    Results, measured<span className="text-red">.</span>
                  </>,
                ]}
              />
            </h2>
          </div>
          <p className="max-w-sm text-[15px] leading-7 text-bone/60">
            Every figure below comes from a test set, a dashboard or a production system.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-px border border-line bg-line lg:grid-cols-4">
          {FIGURES.map((f) => (
            <div data-build key={f.caption} className="figure group relative flex flex-col justify-between bg-ink p-5 sm:p-7">
              <div className="num text-[clamp(2.1rem,5.2vw,4.4rem)] font-semibold leading-none text-bone">
                <span data-count={f.value} data-sep={f.value.length > 4 && !f.value.includes('.') ? '' : undefined}>
                  {f.display}
                </span>
                {f.unit && <span className="text-red">{f.unit}</span>}
              </div>
              <div className="mt-8 sm:mt-12">
                <p className="text-[14px] font-semibold leading-snug text-bone/90">{f.caption}</p>
                <p className="figure-source eyebrow mt-2 leading-[1.5] text-bone/55">{f.source}</p>
              </div>
              <span className="figure-bar absolute bottom-0 left-0 h-[2px] w-full origin-left bg-red" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
