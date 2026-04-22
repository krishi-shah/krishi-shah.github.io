'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { getAllPosts, formatDate, type Post } from '@/lib/content';

const posts = getAllPosts();

interface PostCardProps {
  post: Post;
  index: number;
}

function PostCard({ post, index }: PostCardProps) {
  const categoryColors: { [key: string]: string } = {
    'Data Science': 'from-emerald-500 to-cyan-500',
    'Artificial Intelligence': 'from-violet-500 to-purple-500',
    'Programming': 'from-orange-500 to-red-500',
    'Blockchain & Web3': 'from-blue-500 to-indigo-500',
    'Programming Languages': 'from-yellow-500 to-orange-500',
    'Web Development': 'from-pink-500 to-rose-500',
  };

  const category = post.tags[0] || 'Technology';
  const gradientColor = categoryColors[category] || 'from-emerald-500 to-cyan-500';

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
    >
      <a
        href={`https://medium.com/@krishishah2021`}
        target="_blank"
        rel="noopener noreferrer"
        className="block p-5 sm:p-6 transition-all duration-300 hover:-translate-y-2 liquid-glass-card h-full"
      >
        {/* Category Badge */}
        <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mb-3 bg-gradient-to-r ${gradientColor} bg-opacity-20`}>
          <span className="text-white/90">{category}</span>
        </div>

        {/* Date and Read Time */}
        <div className="flex items-center gap-3 text-xs text-white/40 mb-3">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span className="w-1 h-1 rounded-full bg-white/30" />
          <span>{post.readTime}</span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold mb-2 text-white group-hover:text-emerald-400 transition-colors line-clamp-2">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-white/50 text-sm line-clamp-3 mb-4">
          {post.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {post.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="px-2 py-0.5 rounded text-xs bg-white/5 text-white/50 border border-white/10">
              {tag}
            </span>
          ))}
        </div>

        {/* Read More */}
        <div className="flex items-center gap-2 text-sm font-medium text-emerald-400">
          <span>Read Article</span>
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </a>
    </motion.article>
  );
}

export default function WritingSection() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section id="writing" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-transparent" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.span 
            className="inline-block text-violet-400 text-sm font-medium tracking-wider uppercase mb-4"
          >
            Insights & Learning
          </motion.span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">
            Technical <span className="gradient-text">Writing</span>
          </h2>
          <p className="text-white/50 text-base sm:text-lg max-w-2xl mx-auto">
            Sharing knowledge from real projects and technical challenges
          </p>
        </motion.div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {posts.slice(0, 6).map((post, index) => (
            <PostCard key={post.slug} post={post} index={index} />
          ))}
        </div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <a
              href="https://medium.com/@krishishah2021"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              View All on Medium
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            <a
              href="https://medium.com/@krishishah2021"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              Follow on Medium
            </a>
          </div>
          <p className="text-sm text-white/40">
            113 followers · Published in Level Up Coding, CodeX
          </p>
        </motion.div>
      </div>
    </section>
  );
}
