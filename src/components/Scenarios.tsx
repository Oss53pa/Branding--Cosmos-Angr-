import React from 'react';
import { Target, Heart, MessageSquare, AlertTriangle, Star } from 'lucide-react';

type ScenarioKey = 'A' | 'B' | 'C' | 'D';

interface ScenarioData {
  label: string;
  usp: string;
  values: { title: string; val: string }[];
  promesse: string;
  ton: string;
  risk: { label: string; text: string };
  accent: string;
  gradient: string;
}

const data: Record<ScenarioKey, ScenarioData> = {
  A: {
    label: 'Scenario A — Premium de proximite',
    usp: "Le premier centre commercial premium qui ne vous demande pas de sortir de votre quotidien pour vivre l'excellence. Cosmos Angre amene la qualite au coeur de votre vie, sans pretention, sans distance.",
    values: [
      { title: 'Proximite authentique', val: 'Premium accessible, pas elitiste. On entre sans effort.' },
      { title: 'Excellence du quotidien', val: 'La qualite comme standard, pas comme exception.' },
      { title: 'Ancrage communautaire', val: "Le lieu qui appartient a son quartier, pas a une vitrine." },
      { title: 'Modernite ivoirienne', val: "Reference locale, pas copie d'un modele occidental." },
      { title: 'Exigence invisible', val: 'Le premium se voit dans les details qu\'on ne remarque pas consciemment.' },
    ],
    promesse: '"Ici, le premium est chez vous. Pas dans un autre monde."',
    ton: "Chaleureux mais jamais banal. La sophistication passe par les actes, pas par le discours. Pensez Nespresso — pas Darty.",
    risk: {
      label: 'Risques du scenario A',
      text: "Risque de ne pas se differencier suffisamment de Yopougon. Difficulte a justifier les loyers premium aupres des enseignes. Peut etre percu comme \"pas assez ambitieux\" en interne.",
    },
    accent: '#4A7558',
    gradient: 'from-[#1a2e20] via-[#2a4a35] to-[#1a2e20]',
  },
  B: {
    label: 'Scenario B — Destination premium',
    usp: "La premiere destination premium mixed-use d'Abidjan — un lieu ou shopping, sante, culture, gastronomie et bureaux coexistent dans un ecosysteme de reference. Cosmos Angre n'est pas un mall. C'est une destination.",
    values: [
      { title: 'Destination de reference', val: "On se deplace pour Cosmos Angre, on ne le trouve pas sur son chemin." },
      { title: 'Excellence experientielle', val: 'Chaque visite est une experience complete, memorable.' },
      { title: 'Ambition regionale', val: "La reference qui rayonne au-dela d'Abidjan." },
      { title: 'Mixed-use innovant', val: "L'unique lieu ou tout coexiste : vivre, soigner, travailler, se divertir." },
      { title: 'Prestige accessible', val: "Eleve mais pas ferme. La distinction, pas l'exclusion." },
    ],
    promesse: '"Un monde a part. Le votre."',
    ton: "Inspirant, aspirationnel, confident. Le ton d'un hotel 5 etoiles qui vous accueille — chaleureux mais jamais banal. Chaque mot est choisi. Chaque communication est une invitation. Le luxe d'ici — pas une copie du luxe d'ailleurs.",
    risk: {
      label: 'Risques du scenario B',
      text: "Risque d'aliener une partie de la base client Cocody qui veut du premium accessible. Pression plus forte sur la qualite des enseignes et des services. Long delai avant que la \"destination\" soit etablie dans les habitudes.",
    },
    accent: '#0D1B4B',
    gradient: 'from-[#0d1b3e] via-[#1a3060] to-[#0d1b3e]',
  },
  C: {
    label: 'Scénario C — L\'Exception Naturelle',
    usp: "Cosmos Angré est l'endroit où l'exceptionnel devient votre quotidien. Un univers complet — destination premium, centre de vie, lieu de rencontre — pensé pour ceux qui refusent de choisir entre exigence et proximité.",
    values: [
      { title: 'Hospitalité souveraine', val: "La valeur fondatrice. L'accueil africain élevé au rang d'art — pas un service, une manière d'être. Quand il faut choisir entre protocole et humanité, l'humanité prime toujours." },
      { title: 'Élévation naturelle', val: "La valeur différenciante. La qualité qui ne s'annonce pas — elle se ressent. L'exceptionnel rendu évident, sans effort apparent, sans distance." },
      { title: 'Vie complète', val: "Du marché du matin au dîner d'anniversaire, chaque facette de la vie trouve sa place. Cosmos n'est pas un détour — c'est le centre de gravité." },
      { title: 'Singularité africaine', val: "Le meilleur des standards internationaux, enraciné dans la culture locale. Une identité visuelle et sensorielle qu'aucun concurrent ne peut répliquer." },
    ],
    promesse: '"L\'exceptionnel, au quotidien."',
    ton: "Affirmatif et chaleureux. Sophistiqué sans être distant. Le ton d'un hôte qui a confiance en ce qu'il offre — proche de ses invités, intransigeant sur ses standards. Pensez le Four Seasons d'un quartier vivant — pas le Hilton d'un aéroport.",
    risk: {
      label: 'Avantage stratégique',
      text: "Seul scénario qui capture simultanément la cible aspiration (destination premium) et la cible proximité (centre de vie quotidien). Identité terracotta non réplicable. Grille de loyers justifiée par le positionnement. Trajectoire d'élévation vers le luxe intégrée à horizon 5 ans via le programme Cosmos Club.",
    },
    accent: '#C9943A',
    gradient: 'from-[#2C1A0A] via-[#B25A38] to-[#2C1A0A]',
  },
  D: {
    label: 'Scenario D — Nature Contemporaine',
    usp: "Le premier centre commercial a Cocody ou la nature structure l'experience d'achat. Pas juste une verdure decorative — une identite architecturale totale. Le vegetal est l'identite. Le laiton est le prestige.",
    values: [
      { title: "L'art de prendre son temps", val: "On y vient expres, on y passe la journee, on y revient le week-end suivant." },
      { title: 'Aspiration inclusive', val: "Premium accessible. La CSP+ elargie se retrouve dans un cadre qui eleve le quotidien." },
      { title: 'Identite africaine', val: "Palette, matieres, vegetation tropicale. Le premier mall avec une ame visuelle africaine assumee." },
      { title: 'Unique par nature', val: "Ce que la nature construit en 5 ans, personne ne le copie en 5 mois." },
      { title: 'Ancrage communautaire', val: "Cosmos Angre appartient a Cocody. Evenements locaux, marques ivoiriennes, celebrations de la reussite africaine." },
    ],
    promesse: '"Ici, on vit quelque chose."',
    ton: "Vivant, raffine, desirable. Le ton d'Aesop — nature et premium ne s'opposent pas. Chaque communication est une invitation a venir, a rester, a revenir. Le vegetal et l'or sont le langage visuel.",
    risk: {
      label: 'Avantage strategique',
      text: "L'identite vegetale est un marqueur unique inimitable a court terme. La vegetation mature prend 5 ans, creant une barriere naturelle a la copie. L'or vif en signage maximise la visibilite commerciale et le drive-to-store.",
    },
    accent: '#898D5D',
    gradient: 'from-[#1C2215] via-[#3D4A2A] to-[#1C2215]',
  },
};

export { data as scenarioData };
export type { ScenarioKey, ScenarioData };

const sectionIcons: Record<string, React.ReactNode> = {
  usp: <Target size={14} />,
  values: <Star size={14} />,
  promesse: <Heart size={14} />,
  ton: <MessageSquare size={14} />,
  risk: <AlertTriangle size={14} />,
};

const ScenarioSection: React.FC<{ id: string; sc: ScenarioData; num: string }> = ({ id, sc, num }) => (
  <div id={id} className="px-4 sm:px-8 lg:px-[72px] pb-16">
    <div className="bg-white rounded-2xl border border-black/[.06] overflow-hidden shadow-[0_2px_20px_rgba(0,0,0,.04)]">
      {/* Hero header */}
      <div className={`relative px-8 py-8 bg-gradient-to-br ${sc.gradient} overflow-hidden`}>
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-[.04]" style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }} />
        <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-10" style={{ background: sc.accent, filter: 'blur(40px)' }} />

        <div className="relative z-10">
          <div className="text-[9px] font-bold tracking-[.2em] uppercase mb-2 text-white/50">
            Livrable 1.2{num}
          </div>
          <div className="font-cormorant text-[30px] text-white font-light leading-tight">
            {sc.label}
          </div>
          <div className="flex items-center gap-2 mt-3">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-[10px] text-white/30 tracking-wide">
              USP . Valeurs . Ton . Territoire . Promesse
            </span>
            <div className="h-px flex-1 bg-white/10" />
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* USP */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-[9px] font-bold tracking-[.2em] uppercase mb-3 pb-2 border-b" style={{ color: sc.accent, borderColor: `${sc.accent}25` }}>
            {sectionIcons.usp}
            USP — Proposition de valeur unique
          </div>
          <div className="text-[14px] text-black/70 leading-[1.8] pl-1">{sc.usp}</div>
        </div>

        {/* Values */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-[9px] font-bold tracking-[.2em] uppercase mb-4 pb-2 border-b" style={{ color: sc.accent, borderColor: `${sc.accent}25` }}>
            {sectionIcons.values}
            5 Valeurs de marque
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {sc.values.map((v, i) => (
              <div
                key={v.title}
                className="rounded-xl p-4 border border-black/[.04] hover:shadow-sm transition-shadow"
                style={{ borderLeft: `3px solid ${sc.accent}` }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold text-white" style={{ background: sc.accent }}>
                    {i + 1}
                  </div>
                  <div className="text-[12px] font-bold text-navy">{v.title}</div>
                </div>
                <div className="text-[12px] text-black/45 leading-relaxed pl-8">{v.val}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Promesse */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-[9px] font-bold tracking-[.2em] uppercase mb-3 pb-2 border-b" style={{ color: sc.accent, borderColor: `${sc.accent}25` }}>
            {sectionIcons.promesse}
            Promesse client
          </div>
          <div className="bg-cream/50 rounded-xl p-5 border border-black/[.04]">
            <div className="font-cormorant text-[22px] text-navy font-light italic leading-relaxed">
              {sc.promesse}
            </div>
          </div>
        </div>

        {/* Ton */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-[9px] font-bold tracking-[.2em] uppercase mb-3 pb-2 border-b" style={{ color: sc.accent, borderColor: `${sc.accent}25` }}>
            {sectionIcons.ton}
            Ton & voix
          </div>
          <div className="text-[14px] text-black/65 leading-[1.8] pl-1">{sc.ton}</div>
        </div>

        {/* Risk / Advantage */}
        <div>
          <div className="flex items-center gap-2 text-[9px] font-bold tracking-[.2em] uppercase mb-3 pb-2 border-b" style={{ color: sc.accent, borderColor: `${sc.accent}25` }}>
            {sectionIcons.risk}
            {sc.risk.label}
          </div>
          <div className="rounded-xl p-5 border text-[14px] leading-[1.8] bg-amber-50/50 border-amber-200/40 text-amber-800/70">
            {sc.risk.text}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Scenarios: React.FC = () => (
  <>
    <ScenarioSection id="sc-A" sc={data.A} num="a" />
    <ScenarioSection id="sc-B" sc={data.B} num="b" />
    <ScenarioSection id="sc-C" sc={data.C} num="c" />
    <ScenarioSection id="sc-D" sc={data.D} num="d" />
  </>
);

export default Scenarios;
