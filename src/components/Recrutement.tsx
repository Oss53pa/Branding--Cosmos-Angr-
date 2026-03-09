import React from 'react';
import { Calendar, Gift } from 'lucide-react';
import EditableText from './EditableText';

const timelineData = [
  ['Immediatement', 'Brief agence de recrutement terrain', 'Pame'],
  ['10/03', 'Validation profils recrutes', 'Pame + Agence'],
  ['14/03', 'Confirmation des 24 participants (8x3)', 'Agence'],
  ['17/03', 'Envoi stimuli a moderateur', 'Pame'],
  ['20-25/03', 'Sessions terrain', 'Moderateur + Agence'],
  ['28/03', 'Rapport agence terrain', 'Agence'],
];

const incentives = [
  { title: 'Compensation financiere', val: '15 000 — 25 000 FCFA par participant selon profil' },
  { title: "Bon d'achat Cosmos", val: "Bon de 10 000 FCFA utilisable a l'ouverture" },
  { title: 'Invitation inauguration', val: 'Invitation nominative soiree inauguration 16/11' },
];

const Recrutement: React.FC = () => (
  <div id="recrutement" className="px-4 sm:px-8 lg:px-[72px] pb-16">
    <div className="bg-white rounded-2xl border border-black/[.06] overflow-hidden shadow-[0_2px_20px_rgba(0,0,0,.04)]">
      {/* Header */}
      <div className="relative px-8 py-8 bg-gradient-to-br from-navy via-[#16213e] to-navy overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(200,169,110,.08)_0%,transparent_60%)]" />
        <div className="relative z-10">
          <div className="text-[9px] font-bold tracking-[.2em] uppercase text-gold/70 mb-2">Livrable 3.2</div>
          <div className="font-cormorant text-[30px] text-white font-light">
            <EditableText storageKey="recrutement-title" defaultValue="Recrutement & Terrain" tag="span" />
          </div>
          <div className="text-[11px] text-white/35 mt-1.5">
            <EditableText storageKey="recrutement-subtitle" defaultValue="Brief agence . Profils . Incentives . Timeline" tag="span" />
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Timeline */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-[9px] font-bold tracking-[.2em] uppercase text-gold mb-4 pb-2 border-b border-gold/20">
            <Calendar size={13} />
            Timeline recrutement
          </div>
          <div className="overflow-x-auto rounded-xl border border-black/[.06]">
            <table className="w-full border-collapse text-[13px]">
              <thead>
                <tr>
                  {['Date', 'Action', 'Responsable'].map((h) => (
                    <th key={h} className="bg-navy text-white px-5 py-3.5 text-left text-[10px] font-bold tracking-[.12em] uppercase">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timelineData.map((row, i) => (
                  <tr key={i} className={`${i % 2 === 0 ? 'bg-white' : 'bg-cream/30'} hover:bg-cream/50 transition-colors`}>
                    {row.map((cell, j) => (
                      <td key={j} className={`px-5 py-3.5 border-b border-black/[.05] ${j === 0 ? 'font-semibold text-navy' : 'text-black/60'}`}>
                        <EditableText storageKey={`recrutement-timeline-${i}-${j}`} defaultValue={cell} tag="span" />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Incentives */}
        <div>
          <div className="flex items-center gap-2 text-[9px] font-bold tracking-[.2em] uppercase text-gold mb-4 pb-2 border-b border-gold/20">
            <Gift size={13} />
            Incentives recommandees
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {incentives.map((inc, index) => (
              <div key={inc.title} className="relative bg-gradient-to-br from-cream/50 to-white rounded-xl p-5 border border-black/[.04] hover:shadow-sm transition-shadow overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-gold rounded-l-xl" />
                <div className="text-[12px] font-bold text-navy mb-2">
                  <EditableText storageKey={`recrutement-incentive-title-${index}`} defaultValue={inc.title} tag="span" />
                </div>
                <div className="text-[12px] text-black/45 leading-relaxed">
                  <EditableText storageKey={`recrutement-incentive-desc-${index}`} defaultValue={inc.val} tag="span" multiline />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Recrutement;
