'use client';

import { motion } from 'framer-motion';
import { GraduationCap, Calendar, Award } from 'lucide-react';

const education = [
  {
    id: 1,
    institution: 'fr. Conceicao Rodrigues College of Engineering (CRCE)',
    degree: 'BTECH in Computer Science and Engineering (CSE)',
    period: '2025 – 2028 | Present',
    description: 'Currently pursuing Bachelor of Technology in Computer Science and Engineering with focus on advanced computing concepts and AI/ML applications.',
    achievements: ['Ongoing', 'Focus on AI/ML and Data Science'],
    logo: '🎓',
  },
  {
    id: 2,
    institution: 'Viva College of Diploma Engineering and Technology (VCDET)',
    degree: 'Diploma in Artificial Intelligence & Machine Learning',
    period: '2022 – 2025',
    description: 'Completed Diploma in Artificial Intelligence & Machine Learning with excellent academic performance and practical project experience.',
    achievements: ['Aggregate: 93%', 'AI/ML Specialization'],
    logo: '🤖',
  },
];

export function Education() {
  return (
    <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-background via-card/20 to-background">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent"
        >
          Education
        </motion.h2>

        {/* Education Section */}
        <div className="relative">
          <div className="space-y-8">
            {education.map((edu, index) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-card/50 border border-primary/20 hover:border-secondary/50 rounded-xl p-6 backdrop-blur-sm transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{edu.logo}</div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
                      <div>
                        <h4 className="text-lg sm:text-xl font-bold text-foreground">{edu.degree}</h4>
                        <p className="text-secondary text-sm sm:text-base">{edu.institution}</p>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground text-xs sm:text-sm mt-2 sm:mt-0">
                        <Calendar size={14} className="sm:size-16" />
                        {edu.period}
                      </div>
                    </div>
                    <p className="text-foreground/70 mb-3">{edu.description}</p>
                    <div className="space-y-1">
                      {edu.achievements.map((achievement, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-foreground/60">
                          <Award size={12} className="sm:size-14" />
                          {achievement}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
