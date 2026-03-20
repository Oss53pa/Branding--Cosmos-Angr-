import React, { useState } from 'react';
import CosmosLogo from './CosmosLogo';
import {
  LayoutGrid, Target, AlertTriangle, Cpu, Layers, Eye, ShieldCheck,
  Route, Brain, Users, ClipboardCheck, Calendar, CheckCircle2,
  Printer, ChevronDown, ChevronRight, Box,
} from 'lucide-react';

interface SidebarPlanInteractifProps {
  activeSection: string;
  onNavigate: (id: string) => void;
  onExport?: () => void;
}

interface TocItem {
  id: string;
  num: string;
  label: string;
  icon: React.ReactNode;
}

interface TocSection {
  group: string;
  color: string;
  icon: React.ReactNode;
  items: TocItem[];
}

const tocData: TocSection[] = [
  {
    group: 'Identité & contexte',
    color: '#C9943A',
    icon: <LayoutGrid size={11} />,
    items: [
      { id: 's0', num: '§0', label: 'Fiche d\'identité', icon: <LayoutGrid size={11} /> },
      { id: 's1', num: '§1', label: 'Contexte & objectifs', icon: <Target size={11} /> },
      { id: 's2', num: '§2', label: 'Contraintes techniques', icon: <AlertTriangle size={11} /> },
      { id: 's3', num: '§3', label: 'Stack technique', icon: <Cpu size={11} /> },
    ],
  },
  {
    group: 'Modules fonctionnels',
    color: '#6366F1',
    icon: <Layers size={11} />,
    items: [
      { id: 's4', num: '§4', label: 'Ingestion AutoCAD', icon: <Layers size={11} /> },
      { id: 's5', num: '§5', label: 'Visualisation 2D/3D', icon: <Eye size={11} /> },
      { id: 's6', num: '§6', label: 'Plan Sécuritaire', icon: <ShieldCheck size={11} /> },
      { id: 's7', num: '§7', label: 'Parcours Client', icon: <Route size={11} /> },
      { id: 's8', num: '§8', label: 'Proph3t IA', icon: <Brain size={11} /> },
      { id: 's9', num: '§9', label: 'Collaboration & exports', icon: <Users size={11} /> },
    ],
  },
  {
    group: 'Exigences & planning',
    color: '#10B981',
    icon: <ClipboardCheck size={11} />,
    items: [
      { id: 's10', num: '§10', label: 'Exigences non fonctionnelles', icon: <ClipboardCheck size={11} /> },
      { id: 's11', num: '§11', label: 'Roadmap', icon: <Calendar size={11} /> },
      { id: 's12', num: '§12', label: 'Critères de recette', icon: <CheckCircle2 size={11} /> },
    ],
  },
  {
    group: 'Outils',
    color: '#F59E0B',
    icon: <Box size={11} />,
    items: [
      { id: 'pi-plan3d', num: '—', label: 'Plan 3D Interactif', icon: <Box size={11} /> },
    ],
  },
];

const SidebarPlanInteractif: React.FC<SidebarPlanInteractifProps> = ({ activeSection, onNavigate, onExport }) => {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const toggle = (group: string) => {
    setCollapsed((prev) => ({ ...prev, [group]: !prev[group] }));
  };

  const isGroupActive = (section: TocSection) =>
    section.items.some((item) => item.id === activeSection);

  return (
    <nav className="w-[272px] bg-[#0f0f1a] flex flex-col h-screen flex-shrink-0 select-none">
      {/* Logo */}
      <div className="px-5 pt-6 pb-5 border-b border-white/[.06]">
        <div className="flex flex-col gap-1.5">
          <CosmosLogo height={32} />
          <div className="text-[8px] text-purple-400/70 tracking-[.2em] uppercase text-center">
            CDC — Plan Interactif 3D
          </div>
        </div>
      </div>

      {/* TOC */}
      <div className="flex-1 overflow-y-auto py-3 px-2.5">
        {tocData.map((section) => {
          const isOpen = !collapsed[section.group];
          const isActive = isGroupActive(section);

          return (
            <div key={section.group} className="mb-1">
              <button
                onClick={() => toggle(section.group)}
                className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-left transition-all group ${
                  isActive ? 'bg-white/[.06]' : 'hover:bg-white/[.03]'
                }`}
              >
                <span
                  className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0"
                  style={{ background: `${section.color}20`, color: section.color }}
                >
                  {section.icon}
                </span>
                <span className={`text-[10px] font-semibold tracking-[.12em] uppercase flex-1 ${
                  isActive ? 'text-white' : 'text-white/65 group-hover:text-white/60'
                }`}>
                  {section.group}
                </span>
                <span className="text-white/55">
                  {isOpen ? <ChevronDown size={10} /> : <ChevronRight size={10} />}
                </span>
              </button>

              {isOpen && (
                <div className="ml-1 mt-0.5">
                  {section.items.map((item) => {
                    const active = activeSection === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => onNavigate(item.id)}
                        className={`w-full flex items-center gap-2.5 px-3 py-[6px] rounded-md text-left transition-all group/item ${
                          active
                            ? 'bg-purple-500/[.12] text-white'
                            : 'text-white/45 hover:text-white/75 hover:bg-white/[.03]'
                        }`}
                      >
                        <span
                          className={`flex-shrink-0 transition-colors ${
                            active ? 'text-purple-400' : 'text-white/55 group-hover/item:text-white/60'
                          }`}
                        >
                          {item.icon}
                        </span>
                        <span className="text-[11px] leading-tight flex-1">{item.label}</span>
                        {active && (
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0" />
                        )}
                      </button>
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
          className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[11px] font-medium hover:bg-purple-500/20 hover:border-purple-500/30 transition-all"
        >
          <Printer size={13} />
          Exporter / Imprimer
        </button>
      </div>
    </nav>
  );
};

export default SidebarPlanInteractif;
