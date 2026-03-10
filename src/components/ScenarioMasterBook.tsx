import React, { useState, useRef } from 'react';
import type { ScenarioKey } from './Scenarios';
import { smbThemes, smbContent } from './scenarioMasterBookData';
import BrandWorld from './BrandWorld';
import './scenario-masterbook.css';

/* ── Logo SVG réutilisable ── */
const CosmosLogoSVG: React.FC<{ dotStroke: string; height?: number }> = ({ dotStroke, height = 60 }) => (
  <svg viewBox="-2 -2 334 78" height={height} xmlns="http://www.w3.org/2000/svg" aria-label="Cosmos Angré">
    <path d="M 37,5 A 22,22 0 1,0 37,39" fill="none" stroke={dotStroke} strokeWidth="3.5" strokeDasharray="0.1 5.8" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="74" cy="22" r="20" fill="none" stroke="#C9943A" strokeWidth="2"/>
    <path d="M 34,8 C 32,2 26,0 19,0 C 10,0 1,4 1,12 C 1,19 9,22 19,22 C 29,22 37,25 37,33 C 37,40 30,44 21,44 C 15,44 5,42 2,36" transform="translate(108,0)" fill="none" stroke={dotStroke} strokeWidth="3.5" strokeDasharray="0.1 5.8" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M 0,44 L 0,0 L 20,26 L 40,0 L 40,44" transform="translate(162,0)" fill="none" stroke={dotStroke} strokeWidth="3.5" strokeDasharray="0.1 5.8" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="236" cy="22" r="20" fill="#C9943A"/>
    <path d="M 34,8 C 32,2 26,0 19,0 C 10,0 1,4 1,12 C 1,19 9,22 19,22 C 29,22 37,25 37,33 C 37,40 30,44 21,44 C 15,44 5,42 2,36" transform="translate(270,0)" fill="none" stroke={dotStroke} strokeWidth="3.5" strokeDasharray="0.1 5.8" strokeLinecap="round" strokeLinejoin="round"/>
    <text x="308" y="72" textAnchor="end" fontFamily="'Inter','Helvetica Neue',sans-serif" fontSize="16" fontWeight="600" letterSpacing="4" fill="#C9943A">ANGRÉ</text>
  </svg>
);

interface ScenarioMasterBookProps {
  scenarioKey: ScenarioKey;
  onBack: () => void;
}

const ScenarioMasterBook: React.FC<ScenarioMasterBookProps> = ({ scenarioKey, onBack }) => {
  const mainRef = useRef<HTMLDivElement>(null);
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({ a: true, b: true, c: true });

  const d = smbContent[scenarioKey];
  const theme = smbThemes[scenarioKey];

  const toggleGroup = (id: string) => {
    setOpenGroups(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const exportPDF = () => {
    const style = document.createElement('style');
    style.id = 'smb-print';
    style.textContent = `
      @media print {
        body * { visibility: hidden; }
        .smb-main, .smb-main * { visibility: visible; }
        .smb-nav, #sidebar, nav, [data-export-hide], .fixed, .smb-nav-footer { display: none !important; }
        .smb { display: block !important; }
        .smb-main {
          position: absolute; left: 0; top: 0; width: 100%;
          margin: 0; padding: 0;
          height: auto !important; overflow: visible !important;
        }
        section { page-break-inside: avoid; break-inside: avoid; }
        .hero-wrap { page-break-after: always; }
        @page { size: A4 portrait; margin: 12mm 10mm; }
      }
    `;
    document.head.appendChild(style);
    window.print();
    setTimeout(() => document.getElementById('smb-print')?.remove(), 1000);
  };

  return (
    <div className="smb" style={theme as React.CSSProperties}>
      {/* ── NAV ── */}
      <nav className="smb-nav">
        <div className="smb-nav-brand">
          <div className="smb-nav-brand-name">Cosmos Angré</div>
          <div className="smb-nav-brand-sub">Master Book · Mars 2026</div>
        </div>

        {/* GROUPE A */}
        <div className={`smb-nav-group ${openGroups.a ? 'open' : ''}`}>
          <div className="smb-nav-group-header" onClick={() => toggleGroup('a')}>
            <span className="smb-nav-group-label">Stratégie</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span className="smb-nav-group-badge smb-badge-brand">Brand Book</span>
              <span className="smb-nav-group-arrow">›</span>
            </span>
          </div>
          <div className="smb-nav-group-links">
            <a onClick={() => scrollTo('smb-hero')}><span className="n">—</span>Couverture</a>
            <a onClick={() => scrollTo('smb-toc')}><span className="n">—</span>Sommaire</a>
            <a onClick={() => scrollTo('smb-usp')}><span className="n">A1</span>USP & Positionnement</a>
            <a onClick={() => scrollTo('smb-kapferer')}><span className="n">A2</span>Prisme de Kapferer</a>
            <a onClick={() => scrollTo('smb-valeurs')}><span className="n">A3</span>Valeurs & Ton</a>
            <a onClick={() => scrollTo('smb-signatures')}><span className="n">A4</span>Signatures</a>
            <a onClick={() => scrollTo('smb-palette')}><span className="n">A5</span>Palette chromatique</a>
            <a onClick={() => scrollTo('smb-proportions')}><span className="n">A6</span>Proportions réelles</a>
            <a onClick={() => scrollTo('smb-typo')}><span className="n">A7</span>Typographie</a>
            <a onClick={() => scrollTo('smb-matieres')}><span className="n">A8</span>Matières fondatrices</a>
            <a onClick={() => scrollTo('smb-comms')}><span className="n">A9</span>Communication</a>
          </div>
        </div>

        {/* GROUPE B */}
        <div className={`smb-nav-group ${openGroups.b ? 'open' : ''}`}>
          <div className="smb-nav-group-header" onClick={() => toggleGroup('b')}>
            <span className="smb-nav-group-label">Brand World</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span className="smb-nav-group-badge smb-badge-bw">Identité</span>
              <span className="smb-nav-group-arrow">›</span>
            </span>
          </div>
          <div className="smb-nav-group-links">
            <a onClick={() => scrollTo('smb-bw-logo')}><span className="n">B1</span>Déclinaisons logo</a>
            <a onClick={() => scrollTo('smb-bw-parcours')}><span className="n">B2</span>Parcours client</a>
            <a onClick={() => scrollTo('bw-signaletique')}><span className="n">B3</span>Signalétique & Totems</a>
            <a onClick={() => scrollTo('bw-textile')}><span className="n">B4</span>Uniformes & Textile</a>
            <a onClick={() => scrollTo('bw-goodies')}><span className="n">B5</span>Goodies & Objets</a>
            <a onClick={() => scrollTo('bw-digital')}><span className="n">B6</span>Digital Mockups</a>
            <a onClick={() => scrollTo('bw-personas')}><span className="n">B7</span>Personas & Focus Group</a>
          </div>
        </div>

        {/* GROUPE C */}
        <div className={`smb-nav-group ${openGroups.c ? 'open' : ''}`}>
          <div className="smb-nav-group-header" onClick={() => toggleGroup('c')}>
            <span className="smb-nav-group-label">Tenant Guidelines</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span className="smb-nav-group-badge smb-badge-tenant">Enseignes</span>
              <span className="smb-nav-group-arrow">›</span>
            </span>
          </div>
          <div className="smb-nav-group-links">
            <a onClick={() => scrollTo('smb-intro-tenant')}><span className="n">C1</span>Introduction enseignes</a>
            <a onClick={() => scrollTo('smb-charte-facade')}><span className="n">C2</span>Charte façade boutique</a>
            <a onClick={() => scrollTo('smb-zones')}><span className="n">C3</span>Zones & Gabarits</a>
            <a onClick={() => scrollTo('smb-espaces-communs')}><span className="n">C4</span>Espaces communs</a>
            <a onClick={() => scrollTo('smb-materiaux')}><span className="n">C5</span>Matériaux autorisés</a>
            <a onClick={() => scrollTo('smb-signaletique-tenant')}><span className="n">C6</span>Signalétique enseigne</a>
            <a onClick={() => scrollTo('smb-galeries-3d')}><span className="n">C7</span>Visuels galeries</a>
            <a onClick={() => scrollTo('smb-risques')}><span className="n">D1</span>Risques & Avantage</a>
          </div>
        </div>

        <div className="smb-nav-footer">
          <button
            onClick={exportPDF}
            style={{
              width: '100%', padding: '10px 0', marginBottom: 12,
              background: 'var(--bronze)', color: '#fff', border: 'none',
              borderRadius: 8, fontSize: 11, fontWeight: 600, letterSpacing: 1,
              cursor: 'pointer', textTransform: 'uppercase',
            }}
          >
            Exporter en PDF
          </button>
          <p>Confidentiel EXCO<br/>New Heaven SA / CRMC<br/>© 2026</p>
        </div>
      </nav>

      {/* ── MAIN ── */}
      <div className="smb-main" ref={mainRef}>

        {/* HERO */}
        <section style={{ padding: 0 }} id="smb-hero">
          <div className="hero-wrap">
            <div className="hero-l">
              <div className="hero-l-glow" />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ fontSize: 8, letterSpacing: 4, color: 'rgba(var(--bronze-rgb),0.6)', textTransform: 'uppercase', marginBottom: 28 }}>{d.finaleSub}</div>
                <div className="hero-h1">Cosmos<br/><span style={{ color: 'var(--bronze)' }}>Angré</span></div>
                <div style={{ width: 40, height: 1, background: 'var(--bronze)', margin: '28px 0' }} />
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 18, fontStyle: 'italic', color: 'rgba(var(--fond-rgb),0.55)', lineHeight: 1.6 }}>"{d.heroQuote}{'\n'}{d.heroQuoteHighlight}"</div>
              </div>
              <div style={{ position: 'relative', zIndex: 1, fontSize: 7.5, color: 'rgba(var(--fond-rgb),0.2)', letterSpacing: 2 }}>DOCUMENT EXCO CONFIDENTIEL · NEW HEAVEN SA / CRMC · MARS 2026</div>
            </div>
            <div className="hero-r">
              <div className="hero-r-top">
                <div className="hero-r-label">Ce document</div>
                <div className="hero-r-title">Trois parties intégrées</div>
                <div className="hero-r-text">
                  <strong style={{ color: 'var(--terra)' }}>Partie A — Stratégie & Brand Book :</strong> l'identité de marque ancrée dans le quartier — proportions chromatiques, système visuel, ton chaleureux.<br/><br/>
                  <strong style={{ color: 'var(--ebene-deep)' }}>Partie B — Brand World :</strong> les déclinaisons logo, la signalétique wayfinding, la collection de marque et le parcours client.<br/><br/>
                  <strong style={{ color: 'var(--kaki)' }}>Partie C — Tenant Guidelines :</strong> les règles d'aménagement pour les enseignes — façades, signalétique, matériaux, gabarits.<br/><br/>
                  Les trois parties partagent la même philosophie : un écrin neutre et premium qui libère les enseignes et affirme l'identité Cosmos sur les points de contact stratégiques.
                </div>
              </div>
              <div className="hero-r-kpi">
                <div className="kpi"><div className="kpi-val">Oct. 26</div><div className="kpi-label">Soft opening<br/>Cosmos Angré</div></div>
                <div className="kpi"><div className="kpi-val">Nov. 26</div><div className="kpi-label">Inauguration<br/>officielle</div></div>
                <div className="kpi"><div className="kpi-val">60%</div><div className="kpi-label">Sortent de Cocody<br/>pour leurs courses</div></div>
                <div className="kpi"><div className="kpi-val">93%</div><div className="kpi-label">Favorables<br/>au concept</div></div>
              </div>
            </div>
          </div>
        </section>

        {/* TABLE DES MATIÈRES */}
        <section className="bg-gris" id="smb-toc" style={{ padding: '56px 64px' }}>
          <div className="eyebrow grey">Sommaire</div>
          <div className="toc-wrap">
            <div className="toc-title">Table des matières</div>
            <div className="toc-cols">
              <div>
                <div className="toc-col-head brand">Partie A · Stratégie & Brand Book</div>
                {['A1 · USP & Positionnement','A2 · Prisme de Kapferer','A3 · Valeurs & Ton éditorial','A4 · Signatures verbales','A5 · Palette chromatique','A6 · Proportions réelles','A7 · Typographie','A8 · Matières fondatrices','A9 · Supports de communication'].map((t,i) => (
                  <div className="toc-item" key={i}><span className="toc-item-num">A{i+1}</span><span className="toc-item-label">{t.split(' · ')[1]}</span></div>
                ))}
              </div>
              <div>
                <div className="toc-col-head bw">Partie B · Brand World</div>
                {['B1 · Ambiance & Palette','B2 · Déclinaisons logo','B3 · Parcours client','B4 · Signalétique & Totems','B5 · Uniformes & Textile','B6 · Goodies & Objets','B7 · Mockups digitaux','B8 · Personas & Focus Group'].map((t,i) => (
                  <div className="toc-item" key={i}><span className="toc-item-num">B{i+1}</span><span className="toc-item-label">{t.split(' · ')[1]}</span></div>
                ))}
              </div>
              <div>
                <div className="toc-col-head tenant">Partie C · Tenant Guidelines</div>
                {['C1 · Introduction enseignes','C2 · Charte façade boutique','C3 · Zones & Gabarits','C4 · Espaces communs','C5 · Matériaux autorisés','C6 · Signalétique enseigne','C7 · Visuels galeries','D1 · Risques & Avantage stratégique'].map((t,i) => (
                  <div className="toc-item" key={i}><span className="toc-item-num">{t.split(' · ')[0]}</span><span className="toc-item-label">{t.split(' · ')[1]}</span></div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CHAPITRE A */}
        <div className="ch-break bg-foret" id="smb-ch-a">
          <div className="ch-num" style={{ color: 'var(--fond)' }}>A</div>
          <div className="ch-content" style={{ color: 'var(--fond)' }}>
            <div className="ch-label">Partie A</div>
            <div className="ch-title">Stratégie & Brand Book</div>
          </div>
          <div className="ch-badge" style={{ color: 'var(--fond)' }}>Identité · Positionnement</div>
        </div>

        {/* A1 — USP */}
        <section className="bg-white" id="smb-usp">
          <div className="eyebrow light">A1 · USP</div>
          <h2 className="light">Proposition de valeur unique</h2>
          <div className="sub">Ce qui ancre Cosmos Angré dans le quotidien de la zone</div>
          <div className="divider foret" />
          <div style={{ background: 'rgba(var(--terra-rgb),0.04)', border: '1px solid rgba(var(--terra-rgb),0.15)', padding: 44, marginBottom: 40 }}>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, fontWeight: 300, color: 'var(--ebene-deep)', lineHeight: 1.5 }}>
              {d.uspStatement.split(d.uspHighlight)[0]}<strong style={{ fontWeight: 700, color: 'var(--terra)' }}>{d.uspHighlight}</strong>{d.uspStatement.split(d.uspHighlight)[1]}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1px', background: 'rgba(var(--terra-rgb),0.08)' }}>
            {d.uspPillars.map((p, i) => (
              <div key={i} style={{ background: '#fff', padding: '28px 22px' }}>
                <div style={{ width: 20, height: 2, background: p.color, marginBottom: 16 }} />
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 16, fontWeight: 600, color: 'var(--ebene-deep)', marginBottom: 8 }}>{p.title}</div>
                <div style={{ fontSize: 9.5, color: 'var(--gris-chaud)', lineHeight: 1.7 }}>{p.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* A2 — KAPFERER */}
        <section className="bg-warm" id="smb-kapferer">
          <div className="eyebrow light">A2 · Identité</div>
          <h2 className="light">Prisme de Kapferer</h2>
          <div className="sub">6 facettes de l'identité de marque — {d.scenarioLabel}</div>
          <div className="divider foret" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
            {d.kapferer.map((k) => (
              <div key={k.num} style={{ background: '#fff', border: '1px solid rgba(var(--terra-rgb),0.07)', padding: 32, position: 'relative' }}>
                <div style={{ position: 'absolute', top: 16, right: 20, fontFamily: "'Cormorant Garamond',serif", fontSize: 48, fontWeight: 700, color: 'rgba(var(--terra-rgb),0.04)', lineHeight: 1 }}>{k.num}</div>
                <div style={{ fontSize: 7.5, letterSpacing: 2.5, color: 'var(--terra)', textTransform: 'uppercase', marginBottom: 8 }}>{k.facette}</div>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 18, fontWeight: 600, color: 'var(--ebene-deep)', marginBottom: 10 }}>{k.title}</div>
                <div style={{ fontSize: 9.5, color: 'var(--gris-chaud)', lineHeight: 1.7, marginBottom: 14 }}>{k.desc}</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                  {k.yes.map(t => <span key={t} style={{ fontSize: 8, padding: '3px 9px', background: 'rgba(var(--terra-rgb),0.07)', color: 'var(--terra)', border: '1px solid rgba(var(--terra-rgb),0.18)' }}>{t}</span>)}
                  {(k.no || []).map(t => <span key={t} style={{ fontSize: 8, padding: '3px 9px', background: 'rgba(var(--terra-rgb),0.03)', color: 'rgba(var(--terra-rgb),0.2)', border: '1px solid rgba(var(--terra-rgb),0.06)', textDecoration: 'line-through' }}>{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* A3 — VALEURS & TON */}
        <section className="bg-white" id="smb-valeurs">
          <div className="eyebrow light">A3 · Fondations & Éditorial</div>
          <h2 className="light">Valeurs & Ton de communication</h2>
          <div className="sub">4 piliers fondateurs · Chaleureux et ancré</div>
          <div className="divider foret" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 20, marginBottom: 40 }}>
            {d.values.map((v, i) => (
              <div key={i} style={{ padding: 36, border: '1px solid rgba(var(--terra-rgb),0.08)', borderTop: `2px solid ${v.color}` }}>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, fontWeight: 600, color: v.color, marginBottom: 8 }}>{v.title}</div>
                <div style={{ fontSize: 10, color: 'var(--gris-chaud)', lineHeight: 1.8 }}>{v.desc}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '1px', background: 'rgba(var(--terra-rgb),0.08)' }}>
            {d.toneExamples.map((t, i) => (
              <div key={i} style={{ background: 'var(--blanc-chaud)', padding: 28 }}>
                <div style={{ fontSize: 7.5, letterSpacing: 2, color: 'var(--terra)', textTransform: 'uppercase', marginBottom: 10 }}>{t.label}</div>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 18, fontStyle: 'italic', color: 'var(--ebene-deep)', marginBottom: 6 }}>{t.quote}</div>
                <div style={{ fontSize: 9, color: 'var(--gris-chaud)' }}>{t.tone}</div>
              </div>
            ))}
          </div>
        </section>

        {/* A4 — SIGNATURES */}
        <section className="bg-foret-deep" id="smb-signatures">
          <div className="eyebrow dark">A4 · Identité verbale</div>
          <h2 className="dark">Signatures</h2>
          <div className="sub" style={{ color: 'rgba(var(--fond-rgb),0.3)' }}>L'identité verbale de Cosmos Angré</div>
          <div className="divider" />
          <div style={{ border: '1px solid rgba(var(--bronze-rgb),0.2)', padding: 72, textAlign: 'center', marginBottom: 24, position: 'relative' }}>
            <div style={{ position: 'absolute', top: 16, left: 16, width: 28, height: 28, borderTop: '1px solid rgba(var(--bronze-rgb),0.3)', borderLeft: '1px solid rgba(var(--bronze-rgb),0.3)' }} />
            <div style={{ position: 'absolute', bottom: 16, right: 16, width: 28, height: 28, borderBottom: '1px solid rgba(var(--bronze-rgb),0.3)', borderRight: '1px solid rgba(var(--bronze-rgb),0.3)' }} />
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 42, fontWeight: 300, color: 'var(--fond)', lineHeight: 1.3 }}>"{d.signatureMain.text}<em style={{ color: 'var(--bronze)', fontWeight: 600 }}>{d.signatureMain.highlight}</em>"</div>
            <div style={{ width: 32, height: 1, background: 'var(--bronze)', margin: '20px auto' }} />
            <div style={{ fontSize: 8, letterSpacing: 3, color: 'var(--bronze)', textTransform: 'uppercase' }}>{d.signatureMain.sub}</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
            {d.signatureAlts.map((s, i) => (
              <div key={i} style={{ padding: 28, border: '1px solid rgba(var(--bronze-rgb),0.1)' }}>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 19, color: 'var(--fond)', fontStyle: 'italic', marginBottom: 8, lineHeight: 1.4 }}>{s.text}</div>
                <div style={{ fontSize: 8, letterSpacing: 1.5, color: 'rgba(var(--bronze-rgb),0.4)', textTransform: 'uppercase' }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </section>

        {/* A5 — PALETTE */}
        <section className="bg-white" id="smb-palette">
          <div className="eyebrow light">A5 · Couleurs</div>
          <h2 className="light">Palette chromatique</h2>
          <div className="sub">6 teintes · L'ADN colorimétrique de Cosmos Angré</div>
          <div className="divider foret" />
          <div style={{ display: 'flex', height: 56, borderRadius: 1, overflow: 'hidden', marginBottom: 32, border: '1px solid rgba(var(--terra-rgb),0.06)' }}>
            {d.paletteBar.map((b, i) => (
              <div key={i} style={{ width: b.w, background: b.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, color: b.c }}>{b.w}</div>
            ))}
          </div>
          <div className="pal-correct-grid">
            {d.paletteColors.map((p) => (
              <div className="pcol" key={p.hex}>
                <div className="pcol-swatch"><div className="pcol-swatch-inner" style={{ background: p.bg }} /></div>
                <div className="pcol-body">
                  <div className="pcol-role">{p.role}</div>
                  <div className="pcol-name">{p.name}</div>
                  <div className="pcol-hex">{p.hex}</div>
                  <div className="pcol-where">{p.where}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ background: 'rgba(var(--terra-rgb),0.04)', border: '1px solid rgba(var(--terra-rgb),0.12)', padding: '20px 24px', marginTop: 24, fontSize: 9.5, color: 'var(--ebene-deep)', lineHeight: 1.7 }}>
            <strong>Règle :</strong> Noir Chaud réservé à l'extérieur uniquement. Sable domine les intérieurs. Forêt structure. Or ponctue.
          </div>
        </section>

        {/* A6 — PROPORTIONS */}
        <section className="bg-warm" id="smb-proportions">
          <div className="eyebrow light">A6 · Colorimétrie</div>
          <h2 className="light">Proportions réelles par territoire</h2>
          <div className="sub">La règle d'or : la marque ponctue, elle n'envahit pas</div>
          <div className="divider foret" />
          <div className="prop-master">
            {d.proportions.map((card, ci) => (
              <div className="prop-card" key={ci}>
                <div className="prop-card-header"><div className="prop-card-title">{card.title}</div><div className="prop-card-sub">{card.sub}</div></div>
                <div className="prop-bar-wrap">
                  <div className="prop-bar">{card.bars.map((b,i) => <div key={i} className="prop-seg" style={{ width: b.w, background: b.bg, color: b.c }}>{b.l}</div>)}</div>
                  <div className="prop-legend">{card.legend.map((l,i) => <div key={i} className="prop-leg-row"><div className="prop-leg-dot" style={{ background: l.dot }} /><div className="prop-leg-label">{l.l}</div><div className="prop-leg-pct">{l.p}</div></div>)}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* A7 — TYPO */}
        <section className="bg-white" id="smb-typo">
          <div className="eyebrow light">A7 · Typographie</div>
          <h2 className="light">Système typographique</h2>
          <div className="sub">Cormorant Garamond + Inter — Élégance & lisibilité</div>
          <div className="divider foret" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'rgba(var(--terra-rgb),0.08)' }}>
            {d.typoSections.map((ts, i) => (
              <div key={i} style={{ background: i % 2 === 0 ? 'var(--blanc-chaud)' : '#fff', padding: 40 }}>
                <div style={{ fontSize: 7.5, letterSpacing: 2.5, color: 'var(--gris-chaud)', textTransform: 'uppercase', marginBottom: 16 }}>{ts.label}</div>
                <div style={{ fontFamily: ts.fontFamily, fontSize: ts.fontSize, fontWeight: ts.fontWeight, fontStyle: ts.fontStyle || undefined, color: ts.color, lineHeight: ts.fontSize > 20 ? 1 : 1.9 }}>{ts.example[0]}<br/>{ts.example[1]}</div>
                <div style={{ fontSize: 9, color: 'var(--gris-chaud)', marginTop: 14, borderTop: '1px solid rgba(var(--terra-rgb),0.07)', paddingTop: 12, lineHeight: 1.6 }}>{ts.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* A8 — MATIÈRES */}
        <section className="bg-warm" id="smb-matieres">
          <div className="eyebrow light">A8 · Matériaux</div>
          <h2 className="light">Matières fondatrices</h2>
          <div className="sub">Les 4 matériaux de l'identité sensorielle Cosmos</div>
          <div className="divider foret" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 0, border: '1px solid rgba(var(--terra-rgb),0.08)' }}>
            {d.materials.map((m, i) => (
              <div key={i} style={{ borderRight: i < 3 ? '1px solid rgba(var(--terra-rgb),0.08)' : 'none', overflow: 'hidden' }}>
                <div style={{ height: 160, background: m.grad }} />
                <div style={{ padding: 22, background: '#fff' }}>
                  <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 15, fontWeight: 600, color: 'var(--ebene-deep)', marginBottom: 3 }}>{m.name}</div>
                  <div style={{ fontSize: 7.5, letterSpacing: 1.5, color: 'var(--terra)', textTransform: 'uppercase', marginBottom: 8 }}>{m.sub}</div>
                  <div style={{ fontSize: 8.5, color: 'var(--gris-chaud)', lineHeight: 1.6 }}>{m.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* A9 — COMMUNICATION */}
        <section className="bg-foret-deep" id="smb-comms">
          <div className="eyebrow dark">A9 · Communication</div>
          <h2 className="dark">Supports de communication</h2>
          <div className="sub" style={{ color: 'rgba(var(--fond-rgb),0.3)' }}>Le seul territoire où les couleurs s'expriment sans contrainte</div>
          <div className="divider" />
          <div className="comms-grid">
            {d.comms.map((c, i) => (
              <div className="comm-card" key={i}>
                <div className="comm-vis" style={{ background: c.bg }}>
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: c.brandSize || 22, fontWeight: c.brandWeight || 700, letterSpacing: 5, color: 'var(--bronze)' }}>{c.brandText}</div>
                    {c.brandSub && <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 13, fontStyle: 'italic', color: 'rgba(var(--fond-rgb),0.5)', marginTop: 4 }}>{c.brandSub}</div>}
                  </div>
                </div>
                <div className="comm-body"><div className="comm-title">{c.title}</div><div className="comm-spec">{c.spec}</div></div>
              </div>
            ))}
          </div>
        </section>

        {/* CHAPITRE B */}
        <div className="ch-break bg-gris" style={{ borderTop: '3px solid var(--terra)' }}>
          <div className="ch-num" style={{ color: 'rgba(var(--terra-rgb),0.08)' }}>B</div>
          <div className="ch-content" style={{ color: 'var(--ebene-deep)' }}>
            <div className="ch-label" style={{ color: 'rgba(var(--terra-rgb),0.4)' }}>Partie B</div>
            <div className="ch-title">Brand World</div>
          </div>
          <div className="ch-badge" style={{ color: 'var(--ebene-deep)' }}>Déclinaisons & Expérience</div>
        </div>

        {/* ── BRAND WORLD (Logo, Parcours, Signalétique, Textile, Goodies, Digital, Personas) ── */}
        <section className="bg-white" style={{ padding: '0 24px 48px' }}>
          <BrandWorld scenarioKey={scenarioKey} />
        </section>

        {/* CHAPITRE C */}
        <div className="ch-break bg-kaki">
          <div className="ch-num" style={{ color: 'rgba(var(--fond-rgb),0.15)' }}>C</div>
          <div className="ch-content" style={{ color: 'var(--fond)' }}>
            <div className="ch-label" style={{ color: 'rgba(var(--fond-rgb),0.5)' }}>Partie C</div>
            <div className="ch-title">Tenant Guidelines</div>
          </div>
          <div className="ch-badge" style={{ color: 'var(--fond)' }}>Règles pour les enseignes</div>
        </div>

        {/* C1 — INTRO TENANT */}
        <section className="bg-white" id="smb-intro-tenant">
          <div className="eyebrow green">C1 · Introduction</div>
          <h2 className="light">À l'attention des enseignes</h2>
          <div className="sub">Cosmos Angré · Charte d'aménagement locataire</div>
          <div className="divider kaki" />
          <div className="tenant-intro">
            <div className="tenant-intro-icon">🏬</div>
            <div className="tenant-intro-text">
              Cosmos Angré est un <strong>écrin premium</strong> conçu pour mettre en valeur ses enseignes. Notre identité visuelle s'exprime sur les parties communes, les façades du mall et la communication globale. <strong>Dans votre espace, vous êtes chez vous.</strong><br/><br/>
              Cette charte définit les règles d'harmonie qui permettent à votre enseigne de rayonner dans un environnement cohérent et premium. Elle n'est pas contraignante — elle est protectrice.
            </div>
          </div>
        </section>

        {/* C2 — CHARTE FACADE */}
        <section className="bg-warm" id="smb-charte-facade">
          <div className="eyebrow green">C2 · Charte façade</div>
          <h2 className="light">Façade boutique</h2>
          <div className="sub">Règles d'aménagement de la devanture enseigne</div>
          <div className="divider kaki" />
          <div className="facade-grid">
            <div className="facade-card">
              <div className="facade-visual" style={{ background: 'linear-gradient(180deg,var(--pierre) 0%,var(--pierre) 65%,#d4cab8 65%)' }}>
                <div className="facade-zone" style={{ top: '8%', left: '5%', right: '5%', height: '55%', borderColor: 'rgba(var(--kaki-rgb),0.4)', color: 'var(--kaki)' }}>Zone enseigne libre</div>
              </div>
              <div className="facade-body">
                <div className="facade-title">Boutique standard — Gabarit type</div>
                <div className="facade-rules">
                  <div className="facade-rule ok">Enseigne : vos couleurs de marque, hauteur max 80cm</div>
                  <div className="facade-rule ok">Vitrine : libre dans le gabarit alloué</div>
                  <div className="facade-rule no">Débordement sur les piliers Cosmos interdit</div>
                </div>
              </div>
            </div>
            <div className="facade-card">
              <div className="facade-visual" style={{ background: 'linear-gradient(180deg,var(--pierre) 0%,var(--pierre) 65%,#d4cab8 65%)' }}>
                <div className="facade-zone" style={{ top: '5%', left: '3%', right: '3%', height: '60%', borderColor: 'rgba(var(--kaki-rgb),0.4)', color: 'var(--kaki)' }}>Zone enseigne élargie</div>
              </div>
              <div className="facade-body">
                <div className="facade-title">Enseigne anchor / restaurant — Gabarit large</div>
                <div className="facade-rules">
                  <div className="facade-rule ok">Accroche lumineuse en façade autorisée (LED blanc chaud 3000K)</div>
                  <div className="facade-rule ok">Double vitrine possible selon bail</div>
                  <div className="facade-rule no">Néon couleur vive, clignotant interdit</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* C3 — ZONES & GABARITS */}
        <section className="bg-white" id="smb-zones">
          <div className="eyebrow green">C3 · Implantation</div>
          <h2 className="light">Zones & Gabarits</h2>
          <div className="sub">Plan de zonage — Gabarits d'aménagement par type d'enseigne</div>
          <div className="divider kaki" />
          <div className="gabarit-grid">
            {[
              { type: 'Unité standard', dim: '40–80 m²', note: 'Mode, beauté, accessoires. Façade 4–6m. Hauteur libre 3.5m.' },
              { type: 'Unité moyenne', dim: '80–200 m²', note: 'Restauration assise, sport, maison. Façade 6–10m. Terrasse possible.' },
              { type: 'Grande unité', dim: '200–500 m²', note: 'Anchor secondaire, lifestyle. Double façade. Signalétique élargie.' },
              { type: 'Anchor', dim: '500 m²+', note: 'Supermarché, cinéma, food court. Règles spécifiques. Négociation directe CRMC.' },
            ].map((g, i) => (
              <div className="gab-card" key={i}><div className="gab-type">{g.type}</div><div className="gab-dim">{g.dim}</div><div className="gab-note">{g.note}</div></div>
            ))}
          </div>
        </section>

        {/* C4 — ESPACES COMMUNS */}
        <section className="bg-warm" id="smb-espaces-communs">
          <div className="eyebrow green">C4 · Espaces communs</div>
          <h2 className="light">Proportions chromatiques — espaces communs</h2>
          <div className="sub">Ce que Cosmos contrôle · Ce que vous voyez en marchant</div>
          <div className="divider kaki" />
          <div style={{ background: 'rgba(var(--kaki-rgb),0.06)', border: '1px solid rgba(var(--kaki-rgb),0.15)', padding: '20px 24px', marginBottom: 32, fontSize: 9.5, color: 'var(--ebene-deep)', lineHeight: 1.7 }}>
            <strong>Principe fondamental :</strong> les espaces communs sont neutres et lumineux pour que chaque enseigne rayonne. Les enseignes ne peuvent pas intervenir sur ces espaces.
          </div>
          <div className="commun-rule-grid">
            {d.espacesCommuns.map((c, i) => (
              <div className="cr-card" key={i}>
                <div className="cr-zone">{c.zone}</div>
                <div className="cr-title">{c.title}</div>
                <div className="cr-bar">{c.bars.map((b, j) => <div key={j} className="cr-bar-seg" style={{ width: b.w, background: b.bg, color: b.c }}>{b.l}</div>)}</div>
                <div className="cr-rules">{c.rules.map((r, j) => <div key={j} className="cr-rule">{r}</div>)}</div>
              </div>
            ))}
          </div>
        </section>

        {/* C5 — MATÉRIAUX AUTORISÉS */}
        <section className="bg-white" id="smb-materiaux">
          <div className="eyebrow green">C5 · Matériaux</div>
          <h2 className="light">Matériaux autorisés</h2>
          <div className="sub">Ce que vous pouvez utiliser pour votre façade et aménagement</div>
          <div className="divider kaki" />
          <div className="mat-allowed-grid">
            {[
              { bg: 'linear-gradient(135deg,#FAF7F2,#E8E0D5)', status: '✓ Autorisé sans restriction', cls: 'status-ok', name: 'Neutrals chauds', rule: 'Pierre naturelle, marbre crème, béton ciré clair, bois naturel clair.' },
              { bg: 'linear-gradient(135deg,var(--terra),var(--ebene-deep))', status: '✓ Autorisé sans restriction', cls: 'status-ok', name: "Bois sombres & forêt", rule: 'Chêne fumé, teck foncé, bois wengé. Recommandé pour les façades premium.' },
              { bg: 'linear-gradient(135deg,var(--bronze),#a07828)', status: '✓ Autorisé sans restriction', cls: 'status-ok', name: 'Laiton & or cuivré', rule: 'Détails en laiton brossé, or cuivré, cuivre. Harmonie directe.' },
              { bg: 'linear-gradient(135deg,#e8e8e8,#d0d0d0)', status: '⚠ Autorisé avec validation', cls: 'status-cond', name: 'Inox & acier brossé', rule: 'Finitions mates uniquement. Miroir brillant soumis à validation.' },
              { bg: 'linear-gradient(135deg,rgba(255,255,255,0.3),rgba(200,200,200,0.2))', status: '⚠ Autorisé avec validation', cls: 'status-cond', name: 'Verre & acrylique', rule: 'Transparent ou satiné autorisé. Verre teinté couleur vive soumis à validation CRMC.' },
              { bg: 'linear-gradient(135deg,#ff4444,#aa00aa)', status: '✗ Interdit en façade', cls: 'status-no', name: 'Couleurs primaires vives', rule: 'Rouge vif, bleu électrique, jaune néon en façade. Autorisé à l\'intérieur.' },
            ].map((m, i) => (
              <div className="mat-a-card" key={i}>
                <div className="mat-a-swatch" style={{ background: m.bg }} />
                <div className="mat-a-body">
                  <div className={`mat-a-status ${m.cls}`}>{m.status}</div>
                  <div className="mat-a-name">{m.name}</div>
                  <div className="mat-a-rule">{m.rule}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* C6 — SIGNALÉTIQUE ENSEIGNE */}
        <section className="bg-warm" id="smb-signaletique-tenant">
          <div className="eyebrow green">C6 · Signalétique</div>
          <h2 className="light">Signalétique propre à l'enseigne</h2>
          <div className="sub">Ce que vous pouvez installer · Ce qui est proscrit</div>
          <div className="divider kaki" />
          <div className="sign-grid">
            {[
              { title: 'Enseigne lumineuse façade', spec: 'Hauteur max 80cm · LED blanc chaud 3000K · Rétro-éclairée ou lettres découpées', yes: ['✓ Lettres découpées','✓ LED 3000K'], no: ['✗ Néon couleur','✗ Clignotant'] },
              { title: 'Panneau directionnel complémentaire', spec: 'Format A4 max · Fond crème ou blanc · Logo enseigne + numéro zone · Validé CRMC', yes: ['✓ Logo + zone','✓ Fond neutre'], no: ['✗ Fond couleur vive'] },
              { title: 'PLV & affichage vitrine', spec: 'Libre dans le gabarit alloué · Vos couleurs · Pas de débordement allée', yes: ['✓ Promotions','✓ Vos couleurs'], no: ['✗ Hors gabarit vitrine'] },
            ].map((s, i) => (
              <div className="sign-card" key={i}>
                <div className="sign-prev" style={{ background: i === 0 ? 'var(--pierre)' : i === 1 ? '#fff' : 'var(--pierre)' }}>
                  <div style={{ background: i === 0 ? 'rgba(255,255,255,0.9)' : 'var(--fond)', padding: '10px 20px', borderBottom: i === 0 ? '3px solid var(--terra)' : 'none', border: i !== 0 ? '1px solid rgba(var(--terra-rgb),0.1)' : undefined }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--ebene-deep)', letterSpacing: 2 }}>{i === 0 ? 'VOTRE ENSEIGNE' : i === 1 ? 'Votre marque' : 'Promotion -30%'}</div>
                  </div>
                </div>
                <div className="sign-body">
                  <div className="sign-title">{s.title}</div>
                  <div className="sign-spec">{s.spec}</div>
                  <div className="sign-allowed">
                    {s.yes.map(t => <span key={t} className="sign-tag sign-yes">{t}</span>)}
                    {s.no.map(t => <span key={t} className="sign-tag sign-no">{t}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* C7 — GALERIES 3D */}
        <section className="bg-white" id="smb-galeries-3d">
          <div className="eyebrow green">C7 · Visuels</div>
          <h2 className="light">Visuels galeries — L'écrin neutre</h2>
          <div className="sub">Simulations des espaces communs tels qu'ils accueilleront vos enseignes</div>
          <div className="divider kaki" />
          <div style={{ background: 'rgba(var(--kaki-rgb),0.05)', border: '1px solid rgba(var(--kaki-rgb),0.15)', padding: '20px 24px', marginTop: 20, fontSize: 9.5, color: 'var(--gris-chaud)', lineHeight: 1.7 }}>
            <strong style={{ color: 'var(--kaki)' }}>Ce que ces visuels démontrent :</strong> Les allées sont neutres et lumineuses. Votre enseigne sera le seul élément coloré visible depuis l'allée. <strong style={{ color: 'var(--ebene-deep)' }}>Votre marque respire.</strong>
          </div>
        </section>

        {/* D1 — RISQUES */}
        <section className="bg-warm" id="smb-risques">
          <div className="eyebrow light">D1 · Analyse</div>
          <h2 className="light">Risques & Avantage stratégique</h2>
          <div className="sub">Analyse critique du {d.scenarioLabel} — Document maître</div>
          <div className="divider foret" />
          <div className="risk-grid">
            <div className="risk-c">
              <div className="risk-head"><div className="risk-dot" style={{ background: '#c0392b' }} /><div className="risk-title" style={{ color: '#c0392b' }}>{d.risksLeftTitle}</div></div>
              <div className="risk-items">
                {d.risksVigilance.map((r, i) => <div key={i} className="risk-item">{r}</div>)}
              </div>
            </div>
            <div className="risk-c">
              <div className="risk-head"><div className="risk-dot" style={{ background: 'var(--kaki)' }} /><div className="risk-title" style={{ color: 'var(--kaki)' }}>{d.risksRightTitle}</div></div>
              <div className="risk-items">
                {d.risksAdvantages.map((r, i) => <div key={i} className="risk-item">{r}</div>)}
              </div>
            </div>
          </div>
        </section>

        {/* FINALE */}
        <section className="finale">
          <div style={{ position: 'relative', zIndex: 1, maxWidth: 700 }}>
            <div style={{ fontSize: 7.5, letterSpacing: 4, color: 'rgba(var(--bronze-rgb),0.4)', textTransform: 'uppercase', marginBottom: 28 }}>Cosmos Angré · Mars 2026</div>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 52, fontWeight: 300, color: 'var(--fond)', lineHeight: 1.2, marginBottom: 24 }}>"{d.finaleQuote[0]}<br/><em style={{ color: 'var(--bronze)', fontWeight: 600 }}>{d.finaleQuote[1]}</em>"</div>
            <div style={{ width: 40, height: 1, background: 'rgba(var(--bronze-rgb),0.4)', margin: '0 auto 24px' }} />
            <div style={{ fontSize: 9.5, color: 'rgba(var(--fond-rgb),0.35)', letterSpacing: 2, lineHeight: 2.2 }}>{d.finaleSub}<br/>Premier mixed-use premium · Cocody · Abidjan · Côte d'Ivoire</div>
            <div style={{ marginTop: 44, fontSize: 7.5, color: 'rgba(var(--fond-rgb),0.15)', letterSpacing: 2 }}>DOCUMENT EXCO CONFIDENTIEL · NEW HEAVEN SA / CRMC · © 2026 · TOUS DROITS RÉSERVÉS</div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default ScenarioMasterBook;
