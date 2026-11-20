// Motion tokens — same values as the Figma prototype spec.
export const ease = {
  standard: [0.2, 0, 0, 1],
  expoOut: [0.16, 1, 0.3, 1],
  exit: [0.4, 0, 1, 1],
}

export const t = {
  quick: { duration: 0.16, ease: ease.standard },
  medium: { duration: 0.32, ease: ease.standard },
  slow: { duration: 0.56, ease: ease.expoOut },
  exit: { duration: 0.2, ease: ease.exit },
  press: { type: 'spring', stiffness: 400, damping: 30, mass: 1 },
}

export const STEP = 0.06 // stagger between items (seconds)

export const RISE = () => (typeof window !== 'undefined' && window.innerWidth < 768 ? 16 : 24)

// Fade-up used for scroll reveals
export const fadeUp = {
  hidden: { opacity: 0, y: RISE() },
  show: { opacity: 1, y: 0, transition: t.slow },
}
