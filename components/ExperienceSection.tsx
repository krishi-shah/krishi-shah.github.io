'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const experiences = [
  {
    title: 'AI Research Assistant',
    company: 'York University, supervised by Prof. Mona Nasery',
    period: 'May 2026 – Aug 2026',
    location: 'Toronto, ON',
    description: [
      'Fine-tuned EfficientNet-B3 on 120,000 images to 96.96% test accuracy and 0.9971 AUC-ROC.',
      'Temperature scaling at T = 1.2189 brought expected calibration error to 0.0026.',
      'A resolution-matched control showed the earlier cross-generator scores were reading resampling artifacts. Matched-resolution detection fell to 35–62%.',
      'Evaluated transfer across StyleGAN, Stable Diffusion 3, Flux, Midjourney v6, Janus-Pro, and GPT-4o.',
    ],
    skills: ['PyTorch', 'EfficientNet', 'Calibration', 'Grad-CAM'],
    gradient: 'from-emerald-500 to-cyan-500',
  },
  {
    title: 'Software Developer Co-op · Co-op of the Year Nominee',
    company: 'Ontario Government',
    period: 'Jan 2025 – Dec 2025',
    location: 'Toronto, ON',
    description: [
      'Rewrote the validation layer in Python and SQL across 10+ workflows and cut reported data errors by about 30%.',
      'Refactored schemas, queries, and indexes behind 5+ applications, improving query performance 25%.',
      'Built test suites and release automation in Azure DevOps, cutting deployment time 40% and moving the team to same-day releases.',
    ],
    skills: ['Python', 'SQL', 'PostgreSQL', 'Azure DevOps'],
    gradient: 'from-cyan-500 to-violet-500',
  },
  {
    title: 'Software Developer, Analytics',
    company: 'All Good Accounting',
    period: 'Feb 2025 – Apr 2025',
    location: 'Toronto, ON',
    description: [
      'Built a financial reporting application that replaced a manual Excel process, through the Level UP industry program.',
      'Scoped requirements with the client and shipped views that non-technical staff could run without developer support.',
    ],
    skills: ['Python', 'SQL', 'Reporting'],
    gradient: 'from-violet-500 to-pink-500',
  },
  {
    title: 'Data Science Intern',
    company: 'NFOX Technologies',
    period: 'Nov 2022 – Jan 2023',
    location: 'Gujarat, India',
    description: [
      'Compared Random Forest, SVM, and Gradient Boosting on 10K+ churn records, moving accuracy from 73% to 85%. Feature engineering produced nearly all of the gain.',
      'Benchmarked a BERT classifier against bag-of-words baselines until a 15% lift justified the extra training cost.',
      'Built Tableau dashboards for KPI and financial metrics.',
    ],
    skills: ['Python', 'scikit-learn', 'BERT', 'Tableau'],
    gradient: 'from-emerald-500 to-violet-500',
  },
  {
    title: 'Data Analytics Intern',
    company: 'Suven Consultants and Technology',
    period: 'May 2022 – Jul 2022',
    location: 'Gujarat, India',
    description: [
      'Built reusable Python and SQL pipelines across 5+ datasets that informed 3 product decisions.',
      'Designed 3 Power BI dashboards and cut manual reporting effort by 50%.',
    ],
    skills: ['Python', 'SQL', 'Power BI'],
    gradient: 'from-cyan-500 to-emerald-500',
  },
];

const volunteerExperience = [
  {
    title: 'Lead Developer and Executive',
    company: 'York University Data Science Club',
    period: 'Oct 2024 – Oct 2025',
    location: 'Toronto, ON',
    description: [
      'Set technical direction for a 12-person team across 5+ machine learning projects, including scoping, code review, and mentorship.',
      'Published 8 technical articles in Level Up Coding and CodeX during the role.',
    ],
    skills: ['Mentorship', 'Code review', 'Machine Learning'],
  },
  {
    title: 'Student Ambassador and Week Zero Leader',
    company: 'Lassonde School of Engineering, York University',
    period: 'Summer 2024',
    location: 'Toronto, ON',
    description: [
      'Represented Lassonde to prospective and incoming students.',
      'Led Week Zero orientation for first-year engineering and computer science cohorts.',
    ],
    skills: ['Leadership', 'Mentoring'],
  },
];

export default function ExperienceSection() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section id="experience" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-transparent" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
      
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
            className="inline-block text-cyan-400 text-sm font-medium tracking-wider uppercase mb-4"
          >
            Career Journey
          </motion.span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            Professional <span className="gradient-text">Experience</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative mb-20">
          {/* Vertical Line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px">
            <div className="h-full bg-gradient-to-b from-emerald-500/50 via-cyan-500/30 to-violet-500/20" />
          </div>

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.title + exp.company}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
              className={`relative mb-12 lg:mb-16 ${
                index % 2 === 0 ? 'lg:pr-[52%]' : 'lg:pl-[52%]'
              }`}
            >
              {/* Timeline Node */}
              <div className="hidden lg:flex absolute left-1/2 top-8 w-4 h-4 -translate-x-1/2 items-center justify-center">
                <div className={`w-4 h-4 rounded-full bg-gradient-to-br ${exp.gradient}`} />
                <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping" />
              </div>

              {/* Card */}
              <motion.div 
                className="liquid-glass-card p-6 sm:p-8 relative group"
                whileHover={{ y: -3 }}
              >
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${exp.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                
                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                    <div>
                      <h3 className="font-bold text-white text-xl mb-1">{exp.title}</h3>
                      <p className="text-emerald-400 font-medium">{exp.company}</p>
                    </div>
                    <div className="text-right">
                      <span className="inline-block text-xs text-white/70 bg-white/10 backdrop-blur-xl px-3 py-1.5 rounded-full border border-white/10">
                        {exp.period}
                      </span>
                      <p className="text-xs text-white/40 mt-1">{exp.location}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <ul className="space-y-2 mb-5">
                    {exp.description.map((desc, i) => (
                      <li key={i} className="text-white/60 text-sm flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 mt-2 flex-shrink-0" />
                        <span>{desc}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 text-xs rounded-lg 
                                 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Volunteer Experience */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3 className="text-2xl sm:text-3xl font-bold mb-10 text-center">Leadership</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {volunteerExperience.map((exp, index) => (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                whileHover={{ y: -3 }}
                className="liquid-glass-card p-6 group"
              >
                <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
                  <div>
                    <h4 className="font-bold text-white">{exp.title}</h4>
                    <p className="text-emerald-400 text-sm">{exp.company}</p>
                  </div>
                  <span className="text-xs text-white/50 bg-white/5 px-2 py-1 rounded-lg">
                    {exp.period}
                  </span>
                </div>

                <ul className="space-y-1 mb-4">
                  {exp.description.map((desc, i) => (
                    <li key={i} className="text-white/50 text-sm flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-white/30 mt-2" />
                      {desc}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {exp.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 text-xs rounded-md bg-white/5 border border-white/10 text-white/60"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
