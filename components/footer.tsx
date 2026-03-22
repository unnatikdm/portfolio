'use client';

import { motion } from 'framer-motion';
import { Phone, MapPin, Linkedin, Github, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="py-12 px-4 md:px-8 bg-gradient-to-b from-background via-card/10 to-background border-t border-primary/20">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold text-foreground mb-8 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
            Get In Touch
          </h3>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 mb-8">
            <div className="flex items-center gap-3 text-foreground/80">
              <Phone size={20} />
              <span className="text-lg">+91 82088 21254</span>
            </div>
            <div className="flex items-center gap-3 text-foreground/80">
              <MapPin size={20} />
              <span className="text-lg">Mumbai, India</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
            <a 
              href="mailto:unnatikadam50a@gmail.com" 
              className="flex items-center gap-3 text-foreground/70 hover:text-primary transition-colors group"
            >
              <Mail size={20} className="group-hover:scale-110 transition-transform" />
              <span className="text-lg">unnatikadam50a@gmail.com</span>
            </a>
            <a 
              href="https://linkedin.com/in/unnatikadam" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-3 text-foreground/70 hover:text-primary transition-colors group"
            >
              <Linkedin size={20} className="group-hover:scale-110 transition-transform" />
              <span className="text-lg">LinkedIn</span>
            </a>
            <a 
              href="https://github.com/unnatikadam" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-3 text-foreground/70 hover:text-secondary transition-colors group"
            >
              <Github size={20} className="group-hover:scale-110 transition-transform" />
              <span className="text-lg">GitHub</span>
            </a>
          </div>

          <div className="text-foreground/60 text-sm">
            <p>© 2024 UNNATI KADAM. All rights reserved.</p>
            <p className="mt-2">Built with ❤️ and Next.js</p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
