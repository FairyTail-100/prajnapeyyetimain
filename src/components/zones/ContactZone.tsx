import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

const interests = [
  "Web Development",
  "UI/UX Design",
  "Artificial Intelligence",
  "Creative Coding"
];

function Magnetic({ children }: { children: React.ReactElement }) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
}

export function ContactZone() {
  return (
    <section className="relative min-h-screen bg-theme-bg flex flex-col justify-between overflow-hidden">
      
      {/* Interests Section (Structured & Clean) */}
      <div className="w-full flex flex-col items-center justify-center pt-32 pb-12 px-5">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm tracking-[0.3em] uppercase text-theme-muted mb-4">Current Fascinations</p>
          <h2 className="text-5xl font-serif italic text-theme-text">Core Interests.</h2>
        </motion.div>
        
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 max-w-4xl mx-auto relative z-20">
          {interests.map((interest, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="px-8 py-4 rounded-full border border-theme-text/20 font-serif italic text-xl md:text-2xl text-theme-text bg-theme-bg/50 backdrop-blur-sm interactive hover:bg-theme-text hover:text-theme-bg hover:border-theme-text transition-all duration-500 cursor-default"
            >
              {interest}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Contact Section (Simplified) */}
      <div className="flex-grow flex flex-col items-center justify-center bg-[#1a1918] text-[#D4CFC4] py-24 px-5 rounded-t-[3rem] md:rounded-t-[5rem] mt-10 relative z-30">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto"
        >
          <p className="font-serif text-5xl md:text-7xl italic mb-12 text-white">Let's build the future.</p>
          
          <div className="flex flex-wrap justify-center gap-6 md:gap-12 mt-16">
            <ContactLink href="mailto:hello@prajna.dev" icon={<Mail />} label="Email" />
            <ContactLink href="https://github.com" icon={<Github />} label="GitHub" />
            <ContactLink href="https://linkedin.com" icon={<Linkedin />} label="LinkedIn" />
            <ContactLink href="https://twitter.com" icon={<Twitter />} label="Twitter" />
          </div>
        </motion.div>

        {/* Footer */}
        <div className="absolute bottom-10 w-full text-center">
          <p className="text-[10px] uppercase tracking-widest text-[#8A8273]">
            © {new Date().getFullYear()} Prajna Peyyeti
          </p>
        </div>
      </div>
    </section>
  );
}

function ContactLink({ href, icon, label }: { href: string, icon: React.ReactNode, label: string }) {
  return (
    <Magnetic>
      <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex flex-col items-center gap-3 text-[#8A8273] hover:text-white transition-colors duration-300 interactive group"
      >
        <div className="w-14 h-14 rounded-full border border-[#8A8273]/30 flex items-center justify-center group-hover:border-white transition-colors duration-300">
          {icon}
        </div>
        <span className="text-xs tracking-widest uppercase">{label}</span>
      </a>
    </Magnetic>
  );
}
