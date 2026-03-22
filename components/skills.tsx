'use client';

import { motion } from 'framer-motion';
import { Code, Cpu, Globe, GitBranch } from 'lucide-react';

const skillsData = {
  'ML & Development': {
    icon: <Cpu size={24} />,
    skills: ['Python', 'Java', 'C++', 'SQL', 'Scikit-learn', 'CatBoost', 'XGBoost', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn'],
    description: 'Feature Engineering, Hyperparameter Tuning, Model Evaluation, Supervised Learning, Algorithms'
  },
  'Automation': {
    icon: <GitBranch size={24} />,
    skills: ['Git', 'GitHub', 'Docker (Containerization)', 'GitOps'],
    description: 'Version control, containerization, and deployment automation'
  },
  'Web & App': {
    icon: <Globe size={24} />,
    skills: ['Streamlit', 'Flask', 'HTML', 'CSS', 'JavaScript', 'SQLite'],
    description: 'Full-stack development and database management'
  },
  'Workflow & Practice': {
    icon: <Code size={24} />,
    skills: ['Git-based Collaboration', 'Supervised Learning', 'Hackathons & Presentations'],
    description: 'Agile practices and collaborative development'
  }
};

export function Skills() {
  return (
    <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-background via-card/20 to-background">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent"
        >
          Technical Skills
        </motion.h2>

        <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {Object.entries(skillsData).map(([category, data], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-card/50 border border-primary/20 hover:border-secondary/50 rounded-xl p-6 backdrop-blur-sm transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="text-primary">
                  {data.icon}
                </div>
                <h3 className="text-xl font-bold text-foreground">{category}</h3>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {data.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="px-2 py-1 text-xs sm:px-3 sm:py-1 bg-primary/20 text-primary rounded-full border border-primary/40"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              
              <p className="text-foreground/70 text-sm">{data.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
