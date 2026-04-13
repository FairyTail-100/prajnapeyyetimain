import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

const projects = [
  {
    id: "01",
    title: "Student Portfolio",
    purpose: "Personal Branding & Creative Development",
    desc: "A highly interactive personal website designed with motion-first principles, custom cursors, and an immersive user interface.",
    tech: ["React", "Framer Motion", "Tailwind"]
  },
  {
    id: "02",
    title: "Basic Chat App",
    purpose: "Real-time Networking & Comms",
    desc: "A lightweight, real-time messaging application demonstrating client-server communication and socket programming.",
    tech: ["Python", "Sockets"],
    mt: "md:mt-12"
  },
  {
    id: "03",
    title: "To-Do App",
    purpose: "State Management & Productivity",
    desc: "A persistent task management tool utilizing browser storage for stateless data retention across sessions.",
    tech: ["JavaScript", "Local Storage"]
  },
  {
    id: "04",
    title: "Mini AI Chatbot",
    purpose: "Natural Language Processing",
    desc: "An intelligent conversational agent built to process natural language queries and provide context-aware responses.",
    tech: ["Python", "LLM API"],
    mt: "md:mt-12"
  }
];

export function ProjectsZone() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={containerRef} className="py-20 px-5 relative flex items-center">
      <div className="max-w-6xl w-full mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="text-sm tracking-[0.3em] uppercase text-theme-muted mb-4">Selected Works</p>
          <h2 className="text-5xl font-serif italic text-theme-text">Project Showcase.</h2>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((proj, i) => (
            <motion.div 
              key={proj.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className={`border border-theme-text/20 p-10 relative overflow-hidden group interactive transition-colors duration-500 hover:bg-theme-text hover:text-theme-bg ${proj.mt || ''}`}
            >
              {/* Hover Background Accent */}
              <div className="absolute inset-0 bg-theme-text translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[0.22,1,0.36,1] z-0" />

              <div className="relative z-10 transform transition-transform duration-500 group-hover:-translate-y-2">
                <div className="mb-6 flex justify-between items-start">
                  <h3 className="font-serif text-3xl flex items-center gap-3">
                    {proj.title}
                    <ArrowUpRight className="w-6 h-6 opacity-0 -translate-x-4 translate-y-4 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500 ease-out" />
                  </h3>
                  <span className="text-xs uppercase tracking-widest opacity-50">{proj.id}</span>
                </div>
                <p className="text-theme-muted mb-6 transition-colors duration-500 group-hover:text-theme-bg/80">
                  {proj.desc}
                </p>
                <div className="mb-8">
                  <p className="text-[9px] uppercase tracking-[0.2em] opacity-60 mb-1">Purpose</p>
                  <p className="text-sm">{proj.purpose}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {proj.tech.map(t => (
                    <span key={t} className="text-xs border border-current px-3 py-1 rounded-full">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
