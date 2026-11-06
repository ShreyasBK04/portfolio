import React, { useRef, useEffect, useState } from 'react';
import { portfolioData } from '../data/portfolioData';
import { Volume2, VolumeX, Play, Pause, ChevronDown, Sparkles, Shield, Cpu, Compass } from 'lucide-react';
import { useScrollVideo } from '../hooks/useScrollVideo';
import { formatTime, STORY_MILESTONES, getCurrentMilestone } from '../animations/videoScrubbing';

export const CinematicVideo = () => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [userInteracted, setUserInteracted] = useState(false);

  const {
    duration,
    currentTime,
    progress,
    isLoaded,
    isMuted,
    isPlayingManual,
    toggleMute,
    togglePlay
  } = useScrollVideo({
    videoRef,
    containerRef,
    isScrollBound: true
  });

  const activeMilestone = getCurrentMilestone(progress);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full h-screen bg-[#090A0D] overflow-hidden select-none"
    >
      {/* Background Video Canvas / Video Layer */}
      <div className="absolute inset-0 w-full h-full flex items-center justify-center">
        <video
          ref={videoRef}
          src={portfolioData.assets.heroVideo}
          poster="/videos/hero-battle-poster.jpg"
          playsInline
          muted={isMuted}
          preload="auto"
          className="w-full h-full object-cover object-center filter brightness-[0.92] contrast-[1.05]"
          onPlay={() => setUserInteracted(true)}
        />
        
        {/* Cinematic Vignette & Edge Shadowing */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#090A0D] via-transparent to-[#090A0D]/70 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#090A0D]/80 via-transparent to-[#090A0D]/80 pointer-events-none" />
        <div className="absolute inset-0 radial-vignette pointer-events-none" />
      </div>

      {/* Top Narrative Pillar Pill */}
      <div className="absolute top-20 sm:top-24 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#151820]/80 border border-white/10 backdrop-blur-md">
        <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
        <span className="text-[10px] sm:text-xs font-semibold tracking-widest text-[#FFAA32] uppercase font-display">
          {activeMilestone.label} — {activeMilestone.title}
        </span>
      </div>

      {/* Narrative Overlays mapped to Scroll Progress */}
      {/* SCENE 01: THE CHALLENGE (0% - 30% Progress) */}
      <div
        className={`absolute inset-0 z-20 flex flex-col justify-center max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 transition-all duration-700 pointer-events-none ${
          progress < 0.32 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8 pointer-events-none'
        }`}
      >
        <div className="max-w-2xl text-left pointer-events-auto">
          {/* Eyebrow */}
          <div className="inline-flex items-center space-x-2 px-3 py-1 mb-4 rounded-md bg-[#151820]/90 border border-white/10 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span className="text-xs font-bold tracking-widest text-[#FFAA32] font-display uppercase">
              {portfolioData.portfolioTitle}
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-display tracking-tight text-white leading-[1.08] mb-4">
            Hi, I'm <span className="text-gradient-orange">{portfolioData.name}.</span>
          </h1>

          {/* Professional Title */}
          <p className="text-lg sm:text-2xl font-medium text-accent font-display tracking-wide mb-4">
            {portfolioData.professionalTitle}
          </p>

          {/* Personal Introduction */}
          <p className="text-sm sm:text-base lg:text-lg text-content-secondary leading-relaxed font-body max-w-xl mb-8 bg-[#090A0D]/60 p-3.5 rounded-lg border border-white/5 backdrop-blur-sm">
            "{portfolioData.personalIntro}"
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <a
              href="#projects"
              className="px-6 py-3 rounded-lg bg-accent hover:bg-[#FFAA32] text-black font-display font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-200 shadow-glow-md flex items-center space-x-2"
            >
              <span>Explore My Work</span>
            </a>

            <a
              href={portfolioData.assets.resumePdf}
              download="Shreyas_BK_Resume.pdf"
              className="px-6 py-3 rounded-lg bg-[#151820]/90 hover:bg-[#1a1e28] text-white border border-white/15 hover:border-accent text-xs sm:text-sm font-semibold tracking-wide transition-all duration-200 backdrop-blur-sm flex items-center space-x-2"
            >
              <span>Download Resume</span>
            </a>
          </div>
        </div>
      </div>

      {/* MID-SCENE COMBAT HIGHLIGHT (33% - 68% Progress) */}
      <div
        className={`absolute inset-0 z-20 flex flex-col items-end justify-center max-w-7xl mx-auto px-6 sm:px-12 pointer-events-none transition-all duration-700 ${
          progress >= 0.33 && progress <= 0.68 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="max-w-md bg-[#090A0D]/75 backdrop-blur-md p-6 rounded-xl border border-white/10 text-right pointer-events-auto">
          <div className="inline-flex items-center space-x-2 mb-2 text-accent text-xs font-mono">
            <Cpu className="w-4 h-4 text-accent" />
            <span>CORE PHILOSOPHY</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-display text-white mb-2 leading-snug">
            Engineering Under Pressure
          </h3>
          <p className="text-xs sm:text-sm text-content-secondary leading-relaxed mb-4">
            "{portfolioData.philosophy}"
          </p>
          <div className="flex items-center justify-end space-x-2 text-[11px] font-mono text-[#FFAA32]">
            <span>Full-Stack Discipline</span>
            <span>•</span>
            <span>AI Orchestration</span>
          </div>
        </div>
      </div>

      {/* SCENE 07: THE VICTORY (72% - 100% Progress) */}
      <div
        className={`absolute inset-0 z-20 flex flex-col justify-end pb-24 sm:pb-28 max-w-7xl mx-auto px-6 sm:px-12 transition-all duration-700 pointer-events-none ${
          progress > 0.72 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="max-w-xl bg-[#090A0D]/85 backdrop-blur-md p-6 sm:p-8 rounded-xl border border-accent/40 shadow-glow-md pointer-events-auto">
          <div className="inline-flex items-center space-x-2 text-xs font-mono text-accent mb-2">
            <Shield className="w-4 h-4" />
            <span className="tracking-widest uppercase font-display">{portfolioData.victory.tagline}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-white mb-3 tracking-tight">
            "{portfolioData.victory.heading}"
          </h2>
          <p className="text-xs sm:text-sm text-content-secondary leading-relaxed mb-5">
            "{portfolioData.victory.quote}"
          </p>
          <div className="flex items-center space-x-3">
            <a
              href="#experience"
              className="px-4 py-2 rounded-md bg-accent text-black font-display font-bold text-xs uppercase tracking-wide hover:bg-[#FFAA32] transition-colors"
            >
              Discover Journey & Experience
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Cinematic Control Deck */}
      <div className="absolute bottom-4 sm:bottom-6 left-0 right-0 z-30 px-4 sm:px-8 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#090A0D]/60 backdrop-blur-md py-2.5 px-4 rounded-lg border border-white/5">
        
        {/* Left: Timecode and Interactive Controls */}
        <div className="flex items-center space-x-3">
          <button
            onClick={togglePlay}
            className="flex items-center space-x-1.5 px-2.5 py-1 rounded bg-[#151820] border border-white/10 hover:border-accent text-white text-xs font-mono transition-colors"
            title={isPlayingManual ? "Pause continuous playback" : "Play continuous cinematic with sound"}
          >
            {isPlayingManual ? <Pause className="w-3.5 h-3.5 text-accent" /> : <Play className="w-3.5 h-3.5 text-accent" />}
            <span>{isPlayingManual ? "Pause" : "Play Reel"}</span>
          </button>

          <button
            onClick={toggleMute}
            className="flex items-center space-x-1.5 px-2.5 py-1 rounded bg-[#151820] border border-white/10 hover:border-accent text-white text-xs font-mono transition-colors"
            title={isMuted ? "Unmute original sound & audio" : "Mute audio"}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-content-secondary" /> : <Volume2 className="w-3.5 h-3.5 text-accent" />}
            <span>{isMuted ? "Audio Muted" : "Audio On"}</span>
          </button>

          <div className="hidden sm:block text-[11px] font-mono text-[#A5A9B2] border-l border-white/10 pl-3">
            <span>{formatTime(currentTime)}</span>
            <span className="mx-1 text-white/30">/</span>
            <span>{formatTime(duration || 10)}</span>
          </div>
        </div>

        {/* Center: Scroll progress track */}
        <div className="w-full sm:w-1/3 flex items-center space-x-2">
          <div className="relative w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-[#FF7900] to-[#FFAA32] rounded-full transition-all duration-75"
              style={{ width: `${Math.min(100, Math.max(0, progress * 100))}%` }}
            />
          </div>
          <span className="text-[10px] font-mono text-accent min-w-[32px]">
            {Math.round(progress * 100)}%
          </span>
        </div>

        {/* Right: Scroll instruction helper */}
        <div className="hidden sm:flex items-center space-x-1.5 text-xs text-content-secondary">
          <ChevronDown className="w-4 h-4 text-accent animate-bounce" />
          <span className="font-mono text-[11px] tracking-wide">
            {progress > 0.85 ? "Keep scrolling for projects & stack" : "Scroll to control cinematic battle"}
          </span>
        </div>
      </div>
    </section>
  );
};

