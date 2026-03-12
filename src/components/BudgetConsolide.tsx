import React from 'react';
import { PieChart, Calendar } from 'lucide-react';

const axes = [
  { name: 'Axe 1 — Notoriété', amount: '170 M', pct: 35, color: '#4A7558', w: '35%' },
  { name: 'Axe 2 — Trafic', amount: '121 M', pct: 25, color: '#C9943A', w: '25%' },
  { name: 'Axe 3 — CRM / Fidélisation', amount: '73 M', pct: 15, color: '#8B7355', w: '15%' },
  { name: 'Axe 4 — RP / Influence', amount: '48 M', pct: 10, color: '#e65100', w: '10%' },
  { name: 'Axe 5 — Enseignes', amount: '73 M', pct: 15, color: '#1a1a2e', w: '15%' },
];

const phases = [
  { name: 'Phase 1 — Lancement', period: 'M1 → M6', amount: '220 M FCFA', pct: 45, color: '#C9943A' },
  { name: 'Phase 2 — Croissance', period: 'M7 → M12', amount: '145 M FCFA', pct: 30, color: '#4A7558' },
  { name: 'Phase 3 — Consolidation', period: 'M13 → M24', amount: '120 M FCFA', pct: 25, color: '#8B7355' },
];

const BudgetConsolide: React.FC = () => (
  <section id="budget-consolide" className="px-4 sm:px-8 lg:px-[72px] py-12">
    <div className="bg-white rounded-2xl border border-black/[.06] overflow-hidden shadow-[0_2px_20px_rgba(0,0,0,.04)]">
      {/* Header */}
      <div className="relative px-8 py-8 bg-gradient-to-br from-navy via-[#16213e] to-navy overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_30%,rgba(201,148,58,.12)_0%,transparent_60%)]" />
        <div className="relative z-10">
          <div className="text-[9px] font-bold tracking-[.22em] uppercase text-gold/70 mb-2">Budget</div>
          <div className="font-cormorant text-[32px] text-white font-light leading-tight">
            Budget Consolidé — 485 M FCFA sur 24 mois
          </div>
          <div className="text-[11px] text-white/50 mt-1.5">Ventilation par axe stratégique et par phase</div>
        </div>
      </div>

      <div className="px-8 py-8 space-y-8">
        {/* Ventilation par axe */}
        <div>
          <div className="text-[9px] font-bold tracking-[.22em] uppercase text-black/40 mb-4">
            Ventilation par axe stratégique
          </div>

          {/* Bar chart visuel */}
          <div className="flex h-8 rounded-lg overflow-hidden mb-4">
            {axes.map((a) => (
              <div key={a.name} className="relative group" style={{ width: a.w, background: a.color }}>
                <div className="absolute inset-0 flex items-center justify-center text-[9px] font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  {a.pct}%
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            {axes.map((a) => (
              <div key={a.name} className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full shrink-0" style={{ background: a.color }} />
                <span className="text-[13px] text-navy flex-1">{a.name}</span>
                <span className="text-[13px] font-semibold text-navy">{a.amount}</span>
                <span className="text-[11px] text-black/40 w-10 text-right">{a.pct}%</span>
              </div>
            ))}
            <div className="flex items-center gap-3 pt-2 border-t border-black/[.08]">
              <PieChart size={14} className="text-gold shrink-0" />
              <span className="text-[13px] font-bold text-navy flex-1">Total</span>
              <span className="text-[13px] font-bold text-navy">485 M FCFA</span>
              <span className="text-[11px] text-black/40 w-10 text-right">100%</span>
            </div>
          </div>
        </div>

        {/* Phases */}
        <div>
          <div className="text-[9px] font-bold tracking-[.22em] uppercase text-black/40 mb-4">
            Phasage budgétaire
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {phases.map((p) => (
              <div key={p.name} className="rounded-xl border border-black/[.06] overflow-hidden">
                <div className="h-1" style={{ background: p.color }} />
                <div className="p-5">
                  <div className="flex items-center gap-2 text-black/40 mb-2">
                    <Calendar size={13} />
                    <span className="text-[10px] font-bold uppercase tracking-wider">{p.period}</span>
                  </div>
                  <div className="text-[13px] font-semibold text-navy mb-1">{p.name}</div>
                  <div className="font-cormorant text-[26px] text-navy font-light">{p.amount}</div>
                  <div className="text-[11px] text-black/40 mt-1">{p.pct}% du budget total</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-8 py-3 border-t border-black/[.06] text-center">
        <span className="text-[10px] text-black/40">Budget sous réserve validation COPIL — New Heaven SA</span>
      </div>
    </div>
  </section>
);

export default BudgetConsolide;
