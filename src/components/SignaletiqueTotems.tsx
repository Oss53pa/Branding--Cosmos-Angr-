import React, { useState } from 'react';
import type { ScenarioKey } from './Scenarios';
import { hexToRgb, rgbToHex, lightenHex, darkenHex, hexRgba, mixHex } from './colorUtils';

interface ScColors {
  primary: string;
  dark: string;
  accent: string;
  secondary: string;
  light: string;
  tagline: string;
  tagline2: string;
  textOnDark: string;
}

const sc: Record<ScenarioKey, ScColors> = {
  A: { primary: '#2F5439', dark: '#1A1410', accent: '#C9943A', secondary: '#F2EBDD', light: '#76764D', tagline: 'Le quartier que vous méritez', tagline2: 'Enfin tout, enfin ici', textOnDark: '#fff' },
  B: { primary: '#0D1B4B', dark: '#060E2A', accent: '#B8924A', secondary: '#F2EBDD', light: '#1A3060', tagline: 'Un monde à part', tagline2: "Vivez l'exception", textOnDark: '#D4B06A' },
  C: { primary: '#B25A38', dark: '#2C1A0A', accent: '#C9943A', secondary: '#F2EBDD', light: '#6D7447', tagline: "L'exception, tout simplement", tagline2: "L'exceptionnel, au quotidien", textOnDark: '#fff' },
  D: { primary: '#898D5D', dark: '#1C2215', accent: '#D4A843', secondary: '#F5F0E4', light: '#6B7A4A', tagline: 'Ici, on vit quelque chose', tagline2: 'Nature Contemporaine', textOnDark: '#fff' },
};

const signPal: Record<ScenarioKey, { f1: string; f2: string; f3: string; side: string }> = {
  A: { f1: '#1e3829', f2: '#2F5439', f3: '#3a6645', side: '#0e2018' },
  B: { f1: '#081230', f2: '#0D1B4B', f3: '#1a3065', side: '#04091a' },
  C: { f1: '#7A3A1E', f2: '#B25A38', f3: '#D47850', side: '#4A2010' },
  D: { f1: '#2A3320', f2: '#898D5D', f3: '#A5A97A', side: '#1C2215' },
};

const stageBg: Record<ScenarioKey, string> = {
  A: 'linear-gradient(160deg,#c8d4c0,#a0b09a)',
  B: 'linear-gradient(160deg,#c0c8d4,#9aa0b0)',
  C: 'linear-gradient(160deg,#d4c8c0,#b09a90)',
  D: 'linear-gradient(160deg,#c8d4c0,#a0b498)',
};

const tabs = [
  { id: 'totem', label: 'Totem entrée', role: '1 / 5', name: 'Totem entrée', spec: 'Aluminium laqué · Chapeau plaqué or · H 2,80 m × L 0,60 m · Backlit LED · Socle béton sablé' },
  { id: 'dir', label: 'Directionnel', role: '2 / 5', name: 'Panneau directionnel', spec: '4 bras · Mât or brossé · Aluminium laqué · Flèches or · H 3,50 m · Vinyle rétroréfléchissant' },
  { id: 'ens', label: 'Enseigne façade', role: '3 / 5', name: 'Enseigne façade', spec: 'Lettres en relief rétroéclairées · Bandeau · Filets or haut & bas · 6,40 m × 1,00 m · LED 3000K' },
  { id: 'park', label: 'Parking', role: '4 / 5', name: 'Panneau parking', spec: 'Aluminium · Chapeau or · Grand P or · Niveaux P1 / P2 · Mât or brossé · 1,20 m × 0,80 m' },
  { id: 'stele', label: 'Stèle répertoire', role: '5 / 5', name: 'Stèle répertoire', spec: 'Aluminium · Chapeau or · Répertoire 3 niveaux aéré · Socle béton · H 2,10 m × L 0,90 m' },
];

interface SvgProps {
  c: ScColors;
  p: { f1: string; f2: string; f3: string; side: string };
  tw: (opacity: number) => string;
}

/* ─── helpers for accent rgba ─── */
const accentRgba = (c: ScColors, opacity: number) => {
  const hex = c.accent.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r},${g},${b},${opacity})`;
};


/* ═══════════════════════════════════════════════════════════════
   1. TOTEM ENTRÉE
   ═══════════════════════════════════════════════════════════════ */
const TotemSvg: React.FC<SvgProps> = ({ c, p, tw }) => (
  <div className="w-full max-w-[420px]">
    <svg viewBox="0 0 460 700" width="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="T_face" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={p.f1} />
          <stop offset="18%" stopColor={p.f2} />
          <stop offset="50%" stopColor={p.f3} />
          <stop offset="82%" stopColor={p.f2} />
          <stop offset="100%" stopColor={p.f1} />
        </linearGradient>
        <linearGradient id="T_side" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={p.f1} />
          <stop offset="100%" stopColor={p.side} />
        </linearGradient>
        <linearGradient id="T_capTop" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={lightenHex(c.accent, 0.35)} />
          <stop offset="60%" stopColor={c.accent} />
          <stop offset="100%" stopColor={darkenHex(c.accent, 0.30)} />
        </linearGradient>
        <linearGradient id="T_capFace" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={darkenHex(c.accent, 0.18)} />
          <stop offset="40%" stopColor={lightenHex(c.accent, 0.20)} />
          <stop offset="100%" stopColor={darkenHex(c.accent, 0.22)} />
        </linearGradient>
        <linearGradient id="T_socle" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#a09888" />
          <stop offset="50%" stopColor="#c0b8a8" />
          <stop offset="100%" stopColor="#989080" />
        </linearGradient>
        <filter id="T_sh">
          <feDropShadow dx="14" dy="24" stdDeviation="18" floodColor="#081408" floodOpacity=".50" />
        </filter>
      </defs>

      {/* Shadow ellipse */}
      <ellipse cx="230" cy="692" rx="130" ry="10" fill="rgba(0,0,0,.28)" />

      {/* Socle */}
      <path d="M110,628 L80,648 L380,648 L350,628Z" fill="#b0a898" />
      <rect x="110" y="628" width="240" height="36" fill="url(#T_socle)" />
      <path d="M110,628 L80,648 L80,664 L110,664Z" fill="#888070" />
      <line x1="110" y1="628" x2="350" y2="628" stroke={c.accent} strokeWidth="3.5" opacity=".85" />

      {/* Sides */}
      <path d="M110,68 L80,88 L80,648 L110,648Z" fill={p.side} opacity=".85" />
      <path d="M350,68 L380,88 L380,648 L350,648Z" fill="url(#T_side)" opacity=".70" />

      {/* Main face */}
      <path d="M110,68 L110,628 L350,628 L350,68Z" fill="url(#T_face)" filter="url(#T_sh)" />
      <path d="M126,76 L126,620" stroke="rgba(255,255,255,.08)" strokeWidth="20" strokeLinecap="round" />
      <path d="M334,76 L334,620" stroke="rgba(0,0,0,.12)" strokeWidth="18" />

      {/* Chapeau */}
      <path d="M96,56 L110,68 L350,68 L364,56 L350,40 L110,40Z" fill="url(#T_capTop)" />
      <path d="M110,68 L350,68 L350,80 L110,80Z" fill="url(#T_capFace)" />
      <path d="M96,56 L110,68 L110,80 L96,68Z" fill={darkenHex(c.accent, 0.35)} />
      <line x1="110" y1="40" x2="350" y2="40" stroke="rgba(255,255,255,.55)" strokeWidth="2" />

      {/* Gold filets */}
      <rect x="110" y="108" width="240" height="5" fill={c.accent} opacity=".75" />
      <rect x="110" y="108" width="240" height="2" fill="rgba(255,240,160,.45)" />
      <rect x="110" y="568" width="240" height="5" fill={c.accent} opacity=".60" />

      {/* Logo COSMOS ANGRÉ */}
      <g transform="translate(132,228) scale(0.490)">
        <path d="M38,5 A28,28 0 1,0 38,55" fill="none" stroke={tw(0.96)} strokeWidth="6" strokeDasharray="1,9" strokeLinecap="round" />
        <circle cx="98" cy="30" r="27" fill={c.accent} />
        <circle cx="98" cy="30" r="27" fill="none" stroke="rgba(255,255,255,.35)" strokeWidth="3" />
        <path d="M36,12 C32,2 24,0 15,0 C6,0 0,5 0,14 C0,24 8,28 20,28 C32,28 38,33 38,44 C38,53 31,58 20,58 C12,58 2,55 0,46" fill="none" stroke={tw(0.96)} strokeWidth="6" strokeDasharray="1,9" strokeLinecap="round" transform="translate(136,2)" />
        <path d="M0,58 L0,0 L25,34 L50,0 L50,58" fill="none" stroke={tw(0.96)} strokeWidth="6" strokeDasharray="1,9" strokeLinecap="round" transform="translate(196,2)" />
        <circle cx="284" cy="30" r="27" fill={c.accent} />
        <circle cx="284" cy="30" r="27" fill="none" stroke="rgba(255,255,255,.28)" strokeWidth="2.5" />
        <path d="M36,12 C32,2 24,0 15,0 C6,0 0,5 0,14 C0,24 8,28 20,28 C32,28 38,33 38,44 C38,53 31,58 20,58 C12,58 2,55 0,46" fill="none" stroke={tw(0.96)} strokeWidth="6" strokeDasharray="1,9" strokeLinecap="round" transform="translate(322,2)" />
        <text x="4" y="88" fontFamily="'Inter',sans-serif" fontSize="16" fontWeight="700" letterSpacing="8" fill={c.accent}>ANGRÉ</text>
      </g>

      {/* Tagline */}
      <text x="230" y="322" textAnchor="middle" fontFamily="'Cormorant Garamond',serif" fontSize="14" fontStyle="italic" fill={tw(0.55)} letterSpacing="2.5">{c.tagline2}</text>

      <line x1="150" y1="348" x2="310" y2="348" stroke={accentRgba(c, 0.40)} strokeWidth="1.5" />

      {/* Horaires */}
      <text x="230" y="390" textAnchor="middle" fontFamily="'Montserrat',sans-serif" fontSize="8.5" fontWeight="700" letterSpacing="3" fill={accentRgba(c, 0.80)}>HORAIRES</text>
      <text x="230" y="416" textAnchor="middle" fontFamily="'Inter',sans-serif" fontSize="13" fill={tw(0.82)}>Lun – Sam   9h – 21h</text>
      <text x="230" y="438" textAnchor="middle" fontFamily="'Inter',sans-serif" fontSize="13" fill={tw(0.82)}>Dim   10h – 20h</text>

      <line x1="150" y1="460" x2="310" y2="460" stroke={accentRgba(c, 0.30)} strokeWidth="1" />

      {/* Website */}
      <text x="230" y="490" textAnchor="middle" fontFamily="'Inter',sans-serif" fontSize="11" fill={tw(0.42)} letterSpacing="1.5">cosmosangre.ci</text>

      {/* QR placeholder */}
      <rect x="196" y="512" width="68" height="68" rx="6" fill="rgba(0,0,0,.25)" />
      <rect x="200" y="516" width="60" height="60" rx="4" fill={tw(0.08)} stroke={tw(0.20)} strokeWidth="1" />
      <text x="230" y="550" textAnchor="middle" fontFamily="'Inter',sans-serif" fontSize="7" fill={tw(0.35)}>QR</text>
    </svg>
  </div>
);

/* ═══════════════════════════════════════════════════════════════
   2. PANNEAU DIRECTIONNEL
   ═══════════════════════════════════════════════════════════════ */
const DirectionnelSvg: React.FC<SvgProps> = ({ c, p, tw }) => (
  <div className="w-full max-w-[620px]">
    <svg viewBox="0 0 660 560" width="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="D_face" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={p.f1} />
          <stop offset="30%" stopColor={p.f2} />
          <stop offset="55%" stopColor={p.f3} />
          <stop offset="80%" stopColor={p.f2} />
          <stop offset="100%" stopColor={p.f1} />
        </linearGradient>
        <linearGradient id="D_top" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={p.f3} />
          <stop offset="100%" stopColor={p.f2} />
        </linearGradient>
        <linearGradient id="D_mat" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#9a8060" />
          <stop offset="35%" stopColor="#e8c060" />
          <stop offset="65%" stopColor={c.accent} />
          <stop offset="100%" stopColor="#8a7050" />
        </linearGradient>
        <filter id="D_sh">
          <feDropShadow dx="8" dy="16" stdDeviation="14" floodColor="#081408" floodOpacity=".45" />
        </filter>
      </defs>

      {/* Shadow */}
      <ellipse cx="330" cy="552" rx="160" ry="9" fill="rgba(0,0,0,.22)" />

      {/* Mast */}
      <rect x="312" y="60" width="36" height="484" rx="8" fill="url(#D_mat)" />
      <rect x="318" y="60" width="12" height="484" rx="5" fill="rgba(255,255,255,.18)" />
      <ellipse cx="330" cy="58" rx="22" ry="10" fill={lightenHex(c.accent, 0.25)} />
      <ellipse cx="330" cy="58" rx="22" ry="10" fill="none" stroke="rgba(255,255,255,.40)" strokeWidth="1.5" />
      <ellipse cx="330" cy="544" rx="38" ry="12" fill={c.accent} opacity=".70" />
      <rect x="298" y="530" width="64" height="22" rx="6" fill="#b8a870" />

      {/* Arm 1 left */}
      <rect x="118" y="98" width="212" height="14" rx="4" fill={c.accent} opacity=".60" />
      <path d="M50,118 L50,226 L312,226 L312,118Z" fill="url(#D_face)" filter="url(#D_sh)" />
      <path d="M50,118 L312,118 L312,108 L62,108Z" fill="url(#D_top)" />
      <path d="M50,118 L62,108 L62,236 L50,226Z" fill="rgba(0,0,0,.30)" />
      <path d="M50,172 L22,172 L22,160 L0,182 L22,204 L22,192 L50,192Z" fill={c.accent} />
      <path d="M66,120 L66,224" stroke="rgba(255,255,255,.07)" strokeWidth="16" strokeLinecap="round" />
      <line x1="50" y1="120" x2="312" y2="120" stroke={c.accent} strokeWidth="3" opacity=".75" />
      <text x="186" y="162" textAnchor="middle" fontFamily="'Montserrat',sans-serif" fontSize="9" fontWeight="700" letterSpacing="2.5" fill={accentRgba(c, 0.90)}>ENTRÉE PRINCIPALE</text>
      <text x="186" y="188" textAnchor="middle" fontFamily="'Inter',sans-serif" fontSize="13" fontWeight="600" fill={tw(0.90)} letterSpacing="1">Hall Central</text>
      <text x="186" y="208" textAnchor="middle" fontFamily="'Inter',sans-serif" fontSize="11" fill={tw(0.55)}>Accueil · Sécurité · Info</text>

      {/* Arm 2 right */}
      <rect x="348" y="98" width="194" height="14" rx="4" fill={c.accent} opacity=".60" />
      <path d="M348,118 L348,226 L610,226 L610,118Z" fill="url(#D_face)" filter="url(#D_sh)" />
      <path d="M348,118 L610,118 L610,108 L360,108Z" fill="url(#D_top)" />
      <path d="M610,118 L622,108 L622,236 L610,226Z" fill="rgba(0,0,0,.22)" />
      <path d="M610,172 L638,172 L638,160 L660,182 L638,204 L638,192 L610,192Z" fill={c.accent} />
      <path d="M364,120 L364,224" stroke="rgba(255,255,255,.07)" strokeWidth="16" strokeLinecap="round" />
      <line x1="348" y1="120" x2="610" y2="120" stroke={c.accent} strokeWidth="3" opacity=".75" />
      <text x="479" y="162" textAnchor="middle" fontFamily="'Montserrat',sans-serif" fontSize="9" fontWeight="700" letterSpacing="2.5" fill={accentRgba(c, 0.90)}>PARKING</text>
      <text x="479" y="188" textAnchor="middle" fontFamily="'Inter',sans-serif" fontSize="13" fontWeight="600" fill={tw(0.90)} letterSpacing="1">Niveaux P1 – P2</text>
      <text x="479" y="208" textAnchor="middle" fontFamily="'Inter',sans-serif" fontSize="11" fill={tw(0.55)}>600 places disponibles</text>

      {/* Arm 3 left bottom */}
      <rect x="118" y="268" width="192" height="14" rx="4" fill={c.accent} opacity=".60" />
      <path d="M50,288 L50,384 L312,384 L312,288Z" fill="url(#D_face)" filter="url(#D_sh)" />
      <path d="M50,288 L312,288 L312,278 L62,278Z" fill="url(#D_top)" />
      <path d="M50,288 L62,278 L62,394 L50,384Z" fill="rgba(0,0,0,.30)" />
      <path d="M50,336 L22,336 L22,324 L0,346 L22,368 L22,356 L50,356Z" fill={c.accent} />
      <line x1="50" y1="290" x2="312" y2="290" stroke={c.accent} strokeWidth="3" opacity=".75" />
      <text x="186" y="324" textAnchor="middle" fontFamily="'Montserrat',sans-serif" fontSize="9" fontWeight="700" letterSpacing="2.5" fill={accentRgba(c, 0.90)}>SERVICES</text>
      <text x="186" y="350" textAnchor="middle" fontFamily="'Inter',sans-serif" fontSize="13" fontWeight="600" fill={tw(0.90)}>Toilettes · Banque</text>
      <text x="186" y="370" textAnchor="middle" fontFamily="'Inter',sans-serif" fontSize="11" fill={tw(0.55)}>Niveau RDC</text>

      {/* Arm 4 right bottom */}
      <rect x="348" y="268" width="194" height="14" rx="4" fill={c.accent} opacity=".60" />
      <path d="M348,288 L348,384 L610,384 L610,288Z" fill="url(#D_face)" filter="url(#D_sh)" />
      <path d="M348,288 L610,288 L610,278 L360,278Z" fill="url(#D_top)" />
      <path d="M610,288 L622,278 L622,394 L610,384Z" fill="rgba(0,0,0,.22)" />
      <path d="M610,336 L638,336 L638,324 L660,346 L638,368 L638,356 L610,356Z" fill={c.accent} />
      <line x1="348" y1="290" x2="610" y2="290" stroke={c.accent} strokeWidth="3" opacity=".75" />
      <text x="479" y="324" textAnchor="middle" fontFamily="'Montserrat',sans-serif" fontSize="9" fontWeight="700" letterSpacing="2.5" fill={accentRgba(c, 0.90)}>RESTAURATION</text>
      <text x="479" y="350" textAnchor="middle" fontFamily="'Inter',sans-serif" fontSize="13" fontWeight="600" fill={tw(0.90)}>Food Court</text>
      <text x="479" y="370" textAnchor="middle" fontFamily="'Inter',sans-serif" fontSize="11" fill={tw(0.55)}>Niveau 2</text>
    </svg>
  </div>
);

/* ═══════════════════════════════════════════════════════════════
   3. ENSEIGNE FAÇADE
   ═══════════════════════════════════════════════════════════════ */
const EnseigneSvg: React.FC<SvgProps> = ({ c, p, tw }) => (
  <div className="w-full max-w-[680px]">
    <svg viewBox="0 0 720 420" width="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="E_wall" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={mixHex(p.side, c.dark, 0.4)} />
          <stop offset="100%" stopColor={c.dark} />
        </linearGradient>
        <linearGradient id="E_band" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={p.side} />
          <stop offset="20%" stopColor={p.f2} />
          <stop offset="50%" stopColor={p.f3} />
          <stop offset="80%" stopColor={p.f2} />
          <stop offset="100%" stopColor={p.side} />
        </linearGradient>
        <linearGradient id="E_or" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={darkenHex(c.accent, 0.35)} />
          <stop offset="25%" stopColor={c.accent} />
          <stop offset="55%" stopColor={lightenHex(c.accent, 0.30)} />
          <stop offset="80%" stopColor={c.accent} />
          <stop offset="100%" stopColor={darkenHex(c.accent, 0.35)} />
        </linearGradient>
        <filter id="E_glow">
          <feGaussianBlur stdDeviation="8" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="E_sh">
          <feDropShadow dx="0" dy="12" stdDeviation="20" floodColor="#000" floodOpacity=".65" />
        </filter>
      </defs>

      {/* Wall */}
      <rect x="0" y="0" width="720" height="420" fill="url(#E_wall)" />
      <line x1="0" y1="105" x2="720" y2="105" stroke="rgba(255,255,255,.03)" strokeWidth="2" />
      <line x1="0" y1="210" x2="720" y2="210" stroke="rgba(255,255,255,.025)" strokeWidth="2" />
      <line x1="0" y1="315" x2="720" y2="315" stroke="rgba(255,255,255,.03)" strokeWidth="2" />
      <line x1="180" y1="0" x2="180" y2="420" stroke="rgba(255,255,255,.02)" strokeWidth="1" />
      <line x1="360" y1="0" x2="360" y2="420" stroke="rgba(255,255,255,.02)" strokeWidth="1" />
      <line x1="540" y1="0" x2="540" y2="420" stroke="rgba(255,255,255,.02)" strokeWidth="1" />

      {/* Top glow strip */}
      <rect x="60" y="72" width="600" height="18" rx="6" fill={accentRgba(c, 0.08)} />
      <rect x="60" y="80" width="600" height="6" rx="3" fill="rgba(255,240,160,.18)" />

      {/* Band */}
      <rect x="40" y="96" width="640" height="228" rx="10" fill="url(#E_band)" filter="url(#E_sh)" />
      <path d="M40,96 L640,96 L640,80 L40,80" fill={`${p.f2}cc`} />
      <path d="M40,96 L40,80 L28,88Z" fill={p.side} />
      <path d="M680,96 L680,80 L692,88Z" fill={p.side} />

      {/* Gold filets */}
      <rect x="40" y="96" width="640" height="8" rx="3" fill="url(#E_or)" opacity=".95" />
      <rect x="40" y="96" width="640" height="3" fill="rgba(255,252,200,.45)" />
      <rect x="40" y="316" width="640" height="8" rx="3" fill="url(#E_or)" opacity=".85" />

      {/* Side highlight */}
      <rect x="55" y="106" width="30" height="210" rx="12" fill="rgba(255,255,255,.04)" />

      {/* Logo COSMOS ANGRÉ */}
      <g transform="translate(90,142) scale(1.350)">
        <path d="M38,5 A28,28 0 1,0 38,55" fill="none" stroke={tw(0.96)} strokeWidth="5" strokeDasharray="1,8.5" strokeLinecap="round" />
        <circle cx="98" cy="30" r="27" fill={c.accent} filter="url(#E_glow)" />
        <circle cx="98" cy="30" r="27" fill="none" stroke="rgba(255,255,255,.35)" strokeWidth="3" />
        <path d="M36,12 C32,2 24,0 15,0 C6,0 0,5 0,14 C0,24 8,28 20,28 C32,28 38,33 38,44 C38,53 31,58 20,58 C12,58 2,55 0,46" fill="none" stroke={tw(0.96)} strokeWidth="5" strokeDasharray="1,8.5" strokeLinecap="round" transform="translate(136,2)" />
        <path d="M0,58 L0,0 L25,34 L50,0 L50,58" fill="none" stroke={tw(0.96)} strokeWidth="5" strokeDasharray="1,8.5" strokeLinecap="round" transform="translate(196,2)" />
        <circle cx="284" cy="30" r="27" fill={c.accent} filter="url(#E_glow)" />
        <circle cx="284" cy="30" r="27" fill="none" stroke="rgba(255,255,255,.30)" strokeWidth="2.5" />
        <path d="M36,12 C32,2 24,0 15,0 C6,0 0,5 0,14 C0,24 8,28 20,28 C32,28 38,33 38,44 C38,53 31,58 20,58 C12,58 2,55 0,46" fill="none" stroke={tw(0.96)} strokeWidth="5" strokeDasharray="1,8.5" strokeLinecap="round" transform="translate(322,2)" />
        <text x="4" y="88" fontFamily="'Inter',sans-serif" fontSize="16" fontWeight="700" letterSpacing="8" fill={c.accent}>ANGRÉ</text>
      </g>

      {/* Mounting bolts */}
      <circle cx="60" cy="210" r="8" fill="#282018" stroke={c.accent} strokeWidth="2" opacity=".80" />
      <circle cx="660" cy="210" r="8" fill="#282018" stroke={c.accent} strokeWidth="2" opacity=".80" />

      {/* Bottom glow strip */}
      <rect x="60" y="326" width="600" height="14" rx="5" fill={accentRgba(c, 0.06)} />
      <rect x="60" y="328" width="600" height="5" rx="3" fill="rgba(255,240,160,.12)" />

      {/* Tagline */}
      <text x="360" y="380" textAnchor="middle" fontFamily="'Cormorant Garamond',serif" fontSize="16" fontStyle="italic" fill={tw(0.28)} letterSpacing="3">{c.tagline2}</text>
    </svg>
  </div>
);

/* ═══════════════════════════════════════════════════════════════
   4. PANNEAU PARKING
   ═══════════════════════════════════════════════════════════════ */
const ParkingSvg: React.FC<SvgProps> = ({ c, p, tw }) => (
  <div className="w-full max-w-[460px]">
    <svg viewBox="0 0 500 620" width="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="P_face" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={p.f1} />
          <stop offset="25%" stopColor={p.f2} />
          <stop offset="55%" stopColor={p.f3} />
          <stop offset="80%" stopColor={p.f2} />
          <stop offset="100%" stopColor={p.f1} />
        </linearGradient>
        <linearGradient id="P_top" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={p.f3} />
          <stop offset="100%" stopColor={p.f2} />
        </linearGradient>
        <linearGradient id="P_mat" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#9a8060" />
          <stop offset="40%" stopColor="#e0b848" />
          <stop offset="100%" stopColor="#8a7050" />
        </linearGradient>
        <linearGradient id="P_cap" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={lightenHex(c.accent, 0.30)} />
          <stop offset="100%" stopColor={darkenHex(c.accent, 0.25)} />
        </linearGradient>
        <filter id="P_sh">
          <feDropShadow dx="10" dy="20" stdDeviation="16" floodColor="#081408" floodOpacity=".48" />
        </filter>
      </defs>

      {/* Shadow */}
      <ellipse cx="250" cy="614" rx="140" ry="9" fill="rgba(0,0,0,.24)" />

      {/* Mast */}
      <rect x="232" y="348" width="36" height="256" rx="7" fill="url(#P_mat)" />
      <rect x="238" y="348" width="12" height="256" rx="4" fill="rgba(255,255,255,.16)" />
      <ellipse cx="250" cy="604" rx="42" ry="12" fill="#a89060" opacity=".80" />
      <rect x="216" y="590" width="68" height="24" rx="7" fill="#b8a070" />
      <ellipse cx="250" cy="346" rx="22" ry="9" fill={lightenHex(c.accent, 0.25)} />

      {/* Sides */}
      <path d="M80,44 L52,60 L52,348 L80,348Z" fill={p.side} opacity=".80" />
      <path d="M420,44 L448,60 L448,348 L420,348Z" fill="rgba(10,20,14,.60)" />

      {/* Main face */}
      <path d="M80,44 L80,348 L420,348 L420,44Z" fill="url(#P_face)" filter="url(#P_sh)" />

      {/* Chapeau */}
      <path d="M66,34 L80,44 L420,44 L434,34 L420,18 L80,18Z" fill="url(#P_cap)" />
      <line x1="80" y1="18" x2="420" y2="18" stroke="rgba(255,255,255,.50)" strokeWidth="2.5" />
      <path d="M66,34 L80,44 L80,34Z" fill="rgba(0,0,0,.25)" />

      {/* Highlights / shadows */}
      <path d="M96,50 L96,342" stroke="rgba(255,255,255,.07)" strokeWidth="22" strokeLinecap="round" />
      <path d="M404,50 L404,342" stroke="rgba(0,0,0,.08)" strokeWidth="18" />

      {/* Gold filet top */}
      <rect x="80" y="52" width="340" height="5" fill={c.accent} opacity=".80" />
      <rect x="80" y="52" width="340" height="2" fill="rgba(255,240,160,.40)" />

      {/* Mini logo */}
      <g transform="translate(148,72) scale(0.280)">
        <path d="M38,5 A28,28 0 1,0 38,55" fill="none" stroke={tw(0.94)} strokeWidth="6" strokeDasharray="1,9" strokeLinecap="round" />
        <circle cx="98" cy="30" r="27" fill={c.accent} />
        <path d="M36,12 C32,2 24,0 15,0 C6,0 0,5 0,14 C0,24 8,28 20,28 C32,28 38,33 38,44 C38,53 31,58 20,58 C12,58 2,55 0,46" fill="none" stroke={tw(0.94)} strokeWidth="6" strokeDasharray="1,9" strokeLinecap="round" transform="translate(136,2)" />
        <path d="M0,58 L0,0 L25,34 L50,0 L50,58" fill="none" stroke={tw(0.94)} strokeWidth="6" strokeDasharray="1,9" strokeLinecap="round" transform="translate(196,2)" />
        <circle cx="284" cy="30" r="27" fill={c.accent} />
        <path d="M36,12 C32,2 24,0 15,0 C6,0 0,5 0,14 C0,24 8,28 20,28 C32,28 38,33 38,44 C38,53 31,58 20,58 C12,58 2,55 0,46" fill="none" stroke={tw(0.94)} strokeWidth="6" strokeDasharray="1,9" strokeLinecap="round" transform="translate(322,2)" />
      </g>

      {/* Gold divider */}
      <line x1="90" y1="122" x2="410" y2="122" stroke={c.accent} strokeWidth="3" opacity=".70" />
      <line x1="90" y1="122" x2="410" y2="122" stroke="rgba(255,240,160,.30)" strokeWidth="1" />

      {/* Big P */}
      <text x="250" y="252" textAnchor="middle" fontFamily="'Montserrat',sans-serif" fontSize="148" fontWeight="800" fill={accentRgba(c, 0.88)}>P</text>

      {/* Divider */}
      <line x1="90" y1="278" x2="410" y2="278" stroke={c.accent} strokeWidth="2.5" opacity=".60" />

      {/* Level indicators */}
      <rect x="94" y="292" width="92" height="44" rx="12" fill="rgba(0,0,0,.25)" />
      <text x="140" y="320" textAnchor="middle" fontFamily="'Montserrat',sans-serif" fontSize="18" fontWeight="800" fill={tw(0.92)}>P1</text>

      <rect x="204" y="292" width="92" height="44" rx="12" fill="rgba(0,0,0,.25)" />
      <text x="250" y="320" textAnchor="middle" fontFamily="'Montserrat',sans-serif" fontSize="18" fontWeight="800" fill={tw(0.92)}>P2</text>

      <rect x="314" y="292" width="96" height="44" rx="12" fill={accentRgba(c, 0.22)} stroke={c.accent} strokeWidth="1.5" opacity=".90" />
      <text x="362" y="312" textAnchor="middle" fontFamily="'Montserrat',sans-serif" fontSize="9" fontWeight="700" letterSpacing="1.5" fill={tw(0.85)}>COMPLET</text>
      <text x="362" y="328" textAnchor="middle" fontFamily="'Inter',sans-serif" fontSize="10" fill={accentRgba(c, 0.90)}>→ P2 libre</text>
    </svg>
  </div>
);

/* ═══════════════════════════════════════════════════════════════
   5. STÈLE RÉPERTOIRE
   ═══════════════════════════════════════════════════════════════ */
const SteleSvg: React.FC<SvgProps> = ({ c, p, tw }) => (
  <div className="w-full max-w-[480px]">
    <svg viewBox="0 0 520 720" width="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="S_face" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={p.f1} />
          <stop offset="22%" stopColor={p.f2} />
          <stop offset="52%" stopColor={p.f3} />
          <stop offset="80%" stopColor={p.f2} />
          <stop offset="100%" stopColor={p.f1} />
        </linearGradient>
        <linearGradient id="S_top" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={p.f3} />
          <stop offset="100%" stopColor={p.f2} />
        </linearGradient>
        <linearGradient id="S_cap" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={lightenHex(c.accent, 0.30)} />
          <stop offset="100%" stopColor={darkenHex(c.accent, 0.30)} />
        </linearGradient>
        <linearGradient id="S_socle" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#9a9080" />
          <stop offset="50%" stopColor="#bab0a0" />
          <stop offset="100%" stopColor="#9a9080" />
        </linearGradient>
        <filter id="S_sh">
          <feDropShadow dx="10" dy="20" stdDeviation="16" floodColor="#081408" floodOpacity=".45" />
        </filter>
      </defs>

      {/* Shadow */}
      <ellipse cx="260" cy="714" rx="148" ry="10" fill="rgba(0,0,0,.24)" />

      {/* Socle */}
      <path d="M80,672 L50,692 L470,692 L440,672Z" fill="#8a8070" />
      <rect x="80" y="654" width="360" height="24" fill="url(#S_socle)" />
      <path d="M80,654 L50,672 L50,692 L80,692Z" fill="#787060" />
      <line x1="80" y1="654" x2="440" y2="654" stroke={c.accent} strokeWidth="3" opacity=".70" />

      {/* Sides */}
      <path d="M80,48 L50,64 L50,654 L80,654Z" fill={p.side} opacity=".80" />
      <path d="M440,48 L470,64 L470,654 L440,654Z" fill="rgba(10,20,14,.55)" />

      {/* Main face */}
      <path d="M80,48 L80,654 L440,654 L440,48Z" fill="url(#S_face)" filter="url(#S_sh)" />

      {/* Chapeau */}
      <path d="M66,38 L80,48 L440,48 L454,38 L440,22 L80,22Z" fill="url(#S_cap)" />
      <line x1="80" y1="22" x2="440" y2="22" stroke="rgba(255,255,255,.50)" strokeWidth="2.5" />
      <path d="M66,38 L80,48 L80,38Z" fill="rgba(0,0,0,.25)" />

      {/* Highlights / shadows */}
      <path d="M96,54 L96,648" stroke="rgba(255,255,255,.06)" strokeWidth="22" strokeLinecap="round" />
      <path d="M424,54 L424,648" stroke="rgba(0,0,0,.08)" strokeWidth="18" />

      {/* Gold filet top */}
      <rect x="80" y="56" width="360" height="5" fill={c.accent} opacity=".80" />

      {/* Logo COSMOS ANGRÉ */}
      <g transform="translate(110,68) scale(0.750)">
        <path d="M38,5 A28,28 0 1,0 38,55" fill="none" stroke={tw(0.96)} strokeWidth="5.5" strokeDasharray="1,9" strokeLinecap="round" />
        <circle cx="98" cy="30" r="27" fill={c.accent} />
        <circle cx="98" cy="30" r="27" fill="none" stroke="rgba(255,255,255,.32)" strokeWidth="2.5" />
        <path d="M36,12 C32,2 24,0 15,0 C6,0 0,5 0,14 C0,24 8,28 20,28 C32,28 38,33 38,44 C38,53 31,58 20,58 C12,58 2,55 0,46" fill="none" stroke={tw(0.96)} strokeWidth="5.5" strokeDasharray="1,9" strokeLinecap="round" transform="translate(136,2)" />
        <path d="M0,58 L0,0 L25,34 L50,0 L50,58" fill="none" stroke={tw(0.96)} strokeWidth="5.5" strokeDasharray="1,9" strokeLinecap="round" transform="translate(196,2)" />
        <circle cx="284" cy="30" r="27" fill={c.accent} />
        <circle cx="284" cy="30" r="27" fill="none" stroke="rgba(255,255,255,.26)" strokeWidth="2" />
        <path d="M36,12 C32,2 24,0 15,0 C6,0 0,5 0,14 C0,24 8,28 20,28 C32,28 38,33 38,44 C38,53 31,58 20,58 C12,58 2,55 0,46" fill="none" stroke={tw(0.96)} strokeWidth="5.5" strokeDasharray="1,9" strokeLinecap="round" transform="translate(322,2)" />
        <text x="4" y="88" fontFamily="'Inter',sans-serif" fontSize="16" fontWeight="700" letterSpacing="8" fill={c.accent}>ANGRÉ</text>
      </g>

      {/* Tagline */}
      <text x="260" y="152" textAnchor="middle" fontFamily="'Cormorant Garamond',serif" fontSize="13" fontStyle="italic" fill={tw(0.50)} letterSpacing="2">{c.tagline2}</text>

      {/* Dividers */}
      <line x1="90" y1="168" x2="430" y2="168" stroke={c.accent} strokeWidth="2.5" opacity=".70" />
      <line x1="90" y1="168" x2="430" y2="168" stroke="rgba(255,240,160,.28)" strokeWidth="1" />

      {/* Title */}
      <text x="260" y="196" textAnchor="middle" fontFamily="'Montserrat',sans-serif" fontSize="9" fontWeight="700" letterSpacing="3.5" fill={accentRgba(c, 0.85)}>PLAN DES BOUTIQUES</text>

      {/* ─── NIVEAU RDC ─── */}
      <rect x="90" y="210" width="340" height="28" rx="6" fill={accentRgba(c, 0.15)} />
      <text x="106" y="229" fontFamily="'Montserrat',sans-serif" fontSize="9" fontWeight="700" letterSpacing="2.5" fill={c.accent}>NIVEAU RDC</text>

      <text x="106" y="260" fontFamily="'Inter',sans-serif" fontSize="12" fill={tw(0.85)}>Mode {'&'} Prêt-à-porter</text>
      <text x="424" y="260" textAnchor="end" fontFamily="'Inter',sans-serif" fontSize="12" fill={accentRgba(c, 0.80)}>01 – 12</text>
      <line x1="90" y1="268" x2="430" y2="268" stroke="rgba(255,255,255,.06)" strokeWidth="1" />

      <text x="106" y="290" fontFamily="'Inter',sans-serif" fontSize="12" fill={tw(0.85)}>Beauté {'&'} Bien-être</text>
      <text x="424" y="290" textAnchor="end" fontFamily="'Inter',sans-serif" fontSize="12" fill={accentRgba(c, 0.80)}>13 – 18</text>
      <line x1="90" y1="298" x2="430" y2="298" stroke="rgba(255,255,255,.06)" strokeWidth="1" />

      <text x="106" y="320" fontFamily="'Inter',sans-serif" fontSize="12" fill={tw(0.85)}>Restauration</text>
      <text x="424" y="320" textAnchor="end" fontFamily="'Inter',sans-serif" fontSize="12" fill={accentRgba(c, 0.80)}>19 – 24</text>

      {/* ─── NIVEAU 1 ─── */}
      <rect x="90" y="338" width="340" height="28" rx="6" fill={accentRgba(c, 0.15)} />
      <text x="106" y="357" fontFamily="'Montserrat',sans-serif" fontSize="9" fontWeight="700" letterSpacing="2.5" fill={c.accent}>NIVEAU 1</text>

      <text x="106" y="388" fontFamily="'Inter',sans-serif" fontSize="12" fill={tw(0.85)}>High-Tech {'&'} Multimédia</text>
      <text x="424" y="388" textAnchor="end" fontFamily="'Inter',sans-serif" fontSize="12" fill={accentRgba(c, 0.80)}>25 – 32</text>
      <line x1="90" y1="396" x2="430" y2="396" stroke="rgba(255,255,255,.06)" strokeWidth="1" />

      <text x="106" y="418" fontFamily="'Inter',sans-serif" fontSize="12" fill={tw(0.85)}>Maison {'&'} Décoration</text>
      <text x="424" y="418" textAnchor="end" fontFamily="'Inter',sans-serif" fontSize="12" fill={accentRgba(c, 0.80)}>33 – 40</text>
      <line x1="90" y1="426" x2="430" y2="426" stroke="rgba(255,255,255,.06)" strokeWidth="1" />

      <text x="106" y="448" fontFamily="'Inter',sans-serif" fontSize="12" fill={tw(0.85)}>Loisirs {'&'} Culture</text>
      <text x="424" y="448" textAnchor="end" fontFamily="'Inter',sans-serif" fontSize="12" fill={accentRgba(c, 0.80)}>41 – 46</text>

      {/* ─── NIVEAU 2 ─── */}
      <rect x="90" y="466" width="340" height="28" rx="6" fill={accentRgba(c, 0.15)} />
      <text x="106" y="485" fontFamily="'Montserrat',sans-serif" fontSize="9" fontWeight="700" letterSpacing="2.5" fill={c.accent}>NIVEAU 2</text>

      <text x="106" y="516" fontFamily="'Inter',sans-serif" fontSize="12" fill={tw(0.85)}>Food Court</text>
      <text x="424" y="516" textAnchor="end" fontFamily="'Inter',sans-serif" fontSize="12" fill={accentRgba(c, 0.80)}>47 – 56</text>
      <line x1="90" y1="524" x2="430" y2="524" stroke="rgba(255,255,255,.06)" strokeWidth="1" />

      <text x="106" y="546" fontFamily="'Inter',sans-serif" fontSize="12" fill={tw(0.85)}>Cinéma Majestic</text>
      <text x="424" y="546" textAnchor="end" fontFamily="'Inter',sans-serif" fontSize="12" fill={accentRgba(c, 0.80)}>Niv. 2</text>

      {/* Bottom divider */}
      <line x1="90" y1="564" x2="430" y2="564" stroke={c.accent} strokeWidth="2" opacity=".55" />

      {/* Contact info */}
      <text x="260" y="588" textAnchor="middle" fontFamily="'Montserrat',sans-serif" fontSize="8.5" fontWeight="700" letterSpacing="2.5" fill={accentRgba(c, 0.75)}>ACCUEIL {'&'} INFO</text>
      <text x="260" y="610" textAnchor="middle" fontFamily="'Inter',sans-serif" fontSize="12.5" fill={tw(0.65)}>+225 XX XX XX XX</text>
      <text x="260" y="630" textAnchor="middle" fontFamily="'Inter',sans-serif" fontSize="11" fill={tw(0.38)} letterSpacing="1">cosmosangre.ci</text>
    </svg>
  </div>
);

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════ */
const SignaletiqueTotemSection: React.FC<{ k: ScenarioKey }> = ({ k }) => {
  const [activeTab, setActiveTab] = useState('totem');
  const c = sc[k];
  const p = signPal[k];
  const bg = stageBg[k];
  const activeInfo = tabs.find(t => t.id === activeTab)!;

  const tw = (opacity: number): string => {
    if (c.textOnDark === '#fff') return `rgba(255,255,255,${opacity})`;
    const hex = c.textOnDark.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r},${g},${b},${opacity})`;
  };

  return (
    <div id="bw-signaletique" className="py-16 border-b border-black/[.08]">
      <div className="bg-white rounded-[18px] border border-black/[.06] overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,.04)]">
        {/* Header */}
        <div
          className="px-4 sm:px-8 py-6 border-b border-black/[.06]"
          style={{ background: `linear-gradient(to bottom right, ${c.dark}, ${c.primary})` }}
        >
          <div className="text-[9px] font-bold tracking-[.25em] uppercase mb-1" style={{ color: c.accent }}>Brand World · B3</div>
          <div className="font-cormorant text-[24px] text-white font-light">Signalétique {'&'} Totems</div>
          <div className="text-[10px] text-white/30 mt-1">5 pièces · Charte Cosmos Angré</div>
        </div>

        {/* Tab navigation */}
        <div className="flex gap-2 p-4 sm:px-8 flex-wrap border-b border-black/[.06]">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="px-4 py-2 rounded-full text-[10px] font-bold tracking-wider uppercase transition-all border-2"
              style={{
                background: activeTab === tab.id ? c.primary : `${c.primary}10`,
                color: activeTab === tab.id ? c.textOnDark : c.primary,
                borderColor: activeTab === tab.id ? c.primary : `${c.primary}20`,
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Active panel */}
        <div>
          <div
            className="flex items-center justify-center p-6 sm:p-12 min-h-[500px]"
            style={{ background: activeTab === 'ens' ? `linear-gradient(160deg,${c.dark},${mixHex(p.side, c.dark, 0.5)})` : bg }}
          >
            {activeTab === 'totem' && <TotemSvg c={c} p={p} tw={tw} />}
            {activeTab === 'dir' && <DirectionnelSvg c={c} p={p} tw={tw} />}
            {activeTab === 'ens' && <EnseigneSvg c={c} p={p} tw={tw} />}
            {activeTab === 'park' && <ParkingSvg c={c} p={p} tw={tw} />}
            {activeTab === 'stele' && <SteleSvg c={c} p={p} tw={tw} />}
          </div>

          {/* Info bar */}
          <div className="px-6 py-5 border-t border-black/[.06] flex items-center justify-between gap-4 flex-wrap">
            <div>
              <div className="text-[9px] font-bold tracking-wider uppercase mb-1" style={{ color: c.accent }}>● Signalétique · {activeInfo.role}</div>
              <div className="text-[18px] font-bold" style={{ color: c.dark }}>{activeInfo.name}</div>
              <div className="text-[11px] text-black/40 mt-1 leading-relaxed">{activeInfo.spec}</div>
            </div>
            <div
              className="px-4 py-2 rounded-full text-[10px] font-bold tracking-wider uppercase whitespace-nowrap"
              style={{ background: `${c.primary}10`, color: c.primary }}
            >
              Brand World B5
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignaletiqueTotemSection;
