// Scroll thresholds in pixels
export const SCROLL_THRESHOLD = {
  navbarBg: 50,
  sectionActive: 100,
  scrollToTop: 400,
} as const;

// Drag constraints configuration
export const DRAG_CONSTRAINTS = {
  padding: 40,
  elastic: 0.1,
  bounceStiffness: 300,
  bounceDamping: 30,
} as const;
