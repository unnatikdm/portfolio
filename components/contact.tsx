'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Mail, Linkedin, Github, Download, Send } from 'lucide-react';

export function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '', subject: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [downloadProgress, setDownloadProgress] = useState(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '', subject: '' });
        
        // Track analytics
        await fetch('/api/analytics', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ type: 'contact_submission' }),
        });

        setTimeout(() => {
          setSubmitted(false);
        }, 5000);
      } else {
        setError(result.error || 'Failed to send message');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadResume = async () => {
    setDownloadProgress(0);
    
    // Simulate download progress
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 30;
      });
    }, 100);

    // Track analytics
    await fetch('/api/analytics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ type: 'page_view', data: { action: 'resume_download' } }),
    });

    // In a real implementation, you would serve an actual PDF file
    // For demo purposes, we'll just create a dummy download
    setTimeout(() => {
      const link = document.createElement('a');
      link.href = '/resume.pdf'; // You would need to add this file to public folder
      link.download = 'unnati-kadam-resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 1000);
  };

  return (
    <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-background via-card/20 to-background">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary"
        >
          Get In Touch
        </motion.h2>

        <p className="text-center text-foreground/60 mb-16">
          Have a project in mind or want to collaborate? Let's talk!
        </p>

        <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="gradient-border rounded-xl overflow-hidden">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your Name"
                  required
                  className="w-full bg-background px-3 sm:px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none text-sm sm:text-base"
                />
              </div>

              <div className="gradient-border rounded-xl overflow-hidden">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Your Email"
                  required
                  className="w-full bg-background px-3 sm:px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none text-sm sm:text-base"
                />
              </div>

              <div className="gradient-border rounded-xl overflow-hidden">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Your Message"
                  rows={5}
                  required
                  className="w-full bg-background px-3 sm:px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none resize-none text-sm sm:text-base"
                />
              </div>

              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-500 text-sm">
                  {error}
                </div>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading || submitted}
                className="w-full px-4 sm:px-6 py-3 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold rounded-lg hover:shadow-lg hover:shadow-primary/50 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                {loading ? (
                  <span>Sending...</span>
                ) : submitted ? (
                  <span>Message Sent! ✨</span>
                ) : (
                  <>
                    <Send size={20} />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info & Resume */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Resume Download */}
            <div className="bg-card/50 border border-primary/20 rounded-xl p-6 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-primary mb-4">Download Resume</h3>
              <button
                onClick={handleDownloadResume}
                className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-secondary to-accent text-secondary-foreground font-semibold rounded-lg hover:shadow-lg hover:shadow-secondary/50 transition-all flex items-center justify-center gap-2 mb-3 text-sm sm:text-base"
              >
                <Download size={20} />
                Download PDF
              </button>
              {downloadProgress > 0 && downloadProgress < 100 && (
                <div className="w-full bg-card rounded-full h-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${downloadProgress}%` }}
                    className="h-full bg-gradient-to-r from-secondary to-accent"
                  />
                </div>
              )}
            </div>

            {/* Social Links */}
            <div className="bg-card/50 border border-secondary/20 rounded-xl p-6 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-secondary mb-4">Connect With Me</h3>
              <div className="space-y-3">
                {[
                  { icon: Mail, label: 'Email', href: 'mailto:unnati.kadam@example.com', color: 'hover:text-primary' },
                  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/in/unnati-kadam', color: 'hover:text-primary' },
                  { icon: Github, label: 'GitHub', href: 'https://github.com/unnatikadam', color: 'hover:text-secondary' },
                ].map(({ icon: Icon, label, href, color }) => (
                  <motion.a
                    key={label}
                    href={href}
                    whileHover={{ x: 5 }}
                    className={`flex items-center gap-3 text-foreground/70 transition-colors ${color}`}
                  >
                    <Icon size={20} />
                    {label}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
