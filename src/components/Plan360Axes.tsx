import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Target, Megaphone, Heart, Landmark, Store } from 'lucide-react';

/* ══════════════════════════════════════════
   Types
   ══════════════════════════════════════════ */

interface ActionItem {
  n: string;
  title: string;
  detail: string;
  livrables: string[];
  timing: string;
  budget: 'Fort' | 'Moyen' | 'Faible';
  resp: string;
}

interface Axe {
  id: string;
  num: string;
  title: string;
  icon: React.ReactNode;
  color: string;
  light: string;
  border: string;
  objectif: string;
  kpi: string[];
  budget: string;
  timing: string;
  actions: ActionItem[];
}

/* ══════════════════════════════════════════
   Data — 5 axes × 5 actions = 25 actions
   ══════════════════════════════════════════ */

const AXES: Axe[] = [
  {
    id: 'notoriete',
    num: '01',
    title: 'Notoriété & Image',
    icon: <Megaphone size={16} />,
    color: '#0D1B4B',
    light: '#e8ecf5',
    border: 'rgba(13,27,75,.15)',
    objectif: "Installer Cosmos Angré comme référence premium à Abidjan avant l'ouverture. Créer une anticipation forte et un capital marque solide dès le soft opening.",
    kpi: [
      'Notoriété assistée >70% zone primaire J+90',
      'Couverture médias nationaux et régionaux',
      '1 500+ abonnés réseaux sociaux J+30',
      'Part de voix > concurrents directs',
    ],
    budget: '35%',
    timing: 'M-6 → M+3',
    actions: [
      {
        n: '01', title: 'Campagne affichage urbain grand format',
        detail: "200 faces 4x3 déployées sur les axes Angré–Plateau–Cocody–Riviera. Ciblage premium : carrefours BCEAO, Angré 8ème tranche, Riviera Golf. 3 vagues créatives : teasing (M-3), révélation (M-1), inauguration (M0). Formats spéciaux bâches sur 5 emplacements stratégiques.",
        livrables: ['Brief créatif par vague', "Carte d'emplacement géolocalisée", 'Rapport de pose et monitoring'],
        timing: 'M-3 → M+1', budget: 'Fort', resp: 'Agence OOH + DA Cosmos',
      },
      {
        n: '02', title: 'Campagne radio multi-stations',
        detail: "RTI 1 & 2, Nostalgie CI, Vibe Radio, Life Radio — 6 semaines couvrant soft et grand opening. Format 30'' brand awareness + 15'' offres enseignes. Prime time matin 7h-9h et soir 17h-19h. Jingles distincts par scénario de positionnement. Opérations spéciales : live depuis Cosmos Angré J-inauguration.",
        livrables: ['Scripts audio validés', 'Planning de diffusion', 'Rapport GRP hebdomadaire'],
        timing: 'M-2 → M+4', budget: 'Moyen', resp: 'Agence médias + Studio son',
      },
      {
        n: '03', title: 'Partenariats presse print et digital',
        detail: "Fraternité Matin, L'Intelligent d'Abidjan, Côte d'Ivoire Économie, Jeune Afrique (édition CI). Publi-rédactionnels 2 pages sur architecture EDGE Advanced, concept mixed-use, vision New Heaven SA. Interview DG Cheick Sanankoua — article de fond. Supplément spécial 8 pages inauguration distribué avec Fraternité Matin.",
        livrables: ['Dossier de presse premium', 'Kit journaliste (USB + visuel HD)', 'Supplément inaugural'],
        timing: 'M-1 → M+1', budget: 'Moyen', resp: 'RP + PA Communication',
      },
      {
        n: '04', title: 'Campagne digitale Meta / Google / TikTok',
        detail: "Phase awareness (M-3) : vidéo cinématique 60'' architecture + ambiance. Phase consideration (M-1) : carrousels enseignes, visite virtuelle 3D. Phase conversion (M0) : RSVP inauguration, pré-inscription Cosmos Club. Ciblage géo : 5km + revenus élevés + centres d'intérêt premium. Budget splits : 40% Meta, 35% Google Display/YouTube, 25% TikTok.",
        livrables: ['Stratégie de contenu mensuelle', 'Rapports de performance hebdo', 'A/B tests créatifs'],
        timing: 'M-3 → M+6', budget: 'Fort', resp: 'Agence digitale + Community Manager',
      },
      {
        n: '05', title: 'Contenus audiovisuels de marque',
        detail: "Film institutionnel 3 minutes — vision, architecture, équipe, ambition africaine. Réels Instagram x12/mois : lifestyle, behind-the-scenes, portraits enseignes. Podcast 'Cosmos Conversations' — 6 épisodes avec entrepreneurs, architectes, acteurs culturels Abidjan. Shooting photo annuel : 200 visuels libres de droits pour toute la communication.",
        livrables: ['Film institutionnel masterisé', 'Bibliothèque photo HD', 'Calendrier éditorial annuel'],
        timing: 'M-4 → continu', budget: 'Moyen', resp: 'Production audiovisuelle',
      },
    ],
  },
  {
    id: 'trafic',
    num: '02',
    title: 'Trafic & Conversion',
    icon: <Target size={16} />,
    color: '#4A7558',
    light: '#e8f2ec',
    border: 'rgba(74,117,88,.15)',
    objectif: "Générer un trafic qualifié dès l'ouverture. Transformer la notoriété construite en visites réelles et en chiffre d'affaires pour les enseignes.",
    kpi: [
      '500 000 visiteurs annuels an 1',
      'Taux de conversion visite → achat >65%',
      'Panier moyen 35 000 FCFA',
      'Taux de répétition hebdo >30%',
    ],
    budget: '25%',
    timing: 'M-1 → M+12',
    actions: [
      {
        n: '01', title: 'Programme ambassadeurs Cocody/Angré',
        detail: "20 micro-influenceurs locaux sélectionnés sur critères qualitatifs : engagement >5%, audience Cocody/Riviera/Angré, profils lifestyle/famille/business. Contrat 12 mois avec 2 visites mensuelles minimum, 4 posts/stories par mois. Accès privilèges : parking VIP, invitations événements, early access ventes. Commission sur trafic tracké via QR codes personnalisés.",
        livrables: ["Grille de sélection influenceurs", 'Contrats de partenariat', 'Dashboard tracking mensuel'],
        timing: 'M-1 → M+12', budget: 'Moyen', resp: 'Social Media Manager + Juriste',
      },
      {
        n: '02', title: 'Événement inauguration VIP',
        detail: "500 invités sélectionnés : corpo (DG, PDG, directeurs), institutionnels (ambassades, CCI, ministères), médias, influenceurs premium, partenaires financiers. Programme : cocktail rooftop 18h, visite guidée par zones, spectacle inaugural projection mapping façade, dîner de gala 20h. Couverture live Instagram + presse. Dossier de presse distribué J+1.",
        livrables: ['Plan de salle et protocole', 'Dossier de presse inauguration', 'Reportage photo et vidéo'],
        timing: '16 novembre 2026', budget: 'Fort', resp: 'Event agency + PA + DG',
      },
      {
        n: '03', title: 'Soft Opening — résidents zone primaire',
        detail: "Opération exclusive 16 octobre 2026 : 2 000 invitations nominatives distribuées dans les résidences d'Angré 7ème et 8ème tranche, Cocody Riviera, Deux Plateaux. Format : portes ouvertes 10h-20h, offres découverte enseignes, animations enfants, concerts acoustiques galerie centrale. Inscription préalable via formulaire WhatsApp — liste d'attente comme signal de désirabilité.",
        livrables: ['Base données résidents', 'Kit invitation premium', 'Programme horaire détaillé'],
        timing: '16 octobre 2026', budget: 'Moyen', resp: 'Operations + Marketing',
      },
      {
        n: '04', title: 'Géolocalisation et partenariats mobilité',
        detail: "Intégration Glovo, Yango, InDrive, Bolt : push notifications géolocalisées dans rayon 3km. Création point de collecte Cosmos Angré prioritaire sur ces apps. Partenariat Yango Drive : code promo COSMOS15 pour premier trajet vers le centre. Panneau signalétique directionnel sur 8 axes routiers principaux (500m, 1km, 2km). Google Maps : fiche premium avec photos HD, horaires, FAQ.",
        livrables: ['Contrats plateformes mobilité', 'Créatifs push notifications', 'Plan signalétique routière'],
        timing: 'M-1 → continu', budget: 'Faible', resp: 'Digital + Operations',
      },
      {
        n: '05', title: 'Opérations commerciales saisonnières',
        detail: "Calendrier annuel de 8 opérations majeures : Rentrée scolaire (septembre), Noël et fêtes de fin d'année (décembre), Saint-Valentin (février), Pâques, Fête des Mères (mai), Ramadan et Aïd, Indépendance CI (août), anniversaire Cosmos Angré (octobre). Chaque opération : animation galerie, offres enseignes coordonnées, concours réseaux sociaux, affichage thématique.",
        livrables: ['Calendrier opérations annuel', 'Brief créatif par opération', 'KPIs de trafic par opération'],
        timing: 'M+1 → M+12', budget: 'Moyen', resp: 'Marketing + Enseignes',
      },
    ],
  },
  {
    id: 'crm',
    num: '03',
    title: 'Fidélisation & CRM',
    icon: <Heart size={16} />,
    color: '#7B3FA0',
    light: '#f3ecfa',
    border: 'rgba(123,63,160,.15)',
    objectif: "Construire une base de clients fidèles et récurrents. Transformer les visiteurs en membres actifs de la communauté Cosmos Angré. Maximiser la valeur client sur la durée.",
    kpi: [
      '5 000 membres Cosmos Club M+3',
      'Taux de réachat mensuel >45%',
      'NPS > 65 à M+6',
      'Revenu par membre actif +20% vs non-membre',
    ],
    budget: '15%',
    timing: 'M0 → continu',
    actions: [
      {
        n: '01', title: 'Programme fidélité Cosmos Club — 3 niveaux',
        detail: "Silver (0–50k points) : remises 5%, parking gratuit 2h, newsletter. Gold (50k–200k points) : remises 10%, valet parking, accès lounge, invitation événements. Platinum (200k+) : remises 15%, concierge dédié, accès rooftop privatif, invitation dîners institutionnels. Accumulation : 1 FCFA dépensé = 1 point. Bonus multiplicateurs : parrainage (x3), anniversaire (x2), nouvelles enseignes (x5). Application mobile et carte NFC physique.",
        livrables: ['Spécifications techniques app', 'Règlement programme fidélité', "Kit d'activation par niveau"],
        timing: 'M0 → continu', budget: 'Fort', resp: 'CRM Manager + DSI',
      },
      {
        n: '02', title: 'CRM et segmentation base clients',
        detail: "Déploiement CRM (HubSpot ou Salesforce) pour centraliser : données d'inscription, historiques d'achats, préférences déclarées, comportements digitaux. Segmentation : familles, actifs CSP+, entrepreneurs, expatriés, seniors aisés. Scénarios d'automation : welcome journey (7 emails J0 à J30), réactivation (inactifs > 30 jours), upsell niveau fidélité, anniversaire. RGPD et conformité données personnelles.",
        livrables: ['Cahier des charges CRM', 'Scénarios automation documentés', 'Tableau de bord mensuel'],
        timing: 'M-2 → continu', budget: 'Moyen', resp: 'CRM Manager + DSI',
      },
      {
        n: '03', title: 'Application mobile Cosmos Angré',
        detail: "Fonctionnalités : solde et historique points fidélité, réservation parking avec QR code entrée, programme événements et billetterie, carte interactive du centre (GPS indoor), annuaire enseignes avec horaires et offres, commande click & collect multi-enseignes, chat support client. Push notifications intelligentes : offres géolocalisées, rappels événements, alertes solde points. Compatible iOS et Android. Versions française et anglaise.",
        livrables: ['Cahier des charges fonctionnel', 'Maquettes UX validées', 'Plan de lancement app stores'],
        timing: 'M-2 → M0 launch', budget: 'Fort', resp: 'DSI + Agence développement',
      },
      {
        n: '04', title: 'Newsletter et content marketing',
        detail: "Newsletter mensuelle 'Cosmos Magazine' : édito lifestyle, agenda événements, portrait enseigne du mois, recette du chef Zino, sélection shopping curatée, actualité quartier Angré/Cocody. Format premium HTML responsive. Objectif taux ouverture > 35% (benchmark sectoriel 22%). Segmentation contenu par profil (famille, business, foodie, culture). Contenu bilingue FR/EN pour expatriés et diaspora.",
        livrables: ['Template newsletter validé', 'Calendrier éditorial 12 mois', 'Rapports de performance mensuels'],
        timing: 'M+1 → continu', budget: 'Faible', resp: 'Content Manager + Design',
      },
      {
        n: '05', title: 'Programmation culturelle et événements récurrents',
        detail: "Agenda mensuel fixe : 1er vendredi du mois — concert acoustique galerie centrale (artistes CI émergents). 2ème samedi — atelier créatif enfants (partenariat écoles Angré). 3ème jeudi — after-work networking entrepreneurs Cocody. Dernier dimanche — marché créateurs locaux (artisanat, gastronomie, mode). Événements trimestriels premium : exposition art contemporain africain, conférence TEDx-style, soirée gastronomique chef invité.",
        livrables: ['Programme annuel validé', 'Contrats artistes et intervenants', 'Rapport de fréquentation par événement'],
        timing: 'M+1 → continu', budget: 'Moyen', resp: 'Events Manager + Partenaires culturels',
      },
    ],
  },
  {
    id: 'rp',
    num: '04',
    title: 'Relations Publiques & Institutionnel',
    icon: <Landmark size={16} />,
    color: '#8a5a10',
    light: '#fdf5e8',
    border: 'rgba(138,90,16,.15)',
    objectif: "Asseoir la légitimité institutionnelle de Cosmos Angré. Construire des relations stratégiques durables avec les acteurs publics, diplomatiques, économiques et civils d'Abidjan et de la sous-région.",
    kpi: [
      '50+ retombées presse M+1',
      'Relations établies avec 10 ambassades',
      '3 partenariats institutionnels signés',
      'Présence 2 forums économiques régionaux',
    ],
    budget: '10%',
    timing: 'M-3 → continu',
    actions: [
      {
        n: '01', title: 'Conférence de presse et lancement médias',
        detail: "Conférence de presse J-30 ouverture : 80 journalistes et correspondants (presse nationale, RFI, Jeune Afrique, Bloomberg Africa, Reuters Afrique). Présentation architecture EDGE Advanced — angle environnemental fort. Visite guidée exclusive du chantier finalisé. Dossier de presse bilingue FR/EN premium (40 pages + clé USB). Suivi individuel des retombées et relances sous 48h. Conférence transmise en live sur LinkedIn et YouTube.",
        livrables: ['Dossier de presse bilingue', 'Liste médias et contacts journalistes', 'Rapport de retombées J+15'],
        timing: 'J-30 ouverture', budget: 'Moyen', resp: 'Agence RP + DG + PA',
      },
      {
        n: '02', title: 'Relations diplomatiques et corporate',
        detail: "Identification de 15 ambassades cibles à Abidjan (France, USA, UE, Allemagne, Chine, Inde, Maroc, Sénégal...). Visites de courtoisie et invitations inauguration VIP. Partenariats : espace de réunion pour événements diplomatiques, visibilité dans communications d'ambassade. CCI Côte d'Ivoire et CGECI : adhésion, présentation lors AG, co-organisation séminaires. Club des Expatriés d'Abidjan : partenariat privilèges membres.",
        livrables: ['Cartographie acteurs diplomatiques', 'Lettres de courtoisie personnalisées', 'Convention partenariat CCI'],
        timing: 'M-3 → continu', budget: 'Faible', resp: 'DG + PA + Juriste',
      },
      {
        n: '03', title: 'Programme RSE — Ancrage local Angré',
        detail: "Emploi local : 60% des postes opérationnels (sécurité, maintenance, accueil, restauration) pourvus parmi résidents Angré et communes environnantes. Partenariat lycées techniques Angré : programme de stages qualifiants avec certification. Bourses étudiantes 'Cosmos Angré' : 10 bourses annuelles (500 000 FCFA) pour étudiants en commerce, architecture, facility management. Collecte sélective et jardins partagés : programme zéro déchet et espaces verts communautaires.",
        livrables: ['Rapport RSE annuel', 'Convention lycées partenaires', 'Règlement bourses étudiantes'],
        timing: 'M0 → continu', budget: 'Moyen', resp: 'PA + RH + RSE Officer',
      },
      {
        n: '04', title: 'Visibilité médias spécialisés architecture et design',
        detail: "Candidature Prix Architecture Africaine 2027 (ARCASIA, World Architecture Festival). Reportage dans Architectural Digest Africa, Afrik Archi, Azure Magazine. Article de fond sur certification EDGE Advanced — positionnement durabilité et innovation. Participation Salon Bâtir Abidjan et Africa CEO Forum. Publication étude de cas dans revues de Facility Management (IFMA Africa).",
        livrables: ['Dossier de candidature prix architecture', 'Contacts rédactions spécialisées', 'Planning interventions salons'],
        timing: 'M+3 → M+18', budget: 'Faible', resp: 'PA + Architecte projet',
      },
      {
        n: '05', title: 'Lobbying et positionnement politique',
        detail: "Présentation institutionnelle au Ministère du Commerce et de l'Industrie : Cosmos Angré comme modèle de développement commercial premium en Côte d'Ivoire. Demande de labellisation 'Centre Commercial d'Excellence CI'. Participation aux travaux du Conseil Économique et Social. Contribution au rapport annuel de la Chambre de Commerce sur le retail ivoirien. Dossier de reconnaissance patrimoine urbain contemporain d'Abidjan.",
        livrables: ['Note de positionnement politique', 'Dossier labellisation Ministère', 'Rapport contribution économique locale'],
        timing: 'M+1 → M+12', budget: 'Faible', resp: 'DG + Cabinet conseil RP institutionnel',
      },
    ],
  },
  {
    id: 'enseignes',
    num: '05',
    title: 'Activation Enseignes',
    icon: <Store size={16} />,
    color: '#1a6b6b',
    light: '#e8f5f5',
    border: 'rgba(26,107,107,.15)',
    objectif: "Faire des enseignes de véritables ambassadeurs de la marque Cosmos Angré. Créer un écosystème commercial cohérent où chaque enseigne amplifie l'attractivité globale du centre.",
    kpi: [
      '100% enseignes intégrées au kit co-branding',
      'Trafic croisé inter-enseignes +25% M+3',
      'CA global enseignes objectif M+6',
      'Taux de satisfaction enseignes > 80%',
    ],
    budget: '15%',
    timing: 'M-2 → continu',
    actions: [
      {
        n: '01', title: 'Kit marketing et co-branding enseignes',
        detail: "Charte graphique co-branding : utilisation logo Cosmos Angré, codes couleurs, typographies autorisées. Templates prêts-à-l'emploi : vitrines, sacs, emballages, uniformes, cartes de visite, réseaux sociaux. Guide communication enseignes : ton, messages clés, hashtags officiels (#CosmosAngré, #VivezLexception). Formation équipes enseignes (1h) : guidelines, procédures d'urgence, culture Cosmos. Mise à jour trimestrielle.",
        livrables: ['Brand guidelines enseignes (PDF 60p)', 'Templates Canva / Illustrator', 'Guide formation équipes enseignes'],
        timing: 'M-2 → M0', budget: 'Moyen', resp: 'DA Cosmos + Responsable enseignes',
      },
      {
        n: '02', title: 'Semaine Cosmos — opération inauguration coordonnée',
        detail: "7 jours post-inauguration : chaque enseigne déploie une offre exclusive signée Cosmos Angré. Parcours découverte gamifié : passport shopping avec tampons, cadeau à 5 enseignes visitées. Tirage au sort quotidien : 1 gagnant reçoit abonnement annuel Cosmos Club Platinum. Signalétique directionnelle inter-enseignes : panneaux 'À découvrir dans Cosmos'. Résultats CA partagés avec toutes les enseignes J+8.",
        livrables: ['Programme Semaine Cosmos', 'Passeport shopping design', 'Règlement concours et dotations'],
        timing: 'M0 → M0+7j', budget: 'Moyen', resp: 'Marketing + Toutes enseignes',
      },
      {
        n: '03', title: 'Signalétique digitale partagée',
        detail: "Réseau de 24 écrans haute définition (55'') répartis : 6 lobby entrée principale, 8 galeries circulation, 4 food court, 3 parking niveaux, 3 extérieurs. Contenu géré via CMS centralisé. Répartition temps d'antenne : 40% communication Cosmos Angré, 40% enseignes (rotation équitable), 20% partenaires institutionnels et événements. Possibilité pour enseignes de pousser contenus promotionnels via portail dédié (1h notice).",
        livrables: ['Cahier des charges réseau écrans', 'CMS et portail enseignes', 'Grille de diffusion et tarification'],
        timing: 'M-1 → M0 installation', budget: 'Fort', resp: 'DSI + Operations',
      },
      {
        n: '04', title: 'Comité Marketing Enseignes mensuel',
        detail: "Réunion mensuelle obligatoire (1h) : partage des données de trafic et CA par zone, coordination des opérations commerciales, retours terrain des équipes enseignes, planning des 30 jours suivants. Tableau de bord partagé en temps réel : trafic par heure, météo shopping, comparatifs mois précédent. Groupe WhatsApp opérationnel : alertes, urgences, coordination quotidienne. Newsletter enseignes hebdomadaire : infos pratiques et rappels.",
        livrables: ['Ordre du jour type et compte-rendus', 'Dashboard partagé (Power BI ou équivalent)', 'Rapport mensuel enseignes'],
        timing: 'M+1 → continu', budget: 'Faible', resp: 'Directeur Centre + Marketing Manager',
      },
      {
        n: '05', title: 'Événements croisés et parcours thématiques',
        detail: "4 parcours thématiques permanents signalés : 'Parcours Gourmand' (Zino, food court, épicerie fine), 'Parcours Famille' (espace enfants, cinéma, jouets), 'Parcours Business' (clinique, services, bureaux, banque), 'Parcours Bien-être' (spa, sport, pharmacie, optique). Événements croisés trimestriels : 'Nuit des Chefs' (restauration x culture), 'Kids Day' (toutes enseignes famille), 'Business Night' (corporate x gastronomie). Cross-promotions enseignes : offer bundle multi-enseignes promotionnelles.",
        livrables: ['Signalétique parcours thématiques', 'Calendrier événements croisés', 'Modèle commercial cross-promotions'],
        timing: 'M+1 → continu', budget: 'Moyen', resp: 'Marketing + Directeur Centre',
      },
    ],
  },
];

const BUDGET_COLORS: Record<string, string> = {
  Fort: '#c62828',
  Moyen: '#e65100',
  Faible: '#2e7d32',
};

/* ══════════════════════════════════════════
   ActionCard — expandable action detail
   ══════════════════════════════════════════ */

const ActionCard: React.FC<{ a: ActionItem; color: string; light: string; border: string }> = ({ a, color, light, border }) => {
  const [open, setOpen] = useState(false);
  const bc = BUDGET_COLORS[a.budget] || '#666';

  return (
    <div className="bg-white rounded-xl border border-black/[.06] overflow-hidden mb-2 last:mb-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-4 py-3.5 flex items-start gap-3 hover:bg-black/[.01] transition-colors"
      >
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0"
          style={{ background: light, border: `1px solid ${border}`, color }}
        >
          {a.n}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[12.5px] font-semibold text-navy mb-1">{a.title}</div>
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className="text-[9px] px-2 py-0.5 rounded-full font-semibold"
              style={{ background: `${bc}15`, color: bc }}
            >
              Budget {a.budget}
            </span>
            <span className="text-[9px] text-black/65">{a.timing}</span>
            <span className="text-[9px] text-black/65">· {a.resp}</span>
          </div>
        </div>
        <div className="text-black/60 mt-0.5">
          {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </div>
      </button>

      {open && (
        <div className="px-4 pb-4 pt-0 ml-10 border-t border-black/[.04]">
          <p className="text-[12px] text-black/60 leading-[1.75] mt-3 mb-3">{a.detail}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div className="rounded-lg p-3" style={{ background: light }}>
              <div className="text-[8px] font-bold tracking-[.18em] uppercase mb-2" style={{ color }}>
                Livrables clés
              </div>
              {a.livrables.map((l) => (
                <div key={l} className="text-[11px] text-navy leading-[1.7] flex gap-1.5">
                  <span style={{ color }} className="flex-shrink-0">→</span>
                  {l}
                </div>
              ))}
            </div>
            <div className="rounded-lg p-3 bg-cream/60">
              <div className="text-[8px] font-bold tracking-[.18em] uppercase text-black/65 mb-2">
                Détails
              </div>
              <div className="text-[11px] text-black/55 leading-[1.7] space-y-0.5">
                <div><span className="font-semibold">Timing :</span> {a.timing}</div>
                <div><span className="font-semibold">Budget :</span> {a.budget}</div>
                <div><span className="font-semibold">Responsable :</span> {a.resp}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ══════════════════════════════════════════
   AxeSection — collapsible strategic axis
   ══════════════════════════════════════════ */

const AxeSection: React.FC<{ axe: Axe }> = ({ axe }) => {
  const [open, setOpen] = useState(true);

  return (
    <div className="rounded-2xl border overflow-hidden mb-4" style={{ borderColor: axe.border }}>
      {/* Header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-5 py-4 flex items-center gap-3.5 cursor-pointer"
        style={{ background: axe.light }}
      >
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white flex-shrink-0"
          style={{ background: axe.color }}
        >
          {axe.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[8px] font-bold tracking-[.22em] uppercase mb-0.5" style={{ color: axe.color }}>
            Axe {axe.num}
          </div>
          <div className="font-cormorant text-[20px] font-normal text-navy leading-tight">{axe.title}</div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <div className="text-[9px] text-black/65 mb-0.5">Budget</div>
            <div className="font-cormorant text-[22px] font-light" style={{ color: axe.color }}>{axe.budget}</div>
          </div>
          <div className="text-right hidden sm:block">
            <div className="text-[9px] text-black/65 mb-0.5">Timing</div>
            <div className="text-[10px] font-semibold text-navy">{axe.timing}</div>
          </div>
          <div className="text-black/60">
            {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>
        </div>
      </button>

      {/* Body */}
      {open && (
        <div className="p-5 bg-white">
          {/* Objectif */}
          <div className="rounded-xl p-4 mb-4" style={{ background: axe.light, borderLeft: `3px solid ${axe.color}` }}>
            <div className="text-[8px] font-bold tracking-[.18em] uppercase mb-1.5" style={{ color: axe.color }}>
              Objectif stratégique
            </div>
            <div className="text-[12px] text-black/65 leading-[1.7]">{axe.objectif}</div>
          </div>

          {/* KPIs */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-4">
            {axe.kpi.map((k) => (
              <div key={k} className="bg-cream/50 rounded-lg px-3 py-2.5 text-[10px] text-navy leading-[1.5]">
                <span className="font-bold mr-1" style={{ color: axe.color }}>→</span>
                {k}
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="text-[8px] font-bold tracking-[.18em] uppercase text-black/65 mb-2.5">
            5 actions · cliquer pour développer
          </div>
          {axe.actions.map((a) => (
            <ActionCard key={a.n} a={a} color={axe.color} light={axe.light} border={axe.border} />
          ))}
        </div>
      )}
    </div>
  );
};

/* ══════════════════════════════════════════
   Main Component
   ══════════════════════════════════════════ */

const Plan360Axes: React.FC = () => (
  <div id="plan360axes" className="px-4 sm:px-8 lg:px-[72px] py-12">
    {/* Header */}
    <div className="bg-white rounded-2xl border border-black/[.06] overflow-hidden shadow-[0_2px_20px_rgba(0,0,0,.04)]">
      <div className="relative px-8 py-8 bg-gradient-to-br from-[#1a2e20] via-[#2a4a35] to-[#1a2e20] overflow-hidden">
        <div className="absolute inset-0 opacity-[.04]" style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }} />
        <div className="relative z-10">
          <div className="text-[9px] font-bold tracking-[.2em] uppercase mb-2 text-white/40">
            Cosmos Angré · Plan Marketing · Mars 2026
          </div>
          <div className="font-cormorant text-[32px] text-white font-light leading-tight">
            Plan Marketing 360°
          </div>
          <div className="font-cormorant text-[15px] text-white/40 italic mt-1">
            5 axes stratégiques · 25 actions clés · Ouverture octobre–novembre 2026
          </div>
          <div className="flex gap-2 mt-4 flex-wrap">
            {AXES.map((a) => (
              <div
                key={a.id}
                className="px-3 py-1.5 rounded-full text-[10px] text-white/70 border border-white/10 bg-white/[.05]"
              >
                {a.title}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Budget allocation bar */}
      <div className="px-8 py-3 border-b border-black/[.06] flex items-center gap-5 flex-wrap bg-cream/30">
        <div className="text-[9px] font-bold tracking-[.2em] uppercase text-black/65">
          Allocation budgétaire
        </div>
        {AXES.map((a) => (
          <div key={a.id} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ background: a.color }} />
            <span className="text-[11px] text-navy">{a.title}</span>
            <span className="text-[11px] font-bold" style={{ color: a.color }}>{a.budget}</span>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="p-6 sm:p-8">
        {AXES.map((a) => (
          <AxeSection key={a.id} axe={a} />
        ))}

        {/* Footer */}
        <div className="mt-6 p-4 rounded-xl bg-black/[.02] border border-black/[.06] text-[10px] text-black/65 leading-[1.8]">
          Plan Marketing 360° · Cosmos Angré · Mars 2026 · Document confidentiel — New Heaven SA / RCP<br />
          Prochaine étape : validation budget global → brief agences → lancement opérationnel M-6 (mai 2026)
        </div>
      </div>
    </div>
  </div>
);

export default Plan360Axes;
