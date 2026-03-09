import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { EditProvider } from './components/EditContext';
import EditToggle from './components/EditToggle';
import ExportDialog from './components/ExportDialog';
import Sidebar from './components/Sidebar';
import Cover from './components/Cover';
import PlanOverview from './components/PlanOverview';
import Decisions from './components/Decisions';
import Calendrier from './components/Calendrier';
import SectionHeader from './components/SectionHeader';
import Scenarios from './components/Scenarios';
import { scenarioData } from './components/Scenarios';
import type { ScenarioKey } from './components/Scenarios';
import Comparatif from './components/Comparatif';
import DirectionsArtistiques from './components/DirectionsArtistiques';
import Protocole from './components/Protocole';
import Recrutement from './components/Recrutement';
import Grille from './components/Grille';
import Plan360 from './components/Plan360';
import PlateformeMarque from './components/PlateformeMarque';
import PrismeKapferer from './components/PrismeKapferer';
import ScenarioMasterBook from './components/ScenarioMasterBook';

type PageView = 'main' | 'scenario-A' | 'scenario-B' | 'scenario-C' | 'scenario-D';

const sectionIds = [
  'cover', 'plan', 'decisions', 'calendrier',
  'etape1', 'plateforme', 'kapferer', 'scenarios', 'sc-A', 'sc-B', 'sc-C', 'sc-D', 'comparatif',
  'etape2', 'da',
  'etape3', 'protocole', 'recrutement', 'grille',
  'etape4', 'plan360',
];

const scenarioTabs: { key: ScenarioKey; pageView: PageView; shortLabel: string; accent: string }[] = [
  { key: 'A', pageView: 'scenario-A', shortLabel: 'Scénario A', accent: '#4A7558' },
  { key: 'B', pageView: 'scenario-B', shortLabel: 'Scénario B', accent: '#0D1B4B' },
  { key: 'C', pageView: 'scenario-C', shortLabel: 'Scénario C', accent: '#C9943A' },
  { key: 'D', pageView: 'scenario-D', shortLabel: 'Scénario D', accent: '#898D5D' },
];

function App() {
  const [activeSection, setActiveSection] = useState('cover');
  const [currentPage, setCurrentPage] = useState<PageView>('main');
  const [exportOpen, setExportOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  const handleNavigate = useCallback((id: string) => {
    // If on a scenario page, return to main first
    if (currentPage !== 'main') {
      setCurrentPage('main');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          setActiveSection(id);
        }
      }, 50);
      return;
    }

    // Plan 3D — ouvre le fichier HTML standalone
    if (id === 'plan3d') {
      window.open('/plan-3d.html', '_blank');
      return;
    }

    if (id.startsWith('da-')) {
      const dirKey = id.replace('da-', '');
      const el = document.getElementById('da');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.dispatchEvent(new CustomEvent('switch-direction', { detail: dirKey }));
        setActiveSection(id);
      }
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(id);
    }
  }, [currentPage]);

  useEffect(() => {
    if (currentPage !== 'main') return;
    const main = mainRef.current;
    if (!main) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      { root: main, threshold: 0.3 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [currentPage]);

  return (
    <EditProvider>
    <div className="flex h-screen overflow-hidden">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
      {/* Sidebar — hidden on mobile, shown via toggle */}
      <div className={`fixed inset-y-0 left-0 z-50 lg:relative lg:z-auto transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <Sidebar activeSection={activeSection} onNavigate={(id) => { handleNavigate(id); setSidebarOpen(false); }} onExport={() => setExportOpen(true)} />
      </div>
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* === NAVBAR SCENARIOS === */}
        <nav className="flex-shrink-0 bg-[#0f0f1a] border-b border-white/[.08] px-3 sm:px-6">
          <div className="flex items-center h-11 gap-1 overflow-x-auto scrollbar-hide">
            {/* Mobile menu button */}
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-1.5 mr-2 text-white/60 hover:text-white flex-shrink-0 transition-colors">
              {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
            <button
              onClick={() => {
                setCurrentPage('main');
                if (mainRef.current) mainRef.current.scrollTop = 0;
              }}
              className={`flex items-center gap-2 px-4 h-full text-[11px] font-medium tracking-wide border-b-2 transition-all ${
                currentPage === 'main'
                  ? 'border-gold text-white'
                  : 'border-transparent text-white/40 hover:text-white/70'
              }`}
            >
              {currentPage !== 'main' && <span className="text-white/30">←</span>}
              Catalogue
            </button>

            <div className="w-px h-5 bg-white/[.1] mx-2" />

            {scenarioTabs.map((tab) => {
              const isActive = currentPage === tab.pageView;
              return (
                <button
                  key={tab.key}
                  onClick={() => setCurrentPage(tab.pageView)}
                  className={`flex items-center gap-2.5 px-4 h-full text-[11px] font-medium tracking-wide border-b-2 transition-all ${
                    isActive
                      ? 'text-white'
                      : 'border-transparent text-white/40 hover:text-white/70'
                  }`}
                  style={{ borderColor: isActive ? tab.accent : 'transparent' }}
                >
                  <span
                    className={`w-2 h-2 rounded-full flex-shrink-0 transition-opacity ${
                      isActive ? 'opacity-100' : 'opacity-40'
                    }`}
                    style={{ background: tab.accent }}
                  />
                  {tab.shortLabel}
                </button>
              );
            })}
          </div>
        </nav>

        {/* === CONTENU === */}
        {currentPage === 'main' ? (
          <div ref={mainRef} id="main" className="flex-1 overflow-y-auto">
            <Cover />
            <PlanOverview />
            <Decisions />
            <Calendrier />

            <SectionHeader
              id="etape1"
              eyebrow="Étape 1"
              title="Stratégie & Plateforme de marque"
              desc="3 scénarios de positionnement complets — chacun autonome, cohérent et testable au Focus Group."
            />
            <PlateformeMarque />
            <PrismeKapferer />
            <Scenarios />
            <Comparatif />

            <SectionHeader
              id="etape2"
              eyebrow="Étape 2"
              title="Brand Book draft"
              desc="3 pistes créatives visuelles et verbales — brief opérationnel pour Fernand (designer intégré)."
            />
            <DirectionsArtistiques />

            <SectionHeader
              id="etape3"
              eyebrow="Étape 3"
              title="Focus Group"
              desc="Protocole complet, opérationnalisé — prêt à briefer une agence de terrain pour les sessions 20-25 mars 2026."
            />
            <Protocole />
            <Recrutement />
            <Grille />

            <SectionHeader
              id="etape4"
              eyebrow="Étape 4"
              title="Plan Marketing"
              desc="Plan marketing opérationnel post-Focus Group — budget, actions 360°, digital, calendrier éditorial."
            />
            <Plan360 />
          </div>
        ) : (
          <ScenarioMasterBook
            scenarioKey={currentPage.replace('scenario-', '') as ScenarioKey}
            onBack={() => setCurrentPage('main')}
          />
        )}
      </div>
      <EditToggle />
      <ExportDialog open={exportOpen} onClose={() => setExportOpen(false)} />
    </div>
    </EditProvider>
  );
}

export default App;
