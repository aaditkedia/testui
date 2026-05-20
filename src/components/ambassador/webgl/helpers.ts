export const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const remap = (v: number, a: number, b: number, c: number, d: number) =>
  c + ((v - a) / (b - a)) * (d - c);

/** fade-in 0..0.15, hold, fade-out 0.85..1 */
export function window01(t: number): number {
  if (t <= 0 || t >= 1) return 0;
  if (t < 0.15) return t / 0.15;
  if (t > 0.85) return (1 - t) / 0.15;
  return 1;
}

/** progress within act i of n */
export const localAct = (p: number, n: number, i: number) => clamp01(p * n - i);
/** visibility weight for act i of n */
export const visAct = (p: number, n: number, i: number) => window01(p * n - i);
