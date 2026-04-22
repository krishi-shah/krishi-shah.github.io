'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const experiences = [
  {
    title: 'Software Developer Co-op',
    company: 'Government of Ontario',
    period: '2024 - Present',
    location: 'Toronto, ON',
    description: [
      'Currently working as a Software Developer Co-op, applying programming and data analysis skills to government projects.',
      'Collaborating with cross-functional teams to develop and maintain software solutions.',
      'Contributing to data-driven decision-making processes through technical implementations.',
    ],
    skills: ['Python', 'SQL', 'Data Analysis', 'Software Development'],
    gradient: 'from-emerald-500 to-cyan-500',
  },
  {
    title: 'Data Science Intern',
    company: 'NFOX Pvt. Ltd',
    period: 'Nov 2022 - Feb 2023',
    location: 'Gujarat, India',
    description: [
      'Improved machine learning models to predict customer churn, improving retention rates by 12%.',
      'Utilized NLP techniques to analyze customer feedback, leading to 10% improvement in satisfaction.',
      'Built interactive Tableau dashboards to visualize KPIs and financial performance.',
    ],
    skills: ['Python', 'SQL', 'Machine Learning', 'NLP', 'Tableau'],
    gradient: 'from-cyan-500 to-violet-500',
  },
  {
    title: 'Data Analyst Intern',
    company: 'CODE CLAUSE Pvt. Ltd',
    period: 'Mar 2022 - Jul 2022',
    location: 'Pune, India',
    description: [
      'Analyzed sales data to identify trends and optimize inventory, resulting in 15% reduction in excess stock.',
      'Created ML models for sales forecasting using time series analysis, improving accuracy by 20%.',
      'Designed and implemented business intelligence dashboards in Power BI.',
    ],
    skills: ['SQL', 'Python', 'Data Analysis', 'Machine Learning', 'Power BI'],
    gradient: 'from-violet-500 to-pink-500',
  },
];

const volunteerExperience = [
  {
    title: 'Lassonde Student Ambassador',
    company: 'York University',
    period: 'Jun 2024 - Sep 2024',
    location: 'Toronto, ON',
    description: [
      'Assisted first-year students with course enrollment and program information.',
      'Organized workshops and events promoting data analytics and technology.',
    ],
    skills: ['Leadership', 'Communication', 'Event Planning', 'Mentoring'],
  },
  {
    title: 'Week Zero Event Leader',
    company: 'York University',
    period: 'Jun 2024 - Sep 2024',
    location: 'Toronto, ON',
    description: [
      'Led a team of volunteers for the Week Zero orientation program.',
      'Coordinated activities and events to welcome new students.',
    ],
    skills: ['Team Leadership', 'Event Management', 'Organization'],
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
          <h3 className="text-2xl sm:text-3xl font-bold mb-10 text-center">Volunteer Experience</h3>
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
