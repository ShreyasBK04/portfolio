import { useEffect, useState } from 'react';

/**
 * Standard video controller hook for hero video autoplay, mute/unmute, and pause/play.
 * Completely free of ScrollTrigger or scroll scrubbing.
 */
export const useScrollVideo = ({ videoRef }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const video = videoRef?.current;
    if (!video) return;

    video.muted = true;
    setIsMuted(true);

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    video.addEventListener('play', onPlay);
    video.addEventListener('pause', onPause);

    return () => {
      video.removeEventListener('play', onPlay);
      video.removeEventListener('pause', onPause);
    };
  }, [videoRef]);

  const toggleMute = () => {
    const video = videoRef?.current;
    if (!video) return;
    const nextMuted = !video.muted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const togglePlay = () => {
    const video = videoRef?.current;
    if (!video) return;
    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return {
    isPlaying,
    isMuted,
    toggleMute,
    togglePlay
  };
};
