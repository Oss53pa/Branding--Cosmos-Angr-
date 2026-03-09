import React from 'react';
import { TrendingUp } from 'lucide-react';
import EditableText from './EditableText';

const budgetRows = [
  ['Campagne affichage urbain', '45 000 000', 'Notoriete', 'J-60 a J+30'],
  ['Campagne radio (3 stations)', '25 000 000', 'Notoriete', 'J-45 a J+15'],
  ['Campagne digitale Meta/Google', '30 000 000', 'Trafic', 'J-90 a J+90'],
  ['Programme influenceurs (20)', '15 000 000', 'Trafic', 'J-30 a J+60'],
  ['Evenement inauguration VIP', '35 000 000', 'Image', 'J-Day'],
  ['Soft Opening operations', '12 000 000', 'Trafic', 'J-30'],
  ['Application mobile', '20 000 000', 'Fidelisation', 'J-60'],
  ['Programme fidelite setup', '8 000 000', 'Fidelisation', 'J-30'],
  ['Relations presse & RP', '10 000 000', 'Image', 'J-90 a J+30'],
  ['Signaletique & branding lieu', '40 000 000', 'Image', 'J-45'],
  ['Production contenus (photo/video)', '18 000 000', 'Tous axes', 'J-60'],
  ['Kits co-branding enseignes', '6 000 000', 'Activation', 'J-30'],
];

const kpis = [
  { title: 'Trafic J+90', val: '150 000 visiteurs cumules', target: 'Seuil rentabilite loyers' },
  { title: 'Notoriete assistee', val: '65% zone primaire', target: 'Benchmark centres premium' },
  { title: 'Taux conversion CRM', val: '12% visiteurs -> inscrits', target: 'Standard retail premium' },
  { title: 'NPS inauguration', val: '>= 45', target: 'Excellence experientielle' },
];

const axeColors: Record<string, string> = {
  'Notoriete': '#4A7558',
  'Trafic': '#0D1B4B',
  'Image': '#C9943A',
  'Fidelisation': '#8B7355',
  'Tous axes': '#2C3E6B',
  'Activation': '#e65100',
};

const colFields = ['action', 'amount', 'axe', 'timing'];

const Budget: React.FC = () => {
  const total = budgetRows.reduce((sum, row) => sum + parseInt(row[1].replace(/\s/g, '')), 0);

  return (
    <div id="budget" className="px-4 sm:px-8 lg:px-[72px] pb-16">
      <div className="bg-white rounded-2xl border border-black/[.06] overflow-hidden shadow-[0_2px_20px_rgba(0,0,0,.04)]">
        {/* Header */}
        <div className="relative px-8 py-8 bg-gradient-to-br from-navy via-[#16213e] to-navy overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_30%,rgba(201,148,58,.1)_0%,transparent_60%)]" />
          <div className="relative z-10 flex items-end justify-between">
            <div>
              <div className="text-[9px] font-bold tracking-[.2em] uppercase text-gold/70 mb-2">Livrable 4.2</div>
              <EditableText storageKey="budget-title" defaultValue="Budget & Business Case" className="font-cormorant text-[30px] text-white font-light" tag="div" />
              <EditableText storageKey="budget-subtitle" defaultValue="Investissement marketing . ROI projete . KPIs" className="text-[11px] text-white/35 mt-1.5" tag="div" />
            </div>
            <div className="text-right">
              <div className="text-[10px] text-white/30 uppercase tracking-wider mb-1">Budget total</div>
              <div className="font-cormorant text-[28px] text-gold font-light">
                {total.toLocaleString('fr-FR')} <span className="text-[14px] text-gold/60">FCFA</span>
              </div>
              <div className="text-[10px] text-white/25">
                ~ {Math.round(total / 655.957).toLocaleString('fr-FR')} EUR
              </div>
            </div>
          </div>
        </div>

        <div className="p-8">
          {/* Budget table */}
          <div className="mb-8">
            <EditableText
              storageKey="budget-section-title"
              defaultValue="Budget marketing ventile (FCFA)"
              className="flex items-center gap-2 text-[9px] font-bold tracking-[.2em] uppercase text-gold mb-4 pb-2 border-b border-gold/20"
              tag="div"
            />
            <div className="overflow-x-auto rounded-xl border border-black/[.06]">
              <table className="w-full border-collapse text-[13px]">
                <thead>
                  <tr>
                    {['Action', 'Budget (FCFA)', 'Axe', 'Timing'].map((h) => (
                      <th key={h} className="bg-navy text-white px-5 py-3.5 text-left text-[10px] font-bold tracking-[.12em] uppercase">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {budgetRows.map((row, i) => (
                    <tr key={i} className={`${i % 2 === 0 ? 'bg-white' : 'bg-cream/30'} hover:bg-cream/50 transition-colors`}>
                      {row.map((cell, j) => (
                        <td key={j} className={`px-5 py-3 border-b border-black/[.05] ${
                          j === 1 ? 'font-semibold text-navy text-right font-mono' : 'text-black/60'
                        }`}>
                          {j === 2 ? (
                            <span
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold text-white"
                              style={{ background: axeColors[cell] || '#666' }}
                            >
                              {cell}
                            </span>
                          ) : (
                            <EditableText storageKey={`budget-row-${colFields[j]}-${i}`} defaultValue={cell} tag="span" />
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                  {/* Total row */}
                  <tr className="bg-navy/[.04]">
                    <td className="px-5 py-3.5 font-bold text-navy text-[14px]">TOTAL</td>
                    <td className="px-5 py-3.5 font-bold text-navy text-right text-[14px] font-mono">
                      {total.toLocaleString('fr-FR')}
                    </td>
                    <td colSpan={2} className="px-5 py-3.5 text-black/35 text-[12px]">
                      ~ {Math.round(total / 655.957).toLocaleString('fr-FR')} EUR
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* KPIs */}
          <div>
            <div className="flex items-center gap-2 text-[9px] font-bold tracking-[.2em] uppercase text-gold mb-4 pb-2 border-b border-gold/20">
              <TrendingUp size={13} />
              KPIs & Objectifs ROI
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {kpis.map((k, kIndex) => (
                <div key={k.title} className="relative bg-gradient-to-br from-cream/50 to-white rounded-xl p-5 border border-black/[.04] hover:shadow-sm transition-shadow overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-gold rounded-l-xl" />
                  <EditableText storageKey={`budget-kpi-title-${kIndex}`} defaultValue={k.title} className="text-[10px] font-bold text-black/40 tracking-wider uppercase mb-2" tag="div" />
                  <EditableText storageKey={`budget-kpi-val-${kIndex}`} defaultValue={k.val} className="text-[18px] font-semibold text-navy mb-1.5 font-cormorant" tag="div" />
                  <EditableText storageKey={`budget-kpi-target-${kIndex}`} defaultValue={k.target} className="text-[11px] text-black/35 flex items-center gap-1" tag="div" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Budget;
