import React, { useState } from 'react';
import {
  Box, ChevronLeft, ChevronRight, Layers, Eye, ShieldCheck, Route,
  Brain, Users, Cpu, Target, AlertTriangle, LayoutGrid,
  ClipboardCheck, Calendar, CheckCircle2, ArrowRight, Zap,
  Database, Globe, Wifi, WifiOff, Lock, Camera, Signpost,
  BarChart3, FileText, Code2, Sparkles,
} from 'lucide-react';
import CosmosLogo from './CosmosLogo';
import { SECTIONS, CDC_METRICS, CDC_TAGS, PHASES } from './planInteractifData';
import type { ContentBlock, Section } from './planInteractifData';

/* ─── Section icons map ─── */
const sectionIcons: Record<string, React.ReactNode> = {
  s0: <LayoutGrid size={20} strokeWidth={1.5} />,
  s1: <Target size={20} strokeWidth={1.5} />,
  s2: <AlertTriangle size={20} strokeWidth={1.5} />,
  s3: <Cpu size={20} strokeWidth={1.5} />,
  s4: <Layers size={20} strokeWidth={1.5} />,
  s5: <Eye size={20} strokeWidth={1.5} />,
  s6: <ShieldCheck size={20} strokeWidth={1.5} />,
  s7: <Route size={20} strokeWidth={1.5} />,
  s8: <Brain size={20} strokeWidth={1.5} />,
  s9: <Users size={20} strokeWidth={1.5} />,
  s10: <ClipboardCheck size={20} strokeWidth={1.5} />,
  s11: <Calendar size={20} strokeWidth={1.5} />,
  s12: <CheckCircle2 size={20} strokeWidth={1.5} />,
};

const sectionAccents: Record<string, string> = {
  s0: '#C9943A',
  s1: '#C9943A',
  s2: '#EF4444',
  s3: '#6366F1',
  s4: '#8B5CF6',
  s5: '#3B82F6',
  s6: '#0EA5E9',
  s7: '#10B981',
  s8: '#F59E0B',
  s9: '#EC4899',
  s10: '#14B8A6',
  s11: '#F97316',
  s12: '#22C55E',
};

/* ─── Architecture diagram mini ─── */
const ARCHITECTURE_LAYERS = [
  { label: 'UI · React + Tailwind', color: '#6366F1', icon: <Code2 size={12} /> },
  { label: 'State · Zustand + React Query', color: '#3B82F6', icon: <Database size={12} /> },
  { label: 'Rendu · Fabric.js + Three.js', color: '#0EA5E9', icon: <Eye size={12} /> },
  { label: 'IA · Proph3t (ONNX) + Claude', color: '#F59E0B', icon: <Brain size={12} /> },
  { label: 'Data · Supabase + PostGIS', color: '#10B981', icon: <Database size={12} /> },
  { label: 'Offline · Service Worker + IndexedDB', color: '#8B5CF6', icon: <WifiOff size={12} /> },
];

/* ─── Feature count per section ─── */
function countFeatures(section: Section): number {
  let count = 0;
  for (const block of section.content) {
    if (block.type === 'list' && block.items) {
      count += block.items.filter(item => /^F-\d|^M\d|^RC-\d/.test(item)).length;
    }
  }
  return count;
}

/* ─── Content renderer ─── */
function renderContent(block: ContentBlock, i: number) {
  if (block.type === 'para') return (
    <p key={i} className="text-[13px] text-black/60 leading-[1.85] mb-3">
      {block.text}
    </p>
  );

  if (block.type === 'subtitle') return (
    <div key={i} className="text-[13px] font-medium text-navy mt-5 mb-2 pl-3 border-l-2 border-purple-300/40">
      {block.text}
    </div>
  );

  if (block.type === 'list') return (
    <div key={i} className="mb-4">
      {block.title && (
        <div className="text-[10px] font-bold tracking-[.15em] uppercase text-black/40 mb-2">{block.title}</div>
      )}
      <ul className="space-y-1">
        {block.items?.map((item, j) => {
          const isFeature = /^F-\d/.test(item);
          const isMoment = /^M\d/.test(item);
          const isRC = /^RC-\d/.test(item);
          const hasCode = isFeature || isMoment || isRC;
          const codeMatch = hasCode ? item.match(/^(F-\d+|M\d|RC-\d+)\s*:\s*/) : null;
          const code = codeMatch ? codeMatch[1] : null;
          const rest = codeMatch ? item.slice(codeMatch[0].length) : item;

          return (
            <li key={j} className="flex items-start gap-2.5 text-[12px] text-black/55 leading-relaxed">
              {hasCode ? (
                <>
                  <span className={`inline-flex items-center justify-center px-1.5 py-0.5 rounded text-[9px] font-bold tracking-wider flex-shrink-0 mt-0.5 ${
                    isFeature ? 'bg-purple-500/10 text-purple-600' :
                    isMoment ? 'bg-emerald-500/10 text-emerald-600' :
                    'bg-amber-500/10 text-amber-600'
                  }`}>
                    {code}
                  </span>
                  <span>{rest}</span>
                </>
              ) : (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400/40 mt-[7px] flex-shrink-0" />
                  <span>{item}</span>
                </>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );

  if (block.type === 'table') return (
    <div key={i} className="overflow-x-auto mb-4 rounded-xl border border-black/[.06]">
      <table className="w-full border-collapse text-[12px]">
        <tbody>
          {block.rows?.map((row, r) => (
            <tr key={r} className={`border-b border-black/[.04] last:border-b-0 ${
              r === 0 && block.header ? 'bg-purple-50/50' : r % 2 === 0 ? 'bg-white' : 'bg-cream/30'
            }`}>
              {row.map((cell, c) => (
                <td key={c} className={`px-4 py-3 align-top ${
                  r === 0 && block.header
                    ? 'font-semibold text-navy text-[11px] tracking-wide uppercase'
                    : c === 0
                    ? 'font-medium text-navy/80'
                    : 'text-black/55'
                }`} style={{ wordBreak: 'break-word' }}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return null;
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════════════════ */

const PlanInteractif3D: React.FC = () => {
  const [openSection, setOpenSection] = useState('s0');
  const currentIdx = SECTIONS.findIndex(s => s.id === openSection);
  const current = SECTIONS[currentIdx];
  const accent = sectionAccents[openSection] || '#6366F1';

  const goTo = (id: string) => {
    setOpenSection(id);
    const el = document.getElementById('pi-content-top');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="bg-cream min-h-screen">
      {/* ── HERO ── */}
      <div id="pi-cover" className="relative bg-gradient-to-br from-[#0c0c1e] via-[#1a1535] to-[#0c0c1e] px-8 lg:px-[72px] py-20 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(139,92,246,.12)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_80%,rgba(201,148,58,.08)_0%,transparent_50%)]" />
        <div className="absolute inset-0 opacity-[.02]" style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }} />

        {/* Corner accents */}
        <div className="absolute top-6 left-[72px] w-16 h-16 border-t border-l border-purple-400/15" />
        <div className="absolute bottom-6 right-[72px] w-16 h-16 border-b border-r border-purple-400/15" />

        <div className="relative z-10 max-w-[800px]">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-purple-400/60" />
            <span className="text-[10px] font-bold tracking-[.25em] uppercase text-purple-400/70">
              Praedium Tech — Atlas Studio
            </span>
          </div>

          <div className="flex items-center gap-5 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-purple-500/15 flex items-center justify-center text-purple-400">
              <Box size={28} strokeWidth={1.5} />
            </div>
            <div>
              <h1 className="font-cormorant text-[44px] font-light text-white leading-tight">
                Cahier des charges
              </h1>
              <div className="font-cormorant text-[22px] font-light text-purple-300/70 -mt-1">
                Module Plan Interactif 3D
              </div>
            </div>
          </div>

          <p className="text-[14px] text-white/55 leading-relaxed max-w-[560px] mb-6">
            Atlas Plan · Cosmos Angré Shopping Center · v2.0 · Mars 2026
          </p>

          {/* Tags */}
          <div className="flex gap-2 flex-wrap">
            {CDC_TAGS.map(tag => (
              <span key={tag} className="text-[10px] px-3 py-1 rounded-full bg-white/[.06] border border-white/[.08] text-white/50">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Gradient line */}
      <div className="h-[2px] bg-gradient-to-r from-purple-500/60 via-gold/30 to-transparent" />

      {/* ── KPI BAR ── */}
      <div className="px-8 lg:px-[72px] py-8 border-b border-black/[.06]">
        <div className="flex gap-10 flex-wrap">
          {CDC_METRICS.map(kpi => (
            <div key={kpi.label} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-600">
                <Sparkles size={16} />
              </div>
              <div>
                <div className="font-cormorant text-[28px] font-light text-navy leading-none">{kpi.n}</div>
                <div className="text-[9px] text-black/65 tracking-[.12em] uppercase font-medium">{kpi.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── ARCHITECTURE OVERVIEW ── */}
      <div className="px-8 lg:px-[72px] py-8 border-b border-black/[.06]">
        <div className="flex items-center gap-3 mb-5">
          <div className="text-[9px] font-bold tracking-[.25em] uppercase text-purple-600">Architecture en couches</div>
          <div className="h-px flex-1 bg-purple-600/15" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {ARCHITECTURE_LAYERS.map((layer, i) => (
            <div key={i} className="bg-white rounded-xl border border-black/[.06] p-4 text-center hover:shadow-md transition-shadow">
              <div className="w-8 h-8 rounded-lg mx-auto mb-2 flex items-center justify-center" style={{ background: `${layer.color}15`, color: layer.color }}>
                {layer.icon}
              </div>
              <div className="text-[10px] text-navy font-medium leading-tight">{layer.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── SECTION SELECTOR ── */}
      <div id="pi-content-top" className="px-8 lg:px-[72px] py-6 border-b border-black/[.06] sticky top-0 bg-cream/95 backdrop-blur-sm z-10">
        <div className="flex items-center gap-2 mb-3">
          <div className="text-[9px] font-bold tracking-[.25em] uppercase text-purple-600">Navigation sections</div>
          <div className="h-px flex-1 bg-purple-600/15" />
          <div className="text-[10px] text-black/40">
            {currentIdx + 1}/{SECTIONS.length}
          </div>
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {SECTIONS.map(s => {
            const isActive = openSection === s.id;
            const a = sectionAccents[s.id] || '#6366F1';
            return (
              <button
                key={s.id}
                onClick={() => goTo(s.id)}
                className={`flex items-center gap-1.5 text-[10px] px-3 py-1.5 rounded-lg border transition-all ${
                  isActive
                    ? 'font-semibold text-white shadow-sm'
                    : 'border-black/[.06] bg-white text-black/50 hover:text-black/70 hover:border-black/10'
                }`}
                style={isActive ? { background: a, borderColor: a } : undefined}
              >
                <span className={`${isActive ? 'opacity-100' : 'opacity-40'}`}>
                  {React.cloneElement(sectionIcons[s.id] as React.ReactElement, { size: 11 })}
                </span>
                {s.num}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── CONTENT CARD ── */}
      {current && (
        <div className="px-8 lg:px-[72px] py-8">
          <div className="bg-white rounded-2xl border border-black/[.06] overflow-hidden shadow-[0_2px_20px_rgba(0,0,0,.04)]">
            {/* Card header */}
            <div className="relative px-7 py-6 border-b border-black/[.06]">
              <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: `linear-gradient(90deg, ${accent}, ${accent}30)` }} />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `${accent}12`, color: accent }}>
                    {sectionIcons[current.id]}
                  </div>
                  <div>
                    <div className="text-[9px] font-bold tracking-[.2em] uppercase mb-0.5" style={{ color: accent }}>
                      Section {current.num}
                    </div>
                    <div className="font-cormorant text-[26px] font-medium text-navy leading-tight">
                      {current.title}
                    </div>
                  </div>
                </div>

                {/* Navigation arrows */}
                <div className="flex items-center gap-2">
                  {countFeatures(current) > 0 && (
                    <span className="text-[9px] px-2.5 py-1 rounded-full font-bold tracking-wider mr-2" style={{ background: `${accent}12`, color: accent }}>
                      {countFeatures(current)} specs
                    </span>
                  )}
                  {currentIdx > 0 && (
                    <button
                      onClick={() => goTo(SECTIONS[currentIdx - 1].id)}
                      className="w-8 h-8 rounded-lg border border-black/[.06] flex items-center justify-center text-black/40 hover:text-black/70 hover:border-black/10 transition-colors"
                    >
                      <ChevronLeft size={14} />
                    </button>
                  )}
                  {currentIdx < SECTIONS.length - 1 && (
                    <button
                      onClick={() => goTo(SECTIONS[currentIdx + 1].id)}
                      className="w-8 h-8 rounded-lg border border-black/[.06] flex items-center justify-center text-black/40 hover:text-black/70 hover:border-black/10 transition-colors"
                    >
                      <ChevronRight size={14} />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Card body */}
            <div className="px-7 py-6">
              {current.content.map((block, i) => renderContent(block, i))}
            </div>
          </div>
        </div>
      )}

      {/* ── ROADMAP VISUAL (always visible below content) ── */}
      <div className="px-8 lg:px-[72px] py-8 border-t border-black/[.06]">
        <div className="flex items-center gap-3 mb-6">
          <div className="text-[9px] font-bold tracking-[.25em] uppercase text-purple-600">Roadmap — 7 phases</div>
          <div className="h-px flex-1 bg-purple-600/15" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {PHASES.map((phase, i) => (
            <div key={phase.id} className="flex-1 min-w-[120px]">
              <div className="bg-white rounded-xl border border-black/[.06] p-4 hover:shadow-md transition-shadow h-full">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold text-white" style={{ background: phase.color }}>
                    {i}
                  </div>
                  <div className="text-[11px] font-semibold text-navy">{phase.id}</div>
                </div>
                <div className="text-[10px] text-black/50 leading-relaxed">{phase.label}</div>
                <div className="mt-2 h-1 bg-black/[.04] rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${phase.progress}%`, background: phase.color }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── PLAN 3D LINK ── */}
      <div className="px-8 lg:px-[72px] py-8 border-t border-black/[.06]">
        <button
          onClick={() => window.open('/plan-3d.html', '_blank')}
          className="w-full group flex items-center justify-between px-7 py-5 rounded-2xl border border-purple-200/30 bg-purple-50/50 hover:bg-purple-50 hover:border-purple-300/40 transition-all"
        >
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-600">
              <Box size={20} strokeWidth={1.5} />
            </div>
            <div className="text-left">
              <div className="text-[13px] font-medium text-navy">Plan 3D Interactif — Maquette complète</div>
              <div className="text-[10px] text-black/65 mt-0.5">Ouvrir le rendu 3D Three.js — navigation, calques, entités</div>
            </div>
          </div>
          <ArrowRight size={16} className="text-purple-400 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* ── FOOTER ── */}
      <div className="py-8 text-center text-[8px] text-black/15">
        Cahier des charges — Module Plan Interactif 3D · Atlas Plan · Cosmos Angré · v2.0 · Mars 2026 · Praedium Tech
      </div>
    </div>
  );
};

export default PlanInteractif3D;
