import React, { useState } from 'react';

const GOLD = '#C9943A', NAVY = '#0D1B4B', CREAM = '#F7F3ED';

interface DateItem {
  j: string;
  desc: string;
}

interface Action {
  id: string;
  title: string;
  quoi: string;
  pourquoi: string;
  comment: string;
  dates: DateItem[];
  budget: string;
  budget_detail: string;
  roi: string;
  resp: string;
  livrable: string;
  start: string;
  end: string;
  phase: string;
}

interface Phase {
  id: string;
  num: string;
  label: string;
  period: string;
  icon: string;
  color: string;
  light: string;
  intro: string;
  actions: Action[];
}

const PHASES: Phase[] = [
  {
    id: 'p1', num: '01', label: 'Fondations & Marque', period: 'Mars → Avril 2026', icon: '🏗️',
    color: '#0D1B4B', light: '#edf0f8',
    intro: 'Poser les bases irréversibles : identité de marque validée, outils opérationnels prêts, site web en ligne, réseaux sociaux actifs.',
    actions: [
      {
        id: '1-1', title: 'Charte graphique & Brand Book',
        quoi: "Finaliser l'identité visuelle complète. Palette bleu nuit + or mat + crème. Typographie Cormorant + Inter. Logo + 4 déclinaisons. Signature 'Un monde à part'.",
        pourquoi: 'Aucun support de communication ne peut être produit sans charte validée. C\'est le socle de toute la stratégie d\'image.',
        comment: 'Consultant Yvan + Designer Fernand. Focus group 8 personnes CSP+ Angré/Cocody. 3 itérations max. Validation finale DGA.',
        dates: [{ j: '01/03/2026', desc: 'Kick-off brief créatif' }, { j: '15/03/2026', desc: '1ère proposition graphique' }, { j: '22/03/2026', desc: 'Focus group validation' }, { j: '31/03/2026', desc: '✅ Brand Book livré — DEADLINE FERME' }],
        budget: '3 500 000 FCFA', budget_detail: 'Design : 2 000 000 · Focus group : 500 000 · Impression 50 ex. : 1 000 000',
        roi: 'Support de toute la communication. Valeur refonte post-ouverture évitée : 15–20 M FCFA.',
        resp: 'Yvan + Fernand + DGA', livrable: 'Brand Book PDF HD + fichiers sources AI/EPS/PNG',
        start: '2026-03-01', end: '2026-03-31', phase: 'p1',
      },
      {
        id: '1-2', title: 'Site Internet officiel',
        quoi: "Site vitrine premium responsive. Pages : Accueil, Le Centre, Enseignes, Restauration, Événements, Cosmos Club, Actualités, Contact. Version FR+EN. SEO optimisé, chargement <2s.",
        pourquoi: 'Première vitrine digitale avant toute visite physique. Référencement Google essentiel 90 jours avant ouverture.',
        comment: "Appel d'offres 3 agences web ivoiriennes. CMS WordPress ou Webflow. Shooting photo chantier nécessaire. Formulaire pré-inscription Cosmos Club actif dès lancement.",
        dates: [{ j: '01/04/2026', desc: 'CDC finalisé' }, { j: '30/04/2026', desc: 'Agence sélectionnée' }, { j: '15/06/2026', desc: 'Maquettes UX validées' }, { j: '16/07/2026', desc: '✅ MISE EN LIGNE — J-92' }, { j: '01/08/2026', desc: 'Audit SEO' }, { j: '01/09/2026', desc: 'Contenu enrichi enseignes' }],
        budget: '8 500 000 FCFA', budget_detail: 'Développement : 4 500 000 · Shooting : 2 000 000 · SEO+hébergement : 1 000 000 · Maintenance 6 mois : 1 000 000',
        roi: '3 000 visites/mois à M+3. 500 pré-inscrits Cosmos Club avant ouverture. Coût/lead ~1 000 FCFA.',
        resp: 'DSI + Agence web + Yvan (CDC)', livrable: 'Site cosmosangre.ci · Accès CMS · Analytics mensuel',
        start: '2026-04-01', end: '2026-07-16', phase: 'p1',
      },
      {
        id: '1-3', title: 'Réseaux sociaux — Stratégie intergénérationnelle',
        quoi: "4 plateformes différenciées : Instagram (25–40 ans, lifestyle, Reels) · Facebook (35–55 ans, familles, événements) · LinkedIn (décideurs, B2B) · TikTok (18–30 ans, Gen Z Cocody). Calendrier éditorial mensuel. Ratio : 40% inspiration · 30% enseignes · 20% événements · 10% RSE.",
        pourquoi: '3 générations distinctes = 3 plateformes. TikTok incontournable pour notoriété jeune Abidjan. Mono-plateforme = 60% de la cible ratée.',
        comment: 'Community Manager dédié. Canva Pro + Later/Buffer. Rapport mensuel Meta Insights + Analytics.',
        dates: [{ j: '01/04/2026', desc: 'Création comptes + profils optimisés' }, { j: '15/04/2026', desc: '1ers posts teasing' }, { j: '01/05/2026', desc: 'Community Manager contracté' }, { j: '15/05/2026', desc: 'Paid social awareness démarré' }, { j: '16/07/2026', desc: 'Accélération J-92' }, { j: '16/10/2026', desc: '✅ Live ouverture toutes plateformes' }],
        budget: '6 000 000 FCFA/an', budget_detail: 'CM 6 mois : 2 400 000 · Création contenu : 1 800 000 · Paid social : 1 800 000',
        roi: 'J+30 : Instagram 2 500 · Facebook 3 000 · LinkedIn 800 · TikTok 1 500 abonnés. Portée 15 000/semaine à régime.',
        resp: 'Community Manager + Yvan (stratégie)', livrable: 'Calendriers éditoriaux · Rapport perf mensuel · Bibliothèque contenus',
        start: '2026-04-01', end: '2026-10-16', phase: 'p1',
      },
      {
        id: '1-4', title: 'Brochure commerciale & Kit enseignes',
        quoi: "Brochure 24 pages : localisation, données socio-éco Angré/Cocody, plan masse, liste enseignes, services. Formats : PDF interactif + offset 500 ex. Kit co-branding enseignes.",
        pourquoi: "Outil de closing commercial pour enseignes en cours de négociation. Valeur d'un BEFA sur 5 ans : 50–100 M FCFA.",
        comment: 'Contenu DGA. Maquette Fernand. Impression offset locale.',
        dates: [{ j: '15/04/2026', desc: 'Contenu finalisé DGA' }, { j: '30/04/2026', desc: 'Maquette validée' }, { j: '10/05/2026', desc: 'Bon à tirer signé' }, { j: '20/05/2026', desc: '✅ 500 exemplaires livrés' }],
        budget: '3 000 000 FCFA', budget_detail: 'Design : 800 000 · Impression : 1 500 000 · PDF interactif : 200 000 · Kit digital : 500 000',
        roi: 'Closing 5–10 enseignes. ROI potentiel ×100 sur valeur des baux.',
        resp: 'DGA + Fernand + Direction Commerciale', livrable: '500 brochures · PDF interactif · Kit digital enseignes',
        start: '2026-04-15', end: '2026-05-20', phase: 'p1',
      },
    ],
  },
  {
    id: 'p2', num: '02', label: 'Activation & Buzz', period: 'Mai → Juillet 2026', icon: '📣',
    color: '#4A7558', light: '#eaf2ee',
    intro: "Créer l'événement médiatique et digital 5 mois avant l'ouverture. Quand le centre ouvre, le public est déjà impatient.",
    actions: [
      {
        id: '2-1', title: 'Campagne teasing OOH + Digital — 3 actes',
        quoi: "Acte 1 (mai) : silhouette + '?? Quelque chose se prépare à Angré'. Acte 2 (juin) : révélation identité + 'Ouverture Oct. 2026'. Acte 3 (juil.) : enseignes révélées une par une. 80 faces 4×3 axes Angré–Cocody–Plateau–Riviera + Meta Ads + TikTok.",
        pourquoi: "Le teasing crée la désirabilité avant la disponibilité. L'effet whisper network CSP+ Abidjan est puissant. Les grandes ouvertures réussies investissent massivement en teasing.",
        comment: "Réservation OOH (Soca/Comaffich) dès mars — délais 4 semaines. Ads Meta : femmes/hommes 25–50 ans, 3km Angré+Cocody+Riviera, revenus élevés.",
        dates: [{ j: '01/03/2026', desc: '⚠️ Réservation espaces OOH — URGENT' }, { j: '30/04/2026', desc: 'Brief créatif 3 actes validé' }, { j: '05/05/2026', desc: '✅ POSE Acte 1 — teasing' }, { j: '01/06/2026', desc: '✅ POSE Acte 2 — révélation' }, { j: '01/07/2026', desc: '✅ POSE Acte 3 — enseignes' }, { j: '16/07/2026', desc: 'Arrêt teasing → phase information' }],
        budget: '18 000 000 FCFA', budget_detail: 'OOH 80 faces × 3 mois : 12 000 000 · Création 3 actes : 3 000 000 · Meta Ads : 2 000 000 · TikTok Ads : 1 000 000',
        roi: 'Notoriété assistée 55% zone primaire fin juillet. +800–1200 abonnés RS. Valeur médiatique équivalente : ×2,5 le budget.',
        resp: 'Agence OOH + Yvan + Fernand + CM', livrable: 'BAT affiches × 3 actes · Plan média OOH · Rapports Meta/TikTok',
        start: '2026-05-05', end: '2026-07-16', phase: 'p2',
      },
      {
        id: '2-2', title: 'Programme 20 ambassadeurs influenceurs',
        quoi: "20 micro-influenceurs Abidjan : 5 000–50 000 abonnés, engagement >4%, audience Cocody/Angré >50%. Profils : lifestyle, food, famille, business, mode, fitness. Contrats 6 mois juil.→déc. 2 visites + 4 posts/mois. Avantages : parking VIP, invitations, Cosmos Club Gold offert.",
        pourquoi: "Prescription sociale = principal moteur d'adoption à Abidjan. Micro-influenceurs locaux : crédibilité supérieure aux médias traditionnels. 20 micro > 1 macro en engagement.",
        comment: 'Cartographie via Heepsy ou manuelle. Clause exclusivité sectorielle. Briefing mensuel + kits fournis. Tracking via liens UTM personnalisés.',
        dates: [{ j: '01/04/2026', desc: 'Longlist 50 influenceurs' }, { j: '01/05/2026', desc: 'Shortlist 20 — validation DGA' }, { j: '01/06/2026', desc: '✅ Contrats signés' }, { j: '15/06/2026', desc: 'Briefing + visite chantier exclusive' }, { j: '16/07/2026', desc: '✅ ACTIVATION — 1ers posts' }, { j: '16/10/2026', desc: 'Live Soft Opening — tous mobilisés' }, { j: '16/11/2026', desc: 'Live Inauguration — contenus premium' }],
        budget: '7 500 000 FCFA', budget_detail: 'Rémunération 20 × 6 mois : 5 000 000 · Kits produits/expériences : 1 500 000 · Coordination : 1 000 000',
        roi: 'Portée cumulée : 400 000 impressions/mois. CPM ~625 FCFA. 30% trafic J0 via recommandation influenceurs.',
        resp: 'Yvan (sélection) + CM (suivi)', livrable: 'Contrats signés · Dashboard perf mensuel · Bibliothèque UGC',
        start: '2026-07-16', end: '2026-12-31', phase: 'p2',
      },
      {
        id: '2-3', title: 'Campagne radio & podcasts',
        quoi: "10 semaines radio (juil.→mi-sept). Stations : Nostalgie CI, Vibe Radio, Life Radio, RTI 1. Format : 30'' brand + opérations spéciales 'Cosmos Angré vous invite'. 3 podcasts ivoiriens sponsoring éditorial (business, lifestyle, culture).",
        pourquoi: 'Radio = média de masse N°1 CI (taux écoute >75%). Idéale pour actifs en déplacement. Podcasts touchent CSP+ connectés non captés par radio classique.',
        comment: "Production spots studio local (VO + musique originale). Opération spéciale Nostalgie : dîner VIP gagnant. Identification 3 podcasts CI à forte audience CSP+.",
        dates: [{ j: '01/06/2026', desc: 'Brief créatif spots radio' }, { j: '15/06/2026', desc: 'Production et validation' }, { j: '01/07/2026', desc: '✅ DIFFUSION démarrée' }, { j: '16/07/2026', desc: 'Opération spéciale Nostalgie CI' }, { j: '01/09/2026', desc: "Message : 'Ouverture dans 6 semaines'" }, { j: '30/09/2026', desc: 'Fin campagne radio phase 2' }],
        budget: '9 000 000 FCFA', budget_detail: 'Achats espaces 4 stations × 10 sem. : 7 000 000 · Production 3 spots : 1 000 000 · Podcasts (3) : 1 000 000',
        roi: 'GRP estimé : 180+ sur cible 25–50 ans CSP+. Notoriété spontanée +15 points post-campagne.',
        resp: 'Agence médias + Studio son + Yvan', livrable: 'MP3 spots validés · Planning diffusion · Rapports écoute mensuels',
        start: '2026-07-01', end: '2026-09-30', phase: 'p2',
      },
      {
        id: '2-4', title: 'Conférence de presse — J-92',
        quoi: "16 juillet 2026. 60 journalistes : Fraternité Matin, L'Intelligent, Jeune Afrique, RFI, Bloomberg Africa, BBC Afrique. Angle : architecture EDGE Advanced + mixed-use inédit CI. Interview DG Cheick Sanankoua. Visite chantier. Dossier 32 pages FR/EN.",
        pourquoi: 'Couverture AFP/RFI/JA = positionnement régional, pas seulement ivoirien. Valeur médiatique estimée : 20–30 M FCFA.',
        comment: 'Sur site Cosmos Angré (impact visuel max). Catering premium. Transport journalistes. Suivi retombées J+48h.',
        dates: [{ j: '01/06/2026', desc: 'Liste médias finalisée' }, { j: '15/06/2026', desc: 'Dossier de presse rédigé' }, { j: '25/06/2026', desc: 'Invitations envoyées' }, { j: '16/07/2026', desc: '✅ CONFÉRENCE DE PRESSE' }, { j: '01/08/2026', desc: 'Rapport retombées complet' }],
        budget: '4 500 000 FCFA', budget_detail: 'Organisation : 2 000 000 · Dossier presse 80 ex. : 800 000 · Catering : 700 000 · Clés USB : 300 000 · Transport : 700 000',
        roi: '50+ retombées presse J+30. Valeur médiatique : 20–30 M FCFA.',
        resp: 'DGA + DG (porte-parole) + Agence RP', livrable: 'Dossier presse PDF+print · Rapport retombées · Revue de presse',
        start: '2026-07-16', end: '2026-07-16', phase: 'p2',
      },
    ],
  },
  {
    id: 'p3', num: '03', label: 'Pré-ouverture Intensive', period: 'Août → 15 oct. 2026', icon: '🔥',
    color: '#8a3a0a', light: '#fdf0e8',
    intro: "Les 10 dernières semaines. Tout converge vers le 16 octobre. Chaque semaine a un objectif précis, une action dominante, un résultat mesurable.",
    actions: [
      {
        id: '3-1', title: 'Pré-inscription Cosmos Club — 1 000 membres',
        quoi: "Opération pré-inscription via site + RS + QR codes chantier. Objectif 1 000 membres avant J0. Avantage early adopters : statut Gold 6 mois offert, invitation Soft Opening prioritaire, parking gratuit 3 mois. Formulaire : nom, email, tel, quartier.",
        pourquoi: '1 000 préinscrits = 1 000 visites garanties J0. Base CRM constituée avant ouverture = communication directe sans dépendance aux algorithmes.',
        comment: 'Formulaire web + WhatsApp Business. QR code sur affiches OOH, chantier, RS. Email confirmation + carte numérique provisoire. SMS relance J-7.',
        dates: [{ j: '16/07/2026', desc: '✅ Formulaire actif sur site' }, { j: '01/08/2026', desc: 'Campagne paid recrutement membres' }, { j: '15/09/2026', desc: 'Bilan : si <500 → ajuster stratégie' }, { j: '01/10/2026', desc: 'Sprint final → objectif 1 000' }, { j: '10/10/2026', desc: 'Email/SMS tous membres : invitation Soft Opening' }, { j: '16/10/2026', desc: '✅ Activation cartes membres physiques' }],
        budget: '2 500 000 FCFA', budget_detail: 'CRM + formulaire : 800 000 · Paid recrutement : 1 200 000 · Impression cartes 1 000 ex. : 500 000',
        roi: '1 000 membres × 35 000 FCFA × 2 visites/mois = 840 M FCFA/an potentiel. Coût acquisition : 2 500 FCFA/membre.',
        resp: 'CRM Manager + DSI + Marketing', livrable: 'Base 1 000+ membres · Cartes membres · Rapport mensuel',
        start: '2026-07-16', end: '2026-10-16', phase: 'p3',
      },
      {
        id: '3-2', title: "Plan inauguration & Invitations VIP",
        quoi: "500 invités VIP : institutionnels (Présidence, Ministères, Ambassades), corporate (DG/PDG), financiers, médias, partenaires. Cartons d'invitation premium. RSVP digital. Programme : cocktail 18h, projection mapping façade, dîner de gala 20h.",
        pourquoi: "L'inauguration établit le positionnement institutionnel pour 10 ans. La présence d'un invité de marque garantit la couverture nationale.",
        comment: "Brief agence événementielle juillet. Comparatif 3 agences. Cartons letterpress ou thermogravure. RSVP WhatsApp dédié.",
        dates: [{ j: '01/07/2026', desc: 'Brief + sélection agence' }, { j: '01/08/2026', desc: '✅ Liste 500 invités validée' }, { j: '01/09/2026', desc: 'Cartons imprimés' }, { j: '15/09/2026', desc: 'Envoi invitations Tier 1' }, { j: '01/10/2026', desc: 'Envoi invitations Tier 2' }, { j: '15/10/2026', desc: 'Clôture RSVP — plan de salle définitif' }, { j: '16/11/2026', desc: '✅ INAUGURATION' }],
        budget: '25 000 000 FCFA', budget_detail: 'Agence événem. : 10 000 000 · Traiteur 500 pers. : 7 500 000 · Production scénique : 5 000 000 · Cartons premium : 1 500 000 · Déco : 1 000 000',
        roi: 'Valeur médiatique : 40–60 M FCFA. Légitimité institutionnelle 5 ans. Boost notoriété +25 pts zone primaire.',
        resp: 'DG + DGA + Agence événementielle', livrable: 'Programme soirée · Liste validée · Dossier presse inaug · Reportage',
        start: '2026-08-01', end: '2026-11-16', phase: 'p3',
      },
      {
        id: '3-3', title: 'Signalétique directionnelle & Habillage façade',
        quoi: "12 panneaux directionnels sur axes principaux à 500m/1km/2km. Bâche façade 600m² 'Cosmos Angré — Ouverture Octobre 2026'. Totem entrée éclairé. Fléchage parking. Fiche Google Maps premium.",
        pourquoi: "Accès Angré complexes. Signalétique = réduction taux abandon visite -30%. Bâche façade = pub 24h/24 6 mois. Valeur OOH équivalente : 5–8 M FCFA.",
        comment: 'Autorisation mairie préalable. Bâche résistante UV. Google Maps : fiche vérifiée, photos HD, horaires, FAQ.',
        dates: [{ j: '01/07/2026', desc: 'Plan signalétique finalisé' }, { j: '15/07/2026', desc: 'Demandes autorisation mairie' }, { j: '01/08/2026', desc: 'Commande bâche et panneaux' }, { j: '01/09/2026', desc: '✅ Fiche Google Maps live' }, { j: '15/09/2026', desc: '✅ Pose signalétique complète' }, { j: '01/10/2026', desc: 'Totem + fléchage parking installés' }],
        budget: '6 500 000 FCFA', budget_detail: 'Bâche 600m² : 3 000 000 · 12 panneaux : 2 000 000 · Totem éclairé : 1 000 000 · Fléchage : 500 000',
        roi: 'Équivalent OOH payant : 6–8 M FCFA. Réduction taux abandon estimé -30%.',
        resp: 'Operations + Marketing + Mairie', livrable: 'Plan signalétique · Photos pose · Fiche Google Maps',
        start: '2026-08-01', end: '2026-10-01', phase: 'p3',
      },
      {
        id: '3-4', title: 'Campagne digitale intensive J-45 → J0',
        quoi: "Meta : 3 campagnes simultanées (Awareness/Consideration/Conversion). Google SEA : mots-clés 'centre commercial Abidjan', 'shopping Angré'. YouTube pre-roll chaînes CI. Retargeting visiteurs site. Budget doublé vs mois précédents.",
        pourquoi: 'J-45→J0 = fenêtre critique de décision. Personnes exposées 7+ fois : ×2 probabilité de visiter. Retargeting 3 000+ visiteurs du site.',
        comment: "A/B testing 4 versions créatifs minimum. Optimisation quotidienne. Pixel Meta installé depuis lancement site. Rapport bi-hebdo.",
        dates: [{ j: '01/09/2026', desc: 'Créatifs finalisés (vidéos+visuels)' }, { j: '01/09/2026', desc: '✅ LANCEMENT campagne intensive J-45' }, { j: '15/09/2026', desc: 'Bilan + optimisation' }, { j: '01/10/2026', desc: 'Sprint final — budget max' }, { j: '10/10/2026', desc: 'SMS blast membres Cosmos Club' }, { j: '16/10/2026', desc: '✅ Live stories toutes plateformes' }],
        budget: '10 000 000 FCFA', budget_detail: 'Meta Ads : 5 000 000 · Google SEA : 2 500 000 · YouTube : 1 500 000 · Création vidéo : 1 000 000',
        roi: '15 000 visiteurs Soft Opening. CPM estimé : 1 500–2 500 FCFA. 10M = ~5M impressions cible. Coût/visiteur digital : ~500 FCFA.',
        resp: 'Agence digitale + CM + DSI', livrable: 'Rapports bi-hebdo · Dashboard temps réel · Bilan ROI campagne',
        start: '2026-09-01', end: '2026-10-16', phase: 'p3',
      },
    ],
  },
  {
    id: 'p4', num: '04', label: 'Ouverture & Activation', period: '16 oct. → 30 nov. 2026', icon: '🎉',
    color: '#7B3FA0', light: '#f3ecfa',
    intro: "Les 6 premières semaines sont déterminantes pour l'habitude de fréquentation. Chaque weekend doit être un événement.",
    actions: [
      {
        id: '4-1', title: 'Soft Opening — 16 octobre 2026',
        quoi: "2 500 personnes : membres Cosmos Club + résidents Angré 7ème/8ème. Programme : 10h ruban officiel, animations enfants, concerts acoustiques galerie, 18h cocktail membres. Offres -15% enseignes. Live RS toute la journée.",
        pourquoi: "Soft Opening = événement exclusif → bouche-à-oreille avant grand public. Membres valorisés. Enseignes testent opérations avant affluence massive.",
        comment: 'Gestion flux : barrières + comptage entrée. Security briefée accueil premium. Parking fléché. Photographe + vidéaste pros.',
        dates: [{ j: '16/10/2026', desc: '✅ SOFT OPENING — 10h00' }, { j: '17/10/2026', desc: 'Débriefing ops + correctifs' }, { j: '17-23/10/2026', desc: 'Semaine Cosmos — offres coordonnées' }, { j: '24/10/2026', desc: 'Bilan Semaine Cosmos' }],
        budget: '8 000 000 FCFA', budget_detail: 'Animations : 3 000 000 · Catering cocktail : 2 000 000 · Production tech : 1 500 000 · Photo/vidéo : 1 000 000 · Signalétique J0 : 500 000',
        roi: '2 500 visiteurs × 25 000 FCFA = 62,5 M FCFA CA estimé J0. 500+ posts RS estimés #CosmosAngré.',
        resp: 'DGA + Operations + Toutes enseignes', livrable: 'Reportage photo/vidéo · Rapport trafic J0 · Rapport CA enseignes',
        start: '2026-10-16', end: '2026-10-23', phase: 'p4',
      },
      {
        id: '4-2', title: 'Inauguration officielle — 16 novembre 2026',
        quoi: "500 invités VIP. Programme : 17h30 accueil cocktail, 18h30 discours DG + invité institutionnel, 19h projection mapping façade 8 min (son et lumière), 20h dîner de gala galerie centrale, 22h concert artiste CI de renom. Live LinkedIn + YouTube.",
        pourquoi: "Établit le positionnement institutionnel pour 10 ans. Projection mapping = 'moment viral' garanti. Présence invité de marque = couverture nationale.",
        comment: 'Artiste : Serge Beynaud ou Charlotte Dipanda selon budget. Invitation personnelle DG à invité institutionnel 8 semaines avant.',
        dates: [{ j: '01/10/2026', desc: 'Confirmation artiste principal' }, { j: '01/11/2026', desc: 'Répétition projection mapping' }, { j: '14/11/2026', desc: 'Répétition générale complète' }, { j: '16/11/2026', desc: '✅ INAUGURATION — 17h30' }, { j: '17/11/2026', desc: 'Rapport médias + dossier presse J+1' }],
        budget: '35 000 000 FCFA', budget_detail: 'Agence événem. : 10 000 000 · Artiste : 8 000 000 · Projection mapping : 8 000 000 · Traiteur gala : 7 000 000 · Production tech : 2 000 000',
        roi: 'Valeur médiatique 40–60 M FCFA. +25 pts notoriété zone primaire. Objectif 100 000 vues vidéo mapping en 72h.',
        resp: 'DG + DGA + Agence événementielle', livrable: 'Film inauguration 3 min · Reportage premium · Retombées J+15',
        start: '2026-11-16', end: '2026-11-16', phase: 'p4',
      },
      {
        id: '4-3', title: '6 semaines thématiques post-ouverture',
        quoi: "Programme semaine par semaine : Gastronomie (17–23/10) · Famille (24–30/10) · Business (31/10–6/11) · Culture (7–13/11) · Mode (14–20/11) · Bien-être (21–30/11). Chaque semaine : offres enseignes dédiées + animation galerie + push RS + email Cosmos Club.",
        pourquoi: 'Visiteurs qui reviennent 3× le 1er mois → clients réguliers à 80%. Objectif : créer la répétition de visite le plus tôt possible.',
        comment: 'Calendrier fixé avec toutes enseignes en octobre. Brief 15 jours avant chaque semaine. Newsletter membre dédiée chaque semaine.',
        dates: [{ j: '17-23/10/2026', desc: 'Semaine Gastronomie' }, { j: '24-30/10/2026', desc: 'Semaine Famille' }, { j: '31/10-06/11', desc: 'Semaine Business' }, { j: '07-13/11/2026', desc: 'Semaine Culture' }, { j: '14-20/11/2026', desc: 'Semaine Mode' }, { j: '21-30/11/2026', desc: 'Semaine Bien-être' }],
        budget: '6 000 000 FCFA', budget_detail: 'Animations 6 semaines : 3 600 000 · Paid social : 1 800 000 · Signalétique thématique : 600 000',
        roi: 'Taux re-visite semaine 2 > 40%. CA mois 2 > mois 1. Construction habitude = valeur long terme.',
        resp: 'Marketing Manager + Directeur Centre + Enseignes', livrable: 'Rapport trafic hebdo · CA enseignes/semaine · Bilan novembre',
        start: '2026-10-17', end: '2026-11-30', phase: 'p4',
      },
    ],
  },
  {
    id: 'p5', num: '05', label: 'Croisière & Fidélisation', period: 'Déc. 2026 → Oct. 2027', icon: '🚀',
    color: '#1a6b6b', light: '#e8f5f5',
    intro: "Installer Cosmos Angré dans le quotidien. Objectifs an 1 : 500 000 visiteurs · 5 000 membres · 2,3 Mds FCFA CA/mois à M+12.",
    actions: [
      {
        id: '5-1', title: "Agenda culturel mensuel 'Cosmos Vivant'",
        quoi: "4 rendez-vous fixes/mois : 1er vendredi concert acoustique (artistes CI émergents, entrée libre) · 2ème samedi atelier enfants · 3ème jeudi after-work networking entrepreneurs · Dernier dimanche marché créateurs locaux. Événements trimestriels premium : expo art africain, soirée chef invité, conférence.",
        pourquoi: 'Centre uniquement commercial vieillit vite. Centre culturel vivant fidélise, différencie, génère contenu RS continu. Ref : Mall of the Emirates, Two Rivers Nairobi.',
        comment: 'Partenariats artistes locaux. Budget animation prévisible inscrit exploitation. Régie intérieure gère logistique.',
        dates: [{ j: '01/12/2026', desc: 'Programme annuel 2027 finalisé' }, { j: 'Mensuel', desc: '4 rendez-vous fixes/mois' }, { j: 'Trimestriel', desc: 'Événement premium trimestriel' }],
        budget: '18 000 000 FCFA/an', budget_detail: 'Concerts (12×600k) : 7 200 000 · Ateliers enfants : 3 600 000 · After-work : 3 600 000 · Marché créateurs : 2 400 000 · Events trim. : 1 200 000',
        roi: '+2 000 visites/événement × 4/mois × 12 mois = 96 000 visites/an → +1,92 Mds FCFA CA supplémentaire enseignes.',
        resp: 'Events Manager + Partenaires culturels + Marketing', livrable: 'Programme mensuel · Rapport fréquentation · NPS post-événement',
        start: '2026-12-01', end: '2027-10-16', phase: 'p5',
      },
      {
        id: '5-2', title: 'Cosmos Club — Animation & Montée en niveau',
        quoi: "Campagnes upgrade : SMS membres Silver proches seuil Gold. Offres exclusives Platinum : rooftop privatif, invitations dîners institutionnels, conciergerie. Double points nouvelles enseignes mois 1. Partenariats croisés : points valables chez partenaires (banque, clinique, station).",
        pourquoi: 'Programme non animé meurt en 3 mois. Membres Platinum dépensent ×3 vs Silver. Animation = récurrence de visite.',
        comment: 'CRM HubSpot indispensable. Automatisation triggers (seuils, anniversaires, inactivité). Rapport mensuel activité par niveau.',
        dates: [{ j: '16/10/2026', desc: 'Activation cartes J0' }, { j: 'Mensuel', desc: 'SMS upgrade membres proches seuil' }, { j: 'Trimestriel', desc: 'Événement exclusif Platinum' }, { j: '16/10/2027', desc: 'Bilan an 1 — refonte si nécessaire' }],
        budget: '4 000 000 FCFA/an', budget_detail: 'CRM abonnement : 1 500 000 · SMS 12 campagnes : 600 000 · Events Platinum : 1 200 000 · Dotations : 700 000',
        roi: '5 000 membres × panier +35% × 2 visites/mois = +400 M FCFA/an CA enseignes. Coût/membre actif : 800 FCFA/an.',
        resp: 'CRM Manager + Marketing + DSI', livrable: 'Dashboard membres mensuel · Taux activité · NPS membres vs non-membres',
        start: '2026-10-16', end: '2027-10-16', phase: 'p5',
      },
    ],
  },
];

const GANTT_MONTHS = [
  { key: '03/26', label: 'Mar 26' },
  { key: '04/26', label: 'Avr 26' },
  { key: '05/26', label: 'Mai 26' },
  { key: '06/26', label: 'Juin 26' },
  { key: '07/26', label: 'Juil 26' },
  { key: '08/26', label: 'Août 26' },
  { key: '09/26', label: 'Sep 26' },
  { key: '10/26', label: 'Oct 26' },
  { key: '11/26', label: 'Nov 26' },
  { key: '12/26', label: 'Déc 26' },
  { key: '01/27', label: 'Jan 27' },
  { key: '02/27', label: 'Fév 27' },
];

const parseMonth = (s: string): number => {
  const parts = s.split('-').map(Number);
  const m = parts[1];
  const monthMap: Record<number, number> = { 3: 0, 4: 1, 5: 2, 6: 3, 7: 4, 8: 5, 9: 6, 10: 7, 11: 8, 12: 9, 1: 10, 2: 11 };
  return monthMap[m] ?? 0;
};

const ALL_ACTIONS = PHASES.flatMap(p => p.actions.map(a => ({ ...a, phaseColor: p.color, phaseLabel: p.label })));

const DateTag: React.FC<{ d: DateItem; color: string }> = ({ d, color }) => {
  const isKey = d.desc.includes('✅') || d.desc.includes('⚠️');
  return (
    <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 6 }}>
      <div style={{ fontSize: 10, fontWeight: 700, color: isKey ? '#fff' : NAVY, background: isKey ? color : '#e8ecf5', padding: '2px 8px', borderRadius: 6, whiteSpace: 'nowrap', flexShrink: 0, minWidth: 90, textAlign: 'center' }}>{d.j}</div>
      <div style={{ fontSize: 11, color: 'rgba(26,20,16,.65)', lineHeight: 1.5 }}>{d.desc}</div>
    </div>
  );
};

const ActionCard: React.FC<{ a: Action }> = ({ a }) => {
  const [open, setOpen] = useState(false);
  const ph = PHASES.find(p => p.id === a.phase);
  const color = ph?.color || NAVY;
  const light = ph?.light || '#edf0f8';
  return (
    <div style={{ background: '#fff', borderRadius: 10, border: '1px solid rgba(26,20,16,.08)', overflow: 'hidden', marginBottom: 10 }}>
      <div onClick={() => setOpen(!open)} style={{ padding: '14px 18px', cursor: 'pointer', display: 'flex', alignItems: 'flex-start', gap: 14 }}>
        <div style={{ width: 30, height: 30, borderRadius: '50%', background: light, border: `2px solid ${color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color, flexShrink: 0 }}>{a.id}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#1a1410', marginBottom: 4 }}>{a.title}</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 9, padding: '2px 8px', borderRadius: 10, background: 'rgba(201,148,58,.12)', color: '#8a5a10', fontWeight: 600 }}>💰 {a.budget}</span>
            <span style={{ fontSize: 9, padding: '2px 8px', borderRadius: 10, background: 'rgba(13,27,75,.06)', color: NAVY, fontWeight: 600 }}>👤 {a.resp}</span>
          </div>
        </div>
        <div style={{ fontSize: 14, color: 'rgba(26,20,16,.25)', flexShrink: 0 }}>{open ? '▲' : '▼'}</div>
      </div>
      {open && (
        <div style={{ borderTop: '1px solid rgba(26,20,16,.05)', padding: '16px 18px 18px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
            <div style={{ background: light, borderRadius: 8, padding: 12 }}>
              <div style={{ fontSize: 8, letterSpacing: '.18em', textTransform: 'uppercase', color, fontWeight: 700, marginBottom: 8 }}>Quoi</div>
              <div style={{ fontSize: 11, color: '#1a1410', lineHeight: 1.75 }}>{a.quoi}</div>
            </div>
            <div style={{ background: '#f8f6f2', borderRadius: 8, padding: 12 }}>
              <div style={{ fontSize: 8, letterSpacing: '.18em', textTransform: 'uppercase', color: 'rgba(26,20,16,.4)', fontWeight: 700, marginBottom: 8 }}>Pourquoi</div>
              <div style={{ fontSize: 11, color: 'rgba(26,20,16,.65)', lineHeight: 1.75 }}>{a.pourquoi}</div>
            </div>
            <div style={{ background: '#f8f6f2', borderRadius: 8, padding: 12 }}>
              <div style={{ fontSize: 8, letterSpacing: '.18em', textTransform: 'uppercase', color: 'rgba(26,20,16,.4)', fontWeight: 700, marginBottom: 8 }}>Comment</div>
              <div style={{ fontSize: 11, color: 'rgba(26,20,16,.65)', lineHeight: 1.75 }}>{a.comment}</div>
            </div>
            <div style={{ background: light, borderRadius: 8, padding: 12 }}>
              <div style={{ fontSize: 8, letterSpacing: '.18em', textTransform: 'uppercase', color, fontWeight: 700, marginBottom: 8 }}>ROI & Résultats attendus</div>
              <div style={{ fontSize: 11, color: '#1a1410', lineHeight: 1.75 }}>{a.roi}</div>
            </div>
          </div>
          <div style={{ background: 'rgba(201,148,58,.06)', border: '1px solid rgba(201,148,58,.2)', borderRadius: 8, padding: '10px 14px', marginBottom: 10 }}>
            <div style={{ fontSize: 8, letterSpacing: '.18em', textTransform: 'uppercase', color: '#8a5a10', fontWeight: 700, marginBottom: 6 }}>Ventilation budget</div>
            <div style={{ fontSize: 11, color: '#1a1410' }}>{a.budget_detail}</div>
          </div>
          <div style={{ background: 'rgba(13,27,75,.03)', borderRadius: 8, padding: '10px 14px', marginBottom: 10 }}>
            <div style={{ fontSize: 8, letterSpacing: '.18em', textTransform: 'uppercase', color: NAVY, fontWeight: 700, marginBottom: 10 }}>Calendrier d'exécution</div>
            {a.dates.map((d, i) => <DateTag key={i} d={d} color={color} />)}
          </div>
          <div style={{ background: light, borderRadius: 8, padding: '10px 14px' }}>
            <div style={{ fontSize: 8, letterSpacing: '.18em', textTransform: 'uppercase', color, fontWeight: 700, marginBottom: 6 }}>Livrables clés</div>
            <div style={{ fontSize: 11, color: '#1a1410' }}>{a.livrable}</div>
          </div>
        </div>
      )}
    </div>
  );
};

const GanttTab: React.FC = () => (
  <div style={{ overflowX: 'auto' }}>
    <div style={{ minWidth: 900 }}>
      <div style={{ display: 'grid', gridTemplateColumns: `200px repeat(${GANTT_MONTHS.length},1fr)`, gap: 0, marginBottom: 2 }}>
        <div style={{ padding: '8px 12px', fontSize: 9, fontWeight: 700, color: 'rgba(26,20,16,.4)', letterSpacing: '.15em', textTransform: 'uppercase' }}>ACTION</div>
        {GANTT_MONTHS.map(m => (
          <div key={m.key} style={{ padding: '8px 4px', textAlign: 'center', fontSize: 9, fontWeight: 700, color: NAVY, background: 'rgba(13,27,75,.04)', borderRadius: 4, margin: '0 1px' }}>{m.label}</div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: `200px repeat(${GANTT_MONTHS.length},1fr)`, gap: 0, marginBottom: 8, alignItems: 'center' }}>
        <div style={{ padding: '4px 12px', fontSize: 9, fontWeight: 700, color: '#c62828' }}>🚨 Ouverture 16 Oct.</div>
        {GANTT_MONTHS.map((m, i) => (
          <div key={m.key} style={{ height: 20, margin: '0 1px', background: i === 7 ? 'rgba(198,40,40,.12)' : 'transparent', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {i === 7 && <div style={{ width: 2, height: 16, background: '#c62828', borderRadius: 2, margin: '0 auto' }} />}
          </div>
        ))}
      </div>

      {PHASES.map(ph => (
        <div key={ph.id} style={{ marginBottom: 12 }}>
          <div style={{ padding: '6px 12px', background: ph.color, borderRadius: 6, marginBottom: 4, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 14 }}>{ph.icon}</span>
            <span style={{ fontSize: 10, fontWeight: 700, color: '#fff', letterSpacing: '.1em' }}>{ph.label} — {ph.period}</span>
          </div>
          {ph.actions.map(a => {
            const s = parseMonth(a.start);
            const e = parseMonth(a.end);
            return (
              <div key={a.id} style={{ display: 'grid', gridTemplateColumns: `200px repeat(${GANTT_MONTHS.length},1fr)`, gap: 0, alignItems: 'center', marginBottom: 3 }}>
                <div style={{ padding: '4px 12px', fontSize: 10, color: '#1a1410', lineHeight: 1.3, borderLeft: `3px solid ${ph.color}`, paddingLeft: 8 }}>
                  <span style={{ fontSize: 9, fontWeight: 700, color: ph.color }}>{a.id}</span> {a.title.length > 30 ? a.title.substring(0, 28) + '…' : a.title}
                </div>
                {GANTT_MONTHS.map((_, i) => {
                  const inRange = i >= s && i <= e;
                  const isStart = i === s;
                  const isEnd = i === e;
                  return (
                    <div key={i} style={{ height: 22, margin: '0 1px', background: inRange ? ph.color + 'cc' : 'rgba(26,20,16,.04)', borderRadius: isStart ? '6px 0 0 6px' : isEnd ? '0 6px 6px 0' : inRange ? '0' : '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {isStart && <span style={{ fontSize: 8, color: '#fff', fontWeight: 700, padding: '0 4px', whiteSpace: 'nowrap' }}>▶</span>}
                      {isEnd && isStart && <span style={{ fontSize: 7, color: '#fff', padding: '0 3px' }}>●</span>}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      ))}

      <div style={{ marginTop: 16, padding: '12px 16px', background: 'rgba(13,27,75,.03)', borderRadius: 8, display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ fontSize: 9, fontWeight: 700, color: 'rgba(26,20,16,.4)', letterSpacing: '.15em' }}>PHASES :</div>
        {PHASES.map(p => (
          <div key={p.id} style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <div style={{ width: 16, height: 10, borderRadius: 3, background: p.color + 'cc' }} />
            <span style={{ fontSize: 9, color: '#1a1410' }}>{p.icon} {p.label}</span>
          </div>
        ))}
        <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginLeft: 'auto' }}>
          <div style={{ width: 16, height: 10, borderRadius: 3, background: 'rgba(198,40,40,.3)' }} />
          <span style={{ fontSize: 9, color: '#c62828', fontWeight: 700 }}>Ouverture 16 Oct.</span>
        </div>
      </div>
    </div>
  </div>
);

const PlanActionTab: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const filtered = filter === 'all' ? ALL_ACTIONS : ALL_ACTIONS.filter(a => a.phase === filter);
  return (
    <div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
        <button onClick={() => setFilter('all')} style={{ padding: '5px 14px', borderRadius: 20, border: 'none', background: filter === 'all' ? NAVY : 'rgba(13,27,75,.08)', color: filter === 'all' ? '#fff' : NAVY, fontSize: 10, fontWeight: 600, cursor: 'pointer' }}>Tout ({ALL_ACTIONS.length})</button>
        {PHASES.map(p => (
          <button key={p.id} onClick={() => setFilter(p.id)} style={{ padding: '5px 14px', borderRadius: 20, border: 'none', background: filter === p.id ? p.color : 'rgba(26,20,16,.06)', color: filter === p.id ? '#fff' : p.color, fontSize: 10, fontWeight: 600, cursor: 'pointer' }}>{p.icon} {p.label}</button>
        ))}
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 11 }}>
          <thead>
            <tr style={{ background: NAVY }}>
              {['Réf', 'Action', 'Phase', 'Démarrage', 'Deadline', 'Budget', 'Responsable', 'Livrables', 'Statut'].map(h => (
                <th key={h} style={{ padding: '10px 12px', textAlign: 'left', color: '#fff', fontSize: 9, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((a, i) => {
              const ph = PHASES.find(p => p.id === a.phase);
              const keyDate = a.dates.find(d => d.desc.includes('✅'));
              const deadlineDate = keyDate ? keyDate.j : a.dates[a.dates.length - 1]?.j;
              const startDate = a.dates[0]?.j;
              return (
                <tr key={a.id} style={{ background: i % 2 === 0 ? '#fff' : 'rgba(13,27,75,.02)', borderBottom: '1px solid rgba(26,20,16,.05)' }}>
                  <td style={{ padding: '10px 12px', fontWeight: 700, color: ph?.color, whiteSpace: 'nowrap' }}>{a.id}</td>
                  <td style={{ padding: '10px 12px', fontWeight: 600, color: '#1a1410', minWidth: 180 }}>{a.title}</td>
                  <td style={{ padding: '10px 12px' }}>
                    <span style={{ background: ph?.color + '18', color: ph?.color, padding: '2px 8px', borderRadius: 10, fontSize: 9, fontWeight: 700, whiteSpace: 'nowrap' }}>{ph?.icon} {ph?.label}</span>
                  </td>
                  <td style={{ padding: '10px 12px', whiteSpace: 'nowrap' }}>
                    <span style={{ background: 'rgba(13,27,75,.08)', color: NAVY, padding: '2px 8px', borderRadius: 6, fontSize: 10, fontWeight: 600 }}>{startDate}</span>
                  </td>
                  <td style={{ padding: '10px 12px', whiteSpace: 'nowrap' }}>
                    <span style={{ background: 'rgba(198,40,40,.1)', color: '#c62828', padding: '2px 8px', borderRadius: 6, fontSize: 10, fontWeight: 700 }}>{deadlineDate}</span>
                  </td>
                  <td style={{ padding: '10px 12px', whiteSpace: 'nowrap' }}>
                    <span style={{ background: 'rgba(201,148,58,.12)', color: '#8a5a10', padding: '2px 8px', borderRadius: 6, fontSize: 10, fontWeight: 600 }}>{a.budget}</span>
                  </td>
                  <td style={{ padding: '10px 12px', fontSize: 10, color: 'rgba(26,20,16,.65)', minWidth: 140 }}>{a.resp}</td>
                  <td style={{ padding: '10px 12px', fontSize: 10, color: 'rgba(26,20,16,.65)', minWidth: 160 }}>{a.livrable.substring(0, 60)}{a.livrable.length > 60 ? '…' : ''}</td>
                  <td style={{ padding: '10px 12px' }}>
                    <span style={{ background: 'rgba(26,20,16,.06)', color: 'rgba(26,20,16,.4)', padding: '2px 8px', borderRadius: 10, fontSize: 9, fontWeight: 600 }}>En attente</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: 20, display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10 }}>
        <div style={{ background: NAVY, borderRadius: 10, padding: '14px 16px', color: '#fff' }}>
          <div style={{ fontSize: 9, letterSpacing: '.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,.4)', marginBottom: 6 }}>Budget total estimé</div>
          <div style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 28, fontWeight: 300, color: GOLD }}>~150 M FCFA</div>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,.4)', marginTop: 4 }}>Sur 18 actions · 5 phases</div>
        </div>
        <div style={{ background: 'rgba(198,40,40,.08)', border: '1px solid rgba(198,40,40,.15)', borderRadius: 10, padding: '14px 16px' }}>
          <div style={{ fontSize: 9, letterSpacing: '.15em', textTransform: 'uppercase', color: 'rgba(198,40,40,.6)', marginBottom: 6 }}>Prochaine deadline critique</div>
          <div style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 22, fontWeight: 600, color: '#c62828' }}>01/03/2026</div>
          <div style={{ fontSize: 10, color: 'rgba(198,40,40,.7)', marginTop: 4 }}>Réservation espaces OOH (délais 4 sem.)</div>
        </div>
        <div style={{ background: 'rgba(74,117,88,.08)', border: '1px solid rgba(74,117,88,.15)', borderRadius: 10, padding: '14px 16px' }}>
          <div style={{ fontSize: 9, letterSpacing: '.15em', textTransform: 'uppercase', color: 'rgba(74,117,88,.6)', marginBottom: 6 }}>Actions en cours (mars 2026)</div>
          <div style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 28, fontWeight: 300, color: '#4A7558' }}>3</div>
          <div style={{ fontSize: 10, color: 'rgba(74,117,88,.7)', marginTop: 4 }}>Brand Book · OOH · Comptes RS</div>
        </div>
      </div>
    </div>
  );
};

interface TabDef {
  id: string;
  label: string;
}

const Plan360: React.FC = () => {
  const TABS: TabDef[] = [
    { id: 'gantt', label: '📊 Gantt' },
    { id: 'plan', label: '📋 Plan d\'action' },
    ...PHASES.map(p => ({ id: p.id, label: `${p.icon} Phase ${p.num}` })),
  ];
  const [tab, setTab] = useState('gantt');
  const activePhase = PHASES.find(p => p.id === tab);

  return (
    <div id="plan360" className="px-4 sm:px-8 lg:px-[72px] pb-16">
      <div className="bg-white rounded-2xl border border-black/[.06] overflow-hidden shadow-[0_2px_20px_rgba(0,0,0,.04)]">
        {/* Header */}
        <div style={{ background: `linear-gradient(135deg,${NAVY},#1a3060)`, color: '#fff', padding: '28px 36px 22px' }}>
          <div style={{ fontSize: 8, letterSpacing: '.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,.3)', marginBottom: 8 }}>NEW HEAVEN SA · CRMC · MARS 2026 · CONFIDENTIEL</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 34, fontWeight: 300, lineHeight: 1, marginBottom: 4 }}>Plan Marketing Opérationnel</div>
              <div style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 16, fontStyle: 'italic', color: GOLD }}>Cosmos Angré — Un monde à part</div>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              {[{ v: '16 Oct.', l: 'Soft Opening' }, { v: '16 Nov.', l: 'Inauguration' }, { v: '18 actions', l: 'Planifiées' }, { v: '~150 M', l: 'Budget FCFA' }].map(k => (
                <div key={k.l} style={{ background: 'rgba(255,255,255,.07)', borderRadius: 8, padding: '10px 14px', textAlign: 'center', minWidth: 80 }}>
                  <div style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 20, fontWeight: 300, color: GOLD }}>{k.v}</div>
                  <div style={{ fontSize: 9, color: 'rgba(255,255,255,.4)', marginTop: 2 }}>{k.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Onglets */}
        <div style={{ background: '#fff', borderBottom: '2px solid rgba(13,27,75,.08)', padding: '0 36px', display: 'flex', gap: 0, overflowX: 'auto' }}>
          {TABS.map(t => {
            const ph = PHASES.find(p => p.id === t.id);
            const active = tab === t.id;
            return (
              <button key={t.id} onClick={() => setTab(t.id)}
                style={{ padding: '14px 18px', border: 'none', background: 'transparent', borderBottom: active ? `3px solid ${ph?.color || NAVY}` : '3px solid transparent', color: active ? (ph?.color || NAVY) : 'rgba(26,20,16,.4)', fontSize: 11, fontWeight: active ? 700 : 500, cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all .15s' }}>
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Contenu */}
        <div style={{ padding: '24px 36px 48px' }}>
          {tab === 'gantt' && <GanttTab />}
          {tab === 'plan' && <PlanActionTab />}
          {activePhase && (
            <div>
              <div style={{ background: activePhase.light, borderLeft: `4px solid ${activePhase.color}`, borderRadius: 8, padding: '14px 18px', marginBottom: 20, fontSize: 12, color: 'rgba(26,20,16,.65)', lineHeight: 1.7 }}>
                <strong style={{ color: activePhase.color }}>{activePhase.icon} {activePhase.label}</strong> · {activePhase.period}<br />{activePhase.intro}
              </div>
              {activePhase.actions.map(a => <ActionCard key={a.id} a={a} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Plan360;
