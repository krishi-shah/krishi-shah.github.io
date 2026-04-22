'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { getSiteConfig } from '@/lib/content';

const siteConfig = getSiteConfig();

const careerGoals = [
  {
    title: 'Data Science Leadership',
    description: 'Lead cross-functional analytics teams to drive data-driven decision making in enterprise environments',
    gradient: 'from-emerald-500/20 to-cyan-500/20',
  },
  {
    title: 'Global Impact',
    description: 'Build scalable AI/ML solutions that address climate change, healthcare accessibility, and social equity',
    gradient: 'from-cyan-500/20 to-violet-500/20',
  },
  {
    title: 'Innovation & Entrepreneurship',
    description: 'Develop breakthrough technologies that merge sustainability with cutting-edge data science',
    gradient: 'from-violet-500/20 to-pink-500/20',
  },
];

const beyondCode = [
  'Renewable Energy',
  'Continuous Learning',
  'Sustainability',
  'Community Building',
  'Fitness & Wellness',
  'Travel & Cultures',
];

const skills = [
  { category: 'Data Analytics', items: ['Python', 'SQL', 'R', 'Excel', 'Statistical Analysis'] },
  { category: 'Machine Learning', items: ['scikit-learn', 'TensorFlow', 'PyTorch', 'NLP', 'Predictive Modeling'] },
  { category: 'Web Development', items: ['React', 'Next.js', 'Node.js', 'TypeScript', 'REST APIs'] },
  { category: 'Visualization', items: ['Tableau', 'Power BI', 'Matplotlib', 'Plotly', 'Seaborn'] },
  { category: 'Cloud & Big Data', items: ['AWS', 'Azure', 'Docker', 'Spark', 'Snowflake'] },
];

const additionalSkills = [
  'Data Mining', 'Data Cleaning', 'Data Integration', 'Feature Engineering',
  'Data Quality Governance', 'Code Review', 'Conduct Testing', 'Relational Databases',
  'Distributed Computing', 'Experimental Design', 'Problem-Solving', 'Leadership'
];

export default function AboutSection() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section id="about" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-transparent" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
      
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
            className="inline-block text-emerald-400 text-sm font-medium tracking-wider uppercase mb-4"
          >
            Background & Vision
          </motion.span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            About <span className="gradient-text">Me</span>
          </h2>
        </motion.div>

        {/* Vision & Mission Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="liquid-glass-card p-8 relative group"
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-4">
                <span className="gradient-text">Vision & Mission</span>
              </h3>
              <p className="text-white/60 leading-relaxed">
                {siteConfig.longBio}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="liquid-glass-card p-8 relative group"
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-4">
                <span className="gradient-text">What Drives Me</span>
              </h3>
              <p className="text-white/60 leading-relaxed">
                I'm passionate about leveraging technology to create meaningful impact. Whether it's optimizing healthcare operations through data analytics, predicting customer behavior with ML models, or building sustainable IoT solutions, I believe in using data and code to make informed decisions that improve lives.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Career Goals */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-20"
        >
          <h3 className="text-2xl sm:text-3xl font-bold mb-10 text-center">
            Career Goals
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {careerGoals.map((goal, index) => (
              <motion.div
                key={goal.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                whileHover={{ y: -5 }}
                className="liquid-glass-card p-6 text-center relative group overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${goal.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative z-10">
                  <h4 className="font-bold text-white text-lg mb-3">{goal.title}</h4>
                  <p className="text-white/50 text-sm">{goal.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Interests */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-20"
        >
          <h3 className="text-2xl sm:text-3xl font-bold mb-8 text-center">
            Beyond Code
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {beyondCode.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.7 + index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                className="px-5 py-2.5 rounded-full 
                         bg-white/5 border border-white/10 backdrop-blur-xl
                         hover:bg-emerald-500/10 hover:border-emerald-500/30 
                         transition-all duration-300 text-sm text-white/70"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mb-20"
        >
          <h3 className="text-2xl sm:text-3xl font-bold mb-8 text-center">Education</h3>
          <div className="max-w-2xl mx-auto">
            <motion.div 
              className="liquid-glass-card p-8 relative group"
              whileHover={{ y: -3 }}
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 flex items-start gap-5">
                <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 text-emerald-400 border border-emerald-500/20">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-white text-xl mb-1">Bachelor of Computer Science (Honors)</h4>
                  <p className="text-emerald-400 font-medium mb-3">York University, Toronto, ON</p>
                  <p className="text-white/50 text-sm leading-relaxed">
                    Data Structures, Algorithms, Database Systems, Statistical Modeling, Machine Learning, Data Visualization
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Technical Skills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h3 className="text-2xl sm:text-3xl font-bold mb-10 text-center">Technical Skills</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {skills.map((skillGroup, index) => (
              <motion.div
                key={skillGroup.category}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                whileHover={{ y: -3 }}
                className="liquid-glass-card p-6 group"
              >
                <h4 className="font-semibold mb-4 text-emerald-400 text-sm uppercase tracking-wider">{skillGroup.category}</h4>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 text-xs rounded-lg 
                               bg-white/5 border border-white/10 text-white/70 
                               hover:bg-emerald-500/10 hover:border-emerald-500/30 hover:text-emerald-400 
                               transition-all duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional Skills */}
          <motion.div 
            className="liquid-glass-card p-8"
            whileHover={{ y: -2 }}
          >
            <h4 className="font-semibold mb-6 text-center text-white/80">Additional Skills</h4>
            <div className="flex flex-wrap justify-center gap-2">
              {additionalSkills.map((skill, index) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: 1 + index * 0.02 }}
                  className="px-3 py-1.5 text-xs rounded-full 
                           bg-white/5 border border-white/10 text-white/60 
                           hover:bg-emerald-500/10 hover:border-emerald-500/30 hover:text-emerald-400 
                           transition-all duration-300"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
