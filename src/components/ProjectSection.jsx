import React from 'react';
import { projects } from '../data/projects';
import { ProjectCard } from './ProjectCard';
import { Layers } from 'lucide-react';

export const ProjectSection = () => {
  const visibleProjects = projects.filter((p) => p.visible !== false);

  return (
    <section id="projects" className="editorial-section relative py-20 sm:py-28 bg-[#090A0D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 border-b border-white/10 pb-6">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-mono text-accent mb-2 tracking-widest uppercase">
              <Layers className="w-4 h-4" />
              <span>SCENE 04 // APPLIED ENGINEERING</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight">
              Featured <span className="text-gradient-orange">Projects.</span>
            </h2>
          </div>
          <p className="mt-3 md:mt-0 text-sm sm:text-base text-content-secondary max-w-md font-body">
            Real-world systems combining Java &amp; Spring Boot microservices with generative AI models and reactive frontends.
          </p>
        </div>

        {/* Project Cards List */}
        <div className="space-y-12">
          {visibleProjects.map((project, idx) => (
            <ProjectCard key={project.id} project={project} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

