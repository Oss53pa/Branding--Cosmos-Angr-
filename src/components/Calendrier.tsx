import React from 'react';
import EditableText from './EditableText';

const timeline = [
  { date: 'CETTE SEMAINE — 07/03', title: 'Étape 1 — Stratégie & plateforme de marque', desc: '4 scénarios complets (A, B, C, D), cohérents, prêts à être testés. Document EXCO.', active: true },
  { date: 'SEMAINE DU 09/03', title: 'Étape 2 — Brand Book draft 4 pistes', desc: 'Directions artistiques A, B, C, D + brief opérationnel pour Fernand.', active: false },
  { date: 'SEMAINE DU 09/03', title: 'Étape 3 — Protocole FG v2.1 complet', desc: 'Finalisation protocole + lancement recrutement agence terrain immédiatement.', active: false },
  { date: '20 — 25/03', title: 'Focus Group — Sessions terrain', desc: 'Recrutement à lancer dès maintenant. 3 groupes — profils Cocody/Angré/2 Plateaux CSP+.', active: false },
  { date: 'SEMAINE DU 23/03', title: 'Étape 4 — Plan marketing complet', desc: 'Post-FG. Budget, business case, plan digital, calendrier éditorial.', active: false },
  { date: 'À PARTIR DU 27/03', title: 'Charte graphique — Démarrage avec Fernand', desc: 'Après arbitrage Focus Group. Identité visuelle finale, système de signalétique.', active: false },
  { date: '16/10/2026', title: 'Soft Opening Cosmos Angré', desc: 'Ouverture progressive avec les enseignes prêtes.', active: false },
  { date: '16/11/2026', title: 'Inauguration officielle', desc: "Événement d'inauguration — présence médias, partenaires institutionnels, VIP.", active: false },
];

const Calendrier: React.FC = () => (
  <div id="calendrier" className="px-4 sm:px-8 lg:px-[72px] py-16 bg-gradient-to-b from-white to-cream">
    <div className="flex items-center gap-3 mb-2.5">
      <div className="w-8 h-px bg-gold/60" />
      <span className="text-[9px] font-bold tracking-[.22em] uppercase text-gold">Pilotage</span>
    </div>
    <div className="font-cormorant text-[42px] font-light text-navy mb-2 leading-tight">
      <EditableText storageKey="calendrier-title" defaultValue="Calendrier cible" tag="span" />
    </div>
    <div className="text-[14px] text-black/40 mb-10 leading-relaxed max-w-[640px]">
      <EditableText storageKey="calendrier-desc" defaultValue="Chemin critique vers l'inauguration du 16 novembre 2026." tag="span" multiline />
    </div>

    <div className="relative pl-10">
      {/* Timeline line */}
      <div className="absolute left-[14px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-gold via-gold/40 to-gold/10 rounded-full" />

      {timeline.map((t, i) => {
        const isLast = i === timeline.length - 1;
        const isMilestone = i >= 6;

        return (
          <div key={i} className="relative mb-6 last:mb-0 group">
            {/* Dot */}
            <div className={`absolute -left-10 top-1 flex items-center justify-center ${
              isMilestone ? 'w-7 h-7 -ml-[6px]' : 'w-5 h-5 -ml-[2px]'
            }`}>
              {isMilestone ? (
                <div className="w-7 h-7 rounded-full bg-gold shadow-[0_0_0_4px_rgba(201,148,58,.15)] flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-white" />
                </div>
              ) : t.active ? (
                <div className="w-5 h-5 rounded-full bg-gold shadow-[0_0_0_4px_rgba(201,148,58,.12)] flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                </div>
              ) : (
                <div className="w-3.5 h-3.5 rounded-full bg-white border-2 border-gold/40 group-hover:border-gold transition-colors" />
              )}
            </div>

            {/* Content card */}
            <div className={`rounded-xl p-4 transition-all ${
              isMilestone
                ? 'bg-gradient-to-r from-navy to-[#16213e] text-white shadow-lg'
                : t.active
                  ? 'bg-white border border-gold/20 shadow-sm'
                  : 'bg-white/60 border border-black/[.05] hover:bg-white hover:shadow-sm'
            }`}>
              <div className={`text-[10px] font-bold tracking-[.12em] uppercase mb-1.5 ${
                isMilestone ? 'text-gold' : 'text-gold'
              }`}>
                {t.date}
              </div>
              <div className={`text-[14px] font-semibold mb-1 ${
                isMilestone ? 'text-white' : 'text-navy'
              }`}>
                <EditableText storageKey={`calendrier-event-title-${i}`} defaultValue={t.title} tag="span" />
              </div>
              <div className={`text-[12px] leading-relaxed ${
                isMilestone ? 'text-white/50' : 'text-black/40'
              }`}>
                <EditableText storageKey={`calendrier-event-desc-${i}`} defaultValue={t.desc} tag="span" multiline />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

export default Calendrier;
