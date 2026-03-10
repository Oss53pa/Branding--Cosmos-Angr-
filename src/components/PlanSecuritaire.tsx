import React from 'react';
import {
  ShieldCheck, Camera, DoorOpen, Users, AlertTriangle, Radio,
  Lock, Eye, Siren, ClipboardList, ArrowRight, Box
} from 'lucide-react';
import CosmosLogo from './CosmosLogo';

/* ─── Données ─── */

interface Zone {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: string;
  desc: string;
  items: string[];
}

const zones: Zone[] = [
  {
    id: 'perimetrique',
    label: 'Périmétrique',
    icon: <Eye size={20} strokeWidth={1.5} />,
    color: '#3B82F6',
    desc: "Surveillance du périmètre extérieur : parking, voies d'accès, façades.",
    items: [
      'Caméras PTZ haute définition sur mâts (parking)',
      'Détection périmétrique par analyse vidéo IA',
      'Éclairage dissuasif automatique (détection mouvement)',
      'Barrières levantes contrôlées (entrées véhicules)',
      'Rondes véhiculées — circuit GPS tracé',
    ],
  },
  {
    id: 'acces',
    label: 'Contrôle d\'accès',
    icon: <Lock size={20} strokeWidth={1.5} />,
    color: '#6366F1',
    desc: 'Gestion des flux entrants et sortants — visiteurs, personnel, livraisons.',
    items: [
      'Portiques compteurs de flux (entrées principales)',
      'Badges RFID personnel + biométrie zones sensibles',
      'SAS livraisons avec vérification identité',
      'Interphones vidéo sur accès techniques',
      'Registre numérique visiteurs (tablette accueil)',
    ],
  },
  {
    id: 'videosurveillance',
    label: 'Vidéosurveillance',
    icon: <Camera size={20} strokeWidth={1.5} />,
    color: '#0EA5E9',
    desc: 'Réseau de caméras intelligent couvrant 100% des espaces communs.',
    items: [
      '120+ caméras IP (dômes intérieurs, bullet extérieurs)',
      'Analyse vidéo IA : détection intrusion, abandon colis, attroupement',
      'PC sécurité central — mur d\'écrans 24/7',
      'Stockage 30 jours conforme RGPD',
      'Accès distant sécurisé (direction, forces de l\'ordre)',
    ],
  },
  {
    id: 'incendie',
    label: 'Sécurité incendie',
    icon: <Siren size={20} strokeWidth={1.5} />,
    color: '#EF4444',
    desc: 'Système de sécurité incendie (SSI) conforme aux normes ERP catégorie 1.',
    items: [
      'SSI catégorie A — détection automatique intégrale',
      'Désenfumage mécanique (mall, parking, food court)',
      'Sprinklers zones à risque + RIA tous les 30m',
      'Issues de secours balisées (BAES + blocs autonomes)',
      'Exercices d\'évacuation trimestriels',
    ],
  },
  {
    id: 'procedures',
    label: 'Procédures & formation',
    icon: <ClipboardList size={20} strokeWidth={1.5} />,
    color: '#F59E0B',
    desc: 'Protocoles opérationnels et programme de formation continue.',
    items: [
      'Plan d\'Opération Interne (POI) validé préfecture',
      'Procédures : alerte intrusion, colis suspect, évacuation, inondation',
      'Formation SSIAP 1-2-3 agents de sécurité',
      'Sensibilisation commerçants (kit sécurité, contacts d\'urgence)',
      'Audit de sûreté semestriel (prestataire externe)',
    ],
  },
];

const kpiData = [
  { n: '120+', label: 'Caméras', icon: <Camera size={16} /> },
  { n: '24/7', label: 'PC Sécurité', icon: <Eye size={16} /> },
  { n: '5', label: 'Zones', icon: <ShieldCheck size={16} /> },
  { n: '<3min', label: 'Intervention', icon: <Radio size={16} /> },
];

/* ─── Composant ─── */

const PlanSecuritaire: React.FC = () => (
  <div className="bg-cream min-h-screen">
    {/* Hero cover */}
    <div className="relative bg-gradient-to-br from-[#0c1220] via-[#1a2744] to-[#0c1220] px-8 lg:px-[72px] py-20 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,rgba(59,130,246,.1)_0%,transparent_60%)]" />
      <div className="absolute inset-0 opacity-[.03]" style={{
        backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }} />

      {/* Corner accents */}
      <div className="absolute top-6 left-[72px] w-16 h-16 border-t border-l border-blue-400/15" />
      <div className="absolute bottom-6 right-[72px] w-16 h-16 border-b border-r border-blue-400/15" />

      <div className="relative z-10 max-w-[800px]">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-px bg-blue-400/60" />
          <span className="text-[10px] font-bold tracking-[.25em] uppercase text-blue-400/70">
            Volume 2
          </span>
        </div>
        <div className="flex items-center gap-5 mb-4">
          <div className="w-14 h-14 rounded-2xl bg-blue-500/15 flex items-center justify-center text-blue-400">
            <ShieldCheck size={28} strokeWidth={1.5} />
          </div>
          <h1 className="font-cormorant text-[48px] font-light text-white leading-tight">
            Plan Sécuritaire
          </h1>
        </div>
        <p className="text-[14px] text-white/35 leading-relaxed max-w-[560px]">
          Dispositif de sûreté et sécurité incendie — contrôle d'accès, vidéoprotection, procédures d'urgence et formation.
        </p>
      </div>
    </div>
    <div className="h-[2px] bg-gradient-to-r from-blue-500/60 via-blue-400/20 to-transparent" />

    {/* KPI bar */}
    <div className="px-8 lg:px-[72px] py-8 border-b border-black/[.06]">
      <div className="flex gap-10 flex-wrap">
        {kpiData.map((kpi) => (
          <div key={kpi.label} className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600">
              {kpi.icon}
            </div>
            <div>
              <div className="font-cormorant text-[28px] font-light text-navy leading-none">{kpi.n}</div>
              <div className="text-[9px] text-black/35 tracking-[.12em] uppercase font-medium">{kpi.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Zones */}
    <div className="px-8 lg:px-[72px] py-12">
      <div className="flex items-center gap-3 mb-8">
        <div className="text-[9px] font-bold tracking-[.25em] uppercase text-blue-600">Dispositif par zone</div>
        <div className="h-px flex-1 bg-blue-600/15" />
      </div>

      <div className="space-y-6">
        {zones.map((zone, idx) => (
          <div key={zone.id} className="bg-white rounded-2xl border border-black/[.06] overflow-hidden shadow-[0_2px_20px_rgba(0,0,0,.04)] hover:shadow-md transition-shadow">
            <div className="flex items-start gap-0">
              {/* Left accent */}
              <div className="w-1.5 self-stretch rounded-l-2xl" style={{ background: zone.color }} />

              <div className="flex-1 p-7">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: `${zone.color}12`, color: zone.color }}>
                    {zone.icon}
                  </div>
                  <div>
                    <div className="text-[9px] font-bold tracking-[.2em] uppercase mb-0.5" style={{ color: zone.color }}>
                      Zone {String(idx + 1).padStart(2, '0')}
                    </div>
                    <div className="font-cormorant text-[24px] font-medium text-navy leading-tight">{zone.label}</div>
                  </div>
                </div>

                <p className="text-[13px] text-black/50 leading-relaxed mb-5">{zone.desc}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {zone.items.map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-[11px] text-black/55 leading-relaxed">
                      <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: zone.color }} />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Organigramme sécurité */}
    <div className="px-8 lg:px-[72px] py-12 border-t border-black/[.06]">
      <div className="flex items-center gap-3 mb-8">
        <div className="text-[9px] font-bold tracking-[.25em] uppercase text-blue-600">Organisation</div>
        <div className="h-px flex-1 bg-blue-600/15" />
      </div>

      <div className="bg-white rounded-2xl border border-black/[.06] p-8 shadow-[0_2px_20px_rgba(0,0,0,.04)]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { role: 'Directeur Sûreté', team: '1 personne', scope: 'Pilotage global, audits, relation préfecture', icon: <ShieldCheck size={18} /> },
            { role: 'Chef de poste', team: '2 chefs (jour/nuit)', scope: 'Coordination équipes, gestion PC sécurité', icon: <Radio size={18} /> },
            { role: 'Agents de sécurité', team: '12 agents SSIAP', scope: 'Rondes, contrôle accès, intervention', icon: <Users size={18} /> },
            { role: 'Maintenance SSI', team: 'Prestataire externe', scope: 'Vérification trimestrielle, conformité ERP', icon: <AlertTriangle size={18} /> },
          ].map((item) => (
            <div key={item.role} className="text-center p-5 rounded-xl border border-black/[.04] hover:border-blue-200/40 transition-colors">
              <div className="w-11 h-11 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-600 mx-auto mb-3">
                {item.icon}
              </div>
              <div className="text-[13px] font-semibold text-navy mb-1">{item.role}</div>
              <div className="text-[10px] font-medium text-blue-600/70 mb-2">{item.team}</div>
              <div className="text-[11px] text-black/40 leading-relaxed">{item.scope}</div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Plan 3D link */}
    <div className="px-8 lg:px-[72px] py-8 border-t border-black/[.06]">
      <button
        onClick={() => window.open('/plan-3d.html', '_blank')}
        className="w-full group flex items-center justify-between px-7 py-5 rounded-2xl border border-blue-200/30 bg-blue-50/50 hover:bg-blue-50 hover:border-blue-300/40 transition-all"
      >
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600">
            <Box size={20} strokeWidth={1.5} />
          </div>
          <div className="text-left">
            <div className="text-[13px] font-medium text-navy">Plan 3D Interactif — Dispositif sécuritaire</div>
            <div className="text-[10px] text-black/35 mt-0.5">Visualiser les emplacements caméras, accès et postes de contrôle</div>
          </div>
        </div>
        <ArrowRight size={16} className="text-blue-400 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>

    {/* Footer */}
    <div className="py-8 text-center text-[8px] text-black/15">
      Plan Sécuritaire · Cosmos Angré · Mars 2026 · Document EXCO confidentiel — New Heaven SA / CRMC
    </div>
  </div>
);

export default PlanSecuritaire;
