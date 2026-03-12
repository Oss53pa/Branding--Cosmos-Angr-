import React from 'react';
import { Calendar, Users, ArrowRight } from 'lucide-react';

const gates = [
  { id: 'G1', title: 'Validation positionnement', instance: 'COPIL', date: 'Avril 2026', livrable: 'Plateforme de marque validée', color: '#C9943A' },
  { id: 'G2', title: 'Go/No-Go Focus Group', instance: 'EXCO', date: 'Mai 2026', livrable: 'Protocole + budget terrain approuvé', color: '#4A7558' },
  { id: 'G3', title: 'Résultats FG & Pivot', instance: 'COPIL', date: 'Juillet 2026', livrable: 'Rapport FG + recommandation finale', color: '#C9943A' },
  { id: 'G4', title: 'Validation Brand Book final', instance: 'EXCO', date: 'Septembre 2026', livrable: 'Brand Book V3 définitif', color: '#4A7558' },
  { id: 'G5', title: 'Lancement Phase 1', instance: 'COPIL', date: 'Octobre 2026', livrable: 'Plan opérationnel 6 mois', color: '#C9943A' },
  { id: 'G6', title: 'Revue mi-parcours', instance: 'COPIL', date: 'Janvier 2027', livrable: 'Dashboard KPIs + arbitrages budget', color: '#C9943A' },
  { id: 'G7', title: 'Bilan Phase 1 & Go Phase 2', instance: 'EXCO', date: 'Avril 2027', livrable: 'ROI Phase 1 + plan Phase 2', color: '#4A7558' },
];

const instances = [
  { name: 'COPIL', full: 'Comité de Pilotage', desc: 'Décisions opérationnelles, suivi KPIs, arbitrages budget', freq: 'Mensuel', color: '#C9943A' },
  { name: 'EXCO', full: 'Comité Exécutif', desc: 'Décisions stratégiques, validation budget, Go/No-Go', freq: 'Trimestriel', color: '#4A7558' },
  { name: 'CODIR', full: 'Comité de Direction', desc: 'Information, alignement stratégique groupe', freq: 'Semestriel', color: '#1a1a2e' },
];

const GouvernanceCalendrier: React.FC = () => (
  <section id="gouvernance-calendrier" className="px-4 sm:px-8 lg:px-[72px] py-12">
    <div className="bg-white rounded-2xl border border-black/[.06] overflow-hidden shadow-[0_2px_20px_rgba(0,0,0,.04)]">
      {/* Header */}
      <div className="relative px-8 py-8 bg-gradient-to-br from-navy via-[#16213e] to-navy overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_30%,rgba(201,148,58,.12)_0%,transparent_60%)]" />
        <div className="relative z-10">
          <div className="text-[9px] font-bold tracking-[.22em] uppercase text-gold/70 mb-2">Gouvernance</div>
          <div className="font-cormorant text-[32px] text-white font-light leading-tight">
            Calendrier de Gouvernance — 7 Gates Décisionnelles
          </div>
        </div>
      </div>

      <div className="px-8 py-8 space-y-8">
        {/* Timeline */}
        <div className="relative">
          {gates.map((g, i) => (
            <div key={g.id} className="flex gap-5 mb-0">
              {/* Timeline line */}
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0" style={{ background: g.color }}>
                  {g.id}
                </div>
                {i < gates.length - 1 && <div className="w-px flex-1 min-h-[40px] bg-black/10" />}
              </div>
              {/* Content */}
              <div className="pb-6 flex-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-[14px] font-semibold text-navy">{g.title}</span>
                  <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold text-white" style={{ background: g.color }}>
                    {g.instance}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1 text-[11px] text-black/50">
                  <Calendar size={12} />
                  {g.date}
                </div>
                <div className="flex items-center gap-2 mt-1 text-[12px] text-black/60">
                  <ArrowRight size={12} className="text-gold shrink-0" />
                  <span><strong>Livrable :</strong> {g.livrable}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Instances */}
        <div>
          <div className="text-[9px] font-bold tracking-[.22em] uppercase text-black/40 mb-4">
            Instances de gouvernance
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {instances.map((inst) => (
              <div key={inst.name} className="rounded-xl border border-black/[.06] overflow-hidden">
                <div className="h-1" style={{ background: inst.color }} />
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Users size={14} style={{ color: inst.color }} />
                    <span className="text-[12px] font-bold text-navy">{inst.name}</span>
                  </div>
                  <div className="text-[11px] font-medium text-black/60 mb-1">{inst.full}</div>
                  <div className="text-[11px] text-black/50">{inst.desc}</div>
                  <div className="mt-2 text-[10px] font-bold uppercase tracking-wider" style={{ color: inst.color }}>
                    {inst.freq}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default GouvernanceCalendrier;
