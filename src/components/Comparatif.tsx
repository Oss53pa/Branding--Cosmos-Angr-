import React from 'react';
import { Star } from 'lucide-react';

const rows = [
  ['Differenciation vs Yopougon', 'Moyenne', 'Forte', 'Forte', 'Tres forte'],
  ['Justification loyers premium', 'Difficile', 'Facile', 'Facile', 'Facile'],
  ['Accessibilite percue (FG)', 'Tres haute', 'Moyenne', 'Haute', 'Haute'],
  ["Risque d'alienation cible", 'Faible', 'Eleve', 'Faible', 'Faible'],
  ['Ambition long terme', 'Limitee', 'Maximale', 'Maximale', 'Maximale'],
  ['Faisabilite court terme', 'Elevee', 'Moyenne', 'Elevee', 'Moyenne'],
  ['Coherence avec enseignes', 'Bonne', 'Tres bonne', 'Tres bonne', 'Tres bonne'],
  ['Identite visuelle unique', 'Moderee', 'Forte', 'Forte', 'Inimitable'],
  ['Barriere a la copie', 'Faible', 'Moyenne', 'Moyenne', 'Naturelle (5 ans)'],
  ['Statut', 'Option', 'Option', 'Option', 'Option'],
];

const colColors = ['', '#4A7558', '#0D1B4B', '#C9943A', '#898D5D'];

const Comparatif: React.FC = () => (
  <div id="comparatif" className="px-4 sm:px-8 lg:px-[72px] pb-16">
    <div className="bg-white rounded-2xl border border-black/[.06] overflow-hidden shadow-[0_2px_20px_rgba(0,0,0,.04)]">
      {/* Header */}
      <div className="relative px-8 py-8 bg-gradient-to-br from-navy via-[#16213e] to-navy overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_50%,rgba(201,148,58,.08)_0%,transparent_60%)]" />
        <div className="relative z-10">
          <div className="text-[9px] font-bold tracking-[.2em] uppercase text-gold/70 mb-2">
            Livrable 1.3
          </div>
          <div className="font-cormorant text-[30px] text-white font-light">
            Comparatif strategique A vs B vs C vs D
          </div>
          <div className="text-[11px] text-white/35 mt-1.5">
            Forces . Risques . Potentiel . Recommandation
          </div>
        </div>
      </div>

      <div className="p-8">
        <div className="overflow-x-auto rounded-xl border border-black/[.06]">
          <table className="w-full border-collapse text-[13px]">
            <thead>
              <tr>
                {['Critere', 'A — Proximite', 'B — Destination', 'C — Hybride', 'D — Nature'].map((h, j) => (
                  <th
                    key={h}
                    className="px-5 py-4 text-left text-[10px] font-bold tracking-[.12em] uppercase text-white"
                    style={{ background: j === 0 ? '#1a1a2e' : colColors[j] }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => {
                const isLast = i === rows.length - 1;
                return (
                  <tr
                    key={i}
                    className={`${i % 2 === 0 ? 'bg-white' : 'bg-cream/30'} ${isLast ? 'font-semibold' : ''} hover:bg-cream/50 transition-colors`}
                  >
                    {row.map((cell, j) => (
                      <td
                        key={j}
                        className={`px-5 py-3.5 border-b border-black/[.05] ${
                          j === 0 ? 'text-navy font-medium' : 'text-black/60'
                        } ${isLast ? 'font-medium' : ''}`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
);

export default Comparatif;
