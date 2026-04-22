'use client';

import { motion } from 'framer-motion';

const skills = [
  'Python', 'SQL', 'R', 'Tableau', 'Power BI', 'Machine Learning',
  'NLP', 'scikit-learn', 'TensorFlow', 'Pandas', 'React', 'Next.js',
  'Node.js', 'TypeScript', 'AWS', 'Azure', 'Docker', 'Git', 'Excel', 'Data Mining',
];

export default function SkillsMarquee() {
  return (
    <section className="relative py-10 sm:py-14 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-transparent" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
      
      <div className="relative z-10">
        {/* First row - moving left */}
        <div className="flex gap-5 sm:gap-8 mb-5 overflow-hidden">
          <motion.div
            className="flex gap-5 sm:gap-8 shrink-0"
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              duration: 35,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {[...skills, ...skills].map((skill, index) => (
              <motion.div
                key={`${skill}-${index}`}
                className="px-5 sm:px-6 py-2.5 rounded-full 
                         bg-white/5 border border-white/10 backdrop-blur-xl
                         hover:bg-emerald-500/10 hover:border-emerald-500/30 
                         transition-all duration-300 whitespace-nowrap"
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-sm font-medium text-white/70">{skill}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Second row - moving right */}
        <div className="flex gap-5 sm:gap-8 overflow-hidden">
          <motion.div
            className="flex gap-5 sm:gap-8 shrink-0"
            animate={{ x: ['-50%', '0%'] }}
            transition={{
              duration: 40,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {[...skills.slice().reverse(), ...skills.slice().reverse()].map((skill, index) => (
              <motion.div
                key={`${skill}-reverse-${index}`}
                className="px-5 sm:px-6 py-2.5 rounded-full 
                         bg-white/5 border border-white/10 backdrop-blur-xl
                         hover:bg-cyan-500/10 hover:border-cyan-500/30 
                         transition-all duration-300 whitespace-nowrap"
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-sm font-medium text-white/70">{skill}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Gradient overlays */}
        <div className="absolute inset-y-0 left-0 w-24 sm:w-40 bg-gradient-to-r from-black to-transparent pointer-events-none z-20" />
        <div className="absolute inset-y-0 right-0 w-24 sm:w-40 bg-gradient-to-l from-black to-transparent pointer-events-none z-20" />
      </div>
    </section>
  );
}
