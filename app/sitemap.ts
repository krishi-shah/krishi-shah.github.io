import { MetadataRoute } from 'next';
import { getProjectSlugs } from '@/lib/content';

export const dynamic = 'force-static';

const BASE = 'https://krishi-shah.github.io';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${BASE}/`, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: `${BASE}/resume/`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    ...getProjectSlugs().map((slug) => ({
      url: `${BASE}/projects/${slug}/`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}
