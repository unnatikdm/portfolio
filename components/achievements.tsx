'use client';

import { motion } from 'framer-motion';
import { Trophy, Medal, Award, Target } from 'lucide-react';

const achievements = [
  {
    id: 1,
    title: '2nd Runner Up',
    event: 'E Summit EGF Hackathon',
    organization: 'IIT Bombay',
    year: '2024',
    description: 'Achieved 2nd runner up position in prestigious hackathon at IIT Bombay',
    icon: <Trophy size={24} />,
    color: 'from-yellow-500 to-orange-500'
  },
  {
    id: 2,
    title: 'Winner',
    event: 'Technovation 2024',
    organization: 'VESP, Mumbai',
    year: '2024',
    description: 'Won first place in Technovation competition at Vivekanand Education Society\'s Polytechnic',
    icon: <Medal size={24} />,
    color: 'from-blue-500 to-purple-500'
  },
  {
    id: 3,
    title: 'Runner Up',
    event: 'Pravinya 2024',
    organization: 'Tech Paper Presentation',
    year: '2024',
    description: 'Secured runner up position for technical paper presentation at Pravinya 2024',
    icon: <Award size={24} />,
    color: 'from-green-500 to-teal-500'
  },
  {
    id: 4,
    title: '5th Rank',
    event: 'Azeotropy Predictioneer ML Hackathon',
    organization: 'IIT Bombay',
    year: '2024',
    description: 'Achieved 5th rank in machine learning hackathon focused on prediction tasks',
    icon: <Target size={24} />,
    color: 'from-red-500 to-pink-500'
  },
  {
    id: 5,
    title: 'Research Publication',
    event: 'Cross-Chain Atomic Swap (CCAS) on Blockchain',
    organization: 'SSRN Preprint',
    year: '2024',
    description: 'Published research paper on Cross-Chain Atomic Swap implementation on blockchain technology',
    icon: <Trophy size={24} />,
    color: 'from-purple-500 to-indigo-500'
  }
];

export function Achievements() {
  return (
    <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-background via-card/20 to-background">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary"
        >
          Honours and Achievements
        </motion.h2>

        <div className="grid sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-card/50 border border-primary/20 hover:border-secondary/50 rounded-xl p-6 backdrop-blur-sm transition-all hover:scale-105"
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <div className={`p-2 sm:p-3 rounded-lg bg-gradient-to-br ${achievement.color} text-white`}>
                  {achievement.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-base sm:text-lg font-bold text-foreground">{achievement.title}</h3>
                  <p className="text-secondary text-sm sm:text-base">{achievement.event}</p>
                  <p className="text-muted-foreground text-xs sm:text-sm">{achievement.organization}</p>
                  <p className="text-primary text-sm sm:text-base font-medium">{achievement.year}</p>
                  <p className="text-foreground/70 text-xs sm:text-sm mt-2">{achievement.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
