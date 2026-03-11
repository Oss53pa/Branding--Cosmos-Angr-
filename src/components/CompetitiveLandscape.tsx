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

      {/* Matrice de positionnement — Premium */}
      <div style={{ fontSize: 9, letterSpacing: 2, textTransform: 'uppercase', color: ac.main, fontWeight: 600, marginBottom: 16 }}>Matrice de positionnement</div>
      <div style={{ position: 'relative', width: '100%', maxWidth: 640, height: 480, margin: '0 auto 40px', background: '#1a1a2e', borderRadius: 20, padding: 0, overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}>
        {/* Background grid pattern */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        {/* Quadrant backgrounds */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '50%', height: '50%', background: 'rgba(255,255,255,0.015)' }} />
        <div style={{ position: 'absolute', top: 0, right: 0, width: '50%', height: '50%', background: `rgba(${ac.rgb},0.08)`, borderBottomLeftRadius: 0 }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '50%', height: '50%', background: 'rgba(255,255,255,0.01)' }} />
        <div style={{ position: 'absolute', bottom: 0, right: 0, width: '50%', height: '50%', background: 'rgba(255,255,255,0.02)' }} />

        {/* Quadrant labels */}
        <div style={{ position: 'absolute', top: 20, right: 20, fontSize: 8, letterSpacing: 2, color: `rgba(${ac.rgb},0.4)`, textTransform: 'uppercase', textAlign: 'right', lineHeight: 1.6 }}>Zone premium<br/>expérientielle</div>
        <div style={{ position: 'absolute', top: 20, left: 20, fontSize: 8, letterSpacing: 2, color: 'rgba(255,255,255,0.12)', textTransform: 'uppercase', lineHeight: 1.6 }}>Premium<br/>fonctionnel</div>
        <div style={{ position: 'absolute', bottom: 20, left: 20, fontSize: 8, letterSpacing: 2, color: 'rgba(255,255,255,0.12)', textTransform: 'uppercase', lineHeight: 1.6 }}>Accessible<br/>fonctionnel</div>
        <div style={{ position: 'absolute', bottom: 20, right: 20, fontSize: 8, letterSpacing: 2, color: 'rgba(255,255,255,0.12)', textTransform: 'uppercase', textAlign: 'right', lineHeight: 1.6 }}>Accessible<br/>expérientiel</div>

        {/* Axes */}
        <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 1, background: 'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.08) 100%)' }} />
        <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.08) 100%)' }} />

        {/* Axis labels with arrows */}
        <div style={{ position: 'absolute', top: '50%', left: 12, transform: 'translateY(-50%) rotate(-90deg)', fontSize: 7, letterSpacing: 3, color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', fontWeight: 600 }}>Fonctionnel</div>
        <div style={{ position: 'absolute', top: '50%', right: 12, transform: 'translateY(-50%) rotate(90deg)', fontSize: 7, letterSpacing: 3, color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', fontWeight: 600 }}>Expérientiel</div>
        <div style={{ position: 'absolute', top: 6, left: '50%', transform: 'translateX(-50%)', fontSize: 7, letterSpacing: 3, color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', fontWeight: 600 }}>Premium</div>
        <div style={{ position: 'absolute', bottom: 6, left: '50%', transform: 'translateX(-50%)', fontSize: 7, letterSpacing: 3, color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', fontWeight: 600 }}>Accessible</div>

        {/* Competitor dots */}
        {[
          { name: 'PlaYce Marcory', sub: 'Grande distribution', x: 25, y: 68, color: 'rgba(255,255,255,0.35)', size: 10 },
          { name: 'Cap Sud', sub: 'Proximité', x: 32, y: 58, color: 'rgba(255,255,255,0.35)', size: 10 },
          { name: 'Abidjan Mall', sub: 'Généraliste', x: 55, y: 52, color: 'rgba(255,255,255,0.45)', size: 12 },
        ].map((dot, i) => (
          <div key={i} style={{ position: 'absolute', left: `${dot.x}%`, top: `${dot.y}%`, transform: 'translate(-50%,-50%)' }}>
            <div style={{ width: dot.size, height: dot.size, borderRadius: '50%', background: dot.color, margin: '0 auto 6px', border: '1.5px solid rgba(255,255,255,0.15)' }} />
            <div style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
              <div style={{ fontSize: 8, fontWeight: 600, color: 'rgba(255,255,255,0.5)' }}>{dot.name}</div>
              <div style={{ fontSize: 7, color: 'rgba(255,255,255,0.25)' }}>{dot.sub}</div>
            </div>
          </div>
        ))}

        {/* Cosmos Angré — Hero dot */}
        <div style={{ position: 'absolute', left: '78%', top: '18%', transform: 'translate(-50%,-50%)' }}>
          {/* Glow rings */}
          <div style={{ position: 'absolute', inset: -20, borderRadius: '50%', background: `radial-gradient(circle, ${ac.main}20 0%, transparent 70%)` }} />
          <div style={{ position: 'absolute', inset: -12, borderRadius: '50%', border: `1px solid ${ac.main}15` }} />
          <div style={{ position: 'absolute', inset: -6, borderRadius: '50%', border: `1px solid ${ac.main}25` }} />
          {/* Main dot */}
          <div style={{ width: 18, height: 18, borderRadius: '50%', background: `linear-gradient(135deg, ${ac.main}, #C9943A)`, margin: '0 auto', boxShadow: `0 0 20px ${ac.main}50, 0 0 40px ${ac.main}20`, border: '2px solid rgba(255,255,255,0.3)' }} />
          {/* Label card */}
          <div style={{ marginTop: 10, background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '8px 14px', textAlign: 'center', whiteSpace: 'nowrap' }}>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 12, fontWeight: 600, color: '#C9943A' }}>Cosmos Angré</div>
            <div style={{ fontSize: 7, color: 'rgba(255,255,255,0.4)', letterSpacing: 1, textTransform: 'uppercase', marginTop: 2 }}>Premium lifestyle</div>
          </div>
        </div>

        {/* Connecting dashed line from competitors to Cosmos */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          <line x1="55%" y1="52%" x2="76%" y2="20%" stroke={`${ac.main}15`} strokeWidth="1" strokeDasharray="4 4" />
        </svg>
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
