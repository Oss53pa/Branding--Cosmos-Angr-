import React from 'react';
import { Target, Users, MessageSquare, Palette, Lightbulb } from 'lucide-react';
import EditableText from './EditableText';

const objectives = [
  { title: 'Primaire', val: 'Identifier le scenario de positionnement le plus desirable et credible pour la cible CSP+ Cocody/Angre' },
  { title: 'Secondaire 1', val: 'Mesurer la resonance emotionnelle des 4 directions artistiques (couleurs, signatures, atmospheres)' },
  { title: 'Secondaire 2', val: 'Valider les ancres differenciantes (cinema, clinique, Zino) et leur poids dans la decision de frequentation' },
  { title: 'Secondaire 3', val: 'Identifier les noms de positionnement les plus impactants pour les 4 scenarios' },
];

const groups = [
  ['G1', 'Femmes 25-40 ans, CSP+, Cocody/2 Plateaux, actives', '8 personnes', '110 min'],
  ['G2', 'Hommes 30-50 ans, CSP+, dirigeants/cadres, Angre/Riviera', '8 personnes', '110 min'],
  ['G3', 'Mix 25-45 ans, familles avec enfants, CSP, Cocody/Adjame-Anono', '8 personnes', '110 min'],
];

const phaseIcons = [<Users size={15} />, <MessageSquare size={15} />, <Target size={15} />, <Palette size={15} />, <Lightbulb size={15} />];

const phases = [
  {
    title: 'Phase 1 — Introduction & cadrage',
    time: '15 min',
    questions: [
      'Presentez-vous et dites-nous : quel centre commercial vous frequentez le plus a Abidjan ? Pourquoi ?',
      'Qu\'est-ce qu\'un "centre commercial de qualite" signifie pour vous ? Donnez 3 mots.',
      'Avez-vous deja entendu parler de Cosmos Yopougon ? Quelle image vous en avez ?',
    ],
  },
  {
    title: 'Phase 2 — Exploration spontanee attentes',
    time: '20 min',
    questions: [
      "Si un nouveau grand centre commercial ouvrait pres de chez vous a Angre, qu'espereriez-vous y trouver absolument ?",
      'Qu\'est-ce qui ferait que vous vous diriez "je dois absolument y aller" vs "ce n\'est pas pour moi" ?',
      "Un cinema, une clinique, des bureaux, un restaurant gastronomique — qu'est-ce que vous inspirent ces elements dans un centre commercial ?",
    ],
  },
  {
    title: 'Phase 3 — Test des 4 scenarios',
    time: '50 min',
    questions: [
      '[Presenter stimuli Scenario A] — Premiere impression : ce centre vous correspond-il ? Pourquoi ?',
      "[Presenter stimuli Scenario B] — Est-ce que ce lieu vous donne envie d'y passer la journee ? Qu'est-ce qui vous attire ou vous freine ?",
      '[Presenter stimuli Scenario C] — Memes questions : premiere impression, envie, freins.',
      '[Presenter stimuli Scenario D — Nature Contemporaine] — Ce centre mise sur la vegetation et la pierre naturelle. Qu\'en pensez-vous ? Est-ce que ca change votre perception du premium ?',
      'Si vous deviez choisir entre ces 4 univers, lequel choisiriez-vous ? Pourquoi ?',
      'Quelle est la difference que vous percevez entre les 4 ? Laquelle correspond le plus a "votre niveau" ?',
    ],
  },
  {
    title: 'Phase 4 — Stimuli visuels & reactions',
    time: '20 min',
    questions: [
      '[Montrer palettes couleurs] — Quelle couleur evoque un endroit ou vous aimeriez faire du shopping ?',
      '[Tester les signatures] — Laquelle de ces phrases vous donne le plus envie de visiter ce centre ?',
      "La facade bronze doree — qu'est-ce qu'elle vous inspire a l'entree ?",
    ],
  },
  {
    title: 'Phase 5 — Synthese & projection',
    time: '15 min',
    questions: [
      "Si vous deviez donner un nom a ce centre commercial ideal, ce serait quoi ?",
      'A quelle frequence pensez-vous que vous iriez dans ce centre si c\'etait votre scenario prefere ?',
      "Qu'est-ce qui manque dans tout ce que vous avez vu pour que ce soit vraiment parfait ?",
    ],
  },
];

const Protocole: React.FC = () => (
  <div id="protocole" className="px-4 sm:px-8 lg:px-[72px] pb-16">
    <div className="bg-white rounded-2xl border border-black/[.06] overflow-hidden shadow-[0_2px_20px_rgba(0,0,0,.04)]">
      {/* Header */}
      <div className="relative px-8 py-8 bg-gradient-to-br from-navy via-[#16213e] to-navy overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_40%,rgba(200,169,110,.1)_0%,transparent_60%)]" />
        <div className="relative z-10">
          <div className="text-[9px] font-bold tracking-[.2em] uppercase text-gold/70 mb-2">
            Livrable 3.1
          </div>
          <div className="font-cormorant text-[30px] text-white font-light">
            <EditableText storageKey="protocole-title" defaultValue="Protocole Focus Group v2.1" tag="span" />
          </div>
          <div className="text-[11px] text-white/35 mt-1.5">
            <EditableText storageKey="protocole-subtitle" defaultValue="Guide de moderation complet — 3 groupes — 110 minutes" tag="span" />
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Objectifs */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-[9px] font-bold tracking-[.2em] uppercase text-gold mb-3 pb-2 border-b border-gold/20">
            <Target size={13} />
            Objectifs de recherche
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {objectives.map((o, index) => (
              <div key={o.title} className="bg-cream/50 rounded-xl p-4 border border-black/[.04] hover:shadow-sm transition-shadow" style={{ borderLeft: '3px solid #C8A96E' }}>
                <div className="text-[11px] font-bold text-navy mb-1.5">{o.title}</div>
                <div className="text-[12px] text-black/45 leading-relaxed">
                  <EditableText storageKey={`protocole-objective-${index}`} defaultValue={o.val} tag="span" multiline />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Design */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-[9px] font-bold tracking-[.2em] uppercase text-gold mb-3 pb-2 border-b border-gold/20">
            <Users size={13} />
            Design — 3 groupes x 110 minutes
          </div>
          <div className="overflow-x-auto rounded-xl border border-black/[.06]">
            <table className="w-full border-collapse text-[13px]">
              <thead>
                <tr>
                  {['Groupe', 'Profil', 'Taille', 'Duree'].map((h) => (
                    <th key={h} className="bg-navy text-white px-5 py-3.5 text-left text-[10px] font-bold tracking-[.12em] uppercase">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {groups.map((row, i) => (
                  <tr key={i} className={`${i % 2 === 0 ? 'bg-white' : 'bg-cream/30'} hover:bg-cream/50 transition-colors`}>
                    {row.map((cell, j) => (
                      <td key={j} className={`px-5 py-3.5 border-b border-black/[.05] ${j === 0 ? 'font-semibold text-navy' : 'text-black/60'}`}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Phases */}
        <div>
          <div className="flex items-center gap-2 text-[9px] font-bold tracking-[.2em] uppercase text-gold mb-4 pb-2 border-b border-gold/20">
            <MessageSquare size={13} />
            Guide de moderation — sequence
          </div>
          <div className="space-y-3">
            {phases.map((phase, phaseIndex) => (
              <div key={phase.title} className="rounded-xl border border-black/[.06] overflow-hidden hover:shadow-sm transition-shadow">
                {/* Phase header */}
                <div className="flex items-center justify-between px-5 py-3.5 bg-cream/40 border-b border-black/[.04]">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center text-gold">
                      {phaseIcons[phaseIndex]}
                    </div>
                    <div className="text-[14px] font-semibold text-navy">
                      <EditableText storageKey={`protocole-phase-title-${phaseIndex}`} defaultValue={phase.title} tag="span" />
                    </div>
                  </div>
                  <div className="text-[10px] text-gold font-bold bg-gold/10 px-3 py-1 rounded-full border border-gold/15">
                    {phase.time}
                  </div>
                </div>
                {/* Questions */}
                <div className="px-5 py-3">
                  {phase.questions.map((q, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 py-2.5 border-b border-black/[.03] last:border-0"
                    >
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-gold/10 text-gold text-[10px] font-bold flex items-center justify-center mt-0.5">
                        {i + 1}
                      </span>
                      <span className="text-[13px] text-black/60 leading-relaxed">
                        <EditableText storageKey={`protocole-phase-${phaseIndex}-question-${i}`} defaultValue={q} tag="span" multiline />
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Protocole;
