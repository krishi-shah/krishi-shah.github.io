'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { getSiteConfig } from '@/lib/content';

const siteConfig = getSiteConfig();

const education = [
  {
    school: 'York University, Lassonde School of Engineering',
    credential: 'Bachelor of Science, Computer Science (Honours)',
    detail: 'Expected Aug 2027 · Toronto, ON',
    notes: 'Applied Machine Learning, Statistics for Data Science, Data Mining, Big Data Analytics, Database Systems, Information Networks. Research project EECS 4080, supervised by Prof. Mona Nasery.',
  },
  {
    school: 'Parul University',
    credential: 'Diploma in Computer Engineering, GPA 3.9/4.0',
    detail: '2020 – 2023 · Gujarat, India',
    notes: '5x University Gold Medalist for highest GPA overall. Dean’s List.',
  },
];

const skills = [
  { category: 'Languages', items: ['Python', 'SQL', 'R', 'Java', 'C++', 'Bash'] },
  { category: 'Machine Learning', items: ['PyTorch', 'TensorFlow', 'scikit-learn', 'XGBoost', 'LightGBM', 'CNNs'] },
  { category: 'LLMs and RAG', items: ['LangChain', 'FAISS', 'BM25', 'Hugging Face', 'FinBERT', 'GPT'] },
  { category: 'Evaluation', items: ['ROC-AUC', 'Calibration', 'SHAP', 'Grad-CAM', 'Fairlearn'] },
  { category: 'ML Systems', items: ['MLflow', 'FastAPI', 'Docker', 'GitHub Actions', 'PostgreSQL', 'pandas'] },
  { category: 'Analysis', items: ['Feature engineering', 'Cross-validation', 'Tableau', 'Power BI', 'pytest', 'Azure'] },
];

const additionalSkills = [
  'Temperature scaling', 'Expected calibration error', 'Threshold sweeps',
  'Data validation', 'Query optimization', 'Reproducible seeding',
  'Technical writing', 'Code review'
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
                I check whether a result is actually usable: calibration, the precision-recall tradeoff, and whether it survives a control. The same standard applies to production data, where unvalidated inputs are what make the downstream numbers wrong.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-20"
        >
          <h3 className="text-2xl sm:text-3xl font-bold mb-8 text-center">Education</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {education.map((item) => (
              <motion.div
                key={item.school}
                className="liquid-glass-card p-8 relative group"
                whileHover={{ y: -3 }}
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <h4 className="font-bold text-white text-xl mb-1">{item.credential}</h4>
                  <p className="text-emerald-400 font-medium mb-1">{item.school}</p>
                  <p className="text-white/40 text-sm mb-3">{item.detail}</p>
                  <p className="text-white/50 text-sm leading-relaxed">{item.notes}</p>
                </div>
              </motion.div>
            ))}
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
