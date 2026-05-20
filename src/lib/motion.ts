import type { Variants } from "framer-motion";

const ease = [0.25, 0.1, 0.25, 1] as const;

/** Standard scroll-in: fade + slight rise. The whole site leans on this. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease },
  },
};

/** Container that staggers its children's fadeUp. */
export const stagger: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 1.2, ease } },
};

/** Shared viewport config so reveals fire once, a little before fully in view. */
export const viewport = { once: true, margin: "-80px" } as const;

export { ease };
