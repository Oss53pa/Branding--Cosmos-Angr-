import React, { useState, useEffect, useCallback } from 'react';

type TabKey = 'intro' | 'scA' | 'scB' | 'scC' | 'scD' | 'fg';

const TABS: { id: TabKey; label: string }[] = [
  { id: 'intro', label: 'Introduction' },
  { id: 'scA', label: 'Piste A' },
  { id: 'scB', label: 'Piste B' },
  { id: 'scC', label: 'Piste C' },
  { id: 'scD', label: 'Piste D' },
  { id: 'fg', label: 'Stimuli FG' },
];

/* ── Swatch types ──────────────────────────────────────── */
interface SwatchData {
  color: string;
  name: string;
  hex: string;
  role: string;
  flex?: number;
  light?: boolean;
  delta?: string;
}

/* ── Helper components ─────────────────────────────────── */
const PaletteStrip: React.FC<{ swatches: SwatchData[] }> = ({ swatches }) => (
  <div style={{ display: 'flex', borderRadius: 12, overflow: 'hidden', height: 96, boxShadow: '0 1px 6px rgba(26,20,16,.08)', marginBottom: 12 }}>
    {swatches.map((s) => (
      <div key={s.hex + s.name} style={{ flex: s.flex || 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '10px 12px', background: s.color }}>
        <div style={{ fontSize: 9, letterSpacing: '.1em', fontWeight: 500, color: s.light === false ? 'rgba(26,20,16,.7)' : 'rgba(255,255,255,.9)' }}>{s.name}</div>
        <div style={{ fontFamily: 'monospace', fontSize: 9, color: s.light === false ? 'rgba(26,20,16,.5)' : 'rgba(255,255,255,.5)', marginTop: 1 }}>{s.hex}</div>
        <div style={{ fontSize: 8, color: s.light === false ? 'rgba(26,20,16,.38)' : 'rgba(255,255,255,.38)', marginTop: 1 }}>{s.role}</div>
        {s.delta && <div style={{ fontSize: 8, color: s.light === false ? '#b45309' : '#fcd34d', marginTop: 2, fontStyle: 'italic' }}>{s.delta}</div>}
      </div>
    ))}
  </div>
);

const ChangelogBox: React.FC<{ title: string; items: { bold: string; text: string }[] }> = ({ title, items }) => (
  <div style={{ background: '#fffbeb', border: '1px solid #fcd34d', borderRadius: 12, padding: '18px 22px', marginBottom: 24 }}>
    <div style={{ fontSize: 11, fontWeight: 600, color: '#92400e', marginBottom: 10, letterSpacing: '.08em', textTransform: 'uppercase' }}>{title}</div>
    {items.map((item, i) => (
      <div key={i} style={{ fontSize: 11, color: '#78350f', lineHeight: 1.75, paddingLeft: 12, borderLeft: '2px solid #fcd34d', marginBottom: 6 }}>
        <strong>{item.bold}</strong> {item.text}
      </div>
    ))}
  </div>
);

const InfoCard: React.FC<{ label: string; text: string }> = ({ label, text }) => (
  <div style={{ background: '#fff', borderRadius: 16, border: '1px solid rgba(26,20,16,.07)', boxShadow: '0 1px 4px rgba(26,20,16,.04)', overflow: 'hidden' }}>
    <div style={{ padding: '22px 24px' }}>
      <div style={{ fontSize: 9, letterSpacing: '.22em', textTransform: 'uppercase', color: 'rgba(26,20,16,.32)', marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 12, color: 'rgba(26,20,16,.58)', lineHeight: 1.7 }}>{text}</div>
    </div>
  </div>
);

const AppCard: React.FC<{ previewBg: string; preview: React.ReactNode; cat: string; title: string; rules: string }> = ({ previewBg, preview, cat, title, rules }) => (
  <div style={{ background: '#fff', borderRadius: 14, border: '1px solid rgba(26,20,16,.07)', overflow: 'hidden' }}>
    <div style={{ height: 110, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, background: previewBg }}>
      {preview}
    </div>
    <div style={{ padding: '14px 16px', borderTop: '1px solid rgba(26,20,16,.05)' }}>
      <div style={{ fontSize: 9, letterSpacing: '.18em', textTransform: 'uppercase', color: 'rgba(26,20,16,.3)', marginBottom: 4 }}>{cat}</div>
      <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 5 }}>{title}</div>
      <div style={{ fontSize: 11, color: 'rgba(26,20,16,.5)', lineHeight: 1.6 }}>{rules}</div>
    </div>
  </div>
);

const Delta: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '2px 8px', borderRadius: 8, fontSize: 9, fontWeight: 600, background: '#fff3e0', color: '#b45309', border: '1px solid #fcd34d', marginLeft: 8, verticalAlign: 'middle' }}>
    {children}
  </span>
);

const Note: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ padding: '14px 18px', borderRadius: 10, background: 'rgba(26,20,16,.03)', border: '1px solid rgba(26,20,16,.05)', fontSize: 11, color: 'rgba(26,20,16,.4)', lineHeight: 1.8 }}>
    {children}
  </div>
);

const Pill: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span style={{ padding: '5px 14px', borderRadius: 20, fontSize: 11, fontWeight: 500, background: '#fff', border: '1px solid rgba(26,20,16,.1)', color: 'rgba(26,20,16,.6)' }}>{children}</span>
);

const Divider = () => <div style={{ height: 1, background: 'rgba(26,20,16,.05)', margin: '32px 0' }} />;

const SH: React.FC<{ num: string; title: React.ReactNode }> = ({ num, title }) => (
  <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 18 }}>
    <div style={{ fontSize: 9, letterSpacing: '.28em', textTransform: 'uppercase', color: 'rgba(26,20,16,.32)' }}>{num}</div>
    <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 26, fontWeight: 300, color: '#1a1410' }}>{title}</div>
  </div>
);

/* ── Palette data ──────────────────────────────────────── */
const PALETTE_A: SwatchData[] = [
  { color: '#2F5439', name: 'Forêt Profond', hex: '#2F5439', role: 'Primaire · Façade · Fond', flex: 2, delta: '↑ était #1E3A28' },
  { color: '#76764D', name: 'Kaki Minéral', hex: '#76764D', role: 'Primaire clair', delta: '↑ était #3D6B4F' },
  { color: '#C9943A', name: 'Or Cuivré', hex: '#C9943A', role: 'Accent · CTA · Signalétique' },
  { color: '#E8C97A', name: 'Or Doux', hex: '#E8C97A', role: 'Accent secondaire', light: false },
  { color: '#F2EBDD', name: 'Sable Territorial', hex: '#F2EBDD', role: 'Fond · Print · Digital', light: false, delta: '↑ était #F5F0E8' },
  { color: '#1A1410', name: 'Noir Chaud', hex: '#1A1410', role: 'Corps texte' },
];

const PALETTE_B: SwatchData[] = [
  { color: '#060E2A', name: 'Nuit Abyssale', hex: '#060E2A', role: 'Primaire · Façade · Fond', flex: 2 },
  { color: '#0D1B4B', name: 'Bleu Nuit', hex: '#0D1B4B', role: 'Primaire secondaire' },
  { color: '#1A3060', name: 'Bleu Profond', hex: '#1A3060', role: 'Troisième plan' },
  { color: '#B8924A', name: 'Or Mat', hex: '#B8924A', role: 'Accent noble · Signature' },
  { color: '#D4B06A', name: 'Or Clair', hex: '#D4B06A', role: 'Accent · Titres', light: false },
  { color: '#F2EBDD', name: 'Sable Territorial', hex: '#F2EBDD', role: 'Fond neutre · Texte', light: false, delta: '↑ était #F2EDE3' },
];

const PALETTE_C: SwatchData[] = [
  { color: '#2C1A0A', name: 'Ébène Chaud', hex: '#2C1A0A', role: 'Primaire profond · Façade', flex: 2 },
  { color: '#B25A38', name: 'Terracotta Foncé', hex: '#B25A38', role: 'Primaire chaud · Bardade', delta: '↑ était #8B4A1A' },
  { color: '#6D7447', name: 'Kaki Végétal', hex: '#6D7447', role: 'Accent secondaire', delta: '↑ était #C97845' },
  { color: '#C9943A', name: 'Bronze Doré', hex: '#C9943A', role: 'Accent premium · Logo' },
  { color: '#D6C29C', name: 'Sable Naturel', hex: '#D6C29C', role: 'Fond chaud · Intermédiaire', light: false, delta: '↑ était #E8C49A' },
  { color: '#F2EBDD', name: 'Sable Territorial', hex: '#F2EBDD', role: 'Fond principal · Print', light: false, delta: '↑ était #F5EDE0' },
];

const PALETTE_D: SwatchData[] = [
  { color: '#E5DECC', name: 'Pierre Beige', hex: '#E5DECC', role: 'Fond dominant · 32%', flex: 2, light: false },
  { color: '#898D5D', name: 'Kaki Soleil', hex: '#898D5D', role: 'Primaire · Façade · Bardade' },
  { color: '#F5F0E4', name: 'Ivoire Naturel', hex: '#F5F0E4', role: 'Fond secondaire · Print', light: false },
  { color: '#D4A843', name: 'Or Soleil', hex: '#D4A843', role: 'Accent premium · Signalétique' },
  { color: '#6B7A4A', name: 'Mousse Profond', hex: '#6B7A4A', role: 'Accent végétal · Détails' },
  { color: '#1C2215', name: 'Forêt Nuit', hex: '#1C2215', role: 'Corps texte · Fond sombre' },
];

/* ── INTRO TAB ─────────────────────────────────────────── */
const IntroTab: React.FC<{ onSwitch: (t: TabKey) => void }> = ({ onSwitch }) => (
  <div>
    <div style={{ padding: '56px 56px 48px', borderBottom: '1px solid rgba(26,20,16,.06)' }}>
      <div style={{ fontSize: 10, letterSpacing: '.28em', textTransform: 'uppercase', color: 'rgba(26,20,16,.35)', marginBottom: 12 }}>Brand Book · Cosmos Angré · Livrable 2.2 · Confidentiel EXCO</div>
      <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 48, fontWeight: 300, lineHeight: 1.05, color: '#1a1410', marginBottom: 10 }}>Kaki minéral intégré.<br />Palette C recentrée.</div>
      <div style={{ fontSize: 13, color: 'rgba(26,20,16,.45)', lineHeight: 1.75, maxWidth: 560, marginBottom: 28 }}>Version 2.2 — Intégration du kaki minéral en Piste A (remplace Forêt Vivant), remplacement de la terracotta vif par le kaki végétal en Piste C, recalibrage du sable doré vers sable naturel. Système typographique et signatures inchangés.</div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <Pill>Kaki minéral #76764D (Piste A)</Pill>
        <Pill>Kaki végétal #6D7447 (Piste C)</Pill>
        <Pill>Sable naturel #D6C29C (Piste C)</Pill>
        <Pill>Système inchangé</Pill>
      </div>
    </div>
    <div style={{ padding: '40px 56px 56px' }}>
      <ChangelogBox title="⚡ Modifications v2.2 — Ce qui a changé" items={[
        { bold: 'Piste A — Kaki Minéral :', text: '#3D6B4F (Forêt Vivant) → #76764D · Kaki minéral plus neutre, meilleure harmonie avec le vert profond #2F5439. Apporte un ancrage terrestre sans rivaliser avec le primaire.' },
        { bold: 'Piste C — Kaki Végétal :', text: '#C97845 (Terracotta Vif) → #6D7447 · Remplacement stratégique : le kaki végétal dialogue mieux avec le bronze doré et ancre la palette dans une chaleur plus naturelle.' },
        { bold: 'Piste C — Sable Naturel :', text: '#E8C49A (Sable Naturel) → #D6C29C · Sable plus doux, moins jaune. Meilleure lisibilité comme fond intermédiaire et meilleur contraste avec le bronze doré #C9943A.' },
      ]} />

      <div style={{ marginBottom: 36 }}>
        <SH num="Architecture" title="Les 4 pistes — palettes v2.2" />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 12, marginBottom: 32 }}>
          {/* Piste A card */}
          <div onClick={() => onSwitch('scA')} style={{ background: '#fff', borderRadius: 14, border: '1px solid rgba(26,20,16,.07)', padding: 20, cursor: 'pointer', transition: 'all .2s' }}>
            <div style={{ fontSize: 9, letterSpacing: '.25em', textTransform: 'uppercase', marginBottom: 8, color: '#2F5439' }}>Piste A — Premium de Proximité</div>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, fontWeight: 300, marginBottom: 4 }}>"Enfin tout, enfin ici"</div>
            <div style={{ fontSize: 11, color: 'rgba(26,20,16,.42)', lineHeight: 1.5 }}>
              Vert forêt · Kaki minéral · Or cuivré · Sable territorial<br />
              <Delta>↑ Kaki #76764D</Delta> <Delta>↑ Fond #F2EBDD</Delta>
            </div>
            <div style={{ marginTop: 12, display: 'flex', gap: 6 }}>
              {['#2F5439', '#C9943A', '#F2EBDD', '#76764D'].map(c => (
                <div key={c} style={{ width: 16, height: 16, borderRadius: '50%', background: c, border: c === '#F2EBDD' ? '1px solid rgba(26,20,16,.1)' : 'none' }} />
              ))}
            </div>
          </div>
          {/* Piste B card */}
          <div onClick={() => onSwitch('scB')} style={{ background: '#fff', borderRadius: 14, border: '1px solid rgba(26,20,16,.07)', padding: 20, cursor: 'pointer' }}>
            <div style={{ fontSize: 9, letterSpacing: '.25em', textTransform: 'uppercase', marginBottom: 8, color: '#0D1B4B' }}>Piste B — Destination Premium</div>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, fontWeight: 300, marginBottom: 4 }}>"Un monde à part"</div>
            <div style={{ fontSize: 11, color: 'rgba(26,20,16,.42)', lineHeight: 1.5 }}>
              Bleu nuit profond · Or mat · Sable territorial<br />
              <Delta>↑ Fond #F2EBDD</Delta>
            </div>
            <div style={{ marginTop: 12, display: 'flex', gap: 6 }}>
              {['#060E2A', '#0D1B4B', '#B8924A', '#F2EBDD'].map(c => (
                <div key={c} style={{ width: 16, height: 16, borderRadius: '50%', background: c, border: c === '#F2EBDD' ? '1px solid rgba(26,20,16,.1)' : 'none' }} />
              ))}
            </div>
          </div>
          {/* Piste C card */}
          <div onClick={() => onSwitch('scC')} style={{ background: '#fff', borderRadius: 14, border: '1px solid rgba(26,20,16,.07)', padding: 20, cursor: 'pointer' }}>
            <div style={{ fontSize: 9, letterSpacing: '.25em', textTransform: 'uppercase', marginBottom: 8, color: '#8a5a10' }}>Piste C — L'Exception Naturelle</div>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, fontWeight: 300, marginBottom: 4 }}>"L'exception, tout simplement"</div>
            <div style={{ fontSize: 11, color: 'rgba(26,20,16,.42)', lineHeight: 1.5 }}>
              Bronze africain · Kaki végétal · Sable naturel<br />
              <Delta>↑ Kaki #6D7447</Delta> <Delta>↑ Sable #D6C29C</Delta>
            </div>
            <div style={{ marginTop: 12, display: 'flex', gap: 6 }}>
              {['#2C1A0A', '#B25A38', '#C9943A', '#F2EBDD'].map(c => (
                <div key={c} style={{ width: 16, height: 16, borderRadius: '50%', background: c, border: c === '#F2EBDD' ? '1px solid rgba(26,20,16,.1)' : 'none' }} />
              ))}
            </div>
          </div>
          {/* Piste D card */}
          <div onClick={() => onSwitch('scD')} style={{ background: '#fff', borderRadius: 14, border: '1px solid rgba(26,20,16,.07)', padding: 20, cursor: 'pointer', transition: 'all .2s' }}>
            <div style={{ fontSize: 9, letterSpacing: '.25em', textTransform: 'uppercase', marginBottom: 8, color: '#898D5D' }}>Piste D — Nature Contemporaine</div>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, fontWeight: 300, marginBottom: 4 }}>"Ici, on vit quelque chose"</div>
            <div style={{ fontSize: 11, color: 'rgba(26,20,16,.42)', lineHeight: 1.5 }}>
              Pierre beige · Kaki soleil · Or soleil · Mousse<br />
              <Delta>Nouveau</Delta>
            </div>
            <div style={{ marginTop: 12, display: 'flex', gap: 6 }}>
              {['#E5DECC', '#898D5D', '#D4A843', '#1C2215'].map(c => (
                <div key={c} style={{ width: 16, height: 16, borderRadius: '50%', background: c, border: c === '#E5DECC' ? '1px solid rgba(26,20,16,.1)' : 'none' }} />
              ))}
            </div>
          </div>
        </div>
        <Note>Livrable 2.2 · Brand Book Cosmos Angré · Mars 2026 · Confidentiel EXCO — New Heaven SA / RCP<br />Ajustements chromatiques intégrant les enseignements du concept "Tropical Urbain". Système et positionnements inchangés.</Note>
      </div>
    </div>
  </div>
);

/* ── PISTE A TAB ───────────────────────────────────────── */
const PisteATab: React.FC = () => (
  <div>
    <div style={{ padding: '56px 56px 48px', borderBottom: '1px solid rgba(26,20,16,.06)' }}>
      <div style={{ fontSize: 10, letterSpacing: '.28em', textTransform: 'uppercase', color: 'rgba(26,20,16,.35)', marginBottom: 12 }}>Brand Book v2.2 · Piste A · Premium de Proximité</div>
      <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 48, fontWeight: 300, lineHeight: 1.05, color: '#1a1410', marginBottom: 10 }}>Vert Forêt & Kaki Minéral</div>
      <div style={{ fontSize: 13, color: 'rgba(26,20,16,.45)', lineHeight: 1.75, maxWidth: 560, marginBottom: 28 }}>v2.2 — Le kaki minéral #76764D remplace le vert vivant #3D6B4F. Plus neutre, meilleure harmonie avec le vert profond #2F5439. Le reste de la palette est inchangé.</div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}><Pill>Kaki minéral #76764D</Pill><Pill>Modernité accessible</Pill><Pill>Chaleur premium</Pill><Pill>Lisible en extérieur</Pill></div>
    </div>
    <div style={{ padding: '40px 56px 56px' }}>
      <ChangelogBox title="Modifications Piste A v2.2" items={[
        { bold: 'Kaki Minéral :', text: '#3D6B4F (Forêt Vivant) → #76764D · Couleur plus minérale, plus neutre. Meilleure harmonie avec le vert profond sans rivaliser.' },
      ]} />

      {/* 01 · Palette */}
      <div style={{ marginBottom: 36 }}>
        <SH num="01" title={<>Palette chromatique — 6 couleurs <Delta>1 ajustée</Delta></>} />
        <PaletteStrip swatches={PALETTE_A} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
          <InfoCard label="Proportion recommandée" text="Forêt Profond 50% des surfaces · Kaki Minéral 10% (accents verts) · Or Cuivré 15% max · Sable Territorial 30% (fonds) · Noir : corps de texte uniquement" />
          <InfoCard label="Pourquoi Kaki Minéral #76764D" text="Le #3D6B4F (Forêt Vivant) était trop proche du primaire #2F5439 — confusion de rôle. Le kaki minéral #76764D est plus neutre, crée une meilleure hiérarchie et dialogue naturellement avec l'or cuivré." />
          <InfoCard label="Ce qu'on évite" text="Jamais noir pur #000. Jamais or brillant métallisé. Jamais blanc pur #FFF. Kaki désaturé (#898D5D) — affaiblit le signal premium. La chaleur est dans chaque teinte." />
        </div>
      </div>

      <Divider />

      {/* 02 · Typographie */}
      <div style={{ marginBottom: 36 }}>
        <SH num="02" title="Système typographique — inchangé" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div style={{ background: '#fff', borderRadius: 14, border: '1px solid rgba(26,20,16,.07)', padding: '22px 24px' }}>
            <div style={{ fontSize: 9, letterSpacing: '.22em', textTransform: 'uppercase', color: 'rgba(26,20,16,.32)', marginBottom: 6 }}>Typographie Primaire — Titres & signature</div>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 36, color: '#2F5439', lineHeight: 1.1, margin: '10px 0 12px' }}>Cosmos Angré</div>
            <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 4 }}>Cormorant Garamond Light (300)</div>
            <div style={{ fontSize: 11, color: 'rgba(26,20,16,.45)', lineHeight: 1.65 }}>Usage · Nom de marque · Signature · Titres principaux · Façade<br />Corps façade : 80px+ · Print : 36–60px · Digital : 28–48px<br />Disponible : Google Fonts · Adobe Fonts</div>
          </div>
          <div style={{ background: '#fff', borderRadius: 14, border: '1px solid rgba(26,20,16,.07)', padding: '22px 24px' }}>
            <div style={{ fontSize: 9, letterSpacing: '.22em', textTransform: 'uppercase', color: 'rgba(26,20,16,.32)', marginBottom: 6 }}>Typographie Secondaire — Corps & navigation</div>
            <div style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 24, color: '#1a1410', lineHeight: 1.1, margin: '10px 0 12px' }}>Le quartier que vous méritez</div>
            <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 4 }}>Inter Regular / Medium (400 · 500)</div>
            <div style={{ fontSize: 11, color: 'rgba(26,20,16,.45)', lineHeight: 1.65 }}>Usage · Corps de texte · Signalétique · App · Navigation · Labels<br />Signalétique : 14–16px · App : 12–14px · Légendes : 10–11px</div>
          </div>
        </div>
      </div>

      <Divider />

      {/* 03 · Applications */}
      <div style={{ marginBottom: 36 }}>
        <SH num="03" title="Règles d'application — 6 supports" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
          <AppCard previewBg="#2F5439" cat="Façade & signalétique extérieure" title="Fond #2F5439 · Lettrage Sable + Or" rules="COSMOS en Cormorant Light Maj. · ANGRÉ Inter SemiBold +0.3em · Signature Cormorant Italic · Hauteur lettres façade min. 80cm · LED warm white 3000K" preview={
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 26, fontWeight: 300, color: '#F2EBDD', letterSpacing: '.08em' }}>COSMOS</div>
              <div style={{ fontSize: 10, letterSpacing: '.3em', color: '#C9943A', marginTop: 4 }}>ANGRÉ</div>
              <div style={{ width: 28, height: 1, background: '#C9943A', margin: '6px auto' }} />
              <div style={{ fontSize: 8, color: 'rgba(242,235,221,.35)', fontStyle: 'italic', letterSpacing: '.06em' }}>Le quartier que vous méritez</div>
            </div>
          } />
          <AppCard previewBg="#F2EBDD" cat="Print — Flyers, affiches, bâches" title="Fond Sable · Titres Forêt · Accent Or" rules="Papier mat min. 150g/m² · Jamais brillant · Titre Cormorant min. 28pt · Corps Inter Regular 10–12pt · Filet or cuivré séparateur" preview={
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, color: '#2F5439' }}>COSMOS ANGRÉ</div>
              <div style={{ width: 32, height: 1, background: '#C9943A', margin: '6px auto' }} />
              <div style={{ fontSize: 9, color: 'rgba(26,20,16,.4)', letterSpacing: '.12em' }}>Ouverture Octobre 2026</div>
            </div>
          } />
          <AppCard previewBg="linear-gradient(135deg,#2F5439,#76764D)" cat="Digital — App, site, réseaux sociaux" title="Dark mode Forêt · CTAs Or Cuivré" rules="Background : #2F5439 ou #F2EBDD · Boutons : #C9943A · Icônes filet 1.5px · Images 16:9 ou carré · Pas de fond blanc pur" preview={
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 8, letterSpacing: '.2em', color: 'rgba(255,255,255,.35)', marginBottom: 5 }}>COSMOS ANGRÉ</div>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 16, fontWeight: 300, color: '#fff' }}>Votre app. Votre centre.</div>
              <div style={{ marginTop: 8, display: 'inline-block', padding: '4px 14px', background: '#C9943A', borderRadius: 12, fontSize: 8, color: '#fff' }}>Explorer</div>
            </div>
          } />
          <AppCard previewBg="#F2EBDD" cat="Packaging & merchandising" title="Sacs kraft teinté vert / sable" rules="Kraft naturel teinté #76764D · Logo tampographié Or Cuivré · Cordons coton naturel · Tissu intérieur sable · Pas de plastique apparent" preview={
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: 52, height: 52, borderRadius: '50%', background: '#2F5439', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, color: '#C9943A' }}>C</span></div>
              <div style={{ fontSize: 8, color: 'rgba(26,20,16,.35)', marginTop: 7, letterSpacing: '.15em' }}>COSMOS ANGRÉ</div>
            </div>
          } />
          <AppCard previewBg="#2F5439" cat="Signalétique intérieure" title="Fond #2F5439 · Sable · Flèches Or" rules="Panneaux fond #2F5439 · Texte Inter Medium Sable · Flèches #C9943A · Hauteur panneau directionnel min. 30cm · Police min. 16pt" preview={
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 9, color: '#C9943A', letterSpacing: '.2em', marginBottom: 5 }}>NIVEAU P1</div>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, fontWeight: 300, color: '#fff' }}>→ Cinéma</div>
            </div>
          } />
          <AppCard previewBg="linear-gradient(135deg,#243f2c,#2F5439)" cat="Événementiel — Inauguration" title="Fond sombre · Accents or · Sobre" rules="Scène fond #2F5439 + éclairage 3000K · Pas de projection criarde · Tapis vert forêt uni · Totem accueil laiton + Cormorant" preview={
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 14, color: 'rgba(255,255,255,.9)', marginBottom: 3 }}>Cosmos Angré</div>
              <div style={{ fontSize: 8, color: '#C9943A', letterSpacing: '.2em' }}>INAUGURATION</div>
              <div style={{ fontSize: 9, color: 'rgba(255,255,255,.4)', marginTop: 5 }}>16 Novembre 2026</div>
            </div>
          } />
        </div>
      </div>

      <Divider />

      {/* 04 · Signatures */}
      <div style={{ marginBottom: 36 }}>
        <SH num="04" title="Système de signatures — inchangé" />
        <div style={{ borderRadius: 14, padding: 36, textAlign: 'center', marginBottom: 12, background: 'linear-gradient(135deg,#2F5439,#76764D)' }}>
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 34, fontWeight: 300, marginBottom: 8, lineHeight: 1.2, color: '#fff' }}>"Le quartier que vous méritez"</div>
          <div style={{ fontSize: 9, letterSpacing: '.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,.35)' }}>Signature permanente · Façade · Institutionnel · Baux</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div style={{ background: '#fff', borderRadius: 12, border: '1px solid rgba(26,20,16,.07)', padding: 18 }}>
            <div style={{ fontSize: 9, letterSpacing: '.18em', textTransform: 'uppercase', color: 'rgba(26,20,16,.3)', marginBottom: 8 }}>Signature campagne · Lancement</div>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, fontWeight: 300, marginBottom: 6, color: '#2F5439' }}>"Enfin tout, enfin ici"</div>
            <div style={{ fontSize: 11, color: 'rgba(26,20,16,.5)', lineHeight: 1.6 }}>Usage : pub extérieure, réseaux, teasing pré-ouverture. À retirer après 6 mois post-inauguration.</div>
          </div>
          <div style={{ background: '#fff', borderRadius: 12, border: '1px solid rgba(26,20,16,.07)', padding: 18 }}>
            <div style={{ fontSize: 9, letterSpacing: '.18em', textTransform: 'uppercase', color: 'rgba(26,20,16,.3)', marginBottom: 8 }}>Signature institutionnelle · Investisseurs</div>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, fontWeight: 300, marginBottom: 6, color: '#2F5439' }}>"Angré méritait mieux. Depuis octobre 2026, c'est fait."</div>
            <div style={{ fontSize: 11, color: 'rgba(26,20,16,.5)', lineHeight: 1.6 }}>Dossiers de presse, présentations investisseurs. Fort, factuel, sans arrogance.</div>
          </div>
        </div>
      </div>
      <Note>Piste A v2.2 · Brand Book Cosmos Angré · Mars 2026 · Confidentiel EXCO — New Heaven SA / RCP</Note>
    </div>
  </div>
);

/* ── PISTE B TAB ───────────────────────────────────────── */
const PisteBTab: React.FC = () => (
  <div>
    <div style={{ padding: '56px 56px 48px', borderBottom: '1px solid rgba(26,20,16,.06)' }}>
      <div style={{ fontSize: 10, letterSpacing: '.28em', textTransform: 'uppercase', color: 'rgba(26,20,16,.35)', marginBottom: 12 }}>Brand Book v2.2 · Piste B · Destination Premium</div>
      <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 48, fontWeight: 300, lineHeight: 1.05, color: '#1a1410', marginBottom: 10 }}>Bleu Nuit & Or Mat</div>
      <div style={{ fontSize: 13, color: 'rgba(26,20,16,.45)', lineHeight: 1.75, maxWidth: 560, marginBottom: 28 }}>Piste B la moins impactée par les ajustements — son ADN bleu nuit reste intact. Seul le fond neutre passe de #F5F0E8 à #F2EBDD pour cohérence inter-pistes.</div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}><Pill>Rupture totale</Pill><Pill>Aspiration internationale</Pill><Pill>Signal premium fort</Pill><Pill>1 ajustement mineur</Pill></div>
    </div>
    <div style={{ padding: '40px 56px 56px' }}>
      <ChangelogBox title="Modifications Piste B v2.2" items={[
        { bold: 'Fond neutre :', text: '#F2EDE3 → #F2EBDD · Alignement inter-pistes uniquement. Impact visuel minimal. La Piste B reste intacte dans son ADN.' },
      ]} />

      {/* 01 · Palette */}
      <div style={{ marginBottom: 36 }}>
        <SH num="01" title={<>Palette chromatique — 6 couleurs <Delta>1 ajustée</Delta></>} />
        <PaletteStrip swatches={PALETTE_B} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
          <InfoCard label="Proportion recommandée" text="Nuit Abyssale 60% · Or Mat 10% max · Sable Territorial 25% · Or Clair : titres secondaires uniquement" />
          <InfoCard label="Ce que la palette dit" text="Le bleu nuit profond crée la rupture — on entre dans un autre univers. L'or mat (pas brillant) dit distinction sans ostentation. Ensemble : on est passé dans un monde différent." />
          <InfoCard label="⚠ Point d'attention critique" text="L'or de la bardade (#B8924A) et les accents or de la signalétique doivent être dans la même famille. Un décalage de teinte tue l'effet premium. À vérifier sur maquette réelle avec Fernand." />
        </div>
      </div>

      <Divider />

      {/* 02 · Applications */}
      <div style={{ marginBottom: 36 }}>
        <SH num="02" title="Règles d'application — 6 supports" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
          <AppCard previewBg="#060E2A" cat="Façade & signalétique extérieure" title="Fond Nuit · Lettrage Or · Filet Or 0.5px" rules="COSMOS en Playfair Maj. or · ANGRÉ Inter Light +0.4em · Filet or 1px · LED 2700K directionnel rasant · Bardade bronze anodisé mat" preview={
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 24, color: '#D4B06A', letterSpacing: '.04em' }}>COSMOS</div>
              <div style={{ fontSize: 8, letterSpacing: '.4em', color: 'rgba(255,255,255,.45)', marginTop: 5 }}>A N G R É</div>
              <div style={{ width: 24, height: 1, background: '#B8924A', margin: '6px auto' }} />
              <div style={{ fontSize: 7, color: 'rgba(255,255,255,.2)', letterSpacing: '.12em', fontStyle: 'italic' }}>Un monde à part</div>
            </div>
          } />
          <AppCard previewBg="#F2EBDD" cat="Print — Invitations, programmes, presse" title="Fond Sable · Titres Bleu Nuit · Or Pantone" rules="Papier couché mat min. 200g/m² · 2 passes (quadri + or Pantone 873C mat) · Jamais plastifié brillant" preview={
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 18, color: '#0D1B4B' }}>Cosmos Angré</div>
              <div style={{ width: 24, height: 1, background: '#B8924A', margin: '6px auto' }} />
              <div style={{ fontSize: 8, color: 'rgba(13,27,75,.4)', letterSpacing: '.18em' }}>INAUGURATION · NOV. 2026</div>
            </div>
          } />
          <AppCard previewBg="#060E2A" cat="Digital — App, site, réseaux" title="Dark mode exclusif · CTAs Or bordure" rules="Fond app unique : #060E2A · Jamais de light mode · Boutons bords droits + bordure or · Contenu curé, pas de volume" preview={
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 7, letterSpacing: '.25em', color: 'rgba(255,255,255,.25)', marginBottom: 7 }}>COSMOS ANGRÉ</div>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 13, color: '#D4B06A' }}>L'exception, à Abidjan.</div>
              <div style={{ marginTop: 9, display: 'inline-block', padding: '3px 12px', border: '1px solid #B8924A', fontSize: 7, color: '#B8924A', letterSpacing: '.15em' }}>RÉSERVER</div>
            </div>
          } />
          <AppCard previewBg="#F2EBDD" cat="Packaging & merchandising" title="Sacs noir mat · Frappé à chaud or mat" rules="Papier noir mat grainé · Logo frappé or mat · Cordons satin noir · Aucun plastique" preview={
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: 50, height: 50, background: '#060E2A', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ fontFamily: "'Playfair Display',serif", fontSize: 18, color: '#B8924A' }}>C</span></div>
              <div style={{ fontSize: 7, color: 'rgba(26,20,16,.3)', marginTop: 7, letterSpacing: '.15em' }}>COSMOS ANGRÉ</div>
            </div>
          } />
          <AppCard previewBg="#060E2A" cat="Signalétique intérieure" title="Fond Nuit · Destinations Playfair · Or" rules="Panneaux fond #060E2A · Destination Playfair Regular · Niveau Inter Light espacé · Flèches filet or 1px" preview={
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 8, color: '#B8924A', letterSpacing: '.28em', marginBottom: 5 }}>NIVEAU 2</div>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 16, color: '#fff' }}>Restaurants</div>
              <div style={{ fontSize: 9, color: '#D4B06A', marginTop: 4 }}>→</div>
            </div>
          } />
          <AppCard previewBg="linear-gradient(135deg,#040c22,#0D1B4B)" cat="Événementiel — Inauguration" title="Bleu nuit · Projection or · Formal" rules="Scène fond #060E2A + projection mapping constellations or · LED 2700K · Dress code : dark formal suggéré" preview={
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 12, color: 'rgba(255,255,255,.9)', marginBottom: 3 }}>Cosmos Angré</div>
              <div style={{ fontSize: 7, color: '#B8924A', letterSpacing: '.25em' }}>INAUGURATION</div>
              <div style={{ fontSize: 8, color: 'rgba(255,255,255,.35)', marginTop: 4 }}>16 Novembre 2026 · Abidjan</div>
            </div>
          } />
        </div>
      </div>

      <Divider />

      {/* 03 · Signatures */}
      <div style={{ marginBottom: 36 }}>
        <SH num="03" title="Système de signatures — inchangé" />
        <div style={{ borderRadius: 14, padding: 36, textAlign: 'center', marginBottom: 12, background: 'linear-gradient(135deg,#060E2A,#0D1B4B)' }}>
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 34, fontWeight: 300, marginBottom: 8, lineHeight: 1.2, color: '#D4B06A' }}>"Un monde à part"</div>
          <div style={{ fontSize: 9, letterSpacing: '.2em', textTransform: 'uppercase', color: 'rgba(212,176,106,.3)' }}>Signature permanente · Façade · Institutionnel · Baux</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div style={{ background: '#fff', borderRadius: 12, border: '1px solid rgba(26,20,16,.07)', padding: 18 }}>
            <div style={{ fontSize: 9, letterSpacing: '.18em', textTransform: 'uppercase', color: 'rgba(26,20,16,.3)', marginBottom: 8 }}>Signature campagne · Lancement</div>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, fontWeight: 300, marginBottom: 6, color: '#0D1B4B' }}>"Vivez l'exception"</div>
            <div style={{ fontSize: 11, color: 'rgba(26,20,16,.5)', lineHeight: 1.6 }}>Ton impératif qui crée l'aspiration. Court, mémorable, international.</div>
          </div>
          <div style={{ background: '#fff', borderRadius: 12, border: '1px solid rgba(26,20,16,.07)', padding: 18 }}>
            <div style={{ fontSize: 9, letterSpacing: '.18em', textTransform: 'uppercase', color: 'rgba(26,20,16,.3)', marginBottom: 8 }}>Signature investisseurs / presse</div>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, fontWeight: 300, marginBottom: 6, color: '#0D1B4B' }}>"La première destination mixed-use premium d'Abidjan"</div>
            <div style={{ fontSize: 11, color: 'rgba(26,20,16,.5)', lineHeight: 1.6 }}>Factuel, positionnel, différenciant. Usage : pitchs investisseurs, communiqués officiels.</div>
          </div>
        </div>
      </div>
      <Note>Piste B v2.2 · Brand Book Cosmos Angré · Mars 2026 · Confidentiel EXCO — New Heaven SA / RCP</Note>
    </div>
  </div>
);

/* ── PISTE C TAB ───────────────────────────────────────── */
const PisteCTab: React.FC = () => (
  <div>
    <div style={{ padding: '56px 56px 48px', borderBottom: '1px solid rgba(26,20,16,.06)' }}>
      <div style={{ fontSize: 10, letterSpacing: '.28em', textTransform: 'uppercase', color: 'rgba(26,20,16,.35)', marginBottom: 12 }}>Brand Book v2.2 · Piste C · L'Exception Naturelle</div>
      <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 48, fontWeight: 300, lineHeight: 1.05, color: '#1a1410', marginBottom: 10 }}>Bronze Africain & Kaki Végétal</div>
      <div style={{ fontSize: 13, color: 'rgba(26,20,16,.45)', lineHeight: 1.75, maxWidth: 560, marginBottom: 28 }}>v2.2 — Le kaki végétal #6D7447 remplace la terracotta vif #C97845. Le sable naturel #D6C29C remplace le sable doré #E8C49A. La palette gagne en ancrage naturel tout en conservant son identité africaine.</div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}><Pill>Kaki végétal #6D7447</Pill><Pill>Sable naturel #D6C29C</Pill><Pill>Identité africaine assumée</Pill><Pill>Cohérence bardade maximale</Pill></div>
    </div>
    <div style={{ padding: '40px 56px 56px' }}>
      <ChangelogBox title="Modifications Piste C v2.2" items={[
        { bold: 'Kaki Végétal :', text: '#C97845 (Terracotta Vif) → #6D7447 · Remplacement stratégique : le kaki végétal dialogue mieux avec le bronze doré, ancre la palette dans une chaleur plus naturelle.' },
        { bold: 'Sable Naturel :', text: '#E8C49A (Sable Naturel) → #D6C29C · Plus doux, moins jaune. Meilleur contraste avec le bronze doré #C9943A et meilleure lisibilité comme fond intermédiaire.' },
      ]} />

      {/* 01 · Palette */}
      <div style={{ marginBottom: 36 }}>
        <SH num="01" title={<>Palette chromatique — 6 couleurs <Delta>2 ajustées</Delta></>} />
        <PaletteStrip swatches={PALETTE_C} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
          <InfoCard label="Pourquoi Kaki Végétal #6D7447" text="Le #C97845 (Terracotta Vif) était trop similaire au terracotta foncé #B25A38. Le kaki végétal #6D7447 crée un vrai contraste — plus vert, plus naturel, dialogue mieux avec le bronze doré." />
          <InfoCard label="Ce que la palette dit" text="Une palette africaine assumée — ni tropicalisme caricatural, ni copie occidentale. Le sable, la terre, le bronze : le premium de la savane et de l'argile. Inédit dans le retail ivoirien." />
          <InfoCard label="⚠ Règle des 3 couleurs max" text="La palette est riche — 6 teintes. Règle absolue : jamais plus de 3 couleurs sur un même support. Fond + primaire + accent. La surcharge tuerait l'effet premium." />
        </div>
      </div>

      <Divider />

      {/* 02 · Applications */}
      <div style={{ marginBottom: 36 }}>
        <SH num="02" title="Règles d'application — 6 supports" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
          <AppCard previewBg="#2C1A0A" cat="Façade & signalétique extérieure" title="Fond Ébène · Sable Naturel · Bande #B25A38" rules="COSMOS Cormorant SemiBold Sable Naturel · ANGRÉ Inter Medium +0.3em Bronze · Bande terracotta #B25A38 accent architectural · LED warm 2800K" preview={
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 26, fontWeight: 600, color: '#D6C29C', letterSpacing: '.06em' }}>COSMOS</div>
              <div style={{ fontSize: 10, letterSpacing: '.28em', color: '#C9943A', marginTop: 4 }}>ANGRÉ</div>
              <div style={{ width: 28, height: 4, background: '#B25A38', margin: '6px auto 0', borderRadius: 2 }} />
            </div>
          } />
          <AppCard previewBg="#F2EBDD" cat="Print — Flyers, affiches, presse" title="Fond Sable Territorial · Titres Ébène · Bronze" rules="Papier mat naturel min. 150g/m² · Titres Cormorant SemiBold · Corps Inter Medium · Filet bronze cuivré séparateur" preview={
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, fontWeight: 600, color: '#2C1A0A' }}>Cosmos Angré</div>
              <div style={{ width: 28, height: 1, background: '#C9943A', margin: '6px auto' }} />
              <div style={{ fontSize: 9, color: 'rgba(44,26,10,.4)', letterSpacing: '.12em' }}>L'exceptionnel, au quotidien</div>
            </div>
          } />
          <AppCard previewBg="#2C1A0A" cat="Digital — App, site, réseaux" title="Dark Ébène · CTA Bronze Doré arrondi 4px" rules="Fond : #2C1A0A · Fond light : #F2EBDD · Boutons #C9943A arrondi 4px · Images à lumière chaude obligatoire" preview={
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 8, letterSpacing: '.18em', color: 'rgba(232,196,154,.3)', marginBottom: 5 }}>COSMOS ANGRÉ</div>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 14, fontWeight: 600, color: '#D6C29C' }}>L'exception, tout simplement.</div>
              <div style={{ marginTop: 9, display: 'inline-block', padding: '4px 14px', background: '#C9943A', borderRadius: 4, fontSize: 8, color: '#2C1A0A', fontWeight: 600 }}>EXPLORER</div>
            </div>
          } />
          <AppCard previewBg="#F2EBDD" cat="Packaging & merchandising" title="Kraft naturel brun · Cordons raphia cuivre" rules="Kraft brun chaud · Logo tampon Cormorant Cuivré · Cordons raphia ou coton cuivre · Tissu intérieur sable territorial" preview={
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: 50, height: 50, borderRadius: 4, background: '#2C1A0A', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, fontWeight: 600, color: '#C9943A' }}>C</span></div>
              <div style={{ fontSize: 8, color: 'rgba(44,26,10,.35)', marginTop: 7, letterSpacing: '.12em' }}>COSMOS ANGRÉ</div>
            </div>
          } />
          <AppCard previewBg="#2C1A0A" cat="Signalétique intérieure" title="Fond Ébène · Sable · Flèches #B25A38" rules="Panneaux fond #2C1A0A · Destination Cormorant Medium Sable · Niveau Inter Medium Bronze · Flèches cuivre brossé 2mm" preview={
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 8, color: '#C9943A', letterSpacing: '.22em', marginBottom: 5 }}>NIVEAU 1</div>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 18, fontWeight: 600, color: '#D6C29C' }}>Restauration</div>
              <div style={{ fontSize: 10, color: '#B25A38', marginTop: 4 }}>→</div>
            </div>
          } />
          <AppCard previewBg="linear-gradient(135deg,#2C1A0A,#3d2510)" cat="Événementiel — Inauguration" title="Bronze · Wengé · Linge sable · Africain" rules="Décor wengé + cuivre + tissus sable territorial · LED 2700K warm · Tapis jute naturel + cuivre · Tenue soirée africaine valorisée" preview={
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 13, fontWeight: 600, color: '#D6C29C' }}>Cosmos Angré</div>
              <div style={{ fontSize: 8, color: '#C9943A', letterSpacing: '.18em', marginTop: 3 }}>INAUGURATION</div>
              <div style={{ fontSize: 8, color: 'rgba(232,196,154,.35)', marginTop: 4 }}>16 Novembre 2026</div>
            </div>
          } />
        </div>
      </div>

      <Divider />

      {/* 03 · Signatures */}
      <div style={{ marginBottom: 36 }}>
        <SH num="03" title="Système de signatures — inchangé" />
        <div style={{ borderRadius: 14, padding: 36, textAlign: 'center', marginBottom: 12, background: 'linear-gradient(135deg,#2C1A0A,#3d2510)' }}>
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 34, fontWeight: 300, marginBottom: 8, lineHeight: 1.2, color: '#D6C29C' }}>"L'exception, tout simplement"</div>
          <div style={{ fontSize: 9, letterSpacing: '.2em', textTransform: 'uppercase', color: 'rgba(232,196,154,.28)' }}>Signature permanente · À tester FG · Façade · Institutionnel</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div style={{ background: '#fff', borderRadius: 12, border: '1px solid rgba(26,20,16,.07)', padding: 18 }}>
            <div style={{ fontSize: 9, letterSpacing: '.18em', textTransform: 'uppercase', color: 'rgba(26,20,16,.3)', marginBottom: 8 }}>Signature compacte — si FG juge la longue trop complexe</div>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, fontWeight: 300, marginBottom: 6, color: '#8a5a10' }}>"L'exceptionnel, au quotidien"</div>
            <div style={{ fontSize: 11, color: 'rgba(26,20,16,.5)', lineHeight: 1.6 }}>3 mots. Oxymoron volontaire — l'exception n'est plus inaccessible. Extrêmement mémorable.</div>
          </div>
          <div style={{ background: '#fff', borderRadius: 12, border: '1px solid rgba(26,20,16,.07)', padding: 18 }}>
            <div style={{ fontSize: 9, letterSpacing: '.18em', textTransform: 'uppercase', color: 'rgba(26,20,16,.3)', marginBottom: 8 }}>Signature institutionnelle · Investisseurs</div>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, fontWeight: 300, marginBottom: 6, color: '#8a5a10' }}>"La destination premium du quotidien."</div>
            <div style={{ fontSize: 11, color: 'rgba(26,20,16,.5)', lineHeight: 1.6 }}>Formule paradoxale volontaire. Encode les deux promesses en 5 mots.</div>
          </div>
        </div>
      </div>
      <Note>Piste C v2.2 · Brand Book Cosmos Angré · Mars 2026 · Confidentiel EXCO — New Heaven SA / RCP</Note>
    </div>
  </div>
);

/* ── PISTE D TAB ───────────────────────────────────────── */
const PisteDTab: React.FC = () => (
  <div>
    <div style={{ padding: '56px 56px 48px', borderBottom: '1px solid rgba(26,20,16,.06)' }}>
      <div style={{ fontSize: 10, letterSpacing: '.28em', textTransform: 'uppercase', color: 'rgba(26,20,16,.35)', marginBottom: 12 }}>Brand Book v2.2 · Piste D · Nature Contemporaine</div>
      <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 48, fontWeight: 300, lineHeight: 1.05, color: '#1a1410', marginBottom: 10 }}>Pierre Beige & Kaki Soleil</div>
      <div style={{ fontSize: 13, color: 'rgba(26,20,16,.45)', lineHeight: 1.75, maxWidth: 560, marginBottom: 28 }}>La nature structure l'identité. Pierre beige dominante (32%) — chaleur minérale du sol ivoirien. Le kaki soleil ancre la végétation tropicale. L'or soleil signe le prestige. Une palette inimitable car la végétation mature prend 5 ans.</div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}><Pill>Pierre Beige #E5DECC</Pill><Pill>Kaki Soleil #898D5D</Pill><Pill>Or Soleil #D4A843</Pill><Pill>Identité végétale unique</Pill></div>
    </div>
    <div style={{ padding: '40px 56px 56px' }}>

      {/* 01 · Palette */}
      <div style={{ marginBottom: 36 }}>
        <SH num="01" title="Palette chromatique — 6 couleurs" />
        <PaletteStrip swatches={PALETTE_D} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
          <InfoCard label="Proportion recommandée" text="Pierre Beige 32% des surfaces (fond dominant) · Kaki Soleil 20% (façade, bardade) · Ivoire 14% (fonds secondaires) · Or Soleil 12% max (accents, signalétique) · Mousse 8% (détails végétaux) · Blanc Pur 6% (aération)" />
          <InfoCard label="Ce que la palette dit" text="La pierre beige ancre — c'est le sol, la chaleur minérale. Le kaki est la végétation vivante. L'or soleil signe le prestige sans excès. Ensemble : un lieu où la nature est l'identité, pas la décoration." />
          <InfoCard label="⚠ Barrière naturelle à la copie" text="La végétation tropicale mature prend 5 ans. Aucun concurrent ne peut répliquer cette identité en moins de temps. Le végétal et le laiton sont le langage visuel — pas un ajout cosmétique." />
        </div>
      </div>

      <Divider />

      {/* 02 · Typographie */}
      <div style={{ marginBottom: 36 }}>
        <SH num="02" title="Système typographique" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div style={{ background: '#fff', borderRadius: 14, border: '1px solid rgba(26,20,16,.07)', padding: '22px 24px' }}>
            <div style={{ fontSize: 9, letterSpacing: '.22em', textTransform: 'uppercase', color: 'rgba(26,20,16,.32)', marginBottom: 6 }}>Typographie Primaire — Titres & signature</div>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 36, color: '#898D5D', lineHeight: 1.1, margin: '10px 0 12px' }}>Cosmos Angré</div>
            <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 4 }}>Cormorant Garamond Light (300)</div>
            <div style={{ fontSize: 11, color: 'rgba(26,20,16,.45)', lineHeight: 1.65 }}>Usage · Nom de marque · Signature · Titres principaux · Façade<br />Corps façade : 80px+ · Print : 36–60px · Digital : 28–48px</div>
          </div>
          <div style={{ background: '#fff', borderRadius: 14, border: '1px solid rgba(26,20,16,.07)', padding: '22px 24px' }}>
            <div style={{ fontSize: 9, letterSpacing: '.22em', textTransform: 'uppercase', color: 'rgba(26,20,16,.32)', marginBottom: 6 }}>Typographie Secondaire — Corps & navigation</div>
            <div style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 24, color: '#1a1410', lineHeight: 1.1, margin: '10px 0 12px' }}>Ici, on vit quelque chose</div>
            <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 4 }}>Inter Regular / Medium (400 · 500)</div>
            <div style={{ fontSize: 11, color: 'rgba(26,20,16,.45)', lineHeight: 1.65 }}>Usage · Corps de texte · Signalétique · App · Navigation · Labels<br />Signalétique : 14–16px · App : 12–14px · Légendes : 10–11px</div>
          </div>
        </div>
      </div>

      <Divider />

      {/* 03 · Applications */}
      <div style={{ marginBottom: 36 }}>
        <SH num="03" title="Règles d'application — 6 supports" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
          <AppCard previewBg="#1C2215" cat="Façade & signalétique extérieure" title="Fond Forêt Nuit · Lettrage Pierre · Or Soleil" rules="COSMOS Cormorant Light Pierre Beige · ANGRÉ Inter SemiBold +0.3em Or Soleil · Végétation encadrant l'entrée · LED warm white 3000K · Laiton brossé pour totems" preview={
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 26, fontWeight: 300, color: '#E5DECC', letterSpacing: '.08em' }}>COSMOS</div>
              <div style={{ fontSize: 10, letterSpacing: '.3em', color: '#D4A843', marginTop: 4 }}>ANGRÉ</div>
              <div style={{ width: 28, height: 1, background: '#D4A843', margin: '6px auto' }} />
              <div style={{ fontSize: 8, color: 'rgba(229,222,204,.35)', fontStyle: 'italic', letterSpacing: '.06em' }}>Ici, on vit quelque chose</div>
            </div>
          } />
          <AppCard previewBg="#E5DECC" cat="Print — Flyers, affiches, bâches" title="Fond Pierre Beige · Titres Forêt · Accent Or" rules="Papier mat naturel min. 150g/m² · Jamais brillant · Titre Cormorant min. 28pt · Corps Inter Regular 10–12pt · Filet or soleil séparateur · Motifs végétaux discrets" preview={
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, color: '#1C2215' }}>COSMOS ANGRÉ</div>
              <div style={{ width: 32, height: 1, background: '#D4A843', margin: '6px auto' }} />
              <div style={{ fontSize: 9, color: 'rgba(28,34,21,.4)', letterSpacing: '.12em' }}>Nature Contemporaine</div>
            </div>
          } />
          <AppCard previewBg="linear-gradient(135deg,#1C2215,#898D5D)" cat="Digital — App, site, réseaux sociaux" title="Dark mode Forêt · CTAs Or Soleil" rules="Background : #1C2215 ou #E5DECC · Boutons : #D4A843 · Photos nature tropicale obligatoires · Icônes filet 1.5px · Pas de fond blanc pur" preview={
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 8, letterSpacing: '.2em', color: 'rgba(255,255,255,.35)', marginBottom: 5 }}>COSMOS ANGRÉ</div>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 16, fontWeight: 300, color: '#fff' }}>Votre oasis. Votre centre.</div>
              <div style={{ marginTop: 8, display: 'inline-block', padding: '4px 14px', background: '#D4A843', borderRadius: 12, fontSize: 8, color: '#1C2215' }}>Explorer</div>
            </div>
          } />
          <AppCard previewBg="#E5DECC" cat="Packaging & merchandising" title="Kraft pierre · Logo laiton brossé" rules="Kraft naturel teinté pierre beige · Logo tampographié Or Soleil · Cordons coton naturel · Tissu intérieur ivoire · Motif feuille tropicale en gaufrage discret" preview={
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: 52, height: 52, borderRadius: '50%', background: '#1C2215', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, color: '#D4A843' }}>C</span></div>
              <div style={{ fontSize: 8, color: 'rgba(28,34,21,.35)', marginTop: 7, letterSpacing: '.15em' }}>COSMOS ANGRÉ</div>
            </div>
          } />
          <AppCard previewBg="#1C2215" cat="Signalétique intérieure" title="Fond Forêt · Pierre Beige · Flèches Or" rules="Panneaux fond #1C2215 · Texte Inter Medium Pierre Beige · Flèches #D4A843 laiton brossé · Totems intégrés dans la végétation · Hauteur min. 30cm" preview={
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 9, color: '#D4A843', letterSpacing: '.2em', marginBottom: 5 }}>NIVEAU P1</div>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, fontWeight: 300, color: '#E5DECC' }}>→ Jardin</div>
            </div>
          } />
          <AppCard previewBg="linear-gradient(135deg,#1C2215,#2a3320)" cat="Événementiel — Inauguration" title="Végétal vivant · Laiton · Sobre & naturel" rules="Décor végétal tropical vivant · Mobilier bois + laiton · LED 3000K warm · Tapis jute naturel · Pas de plastique · Senteurs végétales" preview={
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 14, color: 'rgba(255,255,255,.9)', marginBottom: 3 }}>Cosmos Angré</div>
              <div style={{ fontSize: 8, color: '#D4A843', letterSpacing: '.2em' }}>INAUGURATION</div>
              <div style={{ fontSize: 9, color: 'rgba(255,255,255,.4)', marginTop: 5 }}>16 Novembre 2026</div>
            </div>
          } />
        </div>
      </div>

      <Divider />

      {/* 04 · Signatures */}
      <div style={{ marginBottom: 36 }}>
        <SH num="04" title="Système de signatures" />
        <div style={{ borderRadius: 14, padding: 36, textAlign: 'center', marginBottom: 12, background: 'linear-gradient(135deg,#1C2215,#3D4A2A)' }}>
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 34, fontWeight: 300, marginBottom: 8, lineHeight: 1.2, color: '#E5DECC' }}>"Ici, on vit quelque chose"</div>
          <div style={{ fontSize: 9, letterSpacing: '.2em', textTransform: 'uppercase', color: 'rgba(229,222,204,.3)' }}>Signature permanente · Façade · Institutionnel · Baux</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div style={{ background: '#fff', borderRadius: 12, border: '1px solid rgba(26,20,16,.07)', padding: 18 }}>
            <div style={{ fontSize: 9, letterSpacing: '.18em', textTransform: 'uppercase', color: 'rgba(26,20,16,.3)', marginBottom: 8 }}>Signature campagne · Lancement</div>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, fontWeight: 300, marginBottom: 6, color: '#898D5D' }}>"Cocody vient de changer d'adresse"</div>
            <div style={{ fontSize: 11, color: 'rgba(26,20,16,.5)', lineHeight: 1.6 }}>Usage : pub extérieure, réseaux, teasing pré-ouverture. Ancrage local fort — Cocody comme territoire.</div>
          </div>
          <div style={{ background: '#fff', borderRadius: 12, border: '1px solid rgba(26,20,16,.07)', padding: 18 }}>
            <div style={{ fontSize: 9, letterSpacing: '.18em', textTransform: 'uppercase', color: 'rgba(26,20,16,.3)', marginBottom: 8 }}>Signature institutionnelle · Investisseurs</div>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, fontWeight: 300, marginBottom: 6, color: '#898D5D' }}>"Le premier centre commercial où la nature est l'identité"</div>
            <div style={{ fontSize: 11, color: 'rgba(26,20,16,.5)', lineHeight: 1.6 }}>Positionnel, différenciant. La végétation mature (5 ans) comme barrière naturelle à la copie.</div>
          </div>
        </div>
      </div>
      <Note>Piste D v2.2 · Brand Book Cosmos Angré · Mars 2026 · Confidentiel EXCO — New Heaven SA / RCP</Note>
    </div>
  </div>
);

/* ── FG TAB ────────────────────────────────────────────── */
const FGTab: React.FC = () => (
  <div>
    <div style={{ padding: '56px 56px 48px', borderBottom: '1px solid rgba(26,20,16,.06)' }}>
      <div style={{ fontSize: 10, letterSpacing: '.28em', textTransform: 'uppercase', color: 'rgba(26,20,16,.35)', marginBottom: 12 }}>Brief Fernand · Focus Group 20-25 Mars 2026 · v2.2</div>
      <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 48, fontWeight: 300, lineHeight: 1.05, color: '#1a1410', marginBottom: 10 }}>15 stimuli visuels.<br />Palettes v2.2 applicables.</div>
      <div style={{ fontSize: 13, color: 'rgba(26,20,16,.45)', lineHeight: 1.75, maxWidth: 560, marginBottom: 28 }}>Les specs stimuli sont identiques à v1. Seules les valeurs HEX changent selon les ajustements v2.2. Fernand doit utiliser les nouvelles valeurs ci-dessous.</div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}><Pill>Kaki A : #76764D</Pill><Pill>Kaki C : #6D7447</Pill><Pill>Sable C : #D6C29C</Pill><Pill>Deadline 15 mars 2026</Pill></div>
    </div>
    <div style={{ padding: '40px 56px 56px' }}>
      <ChangelogBox title="Mise à jour HEX pour Fernand — v2.2" items={[
        { bold: 'Piste A :', text: 'Remplacer #3D6B4F → #76764D (Kaki Minéral) dans tous les stimuli A1 à A5. Reste de la palette A inchangé.' },
        { bold: 'Piste B :', text: 'Aucun changement. Piste B reste intacte.' },
        { bold: 'Piste C :', text: 'Remplacer #C97845 → #6D7447 (Kaki Végétal) · Remplacer #E8C49A → #D6C29C (Sable Naturel) dans tous les stimuli C1 à C5.' },
        { bold: 'Piste D :', text: 'Nouvelle piste — Pierre Beige #E5DECC dominant (32%) · Kaki Soleil #898D5D · Or Soleil #D4A843 · Mousse #6B7A4A · Forêt Nuit #1C2215. Stimuli D1 à D5 à créer.' },
      ]} />
      <Note>
        Brief Fernand v2.2 · 15 stimuli · Cosmos Angré · Focus Group 20-25 Mars 2026 · Confidentiel New Heaven SA / RCP<br />
        Toutes les specs de contenu, formats et règles générales restent identiques à la v1. Seules les valeurs HEX listées ci-dessus sont mises à jour.<br />
        Remise · PDF 300dpi + PNG 72dpi · Deadline ferme 15 mars 2026
      </Note>
    </div>
  </div>
);

/* ── MAIN COMPONENT ────────────────────────────────────── */
const DirectionsArtistiques: React.FC = () => {
  const [tab, setTab] = useState<TabKey>('intro');

  const handleSwitchDirection = useCallback((e: Event) => {
    const detail = (e as CustomEvent).detail as string;
    const map: Record<string, TabKey> = { A: 'scA', B: 'scB', C: 'scC', D: 'scD', intro: 'intro', fg: 'fg', '1': 'scA', '2': 'scB', '3': 'scC', '4': 'scD' };
    const target = map[detail];
    if (target) setTab(target);
  }, []);

  useEffect(() => {
    window.addEventListener('switch-direction', handleSwitchDirection);
    return () => window.removeEventListener('switch-direction', handleSwitchDirection);
  }, [handleSwitchDirection]);

  return (
    <div id="da" className="px-4 sm:px-8 lg:px-[72px] pb-16">
      <div className="bg-white rounded-2xl border border-black/[.06] overflow-hidden shadow-[0_2px_20px_rgba(0,0,0,.04)]">
        {/* Header */}
        <div className="relative px-8 py-8 bg-gradient-to-br from-navy via-[#16213e] to-navy overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(201,148,58,.1)_0%,transparent_60%)]" />
          <div className="relative z-10">
            <div className="text-[9px] font-bold tracking-[.2em] uppercase text-gold/70 mb-2">Livrable 2.2</div>
            <div className="font-cormorant text-[30px] text-white font-light">Brand Book v2.2</div>
            <div className="text-[11px] text-white/35 mt-1.5">Palettes · Typographie · Applications · Signatures · Stimuli FG</div>
          </div>
        </div>

        {/* Tab bar */}
        <div style={{ background: '#fff', borderBottom: '2px solid rgba(26,20,16,.08)', padding: '0 32px', display: 'flex', gap: 0, overflowX: 'auto' }}>
          {TABS.map(t => {
            const active = tab === t.id;
            const colors: Record<TabKey, string> = { intro: '#1a1410', scA: '#2F5439', scB: '#0D1B4B', scC: '#B25A38', scD: '#898D5D', fg: '#92400e' };
            return (
              <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: '14px 18px', border: 'none', background: 'transparent', borderBottom: active ? `3px solid ${colors[t.id]}` : '3px solid transparent', color: active ? colors[t.id] : 'rgba(26,20,16,.38)', fontSize: 11, fontWeight: active ? 700 : 500, cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all .15s' }}>
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        {tab === 'intro' && <IntroTab onSwitch={setTab} />}
        {tab === 'scA' && <PisteATab />}
        {tab === 'scB' && <PisteBTab />}
        {tab === 'scC' && <PisteCTab />}
        {tab === 'scD' && <PisteDTab />}
        {tab === 'fg' && <FGTab />}
      </div>
    </div>
  );
};

export default DirectionsArtistiques;
