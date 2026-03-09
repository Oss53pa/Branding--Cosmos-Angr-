/* ═══════════════════════════════════════════════════
   Shared color helpers for scenario-dynamic mockups
   ═══════════════════════════════════════════════════ */

export const hexToRgb = (hex: string): [number, number, number] => {
  const h = hex.replace('#', '');
  return [parseInt(h.substring(0, 2), 16), parseInt(h.substring(2, 4), 16), parseInt(h.substring(4, 6), 16)];
};

export const rgbToHex = (r: number, g: number, b: number): string =>
  '#' + [r, g, b].map(v => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('');

export const lightenHex = (hex: string, amount: number): string => {
  const [r, g, b] = hexToRgb(hex);
  return rgbToHex(r + (255 - r) * amount, g + (255 - g) * amount, b + (255 - b) * amount);
};

export const darkenHex = (hex: string, amount: number): string => {
  const [r, g, b] = hexToRgb(hex);
  return rgbToHex(r * (1 - amount), g * (1 - amount), b * (1 - amount));
};

export const hexRgba = (hex: string, opacity: number): string => {
  const [r, g, b] = hexToRgb(hex);
  return `rgba(${r},${g},${b},${opacity})`;
};

export const mixHex = (hex1: string, hex2: string, weight: number): string => {
  const [r1, g1, b1] = hexToRgb(hex1);
  const [r2, g2, b2] = hexToRgb(hex2);
  return rgbToHex(r1 * weight + r2 * (1 - weight), g1 * weight + g2 * (1 - weight), b1 * weight + b2 * (1 - weight));
};
