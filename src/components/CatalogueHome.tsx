import React from 'react';
import CosmosLogo from './CosmosLogo';
import { Megaphone, ShieldCheck, Route, Box, ArrowRight, Layers } from 'lucide-react';

export type VolumeKey = 'marketing' | 'securite' | 'parcours';

interface VolumeCard {
  key: VolumeKey;
  num: string;
  title: string;
  subtitle: string;
  desc: string;
  icon: React.ReactNode;
  accent: string;
  gradient: string;
  stats: { n: string; l: string }[];
}

const volumes: VolumeCard[] = [
  {
    key: 'marketing',
    num: 'Vol. 1',
    title: 'Plan Marketing',
    subtitle: 'Stratégie · Brand Book · Focus Group · Plan 360°',
    desc: 'Positionnement de marque, identité visuelle, protocole Focus Group et plan marketing opérationnel pour le lancement Q4 2026.',
    icon: <Megaphone size={28} strokeWidth={1.5} />,
    accent: '#C9943A',
    gradient: 'from-[#1a1a2e] via-[#16213e] to-[#1a1a2e]',
    stats: [
      { n: '4', l: 'Étapes' },
      { n: '14', l: 'Livrables' },
      { n: '4', l: 'Scénarios' },
    ],
  },
  {
    key: 'securite',
    num: 'Vol. 2',
    title: 'Plan Sécuritaire',
    subtitle: 'Sûreté · Accès · Vidéosurveillance · Procédures',
    desc: "Dispositif de sécurité complet : contrôle d'accès, vidéoprotection, gestion des flux, procédures d'urgence et formation du personnel.",
    icon: <ShieldCheck size={28} strokeWidth={1.5} />,
    accent: '#3B82F6',
    gradient: 'from-[#0c1220] via-[#1a2744] to-[#0c1220]',
    stats: [
      { n: '5', l: 'Zones' },
      { n: '120+', l: 'Caméras' },
      { n: '24/7', l: 'Couverture' },
    ],
  },
  {
    key: 'parcours',
    num: 'Vol. 3',
    title: 'Parcours Client',
    subtitle: 'Expérience · Signalétique · Flux · Fidélisation',
    desc: "Conception de l'expérience visiteur de bout en bout : arrivée, navigation, shopping, restauration, et programme de fidélisation Cosmos Club.",
    icon: <Route size={28} strokeWidth={1.5} />,
    accent: '#10B981',
    gradient: 'from-[#0a1a14] via-[#153d2e] to-[#0a1a14]',
    stats: [
      { n: '7', l: 'Moments clés' },
      { n: '3', l: 'Niveaux' },
      { n: '∞', l: 'Expériences' },
    ],
  },
];

interface CatalogueHomeProps {
  onSelectVolume: (volume: VolumeKey) => void;
}

const CatalogueHome: React.FC<CatalogueHomeProps> = ({ onSelectVolume }) => (
  <div className="min-h-screen bg-navy flex flex-col">
    {/* Header */}
    <div className="flex flex-col items-center pt-16 pb-10 px-8 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_40%,rgba(201,148,58,.1)_0%,transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_80%,rgba(201,148,58,.04)_0%,transparent_50%)]" />
      <div className="absolute inset-0 opacity-[.02]" style={{
        backgroundImage: 'linear-gradient(rgba(201,148,58,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,148,58,1) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
      }} />

      {/* Corner decorations */}
      <div className="absolute top-8 left-8 w-20 h-20 border-t border-l border-gold/15 rounded-tl-lg" />
      <div className="absolute top-8 right-8 w-20 h-20 border-t border-r border-gold/15 rounded-tr-lg" />

      <div className="relative z-10 flex flex-col items-center">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-px bg-gradient-to-r from-transparent to-gold/40" />
          <span className="text-[9px] font-bold tracking-[.3em] uppercase text-gold/60">
            Catalogue de référence — 2026
          </span>
          <div className="w-12 h-px bg-gradient-to-l from-transparent to-gold/40" />
        </div>
        <CosmosLogo height={80} />
        <div className="text-[13px] text-white/30 mt-4 tracking-[.15em] font-light">
          Sélectionnez un volume pour commencer
        </div>
      </div>
    </div>

    {/* Separator */}
    <div className="flex items-center gap-4 px-16 mb-10">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      <div className="w-1.5 h-1.5 rotate-45 border border-gold/30" />
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
    </div>

    {/* Volume cards */}
    <div className="flex-1 px-8 sm:px-12 lg:px-20 pb-16">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-[1400px] mx-auto">
        {volumes.map((vol) => (
          <button
            key={vol.key}
            onClick={() => onSelectVolume(vol.key)}
            className="group text-left rounded-2xl overflow-hidden border border-white/[.08] hover:border-white/[.15] transition-all duration-500 hover:shadow-[0_8px_40px_rgba(0,0,0,.3)] hover:scale-[1.02]"
          >
            {/* Card header with gradient */}
            <div className={`relative bg-gradient-to-br ${vol.gradient} px-7 pt-7 pb-6 overflow-hidden`}>
              {/* Decorative glow */}
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-20" style={{ background: vol.accent, filter: 'blur(50px)' }} />
              <div className="absolute inset-0 opacity-[.04]" style={{
                backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                backgroundSize: '20px 20px',
              }} />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-5">
                  <span className="text-[9px] font-bold tracking-[.25em] uppercase px-3 py-1 rounded-full border" style={{ color: vol.accent, borderColor: `${vol.accent}40`, background: `${vol.accent}10` }}>
                    {vol.num}
                  </span>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `${vol.accent}15`, color: vol.accent }}>
                    {vol.icon}
                  </div>
                </div>
                <div className="font-cormorant text-[32px] font-light text-white leading-tight mb-2">
                  {vol.title}
                </div>
                <div className="text-[10px] tracking-[.08em] font-medium" style={{ color: `${vol.accent}90` }}>
                  {vol.subtitle}
                </div>
              </div>
            </div>

            {/* Card body */}
            <div className="bg-[#12121f] px-7 py-6">
              <div className="text-[12px] text-white/35 leading-relaxed mb-6">
                {vol.desc}
              </div>

              {/* Stats */}
              <div className="flex gap-6 mb-6">
                {vol.stats.map((s) => (
                  <div key={s.l} className="text-center">
                    <div className="font-cormorant text-[24px] font-light" style={{ color: vol.accent }}>
                      {s.n}
                    </div>
                    <div className="text-[8px] text-white/25 tracking-[.12em] uppercase font-medium">
                      {s.l}
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="flex items-center gap-2 text-[11px] font-medium group-hover:gap-3 transition-all" style={{ color: vol.accent }}>
                Ouvrir ce volume
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Palette matières */}
      <div className="mt-12 max-w-[1400px] mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center text-gold">
            <Layers size={16} strokeWidth={1.5} />
          </div>
          <div>
            <div className="text-[9px] font-bold tracking-[.25em] uppercase text-gold/50">Identité architecturale</div>
            <div className="font-cormorant text-[22px] font-light text-white/80 leading-tight">Palette matières définitive</div>
          </div>
          <div className="h-px flex-1 bg-gold/10" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Façade extérieure */}
          <div className="rounded-2xl overflow-hidden border border-white/[.06] bg-[#12121f] group hover:border-white/[.12] transition-all">
            <div className="h-24 relative" style={{ background: '#B8AA8C' }}>
              <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 8px, rgba(0,0,0,.08) 8px, rgba(0,0,0,.08) 9px)',
              }} />
              <div className="absolute bottom-2 right-2 text-[8px] font-mono font-bold px-1.5 py-0.5 rounded bg-black/30 text-white/80">#B8AA8C</div>
            </div>
            <div className="px-4 py-3">
              <div className="text-[11px] font-semibold text-white/70 mb-0.5">Façade extérieure</div>
              <div className="text-[9px] text-white/30 leading-relaxed">Aluminium nervuré mat</div>
              <div className="text-[9px] text-gold/50 mt-1 font-medium">Grège doré</div>
            </div>
          </div>

          {/* Têtes de mur — Kutu Baffle */}
          <div className="rounded-2xl overflow-hidden border border-white/[.06] bg-[#12121f] group hover:border-white/[.12] transition-all">
            <div className="h-24 relative" style={{ background: '#7A5C42' }}>
              <div className="absolute inset-0 opacity-15" style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,.12) 3px, rgba(0,0,0,.12) 4px)',
              }} />
              <div className="absolute bottom-2 right-2 text-[8px] font-mono font-bold px-1.5 py-0.5 rounded bg-black/30 text-white/80">#7A5C42</div>
            </div>
            <div className="px-4 py-3">
              <div className="text-[11px] font-semibold text-white/70 mb-0.5">Têtes de mur</div>
              <div className="text-[9px] text-white/30 leading-relaxed">Kutu Baffle noyer fumé</div>
              <div className="text-[9px] text-gold/50 mt-1 font-medium">Brun noyer</div>
            </div>
          </div>

          {/* Murs intérieurs — Terracotta */}
          <div className="rounded-2xl overflow-hidden border border-white/[.06] bg-[#12121f] group hover:border-white/[.12] transition-all">
            <div className="h-24 relative overflow-hidden">
              <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #C2724A 0%, #D4885C 50%, #B8643E 100%)' }} />
              <div className="absolute bottom-2 right-2 text-[8px] font-mono font-bold px-1.5 py-0.5 rounded bg-black/30 text-white/80">RAL 040</div>
            </div>
            <div className="px-4 py-3">
              <div className="text-[11px] font-semibold text-white/70 mb-0.5">Murs intérieurs</div>
              <div className="text-[9px] text-white/30 leading-relaxed">Teja + Ignero RAL 040</div>
              <div className="text-[9px] text-gold/50 mt-1 font-medium">Terracotta</div>
            </div>
          </div>

          {/* Sol — Terrazo */}
          <div className="rounded-2xl overflow-hidden border border-white/[.06] bg-[#12121f] group hover:border-white/[.12] transition-all">
            <div className="h-24 relative" style={{ background: '#D4C9B0' }}>
              {/* Terrazzo texture */}
              <div className="absolute inset-0 opacity-40" style={{
                backgroundImage: 'radial-gradient(circle 2px, rgba(255,255,255,.6) 0%, transparent 100%), radial-gradient(circle 1.5px, rgba(200,190,170,.5) 0%, transparent 100%), radial-gradient(circle 3px, rgba(240,235,220,.4) 0%, transparent 100%)',
                backgroundSize: '18px 18px, 12px 14px, 22px 20px',
                backgroundPosition: '0 0, 6px 8px, 14px 4px',
              }} />
              <div className="absolute bottom-2 right-2 text-[8px] font-mono font-bold px-1.5 py-0.5 rounded bg-black/30 text-white/80">#D4C9B0</div>
            </div>
            <div className="px-4 py-3">
              <div className="text-[11px] font-semibold text-white/70 mb-0.5">Sol</div>
              <div className="text-[9px] text-white/30 leading-relaxed">Terrazo granito beige</div>
              <div className="text-[9px] text-gold/50 mt-1 font-medium">Éclats lumineux</div>
            </div>
          </div>

          {/* Végétation */}
          <div className="rounded-2xl overflow-hidden border border-white/[.06] bg-[#12121f] group hover:border-white/[.12] transition-all">
            <div className="h-24 relative overflow-hidden">
              <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, #2D5A3D 0%, #3A7A4E 40%, #4A8C5A 70%, #2D5A3D 100%)' }} />
              {/* Leaf texture */}
              <svg className="absolute inset-0 w-full h-full opacity-15" viewBox="0 0 100 100">
                <path d="M20,80 Q30,40 50,30 Q45,55 20,80Z" fill="white" />
                <path d="M60,90 Q65,50 80,35 Q78,60 60,90Z" fill="white" />
                <path d="M40,70 Q48,45 65,40 Q58,55 40,70Z" fill="white" />
              </svg>
              <div className="absolute bottom-2 right-2 text-[8px] font-mono font-bold px-1.5 py-0.5 rounded bg-black/30 text-white/80">Naturel</div>
            </div>
            <div className="px-4 py-3">
              <div className="text-[11px] font-semibold text-white/70 mb-0.5">Végétation</div>
              <div className="text-[9px] text-white/30 leading-relaxed">Arbres tropicaux intégrés</div>
              <div className="text-[9px] text-gold/50 mt-1 font-medium">Verts naturels</div>
            </div>
          </div>
        </div>
      </div>

      {/* Plan 3D commun */}
      <div className="mt-10 max-w-[1400px] mx-auto">
        <button
          onClick={() => window.open('/plan-3d.html', '_blank')}
          className="w-full group flex items-center justify-between px-8 py-5 rounded-2xl border border-white/[.06] bg-white/[.02] hover:bg-white/[.05] hover:border-gold/20 transition-all"
        >
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center text-gold">
              <Box size={22} strokeWidth={1.5} />
            </div>
            <div className="text-left">
              <div className="text-[13px] font-medium text-white/80">Plan 3D Interactif</div>
              <div className="text-[10px] text-white/30 mt-0.5">Disponible dans chaque volume — Vue immersive du centre commercial</div>
            </div>
          </div>
          <ArrowRight size={16} className="text-gold/50 group-hover:text-gold group-hover:translate-x-1 transition-all" />
        </button>
      </div>
    </div>

    {/* Footer */}
    <div className="px-8 py-5 border-t border-white/[.04] flex items-center justify-center">
      <div className="flex items-center gap-2.5 px-5 py-2 rounded-full border border-gold/15 bg-gold/[.04]">
        <div className="w-1.5 h-1.5 rounded-full bg-gold/50 animate-pulse" />
        <span className="text-[9px] text-gold/50 tracking-[.12em] uppercase font-medium">
          Document confidentiel — EXCO / New Heaven SA / CRMC
        </span>
      </div>
    </div>
  </div>
);

export default CatalogueHome;
