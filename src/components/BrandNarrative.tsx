import React from 'react';
import { Check, X } from 'lucide-react';
import type { ScenarioKey } from './Scenarios';

/* ── Données par scénario ── */
const narratives: Record<ScenarioKey, { pourquoi: string; promesse: string; manifeste: string[] }> = {
  A: {
    pourquoi:
      'Le cosmos, c\'est l\'univers — vaste, pluriel, vibrant. À Angré, quartier de vie par excellence, nous avons voulu un lieu qui reflète cette richesse. Cosmos Angré n\'est pas un centre commercial de plus : c\'est la place du village réinventée, où l\'art de vivre ivoirien trouve son expression la plus contemporaine. Chaque allée est une rue, chaque enseigne est un voisin, chaque visite est une rencontre.',
    promesse:
      'Un lieu enraciné dans la culture locale, ouvert sur le monde. Cosmos Angré sublime le quotidien des familles d\'Angré en réunissant sous un même toit le meilleur du commerce, de la gastronomie et du lien social — dans un écrin chaleureux qui sent bon le beurre de karité et le bois d\'iroko.',
    manifeste: [
      'Ici, on ne consomme pas — on vit.',
      'Ici, le wax côtoie le cachemire, le garba rencontre le sushi.',
      'Ici, chaque détail raconte une histoire : celle d\'un quartier qui monte, d\'une génération qui ose.',
      'Cosmos Angré, c\'est l\'Afrique qui se célèbre — sans filtre, sans complexe, sans compromis.',
      'Bienvenue chez vous.',
    ],
  },
  B: {
    pourquoi:
      'Le cosmos évoque l\'infini, les étoiles, la quête de l\'exceptionnel. Cosmos Angré naît de cette ambition : offrir à Abidjan une destination shopping à la hauteur de ses aspirations internationales. Pas un mall — un astre. Un lieu où chaque enseigne brille de sa propre lumière dans une constellation soigneusement orchestrée.',
    promesse:
      'L\'excellence du retail international, ancrée au cœur d\'Abidjan. Cosmos Angré élève chaque visite au rang d\'expérience : architecture signature, service irréprochable, sélection d\'enseignes premium — le tout dans un environnement qui rivalise avec les meilleures destinations shopping du continent.',
    manifeste: [
      'Dans un monde qui va vite, nous créons des moments qui restent.',
      'Chaque surface polie, chaque lumière tamisée, chaque note de musique est pensée pour vous.',
      'Le luxe n\'est pas ostentatoire — il est évident.',
      'Cosmos Angré : là où Abidjan rencontre le monde.',
      'L\'étoile du shopping est née.',
    ],
  },
  C: {
    pourquoi:
      'Le cosmos est à la fois nature et mystère — galaxies végétales, nébuleuses de couleurs, écosystèmes interconnectés. L\'Exception Naturelle naît de cette vision : un lieu où la végétation luxuriante d\'Angré fusionne avec une architecture audacieuse pour créer quelque chose que personne n\'a jamais vu à Abidjan. Ni mall, ni jardin — un organisme vivant.',
    promesse:
      'Une expérience sensorielle unique où nature et commerce se subliment mutuellement. Cosmos Angré repousse les limites du retail en créant un environnement immersif où chaque visite est une découverte — des canopées végétales aux façades bioclimatiques, du parfum de vétiver aux sons de fontaines.',
    manifeste: [
      'Nous ne construisons pas un centre — nous faisons pousser un écosystème.',
      'Ici, les racines sont aussi profondes que les ambitions sont hautes.',
      'La nature n\'est pas un décor — elle est notre architecte.',
      'Cosmos Angré : là où l\'exceptionnel pousse naturellement.',
      'Entrez. Respirez. Émerveillez-vous.',
    ],
  },
  D: {
    pourquoi:
      'Le cosmos, dans son sens originel, signifie « ordre harmonieux ». Le Jardin des Marques incarne cette harmonie : un lieu où les enseignes poussent et s\'épanouissent comme dans un jardin soigneusement cultivé. À Angré, entre les manguiers centenaires et la vitalité urbaine, nous avons planté les graines d\'un commerce plus serein, plus vert, plus humain.',
    promesse:
      'Un havre de paix commerciale au cœur du dynamisme d\'Angré. Cosmos Angré offre une expérience d\'achat apaisante, bordée de verdure et de lumière naturelle — un jardin où l\'on vient autant pour flâner que pour acheter, où chaque saison apporte ses nouvelles floraisons d\'enseignes.',
    manifeste: [
      'Dans ce jardin, chaque marque est une fleur — unique, précieuse, cultivée avec soin.',
      'Les allées ombragées remplacent les couloirs aseptisés.',
      'Le temps ralentit, les sens s\'éveillent, le panier se remplit — naturellement.',
      'Cosmos Angré : le commerce qui prend racine.',
      'Promenez-vous. Le jardin vous attend.',
    ],
  },
};

/* ── Ton négatif (commun à tous les scénarios) ── */
const toneRules: { bad: string; good: string }[] = [
  { bad: '"Le plus grand mall d\'Abidjan"', good: '"Un univers de découvertes unique à Angré"' },
  { bad: '"Prix imbattables" / "Pas cher"', good: '"Un art de vivre accessible"' },
  { bad: '"Venez consommer"', good: '"Vivez l\'expérience Cosmos"' },
  { bad: '"Centre commercial"', good: '"Destination lifestyle"' },
  { bad: '"Clients"', good: '"Visiteurs" / "Hôtes"' },
  { bad: '"Magasins"', good: '"Enseignes" / "Maisons"' },
  { bad: '"Promotion" / "Soldes"', good: '"Temps forts" / "Éditions spéciales"' },
  { bad: '"Parking gratuit"', good: '"Accueil fluide dès votre arrivée"' },
  { bad: '"Food court"', good: '"Espace gastronomique" / "Village des saveurs"' },
  { bad: '"Sécurité renforcée"', good: '"Un environnement serein et bienveillant"' },
  { bad: '"Meilleur rapport qualité-prix"', good: '"Une sélection exigeante, pensée pour vous"' },
  { bad: '"Ouvert 7j/7"', good: '"Cosmos vous accueille chaque jour"' },
];

const accents: Record<ScenarioKey, { main: string; rgb: string }> = {
  A: { main: '#4A7558', rgb: '74,117,88' },
  B: { main: '#0D1B4B', rgb: '13,27,75' },
  C: { main: '#C9943A', rgb: '201,148,58' },
  D: { main: '#898D5D', rgb: '137,141,93' },
};

export default function BrandNarrative({ scenarioKey }: { scenarioKey: ScenarioKey }) {
  const n = narratives[scenarioKey];
  const ac = accents[scenarioKey];

  return (
    <>
      {/* ═══ A10 — BRAND NARRATIVE ═══ */}
      <section className="bg-white" id="smb-brand-narrative">
        <div className="eyebrow light">A10 · Brand Narrative</div>
        <h2 className="light">Pourquoi « Cosmos » ?</h2>
        <div className="sub">L'histoire de marque — genèse, promesse, manifeste</div>
        <div className="divider foret" />

        {/* Pourquoi */}
        <div style={{ background: `rgba(${ac.rgb},0.04)`, border: `1px solid rgba(${ac.rgb},0.15)`, padding: 44, marginBottom: 32 }}>
          <div style={{ fontSize: 9, letterSpacing: 2, textTransform: 'uppercase', color: ac.main, fontWeight: 600, marginBottom: 16 }}>L'origine du nom</div>
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 18, fontWeight: 300, color: '#1a1a2e', lineHeight: 1.7 }}>
            {n.pourquoi}
          </div>
        </div>

        {/* Promesse */}
        <div style={{ background: `rgba(${ac.rgb},0.04)`, border: `1px solid rgba(${ac.rgb},0.15)`, padding: 44, marginBottom: 32 }}>
          <div style={{ fontSize: 9, letterSpacing: 2, textTransform: 'uppercase', color: ac.main, fontWeight: 600, marginBottom: 16 }}>La promesse de marque</div>
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 16, color: '#1a1a2e', lineHeight: 1.7 }}>
            {n.promesse}
          </div>
        </div>

        {/* Manifeste */}
        <div style={{ background: '#1a1a2e', padding: '48px 44px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 20, right: 28, fontSize: 120, fontFamily: "'Cormorant Garamond',serif", color: 'rgba(255,255,255,0.03)', fontWeight: 700, lineHeight: 1 }}>M</div>
          <div style={{ fontSize: 9, letterSpacing: 3, textTransform: 'uppercase', color: '#C9943A', fontWeight: 600, marginBottom: 24 }}>Manifeste</div>
          {n.manifeste.map((line, i) => (
            <div key={i} style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: i === n.manifeste.length - 1 ? 22 : 17, fontStyle: 'italic', color: i === n.manifeste.length - 1 ? '#C9943A' : 'rgba(248,246,242,0.7)', lineHeight: 1.8, marginBottom: 8, fontWeight: i === n.manifeste.length - 1 ? 600 : 300 }}>
              {line}
            </div>
          ))}
        </div>
      </section>

      {/* ═══ A11 — TON NÉGATIF ═══ */}
      <section className="bg-warm" id="smb-tone-negatif">
        <div className="eyebrow light">A11 · Ton éditorial</div>
        <h2 className="light">Ce que nous ne disons jamais</h2>
        <div className="sub">Garde-fous lexicaux — le vocabulaire qui protège l'identité Cosmos</div>
        <div className="divider foret" />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, border: '1px solid rgba(0,0,0,0.08)', overflow: 'hidden' }}>
          {/* Header */}
          <div style={{ background: '#dc2626', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 8 }}>
            <X size={14} color="#fff" strokeWidth={3} />
            <span style={{ fontSize: 9, letterSpacing: 2, textTransform: 'uppercase', color: '#fff', fontWeight: 700 }}>Nous ne disons jamais</span>
          </div>
          <div style={{ background: '#16a34a', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 8 }}>
            <Check size={14} color="#fff" strokeWidth={3} />
            <span style={{ fontSize: 9, letterSpacing: 2, textTransform: 'uppercase', color: '#fff', fontWeight: 700 }}>Nous disons plutôt</span>
          </div>

          {/* Rows */}
          {toneRules.map((r, i) => (
            <React.Fragment key={i}>
              <div style={{ background: i % 2 === 0 ? 'rgba(220,38,38,0.04)' : '#fff', padding: '14px 20px', borderTop: '1px solid rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', gap: 10 }}>
                <X size={12} color="#dc2626" strokeWidth={2.5} style={{ flexShrink: 0 }} />
                <span style={{ fontSize: 11, color: '#1a1a2e', lineHeight: 1.5 }}>{r.bad}</span>
              </div>
              <div style={{ background: i % 2 === 0 ? 'rgba(22,163,74,0.04)' : '#fff', padding: '14px 20px', borderTop: '1px solid rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', gap: 10 }}>
                <Check size={12} color="#16a34a" strokeWidth={2.5} style={{ flexShrink: 0 }} />
                <span style={{ fontSize: 11, color: '#1a1a2e', lineHeight: 1.5 }}>{r.good}</span>
              </div>
            </React.Fragment>
          ))}
        </div>

        <div style={{ marginTop: 24, background: `rgba(${ac.rgb},0.06)`, border: `1px solid rgba(${ac.rgb},0.15)`, padding: '16px 24px', fontSize: 10.5, color: '#1a1a2e', lineHeight: 1.7 }}>
          <strong style={{ color: ac.main, fontSize: 9, letterSpacing: 2, textTransform: 'uppercase' }}>Règle d'or</strong>
          <div style={{ marginTop: 8 }}>Le ton Cosmos est <strong>aspirationnel sans être élitiste</strong>, <strong>premium sans être excluant</strong>. Nous parlons à des visiteurs intelligents qui méritent mieux que le jargon promotionnel. Chaque mot doit élever — jamais réduire.</div>
        </div>
      </section>
    </>
  );
}
