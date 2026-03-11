import React, { useState } from 'react';
import type { ScenarioKey } from './Scenarios';
import { hexRgba } from './colorUtils';

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

const textPal: Record<ScenarioKey, { f1: string; f2: string; f3: string; side: string; colDark: string; khaki: string; goldSoft: string }> = {
  A: { f1: '#1e3829', f2: '#2F5439', f3: '#3d6b4a', side: '#0d2016', colDark: '#1A1410', khaki: '#76764D', goldSoft: '#E8C97A' },
  B: { f1: '#081230', f2: '#0D1B4B', f3: '#1a3065', side: '#04091a', colDark: '#060E2A', khaki: '#1A3060', goldSoft: '#D4B06A' },
  C: { f1: '#7A3A1E', f2: '#B25A38', f3: '#D47850', side: '#4A2010', colDark: '#2C1A0A', khaki: '#6D7447', goldSoft: '#D6C29C' },
  D: { f1: '#2A3320', f2: '#898D5D', f3: '#A5A97A', side: '#1C2215', colDark: '#1C2215', khaki: '#6B7A4A', goldSoft: '#D4A843' },
};

const tabs = [
  { id: 'staff', label: 'Polo Staff', role: '1 / 4', name: 'Polo Staff', spec: 'Couleur principale · Col sable · Piqué coton bio 220g · Logo brodé poitrine gauche' },
  { id: 'manager', label: 'Blazer Manager', role: '2 / 4', name: 'Blazer Manager', spec: 'Noir Chaud · Revers couleur principale · Pochette sable · Laine mélangée premium' },
  { id: 'accueil', label: 'Polo Accueil', role: '3 / 4', name: 'Polo Accueil', spec: 'Sable Territorial · Col couleur principale · Liseré manches · Broderie poitrine gauche' },
  { id: 'tech', label: 'Combinaison Tech', role: '4 / 4', name: 'Combinaison Technique', spec: 'Kaki Minéral · Col sable · Bandes réfléchissantes Or Doux · Poches cargo · Broderie Or Doux' },
];

interface SvgProps {
  c: ScColors;
  p: typeof textPal['A'];
  tw: (opacity: number) => string;
  primaryRgba: (opacity: number) => string;
  accentRgba: (opacity: number) => string;
}


/* ── Shared inline logo paths for the COSMOS ANGRÉ brodé logo ── */
const LogoPaths: React.FC<{ dotColor: string; goldColor: string; sw: number }> = ({ dotColor, goldColor, sw }) => {
  const solid = { fill: 'none' as const, stroke: dotColor, strokeWidth: sw, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  return (
    <>
      {/* C */}
      <path d="M38,5 A28,28 0 1,0 38,55" {...solid} />
      {/* O gold */}
      <circle cx={98} cy={30} r={26} fill={goldColor} />
      <circle cx={98} cy={30} r={26} fill="none" stroke="rgba(255,255,255,.3)" strokeWidth={2} />
      {/* S */}
      <path d="M36,12 C32,2 24,0 15,0 C6,0 0,5 0,14 C0,24 8,28 20,28 C32,28 38,33 38,44 C38,53 31,58 20,58 C12,58 2,55 0,46" {...solid} transform="translate(136,2)" />
      {/* M */}
      <path d="M0,58 L0,0 L25,34 L50,0 L50,58" {...solid} transform="translate(196,2)" />
      {/* O gold */}
      <circle cx={284} cy={30} r={26} fill={goldColor} />
      <circle cx={284} cy={30} r={26} fill="none" stroke="rgba(255,255,255,.25)" strokeWidth={1.5} />
      {/* S */}
      <path d="M36,12 C32,2 24,0 15,0 C6,0 0,5 0,14 C0,24 8,28 20,28 C32,28 38,33 38,44 C38,53 31,58 20,58 C12,58 2,55 0,46" {...solid} transform="translate(322,2)" />
      {/* ANGRÉ */}
      <text x="2" y="86" fontFamily="'Inter',sans-serif" fontSize="15" fontWeight="700" letterSpacing="7.5" fill={goldColor}>ANGRÉ</text>
    </>
  );
};

/* ═══════════════════════════════════════════════════════════════
   1. POLO STAFF
   ═══════════════════════════════════════════════════════════════ */
const PoloStaffSvg: React.FC<SvgProps> = ({ c, p, tw }) => (
  <div className="w-full max-w-[520px]">
    <svg viewBox="0 0 600 680" width="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sF_b" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={p.f3} /><stop offset="50%" stopColor={p.f2} /><stop offset="100%" stopColor={p.f1} />
        </linearGradient>
        <linearGradient id="sF_ml" x1="100%" y1="0%" x2="0%" y2="0%">
          <stop offset="0%" stopColor={p.f1} /><stop offset="100%" stopColor={p.side} />
        </linearGradient>
        <linearGradient id="sF_mr" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={p.f1} /><stop offset="100%" stopColor={p.side} />
        </linearGradient>
        <filter id="drop1"><feDropShadow dx="6" dy="16" stdDeviation="18" floodColor={p.side} floodOpacity=".38" /></filter>
      </defs>
      <ellipse cx="300" cy="670" rx="190" ry="12" fill="rgba(0,0,0,.14)" />
      {/* Left sleeve */}
      <path d="M140,100 L20,170 L20,350 Q20,368 42,368 L138,348Z" fill="url(#sF_ml)" filter="url(#drop1)" />
      <path d="M138,112 L138,348" stroke="rgba(0,0,0,.14)" strokeWidth="10" fill="none" />
      {/* Right sleeve */}
      <path d="M460,100 L580,170 L580,350 Q580,368 558,368 L462,348Z" fill="url(#sF_mr)" />
      <path d="M462,112 L462,348" stroke="rgba(0,0,0,.10)" strokeWidth="10" fill="none" />
      {/* Body */}
      <path d="M140,100 L138,348 L122,655 L478,655 L462,348 L460,100 L408,28 Q348,84 300,84 Q252,84 192,28Z" fill="url(#sF_b)" filter="url(#drop1)" />
      {/* Collar */}
      <path d="M192,28 Q252,84 300,84 Q348,84 408,28 L386,4 Q340,52 300,52 Q260,52 214,4Z" fill={c.secondary} />
      <path d="M214,4 Q260,52 300,52 Q340,52 386,4 L380,14 Q336,58 300,58 Q264,58 220,14Z" fill="rgba(0,0,0,.08)" />
      {/* Center line + buttons */}
      <line x1="300" y1="88" x2="300" y2="654" stroke="rgba(255,255,255,.04)" strokeWidth="3" />
      <circle cx="300" cy="114" r="7" fill={hexRgba(c.accent, 0.55)} />
      <circle cx="300" cy="140" r="7" fill={hexRgba(c.accent, 0.38)} />
      {/* Sleeve highlight */}
      <path d="M36,180 Q30,268 30,356" stroke="rgba(255,255,255,.08)" strokeWidth="22" fill="none" strokeLinecap="round" />
      {/* Side seams */}
      <path d="M222,102 Q218,360 216,648" stroke="rgba(0,0,0,.05)" strokeWidth="10" fill="none" />
      <path d="M378,102 Q382,360 384,648" stroke="rgba(0,0,0,.05)" strokeWidth="10" fill="none" />
      {/* Logo – poitrine gauche */}
      <g transform="translate(148,138) scale(0.52)">
        <LogoPaths dotColor={tw(0.95)} goldColor={c.accent} sw={5} />
      </g>
    </svg>
  </div>
);

/* ═══════════════════════════════════════════════════════════════
   2. BLAZER MANAGER
   ═══════════════════════════════════════════════════════════════ */
const BlazerManagerSvg: React.FC<SvgProps> = ({ c, p, accentRgba }) => (
  <div className="w-full max-w-[520px]">
    <svg viewBox="0 0 600 680" width="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bN_b" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={hexRgba(p.colDark, 1)} />
          <stop offset="55%" stopColor={p.colDark} />
          <stop offset="100%" stopColor={hexRgba(p.colDark, 0.85)} />
        </linearGradient>
        <linearGradient id="bN_ml" x1="100%" y1="0%" x2="0%" y2="0%">
          <stop offset="0%" stopColor={p.colDark} /><stop offset="100%" stopColor={hexRgba(p.colDark, 0.7)} />
        </linearGradient>
        <linearGradient id="bN_rv" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={p.f3} /><stop offset="100%" stopColor={p.f1} />
        </linearGradient>
        <filter id="drop2"><feDropShadow dx="6" dy="16" stdDeviation="18" floodColor="#050302" floodOpacity=".52" /></filter>
      </defs>
      <ellipse cx="300" cy="670" rx="190" ry="12" fill="rgba(0,0,0,.20)" />
      {/* Left sleeve */}
      <path d="M132,96 L12,162 L14,356 Q14,374 36,374 L130,356Z" fill="url(#bN_ml)" filter="url(#drop2)" />
      <circle cx="26" cy="350" r="6" fill={accentRgba(0.6)} />
      <circle cx="26" cy="368" r="6" fill={accentRgba(0.45)} />
      {/* Right sleeve */}
      <path d="M468,96 L588,162 L586,356 Q586,374 564,374 L470,356Z" fill="url(#bN_b)" />
      <circle cx="574" cy="350" r="6" fill={accentRgba(0.6)} />
      <circle cx="574" cy="368" r="6" fill={accentRgba(0.45)} />
      {/* Body */}
      <path d="M132,96 L130,356 L114,655 L486,655 L470,356 L468,96 L416,24 L368,112 L300,136 L232,112 L184,24Z" fill="url(#bN_b)" filter="url(#drop2)" />
      {/* Revers (lapels) */}
      <path d="M184,24 L232,112 L300,136 L300,68 L268,4Z" fill="url(#bN_rv)" />
      <path d="M416,24 L368,112 L300,136 L300,68 L332,4Z" fill="url(#bN_rv)" />
      {/* V-neck / shirt */}
      <path d="M268,4 L300,68 L332,4 L322,0 L300,26 L278,0Z" fill={c.secondary} />
      <path d="M232,112 L300,136 L368,112" stroke="rgba(0,0,0,.22)" strokeWidth="5" fill="none" />
      {/* Center line + buttons */}
      <line x1="300" y1="138" x2="300" y2="653" stroke="rgba(255,255,255,.04)" strokeWidth="3" />
      <circle cx="300" cy="184" r="7" fill={accentRgba(0.65)} />
      <circle cx="300" cy="232" r="7" fill={accentRgba(0.55)} />
      <circle cx="300" cy="280" r="7" fill={accentRgba(0.45)} />
      {/* Pocket chest left */}
      <rect x="142" y="182" width="70" height="24" rx="5" fill="rgba(255,255,255,.06)" stroke="rgba(255,255,255,.11)" strokeWidth="1.5" />
      <path d="M150,182 L156,164 L202,164 L208,182" fill={c.secondary} opacity=".90" />
      {/* Pockets bottom */}
      <rect x="136" y="406" width="94" height="52" rx="7" fill="rgba(255,255,255,.04)" stroke="rgba(255,255,255,.07)" strokeWidth="1.5" />
      <rect x="370" y="406" width="94" height="52" rx="7" fill="rgba(255,255,255,.04)" stroke="rgba(255,255,255,.07)" strokeWidth="1.5" />
      {/* Sleeve highlight */}
      <path d="M28,172 Q22,268 22,360" stroke="rgba(255,255,255,.05)" strokeWidth="26" fill="none" strokeLinecap="round" />
      {/* Pin's on left lapel */}
      <circle cx="248" cy="82" r="22" fill={c.accent} />
      <circle cx="248" cy="82" r="22" fill="none" stroke="rgba(255,255,255,.45)" strokeWidth="2.5" />
      <circle cx="248" cy="82" r="22" fill="none" stroke="rgba(0,0,0,.12)" strokeWidth="1" />
      <ellipse cx="241" cy="74" rx="8" ry="6" fill="rgba(255,255,255,.3)" transform="rotate(-30,241,74)" />
      <circle cx="248" cy="82" r="11" fill={hexRgba(p.colDark, 0.55)} />
      <circle cx="248" cy="82" r="11" fill="none" stroke="rgba(255,255,255,.35)" strokeWidth="1.5" />
      {/* Monogramme C on pocket */}
      <text x="177" y="202" textAnchor="middle" fontFamily="'Cormorant Garamond',serif" fontSize="22" fontWeight="300" fontStyle="italic" fill={accentRgba(0.9)} letterSpacing="1">C</text>
    </svg>
  </div>
);

/* ═══════════════════════════════════════════════════════════════
   3. POLO ACCUEIL
   ═══════════════════════════════════════════════════════════════ */
const PoloAccueilSvg: React.FC<SvgProps> = ({ c, p, primaryRgba }) => (
  <div className="w-full max-w-[520px]">
    <svg viewBox="0 0 600 680" width="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="aS_b" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fffef8" /><stop offset="40%" stopColor={c.secondary} /><stop offset="100%" stopColor="#d4ccb8" />
        </linearGradient>
        <linearGradient id="aS_ml" x1="100%" y1="0%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#e4dccc" /><stop offset="100%" stopColor="#d4ccb8" />
        </linearGradient>
        <filter id="drop3"><feDropShadow dx="5" dy="12" stdDeviation="14" floodColor="#a89e88" floodOpacity=".20" /></filter>
      </defs>
      <ellipse cx="300" cy="670" rx="190" ry="12" fill="rgba(0,0,0,.09)" />
      {/* Left sleeve */}
      <path d="M140,100 L20,170 L20,350 Q20,368 42,368 L138,348Z" fill="url(#aS_ml)" filter="url(#drop3)" />
      <path d="M20,172 L20,350" stroke={c.primary} strokeWidth="13" fill="none" strokeLinecap="round" />
      {/* Right sleeve */}
      <path d="M460,100 L580,170 L580,350 Q580,368 558,368 L462,348Z" fill="url(#aS_b)" />
      <path d="M580,172 L580,350" stroke={c.primary} strokeWidth="13" fill="none" strokeLinecap="round" />
      {/* Body */}
      <path d="M140,100 L138,348 L122,655 L478,655 L462,348 L460,100 L408,28 Q348,84 300,84 Q252,84 192,28Z" fill="url(#aS_b)" filter="url(#drop3)" />
      {/* Collar in primary color */}
      <path d="M192,28 Q252,84 300,84 Q348,84 408,28 L386,4 Q340,52 300,52 Q260,52 214,4Z" fill={c.primary} />
      <path d="M214,4 Q260,52 300,52 Q340,52 386,4 L382,12 Q338,58 300,58 Q262,58 218,12Z" fill="rgba(255,255,255,.07)" />
      {/* Buttons */}
      <circle cx="300" cy="114" r="7" fill={primaryRgba(0.35)} />
      <circle cx="300" cy="140" r="7" fill={primaryRgba(0.25)} />
      {/* Side seams */}
      <path d="M222,102 Q218,360 216,648" stroke="rgba(0,0,0,.04)" strokeWidth="10" fill="none" />
      <path d="M378,102 Q382,360 384,648" stroke="rgba(0,0,0,.04)" strokeWidth="10" fill="none" />
      {/* Logo – poitrine gauche – dark dots on light surface */}
      <g transform="translate(148,138) scale(0.52)">
        <LogoPaths dotColor={primaryRgba(0.95)} goldColor={c.accent} sw={5} />
      </g>
    </svg>
  </div>
);

/* ═══════════════════════════════════════════════════════════════
   4. COMBINAISON TECHNIQUE
   ═══════════════════════════════════════════════════════════════ */
const CombiTechSvg: React.FC<SvgProps> = ({ c, p, tw }) => (
  <div className="w-full max-w-[520px]">
    <svg viewBox="0 0 600 680" width="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="tK_b" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={hexRgba(p.khaki, 1)} />
          <stop offset="50%" stopColor={p.khaki} />
          <stop offset="100%" stopColor={hexRgba(p.khaki, 0.7)} />
        </linearGradient>
        <linearGradient id="tK_ml" x1="100%" y1="0%" x2="0%" y2="0%">
          <stop offset="0%" stopColor={hexRgba(p.khaki, 0.8)} /><stop offset="100%" stopColor={hexRgba(p.khaki, 0.5)} />
        </linearGradient>
        <filter id="drop4"><feDropShadow dx="5" dy="12" stdDeviation="14" floodColor={p.side} floodOpacity=".28" /></filter>
      </defs>
      <ellipse cx="300" cy="670" rx="190" ry="12" fill="rgba(0,0,0,.14)" />
      {/* Left sleeve */}
      <path d="M140,100 L20,170 L20,350 Q20,368 42,368 L138,348Z" fill="url(#tK_ml)" filter="url(#drop4)" />
      <path d="M20,258 L138,270 L138,288 L20,276Z" fill={p.goldSoft} opacity=".75" />
      {/* Right sleeve */}
      <path d="M460,100 L580,170 L580,350 Q580,368 558,368 L462,348Z" fill="url(#tK_b)" />
      <path d="M580,258 L462,270 L462,288 L580,276Z" fill={p.goldSoft} opacity=".75" />
      {/* Body */}
      <path d="M140,100 L138,348 L122,655 L478,655 L462,348 L460,100 L408,28 Q348,84 300,84 Q252,84 192,28Z" fill="url(#tK_b)" filter="url(#drop4)" />
      {/* Collar sable */}
      <path d="M192,28 Q252,84 300,84 Q348,84 408,28 L386,4 Q340,52 300,52 Q260,52 214,4Z" fill={c.secondary} />
      {/* Reflective bands */}
      <path d="M124,420 Q300,436 476,420 L476,442 Q300,458 124,442Z" fill={p.goldSoft} opacity=".76" />
      <path d="M124,474 Q300,490 476,474 L476,496 Q300,512 124,496Z" fill={p.goldSoft} opacity=".56" />
      {/* Chest pocket */}
      <rect x="152" y="190" width="74" height="58" rx="7" fill="rgba(0,0,0,.14)" stroke={`${c.secondary}26`} strokeWidth="2" />
      <rect x="174" y="183" width="7" height="20" rx="3" fill={`${c.secondary}73`} />
      <rect x="186" y="183" width="7" height="20" rx="3" fill={hexRgba(c.accent, 0.55)} />
      {/* Cargo pockets */}
      <rect x="134" y="362" width="94" height="72" rx="7" fill="rgba(0,0,0,.12)" stroke={`${c.secondary}24`} strokeWidth="2" />
      <path d="M134,380 Q181,370 228,380" stroke={`${c.secondary}40`} strokeWidth="2" fill="none" />
      <rect x="372" y="362" width="94" height="72" rx="7" fill="rgba(0,0,0,.12)" stroke={`${c.secondary}24`} strokeWidth="2" />
      <path d="M372,380 Q419,370 466,380" stroke={`${c.secondary}40`} strokeWidth="2" fill="none" />
      {/* Side seams */}
      <path d="M222,102 Q218,360 216,648" stroke="rgba(0,0,0,.06)" strokeWidth="10" fill="none" />
      <path d="M378,102 Q382,360 384,648" stroke="rgba(0,0,0,.06)" strokeWidth="10" fill="none" />
      {/* Logo – poitrine gauche, au-dessus poche */}
      <g transform="translate(148,120) scale(0.52)">
        <LogoPaths dotColor={tw(0.95)} goldColor={c.accent} sw={5} />
      </g>
    </svg>
  </div>
);

/* ═══════════════════════════════════════════════════════════════
   SECTION WRAPPER
   ═══════════════════════════════════════════════════════════════ */
const TextileMockupsSection: React.FC<{ k: ScenarioKey }> = ({ k }) => {
  const [activeTab, setActiveTab] = useState('staff');
  const c = sc[k];
  const p = textPal[k];
  const tw = (opacity: number) => {
    const h = c.textOnDark.replace('#', '');
    const r = parseInt(h.substring(0, 2), 16);
    const g = parseInt(h.substring(2, 4), 16);
    const b = parseInt(h.substring(4, 6), 16);
    return `rgba(${r},${g},${b},${opacity})`;
  };
  const primaryRgba = (opacity: number) => hexRgba(c.primary, opacity);
  const _accentRgba = (opacity: number) => hexRgba(c.accent, opacity);

  const activeInfo = tabs.find(t => t.id === activeTab) || tabs[0];

  const roleColors: Record<string, string> = {
    staff: c.primary,
    manager: p.colDark,
    accueil: p.khaki,
    tech: p.khaki,
  };

  return (
    <div id="bw-textile" className="py-16 border-b border-black/[.08]">
      <div className="bg-white rounded-[18px] border border-black/[.06] overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,.04)]">
        {/* Header */}
        <div
          className="px-4 sm:px-8 py-6 border-b border-black/[.06]"
          style={{ background: `linear-gradient(to bottom right, ${c.dark}, ${c.primary})` }}
        >
          <div className="text-[9px] font-bold tracking-[.25em] uppercase mb-1" style={{ color: c.accent }}>Brand World · B4</div>
          <div className="font-cormorant text-[24px] text-white font-light">Uniformes {'&'} Textile</div>
          <div className="text-[10px] text-white/60 mt-1">4 rôles · Placement logo réaliste · Navigation par pièce</div>
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
            style={{ background: 'linear-gradient(160deg,#e8e4db,#d4cec2)' }}
          >
            {activeTab === 'staff' && <PoloStaffSvg c={c} p={p} tw={tw} primaryRgba={primaryRgba} accentRgba={_accentRgba} />}
            {activeTab === 'manager' && <BlazerManagerSvg c={c} p={p} tw={tw} primaryRgba={primaryRgba} accentRgba={_accentRgba} />}
            {activeTab === 'accueil' && <PoloAccueilSvg c={c} p={p} tw={tw} primaryRgba={primaryRgba} accentRgba={_accentRgba} />}
            {activeTab === 'tech' && <CombiTechSvg c={c} p={p} tw={tw} primaryRgba={primaryRgba} accentRgba={_accentRgba} />}
          </div>

          {/* Info bar */}
          <div className="px-6 py-5 border-t border-black/[.06] flex items-center justify-between gap-4 flex-wrap">
            <div>
              <div className="text-[9px] font-bold tracking-wider uppercase mb-1" style={{ color: roleColors[activeTab] || c.accent }}>● Textile · {activeInfo.role}</div>
              <div className="text-[18px] font-bold" style={{ color: c.dark }}>{activeInfo.name}</div>
              <div className="text-[11px] text-black/65 mt-1 leading-relaxed">{activeInfo.spec}</div>
            </div>
            <div
              className="px-4 py-2 rounded-full text-[10px] font-bold tracking-wider uppercase whitespace-nowrap"
              style={{ background: `${c.primary}10`, color: c.primary }}
            >
              Brand World B6
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextileMockupsSection;
