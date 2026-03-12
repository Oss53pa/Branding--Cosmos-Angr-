import React from 'react';
import { AlertCircle, CheckCircle2, ArrowDownRight, Clock, DollarSign } from 'lucide-react';

interface GateContingency {
  gate: string;
  title: string;
  nominal: { desc: string; outcome: string };
  degrade: { desc: string; action: string; delai: string; cout: string };
}

const contingencies: GateContingency[] = [
  {
    gate: 'Gate 1',
    title: 'Positionnement rejeté par COPIL',
    nominal: { desc: 'Scénario A validé', outcome: 'Passage direct au Brand Book' },
    degrade: {
      desc: 'COPIL demande révision ou pivot',
      action: 'Pivot vers Scénario C (niche premium) + revalidation',
      delai: '+4 semaines', cout: '15 M FCFA',
    },
  },
  {
    gate: 'Gate 3',
    title: 'Focus Group négatif',
    nominal: { desc: 'Score ≥ 4/5 sur dimensions clés', outcome: 'Confirmation positionnement + Brand Book final' },
    degrade: {
      desc: 'Score < 3/5 sur 2+ dimensions',
      action: 'Retest avec panel élargi + 2ème Focus Group sur scénario alternatif',
      delai: '+8 semaines', cout: '8 M FCFA',
    },
  },
  {
    gate: 'Gate 5',
    title: 'Budget réduit par EXCO',
    nominal: { desc: '485 M FCFA validés intégralement', outcome: 'Lancement plan 360° complet sur 5 axes' },
    degrade: {
      desc: 'Budget plafonné à 320 M FCFA (-34%)',
      action: 'Suppression Axe 4 (RP), réduction Axe 1 de 40%, recentrage digital only',
      delai: '+2 semaines replanning', cout: '320 M FCFA (budget réduit)',
    },
  },
  {
    gate: 'Gate 6',
    title: 'KPIs sous objectif à mi-parcours',
    nominal: { desc: 'Trafic +40%, CA enseignes +25%', outcome: 'Maintien du plan, passage Phase 2' },
    degrade: {
      desc: 'Trafic < +20% ou CA < +10%',
      action: 'Réallocation budget vers performance marketing, abandon branding institutionnel temporaire',
      delai: 'Immédiat (arbitrage COPIL)', cout: 'Budget constant, reventilé',
    },
  },
];

const PlanContingence: React.FC = () => (
  <section id="plan-contingence" className="px-4 sm:px-8 lg:px-[72px] py-12">
    <div className="bg-white rounded-2xl border border-black/[.06] overflow-hidden shadow-[0_2px_20px_rgba(0,0,0,.04)]">
      {/* Header */}
      <div className="relative px-8 py-8 bg-gradient-to-br from-navy via-[#16213e] to-navy overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_30%,rgba(201,148,58,.12)_0%,transparent_60%)]" />
        <div className="relative z-10">
          <div className="text-[9px] font-bold tracking-[.22em] uppercase text-gold/70 mb-2">Contingence</div>
          <div className="font-cormorant text-[32px] text-white font-light leading-tight">
            Plan de Contingence — Scénarios Dégradés par Gate
          </div>
          <div className="text-[11px] text-white/50 mt-1.5">
            Chaque gate inclut un scénario nominal et un scénario dégradé avec budget et délai associés
          </div>
        </div>
      </div>

      <div className="px-8 py-8 space-y-5">
        {contingencies.map((c) => (
          <div key={c.gate} className="rounded-xl border border-black/[.06] overflow-hidden">
            {/* Gate header */}
            <div className="px-5 py-3 bg-navy/5 border-b border-black/[.06] flex items-center gap-3">
              <span className="px-2.5 py-1 rounded-md bg-navy text-white text-[10px] font-bold">{c.gate}</span>
              <span className="text-[13px] font-semibold text-navy">{c.title}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-black/[.06]">
              {/* Nominal */}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 size={14} className="text-emerald-500" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">Scénario nominal</span>
                </div>
                <p className="text-[12px] text-navy/80 mb-2">{c.nominal.desc}</p>
                <div className="flex items-center gap-2 text-[11px] text-emerald-600">
                  <ArrowDownRight size={12} />
                  <span>{c.nominal.outcome}</span>
                </div>
              </div>

              {/* Dégradé */}
              <div className="p-5 bg-amber-50/30">
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle size={14} className="text-amber-500" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600">Scénario dégradé</span>
                </div>
                <p className="text-[12px] text-navy/80 mb-2">{c.degrade.desc}</p>
                <p className="text-[12px] text-navy/70 mb-3"><strong>Action :</strong> {c.degrade.action}</p>
                <div className="flex gap-4 text-[11px] text-black/50">
                  <span className="flex items-center gap-1"><Clock size={11} /> {c.degrade.delai}</span>
                  <span className="flex items-center gap-1"><DollarSign size={11} /> {c.degrade.cout}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default PlanContingence;
