import React, { useState } from 'react';
import CosmosLogo from './CosmosLogo';
import {
  Route, MapPin, Users, Eye, BarChart3, Calendar, Signpost,
  Car, ParkingSquare, DoorOpen, Sparkles, Store, UtensilsCrossed,
  Heart, Box, Printer, UserCircle, Briefcase, GraduationCap, Baby,
  ChevronDown, ChevronRight,
} from 'lucide-react';

interface SidebarParcoursProps {
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
    color: '#10B981',
    icon: <Route size={11} />,
    items: [
      { id: 'pc-cover', num: '—', label: 'Introduction', icon: <Route size={11} /> },
    ],
  },
  {
    group: 'M1 — Journey Map',
    color: '#059669',
    icon: <MapPin size={11} />,
    items: [
      { id: 'pc-journeymap', num: '1.0', label: 'Journey Map', icon: <MapPin size={11} /> },
      { id: 'pc-journeyflow', num: '1.1', label: 'Parcours visuel', icon: <Route size={11} /> },
      { id: 'pc-swimlane', num: '1.2', label: 'Swimlane · 10 couches', icon: <MapPin size={11} /> },
    ],
  },
  {
    group: 'M2 — Personas',
    color: '#3B82F6',
    icon: <Users size={11} />,
    items: [
      { id: 'pc-personas', num: '2.0', label: '4 Personas Cosmos', icon: <Users size={11} /> },
      { id: 'persona-famille', num: '2.1', label: 'Awa & Moussa', icon: <Baby size={11} /> },
      { id: 'persona-jeunePro', num: '2.2', label: 'Serge', icon: <Briefcase size={11} /> },
      { id: 'persona-executive', num: '2.3', label: 'Pamela', icon: <UserCircle size={11} /> },
      { id: 'persona-genZ', num: '2.4', label: 'Aminata', icon: <GraduationCap size={11} /> },
    ],
  },
  {
    group: 'M3 — Touchpoints',
    color: '#8B5CF6',
    icon: <Eye size={11} />,
    items: [
      { id: 'pc-touchpoints', num: '3.0', label: 'Matrice touchpoints', icon: <Eye size={11} /> },
    ],
  },
  {
    group: 'M4 — KPIs',
    color: '#F43F5E',
    icon: <BarChart3 size={11} />,
    items: [
      { id: 'pc-kpis', num: '4.0', label: 'Dashboard KPIs', icon: <BarChart3 size={11} /> },
    ],
  },
  {
    group: 'M5 — Plan d\'action',
    color: '#F59E0B',
    icon: <Calendar size={11} />,
    items: [
      { id: 'pc-actionplan', num: '5.0', label: 'Plan d\'action', icon: <Calendar size={11} /> },
    ],
  },
  {
    group: 'M6 — Signalétique',
    color: '#10B981',
    icon: <Signpost size={11} />,
    items: [
      { id: 'pc-signaletique', num: '6.0', label: 'Signalétique directionnelle', icon: <Signpost size={11} /> },
    ],
  },
  {
    group: 'Outils',
    color: '#C9943A',
    icon: <Box size={11} />,
    items: [
      { id: 'pc-plan3d', num: '—', label: 'Plan 3D Interactif', icon: <Box size={11} /> },
    ],
  },
];

const SidebarParcours: React.FC<SidebarParcoursProps> = ({ activeSection, onNavigate, onExport }) => {
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
          <div className="text-[8px] text-emerald-400/70 tracking-[.2em] uppercase text-center">
            Vol. 3 — Parcours Client
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
                            ? 'bg-emerald-500/[.12] text-white'
                            : 'text-white/45 hover:text-white/75 hover:bg-white/[.03]'
                        }`}
                      >
                        <span
                          className={`flex-shrink-0 transition-colors ${
                            active ? 'text-emerald-400' : 'text-white/55 group-hover/item:text-white/60'
                          }`}
                        >
                          {item.icon}
                        </span>
                        <span className="text-[11px] leading-tight flex-1">{item.label}</span>
                        {active && (
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
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
          className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-medium hover:bg-emerald-500/20 hover:border-emerald-500/30 transition-all"
        >
          <Printer size={13} />
          Exporter / Imprimer
        </button>
      </div>
    </nav>
  );
};

export default SidebarParcours;
