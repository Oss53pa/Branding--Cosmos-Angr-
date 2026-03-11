import React from 'react';
import { TrendingUp } from 'lucide-react';
import type { ScenarioKey } from './Scenarios';

const accents: Record<ScenarioKey, { main: string; rgb: string }> = {
  A: { main: '#4A7558', rgb: '74,117,88' },
  B: { main: '#0D1B4B', rgb: '13,27,75' },
  C: { main: '#C9943A', rgb: '201,148,58' },
  D: { main: '#898D5D', rgb: '137,141,93' },
};

const competitors = [
  { name: 'Cosmos Angré', pos: 'Premium lifestyle', cible: 'CSP+ Angré/Cocody', exp: 'Immersive, scénarisée', idVisuelle: 'Forte, cohérente', forces: 'Branding unique, UX premium', isCosmos: true },
  { name: 'PlaYce Marcory', pos: 'Grande distribution', cible: 'Masse urbaine', exp: 'Fonctionnelle', idVisuelle: 'Corporate, standard', forces: 'Prix, accessibilité, volume' },
  { name: 'Cap Sud', pos: 'Proximité commerce', cible: 'Quartier résidentiel', exp: 'Basique', idVisuelle: 'Faible', forces: 'Proximité géographique' },
  { name: 'Abidjan Mall', pos: 'Centre commercial généraliste', cible: 'Familles classe moyenne', exp: 'Standard', idVisuelle: 'Moyenne', forces: 'Taille, variété, notoriété' },
];

const advantages = [
  'Identité de marque premium unique à Abidjan — aucun concurrent n\'a investi autant dans le branding',
  'Expérience client scénarisée et immersive — chaque visite est conçue comme un parcours narratif',
  'Localisation stratégique Angré — quartier en forte croissance démographique et économique',
  'Design architectural différenciant — signature visuelle reconnaissable dès l\'extérieur',
  'Programme de fidélité expérientiel (vs transactionnel) — on fidélise par l\'émotion, pas le cashback',
];

export default function CompetitiveLandscape({ scenarioKey }: { scenarioKey: ScenarioKey }) {
  const ac = accents[scenarioKey];

  return (
    <section className="bg-white" id="smb-concurrence">
      <div className="eyebrow green">D3 · Concurrence</div>
      <h2 className="light">Positionnement concurrentiel</h2>
      <div className="sub">Benchmark Abidjan — où se situe Cosmos Angré dans le paysage retail</div>
      <div className="divider kaki" />

      {/* Tableau comparatif */}
      <div style={{ marginBottom: 40, overflow: 'hidden', borderRadius: 14, border: '1px solid rgba(0,0,0,0.08)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 10 }}>
          <thead>
            <tr style={{ background: '#1a1a2e' }}>
              {['', 'Positionnement', 'Cible', 'Expérience', 'Identité visuelle', 'Points forts'].map((h, i) => (
                <th key={i} style={{ padding: '14px 16px', textAlign: 'left', color: 'rgba(248,246,242,0.7)', fontSize: 8, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 600 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {competitors.map((c, i) => (
              <tr key={i} style={{ background: c.isCosmos ? `rgba(${ac.rgb},0.06)` : i % 2 === 0 ? '#fff' : 'rgba(0,0,0,0.015)', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                <td style={{ padding: '14px 16px', fontWeight: 700, color: c.isCosmos ? ac.main : '#1a1a2e', whiteSpace: 'nowrap' }}>
                  {c.isCosmos && <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: ac.main, marginRight: 8, verticalAlign: 'middle' }} />}
                  {c.name}
                </td>
                <td style={{ padding: '14px 16px', color: 'rgba(0,0,0,0.6)' }}>{c.pos}</td>
                <td style={{ padding: '14px 16px', color: 'rgba(0,0,0,0.6)' }}>{c.cible}</td>
                <td style={{ padding: '14px 16px', color: 'rgba(0,0,0,0.6)' }}>{c.exp}</td>
                <td style={{ padding: '14px 16px', color: 'rgba(0,0,0,0.6)' }}>{c.idVisuelle}</td>
                <td style={{ padding: '14px 16px', color: 'rgba(0,0,0,0.6)' }}>{c.forces}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Matrice de positionnement */}
      <div style={{ fontSize: 9, letterSpacing: 2, textTransform: 'uppercase', color: ac.main, fontWeight: 600, marginBottom: 16 }}>Matrice de positionnement</div>
      <div style={{ position: 'relative', width: '100%', maxWidth: 500, height: 360, margin: '0 auto 40px', background: '#fff', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 14, padding: 20 }}>
        {/* Axes */}
        <div style={{ position: 'absolute', left: '50%', top: 20, bottom: 20, width: 1, background: 'rgba(0,0,0,0.1)' }} />
        <div style={{ position: 'absolute', top: '50%', left: 20, right: 20, height: 1, background: 'rgba(0,0,0,0.1)' }} />
        {/* Labels axes */}
        <div style={{ position: 'absolute', top: 8, left: '50%', transform: 'translateX(-50%)', fontSize: 8, letterSpacing: 1, color: 'rgba(0,0,0,0.3)', textTransform: 'uppercase' }}>Premium</div>
        <div style={{ position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)', fontSize: 8, letterSpacing: 1, color: 'rgba(0,0,0,0.3)', textTransform: 'uppercase' }}>Accessible</div>
        <div style={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%) rotate(-90deg)', fontSize: 8, letterSpacing: 1, color: 'rgba(0,0,0,0.3)', textTransform: 'uppercase' }}>Fonctionnel</div>
        <div style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%) rotate(90deg)', fontSize: 8, letterSpacing: 1, color: 'rgba(0,0,0,0.3)', textTransform: 'uppercase' }}>Expérientiel</div>

        {/* Dots */}
        {[
          { name: 'Cosmos Angré', x: 78, y: 18, color: ac.main, size: 14, bold: true },
          { name: 'PlaYce', x: 25, y: 72, color: '#6b7280', size: 10, bold: false },
          { name: 'Cap Sud', x: 30, y: 60, color: '#6b7280', size: 10, bold: false },
          { name: 'Abidjan Mall', x: 55, y: 52, color: '#6b7280', size: 10, bold: false },
        ].map((dot, i) => (
          <div key={i} style={{ position: 'absolute', left: `${dot.x}%`, top: `${dot.y}%`, transform: 'translate(-50%,-50%)' }}>
            <div style={{ width: dot.size, height: dot.size, borderRadius: '50%', background: dot.color, margin: '0 auto 4px', boxShadow: dot.bold ? `0 0 12px ${dot.color}40` : 'none' }} />
            <div style={{ fontSize: 8, fontWeight: dot.bold ? 700 : 500, color: dot.color, textAlign: 'center', whiteSpace: 'nowrap' }}>{dot.name}</div>
          </div>
        ))}
      </div>

      {/* Avantages compétitifs */}
      <div style={{ fontSize: 9, letterSpacing: 2, textTransform: 'uppercase', color: ac.main, fontWeight: 600, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 6 }}>
        <TrendingUp size={12} /> Avantages compétitifs Cosmos Angré
      </div>
      <div style={{ display: 'grid', gap: 10 }}>
        {advantages.map((a, i) => (
          <div key={i} style={{ background: `rgba(${ac.rgb},0.04)`, border: `1px solid rgba(${ac.rgb},0.12)`, padding: '14px 20px', borderRadius: 10, fontSize: 11, color: '#1a1a2e', lineHeight: 1.6, display: 'flex', alignItems: 'flex-start', gap: 12 }}>
            <span style={{ width: 24, height: 24, borderRadius: '50%', background: `rgba(${ac.rgb},0.1)`, color: ac.main, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 11, flexShrink: 0 }}>{i + 1}</span>
            {a}
          </div>
        ))}
      </div>
    </section>
  );
}
