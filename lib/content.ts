import siteData from '@/data/site.json';
import projectsData from '@/data/projects.json';
import postsData from '@/data/posts.json';

// Types
export interface SiteConfig {
  name: string;
  title: string;
  shortBio: string;
  longBio: string;
  location: string;
  email: string;
  phone?: string;
  timezone: string;
  heroTaglines: string[];
  badges: string[];
  social: {
    github: string;
    linkedin: string;
    twitter: string;
    medium: string;
  };
  theme: {
    primaryColor: string;
    accentColor: string;
  };
  stats: Array<{
    value: string;
    label: string;
  }>;
}

export interface Project {
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  challenge: string;
  solution: string;
  outcome: string;
  coverImage: string;
  images: string[];
  tags: string[];
  tech: string[];
  role: string;
  timeline: string;
  metrics: Array<{
    value: string;
    label: string;
  }>;
  repo: string;
  demo: string;
  featured: boolean;
}

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  date: string;
  readTime: string;
  tags: string[];
  featured: boolean;
  link?: string;
}

// Content getters
export function getSiteConfig(): SiteConfig {
  return siteData as SiteConfig;
}

export function getAllProjects(): Project[] {
  return projectsData as Project[];
}

export function getFeaturedProjects(): Project[] {
  return (projectsData as Project[]).filter((project) => project.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return (projectsData as Project[]).find((project) => project.slug === slug);
}

export function getProjectSlugs(): string[] {
  return (projectsData as Project[]).map((project) => project.slug);
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  (projectsData as Project[]).forEach((project) => {
    project.tags.forEach((tag) => tags.add(tag));
  });
  return Array.from(tags).sort();
}

export function getAllPosts(): Post[] {
  return (postsData as Post[]).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getFeaturedPosts(): Post[] {
  return (postsData as Post[]).filter((post) => post.featured);
}

export function getPostBySlug(slug: string): Post | undefined {
  return (postsData as Post[]).find((post) => post.slug === slug);
}

export function getPostSlugs(): string[] {
  return (postsData as Post[]).map((post) => post.slug);
}

// Utility functions
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatDateShort(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
  });
}

