import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Star, ChevronRight, Layers, Hexagon, Heart, MessageSquare, Type, Paintbrush, Image, AlertTriangle, Eye, PanelTop, Box, Map, Route, Film, Package, Gem, Layout, Focus, Droplets } from 'lucide-react';
import type { ScenarioKey } from './Scenarios';
import BrandWorld from './BrandWorld';

interface ScenarioPageProps {
  scenarioKey: ScenarioKey;
  onBack: () => void;
}

/* ── Helpers ── */
const SectionTitle: React.FC<{ color: string; children: React.ReactNode }> = ({ color, children }) => (
  <div className="text-[9px] font-bold tracking-[.2em] uppercase mb-3 pb-2 border-b" style={{ color, borderColor: `${color}33` }}>
    {children}
  </div>
);

interface Swatch { bg: string; color: string; name: string; hex: string }
const SwatchRow: React.FC<{ swatches: Swatch[] }> = ({ swatches }) => (
  <div className="flex gap-2 flex-wrap mt-2">
    {swatches.map((s) => (
      <div key={s.hex + s.name} className="rounded-lg px-4 py-3 text-[10px] font-semibold tracking-wide min-w-[100px] shadow-sm" style={{ background: s.bg, color: s.color }}>
        {s.name}<br />{s.hex}
      </div>
    ))}
  </div>
);

interface KCard { num: string; facette: string; title: string; content: string; yes: string[]; no?: string[] }
const KapfererCard: React.FC<KCard & { color: string }> = ({ num, color, facette, title, content, yes, no = [] }) => (
  <div className="bg-white rounded-xl border border-black/[.06] p-5 shadow-sm">
    <div className="font-cormorant text-[28px] font-light mb-1" style={{ color }}>{num}</div>
    <div className="text-[9px] tracking-[.2em] uppercase text-black/40 mb-2">{facette}</div>
    <div className="text-[13px] font-bold text-black mb-1.5">{title}</div>
    <div className="text-[12px] text-black/60 leading-relaxed mb-3">{content}</div>
    <div className="flex gap-1.5 flex-wrap">
      {yes.map(t => <span key={t} className="px-2.5 py-1 rounded-full text-[9px] border border-black/[.1] text-black/60">{t}</span>)}
      {no.map(t => <span key={t} className="px-2.5 py-1 rounded-full text-[9px] border border-black/[.06] text-black/25 line-through">{t}</span>)}
    </div>
  </div>
);

interface TonBlock { label: string; content: string; ex: string }
const TonCard: React.FC<TonBlock> = ({ label, content, ex }) => (
  <div className="bg-white rounded-xl border border-black/[.06] p-5 shadow-sm">
    <div className="text-[9px] tracking-[.15em] uppercase text-black/35 mb-2">{label}</div>
    <div className="text-[13px] text-black/75 leading-relaxed">{content}</div>
    <div className="text-[11px] text-black/40 mt-2 italic">{ex}</div>
  </div>
);

/* ── NAV ITEMS ── */
const navSections = [
  { id: 'sc-usp', label: 'USP', icon: <Layers size={11} /> },
  { id: 'sc-kapferer', label: 'Prisme de Kapferer', icon: <Hexagon size={11} /> },
  { id: 'sc-valeurs', label: 'Valeurs de marque', icon: <Heart size={11} /> },
  { id: 'sc-ton', label: 'Ton de communication', icon: <MessageSquare size={11} /> },
  { id: 'sc-signatures', label: 'Signatures', icon: <Type size={11} /> },
  { id: 'sc-direction', label: 'Direction artistique', icon: <Paintbrush size={11} /> },
  { id: 'sc-colors', label: 'Stratégie couleurs', icon: <Droplets size={11} /> },
  { id: 'sc-moodboard', label: 'Moodboard', icon: <Image size={11} /> },
  { id: 'sc-matieres', label: 'Matières & Textures', icon: <Gem size={11} /> },
  { id: 'sc-applications', label: 'Règles d\'application', icon: <Layout size={11} /> },
  { id: 'sc-risques', label: 'Risques / Avantage', icon: <AlertTriangle size={11} /> },
  { id: 'sc-stimuli', label: 'Stimuli Focus Group', icon: <Focus size={11} /> },
  { id: 'bw-ambiance', label: 'Ambiance & Palette', icon: <Eye size={11} /> },
  { id: 'bw-logo', label: 'Déclinaisons Logo', icon: <Layers size={11} /> },
  { id: 'bw-signage', label: 'Vues 3D Cosmos', icon: <Image size={11} /> },
  { id: 'bw-stylized', label: 'Signalétique', icon: <PanelTop size={11} /> },
  { id: 'bw-mockups', label: 'Collection de Marque', icon: <Package size={11} /> },
  { id: 'bw-timeline', label: 'Parcours Client', icon: <Route size={11} /> },
];

/* ═══ DONNÉES COMPLÈTES PAR SCÉNARIO ═══ */

interface Matiere { name: string; desc: string; usage: string }
interface AppRule { support: string; fond: string; texte: string; accent: string; note: string }
interface FGStimulus { num: number; titre: string; format: string; palette: string; typo: string; contenu: string }

interface FullScenario {
  label: string;
  coverTitle: string;
  usp: string;
  uspQuote: string;
  uspSub: string;
  pillars: string[];
  coverFoot: string;
  accent: string;
  accentLabel: string;
  gradient: string;
  coverClass: string;
  values: { icon: string; name: string; desc: string }[];
  promesse: string;
  ton: TonBlock[];
  risk: { label: string; text: string };
  kapferer: KCard[];
  signatures: { type: string; text: string; why: string }[];
  direction: {
    label: string;
    concept: string;
    palette: Swatch[];
    paletteSecondaire?: { label: string; swatches: Swatch[] };
    typo: string[];
    rules?: string;
    paletteDit?: string;
    paletteEvite?: string;
    proportions?: string;
  };
  colorStrategy: { title: string; intro: string; rules: { support: string; dominant: string; structure: string; accent: string; ratio: string; why: string }[] };
  matieres: Matiere[];
  applicationRules: AppRule[];
  fgStimuli: FGStimulus[];
  moodboard: string;
}

const fullData: Record<ScenarioKey, FullScenario> = {
  A: {
    label: 'Scénario A — Premium de proximité',
    coverTitle: 'Premium\nde Proximité',
    usp: "Le premier centre commercial premium qui ne vous demande pas de sortir de votre quotidien pour vivre l'excellence.",
    uspQuote: '"Cosmos Angré est le centre commercial que les habitants d\'Angré et Cocody méritaient depuis longtemps — complet, moderne, accessible, ancré dans leur quotidien."',
    uspSub: 'Le Scénario A capitalise sur la frustration documentée (60% quittent Cocody pour faire leurs courses) et la convertit en loyauté. La promesse est simple : tout ce dont vous avez besoin, enfin ici.',
    pillars: ['Complétude', 'Accessibilité premium', 'Ancrage territorial', 'Modernité locale'],
    coverFoot: 'Cible : familles aisées + actifs CSP+ · Zone primaire Angré/Cocody',
    accent: '#4A7558', accentLabel: '#4A7558',
    gradient: 'from-[#1a2e20] to-[#2a4a35]', coverClass: 'from-[#1a2e20] via-[#2a4a35] to-[#3a5a42]',
    values: [
      { icon: '🌿', name: 'Complétude', desc: 'Tout en un lieu — zéro raison de partir ailleurs' },
      { icon: '🤝', name: 'Inclusion', desc: 'Premium accessible — pas élitiste' },
      { icon: '📍', name: 'Ancrage', desc: 'Fait partie du quartier, de la vie quotidienne' },
      { icon: '⚡', name: 'Modernité', desc: 'Standards internationaux, ici et maintenant' },
    ],
    promesse: '"Ici, le premium est chez vous. Pas dans un autre monde."',
    ton: [
      { label: 'Ton général', content: 'Chaleureux, direct, moderne. Parle comme un ami qui vous veut du bien.', ex: '"Tout ce que vous aimez, enfin à Angré."' },
      { label: 'Ce qu\'on ne dit jamais', content: 'Jamais "luxe", "exclusif", "prestige". On dit "qualité", "bien", "enfin", "votre".', ex: '"Votre nouveau centre de vie."' },
      { label: 'Digital & réseaux', content: 'Contenu de vie quotidienne. Recettes, sorties en famille, recommandations locales.', ex: '"Dimanche à Cosmos — qu\'est-ce que vous faites ?"' },
      { label: 'Institutionnel', content: 'Sobre, ancré dans les données terrain. Arguments concrets : première offre complète de la zone.', ex: '"Angré méritait mieux. Depuis octobre 2026, c\'est fait."' },
    ],
    risk: { label: 'Risques du scénario A', text: "Risque de ne pas se différencier suffisamment de Yopougon. Difficulté à justifier les loyers premium auprès des enseignes." },
    kapferer: [
      { num: '01', facette: 'Physique', title: 'Le centre contemporain du quartier', content: 'Architecture lumineuse et aérée, 8 bâtiments, parking 425 places. Carrefour, Zino, cinéma, clinique.', yes: ['Moderne','Lumineux','Complet','Végétalisé'], no: ['Clinquant','Intimidant'] },
      { num: '02', facette: 'Personnalité', title: 'Le voisin accompli', content: 'Voisin(e) de 35-40 ans, bien installé(e) à Angré. Connaît le quartier, recommande les bonnes adresses.', yes: ['Fiable','Généreux','Attentionné'], no: ['Snob','Distant'] },
      { num: '03', facette: 'Culture', title: 'Complétude · Qualité accessible', content: 'Tout en un lieu. Grade A ne veut pas dire prix inaccessibles.', yes: ['Complet','Accessible','Pionnier','Ancré'] },
      { num: '04', facette: 'Relation', title: 'Centre de gravité du quartier', content: 'Fréquentation régulière (1-2x/semaine). Confiance, habitude, appartenance locale.', yes: ['Quotidien','Confiance','Habitude'], no: ['Occasionnel'] },
      { num: '05', facette: 'Reflet', title: "Résident aisé d'Angré/Cocody", content: 'CSP+, famille, 28-50 ans. Veut la qualité sans traverser Abidjan.', yes: ['CSP+','Local','Exigeant','Accessible'] },
      { num: '06', facette: 'Mentalisation', title: '"J\'ai accès au meilleur, ici"', content: 'Fierté locale et modernité sans arrogance.', yes: ['Fierté locale','Modernité','Bien-être'] },
    ],
    signatures: [
      { type: 'Signature permanente', text: '"Le quartier que vous méritez"', why: 'Ancrage territorial fort. Appartenance immédiate.' },
      { type: 'Signature campagne', text: '"Enfin tout, enfin ici"', why: '"Enfin" dit l\'attente, "tout" dit la promesse, "ici" dit la proximité.' },
      { type: 'Complémentaire', text: '"L\'excellence, chez vous"', why: 'Premium de proximité en 3 mots.' },
    ],
    direction: {
      label: 'Piste A — Premium de proximité',
      concept: "La nature maîtrisée rencontre le luxe discret. Végétal, or cuivré, chaleur boisée. L'élégance sans ostentation.",
      palette: [
        { bg: '#2F5439', color: '#fff', name: 'Forêt Profond', hex: '#2F5439' },
        { bg: '#76764D', color: '#fff', name: 'Kaki Minéral', hex: '#76764D' },
        { bg: '#C9943A', color: '#fff', name: 'Or Cuivré', hex: '#C9943A' },
        { bg: '#E8C97A', color: '#1a1410', name: 'Or Doux', hex: '#E8C97A' },
        { bg: '#F2EBDD', color: '#1a1410', name: 'Sable Territorial', hex: '#F2EBDD' },
        { bg: '#1A1410', color: '#fff', name: 'Noir Chaud', hex: '#1A1410' },
      ],
      typo: ['Titres : Cormorant Garamond Light 300', 'Sous-titres : Inter Medium 500', 'Corps : Inter Regular 400', 'Accents : Inter SemiBold 600'],
      proportions: 'Forêt Profond 30% · Sable Territorial 35% · Or Cuivré 15% · Kaki Minéral 10% · Or Doux 5% · Noir Chaud 5%',
      paletteDit: 'Nature maîtrisée. Luxe discret. Enracinement. Fraîcheur végétale. Chaleur boisée.',
      paletteEvite: 'Vert fluo, vert pomme, or brillant, jaune vif. Tout ce qui crie plutôt que murmure.',
    },
    colorStrategy: {
      title: 'Stratégie colorimétrique — Scénario A',
      intro: "Le vert forêt ancre l'identité dans la nature maîtrisée — un luxe discret, jamais criard. Le crème domine les surfaces intérieures pour créer la chaleur \"chez soi\". L'or cuivré n'apparaît qu'en touche (10%) : c'est cette rareté qui le rend précieux. Le noir chaud sert de socle premium en extérieur. Règle absolue : le vert ne sature jamais — il encadre, il ne submerge pas.",
      rules: [
        { support: 'Façade / Totem', dominant: 'Noir Chaud #1A1410', structure: 'Forêt Profond #2F5439', accent: 'Or Cuivré #C9943A', ratio: '60/30/10', why: "Le noir ancre le premium en extérieur. Le vert identifie. L'or signe." },
        { support: 'Signalétique intérieure', dominant: 'Sable Territorial #F2EBDD', structure: 'Forêt Profond #2F5439', accent: 'Or Doux #E8C97A', ratio: '60/30/10', why: "En intérieur, le crème domine pour la sensation d'accueil. Le vert structure sans écraser." },
        { support: 'Digital (web/app)', dominant: 'Sable Territorial #F2EBDD', structure: 'Forêt Profond #2F5439', accent: 'Or Cuivré #C9943A', ratio: '60/25/15', why: "Le fond clair maximise la lisibilité. L'or sur les CTA guide l'action." },
        { support: 'Print (brochures)', dominant: 'Forêt Profond #2F5439', structure: 'Sable Territorial #F2EBDD', accent: 'Or Cuivré #C9943A', ratio: '50/40/10', why: "En print, le vert domine pour marquer l'identité. Le crème respire en fond de texte." },
        { support: 'Packaging (sacs)', dominant: 'Noir Chaud #1A1410', structure: '—', accent: 'Or Cuivré #C9943A', ratio: '90/0/10', why: "Le sac est un objet-signal : fond sombre maximal + logo or = perception luxe immédiate." },
        { support: 'T-shirt / Polo staff', dominant: 'Forêt Profond #2F5439', structure: 'Sable Territorial #F2EBDD', accent: 'Or Cuivré #C9943A', ratio: '85/10/5', why: "Textile vert forêt, logo or brodé poitrine gauche. Le crème en col/bords pour adoucir." },
        { support: 'Costume / Blazer management', dominant: 'Noir Chaud #1A1410', structure: 'Forêt Profond #2F5439', accent: 'Or Cuivré #C9943A', ratio: '90/5/5', why: "Blazer noir chaud, pin's or discret au revers, pochette vert forêt optionnelle." },
        { support: 'Bleu de travail / Maintenance', dominant: 'Kaki Minéral #76764D', structure: 'Sable Territorial #F2EBDD', accent: 'Or Doux #E8C97A', ratio: '80/15/5', why: "Vert vivant pour visibilité + appartenance. Logo or doux brodé dos et poitrine." },
        { support: 'Gourde / Tasse', dominant: 'Forêt Profond #2F5439', structure: 'Sable Territorial #F2EBDD', accent: 'Or Cuivré #C9943A', ratio: '70/20/10', why: "Corps vert forêt mat, couvercle crème, logo or gravé. Objet du quotidien = proximité." },
        { support: 'Porte-clés', dominant: 'Or Cuivré #C9943A', structure: 'Noir Chaud #1A1410', accent: '—', ratio: '60/40/0', why: "Exception : l'or domine car l'objet est petit. Métal doré + émail noir = bijou de poche." },
      ],
    },
    matieres: [
      { name: 'Bois de chêne fumé', desc: 'Veinage visible, finition satinée', usage: 'Comptoirs, habillages muraux, mobilier d\'accueil' },
      { name: 'Pierre calcaire beige', desc: 'Texture douce, ton crème naturel', usage: 'Sols, revêtements de façade, jardinières' },
      { name: 'Laiton brossé', desc: 'Finition mate, reflets dorés subtils', usage: 'Poignées, signalétique premium, luminaires' },
      { name: 'Lin naturel', desc: 'Tissage visible, ton écru', usage: 'Rideaux, coussins, éléments textiles' },
    ],
    applicationRules: [
      { support: 'Façade', fond: '#2F5439 Forêt Profond', texte: '#F2EBDD Sable Territorial', accent: '#C9943A Or Cuivré (logo, filet)', note: 'Lettrage Cormorant Garamond Light, espacement généreux' },
      { support: 'Print (brochure)', fond: '#F2EBDD Sable Territorial', texte: '#1A1410 Noir Chaud', accent: '#76764D Kaki Minéral (titres)', note: 'Papier offset ivoire 170g, toucher mat' },
      { support: 'Digital (web/app)', fond: '#F2EBDD Sable Territorial', texte: '#2F5439 Forêt Profond', accent: '#C9943A Or Cuivré (CTA, liens)', note: 'Flat design, icônes linéaires, blancs généreux' },
      { support: 'Packaging (sac)', fond: '#2F5439 Forêt Profond', texte: '#F2EBDD Sable Territorial', accent: '#C9943A Or Cuivré (logo)', note: 'Papier kraft premium, poignées cordon coton' },
      { support: 'Signalétique', fond: '#1A1410 Noir Chaud', texte: '#F2EBDD Sable Territorial', accent: '#E8C97A Or Doux (icônes)', note: 'Panneaux aluminium, lettres découpées' },
      { support: 'Événementiel', fond: '#76764D Kaki Minéral', texte: '#F2EBDD Sable Territorial', accent: '#C9943A Or Cuivré', note: 'Végétalisation, bois brut, éclairage chaud 3000K' },
      { support: 'T-shirt staff', fond: '#2F5439 Forêt Profond', texte: '#F2EBDD Crème (logo)', accent: '#C9943A Or Cuivré (broderie)', note: 'Coton bio 180g, logo brodé poitrine gauche, col et manches bord crème' },
      { support: 'Polo management', fond: '#1A1410 Noir Chaud', texte: '#F2EBDD Crème (logo)', accent: '#C9943A Or Cuivré (broderie)', note: 'Piqué coton premium, logo or brodé, boutons laiton brossé' },
      { support: 'Costume / Blazer', fond: '#1A1410 Noir Chaud', texte: '—', accent: '#C9943A Or Cuivré (pin\'s)', note: 'Blazer droit, pin\'s or revers gauche, pochette vert forêt optionnelle' },
      { support: 'Bleu de travail', fond: '#76764D Kaki Minéral', texte: '#F2EBDD Crème (logo)', accent: '#E8C97A Or Doux (broderie)', note: 'Combinaison ou veste/pantalon, logo brodé dos (grand) + poitrine, bandes réfléchissantes discrètes' },
      { support: 'Gourde isotherme', fond: '#2F5439 Forêt Profond', texte: '#F2EBDD Crème (bouchon)', accent: '#C9943A Or Cuivré (gravure)', note: 'Inox mat 500ml, logo gravé laser, bouchon bambou ou crème, boîte kraft' },
      { support: 'Tasse / Mug', fond: '#F2EBDD Sable Territorial', texte: '#2F5439 Forêt Profond', accent: '#C9943A Or Cuivré (intérieur)', note: 'Céramique crème ext., intérieur or cuivré, logo forêt profond, 350ml' },
      { support: 'Porte-clés', fond: '#C9943A Or Cuivré (métal)', texte: '#1A1410 Noir Chaud (émail)', accent: '—', note: 'Métal doré, forme arrondie, émail noir logo COSMOS, anneau plaqué or' },
    ],
    fgStimuli: [
      { num: 1, titre: 'Façade de nuit', format: '1200×800px, paysage', palette: '#2F5439 fond · #C9943A logo · #F2EBDD texte', typo: 'COSMOS ANGRÉ en Cormorant Garamond Light 72pt, signature Inter 18pt', contenu: 'Bardade forêt profond, lettrage or cuivré rétro-éclairé, végétation grimpante, éclairage chaud 3000K' },
      { num: 2, titre: 'Hall intérieur jour', format: '1200×800px, paysage', palette: '#F2EBDD dominant · #76764D accents · #C9943A détails', typo: 'Signalétique Inter Medium 500', contenu: 'Sol pierre calcaire, murs crème, plantes vertes, mobilier bois chêne, comptoir laiton brossé' },
      { num: 3, titre: 'Sac boutique', format: '800×1000px, portrait', palette: '#2F5439 sac · #C9943A logo · #F2EBDD intérieur', typo: 'COSMOS ANGRÉ Cormorant Garamond Light centré', contenu: 'Sac kraft premium forêt profond, poignées cordon coton écru, logo or cuivré gaufré' },
      { num: 4, titre: 'Écran digital hall', format: '1920×1080px, paysage 16:9', palette: '#2F5439 fond · #E8C97A titres · #F2EBDD corps', typo: 'Cormorant Garamond Light 48pt + Inter Regular 24pt', contenu: 'Annonce événement, photo lifestyle famille, icônes zones en or doux' },
      { num: 5, titre: 'Carte fidélité', format: '856×540px, format carte CR80', palette: '#2F5439 recto · #F2EBDD verso · #C9943A filet', typo: 'Cormorant 14pt logo · Inter 10pt infos', contenu: 'Recto forêt profond + logo or, verso crème + QR code + barcode' },
    ],
    moodboard: "Double page lumineuse et vivante : terrasse de restaurant intérieur avec plantes vertes, lumière naturelle filtrée par une verrière, familles et jeunes professionnels. Couleurs douces — vert forêt, crème chaude, touches d'or cuivré. Le sentiment : un samedi matin parfait.",
  },
  B: {
    label: 'Scénario B — Destination premium',
    coverTitle: 'Destination\nPremium',
    usp: "La première destination premium mixed-use d'Abidjan. Cosmos Angré n'est pas un mall. C'est une destination.",
    uspQuote: '"Cosmos Angré est la première destination premium mixed-use d\'Abidjan — hôtel, cinéma, bureaux, gastronomie, clinique, shopping. On y vit une expérience."',
    uspSub: 'Le Scénario B joue sur l\'aspiration et la rupture. Il positionne Cosmos Angré comme référence régionale — pas juste locale.',
    pillars: ['Aspiration', 'Expérience totale', 'Destination panafricaine', 'Standard international'],
    coverFoot: "Cible : clientèle aspirationnelle + enseignes premium · Positionnement régional",
    accent: '#0D1B4B', accentLabel: '#C8A96E',
    gradient: 'from-[#0d1b3e] to-[#1a3060]', coverClass: 'from-[#050d24] via-[#0D1B4B] to-[#1a3060]',
    values: [
      { icon: '✨', name: 'Excellence', desc: 'Chaque détail compte' },
      { icon: '🌍', name: 'Ambition africaine', desc: 'Standards mondiaux, identité africaine' },
      { icon: '🎭', name: 'Expérience totale', desc: 'On vit quelque chose' },
      { icon: '💎', name: 'Singularité', desc: 'Rien de comparable à Abidjan' },
    ],
    promesse: '"Un monde à part. Le vôtre."',
    ton: [
      { label: 'Ton général', content: 'Sobre, distingué, confiant. La qualité s\'affirme avec sérénité.', ex: '"Cosmos Angré. Une adresse. Une expérience."' },
      { label: 'Ce qu\'on ne dit jamais', content: 'Jamais "pour tous", "accessible", "quotidien". On dit "l\'exception", "l\'adresse".', ex: '"L\'exception, enfin à Abidjan."' },
      { label: 'Digital & réseaux', content: 'Contenu aspirationnel. Architecture, gastronomie, événements. Curation.', ex: '"Ce soir à Cosmos Angré — une table, un film, une nuit."' },
      { label: 'Institutionnel', content: 'ROI, trafic qualifié, clientèle CSP++, premier mixed-use d\'Abidjan.', ex: '"La première destination mixed-use premium d\'Abidjan."' },
    ],
    risk: { label: 'Risques du scénario B', text: "Risque d'aliéner la base client Cocody qui veut du premium accessible. Pression sur la qualité des enseignes." },
    kapferer: [
      { num: '01', facette: 'Physique', title: 'L\'architecture destination', content: 'Bardade bronze/or mat. Hôtel, cinéma, clinique, rooftop, bureaux. Matériaux nobles.', yes: ['Remarquable','Noble','Unique'], no: ['Ordinaire'] },
      { num: '02', facette: 'Personnalité', title: "L'hôte sophistiqué", content: 'Directeur d\'hôtel 5 étoiles. Attentionné, cultivé, discret, élégant.', yes: ['Distingué','Discret','Aspirationnel'], no: ['Arrogant'] },
      { num: '03', facette: 'Culture', title: 'Excellence · Singularité', content: 'Cosmos Angré ne reproduit pas — il crée. Standards internationaux.', yes: ['Excellence','Singularité','Ambition'] },
      { num: '04', facette: 'Relation', title: "L'occasion → l'habitude", content: 'On vient pour une occasion. On revient parce qu\'on ne veut plus aller ailleurs.', yes: ['Destination','Expérience'] },
      { num: '05', facette: 'Reflet', title: 'Le goût du beau', content: 'Cadres supérieurs, entrepreneurs, expatriés. >1,5M FCFA/mois.', yes: ['CSP++','International','Exigeant'] },
      { num: '06', facette: 'Mentalisation', title: 'Ce qui se fait de mieux', content: 'Signal social fort. Aspiration et appartenance.', yes: ['Statut','Distinction'] },
    ],
    signatures: [
      { type: 'Signature permanente', text: '"Un monde à part"', why: 'Rupture totale. Mémorable, universel, intemporel.' },
      { type: 'Signature campagne', text: '"Vivez l\'exception"', why: 'Invitation à l\'action. Promesse de singularité.' },
      { type: 'Complémentaire', text: '"La destination Abidjan"', why: 'Ambition régionale.' },
    ],
    direction: {
      label: 'Piste B — Destination premium',
      concept: "Le prestige intemporel. Nuit profonde, or mat, sobriété absolue. Codes du luxe francophone — Chanel, Sofitel, Cartier.",
      palette: [
        { bg: '#060E2A', color: '#fff', name: 'Nuit Abyssale', hex: '#060E2A' },
        { bg: '#0D1B4B', color: '#fff', name: 'Bleu Nuit', hex: '#0D1B4B' },
        { bg: '#1A3060', color: '#fff', name: 'Bleu Profond', hex: '#1A3060' },
        { bg: '#B8924A', color: '#fff', name: 'Or Mat', hex: '#B8924A' },
        { bg: '#D4B06A', color: '#1a1410', name: 'Or Clair', hex: '#D4B06A' },
        { bg: '#F2EDE3', color: '#1a1410', name: 'Ivoire', hex: '#F2EDE3' },
      ],
      typo: ['Titres : Playfair Display Regular 400', 'Sous-titres : Inter Light 300', 'Corps : Inter Regular 400', 'Accents : Playfair Display Italic'],
      rules: 'Sur fond sombre : Or Mat sur Nuit Abyssale. Sur fond clair : Bleu Nuit sur Ivoire. Jamais de couleurs vives.',
      proportions: 'Nuit Abyssale 35% · Ivoire 25% · Or Mat 15% · Bleu Nuit 10% · Bleu Profond 10% · Or Clair 5%',
      paletteDit: 'Profondeur. Silence. Prestige. Intemporalité. Nuit étoilée.',
      paletteEvite: 'Bleu électrique, or brillant, jaune, blanc pur. Tout ce qui est bruyant ou clinquant.',
    },
    colorStrategy: {
      title: 'Stratégie colorimétrique — Scénario B',
      intro: "Le bleu nuit est omniprésent — c'est le dark mode permanent qui installe la perception \"destination d'exception\". L'or mat n'intervient que comme signature (10%) : comme dans un palace, on ne voit l'or que dans les détails. L'ivoire est réservé au print physique et à la signalétique intérieure pour la lisibilité. Règle absolue : jamais de couleur vive, jamais de blanc pur — tout est filtré par la nuit.",
      rules: [
        { support: 'Façade / Totem', dominant: 'Nuit Abyssale #060E2A', structure: 'Bleu Nuit #0D1B4B', accent: 'Or Mat #B8924A', ratio: '60/30/10', why: "Le noir bleuté crée la profondeur. Le bleu nuit module. L'or signe avec retenue." },
        { support: 'Signalétique intérieure', dominant: 'Bleu Nuit #0D1B4B', structure: 'Ivoire #F2EDE3', accent: 'Or Clair #D4B06A', ratio: '60/30/10', why: "Le bleu nuit enveloppe. L'ivoire rend lisible sans casser l'ambiance." },
        { support: 'Digital (web/app)', dominant: 'Nuit Abyssale #060E2A', structure: 'Bleu Profond #1A3060', accent: 'Or Mat #B8924A', ratio: '65/25/10', why: "Dark mode natif. Pas de mode clair — la nuit est l'identité." },
        { support: 'Print (brochures)', dominant: 'Ivoire #F2EDE3', structure: 'Bleu Nuit #0D1B4B', accent: 'Or Mat #B8924A', ratio: '50/40/10', why: "En print, l'ivoire domine (lisibilité papier). Dorure à chaud pour le logo." },
        { support: 'Packaging (sacs)', dominant: 'Nuit Abyssale #060E2A', structure: '—', accent: 'Or Mat #B8924A', ratio: '90/0/10', why: "Papier texturé noir, logo or mat gaufré. Poignées ruban gros-grain marine." },
        { support: 'T-shirt / Polo staff', dominant: 'Bleu Nuit #0D1B4B', structure: 'Ivoire #F2EDE3', accent: 'Or Mat #B8924A', ratio: '85/10/5', why: "Polo marine profond, logo or mat brodé. Col et bords en ivoire pour distinction." },
        { support: 'Costume / Blazer management', dominant: 'Nuit Abyssale #060E2A', structure: 'Bleu Nuit #0D1B4B', accent: 'Or Mat #B8924A', ratio: '90/5/5', why: "Costume bleu nuit profond. Pin's or mat au revers. Cravate/foulard bleu profond." },
        { support: 'Bleu de travail / Maintenance', dominant: 'Bleu Profond #1A3060', structure: 'Ivoire #F2EDE3', accent: 'Or Clair #D4B06A', ratio: '80/15/5', why: "Bleu profond, lisible et identitaire. Logo or clair brodé dos et poitrine." },
        { support: 'Gourde / Tasse', dominant: 'Nuit Abyssale #060E2A', structure: 'Ivoire #F2EDE3', accent: 'Or Mat #B8924A', ratio: '70/20/10', why: "Corps noir mat, couvercle ivoire, logo or gravé au laser. Objet-bijou." },
        { support: 'Porte-clés', dominant: 'Or Mat #B8924A', structure: 'Nuit Abyssale #060E2A', accent: '—', ratio: '60/40/0', why: "Métal or mat + émail bleu nuit. Le seul objet où l'or domine — car il est petit." },
      ],
    },
    matieres: [
      { name: 'Marbre noir veiné', desc: 'Nero Marquina, veines blanches subtiles', usage: 'Sols hall principal, comptoirs d\'accueil' },
      { name: 'Laiton poli', desc: 'Finition miroir, reflets dorés profonds', usage: 'Cadres, poignées, lettrages de façade' },
      { name: 'Velours marine', desc: 'Toucher profond, bleu nuit intense', usage: 'Assises lounge, habillages muraux VIP' },
      { name: 'Verre fumé', desc: 'Teinté bronze, transparence contrôlée', usage: 'Cloisons, vitrines, garde-corps' },
    ],
    applicationRules: [
      { support: 'Façade', fond: '#060E2A Nuit Abyssale', texte: '#F2EDE3 Ivoire', accent: '#B8924A Or Mat (lettrage, filet)', note: 'Lettrage Playfair Display Regular, espacement ultra-généreux' },
      { support: 'Print (brochure)', fond: '#F2EDE3 Ivoire', texte: '#060E2A Nuit Abyssale', accent: '#B8924A Or Mat (titres)', note: 'Papier couché mat 200g, dorure à chaud sur logo' },
      { support: 'Digital (web/app)', fond: '#060E2A Nuit Abyssale', texte: '#F2EDE3 Ivoire', accent: '#D4B06A Or Clair (CTA, hover)', note: 'Dark mode natif, animations subtiles, transitions lentes' },
      { support: 'Packaging (sac)', fond: '#060E2A Nuit Abyssale', texte: '#F2EDE3 Ivoire', accent: '#B8924A Or Mat (logo gaufré)', note: 'Papier texturé noir, poignées ruban gros-grain marine' },
      { support: 'Signalétique', fond: '#0D1B4B Bleu Nuit', texte: '#F2EDE3 Ivoire', accent: '#B8924A Or Mat (icônes)', note: 'Aluminium anodisé noir, lettres laiton découpées' },
      { support: 'Événementiel', fond: '#060E2A Nuit Abyssale', texte: '#F2EDE3 Ivoire', accent: '#B8924A Or Mat', note: 'Velours, éclairage tamisé 2700K, bougies, musique lounge' },
      { support: 'T-shirt staff', fond: '#0D1B4B Bleu Nuit', texte: '#F2EDE3 Ivoire (logo)', accent: '#B8924A Or Mat (broderie)', note: 'Coton pima 180g, logo or mat brodé poitrine, col bord ivoire' },
      { support: 'Polo management', fond: '#060E2A Nuit Abyssale', texte: '#F2EDE3 Ivoire (logo)', accent: '#B8924A Or Mat (broderie)', note: 'Piqué coton premium, logo or mat brodé, boutons laiton poli' },
      { support: 'Costume / Blazer', fond: '#060E2A Nuit Abyssale', texte: '—', accent: '#B8924A Or Mat (pin\'s)', note: 'Costume bleu nuit profond, pin\'s or mat revers, cravate/foulard bleu profond' },
      { support: 'Bleu de travail', fond: '#1A3060 Bleu Profond', texte: '#F2EDE3 Ivoire (logo)', accent: '#D4B06A Or Clair (broderie)', note: 'Veste/pantalon bleu profond, logo or clair brodé dos + poitrine' },
      { support: 'Gourde isotherme', fond: '#060E2A Nuit Abyssale', texte: '#F2EDE3 Ivoire (bouchon)', accent: '#B8924A Or Mat (gravure)', note: 'Inox noir mat 500ml, logo or gravé laser, bouchon ivoire, coffret bleu nuit' },
      { support: 'Tasse / Mug', fond: '#060E2A Nuit Abyssale', texte: '#F2EDE3 Ivoire', accent: '#B8924A Or Mat (intérieur)', note: 'Céramique nuit ext., intérieur or mat, logo ivoire, 350ml, soucoupe assortie' },
      { support: 'Porte-clés', fond: '#B8924A Or Mat (métal)', texte: '#060E2A Nuit Abyssale (émail)', accent: '—', note: 'Métal or mat, forme rectangulaire épurée, émail bleu nuit logo, anneau gunmetal' },
    ],
    fgStimuli: [
      { num: 6, titre: 'Façade de nuit', format: '1200×800px, paysage', palette: '#060E2A fond · #B8924A lettrage · #F2EDE3 sous-titre', typo: 'COSMOS ANGRÉ en Playfair Display Regular 72pt', contenu: 'Façade nuit abyssale, lettrage or mat rétro-éclairé, pas de végétation, lignes pures, marbre visible' },
      { num: 7, titre: 'Lobby hôtel', format: '1200×800px, paysage', palette: '#060E2A dominant · #B8924A accents · #F2EDE3 détails', typo: 'Signalétique Inter Light 300', contenu: 'Sol marbre noir veiné, comptoir laiton poli, velours marine, éclairage indirect, hauteur sous plafond' },
      { num: 8, titre: 'Invitation VIP', format: '800×400px, paysage', palette: '#060E2A fond · #B8924A texte · #D4B06A filet', typo: 'Playfair Display Italic 24pt + Inter Light 14pt', contenu: 'Carton rigide noir, dorure à chaud, typographie espacée, enveloppe doublée or' },
      { num: 9, titre: 'App mobile dark', format: '390×844px, portrait mobile', palette: '#060E2A fond · #B8924A nav · #F2EDE3 texte', typo: 'Playfair Display 18pt titres · Inter Regular 14pt corps', contenu: 'Interface dark mode, navigation or mat, cards bleu profond, animations fluides' },
      { num: 10, titre: 'Panneau suspendu', format: '800×300px, paysage', palette: '#0D1B4B fond · #B8924A icônes · #F2EDE3 texte', typo: 'Inter Light 300 directionnel', contenu: 'Panneau aluminium anodisé, icônes or mat, flèches directionnelles, bilingue FR/EN' },
    ],
    moodboard: "Galerie marchande en fin de journée, lumières tamisées, sol en marbre noir veiné, enseignes sobres en lettres or mat. Typographie \"Cosmos Angré\" en Playfair Display or mat sur fond nuit abyssale. Élévation silencieuse.",
  },
  C: {
    label: "Scénario C — L'Exception Naturelle",
    coverTitle: "L'Exception\nNaturelle",
    usp: "Cosmos Angré habille en Sofitel et accueille en Novotel. Pas un compromis — une synthèse inédite.",
    uspQuote: '"Cosmos Angré est une destination premium complète — et votre centre de vie. Le premium n\'exclut pas. Il élève."',
    uspSub: "Le Scénario C refuse de choisir entre A et B. L'identité visuelle est premium (codes B), l'accueil est chaleureux (ADN A).",
    pillars: ['Premium ancré', 'Destination & quotidien', 'Aspiration inclusive', 'Identité africaine forte'],
    coverFoot: 'Cible élargie · Positionnement le plus différenciant',
    accent: '#C9943A', accentLabel: '#C9943A',
    gradient: 'from-[#B25A38] to-[#6D7447]', coverClass: 'from-[#B25A38] via-[#6D7447] to-[#C9943A]',
    values: [
      { icon: '🌍', name: 'Hospitalité africaine', desc: 'Premium et chaleureux' },
      { icon: '⬆️', name: 'Élévation inclusive', desc: 'La qualité tire vers le haut' },
      { icon: '🔄', name: 'Polyvalence', desc: 'Quotidien et occasion spéciale' },
      { icon: '🏆', name: 'Standard sans distance', desc: 'Le meilleur, accessible' },
    ],
    promesse: '"L\'exception, pour tous les jours."',
    ton: [
      { label: 'Ton général', content: 'Chaleureux et élégant. La distinction dans la bienveillance.', ex: '"L\'exception, tout simplement."' },
      { label: 'Ce qu\'on ne dit jamais', content: 'Jamais "luxe" seul, jamais "populaire". On dit "exceptionnel", "pour vous", "ici".', ex: '"Ce qui se fait de mieux. Ici."' },
      { label: 'Digital & réseaux', content: 'Mix lifestyle premium + proximité. Gastronomie ET marché local.', ex: '"De la terrasse au cinéma — votre samedi à Cosmos."' },
      { label: 'Institutionnel', content: 'Premier mixed-use premium, ancré dans la zone la plus aisée de Cocody.', ex: '"La destination premium du quotidien."' },
    ],
    risk: { label: 'Avantage stratégique', text: "Ce scénario capte les deux cibles (aspiration destination + besoin proximité), justifie la grille de loyers, et construit une identité unique non réplicable par des concurrents éventuels." },
    kapferer: [
      { num: '01', facette: 'Physique', title: 'Le premium qui accueille', content: 'Bardade bronze, terracotta, palette africaine premium. Même offre complète mais présentée avec chaleur.', yes: ['Premium','Chaleureux','Africain'], no: ['Froid','Intimidant'] },
      { num: '02', facette: 'Personnalité', title: "L'hôte africain", content: 'Entrepreneur ivoirien accompli de 40 ans. Qualité irréprochable, tout le monde se sent chez soi.', yes: ['Accompli','Chaleureux','Élégant'], no: ['Condescendant'] },
      { num: '03', facette: 'Culture', title: "L'excellence africaine", content: "L'Afrique n'a pas à choisir entre qualité et chaleur.", yes: ['Excellence','Hospitalité','Fierté'] },
      { num: '04', facette: 'Relation', title: 'Le centre qui grandit avec vous', content: "Courses le matin, cinéma le soir. La relation évolue selon les occasions.", yes: ['Polyvalent','Fidèle','Évolutif'] },
      { num: '05', facette: 'Reflet', title: "La clientèle qui n'a pas à choisir", content: 'CSP+ élargi. Familles, jeunes actifs, cadres, entrepreneurs.', yes: ['CSP+ élargi','Familles','Actifs'] },
      { num: '06', facette: 'Mentalisation', title: 'Je vis bien — et je le partage', content: "Goût, modernité, beauté — sans snobisme. Fierté sans arrogance.", yes: ['Fierté','Partage','Modernité'] },
    ],
    signatures: [
      { type: 'Signature permanente', text: '"L\'exception, tout simplement"', why: 'Tagline canonique. Court, mémorable, signe le territoire C.' },
      { type: 'Alternative', text: '"L\'exceptionnel, au quotidien"', why: 'Tagline2 canonique. Ancre le premium dans le quotidien.' },
      { type: 'Complémentaire', text: '"Votre monde. Votre standard."', why: 'Personnalisation + excellence.' },
    ],
    direction: {
      label: 'Piste C — L'Exception Naturelle',
      concept: "L'Afrique contemporaine premium. Terracotta, bronze doré, textures artisanales. La chaleur de la terre rencontre la sophistication urbaine.",
      palette: [
        { bg: '#2C1A0A', color: '#fff', name: 'Ébène Chaud', hex: '#2C1A0A' },
        { bg: '#B25A38', color: '#fff', name: 'Terracotta Foncé', hex: '#B25A38' },
        { bg: '#6D7447', color: '#fff', name: 'Kaki Végétal', hex: '#6D7447' },
        { bg: '#C9943A', color: '#fff', name: 'Bronze Doré', hex: '#C9943A' },
        { bg: '#D6C29C', color: '#1a1410', name: 'Sable Naturel', hex: '#D6C29C' },
        { bg: '#F2EBDD', color: '#1a1410', name: 'Sable Territorial', hex: '#F2EBDD' },
      ],
      typo: ['Titres : Cormorant Garamond SemiBold 600', 'Sous-titres : Inter Medium 500', 'Corps : Inter Regular 400', 'Accents : Cormorant Garamond Italic'],
      rules: "Sur fond sombre : Bronze Doré sur Ébène Chaud. Sur fond clair : Terracotta Foncé sur Sable Territorial. Kaki Végétal pour les accents dynamiques.",
      proportions: 'Sable Territorial 30% · Ébène Chaud 25% · Bronze Doré 15% · Kaki Végétal 12% · Sable Naturel 10% · Terracotta Foncé 8%',
      paletteDit: 'Terre. Soleil. Artisanat. Chaleur humaine. Afrique contemporaine. Hospitalité.',
      paletteEvite: 'Orange fluo, rouge vif, marron terne, beige fade. Tout ce qui est générique ou sans caractère.',
    },
    colorStrategy: {
      title: 'Stratégie colorimétrique — Scénario C',
      intro: "Le terracotta est la couleur-signature qui différencie Cosmos Angré de tout concurrent potentiel. Aucun mall en Côte d'Ivoire ne l'utilise. La dualité Ébène/Crème crée l'effet \"Sofitel/Novotel\" : l'ébène pour le prestige, la crème pour l'accueil. Le bronze doré lie les deux mondes. Règle absolue : le terracotta apparaît toujours avec la crème — jamais seul sur fond blanc pur.",
      rules: [
        { support: 'Façade / Totem', dominant: 'Terracotta Foncé #B25A38', structure: 'Ébène Chaud #2C1A0A', accent: 'Bronze Doré #C9943A', ratio: '50/40/10', why: "Le terracotta en bardade est visible et unique. L'ébène ancre le premium. Le bronze signe." },
        { support: 'Signalétique intérieure', dominant: 'Sable Territorial #F2EBDD', structure: 'Terracotta Foncé #B25A38', accent: 'Bronze Doré #C9943A', ratio: '60/30/10', why: "En intérieur, la crème domine pour l'accueil chaleureux. Le terracotta structure." },
        { support: 'Digital (web/app)', dominant: 'Sable Territorial #F2EBDD', structure: 'Ébène Chaud #2C1A0A', accent: 'Bronze Doré #C9943A', ratio: '55/30/15', why: "Split clair/sombre : header ébène, corps crème. Le bronze guide les actions." },
        { support: 'Print (brochures)', dominant: 'Ébène Chaud #2C1A0A', structure: 'Sable Naturel #D6C29C', accent: 'Kaki Végétal #6D7447', ratio: '50/35/15', why: "L'ébène domine le print pour le prestige. Le sable adoucit. Le terracotta vif ponctue." },
        { support: 'Packaging (sacs)', dominant: 'Terracotta Foncé #B25A38', structure: '—', accent: 'Bronze Doré #C9943A', ratio: '90/0/10', why: "Le sac terracotta est un marqueur unique. Logo bronze gaufré. Poignées raphia." },
        { support: 'T-shirt / Polo staff', dominant: 'Terracotta Foncé #B25A38', structure: 'Sable Territorial #F2EBDD', accent: 'Bronze Doré #C9943A', ratio: '85/10/5', why: "Polo terracotta, logo bronze brodé. Col/bords crème. Identité africaine immédiate." },
        { support: 'Costume / Blazer management', dominant: 'Ébène Chaud #2C1A0A', structure: 'Terracotta Foncé #B25A38', accent: 'Bronze Doré #C9943A', ratio: '85/10/5', why: "Blazer ébène, pin's bronze au revers, pochette terracotta. Élégance terrienne." },
        { support: 'Bleu de travail / Maintenance', dominant: 'Kaki Végétal #6D7447', structure: 'Sable Territorial #F2EBDD', accent: 'Sable Naturel #D6C29C', ratio: '80/15/5', why: "Terracotta vif pour visibilité et chaleur. Logo sable doré brodé dos et poitrine." },
        { support: 'Gourde / Tasse', dominant: 'Ébène Chaud #2C1A0A', structure: 'Sable Territorial #F2EBDD', accent: 'Bronze Doré #C9943A', ratio: '70/20/10', why: "Corps ébène mat, couvercle crème, logo bronze gravé. Chaleur au toucher." },
        { support: 'Porte-clés', dominant: 'Bronze Doré #C9943A', structure: 'Ébène Chaud #2C1A0A', accent: '—', ratio: '60/40/0', why: "Métal bronze + émail ébène. Motif géométrique africain en relief. Bijou identitaire." },
      ],
    },
    matieres: [
      { name: 'Terracotta artisanale', desc: 'Cuisson traditionnelle, tons chauds irréguliers', usage: 'Bardade extérieure, habillages muraux, jardinières' },
      { name: 'Bronze patiné', desc: 'Finition vieillie, reflets cuivrés profonds', usage: 'Signalétique, luminaires, garde-corps, poignées' },
      { name: 'Bois d\'ébène', desc: 'Grain dense, finition satinée noire', usage: 'Mobilier d\'accueil, comptoirs, cadres décoratifs' },
      { name: 'Raphia tressé', desc: 'Tissage artisanal, ton naturel doré', usage: 'Suspensions, panneaux décoratifs, assises lounge' },
    ],
    applicationRules: [
      { support: 'Façade', fond: '#2C1A0A Ébène Chaud', texte: '#F2EBDD Sable Territorial', accent: '#C9943A Bronze Doré (lettrage, bardade)', note: 'Cormorant Garamond SemiBold, bardade terracotta artisanale' },
      { support: 'Print (brochure)', fond: '#F2EBDD Sable Territorial', texte: '#2C1A0A Ébène Chaud', accent: '#B25A38 Terracotta Foncé (titres)', note: 'Papier texturé sable 180g, encres chaudes' },
      { support: 'Digital (web/app)', fond: '#F2EBDD Sable Territorial', texte: '#2C1A0A Ébène Chaud', accent: '#C9943A Bronze Doré (CTA)', note: 'Mode clair chaleureux, illustrations artisanales, photos lifestyle' },
      { support: 'Packaging (sac)', fond: '#2C1A0A Ébène Chaud', texte: '#F2EBDD Sable Territorial', accent: '#C9943A Bronze Doré (logo)', note: 'Papier kraft brun, poignées raphia tressé' },
      { support: 'Signalétique', fond: '#B25A38 Terracotta Foncé', texte: '#F2EBDD Sable Territorial', accent: '#D6C29C Sable Naturel (icônes)', note: 'Panneaux bronze patiné, lettres découpées' },
      { support: 'Événementiel', fond: '#6D7447 Kaki Végétal', texte: '#F2EBDD Sable Territorial', accent: '#C9943A Bronze Doré', note: 'Raphia, bois d\'ébène, éclairage doré 2700K, musique afro-jazz' },
      { support: 'T-shirt staff', fond: '#B25A38 Terracotta Foncé', texte: '#F2EBDD Crème (logo)', accent: '#C9943A Bronze Doré (broderie)', note: 'Coton bio 180g, logo bronze brodé poitrine, col et bords crème sablée' },
      { support: 'Polo management', fond: '#2C1A0A Ébène Chaud', texte: '#F2EBDD Crème (logo)', accent: '#C9943A Bronze Doré (broderie)', note: 'Piqué coton premium, logo bronze brodé, boutons en corne naturelle' },
      { support: 'Costume / Blazer', fond: '#2C1A0A Ébène Chaud', texte: '—', accent: '#C9943A Bronze Doré (pin\'s)', note: 'Blazer ébène, pin\'s bronze revers gauche, pochette terracotta, boutons corne' },
      { support: 'Bleu de travail', fond: '#6D7447 Kaki Végétal', texte: '#F2EBDD Crème (logo)', accent: '#D6C29C Sable Naturel (broderie)', note: 'Veste/pantalon terracotta vif, logo sable doré brodé dos + poitrine' },
      { support: 'Gourde isotherme', fond: '#2C1A0A Ébène Chaud', texte: '#F2EBDD Crème (bouchon)', accent: '#C9943A Bronze Doré (gravure)', note: 'Inox ébène mat 500ml, logo bronze gravé, bouchon bois naturel, étui raphia' },
      { support: 'Tasse / Mug', fond: '#F2EBDD Sable Territorial', texte: '#B25A38 Terracotta Foncé', accent: '#C9943A Bronze Doré (intérieur)', note: 'Céramique crème ext., intérieur bronze, logo terracotta, motif géo africain discret, 350ml' },
      { support: 'Porte-clés', fond: '#C9943A Bronze Doré (métal)', texte: '#2C1A0A Ébène Chaud (émail)', accent: '—', note: 'Métal bronze, forme losange, émail ébène logo, motif géométrique africain relief' },
    ],
    fgStimuli: [
      { num: 11, titre: 'Façade bardade terracotta', format: '1200×800px, paysage', palette: '#2C1A0A fond · #C9943A lettrage · #6D7447 bardade · #F2EBDD texte', typo: 'COSMOS ANGRÉ en Cormorant Garamond SemiBold 72pt', contenu: 'Bardade terracotta artisanale, lettrage bronze doré rétro-éclairé, végétation tropicale, éclairage doré 2700K' },
      { num: 12, titre: 'Hall intérieur chaleureux', format: '1200×800px, paysage', palette: '#F2EBDD dominant · #6D7447 accents · #C9943A détails', typo: 'Signalétique Inter Medium 500', contenu: 'Sol crème sablée, murs terracotta, suspensions raphia, mobilier ébène, comptoir bronze patiné, plantes tropicales' },
      { num: 13, titre: 'Sac boutique premium', format: '800×1000px, portrait', palette: '#2C1A0A sac · #C9943A logo · #F2EBDD intérieur', typo: 'COSMOS ANGRÉ Cormorant Garamond SemiBold centré', contenu: 'Sac kraft brun ébène, poignées raphia tressé naturel, logo bronze doré gaufré' },
      { num: 14, titre: 'Terrasse restaurant', format: '1200×800px, paysage', palette: '#D6C29C dominant · #B25A38 mobilier · #C9943A accents', typo: 'Cormorant Garamond Italic 36pt (citation)', contenu: 'Terrasse ombragée, mobilier bois ébène, coussins terracotta, suspension raphia, vue sur jardin intérieur' },
      { num: 15, titre: 'Affiche événement Cosmos', format: '800×1200px, portrait', palette: '#2C1A0A fond · #C9943A titre · #6D7447 sous-titre · #F2EBDD détails', typo: 'Cormorant SemiBold 48pt + Inter Medium 18pt', contenu: '"Week-end Cosmos" — marché artisanal, food trucks, jazz live. Motifs géométriques africains en filigrane' },
    ],
    moodboard: "Diptyque : façade de nuit — bardade terracotta, lettrage bronze doré sur ébène chaud. Intérieur de jour — crème sablée, raphia, familles, terrasse en fond. \"Habiller en Sofitel, accueillir en Novotel\" — l'exception africaine.",
  },
  D: {
    label: 'Scénario D — Nature Contemporaine',
    coverTitle: 'Nature\nContemporaine',
    usp: "Le premier centre commercial à Cocody où la nature structure l'expérience d'achat.",
    uspQuote: '"Cosmos Angré est le premier mall d\'Afrique de l\'Ouest où la végétation n\'est pas un décor — elle est l\'architecture. Chaque allée est un jardin, chaque pause est une respiration."',
    uspSub: "Le Scénario D capitalise sur l'identité végétale unique. La nature n'est pas un supplément cosmétique — elle est le pilier structurant de l'expérience client, de l'architecture et de la marque.",
    pillars: ['Expérience d\'achat premium', 'Destination pas transit', 'Qualité visible', 'Ancrage communautaire'],
    coverFoot: 'Cible : familles CSP+ Cocody · Identité botanique non réplicable',
    accent: '#898D5D', accentLabel: '#D4A843',
    gradient: 'from-[#1C2215] to-[#3D4A2A]', coverClass: 'from-[#1C2215] via-[#3D4A2A] to-[#6B7A4A]',
    values: [
      { icon: '🌿', name: 'Expérience d\'achat premium', desc: 'Shopping immersif dans un écrin de verdure' },
      { icon: '📍', name: 'Destination pas transit', desc: 'On vient pour vivre, pas juste acheter' },
      { icon: '✨', name: 'Qualité visible', desc: 'Le soin apporté aux espaces se voit partout' },
      { icon: '🤝', name: 'Ancrage communautaire', desc: 'Un lieu qui appartient à son quartier' },
    ],
    promesse: '"Ici, on vit quelque chose."',
    ton: [
      { label: 'Ton général', content: 'Vivant, direct, désirable. On parle comme on respire — naturellement.', ex: '"Ici, on vit quelque chose."' },
      { label: 'Ce qu\'on ne dit jamais', content: 'Jamais "écolo", "bio", "vert". On dit "vivant", "naturel", "ici". La nature se montre, elle ne se proclame pas.', ex: '"Cocody vient de changer d\'adresse."' },
      { label: 'Digital & réseaux', content: 'Contenu immersif nature : time-lapses végétaux, food garden, marchés artisanaux. L\'image parle avant le texte.', ex: '"Votre samedi au jardin Cosmos — brunch, balades, boutiques."' },
      { label: 'Institutionnel', content: 'Identité végétale différenciante, empreinte carbone positive, premier mall bioclimatique d\'Abidjan.', ex: '"Le meilleur de Cocody, sous un même toit."' },
    ],
    risk: { label: 'Avantage stratégique', text: "Identité végétale non réplicable. Les concurrents peuvent copier des couleurs ou un logo — pas un jardin intégré à l'architecture. Le scénario D crée un actif de marque vivant qui se bonifie avec le temps." },
    kapferer: [
      { num: '01', facette: 'Physique', title: 'Le mall-jardin de Cocody', content: 'Architecture bioclimatique, murs végétaux, canopée naturelle, matériaux nobles (pierre kaki, laiton, wengé). Lumière filtrée par la végétation.', yes: ['Végétal','Lumineux','Premium','Vivant'], no: ['Bétonné','Artificiel'] },
      { num: '02', facette: 'Personnalité', title: 'Le jardinier architecte', content: 'Personnalité d\'un architecte paysagiste de 45 ans — cultivé, serein, attentif au détail. Sait créer la beauté sans effort apparent.', yes: ['Serein','Cultivé','Attentionné'], no: ['Austère','Distant'] },
      { num: '03', facette: 'Culture', title: 'La nature comme standard', content: 'Le premium ne se mesure pas au marbre mais au vivant. L\'excellence est organique, pas ostentatoire.', yes: ['Nature','Excellence','Authenticité','Durabilité'] },
      { num: '04', facette: 'Relation', title: 'Un rendez-vous avec le vivant', content: 'On vient pour les courses, on reste pour l\'atmosphère. La relation est sensorielle : parfums, lumière, verdure.', yes: ['Sensoriel','Fidélisant','Apaisant'], no: ['Transactionnel'] },
      { num: '05', facette: 'Reflet', title: 'La famille qui choisit la qualité de vie', content: 'CSP+ Cocody, familles modernes, jeunes cadres. Priorité au cadre de vie autant qu\'au pouvoir d\'achat.', yes: ['CSP+','Familles','Bien-être','Cocody'] },
      { num: '06', facette: 'Mentalisation', title: '"Je vis dans le plus beau quartier d\'Abidjan"', content: 'Fierté d\'un lieu qui élève le quotidien. La nature au centre = qualité de vie visible.', yes: ['Fierté','Qualité de vie','Modernité'] },
    ],
    signatures: [
      { type: 'Signature permanente', text: '"Ici, on vit quelque chose."', why: 'Simple, mémorable. Le "ici" ancre, le "quelque chose" intrigue. Promet une expérience, pas un produit.' },
      { type: 'Signature campagne', text: '"Cocody vient de changer d\'adresse."', why: 'Affirme que Cosmos Angré redéfinit le standard du quartier. Ambitieux sans arrogance.' },
      { type: 'Complémentaire', text: '"Le meilleur de Cocody, sous un même toit."', why: 'Complétude + ancrage territorial. Promet tout, ici.' },
    ],
    direction: {
      label: 'Piste D — Nature Contemporaine',
      concept: "La nature contemporaine premium. Kaki profond, or soleil, bois sombre, pierre claire. La forêt tropicale rencontre l'architecture d'intérieur haut de gamme.",
      palette: [
        { bg: '#3D4A2A', color: '#fff', name: 'Forêt', hex: '#3D4A2A' },
        { bg: '#898D5D', color: '#fff', name: 'Kaki', hex: '#898D5D' },
        { bg: '#6B7A4A', color: '#fff', name: 'Mousse', hex: '#6B7A4A' },
        { bg: '#D4A843', color: '#fff', name: 'Or Soleil', hex: '#D4A843' },
        { bg: '#D6D4C0', color: '#1a1410', name: 'Pierre', hex: '#D6D4C0' },
        { bg: '#F5F0E4', color: '#1a1410', name: 'Ivoire', hex: '#F5F0E4' },
        { bg: '#1C2215', color: '#fff', name: 'Nuit', hex: '#1C2215' },
      ],
      typo: ['Titres : Cormorant Garamond Bold 700', 'Sous-titres : Inter SemiBold 600', 'Corps : Inter Regular 400', 'Accents : Cormorant Garamond Italic'],
      rules: "Sur fond sombre : Or Soleil sur Forêt Nuit. Sur fond clair : Kaki sur Ivoire. Le vert ne sature jamais — il encadre et respire.",
      proportions: 'Ivoire 30% · Forêt Nuit 20% · Kaki 15% · Or Soleil 15% · Mousse 10% · Pierre 5% · Forêt Profonde 5%',
      paletteDit: 'Nature. Sérénité. Lumière filtrée. Fraîcheur tropicale. Premium organique. Enracinement.',
      paletteEvite: 'Vert fluo, vert pomme, or brillant, jaune vif, blanc pur. Tout ce qui est artificiel ou criard.',
    },
    colorStrategy: {
      title: 'Stratégie colorimétrique — Scénario D',
      intro: "Le kaki est la couleur-signature — aucun mall en Côte d'Ivoire ne l'utilise comme identité. La dualité Forêt Nuit/Ivoire crée le contraste premium : le sombre pour le prestige extérieur, l'ivoire pour la chaleur intérieure. L'or soleil n'intervient qu'en touche (15%) — sa rareté le rend précieux, comme un rayon de soleil à travers la canopée. Règle absolue : le vert est toujours accompagné de pierre ou d'ivoire — il ne submerge jamais.",
      rules: [
        { support: 'Façade / Totem', dominant: 'Forêt Nuit #1C2215', structure: 'Kaki #898D5D', accent: 'Or Soleil #D4A843', ratio: '55/35/10', why: "Le vert nuit ancre le premium. Le kaki identifie. L'or signe avec la chaleur du soleil." },
        { support: 'Signalétique intérieure', dominant: 'Ivoire #F5F0E4', structure: 'Kaki #898D5D', accent: 'Or Soleil #D4A843', ratio: '60/30/10', why: "L'ivoire domine en intérieur pour la luminosité naturelle. Le kaki structure sans écraser." },
        { support: 'Digital (web/app)', dominant: 'Ivoire #F5F0E4', structure: 'Forêt Nuit #1C2215', accent: 'Or Soleil #D4A843', ratio: '55/30/15', why: "Fond clair naturel, header forêt nuit. L'or sur les CTA guide l'action." },
        { support: 'Print (brochures)', dominant: 'Forêt Nuit #1C2215', structure: 'Ivoire #F5F0E4', accent: 'Or Soleil #D4A843', ratio: '50/40/10', why: "Le vert nuit domine le print pour l'identité. L'ivoire respire. L'or ponctue." },
        { support: 'Packaging (sacs)', dominant: 'Kaki #898D5D', structure: '—', accent: 'Or Soleil #D4A843', ratio: '90/0/10', why: "Le sac kaki est un marqueur unique. Logo or soleil gaufré. Poignées coton recyclé." },
        { support: 'T-shirt / Polo staff', dominant: 'Kaki #898D5D', structure: 'Ivoire #F5F0E4', accent: 'Or Soleil #D4A843', ratio: '85/10/5', why: "Polo kaki nature, logo or soleil brodé. Col/bords ivoire. Identité botanique immédiate." },
        { support: 'Costume / Blazer management', dominant: 'Forêt Nuit #1C2215', structure: 'Kaki #898D5D', accent: 'Or Soleil #D4A843', ratio: '85/10/5', why: "Blazer forêt nuit, pin's or au revers, pochette kaki. Élégance végétale." },
        { support: 'Bleu de travail / Maintenance', dominant: 'Mousse #6B7A4A', structure: 'Ivoire #F5F0E4', accent: 'Pierre #D6D4C0', ratio: '80/15/5', why: "Vert mousse vivant pour visibilité + appartenance. Logo pierre brodé dos et poitrine." },
        { support: 'Gourde / Tasse', dominant: 'Forêt Nuit #1C2215', structure: 'Ivoire #F5F0E4', accent: 'Or Soleil #D4A843', ratio: '70/20/10', why: "Corps vert nuit mat, couvercle bois, logo or gravé. Objet naturel au quotidien." },
        { support: 'Porte-clés', dominant: 'Or Soleil #D4A843', structure: 'Forêt Nuit #1C2215', accent: '—', ratio: '60/40/0', why: "Métal or soleil + émail forêt nuit. Forme feuille stylisée. Bijou botanique." },
      ],
    },
    matieres: [
      { name: 'Pierre kaki texturée', desc: 'Surface légèrement granuleuse, tons verts sourds', usage: 'Sols, revêtements de façade, jardinières monumentales' },
      { name: 'Laiton brossé doré', desc: 'Finition satinée, reflets solaires subtils', usage: 'Signalétique, luminaires, garde-corps, poignées' },
      { name: 'Bois de wengé', desc: 'Grain dense, finition naturelle sombre', usage: 'Mobilier d\'accueil, comptoirs, bancs jardin' },
      { name: 'Calcaire ivoire', desc: 'Pierre claire, toucher doux, veinage naturel', usage: 'Murs intérieurs, vasques, fontaines' },
    ],
    applicationRules: [
      { support: 'Façade', fond: '#1C2215 Forêt Nuit', texte: '#F5F0E4 Ivoire', accent: '#D4A843 Or Soleil (lettrage, filet)', note: 'Cormorant Garamond Bold, murs végétaux intégrés' },
      { support: 'Print (brochure)', fond: '#F5F0E4 Ivoire', texte: '#1C2215 Forêt Nuit', accent: '#898D5D Kaki (titres)', note: 'Papier recyclé ivoire 180g, encres végétales' },
      { support: 'Digital (web/app)', fond: '#F5F0E4 Ivoire', texte: '#1C2215 Forêt Nuit', accent: '#D4A843 Or Soleil (CTA)', note: 'Mode clair naturel, photos botaniques, micro-animations organiques' },
      { support: 'Packaging (sac)', fond: '#898D5D Kaki', texte: '#F5F0E4 Ivoire', accent: '#D4A843 Or Soleil (logo)', note: 'Papier kraft recyclé, poignées coton naturel tressé' },
      { support: 'Signalétique', fond: '#3D4A2A Forêt', texte: '#F5F0E4 Ivoire', accent: '#D6D4C0 Pierre (icônes)', note: 'Panneaux bois wengé, lettres laiton brossé' },
      { support: 'Événementiel', fond: '#6B7A4A Mousse', texte: '#F5F0E4 Ivoire', accent: '#D4A843 Or Soleil', note: 'Végétalisation, bois brut, éclairage chaud 3000K, musique acoustique' },
      { support: 'T-shirt staff', fond: '#898D5D Kaki', texte: '#F5F0E4 Ivoire (logo)', accent: '#D4A843 Or Soleil (broderie)', note: 'Coton bio 180g, logo or brodé poitrine, col et bords ivoire' },
      { support: 'Polo management', fond: '#1C2215 Forêt Nuit', texte: '#F5F0E4 Ivoire (logo)', accent: '#D4A843 Or Soleil (broderie)', note: 'Piqué coton premium, logo or brodé, boutons bois naturel' },
      { support: 'Costume / Blazer', fond: '#1C2215 Forêt Nuit', texte: '—', accent: '#D4A843 Or Soleil (pin\'s)', note: 'Blazer forêt nuit, pin\'s or revers gauche, pochette kaki, boutons corne' },
      { support: 'Bleu de travail', fond: '#6B7A4A Mousse', texte: '#F5F0E4 Ivoire (logo)', accent: '#D6D4C0 Pierre (broderie)', note: 'Veste/pantalon mousse, logo pierre brodé dos + poitrine, bandes réfléchissantes discrètes' },
      { support: 'Gourde isotherme', fond: '#1C2215 Forêt Nuit', texte: '#F5F0E4 Ivoire (bouchon)', accent: '#D4A843 Or Soleil (gravure)', note: 'Inox vert nuit mat 500ml, logo or gravé, bouchon bois naturel, étui coton recyclé' },
      { support: 'Tasse / Mug', fond: '#F5F0E4 Ivoire', texte: '#898D5D Kaki', accent: '#D4A843 Or Soleil (intérieur)', note: 'Céramique ivoire ext., intérieur or soleil, logo kaki, 350ml, boîte kraft recyclé' },
      { support: 'Porte-clés', fond: '#D4A843 Or Soleil (métal)', texte: '#1C2215 Forêt Nuit (émail)', accent: '—', note: 'Métal or soleil, forme feuille stylisée, émail forêt nuit logo, anneau laiton brossé' },
    ],
    fgStimuli: [
      { num: 16, titre: 'Façade végétale de nuit', format: '1200×800px, paysage', palette: '#1C2215 fond · #D4A843 lettrage · #898D5D bardage · #F5F0E4 texte', typo: 'COSMOS ANGRÉ en Cormorant Garamond Bold 72pt', contenu: 'Façade forêt nuit, mur végétal monumental, lettrage or soleil rétro-éclairé, canopée tropicale, éclairage doré 3000K' },
      { num: 17, titre: 'Hall intérieur jardin', format: '1200×800px, paysage', palette: '#F5F0E4 dominant · #898D5D accents · #D4A843 détails', typo: 'Signalétique Inter SemiBold 600', contenu: 'Sol pierre ivoire, mur végétal central, mobilier wengé, comptoir laiton brossé, lumière naturelle zénithale, plantes tropicales' },
      { num: 18, titre: 'Sac boutique nature', format: '800×1000px, portrait', palette: '#898D5D sac · #D4A843 logo · #F5F0E4 intérieur', typo: 'COSMOS ANGRÉ Cormorant Garamond Bold centré', contenu: 'Sac kraft recyclé kaki, poignées coton naturel tressé, logo or soleil gaufré, texture végétale en filigrane' },
      { num: 19, titre: 'Terrasse jardin', format: '1200×800px, paysage', palette: '#6B7A4A dominant · #D6D4C0 mobilier · #D4A843 accents', typo: 'Cormorant Garamond Italic 36pt (citation)', contenu: 'Terrasse sous canopée, mobilier wengé et pierre, coussins kaki, suspensions laiton, vue sur jardin tropical intérieur' },
      { num: 20, titre: 'Affiche événement Nature', format: '800×1200px, portrait', palette: '#1C2215 fond · #D4A843 titre · #898D5D sous-titre · #F5F0E4 détails', typo: 'Cormorant Bold 48pt + Inter SemiBold 18pt', contenu: '"Week-end Nature Cosmos" — marché bio, ateliers jardinage, food garden, musique acoustique. Motif feuillage en filigrane' },
    ],
    moodboard: "Double page immersive : façade de nuit avec mur végétal monumental, lettrage or soleil sur forêt nuit, canopée tropicale éclairée. Intérieur de jour — pierre ivoire, mobilier wengé, familles sous la lumière zénithale filtrée par les plantes. \"Le premier mall où la nature est l'architecture\" — botanique premium.",
  },
};

/* ── COMPOSANT PAGE ── */

const ScenarioPage: React.FC<ScenarioPageProps> = ({ scenarioKey, onBack }) => {
  const sc = fullData[scenarioKey];
  const isRecommended = false;
  const accentColor = sc.accentLabel;
  const [activeNav, setActiveNav] = useState('sc-usp');
  const contentRef = useRef<HTMLDivElement>(null);

  // Scroll spy
  useEffect(() => {
    const container = contentRef.current;
    if (!container) return;
    const handleScroll = () => {
      const ids = navSections.map(s => s.id);
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom > 100) {
            setActiveNav(id);
            break;
          }
        }
      }
    };
    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveNav(id);
    }
  };

  return (
    <div className="flex flex-1 overflow-hidden">
      {/* ═══ SIDEBAR SCÉNARIO ═══ */}
      <nav className="w-[220px] bg-[#0f0f1a] flex flex-col h-full flex-shrink-0 select-none">
        {/* Header */}
        <div className="px-4 pt-5 pb-4 border-b border-white/[.06]">
          <button onClick={onBack} className="flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors text-[10px] mb-3">
            <ArrowLeft size={12} /> Retour
          </button>
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ background: `${accentColor}25` }}>
              <span className="font-cormorant text-[14px] font-semibold" style={{ color: accentColor }}>{scenarioKey}</span>
            </div>
            <div>
              <div className="font-cormorant text-[14px] text-white font-light leading-tight">{sc.label.replace('Scénario ' + scenarioKey + ' — ', '')}</div>
              {isRecommended && (
                <div className="flex items-center gap-1 mt-0.5">
                  <Star size={8} fill="#C9943A" className="text-[#C9943A]" />
                  <span className="text-[7px] text-[#C9943A] tracking-[.1em] uppercase font-bold">Recommandé</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Nav items */}
        <div className="flex-1 overflow-y-auto py-3 px-2">
          {/* Stratégie group */}
          <div className="text-[8px] font-bold tracking-[.2em] uppercase text-white/20 px-2.5 mb-2 mt-1">Stratégie</div>
          {navSections.slice(0, 12).map(item => (
            <button key={item.id} onClick={() => scrollTo(item.id)}
              className={`w-full flex items-center gap-2 px-2.5 py-[5px] rounded-md text-left transition-all ${
                activeNav === item.id ? 'bg-white/[.08] text-white' : 'text-white/35 hover:text-white/60 hover:bg-white/[.03]'
              }`}>
              <span className={activeNav === item.id ? 'text-gold' : 'text-white/20'}>{item.icon}</span>
              <span className="text-[10px] leading-tight">{item.label}</span>
              {activeNav === item.id && <span className="w-1 h-1 rounded-full bg-gold ml-auto flex-shrink-0" />}
            </button>
          ))}

          {/* Brand World group */}
          <div className="text-[8px] font-bold tracking-[.2em] uppercase text-white/20 px-2.5 mb-2 mt-4">Brand World</div>
          {navSections.slice(12).map(item => (
            <button key={item.id} onClick={() => scrollTo(item.id)}
              className={`w-full flex items-center gap-2 px-2.5 py-[5px] rounded-md text-left transition-all ${
                activeNav === item.id ? 'bg-white/[.08] text-white' : 'text-white/35 hover:text-white/60 hover:bg-white/[.03]'
              }`}>
              <span className={activeNav === item.id ? 'text-gold' : 'text-white/20'}>{item.icon}</span>
              <span className="text-[10px] leading-tight">{item.label}</span>
              {activeNav === item.id && <span className="w-1 h-1 rounded-full bg-gold ml-auto flex-shrink-0" />}
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-white/[.06]">
          <div className="text-[7px] text-white/15 leading-relaxed">Brand World · Cosmos Angré<br />Mars 2026 · EXCO confidentiel</div>
        </div>
      </nav>

      {/* ═══ CONTENU PRINCIPAL ═══ */}
      <div ref={contentRef} className="flex-1 overflow-y-auto bg-[#fafaf8]">
        {/* Hero */}
        <div className={`bg-gradient-to-br ${sc.coverClass} px-4 sm:px-8 lg:px-[72px] pt-10 pb-14 relative overflow-hidden`}>
          <div className="absolute inset-0 opacity-[.04]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
          <div className="relative">
            <div className="text-[10px] font-bold tracking-[.3em] uppercase text-white/30 mb-6">Plateforme de marque · Cosmos Angré</div>
            <h1 className="font-cormorant text-[42px] text-white font-light leading-[1.05] mb-3 whitespace-pre-line">{sc.coverTitle}</h1>
            <div className="font-cormorant text-[18px] text-white/50 italic mb-6">{sc.promesse}</div>
            {isRecommended && (
              <div className="inline-flex items-center gap-1.5 bg-[#C9943A]/20 text-[#C9943A] px-3 py-1.5 rounded-full text-[10px] font-bold tracking-[.1em] uppercase mb-4">
                <Star size={10} fill="currentColor" /> Recommandation agence
              </div>
            )}
            <div className="w-10 h-px bg-white/20 mb-5" />
            <div className="flex gap-2.5 flex-wrap mb-4">
              {sc.pillars.map(p => <span key={p} className="px-4 py-1.5 rounded-full text-[11px] bg-white/[.08] border border-white/[.12] text-white">{p}</span>)}
            </div>
            <div className="text-[10px] text-white/20 tracking-[.15em] uppercase">{sc.coverFoot}</div>
          </div>
        </div>

        {/* Sections */}
        <div className="px-4 sm:px-8 lg:px-[72px] py-12">

          {/* ═══ USP ═══ */}
          <div id="sc-usp" className="pb-16 border-b border-black/[.08]">
            <div className="bg-white rounded-[14px] border border-black/[.08] overflow-hidden">
              <div className={`px-7 py-6 border-b border-black/[.08] bg-gradient-to-br ${sc.gradient}`}>
                <div className="text-[9px] font-bold tracking-[.2em] uppercase text-white/40 mb-1.5">Livrable 1.2</div>
                <div className="font-cormorant text-[22px] text-white font-light">USP — Proposition de valeur unique</div>
              </div>
              <div className="p-7">
                <div className="font-cormorant text-[20px] font-light leading-relaxed mb-3" style={{ color: accentColor }}>{sc.uspQuote}</div>
                <div className="text-[13px] text-black/60 leading-relaxed">{sc.uspSub}</div>
              </div>
            </div>
          </div>

          {/* ═══ KAPFERER ═══ */}
          <div id="sc-kapferer" className="py-16 border-b border-black/[.08]">
            <div className="bg-white rounded-[14px] border border-black/[.08] overflow-hidden">
              <div className={`px-7 py-6 border-b border-black/[.08] bg-gradient-to-br ${sc.gradient}`}>
                <div className="text-[9px] font-bold tracking-[.2em] uppercase text-white/40 mb-1.5">Prisme de Kapferer</div>
                <div className="font-cormorant text-[22px] text-white font-light">Identité de marque — 6 facettes</div>
              </div>
              <div className="p-7 grid grid-cols-1 md:grid-cols-2 gap-4">
                {sc.kapferer.map(k => <KapfererCard key={k.num} {...k} color={accentColor} />)}
              </div>
            </div>
          </div>

          {/* ═══ VALEURS ═══ */}
          <div id="sc-valeurs" className="py-16 border-b border-black/[.08]">
            <div className="bg-white rounded-[14px] border border-black/[.08] overflow-hidden">
              <div className={`px-7 py-6 border-b border-black/[.08] bg-gradient-to-br ${sc.gradient}`}>
                <div className="text-[9px] font-bold tracking-[.2em] uppercase text-white/40 mb-1.5">Valeurs</div>
                <div className="font-cormorant text-[22px] text-white font-light">4 valeurs de marque</div>
              </div>
              <div className="p-7 grid grid-cols-2 lg:grid-cols-4 gap-4">
                {sc.values.map(v => (
                  <div key={v.name} className="text-center p-4">
                    <div className="text-2xl mb-2">{v.icon}</div>
                    <div className="text-[12px] font-bold text-black mb-1">{v.name}</div>
                    <div className="text-[10px] text-black/50 leading-relaxed">{v.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ═══ TON ═══ */}
          <div id="sc-ton" className="py-16 border-b border-black/[.08]">
            <div className="bg-white rounded-[14px] border border-black/[.08] overflow-hidden">
              <div className={`px-7 py-6 border-b border-black/[.08] bg-gradient-to-br ${sc.gradient}`}>
                <div className="text-[9px] font-bold tracking-[.2em] uppercase text-white/40 mb-1.5">Communication</div>
                <div className="font-cormorant text-[22px] text-white font-light">Ton de communication</div>
              </div>
              <div className="p-7 grid grid-cols-1 md:grid-cols-2 gap-4">
                {sc.ton.map(t => <TonCard key={t.label} {...t} />)}
              </div>
            </div>
          </div>

          {/* ═══ SIGNATURES ═══ */}
          <div id="sc-signatures" className="py-16 border-b border-black/[.08]">
            <div className="bg-white rounded-[14px] border border-black/[.08] overflow-hidden">
              <div className={`px-7 py-6 border-b border-black/[.08] bg-gradient-to-br ${sc.gradient}`}>
                <div className="text-[9px] font-bold tracking-[.2em] uppercase text-white/40 mb-1.5">Naming</div>
                <div className="font-cormorant text-[22px] text-white font-light">Signatures</div>
              </div>
              <div className="p-7 space-y-4">
                {sc.signatures.map(s => (
                  <div key={s.text} className="border-b border-black/[.04] pb-4 last:border-0">
                    <div className="text-[9px] tracking-[.2em] uppercase text-black/35 mb-1">{s.type}</div>
                    <div className="font-cormorant text-[24px] font-light mb-1" style={{ color: accentColor }}>{s.text}</div>
                    <div className="text-[12px] text-black/50">{s.why}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ═══ DIRECTION ARTISTIQUE ═══ */}
          <div id="sc-direction" className="py-16 border-b border-black/[.08]">
            <div className="bg-white rounded-[14px] border border-black/[.08] overflow-hidden">
              <div className={`px-7 py-6 border-b border-black/[.08] bg-gradient-to-br ${sc.gradient}`}>
                <div className="text-[9px] font-bold tracking-[.2em] uppercase text-gold mb-1.5">Livrable 2.1</div>
                <div className="font-cormorant text-[22px] text-white font-light">{sc.direction.label}</div>
              </div>
              <div className="p-7 space-y-6">
                <div>
                  <div className="text-[9px] font-bold tracking-[.2em] uppercase text-gold mb-2 pb-1.5 border-b border-gold/20">Concept directeur</div>
                  <div className="text-[13px] text-black/75 leading-relaxed">{sc.direction.concept}</div>
                </div>
                <div>
                  <div className="text-[9px] font-bold tracking-[.2em] uppercase text-gold mb-2 pb-1.5 border-b border-gold/20">Palette de couleurs — 6 teintes</div>
                  <SwatchRow swatches={sc.direction.palette} />
                </div>
                {sc.direction.proportions && (
                  <div className="bg-cream rounded-lg p-4">
                    <div className="text-[9px] font-bold tracking-[.15em] uppercase text-black/35 mb-1.5">Proportions d'usage</div>
                    <div className="text-[12px] text-black/60 leading-relaxed">{sc.direction.proportions}</div>
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {sc.direction.paletteDit && (
                    <div className="bg-cream rounded-lg p-4" style={{ borderLeft: `3px solid ${accentColor}` }}>
                      <div className="text-[9px] font-bold tracking-[.15em] uppercase text-black/35 mb-1.5">Ce que la palette dit</div>
                      <div className="text-[12px] text-black/60 leading-relaxed">{sc.direction.paletteDit}</div>
                    </div>
                  )}
                  {sc.direction.paletteEvite && (
                    <div className="bg-cream rounded-lg p-4 border-l-[3px] border-red-300/40">
                      <div className="text-[9px] font-bold tracking-[.15em] uppercase text-black/35 mb-1.5">Ce qu'on évite</div>
                      <div className="text-[12px] text-black/60 leading-relaxed">{sc.direction.paletteEvite}</div>
                    </div>
                  )}
                </div>
                <div>
                  <div className="text-[9px] font-bold tracking-[.2em] uppercase text-gold mb-2 pb-1.5 border-b border-gold/20">Typographie</div>
                  <div className="text-[13px] text-black/75 leading-relaxed">
                    {sc.direction.typo.map((line, i) => <div key={i} className="mb-1">{line}</div>)}
                  </div>
                </div>
                {sc.direction.rules && (
                  <div>
                    <div className="text-[9px] font-bold tracking-[.2em] uppercase text-gold mb-2 pb-1.5 border-b border-gold/20">Règles d'usage</div>
                    <div className="text-[13px] text-black/75 leading-relaxed">{sc.direction.rules}</div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ═══ STRATÉGIE COLORIMÉTRIQUE ═══ */}
          <div id="sc-colors" className="py-16 border-b border-black/[.08]">
            <div className="bg-white rounded-[14px] border border-black/[.08] overflow-hidden">
              <div className={`px-7 py-6 border-b border-black/[.08] bg-gradient-to-br ${sc.gradient}`}>
                <div className="text-[9px] font-bold tracking-[.2em] uppercase text-white/40 mb-1.5">Colorimétrie</div>
                <div className="font-cormorant text-[22px] text-white font-light">{sc.colorStrategy.title}</div>
              </div>
              <div className="p-7">
                {/* Intro / philosophie */}
                <div className="bg-cream rounded-xl p-5 mb-6 border-l-[3px]" style={{ borderColor: accentColor }}>
                  <div className="text-[9px] font-bold tracking-[.15em] uppercase text-black/35 mb-2">Philosophie colorimétrique</div>
                  <div className="text-[13px] text-black/65 leading-[1.8] italic">{sc.colorStrategy.intro}</div>
                </div>

                {/* Ratio visuel 60/30/10 */}
                <div className="mb-6">
                  <div className="text-[9px] font-bold tracking-[.15em] uppercase text-black/35 mb-3">Règle universelle — Ratio 60 / 30 / 10</div>
                  <div className="flex h-10 rounded-lg overflow-hidden" style={{ boxShadow: '0 2px 8px rgba(0,0,0,.08)' }}>
                    <div className="flex items-center justify-center text-white text-[10px] font-bold" style={{ width: '60%', background: sc.direction.palette[0]?.bg }}>60% Dominant</div>
                    <div className="flex items-center justify-center text-white text-[10px] font-bold" style={{ width: '30%', background: sc.direction.palette[1]?.bg }}>30% Structure</div>
                    <div className="flex items-center justify-center text-white text-[10px] font-bold" style={{ width: '10%', background: sc.direction.palette[2]?.bg }}>10%</div>
                  </div>
                  <div className="text-[9px] text-black/30 mt-1.5 text-center">Ce ratio change selon le support — voir détails ci-dessous</div>
                </div>

                {/* Tableau par support */}
                <div className="space-y-2">
                  {sc.colorStrategy.rules.map((r, i) => (
                    <div key={i} className="bg-cream rounded-xl border border-black/[.04] overflow-hidden">
                      <div className="flex items-stretch">
                        <div className="w-36 flex-shrink-0 flex flex-col items-center justify-center px-3 py-4 border-r border-black/[.04]" style={{ background: `${accentColor}08` }}>
                          <div className="text-[11px] font-bold text-center" style={{ color: accentColor }}>{r.support}</div>
                          <div className="text-[8px] font-mono text-black/25 mt-1">{r.ratio}</div>
                        </div>
                        <div className="flex-1 px-4 py-3">
                          <div className="grid grid-cols-3 gap-2 mb-2">
                            <div>
                              <span className="text-[8px] font-bold tracking-[.1em] uppercase text-black/30">Dominant</span>
                              <div className="text-[10px] text-black/60 mt-0.5">{r.dominant}</div>
                            </div>
                            <div>
                              <span className="text-[8px] font-bold tracking-[.1em] uppercase text-black/30">Structure</span>
                              <div className="text-[10px] text-black/60 mt-0.5">{r.structure}</div>
                            </div>
                            <div>
                              <span className="text-[8px] font-bold tracking-[.1em] uppercase text-black/30">Accent</span>
                              <div className="text-[10px] text-black/60 mt-0.5">{r.accent}</div>
                            </div>
                          </div>
                          {/* Visual ratio bar */}
                          <div className="flex h-2 rounded-full overflow-hidden mb-2">
                            {r.ratio.split('/').map((pct, j) => {
                              const colors = j === 0 ? r.dominant : j === 1 ? r.structure : r.accent;
                              const hex = colors.match(/#[0-9A-Fa-f]{6}/)?.[0] || '#ccc';
                              return <div key={j} style={{ width: `${pct}%`, background: hex }} />;
                            })}
                          </div>
                          <div className="text-[10px] text-black/40 italic">{r.why}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ═══ MATIÈRES & TEXTURES ═══ */}
          <div id="sc-matieres" className="py-16 border-b border-black/[.08]">
            <div className="bg-white rounded-[14px] border border-black/[.08] overflow-hidden">
              <div className={`px-7 py-6 border-b border-black/[.08] bg-gradient-to-br ${sc.gradient}`}>
                <div className="text-[9px] font-bold tracking-[.2em] uppercase text-white/40 mb-1.5">Livrable 2.2</div>
                <div className="font-cormorant text-[22px] text-white font-light">Matières & Textures</div>
              </div>
              <div className="p-7 grid grid-cols-1 md:grid-cols-2 gap-4">
                {sc.matieres.map(m => (
                  <div key={m.name} className="bg-cream rounded-xl p-5 border border-black/[.04]" style={{ borderLeft: `3px solid ${accentColor}` }}>
                    <div className="text-[13px] font-bold text-black/80 mb-1">{m.name}</div>
                    <div className="text-[11px] text-black/50 italic mb-2">{m.desc}</div>
                    <div className="text-[10px] text-black/40">
                      <span className="font-semibold text-black/50">Usage :</span> {m.usage}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ═══ RÈGLES D'APPLICATION ═══ */}
          <div id="sc-applications" className="py-16 border-b border-black/[.08]">
            <div className="bg-white rounded-[14px] border border-black/[.08] overflow-hidden">
              <div className={`px-7 py-6 border-b border-black/[.08] bg-gradient-to-br ${sc.gradient}`}>
                <div className="text-[9px] font-bold tracking-[.2em] uppercase text-white/40 mb-1.5">Livrable 2.3</div>
                <div className="font-cormorant text-[22px] text-white font-light">Règles d'application — 13 supports</div>
              </div>
              <div className="p-7">
                <div className="space-y-3">
                  {sc.applicationRules.map(r => (
                    <div key={r.support} className="bg-cream rounded-xl border border-black/[.04] overflow-hidden">
                      <div className="flex items-stretch">
                        <div className="w-28 flex-shrink-0 flex items-center justify-center px-3 py-4 border-r border-black/[.04]" style={{ background: `${accentColor}08` }}>
                          <div className="text-[11px] font-bold text-center" style={{ color: accentColor }}>{r.support}</div>
                        </div>
                        <div className="flex-1 px-4 py-3">
                          <div className="grid grid-cols-3 gap-2 mb-2">
                            <div><span className="text-[8px] font-bold tracking-[.1em] uppercase text-black/30">Fond</span><div className="text-[10px] text-black/60 mt-0.5">{r.fond}</div></div>
                            <div><span className="text-[8px] font-bold tracking-[.1em] uppercase text-black/30">Texte</span><div className="text-[10px] text-black/60 mt-0.5">{r.texte}</div></div>
                            <div><span className="text-[8px] font-bold tracking-[.1em] uppercase text-black/30">Accent</span><div className="text-[10px] text-black/60 mt-0.5">{r.accent}</div></div>
                          </div>
                          <div className="text-[10px] text-black/40 italic">{r.note}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ═══ MOODBOARD ═══ */}
          <div id="sc-moodboard" className="py-16 border-b border-black/[.08]">
            <div className="bg-white rounded-[14px] border border-black/[.08] overflow-hidden">
              <div className={`px-7 py-6 border-b border-black/[.08] bg-gradient-to-br ${sc.gradient}`}>
                <div className="text-[9px] font-bold tracking-[.2em] uppercase text-gold mb-1.5">Livrable 2.4</div>
                <div className="font-cormorant text-[22px] text-white font-light">Moodboard textuel</div>
              </div>
              <div className="p-7">
                <div className="text-[9px] font-bold tracking-[.2em] uppercase text-gold mb-3 pb-1.5 border-b border-gold/20">Brief opérationnel pour Fernand</div>
                <div className="text-[14px] text-black/70 leading-[1.8] italic">{sc.moodboard}</div>
              </div>
            </div>
          </div>

          {/* ═══ RISQUES ═══ */}
          <div id="sc-risques" className="py-16 border-b border-black/[.08]">
            <div className={`bg-white rounded-[14px] border overflow-hidden ${isRecommended ? 'border-[#C9943A]/20' : 'border-black/[.08]'}`}>
              <div className={`px-7 py-6 border-b border-black/[.08] bg-gradient-to-br ${sc.gradient}`}>
                <div className="text-[9px] font-bold tracking-[.2em] uppercase text-white/40 mb-1.5">{isRecommended ? 'Avantage' : 'Risques'}</div>
                <div className="font-cormorant text-[22px] text-white font-light">{sc.risk.label}</div>
              </div>
              <div className="p-7">
                <div className="text-[13px] text-black/75 leading-relaxed">{sc.risk.text}</div>
              </div>
            </div>
          </div>

          {/* ═══ STIMULI FOCUS GROUP ═══ */}
          <div id="sc-stimuli" className="py-16 border-b border-black/[.08]">
            <div className="bg-white rounded-[14px] border border-black/[.08] overflow-hidden">
              <div className={`px-7 py-6 border-b border-black/[.08] bg-gradient-to-br ${sc.gradient}`}>
                <div className="text-[9px] font-bold tracking-[.2em] uppercase text-white/40 mb-1.5">Focus Group · Stimuli visuels</div>
                <div className="font-cormorant text-[22px] text-white font-light">Spécifications pour Fernand — {sc.fgStimuli.length} planches</div>
              </div>
              <div className="p-7 space-y-4">
                {sc.fgStimuli.map(stim => (
                  <div key={stim.num} className="bg-cream rounded-xl border border-black/[.04] p-5">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 font-cormorant text-[18px] font-semibold text-white" style={{ background: accentColor }}>
                        {stim.num}
                      </div>
                      <div className="flex-1">
                        <div className="text-[13px] font-bold text-black/80 mb-1">{stim.titre}</div>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 mt-2">
                          <div><span className="text-[8px] font-bold tracking-[.1em] uppercase text-black/30">Format</span><div className="text-[10px] text-black/60 mt-0.5">{stim.format}</div></div>
                          <div><span className="text-[8px] font-bold tracking-[.1em] uppercase text-black/30">Palette</span><div className="text-[10px] text-black/60 mt-0.5">{stim.palette}</div></div>
                          <div><span className="text-[8px] font-bold tracking-[.1em] uppercase text-black/30">Typographie</span><div className="text-[10px] text-black/60 mt-0.5">{stim.typo}</div></div>
                          <div><span className="text-[8px] font-bold tracking-[.1em] uppercase text-black/30">Contenu</span><div className="text-[10px] text-black/60 mt-0.5">{stim.contenu}</div></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ═══ BRAND WORLD ═══ */}
          <BrandWorld scenarioKey={scenarioKey} />

        </div>
      </div>
    </div>
  );
};

export default ScenarioPage;
