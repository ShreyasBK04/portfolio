import React, { useRef, useEffect, useState } from 'react';
import { portfolioData } from '../data/portfolioData';
import { Volume2, VolumeX, Play, Pause, Sparkles, ChevronDown } from 'lucide-react';

export const CinematicVideo = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  // Autoplay on mount with browser compatibility handling
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Start muted for autoplay policy
    video.muted = true;
    setIsMuted(true);

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // Fallback if autoplay was delayed or restricted
          setIsPlaying(false);
        });
    }

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    video.addEventListener('play', onPlay);
    video.addEventListener('pause', onPause);

    return () => {
      video.removeEventListener('play', onPlay);
      video.removeEventListener('pause', onPause);
    };
  }, []);

  // Toggle Mute / Unmute
  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    const nextMuted = !video.muted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  // Toggle Play / Pause
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex items-center justify-center bg-[#090A0D] overflow-hidden select-none"
    >
      {/* Background Video Layer - Plays independently, looping normally */}
      <div className="absolute inset-0 w-full h-full flex items-center justify-center">
        <video
          ref={videoRef}
          src={portfolioData.assets.heroVideo}
          poster="/videos/hero-battle-poster.jpg"
          autoPlay
          loop
          muted={isMuted}
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-center filter brightness-[0.92] contrast-[1.05]"
        />
        
        {/* Cinematic Vignette & Edge Shadowing */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#090A0D] via-transparent to-[#090A0D]/75 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#090A0D]/85 via-transparent to-[#090A0D]/85 pointer-events-none" />
      </div>

      {/* Top Narrative Pillar Pill */}
      <div className="absolute top-20 sm:top-24 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#151820]/80 border border-white/10 backdrop-blur-md">
        <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
        <span className="text-[10px] sm:text-xs font-semibold tracking-widest text-[#FFAA32] uppercase font-display">
          SCENE 01 // THE CHALLENGE
        </span>
      </div>

      {/* Main Hero Narrative Overlay */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-24 pb-20 flex flex-col justify-center">
        <div className="max-w-2xl text-left">
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

          {/* Action Buttons */}
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

      {/* Bottom Cinematic Control Deck (Audio On/Off and Pause/Play) */}
      <div className="absolute bottom-4 sm:bottom-6 left-0 right-0 z-30 px-4 sm:px-8 max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Play/Pause & Audio Toggle Buttons */}
        <div className="flex items-center space-x-3 bg-[#090A0D]/80 backdrop-blur-md py-2 px-3 rounded-lg border border-white/10">
          <button
            onClick={togglePlay}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded bg-[#151820] border border-white/10 hover:border-accent text-white text-xs font-mono transition-colors"
            title={isPlaying ? "Pause cinematic video" : "Play cinematic video"}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 text-accent" /> : <Play className="w-3.5 h-3.5 text-accent" />}
            <span>{isPlaying ? "Pause" : "Play Reel"}</span>
          </button>

          <button
            onClick={toggleMute}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded bg-[#151820] border border-white/10 hover:border-accent text-white text-xs font-mono transition-colors"
            title={isMuted ? "Unmute audio" : "Mute audio"}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-content-secondary" /> : <Volume2 className="w-3.5 h-3.5 text-accent" />}
            <span>{isMuted ? "Audio Muted" : "Audio On"}</span>
          </button>
        </div>

        {/* Scroll down indicator */}
        <a
          href="#experience"
          className="hidden sm:flex items-center space-x-1.5 text-xs text-content-secondary bg-[#090A0D]/80 backdrop-blur-md py-2 px-3.5 rounded-lg border border-white/10 hover:text-white hover:border-accent/40 transition-colors"
        >
          <span className="font-mono text-[11px] tracking-wide">Scroll Down</span>
          <ChevronDown className="w-4 h-4 text-accent animate-bounce" />
        </a>
      </div>
    </section>
  );
};
