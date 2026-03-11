import React, { useState } from 'react';

type PageId = 'intro' | 'scA' | 'scB' | 'scC' | 'scD' | 'comp';

const tabs: { id: PageId; label: string }[] = [
  { id: 'intro', label: "Vue d'ensemble" },
  { id: 'scA', label: 'Scénario A' },
  { id: 'scB', label: 'Scénario B' },
  { id: 'scC', label: 'Scénario C' },
  { id: 'scD', label: 'Scénario D' },
  { id: 'comp', label: 'Comparatif' },
];

const pmStyles = `
.pm-nav{position:sticky;top:0;z-index:50;background:rgba(248,246,242,.96);backdrop-filter:blur(12px);border-bottom:1px solid rgba(26,20,16,.08);display:flex;align-items:center;justify-content:space-between;padding:0 72px;height:48px}
.pm-nav-logo{font-family:'Cormorant Garamond',serif;font-size:14px;letter-spacing:.1em;color:#1a1410}
.pm-nav-tabs{display:flex;gap:3px}
.pm-nav-tab{padding:4px 14px;border-radius:20px;font-size:11px;font-weight:500;cursor:pointer;transition:all .2s;color:rgba(26,20,16,.4);border:1px solid transparent;background:none;font-family:'Inter',sans-serif}
.pm-nav-tab:hover{color:rgba(26,20,16,.75)}
.pm-nav-tab.active{color:#1a1410;background:rgba(26,20,16,.07);border-color:rgba(26,20,16,.12)}
.pm-nav-meta{font-size:10px;color:rgba(26,20,16,.3);letter-spacing:.1em;text-transform:uppercase}

.pm-cover{display:flex;flex-direction:column;justify-content:center;padding:64px 72px;color:#fff;position:relative;overflow:hidden}
.pm-cover::before{content:'';position:absolute;right:-60px;top:-60px;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,rgba(255,255,255,.06),transparent 70%)}
.pm-cover-a{background:linear-gradient(150deg,#1a2e20 0%,#2a4a35 60%,#3a5a42 100%)}
.pm-cover-b{background:linear-gradient(150deg,#050d24 0%,#0D1B4B 60%,#1a3060 100%)}
.pm-cover-c{background:linear-gradient(150deg,#2a1a0a 0%,#3d2510 60%,#4a3018 100%)}
.pm-cover-eyebrow{font-size:10px;letter-spacing:.3em;text-transform:uppercase;color:rgba(255,255,255,.3);margin-bottom:24px}
.pm-cover-sc{font-size:11px;letter-spacing:.2em;text-transform:uppercase;margin-bottom:12px;opacity:.6}
.pm-cover-title{font-family:'Cormorant Garamond',serif;font-size:42px;font-weight:300;line-height:1.1;margin-bottom:12px}
.pm-cover-usp{font-family:'Cormorant Garamond',serif;font-size:18px;font-weight:300;color:rgba(255,255,255,.5);margin-bottom:36px;font-style:italic}
.pm-cover-div{width:40px;height:1px;background:rgba(255,255,255,.2);margin-bottom:32px}
.pm-cover-pillars{display:flex;gap:12px;flex-wrap:wrap}
.pm-pillar{padding:6px 16px;border-radius:20px;font-size:11px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.12);letter-spacing:.06em;color:#fff}
.pm-cover-foot{margin-top:32px;font-size:10px;color:rgba(255,255,255,.2);letter-spacing:.15em;text-transform:uppercase}

.pm-content{padding:48px 72px}
.pm-eyebrow{font-size:10px;letter-spacing:.25em;text-transform:uppercase;margin-bottom:8px}
.pm-h1{font-family:'Cormorant Garamond',serif;font-size:36px;font-weight:300;margin-bottom:6px;line-height:1.1;color:#1a1410}
.pm-desc{font-size:13px;color:rgba(26,20,16,.5);line-height:1.7;max-width:640px;margin-bottom:32px}

.pm-k-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:20px}
.pm-k-card{background:#fff;border-radius:10px;border:1px solid rgba(26,20,16,.07);padding:18px}
.pm-k-num{font-family:'Cormorant Garamond',serif;font-size:28px;font-weight:300;margin-bottom:4px}
.pm-k-facette{font-size:10px;letter-spacing:.2em;text-transform:uppercase;margin-bottom:10px;opacity:.5;color:#1a1410}
.pm-k-title{font-size:13px;font-weight:600;margin-bottom:6px;color:#1a1410}
.pm-k-content{font-size:12px;color:rgba(26,20,16,.65);line-height:1.7}
.pm-k-est{display:flex;gap:6px;flex-wrap:wrap;margin-top:10px}
.pm-k-tag{padding:3px 10px;border-radius:12px;font-size:10px;border:1px solid rgba(26,20,16,.1);color:rgba(26,20,16,.6)}
.pm-k-tag.not{background:rgba(26,20,16,.04);text-decoration:line-through;opacity:.4}

.pm-usp-block{border-radius:12px;padding:28px;margin-bottom:20px;position:relative;overflow:hidden}
.pm-usp-quote{font-family:'Cormorant Garamond',serif;font-size:24px;font-weight:300;line-height:1.35;margin-bottom:12px}
.pm-usp-sub{font-size:13px;opacity:.65;line-height:1.7;color:#1a1410}

.pm-val-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:20px}
.pm-val-card{background:#fff;border-radius:10px;border:1px solid rgba(26,20,16,.07);padding:18px;text-align:center}
.pm-val-icon{font-size:24px;margin-bottom:8px}
.pm-val-name{font-size:12px;font-weight:600;margin-bottom:4px;color:#1a1410}
.pm-val-desc{font-size:10px;color:rgba(26,20,16,.5);line-height:1.5}

.pm-ton-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:20px}
.pm-ton-card{background:#fff;border-radius:10px;border:1px solid rgba(26,20,16,.07);padding:16px}
.pm-ton-label{font-size:10px;letter-spacing:.15em;text-transform:uppercase;margin-bottom:6px;opacity:.45;color:#1a1410}
.pm-ton-content{font-size:13px;line-height:1.6;color:#1a1410}
.pm-ton-ex{font-size:11px;color:rgba(26,20,16,.45);margin-top:6px;font-style:italic;line-height:1.5}

.pm-sig-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:20px}
.pm-sig-card{background:#fff;border-radius:10px;border:1px solid rgba(26,20,16,.07);padding:18px}
.pm-sig-type{font-size:9px;letter-spacing:.2em;text-transform:uppercase;opacity:.4;margin-bottom:6px;color:#1a1410}
.pm-sig-text{font-family:'Cormorant Garamond',serif;font-size:18px;font-weight:300;margin-bottom:6px}
.pm-sig-why{font-size:11px;color:rgba(26,20,16,.5);line-height:1.5}

.pm-comp-tbl{width:100%;border-collapse:collapse}
.pm-comp-tbl th{font-size:10px;letter-spacing:.15em;text-transform:uppercase;color:rgba(26,20,16,.4);padding:12px 16px;text-align:left;border-bottom:2px solid rgba(26,20,16,.08);background:#f8f6f2}
.pm-comp-tbl td{padding:12px 16px;border-bottom:1px solid rgba(26,20,16,.04);font-size:12px;color:rgba(26,20,16,.7);vertical-align:top;line-height:1.5}
.pm-comp-tbl tr:hover td{background:#faf8f5}
.pm-comp-tbl td:first-child{font-weight:600;font-size:11px;color:#1a1410}
.pm-force{color:#2e7d32;font-size:11px}
.pm-risque{color:#c62828;font-size:11px}
.pm-neutre{color:#e65100;font-size:11px}
.pm-footer-note{margin-top:20px;padding:14px 18px;border-radius:8px;background:rgba(26,20,16,.03);border:1px solid rgba(26,20,16,.05);font-size:10px;color:rgba(26,20,16,.35);line-height:1.8}

.pm-stat-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
.pm-stat-card{background:#fff;border-radius:10px;border:1px solid rgba(26,20,16,.07);padding:18px}
.pm-stat-big{font-family:'Cormorant Garamond',serif;font-size:28px;font-weight:300;color:#C9943A}
.pm-stat-label{font-size:11px;color:rgba(26,20,16,.5);margin-top:4px;line-height:1.4}
.pm-stat-bold{font-size:13px;font-weight:600;color:#1a1410;margin-bottom:4px}
`;

interface KCardProps { num: string; color: string; facette: string; title: string; content: string; yes: string[]; no?: string[] }
const KCard = ({ num, color, facette, title, content, yes, no = [] }: KCardProps) => (
  <div className="pm-k-card">
    <div className="pm-k-num" style={{ color }}>{num}</div>
    <div className="pm-k-facette">{facette}</div>
    <div className="pm-k-title">{title}</div>
    <div className="pm-k-content">{content}</div>
    <div className="pm-k-est">
      {yes.map(t => <span key={t} className="pm-k-tag">{t}</span>)}
      {no.map(t => <span key={t} className="pm-k-tag not">{t}</span>)}
    </div>
  </div>
);

interface ValCardProps { icon: string; name: string; desc: string }
const ValCard = ({ icon, name, desc }: ValCardProps) => (
  <div className="pm-val-card"><div className="pm-val-icon">{icon}</div><div className="pm-val-name">{name}</div><div className="pm-val-desc">{desc}</div></div>
);

interface TonCardProps { label: string; content: string; ex: string }
const TonCard = ({ label, content, ex }: TonCardProps) => (
  <div className="pm-ton-card"><div className="pm-ton-label">{label}</div><div className="pm-ton-content">{content}</div><div className="pm-ton-ex">{ex}</div></div>
);

interface SigCardProps { type: string; text: string; color: string; why: string }
const SigCard = ({ type, text, color, why }: SigCardProps) => (
  <div className="pm-sig-card"><div className="pm-sig-type">{type}</div><div className="pm-sig-text" style={{ color }}>{text}</div><div className="pm-sig-why">{why}</div></div>
);

function PageIntro({ onNav }: { onNav: (id: PageId) => void }) {
  return (
    <>
      <div className="pm-cover pm-cover-a" style={{ padding: '48px 72px' }}>
        <div className="pm-cover-eyebrow">Plateforme de marque · Cosmos Angré · Document EXCO confidentiel</div>
        <div className="pm-cover-title">Quatre scénarios.<br />Une décision.</div>
        <div style={{ marginTop: 16, fontSize: 14, color: 'rgba(255,255,255,.5)', maxWidth: 600, lineHeight: 1.8 }}>
          Quatre positionnements distincts ont été construits pour Cosmos Angré, ancrés dans les données OnPoint et l'analyse terrain. Chaque scénario est complet, cohérent, et défendable. La validation terrain (Focus Group) tranchera entre A, B, C et D — mais chaque option est prête à être présentée en EXCO.
        </div>
        <div style={{ marginTop: 32, display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, maxWidth: 900 }}>
          {[
            { id: 'scA' as PageId, sc: 'Scénario A', title: 'Premium\nde Proximité', sub: '"Enfin tout, enfin ici"' },
            { id: 'scB' as PageId, sc: 'Scénario B', title: 'Destination\nPremium', sub: '"Un monde à part"' },
            { id: 'scC' as PageId, sc: 'Scénario C', title: "L'Exception\nNaturelle", sub: '"L\'exception, tout simplement"' },
            { id: 'scD' as PageId, sc: 'Scénario D', title: 'Nature\nContemporaine', sub: '"Ici, on vit quelque chose"' },
          ].map(s => (
            <div key={s.id} onClick={() => onNav(s.id)} style={{ padding: 18, background: 'rgba(255,255,255,.06)', borderRadius: 10, border: '1px solid rgba(255,255,255,.08)', cursor: 'pointer' }}>
              <div style={{ fontSize: 10, letterSpacing: '.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,.4)', marginBottom: 8 }}>{s.sc}</div>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, fontWeight: 300, marginBottom: 4, whiteSpace: 'pre-line' }}>{s.title}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,.35)', lineHeight: 1.5 }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="pm-content">
        <div className="pm-eyebrow" style={{ color: '#C9943A' }}>Données de référence — Étude OnPoint</div>
        <div className="pm-h1">Ce que le terrain nous dit</div>
        <div className="pm-desc">Ces données ont guidé la construction des 4 scénarios. Elles ne tranchent pas entre A, B, C et D — mais elles contraignent chaque choix.</div>
        <div className="pm-stat-grid">
          {[
            { big: '24 324', label: 'Ménages · Zone primaire 2-3km' },
            { big: '73%', label: 'Conso. tirée par classes aisées & haut standing' },
            { big: '60%', label: "Vont hors Cocody faute d'offre locale" },
            { big: '93%', label: "Favorables au projet — avant même l'ouverture" },
          ].map(s => (
            <div key={s.big} className="pm-stat-card"><div className="pm-stat-big">{s.big}</div><div className="pm-stat-label">{s.label}</div></div>
          ))}
        </div>
        <div className="pm-stat-grid" style={{ marginTop: 12 }}>
          {[
            { bold: '0 concurrent', label: 'Centre commercial dans la zone primaire' },
            { bold: 'Carrefour 32%', label: 'Enseigne la plus demandée par le public' },
            { bold: 'FNAC 98%', label: 'Ou équivalent — demande quasi-unanime' },
            { bold: '810k FCFA', label: 'Revenu moyen individuel · Zone primaire' },
          ].map(s => (
            <div key={s.bold} className="pm-stat-card"><div className="pm-stat-bold">{s.bold}</div><div className="pm-stat-label">{s.label}</div></div>
          ))}
        </div>
      </div>
    </>
  );
}

function PageA() {
  return (
    <>
      <div className="pm-cover pm-cover-a">
        <div className="pm-cover-eyebrow">Plateforme de marque · Cosmos Angré</div>
        <div className="pm-cover-sc">Scénario A</div>
        <div className="pm-cover-title">Premium<br />de Proximité</div>
        <div className="pm-cover-usp">"Le meilleur du quotidien, enfin ici"</div>
        <div className="pm-cover-div" />
        <div className="pm-cover-pillars">
          {['Complétude', 'Accessibilité premium', 'Ancrage territorial', 'Modernité locale'].map(p => <span key={p} className="pm-pillar">{p}</span>)}
        </div>
        <div className="pm-cover-foot">Ancré dans les data OnPoint · Cible : familles aisées + actifs CSP+ · Zone primaire Angré/Cocody</div>
      </div>
      <div className="pm-content">
        <div className="pm-eyebrow" style={{ color: '#4A7558' }}>USP — Promesse de valeur unique</div>
        <div className="pm-usp-block" style={{ background: 'linear-gradient(135deg,#e8f2ec,#f0f7f2)', border: '1px solid rgba(74,117,88,.15)' }}>
          <div className="pm-usp-quote" style={{ color: '#2d5a3d' }}>"Cosmos Angré est le centre commercial que les habitants d'Angré et Cocody méritaient depuis longtemps — complet, moderne, accessible, ancré dans leur quotidien. On n'a plus besoin d'aller à PlaYce ou Cap Sud."</div>
          <div className="pm-usp-sub">Le Scénario A capitalise sur la frustration documentée (60% quittent Cocody pour faire leurs courses) et la convertit en loyauté. La promesse est simple : tout ce dont vous avez besoin, enfin ici. La qualité est premium, mais l'accueil est chaleureux et inclusif.</div>
        </div>
        <div className="pm-eyebrow" style={{ color: '#4A7558' }}>Prisme de Kapferer — 6 facettes</div>
        <div className="pm-h1" style={{ marginBottom: 20 }}>Identité de marque · Scénario A</div>
        <div className="pm-k-grid">
          <KCard num="01" color="#4A7558" facette="Physique — Attributs tangibles" title="Le centre contemporain du quartier" content="Architecture lumineuse et aérée, 8 bâtiments, parking 425 places. Carrefour, Zino, cinéma, clinique, espaces enfants visibles dès l'entrée. Végétalisation (EDGE Advanced). Signalétique claire, app mobile, livraison." yes={['Moderne','Lumineux','Complet','Végétalisé']} no={['Clinquant','Intimidant']} />
          <KCard num="02" color="#4A7558" facette="Personnalité — Caractère" title="Le voisin accompli qui accueille tout le monde" content="Un(e) voisin(e) de 35-40 ans, bien installé(e) à Angré, revenus confortables, style sans ostentation. Connaît le quartier, recommande les bonnes adresses. Généreux(se), pas exclusif(ve). Ton : chaleureux, moderne, inclusif." yes={['Fiable','Généreux','Attentionné']} no={['Snob','Distant']} />
          <KCard num="03" color="#4A7558" facette="Culture — Valeurs profondes" title="Complétude · Qualité accessible · Ancrage" content="Tout en un lieu — courses, loisirs, restaurants, services. Grade A ne veut pas dire prix inaccessibles. Le centre que la zone méritait depuis longtemps. Standards internationaux, ici." yes={['Complet','Accessible','Pionnier','Ancré']} />
          <KCard num="04" color="#4A7558" facette="Relation — Lien marque-visiteur" title="Centre de gravité du quartier" content="Fréquentation régulière (1-2x/semaine), pas uniquement occasionnelle. Le centre &quot;fait partie de ma vie&quot; — comme une pharmacie de quartier premium. Confiance, habitude, appartenance locale." yes={['Quotidien','Confiance','Habitude']} no={['Occasionnel']} />
          <KCard num="05" color="#4A7558" facette="Reflet — Image du client" title="Le résident aisé d'Angré/Cocody" content="CSP+, famille, 28-50 ans. Habite le quartier depuis des années. Veut la qualité sans traverser Abidjan. &quot;Je fais mes courses à Cosmos Angré&quot; dit quelque chose sur lui — moderne, ancré, exigeant sans être snob." yes={['CSP+','Local','Exigeant','Accessible']} />
          <KCard num="06" color="#4A7558" facette="Mentalisation — Image de soi" title={`"Je suis quelqu'un qui a accès au meilleur, ici"`} content="Fréquenter Cosmos Angré dit au visiteur qu'il vit bien, qu'il a du goût, qu'il n'a pas besoin d'aller chercher loin ce qu'il mérite. Sentiment de fierté locale et de modernité sans arrogance." yes={['Fierté locale','Modernité','Bien-être']} />
        </div>
        <div className="pm-eyebrow" style={{ color: '#4A7558' }}>Valeurs de marque</div>
        <div className="pm-val-grid">
          <ValCard icon="🌿" name="Complétude" desc="Tout en un lieu — zéro raison de partir ailleurs" />
          <ValCard icon="🤝" name="Inclusion" desc="Premium accessible — pas élitiste" />
          <ValCard icon="📍" name="Ancrage" desc="Fait partie du quartier, de la vie quotidienne" />
          <ValCard icon="⚡" name="Modernité" desc="Standards internationaux, ici et maintenant" />
        </div>
        <div className="pm-eyebrow" style={{ color: '#4A7558' }}>Ton de communication</div>
        <div className="pm-ton-grid">
          <TonCard label="Ton général" content="Chaleureux, direct, moderne. Parle comme un ami qui vous veut du bien. Jamais condescendant, jamais distant." ex="&quot;Tout ce que vous aimez, enfin à Angré.&quot;" />
          <TonCard label="Ce qu'on ne dit jamais" content="Jamais &quot;luxe&quot;, &quot;exclusif&quot;, &quot;prestige&quot;. Ces mots créent de la distance. On dit &quot;qualité&quot;, &quot;bien&quot;, &quot;enfin&quot;, &quot;votre&quot;." ex="&quot;Votre nouveau centre de vie.&quot;" />
          <TonCard label="Digital & réseaux" content="Contenu de vie quotidienne. Recettes, sorties en famille, recommandations locales. Le centre comme acteur de la vie du quartier." ex="&quot;Dimanche à Cosmos — qu'est-ce que vous faites ?&quot;" />
          <TonCard label="Institutionnel" content="Sobre, ancré dans les données terrain. Arguments concrets : première offre complète de la zone, 0 concurrent, EDGE Advanced." ex="&quot;Angré méritait mieux. Depuis octobre 2026, c'est fait.&quot;" />
        </div>
        <div className="pm-eyebrow" style={{ color: '#4A7558' }}>Signatures</div>
        <div className="pm-sig-grid">
          <SigCard type="Signature permanente — façade, baux, institutionnel" text={`"Le quartier que vous méritez"`} color="#2d5a3d" why="Ancrage territorial fort. Valide la frustration historique (60% partaient ailleurs) et la résout. Appartenance immédiate." />
          <SigCard type="Signature campagne — pub, réseaux, inauguration" text={`"Enfin tout, enfin ici"`} color="#2d5a3d" why="Soulagement + complétude. &quot;Enfin&quot; dit l'attente, &quot;tout&quot; dit la promesse, &quot;ici&quot; dit la proximité. Mémorable et émotionnel." />
        </div>
      </div>
    </>
  );
}

function PageB() {
  return (
    <>
      <div className="pm-cover pm-cover-b">
        <div className="pm-cover-eyebrow">Plateforme de marque · Cosmos Angré</div>
        <div className="pm-cover-sc">Scénario B</div>
        <div className="pm-cover-title">Destination<br />Premium</div>
        <div className="pm-cover-usp">"Un monde à part"</div>
        <div className="pm-cover-div" />
        <div className="pm-cover-pillars">
          {['Aspiration', 'Expérience totale', 'Destination panafricaine', 'Standard international'].map(p => <span key={p} className="pm-pillar">{p}</span>)}
        </div>
        <div className="pm-cover-foot">Ancré dans l'ambition long terme · Cible : clientèle aspirationnelle + enseignes premium · Positionnement régional</div>
      </div>
      <div className="pm-content">
        <div className="pm-eyebrow" style={{ color: '#C8A96E' }}>USP — Promesse de valeur unique</div>
        <div className="pm-usp-block" style={{ background: 'linear-gradient(135deg,#e8ecf5,#f0f3fa)', border: '1px solid rgba(13,27,75,.12)' }}>
          <div className="pm-usp-quote" style={{ color: '#0D1B4B' }}>"Cosmos Angré est la première destination premium mixed-use d'Abidjan — hôtel, cinéma, bureaux, gastronomie, clinique, shopping. On n'y vient pas faire ses courses, on y vit une expérience."</div>
          <div className="pm-usp-sub">Le Scénario B joue sur l'aspiration et la rupture. Il cible une clientèle qui veut être dans "un autre univers" quand elle sort. Il positionne Cosmos Angré comme référence régionale — pas juste locale. Plus difficile à exécuter, mais plus différenciant à long terme.</div>
        </div>
        <div className="pm-eyebrow" style={{ color: '#C8A96E' }}>Prisme de Kapferer — 6 facettes</div>
        <div className="pm-h1" style={{ marginBottom: 20 }}>Identité de marque · Scénario B</div>
        <div className="pm-k-grid">
          <KCard num="01" color="#C8A96E" facette="Physique — Attributs tangibles" title={`L'architecture qui dit "destination"`} content="Bardade bronze/or mat comme signature visuelle premium. Hôtel Ibis/Adagio, cinéma (0 concurrent zone), clinique, rooftop, bureaux. Matériaux nobles. Projection mapping inauguration. Signalétique premium bleu nuit + or." yes={['Remarquable','Complet','Noble','Unique']} no={['Ordinaire','Familier']} />
          <KCard num="02" color="#C8A96E" facette="Personnalité — Caractère" title="L'hôte sophistiqué qui élève ses invités" content="Un directeur d'hôtel 5 étoiles qui vous accueille : attentionné, cultivé, discret, élégant. Il ne parle pas fort. Il sait que la qualité se voit, elle ne se crie pas. Ton : distingué, serein, aspirationnel." yes={['Distingué','Discret','Aspirationnel']} no={['Arrogant','Froid']} />
          <KCard num="03" color="#C8A96E" facette="Culture — Valeurs profondes" title="Excellence · Singularité · Ambition africaine" content="Cosmos Angré ne reproduit pas — il crée. Premier mixed-use de ce niveau à Abidjan. Standards internationaux sans renier l'identité africaine. L'excellence comme norme, pas comme exception." yes={['Excellence','Singularité','Ambition','Africain']} />
          <KCard num="04" color="#C8A96E" facette="Relation — Lien marque-visiteur" title="L'occasion spéciale qui devient habitude" content="On y vient d'abord pour une occasion (dîner, cinéma, hôtel pour des invités). Puis on y revient régulièrement parce qu'on ne veut plus aller ailleurs. La destination devient l'adresse." yes={['Destination','Expérience',"L'adresse"]} />
          <KCard num="05" color="#C8A96E" facette="Reflet — Image du client" title="La clientèle qui a le goût du beau" content="Cadres supérieurs, entrepreneurs, expatriés, diaspora de retour. 30-55 ans. Revenu > 1,5M FCFA/mois. A voyagé, connaît les standards, veut les retrouver à Abidjan." yes={['CSP++','International','Exigeant']} />
          <KCard num="06" color="#C8A96E" facette="Mentalisation — Image de soi" title="Je fréquente ce qui se fait de mieux" content="Fréquenter Cosmos Angré est un signal social fort. Ça dit le statut, les goûts, l'ambition. Le sac Cosmos Angré dans la main dit quelque chose. L'aspiration est le moteur — l'appartenance à un club implicite de ceux qui savent." yes={['Statut','Distinction','Signal social']} />
        </div>
        <div className="pm-eyebrow" style={{ color: '#C8A96E' }}>Valeurs de marque</div>
        <div className="pm-val-grid">
          <ValCard icon="✨" name="Excellence" desc="Chaque détail compte — rien n'est laissé au hasard" />
          <ValCard icon="🌍" name="Ambition africaine" desc="Standards mondiaux, identité africaine assumée" />
          <ValCard icon="🎭" name="Expérience totale" desc="On ne vient pas faire des courses — on vit quelque chose" />
          <ValCard icon="💎" name="Singularité" desc="Rien de comparable dans la zone — ni à Abidjan" />
        </div>
        <div className="pm-eyebrow" style={{ color: '#C8A96E' }}>Ton de communication</div>
        <div className="pm-ton-grid">
          <TonCard label="Ton général" content="Sobre, distingué, confiant. Jamais tape-à-l'œil. La qualité n'a pas besoin de se justifier — elle s'affirme avec sérénité." ex="&quot;Cosmos Angré. Une adresse. Une expérience.&quot;" />
          <TonCard label="Ce qu'on ne dit jamais" content="Jamais &quot;pour tous&quot;, &quot;accessible&quot;, &quot;quotidien&quot;. Ces mots dilueraient le positionnement. On dit &quot;l'exception&quot;, &quot;l'adresse&quot;, &quot;l'expérience&quot;." ex="&quot;L'exception, enfin à Abidjan.&quot;" />
          <TonCard label="Digital & réseaux" content="Contenu aspirationnel. Architecture, gastronomie, événements, cinéma. Curation plutôt que volume. Qualité d'image irréprochable." ex="&quot;Ce soir à Cosmos Angré — une table, un film, une nuit.&quot;" />
          <TonCard label="Institutionnel" content="Langage d'investisseur et de partenaire premium. ROI, trafic qualifié, clientèle CSP++, premier mixed-use d'Abidjan." ex="&quot;La première destination mixed-use premium d'Abidjan.&quot;" />
        </div>
        <div className="pm-eyebrow" style={{ color: '#C8A96E' }}>Signatures</div>
        <div className="pm-sig-grid">
          <SigCard type="Signature permanente — façade, baux, institutionnel" text={`"Un monde à part"`} color="#0D1B4B" why="Rupture totale avec l'existant. Univers propre et singulier. Extensible à d'autres villes. Mémorable, universel, intemporel." />
          <SigCard type="Signature campagne — pub, réseaux, inauguration" text={`"Vivez l'exception"`} color="#0D1B4B" why="Invitation à l'action. &quot;Vivez&quot; = expérience active, pas passive. &quot;L'exception&quot; = promesse de singularité. Ton impératif qui crée l'aspiration sans arrogance." />
        </div>
      </div>
    </>
  );
}

function PageC() {
  return (
    <>
      <div className="pm-cover pm-cover-c">
        <div className="pm-cover-eyebrow">Plateforme de marque · Cosmos Angré</div>
        <div className="pm-cover-sc">Scénario C — L'Exception Naturelle</div>
        <div className="pm-cover-title">L'Exception<br />Naturelle</div>
        <div className="pm-cover-usp">"L'exception, tout simplement"</div>
        <div className="pm-cover-div" />
        <div className="pm-cover-pillars">
          {['Premium ancré', 'Destination & quotidien', 'Aspiration inclusive', 'Identité africaine forte'].map(p => <span key={p} className="pm-pillar">{p}</span>)}
        </div>
        <div className="pm-cover-foot">Synthèse des deux ambitions · Cible élargie · Positionnement le plus difficile à exécuter mais le plus différenciant</div>
      </div>
      <div className="pm-content">
        <div className="pm-eyebrow" style={{ color: '#C9943A' }}>USP — Promesse de valeur unique</div>
        <div className="pm-usp-block" style={{ background: 'linear-gradient(135deg,#fdf5e8,#fdf0e0)', border: '1px solid rgba(201,148,58,.15)' }}>
          <div className="pm-usp-quote" style={{ color: '#8a5a10' }}>"Cosmos Angré est une destination premium complète — et votre centre de vie. On peut y faire ses courses quotidiennes et y dîner en tenue de sortie le même soir. Le premium n'exclut pas. Il élève."</div>
          <div className="pm-usp-sub">Le Scénario C refuse de choisir entre A et B — et c'est précisément sa proposition. L'identité visuelle est premium (codes Scénario B), l'accueil est chaleureux et inclusif (ADN Scénario A). C'est la logique Novotel : des standards hôteliers élevés, une atmosphère accessible. Le risque est l'exécution — l'hybride réussi demande plus de rigueur.</div>
        </div>
        <div className="pm-eyebrow" style={{ color: '#C9943A' }}>Prisme de Kapferer — 6 facettes</div>
        <div className="pm-h1" style={{ marginBottom: 20 }}>Identité de marque · Scénario C</div>
        <div className="pm-k-grid">
          <KCard num="01" color="#C9943A" facette="Physique — Attributs tangibles" title="Le premium qui accueille tout le monde" content="Bardade bronze valorisée comme signature chaude et noble. Terracotta en accent, sable en fond — palette africaine premium. Même offre complète (Carrefour, Zino, cinéma, hôtel, clinique) mais présentée avec chaleur. Pas intimidant malgré la qualité." yes={['Premium','Chaleureux','Complet','Africain']} no={['Froid','Intimidant']} />
          <KCard num="02" color="#C9943A" facette="Personnalité — Caractère" title="L'hôte africain — grand standing, grande chaleur" content="Un entrepreneur ivoirien accompli de 40 ans. Il reçoit bien — table bien mise, qualité irréprochable — mais tout le monde se sent chez soi. Le premium n'exclut pas ici. La distinction est dans les détails, pas dans la distance." yes={['Accompli','Chaleureux','Élégant','Ouvert']} no={['Condescendant','Distant']} />
          <KCard num="03" color="#C9943A" facette="Culture — Valeurs profondes" title="L'excellence africaine · L'inclusion par la qualité" content="L'Afrique n'a pas à choisir entre qualité et chaleur. Cosmos Angré prouve que les standards mondiaux et l'hospitalité africaine ne sont pas contradictoires. La qualité élève — elle n'exclut pas." yes={['Excellence','Hospitalité','Fierté africaine']} />
          <KCard num="04" color="#C9943A" facette="Relation — Lien marque-visiteur" title="Le centre qui grandit avec vous" content="On y vient pour les courses le matin et pour le cinéma le soir. Pour l'anniversaire des enfants et pour un dîner en amoureux. La relation évolue selon les occasions — mais le centre est toujours là, toujours à la hauteur." yes={['Polyvalent','Fidèle','Évolutif']} />
          <KCard num="05" color="#C9943A" facette="Reflet — Image du client" title="La clientèle qui n'a pas à choisir" content="CSP+ élargi. Familles, jeunes actifs, cadres, entrepreneurs. &quot;Je n'ai pas besoin d'aller à PlaYce pour le quotidien et à un restaurant de Cocody pour une sortie — j'ai tout à Cosmos Angré.&quot; Cible la plus large des 4 scénarios." yes={['CSP+ élargi','Familles','Actifs','Entrepreneurs']} />
          <KCard num="06" color="#C9943A" facette="Mentalisation — Image de soi" title="Je vis bien — et je le partage" content="J'ai du goût, je suis moderne, j'apprécie le beau — mais je ne suis pas snob. Je partage. L'identité est à la fois aspirationnelle et inclusive. La fierté sans l'arrogance." yes={['Fierté','Partage','Modernité']} />
        </div>
        <div className="pm-eyebrow" style={{ color: '#C9943A' }}>Valeurs de marque</div>
        <div className="pm-val-grid">
          <ValCard icon="🌍" name="Hospitalité africaine" desc="Premium et chaleureux — pas contradictoires" />
          <ValCard icon="⬆️" name="Élévation inclusive" desc="La qualité tire vers le haut — sans exclure" />
          <ValCard icon="🔄" name="Polyvalence" desc="Quotidien et occasion spéciale — même lieu" />
          <ValCard icon="🏆" name="Standard sans distance" desc="Le meilleur, accessible à ceux qui le méritent" />
        </div>
        <div className="pm-eyebrow" style={{ color: '#C9943A' }}>Ton de communication</div>
        <div className="pm-ton-grid">
          <TonCard label="Ton général" content="Chaleureux et élégant. La distinction dans la bienveillance. &quot;Nous avons préparé quelque chose d'exceptionnel — pour vous.&quot;" ex="&quot;L'exception, tout simplement.&quot;" />
          <TonCard label="Ce qu'on ne dit jamais" content="Jamais &quot;luxe&quot; seul, jamais &quot;populaire&quot;. On dit &quot;exceptionnel&quot;, &quot;pour vous&quot;, &quot;ici&quot;. Le &quot;ici&quot; est crucial — il ancre sans brider." ex="&quot;Ce qui se fait de mieux. Ici.&quot;" />
          <TonCard label="Digital & réseaux" content="Mix contenu lifestyle premium + contenu proximité. Gastronomie ET marché local. Événements VIP ET animations familles. Les deux coexistent." ex="&quot;De la terrasse au cinéma — votre samedi à Cosmos Angré.&quot;" />
          <TonCard label="Institutionnel" content="Premier mixed-use premium d'Abidjan, ancré dans la zone la plus aisée de Cocody. Trafic qualifié et régulier — pas seulement occasionnel." ex="&quot;La destination premium du quotidien.&quot;" />
        </div>
        <div className="pm-eyebrow" style={{ color: '#C9943A' }}>Signatures</div>
        <div className="pm-sig-grid">
          <SigCard type="Signature permanente — façade, baux, institutionnel" text={`"L'exception, tout simplement"`} color="#8a5a10" why="Tagline canonique. Court, mémorable, signe le territoire C." />
          <SigCard type="Alternative plus courte" text={`"L'exceptionnel, au quotidien"`} color="#8a5a10" why="Plus compact, plus mémorable. Oxymoron volontaire — l'exception n'est plus lointaine. Pose le territoire C en 3 mots." />
        </div>
      </div>
    </>
  );
}

function PageD() {
  return (
    <>
      <div className="pm-cover" style={{ background: 'linear-gradient(135deg,#1C2215,#3D4A2A)' }}>
        <div className="pm-cover-eyebrow">Plateforme de marque · Cosmos Angré</div>
        <div className="pm-cover-sc">Scénario D — Nature Contemporaine</div>
        <div className="pm-cover-title">Nature<br />Contemporaine</div>
        <div className="pm-cover-usp">"Ici, on vit quelque chose"</div>
        <div className="pm-cover-div" />
        <div className="pm-cover-pillars">
          {['Destination végétale', 'Aspiration inclusive', 'Identité africaine', 'Non réplicable', 'Ancrage communautaire'].map(p => <span key={p} className="pm-pillar">{p}</span>)}
        </div>
        <div className="pm-cover-foot">Le végétal structure l'expérience · Le laiton est le prestige · La nature crée une barrière à la copie de 5 ans</div>
      </div>
      <div className="pm-content">
        <div className="pm-eyebrow" style={{ color: '#898D5D' }}>USP — Promesse de valeur unique</div>
        <div className="pm-usp-block" style={{ background: 'linear-gradient(135deg,#f0efe6,#e8e6da)', border: '1px solid rgba(137,141,93,.15)' }}>
          <div className="pm-usp-quote" style={{ color: '#4a4e30' }}>"Le premier centre commercial à Cocody où la nature structure l'expérience d'achat. Pas juste une verdure décorative — une identité architecturale totale. Le végétal est l'identité. Le laiton est le prestige."</div>
          <div className="pm-usp-sub">Le Scénario D crée un marqueur unique inimitable à court terme. La végétation mature prend 5 ans — le concurrent qui copie aujourd'hui n'obtient le résultat qu'en 2031. Le cadre végétal augmente le temps de visite moyen (+25% vs malls standard) et donc le panier moyen. L'or vif en signalétique maximise la visibilité commerciale.</div>
        </div>
        <div className="pm-eyebrow" style={{ color: '#898D5D' }}>Prisme de Kapferer — 6 facettes</div>
        <div className="pm-h1" style={{ marginBottom: 20 }}>Identité de marque · Scénario D</div>
        <div className="pm-k-grid">
          <KCard num="01" color="#898D5D" facette="Physique — Attributs tangibles" title="L'écrin qui fait vendre" content="Pierre kaki, laiton doré, végétation structurante. Un mall qui ressemble à une destination de prestige, pas à une boîte de béton. La nature est l'architecture — pas le décor." yes={['Végétal','Laiton','Premium']} no={['Béton brut','Artificiel']} />
          <KCard num="02" color="#898D5D" facette="Personnalité — Caractère" title="Le mall qui a du style" content="Dynamique, accueillant, jamais ennuyeux. Il y a toujours quelque chose à voir, à faire, à vivre à Cosmos Angré. Le ton d'Aesop — nature et premium ne s'opposent pas." yes={['Dynamique','Stylé','Vivant']} no={['Monotone','Artificiel']} />
          <KCard num="03" color="#898D5D" facette="Culture — Valeurs profondes" title="L'excellence ivoirienne" content="Cocody mérite le meilleur. Cosmos Angré prouve que l'Afrique peut créer des centres commerciaux qui rivalisent avec les grands malls mondiaux — avec une identité propre, pas une copie." yes={['Fierté','Excellence','Modernité africaine']} />
          <KCard num="04" color="#898D5D" facette="Relation — Lien marque-visiteur" title="Le rendez-vous de la semaine" content="Courses le mardi. Sortie restaurant le vendredi soir. Cinéma le samedi. Shopping le dimanche. Cosmos s'intègre dans le rythme de vie. On y revient pour l'ambiance autant que pour les boutiques." yes={['Habitude','Rendez-vous','Rituel']} />
          <KCard num="05" color="#898D5D" facette="Reflet — Image du client" title="La clientèle qui réussit" content="CSP+ Cocody élargi — cadres, entrepreneurs, familles aisées, jeunes actifs. Unis par le goût de la qualité et la fierté de bien vivre. Fréquenter Cosmos Angré est un marqueur social positif." yes={['CSP+','Familles','Actifs','Entrepreneurs']} />
          <KCard num="06" color="#898D5D" facette="Mentalisation — Image de soi" title="&quot;Je suis quelqu'un qui va à Cosmos&quot;" content="Fréquenter Cosmos Angré est un marqueur social positif. Ce n'est pas de l'ostentation — c'est du goût. Le cadre végétal valide l'idée que la qualité de vie n'est pas un luxe." yes={['Statut social','Goût','Bien-vivre']} no={['Snobisme']} />
        </div>
        <div className="pm-eyebrow" style={{ color: '#898D5D' }}>Valeurs de marque</div>
        <div className="pm-val-grid">
          <ValCard icon="🌿" name="Expérience d'achat premium" desc="Chaque visite est une sortie, pas une corvée" />
          <ValCard icon="📍" name="Destination, pas transit" desc="On reste, on dépense plus, on revient" />
          <ValCard icon="✨" name="Qualité visible & affirmée" desc="Le laiton, la pierre, le végétal — marqueurs immédiats" />
          <ValCard icon="🏘️" name="Ancrage communautaire" desc="Cosmos appartient à Cocody — événements locaux, fierté africaine" />
        </div>
        <div className="pm-eyebrow" style={{ color: '#898D5D' }}>Ton de communication</div>
        <div className="pm-ton-grid">
          <TonCard label="Ton général" content="Vivant, raffiné, désirable. Le ton d'Aesop — nature et premium ne s'opposent pas. Chaque communication est une invitation à venir, à rester, à revenir." ex="&quot;Ici, on vit quelque chose.&quot;" />
          <TonCard label="Ce qu'on ne dit jamais" content="Jamais &quot;écologique&quot; ni &quot;bio&quot; — ce n'est pas du greenwashing. On dit &quot;nature&quot;, &quot;vivant&quot;, &quot;contemporain&quot;. Le végétal est un code premium, pas militant." ex="&quot;Cocody vient de changer d'adresse.&quot;" />
          <TonCard label="Digital & réseaux" content="Visuels végétaux dominants. Mise en scène des espaces verts, terrasses, lumière naturelle. Le mall comme destination lifestyle. Courts, directs, désirables." ex="&quot;Ce samedi, venez vivre Cosmos.&quot;" />
          <TonCard label="Institutionnel" content="Premier mall végétal premium de Côte d'Ivoire. Identité architecturale non réplicable. Temps de visite supérieur de 25% aux malls standard." ex="&quot;Le meilleur de Cocody, sous un même toit.&quot;" />
        </div>
        <div className="pm-eyebrow" style={{ color: '#898D5D' }}>Signatures</div>
        <div className="pm-sig-grid">
          <SigCard type="Signature permanente — façade, baux, institutionnel" text={`"Ici, on vit quelque chose."`} color="#4a4e30" why="Puissant, commercial, mémorable. 5 mots. Expérientiel — promet une émotion, pas un service. Universel — fonctionne pour le quotidien comme pour l'événementiel." />
          <SigCard type="Alternatives campagne" text={`"Cocody vient de changer d'adresse."`} color="#4a4e30" why="Exclusivité géographique, ancrage local fort. Positionne Cosmos comme le nouveau centre de gravité du quartier." />
        </div>
      </div>
    </>
  );
}

function PageComp() {
  const compRows: { dim: string; a: React.ReactNode; b: React.ReactNode; c: React.ReactNode; d: React.ReactNode }[] = [
    { dim: 'USP central', a: '"Enfin tout, enfin ici"', b: '"Un monde à part"', c: '"L\'exception, tout simplement"', d: '"Ici, on vit quelque chose"' },
    { dim: 'Cible prioritaire', a: 'Résidents aisés zone primaire · familles · CSP+', b: 'CSP++ · cadres · entrepreneurs · diaspora', c: 'CSP+ élargi · familles ET actifs · cible la plus large', d: 'CSP+ Cocody élargi · cadres · familles · jeunes actifs' },
    { dim: 'Ancrage data OnPoint', a: <span className="pm-force">✅ Fort — répond directement aux 60% qui partent + 93% favorables</span>, b: <span className="pm-neutre">⚠️ Moyen — données justifient A mais n'excluent pas B</span>, c: <span className="pm-force">✅ Fort — répond aux deux besoins identifiés</span>, d: <span className="pm-force">✅ Fort — temps de visite +25%, panier moyen augmenté</span> },
    { dim: 'Fréquence de visite', a: <span className="pm-force">✅ Élevée — quotidien/hebdo attendu</span>, b: <span className="pm-neutre">⚠️ Modérée — risque visite occasionnelle uniquement</span>, c: <span className="pm-force">✅ Élevée — quotidien + occasionnel</span>, d: <span className="pm-force">✅ Élevée — destination + habitude week-end</span> },
    { dim: 'Attractivité enseignes premium', a: <span className="pm-neutre">⚠️ Modérée — positionnement moins aspirationnel</span>, b: <span className="pm-force">✅ Forte — signal premium fort pour les franchises</span>, c: <span className="pm-force">✅ Forte — si exécution premium convaincante</span>, d: <span className="pm-force">✅ Forte — cadre végétal premium attire internationales + locales</span> },
    { dim: "Risque d'exécution", a: <span className="pm-force">✅ Faible — cohérence facile à tenir</span>, b: <span className="pm-neutre">⚠️ Moyen — dépend du niveau réel des enseignes</span>, c: <span className="pm-risque">🔴 Élevé — l'hybride exige plus de rigueur opérationnelle</span>, d: <span className="pm-neutre">⚠️ Moyen — végétation = budget entretien permanent + paysagiste</span> },
    { dim: 'Différenciation vs Yopougon', a: <span className="pm-neutre">⚠️ Modérée — même famille, différence moins marquée</span>, b: <span className="pm-force">✅ Forte — rupture visuelle et expérientielle totale</span>, c: <span className="pm-force">✅ Forte — si identité visuelle B retenue</span>, d: <span className="pm-force">✅ Très forte — aucun mall végétal en CI</span> },
    { dim: 'Barrière à la copie', a: <span className="pm-neutre">⚠️ Faible — codes réplicables</span>, b: <span className="pm-neutre">⚠️ Moyenne — codes premium copiables</span>, c: <span className="pm-neutre">⚠️ Moyenne — exécution hybride difficile à copier</span>, d: <span className="pm-force">✅ Naturelle — végétation mature = 5 ans incompressibles</span> },
    { dim: 'Potentiel long terme', a: <span className="pm-neutre">⚠️ Solide mais limité — peut plafonner sur le segment local</span>, b: <span className="pm-force">✅ Fort — scalable à d'autres villes africaines</span>, c: <span className="pm-force">✅ Fort — cible élargie + codes premium</span>, d: <span className="pm-force">✅ Fort — identité renforcée avec le temps (végétation)</span> },
    { dim: 'Difficulté à communiquer', a: <span className="pm-force">✅ Faible — message simple et direct</span>, b: <span className="pm-neutre">⚠️ Moyenne — aspiration sans arrogance = subtil</span>, c: <span className="pm-risque">🔴 Élevée — l'hybride peut sembler flou si mal exécuté</span>, d: <span className="pm-force">✅ Faible — le végétal est immédiatement visible et compris</span> },
  ];

  return (
    <div className="pm-content">
      <div className="pm-eyebrow" style={{ color: '#C9943A' }}>Synthèse décisionnelle</div>
      <div className="pm-h1">Comparatif stratégique A vs B vs C vs D</div>
      <div className="pm-desc">Ce tableau n'a pas pour objectif de désigner un gagnant — c'est le rôle du Focus Group. Il donne les arguments pour et contre chaque scénario, à présenter en EXCO.</div>
      <div style={{ overflowX: 'auto', marginBottom: 32 }}>
        <table className="pm-comp-tbl">
          <thead>
            <tr>
              <th style={{ width: 140 }}>Dimension</th>
              <th>A — Proximité</th>
              <th>B — Destination</th>
              <th>C — L'Exception Naturelle</th>
              <th>D — Nature</th>
            </tr>
          </thead>
          <tbody>
            {compRows.map((r, i) => (
              <tr key={i}><td>{r.dim}</td><td>{r.a}</td><td>{r.b}</td><td>{r.c}</td><td>{r.d}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 24 }}>
        {[
          { color: '#4A7558', label: 'Choisir A si :', items: ['La priorité est la fréquentation immédiate dès l\'ouverture', 'On veut minimiser le risque d\'exécution', 'Les enseignes confirmées ne sont pas encore toutes premium', 'Le Focus Group montre que le public veut être rassuré, pas surpris'] },
          { color: '#C8A96E', label: 'Choisir B si :', items: ['L\'ambition long terme prime sur la fréquentation immédiate', 'Les enseignes confirmées sont suffisamment premium', 'Le restaurant gastronomique et FNAC/équivalent se confirment', 'Le Focus Group montre que le public veut être aspiré vers le haut'] },
          { color: '#C9943A', label: 'Choisir C si :', items: ['Le Focus Group montre une attente hybride forte', 'L\'équipe est prête à tenir une exécution rigoureuse', 'On veut maximiser la cible sans diluer le premium', 'La Direction artistique C (terracotta/bardade) est validée'] },
          { color: '#898D5D', label: 'Choisir D si :', items: ['On veut une identité visuelle inimitable à court terme', 'Le budget entretien végétal est sécurisé dans le Capex', 'Le Focus Group valorise le cadre naturel et le bien-être', 'On veut maximiser le temps de visite et le panier moyen'] },
        ].map(box => (
          <div key={box.label} style={{ padding: 24, borderRadius: 12, border: `1px solid ${box.color}33`, background: `${box.color}0A` }}>
            <div style={{ fontSize: 10, letterSpacing: '.2em', textTransform: 'uppercase', color: box.color, marginBottom: 10, fontWeight: 600 }}>{box.label}</div>
            <div style={{ fontSize: 12, color: 'rgba(26,20,16,.65)', lineHeight: 1.8 }}>
              {box.items.map((item, i) => <React.Fragment key={i}>→ {item}<br /></React.Fragment>)}
            </div>
          </div>
        ))}
      </div>
      <div className="pm-footer-note">
        Livrable 1 · Plateforme de marque Cosmos Angré · 4 scénarios · Mars 2026 · Document EXCO confidentiel — New Heaven SA / RCP<br />
        Prochaine étape : Brand Book draft 4 pistes (Livrable 2) → Focus Group 20-25/03 → Arbitrage final
      </div>
    </div>
  );
}

const PlateformeMarque: React.FC = () => {
  const [activePage, setActivePage] = useState<PageId>('intro');

  const handleNav = (id: PageId) => {
    setActivePage(id);
    const el = document.getElementById('plateforme');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div id="plateforme" className="border-b border-black/[.08]">
      <style>{pmStyles}</style>
      {/* Nav bar */}
      <div className="pm-nav">
        <div className="pm-nav-logo">COSMOS ANGRÉ · Plateforme de marque</div>
        <div className="pm-nav-tabs">
          {tabs.map(t => (
            <button
              key={t.id}
              className={`pm-nav-tab ${activePage === t.id ? 'active' : ''}`}
              onClick={() => handleNav(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="pm-nav-meta">Livrable 1 · EXCO · Mars 2026</div>
      </div>

      {/* Pages */}
      {activePage === 'intro' && <PageIntro onNav={handleNav} />}
      {activePage === 'scA' && <PageA />}
      {activePage === 'scB' && <PageB />}
      {activePage === 'scC' && <PageC />}
      {activePage === 'scD' && <PageD />}
      {activePage === 'comp' && <PageComp />}
    </div>
  );
};

export default PlateformeMarque;
