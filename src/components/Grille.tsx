import React from 'react';
import { BarChart3 } from 'lucide-react';

const rows = [
  ['Preference scenario global', 'Vote a main levee + justification', '>= 60% -> scenario retenu'],
  ['Desirabilite signature', 'Classement 1-3 + verbatims', 'Signature #1 retenue si consensus >= 2 groupes'],
  ['Credibilite positioning', 'Echelle 1-5 par scenario', 'Score moyen >= 4 pour validation'],
  ['Intention de frequentation', 'Echelle 1-5 + frequence declaree', '>= 3.5 = potentiel confirme'],
  ['Resonance palette couleurs', 'Association libre + ranking', 'Palette #1 retenue si consensus >= 2 groupes'],
  ['Impact ancres (cinema, clinique)', 'Discussion guidee + scoring', 'Score >= 4 = ancre validee comme driver'],
  ['Perception prix / positionnement', 'Fourchette prix acceptable', 'Alignement avec grille de loyers cible'],
  ['Verbatims marquants', 'Analyse thematique qualitative', 'Top 10 verbatims pour plan marketing'],
];

const Grille: React.FC = () => (
  <div id="grille" className="px-4 sm:px-8 lg:px-[72px] pb-16">
    <div className="bg-white rounded-2xl border border-black/[.06] overflow-hidden shadow-[0_2px_20px_rgba(0,0,0,.04)]">
      {/* Header */}
      <div className="relative px-8 py-8 bg-gradient-to-br from-navy via-[#16213e] to-navy overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,rgba(200,169,110,.08)_0%,transparent_60%)]" />
        <div className="relative z-10">
          <div className="text-[9px] font-bold tracking-[.2em] uppercase text-gold/70 mb-2">Livrable 3.3</div>
          <div className="font-cormorant text-[30px] text-white font-light">Grille d'analyse & Scorecard</div>
          <div className="text-[11px] text-white/35 mt-1.5">Indicateurs de decision post-FG</div>
        </div>
      </div>

      <div className="p-8">
        <div className="flex items-center gap-2 text-[9px] font-bold tracking-[.2em] uppercase text-gold mb-4 pb-2 border-b border-gold/20">
          <BarChart3 size={13} />
          Matrice de decision
        </div>
        <div className="overflow-x-auto rounded-xl border border-black/[.06]">
          <table className="w-full border-collapse text-[13px]">
            <thead>
              <tr>
                {['Indicateur', 'Methode de mesure', 'Seuil decision'].map((h) => (
                  <th key={h} className="bg-navy text-white px-5 py-3.5 text-left text-[10px] font-bold tracking-[.12em] uppercase">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className={`${i % 2 === 0 ? 'bg-white' : 'bg-cream/30'} hover:bg-cream/50 transition-colors`}>
                  {row.map((cell, j) => (
                    <td key={j} className={`px-5 py-3.5 border-b border-black/[.05] ${
                      j === 0 ? 'font-medium text-navy' : j === 2 ? 'text-gold font-medium' : 'text-black/55'
                    }`}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
);

export default Grille;
