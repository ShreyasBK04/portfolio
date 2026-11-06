/**
 * Video scrubbing helper calculations & milestone indicators.
 */

export const STORY_MILESTONES = [
  { progress: 0.05, label: "THE CHALLENGE", title: "Human Engineer vs Autonomous Titan" },
  { progress: 0.35, label: "THE ENGAGEMENT", title: "Chaining Complexity with Code" },
  { progress: 0.65, label: "THE TURNING POINT", title: "Harnessing Intelligent Energy" },
  { progress: 0.92, label: "THE VICTORY", title: "Mastery & The Futuristic City" },
];

/**
 * Format seconds into mm:ss.ms
 */
export const formatTime = (seconds) => {
  if (isNaN(seconds) || seconds < 0) return "00:00.0";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  const ms = Math.floor((seconds % 1) * 10);
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}.${ms}`;
};

/**
 * Returns current story milestone for a given scroll progress
 */
export const getCurrentMilestone = (progress) => {
  let active = STORY_MILESTONES[0];
  for (let i = 0; i < STORY_MILESTONES.length; i++) {
    if (progress >= STORY_MILESTONES[i].progress) {
      active = STORY_MILESTONES[i];
    }
  }
  return active;
};

