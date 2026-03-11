import React, { useState, useEffect } from 'react';
import {
  Route, Car, ParkingSquare, DoorOpen, Sparkles, Store, UtensilsCrossed,
  Heart, MapPin, Eye, Users, BarChart3, Calendar, Signpost,
  Box, ArrowRight, CheckCircle, Clock, AlertTriangle, ChevronRight,
  Lightbulb, Smartphone, LayoutGrid, GitBranch,
} from 'lucide-react';
import CosmosLogo from './CosmosLogo';
import {
  journeyLayers, journeyStages,
  personas,
  touchpoints,
  kpiCategories,
  actionPlan,
  signageTypes,
  stageColors,
  stageSteps,
  touchpointLabels,
  touchpointMatrix,
  departments,
  departmentMatrix,
  stageEmotions,
  stageDurations,
  stagePainPoints,
  stageOpportunities,
  stageTechnologies,
  stagePersonnel,
  stageKpis,
} from './parcoursClientData';

/* ═══════════════════════════════════════════════════════════════════════════
   MODULE 1 — Journey Map · Swimlane Visualization
   ═══════════════════════════════════════════════════════════════════════════ */

const STAGE_ICONS = [
  <Car size={16} strokeWidth={1.5} />,
  <ParkingSquare size={16} strokeWidth={1.5} />,
  <DoorOpen size={16} strokeWidth={1.5} />,
  <Sparkles size={16} strokeWidth={1.5} />,
  <Store size={16} strokeWidth={1.5} />,
  <UtensilsCrossed size={16} strokeWidth={1.5} />,
  <Heart size={16} strokeWidth={1.5} />,
];

/** Swimlane row label cell */
const SwimLabel: React.FC<{ label: string; sub?: string; color?: string }> = ({ label, sub, color }) => (
  <div className="flex flex-col justify-center pr-3 py-3 min-w-[140px] w-[140px] flex-shrink-0 border-r border-black/[.06]">
    <div className="text-[9px] font-bold tracking-[.15em] uppercase" style={{ color: color || '#1a1a2e' }}>{label}</div>
    {sub && <div className="text-[8px] text-black/25 mt-0.5">{sub}</div>}
  </div>
);

/** Dot for dot-matrix */
const Dot: React.FC<{ active: boolean; color: string; big?: boolean }> = ({ active, color, big }) => (
  <div
    className={`rounded-full flex-shrink-0 transition-all ${big ? 'w-3 h-3' : 'w-2.5 h-2.5'}`}
    style={{
      background: active ? color : 'rgba(0,0,0,.06)',
      boxShadow: active ? `0 0 6px ${color}40` : 'none',
    }}
  />
);

/*  ═══════════════════════════════════════════════════════════════════════════
    VERTICAL JOURNEY FLOW — The Customer Journey · Cosmos Angré
    Chemin SVG épais en S · Illustrations SVG · Offline / Online · Callouts
    ═══════════════════════════════════════════════════════════════════════════ */

const FLOW_ICONS = [Car, ParkingSquare, DoorOpen, Sparkles, Store, UtensilsCrossed, Heart];
const FLOW_DURATIONS = ['~10 min', '~5 min', '~3 min', '~15 min', '~45 min', '~40 min', 'continu'];

/** Mini SVG scene illustrations for each stage */
const SceneIllustration: React.FC<{ stage: number; color: string }> = ({ stage, color }) => {
  const c = color;
  const scenes: Record<number, React.ReactNode> = {
    0: ( // Approche — voiture + route + panneau
      <svg viewBox="0 0 120 80" className="w-full h-full">
        <rect x="10" y="55" width="100" height="8" rx="2" fill="#e5e7eb" />
        <line x1="30" y1="59" x2="40" y2="59" stroke="#fff" strokeWidth="2" strokeDasharray="4 3" />
        <line x1="55" y1="59" x2="65" y2="59" stroke="#fff" strokeWidth="2" strokeDasharray="4 3" />
        <line x1="80" y1="59" x2="90" y2="59" stroke="#fff" strokeWidth="2" strokeDasharray="4 3" />
        {/* Car */}
        <rect x="20" y="38" width="32" height="16" rx="4" fill={c} />
        <rect x="26" y="30" width="20" height="12" rx="3" fill={c} opacity=".7" />
        <circle cx="28" cy="56" r="4" fill="#374151" /><circle cx="28" cy="56" r="2" fill="#9ca3af" />
        <circle cx="44" cy="56" r="4" fill="#374151" /><circle cx="44" cy="56" r="2" fill="#9ca3af" />
        {/* Sign post */}
        <rect x="85" y="15" width="3" height="40" fill="#9ca3af" />
        <rect x="75" y="12" width="25" height="14" rx="2" fill={c} />
        <text x="87" y="22" fontSize="7" fill="#fff" textAnchor="middle" fontWeight="600">P →</text>
        {/* Arrow */}
        <polygon points="105,19 112,19 108,15" fill={c} opacity=".5" />
      </svg>
    ),
    1: ( // Parking — bâtiment P + voitures
      <svg viewBox="0 0 120 80" className="w-full h-full">
        <rect x="30" y="15" width="60" height="50" rx="4" fill="#f3f4f6" stroke={c} strokeWidth="1.5" />
        <text x="60" y="48" fontSize="28" fill={c} textAnchor="middle" fontWeight="700">P</text>
        <rect x="35" y="55" width="14" height="8" rx="2" fill={c} opacity=".3" />
        <rect x="53" y="55" width="14" height="8" rx="2" fill={c} opacity=".5" />
        <rect x="71" y="55" width="14" height="8" rx="2" fill={c} opacity=".3" />
        {/* LED indicators */}
        <circle cx="42" cy="22" r="3" fill="#22c55e" /><circle cx="60" cy="22" r="3" fill="#22c55e" /><circle cx="78" cy="22" r="3" fill="#ef4444" />
        {/* Floor lines */}
        <line x1="30" y1="40" x2="90" y2="40" stroke={c} strokeWidth=".5" opacity=".3" />
      </svg>
    ),
    2: ( // Entrée — porte + personnage accueil
      <svg viewBox="0 0 120 80" className="w-full h-full">
        {/* Building frame */}
        <rect x="25" y="5" width="70" height="65" rx="3" fill="#f9fafb" stroke="#d1d5db" strokeWidth="1" />
        {/* Door */}
        <rect x="45" y="25" width="30" height="45" rx="2" fill={c} opacity=".15" />
        <rect x="45" y="25" width="14" height="45" fill={c} opacity=".25" />
        <circle cx="56" cy="50" r="1.5" fill={c} />
        {/* Person */}
        <circle cx="85" cy="35" r="6" fill={c} opacity=".6" />
        <rect x="81" y="42" width="8" height="14" rx="3" fill={c} opacity=".4" />
        {/* Welcome arc */}
        <path d="M 35 20 Q 60 8 85 20" fill="none" stroke={c} strokeWidth="1.5" strokeDasharray="3 2" />
        {/* Plant */}
        <rect x="30" y="50" width="6" height="12" rx="1" fill="#86efac" opacity=".6" />
        <circle cx="33" cy="47" r="5" fill="#22c55e" opacity=".4" />
      </svg>
    ),
    3: ( // Hall central — atrium + verrière + plantes
      <svg viewBox="0 0 120 80" className="w-full h-full">
        {/* Atrium shape */}
        <polygon points="60,2 100,25 100,70 20,70 20,25" fill="#f9fafb" stroke="#d1d5db" strokeWidth="1" />
        {/* Glass roof */}
        <polygon points="60,2 100,25 20,25" fill={c} opacity=".1" />
        <line x1="60" y1="2" x2="60" y2="25" stroke={c} strokeWidth=".7" opacity=".4" />
        <line x1="60" y1="2" x2="40" y2="25" stroke={c} strokeWidth=".5" opacity=".3" />
        <line x1="60" y1="2" x2="80" y2="25" stroke={c} strokeWidth=".5" opacity=".3" />
        {/* Palm trees */}
        <rect x="35" y="40" width="3" height="25" rx="1" fill="#92400e" opacity=".4" />
        <ellipse cx="36" cy="38" rx="10" ry="8" fill="#22c55e" opacity=".5" />
        <rect x="75" y="42" width="3" height="23" rx="1" fill="#92400e" opacity=".4" />
        <ellipse cx="76" cy="40" rx="9" ry="7" fill="#22c55e" opacity=".45" />
        {/* LED screens */}
        <rect x="48" y="32" width="24" height="14" rx="2" fill={c} opacity=".2" />
        <rect x="50" y="34" width="20" height="10" rx="1" fill={c} opacity=".15" />
        {/* Stars */}
        <circle cx="50" cy="12" r="1" fill={c} opacity=".6" /><circle cx="70" cy="14" r="1" fill={c} opacity=".5" />
      </svg>
    ),
    4: ( // Shopping — boutiques + sacs + escalator
      <svg viewBox="0 0 120 80" className="w-full h-full">
        {/* Shop fronts */}
        <rect x="10" y="20" width="28" height="40" rx="2" fill="#fef3c7" stroke="#fbbf24" strokeWidth=".8" />
        <rect x="14" y="25" width="10" height="15" rx="1" fill={c} opacity=".15" />
        <rect x="24" y="25" width="10" height="15" rx="1" fill={c} opacity=".2" />
        <rect x="44" y="20" width="28" height="40" rx="2" fill="#ede9fe" stroke="#a78bfa" strokeWidth=".8" />
        <rect x="48" y="25" width="10" height="15" rx="1" fill={c} opacity=".15" />
        <rect x="58" y="25" width="10" height="15" rx="1" fill={c} opacity=".2" />
        {/* Shopping bags */}
        <rect x="85" y="35" width="12" height="16" rx="2" fill={c} />
        <path d="M 88 35 Q 91 28 94 35" fill="none" stroke={c} strokeWidth="1.5" />
        <rect x="100" y="40" width="10" height="13" rx="2" fill={c} opacity=".5" />
        <path d="M 102 40 Q 105 34 108 40" fill="none" stroke={c} strokeWidth="1.2" opacity=".5" />
        {/* Person walking */}
        <circle cx="80" cy="48" r="4" fill="#6b7280" opacity=".4" />
        <rect x="78" y="53" width="4" height="10" rx="1.5" fill="#6b7280" opacity=".3" />
      </svg>
    ),
    5: ( // Restauration — table + food + terrasse
      <svg viewBox="0 0 120 80" className="w-full h-full">
        {/* Table */}
        <rect x="30" y="40" width="50" height="3" rx="1" fill="#9ca3af" />
        <rect x="38" y="43" width="3" height="20" fill="#9ca3af" />
        <rect x="69" y="43" width="3" height="20" fill="#9ca3af" />
        {/* Plate + food */}
        <ellipse cx="45" cy="37" rx="8" ry="4" fill="#f9fafb" stroke="#d1d5db" strokeWidth=".8" />
        <circle cx="45" cy="35" r="3" fill={c} opacity=".4" />
        <ellipse cx="65" cy="37" rx="7" ry="3.5" fill="#f9fafb" stroke="#d1d5db" strokeWidth=".8" />
        <circle cx="65" cy="35" r="2.5" fill={c} opacity=".5" />
        {/* Glass */}
        <rect x="75" y="30" width="5" height="10" rx="1" fill="#bfdbfe" opacity=".6" />
        {/* Fork & knife */}
        <line x1="35" y1="32" x2="35" y2="42" stroke="#9ca3af" strokeWidth="1" />
        <line x1="55" y1="32" x2="55" y2="42" stroke="#9ca3af" strokeWidth="1" />
        {/* Terrace awning */}
        <path d="M 15 15 L 105 15" stroke={c} strokeWidth="2" />
        <path d="M 15 15 Q 25 22 35 15 Q 45 22 55 15 Q 65 22 75 15 Q 85 22 95 15 Q 100 18 105 15" fill={c} opacity=".15" stroke={c} strokeWidth=".5" />
        {/* People silhouettes */}
        <circle cx="42" cy="25" r="3.5" fill="#6b7280" opacity=".3" />
        <circle cx="68" cy="25" r="3.5" fill="#6b7280" opacity=".3" />
      </svg>
    ),
    6: ( // Fidélisation — carte membre + étoiles + cœur
      <svg viewBox="0 0 120 80" className="w-full h-full">
        {/* Card */}
        <rect x="20" y="18" width="55" height="35" rx="4" fill={c} opacity=".15" stroke={c} strokeWidth="1.5" />
        <rect x="26" y="25" width="20" height="3" rx="1" fill={c} opacity=".5" />
        <rect x="26" y="31" width="30" height="2" rx="1" fill={c} opacity=".3" />
        <rect x="26" y="36" width="25" height="2" rx="1" fill={c} opacity=".2" />
        <text x="62" y="45" fontSize="8" fill={c} fontWeight="700" textAnchor="end">GOLD</text>
        {/* Stars */}
        <polygon points="87,15 89,21 96,21 91,25 93,31 87,27 81,31 83,25 78,21 85,21" fill="#fbbf24" />
        <polygon points="100,25 101.5,29 106,29 102.5,31.5 103.5,36 100,33.5 96.5,36 97.5,31.5 94,29 98.5,29" fill="#fbbf24" opacity=".5" />
        {/* Heart */}
        <path d="M 95 50 C 95 45, 105 45, 105 50 C 105 58, 95 63, 95 63 C 95 63, 85 58, 85 50 C 85 45, 95 45, 95 50" fill="#ef4444" opacity=".3" />
        {/* Phone */}
        <rect x="55" y="50" width="16" height="25" rx="3" fill="#374151" opacity=".2" />
        <rect x="57" y="53" width="12" height="17" rx="1" fill={c} opacity=".1" />
      </svg>
    ),
  };
  return <>{scenes[stage]}</>;
};

const VerticalJourneyFlow: React.FC = () => {
  const stages = journeyStages;
  const ROW_H = 380;
  const TOTAL_H = stages.length * ROW_H + 60;
  // Path X positions: left column center ~185, right column center ~520 (on 700 viewBox)
  const PL = 185, PR = 520;

  return (
    <div className="relative bg-white rounded-2xl border border-black/[.06] shadow-[0_2px_20px_rgba(0,0,0,.04)] overflow-hidden">

      {/* ── HEADER ── */}
      <div className="relative bg-gradient-to-br from-[#0a1a14] via-[#0f2920] to-[#0a1a14] px-8 py-7 overflow-hidden">
        <div className="absolute inset-0 opacity-[.03]" style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px',
        }} />
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-emerald-400/15 flex items-center justify-center text-emerald-400">
              <Route size={22} strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="font-cormorant text-[28px] font-light text-white leading-tight">The Customer Journey</h3>
              <p className="text-[10px] text-white/35 mt-0.5">Cosmos Angré · Centre commercial · Angré 8ème tranche, Abidjan</p>
            </div>
          </div>
        </div>
        {/* Column headers like reference image */}
        <div className="flex mt-6">
          <div className="w-[80px] flex-shrink-0" />
          <div className="flex-1 text-center">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-amber-400/15 border border-amber-400/25">
              <MapPin size={14} className="text-amber-300" />
              <span className="text-[11px] font-bold tracking-[.12em] uppercase text-amber-200">Offline</span>
            </div>
          </div>
          <div className="flex-1 text-center">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-sky-400/15 border border-sky-400/25">
              <Smartphone size={14} className="text-sky-300" />
              <span className="text-[11px] font-bold tracking-[.12em] uppercase text-sky-200">Online</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="relative">

        {/* ── SVG: thick S-curve path (the "road") ── */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox={`0 0 700 ${TOTAL_H}`}
          preserveAspectRatio="xMidYMid meet"
          style={{ height: TOTAL_H }}
        >
          <defs>
            <linearGradient id="pathGrad" x1="0" y1="0" x2="0" y2="1">
              {stages.map((_, i) => (
                <stop key={i} offset={`${(i / (stages.length - 1)) * 100}%`} stopColor={stageColors[i]} stopOpacity="0.25" />
              ))}
            </linearGradient>
          </defs>
          {/* Thick pipe path */}
          {stages.map((_, i) => {
            if (i >= stages.length - 1) return null;
            const y1 = i * ROW_H + ROW_H * 0.5;
            const y2 = (i + 1) * ROW_H + ROW_H * 0.5;
            const midY = (y1 + y2) / 2;
            const fromX = i % 2 === 0 ? PL : PR;
            const toX = i % 2 === 0 ? PR : PL;
            return (
              <g key={i}>
                {/* Shadow */}
                <path
                  d={`M ${fromX} ${y1} C ${fromX} ${midY}, ${toX} ${midY}, ${toX} ${y2}`}
                  fill="none" stroke={stageColors[i]} strokeWidth="28" strokeLinecap="round" opacity=".06"
                />
                {/* Main pipe */}
                <path
                  d={`M ${fromX} ${y1} C ${fromX} ${midY}, ${toX} ${midY}, ${toX} ${y2}`}
                  fill="none" stroke={stageColors[i]} strokeWidth="14" strokeLinecap="round" opacity=".18"
                />
                {/* Center line */}
                <path
                  d={`M ${fromX} ${y1} C ${fromX} ${midY}, ${toX} ${midY}, ${toX} ${y2}`}
                  fill="none" stroke={stageColors[i]} strokeWidth="3" strokeLinecap="round" opacity=".5"
                  strokeDasharray="8 6"
                />
              </g>
            );
          })}
          {/* Stage dots on the path */}
          {stages.map((_, i) => {
            const cx = i % 2 === 0 ? PL : PR;
            const cy = i * ROW_H + ROW_H * 0.5;
            return (
              <g key={`dot-${i}`}>
                <circle cx={cx} cy={cy} r="22" fill={stageColors[i]} opacity=".12" />
                <circle cx={cx} cy={cy} r="12" fill={stageColors[i]} opacity=".35" />
                <circle cx={cx} cy={cy} r="5" fill={stageColors[i]} />
              </g>
            );
          })}
        </svg>

        {/* ── STAGES ── */}
        {stages.map((stage, i) => {
          const Icon = FLOW_ICONS[i];
          const color = stageColors[i];
          const physTP = stage.layers.touchPhys || [];
          const digiTP = stage.layers.touchDigit || [];
          const opps = stage.layers.opportunites || [];
          const emotions = stage.layers.emotions || [];
          const isEven = i % 2 === 0;

          return (
            <div key={stage.id} className="relative" style={{ height: ROW_H }}>

              {/* ── Stage number + title (left sidebar) ── */}
              <div className="absolute left-0 top-0 bottom-0 w-[80px] flex flex-col items-center pt-6 border-r border-black/[.04]"
                style={{ background: `${color}04` }}>
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-[18px] shadow-lg"
                    style={{ background: color }}>
                    {i + 1}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-md flex items-center justify-center bg-white shadow-sm border border-black/[.06]"
                    style={{ color }}>
                    <Icon size={10} strokeWidth={2} />
                  </div>
                </div>
                <div className="mt-3 font-cormorant text-[14px] font-bold text-navy text-center leading-tight px-1">
                  {stage.label}
                </div>
                <div className="mt-1 text-[8px] text-black/20 font-mono">{FLOW_DURATIONS[i]}</div>
              </div>

              {/* ── Content area: 2 columns ── */}
              <div className="ml-[80px] h-full flex">

                {/* ── LEFT COLUMN: Physique / Offline ── */}
                <div className="flex-1 px-5 py-5 border-r border-dashed border-black/[.05] relative">
                  {/* Scene illustration */}
                  <div className={`w-[120px] h-[80px] mb-3 ${isEven ? '' : 'ml-auto'}`}>
                    <SceneIllustration stage={i} color={color} />
                  </div>
                  {/* Physical touchpoints */}
                  <div className="space-y-2">
                    {physTP.slice(0, 4).map((tp, j) => (
                      <div key={j} className={`flex items-start gap-2 ${isEven ? '' : 'flex-row-reverse text-right'}`}>
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ background: `${color}10`, color }}>
                          <Icon size={12} strokeWidth={1.5} />
                        </div>
                        <span className="text-[9px] text-black/50 leading-relaxed pt-1">{tp}</span>
                      </div>
                    ))}
                    {physTP.length > 4 && (
                      <div className={`text-[8px] text-black/25 ${isEven ? 'ml-9' : 'mr-9 text-right'}`}>
                        +{physTP.length - 4} points de contact
                      </div>
                    )}
                  </div>
                  {/* Emotion quote */}
                  {emotions[0] && (
                    <div className={`mt-3 flex items-start gap-2 ${isEven ? '' : 'flex-row-reverse text-right'}`}>
                      <span className="text-[14px] leading-none mt-0.5">💬</span>
                      <span className="text-[9px] text-black/30 italic leading-relaxed">{emotions[0]}</span>
                    </div>
                  )}
                </div>

                {/* ── RIGHT COLUMN: Digital / Online ── */}
                <div className="flex-1 px-5 py-5 relative">
                  {/* Digital touchpoints */}
                  <div className="space-y-2 mb-4">
                    {digiTP.slice(0, 4).map((tp, j) => (
                      <div key={j} className={`flex items-start gap-2 ${isEven ? 'flex-row-reverse text-right' : ''}`}>
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 bg-sky-50 text-sky-500">
                          <Smartphone size={12} strokeWidth={1.5} />
                        </div>
                        <span className="text-[9px] text-black/50 leading-relaxed pt-1">{tp}</span>
                      </div>
                    ))}
                    {digiTP.length > 4 && (
                      <div className={`text-[8px] text-black/25 ${isEven ? 'mr-9 text-right' : 'ml-9'}`}>
                        +{digiTP.length - 4} points digitaux
                      </div>
                    )}
                  </div>

                  {/* ── PROPOSED SOLUTION callout (colored box like reference) ── */}
                  {opps.length > 0 && (
                    <div className="rounded-xl p-4 relative overflow-hidden"
                      style={{ background: `${color}10`, border: `1.5px solid ${color}25` }}>
                      {/* Colored left accent */}
                      <div className="absolute left-0 top-0 bottom-0 w-1.5 rounded-l-xl" style={{ background: color }} />
                      <div className="text-[8px] font-bold tracking-[.15em] uppercase mb-2 pl-2"
                        style={{ color }}>
                        Proposed Solution
                      </div>
                      <div className="space-y-2 pl-2">
                        {opps.slice(0, 3).map((opp, j) => (
                          <div key={j} className="flex items-start gap-2">
                            <Lightbulb size={10} className="mt-0.5 flex-shrink-0" style={{ color }} />
                            <span className="text-[9.5px] text-black/55 leading-relaxed">{opp}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Stage separator */}
              {i < stages.length - 1 && (
                <div className="absolute bottom-0 left-[80px] right-0 flex items-center px-5">
                  <div className="flex-1 h-px" style={{ background: `${stageColors[i + 1]}15` }} />
                </div>
              )}
            </div>
          );
        })}

        {/* ── END NODE ── */}
        <div className="flex items-center gap-5 px-8 py-6 border-t border-emerald-200/15" style={{ background: 'linear-gradient(90deg, #ecfdf5, transparent)' }}>
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white shadow-lg">
            <CheckCircle size={26} strokeWidth={1.5} />
          </div>
          <div>
            <div className="font-cormorant text-[20px] font-semibold text-emerald-800">Fidélisation acquise</div>
            <div className="text-[10px] text-emerald-600/50 mt-0.5">Programme Cosmos Club · Silver → Gold → Platinum · Cycle continu</div>
          </div>
          <div className="ml-auto flex gap-2">
            {['Silver', 'Gold', 'Platinum'].map((tier, j) => (
              <span key={tier} className="px-3 py-1 rounded-full text-[9px] font-bold"
                style={{
                  background: j === 0 ? '#e5e7eb' : j === 1 ? '#fef3c7' : '#f0e6d6',
                  color: j === 0 ? '#6b7280' : j === 1 ? '#b45309' : '#92400e',
                }}>
                {tier}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const JourneyMapModule: React.FC = () => {
  const [expandedLayer, setExpandedLayer] = useState<string | null>(null);
  const [tab, setTab] = useState<'flow' | 'swimlane'>('flow');
  const stages = journeyStages;
  const colCount = stages.length;

  return (
    <div id="pc-journeymap" className="px-8 lg:px-[72px] py-12">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600">
          <Route size={16} />
        </div>
        <div>
          <div className="text-[9px] font-bold tracking-[.25em] uppercase text-emerald-600">Module 1</div>
          <div className="font-cormorant text-[28px] font-medium text-navy leading-tight">Customer Journey <span className="font-bold">Layers</span></div>
        </div>
        <div className="h-px flex-1 bg-emerald-600/15" />
      </div>

      {/* Onglets */}
      <div className="flex items-center justify-between mb-8 ml-11">
        <p className="text-[11px] text-black/35">7 étapes &middot; 10 couches &middot; {touchpointLabels.length} touchpoints &middot; {departments.length} départements</p>
        <div className="flex items-center gap-1 bg-black/[.04] rounded-xl p-1">
          <button
            onClick={() => setTab('flow')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[11px] font-semibold transition-all ${
              tab === 'flow'
                ? 'bg-white shadow-sm text-emerald-700 ring-1 ring-emerald-200/40'
                : 'text-black/35 hover:text-black/55'
            }`}
          >
            <GitBranch size={13} />
            Parcours visuel
          </button>
          <button
            onClick={() => setTab('swimlane')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[11px] font-semibold transition-all ${
              tab === 'swimlane'
                ? 'bg-white shadow-sm text-emerald-700 ring-1 ring-emerald-200/40'
                : 'text-black/35 hover:text-black/55'
            }`}
          >
            <LayoutGrid size={13} />
            Swimlane · 10 couches
          </button>
        </div>
      </div>

      {/* ═══ Onglet 1 : Parcours visuel ═══ */}
      {tab === 'flow' && <VerticalJourneyFlow />}

      {/* ═══ Onglet 2 : Swimlane ═══ */}
      {tab === 'swimlane' && (
      <>
      {/* Swimlane container — horizontally scrollable */}
      <div className="bg-white rounded-2xl border border-black/[.06] shadow-[0_2px_20px_rgba(0,0,0,.04)] overflow-hidden">
        <div className="overflow-x-auto">
          <div className="min-w-[900px]">

            {/* ── ROW 1: STAGES (chevron arrows) ── */}
            <div className="flex border-b border-black/[.06]">
              <SwimLabel label="Customer Journey" sub="Stages" color="#059669" />
              <div className="flex-1 flex">
                {stages.map((stage, i) => (
                  <div
                    key={stage.id}
                    className="flex-1 relative flex items-center justify-center py-4 text-white font-bold text-[11px] tracking-wide"
                    style={{ background: stageColors[i] }}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {STAGE_ICONS[i]}
                      <span className="hidden sm:inline">{stage.label}</span>
                      <span className="sm:hidden">{stage.num}</span>
                    </span>
                    {/* Chevron arrow */}
                    {i < colCount - 1 && (
                      <div className="absolute right-0 top-0 bottom-0 w-0 z-20"
                        style={{
                          borderTop: '24px solid transparent',
                          borderBottom: '24px solid transparent',
                          borderLeft: `14px solid ${stageColors[i]}`,
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* ── ROW 2: STEPS (customer actions) ── */}
            <div className="flex border-b border-black/[.06] bg-black/[.01]">
              <SwimLabel label="Customer Journey" sub="Steps — Actions client" color="#3B82F6" />
              <div className="flex-1 flex">
                {stageSteps.map((steps, i) => (
                  <div key={i} className="flex-1 px-2 py-3 border-r border-black/[.04] last:border-r-0">
                    {steps.map((step, j) => (
                      <div key={j} className="flex items-start gap-1.5 mb-1.5 last:mb-0">
                        <ChevronRight size={8} className="mt-0.5 flex-shrink-0" style={{ color: stageColors[i] }} />
                        <span className="text-[9px] text-black/55 leading-tight">{step}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* ── ROW 3: EMOTIONS ── */}
            <div className="flex border-b border-black/[.06]">
              <SwimLabel label="Émotions" sub="Satisfaction client" color="#F43F5E" />
              <div className="flex-1 flex">
                {stageEmotions.map((emo, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center justify-center py-3 border-r border-black/[.04] last:border-r-0">
                    <span className="text-[18px] mb-1">{emo.emoji}</span>
                    <span className="text-[9px] font-semibold text-black/50">{emo.label}</span>
                    <div className="flex gap-0.5 mt-1.5">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <div
                          key={n}
                          className="w-2 h-2 rounded-full"
                          style={{
                            background: n <= emo.score ? stageColors[i] : 'rgba(0,0,0,.08)',
                          }}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── ROW 4: TOUCHPOINTS DOT MATRIX ── */}
            <div className="flex border-b border-black/[.06] bg-black/[.01]">
              <SwimLabel label="Customer Journey" sub={`Touchpoints — ${touchpointLabels.length} points`} color="#8B5CF6" />
              <div className="flex-1">
                {/* Touchpoint count row */}
                <div className="flex border-b border-black/[.04]">
                  {stages.map((_, ci) => {
                    const count = touchpointMatrix.reduce((sum, row) => sum + (row[ci] ? 1 : 0), 0);
                    return (
                      <div key={ci} className="flex-1 flex items-center justify-center py-2 border-r border-black/[.04] last:border-r-0">
                        <span
                          className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold text-white"
                          style={{ background: stageColors[ci] }}
                        >
                          {count}
                        </span>
                      </div>
                    );
                  })}
                </div>
                {/* Dot rows */}
                {touchpointLabels.map((label, ri) => (
                  <div key={ri} className="flex items-center border-b border-black/[.02] last:border-b-0 hover:bg-black/[.01]">
                    <div className="w-[110px] flex-shrink-0 px-2 py-1">
                      <span className="text-[8px] text-black/35 leading-tight">{label}</span>
                    </div>
                    {stages.map((_, ci) => (
                      <div key={ci} className="flex-1 flex items-center justify-center py-1 border-r border-black/[.02] last:border-r-0">
                        <Dot active={touchpointMatrix[ri]?.[ci] ?? false} color={stageColors[ci]} />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* ── ROW 5: DEPARTMENTS DOT MATRIX ── */}
            <div className="flex border-b border-black/[.06]">
              <SwimLabel label="Customer Journey" sub={`Départements — ${departments.length}`} color="#F59E0B" />
              <div className="flex-1">
                {/* Dept count row */}
                <div className="flex border-b border-black/[.04]">
                  {stages.map((_, ci) => {
                    const count = departmentMatrix.reduce((sum, row) => sum + (row[ci] ? 1 : 0), 0);
                    return (
                      <div key={ci} className="flex-1 flex items-center justify-center py-2 border-r border-black/[.04] last:border-r-0">
                        <span
                          className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold text-white"
                          style={{ background: stageColors[ci] }}
                        >
                          {count}
                        </span>
                      </div>
                    );
                  })}
                </div>
                {/* Dept dot rows */}
                {departments.map((dept, ri) => (
                  <div key={ri} className="flex items-center border-b border-black/[.02] last:border-b-0 hover:bg-black/[.01]">
                    <div className="w-[110px] flex-shrink-0 px-2 py-1.5">
                      <span className="text-[8px] text-black/35 leading-tight">{dept}</span>
                    </div>
                    {stages.map((_, ci) => (
                      <div key={ci} className="flex-1 flex items-center justify-center py-1.5 border-r border-black/[.02] last:border-r-0">
                        <Dot active={departmentMatrix[ri]?.[ci] ?? false} color={stageColors[ci]} big />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* ── ROW 6: PAIN POINTS ── */}
            <div className="flex border-b border-black/[.06] bg-red-50/30">
              <SwimLabel label="Pain Points" sub="Irritants identifiés" color="#EF4444" />
              <div className="flex-1 flex">
                {stagePainPoints.map((pains, i) => (
                  <div key={i} className="flex-1 px-2 py-3 border-r border-black/[.04] last:border-r-0">
                    {pains.map((pain, j) => (
                      <div key={j} className="flex items-start gap-1.5 mb-1.5 last:mb-0">
                        <AlertTriangle size={8} className="mt-0.5 flex-shrink-0 text-red-400" />
                        <span className="text-[9px] text-red-700/60 leading-tight">{pain}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* ── ROW 7: OPPORTUNITIES ── */}
            <div className="flex border-b border-black/[.06] bg-emerald-50/30">
              <SwimLabel label="Opportunités" sub="Quick wins & leviers" color="#10B981" />
              <div className="flex-1 flex">
                {stageOpportunities.map((opps, i) => (
                  <div key={i} className="flex-1 px-2 py-3 border-r border-black/[.04] last:border-r-0">
                    {opps.map((opp, j) => (
                      <div key={j} className="flex items-start gap-1.5 mb-1.5 last:mb-0">
                        <CheckCircle size={8} className="mt-0.5 flex-shrink-0 text-emerald-500" />
                        <span className="text-[9px] text-emerald-700/60 leading-tight">{opp}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* ── ROW 8: TECHNOLOGIES ── */}
            <div className="flex border-b border-black/[.06] bg-black/[.01]">
              <SwimLabel label="Technologies" sub="Stack technique" color="#6366F1" />
              <div className="flex-1 flex">
                {stageTechnologies.map((techs, i) => (
                  <div key={i} className="flex-1 px-2 py-3 border-r border-black/[.04] last:border-r-0">
                    {techs.map((tech, j) => (
                      <div key={j} className="flex items-start gap-1.5 mb-1.5 last:mb-0">
                        <span className="w-1.5 h-1.5 rounded-full mt-1 flex-shrink-0 bg-indigo-400" />
                        <span className="text-[9px] text-black/50 leading-tight">{tech}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* ── ROW 9: PERSONNEL ── */}
            <div className="flex border-b border-black/[.06]">
              <SwimLabel label="Personnel" sub="Équipes mobilisées" color="#F97316" />
              <div className="flex-1 flex">
                {stagePersonnel.map((staff, i) => (
                  <div key={i} className="flex-1 px-2 py-3 border-r border-black/[.04] last:border-r-0">
                    {staff.map((role, j) => (
                      <div key={j} className="flex items-start gap-1.5 mb-1.5 last:mb-0">
                        <Users size={8} className="mt-0.5 flex-shrink-0 text-orange-400" />
                        <span className="text-[9px] text-black/50 leading-tight">{role}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* ── ROW 10: KPIs per STAGE ── */}
            <div className="flex border-b border-black/[.06] bg-black/[.01]">
              <SwimLabel label="KPIs" sub="Métriques clés" color="#F43F5E" />
              <div className="flex-1 flex">
                {stageKpis.map((kpis, i) => (
                  <div key={i} className="flex-1 px-2 py-3 border-r border-black/[.04] last:border-r-0">
                    {kpis.map((kpi, j) => (
                      <div key={j} className="flex items-start gap-1.5 mb-1.5 last:mb-0">
                        <BarChart3 size={8} className="mt-0.5 flex-shrink-0 text-rose-400" />
                        <span className="text-[9px] text-black/50 leading-tight">{kpi}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* ── ROW 11: DURATION BAR ── */}
            <div className="flex">
              <SwimLabel label="Customer Journey" sub="Durée estimée" color="#0EA5E9" />
              <div className="flex-1 flex items-center py-3 px-1">
                {stageDurations.map((dur, i) => {
                  const total = stageDurations.reduce((a, b) => a + b, 0);
                  const pct = (dur / total) * 100;
                  return (
                    <div
                      key={i}
                      className="h-8 flex items-center justify-center text-white text-[10px] font-bold"
                      style={{
                        width: `${pct}%`,
                        background: stageColors[i],
                        borderRadius: i === 0 ? '6px 0 0 6px' : i === stageDurations.length - 1 ? '0 6px 6px 0' : '0',
                      }}
                    >
                      {dur} min
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Duration total */}
      <div className="flex items-center justify-end mt-3 gap-2">
        <span className="text-[9px] text-black/30">Durée totale moyenne :</span>
        <span className="text-[12px] font-bold text-emerald-600">
          ~{Math.round(stageDurations.reduce((a, b) => a + b, 0) / 60 * 10) / 10}h
        </span>
      </div>

      {/* ── Expanded layer detail (click a stage for detail view) ── */}
      <div className="mt-8">
        <div className="text-[9px] font-bold tracking-[.2em] uppercase text-emerald-600 mb-4">Détail par étape — cliquez pour explorer</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
          {stages.slice(0, 4).map((stage, i) => (
            <button
              key={stage.id}
              onClick={() => setExpandedLayer(expandedLayer === stage.id ? null : stage.id)}
              className={`text-left rounded-xl border p-4 transition-all ${
                expandedLayer === stage.id ? 'shadow-md ring-2' : 'hover:shadow-sm bg-white'
              }`}
              style={{
                borderColor: expandedLayer === stage.id ? stageColors[i] : 'rgba(0,0,0,.06)',
                ringColor: stageColors[i],
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white" style={{ background: stageColors[i] }}>
                  {STAGE_ICONS[i]}
                </div>
                <div>
                  <div className="text-[8px] font-bold tracking-[.12em] uppercase" style={{ color: stageColors[i] }}>{stage.num}</div>
                  <div className="text-[12px] font-semibold text-navy">{stage.label}</div>
                </div>
              </div>
              <div className="text-[9px] text-black/35">{stage.layers.phase?.[0]}</div>
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {stages.slice(4).map((stage, i) => {
            const idx = i + 4;
            return (
              <button
                key={stage.id}
                onClick={() => setExpandedLayer(expandedLayer === stage.id ? null : stage.id)}
                className={`text-left rounded-xl border p-4 transition-all ${
                  expandedLayer === stage.id ? 'shadow-md ring-2' : 'hover:shadow-sm bg-white'
                }`}
                style={{
                  borderColor: expandedLayer === stage.id ? stageColors[idx] : 'rgba(0,0,0,.06)',
                  ringColor: stageColors[idx],
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white" style={{ background: stageColors[idx] }}>
                    {STAGE_ICONS[idx]}
                  </div>
                  <div>
                    <div className="text-[8px] font-bold tracking-[.12em] uppercase" style={{ color: stageColors[idx] }}>{stage.num}</div>
                    <div className="text-[12px] font-semibold text-navy">{stage.label}</div>
                  </div>
                </div>
                <div className="text-[9px] text-black/35">{stage.layers.phase?.[0]}</div>
              </button>
            );
          })}
        </div>

        {/* Expanded detail panel */}
        {expandedLayer && (() => {
          const idx = stages.findIndex((s) => s.id === expandedLayer);
          if (idx < 0) return null;
          const stage = stages[idx];
          return (
            <div className="mt-4 rounded-2xl border-2 p-6 bg-white shadow-lg" style={{ borderColor: stageColors[idx] }}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white" style={{ background: stageColors[idx] }}>
                  {STAGE_ICONS[idx]}
                </div>
                <div>
                  <div className="text-[9px] font-bold tracking-[.2em] uppercase" style={{ color: stageColors[idx] }}>
                    Étape {stage.num} — {stage.label}
                  </div>
                  <div className="font-cormorant text-[24px] font-medium text-navy leading-tight">
                    {stage.layers.phase?.[0]}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {journeyLayers.map((layer) => {
                  const items = stage.layers[layer.id] || [];
                  if (items.length === 0) return null;
                  return (
                    <div
                      key={layer.id}
                      className="rounded-xl border p-4"
                      style={{ borderColor: `${layer.color}25`, background: `${layer.color}06` }}
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <span style={{ color: layer.color }}>{layer.icon}</span>
                        <span className="text-[10px] font-semibold" style={{ color: layer.color }}>
                          {layer.label}
                        </span>
                      </div>
                      <ul className="space-y-1.5">
                        {items.map((item, j) => (
                          <li key={j} className="flex items-start gap-2">
                            <span className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0" style={{ background: layer.color }} />
                            <span className="text-[11px] text-black/55 leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })()}
      </div>
      </>
      )}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════
   MODULE 2 — Personas
   ═══════════════════════════════════════════════════════════════════════════ */

const PersonasModule: React.FC = () => {
  const [activePersona, setActivePersona] = useState(0);
  const p = personas[activePersona];

  return (
    <div id="pc-personas" className="px-8 lg:px-[72px] py-12 border-t border-black/[.06]">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600">
          <Users size={16} />
        </div>
        <div>
          <div className="text-[9px] font-bold tracking-[.25em] uppercase text-emerald-600">Module 2</div>
          <div className="font-cormorant text-[28px] font-medium text-navy leading-tight">4 Personas Cosmos</div>
        </div>
        <div className="h-px flex-1 bg-emerald-600/15" />
      </div>

      {/* Persona tabs */}
      <div className="flex gap-3 mb-8 flex-wrap">
        {personas.map((persona, i) => (
          <button
            key={persona.id}
            onClick={() => setActivePersona(i)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all ${
              activePersona === i
                ? 'border-transparent text-white shadow-md'
                : 'border-black/[.06] bg-white text-black/60 hover:bg-black/[.02]'
            }`}
            style={activePersona === i ? { background: persona.color } : undefined}
          >
            <span className={activePersona === i ? 'text-white' : ''}>{persona.icon}</span>
            <div className="text-left">
              <div className="text-[12px] font-semibold">{persona.name}</div>
              <div className={`text-[9px] ${activePersona === i ? 'text-white/70' : 'text-black/35'}`}>{persona.role}</div>
            </div>
          </button>
        ))}
      </div>

      {/* Persona detail */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bio card */}
        <div className="bg-white rounded-2xl border border-black/[.06] p-6 shadow-[0_2px_20px_rgba(0,0,0,.04)]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white" style={{ background: p.color }}>
              {p.icon}
            </div>
            <div>
              <div className="font-cormorant text-[22px] font-medium text-navy">{p.name}</div>
              <div className="text-[10px] text-black/40">{p.age} · {p.role}</div>
            </div>
          </div>
          <p className="text-[11px] text-black/50 leading-relaxed mb-4">{p.bio}</p>
          <div className="space-y-2">
            {[
              { l: 'Quartier', v: p.quartier },
              { l: 'Revenu', v: p.revenu },
              { l: 'Fréquence', v: p.frequence },
              { l: 'Cosmos Club', v: p.cosmosClub },
            ].map((item) => (
              <div key={item.l} className="flex items-start gap-2">
                <span className="text-[9px] font-bold tracking-[.1em] uppercase text-black/25 w-20 flex-shrink-0 pt-0.5">{item.l}</span>
                <span className="text-[11px] text-black/60">{item.v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Motivations & Frustrations */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-black/[.06] p-5 shadow-[0_2px_20px_rgba(0,0,0,.04)]">
            <div className="text-[9px] font-bold tracking-[.2em] uppercase mb-3" style={{ color: p.color }}>
              Motivations
            </div>
            <div className="space-y-2">
              {p.motivations.map((m, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle size={12} style={{ color: p.color }} />
                  <span className="text-[11px] text-black/55">{m}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-black/[.06] p-5 shadow-[0_2px_20px_rgba(0,0,0,.04)]">
            <div className="text-[9px] font-bold tracking-[.2em] uppercase text-red-500 mb-3">
              Frustrations
            </div>
            <div className="space-y-2">
              {p.frustrations.map((f, i) => (
                <div key={i} className="flex items-center gap-2">
                  <AlertTriangle size={12} className="text-red-400" />
                  <span className="text-[11px] text-black/55">{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Touchpoints & Journey */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-black/[.06] p-5 shadow-[0_2px_20px_rgba(0,0,0,.04)]">
            <div className="text-[9px] font-bold tracking-[.2em] uppercase text-emerald-600 mb-3">
              Points de contact privilégiés
            </div>
            <div className="flex flex-wrap gap-2">
              {p.touchpoints.map((tp, i) => (
                <span key={i} className="px-2.5 py-1 rounded-full bg-emerald-50 text-[10px] font-medium text-emerald-700 border border-emerald-200/30">
                  {tp}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border p-5 shadow-[0_2px_20px_rgba(0,0,0,.04)]" style={{ background: `${p.color}08`, borderColor: `${p.color}15` }}>
            <div className="text-[9px] font-bold tracking-[.2em] uppercase mb-3" style={{ color: p.color }}>
              Parcours type
            </div>
            <p className="text-[11px] text-black/55 leading-relaxed italic">&ldquo;{p.journeyHighlight}&rdquo;</p>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════
   MODULE 3 — Touchpoints & Responsabilités
   ═══════════════════════════════════════════════════════════════════════════ */

const TouchpointsModule: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  const phases = [...new Set(touchpoints.map((tp) => tp.phase))];
  const filtered = filter === 'all' ? touchpoints : touchpoints.filter((tp) => tp.phase === filter);

  const typeColors: Record<string, string> = { physique: '#10B981', digital: '#3B82F6', humain: '#F59E0B' };
  const priorityColors: Record<string, string> = { critique: '#EF4444', important: '#F59E0B', secondaire: '#6B7280' };

  return (
    <div id="pc-touchpoints" className="px-8 lg:px-[72px] py-12 border-t border-black/[.06]">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600">
          <Eye size={16} />
        </div>
        <div>
          <div className="text-[9px] font-bold tracking-[.25em] uppercase text-emerald-600">Module 3</div>
          <div className="font-cormorant text-[28px] font-medium text-navy leading-tight">Touchpoints & Responsabilités</div>
        </div>
        <div className="h-px flex-1 bg-emerald-600/15" />
      </div>

      {/* Phase filters */}
      <div className="flex gap-2 mb-6 flex-wrap">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1.5 rounded-full text-[10px] font-medium border transition-all ${
            filter === 'all' ? 'bg-emerald-600 text-white border-transparent' : 'border-black/[.08] bg-white text-black/50'
          }`}
        >
          Tout ({touchpoints.length})
        </button>
        {phases.map((phase) => (
          <button
            key={phase}
            onClick={() => setFilter(phase)}
            className={`px-3 py-1.5 rounded-full text-[10px] font-medium border transition-all ${
              filter === phase ? 'bg-emerald-600 text-white border-transparent' : 'border-black/[.08] bg-white text-black/50'
            }`}
          >
            {phase}
          </button>
        ))}
      </div>

      {/* Touchpoints table */}
      <div className="bg-white rounded-2xl border border-black/[.06] overflow-hidden shadow-[0_2px_20px_rgba(0,0,0,.04)]">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#0a1a14]">
                {['Touchpoint', 'Phase', 'Type', 'Responsable', 'Description', 'Priorité'].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[9px] font-bold tracking-[.15em] uppercase text-white/70 whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((tp, i) => (
                <tr key={tp.id} className={`${i % 2 === 0 ? 'bg-white' : 'bg-black/[.015]'} border-b border-black/[.04]`}>
                  <td className="px-4 py-3 text-[11px] font-semibold text-navy whitespace-nowrap">{tp.label}</td>
                  <td className="px-4 py-3">
                    <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-medium">{tp.phase}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-[9px] px-2 py-0.5 rounded-full font-medium text-white" style={{ background: typeColors[tp.type] }}>
                      {tp.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[10px] text-black/50">{tp.responsable}</td>
                  <td className="px-4 py-3 text-[10px] text-black/45 max-w-[280px]">{tp.description}</td>
                  <td className="px-4 py-3">
                    <span className="text-[9px] px-2 py-0.5 rounded-full font-bold" style={{ color: priorityColors[tp.priority], background: `${priorityColors[tp.priority]}12` }}>
                      {tp.priority}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 mt-4 justify-end">
        {Object.entries(typeColors).map(([type, color]) => (
          <div key={type} className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: color }} />
            <span className="text-[9px] text-black/35 capitalize">{type}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════
   MODULE 4 — KPIs Dashboard
   ═══════════════════════════════════════════════════════════════════════════ */

const KpiDashboardModule: React.FC = () => (
  <div id="pc-kpis" className="px-8 lg:px-[72px] py-12 border-t border-black/[.06]">
    <div className="flex items-center gap-3 mb-8">
      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600">
        <BarChart3 size={16} />
      </div>
      <div>
        <div className="text-[9px] font-bold tracking-[.25em] uppercase text-emerald-600">Module 4</div>
        <div className="font-cormorant text-[28px] font-medium text-navy leading-tight">KPIs Dashboard</div>
      </div>
      <div className="h-px flex-1 bg-emerald-600/15" />
    </div>

    <div className="space-y-6">
      {kpiCategories.map((cat) => (
        <div key={cat.id} className="bg-white rounded-2xl border border-black/[.06] overflow-hidden shadow-[0_2px_20px_rgba(0,0,0,.04)]">
          <div className="flex items-center gap-3 px-6 py-4 border-b border-black/[.04]" style={{ background: `${cat.color}06` }}>
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `${cat.color}15`, color: cat.color }}>
              {cat.icon}
            </div>
            <div className="font-cormorant text-[20px] font-medium text-navy">{cat.label}</div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-x divide-y divide-black/[.04]">
            {cat.kpis.map((kpi, i) => (
              <div key={i} className="px-5 py-4">
                <div className="text-[10px] text-black/40 mb-2 leading-tight">{kpi.label}</div>
                <div className="font-cormorant text-[26px] font-medium leading-none mb-1" style={{ color: cat.color }}>
                  {kpi.target}
                </div>
                <div className="text-[9px] text-black/25">{kpi.unit}</div>
                <div className="flex items-center gap-3 mt-3">
                  <span className="text-[8px] px-2 py-0.5 rounded-full bg-black/[.04] text-black/35 font-medium">
                    {kpi.frequency}
                  </span>
                  <span className="text-[8px] text-black/25">{kpi.source}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════════════════════
   MODULE 5 — Plan d'action
   ═══════════════════════════════════════════════════════════════════════════ */

const ActionPlanModule: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const phases = [...new Set(actionPlan.map((a) => a.phase))];
  const filtered = filter === 'all' ? actionPlan : actionPlan.filter((a) => a.phase === filter);

  const statusIcon = (s: string) => {
    if (s === 'terminé') return <CheckCircle size={12} className="text-emerald-500" />;
    if (s === 'en_cours') return <Clock size={12} className="text-amber-500" />;
    return <span className="w-3 h-3 rounded-full border-2 border-black/15 inline-block" />;
  };

  return (
    <div id="pc-actionplan" className="px-8 lg:px-[72px] py-12 border-t border-black/[.06]">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600">
          <Calendar size={16} />
        </div>
        <div>
          <div className="text-[9px] font-bold tracking-[.25em] uppercase text-emerald-600">Module 5</div>
          <div className="font-cormorant text-[28px] font-medium text-navy leading-tight">Plan d&apos;action</div>
        </div>
        <div className="h-px flex-1 bg-emerald-600/15" />
      </div>

      {/* Phase filters */}
      <div className="flex gap-2 mb-6 flex-wrap">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1.5 rounded-full text-[10px] font-medium border transition-all ${
            filter === 'all' ? 'bg-emerald-600 text-white border-transparent' : 'border-black/[.08] bg-white text-black/50'
          }`}
        >
          Toutes les phases ({actionPlan.length})
        </button>
        {phases.map((phase) => {
          const item = actionPlan.find((a) => a.phase === phase);
          return (
            <button
              key={phase}
              onClick={() => setFilter(phase)}
              className={`px-3 py-1.5 rounded-full text-[10px] font-medium border transition-all ${
                filter === phase ? 'text-white border-transparent' : 'border-black/[.08] bg-white text-black/50'
              }`}
              style={filter === phase ? { background: item?.phaseColor } : undefined}
            >
              {phase}
            </button>
          );
        })}
      </div>

      {/* Action cards */}
      <div className="space-y-3">
        {filtered.map((action) => (
          <div key={action.id} className="bg-white rounded-xl border border-black/[.06] p-5 shadow-[0_1px_8px_rgba(0,0,0,.03)] flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-[11px]" style={{ background: action.phaseColor }}>
              {action.id}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-[13px] font-semibold text-navy mb-1">{action.title}</div>
                  <div className="text-[11px] text-black/40 leading-relaxed">{action.description}</div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {statusIcon(action.status)}
                  <span className={`text-[9px] px-2 py-0.5 rounded-full font-medium ${
                    action.priority === 'haute'
                      ? 'bg-red-50 text-red-600'
                      : action.priority === 'moyenne'
                      ? 'bg-amber-50 text-amber-600'
                      : 'bg-gray-50 text-gray-500'
                  }`}>
                    {action.priority}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4 mt-3">
                <span className="text-[9px] px-2 py-0.5 rounded-full font-medium text-white" style={{ background: action.phaseColor }}>
                  {action.phase}
                </span>
                <span className="text-[9px] text-black/30">
                  <Clock size={10} className="inline mr-1" />
                  {action.deadline}
                </span>
                <span className="text-[9px] text-black/30">
                  <Users size={10} className="inline mr-1" />
                  {action.responsable}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════
   MODULE 6 — Signalétique Directionnelle
   ═══════════════════════════════════════════════════════════════════════════ */

const SignaletiqueModule: React.FC = () => (
  <div id="pc-signaletique" className="px-8 lg:px-[72px] py-12 border-t border-black/[.06]">
    <div className="flex items-center gap-3 mb-8">
      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600">
        <Signpost size={16} />
      </div>
      <div>
        <div className="text-[9px] font-bold tracking-[.25em] uppercase text-emerald-600">Module 6</div>
        <div className="font-cormorant text-[28px] font-medium text-navy leading-tight">Signalétique Directionnelle</div>
      </div>
      <div className="h-px flex-1 bg-emerald-600/15" />
    </div>

    {/* Summary stats */}
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
      {[
        { n: signageTypes.reduce((sum, s) => sum + s.quantity, 0).toString(), l: 'Éléments total' },
        { n: signageTypes.length.toString(), l: 'Types de signalétique' },
        { n: '3', l: 'Zones couvertes' },
        { n: '100%', l: 'Accessibilité PMR' },
      ].map((stat) => (
        <div key={stat.l} className="bg-white rounded-xl border border-black/[.06] px-5 py-4 text-center shadow-[0_1px_8px_rgba(0,0,0,.03)]">
          <div className="font-cormorant text-[28px] font-medium text-emerald-600">{stat.n}</div>
          <div className="text-[9px] text-black/30 tracking-[.1em] uppercase">{stat.l}</div>
        </div>
      ))}
    </div>

    {/* Signage types grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {signageTypes.map((sign) => (
        <div key={sign.id} className="bg-white rounded-2xl border border-black/[.06] p-5 shadow-[0_2px_12px_rgba(0,0,0,.03)] hover:shadow-md hover:border-emerald-200/30 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600">
              {sign.icon}
            </div>
            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
              &times;{sign.quantity}
            </span>
          </div>
          <div className="text-[12px] font-semibold text-navy mb-1.5">{sign.type}</div>
          <div className="text-[10px] text-black/40 leading-relaxed mb-3">{sign.description}</div>
          <div className="text-[9px] text-black/25 mb-1">
            <MapPin size={10} className="inline mr-1 text-emerald-500" />
            {sign.location}
          </div>
          <div className="text-[8px] text-black/20 font-mono mt-2 p-2 bg-black/[.02] rounded-lg">
            {sign.specs}
          </div>
        </div>
      ))}
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN — ParcoursClient
   ═══════════════════════════════════════════════════════════════════════════ */

const ParcoursClient: React.FC = () => {
  useEffect(() => {
    const handler = (e: Event) => {
      const idx = (e as CustomEvent).detail;
      if (typeof idx === 'number') {
        const el = document.getElementById('pc-journeymap');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };
    window.addEventListener('select-moment', handler);
    return () => window.removeEventListener('select-moment', handler);
  }, []);

  return (
    <div className="bg-cream min-h-screen">
      {/* Hero cover */}
      <div id="pc-cover" className="relative bg-gradient-to-br from-[#0a1a14] via-[#153d2e] to-[#0a1a14] px-8 lg:px-[72px] py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,rgba(16,185,129,.1)_0%,transparent_60%)]" />
        <div className="absolute inset-0 opacity-[.03]" style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }} />
        <div className="absolute top-6 left-[72px] w-16 h-16 border-t border-l border-emerald-400/15" />
        <div className="absolute bottom-6 right-[72px] w-16 h-16 border-b border-r border-emerald-400/15" />

        <div className="relative z-10 max-w-[800px]">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-emerald-400/60" />
            <span className="text-[10px] font-bold tracking-[.25em] uppercase text-emerald-400/70">
              Volume 3 — Parcours Client
            </span>
          </div>
          <div className="flex items-center gap-5 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 flex items-center justify-center text-emerald-400">
              <Route size={28} strokeWidth={1.5} />
            </div>
            <h1 className="font-cormorant text-[48px] font-light text-white leading-tight">
              Parcours Client
            </h1>
          </div>
          <p className="text-[14px] text-white/35 leading-relaxed max-w-[560px] mb-8">
            Journey Map à 10 couches, 4 personas, touchpoints, KPIs et plan d&apos;action — de l&apos;approche véhicule à la fidélisation Cosmos Club.
          </p>

          {/* Module summary badges */}
          <div className="flex flex-wrap gap-3">
            {[
              { n: '1', l: 'Journey Map', icon: <Route size={12} /> },
              { n: '2', l: '4 Personas', icon: <Users size={12} /> },
              { n: '3', l: 'Touchpoints', icon: <Eye size={12} /> },
              { n: '4', l: 'KPIs', icon: <BarChart3 size={12} /> },
              { n: '5', l: "Plan d'action", icon: <Calendar size={12} /> },
              { n: '6', l: 'Signalétique', icon: <Signpost size={12} /> },
            ].map((mod) => (
              <div key={mod.n} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[.06] border border-white/[.08] text-white/50 text-[10px]">
                <span className="text-emerald-400">{mod.icon}</span>
                <span className="font-medium">M{mod.n}</span>
                <span className="text-white/30">&middot;</span>
                <span>{mod.l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="h-[2px] bg-gradient-to-r from-emerald-500/60 via-emerald-400/20 to-transparent" />

      {/* Modules */}
      <JourneyMapModule />
      <PersonasModule />
      <TouchpointsModule />
      <KpiDashboardModule />
      <ActionPlanModule />
      <SignaletiqueModule />

      {/* Plan 3D */}
      <div className="px-8 lg:px-[72px] py-8 border-t border-black/[.06]">
        <button
          onClick={() => window.open('/plan-3d.html', '_blank')}
          className="w-full group flex items-center justify-between px-7 py-5 rounded-2xl border border-emerald-200/30 bg-emerald-50/50 hover:bg-emerald-50 hover:border-emerald-300/40 transition-all"
        >
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600">
              <Box size={20} strokeWidth={1.5} />
            </div>
            <div className="text-left">
              <div className="text-[13px] font-medium text-navy">Plan 3D Interactif — Parcours visiteur</div>
              <div className="text-[10px] text-black/35 mt-0.5">Visualiser les flux, la signalétique et les points de service</div>
            </div>
          </div>
          <ArrowRight size={16} className="text-emerald-400 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Footer */}
      <div className="py-8 text-center text-[8px] text-black/15">
        Parcours Client &middot; Cosmos Angré &middot; Mars 2026 &middot; Document EXCO confidentiel — New Heaven SA / RCP
      </div>
    </div>
  );
};

export default ParcoursClient;
