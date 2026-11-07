import React from 'react';
import { experiences } from '../data/experience';
import { ExperienceCard } from './ExperienceCard';
import { Briefcase, Terminal } from 'lucide-react';

export const ExperienceSection = () => {
  const visibleExperiences = experiences.filter((e) => e.visible !== false);

  return (
    <section id="experience" className="editorial-section relative py-20 sm:py-28 bg-[#090A0D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 border-b border-white/10 pb-6">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-mono text-accent mb-2 tracking-widest uppercase">
              <Briefcase className="w-4 h-4" />
              <span>SCENE 02 // CAREER TIMELINE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight">
              Professional <span className="text-gradient-orange">Experience.</span>
            </h2>
          </div>
          <p className="mt-3 md:mt-0 text-sm sm:text-base text-content-secondary max-w-md font-body">
            Commercial software engineering, full-stack application lifecycle, and production-tested API integrations.
          </p>
        </div>

        {/* Experience Cards Grid */}
        <div className="grid grid-cols-1 gap-8">
          {visibleExperiences.map((exp) => (
            <ExperienceCard key={exp.id} experience={exp} isTraining={false} />
          ))}
        </div>
      </div>
    </section>
  );
};

