// Easing function for smooth animations (expo ease-out)
export const EASE_OUT_EXPO: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Elastic easing for bouncy text animations
export const EASE_ELASTIC: [number, number, number, number] = [0.68, -0.55, 0.265, 1.55];

// Animation durations in seconds
export const ANIMATION_DURATION = {
  fast: 0.3,
  normal: 0.5,
  medium: 0.6,
  slow: 0.8,
} as const;

// Animation durations in milliseconds
export const ANIMATION_DURATION_MS = {
  preloader: 2000,
  progressInterval: 150,
  counterDuration: 2000,
} as const;

// Movement offsets in pixels
export const MOVEMENT_OFFSET = {
  scrollReveal: 40,
} as const;

// Viewport margin for intersection observer
export const VIEWPORT_MARGIN = "-100px";

// Ring rotation durations in seconds
export const RING_ROTATION_DURATION = {
  inner: 20,
  middle: 30,
  outer: 40,
} as const;

// Spring animation configs
export const SPRING_CONFIG = {
  activeSection: { stiffness: 380, damping: 30 },
  bounce: { stiffness: 300, damping: 30 },
} as const;
