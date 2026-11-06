import React from 'react';
import { ExternalLink, CheckCircle, Sparkles } from 'lucide-react';
import { GithubIcon } from './Icons';

export const ProjectCard = ({ project, index }) => {
  if (!project || project.visible === false) return null;

  const isReversed = index % 2 === 1;

  return (
    <div className="relative group bg-bg-card rounded-2xl border border-white/10 hover:border-accent/40 p-6 sm:p-8 transition-all duration-300 hover:shadow-glow-sm">
      <div className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 items-center`}>
        
        {/* Project Visual / Screenshot */}
        <div className="w-full lg:w-1/2 relative overflow-hidden rounded-xl bg-[#090A0D] border border-white/10 group-hover:border-accent/30 transition-all duration-300">
          <div className="aspect-[16/9] w-full relative overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            {/* Subtle overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#090A0D]/70 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Featured pill */}
          {project.featured && (
            <div className="absolute top-3 left-3 flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#090A0D]/80 border border-accent/40 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              <span className="text-[11px] font-bold text-accent font-display uppercase tracking-wider">
                Featured Engineering
              </span>
            </div>
          )}
        </div>

        {/* Project Content */}
        <div className="w-full lg:w-1/2 flex flex-col justify-between space-y-4">
          <div>
            <div className="text-xs font-mono text-[#FFAA32] tracking-wider uppercase mb-1">
              {project.category || 'System Architecture'}
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight group-hover:text-gradient-orange transition-all">
              {project.title}
            </h3>

            {project.tagline && (
              <p className="text-sm font-medium text-accent font-display mt-0.5 mb-3">
                {project.tagline}
              </p>
            )}

            <p className="text-sm text-content-secondary leading-relaxed font-body mb-5">
              {project.description}
            </p>

            {/* Feature Bullets */}
            {project.features && project.features.length > 0 && (
              <div className="space-y-1.5 mb-5 bg-[#090A0D]/50 p-3.5 rounded-xl border border-white/5">
                <span className="text-[11px] font-mono text-content-muted uppercase tracking-wider block mb-1">
                  Key Capabilities:
                </span>
                {project.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start space-x-2 text-xs text-content-secondary">
                    <CheckCircle className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Technologies */}
          <div>
            <div className="flex flex-wrap gap-1.5 mb-6">
              {project.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded bg-[#090A0D] text-[11px] font-mono text-content-main border border-white/10"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Links — Only rendered if URL exists */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-[#151820] border border-white/15 hover:border-accent text-white text-xs font-semibold tracking-wide transition-all duration-200"
                >
                  <GithubIcon className="w-4 h-4 text-accent" />
                  <span>View Repository</span>
                </a>
              )}

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-accent hover:bg-[#FFAA32] text-black text-xs font-bold font-display uppercase tracking-wider transition-all duration-200 shadow-glow-sm"
                >
                  <span>Live Application</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}

              {!project.githubUrl && !project.liveUrl && (
                <span className="text-[11px] font-mono text-content-muted italic">
                  Private Architecture &amp; Demo available upon interview
                </span>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
