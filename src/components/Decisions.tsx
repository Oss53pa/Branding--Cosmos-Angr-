import React from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import EditableText from './EditableText';

const decisions = [
  { confirmed: true, text: '4 scénarios testés au Focus Group (A, B, C, D)' },
  { confirmed: true, text: 'Scénario C = L\u2019Exception Naturelle (pas simple compromis)' },
  { confirmed: true, text: 'Scénario D = Nature Contemporaine — identité végétale unique, barrière naturelle 5 ans' },
  { confirmed: true, text: 'Analogies Sofitel/Novotel/Apple Store = usage interne uniquement' },
  { confirmed: true, text: 'Kiabi, Gémo, Tecno = enseignes aspirationnelles contexte ivoirien' },
  { confirmed: true, text: 'Zino = équivalent Sephora — ancre beauté/parfumerie premium' },
  { confirmed: true, text: 'Cinéma confirmé — ancre destination, 0 concurrent zone primaire' },
  { confirmed: true, text: 'Clinique confirmée — différenciateur mixed-use unique marché' },
  { confirmed: true, text: 'Bardage bronze — contrainte fixe façade, scénario 2' },
  { confirmed: false, text: 'Restaurant gastronomique — en cours de négociation' },
  { confirmed: false, text: 'FNAC ou équivalent culturel — en cours de discussion' },
];

const Decisions: React.FC = () => (
  <div id="decisions" className="px-4 sm:px-8 lg:px-[72px] py-16 bg-white">
    <div className="flex items-center gap-3 mb-2.5">
      <div className="w-8 h-px bg-gold/60" />
      <span className="text-[9px] font-bold tracking-[.22em] uppercase text-gold">
        Gouvernance
      </span>
    </div>
    <div className="font-cormorant text-[42px] font-light text-navy mb-2 leading-tight">
      Décisions actées
    </div>
    <div className="text-[14px] text-black/40 mb-10 leading-relaxed max-w-[640px]">
      Points non négociables — valeurs fixes à intégrer dans tous les livrables.
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {decisions.map((d, i) => (
        <div
          key={i}
          className={`relative flex items-start gap-3.5 p-4.5 rounded-xl border transition-all hover:shadow-sm ${
            d.confirmed
              ? 'bg-emerald-50/50 border-emerald-200/50 hover:border-emerald-300/60'
              : 'bg-amber-50/50 border-amber-200/50 hover:border-amber-300/60'
          }`}
          style={{ padding: '18px' }}
        >
          {d.confirmed ? (
            <CheckCircle2 size={18} className="text-emerald-500 flex-shrink-0 mt-0.5" />
          ) : (
            <AlertCircle size={18} className="text-amber-500 flex-shrink-0 mt-0.5" />
          )}
          <EditableText
            storageKey={`decision-${i}`}
            defaultValue={d.text}
            tag="span"
            className={`text-[13px] leading-relaxed ${
              d.confirmed ? 'text-black/70' : 'text-amber-800/70'
            }`}
          />
          {!d.confirmed && (
            <span className="absolute top-3 right-3 text-[8px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-amber-100 text-amber-600">
              En cours
            </span>
          )}
        </div>
      ))}
    </div>
  </div>
);

export default Decisions;
