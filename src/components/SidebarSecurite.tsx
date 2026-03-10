import React, { useState } from 'react';
import CosmosLogo from './CosmosLogo';
import {
  ShieldCheck, Eye, Lock, Camera, Siren, ClipboardList,
  Users, Box, Printer,
  ChevronDown, ChevronRight
} from 'lucide-react';

interface SidebarSecuriteProps {
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
    group: 'Vue d\'ensemble',
    color: '#3B82F6',
    icon: <ShieldCheck size={11} />,
    items: [
      { id: 'sec-cover', num: '—', label: 'Introduction', icon: <ShieldCheck size={11} /> },
      { id: 'sec-kpi', num: '—', label: 'KPIs sécurité', icon: <Eye size={11} /> },
    ],
  },
  {
    group: 'Dispositif par zone',
    color: '#6366F1',
    icon: <Lock size={11} />,
    items: [
      { id: 'perimetrique', num: '2.1', label: 'Périmétrique', icon: <Eye size={11} /> },
      { id: 'acces', num: '2.2', label: 'Contrôle d\'accès', icon: <Lock size={11} /> },
      { id: 'videosurveillance', num: '2.3', label: 'Vidéosurveillance', icon: <Camera size={11} /> },
      { id: 'incendie', num: '2.4', label: 'Sécurité incendie', icon: <Siren size={11} /> },
      { id: 'procedures', num: '2.5', label: 'Procédures & formation', icon: <ClipboardList size={11} /> },
    ],
  },
  {
    group: 'Organisation',
    color: '#0EA5E9',
    icon: <Users size={11} />,
    items: [
      { id: 'sec-orga', num: '2.6', label: 'Organigramme', icon: <Users size={11} /> },
    ],
  },
  {
    group: 'Outils',
    color: '#F59E0B',
    icon: <Box size={11} />,
    items: [
      { id: 'sec-plan3d', num: '—', label: 'Plan 3D Interactif', icon: <Box size={11} /> },
    ],
  },
];

const SidebarSecurite: React.FC<SidebarSecuriteProps> = ({ activeSection, onNavigate, onExport }) => {
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
          <div className="text-[8px] text-blue-400/70 tracking-[.2em] uppercase text-center">
            Vol. 2 — Plan Sécuritaire
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
                  isActive ? 'text-white' : 'text-white/40 group-hover:text-white/60'
                }`}>
                  {section.group}
                </span>
                <span className="text-white/20">
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
                            ? 'bg-blue-500/[.12] text-white'
                            : 'text-white/45 hover:text-white/75 hover:bg-white/[.03]'
                        }`}
                      >
                        <span
                          className={`flex-shrink-0 transition-colors ${
                            active ? 'text-blue-400' : 'text-white/20 group-hover/item:text-white/35'
                          }`}
                        >
                          {item.icon}
                        </span>
                        <span className="text-[11px] leading-tight flex-1">{item.label}</span>
                        {active && (
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
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
          className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[11px] font-medium hover:bg-blue-500/20 hover:border-blue-500/30 transition-all"
        >
          <Printer size={13} />
          Exporter / Imprimer
        </button>
      </div>
    </nav>
  );
};

export default SidebarSecurite;
