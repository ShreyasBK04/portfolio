import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Custom Hook: useScrollVideo
 * Binds HTML5 video playback and seeking to scroll progress using GSAP ScrollTrigger.
 * Includes lerped frame smoothing, seeking state protection, and audio management.
 */
export const useScrollVideo = ({ videoRef, containerRef, isScrollBound = true }) => {
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlayingManual, setIsPlayingManual] = useState(false);

  const targetTimeRef = useRef(0);
  const rafIdRef = useRef(null);
  const scrollTriggerInstanceRef = useRef(null);

  // Handle video metadata loaded
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      setDuration(video.duration || 10);
      setIsLoaded(true);
      video.pause();
      video.currentTime = 0.01; // Avoid black first frame
    };

    if (video.readyState >= 1) {
      handleLoadedMetadata();
    } else {
      video.addEventListener('loadedmetadata', handleLoadedMetadata);
    }

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [videoRef]);

  // Smooth lerp loop for scrubbing without decoder overload
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let isSeeking = false;

    const onSeeked = () => {
      isSeeking = false;
      if (video) setCurrentTime(video.currentTime);
    };

    video.addEventListener('seeked', onSeeked);

    const smoothUpdate = () => {
      if (isScrollBound && !isPlayingManual && video && duration > 0) {
        const target = targetTimeRef.current;
        const diff = Math.abs(video.currentTime - target);

        // Only update if difference is noticeable and decoder is not overwhelmed
        if (diff > 0.03 && !isSeeking) {
          try {
            isSeeking = true;
            if (typeof video.fastSeek === 'function') {
              video.fastSeek(target);
            } else {
              video.currentTime = target;
            }
          } catch {
            isSeeking = false;
          }
        }
      }
      rafIdRef.current = requestAnimationFrame(smoothUpdate);
    };

    rafIdRef.current = requestAnimationFrame(smoothUpdate);

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      video.removeEventListener('seeked', onSeeked);
    };
  }, [videoRef, isScrollBound, isPlayingManual, duration]);

  // Set up GSAP ScrollTrigger
  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    // Pinning the cinematic scene for the story duration
    const trigger = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: '+=350%', // Gives ~3.5 viewports of scroll depth for comfortable 10s playback
      pin: true,
      scrub: 0.8, // Smooth GSAP scrubbing
      anticipatePin: 1,
      onUpdate: (self) => {
        if (!isPlayingManual) {
          const scrollProgress = self.progress;
          setProgress(scrollProgress);
          const dur = video.duration || duration || 10;
          targetTimeRef.current = scrollProgress * dur;
        }
      }
    });

    scrollTriggerInstanceRef.current = trigger;

    return () => {
      if (trigger) trigger.kill();
    };
  }, [videoRef, containerRef, duration, isPlayingManual]);

  // Toggle Mute
  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    const nextMuted = !video.muted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  // Toggle Play / Pause preview mode
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlayingManual) {
      video.pause();
      setIsPlayingManual(false);
    } else {
      video.muted = false;
      setIsMuted(false);
      video.play().then(() => {
        setIsPlayingManual(true);
      }).catch(() => {
        // Fallback with mute if browser blocks unmuted play
        video.muted = true;
        setIsMuted(true);
        video.play();
        setIsPlayingManual(true);
      });
    }
  };

  return {
    duration,
    currentTime,
    progress,
    isLoaded,
    isMuted,
    isPlayingManual,
    toggleMute,
    togglePlay,
    scrollTrigger: scrollTriggerInstanceRef.current
  };
};

