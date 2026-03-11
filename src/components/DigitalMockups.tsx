import React, { useState } from 'react';
import type { ScenarioKey } from './Scenarios';
import { hexRgba } from './colorUtils';

interface ScColors {
  primary: string; dark: string; accent: string; secondary: string;
  light: string; tagline: string; tagline2: string; textOnDark: string;
}

const sc: Record<ScenarioKey, ScColors> = {
  A: { primary: '#2F5439', dark: '#1A1410', accent: '#C9943A', secondary: '#F2EBDD', light: '#76764D', tagline: 'Le quartier que vous méritez', tagline2: 'Enfin tout, enfin ici', textOnDark: '#fff' },
  B: { primary: '#0D1B4B', dark: '#060E2A', accent: '#B8924A', secondary: '#F2EBDD', light: '#1A3060', tagline: 'Un monde à part', tagline2: "Vivez l'exception", textOnDark: '#D4B06A' },
  C: { primary: '#B25A38', dark: '#2C1A0A', accent: '#C9943A', secondary: '#F2EBDD', light: '#6D7447', tagline: "L'exception, tout simplement", tagline2: "L'exceptionnel, au quotidien", textOnDark: '#fff' },
  D: { primary: '#898D5D', dark: '#1C2215', accent: '#D4A843', secondary: '#F5F0E4', light: '#6B7A4A', tagline: 'Ici, on vit quelque chose', tagline2: 'Nature Contemporaine', textOnDark: '#fff' },
};

const digiPal: Record<ScenarioKey, { f1: string; f2: string; f3: string; side: string; khaki: string }> = {
  A: { f1: '#1a3224', f2: '#2F5439', f3: '#3d6b4a', side: '#0d2016', khaki: '#76764D' },
  B: { f1: '#04091a', f2: '#0D1B4B', f3: '#1a3065', side: '#020510', khaki: '#1A3060' },
  C: { f1: '#4A2010', f2: '#B25A38', f3: '#D47850', side: '#2C1A0A', khaki: '#6D7447' },
  D: { f1: '#2A3320', f2: '#898D5D', f3: '#A5A97A', side: '#1C2215', khaki: '#6B7A4A' },
};

const tabs = [
  { id: 'laptop', label: 'Laptop', role: '1 / 5', name: 'Laptop — Site web', spec: 'MacBook-style · 15" · Navigation complète · Hero · Galerie boutiques · Footer charte' },
  { id: 'tablet', label: 'Tablet', role: '2 / 5', name: 'Tablet — Site web', spec: 'iPad-style · Navigation hamburger · Hero plein écran · Plan interactif · Agenda inauguration' },
  { id: 'mobile', label: 'Mobile', role: '3 / 5', name: 'Mobile — App / Site', spec: 'iPhone-style · Dynamic Island · Status bar · Hero · Recherche · Bottom navigation' },
  { id: 'multi', label: 'Multi-device', role: '4 / 5', name: 'Multi-device', spec: 'Laptop + Tablet + Mobile · Responsive design · Charte cohérente · UI adaptée à chaque écran' },
  { id: 'display', label: 'Affichage digital', role: '5 / 5', name: 'Affichage digital — Totem LED', spec: 'Écran 55" · Fond couleur principale · Constellation or · Hero plein écran · Pied or brossé · 4K LED' },
];

interface SvgProps {
  c: ScColors;
  p: typeof digiPal['A'];
  tw: (o: number) => string;
  aR: (o: number) => string;
  pR: (o: number) => string;
}

/* ── Constellation dots SVG ── */
const Constellation: React.FC<{ w: number; h: number; c: ScColors; dots: [number,number,number][]; lines?: [number,number,number,number][] }> = ({ w, h, c, dots, lines }) => (
  <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
    {dots.map(([cx, cy, r], i) => <circle key={i} cx={cx} cy={cy} r={r} fill={hexRgba(c.accent, 0.15 + (0.25 / (i + 1)))} />)}
    {lines?.map(([x1, y1, x2, y2], i) => <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={hexRgba(c.accent, 0.14 - i * 0.02)} strokeWidth="1" />)}
  </svg>
);

/* ── Shared screen mini-logo ── */
const MiniLogo: React.FC<{ size: number; accent: string; dark: string }> = ({ size, accent, dark }) => (
  <svg width={size} height={size} viewBox="0 0 60 60" style={{ flexShrink: 0 }}>
    <circle cx="30" cy="30" r="28" fill={accent} />
    <circle cx="30" cy="30" r="20" fill={hexRgba(dark, 0.50)} />
  </svg>
);

/* ═══════════════════════════════════════════════════════════════
   1. LAPTOP
   ═══════════════════════════════════════════════════════════════ */
const LaptopSvg: React.FC<SvgProps> = ({ c, p }) => (
  <div className="w-full max-w-[780px]">
    <svg viewBox="0 0 820 560" width="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="L_body" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#d0ccc8" /><stop offset="100%" stopColor="#a8a4a0" />
        </linearGradient>
        <linearGradient id="L_base" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#c8c4c0" /><stop offset="100%" stopColor="#a0a09c" />
        </linearGradient>
        <filter id="L_sh"><feDropShadow dx="0" dy="20" stdDeviation="24" floodColor="#000" floodOpacity=".30" /></filter>
      </defs>
      <ellipse cx="410" cy="548" rx="300" ry="14" fill="rgba(0,0,0,.22)" />
      {/* Base */}
      <path d="M60,444 L40,530 L780,530 L760,444Z" fill="url(#L_base)" filter="url(#L_sh)" />
      <path d="M40,530 L780,530 L780,540 L40,540Z" fill="#989490" />
      <path d="M60,444 L760,444 L752,436 L68,436Z" fill="#b0acaa" />
      <rect x="180" y="458" width="460" height="62" rx="6" fill="rgba(0,0,0,.08)" />
      <rect x="190" y="464" width="440" height="10" rx="2" fill="rgba(255,255,255,.18)" />
      <rect x="190" y="478" width="440" height="10" rx="2" fill="rgba(255,255,255,.14)" />
      <rect x="190" y="492" width="440" height="10" rx="2" fill="rgba(255,255,255,.12)" />
      <rect x="190" y="506" width="440" height="10" rx="2" fill="rgba(255,255,255,.10)" />
      <rect x="330" y="522" width="160" height="6" rx="3" fill="rgba(0,0,0,.10)" />
      {/* Screen body */}
      <path d="M68,36 L752,36 L760,444 L60,444Z" fill="url(#L_body)" filter="url(#L_sh)" />
      <rect x="80" y="46" width="660" height="388" rx="6" fill="#1a1a1a" />
      <ellipse cx="410" cy="240" rx="22" ry="18" fill="rgba(255,255,255,.06)" />
      {/* Screen content */}
      <foreignObject x="84" y="50" width="652" height="380">
        <div style={{ width: 652, height: 380, overflow: 'hidden', borderRadius: 4 }}>
          <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', background: c.secondary }}>
            {/* Nav */}
            <div style={{ background: `linear-gradient(90deg, ${p.f1}, ${p.f2}, ${p.f3})`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 28px', height: 56, flexShrink: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <MiniLogo size={22} accent={c.accent} dark={c.dark} />
                <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 13, fontWeight: 800, color: c.secondary, letterSpacing: 2 }}>
                  COSMOS<span style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 11, color: hexRgba(c.secondary, 0.55), letterSpacing: 1, marginLeft: 2 }}> Angré</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 20 }}>
                {['Boutiques', 'Offres', 'Restauration', 'Agenda', 'Contact'].map((l, i) => (
                  <span key={l} style={{ fontSize: 10, fontWeight: 600, color: i === 0 ? c.accent : hexRgba(c.secondary, 0.70), letterSpacing: 1, textTransform: 'uppercase', fontFamily: "'Inter',sans-serif" }}>{l}</span>
                ))}
              </div>
            </div>
            {/* Hero */}
            <div style={{ height: 160, position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
              <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(120deg,${p.f2},${p.f1})` }} />
              <Constellation w={652} h={160} c={c} dots={[[520,40,3],[560,80,2],[490,110,4],[590,50,2],[610,120,3]]} lines={[[520,40,560,80],[560,80,490,110],[590,50,610,120]]} />
              <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', height: '100%', padding: '0 32px' }}>
                <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 8, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: c.accent, marginBottom: 8 }}>Ouverture · Novembre 2026</div>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 28, color: c.secondary, lineHeight: 1.1, marginBottom: 10 }}>{c.tagline}</div>
                <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, color: hexRgba(c.secondary, 0.65), lineHeight: 1.6, maxWidth: 260 }}>Le centre commercial premium d'Angré,<br />une expérience shopping inédite à Abidjan.</div>
                <div style={{ marginTop: 14, background: c.accent, color: c.secondary, fontFamily: "'Montserrat',sans-serif", fontSize: 8, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', padding: '8px 18px', borderRadius: 20, display: 'inline-block' }}>Découvrir</div>
              </div>
              <div style={{ position: 'absolute', right: 28, bottom: 20, zIndex: 2, textAlign: 'right' as const }}>
                <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 9, fontWeight: 800, color: c.accent, letterSpacing: 2 }}>COSMOS</div>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 11, color: hexRgba(c.secondary, 0.45), letterSpacing: 1 }}>Angré</div>
              </div>
            </div>
            {/* Boutiques section */}
            <div style={{ padding: '16px 20px', flex: 1, overflow: 'hidden' }}>
              <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 8, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: c.primary, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                Boutiques à la une<span style={{ flex: 1, height: 1, background: hexRgba(c.primary, 0.12), display: 'block' }} />
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                {[
                  { bg: `linear-gradient(135deg,${p.f2},${p.f1})`, cat: 'Mode', name: 'Espace Prestige', detail: 'Niveau RDC · 01–06', iconFill: c.accent, iconOp: 0.80 },
                  { bg: `linear-gradient(135deg,${p.khaki},${hexRgba(p.khaki, 0.7)})`, cat: 'Beauté', name: 'Beauty Lounge', detail: 'Niveau RDC · 13–15', iconFill: c.secondary, iconOp: 0.70 },
                  { bg: `linear-gradient(135deg,${c.dark},${hexRgba(c.dark, 0.8)})`, cat: 'Tech', name: 'Digital Hub', detail: 'Niveau 1 · 25–28', iconFill: c.accent, iconOp: 0.60 },
                  { bg: `linear-gradient(135deg,${p.f2},${p.f3})`, cat: 'Food', name: 'Food Court', detail: 'Niveau 2 · 47–56', iconFill: c.secondary, iconOp: 0.60 },
                ].map(card => (
                  <div key={card.name} style={{ flex: 1, background: '#fff', borderRadius: 10, overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,.08)' }}>
                    <div style={{ height: 52, background: card.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="36" height="36" viewBox="0 0 60 60"><circle cx="30" cy="30" r="20" fill={card.iconFill} opacity={String(card.iconOp)} /></svg>
                    </div>
                    <div style={{ padding: '8px 10px' }}>
                      <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 6.5, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: c.accent, marginBottom: 3 }}>{card.cat}</div>
                      <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 9, fontWeight: 700, color: c.dark, marginBottom: 2 }}>{card.name}</div>
                      <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 7.5, color: hexRgba(c.dark, 0.40) }}>{card.detail}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Footer */}
            <div style={{ background: c.dark, padding: '8px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
              <div style={{ fontSize: 7, color: hexRgba(c.secondary, 0.30), letterSpacing: 1 }}>© 2026 Cosmos Angré · New Heaven SA</div>
              <div style={{ display: 'flex', gap: 12 }}>
                {['Plan', 'Contact', 'cosmosangre.ci'].map(l => (
                  <span key={l} style={{ fontSize: 7, color: hexRgba(c.accent, 0.60), letterSpacing: 0.5 }}>{l}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </foreignObject>
      <rect x="84" y="50" width="200" height="380" fill="url(#L_body)" opacity=".03" rx="4" />
    </svg>
  </div>
);

/* ═══════════════════════════════════════════════════════════════
   2. TABLET
   ═══════════════════════════════════════════════════════════════ */
const TabletSvg: React.FC<SvgProps> = ({ c, p }) => (
  <div className="w-full max-w-[480px]">
    <svg viewBox="0 0 560 720" width="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="T2_frame" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2a2826" /><stop offset="100%" stopColor="#1a1816" />
        </linearGradient>
        <filter id="T2_sh"><feDropShadow dx="0" dy="24" stdDeviation="28" floodColor="#000" floodOpacity=".35" /></filter>
      </defs>
      <ellipse cx="280" cy="710" rx="200" ry="12" fill="rgba(0,0,0,.24)" />
      <rect x="40" y="20" width="480" height="680" rx="32" fill="url(#T2_frame)" filter="url(#T2_sh)" />
      <rect x="520" y="180" width="8" height="48" rx="4" fill="#3a3836" />
      <rect x="520" y="240" width="8" height="32" rx="4" fill="#3a3836" />
      <rect x="32" y="200" width="8" height="40" rx="4" fill="#3a3836" />
      <rect x="52" y="32" width="456" height="656" rx="22" fill="#111" />
      <circle cx="280" cy="42" r="6" fill="#222" />
      <circle cx="280" cy="42" r="3" fill="#111" />
      <foreignObject x="56" y="36" width="448" height="648">
        <div style={{ width: 448, height: 648, overflow: 'hidden', borderRadius: 18 }}>
          <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', background: c.secondary }}>
            {/* Nav */}
            <div style={{ background: `linear-gradient(90deg, ${p.f1}, ${p.f2}, ${p.f3})`, height: 52, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', flexShrink: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <MiniLogo size={20} accent={c.accent} dark={c.dark} />
                <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 12, fontWeight: 800, color: c.secondary, letterSpacing: 2 }}>COSMOS <span style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 11, color: hexRgba(c.secondary, 0.50), fontWeight: 300 }}>Angré</span></div>
              </div>
              <div style={{ fontSize: 18, color: hexRgba(c.secondary, 0.60) }}>☰</div>
            </div>
            {/* Hero */}
            <div style={{ height: 220, position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
              <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(120deg,${p.f2},${p.f1})` }} />
              <Constellation w={448} h={220} c={c} dots={[[360,60,4],[400,130,3],[330,170,5]]} lines={[[360,60,400,130],[400,130,330,170]]} />
              <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', height: '100%', padding: '0 24px' }}>
                <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 8, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: c.accent, marginBottom: 6 }}>Ouverture Novembre 2026</div>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 32, color: c.secondary, lineHeight: 1.1, marginBottom: 8 }}>{c.tagline}</div>
                <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: hexRgba(c.secondary, 0.65) }}>Le centre premium d'Angré, Abidjan.</div>
                <div style={{ marginTop: 10, background: c.accent, color: c.secondary, fontFamily: "'Montserrat',sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: 2, padding: '9px 20px', borderRadius: 20, display: 'inline-block' }}>Explorer</div>
              </div>
            </div>
            {/* Offers */}
            <div style={{ padding: '14px 16px', flex: 1, overflow: 'hidden' }}>
              <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 8, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: c.primary, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                À découvrir<span style={{ flex: 1, height: 1, background: hexRgba(c.primary, 0.12), display: 'block' }} />
              </div>
              <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
                {[
                  { bg: `linear-gradient(135deg,${p.f2},${p.f1})`, cat: 'Cinéma', name: 'Majestic One', detail: '5 salles · Niv. 2', fill: c.accent },
                  { bg: `linear-gradient(135deg,${p.khaki},${hexRgba(p.khaki, 0.7)})`, cat: 'Food Court', name: 'Saveurs du monde', detail: '12 restaurants · Niv. 2', fill: c.secondary },
                ].map(cd => (
                  <div key={cd.name} style={{ flex: 1, background: '#fff', borderRadius: 10, overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,.07)' }}>
                    <div style={{ height: 64, background: cd.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="32" height="32" viewBox="0 0 60 60"><circle cx="30" cy="30" r="22" fill={cd.fill} opacity=".75" /></svg>
                    </div>
                    <div style={{ padding: '8px 10px' }}>
                      <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 6.5, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: c.accent, marginBottom: 3 }}>{cd.cat}</div>
                      <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 9, fontWeight: 700, color: c.dark, marginBottom: 2 }}>{cd.name}</div>
                      <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 7.5, color: hexRgba(c.dark, 0.40) }}>{cd.detail}</div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Plan interactif */}
              <div style={{ background: c.primary, borderRadius: 10, padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 8, fontWeight: 700, letterSpacing: 2, color: c.accent, marginBottom: 4 }}>PLAN INTERACTIF</div>
                  <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, fontWeight: 600, color: c.secondary }}>Explorer le centre</div>
                  <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 9, color: hexRgba(c.secondary, 0.50), marginTop: 2 }}>3 niveaux · 60+ boutiques</div>
                </div>
                <div style={{ width: 40, height: 40, background: hexRgba(c.accent, 0.25), borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, color: c.accent }}>→</div>
              </div>
            </div>
            {/* Agenda */}
            <div style={{ padding: '0 16px 12px' }}>
              <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 8, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: c.primary, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                Agenda {'&'} Événements<span style={{ flex: 1, height: 1, background: hexRgba(c.primary, 0.12), display: 'block' }} />
              </div>
              <div style={{ background: '#fff', borderRadius: 10, padding: '12px 14px', boxShadow: '0 2px 10px rgba(0,0,0,.07)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 38, height: 38, background: c.accent, borderRadius: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <div style={{ fontSize: 6, fontWeight: 700, color: 'rgba(255,255,255,.70)', fontFamily: "'Montserrat',sans-serif", letterSpacing: 1 }}>NOV</div>
                    <div style={{ fontSize: 16, fontWeight: 800, color: '#fff', fontFamily: "'Montserrat',sans-serif", lineHeight: 1 }}>16</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 700, color: c.dark, fontFamily: "'Inter',sans-serif" }}>Inauguration officielle</div>
                    <div style={{ fontSize: 9, color: hexRgba(c.dark, 0.40), fontFamily: "'Inter',sans-serif", marginTop: 2 }}>Cosmos Angré · Ouverture grand public</div>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ background: c.dark, padding: '8px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
              <div style={{ fontSize: 7, color: hexRgba(c.secondary, 0.30), letterSpacing: 1 }}>© 2026 Cosmos Angré</div>
              <span style={{ fontSize: 7, color: hexRgba(c.accent, 0.60) }}>cosmosangre.ci</span>
            </div>
          </div>
        </div>
      </foreignObject>
    </svg>
  </div>
);

/* ═══════════════════════════════════════════════════════════════
   3. MOBILE
   ═══════════════════════════════════════════════════════════════ */
const MobileSvg: React.FC<SvgProps> = ({ c, p }) => (
  <div className="w-full max-w-[280px]">
    <svg viewBox="0 0 320 660" width="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="M_frame" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2a2826" /><stop offset="100%" stopColor="#1a1816" />
        </linearGradient>
        <filter id="M_sh"><feDropShadow dx="0" dy="20" stdDeviation="22" floodColor="#000" floodOpacity=".38" /></filter>
      </defs>
      <ellipse cx="160" cy="652" rx="120" ry="10" fill="rgba(0,0,0,.25)" />
      <rect x="20" y="10" width="280" height="640" rx="38" fill="url(#M_frame)" filter="url(#M_sh)" />
      <rect x="110" y="22" width="100" height="26" rx="13" fill="#111" />
      <circle cx="196" cy="35" r="5" fill="#1a1a1a" />
      <rect x="8" y="140" width="8" height="38" rx="4" fill="#333" />
      <rect x="8" y="188" width="8" height="38" rx="4" fill="#333" />
      <rect x="304" y="160" width="8" height="52" rx="4" fill="#333" />
      <rect x="28" y="18" width="264" height="624" rx="32" fill="#111" />
      <foreignObject x="32" y="22" width="256" height="616">
        <div style={{ width: 256, height: 616, overflow: 'hidden', borderRadius: 28 }}>
          <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', background: c.secondary, fontSize: '90%' }}>
            {/* Status bar */}
            <div style={{ background: c.primary, height: 44, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '0 20px 8px', flexShrink: 0 }}>
              <div style={{ fontSize: 10, fontWeight: 600, color: hexRgba(c.secondary, 0.80), fontFamily: "'Inter',sans-serif" }}>9:41</div>
              <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                <svg width="14" height="10" viewBox="0 0 14 10"><rect x="0" y="4" width="3" height="6" fill={hexRgba(c.secondary, 0.70)} rx="1" /><rect x="4" y="2" width="3" height="8" fill={hexRgba(c.secondary, 0.70)} rx="1" /><rect x="8" y="0" width="3" height="10" fill={hexRgba(c.secondary, 0.90)} rx="1" /></svg>
                <div style={{ fontSize: 10, color: hexRgba(c.secondary, 0.80), fontFamily: "'Inter',sans-serif" }}>87%</div>
              </div>
            </div>
            {/* Nav */}
            <div style={{ background: `linear-gradient(90deg, ${p.f1}, ${p.f2}, ${p.f3})`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', height: 44, flexShrink: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <MiniLogo size={18} accent={c.accent} dark={c.dark} />
                <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 11, fontWeight: 800, color: c.secondary, letterSpacing: 1.5 }}>COSMOS</div>
              </div>
              <div style={{ fontSize: 16, color: hexRgba(c.secondary, 0.65) }}>☰</div>
            </div>
            {/* Hero */}
            <div style={{ position: 'relative', height: 180, background: `linear-gradient(135deg,${p.f2},${p.f1})`, overflow: 'hidden', flexShrink: 0 }}>
              <Constellation w={256} h={180} c={c} dots={[[200,40,4],[230,100,3],[180,145,5]]} lines={[[200,40,230,100],[230,100,180,145]]} />
              <div style={{ position: 'relative', zIndex: 2, padding: '20px 18px' }}>
                <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 7, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: c.accent, marginBottom: 6 }}>Ouverture Nov. 2026</div>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 30, color: c.secondary, lineHeight: 1.05, marginBottom: 8 }}>{c.tagline}</div>
                <div style={{ background: c.accent, color: c.secondary, fontFamily: "'Montserrat',sans-serif", fontSize: 7, fontWeight: 700, letterSpacing: 2, padding: '7px 16px', borderRadius: 16, display: 'inline-block' }}>EXPLORER</div>
              </div>
            </div>
            {/* Search */}
            <div style={{ padding: '10px 14px', background: c.secondary }}>
              <div style={{ background: '#fff', borderRadius: 20, padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 2px 8px rgba(0,0,0,.08)' }}>
                <span style={{ fontSize: 12, color: hexRgba(c.dark, 0.40) }}>🔍</span>
                <span style={{ fontSize: 10, color: '#ccc', fontFamily: "'Inter',sans-serif" }}>Rechercher une boutique...</span>
              </div>
            </div>
            {/* Cards */}
            <div style={{ padding: '0 14px', background: c.secondary, flex: 1, overflow: 'hidden' }}>
              <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 7.5, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: c.primary, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
                À la une<span style={{ flex: 1, height: 1, background: hexRgba(c.primary, 0.12), display: 'block' }} />
              </div>
              <div style={{ display: 'flex', gap: 8, overflow: 'hidden' }}>
                {[
                  { bg: `linear-gradient(135deg,${p.f2},${p.f1})`, cat: 'Mode', name: 'Prestige', detail: 'RDC · 01–06', fill: c.accent, op: 0.75 },
                  { bg: `linear-gradient(135deg,${p.khaki},${hexRgba(p.khaki, 0.7)})`, cat: 'Beauté', name: 'Lounge', detail: 'RDC · 13–15', fill: c.secondary, op: 0.65 },
                  { bg: `linear-gradient(135deg,${c.dark},${hexRgba(c.dark, 0.8)})`, cat: 'Food', name: 'Food Court', detail: 'Niv. 2', fill: c.accent, op: 0.60 },
                ].map(cd => (
                  <div key={cd.name} style={{ flex: 1, background: '#fff', borderRadius: 10, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,.08)' }}>
                    <div style={{ height: 52, background: cd.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="26" height="26" viewBox="0 0 60 60"><circle cx="30" cy="30" r="20" fill={cd.fill} opacity={String(cd.op)} /></svg>
                    </div>
                    <div style={{ padding: '6px 8px' }}>
                      <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 6, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: c.accent }}>{cd.cat}</div>
                      <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 8, fontWeight: 700, color: c.dark }}>{cd.name}</div>
                      <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 6.5, color: hexRgba(c.dark, 0.40) }}>{cd.detail}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Bottom nav */}
            <div style={{ background: '#fff', borderTop: `1px solid ${hexRgba(c.primary, 0.08)}`, display: 'flex', justifyContent: 'space-around', padding: '8px 0 4px', flexShrink: 0 }}>
              {[
                { icon: '🏠', label: 'Accueil', active: true },
                { icon: '🛍️', label: 'Boutiques', active: false },
                { icon: '🗺️', label: 'Plan', active: false },
                { icon: '🔔', label: 'Offres', active: false },
              ].map(n => (
                <div key={n.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                  <div style={{ fontSize: 14 }}>{n.icon}</div>
                  <div style={{ fontSize: 7, color: n.active ? c.primary : hexRgba(c.dark, 0.40), fontWeight: n.active ? 700 : 400, fontFamily: "'Montserrat',sans-serif" }}>{n.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </foreignObject>
    </svg>
  </div>
);

/* ═══════════════════════════════════════════════════════════════
   4. MULTI-DEVICE
   ═══════════════════════════════════════════════════════════════ */
const MultiDeviceSvg: React.FC<SvgProps> = ({ c, p }) => {
  const heroGrad = `linear-gradient(120deg,${p.f2},${p.f1})`;
  return (
  <div className="w-full max-w-[840px]">
    <svg viewBox="0 0 880 620" width="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="MU_frame" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2a2826" /><stop offset="100%" stopColor="#1a1816" />
        </linearGradient>
        <linearGradient id="MU_base" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#c8c4c0" /><stop offset="100%" stopColor="#a0a09c" />
        </linearGradient>
        <filter id="MU_sh"><feDropShadow dx="0" dy="14" stdDeviation="18" floodColor="#000" floodOpacity=".28" /></filter>
      </defs>
      <ellipse cx="440" cy="608" rx="380" ry="14" fill="rgba(0,0,0,.18)" />
      {/* ── LAPTOP ── */}
      <path d="M30,360 L860,360 L850,430 L40,430Z" fill="url(#MU_base)" filter="url(#MU_sh)" />
      <path d="M40,430 L850,430 L850,440 L40,440Z" fill="#989490" />
      <path d="M30,360 L860,360 L852,352 L38,352Z" fill="#b0acaa" />
      <rect x="310" y="368" width="260" height="52" rx="5" fill="rgba(0,0,0,.07)" />
      {[373, 383, 393, 403].map((y, i) => <rect key={y} x="320" y={y} width="240" height="7" rx="2" fill={`rgba(255,255,255,${0.16 - i * 0.02})`} />)}
      <rect x="350" y="420" width="180" height="5" rx="2" fill="rgba(0,0,0,.08)" />
      <path d="M38,48 L842,48 L850,360 L30,360Z" fill="url(#MU_frame)" filter="url(#MU_sh)" />
      <rect x="50" y="58" width="780" height="292" rx="5" fill="#111" />
      <foreignObject x="54" y="62" width="772" height="284">
        <div style={{ width: 772, height: 284, overflow: 'hidden', borderRadius: 3 }}>
          <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', background: c.secondary }}>
            <div style={{ background: c.primary, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', flexShrink: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <MiniLogo size={18} accent={c.accent} dark={c.dark} />
                <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 12, fontWeight: 800, color: c.secondary, letterSpacing: 2 }}>COSMOS <span style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 11, color: hexRgba(c.secondary, 0.50), fontWeight: 300 }}>Angré</span></div>
              </div>
              <div style={{ display: 'flex', gap: 18 }}>
                {['Boutiques', 'Offres', 'Agenda', 'Contact'].map((l, i) => (
                  <span key={l} style={{ fontSize: 9, color: i === 0 ? c.accent : hexRgba(c.secondary, 0.60), letterSpacing: 1, fontFamily: "'Inter',sans-serif", fontWeight: i === 0 ? 600 : 400 }}>{l}</span>
                ))}
              </div>
            </div>
            <div style={{ flex: 1, background: heroGrad, display: 'flex', alignItems: 'center', padding: '0 28px', position: 'relative', overflow: 'hidden' }}>
              <Constellation w={772} h={244} c={c} dots={[[620,50,4],[660,120,3],[590,180,5]]} lines={[[620,50,660,120],[660,120,590,180]]} />
              <div style={{ position: 'relative', zIndex: 2 }}>
                <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 8, fontWeight: 700, letterSpacing: 3, color: c.accent, marginBottom: 6 }}>OUVERTURE NOVEMBRE 2026</div>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 40, fontWeight: 300, color: c.secondary, lineHeight: 1, marginBottom: 8 }}>{c.tagline}</div>
                <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, color: hexRgba(c.secondary, 0.60), marginBottom: 12 }}>Le centre premium d'Angré · Abidjan</div>
                <div style={{ background: c.accent, color: c.secondary, fontFamily: "'Montserrat',sans-serif", fontSize: 8, fontWeight: 700, letterSpacing: 2, padding: '8px 18px', borderRadius: 16, display: 'inline-block' }}>DÉCOUVRIR</div>
              </div>
            </div>
          </div>
        </div>
      </foreignObject>

      {/* ── TABLET ── */}
      <rect x="580" y="160" width="240" height="330" rx="20" fill="url(#MU_frame)" filter="url(#MU_sh)" />
      <rect x="590" y="170" width="220" height="310" rx="14" fill="#111" />
      <circle cx="700" cy="178" r="4" fill="#222" />
      <foreignObject x="594" y="174" width="212" height="302">
        <div style={{ width: 212, height: 302, overflow: 'hidden', borderRadius: 11 }}>
          <div style={{ width: '100%', height: '100%', background: c.secondary, display: 'flex', flexDirection: 'column' }}>
            <div style={{ background: c.primary, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 12px', flexShrink: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <MiniLogo size={14} accent={c.accent} dark={c.dark} />
                <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 9, fontWeight: 800, color: c.secondary, letterSpacing: 1.5 }}>COSMOS</div>
              </div>
              <div style={{ fontSize: 13, color: hexRgba(c.secondary, 0.60) }}>☰</div>
            </div>
            <div style={{ flex: 1, background: heroGrad, display: 'flex', alignItems: 'center', padding: '0 14px', position: 'relative', overflow: 'hidden' }}>
              <div>
                <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 6, fontWeight: 700, letterSpacing: 2, color: c.accent, marginBottom: 4 }}>NOV. 2026</div>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, fontWeight: 300, color: c.secondary, lineHeight: 1.05, marginBottom: 6 }}>{c.tagline}</div>
                <div style={{ background: c.accent, color: c.secondary, fontFamily: "'Montserrat',sans-serif", fontSize: 6, fontWeight: 700, letterSpacing: 1.5, padding: '5px 12px', borderRadius: 10, display: 'inline-block' }}>EXPLORER</div>
              </div>
            </div>
            <div style={{ padding: '10px 12px', background: c.secondary }}>
              <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 6, fontWeight: 700, letterSpacing: 2, color: c.primary, marginBottom: 8 }}>À DÉCOUVRIR</div>
              <div style={{ display: 'flex', gap: 6 }}>
                {[
                  { bg: `linear-gradient(135deg,${p.f2},${p.f1})`, cat: 'MODE', name: 'Prestige', fill: c.accent },
                  { bg: `linear-gradient(135deg,${c.dark},${hexRgba(c.dark, 0.8)})`, cat: 'FOOD', name: 'Food Court', fill: c.accent },
                ].map(cd => (
                  <div key={cd.name} style={{ flex: 1, background: '#fff', borderRadius: 7, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,.07)' }}>
                    <div style={{ height: 36, background: cd.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="18" height="18" viewBox="0 0 60 60"><circle cx="30" cy="30" r="18" fill={cd.fill} opacity=".75" /></svg>
                    </div>
                    <div style={{ padding: '5px 6px' }}>
                      <div style={{ fontSize: 6, fontWeight: 700, color: c.accent, fontFamily: "'Montserrat',sans-serif" }}>{cd.cat}</div>
                      <div style={{ fontSize: 7.5, fontWeight: 700, color: c.dark, fontFamily: "'Inter',sans-serif" }}>{cd.name}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </foreignObject>

      {/* ── MOBILE ── */}
      <rect x="96" y="190" width="148" height="290" rx="22" fill="url(#MU_frame)" filter="url(#MU_sh)" />
      <rect x="104" y="198" width="132" height="274" rx="16" fill="#111" />
      <rect x="140" y="202" width="60" height="14" rx="7" fill="#1a1a1a" />
      <foreignObject x="108" y="202" width="124" height="266">
        <div style={{ width: 124, height: 266, overflow: 'hidden', borderRadius: 12 }}>
          <div style={{ width: '100%', height: '100%', background: c.secondary, display: 'flex', flexDirection: 'column' }}>
            <div style={{ background: c.primary, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 10px', flexShrink: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <MiniLogo size={12} accent={c.accent} dark={c.dark} />
                <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 8, fontWeight: 800, color: c.secondary, letterSpacing: 1 }}>COSMOS</div>
              </div>
              <div style={{ fontSize: 11, color: hexRgba(c.secondary, 0.60) }}>☰</div>
            </div>
            <div style={{ flex: 1, background: heroGrad, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '12px 12px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 5.5, fontWeight: 700, letterSpacing: 2, color: c.accent, marginBottom: 4 }}>NOV. 2026</div>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, fontWeight: 300, color: c.secondary, lineHeight: 1.05, marginBottom: 8 }}>{c.tagline}</div>
              <div style={{ background: c.accent, color: c.secondary, fontFamily: "'Montserrat',sans-serif", fontSize: 5.5, fontWeight: 700, letterSpacing: 1.5, padding: '5px 10px', borderRadius: 8, display: 'inline-block', width: 'fit-content' }}>EXPLORER</div>
            </div>
            <div style={{ background: '#fff', padding: '8px 10px', flexShrink: 0 }}>
              <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 5.5, fontWeight: 700, letterSpacing: 2, color: c.primary, marginBottom: 6 }}>BOUTIQUES</div>
              <div style={{ background: heroGrad, borderRadius: 7, padding: '7px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 7.5, fontWeight: 600, color: c.secondary }}>60+ boutiques</div>
                <div style={{ fontSize: 9, color: c.accent }}>→</div>
              </div>
            </div>
            <div style={{ background: '#fff', borderTop: '1px solid rgba(0,0,0,.05)', display: 'flex', justifyContent: 'space-around', padding: '5px 0', flexShrink: 0 }}>
              {['🏠', '🛍️', '🗺️', '🔔'].map(ic => <div key={ic} style={{ fontSize: 10 }}>{ic}</div>)}
            </div>
          </div>
        </div>
      </foreignObject>

      <text x="440" y="580" textAnchor="middle" fontFamily="'Cormorant Garamond',serif" fontSize="15" fontStyle="italic" fill={hexRgba(c.primary, 0.45)} letterSpacing="2">Expérience cohérente sur tous les supports</text>
    </svg>
  </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   5. AFFICHAGE DIGITAL (LED TOTEM)
   ═══════════════════════════════════════════════════════════════ */
const DisplaySvg: React.FC<SvgProps> = ({ c, p }) => (
  <div className="w-full max-w-[640px]">
    <svg viewBox="0 0 680 580" width="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="DI_frame" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2a2826" /><stop offset="100%" stopColor="#1a1816" />
        </linearGradient>
        <linearGradient id="DI_stand" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8a7a60" /><stop offset="50%" stopColor={c.accent} /><stop offset="100%" stopColor="#7a6850" />
        </linearGradient>
        <filter id="DI_sh"><feDropShadow dx="0" dy="16" stdDeviation="22" floodColor="#000" floodOpacity=".55" /></filter>
      </defs>
      <ellipse cx="340" cy="572" rx="240" ry="12" fill="rgba(0,0,0,.40)" />
      {/* Stand */}
      <rect x="300" y="500" width="80" height="56" rx="6" fill="url(#DI_stand)" />
      <rect x="304" y="500" width="24" height="56" fill="rgba(255,255,255,.12)" rx="4" />
      <path d="M240,552 L440,552 L460,568 L220,568Z" fill="#a89060" />
      <rect x="220" y="556" width="240" height="16" rx="5" fill="#b8a070" />
      <line x1="220" y1="556" x2="460" y2="556" stroke={c.accent} strokeWidth="2" opacity=".60" />
      {/* Frame */}
      <rect x="30" y="20" width="620" height="484" rx="18" fill="url(#DI_frame)" filter="url(#DI_sh)" />
      <rect x="38" y="28" width="604" height="468" rx="12" fill="#111" />
      <rect x="650" y="120" width="8" height="36" rx="4" fill="#2a2826" />
      <rect x="650" y="165" width="8" height="36" rx="4" fill="#2a2826" />
      <circle cx="636" cy="36" r="4" fill="#2a9a4a" opacity=".80" />
      {/* Screen content */}
      <foreignObject x="42" y="32" width="596" height="460">
        <div style={{ width: 596, height: 460, overflow: 'hidden', borderRadius: 9 }}>
          <div style={{ width: '100%', height: '100%', background: `linear-gradient(135deg,${p.f1} 0%,${p.f2} 40%,${p.f1} 100%)`, display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
            <Constellation w={596} h={460} c={c} dots={[[460,60,5],[510,160,4],[430,240,6],[540,300,3],[480,380,4]]} lines={[[460,60,510,160],[510,160,430,240],[430,240,540,300],[540,300,480,380]]} />
            {/* Gold bottom line */}
            <svg style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: 30 }} viewBox="0 0 596 30" preserveAspectRatio="none">
              <rect x="0" y="0" width="596" height="30" fill={hexRgba(c.accent, 0.08)} />
              <line x1="0" y1="0" x2="596" y2="0" stroke={hexRgba(c.accent, 0.35)} strokeWidth="2" />
            </svg>
            {/* Main content */}
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 56px', position: 'relative', zIndex: 2 }}>
              <div style={{ maxWidth: 320 }}>
                <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase', color: c.accent, marginBottom: 14 }}>Ouverture · Novembre 2026</div>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 58, color: c.secondary, lineHeight: 1, marginBottom: 16 }}>{c.tagline}</div>
                <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: hexRgba(c.secondary, 0.60), lineHeight: 1.7, marginBottom: 24 }}>Le centre commercial premium d'Angré.<br />60+ boutiques · Cinéma · Food Court · Services.</div>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <div style={{ background: c.accent, color: c.secondary, fontFamily: "'Montserrat',sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: 2.5, padding: '12px 24px', borderRadius: 24 }}>DÉCOUVRIR</div>
                  <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, color: hexRgba(c.secondary, 0.45), letterSpacing: 1 }}>cosmosangre.ci</div>
                </div>
              </div>
              {/* Large logo */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                <svg width="160" height="160" viewBox="0 0 160 160">
                  <circle cx="80" cy="80" r="72" fill="none" stroke={hexRgba(c.accent, 0.20)} strokeWidth="2" />
                  <circle cx="80" cy="80" r="58" fill={hexRgba(c.accent, 0.12)} />
                  <circle cx="80" cy="80" r="44" fill={c.accent} opacity=".90" />
                  <circle cx="80" cy="80" r="44" fill="none" stroke="rgba(255,255,255,.30)" strokeWidth="3" />
                  <circle cx="80" cy="80" r="30" fill={hexRgba(c.dark, 0.55)} />
                  <circle cx="80" cy="80" r="30" fill="none" stroke="rgba(255,255,255,.22)" strokeWidth="1.5" />
                  <ellipse cx="66" cy="66" rx="14" ry="10" fill="rgba(255,255,255,.22)" transform="rotate(-30,66,66)" />
                </svg>
                <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 14, fontWeight: 800, color: c.secondary, letterSpacing: 4, textAlign: 'center' as const }}>COSMOS</div>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 16, color: hexRgba(c.accent, 0.80), letterSpacing: 2 }}>Angré</div>
              </div>
            </div>
            {/* Bottom bar */}
            <div style={{ height: 30, background: hexRgba(c.accent, 0.08), borderTop: `1px solid ${hexRgba(c.accent, 0.25)}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 32px', flexShrink: 0, position: 'relative', zIndex: 2 }}>
              <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 8, fontWeight: 700, letterSpacing: 3, color: hexRgba(c.accent, 0.65) }}>COSMOS ANGRÉ · ABIDJAN · CÔTE D'IVOIRE</div>
              <div style={{ display: 'flex', gap: 16 }}>
                <span style={{ fontSize: 8, color: hexRgba(c.secondary, 0.35), fontFamily: "'Inter',sans-serif" }}>Lun–Sam  9h–21h</span>
                <span style={{ fontSize: 8, color: hexRgba(c.secondary, 0.35), fontFamily: "'Inter',sans-serif" }}>Dim  10h–20h</span>
                <span style={{ fontSize: 8, color: hexRgba(c.accent, 0.50), fontFamily: "'Inter',sans-serif" }}>cosmosangre.ci</span>
              </div>
            </div>
          </div>
        </div>
      </foreignObject>
      <rect x="42" y="32" width="200" height="460" fill="rgba(255,255,255,.02)" rx="9" />
    </svg>
  </div>
);

/* ═══════════════════════════════════════════════════════════════
   SECTION WRAPPER
   ═══════════════════════════════════════════════════════════════ */
const DigitalMockupsSection: React.FC<{ k: ScenarioKey }> = ({ k }) => {
  const [activeTab, setActiveTab] = useState('laptop');
  const c = sc[k];
  const p = digiPal[k];
  const tw = (o: number) => hexRgba(c.textOnDark, o);
  const aR = (o: number) => hexRgba(c.accent, o);
  const pR = (o: number) => hexRgba(c.primary, o);

  const activeInfo = tabs.find(t => t.id === activeTab) || tabs[0];

  const stageBgs: Record<string, string> = {
    laptop: 'linear-gradient(160deg,#e8e4db,#c8c2b6)',
    tablet: 'linear-gradient(160deg,#e8e4db,#c8c2b6)',
    mobile: 'linear-gradient(160deg,#e8e4db,#c8c2b6)',
    multi: 'linear-gradient(160deg,#e8e4db,#c8c2b6)',
    display: `linear-gradient(160deg,${hexRgba(c.dark, 0.95)},${hexRgba(c.dark, 0.80)})`,
  };

  return (
    <div id="bw-digital" className="py-16 border-b border-black/[.08]">
      <div className="bg-white rounded-[18px] border border-black/[.06] overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,.04)]">
        {/* Header */}
        <div
          className="px-4 sm:px-8 py-6 border-b border-black/[.06]"
          style={{ background: `linear-gradient(to bottom right, ${c.dark}, ${c.primary})` }}
        >
          <div className="text-[9px] font-bold tracking-[.25em] uppercase mb-1" style={{ color: c.accent }}>Brand World · B6</div>
          <div className="font-cormorant text-[24px] text-white font-light">Digital Mockups</div>
          <div className="text-[10px] text-white/60 mt-1">Laptop · Tablet · Mobile · Multi-device · Affichage digital</div>
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
            style={{ background: stageBgs[activeTab] }}
          >
            {activeTab === 'laptop' && <LaptopSvg c={c} p={p} tw={tw} aR={aR} pR={pR} />}
            {activeTab === 'tablet' && <TabletSvg c={c} p={p} tw={tw} aR={aR} pR={pR} />}
            {activeTab === 'mobile' && <MobileSvg c={c} p={p} tw={tw} aR={aR} pR={pR} />}
            {activeTab === 'multi' && <MultiDeviceSvg c={c} p={p} tw={tw} aR={aR} pR={pR} />}
            {activeTab === 'display' && <DisplaySvg c={c} p={p} tw={tw} aR={aR} pR={pR} />}
          </div>

          {/* Info bar */}
          <div className="px-6 py-5 border-t border-black/[.06] flex items-center justify-between gap-4 flex-wrap">
            <div>
              <div className="text-[9px] font-bold tracking-wider uppercase mb-1" style={{ color: c.accent }}>● Digital · {activeInfo.role}</div>
              <div className="text-[18px] font-bold" style={{ color: c.dark }}>{activeInfo.name}</div>
              <div className="text-[11px] text-black/65 mt-1 leading-relaxed">{activeInfo.spec}</div>
            </div>
            <div
              className="px-4 py-2 rounded-full text-[10px] font-bold tracking-wider uppercase whitespace-nowrap"
              style={{ background: `${c.primary}10`, color: c.primary }}
            >
              Brand World B8
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigitalMockupsSection;
