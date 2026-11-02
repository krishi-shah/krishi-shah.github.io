import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { getAllProjects, getProjectBySlug, getProjectSlugs, getSiteConfig } from '@/lib/content';
import ProjectArt from '@/components/ProjectArt';

const siteConfig = getSiteConfig();

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: 'Project not found' };
  return {
    title: project.title,
    description: project.shortDescription,
    openGraph: {
      title: `${project.title} | ${siteConfig.name}`,
      description: project.shortDescription,
      images: ['/og-image.png'],
    },
  };
}

const STEPS = [
  { key: 'challenge', label: 'The challenge' },
  { key: 'solution', label: 'What I built' },
  { key: 'outcome', label: 'What it showed' },
] as const;

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const all = getAllProjects();
  const index = all.findIndex((p) => p.slug === slug);
  const next = all[(index + 1) % all.length];

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-ink/95">
        <div className="mx-auto flex h-[66px] max-w-[1400px] items-center justify-between px-5 sm:px-10">
          <a href="/" className="font-display text-[26px] leading-none tracking-tight text-bone">
            KRISHI<sup className="ml-0.5 align-super text-[11px] text-red">®</sup>
          </a>
          <a href="/#work" className="eyebrow flex items-center gap-2 text-bone/70 transition-colors hover:text-red">
            <ArrowLeft className="h-4 w-4" /> All work
          </a>
        </div>
      </header>

      <main className="pt-[66px]">
        <section className="mx-auto max-w-[1400px] px-5 pt-12 sm:px-10 sm:pt-16">
          <p className="label">
            Case study {String(index + 1).padStart(2, '0')} / {String(all.length).padStart(2, '0')}
          </p>
          <h1 className="mt-5 font-display text-[clamp(3rem,9vw,8rem)] uppercase leading-[0.9] text-bone">
            {project.title}
            <span className="text-red">.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-bone/75">{project.longDescription || project.shortDescription}</p>

          <dl className="mt-10 grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-4">
            {[
              ['Role', project.role],
              ['Year', project.timeline || 'Ongoing'],
              ['Area', project.tags[0] ?? 'Tools'],
              ['Stack', project.tech.slice(0, 3).join(', ')],
            ].map(([k, v]) => (
              <div key={k} className="bg-ink p-5">
                <dt className="eyebrow text-bone/55">{k}</dt>
                <dd className="mt-2 text-[15px] font-semibold text-bone">{v}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mx-auto mt-10 max-w-[1400px] px-5 sm:px-10">
          <ProjectArt slug={project.slug} index={index} className="aspect-[16/9] w-full" />
        </section>

        {project.metrics.length > 0 && (
          <section className="mx-auto mt-10 max-w-[1400px] px-5 sm:px-10">
            <div className="flex flex-col gap-px border border-line bg-line sm:flex-row">
              {project.metrics.map((m) => (
                <div key={m.label} className="flex-1 bg-ink p-6 sm:p-8">
                  <p className="num text-5xl font-semibold leading-none text-red sm:text-6xl">{m.value}</p>
                  <p className="mt-4 text-[15px] font-semibold text-bone/85">{m.label}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="mx-auto mt-16 max-w-[1400px] px-5 sm:px-10">
          {STEPS.filter((s) => project[s.key]).map((s, i) => (
            <div key={s.key} className="grid gap-4 border-t border-line py-10 md:grid-cols-[280px_1fr] md:gap-10">
              <div>
                <p className="num text-sm text-bone/55">{String(i + 1).padStart(2, '0')}</p>
                <h2 className="mt-2 font-display text-3xl uppercase text-bone">{s.label}</h2>
              </div>
              <p className="max-w-3xl text-[17px] leading-8 text-bone/75">{project[s.key]}</p>
            </div>
          ))}
        </section>

        <section className="mx-auto max-w-[1400px] px-5 sm:px-10">
          <div className="border-t border-line py-10">
            <p className="eyebrow text-bone/55">Built with</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span key={t} className="eyebrow border border-line px-3 py-2 text-bone/80">
                  {t}
                </span>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap gap-4">
              {project.repo && (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-5 bg-red px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-red-bright"
                >
                  View the code <ArrowUpRight className="h-4 w-4" />
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-5 border border-line px-5 py-3.5 text-sm font-semibold text-bone transition-colors hover:border-red hover:text-red"
                >
                  Live demo <ArrowUpRight className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        </section>

        <a href={`/projects/${next.slug}/`} className="group block border-t border-line">
          <div className="mx-auto flex max-w-[1400px] items-end justify-between gap-6 px-5 py-14 sm:px-10 sm:py-20">
            <div>
              <p className="eyebrow text-bone/55">Next case study</p>
              <p className="mt-3 font-display text-[clamp(2.4rem,6vw,5.5rem)] uppercase leading-[0.9] text-bone transition-colors group-hover:text-red">
                {next.title}
              </p>
            </div>
            <ArrowRight className="mb-3 h-8 w-8 shrink-0 text-bone/50 transition-transform duration-500 ease-out-expo group-hover:translate-x-2 group-hover:text-red" />
          </div>
        </a>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-6 sm:px-10">
          <span className="eyebrow text-bone/55">© {new Date().getFullYear()} Krishi Shah</span>
          <a href="/#contact" className="eyebrow text-bone/60 transition-colors hover:text-red">
            Get in touch
          </a>
        </div>
      </footer>
    </>
  );
}
