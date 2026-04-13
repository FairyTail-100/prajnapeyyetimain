import React from 'react';
import { motion } from 'motion/react';
import { AboutZone } from './zones/AboutZone';
import { SkillsZone } from './zones/SkillsZone';
import { ProjectsZone } from './zones/ProjectsZone';
import { EducationZone } from './zones/EducationZone';
import { ContactZone } from './zones/ContactZone';

export function MainCanvas() {
  return (
    <motion.main 
      className="w-full relative"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
    >
      <div className="flex flex-col">
        <AboutZone />
        <SkillsZone />
        <ProjectsZone />
        <EducationZone />
        <ContactZone />
      </div>
    </motion.main>
  );
}
