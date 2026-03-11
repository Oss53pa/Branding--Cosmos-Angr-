import type { ScenarioKey } from './Scenarios';

/* ── CSS variable overrides per scenario ── */
export const smbThemes: Record<ScenarioKey, Record<string, string>> = {
  A: {
    '--ebene': '#1A1410',
    '--ebene-deep': '#1a3020',
    '--terra': '#2F5439',
    '--kaki': '#76764D',
    '--bronze': '#C9943A',
    '--sable': '#E8C97A',
    '--fond': '#F2EBDD',
    '--pierre': '#E4DDD0',
    '--blanc-chaud': '#FAF8F3',
    '--gris-chaud': '#5C564E',
    '--gris-nav': '#F5F5F5',
    '--gris-nav-border': '#E0E0E0',
    '--gris-nav-text': '#555',
    '--ebene-rgb': '26,20,16',
    '--terra-rgb': '47,84,57',
    '--kaki-rgb': '118,118,77',
    '--bronze-rgb': '201,148,58',
    '--fond-rgb': '242,235,221',
    '--gris-chaud-rgb': '92,86,78',
  },
  B: {
    '--ebene': '#0D1B4B',
    '--ebene-deep': '#060E2A',
    '--terra': '#B8924A',
    '--kaki': '#1A3060',
    '--bronze': '#D4B06A',
    '--sable': '#D4B06A',
    '--fond': '#F2EDE3',
    '--pierre': '#E8E0D5',
    '--blanc-chaud': '#FAF7F2',
    '--gris-chaud': '#6B6259',
    '--gris-nav': '#F5F5F5',
    '--gris-nav-border': '#E0E0E0',
    '--gris-nav-text': '#555',
    '--ebene-rgb': '13,27,75',
    '--terra-rgb': '184,146,74',
    '--kaki-rgb': '26,48,96',
    '--bronze-rgb': '212,176,106',
    '--fond-rgb': '242,237,227',
    '--gris-chaud-rgb': '107,98,89',
  },
  C: {
    '--ebene': '#2C1A0A',
    '--ebene-deep': '#1a0d04',
    '--terra': '#B25A38',
    '--kaki': '#6D7447',
    '--bronze': '#C9943A',
    '--sable': '#D4C4A8',
    '--fond': '#F2EBDD',
    '--pierre': '#E8E0D5',
    '--blanc-chaud': '#FAF7F2',
    '--gris-chaud': '#6B6259',
    '--gris-nav': '#F5F5F5',
    '--gris-nav-border': '#E0E0E0',
    '--gris-nav-text': '#555',
    '--ebene-rgb': '44,26,10',
    '--terra-rgb': '178,90,56',
    '--kaki-rgb': '109,116,71',
    '--bronze-rgb': '201,148,58',
    '--fond-rgb': '242,235,221',
    '--gris-chaud-rgb': '107,98,89',
  },
  D: {
    '--ebene': '#2A3320',
    '--ebene-deep': '#1C2215',
    '--terra': '#898D5D',
    '--kaki': '#6B7A4A',
    '--bronze': '#D4A843',
    '--sable': '#D6D4C0',
    '--fond': '#E5DECC',
    '--pierre': '#F5F0E4',
    '--blanc-chaud': '#FAFAF6',
    '--gris-chaud': '#535744',
    '--gris-nav': '#F2F0E8',
    '--gris-nav-border': '#E0E0E0',
    '--gris-nav-text': '#6A6E56',
    '--ebene-rgb': '42,51,32',
    '--terra-rgb': '137,141,93',
    '--kaki-rgb': '107,122,74',
    '--bronze-rgb': '212,168,67',
    '--fond-rgb': '229,222,204',
    '--gris-chaud-rgb': '83,87,68',
  },
};

/* ── Types ── */
interface UspPillar { color: string; title: string; desc: string }
interface KapfererFacet { num: string; facette: string; title: string; desc: string; yes: string[]; no?: string[] }
interface ValueItem { color: string; title: string; desc: string }
interface ToneExample { label: string; quote: string; tone: string }
interface SignatureMain { text: string; highlight: string; sub: string }
interface SignatureAlt { text: string; sub: string }
interface PaletteBarSeg { w: string; bg: string; c: string; label?: string }
interface PaletteColor { bg: string; role: string; name: string; hex: string; where: string }
interface PropBar { w: string; bg: string; c: string; l: string }
interface PropLegend { dot: string; l: string; p: string }
interface PropCard { title: string; sub: string; bars: PropBar[]; legend: PropLegend[] }
interface TypoSection { label: string; fontFamily: string; fontSize: number; fontWeight: number; fontStyle?: string; color: string; example: [string, string]; desc: string }
interface MaterialItem { grad: string; name: string; sub: string; desc: string }
interface CommCard { bg: string; title: string; spec: string; brandText: string; brandSub?: string; brandSize?: number; brandWeight?: number }
interface LogoVariant { bg: string; stroke: string; tag: string; name: string; spec: string }
interface ParcoursCard { border: string; step: string; title: string; text: string; quote: string }
interface EspaceBar { w: string; bg: string; c: string; l: string }
interface EspaceCommun { zone: string; title: string; bars: EspaceBar[]; rules: string[] }
interface PersonaCard { prenom: string; age: string; profession: string; quartier: string; frustration: string; ligneRouge: string; comportement?: string }
interface BrandRule { rule: string }
interface FocusGroupQ { question: string }
interface UspPrerequisite { text: string }

export interface SmbContent {
  scenarioLabel: string;
  heroQuote: string;
  heroQuoteHighlight: string;
  uspStatement: string;
  uspHighlight: string;
  uspNote?: string;
  uspPrerequisites?: UspPrerequisite[];
  uspPillars: UspPillar[];
  kapferer: KapfererFacet[];
  persona?: PersonaCard;
  values: ValueItem[];
  toneExamples: ToneExample[];
  signatureMain: SignatureMain;
  signatureAlts: SignatureAlt[];
  brandRules?: BrandRule[];
  paletteBar: PaletteBarSeg[];
  paletteColors: PaletteColor[];
  proportions: PropCard[];
  typoSections: TypoSection[];
  materials: MaterialItem[];
  comms: CommCard[];
  logoVariants: LogoVariant[];
  parcoursRow1: ParcoursCard[];
  parcoursRow2: ParcoursCard[];
  espacesCommuns: EspaceCommun[];
  risksVigilance: string[];
  risksAdvantages: string[];
  risksLeftTitle: string;
  risksRightTitle: string;
  focusGroupQuestions?: FocusGroupQ[];
  finaleQuote: [string, string];
  finaleSub: string;
}

/* ══════════════════════════════════════════
   SCENARIO C — extracted from ScenarioMasterBook.tsx
   ══════════════════════════════════════════ */

const contentC: SmbContent = {
  scenarioLabel: 'Scénario C',
  heroQuote: "L'exception,",
  heroQuoteHighlight: 'tout simplement.',
  uspStatement: "L'exceptionnel au quotidien — un univers où chaque visite est une découverte et chaque passage une habitude.",
  uspHighlight: "L'exceptionnel au quotidien",
  uspPrerequisites: [
    { text: 'Murs TEJA (RAL 040 40 60) et IGNERO (RAL 040 50 40) posés et secs dès le soft opening' },
    { text: 'Têtes de mur Kutu Baffle noyer fumé installées' },
    { text: 'Formation staff "Hospitalité souveraine" complétée avant J-7' },
    { text: 'Mix restauration : minimum food court opérationnel + 1 restaurant sit-down' },
    { text: 'Odeur signature (fève tonka, santal, agrume) active dès l\'entrée' },
  ],
  uspPillars: [
    { color: 'var(--terra)', title: 'Centre de gravité', desc: "On ne vient pas à Cosmos — on y revient. Courses, loisirs, sorties : tout converge ici." },
    { color: 'var(--bronze)', title: 'Élévation accessible', desc: "Le premium qui accueille tout le monde. L'exigence sans l'exclusion." },
    { color: 'var(--kaki)', title: 'Identité irréplicable', desc: "Terracotta, bronze, hospitalité africaine — un ADN que personne ne peut copier." },
    { color: 'var(--sable)', title: 'Orbite cosmique', desc: "Comme un astre qui attire naturellement — clients, enseignes, événements gravitent autour de Cosmos." },
  ],
  kapferer: [
    { num: '01', facette: 'Physique', title: 'Le premium qui accueille', desc: "Façade aluminium nervuré mat Grège Doré (#B8AA8C), murs terracotta bichrome TEJA/IGNERO, têtes de mur Kutu Baffle noyer fumé, Sol Cosmos terrazo granito scintillant, bronze patiné, végétation structurante, lumière zénithale 2700-3000K. Le cosmos est dans la dalle — le Sol Cosmos scintille à chaque pas.", yes: ['Premium', 'Africain', 'Sensoriel'], no: ['Froid'] },
    { num: '02', facette: 'Personnalité', title: "L'hôte africain accompli", desc: "Entrepreneur ivoirien de 40 ans. Trois comportements : il accueille chaque visiteur par le regard avant le mot ; il résout un problème avant qu'on le formule ; il ne dit jamais non — il propose mieux.", yes: ['Accompli', 'Chaleureux', 'Attentif'], no: ['Condescendant'] },
    { num: '03', facette: 'Culture', title: "L'excellence comme hospitalité", desc: "L'Afrique n'a pas à choisir entre qualité et chaleur. Ici l'excellence EST l'hospitalité — enracinée dans la fierté africaine, pas importée d'ailleurs. Cosmos Angré est le centre de gravité naturel d'Angré — ce que le cosmos est à ses planètes, Cosmos Angré l'est à sa zone.", yes: ['Excellence', 'Hospitalité', 'Fierté'], no: ['Importé'] },
    { num: '04', facette: 'Relation', title: "L'exception de chaque jour", desc: "Votre centre de gravité — l'endroit où l'exceptionnel et le quotidien ne sont plus des contraires mais une seule et même expérience.", yes: ['Quotidien', 'Exception', 'Fidèle'], no: ['Occasionnel'] },
    { num: '05', facette: 'Reflet', title: "Ceux qui veulent tout", desc: "CSP+ élargi. Familles, jeunes cadres, entrepreneurs, diaspora. Unis par une conviction : on peut exiger le meilleur sans renoncer à la proximité.", yes: ['CSP+', 'Familles', 'Ambitieux'], no: ['Élitiste'] },
    { num: '06', facette: 'Mentalisation', title: "Je vis bien — naturellement", desc: "Fierté sans ostentation. Exigence sans arrogance. Mon quartier est à la hauteur de mes ambitions — et de celles de ma famille.", yes: ['Fierté', 'Naturel', 'Ambition'], no: ['Snobisme'] },
  ],
  persona: {
    prenom: 'Adjoua / Kouassi', age: '35-45 ans', profession: 'Cadre supérieur, entrepreneur PME, profession libérale',
    quartier: 'Angré Château, Angré 7ème, Riviera',
    frustration: "Je dois traverser Abidjan pour trouver quelque chose de bien — et quand j'y arrive, ce n'est pas toujours à la hauteur.",
    ligneRouge: 'Se sentir jugé, regardé de haut, ou mal servi',
    comportement: 'Sorties hebdomadaires PlaYce ou Sococé, Carrefour Marcory, restaurants indépendants Cocody',
  },
  values: [
    { color: 'var(--terra)', title: 'Hospitalité souveraine', desc: "Valeur fondatrice. L'accueil africain élevé au rang d'art. Quand il faut choisir entre protocole et humanité, l'humanité prime toujours." },
    { color: 'var(--bronze)', title: 'Élévation naturelle', desc: "Valeur différenciante. La qualité qui ne s'annonce pas — elle se ressent. Le premium rendu évident, sans effort, sans distance." },
    { color: 'var(--kaki)', title: 'Vie complète', desc: "Du marché du matin au dîner d'anniversaire. Cosmos n'est pas un détour — c'est le centre de gravité du quartier." },
    { color: 'var(--gris-chaud)', title: 'Singularité africaine', desc: "Standards internationaux enracinés dans la culture locale. Un univers sensoriel qu'aucun concurrent ne peut répliquer." },
  ],
  toneExamples: [
    { label: 'Accueil', quote: '"L\'exception vous attend. Entrez comme chez vous."', tone: 'Hospitalité souveraine' },
    { label: 'Digital', quote: '"De la terrasse au cinéma — votre orbite du samedi."', tone: 'ADN cosmique subtil' },
    { label: 'Sol Cosmos', quote: '"Sous vos pieds, une constellation. Au-dessus, l\'exception."', tone: 'Poétique · Réseaux sociaux ouverture' },
  ],
  signatureMain: { text: 'Votre monde. ', highlight: 'Votre orbite.', sub: 'Signature permanente · Niveau 1 · Façade · Institutionnel · 10 ans+' },
  signatureAlts: [
    { text: '"Votre temps vaut mieux que ça."', sub: 'Niveau 0 · Pré-ouverture OOH · Août–Oct 2026 · 8 semaines · Source : Scénario A' },
    { text: '"Cocody vient de changer d\'adresse."', sub: 'Niveau Inauguration · Banderole façade · Oct–Nov 2026 · 3 semaines · Source : Scénario D' },
    { text: '"L\'exception, tout simplement."', sub: 'Niveau 2 · Signature de lancement · Oct 2026 → Déc 2027' },
    { text: '"Ici, on vit quelque chose."', sub: 'Niveau 3 · Digitale permanente · Réseaux & App' },
    { text: '"Le centre de gravité de Cocody."', sub: 'Niveau 4 · Corporate · Investisseurs & Presse' },
    { text: '"Un monde à part."', sub: 'Carte Cosmos Club · Fond Bleu Cosmos #0B1026, lettrage Bronze Doré · Source : Scénario B' },
  ],
  paletteBar: [
    { w: '10%', bg: 'var(--blanc-chaud)', c: 'rgba(44,26,10,0.4)' },
    { w: '25%', bg: 'var(--pierre)', c: 'rgba(44,26,10,0.4)' },
    { w: '23%', bg: 'var(--fond)', c: 'rgba(44,26,10,0.4)' },
    { w: '12%', bg: 'var(--terra)', c: 'rgba(242,235,221,0.8)' },
    { w: '8%', bg: 'var(--bronze)', c: 'rgba(242,235,221,0.8)' },
    { w: '8%', bg: 'var(--kaki)', c: 'rgba(242,235,221,0.8)' },
    { w: '7%', bg: 'var(--ebene)', c: 'rgba(242,235,221,0.7)' },
    { w: '5%', bg: '#0B1026', c: '#B8924A', label: 'Bleu Cosmos' },
  ],
  paletteColors: [
    { bg: 'var(--blanc-chaud)', role: 'Neutre 1 · 10%', name: 'Blanc chaud', hex: '#FAF7F2', where: 'Plafonds, grandes parois neutres. RÈGLE : jamais côte à côte avec Sable Territorial.' },
    { bg: 'var(--pierre)', role: 'Neutre 2 · 25%', name: 'Pierre naturelle', hex: '#E8E0D5', where: 'Murs de galerie, surfaces de repos' },
    { bg: 'var(--fond)', role: 'Neutre 3 · 23%', name: 'Sable Territorial', hex: '#F2EBDD', where: "Hall d'accueil, espaces lounge exclusivement. RÈGLE : jamais côte à côte avec Blanc Chaud." },
    { bg: '#D4C9B0', role: 'Sol · Actif signature', name: 'Sol Cosmos', hex: '#D4C9B0', where: 'Terrazo granito fond beige + éclats clairs. Sous éclairage zénithal 2700-3000K, les éclats produisent un scintillement discret — une constellation au sol.' },
    { bg: '#A85430', role: 'Signature Forte · 8%', name: 'TEJA', hex: '#A85430', where: 'RAL 040 40 60. Murs à fort impact, entrées de zones, murs de fond.' },
    { bg: '#C47850', role: 'Signature Douce · 4%', name: 'IGNERO', hex: '#C47850', where: 'RAL 040 50 40. Zones de transition, espaces larges.' },
    { bg: '#7A5C42', role: 'Architectural · 3%', name: 'Couronne Cosmos', hex: '#7A5C42', where: 'Kutu Baffle noyer fumé. Têtes de mur — détail architectural signature.' },
    { bg: '#B8AA8C', role: 'Façade · 70%', name: 'Bardage Cosmos', hex: '#B8AA8C', where: 'Aluminium nervuré mat. Façade extérieure — première impression à 150m.' },
    { bg: 'var(--bronze)', role: 'Prestige · 8%', name: 'Bronze Doré', hex: '#C9943A', where: 'Logo, lettrage, poignées, luminaires, broderies, enseigne.' },
    { bg: 'var(--kaki)', role: 'Végétal · 5%', name: 'Kaki Végétal', hex: '#6D7447', where: 'Jardinières, zones vertes, événements.' },
    { bg: '#E8D5B0', role: 'Accent Cosmique · 2%', name: 'Lumière Zénithale', hex: '#E8D5B0', where: 'Pantone 7506 C. Bordures vitrines, fils lumineux, papier Cosmos Club, fond posts réseaux premium. Évoque une étoile filante sur la terracotta.' },
    { bg: '#0B1026', role: 'Institutionnel · 3%', name: 'Bleu Cosmos', hex: '#0B1026', where: 'Carte Cosmos Club, dark mode digital, supports institutionnels, reliure Brand Book. Usage interdit : façade, signalétique intérieure, textile staff.' },
  ],
  proportions: [
    { title: 'Espaces physiques intérieurs', sub: 'Allées, galeries, hall — ce que voit le visiteur en marchant', bars: [{ w: '70%', bg: 'var(--pierre)', c: 'rgba(44,26,10,0.5)', l: '70%' }, { w: '20%', bg: 'var(--sable)', c: 'rgba(44,26,10,0.5)', l: '20%' }, { w: '10%', bg: 'var(--bronze)', c: 'rgba(242,235,221,0.8)', l: '10%' }], legend: [{ dot: 'var(--pierre)', l: 'Neutrals chauds', p: '70%' }, { dot: 'var(--sable)', l: 'Accents terracotta & ébène', p: '20%' }, { dot: 'var(--bronze)', l: 'Bronze doré', p: '10%' }] },
    { title: 'Communication & marketing', sub: 'Affiches, digital, brochures, réseaux sociaux', bars: [{ w: '50%', bg: 'var(--ebene-deep)', c: 'rgba(242,235,221,0.6)', l: '50%' }, { w: '30%', bg: 'var(--terra)', c: 'rgba(242,235,221,0.8)', l: '30%' }, { w: '20%', bg: 'var(--bronze)', c: 'rgba(242,235,221,0.8)', l: '20%' }], legend: [{ dot: 'var(--ebene-deep)', l: 'Ébène fond', p: '50%' }, { dot: 'var(--terra)', l: 'Terracotta signature', p: '30%' }, { dot: 'var(--bronze)', l: 'Bronze doré CTA', p: '20%' }] },
    { title: 'Façade extérieure', sub: 'La première impression — visible à 150m', bars: [{ w: '70%', bg: '#B8AA8C', c: 'rgba(44,26,10,0.5)', l: '70%' }, { w: '15%', bg: '#A85430', c: 'rgba(242,235,221,0.8)', l: '15%' }, { w: '15%', bg: 'var(--bronze)', c: 'rgba(242,235,221,0.8)', l: '15%' }], legend: [{ dot: '#B8AA8C', l: 'Bardage Cosmos alu grège doré', p: '70%' }, { dot: '#A85430', l: 'Terracotta TEJA accents archi', p: '15%' }, { dot: 'var(--bronze)', l: 'Or enseigne & signalétique', p: '15%' }] },
    { title: 'Textile & collection de marque', sub: 'Uniformes staff, goodies, packaging', bars: [{ w: '85%', bg: 'var(--terra)', c: 'rgba(242,235,221,0.8)', l: '85%' }, { w: '15%', bg: 'var(--bronze)', c: 'rgba(242,235,221,0.8)', l: '15%' }], legend: [{ dot: 'var(--terra)', l: 'Terracotta dominant', p: '85%' }, { dot: 'var(--bronze)', l: 'Bronze broderies', p: '15%' }] },
  ],
  typoSections: [
    { label: 'Cormorant Garamond SemiBold 600 · Titres', fontFamily: "'Cormorant Garamond',serif", fontSize: 56, fontWeight: 600, color: 'var(--ebene)', example: ['Vivez', "l'exception"], desc: 'Titres H1/H2, signatures, citations institutionnelles.' },
    { label: 'Cormorant Garamond Italic 400 · Accents', fontFamily: "'Cormorant Garamond',serif", fontSize: 56, fontWeight: 400, fontStyle: 'italic', color: 'var(--terra)', example: ['Ici chez', 'vous'], desc: 'Slogans, citations lifestyle, accroche événementielle.' },
    { label: 'Inter Medium 500 · Sous-titres & UI', fontFamily: "'Inter',sans-serif", fontSize: 32, fontWeight: 500, color: 'var(--ebene)', example: ['Cosmos Angré', 'Cocody'], desc: 'Sous-titres, signalétique, navigation, labels, UI digital.' },
    { label: 'Inter Regular 400 · Corps', fontFamily: "'Inter',sans-serif", fontSize: 12, fontWeight: 400, color: 'rgba(44,26,10,0.6)', example: ["Premier mixed-use premium ancré dans la zone la plus aisée de Cocody.", "Une destination qui allie l'excellence des codes premium à la chaleur de l'hospitalité africaine."], desc: 'Corps de texte, descriptions. Taille min : 9px écran / 7pt impression.' },
  ],
  materials: [
    { grad: 'linear-gradient(135deg,#B8AA8C,#9a8e74)', name: 'Bardage Cosmos', sub: 'Aluminium nervuré mat #B8AA8C', desc: "Façade extérieure — première impression à 150m. L'identité s'exprime par l'enseigne LED, la signalétique bronze et les accents Or." },
    { grad: 'linear-gradient(135deg,#7A5C42,#3D2A1A)', name: 'Couronne Cosmos', sub: 'Kutu Baffle noyer fumé', desc: "Têtes de mur — détail architectural signature. Veines #3D2A1A sur fond #7A5C42." },
    { grad: 'linear-gradient(135deg,#A85430,#C47850)', name: 'Terracotta bichrome', sub: 'TEJA RAL 040 40 60 + IGNERO RAL 040 50 40', desc: "Murs signature. TEJA : zones à fort impact. IGNERO : transitions. Deux références RAL confirmées sur chantier." },
    { grad: 'linear-gradient(135deg,#D4C9B0,#c4b89a)', name: 'Sol Cosmos', sub: 'Terrazo granito fond beige + éclats', desc: "Actif sensoriel signature. Scintillement discret sous éclairage zénithal 2700-3000K — constellation au sol." },
    { grad: 'linear-gradient(135deg,#C9943A,#a07828)', name: 'Bronze patiné', sub: 'Accent métal #C9943A', desc: "Signalétique, luminaires, poignées, lettrage. Patine naturelle protégée." },
    { grad: 'linear-gradient(135deg,#6D7447,#4a5030)', name: 'Végétation structurante', sub: 'Arbres intégrés — palmiers, figuiers', desc: "Hall central, allées, terrasse food court. Paysagiste intégré. Budget entretien permanent." },
  ],
  comms: [
    { bg: 'linear-gradient(160deg,#1a0d04,#2C1A0A 50%,#B25A38)', title: 'Affiche institutionnelle', spec: 'Ébène 50 · Terra 30 · Bronze 20', brandText: 'COSMOS ANGRE', brandSub: '"L\'exception, tout simplement"', brandSize: 22, brandWeight: 700 },
    { bg: 'linear-gradient(180deg,#2C1A0A 45%,#B25A38 100%)', title: 'Push digital / App', spec: 'Header ébène · Gradient terra · CTA bronze', brandText: 'De la terrasse au cinéma —', brandSub: 'votre samedi à Cosmos' },
    { bg: '#B25A38', title: 'Textile staff', spec: 'Terra 85 · Bronze 15', brandText: 'COSMOS ANGRE', brandSub: 'STAFF', brandSize: 18, brandWeight: 700 },
  ],
  logoVariants: [
    { bg: 'var(--ebene-deep)', stroke: '#ffffff', tag: 'Version principale', name: 'Fond sombre — Référence', spec: 'Façade, en-tête, site web. Points blancs, O plein or.' },
    { bg: 'var(--fond)', stroke: '#2C1A0A', tag: 'Version fond clair', name: 'Papeterie & signalétique', spec: 'Points ébène, O plein or. Brochures, en-tête, intérieur.' },
    { bg: 'var(--terra)', stroke: 'rgba(242,235,221,0.9)', tag: 'Version textile staff', name: 'Broderie polo terracotta', spec: 'Points crème sur fond terracotta. O plein or.' },
    { bg: 'var(--pierre)', stroke: 'rgba(44,26,10,0.3)', tag: 'Version pierre / neutre', name: 'Signalétique intérieure', spec: 'Points atténués sur fond sable. Discret et élégant.' },
    { bg: 'linear-gradient(160deg,#1a0d04,var(--ebene))', stroke: '#ffffff', tag: 'Enseigne façade', name: 'Rétro-éclairée LED 3000K', spec: 'Inox brossé 80cm. Halo doré. Visible à 150m.' },
    { bg: 'var(--ebene-deep)', stroke: '#ffffff', tag: 'Carte de visite', name: '85×55mm · Coton 350g', spec: 'Dorure à chaud · Coins arrondis · Fond ébène' },
    { bg: '#B8AA8C', stroke: '#2C1A0A', tag: 'Sac shopping kraft', name: 'Packaging boutique', spec: 'Kraft recyclé grège doré · Logo ébène · Poignées coton tressé' },
    { bg: 'linear-gradient(180deg,#2C1A0A 50%,#5C3A1A)', stroke: '#F2EBDD', tag: 'Totem mall', name: 'Wayfinding intérieur', spec: 'Aluminium anodisé ébène · Lettrage crème · Éclairé LED 2700K' },
    { bg: 'var(--ebene)', stroke: '#C9943A', tag: 'App icon', name: 'Icône mobile Cosmos', spec: 'Fond ébène · Logo or simplifié · Coins arrondis iOS/Android' },
    { bg: '#F2EBDD', stroke: '#2C1A0A', tag: 'Document BEFA', name: 'En-tête officiel EXCO', spec: 'Fond crème · Logo ébène discret · Filet terracotta en bas de page' },
  ],
  parcoursRow1: [
    { border: 'var(--ebene)', step: 'Moment 01 · Arrivée', title: 'La première impression', text: "Totem bronze visible à 150m. Bardage terracotta reconnaissable depuis la route.", quote: '"La bardade bronze, ça a de la gueule."' },
    { border: 'var(--ebene)', step: 'Moment 02 · Parking', title: 'Fluidité & sécurité', text: "Bandes de guidage terracotta au sol. Éclairage 3000K. Totem statut P1/P2/P3.", quote: '"Ça se gare bien. Et c\'est propre."' },
    { border: 'var(--terra)', step: 'Moment 03 · Entrée', title: "L'effet seuil", text: "Portique terracotta. Changement sensoriel immédiat : lumière chaude, odeur signature (notes de fève tonka, bois de santal, pointe d'agrume — la terracotta olfactive), musique afro-jazz.", quote: '"On sait qu\'on est quelque part."' },
    { border: 'var(--bronze)', step: 'Moment 04 · Hall', title: "L'effet \"wow\" africain", text: 'Suspensions raphia monumentales. Sol crème sablée. Comptoir ébène-bronze. Totem digital 75" interactif.', quote: '"C\'est beau — et on se sent chez soi."' },
  ],
  parcoursRow2: [
    { border: 'var(--ebene)', step: 'Moment 05 · Shopping', title: "L'écrin qui libère", text: "Galeries à 70% neutral. Piliers ébène à bandeau terracotta. Wayfinding bronze intuitif.", quote: '"On y revient. Toujours."' },
    { border: 'var(--terra)', step: 'Moment 06 · Restauration', title: 'Du midi au soir', text: "Food court N2 ouvert sur terrasse extérieure. Mobilier bois ébène, coussins kaki-crème.", quote: '"De la terrasse au cinéma — votre samedi à Cosmos."' },
    { border: 'var(--ebene)', step: 'Moment 07 · Fidélisation', title: 'Le lien qui dure', text: "Programme Cosmos Club : carte Platinum NFC, accumulation de points, accès avant-premières.", quote: '"Cosmos, c\'est mon endroit."' },
  ],
  espacesCommuns: [
    { zone: 'Allées principales', title: 'Galeries marchandes', bars: [{ w: '70%', bg: 'var(--pierre)', c: 'rgba(44,26,10,0.5)', l: '70% Neutral' }, { w: '20%', bg: 'var(--terra)', c: 'rgba(242,235,221,0.8)', l: '20%' }, { w: '10%', bg: 'var(--bronze)', c: 'rgba(242,235,221,0.8)', l: '10%' }], rules: ['Sol : pierre naturelle ton sable', 'Murs : blanc chaud cassé', 'Piliers : ébène, bandeau terracotta en pied', 'Signalétique : fond crème, header bronze'] },
    { zone: "Hall d'entrée", title: 'Accueil central', bars: [{ w: '60%', bg: 'var(--fond)', c: 'rgba(44,26,10,0.5)', l: '60% Sable' }, { w: '25%', bg: 'var(--sable)', c: 'rgba(44,26,10,0.6)', l: '25%' }, { w: '15%', bg: 'var(--bronze)', c: 'rgba(242,235,221,0.8)', l: '15%' }], rules: ['Sol : crème sablée', 'Comptoir : bois ébène + bronze patiné', 'Suspensions : raphia naturel', 'Éclairage : 2700K'] },
    { zone: 'Espaces verts & terrasse', title: 'Zones végétales', bars: [{ w: '55%', bg: 'var(--pierre)', c: 'rgba(44,26,10,0.5)', l: '55%' }, { w: '30%', bg: 'var(--kaki)', c: 'rgba(242,235,221,0.8)', l: '30% Kaki' }, { w: '15%', bg: 'var(--bronze)', c: 'rgba(242,235,221,0.8)', l: '15%' }], rules: ['Jardinières : terracotta artisanale', 'Mobilier : bois ébène, coussins kaki', 'Végétation tropicale dense', 'Éclairage : projecteurs bronze 2700K'] },
    { zone: 'Parking & accès', title: 'Infrastructure service', bars: [{ w: '80%', bg: '#c8c0b4', c: 'rgba(44,26,10,0.5)', l: '80% Béton clair' }, { w: '12%', bg: 'var(--terra)', c: 'rgba(242,235,221,0.8)', l: '12%' }, { w: '8%', bg: 'var(--bronze)', c: 'rgba(242,235,221,0.8)', l: '8%' }], rules: ['Structure : béton clair', 'Bandes de guidage : terracotta au sol', 'Signalétique : blanc sur fond sombre', 'Totem : aluminium thermolaqué ébène'] },
  ],
  risksVigilance: [
    "La cohérence 70% neutral dans les espaces physiques doit être tenue jusqu'au dernier détail.",
    "Le terracotta en bardage extérieur vieillit différemment selon l'exposition soleil — à valider avec le bureau de contrôle.",
    "Formation du staff critique — l'hospitalité africaine doit être incarnée, pas simulée.",
    "Certaines enseignes premium ont des chartes internes strictes — prévoir une procédure de dérogation encadrée.",
  ],
  risksAdvantages: [
    "Capture les deux cibles simultanément : aspiration destination ET besoin quotidien — sans compromis sur la grille de loyers.",
    "Terracotta = couleur-signature sans concurrent direct dans le retail ivoirien. Inimitable à court terme.",
    "Espaces communs neutres = argument de vente fort pour les enseignes premium. Leur marque respire.",
    "L'identité africaine revendiquée est un bouclier contre les copies et un levier de communication organique.",
  ],
  risksLeftTitle: 'Points de vigilance',
  risksRightTitle: 'Avantage stratégique',
  brandRules: [
    { rule: 'Blanc Chaud #FAF7F2 et Sable Territorial #F2EBDD ne doivent jamais être côte à côte (ΔE 4.2).' },
    { rule: 'TEJA #A85430 et IGNERO #C47850 : deux références RAL officielles. Remplacent toute mention de terracotta générique #B25A38.' },
    { rule: 'Bardage façade = aluminium nervuré mat Grège Doré #B8AA8C. Terracotta artisanale en bardage extérieur est interdite.' },
    { rule: 'Bleu Cosmos #0B1026 interdit en façade, signalétique intérieure et textile staff.' },
  ],
  focusGroupQuestions: [
    { question: 'En voyant "Votre monde. Votre orbite." (Niveau 1), ressentez-vous une dimension cosmique ? Laquelle ?' },
    { question: "L'association Sol Cosmos (terrazo scintillant) + terracotta TEJA/IGNERO évoque-t-elle un univers premium accessible ou un univers distant ?" },
    { question: 'Entre "L\'exception, tout simplement" et "Ici, on vit quelque chose", laquelle vous donnerait le plus envie de venir régulièrement ?' },
  ],
  finaleQuote: ['Votre monde.', 'Votre orbite.'],
  finaleSub: "Brand & Tenant Master Book · Scénario C Enrichi · L'Exception, Tout Simplement",
};

/* ══════════════════════════════════════════
   SCENARIO A — adapted from fullData.A
   ══════════════════════════════════════════ */

const contentA: SmbContent = {
  scenarioLabel: 'Scénario A',
  heroQuote: 'Enfin tout,',
  heroQuoteHighlight: 'enfin ici.',
  uspStatement: "Cosmos Angré est le centre commercial que la zone attendait depuis dix ans : une qualité premium accessible au quotidien, enfin à 10 minutes de chez vous.",
  uspHighlight: 'une qualité premium accessible au quotidien, enfin à 10 minutes de chez vous.',
  uspNote: 'Signature de lancement · "Enfin tout, enfin ici" · Oct 2026 → Déc 2027 (18 mois max). Prérequis J+1 : Carrefour opérationnel + minimum 3 restaurants + cinéma. Sans ces trois éléments, la promesse "Enfin tout" est mensongère.',
  uspPillars: [
    { color: 'var(--terra)', title: "Complétude de l'offre", desc: "Carrefour + mode + restauration + services + cinéma. Tout, enfin ici. En un seul déplacement." },
    { color: 'var(--bronze)', title: 'Proximité stratégique', desc: "60% des résidents de la zone sortaient de Cocody pour consommer. Ce temps perdu est rendu." },
    { color: 'var(--kaki)', title: 'Fréquence & fidélité', desc: "Un centre de vie, pas une destination. 3 à 5 visites par mois. La qualité au rythme du quotidien." },
    { color: 'var(--sable)', title: 'Ancrage de quartier', desc: "93% favorables à l'ouverture. La zone attendait. Cosmos répond. Ce n'est pas une intrusion — c'est une réponse." },
  ],
  kapferer: [
    { num: '01', facette: 'Physique', title: 'La forêt urbaine accueillante', desc: "Façade aluminium nervuré mat Grège Doré (#B8AA8C), Sol Cosmos terrazo granito scintillant, Kutu Baffle noyer fumé en têtes de mur, intérieurs Sable Territorial. Nature domestiquée, qualité évidente, atmosphère apaisante.", yes: ['Naturel', 'Sensoriel'], no: ['Froid'] },
    { num: '02', facette: 'Personnalité', title: 'Le voisin accompli de 35 ans', desc: "Professionnel ivoirien, installé à Angré. Sait ce qui est bon. Ne fait pas de chichis. Qualité et accessibilité ne sont pas pour lui des opposés. Fiable, ancré — avec une exigence invisible sur chaque détail.", yes: ['Ancré', 'Fiable'], no: ['Inaccessible'] },
    { num: '03', facette: 'Culture', title: 'La qualité pour tous, ici', desc: "Le meilleur n'appartient pas à un autre quartier. La qualité Carrefour, les services premium, l'expérience agréable — à Angré, maintenant. Cosmos Angré est le centre de gravité naturel d'Angré — ce que le cosmos est à ses planètes, Cosmos Angré l'est à sa zone.", yes: ['Proximité', 'Accessibilité', 'Cosmique'] },
    { num: '04', facette: 'Relation', title: 'Le centre du quotidien', desc: "Courses le mercredi, lunch le vendredi, courses du week-end avec les enfants. La relation se construit dans la répétition plaisante.", yes: ['Fréquent', 'Confiant'] },
    { num: '05', facette: 'Reflet', title: "La zone qui sait ce qu'elle vaut", desc: "CSP+ cocody. Familles, cadres, jeunes actifs. Ils n'ont pas à traverser Abidjan pour avoir accès au meilleur. Ils l'ont, ici.", yes: ['CSP+ Cocody', 'Familles'] },
    { num: '06', facette: 'Mentalisation', title: "C'est mon centre, dans mon quartier", desc: "Appartenance sans exclusion. Fierté locale. \"Mon Cosmos\" dit le résident. L'ancrage géographique devient identitaire.", yes: ['Appartenance', 'Fierté', 'Local'] },
  ],
  persona: {
    prenom: 'Kouamé / Affoué', age: '35-42 ans', profession: 'Cadre supérieur / professionnel libéral',
    quartier: 'Angré 7ème / Angré Château',
    frustration: "Je perds 45 min et 2 000 FCFA d'essence chaque semaine pour faire des courses correctes.",
    ligneRouge: "Être traité comme client de seconde zone dans son propre quartier",
  },
  values: [
    { color: 'var(--terra)', title: 'Ancrage de quartier', desc: "Cosmos Angré est d'abord un centre de la zone d'Angré. Il appartient à ses habitants avant d'appartenir à une marque." },
    { color: 'var(--bronze)', title: 'Complétude sans détour', desc: "L'offre est totale. Tout ce dont on a besoin au quotidien — en qualité — dans un même lieu. Le déplacement inutile disparaît." },
    { color: 'var(--kaki)', title: 'Communauté locale', desc: "On se retrouve à Cosmos. La fidélité n'est pas de la loyauté envers une marque — c'est de l'attachement à un endroit de vie." },
    { color: 'var(--gris-chaud)', title: 'Qualité sans intimidation', desc: "Le meilleur, présenté simplement. L'excellence visible, pas ostentatoire. On est bien reçu. On revient." },
  ],
  toneExamples: [
    { label: 'Accueil', quote: '"Bienvenue chez vous. Enfin tout, enfin ici."', tone: 'Chaleureux + ancré' },
    { label: 'Digital', quote: '"Courses, lunch, cinéma — tout votre samedi, sans quitter Angré."', tone: 'Vie de quartier + complétude' },
    { label: 'Cosmique', quote: '"Votre quartier. Votre orbite quotidienne."', tone: 'Digital · Push notification · ADN cosmique' },
  ],
  signatureMain: { text: 'Votre évidence. ', highlight: 'Ici.', sub: 'Signature permanente · Niveau 1 · Façade · Institutionnel · 10 ans+ · À tester en focus group contre "L\'évidence, enfin."' },
  signatureAlts: [
    { text: '"Enfin tout, enfin ici."', sub: 'Niveau 2 · Signature de lancement · Oct 2026 → Déc 2027 · 18 mois max' },
    { text: '"Votre temps vaut mieux que ça."', sub: 'Niveau 3 · Campagne acquisition · Adresse directe · Insight fort' },
    { text: '"Cosmos, mon endroit."', sub: 'Niveau 4 · Fidélisation · Cosmos Club · Bouche à oreille' },
  ],
  paletteBar: [
    { w: '35%', bg: 'var(--fond)', c: 'rgba(47,84,57,0.5)' },
    { w: '30%', bg: 'var(--terra)', c: 'rgba(242,235,221,0.7)' },
    { w: '15%', bg: 'var(--bronze)', c: 'rgba(26,20,16,0.7)' },
    { w: '10%', bg: 'var(--kaki)', c: 'rgba(242,235,221,0.7)' },
    { w: '5%', bg: 'var(--sable)', c: 'rgba(26,20,16,0.6)' },
    { w: '5%', bg: 'var(--ebene)', c: 'rgba(242,235,221,0.6)' },
  ],
  paletteColors: [
    { bg: 'var(--fond)', role: 'Dominant · 35%', name: 'Sable Territorial', hex: '#F2EBDD', where: 'Murs intérieurs, halls, espaces lounge, sol galeries. Toutes les surfaces intérieures.' },
    { bg: 'var(--terra)', role: 'Structure · 25%', name: 'Forêt Profond', hex: '#2F5439', where: 'Signalétique directionnelle, enseigne LED (caisson), communication. INTERDIT en façade principale — le bâtiment réel a un bardage aluminium Grège Doré #B8AA8C.' },
    { bg: 'var(--bronze)', role: 'Prestige · 15%', name: 'Or Cuivré', hex: '#C9943A', where: 'Logo, lettrage enseigne, signalétique, poignées, broderies, luminaires.' },
    { bg: 'var(--kaki)', role: 'Végétal · 10%', name: 'Kaki Minéral', hex: '#76764D', where: 'Jardinières, zones végétales, événements, maintenance, signalétique secondaire.' },
    { bg: 'var(--sable)', role: 'Accent doux · 5%', name: 'Or Doux', hex: '#E8C97A', where: 'Icônes digitales, filets décoratifs, étiquettes premium, textile second niveau.' },
    { bg: 'var(--ebene)', role: 'Institutionnel · 3%', name: 'Noir Chaud', hex: '#1A1410', where: "Documents officiels (BEFA, courriers EXCO). Jamais en intérieur." },
    { bg: '#B8AA8C', role: 'Façade · 70%', name: 'Bardage Cosmos', hex: '#B8AA8C', where: 'Aluminium nervuré mat. Façade extérieure — première impression à 150m.' },
    { bg: '#D4C9B0', role: 'Sol · Actif signature', name: 'Sol Cosmos', hex: '#D4C9B0', where: 'Terrazo granito fond beige + éclats — actif sensoriel, constellation au sol.' },
    { bg: '#7A5C42', role: 'Architectural · 3%', name: 'Kutu Baffle', hex: '#7A5C42', where: 'Noyer fumé. Têtes de mur — détail architectural commun aux 4 scénarios.' },
    { bg: '#1B2A4A', role: 'Cosmique · 2%', name: 'Nuit Profonde', hex: '#1B2A4A', where: 'Pantone 2767 C. Carte Cosmos Club, dark mode digital, documents EXCO. Active l\'ADN cosmique.' },
  ],
  proportions: [
    { title: 'Espaces physiques intérieurs', sub: 'Allées, galeries, hall — ce que voit le visiteur en marchant', bars: [{ w: '60%', bg: 'var(--fond)', c: 'rgba(47,84,57,0.6)', l: '60%' }, { w: '25%', bg: 'var(--terra)', c: 'rgba(242,235,221,0.8)', l: '25%' }, { w: '15%', bg: 'var(--bronze)', c: 'rgba(26,20,16,0.7)', l: '15%' }], legend: [{ dot: 'var(--fond)', l: 'Sable Territorial — sols, murs, mobilier', p: '60%' }, { dot: 'var(--terra)', l: 'Forêt — piliers, encadrements, accents', p: '25%' }, { dot: 'var(--bronze)', l: 'Or Cuivré — signalétique, poignées, détails', p: '15%' }] },
    { title: 'Communication & marketing', sub: 'Affiches, digital, brochures, réseaux sociaux', bars: [{ w: '50%', bg: 'var(--terra)', c: 'rgba(242,235,221,0.7)', l: '50%' }, { w: '30%', bg: 'var(--fond)', c: 'rgba(47,84,57,0.5)', l: '30%' }, { w: '20%', bg: 'var(--bronze)', c: 'rgba(26,20,16,0.7)', l: '20%' }], legend: [{ dot: 'var(--terra)', l: 'Forêt Profond — fond dominant', p: '50%' }, { dot: 'var(--fond)', l: 'Sable — textes, zones d\'air', p: '30%' }, { dot: 'var(--bronze)', l: 'Or — logo, CTA, accents', p: '20%' }] },
    { title: 'Façade extérieure', sub: 'La première impression — visible à 150m', bars: [{ w: '70%', bg: '#B8AA8C', c: 'rgba(47,84,57,0.5)', l: '70%' }, { w: '20%', bg: 'var(--terra)', c: 'rgba(242,235,221,0.7)', l: '20%' }, { w: '10%', bg: 'var(--bronze)', c: 'rgba(26,20,16,0.7)', l: '10%' }], legend: [{ dot: '#B8AA8C', l: 'Bardage Cosmos alu grège doré', p: '70%' }, { dot: 'var(--terra)', l: 'Forêt — enseigne, caisson', p: '20%' }, { dot: 'var(--bronze)', l: 'Or Cuivré — lettrage, halo', p: '10%' }] },
    { title: 'Textile & collection de marque', sub: 'Uniformes staff, goodies, packaging', bars: [{ w: '70%', bg: 'var(--terra)', c: 'rgba(242,235,221,0.7)', l: '70%' }, { w: '15%', bg: 'var(--fond)', c: 'rgba(47,84,57,0.5)', l: '15%' }, { w: '15%', bg: 'var(--bronze)', c: 'rgba(26,20,16,0.7)', l: '15%' }], legend: [{ dot: 'var(--terra)', l: 'Forêt — fond textile dominant', p: '70%' }, { dot: 'var(--fond)', l: 'Sable — col, lisérés', p: '15%' }, { dot: 'var(--bronze)', l: 'Or — broderies logo', p: '15%' }] },
  ],
  typoSections: [
    { label: 'Cormorant Garamond SemiBold 600 · Titres', fontFamily: "'Cormorant Garamond',serif", fontSize: 56, fontWeight: 600, color: 'var(--terra)', example: ['Enfin tout,', 'enfin ici'], desc: 'Titres H1/H2, signatures, citations institutionnelles. Couleur Forêt Profond.' },
    { label: 'Cormorant Garamond Italic 400 · Accents', fontFamily: "'Cormorant Garamond',serif", fontSize: 56, fontWeight: 400, fontStyle: 'italic', color: 'var(--bronze)', example: ['Votre', 'quartier'], desc: 'Slogans, citations lifestyle, accroche événementielle. Couleur Or Cuivré.' },
    { label: 'Inter Medium 500 · Sous-titres & UI', fontFamily: "'Inter',sans-serif", fontSize: 32, fontWeight: 500, color: 'var(--ebene)', example: ['Cosmos Angré', 'Cocody'], desc: 'Sous-titres, signalétique, navigation, labels UI digital.' },
    { label: 'Inter Regular 400 · Corps', fontFamily: "'Inter',sans-serif", fontSize: 12, fontWeight: 400, color: 'rgba(47,84,57,0.6)', example: ["Premier centre de vie premium au service de la zone d'Angré.", "Une destination qui rend la qualité accessible au quotidien — sans détour, sans compromis, dans votre quartier."], desc: 'Corps de texte, descriptions. Taille min : 9px écran / 7pt impression.' },
  ],
  materials: [
    { grad: 'linear-gradient(135deg,#B8AA8C,#9a8e74)', name: 'Bardage Cosmos', sub: 'Aluminium nervuré mat #B8AA8C', desc: "Façade extérieure — première impression à 150m." },
    { grad: 'linear-gradient(135deg,#7A5C42,#3D2A1A)', name: 'Couronne Cosmos', sub: 'Kutu Baffle noyer fumé', desc: "Têtes de mur — détail architectural signature." },
    { grad: 'linear-gradient(135deg,#D4C9B0,#c4b89a)', name: 'Sol Cosmos', sub: 'Terrazo granito fond beige + éclats', desc: "Actif sensoriel signature — constellation au sol sous éclairage 2700-3000K." },
    { grad: 'linear-gradient(135deg,#C9943A,#a07828)', name: 'Laiton cuivré', sub: 'Finition brossée', desc: "Signalétique, luminaires, garde-corps, poignées." },
    { grad: 'linear-gradient(135deg,#76764D,#545434)', name: 'Raphia & fibres végétales', sub: 'Tissage naturel', desc: "Suspensions, panneaux acoustiques, assises lounge." },
  ],
  comms: [
    { bg: 'linear-gradient(160deg,#1a3020,#2F5439 60%,#4a7558)', title: 'Affiche institutionnelle', spec: 'Forêt 50 · Sable 30 · Or 20', brandText: 'COSMOS ANGRÉ', brandSub: '"Enfin tout, enfin ici"', brandSize: 22, brandWeight: 700 },
    { bg: 'linear-gradient(180deg,#2F5439 40%,#4a7558 100%)', title: 'Push digital / App', spec: 'Header Forêt · Gradient végétal · CTA or', brandText: 'Courses, lunch, cinéma —', brandSub: 'tout votre samedi à Angré' },
    { bg: '#2F5439', title: 'Textile staff', spec: 'Forêt 70 · Sable 15 · Or brodé 15', brandText: 'COSMOS ANGRÉ', brandSub: 'STAFF', brandSize: 18, brandWeight: 700 },
  ],
  logoVariants: [
    { bg: 'var(--ebene-deep)', stroke: '#F2EBDD', tag: 'Version principale', name: 'Fond Forêt — Référence', spec: 'Façade, en-tête, site web. Points sable, O plein or.' },
    { bg: 'var(--fond)', stroke: '#2F5439', tag: 'Version fond sable', name: 'Papeterie & intérieur', spec: 'Points Forêt, O plein or. Brochures, en-tête, signalétique.' },
    { bg: 'var(--terra)', stroke: 'rgba(242,235,221,0.9)', tag: 'Version textile staff', name: 'Broderie polo forêt', spec: 'Points sable sur fond forêt. O plein or.' },
    { bg: 'var(--pierre)', stroke: 'rgba(47,84,57,0.3)', tag: 'Version pierre / neutre', name: 'Signalétique intérieure', spec: 'Points atténués sur fond pierre. Discret et organique.' },
    { bg: 'linear-gradient(160deg,#1a3020,var(--terra))', stroke: '#ffffff', tag: 'Enseigne façade', name: 'Rétro-éclairée LED 3000K', spec: 'Inox brossé 80cm. Halo doré. Visible à 150m.' },
    { bg: 'var(--ebene-deep)', stroke: '#F2EBDD', tag: 'Carte de visite', name: '85×55mm · Coton 350g', spec: 'Dorure à chaud Or · Coins arrondis · Fond Forêt' },
    { bg: '#B8AA8C', stroke: '#2F5439', tag: 'Sac shopping kraft', name: 'Packaging boutique', spec: 'Kraft recyclé grège doré · Logo Forêt · Poignées coton naturel' },
    { bg: 'linear-gradient(180deg,#2F5439 50%,#4a7558)', stroke: '#F2EBDD', tag: 'Totem mall', name: 'Wayfinding intérieur', spec: 'Aluminium laqué Forêt · Lettrage sable · Pictos or · LED 2700K' },
    { bg: '#2F5439', stroke: '#C9943A', tag: 'App icon', name: 'Icône mobile Cosmos', spec: 'Fond Forêt · Logo or simplifié · Coins arrondis iOS/Android' },
    { bg: '#F2EBDD', stroke: '#2F5439', tag: 'Document BEFA', name: 'En-tête officiel EXCO', spec: 'Fond sable · Logo Forêt discret · Filet or en bas de page' },
  ],
  parcoursRow1: [
    { border: 'var(--terra)', step: 'Moment 01 · Arrivée', title: "L'annonce du quartier", text: "Enseigne Forêt & Or visible à 150m depuis la route. Bardage bois huilé. Signalétique parkings P1/P2/P3 claire. Végétation luxuriante en façade.", quote: '"Ah, c\'est là. Enfin !"' },
    { border: 'var(--terra)', step: 'Moment 02 · Parking', title: 'Fluidité naturelle', text: "Bandes de guidage kaki au sol. Éclairage 3000K chaleureux. Totem laiton status P1/P2/P3. Béton ciré clair. Accès piéton balisé Or.", quote: '"C\'est propre. Et bien pensé."' },
    { border: 'var(--kaki)', step: 'Moment 03 · Entrée', title: "L'effet forêt", text: "Portique bois & laiton. Passage végétalisé — ficus, bananiers ornementaux. Air conditionné 22°C. Odeur signature Cosmos (bois & agrumes verts).", quote: '"On est bien reçu. Comme des gens."' },
    { border: 'var(--bronze)', step: 'Moment 04 · Hall', title: "L'ancre du quartier", text: "Suspensions raphia naturel. Sol calcaire sablé. Comptoir bois & laiton. Totem 75\" interactif. Cosmos Club desk visible. Végétation dense.", quote: '"C\'est beau. Et ça me ressemble."' },
  ],
  parcoursRow2: [
    { border: 'var(--terra)', step: 'Moment 05 · Shopping', title: 'Le cadre qui libère', text: "Galeries à 60% sable. Piliers bois à bandeau kaki en pied. Wayfinding laiton intuitif. Chaque enseigne respire. Musique afro-jazz à -14dB.", quote: '"On revient. On se sent bien."' },
    { border: 'var(--kaki)', step: 'Moment 06 · Restauration', title: 'Le repas du quartier', text: "Food court N2 ouvert sur terrasse végétalisée. Mobilier bois, coussins kaki-sable. Suspensions raphia et spots laiton 2700K.", quote: '"Courses, lunch, cinéma. Tout ici."' },
    { border: 'var(--terra)', step: 'Moment 07 · Fidélisation', title: 'Mon Cosmos', text: "Cosmos Club : carte Platinum NFC, points, avant-premières, offres quartier. Push app hyper-local. Sac kraft & raphia remis à chaque passage.", quote: '"Cosmos, c\'est mon endroit à Angré."' },
  ],
  espacesCommuns: [
    { zone: 'Allées principales', title: 'Galeries marchandes', bars: [{ w: '60%', bg: 'var(--fond)', c: 'rgba(47,84,57,0.5)', l: '60% Sable' }, { w: '25%', bg: 'var(--terra)', c: 'rgba(242,235,221,0.7)', l: '25%' }, { w: '15%', bg: 'var(--bronze)', c: 'rgba(26,20,16,0.6)', l: '15%' }], rules: ['Sol : calcaire sablé ton naturel', 'Murs : sable territorial — neutre et chaud', 'Piliers : bois huilé, bandeau kaki en pied'] },
    { zone: "Hall d'entrée", title: 'Accueil central', bars: [{ w: '55%', bg: 'var(--fond)', c: 'rgba(47,84,57,0.5)', l: '55% Sable' }, { w: '25%', bg: 'var(--terra)', c: 'rgba(242,235,221,0.7)', l: '25%' }, { w: '20%', bg: 'var(--bronze)', c: 'rgba(26,20,16,0.6)', l: '20%' }], rules: ['Sol : calcaire crème ciré', 'Comptoir : bois huilé + laiton cuivré', 'Suspensions : raphia naturel dense'] },
    { zone: 'Terrasse & espaces verts', title: 'Zones végétales', bars: [{ w: '50%', bg: 'var(--kaki)', c: 'rgba(242,235,221,0.8)', l: '50% Kaki' }, { w: '35%', bg: 'var(--fond)', c: 'rgba(47,84,57,0.5)', l: '35%' }, { w: '15%', bg: 'var(--bronze)', c: 'rgba(26,20,16,0.6)', l: '15%' }], rules: ['Jardinières : pierre naturelle ou bois huilé', 'Mobilier : bois ébène, coussins kaki-sable', 'Végétation tropicale foisonnante'] },
    { zone: 'Parking & accès', title: 'Infrastructure service', bars: [{ w: '80%', bg: '#c8c0b4', c: 'rgba(47,84,57,0.5)', l: '80% Béton clair' }, { w: '12%', bg: 'var(--terra)', c: 'rgba(242,235,221,0.7)', l: '12%' }, { w: '8%', bg: 'var(--bronze)', c: 'rgba(26,20,16,0.6)', l: '8%' }], rules: ['Structure : béton clair poli', 'Bandes guidage : kaki au sol', 'Signalétique : blanc sur fond Forêt'] },
  ],
  risksVigilance: [
    "Risque principal : ressembler à un \"Sococé premium\" si l'exécution manque de rigueur. La qualité doit être Grade A, sans exception, dès le premier jour.",
    "Forêt Profond (#2F5439) INTERDIT en peinture façade — incompatible avec le bardage aluminium nervuré Grège Doré #B8AA8C. Réservé aux caissons enseigne et à la signalétique.",
    "Formation du staff critique : le positionnement \"quartier\" peut dériver vers le familier.",
    "Scalabilité de marque limitée : le Scénario A est optimisé pour Cocody.",
  ],
  risksAdvantages: [
    "Alignement OnPoint maximal : 60% des résidents sortaient de Cocody — la promesse \"enfin ici\" répond directement à une douleur documentée.",
    "Carrefour comme locomotive de proximité : la fréquentation du supermarché garantit 3–5 visites/mois.",
    "Le Forêt Profond + Or Cuivré = unique dans le retail abidjanais. Différenciation immédiate.",
    "Fidélisation naturelle : l'ancrage de quartier crée un sentiment d'appartenance. \"Mon Cosmos\" est le meilleur indicateur de réussite.",
  ],
  risksLeftTitle: 'Points de vigilance',
  risksRightTitle: 'Avantage stratégique',
  brandRules: [
    { rule: 'Or Doux #E8C97A et Or Cuivré #C9943A ne doivent jamais être utilisés côte à côte.' },
    { rule: 'Kaki et Forêt ne doivent jamais être côte à côte sans séparateur sable.' },
    { rule: 'Forêt Profond #2F5439 interdit en façade principale. Réservé à signalétique, enseigne LED, communication.' },
    { rule: 'Bardage façade = aluminium nervuré mat Grège Doré #B8AA8C (réalité chantier confirmée).' },
  ],
  focusGroupQuestions: [
    { question: '"Votre évidence. Ici." vs "L\'évidence, enfin." — laquelle est la plus forte pour incarner votre quartier ?' },
    { question: 'Le concept "Enfin tout, enfin ici" résonne-t-il comme une promesse de lancement ou comme une vérité permanente ?' },
    { question: 'Le Sol Cosmos (terrazo scintillant) contribue-t-il à l\'impression premium ou passe-t-il inaperçu ?' },
  ],
  finaleQuote: ['Votre évidence.', 'Ici.'],
  finaleSub: "Brand & Tenant Master Book · Scénario A · Premium de Proximité",
};

/* ══════════════════════════════════════════
   SCENARIO B — adapted from fullData.B
   ══════════════════════════════════════════ */

const contentB: SmbContent = {
  scenarioLabel: 'Scénario B',
  heroQuote: 'Un monde',
  heroQuoteHighlight: 'à part.',
  uspStatement: "La première destination premium mixed-use d'Abidjan. Cosmos Angré n'est pas un mall. C'est une destination.",
  uspHighlight: 'destination premium mixed-use',
  uspNote: "Positionnement conditionnel à la livraison du programme mixed-use complet (hôtel, bureaux, clinique, rooftop). Protocole de lancement progressif : Phase 1 (Oct 2026) : 'La destination commence ici.' — mall + Carrefour + 2 restaurants gastronomiques + cinéma. Phase 2 (2027) : 'Un monde prend forme.' — bureaux + services premium. Phase 3 (2028+) : 'Un monde à part.' — programme complet, signature permanente activée.",
  uspPrerequisites: [
    { text: 'Hauteur sous plafond hall 5m+ minimum' },
    { text: 'Finitions premium en hall (marbre ou équivalent)' },
    { text: 'Minimum 2 restaurants sit-down avec service' },
    { text: 'Uniforme staff irréprochable' },
  ],
  uspPillars: [
    { color: 'var(--terra)', title: 'Aspiration', desc: "Un lieu qui élève. Le standard international, enfin à Abidjan." },
    { color: 'var(--bronze)', title: 'Expérience totale', desc: "Hôtel, cinéma, bureaux, gastronomie, clinique, shopping — on y vit." },
    { color: 'var(--kaki)', title: 'Destination panafricaine', desc: "Positionnement régional, pas local. La référence Afrique de l'Ouest." },
    { color: 'var(--sable)', title: 'Standard international', desc: "Les mêmes codes que Dubaï Mall ou Galeries Lafayette — ici." },
  ],
  kapferer: [
    { num: '01', facette: 'Physique', title: "L'architecture destination", desc: "Façade aluminium nervuré mat Grège Doré (#B8AA8C) — l'effet bronze/or est obtenu par l'enseigne LED et les accents laiton, pas par le bardage. Sol Cosmos terrazo granito scintillant, Kutu Baffle noyer fumé en têtes de mur. Hôtel, cinéma, clinique, rooftop, bureaux. Matériaux nobles.", yes: ['Remarquable', 'Noble', 'Sensoriel'], no: ['Ordinaire'] },
    { num: '02', facette: 'Personnalité', title: "L'hôte sophistiqué", desc: "Directeur d'hôtel 5 étoiles. Attentionné, cultivé, discret, élégant.", yes: ['Distingué', 'Discret', 'Aspirationnel'], no: ['Arrogant'] },
    { num: '03', facette: 'Culture', title: 'Excellence · Singularité', desc: "Cosmos Angré ne reproduit pas — il crée. Standards internationaux enracinés dans la fierté africaine. Les matières nobles sont universelles — leur sélection est guidée par la durabilité tropicale et la résonance culturelle locale.", yes: ['Excellence', 'Singularité', 'Ancrage'] },
    { num: '04', facette: 'Relation', title: "L'occasion puis l'habitude", desc: "On vient pour une occasion. On revient parce qu'on ne veut plus aller ailleurs.", yes: ['Destination', 'Expérience'] },
    { num: '05', facette: 'Reflet', title: 'Le goût du beau', desc: "Cadres supérieurs, entrepreneurs, expatriés. >1,5M FCFA/mois. Note : le Pilier du Quartier (résident Angré 5+ ans, CSP+ standard) doit se sentir bienvenu — le positionnement destination ne doit pas être perçu comme exclusif. Former le staff à l'accueil chaleureux quelle que soit l'apparence du visiteur.", yes: ['CSP++', 'International', 'Inclusif'] },
    { num: '06', facette: 'Mentalisation', title: 'Ce qui se fait de mieux', desc: "Signal social fort. Aspiration et appartenance.", yes: ['Statut', 'Distinction'] },
  ],
  persona: {
    prenom: 'Stéphane / Awa', age: '38-50 ans', profession: 'DG, entrepreneur >5M FCFA, cadre international',
    quartier: 'Cocody, Riviera Golf, Plateau',
    frustration: "Je dois aller à Paris ou Dubaï pour trouver un environnement à la hauteur de mes standards.",
    ligneRouge: "Un endroit qui ne correspond pas à son statut perçu",
  },
  values: [
    { color: 'var(--terra)', title: 'Excellence', desc: "Chaque détail compte. Rien n'est laissé au hasard, rien n'est approximatif." },
    { color: 'var(--bronze)', title: 'Ambition africaine', desc: "Standards mondiaux, identité africaine. La fierté d'un continent." },
    { color: 'var(--kaki)', title: 'Expérience totale', desc: "On ne vient pas faire des courses. On vit quelque chose." },
    { color: 'var(--gris-chaud)', title: 'Intransigeance', desc: "Le refus du compromis. Chaque détail est à la hauteur ou n'existe pas." },
  ],
  toneExamples: [
    { label: 'Accueil', quote: '"Cosmos Angré. Une adresse. Une expérience."', tone: 'Sobre + distingué + confiant' },
    { label: 'Digital', quote: '"Ce soir à Cosmos — une table, un film, une nuit."', tone: 'Aspirationnel + curation lifestyle' },
  ],
  signatureMain: { text: 'Un monde ', highlight: 'à part.', sub: 'Signature permanente · Niveau 1 · Activée uniquement Phase 3 (programme complet 2028+)' },
  signatureAlts: [
    { text: '"La destination commence ici."', sub: 'Phase 1 · Oct 2026 · Soft Opening · Mall + Carrefour + restaurants + cinéma' },
    { text: '"Un monde prend forme."', sub: 'Phase 2 · 2027 · Bureaux + services premium' },
    { text: '"Vivez l\'exception."', sub: 'Campagne permanente · Invitation à l\'action' },
    { text: '"Cosmos. Une adresse. Une expérience."', sub: 'Institutionnel · Documents BEFA · Communications EXCO · Remplace "Ce qui se fait de mieux" (éliminée — trop générique)' },
    { text: '"Un monde à part."', sub: 'Carte Cosmos Club Black · Fond Bleu Nuit, lettrage Or Mat · Usage exclusif carte fidélité' },
  ],
  paletteBar: [
    { w: '10%', bg: 'var(--blanc-chaud)', c: 'rgba(13,27,75,0.4)' },
    { w: '20%', bg: 'var(--pierre)', c: 'rgba(13,27,75,0.4)' },
    { w: '15%', bg: 'var(--fond)', c: 'rgba(13,27,75,0.4)' },
    { w: '20%', bg: 'var(--terra)', c: 'rgba(242,237,227,0.8)' },
    { w: '10%', bg: 'var(--kaki)', c: 'rgba(242,237,227,0.8)' },
    { w: '10%', bg: 'var(--bronze)', c: 'rgba(242,237,227,0.8)' },
    { w: '15%', bg: 'var(--ebene)', c: 'rgba(242,237,227,0.7)' },
  ],
  paletteColors: [
    { bg: 'var(--blanc-chaud)', role: 'Neutre 1 · 10%', name: 'Blanc chaud', hex: '#FAF7F2', where: 'Plafonds, transitions. RÈGLE : jamais simultanément avec Ivoire sur le même support.' },
    { bg: 'var(--pierre)', role: 'Neutre 2 · 15%', name: 'Pierre naturelle', hex: '#E8E0D5', where: 'Sols galeries, murs secondaires' },
    { bg: 'var(--fond)', role: 'Neutre 3 · 10%', name: 'Ivoire', hex: '#F2EDE3', where: 'Print, signalétique intérieure. RÈGLE : jamais simultanément avec Blanc Chaud.' },
    { bg: '#D4C9B0', role: 'Sol · Actif signature', name: 'Sol Cosmos', hex: '#D4C9B0', where: 'Terrazo granito fond beige + éclats clairs — nommé "Sol Cosmos" dans les supports de communication.' },
    { bg: '#B8AA8C', role: 'Façade · 70%', name: 'Bardage Cosmos', hex: '#B8AA8C', where: 'Aluminium nervuré mat. Façade extérieure — première impression à 150m.' },
    { bg: '#7A5C42', role: 'Architectural · 3%', name: 'Kutu Baffle', hex: '#7A5C42', where: 'Noyer fumé. Têtes de mur — détail architectural commun aux 4 scénarios.' },
    { bg: 'var(--terra)', role: 'Signature · 15%', name: 'Or Mat', hex: '#B8924A', where: 'Logo, lettrage, détails signalétiques, CTA' },
    { bg: 'var(--kaki)', role: 'Structure · 7%', name: 'Bleu Profond', hex: '#1A3060', where: 'Sous-menus, hover, dégradés. RÈGLE : jamais côte à côte avec Bleu Nuit sans séparateur neutre.' },
    { bg: 'var(--ebene)', role: 'Dominant · 10%', name: 'Bleu Nuit', hex: '#0D1B4B', where: 'Fond digital, packaging, textile. ALERTE : INTERDIT en façade extérieure (dégradation UV en 18-24 mois sous climat tropical). Réservé caisson enseigne LED (éclairé, non exposé UV direct).' },
  ],
  proportions: [
    { title: 'Espaces physiques intérieurs', sub: 'Allées, galeries, hall — atmosphère palace', bars: [{ w: '55%', bg: 'var(--pierre)', c: 'rgba(13,27,75,0.5)', l: '55%' }, { w: '30%', bg: 'var(--ebene)', c: 'rgba(242,237,227,0.7)', l: '30%' }, { w: '15%', bg: 'var(--terra)', c: 'rgba(242,237,227,0.8)', l: '15%' }], legend: [{ dot: 'var(--pierre)', l: 'Neutrals & ivoire', p: '55%' }, { dot: 'var(--ebene)', l: 'Bleu nuit accents', p: '30%' }, { dot: 'var(--terra)', l: 'Or mat détails', p: '15%' }] },
    { title: 'Communication & marketing', sub: 'Dark mode natif — la nuit est l\'identité', bars: [{ w: '65%', bg: 'var(--ebene-deep)', c: 'rgba(242,237,227,0.6)', l: '65%' }, { w: '25%', bg: 'var(--kaki)', c: 'rgba(242,237,227,0.7)', l: '25%' }, { w: '10%', bg: 'var(--terra)', c: 'rgba(242,237,227,0.8)', l: '10%' }], legend: [{ dot: 'var(--ebene-deep)', l: 'Nuit abyssale fond', p: '65%' }, { dot: 'var(--kaki)', l: 'Bleu profond structure', p: '25%' }, { dot: 'var(--terra)', l: 'Or mat signature', p: '10%' }] },
    { title: 'Façade extérieure', sub: 'Prestige — visible à 150m', bars: [{ w: '70%', bg: '#B8AA8C', c: 'rgba(13,27,75,0.5)', l: '70%' }, { w: '15%', bg: 'var(--pierre)', c: 'rgba(13,27,75,0.5)', l: '15%' }, { w: '15%', bg: 'var(--terra)', c: 'rgba(242,237,227,0.8)', l: '15%' }], legend: [{ dot: '#B8AA8C', l: 'Bardage Cosmos alu grège doré', p: '70%' }, { dot: 'var(--pierre)', l: 'Pierre Naturelle transitions', p: '15%' }, { dot: 'var(--terra)', l: 'Or Mat lettrage + Bleu Nuit caisson enseigne LED', p: '15%' }] },
    { title: 'Textile & collection de marque', sub: 'Uniformes staff, goodies, packaging', bars: [{ w: '85%', bg: 'var(--ebene)', c: 'rgba(242,237,227,0.7)', l: '85%' }, { w: '15%', bg: 'var(--terra)', c: 'rgba(242,237,227,0.8)', l: '15%' }], legend: [{ dot: 'var(--ebene)', l: 'Bleu nuit dominant', p: '85%' }, { dot: 'var(--terra)', l: 'Or mat broderies', p: '15%' }] },
  ],
  typoSections: [
    { label: 'Playfair Display Regular 400 · Titres', fontFamily: "'Cormorant Garamond',serif", fontSize: 56, fontWeight: 400, color: 'var(--ebene)', example: ['Un monde', 'à part'], desc: 'Titres H1/H2, signatures, lettrage institutionnel.' },
    { label: 'Playfair Display Italic · Accents', fontFamily: "'Cormorant Garamond',serif", fontSize: 56, fontWeight: 400, fontStyle: 'italic', color: 'var(--terra)', example: ["Vivez", "l'exception"], desc: 'Slogans, citations, invitations événementielles.' },
    { label: 'Inter Light 300 · Sous-titres & UI', fontFamily: "'Inter',sans-serif", fontSize: 32, fontWeight: 300, color: 'var(--ebene)', example: ['Cosmos Angré', 'Cocody'], desc: 'Sous-titres, signalétique, navigation, labels, UI digital.' },
    { label: 'Inter Regular 400 · Corps', fontFamily: "'Inter',sans-serif", fontSize: 12, fontWeight: 400, color: 'rgba(13,27,75,0.6)', example: ["La première destination premium mixed-use d'Abidjan.", "Hôtel, cinéma, bureaux, gastronomie — on y vit une expérience."], desc: 'Corps de texte, descriptions. Taille min : 9px écran / 7pt impression.' },
  ],
  materials: [
    { grad: 'linear-gradient(135deg,#B8AA8C,#9a8e74)', name: 'Bardage Cosmos', sub: 'Aluminium nervuré mat #B8AA8C', desc: "Façade extérieure — première impression à 150m." },
    { grad: 'linear-gradient(135deg,#7A5C42,#3D2A1A)', name: 'Kutu Baffle noyer fumé', sub: 'Têtes de mur #7A5C42', desc: "Détail architectural signature commun aux 4 scénarios." },
    { grad: 'linear-gradient(135deg,#D4C9B0,#c4b89a)', name: 'Sol Cosmos', sub: 'Terrazo granito fond beige + éclats', desc: "Sol signature — nommé 'Sol Cosmos' dans les supports de communication. Marbre noir : réservé au comptoir d'accueil et habillages ponctuels." },
    { grad: 'linear-gradient(135deg,#D4B06A,#B8924A)', name: 'Laiton poli', sub: 'Finition miroir · Reflets dorés', desc: "Cadres, poignées, lettrages de façade." },
    { grad: 'linear-gradient(135deg,#0D1B4B,#060E2A)', name: 'Velours marine', sub: 'Toucher profond · Bleu nuit', desc: "Assises lounge, habillages muraux VIP." },
    { grad: 'linear-gradient(135deg,#8a7a68,#6a5a48)', name: 'Verre fumé', sub: 'Teinté bronze · Transparent', desc: "Cloisons, vitrines, garde-corps." },
  ],
  comms: [
    { bg: 'linear-gradient(160deg,#060E2A,#0D1B4B 50%,#1A3060)', title: 'Affiche institutionnelle', spec: 'Nuit 50 · Bleu profond 30 · Or 20', brandText: 'COSMOS ANGRE', brandSub: '"Un monde à part"', brandSize: 22, brandWeight: 700 },
    { bg: 'linear-gradient(180deg,#060E2A 45%,#0D1B4B 100%)', title: 'Push digital / App', spec: 'Dark mode · Gradient nuit · CTA or', brandText: 'Ce soir à Cosmos —', brandSub: 'une table, un film, une nuit.' },
    { bg: '#0D1B4B', title: 'Textile staff', spec: 'Bleu nuit 85 · Or 15', brandText: 'COSMOS ANGRE', brandSub: 'STAFF', brandSize: 18, brandWeight: 700 },
  ],
  logoVariants: [
    { bg: 'var(--ebene-deep)', stroke: '#ffffff', tag: 'Version principale', name: 'Fond nuit — Référence', spec: 'Façade, en-tête, site web. Points blancs, O plein or.' },
    { bg: 'var(--fond)', stroke: '#0D1B4B', tag: 'Version fond clair', name: 'Papeterie & print', spec: 'Points bleu nuit, O plein or. Brochures ivoire.' },
    { bg: 'var(--terra)', stroke: 'rgba(242,237,227,0.9)', tag: 'Version textile staff', name: 'Broderie polo or mat', spec: 'Points ivoire sur fond or mat. O plein or.' },
    { bg: 'var(--pierre)', stroke: 'rgba(13,27,75,0.3)', tag: 'Version pierre / neutre', name: 'Signalétique intérieure', spec: 'Points atténués sur fond ivoire. Discret et raffiné.' },
    { bg: 'linear-gradient(160deg,#060E2A,var(--ebene))', stroke: '#ffffff', tag: 'Enseigne façade', name: 'Rétro-éclairée LED 3000K', spec: 'Laiton poli 80cm. Halo doré. Visible à 150m.' },
    { bg: 'var(--ebene-deep)', stroke: '#ffffff', tag: 'Carte de visite', name: '85×55mm · Coton 350g', spec: 'Dorure à chaud · Coins droits · Fond nuit abyssale' },
    { bg: '#B8AA8C', stroke: '#0D1B4B', tag: 'Sac shopping premium', name: 'Packaging boutique', spec: 'Papier texturé grège doré · Logo bleu nuit gaufré · Ruban or mat' },
    { bg: 'linear-gradient(180deg,#0D1B4B 50%,#1A3060)', stroke: '#B8924A', tag: 'Totem mall', name: 'Wayfinding intérieur', spec: 'Aluminium anodisé bleu nuit · Lettrage or mat · LED 2700K indirect' },
    { bg: '#0D1B4B', stroke: '#B8924A', tag: 'App icon', name: 'Icône mobile Cosmos', spec: 'Fond bleu nuit · Logo or simplifié · Coins arrondis iOS/Android' },
    { bg: '#FAF7F2', stroke: '#0D1B4B', tag: 'Document BEFA', name: 'En-tête officiel EXCO', spec: 'Fond ivoire · Logo bleu nuit discret · Filet or mat en bas de page' },
  ],
  parcoursRow1: [
    { border: 'var(--ebene)', step: 'Moment 01 · Arrivée', title: 'La première impression', text: "Façade nuit abyssale. Lettrage or mat rétro-éclairé. Lignes pures, marbre noir visible.", quote: '"On sait que c\'est un endroit à part."' },
    { border: 'var(--ebene)', step: 'Moment 02 · Parking', title: 'Fluidité silencieuse', text: "Sol marbre poli. Éclairage indirect 2700K. Signalétique laiton discrète. Voiturier optionnel.", quote: '"Même le parking a de la classe."' },
    { border: 'var(--terra)', step: 'Moment 03 · Entrée', title: "L'effet palace", text: "Portique marbre noir. Hauteur sous plafond 6m. Éclairage tamisé, parfum signature, musique lounge.", quote: '"On entre dans un autre monde."' },
    { border: 'var(--bronze)', step: 'Moment 04 · Hall', title: "L'effet \"destination\"", text: "Sol marbre noir veiné. Comptoir laiton poli. Velours marine. Totem digital 75\" cuivré.", quote: '"C\'est ce qui se fait de mieux à Abidjan."' },
  ],
  parcoursRow2: [
    { border: 'var(--ebene)', step: 'Moment 05 · Shopping', title: "L'écrin de nuit", text: "Galeries à 55% neutral. Murs bleu nuit subtils. Wayfinding laiton poli. Éclairage indirect.", quote: '"Les marques ont l\'air plus belles ici."' },
    { border: 'var(--terra)', step: 'Moment 06 · Restauration', title: 'Gastronomie & rooftop', text: "Restaurants gastronomiques, bar rooftop vue Cocody. Velours, laiton, verre fumé.", quote: '"Ce soir à Cosmos — une table, un film, une nuit."' },
    { border: 'var(--ebene)', step: 'Moment 07 · Fidélisation', title: "L'appartenance", text: "Programme Cosmos Club : carte Black NFC, conciergerie, accès VIP, avant-premières.", quote: '"Cosmos, c\'est mon adresse."' },
  ],
  espacesCommuns: [
    { zone: 'Allées principales', title: 'Galeries marchandes', bars: [{ w: '55%', bg: 'var(--pierre)', c: 'rgba(13,27,75,0.5)', l: '55% Neutral' }, { w: '30%', bg: 'var(--ebene)', c: 'rgba(242,237,227,0.7)', l: '30%' }, { w: '15%', bg: 'var(--terra)', c: 'rgba(242,237,227,0.8)', l: '15%' }], rules: ['Sol : marbre crème veiné', 'Murs : ivoire, accents bleu nuit', 'Piliers : marbre noir, bandeau laiton', 'Signalétique : fond bleu nuit, lettrage or mat'] },
    { zone: "Hall d'entrée", title: 'Lobby central', bars: [{ w: '45%', bg: 'var(--fond)', c: 'rgba(13,27,75,0.5)', l: '45% Ivoire' }, { w: '35%', bg: 'var(--ebene)', c: 'rgba(242,237,227,0.7)', l: '35%' }, { w: '20%', bg: 'var(--terra)', c: 'rgba(242,237,227,0.8)', l: '20%' }], rules: ['Sol : marbre noir veiné', 'Comptoir : laiton poli + marbre', 'Assises : velours marine', 'Éclairage : indirect 2700K'] },
    { zone: 'Espaces verts & terrasse', title: 'Zones lounge', bars: [{ w: '50%', bg: 'var(--pierre)', c: 'rgba(13,27,75,0.5)', l: '50%' }, { w: '30%', bg: 'var(--kaki)', c: 'rgba(242,237,227,0.7)', l: '30% Bleu' }, { w: '20%', bg: 'var(--terra)', c: 'rgba(242,237,227,0.8)', l: '20%' }], rules: ['Mobilier : laiton poli, verre fumé', 'Assises : velours marine, coussins or', 'Végétation contrôlée et sculpturale', 'Éclairage : bougies + projecteurs 2700K'] },
    { zone: 'Parking & accès', title: 'Infrastructure service', bars: [{ w: '75%', bg: '#c8c0b4', c: 'rgba(13,27,75,0.5)', l: '75% Béton poli' }, { w: '15%', bg: 'var(--ebene)', c: 'rgba(242,237,227,0.7)', l: '15%' }, { w: '10%', bg: 'var(--terra)', c: 'rgba(242,237,227,0.8)', l: '10%' }], rules: ['Structure : béton poli gris clair', 'Accents : bandes bleu nuit', 'Signalétique : aluminium anodisé noir', 'Totem : laiton poli rétro-éclairé'] },
  ],
  risksVigilance: [
    "Risque d'aliéner la base client Cocody qui veut du premium accessible au quotidien.",
    "Pression sur la qualité des enseignes — si une enseigne moyenne s'installe, l'image globale souffre.",
    "Le positionnement \"destination\" implique un taux de visite plus faible mais un panier moyen plus élevé.",
    "Les matériaux nobles (marbre, laiton poli) exigent un entretien constant et coûteux.",
  ],
  risksAdvantages: [
    "Positionnement unique à Abidjan — aucun concurrent ne peut revendiquer le même territoire.",
    "Attire les enseignes internationales premium qui cherchent un écrin à la hauteur de leur marque.",
    "Panier moyen supérieur : clientèle CSP++ qui dépense plus par visite.",
    "L'image \"destination\" génère du trafic régional (hors Cocody) et du tourisme d'affaires.",
  ],
  risksLeftTitle: 'Points de vigilance',
  risksRightTitle: 'Avantage stratégique',
  brandRules: [
    { rule: 'Bleu Profond #1A3060 et Bleu Nuit #0D1B4B ne doivent jamais être côte à côte sans séparateur neutre.' },
    { rule: 'Blanc Chaud et Ivoire ne doivent jamais être utilisés simultanément sur le même support.' },
    { rule: 'Bleu Nuit #0D1B4B INTERDIT en façade extérieure (dégradation UV 18-24 mois). Réservé caisson enseigne LED.' },
    { rule: 'Bardage façade = aluminium nervuré mat Grège Doré #B8AA8C (réalité chantier confirmée).' },
  ],
  focusGroupQuestions: [
    { question: 'Le concept "Un monde à part" est-il perçu comme aspirationnel ou comme exclusif/excluant pour le résident d\'Angré ?' },
    { question: 'Le protocole de lancement progressif (3 phases/signatures) est-il crédible ou crée-t-il une impression d\'inachevé ?' },
    { question: 'Le Sol Cosmos (terrazo scintillant) contribue-t-il à l\'impression "destination" ou est-il en contradiction avec le positionnement marbre/laiton ?' },
  ],
  finaleQuote: ['Un monde', 'à part.'],
  finaleSub: "Brand & Tenant Master Book · Scénario B · Destination Premium",
};

/* ══════════════════════════════════════════
   SCENARIO D — Nature Contemporaine
   ══════════════════════════════════════════ */

const contentD: SmbContent = {
  scenarioLabel: 'Nature Contemporaine',
  heroQuote: "Ici, on vit",
  heroQuoteHighlight: 'quelque chose.',
  uspStatement: "Cosmos Angré est le premier centre commercial à Cocody où la nature structure l'expérience d'achat.",
  uspHighlight: "le premier centre commercial",
  uspNote: "Le positionnement Nature Contemporaine repose sur un seul actif physique irréplicable : la végétation mature. Budget paysagiste intégré + entretien annuel = ligne budgétaire protégée dans le business plan.",
  uspPrerequisites: [
    { text: 'Végétation visible et dense dès le portique d\'entrée' },
    { text: 'Éclairage 2700K partout — un éclairage froid tue la végétation visuellement' },
    { text: 'Terrasse food court végétalisée opérationnelle au soft opening' },
    { text: 'Hauteur sous plafond hall confirmée avec architecte (double hauteur requise pour l\'effet "wow")' },
  ],
  uspPillars: [
    { color: 'var(--bronze)', title: "L'art de prendre son temps", desc: "On y vient exprès, on y passe la journée, on y revient le week-end suivant." },
    { color: 'var(--terra)', title: 'Aspiration inclusive', desc: "Premium accessible. La CSP+ élargie se retrouve dans un cadre qui élève le quotidien." },
    { color: 'var(--kaki)', title: 'Identité africaine', desc: "Palette, matières, végétation tropicale. Le premier mall avec une âme visuelle africaine assumée." },
    { color: 'var(--gris-chaud)', title: 'Unique par nature', desc: "Ce que la nature construit en 5 ans, personne ne le copie en 5 mois." },
  ],
  kapferer: [
    { num: '01', facette: 'Physique', title: "L'écrin qui fait vendre", desc: "Façade aluminium nervuré mat Peau Cosmos (#B8AA8C), Sol Cosmos terrazo granito scintillant, Kutu Baffle noyer fumé en têtes de mur, pierre kaki, laiton doré, végétation structurante. Le Sol Cosmos (terrazo granito + éclats) scintille comme une constellation sous l'éclairage zénithal — la nature et le cosmos se rencontrent dans la dalle.", yes: ['Végétal','Sensoriel','Cosmique'], no: ['Béton brut'] },
    { num: '02', facette: 'Personnalité', title: "Le mall qui a une âme — dynamique, accueillant, magistral", desc: "Dynamique, accueillant, jamais ennuyeux. Il y a toujours quelque chose à voir, à faire, à vivre à Cosmos Angré.", yes: ['Dynamique','Stylé'], no: ['Monotone'] },
    { num: '03', facette: 'Culture', title: "L'excellence ivoirienne", desc: "Cocody mérite le meilleur. Cosmos Angré prouve que l'Afrique peut créer des centres commerciaux qui rivalisent avec les grands malls mondiaux. La végétation de Cosmos Angré suit le même ordre naturel que les corps célestes — elle croît, elle s'impose, elle devient irremplaçable.", yes: ['Fierté','Excellence','Cosmique'] },
    { num: '04', facette: 'Relation', title: 'Le rendez-vous de la semaine', desc: "Courses le mardi. Sortie restaurant le vendredi soir. Cinéma le samedi. Shopping le dimanche. Cosmos s'intègre dans le rythme de vie.", yes: ['Habitude','Rendez-vous'] },
    { num: '05', facette: 'Reflet', title: 'La clientèle qui réussit', desc: "CSP+ Cocody élargi — cadres, entrepreneurs, familles aisées, jeunes actifs. Unis par le goût de la qualité et la fierté de bien vivre.", yes: ['CSP+','Familles','Actifs'] },
    { num: '06', facette: 'Mentalisation', title: '"Je suis quelqu\'un qui va à Cosmos"', desc: "Fréquenter Cosmos Angré est un marqueur social positif. Ce n'est pas de l'ostentation — c'est du goût.", yes: ['Statut social','Goût'], no: ['Snobisme'] },
  ],
  persona: {
    prenom: 'Bintou / Éric', age: '30-45 ans', profession: 'Cadre, professionnel indépendant, famille biactive',
    quartier: 'Angré, Riviera 2, Cocody',
    frustration: "Je veux un endroit agréable pour sortir en famille sans traverser Abidjan — et sans me retrouver dans un endroit qui ressemble à un marché.",
    ligneRouge: "Désordre, bruit, absence de verdure et de fraîcheur",
  },
  values: [
    { color: 'var(--bronze)', title: "Expérience d'achat premium", desc: "Chaque visite est une sortie, pas une corvée. Le contexte végétal met le client en disposition d'achat positive." },
    { color: 'var(--kaki)', title: 'Destination, pas transit', desc: "Les visiteurs ne passent pas — ils restent. Restauration, cinéma, shopping, événements : le panier moyen augmente avec la durée de visite." },
    { color: 'var(--gris-chaud)', title: 'Qualité visible & affirmée', desc: "Le laiton, la pierre, le végétal ne sont pas du décor. Ce sont des marqueurs de qualité immédiatement lisibles par la cible CSP+." },
    { color: 'var(--gris-chaud)', title: 'Ancrage communautaire', desc: "Cosmos Angré appartient à Cocody. Événements locaux, marques ivoiriennes en vitrine, célébrations de la réussite africaine." },
  ],
  toneExamples: [
    { label: 'Ouverture · Affichage', quote: '"Cocody vient de changer d\'adresse."', tone: 'Court · Direct · Exclusivité géographique' },
    { label: 'Weekend · Digital', quote: '"Ce samedi, venez vivre Cosmos."', tone: 'Invitation · Verbe d\'action · Expérientiel' },
    { label: 'Institutionnel', quote: '"Cosmos Angré — où la nature et l\'univers se rejoignent."', tone: 'ADN cosmique · Poétique' },
    { label: 'Réseaux sociaux', quote: '"Chaque arbre, une constellation. Chaque visite, une orbite."', tone: 'Digital · Poétique · Cosmique' },
  ],
  signatureMain: { text: '"Ici, on vit ', highlight: 'quelque chose."', sub: 'Niveau 1 · Permanente · Partagée avec Scénario C (Niveau 3) — tester en focus group quelle association (Nature D vs Hospitalité C) est la plus forte' },
  signatureAlts: [
    { text: '"Cocody vient de changer d\'adresse."', sub: 'Niveau 2 · Inauguration · 3 semaines autour du soft opening · Signature de lancement principale' },
    { text: '"Ce samedi, venez vivre Cosmos."', sub: 'Niveau 3 · Digital · Plus actionnable que "Le meilleur de Cocody sous un même toit" (éliminée)' },
    { text: '"Cosmos, mon jardin."', sub: 'Niveau 4 · Fidélisation · Remplace "Cosmos, c\'est mon endroit" (non propriétaire au D). Active la dimension végétale.' },
  ],
  paletteBar: [
    { w: '6%', bg: 'var(--blanc-chaud)', c: 'rgba(61,74,42,0.4)' },
    { w: '32%', bg: 'var(--fond)', c: 'rgba(61,74,42,0.4)' },
    { w: '14%', bg: 'var(--pierre)', c: 'rgba(61,74,42,0.5)' },
    { w: '20%', bg: 'var(--terra)', c: 'rgba(245,240,228,0.9)' },
    { w: '12%', bg: 'var(--bronze)', c: 'rgba(61,74,42,0.8)' },
    { w: '8%', bg: 'var(--kaki)', c: 'rgba(245,240,228,0.9)' },
    { w: '8%', bg: 'var(--ebene-deep)', c: 'rgba(245,240,228,0.7)' },
  ],
  paletteColors: [
    { bg: 'var(--fond)', role: 'Dominant · 28%', name: 'Pierre Beige', hex: '#E5DECC', where: 'Sols allées, murs galeries, hall — le socle minéral. Compatible terrazo granito fond #D4C9B0.' },
    { bg: '#D4C9B0', role: 'Sol · Actif signature', name: 'Sol Cosmos', hex: '#D4C9B0', where: 'Terrazo granito fond beige + éclats clairs — actif sensoriel à revendiquer dans le Brand Book.' },
    { bg: '#B8AA8C', role: 'Façade · 70%', name: 'Peau Cosmos', hex: '#B8AA8C', where: 'Bardage aluminium nervuré mat. Façade extérieure — première impression à 150m.' },
    { bg: 'var(--terra)', role: 'Signature · 15%', name: 'Kaki Végétal', hex: '#898D5D', where: 'Accents archi, textile staff, logo. RÈGLE : jamais côte à côte avec Mousse sans séparateur Pierre Beige. Interdit aux enseignes en vitrine.' },
    { bg: '#7A5C42', role: 'Architectural · 3%', name: 'Kutu Baffle', hex: '#7A5C42', where: 'Noyer fumé. Têtes de mur — détail architectural commun aux 4 scénarios.' },
    { bg: 'var(--pierre)', role: 'Neutre clair · 10%', name: 'Ivoire Chaud', hex: '#F5F0E4', where: 'Contre-fonds, transitions, zones de respiration' },
    { bg: 'var(--bronze)', role: 'Or vif · 12%', name: 'Or Soleil', hex: '#D4A843', where: 'Signalétique, lettrage totem, CTA. Couleur de signal extérieur prioritaire. Surface min recommandée : 25% de l\'enseigne principale.' },
    { bg: 'var(--kaki)', role: 'Végétal · 5%', name: 'Mousse', hex: '#6B7A4A', where: 'Jardinières, bandes, événements. RÈGLE : jamais côte à côte avec Kaki Végétal sans séparateur.' },
    { bg: '#2C3E6B', role: 'Institutionnel Cosmique · 3%', name: 'Nuit Végétale', hex: '#2C3E6B', where: 'Pantone 2757 C. Carte Cosmos Club Gold, dark mode digital, documents EXCO. Ancre nocturne institutionnelle.' },
    { bg: 'var(--blanc-chaud)', role: 'Neutre pur · 4%', name: 'Blanc Pur', hex: '#FAFAF6', where: 'Plafonds, transitions, zones calmes' },
  ],
  proportions: [
    { title: 'Espaces physiques intérieurs', sub: 'Allées, galeries, hall — ce que voit le visiteur', bars: [{w:'60%',bg:'var(--fond)',c:'rgba(61,74,42,0.5)',l:'60%'},{w:'25%',bg:'var(--terra)',c:'rgba(245,240,228,0.9)',l:'25%'},{w:'15%',bg:'var(--bronze)',c:'rgba(61,74,42,0.8)',l:'15%'}], legend: [{dot:'var(--fond)',l:'Pierre beige — socle minéral',p:'60%'},{dot:'var(--terra)',l:'Kaki signature',p:'25%'},{dot:'var(--bronze)',l:'Or soleil — signalétique',p:'15%'}] },
    { title: 'Communication & marketing', sub: 'Affiches, panneaux, réseaux sociaux, SMS', bars: [{w:'45%',bg:'var(--ebene-deep)',c:'rgba(245,240,228,0.6)',l:'45%'},{w:'30%',bg:'var(--terra)',c:'rgba(245,240,228,0.9)',l:'30%'},{w:'25%',bg:'var(--bronze)',c:'rgba(61,74,42,0.8)',l:'25%'}], legend: [{dot:'var(--ebene-deep)',l:'Forêt nuit — fond impactant',p:'45%'},{dot:'var(--terra)',l:'Kaki — identité signature',p:'30%'},{dot:'var(--bronze)',l:'Or soleil — CTA & titres',p:'25%'}] },
    { title: 'Façade extérieure', sub: 'Première impression — visible à 150 m', bars: [{w:'70%',bg:'#B8AA8C',c:'rgba(61,74,42,0.5)',l:'70%'},{w:'5%',bg:'var(--terra)',c:'rgba(245,240,228,0.9)',l:'5%'},{w:'25%',bg:'var(--bronze)',c:'rgba(61,74,42,0.8)',l:'25%'}], legend: [{dot:'#B8AA8C',l:'Peau Cosmos — bardage alu grège doré',p:'70%'},{dot:'var(--terra)',l:'Kaki — accents ponctuels',p:'5%'},{dot:'var(--bronze)',l:'Or Soleil — enseigne prioritaire, signal 150m',p:'25%'}] },
    { title: 'Textile & collection de marque', sub: 'Uniformes staff, goodies, packaging', bars: [{w:'75%',bg:'var(--terra)',c:'rgba(245,240,228,0.9)',l:'75%'},{w:'25%',bg:'var(--bronze)',c:'rgba(61,74,42,0.8)',l:'25%'}], legend: [{dot:'var(--terra)',l:'Kaki dominant',p:'75%'},{dot:'var(--bronze)',l:'Or broderies & logos',p:'25%'}] },
  ],
  typoSections: [
    { label: "Cormorant Garamond 700 · H1 Prestige", fontFamily: "'Cormorant Garamond',serif", fontSize: 52, fontWeight: 700, color: 'var(--ebene)', example: ['Vivez', 'Cosmos'], desc: 'Titres campagne, façade, affichage grand format.' },
    { label: "Cormorant Garamond Italic · Signature", fontFamily: "'Cormorant Garamond',serif", fontSize: 52, fontWeight: 400, fontStyle: 'italic', color: 'var(--bronze)', example: ['on vit', 'quelque chose'], desc: 'Slogans, citations, accroche événementielle.' },
    { label: "Inter SemiBold 600 · UI & Signalétique", fontFamily: "'Inter',sans-serif", fontSize: 28, fontWeight: 600, color: 'var(--ebene)', example: ['COSMOS ANGRÉ', 'COCODY'], desc: 'Totems, signalétique, navigation, labels UI, CTA.' },
    { label: "Inter Regular 400 · Corps de texte", fontFamily: "'Inter',sans-serif", fontSize: 12, fontWeight: 400, color: 'rgba(61,74,42,0.6)', example: ['Premier centre commercial premium de Cocody.', 'Une expérience de shopping complète, dans un cadre végétal sans équivalent.'], desc: 'Descriptions, body text. Min 9px écran / 7pt print.' },
  ],
  materials: [
    { grad: 'linear-gradient(135deg,#B8AA8C,#9a8e74)', name: 'Peau Cosmos', sub: 'Aluminium nervuré mat #B8AA8C', desc: "Façade extérieure — première impression à 150m." },
    { grad: 'linear-gradient(135deg,#7A5C42,#3D2A1A)', name: 'Kutu Baffle noyer fumé', sub: 'Têtes de mur #7A5C42', desc: "Détail architectural signature." },
    { grad: 'linear-gradient(135deg,#A85430,#C47850)', name: 'Terracotta bichrome', sub: 'TEJA RAL 040 40 60 + IGNERO RAL 040 50 40', desc: "Murs accent — deux références RAL confirmées sur chantier." },
    { grad: 'linear-gradient(135deg,#D4C9B0,#c4b89a)', name: 'Sol Cosmos', sub: 'Terrazo granito fond beige + éclats', desc: "Actif sensoriel signature — constellation au sol sous éclairage zénithal." },
    { grad: 'linear-gradient(135deg,#898D5D,#6B7A4A)', name: 'Pierre kaki texturée', sub: 'Grès cérame local', desc: 'Totems, sols allées centrales.' },
    { grad: 'linear-gradient(135deg,#D4A843,#a88028)', name: 'Laiton brossé doré', sub: 'Finition satin mat', desc: 'Lettrage totems, poignées, luminaires.' },
    { grad: 'linear-gradient(135deg,#2A3320,#1C2215)', name: 'Bois de wengé', sub: 'Grain africain huilé', desc: "Mobilier accueil, comptoirs, cadres." },
    { grad: 'linear-gradient(135deg,#E5DECC,#d4ccb8)', name: 'Pierre beige naturelle', sub: 'Calcaire poli adouci', desc: 'Sols hall, murs galeries.' },
  ],
  comms: [
    { bg: 'linear-gradient(160deg,#1C2215,#2A3320 50%,#898D5D)', title: 'Affiche grand format', spec: '4×3m · Abris-bus · Routage · OOH Cocody — Forêt 45 · Kaki 30 · Or 25', brandText: 'COSMOS ANGRÉ', brandSub: '"Ici, on vit\\nquelque chose."', brandSize: 11 },
    { bg: 'linear-gradient(180deg,#2A3320 40%,#898D5D 100%)', title: 'Push digital / Stories', spec: 'Instagram · WhatsApp · SMS — Header forêt · Gradient kaki · Or CTA', brandText: 'COSMOS ANGRÉ', brandSub: 'Ce samedi —\\nvenez vivre Cosmos.', brandSize: 10 },
    { bg: '#898D5D', title: 'Textile staff', spec: 'Polo kaki 75 · Or broderies 25', brandText: 'COSMOS ANGRÉ', brandSize: 20, brandWeight: 700 },
  ],
  logoVariants: [
    { bg: 'var(--ebene-deep)', stroke: '#ffffff', tag: 'Version principale', name: 'Fond forêt nuit', spec: 'Enseigne façade, site web, communication principale. Points blancs · O plein kaki · "ANGRÉ" or.' },
    { bg: 'var(--fond)', stroke: '#3D4A2A', tag: 'Version fond clair', name: 'Papeterie & documents', spec: 'Brochures, en-tête, lettres enseignes. Points forêt · O kaki · Or.' },
    { bg: 'var(--terra)', stroke: 'rgba(245,240,228,0.9)', tag: 'Version textile staff', name: 'Broderie polo kaki', spec: 'Points ivoire sur fond kaki · O plein or · "ANGRÉ" or.' },
    { bg: 'var(--pierre)', stroke: 'rgba(61,74,42,0.35)', tag: 'Signalétique intérieure', name: 'Fond pierre verte', spec: 'Panneaux allées, directions intérieures. Discret, élégant.' },
    { bg: 'linear-gradient(150deg,#1C2215,#2A3320)', stroke: '#ffffff', tag: 'Enseigne façade LED', name: 'Rétro-éclairée 2700K', spec: 'Aluminium laqué 80cm. Or lumineux visible à 150m.' },
    { bg: 'var(--ebene-deep)', stroke: '#ffffff', tag: 'Carte Cosmos Club Gold', name: 'Programme fidélité mall', spec: 'PVC métallisé · NFC · Dorure or à chaud · Numérotée' },
    { bg: '#B8AA8C', stroke: '#3D4A2A', tag: 'Sac shopping éco', name: 'Packaging boutique', spec: 'Kraft recyclé grège doré · Logo kaki-forêt · Poignées coton bio' },
    { bg: 'linear-gradient(180deg,#3D4A2A 50%,#5A6B3C)', stroke: '#F5F0E4', tag: 'Totem mall', name: 'Wayfinding intérieur', spec: 'Aluminium laqué kaki · Pictogrammes ivoire · Éclairé LED 2700K' },
    { bg: '#3D4A2A', stroke: '#C9943A', tag: 'App icon', name: 'Icône mobile Cosmos', spec: 'Fond kaki-forêt · Logo or simplifié · Coins arrondis iOS/Android' },
    { bg: '#F5F0E4', stroke: '#3D4A2A', tag: 'Document BEFA', name: 'En-tête officiel EXCO', spec: 'Fond ivoire · Logo kaki discret · Filet or + vert en bas de page' },
  ],
  parcoursRow1: [
    { border: 'var(--ebene)', step: 'Moment 01 · Arrivée', title: 'Le signal qui fait venir', text: "Totem kaki visible à 150m depuis la voie principale. Lettrage or. Végétation en façade. Panneau \"OUVERT\" dynamique LED.", quote: '"Il y a quelque chose là-bas."' },
    { border: 'var(--ebene)', step: 'Moment 02 · Parking', title: 'Sans friction', text: "3 niveaux, totem statut temps réel. Bandes guidage or au sol. Éclairage 2700K chaud. Bacs végétaux entre rangées.", quote: '"Facile. Je repars pas frustré."' },
    { border: 'var(--terra)', step: 'Moment 03 · Entrée', title: "L'effet seuil mall", text: "Portique kaki, logo or rétro-éclairé. Changement immédiat : fraîcheur climatisée, lumière zénithale, odeur signature.", quote: '"Tu rentres et tu oublies la chaleur dehors."' },
    { border: 'var(--bronze)', step: 'Moment 04 · Hall', title: "L'effet \"wow\" du mall", text: "Hall double hauteur, végétation structurante. Totem digital 75\" interactif. Cosmos Club desk. Plan du mall clair et lisible.", quote: '"C\'est grand. C\'est beau. Je veux tout voir."' },
  ],
  parcoursRow2: [
    { border: 'var(--ebene)', step: 'Moment 05 · Shopping', title: "L'écrin qui fait vendre", text: "Galeries 65% ivoire-neutre. Chaque enseigne mise en valeur. Wayfinding or. Bancs wengé tous les 30m. Végétation en jardinières.", quote: '"Je vois tout. J\'ai envie d\'entrer partout."' },
    { border: 'var(--terra)', step: 'Moment 06 · Restauration', title: 'On reste plus longtemps', text: "Food court N2 + terrasse jardin. Tables wengé, chaises lin. Vue sur végétation intérieure. Cinéma accessible en 2 min.", quote: '"On mange, on reste, on repart faire un tour."' },
    { border: 'var(--ebene)', step: 'Moment 07 · Cosmos Club', title: 'Le lien qui fidélise', text: "Carte Gold NFC. Points cumulés sur tous les achats mall. Accès avant-premières cinéma. Push SMS personnalisés.", quote: '"Cosmos, c\'est mon mall."' },
  ],
  espacesCommuns: [
    { zone: 'Allées principales', title: 'Galeries marchandes', bars: [{ w: '65%', bg: 'var(--fond)', c: 'rgba(61,74,42,0.5)', l: '65% Pierre' }, { w: '22%', bg: 'var(--terra)', c: 'rgba(245,240,228,0.8)', l: '22%' }, { w: '13%', bg: 'var(--bronze)', c: 'rgba(61,74,42,0.8)', l: '13%' }], rules: ['Sol : pierre beige polie', 'Murs : pierre beige naturelle', 'Piliers : pierre kaki, bandeau or en tête', 'Signalétique : fond pierre beige, lettrage or'] },
    { zone: "Hall d'entrée", title: 'Accueil central', bars: [{ w: '55%', bg: 'var(--fond)', c: 'rgba(61,74,42,0.5)', l: '55% Pierre' }, { w: '25%', bg: 'var(--terra)', c: 'rgba(245,240,228,0.8)', l: '25%' }, { w: '20%', bg: 'var(--bronze)', c: 'rgba(61,74,42,0.8)', l: '20%' }], rules: ['Sol : pierre beige naturelle', 'Comptoir : bois wengé + laiton doré', 'Végétation : palmiers & fougères structurantes', 'Éclairage : 2700K zénithal'] },
    { zone: 'Espaces verts & terrasse', title: 'Zones végétales', bars: [{ w: '45%', bg: 'var(--pierre)', c: 'rgba(61,74,42,0.5)', l: '45%' }, { w: '35%', bg: 'var(--kaki)', c: 'rgba(245,240,228,0.8)', l: '35% Mousse' }, { w: '20%', bg: 'var(--bronze)', c: 'rgba(61,74,42,0.8)', l: '20%' }], rules: ['Jardinières : grès kaki texturé', 'Mobilier : bois wengé, coussins lin naturel', 'Végétation tropicale dense structurante', 'Éclairage : projecteurs 2700K encastrés'] },
    { zone: 'Parking & accès', title: 'Infrastructure service', bars: [{ w: '75%', bg: '#c8c0b4', c: 'rgba(61,74,42,0.5)', l: '75% Béton clair' }, { w: '15%', bg: 'var(--terra)', c: 'rgba(245,240,228,0.8)', l: '15%' }, { w: '10%', bg: 'var(--bronze)', c: 'rgba(61,74,42,0.8)', l: '10%' }], rules: ['Structure : béton clair', 'Bandes de guidage : or au sol', 'Signalétique : aluminium laqué forêt nuit', 'Totem : statut temps réel LED mousse/or/rouge'] },
  ],
  risksVigilance: [
    "La végétation structurante nécessite un budget entretien permanent et un paysagiste intégré à l'équipe mall.",
    "Le kaki comme couleur signature est moins immédiatement \"premium\" que le noir ou le bleu nuit — dépend de la qualité d'exécution.",
    "L'éclairage 2700K partout peut assombrir les allées si la hauteur sous plafond est insuffisante.",
    "La palette végétale suppose un renouvellement saisonnier — budget plantes à intégrer au Capex.",
  ],
  risksAdvantages: [
    "Identité visuelle unique et inimitable à court terme — la végétation mature prend 5 ans minimum.",
    "Le cadre végétal augmente le temps de visite moyen (+25% vs malls standard) et donc le panier moyen.",
    "L'or vif en signalétique maximise la visibilité commerciale et le drive-to-store depuis la route.",
    "L'image \"nature premium\" attire à la fois les enseignes internationales et les marques locales de qualité.",
  ],
  risksLeftTitle: 'Points de vigilance',
  risksRightTitle: 'Avantage stratégique',
  brandRules: [
    { rule: 'Kaki Végétal #898D5D et Mousse #6B7A4A ne doivent jamais être côte à côte sans séparateur Pierre Beige.' },
    { rule: 'Interdire aux enseignes l\'utilisation du kaki sauge en vitrine.' },
    { rule: 'Or Soleil #D4A843 = couleur de signal extérieur prioritaire. Surface min : 25% de l\'enseigne principale.' },
    { rule: 'Bardage façade = Peau Cosmos aluminium nervuré mat #B8AA8C (réalité chantier confirmée).' },
  ],
  focusGroupQuestions: [
    { question: '"Ici, on vit quelque chose" — cette signature est-elle plus forte associée à la nature (D) ou à l\'hospitalité (C) ?' },
    { question: '"Cosmos, mon jardin" — cette signature active-t-elle la dimension végétale ou paraît-elle trop intime ?' },
    { question: 'Le concept de végétation structurante comme différenciateur premium est-il crédible dès l\'ouverture ou nécessite-t-il 2-3 ans de maturation ?' },
  ],
  finaleQuote: ['Ici, on vit', 'quelque chose.'],
  finaleSub: 'Brand & Tenant Master Book · Nature Contemporaine · Mall Premium Végétal',
};

/* ── Export ── */
export const smbContent: Record<ScenarioKey, SmbContent> = {
  A: contentA,
  B: contentB,
  C: contentC,
  D: contentD,
};
