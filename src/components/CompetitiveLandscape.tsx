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
  { name: 'Cosmos Angré', pos: 'Premium lifestyle mixed-use', cible: 'CSP+ Angré / Cocody', exp: 'Immersive, scénarisée', surface: '—', enseignes: 'Sélection premium curatée', forces: 'Branding unique, UX premium, architecture signature', isCosmos: true },
  { name: 'Cosmos Yopougon', pos: '« Le Paradis des Prix »', cible: 'Classe populaire/moyenne (2M hab.)', exp: 'Standard international', surface: '14 000 m² GLA', enseignes: 'Carrefour, Burger King, Majestic Cinéma', forces: 'Seul mall moderne de Yopougon, 4M visiteurs/an', isCosmos: false },
  { name: 'PlaYce Marcory', pos: 'Grande distribution moderne', cible: 'Masse urbaine sud Abidjan', exp: 'Fonctionnelle', surface: '20 000 m²', enseignes: 'Carrefour hyper (3 200 m²), 55 boutiques, Burger King', forces: 'Prix, volume, 1er Burger King d\'Afrique de l\'Ouest', isCosmos: false },
  { name: 'PlaYce Palmeraie', pos: 'Mall de proximité Cocody', cible: 'CSP moyen-haut Cocody Riviera', exp: 'Standard améliorée', surface: '29 000 m²', enseignes: 'Carrefour Market, Jules, San Marina, Brioche Dorée', forces: 'Localisation Cocody, marques françaises (CFAO)', isCosmos: false },
  { name: 'Abidjan Mall', pos: 'Loisirs & shopping familial', cible: 'Familles classe moyenne Cocody', exp: 'Divertissement', surface: '35 000 m²', enseignes: '100+ boutiques, bowling, ciné 9D, patinoire, laser', forces: 'Plus grande surface, offre loisirs la plus complète', isCosmos: false },
  { name: 'Cap Sud', pos: 'Proximité historique', cible: 'Résidents Marcory Zone 4', exp: 'Basique', surface: '20 000 m²', enseignes: 'Hyper Hayat, 95 boutiques', forces: 'Ancienneté (2000), habitudes de quartier', isCosmos: false },
  { name: 'Cap Nord', pos: 'Petit mall européanisé', cible: 'Expatriés / CSP+ Cocody Riviera', exp: 'Basique-moyenne', surface: '4 700 m²', enseignes: 'Casino, Fnac, Celio, Yves Rocher (17 boutiques)', forces: 'Enseignes françaises, proximité Riviera', isCosmos: false },
  { name: 'Prima Center', pos: 'Populaire polyvalent', cible: 'Marcory populaire (2 000 pers/jour)', exp: 'Basique', surface: '16 000 m²', enseignes: 'Hyper Casino, 56 boutiques, cinéma', forces: 'Prix très compétitifs, ouvert jusqu\'à minuit', isCosmos: false },
];

/* Matrice : positions réalistes basées sur le positionnement réel
   X = Fonctionnel (gauche) → Expérientiel (droite)
   Y = Accessible (bas) → Premium (haut) */
const matrixDots: { name: string; x: number; y: number; size: number; isCosmos?: boolean }[] = [
  { name: 'Cosmos Angré',     x: 82, y: 12, size: 16, isCosmos: true },
  { name: 'Cosmos Yopougon',  x: 52, y: 62, size: 10 },  // standard international mais accessible
  { name: 'PlaYce Marcory',   x: 25, y: 65, size: 11 },  // très fonctionnel, accessible
  { name: 'PlaYce Palmeraie', x: 35, y: 40, size: 10 },  // fonctionnel, mi-premium
  { name: 'Abidjan Mall',     x: 65, y: 45, size: 12 },  // expérientiel (loisirs), mi-gamme
  { name: 'Cap Sud',          x: 20, y: 72, size: 9 },   // très fonctionnel, très accessible
  { name: 'Cap Nord',         x: 28, y: 35, size: 8 },   // fonctionnel, assez premium (expats)
  { name: 'Prima Center',     x: 22, y: 78, size: 9 },   // fonctionnel, le plus accessible
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
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 9.5 }}>
          <thead>
            <tr style={{ background: `rgba(${ac.rgb},0.08)` }}>
              {['', 'Positionnement', 'Cible', 'Surface', 'Enseignes clés', 'Points forts'].map((h, i) => (
                <th key={i} style={{ padding: '12px 12px', textAlign: 'left', color: ac.main, fontSize: 8, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 700, borderBottom: `2px solid ${ac.main}` }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {competitors.map((c, i) => (
              <tr key={i} style={{ background: c.isCosmos ? `rgba(${ac.rgb},0.05)` : i % 2 === 0 ? '#fff' : '#fafaf8', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
                <td style={{ padding: '10px 12px', fontWeight: 700, color: c.isCosmos ? ac.main : '#1a1a2e', whiteSpace: 'nowrap', fontSize: 10 }}>
                  {c.isCosmos && <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: ac.main, marginRight: 6, verticalAlign: 'middle' }} />}
                  {c.name}
                </td>
                <td style={{ padding: '10px 12px', color: '#333', fontSize: 9.5 }}>{c.pos}</td>
                <td style={{ padding: '10px 12px', color: '#555', fontSize: 9 }}>{c.cible}</td>
                <td style={{ padding: '10px 12px', color: '#555', fontSize: 9, whiteSpace: 'nowrap' }}>{c.surface}</td>
                <td style={{ padding: '10px 12px', color: '#555', fontSize: 9 }}>{c.enseignes}</td>
                <td style={{ padding: '10px 12px', color: '#555', fontSize: 9 }}>{c.forces}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ═══ MATRICE DE POSITIONNEMENT — fond clair ═══ */}
      <div style={{ fontSize: 9, letterSpacing: 2, textTransform: 'uppercase', color: ac.main, fontWeight: 600, marginBottom: 16 }}>Matrice de positionnement</div>
      <div style={{ position: 'relative', width: '100%', height: 580, margin: '0 auto 40px', background: '#fafaf8', borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 4px 24px rgba(0,0,0,0.04)' }}>

        {/* Subtle grid */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.5, backgroundImage: `linear-gradient(rgba(${ac.rgb},0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(${ac.rgb},0.04) 1px, transparent 1px)`, backgroundSize: '48px 48px' }} />

        {/* Quadrant fills */}
        <div style={{ position: 'absolute', top: 0, right: 0, width: '50%', height: '50%', background: `rgba(${ac.rgb},0.06)`, borderBottomLeftRadius: 20 }} />
        <div style={{ position: 'absolute', top: 0, left: 0, width: '50%', height: '50%', background: 'rgba(0,0,0,0.01)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '50%', height: '50%', background: 'rgba(0,0,0,0.015)' }} />
        <div style={{ position: 'absolute', bottom: 0, right: 0, width: '50%', height: '50%', background: 'rgba(0,0,0,0.005)' }} />

        {/* Quadrant labels */}
        <div style={{ position: 'absolute', top: 20, right: 20, fontSize: 10, letterSpacing: 2, color: ac.main, opacity: 0.5, textTransform: 'uppercase', textAlign: 'right', lineHeight: 1.8, fontWeight: 700 }}>Premium<br />expérientiel</div>
        <div style={{ position: 'absolute', top: 20, left: 50, fontSize: 10, letterSpacing: 2, color: 'rgba(0,0,0,0.12)', textTransform: 'uppercase', lineHeight: 1.8 }}>Premium<br />fonctionnel</div>
        <div style={{ position: 'absolute', bottom: 20, left: 50, fontSize: 10, letterSpacing: 2, color: 'rgba(0,0,0,0.12)', textTransform: 'uppercase', lineHeight: 1.8 }}>Accessible<br />fonctionnel</div>
        <div style={{ position: 'absolute', bottom: 20, right: 20, fontSize: 10, letterSpacing: 2, color: 'rgba(0,0,0,0.12)', textTransform: 'uppercase', textAlign: 'right', lineHeight: 1.8 }}>Accessible<br />expérientiel</div>

        {/* Axes */}
        <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 2, background: `linear-gradient(180deg, rgba(${ac.rgb},0.08) 0%, rgba(${ac.rgb},0.18) 50%, rgba(${ac.rgb},0.08) 100%)` }} />
        <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 2, background: `linear-gradient(90deg, rgba(${ac.rgb},0.08) 0%, rgba(${ac.rgb},0.18) 50%, rgba(${ac.rgb},0.08) 100%)` }} />

        {/* Axis end labels */}
        <div style={{ position: 'absolute', top: 8, left: '50%', transform: 'translateX(-50%)', fontSize: 9, letterSpacing: 4, color: ac.main, opacity: 0.4, textTransform: 'uppercase', fontWeight: 700 }}>Premium</div>
        <div style={{ position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)', fontSize: 9, letterSpacing: 4, color: 'rgba(0,0,0,0.2)', textTransform: 'uppercase', fontWeight: 700 }}>Accessible</div>
        <div style={{ position: 'absolute', top: '50%', left: 14, transform: 'translateY(-50%) rotate(-90deg)', fontSize: 9, letterSpacing: 4, color: 'rgba(0,0,0,0.2)', textTransform: 'uppercase', fontWeight: 700 }}>Fonctionnel</div>
        <div style={{ position: 'absolute', top: '50%', right: 14, transform: 'translateY(-50%) rotate(90deg)', fontSize: 9, letterSpacing: 4, color: ac.main, opacity: 0.4, textTransform: 'uppercase', fontWeight: 700 }}>Expérientiel</div>

        {/* SVG connecting lines */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          {matrixDots.filter(d => !d.isCosmos).map((dot, i) => (
            <line key={i} x1={`${dot.x}%`} y1={`${dot.y}%`} x2="82%" y2="12%" stroke={`rgba(${ac.rgb},0.12)`} strokeWidth="1" strokeDasharray="4 6" />
          ))}
        </svg>

        {/* Competitor dots */}
        {matrixDots.filter(d => !d.isCosmos).map((dot, i) => (
          <div key={i} style={{ position: 'absolute', left: `${dot.x}%`, top: `${dot.y}%`, transform: 'translate(-50%,-50%)', zIndex: 2 }}>
            <div style={{ width: dot.size, height: dot.size, borderRadius: '50%', background: 'rgba(0,0,0,0.25)', margin: '0 auto 6px', border: '2px solid #fff', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }} />
            <div style={{ background: '#fff', borderRadius: 8, padding: '4px 10px', textAlign: 'center', whiteSpace: 'nowrap', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', border: '1px solid rgba(0,0,0,0.06)' }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: '#1a1a2e', letterSpacing: 0.3 }}>{dot.name}</div>
            </div>
          </div>
        ))}

        {/* ★ Cosmos Angré — Hero dot */}
        <div style={{ position: 'absolute', left: '82%', top: '12%', transform: 'translate(-50%,-50%)', zIndex: 3 }}>
          {/* Outer glow */}
          <div style={{ position: 'absolute', inset: -28, borderRadius: '50%', background: `radial-gradient(circle, rgba(${ac.rgb},0.12) 0%, transparent 70%)` }} />
          {/* Rings */}
          <div style={{ position: 'absolute', inset: -16, borderRadius: '50%', border: `1.5px solid rgba(${ac.rgb},0.1)` }} />
          <div style={{ position: 'absolute', inset: -8, borderRadius: '50%', border: `1.5px solid rgba(${ac.rgb},0.2)` }} />
          {/* Main dot */}
          <div style={{ width: 20, height: 20, borderRadius: '50%', background: `linear-gradient(135deg, ${ac.main}, #C9943A)`, margin: '0 auto', boxShadow: `0 4px 16px rgba(${ac.rgb},0.35)`, border: '2.5px solid #fff' }} />
          {/* Label card */}
          <div style={{ marginTop: 10, background: '#fff', border: `2px solid ${ac.main}`, borderRadius: 10, padding: '8px 16px', textAlign: 'center', whiteSpace: 'nowrap', boxShadow: `0 4px 16px rgba(${ac.rgb},0.15)` }}>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 14, fontWeight: 700, color: ac.main, letterSpacing: 0.5 }}>Cosmos Angré</div>
            <div style={{ fontSize: 8, color: '#999', letterSpacing: 2, textTransform: 'uppercase', marginTop: 2 }}>Premium lifestyle</div>
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
