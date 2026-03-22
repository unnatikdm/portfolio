'use client';

import { motion } from 'framer-motion';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { Brain, Database, Zap } from 'lucide-react';

const skillData = [
  { skill: 'Python', value: 90 },
  { skill: 'Machine Learning', value: 85 },
  { skill: 'Data Analysis', value: 88 },
  { skill: 'SQL', value: 82 },
  { skill: 'NLP', value: 80 },
  { skill: 'Deep Learning', value: 83 },
];

const stats = [
  { label: 'Projects', value: '3+' },
  { label: 'Experience', value: 'Fresher' },
  { label: 'Skills', value: '10+' },
];

const FloatingIcon = ({ Icon, delay }: { Icon: any; delay: number }) => (
  <motion.div
    animate={{ y: [0, -20, 0] }}
    transition={{ duration: 3, delay, repeat: Infinity }}
    className="text-primary"
  >
    <Icon size={32} />
  </motion.div>
);

export function About() {
  return (
    <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-background via-card/20 to-background">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent"
        >
          About Me
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Skills Radar Chart */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <div className="w-full h-96 bg-card/40 rounded-xl border border-primary/20 p-4 backdrop-blur-sm">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={skillData}>
                  <PolarGrid stroke="#1e3a8a" />
                  <PolarAngleAxis dataKey="skill" stroke="#94a3b8" />
                  <PolarRadiusAxis stroke="#1e3a8a" />
                  <Radar
                    name="Proficiency"
                    dataKey="value"
                    stroke="#a855f7"
                    fill="#a855f7"
                    fillOpacity={0.6}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Bio and Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-2xl font-semibold text-secondary mb-4">Passionate About Data & AI</h3>
              <p className="text-foreground/80 leading-relaxed">
                I'm a fresher with strong foundations in Python, SQL, and machine learning. Passionate about building intelligent systems that solve real-world problems through data analysis and AI. I'm eager to apply my skills in NLP, deep learning, and predictive modeling to create impactful solutions.
              </p>
              <div className="mt-4 space-y-2">
                <p className="text-foreground/70"><strong>Key Skills:</strong> Machine Learning, Python, SQL, Data Analysis, NLP, Deep Learning</p>
                <p className="text-foreground/70"><strong>Interests:</strong> AI/ML, Data Science, Predictive Analytics</p>
              </div>
            </div>

            {/* Floating Icons */}
            <div className="flex gap-8 py-4">
              <FloatingIcon Icon={Brain} delay={0} />
              <FloatingIcon Icon={Database} delay={0.2} />
              <FloatingIcon Icon={Zap} delay={0.4} />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="text-center p-4 bg-card/50 rounded-lg border border-secondary/20 hover:border-secondary/50 transition-colors"
                >
                  <div className="text-3xl font-bold text-primary">{stat.value}</div>
                  <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
