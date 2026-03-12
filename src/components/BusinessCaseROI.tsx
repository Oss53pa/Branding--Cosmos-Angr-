import React from 'react';
import { TrendingUp, DollarSign, Clock, BarChart3 } from 'lucide-react';

const metrics = [
  { label: 'CAC', sublabel: 'Coût Acquisition Client', value: '12 500', unit: 'FCFA', icon: <DollarSign size={18} /> },
  { label: 'LTV', sublabel: 'Lifetime Value (3 ans)', value: '840 000', unit: 'FCFA', icon: <TrendingUp size={18} /> },
  { label: 'LTV / CAC', sublabel: 'Ratio rentabilité', value: '67×', unit: '', icon: <BarChart3 size={18} /> },
  { label: 'Break-even', sublabel: 'Point d\'équilibre', value: 'M14', unit: '', icon: <Clock size={18} /> },
];

const projections = [
  { period: 'M6', invest: '220 M', caIncr: '95 M', roi: '-57%' },
  { period: 'M12', invest: '365 M', caIncr: '380 M', roi: '+4%' },
  { period: 'M18', invest: '425 M', caIncr: '720 M', roi: '+69%' },
  { period: 'M24', invest: '485 M', caIncr: '1 150 M', roi: '+137%' },
  { period: 'M36', invest: '485 M', caIncr: '1 550 M', roi: '+220%' },
];

const sensitivity = [
  { scenario: 'Optimiste', hyp: 'Trafic +50%, remplissage 95%', roi36: '+310%', color: '#4A7558' },
  { scenario: 'Base', hyp: 'Trafic +40%, remplissage 85%', roi36: '+220%', color: '#C9943A' },
  { scenario: 'Pessimiste', hyp: 'Trafic +20%, remplissage 70%', roi36: '+85%', color: '#e65100' },
];

const BusinessCaseROI: React.FC = () => (
  <section id="business-case-roi" className="px-4 sm:px-8 lg:px-[72px] py-12">
    <div className="bg-white rounded-2xl border border-black/[.06] overflow-hidden shadow-[0_2px_20px_rgba(0,0,0,.04)]">
      {/* Header */}
      <div className="relative px-8 py-8 bg-gradient-to-br from-navy via-[#16213e] to-navy overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_30%,rgba(201,148,58,.12)_0%,transparent_60%)]" />
        <div className="relative z-10">
          <div className="text-[9px] font-bold tracking-[.22em] uppercase text-gold/70 mb-2">Business Case</div>
          <div className="font-cormorant text-[32px] text-white font-light leading-tight">
            Modèle ROI — Retour sur Investissement Marketing
          </div>
        </div>
      </div>

      <div className="px-8 py-8 space-y-8">
        {/* Métriques clés */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((m) => (
            <div key={m.label} className="rounded-xl border border-black/[.06] bg-cream/60 p-5">
              <div className="text-gold mb-2">{m.icon}</div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-black/40 mb-1">{m.label}</div>
              <div className="font-cormorant text-[28px] text-navy font-light leading-none">
                {m.value}{m.unit && <span className="text-[14px] text-black/40 ml-1">{m.unit}</span>}
              </div>
              <div className="text-[11px] text-black/50 mt-1">{m.sublabel}</div>
            </div>
          ))}
        </div>

        {/* Projection ROI */}
        <div>
          <div className="text-[9px] font-bold tracking-[.22em] uppercase text-black/40 mb-4">
            Projection ROI cumulé
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-[12px]">
              <thead>
                <tr className="bg-navy text-white text-left">
                  <th className="px-4 py-3 font-semibold rounded-tl-lg">Période</th>
                  <th className="px-4 py-3 font-semibold">Invest. cumulé</th>
                  <th className="px-4 py-3 font-semibold">CA incrémental</th>
                  <th className="px-4 py-3 font-semibold rounded-tr-lg">ROI</th>
                </tr>
              </thead>
              <tbody>
                {projections.map((p, i) => (
                  <tr key={p.period} className={i % 2 === 0 ? 'bg-cream/40' : 'bg-white'}>
                    <td className="px-4 py-3 font-semibold text-navy">{p.period}</td>
                    <td className="px-4 py-3 text-black/70">{p.invest}</td>
                    <td className="px-4 py-3 text-black/70">{p.caIncr}</td>
                    <td className={`px-4 py-3 font-bold ${p.roi.startsWith('+') ? 'text-emerald-600' : 'text-red-500'}`}>{p.roi}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Analyse de sensibilité */}
        <div>
          <div className="text-[9px] font-bold tracking-[.22em] uppercase text-black/40 mb-4">
            Analyse de sensibilité
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {sensitivity.map((s) => (
              <div key={s.scenario} className="rounded-xl border border-black/[.06] overflow-hidden">
                <div className="h-1" style={{ background: s.color }} />
                <div className="p-5">
                  <div className="text-[11px] font-bold uppercase tracking-wider mb-1" style={{ color: s.color }}>{s.scenario}</div>
                  <div className="text-[12px] text-black/60 mb-3">{s.hyp}</div>
                  <div className="font-cormorant text-[24px] text-navy font-light">ROI M36 : {s.roi36}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Note méthodologique */}
        <div className="rounded-xl border border-black/[.06] bg-cream/40 p-5">
          <div className="text-[10px] font-bold uppercase tracking-wider text-black/40 mb-2">Méthodologie valeur média</div>
          <p className="text-[12px] text-black/60 leading-relaxed">
            Valorisation média earned (RP, influence, UGC) calculée sur base CPM marché Abidjan : 3 500 FCFA/1000 impressions. CA incrémental = différentiel vs scénario « sans investissement marketing » basé sur benchmark JLL centres commerciaux Afrique de l'Ouest.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default BusinessCaseROI;
