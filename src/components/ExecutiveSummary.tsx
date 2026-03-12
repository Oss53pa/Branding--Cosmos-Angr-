import React from 'react';
import { AlertTriangle, ArrowRight, Target, TrendingUp, Users, Calendar, Shield } from 'lucide-react';

const keyFigures = [
  { value: '485', unit: 'M FCFA', label: 'Investissement / 24 mois', icon: <Target size={18} /> },
  { value: '3,2×', unit: 'ROI à 36 mois', label: 'Retour sur investissement projeté', icon: <TrendingUp size={18} /> },
  { value: '+40%', unit: 'Trafic à M12', label: 'Objectif fréquentation centre', icon: <Users size={18} /> },
  { value: '+25%', unit: 'CA enseignes M18', label: 'Croissance chiffre d\'affaires', icon: <TrendingUp size={18} /> },
];

const risks = [
  {
    title: 'Taux de remplissage < 70% à M6',
    mitigation: 'Plan contingence recrutement accéléré — programme incentive enseignes + pop-up stores premium',
    color: 'border-red-300 bg-red-50/60',
    iconColor: 'text-red-500',
  },
  {
    title: 'Budget marketing réduit > 20%',
    mitigation: 'Recentrage digital + RP earned — plan B à 320 M FCFA, suppression Axe 4',
    color: 'border-amber-300 bg-amber-50/60',
    iconColor: 'text-amber-500',
  },
  {
    title: 'Conjoncture macro défavorable',
    mitigation: 'Gel phase 2, maintien notoriété — recentrage enseignes résilientes (alimentation premium, santé)',
    color: 'border-amber-200 bg-amber-50/40',
    iconColor: 'text-amber-400',
  },
];

const ExecutiveSummary: React.FC = () => (
  <section id="executive-summary" className="px-4 sm:px-8 lg:px-[72px] py-12">
    <div className="bg-white rounded-2xl border border-black/[.06] overflow-hidden shadow-[0_2px_20px_rgba(0,0,0,.04)]">
      {/* Header */}
      <div className="relative px-8 py-8 bg-gradient-to-br from-navy via-[#16213e] to-navy overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_30%,rgba(201,148,58,.12)_0%,transparent_60%)]" />
        <div className="relative z-10">
          <div className="text-[9px] font-bold tracking-[.22em] uppercase text-gold/70 mb-2">
            Synthèse Décisionnelle
          </div>
          <div className="font-cormorant text-[32px] text-white font-light leading-tight">
            Résumé Exécutif — Recommandation & Décision
          </div>
          <div className="text-[11px] text-white/50 mt-1.5">
            Cosmos Angré · New Heaven SA / RCP · Mars 2026
          </div>
        </div>
      </div>

      <div className="px-8 py-8 space-y-8">
        {/* Recommandation */}
        <div className="border-l-4 border-gold pl-6 py-2">
          <div className="text-[9px] font-bold tracking-[.22em] uppercase text-gold mb-2">
            Recommandation stratégique
          </div>
          <p className="font-cormorant text-[20px] text-navy font-medium leading-snug">
            Positionner Cosmos Angré comme destination premium de proximité (Scénario A) avec un investissement marketing de 485 M FCFA sur 24 mois, captant l'espace blanc stratégique identifié par l'étude OnPoint Africa entre Marcory et la zone Riviera/Angré.
          </p>
        </div>

        {/* Chiffres clés */}
        <div>
          <div className="text-[9px] font-bold tracking-[.22em] uppercase text-black/40 mb-4">
            Chiffres clés
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {keyFigures.map((fig, i) => (
              <div key={i} className="rounded-xl border border-black/[.06] bg-cream/60 p-5">
                <div className="text-gold mb-2">{fig.icon}</div>
                <div className="font-cormorant text-[32px] text-navy font-light leading-none">{fig.value}</div>
                <div className="text-[10px] font-bold text-navy/60 uppercase tracking-wider mt-1">{fig.unit}</div>
                <div className="text-[11px] text-black/50 mt-2">{fig.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Top 3 risques */}
        <div>
          <div className="text-[9px] font-bold tracking-[.22em] uppercase text-black/40 mb-4">
            Top 3 risques majeurs
          </div>
          <div className="space-y-3">
            {risks.map((risk, i) => (
              <div key={i} className={`rounded-xl border ${risk.color} p-4 flex items-start gap-4`}>
                <AlertTriangle size={16} className={`${risk.iconColor} mt-0.5 shrink-0`} />
                <div className="flex-1">
                  <div className="text-[13px] font-semibold text-navy">{risk.title}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <Shield size={12} className="text-black/30 shrink-0" />
                    <span className="text-[12px] text-black/60">{risk.mitigation}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Décision attendue */}
        <div className="rounded-xl bg-gradient-to-br from-navy to-[#16213e] p-6">
          <div className="flex items-center gap-2 mb-3">
            <ArrowRight size={16} className="text-gold" />
            <span className="text-[9px] font-bold tracking-[.22em] uppercase text-gold">
              Décision attendue du COPIL
            </span>
          </div>
          <p className="text-[13px] text-white/85 leading-relaxed">
            Validation du scénario de positionnement et du budget d'investissement marketing <span className="text-gold font-semibold">485 M FCFA</span> par le COPIL avant lancement Phase 1 — brief agences, recrutement community manager, commande signalétique.
          </p>
          <div className="mt-4 flex items-center gap-2 bg-white/10 rounded-lg px-4 py-2.5 inline-flex">
            <Calendar size={14} className="text-gold" />
            <span className="text-[12px] font-semibold text-white">Date limite : 15/04/2026</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-8 py-3 border-t border-black/[.06] text-center">
        <span className="text-[10px] text-black/40">New Heaven SA — Document confidentiel — Mars 2026</span>
      </div>
    </div>
  </section>
);

export default ExecutiveSummary;
