import React, { useState } from 'react';
import type { ScenarioKey } from './Scenarios';
import { hexRgba, lightenHex, darkenHex } from './colorUtils';

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
  C: { primary: '#B25A38', dark: '#2C1A0A', accent: '#C9943A', secondary: '#F2EBDD', light: '#6D7447', tagline: "Vivez l'exception, ici chez vous", tagline2: "L'exception de proximité", textOnDark: '#fff' },
  D: { primary: '#898D5D', dark: '#1C2215', accent: '#D4A843', secondary: '#F5F0E4', light: '#6B7A4A', tagline: 'Ici, on vit quelque chose', tagline2: 'Nature Contemporaine', textOnDark: '#fff' },
};

const goodiePal: Record<ScenarioKey, { f1: string; f2: string; f3: string; side: string }> = {
  A: { f1: '#1a3224', f2: '#2F5439', f3: '#326040', side: '#0d1e14' },
  B: { f1: '#081230', f2: '#0D1B4B', f3: '#1a3065', side: '#04091a' },
  C: { f1: '#7A3A1E', f2: '#B25A38', f3: '#D47850', side: '#4A2010' },
  D: { f1: '#2A3320', f2: '#898D5D', f3: '#A5A97A', side: '#1C2215' },
};

const tabs = [
  { id: 'tasse', label: 'Tasse céramique', role: '1 / 4', name: 'Tasse céramique', spec: 'Porcelaine fine 300 ml · Finition mate sable · Rebord or cuivré · Logo centré · Intérieur ivoire' },
  { id: 'sac', label: 'Sac shopping', role: '2 / 4', name: 'Sac shopping', spec: 'Kraft premium 200g · Logo sable + or centré · Poignées cordon coton naturel' },
  { id: 'gobelet', label: 'Gobelet takeaway', role: '3 / 4', name: 'Gobelet takeaway', spec: 'Carton double paroi 350 ml · Couvercle sable · Rebord + filet or · Logo sable centré' },
  { id: 'portes', label: 'Porte-clés', role: '4 / 4', name: 'Porte-clés médaillon', spec: 'Métal doré · Médaillon Ø 6 cm · Logo bas-relief centré · Chaîne maillons alternés · Anneau plaqué or' },
];

interface SvgProps {
  c: ScColors;
  p: { f1: string; f2: string; f3: string; side: string };
  tw: (opacity: number) => string;
  primaryRgba: (opacity: number) => string;
  darkRgba: (opacity: number) => string;
  accentRgba: (opacity: number) => string;
  accentLighter: () => string;
  accentDarker: () => string;
}

/* ═══════════════════════════════════════════════════════════════
   1. TASSE CÉRAMIQUE
   ═══════════════════════════════════════════════════════════════ */
const TasseSvg: React.FC<SvgProps> = ({ c, primaryRgba, accentRgba }) => (
  <div className="w-full max-w-[520px]">
    <svg viewBox="0 0 560 500" width="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cup_body" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#b8b0a0" />
          <stop offset="14%" stopColor="#d8cebc" />
          <stop offset="32%" stopColor="#ede4d2" />
          <stop offset="55%" stopColor="#f8f2e6" />
          <stop offset="76%" stopColor="#e8e0ce" />
          <stop offset="90%" stopColor="#cec4b2" />
          <stop offset="100%" stopColor="#b4ac9c" />
        </linearGradient>
        <linearGradient id="cup_in" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#907e6e" />
          <stop offset="100%" stopColor="#786a5c" />
        </linearGradient>
        <linearGradient id="cup_anse" x1="100%" y1="0%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#ccc4b2" />
          <stop offset="50%" stopColor="#e8e0ce" />
          <stop offset="100%" stopColor="#b8b0a0" />
        </linearGradient>
        <linearGradient id="cup_or" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#a07028" />
          <stop offset="30%" stopColor={c.accent} />
          <stop offset="55%" stopColor="#e8c060" />
          <stop offset="80%" stopColor={c.accent} />
          <stop offset="100%" stopColor="#a07028" />
        </linearGradient>
        <filter id="cup_sh">
          <feDropShadow dx="8" dy="18" stdDeviation="20" floodColor="#806040" floodOpacity=".28" />
        </filter>
      </defs>
      <ellipse cx="272" cy="492" rx="172" ry="13" fill="rgba(0,0,0,.20)" />
      <path d="M470,148 Q570,148 572,258 Q572,368 470,368" fill="none" stroke="#a8a090" strokeWidth="58" strokeLinecap="round" />
      <path d="M470,148 Q548,148 550,258 Q548,368 470,368" fill="none" stroke="url(#cup_anse)" strokeWidth="34" strokeLinecap="round" />
      <path d="M470,150 Q532,154 534,258 Q532,362 470,366" fill="none" stroke="rgba(255,255,255,.22)" strokeWidth="9" strokeLinecap="round" />
      <path d="M462,152 Q520,160 520,258 Q520,358 462,364" fill="none" stroke="rgba(0,0,0,.09)" strokeWidth="14" strokeLinecap="round" />
      <path d="M60,128 Q52,418 66,434 L478,434 Q492,418 486,128Z" fill="url(#cup_body)" filter="url(#cup_sh)" />
      <ellipse cx="272" cy="128" rx="214" ry="46" fill="url(#cup_in)" />
      <ellipse cx="272" cy="128" rx="214" ry="46" fill="none" stroke="#a89e8e" strokeWidth="3" />
      <path d="M60,128 Q272,180 486,128" fill="none" stroke="url(#cup_or)" strokeWidth="12" opacity=".95" />
      <path d="M60,128 Q272,174 486,128" fill="none" stroke="rgba(255,248,200,.60)" strokeWidth="4" opacity=".55" />
      {/* Subtle colored inner band */}
      <path d="M68,168 Q272,206 480,168" fill="none" stroke={primaryRgba(0.18)} strokeWidth="6" />
      <path d="M70,176 Q272,212 478,176" fill="none" stroke={accentRgba(0.12)} strokeWidth="3" />
      <path d="M82,142 Q76,280 78,424" fill="none" stroke="rgba(255,255,255,.26)" strokeWidth="28" strokeLinecap="round" />
      <path d="M452,142 Q460,280 456,424" fill="none" stroke="rgba(0,0,0,.09)" strokeWidth="30" />
      <path d="M66,434 Q74,454 90,458 L454,458 Q470,454 478,434Z" fill="#c0b8a8" />
      <ellipse cx="272" cy="458" rx="192" ry="13" fill="#a8a090" />
      <g transform="translate(104,243) scale(0.845)">
        <path d="M38,5 A28,28 0 1,0 38,55" fill="none" stroke={primaryRgba(0.88)} strokeWidth="5.5" strokeDasharray="0.8,9" strokeLinecap="round" />
        <circle cx="98" cy="30" r="26" fill={c.accent} />
        <circle cx="98" cy="30" r="26" fill="none" stroke="rgba(255,255,255,.28)" strokeWidth="2.5" />
        <path d="M36,12 C32,2 24,0 15,0 C6,0 0,5 0,14 C0,24 8,28 20,28 C32,28 38,33 38,44 C38,53 31,58 20,58 C12,58 2,55 0,46" fill="none" stroke={primaryRgba(0.88)} strokeWidth="5.5" strokeDasharray="0.8,9" strokeLinecap="round" transform="translate(136,2)" />
        <path d="M0,58 L0,0 L25,34 L50,0 L50,58" fill="none" stroke={primaryRgba(0.88)} strokeWidth="5.5" strokeDasharray="0.8,9" strokeLinecap="round" transform="translate(196,2)" />
        <circle cx="284" cy="30" r="26" fill={c.accent} />
        <circle cx="284" cy="30" r="26" fill="none" stroke="rgba(255,255,255,.22)" strokeWidth="2" />
        <path d="M36,12 C32,2 24,0 15,0 C6,0 0,5 0,14 C0,24 8,28 20,28 C32,28 38,33 38,44 C38,53 31,58 20,58 C12,58 2,55 0,46" fill="none" stroke={primaryRgba(0.88)} strokeWidth="5.5" strokeDasharray="0.8,9" strokeLinecap="round" transform="translate(322,2)" />
        <text x="2" y="86" fontFamily="'Inter',sans-serif" fontSize="15" fontWeight="700" letterSpacing="8" fill={c.accent}>ANGRÉ</text>
      </g>
    </svg>
  </div>
);

/* ═══════════════════════════════════════════════════════════════
   2. SAC SHOPPING
   ═══════════════════════════════════════════════════════════════ */
const SacSvg: React.FC<SvgProps> = ({ c, p, tw }) => (
  <div className="w-full max-w-[440px]">
    <svg viewBox="0 0 480 560" width="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sac_f" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={p.f1} />
          <stop offset="25%" stopColor={p.f2} />
          <stop offset="55%" stopColor={p.f3} />
          <stop offset="80%" stopColor={`${p.f1}cc`} />
          <stop offset="100%" stopColor={p.f1} />
        </linearGradient>
        <linearGradient id="sac_top" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={p.f3} />
          <stop offset="100%" stopColor={p.f2} />
        </linearGradient>
        <linearGradient id="sac_side" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={p.side} />
          <stop offset="100%" stopColor={p.f1} />
        </linearGradient>
        <filter id="sac_sh">
          <feDropShadow dx="7" dy="16" stdDeviation="18" floodColor="#0a1a10" floodOpacity=".44" />
        </filter>
      </defs>
      <ellipse cx="232" cy="550" rx="160" ry="11" fill="rgba(0,0,0,.22)" />
      <path d="M54,158 L34,516 L78,530 L94,174Z" fill="url(#sac_side)" />
      <path d="M94,174 L78,530 L370,530 L354,174Z" fill="url(#sac_f)" filter="url(#sac_sh)" />
      <path d="M54,158 L94,174 L354,174 L394,158 L378,118 L70,118Z" fill="url(#sac_top)" />
      <path d="M112,184 Q108,352 110,520" fill="none" stroke="rgba(255,255,255,.07)" strokeWidth="26" strokeLinecap="round" />
      <path d="M338,184 Q344,352 342,520" fill="none" stroke="rgba(0,0,0,.10)" strokeWidth="28" />
      <path d="M148,118 Q136,32 164,14 Q188,-2 196,14 Q204,30 190,118" fill="none" stroke="#DDD3BB" strokeWidth="13" strokeLinecap="round" />
      <path d="M148,118 Q136,32 164,14" fill="none" stroke="rgba(0,0,0,.20)" strokeWidth="4" strokeLinecap="round" />
      <path d="M172,118 Q160,32 188,14 Q212,-2 220,14 Q228,30 214,118" fill="none" stroke="#c8c0ae" strokeWidth="13" strokeLinecap="round" />
      <line x1="80" y1="510" x2="352" y2="510" stroke="rgba(201,148,58,.45)" strokeWidth="3" />
      <path d="M78,530 L80,540 L368,540 L370,530Z" fill={`${p.side}A6`} />
      <g transform="translate(114,329) scale(0.540)">
        <path d="M38,5 A28,28 0 1,0 38,55" fill="none" stroke={tw(0.94)} strokeWidth="5.5" strokeDasharray="0.8,9" strokeLinecap="round" />
        <circle cx="98" cy="30" r="26" fill={c.accent} />
        <circle cx="98" cy="30" r="26" fill="none" stroke="rgba(255,255,255,.24)" strokeWidth="2" />
        <path d="M36,12 C32,2 24,0 15,0 C6,0 0,5 0,14 C0,24 8,28 20,28 C32,28 38,33 38,44 C38,53 31,58 20,58 C12,58 2,55 0,46" fill="none" stroke={tw(0.94)} strokeWidth="5.5" strokeDasharray="0.8,9" strokeLinecap="round" transform="translate(136,2)" />
        <path d="M0,58 L0,0 L25,34 L50,0 L50,58" fill="none" stroke={tw(0.94)} strokeWidth="5.5" strokeDasharray="0.8,9" strokeLinecap="round" transform="translate(196,2)" />
        <circle cx="284" cy="30" r="26" fill={c.accent} />
        <circle cx="284" cy="30" r="26" fill="none" stroke="rgba(255,255,255,.18)" strokeWidth="1.5" />
        <path d="M36,12 C32,2 24,0 15,0 C6,0 0,5 0,14 C0,24 8,28 20,28 C32,28 38,33 38,44 C38,53 31,58 20,58 C12,58 2,55 0,46" fill="none" stroke={tw(0.94)} strokeWidth="5.5" strokeDasharray="0.8,9" strokeLinecap="round" transform="translate(322,2)" />
        <text x="2" y="86" fontFamily="'Inter',sans-serif" fontSize="15" fontWeight="700" letterSpacing="8" fill={c.accent}>ANGRÉ</text>
      </g>
    </svg>
  </div>
);

/* ═══════════════════════════════════════════════════════════════
   3. GOBELET TAKEAWAY
   ═══════════════════════════════════════════════════════════════ */
const GobeletSvg: React.FC<SvgProps> = ({ c, p, tw, accentRgba }) => (
  <div className="w-full max-w-[420px]">
    <svg viewBox="0 0 460 520" width="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gob_b" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={p.f1} />
          <stop offset="24%" stopColor={`${p.f1}cc`} />
          <stop offset="52%" stopColor={p.f2} />
          <stop offset="78%" stopColor={`${p.f1}cc`} />
          <stop offset="100%" stopColor={p.f1} />
        </linearGradient>
        <linearGradient id="gob_lid" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f8f2e6" />
          <stop offset="100%" stopColor="#d8d0bc" />
        </linearGradient>
        <linearGradient id="gob_or" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#a07028" />
          <stop offset="40%" stopColor={c.accent} />
          <stop offset="65%" stopColor="#e8c060" />
          <stop offset="100%" stopColor="#a07028" />
        </linearGradient>
        <filter id="gob_sh">
          <feDropShadow dx="7" dy="14" stdDeviation="16" floodColor="#0a1a10" floodOpacity=".32" />
        </filter>
      </defs>
      <ellipse cx="230" cy="512" rx="128" ry="10" fill="rgba(0,0,0,.19)" />
      <path d="M74,118 Q66,444 78,460 L382,460 Q394,444 386,118Z" fill="url(#gob_b)" filter="url(#gob_sh)" />
      <path d="M92,130 Q88,288 90,452" fill="none" stroke="rgba(255,255,255,.12)" strokeWidth="34" strokeLinecap="round" />
      <path d="M356,130 Q362,288 360,452" fill="none" stroke="rgba(0,0,0,.11)" strokeWidth="28" />
      <ellipse cx="230" cy="116" rx="158" ry="34" fill="url(#gob_lid)" />
      <path d="M72,118 Q230,150 388,118 Q388,98 230,92 Q72,98 72,118" fill="#e0d8c8" />
      <ellipse cx="230" cy="116" rx="156" ry="32" fill="none" stroke="#c8c0ae" strokeWidth="2.5" />
      <path d="M170,100 Q230,86 290,100" fill="#b0a898" stroke="#a09888" strokeWidth="2" />
      {/* Colored accent band on lid */}
      <ellipse cx="230" cy="108" rx="140" ry="28" fill="none" stroke={accentRgba(0.30)} strokeWidth="3" />
      <path d="M74,118 Q230,146 386,118" fill="none" stroke="url(#gob_or)" strokeWidth="9" opacity=".92" />
      <path d="M74,118 Q230,142 386,118" fill="none" stroke="rgba(255,248,200,.55)" strokeWidth="3.5" opacity=".50" />
      <path d="M80,442 Q230,456 380,442" fill="none" stroke="url(#gob_or)" strokeWidth="7" opacity=".82" />
      <path d="M78,460 Q84,480 98,482 L362,482 Q376,480 382,460Z" fill={p.f1} />
      <ellipse cx="230" cy="482" rx="134" ry="11" fill={p.side} />
      <g transform="translate(106,261) scale(0.620)">
        <path d="M38,5 A28,28 0 1,0 38,55" fill="none" stroke={tw(0.93)} strokeWidth="5.5" strokeDasharray="0.8,9" strokeLinecap="round" />
        <circle cx="98" cy="30" r="26" fill={c.accent} />
        <circle cx="98" cy="30" r="26" fill="none" stroke="rgba(255,255,255,.24)" strokeWidth="2" />
        <path d="M36,12 C32,2 24,0 15,0 C6,0 0,5 0,14 C0,24 8,28 20,28 C32,28 38,33 38,44 C38,53 31,58 20,58 C12,58 2,55 0,46" fill="none" stroke={tw(0.93)} strokeWidth="5.5" strokeDasharray="0.8,9" strokeLinecap="round" transform="translate(136,2)" />
        <path d="M0,58 L0,0 L25,34 L50,0 L50,58" fill="none" stroke={tw(0.93)} strokeWidth="5.5" strokeDasharray="0.8,9" strokeLinecap="round" transform="translate(196,2)" />
        <circle cx="284" cy="30" r="26" fill={c.accent} />
        <circle cx="284" cy="30" r="26" fill="none" stroke="rgba(255,255,255,.18)" strokeWidth="1.5" />
        <path d="M36,12 C32,2 24,0 15,0 C6,0 0,5 0,14 C0,24 8,28 20,28 C32,28 38,33 38,44 C38,53 31,58 20,58 C12,58 2,55 0,46" fill="none" stroke={tw(0.93)} strokeWidth="5.5" strokeDasharray="0.8,9" strokeLinecap="round" transform="translate(322,2)" />
        <text x="2" y="86" fontFamily="'Inter',sans-serif" fontSize="15" fontWeight="700" letterSpacing="8" fill={c.accent}>ANGRÉ</text>
      </g>
    </svg>
  </div>
);

/* ═══════════════════════════════════════════════════════════════
   4. PORTE-CLÉS MÉDAILLON
   ═══════════════════════════════════════════════════════════════ */
const PorteClesSvg: React.FC<SvgProps> = ({ c, darkRgba, accentRgba, accentLighter, accentDarker }) => (
  <div className="w-full max-w-[360px]">
    <svg viewBox="0 0 400 540" width="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="pk_m" cx="34%" cy="28%" r="68%">
          <stop offset="0%" stopColor={accentLighter()} />
          <stop offset="30%" stopColor={accentRgba(0.90)} />
          <stop offset="65%" stopColor={c.accent} />
          <stop offset="100%" stopColor={accentDarker()} />
        </radialGradient>
        <radialGradient id="pk_gl" cx="26%" cy="20%" r="52%">
          <stop offset="0%" stopColor="rgba(255,255,255,.60)" />
          <stop offset="55%" stopColor="rgba(255,255,255,.08)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
        <radialGradient id="pk_ring" cx="34%" cy="28%" r="68%">
          <stop offset="0%" stopColor={accentLighter()} />
          <stop offset="50%" stopColor={c.accent} />
          <stop offset="100%" stopColor={accentDarker()} />
        </radialGradient>
        <filter id="pk_sh">
          <feDropShadow dx="6" dy="14" stdDeviation="20" floodColor="#5a3600" floodOpacity=".52" />
        </filter>
      </defs>
      <ellipse cx="200" cy="532" rx="120" ry="9" fill="rgba(0,0,0,.26)" />
      <circle cx="200" cy="52" r="46" fill="none" stroke="url(#pk_ring)" strokeWidth="15" />
      <circle cx="200" cy="52" r="46" fill="none" stroke="rgba(255,255,255,.48)" strokeWidth="4" />
      <circle cx="200" cy="52" r="38" fill="none" stroke="rgba(0,0,0,.14)" strokeWidth="2" />
      <path d="M166,22 Q158,52 166,82" fill="none" stroke="rgba(255,255,255,.30)" strokeWidth="6" strokeLinecap="round" />
      <ellipse cx="200" cy="110" rx="11" ry="5.5" fill="none" stroke={accentRgba(0.85)} strokeWidth="3.5" />
      <ellipse cx="200" cy="123" rx="6.5" ry="11" fill="none" stroke={c.accent} strokeWidth="3.5" />
      <ellipse cx="200" cy="136" rx="11" ry="5.5" fill="none" stroke={accentRgba(0.85)} strokeWidth="3.5" />
      <ellipse cx="200" cy="149" rx="6.5" ry="11" fill="none" stroke={c.accent} strokeWidth="3.5" />
      <ellipse cx="200" cy="162" rx="11" ry="5.5" fill="none" stroke={accentRgba(0.85)} strokeWidth="3.5" />
      <ellipse cx="200" cy="175" rx="6.5" ry="11" fill="none" stroke={c.accent} strokeWidth="3.5" />
      <circle cx="200" cy="360" r="152" fill="url(#pk_m)" filter="url(#pk_sh)" />
      <circle cx="200" cy="360" r="152" fill="url(#pk_gl)" />
      <circle cx="200" cy="360" r="152" fill="none" stroke="rgba(255,255,255,.52)" strokeWidth="4" />
      <circle cx="200" cy="360" r="142" fill="none" stroke="rgba(255,255,255,.20)" strokeWidth="1.5" />
      <circle cx="200" cy="360" r="128" fill="rgba(0,0,0,.06)" />
      <circle cx="200" cy="360" r="128" fill="none" stroke="rgba(255,255,255,.14)" strokeWidth="2" />
      <path d="M90,448 Q200,476 310,448" fill="none" stroke="rgba(255,255,255,.18)" strokeWidth="6" strokeLinecap="round" />
      <g transform="translate(82,335) scale(0.590)">
        <path d="M38,5 A28,28 0 1,0 38,55" fill="none" stroke={darkRgba(0.80)} strokeWidth="5.5" strokeDasharray="0.8,9" strokeLinecap="round" />
        <circle cx="98" cy="30" r="26" fill={darkRgba(0.50)} />
        <circle cx="98" cy="30" r="26" fill="none" stroke="rgba(255,255,255,.15)" strokeWidth="1.5" />
        <path d="M36,12 C32,2 24,0 15,0 C6,0 0,5 0,14 C0,24 8,28 20,28 C32,28 38,33 38,44 C38,53 31,58 20,58 C12,58 2,55 0,46" fill="none" stroke={darkRgba(0.80)} strokeWidth="5.5" strokeDasharray="0.8,9" strokeLinecap="round" transform="translate(136,2)" />
        <path d="M0,58 L0,0 L25,34 L50,0 L50,58" fill="none" stroke={darkRgba(0.80)} strokeWidth="5.5" strokeDasharray="0.8,9" strokeLinecap="round" transform="translate(196,2)" />
        <circle cx="284" cy="30" r="26" fill={darkRgba(0.50)} />
        <circle cx="284" cy="30" r="26" fill="none" stroke="rgba(255,255,255,.12)" strokeWidth="1.5" />
        <path d="M36,12 C32,2 24,0 15,0 C6,0 0,5 0,14 C0,24 8,28 20,28 C32,28 38,33 38,44 C38,53 31,58 20,58 C12,58 2,55 0,46" fill="none" stroke={darkRgba(0.80)} strokeWidth="5.5" strokeDasharray="0.8,9" strokeLinecap="round" transform="translate(322,2)" />
        <text x="2" y="86" fontFamily="'Inter',sans-serif" fontSize="15" fontWeight="700" letterSpacing="8" fill={darkRgba(0.75)}>ANGRÉ</text>
      </g>
    </svg>
  </div>
);

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════ */
const GoodiesMockupsSection: React.FC<{ k: ScenarioKey }> = ({ k }) => {
  const [activeTab, setActiveTab] = useState('tasse');
  const c = sc[k];
  const p = goodiePal[k];
  const activeInfo = tabs.find(t => t.id === activeTab)!;

  const tw = (opacity: number): string => {
    if (c.textOnDark === '#fff') return `rgba(255,255,255,${opacity})`;
    const hex = c.textOnDark.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r},${g},${b},${opacity})`;
  };

  const primaryRgba = (opacity: number) => hexRgba(c.primary, opacity);
  const darkRgba = (opacity: number) => hexRgba(c.dark, opacity);
  const accentRgba = (opacity: number) => hexRgba(c.accent, opacity);
  const accentLighter = () => lightenHex(c.accent, 0.23);
  const accentDarker = () => darkenHex(c.accent, 0.35);

  return (
    <div id="bw-goodies" className="py-16 border-b border-black/[.08]">
      <div className="bg-white rounded-[18px] border border-black/[.06] overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,.04)]">
        {/* Header */}
        <div
          className="px-4 sm:px-8 py-6 border-b border-black/[.06]"
          style={{ background: `linear-gradient(to bottom right, ${c.dark}, ${c.primary})` }}
        >
          <div className="text-[9px] font-bold tracking-[.25em] uppercase mb-1" style={{ color: c.accent }}>Brand World · B5</div>
          <div className="font-cormorant text-[24px] text-white font-light">Goodies {'&'} Objets</div>
          <div className="text-[10px] text-white/30 mt-1">4 pièces · Tasse · Sac · Gobelet · Porte-clés</div>
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
            style={{ background: 'linear-gradient(155deg,#e8e4db,#ccc6b8)' }}
          >
            {activeTab === 'tasse' && <TasseSvg c={c} p={p} tw={tw} primaryRgba={primaryRgba} darkRgba={darkRgba} accentRgba={accentRgba} accentLighter={accentLighter} accentDarker={accentDarker} />}
            {activeTab === 'sac' && <SacSvg c={c} p={p} tw={tw} primaryRgba={primaryRgba} darkRgba={darkRgba} accentRgba={accentRgba} accentLighter={accentLighter} accentDarker={accentDarker} />}
            {activeTab === 'gobelet' && <GobeletSvg c={c} p={p} tw={tw} primaryRgba={primaryRgba} darkRgba={darkRgba} accentRgba={accentRgba} accentLighter={accentLighter} accentDarker={accentDarker} />}
            {activeTab === 'portes' && <PorteClesSvg c={c} p={p} tw={tw} primaryRgba={primaryRgba} darkRgba={darkRgba} accentRgba={accentRgba} accentLighter={accentLighter} accentDarker={accentDarker} />}
          </div>

          {/* Info bar */}
          <div className="px-6 py-5 border-t border-black/[.06] flex items-center justify-between gap-4 flex-wrap">
            <div>
              <div className="text-[9px] font-bold tracking-wider uppercase mb-1" style={{ color: c.accent }}>● Goodies · {activeInfo.role}</div>
              <div className="text-[18px] font-bold" style={{ color: c.dark }}>{activeInfo.name}</div>
              <div className="text-[11px] text-black/40 mt-1 leading-relaxed">{activeInfo.spec}</div>
            </div>
            <div
              className="px-4 py-2 rounded-full text-[10px] font-bold tracking-wider uppercase whitespace-nowrap"
              style={{ background: `${c.primary}10`, color: c.primary }}
            >
              Brand World B7
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoodiesMockupsSection;
