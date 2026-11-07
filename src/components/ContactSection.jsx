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

  const copyEmail = () => {
    navigator.clipboard.writeText(portfolioData.contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="editorial-section relative py-20 sm:py-32 bg-[#090A0D] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center space-x-2 text-xs font-mono text-accent mb-3 tracking-widest uppercase">
            <span>SCENE 08 // CONNECT</span>
          </div>
          
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display text-white tracking-tight leading-[1.1] mb-6">
            "{portfolioData.contact.heading}"
          </h2>

          <p className="text-base sm:text-lg text-content-secondary max-w-2xl mx-auto font-body">
            {portfolioData.contact.subheading}
          </p>

          {/* Direct Contact Info */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <div className="inline-flex items-center space-x-3 p-2 pl-4 rounded-xl bg-bg-card border border-white/10 hover:border-accent/40 transition-colors">
              <Mail className="w-4 h-4 text-accent" />
              <span className="text-xs sm:text-sm font-mono text-white select-all">
                {portfolioData.contact.email}
              </span>
              <button
                onClick={copyEmail}
                className="px-3 py-1.5 rounded-lg bg-[#090A0D] border border-white/10 hover:border-accent text-xs font-mono text-content-secondary hover:text-white transition-all flex items-center space-x-1"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            {portfolioData.contact.phone && (
              <a
                href={`tel:${portfolioData.contact.phone.replace(/\s+/g, '')}`}
                className="inline-flex items-center space-x-2 py-2.5 px-4 rounded-xl bg-bg-card border border-white/10 hover:border-accent/40 text-xs sm:text-sm font-mono text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-accent" />
                <span>{portfolioData.contact.phone}</span>
              </a>
            )}

            {portfolioData.contact.location && (
              <div className="inline-flex items-center space-x-2 py-2.5 px-4 rounded-xl bg-bg-card border border-white/10 text-xs sm:text-sm font-mono text-content-secondary">
                <MapPin className="w-4 h-4 text-accent/70" />
                <span>{portfolioData.contact.location}</span>
              </div>
            )}
          </div>
        </div>

        {/* Social / Professional Profiles Grid */}
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
                className="group p-5 rounded-xl bg-bg-card border border-white/10 hover:border-accent/50 transition-all duration-300 hover:shadow-glow-sm flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-[#090A0D] border border-white/10 flex items-center justify-center text-accent group-hover:border-accent/50 group-hover:text-[#FFAA32] transition-colors">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-content-muted group-hover:text-accent transition-colors" />
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
