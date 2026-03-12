import React from 'react';
import { BarChart3, AlertCircle, TrendingUp } from 'lucide-react';

const marketData = [
  { label: 'Population Abidjan', value: '5,6 M', detail: 'habitants (2020), croissance +3,2%/an' },
  { label: 'Classe moyenne sup.', value: '18%', detail: 'des ménages (CSP A/B) ≈ 420 000 ménages' },
  { label: 'Dépense retail moderne', value: '145 000', detail: 'FCFA/mois/ménage CSP A/B' },
];

const scenarios = [
  { id: 'A', name: 'Premium de proximité', cible: 'CSP A/B Cocody-Angré', zone: '5 km', penetration: '12%', ca: '85 M FCFA', color: '#4A7558' },
  { id: 'B', name: 'Destination premium', cible: 'CSP A élargi', zone: '10 km', penetration: '8%', ca: '120 M FCFA', color: '#C9943A' },
  { id: 'C', name: "L'Exception Naturelle", cible: 'CSP A niche', zone: '3 km', penetration: '15%', ca: '65 M FCFA', color: '#8B7355' },
  { id: 'D', name: 'Nature Contemporaine', cible: 'CSP B+ mainstream', zone: '7 km', penetration: '10%', ca: '95 M FCFA', color: '#e65100' },
];

const precautions = [
  'Données de 2020 — actualisation recommandée post-COVID',
  'Projections CA conditionnées au taux de remplissage enseignes',
  'Zone de chalandise théorique — validation terrain requise (Focus Group)',
];

const KpiAnchoring: React.FC = () => (
  <section id="kpi-anchoring" className="px-4 sm:px-8 lg:px-[72px] py-12">
    <div className="bg-white rounded-2xl border border-black/[.06] overflow-hidden shadow-[0_2px_20px_rgba(0,0,0,.04)]">
      {/* Header */}
      <div className="relative px-8 py-8 bg-gradient-to-br from-navy via-[#16213e] to-navy overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_30%,rgba(201,148,58,.12)_0%,transparent_60%)]" />
        <div className="relative z-10">
          <div className="text-[9px] font-bold tracking-[.22em] uppercase text-gold/70 mb-2">
            Données de Marché
          </div>
          <div className="font-cormorant text-[32px] text-white font-light leading-tight">
            Ancrage chiffré — Étude OnPoint Africa
          </div>
          <div className="text-[11px] text-white/50 mt-1.5">Avril 2020 · Commanditée par New Heaven SA</div>
        </div>
      </div>

      <div className="px-8 py-8 space-y-8">
        {/* Source */}
        <div className="rounded-xl border border-gold/20 bg-gold/5 px-5 py-4 flex items-start gap-3">
          <BarChart3 size={16} className="text-gold mt-0.5 shrink-0" />
          <p className="text-[12px] text-navy/80 leading-relaxed">
            <strong>Source principale :</strong> Étude de faisabilité — Analyse de l'offre et de la demande de centres commerciaux en Côte d'Ivoire, OnPoint Africa, Avril 2020 (commanditée par New Heaven SA).
          </p>
        </div>

        {/* Données marché */}
        <div>
          <div className="text-[9px] font-bold tracking-[.22em] uppercase text-black/40 mb-4">
            Données clés du marché
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {marketData.map((d, i) => (
              <div key={i} className="rounded-xl border border-black/[.06] bg-cream/60 p-5">
                <div className="text-gold mb-2"><TrendingUp size={16} /></div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-black/40 mb-1">{d.label}</div>
                <div className="font-cormorant text-[28px] text-navy font-light leading-none">{d.value}</div>
                <div className="text-[11px] text-black/50 mt-1">{d.detail}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tableau scénarios */}
        <div>
          <div className="text-[9px] font-bold tracking-[.22em] uppercase text-black/40 mb-4">
            Projection par scénario
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-[12px]">
              <thead>
                <tr className="bg-navy text-white text-left">
                  <th className="px-4 py-3 font-semibold rounded-tl-lg">Scénario</th>
                  <th className="px-4 py-3 font-semibold">Cible primaire</th>
                  <th className="px-4 py-3 font-semibold">Zone chalandise</th>
                  <th className="px-4 py-3 font-semibold">Pénétration</th>
                  <th className="px-4 py-3 font-semibold rounded-tr-lg">CA prév. M1</th>
                </tr>
              </thead>
              <tbody>
                {scenarios.map((s, i) => (
                  <tr key={s.id} className={i % 2 === 0 ? 'bg-cream/40' : 'bg-white'}>
                    <td className="px-4 py-3 font-semibold flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: s.color }} />
                      {s.id} — {s.name}
                    </td>
                    <td className="px-4 py-3 text-black/70">{s.cible}</td>
                    <td className="px-4 py-3 text-black/70">{s.zone}</td>
                    <td className="px-4 py-3 text-black/70">{s.penetration}</td>
                    <td className="px-4 py-3 font-semibold text-navy">{s.ca}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Précautions */}
        <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-5">
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle size={16} className="text-amber-500" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">
              Précautions méthodologiques
            </span>
          </div>
          <ul className="space-y-2">
            {precautions.map((p, i) => (
              <li key={i} className="flex items-start gap-2 text-[12px] text-amber-900/70">
                <span className="w-1 h-1 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>
);

export default KpiAnchoring;
