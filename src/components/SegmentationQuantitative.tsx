import React from 'react';
import { Users, Target, TrendingUp, AlertCircle } from 'lucide-react';

const segments = [
  { name: 'Premium Exclusif', csp: 'CSP A', pct: '8%', menages: '168 000', panier: '280 000', freq: '2×/mois', color: '#C9943A' },
  { name: 'Premium Accessible', csp: 'CSP A/B', pct: '18%', menages: '378 000', panier: '145 000', freq: '3×/mois', color: '#4A7558' },
  { name: 'Aspirationnel', csp: 'CSP B+', pct: '25%', menages: '525 000', panier: '65 000', freq: '4×/mois', color: '#8B7355' },
  { name: 'Mainstream', csp: 'CSP C+', pct: '35%', menages: '735 000', panier: '25 000', freq: '5×/mois', color: '#999' },
];

const SegmentationQuantitative: React.FC = () => (
  <section id="segmentation-quantitative" className="px-4 sm:px-8 lg:px-[72px] py-12">
    <div className="bg-white rounded-2xl border border-black/[.06] overflow-hidden shadow-[0_2px_20px_rgba(0,0,0,.04)]">
      {/* Header */}
      <div className="relative px-8 py-8 bg-gradient-to-br from-navy via-[#16213e] to-navy overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_30%,rgba(201,148,58,.12)_0%,transparent_60%)]" />
        <div className="relative z-10">
          <div className="text-[9px] font-bold tracking-[.22em] uppercase text-gold/70 mb-2">Segmentation</div>
          <div className="font-cormorant text-[32px] text-white font-light leading-tight">
            Validation Quantitative — Segmentation Client
          </div>
          <div className="text-[11px] text-white/50 mt-1.5">
            Données OnPoint Africa (Avril 2020) + INSEE Côte d'Ivoire
          </div>
        </div>
      </div>

      <div className="px-8 py-8 space-y-8">
        {/* Tableau segmentation */}
        <div>
          <div className="text-[9px] font-bold tracking-[.22em] uppercase text-black/40 mb-4">
            Segmentation des ménages Abidjan
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-[12px]">
              <thead>
                <tr className="bg-navy text-white text-left">
                  <th className="px-4 py-3 font-semibold rounded-tl-lg">Segment</th>
                  <th className="px-4 py-3 font-semibold">CSP</th>
                  <th className="px-4 py-3 font-semibold">% ménages</th>
                  <th className="px-4 py-3 font-semibold">Volume</th>
                  <th className="px-4 py-3 font-semibold">Panier moyen</th>
                  <th className="px-4 py-3 font-semibold rounded-tr-lg">Fréquence</th>
                </tr>
              </thead>
              <tbody>
                {segments.map((s, i) => (
                  <tr key={s.name} className={i < 2 ? 'bg-gold/5 font-medium' : i % 2 === 0 ? 'bg-cream/40' : 'bg-white'}>
                    <td className="px-4 py-3 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: s.color }} />
                      <span className="text-navy">{s.name}</span>
                    </td>
                    <td className="px-4 py-3 text-black/70">{s.csp}</td>
                    <td className="px-4 py-3 text-black/70">{s.pct}</td>
                    <td className="px-4 py-3 text-navy font-medium">{s.menages}</td>
                    <td className="px-4 py-3 text-navy">{s.panier} FCFA</td>
                    <td className="px-4 py-3 text-black/60">{s.freq}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Cible Cosmos */}
        <div className="rounded-xl border border-gold/20 bg-gold/5 p-6">
          <div className="flex items-center gap-2 mb-3">
            <Target size={16} className="text-gold" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-gold">
              Cible Cosmos Angré
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                <Users size={14} className="text-gold" />
              </div>
              <div>
                <div className="text-[12px] font-semibold text-navy">Cible primaire</div>
                <div className="text-[12px] text-black/60">Premium Accessible — 378 000 ménages (CSP A/B)</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                <Users size={14} className="text-gold" />
              </div>
              <div>
                <div className="text-[12px] font-semibold text-navy">Cible secondaire</div>
                <div className="text-[12px] text-black/60">Premium Exclusif — 168 000 ménages (CSP A)</div>
              </div>
            </div>
          </div>
        </div>

        {/* Potentiel CA */}
        <div>
          <div className="text-[9px] font-bold tracking-[.22em] uppercase text-black/40 mb-4">
            Potentiel de chiffre d'affaires
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-black/[.06] bg-cream/40 p-5">
              <div className="text-gold mb-2"><TrendingUp size={16} /></div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-black/40 mb-1">Marché adressable</div>
              <div className="font-cormorant text-[28px] text-navy font-light leading-none">23,6 Mds</div>
              <div className="text-[11px] text-black/50 mt-1">FCFA/an · Cible primaire × panier × fréquence × pénétration 12%</div>
            </div>
            <div className="rounded-xl border border-black/[.06] bg-cream/40 p-5">
              <div className="text-gold mb-2"><Target size={16} /></div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-black/40 mb-1">Part Cosmos visée</div>
              <div className="font-cormorant text-[28px] text-navy font-light leading-none">826 M</div>
              <div className="text-[11px] text-black/50 mt-1">FCFA/an · 3,5% du marché adressable</div>
            </div>
          </div>
        </div>

        {/* Note méthodologique */}
        <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-5">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle size={14} className="text-amber-500" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">Note méthodologique</span>
          </div>
          <p className="text-[11px] text-amber-900/70 leading-relaxed">
            Segmentation basée sur les critères de revenus ménages et comportements d'achat retail moderne (source OnPoint Africa 2020). Paniers moyens et fréquences issus de l'étude de demande. Taux de pénétration ajusté au format premium — validation terrain recommandée via Focus Group.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default SegmentationQuantitative;
