import React, { useState, useEffect } from 'react';
import { motion, useAnimation, useMotionValue, useTransform } from 'motion/react';

interface EntrySequenceProps {
  onEnter: () => void;
}

export function EntrySequence({ onEnter }: EntrySequenceProps) {
  const [typingComplete, setTypingComplete] = useState(false);
  const text = "Prajna Peyyeti";
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, i + 1));
      i++;
      if (i === text.length) {
        clearInterval(interval);
        setTimeout(() => setTypingComplete(true), 800);
      }
    }, 100); // typing speed

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      className="fixed inset-0 z-[5000] flex flex-col items-center justify-center bg-theme-loader"
      exit={{ y: '-100%' }}
      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="relative z-10 text-center font-serif text-5xl text-theme-text">
        <span>{displayedText}</span>
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
          className="inline-block ml-1"
        >
          |
        </motion.span>
      </div>

      {typingComplete && <Lamp onPull={onEnter} />}
    </motion.div>
  );
}

function Lamp({ onPull }: { onPull: () => void }) {
  const y = useMotionValue(0);
  const controls = useAnimation();
  
  const handleDragEnd = (event: any, info: any) => {
    if (info.offset.y > 100) {
      // Trigger enter
      onPull();
    } else {
      // Snap back
      controls.start({ y: 0, transition: { type: "spring", bounce: 0.6 } });
    }
  };

  useEffect(() => {
    controls.start({ y: 0, transition: { type: "spring", damping: 12, stiffness: 50 } });
  }, [controls]);

  return (
    <motion.div 
      className="absolute top-[-340px] left-1/2 -translate-x-1/2 flex flex-col items-center cursor-grab active:cursor-grabbing z-[5200] interactive"
      initial={{ y: -100 }}
      animate={controls}
      drag="y"
      dragConstraints={{ top: 0, bottom: 150 }}
      dragElastic={0.2}
      onDragEnd={handleDragEnd}
      style={{ y }}
    >
      <motion.div
        animate={{ rotate: [-1, 1] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut", repeatType: "reverse" }}
        style={{ transformOrigin: "top center" }}
        className="relative"
      >
        <svg width="120" height="420" viewBox="0 0 120 420">
          <line x1="60" y1="0" x2="60" y2="300" stroke="#3D3935" strokeWidth="2"/>
          <path d="M20,300 Q60,240 100,300 Z" fill="#8A8273"/>
          <circle cx="60" cy="300" r="15" fill="#FFFBEB"/>
          <line x1="60" y1="315" x2="60" y2="385" stroke="#3D3935" strokeWidth="1.5" strokeDasharray="3 2"/>
          <circle cx="60" cy="390" r="8" fill="#3D3935"/>
        </svg>
        <p className="absolute bottom-[-40px] left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] opacity-40 whitespace-nowrap text-theme-text font-sans">
          Pull cord to enter
        </p>
      </motion.div>
    </motion.div>
  );
}
