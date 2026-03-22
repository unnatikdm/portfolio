'use client';

import { motion } from 'framer-motion';
import { Briefcase, Calendar } from 'lucide-react';

const experiences = [
  {
    id: 1,
    company: 'Nebula Media',
    role: 'Performance Analyst',
    period: 'September 2025 – Present',
    description: 'Analyzed campaign and operational performance data to identify trends, inefficiencies, and opportunities for optimization. Monitored key performance indicators (KPIs) and generated regular reports to support data-driven decision making. Participated in agile practices including daily stand-ups and sprint planning. Built dashboards and data summaries to communicate insights clearly to cross-functional teams and stakeholders.',
    logo: '📊',
  },
  {
    id: 2,
    company: 'Version Technologies',
    role: 'MLOps Intern',
    period: 'January 2025 – March 2025',
    description: 'Collaborated with cross-functional teams on deployment workflows and infrastructure automation. Built multi-stage Docker images for front-end apps, improving deployment efficiency. Authored internal Wikis and documentation to improve onboarding and automation reproducibility.',
    logo: '🔧',
  },
];

export function Experience() {
  return (
    <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-background via-card/20 to-background">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-accent to-secondary"
        >
          Experience
        </motion.h2>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-secondary to-accent opacity-50" />

          {/* Timeline Items */}
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="pl-24 relative"
              >
                {/* Timeline Dot */}
                <div className="absolute left-0 top-2 w-16 h-16 flex items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-2xl border-4 border-background"
                  >
                    {exp.logo}
                  </motion.div>
                </div>

                {/* Content Card */}
                <motion.div
                  whileHover={{ x: 10 }}
                  className="bg-card/50 border border-primary/20 hover:border-secondary/50 rounded-xl p-6 backdrop-blur-sm transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2">
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-foreground">{exp.role}</h3>
                      <p className="text-secondary text-sm sm:text-base">{exp.company}</p>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground text-xs sm:text-sm mt-2 sm:mt-0">
                      <Calendar size={14} className="sm:size-16" />
                      {exp.period}
                    </div>
                  </div>
                  <p className="text-foreground/70">{exp.description}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
