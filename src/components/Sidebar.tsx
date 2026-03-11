import React, { useState } from 'react';
import CosmosLogo from './CosmosLogo';
import {
  FileText, Table, Presentation, Printer,
  Home, LayoutDashboard, CheckCircle2, CalendarDays,
  Compass, Hexagon, Layers, BarChart3,
  Palette, Paintbrush,
  Users, ClipboardList, UserPlus, Grid3X3,
  Megaphone, Globe2,
  ChevronDown, ChevronRight, Sparkles, Box
} from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onNavigate: (id: string) => void;
  onExport?: () => void;
}

interface SubItem {
  id: string;
  label: string;
  color: string;
}

interface TocItem {
  id: string;
  num: string;
  label: string;
  icon: React.ReactNode;
  children?: SubItem[];
}

interface TocSection {
  group: string;
  color: string;
  icon: React.ReactNode;
  items: TocItem[];
}

const tocData: TocSection[] = [
  {
    group: 'Introduction',
    color: 'rgba(255,255,255,.4)',
    icon: <Home size={11} />,
    items: [
      { id: 'cover', num: '—', label: 'Page de garde', icon: <Sparkles size={11} /> },
      { id: 'plan', num: '—', label: "Vue d'ensemble", icon: <LayoutDashboard size={11} /> },
      { id: 'decisions', num: '—', label: 'Décisions actées', icon: <CheckCircle2 size={11} /> },
      { id: 'calendrier', num: '—', label: 'Calendrier cible', icon: <CalendarDays size={11} /> },
    ],
  },
  {
    group: 'Stratégie & Plateforme',
    color: '#4A7558',
    icon: <Compass size={11} />,
    items: [
      { id: 'etape1', num: '1.0', label: 'Vue stratégie', icon: <Compass size={11} /> },
      { id: 'plateforme', num: '1.0b', label: 'Plateforme EXCO', icon: <FileText size={11} /> },
      { id: 'kapferer', num: '1.1', label: 'Prisme de Kapferer', icon: <Hexagon size={11} /> },
      { id: 'scenarios', num: '1.2', label: '4 Scénarios', icon: <Layers size={11} />, children: [
        { id: 'sc-A', label: 'A · Premium de proximité', color: '#4A7558' },
        { id: 'sc-B', label: 'B · Destination premium', color: '#0D1B4B' },
        { id: 'sc-C', label: "C · L'Exception Naturelle", color: '#C9943A' },
        { id: 'sc-D', label: 'D · Nature Contemporaine', color: '#898D5D' },
      ] },
      { id: 'comparatif', num: '1.3', label: 'Comparatif A·B·C·D', icon: <BarChart3 size={11} /> },
    ],
  },
  {
    group: 'Brand Book',
    color: '#C9943A',
    icon: <Palette size={11} />,
    items: [
      { id: 'etape2', num: '2.0', label: 'Vue Brand Book', icon: <Palette size={11} /> },
      { id: 'da', num: '2.1', label: 'Brand Book v2.2', icon: <Paintbrush size={11} />, children: [
        { id: 'da-A', label: 'Piste A · Proximité', color: '#2F5439' },
        { id: 'da-B', label: 'Piste B · Destination', color: '#0D1B4B' },
        { id: 'da-C', label: 'Piste C · Exception', color: '#B25A38' },
      ] },
    ],
  },
  {
    group: 'Focus Group',
    color: '#C8A96E',
    icon: <Users size={11} />,
    items: [
      { id: 'etape3', num: '3.0', label: 'Vue Focus Group', icon: <Users size={11} /> },
      { id: 'protocole', num: '3.1', label: 'Protocole v2.1', icon: <ClipboardList size={11} /> },
      { id: 'recrutement', num: '3.2', label: 'Recrutement', icon: <UserPlus size={11} /> },
      { id: 'grille', num: '3.3', label: "Grille d'analyse", icon: <Grid3X3 size={11} /> },
    ],
  },
  {
    group: 'Plan Marketing',
    color: '#e65100',
    icon: <Megaphone size={11} />,
    items: [
      { id: 'etape4', num: '4.0', label: 'Vue Plan Marketing', icon: <Megaphone size={11} /> },
      { id: 'plan360', num: '4.1', label: 'Plan Opérationnel', icon: <Globe2 size={11} /> },
      { id: 'plan3d', num: '4.2', label: 'Plan 3D Interactif', icon: <Box size={11} /> },
    ],
  },
];

const progressData: Record<string, { done: number; total: number }> = {
  'Stratégie & Plateforme': { done: 2, total: 5 },
  'Brand Book': { done: 1, total: 1 },
  'Focus Group': { done: 3, total: 4 },
  'Plan Marketing': { done: 0, total: 2 },
};

const Sidebar: React.FC<SidebarProps> = ({ activeSection, onNavigate, onExport }) => {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const [expandedSubs, setExpandedSubs] = useState<Record<string, boolean>>({});

  const toggle = (group: string) => {
    setCollapsed((prev) => ({ ...prev, [group]: !prev[group] }));
  };

  const toggleSub = (id: string) => {
    setExpandedSubs((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const isGroupActive = (section: TocSection) =>
    section.items.some((item) => item.id === activeSection);

  return (
    <nav className="w-[272px] bg-[#0f0f1a] flex flex-col h-screen flex-shrink-0 select-none">
      {/* Logo */}
      <div className="px-5 pt-6 pb-5 border-b border-white/[.06]">
        <div className="flex flex-col gap-1.5">
          <CosmosLogo height={32} />
          <div className="text-[8px] text-gold/70 tracking-[.2em] uppercase text-center">
            Catalogue Marketing 2026
          </div>
        </div>
      </div>

      {/* TOC */}
      <div className="flex-1 overflow-y-auto py-3 px-2.5">
        {tocData.map((section) => {
          const isOpen = !collapsed[section.group];
          const isActive = isGroupActive(section);
          const progress = progressData[section.group];

          return (
            <div key={section.group} className="mb-1">
              {/* Group header */}
              <button
                onClick={() => toggle(section.group)}
                className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-left transition-all group ${
                  isActive
                    ? 'bg-white/[.06]'
                    : 'hover:bg-white/[.03]'
                }`}
              >
                <span
                  className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0"
                  style={{ background: `${section.color}20`, color: section.color }}
                >
                  {section.icon}
                </span>
                <span className={`text-[10px] font-semibold tracking-[.12em] uppercase flex-1 ${
                  isActive ? 'text-white' : 'text-white/40 group-hover:text-white/60'
                }`}>
                  {section.group}
                </span>
                {progress && (
                  <span className="text-[9px] text-white/25 font-medium mr-1">
                    {progress.done}/{progress.total}
                  </span>
                )}
                <span className="text-white/20">
                  {isOpen ? <ChevronDown size={10} /> : <ChevronRight size={10} />}
                </span>
              </button>

              {/* Progress bar */}
              {progress && isOpen && (
                <div className="mx-3 mt-1 mb-1.5 h-[2px] bg-white/[.06] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${(progress.done / progress.total) * 100}%`,
                      background: section.color,
                      opacity: 0.6,
                    }}
                  />
                </div>
              )}

              {/* Items */}
              {isOpen && (
                <div className="ml-1 mt-0.5">
                  {section.items.map((item) => {
                    const active = activeSection === item.id;
                    return (
                      <div key={item.id}>
                        {(() => {
                          const hasChildren = !!item.children;
                          const childActive = hasChildren && item.children!.some(c => activeSection === c.id);
                          const isSubOpen = expandedSubs[item.id] || active || childActive;
                          return (
                            <>
                              <button
                                onClick={() => {
                                  onNavigate(item.id);
                                  if (hasChildren) toggleSub(item.id);
                                }}
                                className={`w-full flex items-center gap-2.5 px-3 py-[6px] rounded-md text-left transition-all group/item ${
                                  active || childActive
                                    ? 'bg-gold/[.12] text-white'
                                    : 'text-white/45 hover:text-white/75 hover:bg-white/[.03]'
                                }`}
                              >
                                <span
                                  className={`flex-shrink-0 transition-colors ${
                                    active || childActive
                                      ? 'text-gold' : 'text-white/20 group-hover/item:text-white/35'
                                  }`}
                                >
                                  {item.icon}
                                </span>
                                <span className="text-[11px] leading-tight flex-1">{item.label}</span>
                                {active && !hasChildren && (
                                  <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                                )}
                                {hasChildren && (
                                  <span className="text-white/20">
                                    {isSubOpen ? <ChevronDown size={9} /> : <ChevronRight size={9} />}
                                  </span>
                                )}
                              </button>
                              {hasChildren && isSubOpen && (
                                <div className="ml-6 mt-0.5 mb-1 border-l border-white/[.06] pl-2">
                                  {item.children!.map((child) => {
                                    const isChildActive = activeSection === child.id;
                                    return (
                                      <button
                                        key={child.id}
                                        onClick={() => onNavigate(child.id)}
                                        className={`w-full flex items-center gap-2 px-2.5 py-[5px] rounded-md text-left transition-all ${
                                          isChildActive
                                            ? 'bg-white/[.08] text-white'
                                            : 'text-white/35 hover:text-white/65 hover:bg-white/[.03]'
                                        }`}
                                      >
                                        <span
                                          className="w-[7px] h-[7px] rounded-full flex-shrink-0 border"
                                          style={{
                                            background: isChildActive ? child.color : 'transparent',
                                            borderColor: isChildActive ? child.color : 'rgba(255,255,255,.15)',
                                          }}
                                        />
                                        <span className="text-[10px] leading-tight">{child.label}</span>
                                        {isChildActive && (
                                          <span className="w-1 h-1 rounded-full bg-gold flex-shrink-0 ml-auto" />
                                        )}
                                      </button>
                                    );
                                  })}
                                </div>
                              )}
                            </>
                          );
                        })()}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Export */}
      <div className="px-4 py-4 border-t border-white/[.06]">
        <button
          onClick={onExport}
          className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-gold/10 border border-gold/20 text-gold text-[11px] font-medium hover:bg-gold/20 hover:border-gold/30 transition-all"
        >
          <Printer size={13} />
          Exporter / Imprimer
        </button>
      </div>
    </nav>
  );
};

export default Sidebar;
