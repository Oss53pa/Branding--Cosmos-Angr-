import React from 'react';
import { AlertTriangle, Shield, Zap } from 'lucide-react';

interface Risk {
  id: string;
  title: string;
  prob: string;
  impact: string;
  mitigation: string;
  trigger: string;
  severity: 'critical' | 'high' | 'moderate';
}

const risks: Risk[] = [
  {
    id: 'R1', title: 'Taux de remplissage insuffisant',
    prob: 'Moyenne', impact: 'Critique',
    mitigation: 'Programme incentive enseignes + clause de sortie progressive + pop-up stores premium pour combler les vacances',
    trigger: '< 60% de signatures fermes à M6',
    severity: 'critical',
  },
  {
    id: 'R2', title: 'Dépassement budget marketing',
    prob: 'Élevée', impact: 'Modéré',
    mitigation: 'Budget de contingence 10% + arbitrage mensuel COPIL + dashboard temps réel des dépenses',
    trigger: '> 15% d\'écart vs budget prévisionnel',
    severity: 'high',
  },
  {
    id: 'R3', title: 'Concurrence agressive (Cap Sud, PlaYce)',
    prob: 'Élevée', impact: 'Modéré',
    mitigation: 'Différenciation premium + exclusivités enseignes + programme fidélité anti-churn',
    trigger: 'Ouverture concurrent < 2 km ou campagne agressive prix',
    severity: 'high',
  },
  {
    id: 'R4', title: 'Conjoncture macro défavorable',
    prob: 'Faible', impact: 'Critique',
    mitigation: 'Gel phase 2, recentrage enseignes résilientes (alimentation premium, santé, pharmacie)',
    trigger: 'PIB < 4% ou inflation > 8%',
    severity: 'moderate',
  },
  {
    id: 'R5', title: 'Échec Focus Group (rejet positionnement)',
    prob: 'Faible', impact: 'Élevé',
    mitigation: '2 scénarios alternatifs prêts, pivot rapide sous 4 semaines, budget retest prévu',
    trigger: 'Score < 3/5 sur 2+ dimensions clés',
    severity: 'moderate',
  },
];

const severityColors = {
  critical: { bg: 'bg-red-50', border: 'border-red-200', badge: 'bg-red-100 text-red-700' },
  high: { bg: 'bg-amber-50', border: 'border-amber-200', badge: 'bg-amber-100 text-amber-700' },
  moderate: { bg: 'bg-yellow-50/60', border: 'border-yellow-200', badge: 'bg-yellow-100 text-yellow-700' },
};

const MatriceRisques: React.FC = () => (
  <section id="matrice-risques" className="px-4 sm:px-8 lg:px-[72px] py-12">
    <div className="bg-white rounded-2xl border border-black/[.06] overflow-hidden shadow-[0_2px_20px_rgba(0,0,0,.04)]">
      {/* Header */}
      <div className="relative px-8 py-8 bg-gradient-to-br from-navy via-[#16213e] to-navy overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_30%,rgba(201,148,58,.12)_0%,transparent_60%)]" />
        <div className="relative z-10">
          <div className="text-[9px] font-bold tracking-[.22em] uppercase text-gold/70 mb-2">Risques</div>
          <div className="font-cormorant text-[32px] text-white font-light leading-tight">
            Matrice des Risques — 5 Risques Majeurs
          </div>
        </div>
      </div>

      <div className="px-8 py-8 space-y-4">
        {/* Légende */}
        <div className="flex gap-4 mb-2">
          {([['critical', 'Critique'], ['high', 'Élevé'], ['moderate', 'Modéré']] as const).map(([key, label]) => (
            <span key={key} className={`px-3 py-1 rounded-full text-[10px] font-bold ${severityColors[key].badge}`}>
              {label}
            </span>
          ))}
        </div>

        {/* Risk cards */}
        {risks.map((r) => {
          const s = severityColors[r.severity];
          return (
            <div key={r.id} className={`rounded-xl border ${s.border} ${s.bg} p-5`}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3">
                  <AlertTriangle size={16} className={r.severity === 'critical' ? 'text-red-500' : r.severity === 'high' ? 'text-amber-500' : 'text-yellow-500'} />
                  <div>
                    <span className="text-[10px] font-bold text-black/40 mr-2">{r.id}</span>
                    <span className="text-[13px] font-semibold text-navy">{r.title}</span>
                  </div>
                </div>
                <div className="flex gap-2 text-[10px]">
                  <span className="px-2 py-0.5 rounded bg-black/[.06] text-black/60">Prob: {r.prob}</span>
                  <span className={`px-2 py-0.5 rounded ${s.badge}`}>Impact: {r.impact}</span>
                </div>
              </div>
              <div className="flex items-start gap-2 ml-7 mb-2">
                <Shield size={13} className="text-black/30 mt-0.5 shrink-0" />
                <span className="text-[12px] text-navy/70 leading-relaxed">{r.mitigation}</span>
              </div>
              <div className="ml-7 flex items-center gap-2">
                <Zap size={12} className="text-amber-500 shrink-0" />
                <span className="text-[11px] text-black/50"><strong>Trigger :</strong> {r.trigger}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="px-8 py-3 border-t border-black/[.06] text-center">
        <span className="text-[10px] text-black/40">Revue risques : mensuelle en COPIL — New Heaven SA</span>
      </div>
    </div>
  </section>
);

export default MatriceRisques;
