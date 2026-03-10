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
    blancChaud: '#FAF8F3', grisChaud: '#8A8278',
  },
  B: {
    ebene: '#0D1B4B', ebeneDeep: '#060E2A', terra: '#B8924A', kaki: '#1A3060',
    bronze: '#D4B06A', sable: '#D4B06A', fond: '#F2EDE3', pierre: '#E8E0D5',
    blancChaud: '#FAF7F2', grisChaud: '#9A8F85',
  },
  C: {
    ebene: '#2C1A0A', ebeneDeep: '#1a0d04', terra: '#B25A38', kaki: '#6D7447',
    bronze: '#C9943A', sable: '#D4C4A8', fond: '#F2EBDD', pierre: '#E8E0D5',
    blancChaud: '#FAF7F2', grisChaud: '#9A8F85',
  },
  D: {
    ebene: '#2A3320', ebeneDeep: '#1C2215', terra: '#898D5D', kaki: '#6B7A4A',
    bronze: '#D4A843', sable: '#D6D4C0', fond: '#E5DECC', pierre: '#F5F0E4',
    blancChaud: '#FAFAF6', grisChaud: '#7A7E68',
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
} else {
  for (const key of ['A', 'B', 'C', 'D']) {
    const html = generateHTML(key);
    if (html) {
      fs.writeFileSync(path.join(distDir, `scenario-${key}.html`), html, 'utf-8');
      console.log(`✓ dist/scenario-${key}.html`);
    }
  }
}

console.log('Static scenario pages generated.');
