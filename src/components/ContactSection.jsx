import React, { useState } from 'react';
import { portfolioData } from '../data/portfolioData';
import { socialLinks } from '../data/socialLinks';
import { Mail, Phone, MapPin, Code2, FileText, Check, Copy, ArrowUpRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon, LeetCodeIcon } from './Icons';

const iconMap = {
  Mail,
  Linkedin: LinkedinIcon,
  Github: GithubIcon,
  Code2: LeetCodeIcon,
  FileText
};

export const ContactSection = () => {
  const [copied, setCopied] = useState(false);
  const visibleLinks = socialLinks.filter((l) => l.visible !== false);

  const copyEmail = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(portfolioData.contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const mailtoSubject = encodeURIComponent("Opportunity to Connect – Shreyas B K");
  const letsTalkUrl = `mailto:${portfolioData.contact.email}?subject=${mailtoSubject}`;

  return (
    <section id="contact" className="editorial-section relative py-20 sm:py-28 bg-[#090A0D] border-t border-white/10 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-4xl mx-auto text-center mb-14">
          
          {/* 1. AVAILABILITY INDICATOR */}
          <div className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-[#151820]/90 border border-white/10 text-xs font-mono tracking-widest uppercase mb-6 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
            </span>
            <span className="text-emerald-400 font-semibold tracking-wider text-[11px]">
              OPEN TO FULL-TIME OPPORTUNITIES
            </span>
          </div>

          {/* Scene Eyebrow */}
          <div className="text-xs font-mono text-accent mb-3 tracking-widest uppercase block">
            <span>SCENE 08 // CONNECT &amp; COLLABORATE</span>
          </div>
          
          {/* 2. MAIN HEADING */}
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display text-white tracking-tight leading-[1.15] mb-5">
            "{portfolioData.contact.heading}"
          </h2>

          <p className="text-base sm:text-lg text-content-secondary max-w-2xl mx-auto font-body leading-relaxed">
            {portfolioData.contact.subheading}
          </p>

          {/* 3. CONTACT DETAILS */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {/* Email card with mailto & copy button */}
            <div className="inline-flex items-center space-x-3 p-2 pl-4 rounded-xl bg-bg-card border border-white/10 hover:border-accent/40 transition-colors">
              <a
                href={`mailto:${portfolioData.contact.email}`}
                className="flex items-center space-x-2 text-xs sm:text-sm font-mono text-white hover:text-accent transition-colors"
                title="Send email via default client"
              >
                <Mail className="w-4 h-4 text-accent shrink-0" />
                <span className="select-all">{portfolioData.contact.email}</span>
              </a>
              <button
                onClick={copyEmail}
                className="px-3 py-1.5 rounded-lg bg-[#090A0D] border border-white/10 hover:border-accent text-xs font-mono text-content-secondary hover:text-white transition-all flex items-center space-x-1.5 active:scale-95"
                title="Copy email address"
                aria-label="Copy email address"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span className={copied ? "text-emerald-400 font-semibold" : ""}>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            {/* Phone link */}
            {portfolioData.contact.phone && (
              <a
                href={`tel:${portfolioData.contact.phone.replace(/[\s\-\(\)]/g, '')}`}
                className="inline-flex items-center space-x-2 py-2.5 px-4 rounded-xl bg-bg-card border border-white/10 hover:border-accent/40 text-xs sm:text-sm font-mono text-white hover:text-accent transition-colors"
                title={`Call ${portfolioData.contact.phone}`}
              >
                <Phone className="w-4 h-4 text-accent" />
                <span>{portfolioData.contact.phone}</span>
              </a>
            )}

            {/* Location indicator */}
            {portfolioData.contact.location && (
              <div className="inline-flex items-center space-x-2 py-2.5 px-4 rounded-xl bg-bg-card border border-white/10 text-xs sm:text-sm font-mono text-content-secondary">
                <MapPin className="w-4 h-4 text-accent/70" />
                <span>{portfolioData.contact.location}</span>
              </div>
            )}
          </div>

          {/* 6. LET'S TALK BUTTON */}
          <div className="mt-8">
            <a
              href={letsTalkUrl}
              className="inline-flex items-center space-x-2.5 px-8 py-3.5 sm:py-4 rounded-xl bg-accent hover:bg-[#FFAA32] text-[#090A0D] font-display font-extrabold text-sm sm:text-base tracking-wider uppercase transition-all duration-200 hover:-translate-y-0.5 hover:shadow-glow active:translate-y-0 shadow-glow-sm"
            >
              <span>LET'S TALK</span>
              <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
            </a>
          </div>

        </div>

        {/* 4 & 5. SOCIAL LINKS & RESUME DOWNLOAD */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {visibleLinks.map((link) => {
            const IconComponent = iconMap[link.icon] || Mail;

            return (
              <a
                key={link.name}
                href={link.url}
                download={link.isDownload ? "Shreyas_BK_Resume.pdf" : undefined}
                target={link.isDownload ? undefined : "_blank"}
                rel={link.isDownload ? undefined : "noopener noreferrer"}
                className="group p-5 rounded-xl bg-bg-card border border-white/10 hover:border-accent hover:-translate-y-1 hover:shadow-glow-sm transition-all duration-300 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-[#090A0D] border border-white/10 flex items-center justify-center text-accent group-hover:border-accent/50 group-hover:text-[#FFAA32] transition-colors">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-content-muted group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>

                <div>
                  <h4 className="text-base font-bold font-display text-white group-hover:text-white transition-colors">
                    {link.name}
                  </h4>
                  <p className="text-xs font-mono text-content-secondary truncate mt-0.5">
                    {link.handle}
                  </p>
                </div>
              </a>
            );
          })}
        </div>

      </div>
    </section>
  );
};
