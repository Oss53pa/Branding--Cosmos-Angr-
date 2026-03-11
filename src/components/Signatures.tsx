import React from 'react';
import { Quote } from 'lucide-react';
import EditableText from './EditableText';

const scenarioSignatures = [
  {
    title: '"L\'excellence, chez vous"',
    val: 'Scenario A — premium de proximite. Accentue l\'ancrage local.',
    accent: '#4A7558',
  },
  {
    title: '"La destination Abidjan"',
    val: 'Scenario B — destination premium. Ambition regionale.',
    accent: '#0D1B4B',
  },
  {
    title: '"Votre monde. Votre standard."',
    val: "Scénario C — L'Exception Naturelle. Personnalisation + excellence.",
    accent: '#C9943A',
  },
];

const Signatures: React.FC = () => (
  <div id="signatures" className="px-4 sm:px-8 lg:px-[72px] pb-16">
    <div className="bg-white rounded-2xl border border-black/[.06] overflow-hidden shadow-[0_2px_20px_rgba(0,0,0,.04)]">
      {/* Header */}
      <div className="relative px-8 py-8 bg-gradient-to-br from-navy via-[#16213e] to-navy overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(201,148,58,.1)_0%,transparent_60%)]" />
        <div className="relative z-10">
          <div className="text-[9px] font-bold tracking-[.2em] uppercase text-gold/70 mb-2">
            Livrable 2.3
          </div>
          <div className="font-cormorant text-[30px] text-white font-light">
            <EditableText storageKey="signatures-title" defaultValue="Naming & Signatures" tag="span" />
          </div>
          <div className="text-[11px] text-white/35 mt-1.5">
            <EditableText storageKey="signatures-subtitle" defaultValue="5 signatures validees — 2 usages distincts" tag="span" />
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Signature permanente */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-[9px] font-bold tracking-[.2em] uppercase text-gold mb-4 pb-2 border-b border-gold/20">
            <Quote size={13} />
            Signature permanente — Facade, baux, site
          </div>
          <div className="bg-gradient-to-r from-navy to-[#16213e] rounded-xl p-8 text-center">
            <div className="font-cormorant text-[36px] text-white font-light italic">
              <EditableText storageKey="signatures-permanent-text" defaultValue={'"Un monde a part"'} tag="span" />
            </div>
            <div className="w-12 h-px bg-gold/40 mx-auto my-4" />
            <div className="text-[12px] text-white/35 leading-relaxed max-w-[480px] mx-auto">
              <EditableText storageKey="signatures-permanent-desc" defaultValue="Positionne le lieu. Traduction : Cosmos Angre n'est pas un centre commercial ordinaire — c'est une autre experience. Usage : facade, en-tete documents officiels, signaletique d'entree, site web en header." tag="span" multiline />
            </div>
          </div>
        </div>

        {/* Signature campagne */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-[9px] font-bold tracking-[.2em] uppercase text-gold mb-4 pb-2 border-b border-gold/20">
            <Quote size={13} />
            Signature campagne — Pub, reseaux, inauguration
          </div>
          <div className="bg-gradient-to-r from-[#3d2a12] to-[#5a3e1a] rounded-xl p-8 text-center">
            <div className="font-cormorant text-[36px] text-gold font-light italic">
              <EditableText storageKey="signatures-campagne-text" defaultValue={'"Vivez l\'exception"'} tag="span" />
            </div>
            <div className="w-12 h-px bg-gold/40 mx-auto my-4" />
            <div className="text-[12px] text-white/35 leading-relaxed max-w-[480px] mx-auto">
              <EditableText storageKey="signatures-campagne-desc" defaultValue="Invite a l'action. Traduction : venez, et vous vivrez quelque chose de different. Usage : campagnes publicitaires, stories Instagram, visuels evenement, SMS/push notifications." tag="span" multiline />
            </div>
          </div>
        </div>

        {/* 3 signatures complementaires */}
        <div>
          <div className="flex items-center gap-2 text-[9px] font-bold tracking-[.2em] uppercase text-gold mb-4 pb-2 border-b border-gold/20">
            3 signatures complementaires
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {scenarioSignatures.map((s, index) => (
              <div
                key={index}
                className="rounded-xl p-5 text-center border border-black/[.05] hover:shadow-sm transition-shadow"
                style={{ borderTop: `3px solid ${s.accent}` }}
              >
                <div className="font-cormorant text-[22px] font-light italic text-navy mb-3">
                  <EditableText storageKey={`signatures-comp-title-${index}`} defaultValue={s.title} tag="span" />
                </div>
                <div className="text-[11px] text-black/40 leading-relaxed">
                  <EditableText storageKey={`signatures-comp-desc-${index}`} defaultValue={s.val} tag="span" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Signatures;
