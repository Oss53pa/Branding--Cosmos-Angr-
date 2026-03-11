import React, { useState, useEffect } from 'react';
import {
  Route, Car, ParkingSquare, DoorOpen, Sparkles, Store, UtensilsCrossed,
  Heart, MapPin, Accessibility, Baby, ArrowRight, Box, ChevronRight, Award
} from 'lucide-react';
import CosmosLogo from './CosmosLogo';

/* ─── Données ─── */

interface Moment {
  icon: React.ReactNode;
  label: string;
  title: string;
  desc: string;
  details: string[];
  verbatim: string;
}

const moments: Moment[] = [
  {
    icon: <Car size={20} strokeWidth={1.5} />,
    label: 'Arrivée',
    title: 'La première impression',
    desc: "Le contact avec Cosmos Angré commence avant même l'entrée. Signalétique directionnelle visible à 200m, totem lumineux identifiable depuis le boulevard.",
    details: [
      'Totem lumineux haute visibilité — identité gold/navy',
      'Signalétique directionnelle progressive (500m → 200m → entrée)',
      'Façade éclairée — effet premium dès l\'approche',
      'Voie dépose-minute devant l\'entrée principale',
    ],
    verbatim: 'On savait exactement où aller. Le bâtiment s\'impose naturellement.',
  },
  {
    icon: <ParkingSquare size={20} strokeWidth={1.5} />,
    label: 'Parking',
    title: 'Fluidité & sécurité',
    desc: 'Parking organisé par zones colorées, éclairage LED haute intensité, caméras sur chaque niveau. Le visiteur ne se sent jamais perdu.',
    details: [
      'Zones colorées A-B-C-D avec signalétique verticale',
      'Compteurs de places disponibles par niveau (LED vert/rouge)',
      'Éclairage LED haute intensité — pas de zones sombres',
      'Bornes d\'aide et interphones d\'urgence tous les 50m',
    ],
    verbatim: 'Le parking est propre, bien éclairé. On se sent en sécurité.',
  },
  {
    icon: <DoorOpen size={20} strokeWidth={1.5} />,
    label: 'Entrée',
    title: 'L\'effet seuil',
    desc: 'Transition architecturale marquée. Hauteur sous plafond, matériaux nobles, parfum signature. Le visiteur comprend qu\'il entre dans un univers différent.',
    details: [
      'Double hauteur sous plafond — effet cathédrale',
      'Matériaux : pierre naturelle, laiton brossé, bois noble',
      'Parfum signature Cosmos diffusé à l\'entrée',
      'Plan du centre interactif (écran tactile)',
    ],
    verbatim: 'Quand tu entres, tu sens que c\'est pas un mall normal. Ça respire la qualité.',
  },
  {
    icon: <Sparkles size={20} strokeWidth={1.5} />,
    label: 'Hall central',
    title: 'Le cœur de l\'expérience',
    desc: 'Le hall central est le point de convergence : puits de lumière naturelle, végétalisation, espace événementiel modulable.',
    details: [
      'Puits de lumière naturelle central (verrière 12m)',
      'Végétalisation tropicale — palmiers, ficus, plantes suspendues',
      'Espace événementiel central modulable (120m²)',
      'Écrans LED grand format — contenus rotatifs',
    ],
    verbatim: 'C\'est lumineux, c\'est vert, c\'est vivant. On a envie de rester.',
  },
  {
    icon: <Store size={20} strokeWidth={1.5} />,
    label: 'Shopping',
    title: 'Le parcours marchand',
    desc: 'Circulation intuitive en boucle. Zoning par univers (mode, beauté, tech, maison). Pas de cul-de-sac. Le visiteur découvre naturellement.',
    details: [
      'Circulation en boucle — pas de cul-de-sac',
      'Zoning par univers : Mode, Beauté, Tech, Maison, Services',
      'Vitrines standardisées premium — éclairage calibré',
      'Points de repos design tous les 60m (banquettes, plantes)',
    ],
    verbatim: 'Tu te laisses porter. Tu découvres des boutiques sans chercher.',
  },
  {
    icon: <UtensilsCrossed size={20} strokeWidth={1.5} />,
    label: 'Restauration',
    title: 'La pause qui prolonge',
    desc: 'Food court premium au dernier niveau avec terrasse. Mix de restauration rapide qualitative et restaurants assis. La vue sur la ville prolonge l\'expérience.',
    details: [
      'Food court premium — 12 enseignes (local + international)',
      'Terrasse rooftop avec vue panoramique',
      '2 restaurants assis (gastronomique + brasserie)',
      'Café lounge — espace coworking informel',
    ],
    verbatim: 'On est monté au food court et on y est resté 2h. La terrasse est incroyable.',
  },
  {
    icon: <Heart size={20} strokeWidth={1.5} />,
    label: 'Fidélisation',
    title: 'Le lien durable',
    desc: 'Programme Cosmos Club à 3 niveaux. Chaque visite accumule des points. Avantages exclusifs : parking prioritaire, accès lounge, événements privés.',
    details: [
      'Cosmos Club — 3 niveaux : Silver, Gold, Platinum',
      'App mobile : points, offres, réservation parking',
      'Avantages Platinum : parking prioritaire, lounge VIP, conciergerie',
      'Événements privés mensuels (ventes privées, avant-premières)',
    ],
    verbatim: 'Le programme fidélité donne vraiment envie de revenir. C\'est pas juste des points.',
  },
];

const serviceData = [
  { icon: <Accessibility size={18} />, label: 'Accessibilité PMR', desc: 'Ascenseurs, rampes, places PMR, toilettes adaptées à chaque niveau' },
  { icon: <Baby size={18} />, label: 'Espace famille', desc: 'Nurserie, espace enfants, poussettes de prêt, micro-ondes' },
  { icon: <MapPin size={18} />, label: 'Conciergerie', desc: 'Point info central, portage achats, service voiturier, consignes' },
  { icon: <Award size={18} />, label: 'Cosmos Club', desc: 'Lounge VIP, parking prioritaire, événements exclusifs, personal shopper' },
];

/* ─── Composant ─── */

const ParcoursClient: React.FC = () => {
  const [activeMoment, setActiveMoment] = useState(0);

  // Listen for sidebar moment selection
  useEffect(() => {
    const handler = (e: Event) => {
      const idx = (e as CustomEvent).detail;
      if (typeof idx === 'number' && idx >= 0 && idx < moments.length) {
        setActiveMoment(idx);
        const el = document.getElementById('pc-moment-detail');
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
              Volume 3
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
          <p className="text-[14px] text-white/35 leading-relaxed max-w-[560px]">
            De l'arrivée au parking jusqu'à la fidélisation — 7 moments clés qui définissent l'expérience Cosmos Angré.
          </p>
        </div>
      </div>
      <div className="h-[2px] bg-gradient-to-r from-emerald-500/60 via-emerald-400/20 to-transparent" />

      {/* Timeline barre horizontale */}
      <div id="pc-timeline" className="px-8 lg:px-[72px] py-10 border-b border-black/[.06]">
        <div className="relative flex items-center justify-between max-w-[900px] mx-auto">
          {/* Ligne de connexion */}
          <div className="absolute top-6 left-[7%] right-[7%] h-[2px] bg-emerald-500/15" />

          {moments.map((m, i) => (
            <button
              key={i}
              onClick={() => setActiveMoment(i)}
              className="relative flex flex-col items-center group transition-all"
              style={{ width: `${100 / moments.length}%` }}
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center z-10 transition-all ${
                  activeMoment === i
                    ? 'bg-emerald-600 shadow-lg shadow-emerald-500/20 scale-110'
                    : 'bg-[#153d2e] group-hover:bg-emerald-700'
                }`}
              >
                <span className="text-white">{m.icon}</span>
              </div>
              <div className={`text-[9px] font-medium mt-2.5 text-center transition-colors ${
                activeMoment === i ? 'text-emerald-700' : 'text-black/35 group-hover:text-black/55'
              }`}>
                {m.label}
              </div>
              <div className={`text-[8px] font-bold mt-0.5 ${
                activeMoment === i ? 'text-emerald-600' : 'text-black/20'
              }`}>
                {String(i + 1).padStart(2, '0')}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Moment detail */}
      <div id="pc-moment-detail" className="px-8 lg:px-[72px] py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-[1200px] mx-auto">
          {/* Left — description */}
          <div className="bg-white rounded-2xl border border-black/[.06] p-8 shadow-[0_2px_20px_rgba(0,0,0,.04)]">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                {moments[activeMoment].icon}
              </div>
              <div>
                <div className="text-[9px] font-bold tracking-[.2em] uppercase text-emerald-600">
                  Moment {String(activeMoment + 1).padStart(2, '0')} · {moments[activeMoment].label}
                </div>
                <div className="font-cormorant text-[28px] font-medium text-navy leading-tight">
                  {moments[activeMoment].title}
                </div>
              </div>
            </div>

            <p className="text-[13px] text-black/55 leading-relaxed mb-6">
              {moments[activeMoment].desc}
            </p>

            <div className="font-cormorant text-[15px] italic text-emerald-700/70 leading-relaxed p-4 bg-emerald-50/50 rounded-xl border border-emerald-200/30">
              "{moments[activeMoment].verbatim}"
            </div>
          </div>

          {/* Right — details checklist */}
          <div className="bg-white rounded-2xl border border-black/[.06] p-8 shadow-[0_2px_20px_rgba(0,0,0,.04)]">
            <div className="text-[9px] font-bold tracking-[.2em] uppercase text-emerald-600 mb-5">
              Dispositif & aménagements
            </div>
            <div className="space-y-4">
              {moments[activeMoment].details.map((d, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[10px] font-bold text-emerald-600">{i + 1}</span>
                  </div>
                  <div className="text-[12px] text-black/55 leading-relaxed pt-1">{d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Grille 7 moments — vue d'ensemble */}
      <div className="px-8 lg:px-[72px] py-12 border-t border-black/[.06]">
        <div className="flex items-center gap-3 mb-8">
          <div className="text-[9px] font-bold tracking-[.25em] uppercase text-emerald-600">Vue d'ensemble — 7 moments</div>
          <div className="h-px flex-1 bg-emerald-600/15" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {moments.slice(0, 4).map((m, i) => (
            <button
              key={i}
              onClick={() => setActiveMoment(i)}
              className="bg-white rounded-xl border border-black/[.06] p-5 text-left hover:shadow-md hover:border-emerald-200/40 transition-all group"
            >
              <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600 mb-3">
                {m.icon}
              </div>
              <div className="text-[8px] font-bold tracking-[.15em] uppercase text-emerald-600/60 mb-1">
                {String(i + 1).padStart(2, '0')} · {m.label}
              </div>
              <div className="font-cormorant text-[17px] font-medium text-navy leading-tight mb-2">{m.title}</div>
              <div className="text-[10px] text-black/35 leading-relaxed line-clamp-2">{m.desc}</div>
              <div className="flex items-center gap-1 mt-3 text-[9px] text-emerald-600/50 group-hover:text-emerald-600 transition-colors">
                Détails <ChevronRight size={10} />
              </div>
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {moments.slice(4).map((m, i) => (
            <button
              key={i + 4}
              onClick={() => setActiveMoment(i + 4)}
              className="bg-white rounded-xl border border-black/[.06] p-5 text-left hover:shadow-md hover:border-emerald-200/40 transition-all group"
            >
              <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600 mb-3">
                {m.icon}
              </div>
              <div className="text-[8px] font-bold tracking-[.15em] uppercase text-emerald-600/60 mb-1">
                {String(i + 5).padStart(2, '0')} · {m.label}
              </div>
              <div className="font-cormorant text-[17px] font-medium text-navy leading-tight mb-2">{m.title}</div>
              <div className="text-[10px] text-black/35 leading-relaxed line-clamp-2">{m.desc}</div>
              <div className="flex items-center gap-1 mt-3 text-[9px] text-emerald-600/50 group-hover:text-emerald-600 transition-colors">
                Détails <ChevronRight size={10} />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Services complémentaires */}
      <div id="pc-services" className="px-8 lg:px-[72px] py-12 border-t border-black/[.06]">
        <div className="flex items-center gap-3 mb-8">
          <div className="text-[9px] font-bold tracking-[.25em] uppercase text-emerald-600">Services & confort</div>
          <div className="h-px flex-1 bg-emerald-600/15" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {serviceData.map((s) => (
            <div key={s.label} className="bg-white rounded-xl border border-black/[.06] p-6 text-center shadow-[0_2px_12px_rgba(0,0,0,.03)]">
              <div className="w-11 h-11 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600 mx-auto mb-3">
                {s.icon}
              </div>
              <div className="text-[12px] font-semibold text-navy mb-1.5">{s.label}</div>
              <div className="text-[11px] text-black/40 leading-relaxed">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>

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
        Parcours Client · Cosmos Angré · Mars 2026 · Document EXCO confidentiel — New Heaven SA / RCP
      </div>
    </div>
  );
};

export default ParcoursClient;
