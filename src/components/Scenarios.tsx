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
    label: 'Scénario A — Premium de proximité',
    usp: "Le premier centre commercial premium qui ne vous demande pas de sortir de votre quotidien pour vivre l'excellence. Cosmos Angré amène la qualité au cœur de votre vie, sans prétention, sans distance.",
    values: [
      { title: 'Proximité authentique', val: 'Premium accessible, pas élitiste. On entre sans effort.' },
      { title: 'Excellence du quotidien', val: 'La qualité comme standard, pas comme exception.' },
      { title: 'Ancrage communautaire', val: "Le lieu qui appartient à son quartier, pas à une vitrine." },
      { title: 'Modernité ivoirienne', val: "Référence locale, pas copie d'un modèle occidental." },
      { title: 'Exigence invisible', val: 'Le premium se voit dans les détails qu\'on ne remarque pas consciemment.' },
    ],
    promesse: '"Ici, le premium est chez vous. Pas dans un autre monde."',
    ton: "Chaleureux mais jamais banal. La sophistication passe par les actes, pas par le discours. Pensez Nespresso — pas Darty.",
    risk: {
      label: 'Risques du scénario A',
      text: "Risque de ne pas se différencier suffisamment de Yopougon. Difficulté à justifier les loyers premium auprès des enseignes. Peut être perçu comme \"pas assez ambitieux\" en interne.",
    },
    accent: '#4A7558',
    gradient: 'from-[#1a2e20] via-[#2a4a35] to-[#1a2e20]',
  },
  B: {
    label: 'Scénario B — Destination premium',
    usp: "La première destination premium mixed-use d'Abidjan — un lieu où shopping, santé, culture, gastronomie et bureaux coexistent dans un écosystème de référence. Cosmos Angré n'est pas un mall. C'est une destination.",
    values: [
      { title: 'Destination de référence', val: "On se déplace pour Cosmos Angré, on ne le trouve pas sur son chemin." },
      { title: 'Excellence expérientielle', val: 'Chaque visite est une expérience complète, mémorable.' },
      { title: 'Ambition régionale', val: "La référence qui rayonne au-delà d'Abidjan." },
      { title: 'Mixed-use innovant', val: "L'unique lieu où tout coexiste : vivre, soigner, travailler, se divertir." },
      { title: 'Prestige accessible', val: "Élevé mais pas fermé. La distinction, pas l'exclusion." },
    ],
    promesse: '"Un monde à part. Le vôtre."',
    ton: "Inspirant, aspirationnel, confident. Le ton d'un hôtel 5 étoiles qui vous accueille — chaleureux mais jamais banal. Chaque mot est choisi. Chaque communication est une invitation. Le luxe d'ici — pas une copie du luxe d'ailleurs.",
    risk: {
      label: 'Risques du scénario B',
      text: "Risque d'aliéner une partie de la base client Cocody qui veut du premium accessible. Pression plus forte sur la qualité des enseignes et des services. Long délai avant que la \"destination\" soit établie dans les habitudes.",
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
    label: 'Scénario D — Nature Contemporaine',
    usp: "Le premier centre commercial à Cocody où la nature structure l'expérience d'achat. Pas juste une verdure décorative — une identité architecturale totale. Le végétal est l'identité. Le laiton est le prestige.",
    values: [
      { title: "L'art de prendre son temps", val: "On y vient exprès, on y passe la journée, on y revient le week-end suivant." },
      { title: 'Aspiration inclusive', val: "Premium accessible. La CSP+ élargie se retrouve dans un cadre qui élève le quotidien." },
      { title: 'Identité africaine', val: "Palette, matières, végétation tropicale. Le premier mall avec une âme visuelle africaine assumée." },
      { title: 'Unique par nature', val: "Ce que la nature construit en 5 ans, personne ne le copie en 5 mois." },
      { title: 'Ancrage communautaire', val: "Cosmos Angré appartient à Cocody. Événements locaux, marques ivoiriennes, célébrations de la réussite africaine." },
    ],
    promesse: '"Ici, on vit quelque chose."',
    ton: "Vivant, raffiné, désirable. Le ton d'Aesop — nature et premium ne s'opposent pas. Chaque communication est une invitation à venir, à rester, à revenir. Le végétal et l'or sont le langage visuel.",
    risk: {
      label: 'Avantage stratégique',
      text: "L'identité végétale est un marqueur unique inimitable à court terme. La végétation mature prend 5 ans, créant une barrière naturelle à la copie. L'or vif en signage maximise la visibilité commerciale et le drive-to-store.",
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
