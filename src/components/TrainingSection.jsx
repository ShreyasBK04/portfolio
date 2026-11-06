import React from 'react';
import { trainings } from '../data/experience';
import { ExperienceCard } from './ExperienceCard';
import { GraduationCap, BookOpen } from 'lucide-react';

export const TrainingSection = () => {
  const visibleTrainings = trainings.filter((t) => t.visible !== false);

  if (visibleTrainings.length === 0) return null;

  return (
    <section id="training" className="editorial-section relative py-12 sm:py-20 bg-[#0E1017] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 border-b border-white/10 pb-6">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-mono text-[#FFAA32] mb-2 tracking-widest uppercase">
              <GraduationCap className="w-4 h-4" />
              <span>SCENE 03 // RIGOROUS UPSKILLING</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
              Training &amp; <span className="text-[#FFAA32]">Technical Development.</span>
            </h2>
            <div className="mt-2 inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded text-[11px] font-mono bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <span>Notice: Structured professional training curriculum (non-commercial employment)</span>
            </div>
          </div>
          <p className="mt-4 md:mt-0 text-sm text-content-secondary max-w-md font-body">
            Deep dive into Core Java systems, object-oriented paradigms, robust error handling, concurrency, and SQL fundamentals.
          </p>
        </div>

        {/* Training Cards */}
        <div className="grid grid-cols-1 gap-8">
          {visibleTrainings.map((trn) => (
            <ExperienceCard key={trn.id} experience={trn} isTraining={true} />
          ))}
        </div>
      </div>
    </section>
  );
};

