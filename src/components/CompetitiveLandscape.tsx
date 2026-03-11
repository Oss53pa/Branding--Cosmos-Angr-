import React from 'react';
import { TrendingUp } from 'lucide-react';
import type { ScenarioKey } from './Scenarios';

const accents: Record<ScenarioKey, { main: string; rgb: string; dark: string; darkRgb: string; light: string; lightRgb: string }> = {
  A: { main: '#4A7558', rgb: '74,117,88', dark: '#1A1410', darkRgb: '26,20,16', light: '#F2EBDD', lightRgb: '242,235,221' },
  B: { main: '#0D1B4B', rgb: '13,27,75', dark: '#060E2A', darkRgb: '6,14,42', light: '#F2EBDD', lightRgb: '242,235,221' },
  C: { main: '#C9943A', rgb: '201,148,58', dark: '#2C1A0A', darkRgb: '44,26,10', light: '#F2EBDD', lightRgb: '242,235,221' },
  D: { main: '#898D5D', rgb: '137,141,93', dark: '#2A2C1A', darkRgb: '42,44,26', light: '#F2EBDD', lightRgb: '242,235,221' },
};

const competitors = [
  { name: 'Cosmos Angré', pos: 'Premium lifestyle', cible: 'CSP+ Angré/Cocody', exp: 'Immersive, scénarisée', idVisuelle: 'Forte, cohérente', forces: 'Branding unique, UX premium', isCosmos: true },
  { name: 'Cosmos Yopougon', pos: 'Mixed-use communautaire', cible: 'Familles Yopougon', exp: 'Fonctionnelle améliorée', idVisuelle: 'En construction', forces: 'Marque Cosmos, bassin populaire', isCosmos: false },
  { name: 'PlaYce Marcory', pos: 'Grande distribution', cible: 'Masse urbaine', exp: 'Fonctionnelle', idVisuelle: 'Corporate, standard', forces: 'Prix, accessibilité, volume', isCosmos: false },
  { name: 'PlaYce Palmeraie', pos: 'Grande distribution premium', cible: 'CSP moyen Cocody', exp: 'Standard améliorée', idVisuelle: 'Corporate', forces: 'Localisation Cocody, parking', isCosmos: false },
  { name: 'Cap Nord', pos: 'Centre commercial périphérique', cible: 'Abobo/Nord Abidjan', exp: 'Basique', idVisuelle: 'Faible', forces: 'Proximité zone nord', isCosmos: false },
  { name: 'Cap Sud', pos: 'Proximité commerce', cible: 'Quartier résidentiel', exp: 'Basique', idVisuelle: 'Faible', forces: 'Proximité géographique', isCosmos: false },
  { name: 'Prima Center', pos: 'Centre commercial local', cible: 'Classe moyenne', exp: 'Standard', idVisuelle: 'Faible', forces: 'Prix compétitifs', isCosmos: false },
  { name: 'Abidjan Mall', pos: 'Centre commercial généraliste', cible: 'Familles classe moyenne', exp: 'Standard', idVisuelle: 'Moyenne', forces: 'Taille, variété, notoriété', isCosmos: false },
];

const matrixDots: { name: string; x: number; y: number; size: number; isCosmos?: boolean }[] = [
  { name: 'Cosmos Angré', x: 80, y: 14, size: 16, isCosmos: true },
  { name: 'Cosmos Yopougon', x: 58, y: 38, size: 9 },
  { name: 'PlaYce Marcory', x: 22, y: 68, size: 10 },
  { name: 'PlaYce Palmeraie', x: 30, y: 48, size: 10 },
  { name: 'Cap Nord', x: 20, y: 75, size: 8 },
  { name: 'Cap Sud', x: 25, y: 62, size: 8 },
  { name: 'Prima Center', x: 32, y: 72, size: 8 },
  { name: 'Abidjan Mall', x: 48, y: 52, size: 11 },
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
            <tr style={{ background: ac.dark }}>
              {['', 'Positionnement', 'Cible', 'Expérience', 'ID visuelle', 'Points forts'].map((h, i) => (
                <th key={i} style={{ padding: '12px 14px', textAlign: 'left', color: `rgba(${ac.lightRgb},0.7)`, fontSize: 8, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 600 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {competitors.map((c, i) => (
              <tr key={i} style={{ background: c.isCosmos ? `rgba(${ac.rgb},0.06)` : i % 2 === 0 ? '#fff' : 'rgba(0,0,0,0.015)', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                <td style={{ padding: '11px 14px', fontWeight: 700, color: c.isCosmos ? ac.main : '#1a1a2e', whiteSpace: 'nowrap', fontSize: 10 }}>
                  {c.isCosmos && <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: ac.main, marginRight: 8, verticalAlign: 'middle' }} />}
                  {c.name}
                </td>
                <td style={{ padding: '11px 14px', color: 'rgba(0,0,0,0.6)', fontSize: 9.5 }}>{c.pos}</td>
                <td style={{ padding: '11px 14px', color: 'rgba(0,0,0,0.6)', fontSize: 9.5 }}>{c.cible}</td>
                <td style={{ padding: '11px 14px', color: 'rgba(0,0,0,0.6)', fontSize: 9.5 }}>{c.exp}</td>
                <td style={{ padding: '11px 14px', color: 'rgba(0,0,0,0.6)', fontSize: 9.5 }}>{c.idVisuelle}</td>
                <td style={{ padding: '11px 14px', color: 'rgba(0,0,0,0.6)', fontSize: 9.5 }}>{c.forces}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ═══ MATRICE DE POSITIONNEMENT ═══ */}
      <div style={{ fontSize: 9, letterSpacing: 2, textTransform: 'uppercase', color: ac.main, fontWeight: 600, marginBottom: 16 }}>Matrice de positionnement</div>
      <div style={{ position: 'relative', width: '100%', height: 560, margin: '0 auto 40px', background: ac.dark, borderRadius: 24, overflow: 'hidden', boxShadow: `0 24px 80px rgba(${ac.darkRgb},0.4)` }}>

        {/* Subtle grid */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.035, backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />

        {/* Quadrant fills */}
        <div style={{ position: 'absolute', top: 0, right: 0, width: '50%', height: '50%', background: `rgba(${ac.rgb},0.10)` }} />
        <div style={{ position: 'absolute', top: 0, left: 0, width: '50%', height: '50%', background: `rgba(${ac.rgb},0.03)` }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '50%', height: '50%', background: 'rgba(255,255,255,0.01)' }} />
        <div style={{ position: 'absolute', bottom: 0, right: 0, width: '50%', height: '50%', background: `rgba(${ac.rgb},0.02)` }} />

        {/* Quadrant labels */}
        <div style={{ position: 'absolute', top: 24, right: 24, fontSize: 9, letterSpacing: 2, color: ac.main, opacity: 0.6, textTransform: 'uppercase', textAlign: 'right', lineHeight: 1.8, fontWeight: 600 }}>Zone premium<br />expérientielle</div>
        <div style={{ position: 'absolute', top: 24, left: 24, fontSize: 9, letterSpacing: 2, color: `rgba(${ac.lightRgb},0.15)`, textTransform: 'uppercase', lineHeight: 1.8 }}>Premium<br />fonctionnel</div>
        <div style={{ position: 'absolute', bottom: 24, left: 24, fontSize: 9, letterSpacing: 2, color: `rgba(${ac.lightRgb},0.15)`, textTransform: 'uppercase', lineHeight: 1.8 }}>Accessible<br />fonctionnel</div>
        <div style={{ position: 'absolute', bottom: 24, right: 24, fontSize: 9, letterSpacing: 2, color: `rgba(${ac.lightRgb},0.15)`, textTransform: 'uppercase', textAlign: 'right', lineHeight: 1.8 }}>Accessible<br />expérientiel</div>

        {/* Axes — gradient lines */}
        <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 1, background: `linear-gradient(180deg, rgba(${ac.rgb},0.05) 0%, rgba(${ac.rgb},0.2) 50%, rgba(${ac.rgb},0.05) 100%)` }} />
        <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 1, background: `linear-gradient(90deg, rgba(${ac.rgb},0.05) 0%, rgba(${ac.rgb},0.2) 50%, rgba(${ac.rgb},0.05) 100%)` }} />

        {/* Axis end labels */}
        <div style={{ position: 'absolute', top: 8, left: '50%', transform: 'translateX(-50%)', fontSize: 8, letterSpacing: 4, color: `rgba(${ac.lightRgb},0.3)`, textTransform: 'uppercase', fontWeight: 700 }}>Premium</div>
        <div style={{ position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)', fontSize: 8, letterSpacing: 4, color: `rgba(${ac.lightRgb},0.3)`, textTransform: 'uppercase', fontWeight: 700 }}>Accessible</div>
        <div style={{ position: 'absolute', top: '50%', left: 14, transform: 'translateY(-50%) rotate(-90deg)', fontSize: 8, letterSpacing: 4, color: `rgba(${ac.lightRgb},0.3)`, textTransform: 'uppercase', fontWeight: 700 }}>Fonctionnel</div>
        <div style={{ position: 'absolute', top: '50%', right: 14, transform: 'translateY(-50%) rotate(90deg)', fontSize: 8, letterSpacing: 4, color: `rgba(${ac.lightRgb},0.3)`, textTransform: 'uppercase', fontWeight: 700 }}>Expérientiel</div>

        {/* SVG connecting lines */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          {matrixDots.filter(d => !d.isCosmos).map((dot, i) => (
            <line key={i} x1={`${dot.x}%`} y1={`${dot.y}%`} x2="80%" y2="14%" stroke={`rgba(${ac.rgb},0.08)`} strokeWidth="1" strokeDasharray="3 6" />
          ))}
        </svg>

        {/* Competitor dots */}
        {matrixDots.filter(d => !d.isCosmos).map((dot, i) => (
          <div key={i} style={{ position: 'absolute', left: `${dot.x}%`, top: `${dot.y}%`, transform: 'translate(-50%,-50%)', zIndex: 2 }}>
            <div style={{ width: dot.size, height: dot.size, borderRadius: '50%', background: `rgba(${ac.lightRgb},0.25)`, margin: '0 auto 6px', border: `1.5px solid rgba(${ac.lightRgb},0.12)`, boxShadow: `0 0 10px rgba(${ac.darkRgb},0.3)` }} />
            <div style={{ background: `rgba(${ac.darkRgb},0.6)`, backdropFilter: 'blur(4px)', borderRadius: 6, padding: '4px 10px', textAlign: 'center', whiteSpace: 'nowrap', border: `1px solid rgba(${ac.lightRgb},0.06)` }}>
              <div style={{ fontSize: 9, fontWeight: 600, color: `rgba(${ac.lightRgb},0.6)`, letterSpacing: 0.5 }}>{dot.name}</div>
            </div>
          </div>
        ))}

        {/* ★ Cosmos Angré — Hero dot */}
        <div style={{ position: 'absolute', left: '80%', top: '14%', transform: 'translate(-50%,-50%)', zIndex: 3 }}>
          {/* Outer glow */}
          <div style={{ position: 'absolute', inset: -32, borderRadius: '50%', background: `radial-gradient(circle, rgba(${ac.rgb},0.15) 0%, transparent 70%)` }} />
          {/* Pulse rings */}
          <div style={{ position: 'absolute', inset: -18, borderRadius: '50%', border: `1px solid rgba(${ac.rgb},0.08)` }} />
          <div style={{ position: 'absolute', inset: -10, borderRadius: '50%', border: `1px solid rgba(${ac.rgb},0.15)` }} />
          {/* Main dot */}
          <div style={{ width: 22, height: 22, borderRadius: '50%', background: `linear-gradient(135deg, ${ac.main}, #C9943A)`, margin: '0 auto', boxShadow: `0 0 24px rgba(${ac.rgb},0.4), 0 0 60px rgba(${ac.rgb},0.15)`, border: `2px solid rgba(${ac.lightRgb},0.35)` }} />
          {/* Label card */}
          <div style={{ marginTop: 12, background: `rgba(${ac.rgb},0.12)`, backdropFilter: 'blur(12px)', border: `1px solid rgba(${ac.rgb},0.25)`, borderRadius: 10, padding: '10px 18px', textAlign: 'center', whiteSpace: 'nowrap' }}>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 14, fontWeight: 700, color: '#C9943A', letterSpacing: 1 }}>Cosmos Angré</div>
            <div style={{ fontSize: 8, color: `rgba(${ac.lightRgb},0.5)`, letterSpacing: 2, textTransform: 'uppercase', marginTop: 3 }}>Premium lifestyle</div>
          </div>
        </div>
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
