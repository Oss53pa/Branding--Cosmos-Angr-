import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Menu, X, ArrowLeft, Home } from 'lucide-react';
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
import CatalogueHome from './components/CatalogueHome';
import type { VolumeKey } from './components/CatalogueHome';
import PlanSecuritaire from './components/PlanSecuritaire';
import ParcoursClient from './components/ParcoursClient';

type PageView = 'home' | 'marketing' | 'securite' | 'parcours' | 'scenario-A' | 'scenario-B' | 'scenario-C' | 'scenario-D';

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

const volumeLabels: Record<string, { label: string; accent: string }> = {
  marketing: { label: 'Vol. 1 — Marketing', accent: '#C9943A' },
  securite: { label: 'Vol. 2 — Sécurité', accent: '#3B82F6' },
  parcours: { label: 'Vol. 3 — Parcours', accent: '#10B981' },
};

function App() {
  const getInitialPage = (): PageView => {
    const hash = window.location.hash.replace('#', '');
    if (['scenario-A', 'scenario-B', 'scenario-C', 'scenario-D'].includes(hash)) return hash as PageView;
    if (['marketing', 'securite', 'parcours'].includes(hash)) return hash as PageView;
    return 'home';
  };

  const [activeSection, setActiveSection] = useState('cover');
  const [currentPage, setCurrentPage] = useState<PageView>(getInitialPage);
  const [exportOpen, setExportOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  const isHome = currentPage === 'home';
  const isMarketing = currentPage === 'marketing';
  const isScenario = currentPage.startsWith('scenario-');
  const isVolume = ['marketing', 'securite', 'parcours'].includes(currentPage);

  // Sync hash
  useEffect(() => {
    if (currentPage === 'home') {
      if (window.location.hash) window.history.replaceState(null, '', window.location.pathname);
    } else {
      window.location.hash = currentPage;
    }
  }, [currentPage]);

  useEffect(() => {
    const onHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (['scenario-A', 'scenario-B', 'scenario-C', 'scenario-D'].includes(hash)) {
        setCurrentPage(hash as PageView);
      } else if (['marketing', 'securite', 'parcours'].includes(hash)) {
        setCurrentPage(hash as PageView);
      } else {
        setCurrentPage('home');
      }
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const handleNavigate = useCallback((id: string) => {
    if (currentPage !== 'marketing') {
      setCurrentPage('marketing');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          setActiveSection(id);
        }
      }, 50);
      return;
    }

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

  // IntersectionObserver for marketing scroll tracking
  useEffect(() => {
    if (currentPage !== 'marketing') return;
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

  // ── HOME ──
  if (isHome) {
    return (
      <EditProvider>
        <CatalogueHome onSelectVolume={(vol: VolumeKey) => setCurrentPage(vol)} />
      </EditProvider>
    );
  }

  // ── VOLUME VIEWS (with sidebar for marketing, without for others) ──
  return (
    <EditProvider>
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar — only for marketing volume */}
      {isMarketing && (
        <>
          {sidebarOpen && (
            <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
          )}
          <div className={`fixed inset-y-0 left-0 z-50 lg:relative lg:z-auto transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
            <Sidebar activeSection={activeSection} onNavigate={(id) => { handleNavigate(id); setSidebarOpen(false); }} onExport={() => setExportOpen(true)} />
          </div>
        </>
      )}

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* === TOP NAVBAR === */}
        <nav className="flex-shrink-0 bg-[#0f0f1a] border-b border-white/[.08] px-3 sm:px-6">
          <div className="flex items-center h-11 gap-1 overflow-x-auto scrollbar-hide">
            {/* Mobile menu button — marketing only */}
            {isMarketing && (
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-1.5 mr-2 text-white/60 hover:text-white flex-shrink-0 transition-colors">
                {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            )}

            {/* Home button */}
            <button
              onClick={() => setCurrentPage('home')}
              className="flex items-center gap-2 px-3 h-full text-[11px] font-medium tracking-wide border-b-2 border-transparent text-white/40 hover:text-white/70 transition-all"
            >
              <Home size={14} />
              Accueil
            </button>

            <div className="w-px h-5 bg-white/[.1] mx-1" />

            {/* Volume tabs */}
            {(['marketing', 'securite', 'parcours'] as const).map((vol) => {
              const v = volumeLabels[vol];
              const isActive = currentPage === vol || (vol === 'marketing' && isScenario);
              return (
                <button
                  key={vol}
                  onClick={() => setCurrentPage(vol)}
                  className={`flex items-center gap-2.5 px-4 h-full text-[11px] font-medium tracking-wide border-b-2 transition-all whitespace-nowrap ${
                    isActive
                      ? 'text-white'
                      : 'border-transparent text-white/40 hover:text-white/70'
                  }`}
                  style={{ borderColor: isActive ? v.accent : 'transparent' }}
                >
                  <span
                    className={`w-2 h-2 rounded-full flex-shrink-0 transition-opacity ${
                      isActive ? 'opacity-100' : 'opacity-40'
                    }`}
                    style={{ background: v.accent }}
                  />
                  {v.label}
                </button>
              );
            })}

            {/* Scenario sub-tabs — only when in marketing or scenario view */}
            {(isMarketing || isScenario) && (
              <>
                <div className="w-px h-5 bg-white/[.1] mx-1" />
                {scenarioTabs.map((tab) => {
                  const tabActive = currentPage === tab.pageView;
                  return (
                    <button
                      key={tab.key}
                      onClick={() => setCurrentPage(tab.pageView)}
                      className={`flex items-center gap-2 px-3 h-full text-[10px] font-medium tracking-wide border-b-2 transition-all whitespace-nowrap ${
                        tabActive
                          ? 'text-white'
                          : 'border-transparent text-white/35 hover:text-white/60'
                      }`}
                      style={{ borderColor: tabActive ? tab.accent : 'transparent' }}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full flex-shrink-0 transition-opacity ${
                          tabActive ? 'opacity-100' : 'opacity-30'
                        }`}
                        style={{ background: tab.accent }}
                      />
                      {tab.shortLabel}
                    </button>
                  );
                })}
              </>
            )}
          </div>
        </nav>

        {/* === CONTENU === */}
        {isMarketing ? (
          <div ref={mainRef} id="main" className="flex-1 overflow-y-auto">
            <Cover />
            <PlanOverview />
            <Decisions />
            <Calendrier />

            <SectionHeader
              id="etape1"
              eyebrow="Étape 1"
              title="Stratégie & Plateforme de marque"
              desc="4 scénarios de positionnement complets — chacun autonome, cohérent et testable au Focus Group."
            />
            <PlateformeMarque />
            <PrismeKapferer />
            <Scenarios />
            <Comparatif />

            <SectionHeader
              id="etape2"
              eyebrow="Étape 2"
              title="Brand Book draft"
              desc="4 pistes créatives visuelles et verbales — brief opérationnel pour Fernand (designer intégré)."
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
        ) : isScenario ? (
          <ScenarioMasterBook
            scenarioKey={currentPage.replace('scenario-', '') as ScenarioKey}
            onBack={() => setCurrentPage('marketing')}
          />
        ) : currentPage === 'securite' ? (
          <div className="flex-1 overflow-y-auto">
            <PlanSecuritaire />
          </div>
        ) : currentPage === 'parcours' ? (
          <div className="flex-1 overflow-y-auto">
            <ParcoursClient />
          </div>
        ) : null}
      </div>
      <EditToggle />
      <ExportDialog open={exportOpen} onClose={() => setExportOpen(false)} />
    </div>
    </EditProvider>
  );
}

export default App;
