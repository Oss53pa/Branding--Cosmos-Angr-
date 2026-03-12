import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';

const ac = { main: '#C9943A', rgb: '201,148,58' };

const competitors = [
  { name: 'Cosmos Angré', pos: 'Premium lifestyle mixed-use', cible: 'CSP++ Angré / Cocody', surface: '17 000+ m² (en construction)', enseignes: 'Sélection premium curatée, cinéma, lifestyle', forces: 'Espace blanc stratégique, aucun concurrent direct', isCosmos: true },
  { name: 'Diamond Center', pos: 'Lifestyle premium (nouvel entrant)', cible: 'CSP++ Cocody Riviera 4', surface: '2 000 m² (7 500 m² total)', enseignes: 'Kayser, Tsunami, Le Méchoui, Œnophile, Patchi', forces: 'Positionnement CSP++ assumé, ouverture déc. 2024', isCosmos: false },
  { name: 'Cap Sud', pos: 'Premium fonctionnel', cible: 'CSP+ Marcory Zone 4', surface: '15 000–20 700 m² · 95 enseignes', enseignes: 'Hugo Boss, Swarovski, Mont Blanc, Nespresso, FNAC, Guess', forces: 'Enseignes luxe les plus denses d\'Abidjan, primé 2019 & 2020', isCosmos: false },
  { name: 'Abidjan Mall', pos: 'Accessible expérientiel', cible: 'Familles classe moyenne Cocody', surface: '24 000 m² · 60–70 enseignes', enseignes: 'Boutiques africaines locales, Orca Land 7 000 m² (bowling, patinoire, laser)', forces: 'Plus grand espace loisirs, fort expérientiel familial', isCosmos: false },
  { name: 'Cosmos Yopougon', pos: 'Accessible · expérientiel modéré', cible: 'Classe populaire Yopougon (2M hab.)', surface: '17 000 m² · 41–62 enseignes', enseignes: 'Carrefour Market, Burger King, Majestic 3 salles', forces: 'Seul mall moderne Yopougon, 4M visiteurs/an', isCosmos: false },
  { name: 'PlaYce Palmeraie', pos: 'Accessible fonctionnel', cible: 'Classe moyenne émergente Cocody', surface: '29 000 m² · ~24 enseignes', enseignes: 'San Marina, Jules, Cache-Cache, Burger King, plus grand Carrefour d\'AOF', forces: 'Mass market assumé par CFAO, prix maîtrisés', isCosmos: false },
  { name: 'PlaYce Marcory', pos: 'Accessible fonctionnel', cible: 'Masse urbaine sud Abidjan', surface: '20 000 m² · 55 boutiques', enseignes: 'Carrefour hyper (3 200 m²), Club de Marques CFAO', forces: 'Prix, volume, territoire Marcory', isCosmos: false },
  { name: 'Prima Center', pos: 'Accessible fonctionnel', cible: 'Marcory populaire (2 000 pers/jour)', surface: '16 000 m² · 56 enseignes', enseignes: 'Apple, Samsung, Celio, Guess, Majestic cinéma, Hyper Casino', forces: 'Offre supérieure à Cap Nord, ouvert jusqu\'à minuit', isCosmos: false },
  { name: 'Cap Nord', pos: 'Proximité fonctionnel', cible: 'Résidents Cocody Riviera 3', surface: '1 900 m² galerie · 15 boutiques', enseignes: 'FNAC, Celio, Aldo, Yves Rocher, Casino', forces: 'Format proximité de quartier', isCosmos: false },
];

interface MatrixPoint {
  name: string;
  x: number;
  y: number;
  size: number;
  isCosmos?: boolean;
  isDiamond?: boolean;
  sub: string;
  tooltip: string[];
}

/* Positions calquées sur la matrice HTML de référence (source terrain mars 2026) */
const matrixDots: MatrixPoint[] = [
  { name: 'Cosmos Angré', x: 83, y: 10, size: 14, isCosmos: true, sub: 'Premium Lifestyle',
    tooltip: ['Surface : 17 000+ m² (en construction)', 'Territoire : Cocody Angré, CSP++', 'Offre : Mix premium, cinéma, lifestyle', 'Position : espace blanc stratégique, aucun concurrent direct confirmé.'] },
  { name: 'Diamond Center', x: 72, y: 22, size: 11, isDiamond: true, sub: 'Lifestyle Premium · 2024',
    tooltip: ['Ouverture : déc. 2024 · Riviera 4, Cocody', 'Surface : 2 000 m² commerciaux (7 500 m² total)', 'Enseignes : Kayser, Tsunami, Le Méchoui, Œnophile, Patchi', 'Seul concurrent récent en Premium Expérientiel. Taille limitée mais positionnement CSP++.'] },
  { name: 'Cap Sud', x: 28, y: 20, size: 9, sub: 'Premium Fonctionnel',
    tooltip: ['Surface : 15 000–20 700 m² · 95 enseignes', 'Localisation : Marcory', 'Enseignes : Hugo Boss, Swarovski, Mont Blanc, Nespresso, Patchi, FNAC, Guess, Levi\'s', '2nd centre le plus premium d\'Abidjan. Primé meilleur CC 2019 & 2020. Fort en mode/luxe, faible en expérientiel.'] },
  { name: 'Abidjan Mall', x: 74, y: 62, size: 9, sub: 'Accessible Expérientiel',
    tooltip: ['Surface : 24 000 m² · 60–70 enseignes', 'Localisation : Cocody Bonoumin', 'Point fort : Orca Land 7 000 m² (bowling, patinoire, laser game)', 'Classe moyenne Cocody. Zéro enseigne mode premium. Fort expérientiel familial.'] },
  { name: 'Cosmos Yopougon', x: 55, y: 70, size: 9, sub: 'Accessible · Expérientiel modéré',
    tooltip: ['Surface : 17 000 m² · 41–62 enseignes', 'Localisation : Yopougon Bel Air', 'Enseignes : Carrefour Market, Burger King, Majestic 3 salles', 'Conçu pour « démocratiser la consommation » à Yopougon. Accessible à tous.'] },
  { name: 'PlaYce Palmeraie', x: 38, y: 66, size: 9, sub: 'Accessible Fonctionnel',
    tooltip: ['Surface : 29 000 m² · ~24 enseignes', 'Localisation : Cocody Riviera Palmeraie', 'Enseignes : San Marina, Jules, Cache-Cache, Burger King', 'Mass market accessible assumé par CFAO. Extension 2024 : plus grand Carrefour d\'AOF.'] },
  { name: 'PlaYce Marcory', x: 30, y: 75, size: 9, sub: 'Accessible Fonctionnel',
    tooltip: ['Localisation : Marcory', 'Même Club de Marques CFAO que Palmeraie', 'Enseignes : Carrefour, marques CFAO', 'Format similaire à Palmeraie mais territoire moins premium.'] },
  { name: 'Prima Center', x: 22, y: 68, size: 9, sub: 'Accessible Fonctionnel',
    tooltip: ['Surface : ~16 000 m² · 56 enseignes', 'Localisation : Marcory Zone 4', 'Enseignes : Apple, Samsung, Celio, Guess, Majestic cinéma, Hyper Casino', 'Offre supérieure à Cap Nord. Bon niveau fonctionnel sans ambition premium.'] },
  { name: 'Cap Nord', x: 18, y: 58, size: 8, sub: 'Proximité Fonctionnel',
    tooltip: ['Surface : 4 700 m² total · 15 boutiques', 'Localisation : Riviera 3, Cocody', 'Enseignes : FNAC, Celio, Aldo, Yves Rocher, Casino', 'Format de proximité de quartier. 15 boutiques sur 1 900 m² de galerie.'] },
];

const advantages = [
  'Identité de marque premium unique à Abidjan — aucun concurrent n\'a investi autant dans le branding',
  'Expérience client scénarisée et immersive — chaque visite est conçue comme un parcours narratif',
  'Localisation stratégique Angré — quartier en forte croissance démographique et économique',
  'Design architectural différenciant — signature visuelle reconnaissable dès l\'extérieur',
  'Programme de fidélité expérientiel (vs transactionnel) — on fidélise par l\'émotion, pas le cashback',
];

export default function CompetitiveLandscape() {
  const [hoveredDot, setHoveredDot] = useState<string | null>(null);

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
                <td style={{ padding: '10px 12px', color: '#444', fontSize: 9 }}>{c.cible}</td>
                <td style={{ padding: '10px 12px', color: '#444', fontSize: 9, whiteSpace: 'nowrap' }}>{c.surface}</td>
                <td style={{ padding: '10px 12px', color: '#444', fontSize: 9 }}>{c.enseignes}</td>
                <td style={{ padding: '10px 12px', color: '#444', fontSize: 9 }}>{c.forces}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ═══ MATRICE DE POSITIONNEMENT ═══ */}
      <div style={{ fontSize: 9, letterSpacing: 2, textTransform: 'uppercase', color: ac.main, fontWeight: 600, marginBottom: 16 }}>Matrice de positionnement — Centres commerciaux Abidjan</div>

      <div style={{ position: 'relative', width: '100%', margin: '0 auto 20px' }}>
        {/* Axis labels outside */}
        <div style={{ textAlign: 'center', fontSize: 9, letterSpacing: 3, textTransform: 'uppercase', color: '#888', fontWeight: 600, marginBottom: 6 }}>Premium</div>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', fontSize: 9, letterSpacing: 3, textTransform: 'uppercase', color: '#888', fontWeight: 600, marginRight: 8 }}>Fonctionnel</div>

          {/* Matrix area */}
          <div style={{ position: 'relative', flex: 1, height: 560, background: '#f0ede6', border: '1px solid #ccc9be' }}>

            {/* Quadrant labels */}
            <div style={{ position: 'absolute', top: 16, left: 16, fontSize: 9, letterSpacing: 2, textTransform: 'uppercase', color: '#b0ac9e', lineHeight: 1.6, fontFamily: "'Cormorant Garamond',serif" }}>Premium<br />Fonctionnel</div>
            <div style={{ position: 'absolute', top: 16, right: 16, fontSize: 9, letterSpacing: 2, textTransform: 'uppercase', color: '#b0ac9e', textAlign: 'right', lineHeight: 1.6, fontFamily: "'Cormorant Garamond',serif" }}>Premium<br />Expérientiel</div>
            <div style={{ position: 'absolute', bottom: 16, left: 16, fontSize: 9, letterSpacing: 2, textTransform: 'uppercase', color: '#b0ac9e', lineHeight: 1.6, fontFamily: "'Cormorant Garamond',serif" }}>Accessible<br />Fonctionnel</div>
            <div style={{ position: 'absolute', bottom: 16, right: 16, fontSize: 9, letterSpacing: 2, textTransform: 'uppercase', color: '#b0ac9e', textAlign: 'right', lineHeight: 1.6, fontFamily: "'Cormorant Garamond',serif" }}>Accessible<br />Expérientiel</div>

            {/* Grid lines */}
            <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 1, background: '#d9d5cc' }} />
            <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 1, background: '#d9d5cc' }} />

            {/* All dots */}
            {matrixDots.map((dot, i) => {
              const isHovered = hoveredDot === dot.name;
              return (
                <div
                  key={i}
                  style={{ position: 'absolute', left: `${dot.x}%`, top: `${dot.y}%`, transform: 'translate(-50%,-50%)', zIndex: isHovered ? 20 : dot.isCosmos ? 10 : 2, cursor: 'pointer' }}
                  onMouseEnter={() => setHoveredDot(dot.name)}
                  onMouseLeave={() => setHoveredDot(null)}
                >
                  {/* Dot */}
                  <div style={{
                    width: dot.size,
                    height: dot.size,
                    borderRadius: '50%',
                    background: dot.isCosmos ? '#b5924c' : dot.isDiamond ? '#7a6a9a' : '#888',
                    margin: '0 auto',
                    boxShadow: dot.isCosmos ? '0 0 12px rgba(181,146,76,0.3)' : 'none',
                  }} />

                  {/* Label card */}
                  <div style={{
                    position: 'absolute',
                    left: 16,
                    top: -10,
                    background: '#fff',
                    border: dot.isCosmos ? '1.5px solid #b5924c' : dot.isDiamond ? '1px solid #7a6a9a' : '1px solid #ccc',
                    borderRadius: 4,
                    padding: '4px 10px',
                    whiteSpace: 'nowrap',
                    fontFamily: "'Cormorant Garamond',serif",
                  }}>
                    <div style={{ fontSize: 11, fontWeight: dot.isCosmos ? 700 : 400, color: dot.isCosmos ? '#333' : '#444' }}>{dot.name}</div>
                    <div style={{ fontSize: 8, letterSpacing: 1, textTransform: 'uppercase', color: dot.isCosmos ? '#b5924c' : dot.isDiamond ? '#7a6a9a' : '#999', marginTop: 1 }}>{dot.sub}</div>
                  </div>

                  {/* Tooltip on hover */}
                  {isHovered && (
                    <div style={{
                      position: 'absolute',
                      left: dot.x > 60 ? 'auto' : 16,
                      right: dot.x > 60 ? 16 : 'auto',
                      top: 24,
                      background: '#1a1a1a',
                      color: '#f0ede6',
                      padding: '12px 16px',
                      borderRadius: 8,
                      fontSize: 11,
                      lineHeight: 1.8,
                      maxWidth: 280,
                      zIndex: 100,
                      fontFamily: "'Cormorant Garamond',serif",
                      boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                    }}>
                      <strong style={{ fontSize: 13, color: '#d4b896', display: 'block', marginBottom: 4 }}>{dot.name}</strong>
                      {dot.tooltip.map((line, j) => (
                        <div key={j} style={{ color: j === dot.tooltip.length - 1 ? '#d4b896' : '#f0ede6', fontStyle: j === dot.tooltip.length - 1 ? 'italic' : 'normal' }}>{line}</div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div style={{ writingMode: 'vertical-lr', fontSize: 9, letterSpacing: 3, textTransform: 'uppercase', color: '#888', fontWeight: 600, marginLeft: 8 }}>Expérientiel</div>
        </div>

        <div style={{ textAlign: 'center', fontSize: 9, letterSpacing: 3, textTransform: 'uppercase', color: '#888', fontWeight: 600, marginTop: 6 }}>Accessible</div>
      </div>

      {/* Légende */}
      <div style={{ display: 'flex', gap: 24, fontSize: 10, color: '#666', letterSpacing: 1, textTransform: 'uppercase', alignItems: 'center', marginBottom: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><div style={{ width: 9, height: 9, borderRadius: '50%', background: '#b5924c' }} /> Cosmos Angré (cible)</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><div style={{ width: 9, height: 9, borderRadius: '50%', background: '#7a6a9a' }} /> Diamond Center (nouvel entrant)</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><div style={{ width: 9, height: 9, borderRadius: '50%', background: '#888' }} /> Concurrents existants</div>
        <span style={{ color: '#aaa' }}>· Survoler un point pour les détails</span>
      </div>
      <div style={{ fontSize: 10, color: '#888', fontStyle: 'italic', lineHeight: 1.6, marginBottom: 32 }}>
        Sources : données terrain vérifiées (Prosuma, CFAO Retail, Pikasso, Jeune Afrique, Financial Afrik, Petit Futé — mars 2026).
        Diamond Center intégré comme nouvel entrant Premium Expérientiel (ouverture déc. 2024, Riviera 4).
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
