import type { Metadata } from 'next';
import { ArrowLeft } from 'lucide-react';
import { getFeaturedProjects, getSiteConfig } from '@/lib/content';
import { EDUCATION, PIPELINE, RECOGNITION, experiences, volunteerExperience, type Role } from '@/lib/resume';
import PrintButton from '@/components/PrintButton';

const site = getSiteConfig();

export const metadata: Metadata = {
  title: 'Resume',
  description: `Resume of ${site.name}. ${site.shortBio}`,
  openGraph: { title: `Resume | ${site.name}`, description: site.shortBio, images: ['/og-image.png'] },
};

const PROJECTS = getFeaturedProjects().slice(0, 4);

function Heading({ children }: { children: React.ReactNode }) {
  return <h2 className="cv-h2 eyebrow mt-10 border-b border-line pb-2 text-red">{children}</h2>;
}

function RoleBlock({ r }: { r: Role }) {
  return (
    <article className="cv-block mt-5">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4">
        <h3 className="text-[16px] font-bold text-bone">{r.company}</h3>
        <span className="num text-[13px] text-bone/60">{r.period}</span>
      </div>
      <div className="flex flex-wrap items-baseline justify-between gap-x-4">
        <p className="text-[14px] font-semibold text-bone/80">{r.title}</p>
        <span className="text-[13px] text-bone/55">{r.location}</span>
      </div>
      <ul className="mt-2 space-y-1">
        {r.description.map((d) => (
          <li key={d} className="cv-li flex gap-3 text-[14px] leading-6 text-bone/75">
            <span className="mt-[11px] h-px w-2.5 shrink-0 bg-bone/40" aria-hidden="true" />
            {d}
          </li>
        ))}
      </ul>
    </article>
  );
}

export default function ResumePage() {
  return (
    <div className="cv-page min-h-screen">
      <header className="cv-noprint fixed inset-x-0 top-0 z-50 border-b border-line bg-ink/95">
        <div className="mx-auto flex h-[66px] max-w-[900px] items-center justify-between px-5 sm:px-8">
          <a href="/" className="eyebrow flex items-center gap-2 text-bone/70 transition-colors hover:text-red">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to site
          </a>
          <PrintButton />
        </div>
      </header>

      <main id="main" className="mx-auto max-w-[900px] px-5 pb-24 pt-[110px] sm:px-8">
        <h1 className="font-display text-[clamp(2.8rem,8vw,5rem)] uppercase leading-[0.9] text-bone">
          {site.name}
          <span className="text-red">.</span>
        </h1>
        <p className="mt-3 text-[15px] font-semibold text-bone/80">{site.title} · {site.location}</p>
        <p className="cv-contact mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[13px] text-bone/65">
          <a href={`mailto:${site.email}`} className="hover:text-red">{site.email}</a>
          {site.phone && <span>{site.phone}</span>}
          <a href={site.social.linkedin} className="hover:text-red">linkedin.com/in/krishi-shah3</a>
          <a href={site.social.github} className="hover:text-red">github.com/krishi-shah</a>
          <a href="https://krishi-shah.github.io" className="hover:text-red">krishi-shah.github.io</a>
        </p>
        <p className="mt-5 max-w-[70ch] text-[14px] leading-7 text-bone/75">{site.shortBio}</p>

        <Heading>Education</Heading>
        {EDUCATION.map((e) => (
          <article key={e.school} className="cv-block mt-5">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <h3 className="text-[16px] font-bold text-bone">{e.school}</h3>
              <span className="num text-[13px] text-bone/60">{e.detail}</span>
            </div>
            <p className="text-[14px] font-semibold text-bone/80">{e.credential}</p>
            <p className="mt-1 text-[14px] leading-6 text-bone/65">{e.notes}</p>
          </article>
        ))}

        <Heading>Experience</Heading>
        {experiences.map((r) => (
          <RoleBlock key={r.company + r.period} r={r} />
        ))}

        <Heading>Selected projects</Heading>
        {PROJECTS.map((p) => (
          <article key={p.slug} className="cv-block mt-5">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <h3 className="text-[16px] font-bold text-bone">
                <a href={`/projects/${p.slug}/`} className="hover:text-red">{p.title}</a>
              </h3>
              <span className="num text-[13px] text-bone/60">{p.timeline}</span>
            </div>
            <p className="text-[13px] text-bone/55">{p.tech.join(', ')}</p>
            <p className="mt-1 text-[14px] leading-6 text-bone/75">
              {p.shortDescription} {p.outcome}
            </p>
          </article>
        ))}

        <Heading>Skills</Heading>
        <dl className="mt-4 grid gap-y-2 text-[14px] leading-6">
          {PIPELINE.map((s) => (
            <div key={s.stage} className="grid grid-cols-[110px_1fr] gap-4">
              <dt className="font-bold text-bone">{s.stage}</dt>
              <dd className="text-bone/75">{s.items.join(', ')}</dd>
            </div>
          ))}
          <div className="grid grid-cols-[110px_1fr] gap-4">
            <dt className="font-bold text-bone">Also</dt>
            <dd className="text-bone/75">Java, C++</dd>
          </div>
        </dl>

        <Heading>Leadership</Heading>
        {volunteerExperience.map((r) => (
          <RoleBlock key={r.company} r={r} />
        ))}

        <Heading>Recognition</Heading>
        <ul className="mt-4 grid gap-x-8 gap-y-1 text-[14px] leading-6 sm:grid-cols-2">
          {RECOGNITION.map((it) => (
            <li key={it.title} className="text-bone/75">
              <span className="font-semibold text-bone">{it.title}</span>, {it.org}
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
