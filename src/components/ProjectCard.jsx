import React, { useState } from 'react';
import { ExternalLink, CheckCircle, Sparkles, FileText, Cpu } from 'lucide-react';
import { GithubIcon } from './Icons';

/**
 * Built-in Application Interface Mockup Fallback
 * Renders if an external image asset fails to load,
 * ensuring zero broken image icons or blank black voids.
 */
const FallbackAppMockup = ({ project }) => {
  const isContractIQ = project.title.toLowerCase().includes('contractiq');

  return (
    <div className="w-full h-full bg-[#111319] p-4 sm:p-5 flex flex-col justify-between text-left select-none">
      {/* Window Title Bar */}
      <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2">
        <div className="flex items-center space-x-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
        </div>
        <span className="text-[10px] font-mono text-content-muted bg-[#090A0D] px-2.5 py-0.5 rounded border border-white/5">
          {isContractIQ ? 'contractiq.internal/analyzer' : 'chrome-extension://ai-assistant'}
        </span>
        <span className="text-[9px] font-mono text-accent">Active Service</span>
      </div>

      {/* Mockup Content */}
      {isContractIQ ? (
        <div className="grid grid-cols-2 gap-2.5 flex-1">
          {/* Left: Document Clauses */}
          <div className="bg-[#090A0D]/70 p-3 rounded-lg border border-white/5 flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-1.5 text-[10px] font-mono text-[#FFAA32] mb-1">
                <FileText className="w-3.5 h-3.5 text-accent" />
                <span>Vendor_Agreement.pdf</span>
              </div>
              <div className="p-2 bg-red-500/10 border border-red-500/20 rounded text-[9px] text-content-secondary mt-1 leading-relaxed">
                <span className="text-red-400 font-bold block mb-0.5">§ 9.2 Liability Flag</span>
                "Uncapped aggregate indemnification detected..."
              </div>
            </div>
            <span className="text-[9px] font-mono text-content-muted">Spring Boot Ingested</span>
          </div>

          {/* Right: AI Risk Breakdown */}
          <div className="bg-[#090A0D]/70 p-3 rounded-lg border border-accent/25 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono text-accent font-bold">AI Risk Engine</span>
                <span className="text-[10px] font-mono bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded font-bold">78/100</span>
              </div>
              <p className="text-[9px] text-content-secondary leading-relaxed mt-1">
                Mitigation: Cap damages to trailing 12-month fees via standard limitation rider.
              </p>
            </div>
            <div className="flex items-center space-x-1 text-[8px] font-mono text-emerald-400">
              <span>✓ Gemini Pro Evaluated</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-[#090A0D]/70 p-3 sm:p-4 rounded-lg border border-white/5 flex flex-col justify-between flex-1">
          <div>
            <div className="flex items-center justify-between text-[10px] font-mono text-accent mb-2">
              <span className="flex items-center space-x-1.5">
                <Cpu className="w-3.5 h-3.5" />
                <span>Chrome Side Panel UI</span>
              </span>
              <span className="text-[9px] text-emerald-400">Connected</span>
            </div>
            <div className="p-2.5 rounded bg-[#151820] border border-white/5 text-[9px] text-content-secondary space-y-1">
              <span className="text-[#FFAA32] font-semibold block">Highlighted Research Context:</span>
              <p className="line-clamp-2 italic text-content-muted">
                "Spring Boot WebClient async reactive streams integrated with Gemini API..."
              </p>
            </div>
          </div>
          <span className="text-[9px] font-mono text-content-muted">Manifest V3 • Spring Boot REST</span>
        </div>
      )}

      {/* Footer Pill */}
      <div className="mt-2 pt-1 border-t border-white/5 flex items-center justify-between text-[9px] font-mono text-content-muted">
        <span>Application UI Preview</span>
        <span className="text-[#FFAA32]">System Operational</span>
      </div>
    </div>
  );
};

export const ProjectCard = ({ project, index = 0, isHorizontal = false, isActive = false }) => {
  const [imageError, setImageError] = useState(false);

  if (!project || project.visible === false) return null;

  const projectNumber = String(index + 1).padStart(2, '0');

  return (
    <article
      tabIndex={0}
      aria-label={`${project.title} project`}
      className={`relative group bg-bg-card rounded-2xl border transition-all duration-500 hover:shadow-glow-sm focus:outline-none focus:border-accent select-none flex flex-col justify-between ${
        isActive
          ? 'border-accent/60 shadow-glow-sm ring-1 ring-accent/30'
          : 'border-white/10 hover:border-accent/40'
      } ${
        isHorizontal
          ? 'w-[76vw] max-w-[1140px] min-w-[760px] shrink-0 lg:h-[calc(100vh-200px)] max-h-[660px] p-6 lg:p-7 xl:p-8'
          : 'w-full p-6 sm:p-8'
      }`}
    >
      {/* Header Bar: Project Number & Category */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4 shrink-0">
        <div className="flex items-center space-x-3">
          <span className="text-xl lg:text-2xl font-black font-display text-gradient-orange tracking-tight">
            {projectNumber} //
          </span>
          <span className="text-xs sm:text-sm font-mono text-[#FFAA32] uppercase tracking-wider font-semibold">
            {project.category || 'System Architecture'}
          </span>
        </div>

        {project.featured && (
          <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#090A0D] border border-accent/40 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span className="text-[11px] font-bold text-accent font-display uppercase tracking-wider">
              Featured Project
            </span>
          </div>
        )}
      </div>

      {/* Main 2-Column Presentation: Large Screenshot Preview on Left, Details on Right */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 xl:gap-10 items-stretch flex-1 overflow-hidden py-1">
        
        {/* LEFT COLUMN: Large High-Visibility Application Screenshot */}
        <div className="w-full lg:w-[48%] flex flex-col justify-center shrink-0">
          <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-[#090A0D] border border-white/15 group-hover:border-accent/50 transition-all duration-300 shadow-xl">
            {!imageError && project.image ? (
              <img
                src={project.image}
                alt={`${project.title} Interface Screenshot`}
                onError={() => setImageError(true)}
                className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
                loading="lazy"
              />
            ) : (
              <FallbackAppMockup project={project} />
            )}

            {/* Subtle Gradient Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#090A0D]/50 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>

        {/* RIGHT COLUMN: Project Information & Specs */}
        <div className="w-full lg:w-[52%] flex flex-col justify-between h-full space-y-3 overflow-hidden">
          <div className="space-y-2.5 overflow-hidden">
            {/* Title — Unconstrained wrapping, bold Space Grotesk */}
            <h3 className="text-xl sm:text-2xl xl:text-3xl font-extrabold font-display text-white tracking-tight leading-snug group-hover:text-gradient-orange transition-colors">
              {project.title}
            </h3>

            {/* Subtitle / Tagline */}
            {project.tagline && (
              <p className="text-xs sm:text-sm font-semibold text-accent font-display leading-tight">
                {project.tagline}
              </p>
            )}

            {/* Description — Readable leading and sizing */}
            <p className="text-xs sm:text-sm text-content-secondary leading-relaxed font-body">
              {project.description}
            </p>

            {/* Key Technical Capabilities — Full text without truncation */}
            {project.features && project.features.length > 0 && (
              <div className="space-y-1.5 p-3 rounded-xl bg-[#090A0D]/75 border border-white/5">
                <span className="text-[10px] font-mono text-[#FFAA32] uppercase tracking-wider block font-semibold mb-1">
                  Key Technical Capabilities:
                </span>
                {project.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start space-x-2 text-xs text-content-secondary leading-snug">
                    <CheckCircle className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Bottom Area: Technology Tags & Links */}
          <div className="pt-2 border-t border-white/10 shrink-0">
            {/* Technology Tags */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {project.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-0.5 rounded bg-[#FF7900]/10 text-[#FFAA32] border border-[#FF7900]/25 text-[11px] font-mono font-medium hover:border-[#FF7900]/50 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Action Links — Subtle outlined buttons with orange hover */}
            <div className="flex flex-wrap items-center gap-3">
              {project.githubUrl && project.githubUrl.trim() !== '' && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-[#151820]/80 border border-white/15 hover:border-accent text-white hover:text-accent text-xs font-semibold tracking-wide transition-all duration-200 hover:shadow-glow-sm"
                >
                  <GithubIcon className="w-3.5 h-3.5 text-accent" />
                  <span>GitHub Repository</span>
                </a>
              )}

              {project.liveUrl && project.liveUrl.trim() !== '' && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-[#151820]/80 border border-white/15 hover:border-accent text-white hover:text-accent text-xs font-semibold tracking-wide transition-all duration-200 hover:shadow-glow-sm"
                >
                  <span>Live Demo</span>
                  <ExternalLink className="w-3.5 h-3.5 text-accent" />
                </a>
              )}
            </div>
          </div>

        </div>
      </div>
    </article>
  );
};
