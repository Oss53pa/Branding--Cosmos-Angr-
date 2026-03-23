import React, { useState } from 'react';

type Tab = 'pA' | 'pB' | 'pComp';

/* ═══════════════════════════════════════════════════
   IMAGES — Planche A  (Premium de Proximité)
   RDC · Galerie marchande lumineuse · Végétation
   Douceur aspirationnelle, familier & désirable
   ═══════════════════════════════════════════════════ */
const S = (f: string) => `/stimuli/${f}`;
const imgA = {
  hero: S('33b9e85b790370f74f586a8d2c0a92e2.jpg'),  // galerie marchande lumineuse, pendentifs, gens qui marchent, flux fluide
  v1: S('4da3a09e53de84e6f36caa9a4687a420.jpg'),    // food court végétalisé, banquettes courbes, tables rondes, plantes
  v2: S('dde4b6db2432b57f4278f86d564e5459.jpg'),    // Parfois boutique lifestyle, merchandising soigné, couleurs chaudes
  v3: S('c35b776df069bb3fcacc664da5407985.jpg'),    // terrasse lounge parasols, coussins, bois, plantes, matériaux naturels
  v4: S('f64763a8edef564fb4f19785c4205ed6.jpg'),    // corridor mall, assises confortables, plantes ZZ, boutiques en fond
};

/* ═══════════════════════════════════════════════════
   IMAGES — Planche B  (Destination Premium Mixed-Use)
   RDC · Impact architectural · Ambiance dramatique
   Fierté statutaire, rupture perceptive
   ═══════════════════════════════════════════════════ */
const imgB = {
  hero: S('546d07ca1920a3782ad0ca8359edef7f (1).jpg'),  // corridor architecturé bois/noir, plafond sculptural, mouvement flou, impact fort
  v1: S('336c396e5222222d850e2d3683bad7c0.jpg'),    // food hall sombre, chaises cannées, tables éclairées, plantes, ambiance nuit
  v2: S('44e9f035cfbba8ca31fb12055eaa79a0.jpg'),    // corridor premium IVORY, plafond sculptural noir, assise cuir cognac, plantes
  v3: S('f2f1c04450b201a1d948400f743c11a6.jpg'),    // Paulig Store, concept store cuivre/bois premium, merchandising haut de gamme
  v4: S('8066995f35e5b8675c062f170df0440b.jpg'),    // terrasse extérieure marbre, plantes, stores, mobilier premium
};

/* ═══════════════════════════════════════════════════
   PALETTES MATÉRIAUX
   ═══════════════════════════════════════════════════ */
const paletteA = [
  { color: '#2F5439', label: 'Vert profond' },
  { color: '#B8644A', label: 'Terracotta artisanale' },
  { color: '#8B6F47', label: 'Bronze patiné' },
  { color: '#2C1810', label: "Bois d'ébène" },
  { color: '#C4A96A', label: 'Raphia tressé' },
  { color: '#E8DCC8', label: 'Sol crème sablée' },
  { color: '#F5F0E8', label: 'Blanc cassé / crème' },
];

const paletteB = [
  { color: '#0A1628', label: 'Bleu nuit profond' },
  { color: '#B8924A', label: 'Or mat' },
  { color: '#E8E0D4', label: 'Marbre / pierre claire' },
  { color: '#2C1810', label: "Bois d'ébène" },
  { color: '#8B6F47', label: 'Bronze patiné' },
  { color: '#D4C9B0', label: 'Crème / or clair' },
];

/* ═══════════════════════════════════════════════════
   SIGNATURES RETENUES (3 par scénario)
   ═══════════════════════════════════════════════════ */
const signaturesA = [
  { sig: '"Le centre\nde vos envies"', sub: 'Signature 01 · Besoins & envies' },
  { sig: '"Le Paradis\nde vos envies"', sub: 'Signature 02 · Aspiration & désir' },
  { sig: '"Un air de paradis,\nchaque jour"', sub: 'Signature 03 · Quotidien sublimé' },
];

const signaturesB = [
  { sig: '"Un monde\nd\'exception"', sub: 'Signature 01 · Destination premium immersive' },
  { sig: '"L\'adresse qui\nchange tout"', sub: 'Signature 02 · Code de distinction' },
  { sig: '"Le paradis\ncommence ici"', sub: 'Signature 03 · Promesse immédiate' },
];

/* ─── Vignette labels ─── */
const vLabelsA = [
  'Espace restauration · terrasse intérieure',
  'Surface de vente · lifestyle',
  'Espace commun · assises lounge',
  'Détail architectural · matériaux',
];
const vLabelsB = [
  'Food hall · ambiance nocturne',
  'Corridor premium · mobilier signature',
  'Concept store · merchandising premium',
  'Terrasse · mobilier & végétation',
];

/* ═══════════════════════════════════════════════════════════════
   PLANCHE A — Scénario Premium de Proximité
   Fond : blanc cassé / crème — lumière naturelle — douceur
   ═══════════════════════════════════════════════════════════════ */
const PlancheA: React.FC<{ sigIdx: number }> = ({ sigIdx }) => {
  const s = signaturesA[sigIdx];
  const lines = s.sig.split('\n');
  const vignettes = [imgA.v1, imgA.v2, imgA.v3, imgA.v4];

  return (
    <div style={{
      background: '#F8F4EE',
      padding: '48px 56px',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      gap: 0,
      fontFamily: "'Inter', sans-serif",
      position: 'relative',
    }}>
      {/* Header discret */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 28, alignItems: 'baseline' }}>
        <span style={{ fontSize: 8, letterSpacing: 3, textTransform: 'uppercase', color: '#B8AA8C' }}>
          Stimulus A · Scénario Premium de Proximité · Planche {sigIdx + 1}/{signaturesA.length}
        </span>
        <span style={{ fontSize: 7.5, letterSpacing: 2, textTransform: 'uppercase', color: '#C4B9A0' }}>
          Cosmos Angré · Focus Group Mars 2026
        </span>
      </div>

      {/* ─── Corps principal : 3 colonnes ─── */}
      <div style={{ display: 'grid', gridTemplateColumns: '60% 1fr', gap: 24, flex: 1 }}>

        {/* ZONE 1 — Images principales (60%) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* Image principale — galerie marchande */}
          <div style={{
            borderRadius: 6,
            overflow: 'hidden',
            position: 'relative',
          }}>
            <img
              src={imgA.hero}
              alt="Galerie marchande lumineuse — lumière naturelle zénithale"
              style={{ width: '100%', height: 'auto', objectFit: 'contain', display: 'block' }}
            />
          </div>
          {/* Stories — boutique lifestyle */}
          <div style={{
            borderRadius: 6,
            overflow: 'hidden',
          }}>
            <img
              src={S('1b4769243df6198e2fd7c4d0b7a63335.jpg')}
              alt="Boutique lifestyle premium — Stories"
              style={{ width: '100%', height: 'auto', objectFit: 'contain', display: 'block' }}
            />
          </div>
        </div>

        {/* Colonne droite : Vignettes + Palette + Signature */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* ZONE 2 — Vignettes d'ambiance (20%) */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, flex: '1 1 auto' }}>
            {vignettes.map((src, i) => (
              <div key={i} style={{
                borderRadius: 5,
                overflow: 'hidden',
                minHeight: 130,
              }}>
                <img
                  src={src}
                  alt={vLabelsA[i]}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
            ))}
          </div>

          {/* ZONE 3 — Palette matériaux & couleurs (10%) */}
          <div style={{
            background: '#fff',
            borderRadius: 5,
            padding: '14px 16px',
            border: '1px solid #E8E0D4',
          }}>
            <div style={{ fontSize: 7, letterSpacing: 2.5, textTransform: 'uppercase', color: '#A09580', marginBottom: 10 }}>
              Palette matériaux & couleurs
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              {paletteA.map((p, i) => (
                <div key={i} style={{ flex: 1, textAlign: 'center' }}>
                  <div style={{
                    width: '100%',
                    paddingBottom: '60%',
                    background: p.color,
                    borderRadius: 4,
                    border: p.color === '#F5F0E8' ? '1px solid #ddd' : 'none',
                  }} />
                  <div style={{ fontSize: 6, letterSpacing: 0.5, color: '#8B7355', marginTop: 5, lineHeight: 1.3 }}>
                    {p.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ZONE 4 — Signature (10%) */}
          <div style={{
            background: '#2F5439',
            borderRadius: 5,
            padding: '20px 24px',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(-45deg, transparent, transparent 40px, rgba(255,255,255,0.015) 40px, rgba(255,255,255,0.015) 41px)', pointerEvents: 'none' }} />
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(24px, 3vw, 36px)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: '#fff',
              lineHeight: 1.15,
              letterSpacing: -0.3,
              marginBottom: 8,
              position: 'relative',
              zIndex: 1,
            }}>
              {lines[0]}<br /><span style={{ color: '#D4C9B0' }}>{lines[1]}</span>
            </div>
            <div style={{ width: 32, height: 1, background: '#C9943A', margin: '0 auto 8px', position: 'relative', zIndex: 1 }} />
            <div style={{ fontSize: 7, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', position: 'relative', zIndex: 1 }}>
              {s.sub}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20, paddingTop: 12, borderTop: '1px solid #E8E0D4' }}>
        <span style={{ fontSize: 7, letterSpacing: 2, textTransform: 'uppercase', color: '#C4B9A0' }}>
          Cosmos Angré · Stimulus A · Focus Group 20–25 Mars 2026
        </span>
        <span style={{ fontSize: 7, letterSpacing: 2, textTransform: 'uppercase', color: '#C4B9A0' }}>
          Confidentiel — New Heaven SA / CRMC
        </span>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   PLANCHE B — Scénario Premium Destination Mixed-Use
   Fond : noir profond / anthracite — lumière dramatique
   ═══════════════════════════════════════════════════════════════ */
const PlancheB: React.FC<{ sigIdx: number }> = ({ sigIdx }) => {
  const s = signaturesB[sigIdx];
  const lines = s.sig.split('\n');
  const vignettes = [imgB.v1, imgB.v2, imgB.v3, imgB.v4];

  return (
    <div style={{
      background: '#0A0A0F',
      padding: '48px 56px',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      gap: 0,
      fontFamily: "'Inter', sans-serif",
      position: 'relative',
    }}>
      {/* Glow subtil */}
      <div style={{
        position: 'absolute', top: '30%', left: '40%',
        width: '50vw', height: '50vw', maxWidth: 600, maxHeight: 600,
        borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(184,146,74,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Header discret */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 28, alignItems: 'baseline', position: 'relative', zIndex: 1 }}>
        <span style={{ fontSize: 8, letterSpacing: 3, textTransform: 'uppercase', color: 'rgba(184,146,74,0.4)' }}>
          Stimulus B · Scénario Premium Destination Mixed-Use · Planche {sigIdx + 1}/{signaturesB.length}
        </span>
        <span style={{ fontSize: 7.5, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(184,146,74,0.25)' }}>
          Cosmos Angré · Focus Group Mars 2026
        </span>
      </div>

      {/* ─── Corps principal : 2 colonnes ─── */}
      <div style={{ display: 'grid', gridTemplateColumns: '60% 1fr', gap: 24, flex: 1, position: 'relative', zIndex: 1 }}>

        {/* ZONE 1 — Images principales (60%) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* Image principale — corridor architecturé */}
          <div style={{
            borderRadius: 6,
            overflow: 'hidden',
            position: 'relative',
            border: '1px solid rgba(184,146,74,0.1)',
          }}>
            <img
              src={imgB.hero}
              alt="Corridor architecturé — plafond sculptural bois/noir, impact destination"
              style={{ width: '100%', height: 'auto', objectFit: 'contain', display: 'block' }}
            />
          </div>
          {/* Lacoste — enseigne lifestyle */}
          <div style={{
            borderRadius: 6,
            overflow: 'hidden',
            border: '1px solid rgba(184,146,74,0.1)',
          }}>
            <img
              src={S('73358f857af3a35488cbe280f396b61e.jpg')}
              alt="Enseigne lifestyle premium — Lacoste"
              style={{ width: '100%', height: 'auto', objectFit: 'contain', display: 'block' }}
            />
          </div>
        </div>

        {/* Colonne droite */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* ZONE 2 — Vignettes d'ambiance (20%) */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, flex: '1 1 auto' }}>
            {vignettes.map((src, i) => (
              <div key={i} style={{
                borderRadius: 5,
                overflow: 'hidden',
                minHeight: 130,
                border: '1px solid rgba(184,146,74,0.08)',
              }}>
                <img
                  src={src}
                  alt={vLabelsB[i]}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
            ))}
          </div>

          {/* ZONE 3 — Palette matériaux & couleurs (10%) */}
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            borderRadius: 5,
            padding: '14px 16px',
            border: '1px solid rgba(184,146,74,0.1)',
          }}>
            <div style={{ fontSize: 7, letterSpacing: 2.5, textTransform: 'uppercase', color: 'rgba(184,146,74,0.45)', marginBottom: 10 }}>
              Palette matériaux & couleurs
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              {paletteB.map((p, i) => (
                <div key={i} style={{ flex: 1, textAlign: 'center' }}>
                  <div style={{
                    width: '100%',
                    paddingBottom: '60%',
                    background: p.color,
                    borderRadius: 4,
                    border: `1px solid ${p.color === '#E8E0D4' || p.color === '#D4C9B0' ? 'rgba(255,255,255,0.1)' : 'rgba(184,146,74,0.15)'}`,
                  }} />
                  <div style={{ fontSize: 6, letterSpacing: 0.5, color: 'rgba(184,146,74,0.5)', marginTop: 5, lineHeight: 1.3 }}>
                    {p.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ZONE 4 — Signature (10%) */}
          <div style={{
            background: '#040A1E',
            borderRadius: 5,
            padding: '20px 24px',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            border: '1px solid rgba(184,146,74,0.1)',
          }}>
            <div style={{
              position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
              width: 300, height: 300, borderRadius: '50%',
              background: 'radial-gradient(ellipse, rgba(184,146,74,0.06) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(24px, 3vw, 36px)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: '#fff',
              lineHeight: 1.15,
              letterSpacing: -0.3,
              marginBottom: 8,
              position: 'relative',
              zIndex: 1,
            }}>
              {lines[0]}<br /><span style={{ color: '#B8924A' }}>{lines[1]}</span>
            </div>
            <div style={{ width: 32, height: 1, background: '#B8924A', margin: '0 auto 8px', position: 'relative', zIndex: 1 }} />
            <div style={{ fontSize: 7, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(184,146,74,0.35)', position: 'relative', zIndex: 1 }}>
              {s.sub}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20, paddingTop: 12, borderTop: '1px solid rgba(184,146,74,0.08)', position: 'relative', zIndex: 1 }}>
        <span style={{ fontSize: 7, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(184,146,74,0.25)' }}>
          Cosmos Angré · Stimulus B · Focus Group 20–25 Mars 2026
        </span>
        <span style={{ fontSize: 7, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(184,146,74,0.25)' }}>
          Confidentiel — New Heaven SA / CRMC
        </span>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   VUE COMPARATIVE — Côte à côte miniature
   ═══════════════════════════════════════════════════════════════ */
const CompView: React.FC = () => (
  <div style={{ background: '#080808', minHeight: '100vh' }}>
    {/* Header */}
    <div style={{ padding: '32px 56px 24px', borderBottom: '0.5px solid #1a1a1a', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
      <div>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, fontWeight: 300, color: '#fff', letterSpacing: 1 }}>
          Stimulus A vs Stimulus B
        </div>
        <div style={{ fontSize: 8, letterSpacing: 3, textTransform: 'uppercase', color: '#333', marginTop: 4 }}>
          Vue comparative · Focus Group Cosmos Angré · Mars 2026
        </div>
      </div>
      <div style={{ fontSize: 7.5, letterSpacing: 2, textTransform: 'uppercase', color: '#222' }}>
        Confidentiel — New Heaven SA / CRMC
      </div>
    </div>

    {/* Pour chaque paire de signatures */}
    {signaturesA.map((sA, i) => {
      const sB = signaturesB[i];
      const lA = sA.sig.split('\n');
      const lB = sB.sig.split('\n');
      return (
        <div key={i} style={{
          display: 'grid',
          gridTemplateColumns: '1fr 2px 1fr',
          borderBottom: i < signaturesA.length - 1 ? '0.5px solid #1a1a1a' : 'none',
        }}>
          {/* ─── Côté A ─── */}
          <div style={{ background: '#F8F4EE', padding: '32px 36px' }}>
            <div style={{ fontSize: 7, letterSpacing: 2.5, textTransform: 'uppercase', color: '#B8AA8C', marginBottom: 16 }}>
              Stimulus A · Planche {i + 1}
            </div>
            {/* Mini hero */}
            <div style={{ borderRadius: 5, overflow: 'hidden', height: 180, marginBottom: 14 }}>
              <img src={imgA.hero} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            {/* Mini vignettes */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 6, marginBottom: 14 }}>
              {[imgA.v1, imgA.v2, imgA.v3, imgA.v4].map((src, j) => (
                <div key={j} style={{ borderRadius: 3, overflow: 'hidden', height: 60 }}>
                  <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>
            {/* Mini palette */}
            <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>
              {paletteA.map((p, j) => (
                <div key={j} style={{ flex: 1, height: 14, borderRadius: 2, background: p.color, border: p.color === '#F5F0E8' ? '1px solid #ddd' : 'none' }} />
              ))}
            </div>
            {/* Signature */}
            <div style={{
              background: '#2F5439', borderRadius: 4, padding: '16px 20px', textAlign: 'center',
            }}>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(20px, 2.5vw, 30px)',
                fontWeight: 300, fontStyle: 'italic', color: '#fff',
                lineHeight: 1.15, marginBottom: 6,
              }}>
                {lA[0]}<br /><span style={{ color: '#D4C9B0' }}>{lA[1]}</span>
              </div>
              <div style={{ width: 24, height: 1, background: '#C9943A', margin: '0 auto 6px' }} />
              <div style={{ fontSize: 6.5, letterSpacing: 1.5, textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>{sA.sub}</div>
            </div>
          </div>

          {/* Divider */}
          <div style={{ background: '#1a1a1a' }} />

          {/* ─── Côté B ─── */}
          <div style={{ background: '#0A0A0F', padding: '32px 36px' }}>
            <div style={{ fontSize: 7, letterSpacing: 2.5, textTransform: 'uppercase', color: 'rgba(184,146,74,0.4)', marginBottom: 16 }}>
              Stimulus B · Planche {i + 1}
            </div>
            {/* Mini hero */}
            <div style={{ borderRadius: 5, overflow: 'hidden', height: 180, marginBottom: 14, border: '1px solid rgba(184,146,74,0.08)' }}>
              <img src={imgB.hero} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            {/* Mini vignettes */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 6, marginBottom: 14 }}>
              {[imgB.v1, imgB.v2, imgB.v3, imgB.v4].map((src, j) => (
                <div key={j} style={{ borderRadius: 3, overflow: 'hidden', height: 60, border: '1px solid rgba(184,146,74,0.06)' }}>
                  <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>
            {/* Mini palette */}
            <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>
              {paletteB.map((p, j) => (
                <div key={j} style={{ flex: 1, height: 14, borderRadius: 2, background: p.color, border: '1px solid rgba(184,146,74,0.1)' }} />
              ))}
            </div>
            {/* Signature */}
            <div style={{
              background: '#040A1E', borderRadius: 4, padding: '16px 20px', textAlign: 'center',
              border: '1px solid rgba(184,146,74,0.1)',
            }}>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(20px, 2.5vw, 30px)',
                fontWeight: 300, fontStyle: 'italic', color: '#fff',
                lineHeight: 1.15, marginBottom: 6,
              }}>
                {lB[0]}<br /><span style={{ color: '#B8924A' }}>{lB[1]}</span>
              </div>
              <div style={{ width: 24, height: 1, background: '#B8924A', margin: '0 auto 6px' }} />
              <div style={{ fontSize: 6.5, letterSpacing: 1.5, textTransform: 'uppercase', color: 'rgba(184,146,74,0.3)' }}>{sB.sub}</div>
            </div>
          </div>
        </div>
      );
    })}

    {/* Footer */}
    <div style={{ padding: '12px 56px', background: '#050505', borderTop: '0.5px solid #111', display: 'flex', justifyContent: 'space-between' }}>
      <span style={{ fontSize: 7.5, letterSpacing: 2, textTransform: 'uppercase', color: '#222' }}>Cosmos Angré · Vue comparative A vs B · Focus Group 20–25 Mars 2026</span>
      <span style={{ fontSize: 7.5, letterSpacing: 2, textTransform: 'uppercase', color: '#222' }}>Confidentiel — New Heaven SA / CRMC</span>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════════
   COMPOSANT PRINCIPAL
   ═══════════════════════════════════════════════════════════════ */
const StimuliAmbiance: React.FC = () => {
  const [tab, setTab] = useState<Tab>('pA');

  return (
    <div style={{ height: '100%', background: '#000', fontFamily: "'Inter', sans-serif", overflow: 'auto' }}>
      {/* NAV */}
      <div style={{ display: 'flex', position: 'sticky', top: 0, zIndex: 100, background: 'rgba(0,0,0,0.94)', backdropFilter: 'blur(12px)', borderBottom: '0.5px solid #222' }}>
        {([
          { t: 'pA' as Tab, label: 'Stimulus A — Proximité Premium', activeColor: '#7DC99A', borderColor: '#2F5439' },
          { t: 'pB' as Tab, label: 'Stimulus B — Destination Premium', activeColor: '#B8924A', borderColor: '#B8924A' },
          { t: 'pComp' as Tab, label: 'A vs B — Vue comparative', activeColor: '#C9943A', borderColor: '#C9943A' },
        ]).map(({ t, label, activeColor, borderColor }, idx, arr) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              flex: 1, padding: '14px 6px', border: 'none', cursor: 'pointer',
              fontFamily: "'Inter', sans-serif", fontSize: '8.5px', letterSpacing: '2.5px',
              textTransform: 'uppercase', fontWeight: 500,
              color: tab === t ? activeColor : 'rgba(255,255,255,0.25)',
              background: 'transparent', transition: 'all 0.3s',
              borderRight: idx < arr.length - 1 ? '0.5px solid #1a1a1a' : 'none',
              borderBottom: tab === t ? `2px solid ${borderColor}` : '2px solid transparent',
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* PLANCHE A */}
      <div style={{ display: tab === 'pA' ? 'block' : 'none' }}>
        {signaturesA.map((_, i) => (
          <PlancheA key={i} sigIdx={i} />
        ))}
      </div>

      {/* PLANCHE B */}
      <div style={{ display: tab === 'pB' ? 'block' : 'none' }}>
        {signaturesB.map((_, i) => (
          <PlancheB key={i} sigIdx={i} />
        ))}
      </div>

      {/* VUE COMPARATIVE */}
      <div style={{ display: tab === 'pComp' ? 'block' : 'none' }}>
        <CompView />
      </div>
    </div>
  );
};

export default StimuliAmbiance;
