import React from 'react';
import { Image, Star } from 'lucide-react';

const boards = [
  {
    label: 'Moodboard Direction 1 — Classique premium',
    text: "Imaginez la double page d'un magazine architectural : photographie d'une galerie marchande en fin de journee, lumieres chaudes tamisees, sol en marbre creme, enseignes sobres en lettres dorees sur fond sombre. Une femme en tenue professionnelle marche seule dans une allee large — flou artistique, silhouette elegante. Pas de foule. Pas de bruit visuel. La typographie du titre de la page : \"Cosmos Angre\" en serif fine or mat sur fond bleu nuit. En bas de page, en tres petits caracteres : \"Un monde a part\". Le sentiment : entrer dans cet espace est une elevation silencieuse.",
    gradient: 'from-[#1a1a2e] to-[#16213e]',
    accent: '#C9943A',
  },
  {
    label: 'Moodboard Direction 2 — Premium de proximite',
    text: "Double page lumineuse et vivante : terrasse de restaurant interieur avec plantes vertes, lumiere naturelle filtree par une verriere, familles et jeunes professionnels en tenue decontractee premium. Les couleurs sont douces — vert sauge, lin, touches de cuivre sur les luminaires. Une enseigne \"Zino\" visible en arriere-plan, sobre et chic. Le sentiment : un samedi matin parfait, entre deux courses et un cafe de qualite. On est bien. On reviendra.",
    gradient: 'from-[#2C3E6B] to-[#3a5080]',
    accent: '#8FA888',
  },
  {
    label: "Moodboard Direction 3 — L'Exception Naturelle (recommandé)",
    text: "Diptyque : a gauche, la facade Cosmos Angre la nuit — bardade bronze illuminee, typographie en or mat sur bleu nuit, sobre et majestueuse. A droite, l'interieur en journee — lumiere chaude, vert sauge aux murs, familles dans l'allee centrale, cinema en fond avec son grand format. Deux images, une seule identite : \"habiller en Sofitel, accueillir en Novotel\". La signature \"Un monde a part\" apparait sur la facade. \"Vivez l'exception\" sur le visuel interieur campagne.",
    gradient: 'from-[#8B4A1A] to-[#B8724A]',
    accent: '#C9943A',
    isReco: true,
  },
];

const Moodboards: React.FC = () => (
  <div id="moodboards" className="px-4 sm:px-8 lg:px-[72px] pb-16">
    <div className="bg-white rounded-2xl border border-black/[.06] overflow-hidden shadow-[0_2px_20px_rgba(0,0,0,.04)]">
      {/* Header */}
      <div className="relative px-8 py-8 bg-gradient-to-br from-navy via-[#16213e] to-navy overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_40%_60%,rgba(201,148,58,.08)_0%,transparent_60%)]" />
        <div className="relative z-10">
          <div className="text-[9px] font-bold tracking-[.2em] uppercase text-gold/70 mb-2">
            Livrable 2.4
          </div>
          <div className="font-cormorant text-[30px] text-white font-light">
            Moodboards textuels
          </div>
          <div className="text-[11px] text-white/60 mt-1.5">
            Brief operationnel pour Fernand — descriptions visuelles precises
          </div>
        </div>
      </div>

      <div className="p-8 space-y-5">
        {boards.map((b) => (
          <div key={b.label} className="rounded-xl overflow-hidden border border-black/[.06] hover:shadow-md transition-shadow">
            {/* Moodboard visual header */}
            <div className={`relative bg-gradient-to-r ${b.gradient} px-6 py-5 overflow-hidden`}>
              {/* Decorative dots */}
              <div className="absolute inset-0 opacity-[.05]" style={{
                backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                backgroundSize: '20px 20px',
              }} />

              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center">
                    <Image size={18} className="text-white/70" />
                  </div>
                  <div className="text-[13px] font-semibold text-white">{b.label}</div>
                </div>
                {b.isReco && (
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-[9px] font-bold tracking-wider uppercase text-gold">
                    <Star size={10} />
                    Recommande
                  </span>
                )}
              </div>
            </div>

            {/* Text content */}
            <div className="px-6 py-5 bg-cream/20">
              <div className="text-[14px] text-black/60 leading-[1.9] italic">
                {b.text}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Moodboards;
