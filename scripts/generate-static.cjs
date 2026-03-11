/**
 * Post-build script: generates static HTML pages for each scenario.
 * These pages contain all content with inline styles (no JS needed),
 * so tools like Claude AI web_fetch can read them.
 *
 * Run: node scripts/generate-static.cjs
 */

const fs = require('fs');
const path = require('path');

/* ── Read the TS data file and extract content ── */
const dataFile = fs.readFileSync(
  path.join(__dirname, '..', 'src', 'components', 'scenarioMasterBookData.tsx'),
  'utf-8'
);

/* ── Theme colors (resolved, not CSS vars) ── */
const themes = {
  A: {
    ebene: '#1A1410', ebeneDeep: '#1a3020', terra: '#2F5439', kaki: '#76764D',
    bronze: '#C9943A', sable: '#E8C97A', fond: '#F2EBDD', pierre: '#E4DDD0',
    blancChaud: '#FAF8F3', grisChaud: '#5C564E',
  },
  B: {
    ebene: '#0D1B4B', ebeneDeep: '#060E2A', terra: '#B8924A', kaki: '#1A3060',
    bronze: '#D4B06A', sable: '#D4B06A', fond: '#F2EDE3', pierre: '#E8E0D5',
    blancChaud: '#FAF7F2', grisChaud: '#6B6259',
  },
  C: {
    ebene: '#2C1A0A', ebeneDeep: '#1a0d04', terra: '#B25A38', kaki: '#6D7447',
    bronze: '#C9943A', sable: '#D4C4A8', fond: '#F2EBDD', pierre: '#E8E0D5',
    blancChaud: '#FAF7F2', grisChaud: '#6B6259',
  },
  D: {
    ebene: '#2A3320', ebeneDeep: '#1C2215', terra: '#898D5D', kaki: '#6B7A4A',
    bronze: '#D4A843', sable: '#D6D4C0', fond: '#E5DECC', pierre: '#F5F0E4',
    blancChaud: '#FAFAF6', grisChaud: '#535744',
  },
};

/* ── Parse scenario data using regex (avoid needing TS compiler) ── */
function extractScenarioData(key) {
  const varName = `content${key}`;
  const startMarker = `const ${varName}: SmbContent = {`;
  const startIdx = dataFile.indexOf(startMarker);
  if (startIdx === -1) return null;

  // Find matching closing brace
  let depth = 0;
  let i = dataFile.indexOf('{', startIdx);
  const start = i;
  for (; i < dataFile.length; i++) {
    if (dataFile[i] === '{') depth++;
    if (dataFile[i] === '}') depth--;
    if (depth === 0) break;
  }
  const objStr = dataFile.substring(start, i + 1);

  // Convert to valid JS by replacing var(--xxx) with resolved colors
  const t = themes[key];
  let js = objStr
    .replace(/var\(--terra\)/g, t.terra)
    .replace(/var\(--bronze\)/g, t.bronze)
    .replace(/var\(--kaki\)/g, t.kaki)
    .replace(/var\(--sable\)/g, t.sable)
    .replace(/var\(--ebene\)/g, t.ebene)
    .replace(/var\(--ebene-deep\)/g, t.ebeneDeep)
    .replace(/var\(--fond\)/g, t.fond)
    .replace(/var\(--pierre\)/g, t.pierre)
    .replace(/var\(--blanc-chaud\)/g, t.blancChaud)
    .replace(/var\(--gris-chaud\)/g, t.grisChaud)
    // Fix JS syntax: remove trailing commas before } or ]
    // Replace single quotes with double quotes for JSON-like parsing
    // Actually, eval is simpler for this format
    ;

  try {
    // Use Function constructor to safely evaluate the object literal
    const fn = new Function(`return (${js})`);
    return fn();
  } catch (e) {
    console.error(`Failed to parse scenario ${key}:`, e.message);
    // Try a simpler approach - extract fields with regex
    return extractFieldsManually(objStr, t);
  }
}

function extractFieldsManually(objStr, t) {
  const getStr = (field) => {
    const re = new RegExp(`${field}:\\s*['"](.+?)['"]`);
    const m = objStr.match(re);
    return m ? m[1] : '';
  };
  return {
    scenarioLabel: getStr('scenarioLabel'),
    heroQuote: getStr('heroQuote'),
    heroQuoteHighlight: getStr('heroQuoteHighlight'),
    uspStatement: getStr('uspStatement'),
    uspHighlight: getStr('uspHighlight'),
    finaleSub: getStr('finaleSub'),
  };
}

function resolveColor(c, t) {
  if (!c) return c;
  return c
    .replace(/var\(--terra\)/g, t.terra)
    .replace(/var\(--bronze\)/g, t.bronze)
    .replace(/var\(--kaki\)/g, t.kaki)
    .replace(/var\(--sable\)/g, t.sable)
    .replace(/var\(--ebene\)/g, t.ebene)
    .replace(/var\(--ebene-deep\)/g, t.ebeneDeep)
    .replace(/var\(--fond\)/g, t.fond)
    .replace(/var\(--pierre\)/g, t.pierre)
    .replace(/var\(--blanc-chaud\)/g, t.blancChaud)
    .replace(/var\(--gris-chaud\)/g, t.grisChaud);
}

/* ── Generate HTML ── */
function generateHTML(key) {
  const d = extractScenarioData(key);
  if (!d) {
    console.error(`No data for scenario ${key}`);
    return '';
  }
  const t = themes[key];

  const scenarioNames = { A: 'Enracinement Premium', B: 'Le Nouveau Repère', C: "L'Exception Naturelle", D: 'Nature Contemporaine' };

  return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Cosmos Angré — ${d.scenarioLabel} · ${scenarioNames[key] || ''}</title>
<meta name="description" content="${escHtml(d.uspStatement)}">
<meta property="og:title" content="Cosmos Angré — ${d.scenarioLabel}">
<meta property="og:description" content="${escHtml(d.uspStatement)}">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=Inter:wght@300;400;500;600;700&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Inter', sans-serif; background: ${t.fond}; color: ${t.ebene}; line-height: 1.6; }
  .container { max-width: 900px; margin: 0 auto; padding: 40px 24px; }
  h1 { font-family: 'Cormorant Garamond', serif; font-size: 48px; font-weight: 300; margin-bottom: 8px; }
  h2 { font-size: 22px; font-weight: 600; margin: 48px 0 16px; border-bottom: 2px solid ${t.bronze}; padding-bottom: 8px; }
  h3 { font-size: 16px; font-weight: 600; margin: 24px 0 8px; }
  .hero { background: ${t.ebeneDeep}; color: ${t.fond}; padding: 64px 48px; margin: -40px -24px 40px; text-align: center; }
  .hero h1 { color: ${t.fond}; font-size: 56px; }
  .hero .highlight { color: ${t.bronze}; }
  .hero .quote { font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 24px; color: ${t.sable}; margin-top: 24px; opacity: 0.7; }
  .hero .sub { font-size: 11px; letter-spacing: 3px; color: ${t.grisChaud}; margin-top: 32px; text-transform: uppercase; }
  .badge { display: inline-block; background: ${t.terra}; color: ${t.fond}; padding: 4px 16px; border-radius: 20px; font-size: 11px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 16px; }
  .card { background: ${t.blancChaud}; border-radius: 12px; padding: 24px; margin: 12px 0; border-left: 4px solid ${t.terra}; }
  .card-title { font-weight: 600; font-size: 15px; margin-bottom: 6px; }
  .card-desc { font-size: 13px; color: ${t.grisChaud}; line-height: 1.6; }
  .tags { display: flex; gap: 6px; margin-top: 8px; flex-wrap: wrap; }
  .tag { font-size: 10px; padding: 2px 10px; border-radius: 12px; font-weight: 500; }
  .tag-yes { background: ${t.terra}22; color: ${t.terra}; }
  .tag-no { background: #ff000015; color: #c00; }
  .palette-grid { display: flex; flex-wrap: wrap; gap: 12px; margin: 16px 0; }
  .color-swatch { width: 120px; border-radius: 12px; overflow: hidden; background: ${t.blancChaud}; }
  .swatch-color { height: 60px; }
  .swatch-info { padding: 8px; font-size: 10px; }
  .swatch-name { font-weight: 600; font-size: 12px; }
  .swatch-hex { color: ${t.grisChaud}; }
  .sig-main { background: ${t.ebeneDeep}; color: ${t.fond}; padding: 32px; border-radius: 16px; text-align: center; margin: 16px 0; }
  .sig-main .text { font-family: 'Cormorant Garamond', serif; font-size: 32px; font-weight: 300; }
  .sig-main .hl { color: ${t.bronze}; }
  .sig-alt { background: ${t.blancChaud}; padding: 16px 24px; border-radius: 10px; margin: 8px 0; border-left: 3px solid ${t.bronze}; }
  .sig-alt .text { font-family: 'Cormorant Garamond', serif; font-size: 20px; font-style: italic; }
  .sig-alt .sub { font-size: 11px; color: ${t.grisChaud}; margin-top: 4px; }
  table { width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 13px; }
  th { text-align: left; background: ${t.pierre}; padding: 10px 14px; font-weight: 600; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; }
  td { padding: 10px 14px; border-bottom: 1px solid ${t.pierre}; }
  .material { display: flex; align-items: center; gap: 16px; background: ${t.blancChaud}; padding: 16px; border-radius: 12px; margin: 8px 0; }
  .material-dot { width: 48px; height: 48px; border-radius: 50%; flex-shrink: 0; }
  .parcours { background: ${t.blancChaud}; border-radius: 12px; padding: 20px; margin: 12px 0; }
  .parcours-step { font-size: 10px; text-transform: uppercase; letter-spacing: 2px; color: ${t.grisChaud}; }
  .parcours-title { font-weight: 600; font-size: 15px; margin: 6px 0; }
  .parcours-text { font-size: 13px; color: ${t.grisChaud}; }
  .parcours-quote { font-family: 'Cormorant Garamond', serif; font-style: italic; color: ${t.terra}; margin-top: 8px; }
  .bar-container { display: flex; height: 28px; border-radius: 6px; overflow: hidden; margin: 8px 0; }
  .bar-seg { display: flex; align-items: center; justify-content: center; font-size: 9px; font-weight: 600; }
  .footer { background: ${t.ebeneDeep}; color: ${t.fond}; padding: 48px; text-align: center; margin: 48px -24px -40px; border-radius: 0; }
  .footer .quote { font-family: 'Cormorant Garamond', serif; font-size: 36px; font-weight: 300; }
  .footer .hl { color: ${t.bronze}; }
  .footer .sub { font-size: 11px; letter-spacing: 2px; color: ${t.grisChaud}; margin-top: 16px; }
  .risk-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin: 16px 0; }
  .risk-col h3 { font-size: 14px; margin-bottom: 12px; }
  .risk-item { font-size: 13px; padding: 8px 0; border-bottom: 1px solid ${t.pierre}; color: ${t.grisChaud}; }
  .comm-card { border-radius: 12px; padding: 24px; color: ${t.fond}; margin: 12px 0; }
  .comm-title { font-weight: 600; font-size: 15px; }
  .comm-spec { font-size: 11px; opacity: 0.7; margin-top: 4px; }
  .comm-brand { font-family: 'Cormorant Garamond', serif; font-size: 28px; margin-top: 16px; }
  .logo-variant { display: flex; align-items: center; gap: 16px; padding: 16px; border-radius: 12px; margin: 8px 0; }
  .logo-dot { width: 56px; height: 56px; border-radius: 12px; flex-shrink: 0; }
  .logo-tag { font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: ${t.grisChaud}; }
  .logo-name { font-weight: 600; font-size: 14px; margin: 4px 0; }
  .logo-spec { font-size: 12px; color: ${t.grisChaud}; }
  .espace-section { margin: 16px 0; }
  .espace-zone { font-size: 10px; text-transform: uppercase; letter-spacing: 2px; color: ${t.grisChaud}; }
  .espace-title { font-weight: 600; font-size: 15px; margin: 4px 0 8px; }
  .espace-rules { list-style: none; padding: 0; }
  .espace-rules li { font-size: 12px; padding: 4px 0; color: ${t.grisChaud}; }
  .espace-rules li::before { content: "· "; color: ${t.bronze}; font-weight: 700; }
</style>
</head>
<body>
<div class="container">

<!-- HERO -->
<div class="hero">
  <div class="badge">${escHtml(d.scenarioLabel)}</div>
  <h1>Cosmos <span class="highlight">Angré</span></h1>
  <div class="quote">"${escHtml(d.heroQuote)} ${escHtml(d.heroQuoteHighlight)}"</div>
  <div class="sub">${escHtml(d.finaleSub)}</div>
</div>

<!-- USP -->
<h2>A1 · USP & Positionnement</h2>
<p style="font-size:15px; margin-bottom: 20px;"><strong>${escHtml(d.uspHighlight)}</strong> — ${escHtml(d.uspStatement)}</p>
${(d.uspPillars || []).map(p => `
<div class="card" style="border-left-color: ${resolveColor(p.color, t)}">
  <div class="card-title">${escHtml(p.title)}</div>
  <div class="card-desc">${escHtml(p.desc)}</div>
</div>`).join('')}

<!-- KAPFERER -->
<h2>A2 · Prisme de Kapferer</h2>
${(d.kapferer || []).map(k => `
<div class="card">
  <div style="font-size:10px; color:${t.grisChaud}; text-transform:uppercase; letter-spacing:2px;">${escHtml(k.num)} · ${escHtml(k.facette)}</div>
  <div class="card-title" style="margin-top:6px">${escHtml(k.title)}</div>
  <div class="card-desc">${escHtml(k.desc)}</div>
  <div class="tags">
    ${(k.yes || []).map(y => `<span class="tag tag-yes">✓ ${escHtml(y)}</span>`).join('')}
    ${(k.no || []).map(n => `<span class="tag tag-no">✗ ${escHtml(n)}</span>`).join('')}
  </div>
</div>`).join('')}

<!-- VALEURS -->
<h2>A3 · Valeurs & Ton</h2>
<h3>Valeurs de marque</h3>
${(d.values || []).map(v => `
<div class="card" style="border-left-color: ${resolveColor(v.color, t)}">
  <div class="card-title">${escHtml(v.title)}</div>
  <div class="card-desc">${escHtml(v.desc)}</div>
</div>`).join('')}

<h3>Exemples de ton</h3>
<table>
  <tr><th>Contexte</th><th>Exemple</th><th>Ton</th></tr>
  ${(d.toneExamples || []).map(te => `<tr><td>${escHtml(te.label)}</td><td style="font-style:italic">${escHtml(te.quote)}</td><td>${escHtml(te.tone)}</td></tr>`).join('')}
</table>

<!-- SIGNATURES -->
<h2>A4 · Signatures</h2>
${d.signatureMain ? `
<div class="sig-main">
  <div class="text">${escHtml(d.signatureMain.text)}<span class="hl">${escHtml(d.signatureMain.highlight)}</span></div>
  <div style="font-size:11px; color:${t.grisChaud}; margin-top:12px">${escHtml(d.signatureMain.sub)}</div>
</div>` : ''}
${(d.signatureAlts || []).map(s => `
<div class="sig-alt">
  <div class="text">${escHtml(s.text)}</div>
  <div class="sub">${escHtml(s.sub)}</div>
</div>`).join('')}

<!-- PALETTE -->
<h2>A5 · Palette chromatique</h2>
<div class="bar-container">
  ${(d.paletteBar || []).map(b => `<div class="bar-seg" style="width:${b.w}; background:${resolveColor(b.bg, t)}; color:${resolveColor(b.c, t)}">${b.label || b.w}</div>`).join('')}
</div>
<div class="palette-grid">
  ${(d.paletteColors || []).map(c => `
  <div class="color-swatch">
    <div class="swatch-color" style="background:${resolveColor(c.bg, t)}"></div>
    <div class="swatch-info">
      <div class="swatch-name">${escHtml(c.name)}</div>
      <div class="swatch-hex">${escHtml(c.hex)} · ${escHtml(c.role)}</div>
      <div style="font-size:9px; color:${t.grisChaud}; margin-top:4px">${escHtml(c.where)}</div>
    </div>
  </div>`).join('')}
</div>

<!-- PROPORTIONS -->
<h2>A6 · Proportions chromatiques réelles</h2>
${(d.proportions || []).map(p => `
<div style="margin: 16px 0">
  <h3>${escHtml(p.title)}</h3>
  <div style="font-size:12px; color:${t.grisChaud}">${escHtml(p.sub)}</div>
  <div class="bar-container">
    ${(p.bars || []).map(b => `<div class="bar-seg" style="width:${b.w}; background:${resolveColor(b.bg, t)}; color:${resolveColor(b.c, t)}">${b.l}</div>`).join('')}
  </div>
</div>`).join('')}

<!-- TYPO -->
<h2>A7 · Typographie</h2>
<table>
  <tr><th>Usage</th><th>Police</th><th>Taille</th><th>Poids</th><th>Exemple</th></tr>
  ${(d.typoSections || []).map(ts => `<tr>
    <td>${escHtml(ts.label)}</td>
    <td style="font-family:${ts.fontFamily}">${escHtml(ts.fontFamily.split(',')[0].replace(/'/g, ''))}</td>
    <td>${ts.fontSize}px</td>
    <td>${ts.fontWeight}</td>
    <td style="font-family:${ts.fontFamily}; font-size:${Math.min(ts.fontSize, 18)}px; font-weight:${ts.fontWeight}; ${ts.fontStyle ? 'font-style:' + ts.fontStyle : ''}; color:${resolveColor(ts.color, t)}">${escHtml(ts.example[0])}</td>
  </tr>`).join('')}
</table>

<!-- MATIÈRES -->
<h2>A8 · Matières fondatrices</h2>
${(d.materials || []).map(m => `
<div class="material">
  <div class="material-dot" style="background:${m.grad}"></div>
  <div>
    <div style="font-weight:600; font-size:14px">${escHtml(m.name)}</div>
    <div style="font-size:11px; color:${t.grisChaud}">${escHtml(m.sub)}</div>
    <div style="font-size:12px; margin-top:4px">${escHtml(m.desc)}</div>
  </div>
</div>`).join('')}

<!-- COMMUNICATION -->
<h2>A9 · Communication</h2>
${(d.comms || []).map(c => `
<div class="comm-card" style="background:${resolveColor(c.bg, t)}">
  <div class="comm-title">${escHtml(c.title)}</div>
  <div class="comm-spec">${escHtml(c.spec)}</div>
  <div class="comm-brand">${escHtml(c.brandText)}</div>
  ${c.brandSub ? `<div style="font-size:13px; opacity:0.8; margin-top:8px; white-space:pre-line">${escHtml(c.brandSub).replace(/\\n/g, '\n')}</div>` : ''}
</div>`).join('')}

<!-- LOGO VARIANTS -->
<h2>B1 · Déclinaisons logo</h2>
${(d.logoVariants || []).map(lv => `
<div class="logo-variant" style="background:${t.blancChaud}">
  <div class="logo-dot" style="background:${resolveColor(lv.bg, t)}"></div>
  <div>
    <div class="logo-tag">${escHtml(lv.tag)}</div>
    <div class="logo-name">${escHtml(lv.name)}</div>
    <div class="logo-spec">${escHtml(lv.spec)}</div>
  </div>
</div>`).join('')}

<!-- PARCOURS CLIENT -->
<h2>B2 · Parcours client</h2>
${[...(d.parcoursRow1 || []), ...(d.parcoursRow2 || [])].map(p => `
<div class="parcours" style="border-left: 4px solid ${resolveColor(p.border, t)}">
  <div class="parcours-step">${escHtml(p.step)}</div>
  <div class="parcours-title">${escHtml(p.title)}</div>
  <div class="parcours-text">${escHtml(p.text)}</div>
  <div class="parcours-quote">${escHtml(p.quote)}</div>
</div>`).join('')}

<!-- ESPACES COMMUNS -->
<h2>C4 · Espaces communs</h2>
${(d.espacesCommuns || []).map(e => `
<div class="espace-section">
  <div class="espace-zone">${escHtml(e.zone)}</div>
  <div class="espace-title">${escHtml(e.title)}</div>
  <div class="bar-container">
    ${(e.bars || []).map(b => `<div class="bar-seg" style="width:${b.w}; background:${resolveColor(b.bg, t)}; color:${resolveColor(b.c, t)}">${escHtml(b.l)}</div>`).join('')}
  </div>
  <ul class="espace-rules">
    ${(e.rules || []).map(r => `<li>${escHtml(r)}</li>`).join('')}
  </ul>
</div>`).join('')}

<!-- RISQUES -->
<h2>D1 · Risques & Avantages</h2>
<div class="risk-grid">
  <div class="risk-col">
    <h3>${escHtml(d.risksLeftTitle || 'Points de vigilance')}</h3>
    ${(d.risksVigilance || []).map(r => `<div class="risk-item">⚠ ${escHtml(r)}</div>`).join('')}
  </div>
  <div class="risk-col">
    <h3>${escHtml(d.risksRightTitle || 'Avantage stratégique')}</h3>
    ${(d.risksAdvantages || []).map(r => `<div class="risk-item">✓ ${escHtml(r)}</div>`).join('')}
  </div>
</div>

<!-- FINALE -->
<div class="footer">
  <div class="quote">${escHtml(d.finaleQuote[0])} <span class="hl">${escHtml(d.finaleQuote[1])}</span></div>
  <div class="sub">${escHtml(d.finaleSub)}</div>
  <div style="margin-top:24px; font-size:10px; color:${t.grisChaud}">Confidentiel EXCO · New Heaven SA / CRMC · Mars 2026</div>
</div>

</div>
</body>
</html>`;
}

function escHtml(s) {
  if (!s) return '';
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/* ══════════════════════════════════════════════════════════════════════
   PLAN MARKETING — page statique complète (tous scénarios + plan)
   ══════════════════════════════════════════════════════════════════════ */

function generatePlanMarketingHTML() {
  const GOLD = '#C9943A', NAVY = '#1a1a2e', CREAM = '#F8F6F2', WHITE = '#FFFFFF';

  /* ── Data ── */
  const steps = [
    { num: 'ÉTAPE 1', title: 'Stratégie & Plateforme de marque', badge: 'En cours', badgeColor: '#F59E0B',
      items: [
        { done: false, text: 'Plateforme Scénario A — Premium de proximité' },
        { done: false, text: 'Plateforme Scénario B — Destination premium' },
        { done: false, text: 'Plateforme Scénario C — Hybride autonome' },
        { done: false, text: 'Plateforme Scénario D — Nature Contemporaine' },
        { done: false, text: 'Comparatif stratégique A vs B vs C vs D' },
      ], footer: 'Document plateforme 4 scénarios — EXCO / Cheick', accent: '#4A7558' },
    { num: 'ÉTAPE 2', title: 'Brand Book draft', badge: 'À faire', badgeColor: '#9CA3AF',
      items: [
        { done: false, text: 'DA Scénario A — univers, palette, typo' },
        { done: false, text: 'DA Scénario B — univers, palette, typo' },
        { done: false, text: 'DA Scénario C Hybride' },
        { done: false, text: 'DA Scénario D — Nature Contemporaine' },
        { done: true, text: 'Naming & 5 signatures posées' },
        { done: true, text: 'Moodboards textuels (brief Fernand)' },
        { done: true, text: 'Templates application (Color Book v2.0)' },
      ], footer: 'Brand Book draft 4 pistes — brief Fernand', accent: '#C9943A' },
    { num: 'ÉTAPE 3', title: 'Focus Group', badge: 'En cours', badgeColor: '#F59E0B',
      items: [
        { done: true, text: 'Protocole Yvan — 6 points corrigés' },
        { done: true, text: 'Stimuli visuels intégrés' },
        { done: true, text: '4 scénarios + bardage bronze' },
        { done: false, text: 'Noms impactants 4 positionnements' },
        { done: false, text: 'Recrutement — brief agence terrain' },
        { done: false, text: 'Grille analyse + template rapport' },
      ], footer: 'Protocole FG v2.1 — prêt à briefer agence', accent: '#C8A96E' },
    { num: 'ÉTAPE 4', title: 'Plan Marketing', badge: 'Après FG', badgeColor: '#9CA3AF',
      items: [
        { done: false, text: 'Plateforme finale (post-FG)' },
        { done: false, text: 'Plan 360 par axe' },
        { done: false, text: 'Budget ventilé — 20 actions' },
        { done: false, text: 'Business case ROI projeté' },
        { done: false, text: 'Plan digital complet' },
        { done: false, text: 'Calendrier éditorial 6 mois' },
      ], footer: 'Plan marketing validable CODIR', accent: '#e65100' },
  ];

  const decisions = [
    { ok: true, text: '4 scénarios testés au Focus Group (A, B, C, D)' },
    { ok: true, text: 'Scénario C = option hybride autonome (pas simple compromis)' },
    { ok: true, text: 'Scénario D = Nature Contemporaine — identité végétale unique, barrière naturelle 5 ans' },
    { ok: true, text: 'Analogies Sofitel/Novotel/Apple Store = usage interne uniquement' },
    { ok: true, text: 'Kiabi, Gémo, Tecno = enseignes aspirationnelles contexte ivoirien' },
    { ok: true, text: 'Zino = équivalent Sephora — ancre beauté/parfumerie premium' },
    { ok: true, text: 'Cinéma confirmé — ancre destination, 0 concurrent zone primaire' },
    { ok: true, text: 'Clinique confirmée — différenciateur mixed-use unique marché' },
    { ok: true, text: 'Bardage bronze — contrainte fixe façade, scénario 2' },
    { ok: false, text: 'Restaurant gastronomique — en cours de négociation' },
    { ok: false, text: 'FNAC ou équivalent culturel — en cours de discussion' },
  ];

  const calendar = [
    { date: 'CETTE SEMAINE — 07/03', title: 'Étape 1 — Stratégie & plateforme de marque', desc: '4 scénarios complets (A, B, C, D), cohérents, prêts à être testés.', milestone: false, active: true },
    { date: 'SEMAINE DU 09/03', title: 'Étape 2 — Brand Book draft 4 pistes', desc: 'Directions artistiques A, B, C, D + brief opérationnel pour Fernand.', milestone: false },
    { date: 'SEMAINE DU 09/03', title: 'Étape 3 — Protocole FG v2.1 complet', desc: 'Finalisation protocole + lancement recrutement agence terrain.', milestone: false },
    { date: '20 — 25/03', title: 'Focus Group — Sessions terrain', desc: '3 groupes — profils Cocody/Angré/2 Plateaux CSP+.', milestone: false },
    { date: 'SEMAINE DU 23/03', title: 'Étape 4 — Plan marketing complet', desc: 'Post-FG. Budget, business case, plan digital, calendrier éditorial.', milestone: false },
    { date: 'À PARTIR DU 27/03', title: 'Charte graphique — Démarrage avec Fernand', desc: 'Après arbitrage Focus Group. Identité visuelle finale.', milestone: false },
    { date: '16/10/2026', title: 'Soft Opening Cosmos Angré', desc: 'Ouverture progressive avec les enseignes prêtes.', milestone: true },
    { date: '16/11/2026', title: 'Inauguration officielle', desc: "Événement d'inauguration — présence médias, VIP.", milestone: true },
  ];

  const scenarios = [
    { key: 'A', label: 'Scénario A — Premium de proximité', accent: '#4A7558', grad: 'linear-gradient(135deg,#1a2e20,#2a4a35,#1a2e20)',
      usp: "Le premier centre commercial premium qui ne vous demande pas de sortir de votre quotidien pour vivre l'excellence. Cosmos Angré amène la qualité au cœur de votre vie, sans prétention, sans distance.",
      values: [
        { t: 'Proximité authentique', v: 'Premium accessible, pas élitiste. On entre sans effort.' },
        { t: 'Excellence du quotidien', v: 'La qualité comme standard, pas comme exception.' },
        { t: 'Ancrage communautaire', v: "Le lieu qui appartient à son quartier." },
        { t: 'Modernité ivoirienne', v: "Référence locale, pas copie d'un modèle occidental." },
        { t: 'Exigence invisible', v: "Le premium se voit dans les détails qu'on ne remarque pas consciemment." },
      ],
      promesse: '"Ici, le premium est chez vous. Pas dans un autre monde."',
      ton: "Chaleureux mais jamais banal. La sophistication passe par les actes, pas par le discours. Pensez Nespresso — pas Darty.",
      risk: { label: 'Risques du scénario A', text: "Risque de ne pas se différencier suffisamment de Yopougon. Difficulté à justifier les loyers premium auprès des enseignes. Peut être perçu comme \"pas assez ambitieux\" en interne." },
    },
    { key: 'B', label: 'Scénario B — Destination premium', accent: '#0D1B4B', grad: 'linear-gradient(135deg,#0d1b3e,#1a3060,#0d1b3e)',
      usp: "La première destination premium mixed-use d'Abidjan — un lieu où shopping, santé, culture, gastronomie et bureaux coexistent. Cosmos Angré n'est pas un mall. C'est une destination.",
      values: [
        { t: 'Destination de référence', v: "On se déplace pour Cosmos Angré, on ne le trouve pas sur son chemin." },
        { t: 'Excellence expérientielle', v: 'Chaque visite est une expérience complète, mémorable.' },
        { t: 'Ambition régionale', v: "La référence qui rayonne au-delà d'Abidjan." },
        { t: 'Mixed-use innovant', v: "L'unique lieu où tout coexiste : vivre, soigner, travailler, se divertir." },
        { t: 'Prestige accessible', v: "Élevé mais pas fermé. La distinction, pas l'exclusion." },
      ],
      promesse: '"Un monde à part. Le vôtre."',
      ton: "Inspirant, aspirationnel, confident. Le ton d'un hôtel 5 étoiles qui vous accueille — chaleureux mais jamais banal. Chaque mot est choisi. Chaque communication est une invitation. Le luxe d'ici — pas une copie du luxe d'ailleurs.",
      risk: { label: 'Risques du scénario B', text: "Risque d'aliéner une partie de la base client Cocody qui veut du premium accessible. Pression plus forte sur la qualité des enseignes et des services. Long délai avant que la \"destination\" soit établie dans les habitudes." },
    },
    { key: 'C', label: "Scénario C — L'Exception Naturelle", accent: '#C9943A', grad: 'linear-gradient(135deg,#2C1A0A,#B25A38,#2C1A0A)',
      usp: "Cosmos Angré est l'endroit où l'exceptionnel devient votre quotidien. Un univers complet — destination premium, centre de vie, lieu de rencontre — pensé pour ceux qui refusent de choisir entre exigence et proximité.",
      values: [
        { t: 'Hospitalité souveraine', v: "L'accueil africain élevé au rang d'art — pas un service, une manière d'être." },
        { t: 'Élévation naturelle', v: "La qualité qui ne s'annonce pas — elle se ressent." },
        { t: 'Vie complète', v: "Du marché du matin au dîner d'anniversaire, chaque facette de la vie trouve sa place." },
        { t: 'Singularité africaine', v: "Le meilleur des standards internationaux, enraciné dans la culture locale." },
      ],
      promesse: '"L\'exceptionnel, au quotidien."',
      ton: "Affirmatif et chaleureux. Sophistiqué sans être distant. Le ton d'un hôte qui a confiance en ce qu'il offre — proche de ses invités, intransigeant sur ses standards. Pensez le Four Seasons d'un quartier vivant — pas le Hilton d'un aéroport.",
      risk: { label: 'Avantage stratégique', text: "Seul scénario qui capture simultanément la cible aspiration (destination premium) et la cible proximité (centre de vie quotidien). Identité terracotta non réplicable. Grille de loyers justifiée par le positionnement. Trajectoire d'élévation vers le luxe intégrée à horizon 5 ans via le programme Cosmos Club." },
    },
    { key: 'D', label: 'Scénario D — Nature Contemporaine', accent: '#898D5D', grad: 'linear-gradient(135deg,#1C2215,#3D4A2A,#1C2215)',
      usp: "Le premier centre commercial à Cocody où la nature structure l'expérience d'achat. Le végétal est l'identité. Le laiton est le prestige.",
      values: [
        { t: "L'art de prendre son temps", v: "On y vient exprès, on y passe la journée, on y revient." },
        { t: 'Aspiration inclusive', v: "Premium accessible. La CSP+ élargie se retrouve dans un cadre qui élève le quotidien." },
        { t: 'Identité africaine', v: "Palette, matières, végétation tropicale. Le premier mall avec une âme visuelle africaine assumée." },
        { t: 'Unique par nature', v: "Ce que la nature construit en 5 ans, personne ne le copie en 5 mois." },
        { t: 'Ancrage communautaire', v: "Cosmos Angré appartient à Cocody." },
      ],
      promesse: '"Ici, on vit quelque chose."',
      ton: "Vivant, raffiné, désirable. Le ton d'Aesop — nature et premium ne s'opposent pas. Chaque communication est une invitation à venir, à rester, à revenir. Le végétal et l'or sont le langage visuel.",
      risk: { label: 'Avantage stratégique', text: "L'identité végétale est un marqueur unique inimitable à court terme. La végétation mature prend 5 ans, créant une barrière naturelle à la copie. L'or vif en signage maximise la visibilité commerciale et le drive-to-store." },
    },
  ];

  const comparRows = [
    ['Différenciation vs Yopougon', 'Moyenne', 'Forte', 'Forte', 'Très forte'],
    ['Justification loyers premium', 'Difficile', 'Facile', 'Facile', 'Facile'],
    ['Accessibilité perçue (FG)', 'Très haute', 'Moyenne', 'Haute', 'Haute'],
    ["Risque d'aliénation cible", 'Faible', 'Élevé', 'Faible', 'Faible'],
    ['Ambition long terme', 'Limitée', 'Maximale', 'Maximale', 'Maximale'],
    ['Faisabilité court terme', 'Élevée', 'Moyenne', 'Élevée', 'Moyenne'],
    ['Cohérence avec enseignes', 'Bonne', 'Très bonne', 'Très bonne', 'Très bonne'],
    ['Identité visuelle unique', 'Modérée', 'Forte', 'Forte', 'Inimitable'],
    ['Barrière à la copie', 'Faible', 'Moyenne', 'Moyenne', 'Naturelle (5 ans)'],
  ];
  const compCols = ['#1a1a2e', '#4A7558', '#0D1B4B', '#C9943A', '#898D5D'];

  const fgPhases = [
    { title: 'Phase 1 — Introduction & cadrage', time: '15 min', questions: [
      'Présentez-vous et dites-nous : quel centre commercial vous fréquentez le plus à Abidjan ? Pourquoi ?',
      'Qu\'est-ce qu\'un "centre commercial de qualité" signifie pour vous ? Donnez 3 mots.',
      'Avez-vous déjà entendu parler de Cosmos Yopougon ? Quelle image vous en avez ?',
    ]},
    { title: 'Phase 2 — Exploration spontanée attentes', time: '20 min', questions: [
      "Si un nouveau grand centre commercial ouvrait près de chez vous à Angré, qu'espéreriez-vous y trouver absolument ?",
      'Qu\'est-ce qui ferait que vous vous diriez "je dois absolument y aller" ?',
      "Un cinéma, une clinique, des bureaux, un restaurant gastronomique — qu'est-ce que vous inspirent ces éléments dans un centre commercial ?",
    ]},
    { title: 'Phase 3 — Test des 4 scénarios', time: '50 min', questions: [
      '[Stimuli Scénario A] — Première impression : ce centre vous correspond-il ? Pourquoi ?',
      "[Stimuli Scénario B] — Est-ce que ce lieu vous donne envie d'y passer la journée ?",
      '[Stimuli Scénario C] — Même questions : première impression, envie, freins.',
      '[Stimuli Scénario D] — Ce centre mise sur la végétation et la pierre naturelle. Qu\'en pensez-vous ?',
      'Si vous deviez choisir entre ces 4 univers, lequel choisiriez-vous ? Pourquoi ?',
      'Quelle est la différence que vous percevez entre les 4 ?',
    ]},
    { title: 'Phase 4 — Stimuli visuels & réactions', time: '20 min', questions: [
      '[Montrer palettes couleurs] — Quelle couleur évoque un endroit où vous aimeriez faire du shopping ?',
      '[Tester les signatures] — Laquelle de ces phrases vous donne le plus envie de visiter ce centre ?',
      "La façade bronze dorée — qu'est-ce qu'elle vous inspire ?",
    ]},
    { title: 'Phase 5 — Synthèse & projection', time: '15 min', questions: [
      "Si vous deviez donner un nom à ce centre commercial idéal, ce serait quoi ?",
      'À quelle fréquence pensez-vous que vous iriez dans ce centre ?',
      "Qu'est-ce qui manque pour que ce soit vraiment parfait ?",
    ]},
  ];

  const fgGroups = [
    ['G1', 'Femmes 25-40 ans, CSP+, Cocody/2 Plateaux, actives', '8 pers.', '110 min'],
    ['G2', 'Hommes 30-50 ans, CSP+, dirigeants/cadres, Angré/Riviera', '8 pers.', '110 min'],
    ['G3', 'Mix 25-45 ans, familles avec enfants, CSP, Cocody/Adjamé-Anono', '8 pers.', '110 min'],
  ];

  const grilleRows = [
    ['Préférence scénario global', 'Vote à main levée + justification', '>= 60% → scénario retenu'],
    ['Désirabilité signature', 'Classement 1-3 + verbatims', 'Signature #1 retenue si consensus >= 2 groupes'],
    ['Crédibilité positioning', 'Échelle 1-5 par scénario', 'Score moyen >= 4 pour validation'],
    ['Intention de fréquentation', 'Échelle 1-5 + fréquence déclarée', '>= 3.5 = potentiel confirmé'],
    ['Résonance palette couleurs', 'Association libre + ranking', 'Palette #1 retenue si consensus >= 2 groupes'],
    ['Impact ancres (cinéma, clinique)', 'Discussion guidée + scoring', 'Score >= 4 = ancre validée'],
    ['Perception prix / positionnement', 'Fourchette prix acceptable', 'Alignement avec grille de loyers'],
    ['Verbatims marquants', 'Analyse thématique qualitative', 'Top 10 verbatims pour plan marketing'],
  ];

  const plan360Phases = [
    { num: '01', label: 'Fondations & Marque', period: 'Mars → Avril 2026', color: '#0D1B4B',
      intro: 'Identité de marque validée, outils opérationnels prêts, site web en ligne, réseaux sociaux actifs.',
      actions: [
        { title: 'Charte graphique & Brand Book', budget: '3 500 000 FCFA', deadline: '31/03/2026' },
        { title: 'Site Internet officiel', budget: '8 500 000 FCFA', deadline: '16/07/2026' },
        { title: 'Réseaux sociaux — Stratégie intergénérationnelle', budget: '6 000 000 FCFA/an', deadline: '16/10/2026' },
        { title: 'Brochure commerciale & Kit enseignes', budget: '3 000 000 FCFA', deadline: '20/05/2026' },
      ]},
    { num: '02', label: 'Activation & Buzz', period: 'Mai → Juillet 2026', color: '#4A7558',
      intro: "Créer l'événement médiatique et digital 5 mois avant l'ouverture.",
      actions: [
        { title: 'Campagne teasing OOH + Digital — 3 actes', budget: '18 000 000 FCFA', deadline: '16/07/2026' },
        { title: 'Programme 20 ambassadeurs influenceurs', budget: '7 500 000 FCFA', deadline: '31/12/2026' },
        { title: 'Campagne radio & podcasts', budget: '9 000 000 FCFA', deadline: '30/09/2026' },
        { title: 'Conférence de presse — J-92', budget: '4 500 000 FCFA', deadline: '16/07/2026' },
      ]},
    { num: '03', label: 'Pré-ouverture Intensive', period: 'Août → 15 oct. 2026', color: '#8a3a0a',
      intro: "Les 10 dernières semaines. Tout converge vers le 16 octobre.",
      actions: [
        { title: 'Pré-inscription Cosmos Club — 1 000 membres', budget: '2 500 000 FCFA', deadline: '16/10/2026' },
        { title: 'Plan inauguration & Invitations VIP', budget: '25 000 000 FCFA', deadline: '16/11/2026' },
        { title: 'Signalétique directionnelle & Habillage façade', budget: '6 500 000 FCFA', deadline: '01/10/2026' },
        { title: 'Campagne digitale intensive J-45 → J0', budget: '10 000 000 FCFA', deadline: '16/10/2026' },
      ]},
    { num: '04', label: 'Ouverture & Activation', period: '16 oct. → 30 nov. 2026', color: '#7B3FA0',
      intro: "Les 6 premières semaines sont déterminantes pour l'habitude de fréquentation.",
      actions: [
        { title: 'Soft Opening — 16 octobre 2026', budget: '8 000 000 FCFA', deadline: '16/10/2026' },
        { title: 'Inauguration officielle — 16 novembre 2026', budget: '25 000 000 FCFA', deadline: '16/11/2026' },
        { title: 'Programme fidélité Cosmos Club', budget: '5 000 000 FCFA', deadline: '16/10/2026' },
        { title: 'Campagne notoriété post-ouverture', budget: '12 000 000 FCFA', deadline: '31/12/2026' },
      ]},
  ];

  const totalBudget = '≈ 155 000 000 FCFA';

  return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Cosmos Angré — Vol. 1 Plan Marketing Complet</title>
<meta name="description" content="Plan marketing stratégique Cosmos Angré — 4 scénarios de positionnement, comparatif, protocole Focus Group, plan 360° opérationnel.">
<meta property="og:title" content="Cosmos Angré — Plan Marketing">
<meta property="og:description" content="Stratégie de marque & positionnement — 4 scénarios, comparatif, Focus Group, Plan 360°">
<meta property="og:image" content="https://branding-cosmos-angr-wd7e.vercel.app/logo-cosmos.png">
<style>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300&family=Inter:wght@300;400;500;600;700&display=swap');
*{margin:0;padding:0;box-sizing:border-box;}
body{font-family:'Inter',sans-serif;background:${CREAM};color:#1a1410;line-height:1.6;}
.serif{font-family:'Cormorant Garamond',serif;}
.container{max-width:960px;margin:0 auto;padding:0 24px;}

/* HERO */
.hero{background:${NAVY};color:#fff;padding:80px 0 64px;text-align:center;position:relative;overflow:hidden;}
.hero::before{content:'';position:absolute;top:-40%;right:-10%;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,rgba(201,148,58,.08),transparent 70%);}
.hero h1{font-family:'Cormorant Garamond',serif;font-size:56px;font-weight:300;letter-spacing:-1px;position:relative;}
.hero h1 span{color:${GOLD};}
.hero .vol{font-size:10px;letter-spacing:4px;text-transform:uppercase;color:${GOLD};margin-bottom:16px;position:relative;}
.hero .sub{font-size:13px;color:rgba(255,255,255,.4);margin-top:20px;max-width:560px;margin-left:auto;margin-right:auto;line-height:1.7;position:relative;}
.hero .meta{display:flex;gap:32px;justify-content:center;margin-top:32px;font-size:10px;letter-spacing:1px;color:rgba(255,255,255,.25);text-transform:uppercase;position:relative;}

/* NAV TOC */
.toc{background:#fff;border-bottom:1px solid rgba(0,0,0,.06);padding:16px 0;position:sticky;top:0;z-index:100;backdrop-filter:blur(12px);background:rgba(255,255,255,.96);}
.toc-inner{display:flex;gap:6px;flex-wrap:wrap;justify-content:center;}
.toc a{font-size:10px;padding:5px 14px;border-radius:20px;text-decoration:none;color:rgba(26,20,16,.45);font-weight:500;letter-spacing:.3px;transition:all .2s;}
.toc a:hover{color:#1a1410;background:rgba(0,0,0,.04);}

/* SECTION */
.section{padding:64px 0;border-bottom:1px solid rgba(0,0,0,.06);}
.section:last-child{border-bottom:none;}
.eyebrow{font-size:9px;letter-spacing:3.5px;text-transform:uppercase;color:${GOLD};margin-bottom:8px;display:flex;align-items:center;gap:10px;}
.eyebrow::after{content:'';flex:0 0 28px;height:1px;background:rgba(201,148,58,.4);}
.section h2{font-family:'Cormorant Garamond',serif;font-size:38px;font-weight:300;color:${NAVY};margin-bottom:6px;line-height:1.1;}
.section .desc{font-size:13px;color:rgba(26,20,16,.4);margin-bottom:40px;max-width:600px;line-height:1.7;}

/* STEP CARDS */
.steps-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;}
.step-card{background:#fff;border-radius:16px;border:1px solid rgba(0,0,0,.06);overflow:hidden;}
.step-header{padding:20px 24px;border-bottom:1px solid rgba(0,0,0,.04);position:relative;}
.step-header::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;}
.step-num{font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin-bottom:2px;}
.step-title{font-size:15px;font-weight:600;color:${NAVY};}
.step-badge{display:inline-block;font-size:9px;font-weight:700;padding:3px 10px;border-radius:12px;letter-spacing:.5px;text-transform:uppercase;float:right;margin-top:-28px;}
.step-items{padding:16px 24px;}
.step-item{display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid rgba(0,0,0,.03);font-size:12px;color:rgba(26,20,16,.6);}
.step-item:last-child{border-bottom:none;}
.step-item .dot{width:6px;height:6px;border-radius:50%;flex-shrink:0;}
.step-item.done{color:rgba(26,20,16,.4);text-decoration:line-through;}
.step-footer{padding:12px 24px;background:rgba(248,246,242,.5);border-top:1px solid rgba(0,0,0,.04);font-size:11px;color:rgba(26,20,16,.4);}
.step-footer strong{color:rgba(26,20,16,.6);}

/* DECISIONS */
.dec-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
.dec-card{display:flex;align-items:flex-start;gap:12px;padding:16px;border-radius:12px;border:1px solid;font-size:12px;line-height:1.6;}
.dec-card.ok{background:rgba(16,185,129,.04);border-color:rgba(16,185,129,.2);color:rgba(26,20,16,.65);}
.dec-card.pending{background:rgba(245,158,11,.04);border-color:rgba(245,158,11,.2);color:rgba(180,120,30,.7);}
.dec-icon{font-size:16px;flex-shrink:0;margin-top:1px;}

/* CALENDAR */
.cal-line{position:relative;padding-left:40px;}
.cal-line::before{content:'';position:absolute;left:12px;top:12px;bottom:12px;width:2px;background:linear-gradient(to bottom,${GOLD},rgba(201,148,58,.1));}
.cal-item{position:relative;margin-bottom:16px;}
.cal-dot{position:absolute;left:-40px;top:4px;width:12px;height:12px;border-radius:50%;border:2px solid rgba(201,148,58,.4);background:#fff;}
.cal-dot.active{background:${GOLD};border-color:${GOLD};box-shadow:0 0 0 4px rgba(201,148,58,.12);}
.cal-dot.milestone{background:${GOLD};border-color:${GOLD};width:16px;height:16px;left:-42px;top:2px;box-shadow:0 0 0 4px rgba(201,148,58,.15);}
.cal-card{padding:14px 18px;border-radius:12px;background:#fff;border:1px solid rgba(0,0,0,.05);}
.cal-card.milestone{background:${NAVY};color:#fff;border:none;box-shadow:0 4px 20px rgba(0,0,0,.1);}
.cal-date{font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:${GOLD};margin-bottom:4px;}
.cal-title{font-size:14px;font-weight:600;color:${NAVY};}
.cal-card.milestone .cal-title{color:#fff;}
.cal-desc{font-size:11px;color:rgba(26,20,16,.4);margin-top:2px;}
.cal-card.milestone .cal-desc{color:rgba(255,255,255,.4);}

/* SCENARIOS */
.sc-card{background:#fff;border-radius:16px;border:1px solid rgba(0,0,0,.06);overflow:hidden;margin-bottom:24px;}
.sc-hero{padding:32px 36px;color:#fff;position:relative;overflow:hidden;}
.sc-hero::before{content:'';position:absolute;inset:0;opacity:.04;background-image:radial-gradient(circle,#fff 1px,transparent 1px);background-size:24px 24px;}
.sc-hero .label{font-size:9px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,.5);margin-bottom:8px;position:relative;}
.sc-hero h3{font-family:'Cormorant Garamond',serif;font-size:28px;font-weight:300;position:relative;}
.sc-body{padding:32px 36px;}
.sc-section{margin-bottom:28px;}
.sc-section:last-child{margin-bottom:0;}
.sc-section-title{font-size:9px;font-weight:700;letter-spacing:2px;text-transform:uppercase;padding-bottom:8px;border-bottom:1px solid;margin-bottom:12px;}
.sc-usp{font-size:13px;color:rgba(26,20,16,.65);line-height:1.8;}
.sc-values{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
.sc-val{padding:14px;border-radius:10px;border:1px solid rgba(0,0,0,.04);}
.sc-val-num{width:22px;height:22px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:#fff;margin-bottom:6px;}
.sc-val-title{font-size:11px;font-weight:700;color:${NAVY};margin-bottom:3px;}
.sc-val-text{font-size:11px;color:rgba(26,20,16,.45);line-height:1.5;}
.sc-promesse{background:rgba(248,246,242,.5);border-radius:12px;padding:20px;border:1px solid rgba(0,0,0,.04);}
.sc-promesse-text{font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:300;font-style:italic;color:${NAVY};}
.sc-ton{font-size:13px;color:rgba(26,20,16,.55);line-height:1.8;}
.sc-risk{border-radius:12px;padding:18px;border:1px solid;font-size:13px;line-height:1.8;}
.sc-risk-label{font-size:11px;font-weight:700;margin-bottom:6px;}

/* COMPARATIF */
.comp-table{width:100%;border-collapse:collapse;font-size:12px;border-radius:12px;overflow:hidden;border:1px solid rgba(0,0,0,.06);}
.comp-table th{padding:12px 16px;text-align:left;font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#fff;}
.comp-table td{padding:10px 16px;border-bottom:1px solid rgba(0,0,0,.04);}
.comp-table tr:nth-child(even){background:rgba(248,246,242,.4);}
.comp-table td:first-child{font-weight:500;color:${NAVY};}
.comp-table td:not(:first-child){color:rgba(26,20,16,.55);}

/* FG */
.fg-groups{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-bottom:32px;}
.fg-group{background:#fff;border-radius:12px;padding:16px;border:1px solid rgba(0,0,0,.04);}
.fg-group-id{font-size:14px;font-weight:700;color:${NAVY};margin-bottom:4px;}
.fg-group-desc{font-size:11px;color:rgba(26,20,16,.5);line-height:1.5;}
.fg-phase{background:#fff;border-radius:12px;border:1px solid rgba(0,0,0,.06);overflow:hidden;margin-bottom:12px;}
.fg-phase-header{display:flex;align-items:center;justify-content:space-between;padding:14px 20px;background:rgba(248,246,242,.4);border-bottom:1px solid rgba(0,0,0,.04);}
.fg-phase-title{font-size:13px;font-weight:600;color:${NAVY};}
.fg-phase-time{font-size:10px;font-weight:700;color:${GOLD};background:rgba(201,148,58,.1);padding:3px 10px;border-radius:12px;}
.fg-q{display:flex;align-items:flex-start;gap:10px;padding:10px 20px;border-bottom:1px solid rgba(0,0,0,.03);font-size:12px;color:rgba(26,20,16,.55);line-height:1.6;}
.fg-q:last-child{border-bottom:none;}
.fg-q-num{width:20px;height:20px;border-radius:50%;background:rgba(201,148,58,.1);color:${GOLD};font-size:9px;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:2px;}

/* GRILLE */
.grille-table{width:100%;border-collapse:collapse;font-size:12px;border-radius:12px;overflow:hidden;border:1px solid rgba(0,0,0,.06);}
.grille-table th{padding:12px 16px;text-align:left;font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#fff;background:${NAVY};}
.grille-table td{padding:10px 16px;border-bottom:1px solid rgba(0,0,0,.04);}
.grille-table tr:nth-child(even){background:rgba(248,246,242,.4);}
.grille-table td:first-child{font-weight:500;color:${NAVY};}
.grille-table td:nth-child(3){color:${GOLD};font-weight:500;}
.grille-table td:nth-child(2){color:rgba(26,20,16,.5);}

/* PLAN 360 */
.plan-phase{margin-bottom:32px;}
.plan-phase-header{border-radius:12px;padding:20px 24px;color:#fff;margin-bottom:12px;}
.plan-phase-num{font-size:10px;font-weight:700;letter-spacing:3px;text-transform:uppercase;opacity:.6;margin-bottom:4px;}
.plan-phase-label{font-size:22px;font-weight:300;font-family:'Cormorant Garamond',serif;}
.plan-phase-period{font-size:11px;opacity:.5;margin-top:4px;}
.plan-phase-intro{font-size:12px;color:rgba(26,20,16,.5);margin-bottom:16px;line-height:1.6;padding:0 4px;}
.plan-actions{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
.plan-action{background:#fff;border-radius:10px;padding:16px;border:1px solid rgba(0,0,0,.04);}
.plan-action-title{font-size:12px;font-weight:600;color:${NAVY};margin-bottom:6px;}
.plan-action-meta{display:flex;gap:12px;font-size:10px;color:rgba(26,20,16,.4);}
.plan-action-meta span{display:flex;align-items:center;gap:4px;}
.plan-budget-total{background:${NAVY};color:#fff;border-radius:16px;padding:32px;text-align:center;margin-top:24px;}
.plan-budget-total .num{font-family:'Cormorant Garamond',serif;font-size:42px;font-weight:300;color:${GOLD};}
.plan-budget-total .label{font-size:11px;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,.4);margin-top:8px;}

/* FOOTER */
.footer{background:${NAVY};color:#fff;padding:64px 0;text-align:center;margin-top:48px;position:relative;overflow:hidden;}
.footer::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at center,rgba(201,148,58,.07),transparent 65%);}
.footer .quote{font-family:'Cormorant Garamond',serif;font-size:36px;font-weight:300;position:relative;}
.footer .quote span{color:${GOLD};}
.footer .conf{font-size:10px;color:rgba(255,255,255,.2);margin-top:24px;letter-spacing:1.5px;text-transform:uppercase;position:relative;}

@media(max-width:768px){
  .steps-grid,.dec-grid,.sc-values,.plan-actions,.fg-groups{grid-template-columns:1fr;}
  .hero h1{font-size:36px;}
  .section h2{font-size:28px;}
  .comp-table,.grille-table{font-size:10px;}
  .comp-table th,.comp-table td,.grille-table th,.grille-table td{padding:6px 8px;}
}
</style>
</head>
<body>

<!-- HERO -->
<div class="hero">
  <div class="container">
    <div class="vol">Vol. 1 — Plan Marketing</div>
    <h1 class="serif">Cosmos <span>Angré</span></h1>
    <div class="sub">Stratégie de marque & positionnement — 4 scénarios de positionnement, comparatif stratégique, protocole Focus Group, plan opérationnel 360°.</div>
    <div class="meta">
      <span>Confidentiel EXCO</span>
      <span>New Heaven SA / CRMC</span>
      <span>Mars 2026</span>
    </div>
  </div>
</div>

<!-- TOC -->
<div class="toc">
  <div class="container">
    <div class="toc-inner">
      <a href="#plan">Vue d'ensemble</a>
      <a href="#decisions">Décisions</a>
      <a href="#calendrier">Calendrier</a>
      <a href="#scenarios">4 Scénarios</a>
      <a href="#comparatif">Comparatif</a>
      <a href="#focusgroup">Focus Group</a>
      <a href="#grille">Grille d'analyse</a>
      <a href="#plan360">Plan 360°</a>
    </div>
  </div>
</div>

<!-- PLAN OVERVIEW -->
<div class="section" id="plan">
<div class="container">
  <div class="eyebrow">Vue d'ensemble</div>
  <h2 class="serif">Plan de travail global</h2>
  <div class="desc">4 étapes séquentielles de la stratégie de marque au plan marketing opérationnel. Chaque étape conditionne la suivante — le Focus Group est le point de pivot central.</div>
  <div class="steps-grid">
${steps.map(s => {
  const doneCount = s.items.filter(i => i.done).length;
  const pct = Math.round((doneCount / s.items.length) * 100);
  return `    <div class="step-card">
      <div class="step-header" style="border-top:3px solid ${s.accent}">
        <div class="step-num" style="color:${s.accent}">${escHtml(s.num)}</div>
        <div class="step-title">${escHtml(s.title)}</div>
        <div class="step-badge" style="background:${s.badgeColor}15;color:${s.badgeColor}">${escHtml(s.badge)}</div>
      </div>
      <div class="step-items">
${s.items.map(it => `        <div class="step-item${it.done ? ' done' : ''}"><div class="dot" style="background:${it.done ? '#10B981' : 'rgba(0,0,0,.12)'}"></div>${escHtml(it.text)}</div>`).join('\n')}
      </div>
      <div class="step-footer"><strong>Livrable :</strong> ${escHtml(s.footer)}</div>
    </div>`;
}).join('\n')}
  </div>
</div>
</div>

<!-- DECISIONS -->
<div class="section" id="decisions">
<div class="container">
  <div class="eyebrow">Gouvernance</div>
  <h2 class="serif">Décisions actées</h2>
  <div class="desc">Points non négociables — valeurs fixes à intégrer dans tous les livrables.</div>
  <div class="dec-grid">
${decisions.map(d => `    <div class="dec-card ${d.ok ? 'ok' : 'pending'}"><span class="dec-icon">${d.ok ? '✓' : '⏳'}</span>${escHtml(d.text)}</div>`).join('\n')}
  </div>
</div>
</div>

<!-- CALENDRIER -->
<div class="section" id="calendrier">
<div class="container">
  <div class="eyebrow">Pilotage</div>
  <h2 class="serif">Calendrier cible</h2>
  <div class="desc">Chemin critique vers l'inauguration du 16 novembre 2026.</div>
  <div class="cal-line">
${calendar.map(c => `    <div class="cal-item">
      <div class="cal-dot${c.milestone ? ' milestone' : (c.active ? ' active' : '')}"></div>
      <div class="cal-card${c.milestone ? ' milestone' : ''}">
        <div class="cal-date">${escHtml(c.date)}</div>
        <div class="cal-title">${escHtml(c.title)}</div>
        <div class="cal-desc">${escHtml(c.desc)}</div>
      </div>
    </div>`).join('\n')}
  </div>
</div>
</div>

<!-- SCENARIOS -->
<div class="section" id="scenarios">
<div class="container">
  <div class="eyebrow">Stratégie de marque</div>
  <h2 class="serif">4 Scénarios de positionnement</h2>
  <div class="desc">USP, valeurs, promesse client, ton & voix, risques et avantages stratégiques pour chaque scénario.</div>

${scenarios.map((sc, si) => `  <div class="sc-card">
    <div class="sc-hero" style="background:${sc.grad}">
      <div class="label">Livrable 1.2${sc.key.toLowerCase()}</div>
      <h3>${escHtml(sc.label)}</h3>
    </div>
    <div class="sc-body">
      <div class="sc-section">
        <div class="sc-section-title" style="color:${sc.accent};border-color:${sc.accent}30">USP — Proposition de valeur unique</div>
        <div class="sc-usp">${escHtml(sc.usp)}</div>
      </div>
      <div class="sc-section">
        <div class="sc-section-title" style="color:${sc.accent};border-color:${sc.accent}30">Valeurs de marque</div>
        <div class="sc-values">
${sc.values.map((v, vi) => `          <div class="sc-val" style="border-left:3px solid ${sc.accent}">
            <div class="sc-val-num" style="background:${sc.accent}">${vi + 1}</div>
            <div class="sc-val-title">${escHtml(v.t)}</div>
            <div class="sc-val-text">${escHtml(v.v)}</div>
          </div>`).join('\n')}
        </div>
      </div>
      <div class="sc-section">
        <div class="sc-section-title" style="color:${sc.accent};border-color:${sc.accent}30">Promesse client</div>
        <div class="sc-promesse"><div class="sc-promesse-text">${escHtml(sc.promesse)}</div></div>
      </div>
      <div class="sc-section">
        <div class="sc-section-title" style="color:${sc.accent};border-color:${sc.accent}30">Ton & voix</div>
        <div class="sc-ton">${escHtml(sc.ton)}</div>
      </div>
      <div class="sc-section">
        <div class="sc-section-title" style="color:${sc.accent};border-color:${sc.accent}30">${escHtml(sc.risk.label)}</div>
        <div class="sc-risk" style="background:${sc.risk.label.includes('Avantage') ? 'rgba(16,185,129,.04)' : 'rgba(245,158,11,.04)'};border-color:${sc.risk.label.includes('Avantage') ? 'rgba(16,185,129,.2)' : 'rgba(245,158,11,.2)'}">
          ${escHtml(sc.risk.text)}
        </div>
      </div>
    </div>
  </div>`).join('\n\n')}
</div>
</div>

<!-- COMPARATIF -->
<div class="section" id="comparatif">
<div class="container">
  <div class="eyebrow">Analyse</div>
  <h2 class="serif">Comparatif stratégique A vs B vs C vs D</h2>
  <div class="desc">Forces, risques, potentiel et recommandation.</div>
  <table class="comp-table">
    <thead><tr>
      ${['Critère', 'A — Proximité', 'B — Destination', 'C — Hybride', 'D — Nature'].map((h, j) => `<th style="background:${compCols[j]}">${escHtml(h)}</th>`).join('')}
    </tr></thead>
    <tbody>
${comparRows.map((row, i) => `      <tr>${row.map((c, j) => `<td>${escHtml(c)}</td>`).join('')}</tr>`).join('\n')}
    </tbody>
  </table>
</div>
</div>

<!-- FOCUS GROUP -->
<div class="section" id="focusgroup">
<div class="container">
  <div class="eyebrow">Livrable 3.1</div>
  <h2 class="serif">Protocole Focus Group v2.1</h2>
  <div class="desc">Guide de modération complet — 3 groupes — 110 minutes</div>

  <h3 style="font-size:13px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:${GOLD};margin-bottom:12px;">Design — 3 groupes</h3>
  <div class="fg-groups">
${fgGroups.map(g => `    <div class="fg-group"><div class="fg-group-id">${escHtml(g[0])}</div><div class="fg-group-desc">${escHtml(g[1])}<br><strong>${escHtml(g[2])}</strong> · ${escHtml(g[3])}</div></div>`).join('\n')}
  </div>

  <h3 style="font-size:13px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:${GOLD};margin-bottom:12px;">Guide de modération</h3>
${fgPhases.map(ph => `  <div class="fg-phase">
    <div class="fg-phase-header">
      <div class="fg-phase-title">${escHtml(ph.title)}</div>
      <div class="fg-phase-time">${escHtml(ph.time)}</div>
    </div>
${ph.questions.map((q, qi) => `    <div class="fg-q"><div class="fg-q-num">${qi + 1}</div>${escHtml(q)}</div>`).join('\n')}
  </div>`).join('\n')}
</div>
</div>

<!-- GRILLE -->
<div class="section" id="grille">
<div class="container">
  <div class="eyebrow">Livrable 3.3</div>
  <h2 class="serif">Grille d'analyse & Scorecard</h2>
  <div class="desc">Indicateurs de décision post-Focus Group.</div>
  <table class="grille-table">
    <thead><tr><th>Indicateur</th><th>Méthode de mesure</th><th>Seuil décision</th></tr></thead>
    <tbody>
${grilleRows.map(r => `      <tr><td>${escHtml(r[0])}</td><td>${escHtml(r[1])}</td><td>${escHtml(r[2])}</td></tr>`).join('\n')}
    </tbody>
  </table>
</div>
</div>

<!-- PLAN 360 -->
<div class="section" id="plan360">
<div class="container">
  <div class="eyebrow">Livrable 4.1</div>
  <h2 class="serif">Plan Marketing 360° Opérationnel</h2>
  <div class="desc">20 actions structurées en 4 phases, de mars 2026 à l'inauguration du 16 novembre.</div>

${plan360Phases.map(p => `  <div class="plan-phase">
    <div class="plan-phase-header" style="background:${p.color}">
      <div class="plan-phase-num">Phase ${p.num}</div>
      <div class="plan-phase-label serif">${escHtml(p.label)}</div>
      <div class="plan-phase-period">${escHtml(p.period)}</div>
    </div>
    <div class="plan-phase-intro">${escHtml(p.intro)}</div>
    <div class="plan-actions">
${p.actions.map(a => `      <div class="plan-action">
        <div class="plan-action-title">${escHtml(a.title)}</div>
        <div class="plan-action-meta"><span>💰 ${escHtml(a.budget)}</span><span>📅 ${escHtml(a.deadline)}</span></div>
      </div>`).join('\n')}
    </div>
  </div>`).join('\n\n')}

  <div class="plan-budget-total">
    <div style="font-size:10px;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,.4);margin-bottom:8px">Budget total estimé</div>
    <div class="num">${totalBudget}</div>
    <div class="label">Hors coûts d'inauguration VIP & honoraires consultants</div>
  </div>
</div>
</div>

<!-- FOOTER -->
<div class="footer">
  <div class="container">
    <div class="quote serif">Cosmos <span>Angré</span></div>
    <div style="font-family:'Cormorant Garamond',serif;font-size:20px;font-weight:300;font-style:italic;color:rgba(255,255,255,.4);margin-top:16px;position:relative;">Un monde à part. Le vôtre.</div>
    <div class="conf">Confidentiel EXCO · New Heaven SA / CRMC · Mars 2026</div>
  </div>
</div>

</body>
</html>`;
}

/* ── Main ── */
const distDir = path.join(__dirname, '..', 'dist');
if (!fs.existsSync(distDir)) {
  // Also generate to public/ for dev mode
  const pubDir = path.join(__dirname, '..', 'public');
  if (!fs.existsSync(pubDir)) fs.mkdirSync(pubDir, { recursive: true });
  for (const key of ['A', 'B', 'C', 'D']) {
    const html = generateHTML(key);
    if (html) {
      fs.writeFileSync(path.join(pubDir, `scenario-${key}.html`), html, 'utf-8');
      console.log(`✓ public/scenario-${key}.html`);
    }
  }
  // Plan Marketing complet
  const pmHtml = generatePlanMarketingHTML();
  fs.writeFileSync(path.join(pubDir, 'plan-marketing.html'), pmHtml, 'utf-8');
  console.log('✓ public/plan-marketing.html');
} else {
  for (const key of ['A', 'B', 'C', 'D']) {
    const html = generateHTML(key);
    if (html) {
      fs.writeFileSync(path.join(distDir, `scenario-${key}.html`), html, 'utf-8');
      console.log(`✓ dist/scenario-${key}.html`);
    }
  }
  // Plan Marketing complet
  const pmHtml = generatePlanMarketingHTML();
  fs.writeFileSync(path.join(distDir, 'plan-marketing.html'), pmHtml, 'utf-8');
  console.log('✓ dist/plan-marketing.html');
}

console.log('Static pages generated.');
