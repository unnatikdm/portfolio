'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';

const projectsData = [
  {
    id: 1,
    title: 'InterviewLY',
    description: 'InterviewLY is an AI-powered interview analysis tool built using Python, Streamlit, OpenCV, MediaPipe, DeepFace, FFmpeg, and OpenAI\'s Whisper API. It integrates modules for sentiment, emotion, speech clarity, eye contact, posture, and hand gestures to deliver personalized, real-time feedback from video interviews.',
    tech: ['Python', 'Streamlit', 'OpenCV', 'MediaPipe', 'DeepFace', 'OpenAI API'],
    gradient: 'from-blue-500 to-purple-500',
    githubUrl: 'https://github.com/unnatikadam/interviewly',
  },
  {
    id: 2,
    title: 'HealthML',
    description: 'Built a health risk prediction model using CatBoost with 97.2% accuracy. Designed a clean data pipeline and visualized key metrics for effective model evaluation.',
    tech: ['Python', 'CatBoost', 'Pandas', 'NumPy', 'Matplotlib', 'Scikit-learn'],
    gradient: 'from-green-500 to-teal-500',
    githubUrl: 'https://github.com/unnatikadam/healthml',
  },
  {
    id: 3,
    title: 'UrjaAI',
    description: 'Built UrjaAI — an end-to-end AI-powered energy intelligence platform featuring XGBoost-LightGBM ensemble forecasting, recursive time-series prediction with confidence intervals, SHAP-based explainability, and what-if scenario simulation, transforming IoT sensor data into real-time recommendations for campus energy optimization.',
    tech: ['Python', 'XGBoost', 'LightGBM', 'SHAP', 'Time Series', 'IoT'],
    gradient: 'from-orange-500 to-red-500',
    githubUrl: 'https://github.com/unnatikadam/urjaai',
  },
];

interface FlipCardProps {
  project: (typeof projectsData)[0];
  index: number;
}

function FlipCard({ project, index }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleProjectClick = async (action: 'view' | 'github') => {
    try {
      // Track project interaction
      await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          projectId: project.id,
          action: action === 'view' ? 'track_view' : 'track_click',
        }),
      });

      // Track analytics
      await fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'project_view',
          data: { projectId: project.id, action },
        }),
      });
    } catch (error) {
      console.error('Analytics tracking failed:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      className="h-64 sm:h-72 cursor-pointer perspective"
      style={{ perspective: '1000px' }}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        className="w-full h-full relative"
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* Front */}
        <div
          className="absolute w-full h-full bg-gradient-to-br p-6 rounded-2xl border border-primary/30 flex flex-col justify-between"
          style={{
            backgroundImage: `linear-gradient(135deg, var(--tw-gradient-stops))`,
            '--tw-gradient-stops': `rgba(168, 85, 247, 0.2), rgba(6, 182, 212, 0.2)`,
            backfaceVisibility: 'hidden',
          } as any}
        >
          <div>
            <h3 className="text-2xl font-bold text-foreground">{project.title}</h3>
            <p className="text-foreground/60 text-sm mt-2">{project.description.substring(0, 60)}...</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs bg-primary/20 text-primary rounded-full border border-primary/40"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Back */}
        <div
          className="absolute w-full h-full bg-card border border-secondary/30 p-6 rounded-2xl flex flex-col justify-between"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          } as any}
        >
          <div>
            <h4 className="text-xl font-bold text-secondary mb-3">About</h4>
            <p className="text-foreground/80 text-sm leading-relaxed">{project.description}</p>
          </div>
          <div className="flex gap-4">
            <a 
              href={project.githubUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={() => handleProjectClick('github')}
              className="flex items-center gap-2 px-4 py-2 bg-secondary/20 hover:bg-secondary/30 text-secondary rounded-lg transition-colors"
            >
              <Github size={16} />
              View Code
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Projects() {
  return (
    <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-background via-card/10 to-background">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent"
        >
          Featured Projects
        </motion.h2>

        <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {projectsData.map((project, idx) => (
            <FlipCard key={project.id} project={project} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
