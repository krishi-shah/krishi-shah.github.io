import { ArrowUpRight } from 'lucide-react';
import { getAllPosts, formatDateShort } from '@/lib/content';
import Lines from '@/components/Lines';
import SectionNumber from '@/components/SectionNumber';

const posts = getAllPosts();

export default function WritingSection() {
  return (
    <section id="writing" className="relative overflow-x-clip border-t border-line">
      <SectionNumber n="04" />
      <div className="relative mx-auto grid max-w-[1400px] gap-12 px-5 py-20 sm:px-10 sm:py-28 lg:grid-cols-[1fr_1.5fr]">
        <div>
          <div data-build>
            <p className="eyebrow text-red">04 / In writing</p>
            <h2 className="mt-3 font-display text-5xl uppercase leading-[0.95] sm:text-7xl">
              <Lines lines={['Words that', <span key="t" className="text-red">teach.</span>]} />
            </h2>
            <p className="mt-6 max-w-sm text-sm leading-7 text-bone/70">
              Sole author of The Awakening Code, and technical writing across eight publications including Level Up
              Coding and CodeX.
            </p>
          </div>

          <div data-build data-tilt="12" className="relative mt-10 max-w-[300px] overflow-hidden border border-line bg-panel p-6">
            <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-red/20 blur-2xl" aria-hidden="true" />
            <p className="eyebrow text-[10px] text-red">Book</p>
            <p className="mt-3 font-display text-4xl uppercase leading-none text-bone">
              The
              <br />
              Awakening
              <br />
              Code
            </p>
            <p className="mt-4 text-[12px] text-dim">by Krishi Shah</p>
          </div>
        </div>

        <div className="border-t border-line">
          {posts.map((p, i) => (
            <a
              data-build
              key={p.slug}
              href={p.link || 'https://medium.com/@krishishah2021'}
              target="_blank"
              rel="noreferrer"
              className="group flex items-start gap-5 border-b border-line py-7"
            >
              <span className="font-display text-4xl leading-none text-red">{String(i + 1).padStart(2, '0')}</span>
              <div className="flex-1">
                <p className="text-[11px] uppercase tracking-wider text-dim">
                  {formatDateShort(p.date)} · {p.readTime}
                </p>
                <h3 className="mt-2 text-xl font-bold leading-snug text-bone transition-colors group-hover:text-red sm:text-2xl">
                  {p.title}
                </h3>
                <p className="mt-2 text-[14px] leading-6 text-bone/60">{p.excerpt}</p>
              </div>
              <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-dim transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-red" />
            </a>
          ))}
          <a
            data-build
            href="https://medium.com/@krishishah2021"
            target="_blank"
            rel="noreferrer"
            data-magnetic
            className="eyebrow mt-8 inline-flex items-center gap-3 text-bone hover:text-red"
          >
            All articles on Medium <ArrowUpRight className="h-4 w-4 text-red" />
          </a>
        </div>
      </div>
    </section>
  );
}
