import React from 'react';
import type { ScenarioKey } from './Scenarios';
import { hexRgba } from './colorUtils';

interface ScColors { primary: string; dark: string; accent: string; secondary: string; light: string; }
const sc: Record<ScenarioKey, ScColors> = {
  A: { primary: '#2F5439', dark: '#1A1410', accent: '#C9943A', secondary: '#F2EBDD', light: '#76764D' },
  B: { primary: '#0D1B4B', dark: '#060E2A', accent: '#B8924A', secondary: '#F2EBDD', light: '#1A3060' },
  C: { primary: '#B25A38', dark: '#2C1A0A', accent: '#C9943A', secondary: '#F2EBDD', light: '#6D7447' },
  D: { primary: '#898D5D', dark: '#1C2215', accent: '#D4A843', secondary: '#F5F0E4', light: '#6B7A4A' },
};

/* ── Persona data ── */
interface Persona {
  name: string;
  age: number;
  title: string;
  quartier: string;
  profession: string;
  journee: string;
  frustration: string;
  attente: string;
  ligneRouge: string;
  signaturePref: string;
  signatureReason: string;
  momentCosmos: string;
}

const personas: Persona[] = [
  {
    name: 'Awa Koné',
    age: 42,
    title: 'Le Pilier du Quartier',
    quartier: 'Angré 8e Tranche',
    profession: 'Directrice administrative, groupe agro-industriel',
    journee: "École des enfants à 7h, bureau à Plateau jusqu'à 17h, courses en rentrant. Le samedi : coiffeur, déjeuner en famille, parfois un film. Elle connaît tous les gardiens de son immeuble par leur prénom.",
    frustration: "Je fais 45 minutes de route pour trouver un endroit correct où dîner avec mon mari. Angré mérite mieux que des maquis et des boutiques de quartier.",
    attente: "Je veux un endroit où je peux faire mes courses Carrefour ET m'offrir un soin visage ET emmener mes enfants au cinéma — sans reprendre ma voiture.",
    ligneRouge: "Un centre qui devient bruyant, mal entretenu, ou qui attire une clientèle qui ne me ressemble pas. Si les toilettes ne sont pas impeccables au 6e mois, je ne reviens plus.",
    signaturePref: "L'exception, tout simplement",
    signatureReason: "Ça dit exactement ce que je cherche. Quelque chose d'exceptionnel, mais sans chichi.",
    momentCosmos: "Samedi 11h. Elle sort de Carrefour, passe devant la terrasse du food court, s'assoit pour un jus de baobab. Ses enfants courent vers la zone de jeux. Elle respire. Elle pense : 'enfin un endroit fait pour nous.'",
  },
  {
    name: 'Yao Kouassi',
    age: 34,
    title: "L'Ambitieux Cocody",
    quartier: 'Riviera Palmeraie',
    profession: "Fondateur d'une fintech, 12 employés",
    journee: "Réunions visio depuis son coworking le matin, déjeuner business dans un restaurant qui fait bonne impression, salle de sport en fin d'après-midi. Le week-end : brunch, shopping pour soigner son image.",
    frustration: "À Abidjan, pour impressionner un investisseur au déjeuner, j'ai le choix entre l'hôtel Ivoire et… l'hôtel Ivoire. Il n'y a aucun lieu qui combine restauration premium, cadre moderne et convenience au même endroit.",
    attente: "Je veux un lieu qui dit quelque chose de moi quand j'y invite quelqu'un. Un lieu où l'on sait que j'ai du goût — pas parce que c'est cher, parce que c'est juste.",
    ligneRouge: "Si Cosmos ressemble à PlaYce avec du marbre, je ne viendrai qu'une fois. L'ambiance doit être irréprochable — musique, éclairage, attitude du staff.",
    signaturePref: "Ici, on vit quelque chose",
    signatureReason: "C'est ce que je veux ressentir. Pas juste acheter — vivre une expérience.",
    momentCosmos: "Vendredi 19h30. Il arrive pour un dîner avec un partenaire potentiel. Le voiturier le salue par son nom (Cosmos Club Gold). La terrasse du restaurant est parfaitement éclairée. Son invité dit : 'Je ne connaissais pas cet endroit.' Il sourit.",
  },
  {
    name: 'Mariam Diallo',
    age: 29,
    title: 'La Visiteuse Occasionnelle',
    quartier: 'Marcory Zone 4',
    profession: 'Responsable communication, ONG internationale',
    journee: "Bureau à Cocody, afterwork avec les collègues. Week-ends : brunch entre amies, shopping quand le salaire tombe, stories Instagram qui documentent chaque sortie.",
    frustration: "Les malls d'Abidjan sont tous les mêmes — Carrefour, Orange, mêmes enseignes. Il n'y a aucun endroit où tu te dis 'il faut que je montre ça à mes amies'.",
    attente: "Je veux un endroit Instagrammable qui n'a pas l'air d'essayer d'être Instagrammable. Un lieu où chaque coin donne envie de prendre une photo — naturellement.",
    ligneRouge: "Si c'est un mall générique avec un nom fancy, je poste une story ironique et je n'y retourne pas. L'authenticité, c'est non négociable.",
    signaturePref: "L'exception, tout simplement",
    signatureReason: "C'est la phrase parfaite pour une story. Courte, élégante, pas prétentieuse.",
    momentCosmos: "Dimanche 14h. Elle découvre le hall central — les suspensions en raphia, la lumière zénithale, les jardinières terracotta. Elle prend une photo sans filtre. Elle poste : 'Cosmos Angré. L'exception, tout simplement.' 47 likes en 2 heures.",
  },
  {
    name: 'Jean-Marc Ehui',
    age: 48,
    title: "L'Expatrié Ancré",
    quartier: 'Cocody Ambassades',
    profession: "Directeur régional Afrique de l'Ouest, cabinet de conseil international",
    journee: "Calls avec Paris et Londres le matin, réunions locales l'après-midi. Il compare tout — le restaurant à celui de Dakar, le service à celui de Dubaï Mall, la propreté à celle de Westfield London.",
    frustration: "Quand ma femme et moi voulons sortir le week-end, on finit toujours au même hôtel 5 étoiles. Abidjan n'a pas de lieu de vie premium intégré — juste des hôtels et des malls bas de gamme.",
    attente: "Je veux retrouver les standards que je connais — propreté, service, qualité — sans avoir l'impression d'être dans une copie. Je veux un lieu authentiquement ivoirien ET irréprochable.",
    ligneRouge: "Le moindre détail qui trahit un manque de rigueur : une enseigne mal alignée, un vigile désagréable, un parking mal éclairé. À ce niveau de promesse, il n'y a pas de droit à l'erreur.",
    signaturePref: "L'exception, tout simplement",
    signatureReason: "C'est sobre, c'est confiant, ça ne surpromet pas. Exactement le ton juste.",
    momentCosmos: "Samedi 18h. Il marche dans les allées avec sa femme. Le sol est impeccable. La signalétique est bilingue, sobre, en bronze. Un vigile lui sourit et lui indique le restaurant en anglais sans qu'il ait demandé. Il pense : 'Enfin, Abidjan a son lieu.'",
  },
];

/* ── Focus Group data ── */
const signatures = [
  { phrase: "L'exception, tout simplement", type: 'Institutionnelle permanente' },
  { phrase: 'Ici, on vit quelque chose', type: 'Ouverture Oct 2026' },
  { phrase: "Cocody vient de changer d'adresse", type: 'Teasing pré-ouverture Jan-Oct 2026' },
];

const questions = [
  'Quand vous lisez cette phrase, à quel type de lieu pensez-vous spontanément ?',
  'Sur une échelle de 1 à 10, à quel point ce lieu vous semble premium ?',
  "Est-ce un endroit pour vous, ou pour quelqu'un d'autre ? Pourquoi ?",
  'Quelle image vous vient en tête en lisant cette signature ?',
  "Si un ami vous demande 'c'est quoi Cosmos Angré ?', comment le décrivez-vous en une phrase ?",
  "Parmi ces 3 phrases, laquelle retiendriez-vous si vous ne deviez en garder qu'une ?",
  'Cette signature vous donne-t-elle envie de visiter ce lieu ? Pourquoi ?',
  'À quel concurrent existant cette phrase vous fait-elle penser ? Ou à rien de connu ?',
  'Fermez les yeux. Imaginez-vous dans ce centre. Décrivez ce que vous voyez, sentez, entendez.',
  '20 minutes après : pouvez-vous me rappeler les phrases que vous avez vues ?',
];

const sessions = [
  { label: 'Session 1 — Consommateurs', participants: '8-10 participants', detail: 'Mappés sur les 4 personas' },
  { label: 'Session 2 — Locataires', participants: '6-8 participants', detail: 'Enseignes L1 confirmées + L2 en négociation' },
];

/* ═══════════════════════════════════════════════════════════════
   Persona Card
   ═══════════════════════════════════════════════════════════════ */
const PersonaCard: React.FC<{ p: Persona; c: ScColors; idx: number }> = ({ p, c, idx }) => (
  <div className="bg-white rounded-xl border border-black/[.06] overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,.03)]">
    {/* Colored header */}
    <div
      className="px-5 py-4"
      style={{ background: `linear-gradient(135deg, ${c.dark}, ${c.primary})` }}
    >
      <div className="text-[9px] font-bold tracking-[.2em] uppercase mb-1" style={{ color: c.accent }}>
        Persona {idx + 1}
      </div>
      <div className="font-cormorant text-[20px] text-white font-light leading-tight">
        {p.name}, {p.age} ans
      </div>
      <div className="text-[10px] text-white/50 mt-0.5 italic">{p.title}</div>
    </div>

    <div className="px-5 py-4 space-y-4">
      {/* Profession + quartier */}
      <div className="flex items-start gap-3">
        <div
          className="w-1 self-stretch rounded-full flex-shrink-0"
          style={{ background: hexRgba(c.primary, 0.2) }}
        />
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-wider mb-0.5" style={{ color: c.primary }}>{p.profession}</div>
          <div className="text-[10px] text-black/40">{p.quartier}</div>
        </div>
      </div>

      {/* Attente quote */}
      <div
        className="rounded-lg px-4 py-3"
        style={{ background: hexRgba(c.primary, 0.04), borderLeft: `3px solid ${hexRgba(c.accent, 0.5)}` }}
      >
        <div className="text-[9px] font-bold tracking-[.15em] uppercase mb-1.5" style={{ color: c.accent }}>Attente</div>
        <div className="text-[10px] italic text-black/60 leading-relaxed">
          &laquo;&nbsp;{p.attente}&nbsp;&raquo;
        </div>
      </div>

      {/* Moment Cosmos */}
      <div
        className="rounded-lg px-4 py-3"
        style={{ background: hexRgba(c.accent, 0.06) }}
      >
        <div className="text-[9px] font-bold tracking-[.15em] uppercase mb-1.5" style={{ color: c.accent }}>
          Moment Cosmos
        </div>
        <div className="text-[10px] text-black/55 leading-relaxed">{p.momentCosmos}</div>
      </div>

      {/* Signature preferred */}
      <div className="flex items-start gap-2">
        <div
          className="mt-0.5 w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center text-[8px] text-white font-bold"
          style={{ background: c.accent }}
        >
          ★
        </div>
        <div>
          <div className="text-[10px] font-semibold" style={{ color: c.dark }}>
            &laquo;&nbsp;{p.signaturePref}&nbsp;&raquo;
          </div>
          <div className="text-[9px] text-black/40 mt-0.5 italic">{p.signatureReason}</div>
        </div>
      </div>

      {/* Ligne rouge */}
      <div
        className="rounded-lg px-4 py-3"
        style={{ background: 'rgba(180,40,40,.04)', borderLeft: '3px solid rgba(180,40,40,.2)' }}
      >
        <div className="text-[9px] font-bold tracking-[.15em] uppercase mb-1.5" style={{ color: 'rgba(160,50,50,.7)' }}>
          Ligne rouge
        </div>
        <div className="text-[10px] text-black/55 leading-relaxed">{p.ligneRouge}</div>
      </div>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════ */
const PersonasFocusGroupSection: React.FC<{ k: ScenarioKey }> = ({ k }) => {
  const c = sc[k];

  return (
    <div className="space-y-16">

      {/* ── PERSONAS ── */}
      <div id="bw-personas" className="py-16 border-b border-black/[.08]">
        <div className="bg-white rounded-[18px] border border-black/[.06] overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,.04)]">
          {/* Header */}
          <div
            className="px-4 sm:px-8 py-6 border-b border-black/[.06]"
            style={{ background: `linear-gradient(to bottom right, ${c.dark}, ${c.primary})` }}
          >
            <div className="text-[9px] font-bold tracking-[.25em] uppercase mb-1" style={{ color: c.accent }}>
              Brand World &middot; P1
            </div>
            <div className="font-cormorant text-[24px] text-white font-light">Personas {'&'} Focus Group</div>
            <div className="text-[10px] text-white/30 mt-1">
              4 personas &middot; 3 signatures testées &middot; 10 questions protocole &middot; 2 sessions
            </div>
          </div>

          {/* Personas grid */}
          <div className="p-4 sm:p-8">
            <div className="text-[9px] font-bold tracking-[.2em] uppercase mb-4" style={{ color: c.accent }}>
              Mission 2 &mdash; Les 4 personas Cosmos Angré
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {personas.map((persona, i) => (
                <PersonaCard key={i} p={persona} c={c} idx={i} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── FOCUS GROUP ── */}
      <div id="bw-focusgroup" className="py-16 border-b border-black/[.08]">
        <div className="bg-white rounded-[18px] border border-black/[.06] overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,.04)]">
          {/* Header */}
          <div
            className="px-4 sm:px-8 py-6 border-b border-black/[.06]"
            style={{ background: `linear-gradient(to bottom right, ${c.dark}, ${c.primary})` }}
          >
            <div className="text-[9px] font-bold tracking-[.25em] uppercase mb-1" style={{ color: c.accent }}>
              Brand World &middot; P1
            </div>
            <div className="font-cormorant text-[24px] text-white font-light">Préparation Focus Group</div>
            <div className="text-[10px] text-white/30 mt-1">
              Mission 7 &middot; Protocole de test des signatures
            </div>
          </div>

          <div className="p-4 sm:p-8 space-y-8">

            {/* Signatures to test */}
            <div>
              <div className="text-[9px] font-bold tracking-[.2em] uppercase mb-4" style={{ color: c.accent }}>
                Signatures testées
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {signatures.map((sig, i) => (
                  <div
                    key={i}
                    className="rounded-xl overflow-hidden border border-black/[.06] shadow-[0_2px_8px_rgba(0,0,0,.03)]"
                  >
                    <div
                      className="px-5 py-5 flex flex-col items-center text-center"
                      style={{ background: `linear-gradient(160deg, ${c.dark}, ${c.primary})` }}
                    >
                      <div className="text-[9px] font-bold tracking-[.2em] uppercase mb-2" style={{ color: hexRgba(c.accent, 0.6) }}>
                        Signature {i + 1}
                      </div>
                      <div className="font-cormorant text-[18px] text-white font-light leading-snug italic">
                        &laquo;&nbsp;{sig.phrase}&nbsp;&raquo;
                      </div>
                    </div>
                    <div className="px-5 py-3 text-center" style={{ background: hexRgba(c.accent, 0.06) }}>
                      <div className="text-[10px] font-medium" style={{ color: c.primary }}>{sig.type}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 10 questions */}
            <div>
              <div className="text-[9px] font-bold tracking-[.2em] uppercase mb-4" style={{ color: c.accent }}>
                Protocole &mdash; 10 questions
              </div>
              <div
                className="rounded-xl border border-black/[.06] overflow-hidden"
                style={{ background: hexRgba(c.primary, 0.02) }}
              >
                <ol className="divide-y divide-black/[.05]">
                  {questions.map((q, i) => (
                    <li key={i} className="flex items-start gap-4 px-5 py-3">
                      <span
                        className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white mt-0.5"
                        style={{ background: hexRgba(c.primary, 0.7) }}
                      >
                        {i + 1}
                      </span>
                      <span className="text-[11px] text-black/60 leading-relaxed pt-0.5">{q}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Sessions */}
            <div>
              <div className="text-[9px] font-bold tracking-[.2em] uppercase mb-4" style={{ color: c.accent }}>
                Sessions prévues
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sessions.map((s, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-black/[.06] overflow-hidden bg-white shadow-[0_2px_8px_rgba(0,0,0,.03)]"
                  >
                    <div
                      className="px-5 py-3 border-b border-black/[.06]"
                      style={{ background: hexRgba(c.primary, 0.06) }}
                    >
                      <div className="text-[11px] font-semibold" style={{ color: c.dark }}>{s.label}</div>
                    </div>
                    <div className="px-5 py-4 space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ background: c.accent }}
                        />
                        <span className="text-[10px] text-black/55">{s.participants}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ background: hexRgba(c.primary, 0.4) }}
                        />
                        <span className="text-[10px] text-black/45">{s.detail}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
};

export default PersonasFocusGroupSection;
