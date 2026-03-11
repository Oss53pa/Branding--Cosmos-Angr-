/* ─────────────────────────────────────────────────────────────────────────────
   Parcours Client — Volume 3 · Cosmos Angré · Données structurées
   Contexte : Centre commercial mixed-use, Angré 8ème tranche, Abidjan
   Ouverture Q4 2026 · 3 niveaux · 2 parkings · 120+ enseignes
   ───────────────────────────────────────────────────────────────────────────── */

import React from 'react';
import {
  Car, ParkingSquare, DoorOpen, Sparkles, Store, UtensilsCrossed,
  Heart, MapPin, Eye, Smartphone, Users, AlertTriangle,
  Lightbulb, BarChart3, UserCircle, Briefcase, GraduationCap, Baby,
  Wifi, TrendingUp, Target,
  Signpost, PanelTop, ArrowRight, Navigation, Info,
  Calendar, Flag, ArrowUpRight, Monitor,
} from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════════════════
   CONSTANTES COSMOS ANGRÉ
   ═══════════════════════════════════════════════════════════════════════════ */

export const COSMOS = {
  name: 'Cosmos Angré',
  location: 'Angré 8ème tranche, Cocody, Abidjan',
  axes: ['Boulevard Latrille', 'Boulevard Mitterrand', 'Carrefour Château d\'eau'],
  ouverture: '16 Octobre 2026',
  niveaux: 3,          // RDC + R+1 + R+2
  enseignes: 120,
  surface: '25 000 m²',
  parkingSousSol: { places: 450, niveaux: 2, systeme: 'ANPR + capteurs IoT' },
  parkingSurface: { places: 200, systeme: 'Agents + barrières automatiques' },
  foodCourt: { enseignes: 12, places: 400, terrasse: true },
  restaurantGastro: 'Le Cosmos — cuisine afro-fusion',
  restaurantBrasserie: 'La Terrasse — brasserie vue panoramique',
  cosmosClub: {
    silver: 'Inscription gratuite · Points ×1 · WiFi premium',
    gold: 'Après 100 000 pts · Points ×1.5 · Parking prioritaire · Espace enfants gratuit',
    platinum: 'Sur invitation ou 500 000 pts · Points ×2 · Lounge VIP · Personal shopper · Conciergerie · Voiturier',
  },
  archi: {
    facade: 'Aluminium nervuré mat grège doré #B8AA8C',
    murs: 'Kutu Baffle noyer fumé #7A5C42 + Terracotta RAL 040',
    sol: 'Terrazzo granito beige #D4C9B0',
    vegetation: 'Palmiers, ficus, plantes suspendues tropicales',
  },
};

/* ═══════════════════════════════════════════════════════════════════════════
   MODULE 1 — Journey Map · 10 couches superposables
   ═══════════════════════════════════════════════════════════════════════════ */

export interface JourneyLayer {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: string;
}

export const journeyLayers: JourneyLayer[] = [
  { id: 'phase',        label: 'Phase du parcours',           icon: <MapPin size={14} />,          color: '#10B981' },
  { id: 'actions',      label: 'Actions client',              icon: <ArrowRight size={14} />,      color: '#3B82F6' },
  { id: 'touchPhys',    label: 'Points de contact physiques', icon: <Eye size={14} />,             color: '#8B5CF6' },
  { id: 'touchDigit',   label: 'Points de contact digitaux',  icon: <Smartphone size={14} />,      color: '#06B6D4' },
  { id: 'emotions',     label: 'Émotions & satisfaction',     icon: <Heart size={14} />,           color: '#F43F5E' },
  { id: 'personnel',    label: 'Personnel impliqué',          icon: <Users size={14} />,           color: '#F59E0B' },
  { id: 'techno',       label: 'Technologies',                icon: <Wifi size={14} />,            color: '#6366F1' },
  { id: 'painPoints',   label: 'Pain points',                 icon: <AlertTriangle size={14} />,   color: '#EF4444' },
  { id: 'opportunites', label: 'Opportunités',                icon: <Lightbulb size={14} />,       color: '#22C55E' },
  { id: 'kpis',         label: 'KPIs associés',               icon: <BarChart3 size={14} />,       color: '#0EA5E9' },
];

export interface JourneyStage {
  id: string;
  num: string;
  label: string;
  icon: React.ReactNode;
  layers: Record<string, string[]>;
}

export const journeyStages: JourneyStage[] = [
  {
    id: 'approche', num: '01', label: 'Approche', icon: <Car size={18} strokeWidth={1.5} />,
    layers: {
      phase:       ['Découverte depuis les axes — Bd Latrille / Bd Mitterrand / Carrefour Château d\'eau'],
      actions:     ['Repère les panneaux « Cosmos Angré → 500m »', 'Suit le fléchage lumineux', 'Active Waze / Google Maps vers « Cosmos Angré »', 'Aperçoit la façade aluminium grège doré depuis le boulevard'],
      touchPhys:   ['12 panneaux directionnels (2km / 1km / 500m / 200m)', 'Totem lumineux gold/navy H: 4m à l\'entrée', 'Bâche façade 600m² « Ouverture Oct. 2026 »', 'Éclairage façade LED révélant l\'aluminium nervuré'],
      touchDigit:  ['Fiche Google Maps vérifiée (photos HD, horaires, FAQ)', 'Waze Ads géociblé 3km Angré + Cocody + Riviera', 'Post Instagram sponsorisé géolocalisé', 'QR code panneaux → téléchargement app Cosmos Club'],
      emotions:    ['Curiosité — « C\'est quoi ce nouveau centre ? »', 'Anticipation — « Ça a l\'air premium »', 'Inquiétude navigation — rond-points multiples Angré'],
      personnel:   ['Agents de signalisation extérieurs (événements, J0, weekends forts)', 'Agent sécurité barrière entrée parking surface'],
      techno:      ['GPS / Navigation (Google Maps, Waze, Apple Maps)', 'QR code panneaux → deep link app', 'Éclairage LED façade automatisé crépuscule/aube'],
      painPoints:  ['Accès Angré complexe — 4 rond-points entre Château d\'eau et 8ème tranche', 'Signalétique insuffisante la nuit — axes Angré mal éclairés', 'Embouteillages Bd Latrille 17h-19h (retour bureau)', 'Confusion avec autres commerces zone Angré'],
      opportunites: ['Partenariat Waze Ads ciblé CSP+ Cocody/Riviera', 'Signalétique lumineuse solaire nocturne', 'Panneau compte à rebours « J-XX avant ouverture »', 'Accord mairie pour fléchage permanent sur 3 axes'],
      kpis:        ['Taux d\'arrivée sans détour (GPS analytics)', 'Temps moyen trajet Château d\'eau → parking', 'Impressions Waze Ads / Google Maps mensuelles', 'Taux clic fiche Google Maps'],
    },
  },
  {
    id: 'parking', num: '02', label: 'Parking', icon: <ParkingSquare size={18} strokeWidth={1.5} />,
    layers: {
      phase:       ['Stationnement — 2 systèmes : sous-sol ANPR 450 places + surface 200 places'],
      actions:     ['Choisit parking sous-sol (couvert, sécurisé) ou surface (rapide)', 'Suit les compteurs LED vert/rouge par zone', 'Note sa zone colorée (A bleu / B vert / C orange / D violet)', 'Mémorise via app Cosmos Club « localiser mon véhicule »'],
      touchPhys:   ['Compteurs LED places libres par zone et niveau', 'Signalétique zones colorées A-B-C-D (sol + murs + plafond)', 'Bornes interphones d\'urgence tous les 50m', 'Éclairage LED haute intensité — zéro zone sombre', 'Rampes piétons séparées des véhicules'],
      touchDigit:  ['App Cosmos Club — localisation véhicule GPS indoor', 'Paiement parking NFC / QR code (sans file caisse)', 'Notification push Gold/Platinum : place réservée niveau -1', 'SMS rappel localisation véhicule'],
      emotions:    ['Rassurance — « C\'est propre et bien éclairé »', 'Confort si guidé rapidement', 'Frustration si saturé samedi 15h-18h', 'Sécurité — caméras visibles partout'],
      personnel:   ['Agents parking (samedi, événements, J0)', 'Équipe sécurité vidéosurveillance 24/7', 'Agent caisse parking sortie (backup automates)'],
      techno:      ['Capteurs IoT places individuelles (sous-sol)', 'Caméras ANPR reconnaissance plaques', 'Bornes de paiement automatiques (CB, mobile money Orange/MTN/Wave)', 'Barrières automatiques surface', 'Bornes recharge véhicules électriques (×4)'],
      painPoints:  ['Saturation sous-sol samedi 15h-18h', 'Piétons dans les rampes véhicules (risque accident)', 'Embouteillage sortie 19h-20h', 'Paiement mobile money lent (réseau)', 'Chaleur parking surface (pas de couvert)'],
      opportunites: ['Parking prioritaire zone A-1 pour Cosmos Club Gold/Platinum', 'Bornes recharge électrique (1ers à Abidjan en mall)', 'Voiturier service Platinum (conciergerie gère la voiture)', 'Abonnement parking mensuel entreprises zone Angré'],
      kpis:        ['Taux d\'occupation par zone et par heure', 'Temps moyen recherche place (cible < 3 min)', 'NPS parking (cible > 35)', 'Revenu parking / places / mois', 'Incidents sécurité / mois'],
    },
  },
  {
    id: 'entree', num: '03', label: 'Entrée', icon: <DoorOpen size={18} strokeWidth={1.5} />,
    layers: {
      phase:       ['Transition extérieur → intérieur — « effet seuil » architectural'],
      actions:     ['Franchit les portes automatiques vitrées', 'Ressent le parfum signature Cosmos', 'Découvre la double hauteur + végétalisation + terrazzo', 'Consulte la borne tactile wayfinding « Vous êtes ici »', 'Reçoit notification push bienvenue (si app installée)'],
      touchPhys:   ['Portes automatiques premium double battant', 'Double hauteur plafond — effet cathédrale', 'Sol terrazzo granito beige #D4C9B0', 'Végétalisation tropicale (palmiers, ficus suspendus)', 'Diffuseur parfum signature Cosmos (senteur boisée-vanillée)', 'Borne plan interactif tactile 55"', 'Desk accueil / Cosmos Club à droite de l\'entrée principale'],
      touchDigit:  ['App Cosmos Club — plan interactif du centre', 'Notification push bienvenue « Bienvenue chez Cosmos Angré ! »', 'WiFi gratuit — portail captif « Cosmos Guest WiFi »', 'Écran digital directory (enseignes, étages, services)'],
      emotions:    ['Émerveillement — « Waouh, c\'est pas un mall normal »', 'Effet seuil : rupture nette avec la chaleur/bruit extérieur', 'Fraîcheur climatisation + parfum = sensation premium', 'Confiance — personnel accueillant, lieu propre'],
      personnel:   ['2 hôtesses d\'accueil bilingues FR/EN (desk principal)', 'Agent de sécurité en civil (discret, pas intimidant)', 'Agent Cosmos Club (inscription, info, orientation)', 'Personnel nettoyage visible (sol terrazzo impeccable)'],
      techno:      ['Écran tactile wayfinding 55" Android + API Cosmos', 'Détecteurs de flux (comptage entrées/sorties temps réel)', 'Diffuseur parfum automatisé (programmation horaire)', 'Climatisation zone entrée renforcée (sas thermique)', 'Caméras HD entrée + reconnaissance faciale VIP (opt-in Platinum)'],
      painPoints:  ['File d\'attente entrée lors événements / J0', 'Orientation confuse 1ère visite — « où sont les toilettes ? »', 'Sas thermique insuffisant → air chaud qui entre', 'Desk Cosmos Club sous-staffé weekends', 'Poussettes / PMR : accès porte étroite côté parking'],
      opportunites: ['Welcome pack 1ère visite (plan + coupon -10% food court)', 'Inscription Cosmos Club sur tablette à l\'entrée (cadeau bienvenue)', 'Écran « Aujourd\'hui chez Cosmos » (événements, promos flash)', 'Zone selfie/photo avec logo Cosmos (UGC Instagram)'],
      kpis:        ['Flux entrées / sorties par heure et par jour', 'Taux de consultation borne wayfinding', 'Inscriptions Cosmos Club à l\'entrée / jour', 'Temps d\'orientation 1ère visite (cible < 2 min)', 'NPS accueil (cible > 50)'],
    },
  },
  {
    id: 'hall', num: '04', label: 'Hall central', icon: <Sparkles size={18} strokeWidth={1.5} />,
    layers: {
      phase:       ['Cœur de l\'expérience — atrium central 3 niveaux, verrière 12m, point de convergence'],
      actions:     ['S\'arrête pour admirer l\'atrium (verrière, palmiers, lumière naturelle)', 'Prend des photos/vidéos pour Instagram/TikTok', 'Consulte les écrans LED (événements, promos, enseignes)', 'Décide de son itinéraire : RDC mode, R+1 services, R+2 food court'],
      touchPhys:   ['Atrium central avec verrière zénithale 12m de haut', 'Végétalisation tropicale 3 niveaux (palmiers 8m, plantes suspendues)', 'Murs intérieurs Kutu Baffle noyer fumé + terracotta', 'Espace événementiel central modulable 120m² (scène + son)', 'Écrans LED grand format ×4 (contenu rotatif enseignes/événements)', 'Mobilier design lounge central (banquettes gold/navy)', 'Fontaine/miroir d\'eau central (signature architecturale)'],
      touchDigit:  ['WiFi Cosmos haute densité gratuit (portail captif → app)', 'App — « Événements du jour chez Cosmos »', 'Écrans LED contenu dynamique (API enseignes)', 'Hashtag #CosmosAngré affiché partout → UGC', 'QR code mobilier → programme Cosmos Club'],
      emotions:    ['Émerveillement maximal — lumière naturelle + végétation + architecture', 'Sentiment de « lieu de vie » pas juste commercial', 'Fierté — « On a ça à Abidjan maintenant »', 'Envie de partager (photos RS)'],
      personnel:   ['Équipe événementiel (installations, animations)', 'Conciergerie / Point info central (desk atrium RDC)', 'Personnel nettoyage atrium (vitrage, plantes, sol)', 'DJ / animateur lors événements (vendredi soir, weekends)'],
      techno:      ['Écrans LED 4K ×4 gestion centralisée CMS', 'WiFi haute densité 200+ connexions simultanées', 'Sonorisation ambiante zonée (atrium vs galeries vs food court)', 'Éclairage scénographique programmable (journée → soirée)', 'Capteurs environnement (température, humidité, CO2)'],
      painPoints:  ['Bruit excessif lors événements (résonance atrium)', 'Signalétique étages insuffisante — « c\'est où le food court ? »', 'Chaleur excessive sous verrière l\'après-midi (effet serre)', 'Foule dense samedi → claustrophobie certains visiteurs', 'Manque de prises électriques dans zone lounge'],
      opportunites: ['Événements culturels mensuels « Cosmos Vivant » (concerts acoustiques, expos art africain)', 'Pop-up stores hall central (marques locales ivoiriennes)', 'Location espace événementiel pour entreprises (séminaires, lancements)', 'Soirées privées Platinum (afterwork, cocktails)', 'Projection vidéo mapping façade intérieure (occasions spéciales)'],
      kpis:        ['Temps de séjour dans l\'atrium', 'Taux d\'engagement événements (% visiteurs qui s\'arrêtent)', 'Posts RS avec #CosmosAngré / semaine', 'NPS expérience globale', 'CA location espace événementiel / mois'],
    },
  },
  {
    id: 'shopping', num: '05', label: 'Shopping', icon: <Store size={18} strokeWidth={1.5} />,
    layers: {
      phase:       ['Parcours marchand — boucle intuitive 3 niveaux, 120+ enseignes, zoning par univers'],
      actions:     ['Flâne dans les galeries (circulation en boucle, pas de cul-de-sac)', 'Consulte le plan étage (Bornes catalogue / app)', 'Entre dans les boutiques (vitrines standardisées premium)', 'Compare, essaie, achète', 'Fait une pause banquette tous les 60m'],
      touchPhys:   ['Vitrines standardisées premium — éclairage 4000K calibré, charte Cosmos', 'Points de repos design tous les 60m (banquettes + plantes + prises USB)', 'Signalétique directionnelle par univers : Mode · Beauté · Tech · Maison · Services', 'Escalators + ascenseurs vitrés panoramiques sur atrium', 'Galeries en boucle — parcours fluide sans retour sur ses pas'],
      touchDigit:  ['App Cosmos Club — offres enseignes personnalisées (géoloc)', 'Bornes catalogue interactif (4 par niveau) — recherche produit/boutique', 'Beacons Bluetooth push promo quand on passe devant une enseigne partenaire', 'WiFi continu galeries + push géolocalisé', 'Click & collect enseignes partenaires (commande en ligne, retrait en boutique)'],
      emotions:    ['Plaisir de la découverte — « Je trouve des boutiques que je ne connaissais pas »', 'Confort — banquettes, climatisation, propreté', 'Frustration possible — rupture de stock, prix élevés', 'Satisfaction Cosmos Club — « Mon -15% Gold a marché »'],
      personnel:   ['Vendeurs/vendeuses des 120+ enseignes', 'Personal shopper Platinum (sur rendez-vous via app)', 'Agents nettoyage galeries en continu', 'Agent sécurité par niveau (rondes, assistance)'],
      techno:      ['Beacons Bluetooth Low Energy (×60) — push promo contextualisé', 'Bornes catalogue tactile 32" ×4/niveau', 'Système Click & collect intégré (API enseignes → app)', 'Compteurs de flux par galerie (heatmap en temps réel)', 'Éclairage galeries adaptatif (intensité selon affluence)'],
      painPoints:  ['Rupture de stock enseignes (frustration achat manqué)', 'Parcours trop long sans repos avant installation banquettes', 'Enseignes avec vendeurs trop insistants (culture vente CI)', 'Prises USB insuffisantes aux points de repos', 'Escalators en panne (problème fréquent Abidjan)'],
      opportunites: ['Programme fidélité croisé enseignes (points Cosmos Club chez toutes)', 'Gamification parcours shopping (badge « Explorateur » 10 boutiques)', 'Personal shopper democratisé (Gold, pas juste Platinum)', 'Pop-up boutiques créateurs ivoiriens (rotation mensuelle)', 'Nocturne shopping (vendredi jusqu\'à 22h)'],
      kpis:        ['Panier moyen global et par enseigne', 'Taux de conversion visite → achat (cible > 55%)', 'Nombre moyen boutiques visitées / visite', 'CA/m²/mois par enseigne', 'Taux d\'utilisation beacons / push'],
    },
  },
  {
    id: 'restauration', num: '06', label: 'Restauration', icon: <UtensilsCrossed size={18} strokeWidth={1.5} />,
    layers: {
      phase:       ['Pause & convivialité — Food court R+2 (12 enseignes, 400 places) + terrasse rooftop + 2 restaurants assis'],
      actions:     ['Monte au R+2 food court', 'Choisit parmi 12 enseignes (local : alloco-poisson, attiéké · international : burger, sushi, pizza)', 'Commande via QR code table ou au comptoir', 'S\'installe en salle ou terrasse rooftop vue sur Angré', 'Rejoint le restaurant gastronomique Le Cosmos (réservation) ou La Terrasse (brasserie)'],
      touchPhys:   ['Food court premium 12 enseignes — design unifié Cosmos', 'Terrasse rooftop panoramique 80 places (vue Angré, végétalisée)', 'Le Cosmos — restaurant gastronomique afro-fusion (50 couverts)', 'La Terrasse — brasserie vue panoramique (80 couverts)', 'Café lounge / espace coworking informel (WiFi + prises)', 'Mobilier premium — bois noble + cuir + laiton brossé'],
      touchDigit:  ['QR code table → carte digitale + commande + paiement (Orange Money, Wave, CB)', 'App Cosmos — menu du jour, disponibilité, réservation Le Cosmos', 'Avis Google restaurants intégrés dans l\'app', 'Système file virtuelle food court (notif quand c\'est prêt)', 'Points Cosmos Club ×2 le midi (12h-14h) pour fidéliser'],
      emotions:    ['Détente et convivialité — « On est monté au food court et on y est resté 2h »', 'Wow terrasse rooftop — vue + brise + végétation', 'Satisfaction qualité food court — « Pas le food court habituel »', 'Plaisir Le Cosmos — « Un vrai gastronomique dans un mall »'],
      personnel:   ['Serveurs restaurants assis (Le Cosmos, La Terrasse)', 'Équipe food court (12 comptoirs + hôtes de caisse)', 'Baristas café lounge', 'Équipe nettoyage food court en continu', 'Chef exécutif Le Cosmos (artiste en résidence cuisine)'],
      techno:      ['Commande QR code + paiement intégré (Orange Money / Wave / CB)', 'File virtuelle food court (SMS/notification quand commande prête)', 'Écrans menu dynamiques par enseigne (API CMS)', 'Réservation en ligne Le Cosmos / La Terrasse (widget app)', 'Caisse automatique food court (backup humain)'],
      painPoints:  ['Attente food court midi semaine (rush bureau 12h-13h30)', 'Tables insuffisantes terrasse weekend (80 places pour 2 000+ visiteurs)', 'Qualité variable selon enseignes food court', 'Terrasse non couverte = impossible sous la pluie (saison pluies juin-sept)', 'Prix Le Cosmos élevés pour le marché Abidjan'],
      opportunites: ['Chef invité mensuel « Les Toques de Cosmos » (médiatisation)', 'Soirée rooftop « Cosmos Nights » mensuelle (DJ, cocktails, 20h-minuit)', 'Menu étudiant -15% food court (fidéliser Gen Z)', 'Brunch dimanche La Terrasse (familles CSP+)', 'Partenariat Glovo/Jumia Food pour livraison'],
      kpis:        ['CA restauration / m² / mois (food court + restaurants)', 'Temps d\'attente moyen food court (cible < 8 min)', 'NPS food court (cible > 45)', 'Taux d\'occupation Le Cosmos (cible > 80%)', 'Réservations via app / total réservations'],
    },
  },
  {
    id: 'fidelisation', num: '07', label: 'Fidélisation', icon: <Heart size={18} strokeWidth={1.5} />,
    layers: {
      phase:       ['Programme Cosmos Club 3 niveaux — du Silver gratuit au Platinum VIP'],
      actions:     ['S\'inscrit au Cosmos Club (desk entrée ou app)', 'Présente sa carte/app à chaque achat → cumule des points', 'Consulte son dashboard points/avantages dans l\'app', 'Monte Silver → Gold (100k pts) → Platinum (500k pts ou invitation)', 'Revient pour les avantages exclusifs (parking, lounge, events)'],
      touchPhys:   ['Desk Cosmos Club (entrée principale + R+1)', 'Lounge VIP Platinum R+1 (fauteuils cuir, boissons, WiFi premium, presse)', 'Carte membre physique premium (métal brossé Platinum)', 'Signalétique « Avantage Cosmos Club » dans toutes les enseignes', 'Espace conciergerie dédié (portage achats, réservations, voiturier)'],
      touchDigit:  ['App Cosmos Club — dashboard complet : points, niveau, historique, offres', 'Email personnalisé hebdo (offres ciblées selon historique)', 'SMS automatisé : seuil upgrade proche, anniversaire, inactivité 30j', 'Push notification offres flash enseignes partenaires', 'Carte membre digitale NFC dans l\'app (paiement + fidélité)'],
      emotions:    ['Appartenance — « Je fais partie du Cosmos »', 'Reconnaissance — « Le personnel me connaît par mon prénom (Platinum) »', 'Statut — « Mon ami est Silver, moi je suis Gold »', 'Fierté — carte Platinum métal brossé', 'Frustration possible — avantages Silver trop limités'],
      personnel:   ['CRM Manager (stratégie, automatisations, segments)', 'Personal shopper Platinum (2 personnes dédiées)', 'Conciergerie VIP (portage achats, voiturier, réservations)', 'Agents desk Cosmos Club (inscription, upgrade, réclamations)', 'Community Manager (animation RS, réponse avis)'],
      techno:      ['CRM HubSpot — segments, triggers automatisés, scoring', 'NFC carte membre (tap pour points chez toutes enseignes)', 'App native iOS + Android (React Native)', 'Automatisation : email bienvenue, upgrade, anniversaire, win-back', 'API enseignes → points en temps réel', 'Analytics comportementaux (fréquence, panier, enseignes préférées)'],
      painPoints:  ['Programme non animé = désengagement en 3 mois', 'Avantages Silver trop limités → « à quoi bon ? »', 'Processus upgrade opaque — « je sais pas où j\'en suis »', 'App buggy = frustration (standard CI : réseau instable)', 'Personal shopper surbooké (demande > offre Platinum)'],
      opportunites: ['Partenariats croisés : Orange CI (data), NSIA (assurance), Canal+ (abonnement)', 'Événements exclusifs Platinum mensuels (dîners, ventes privées, avant-premières)', 'Carte co-brandée banque locale (Platinum = CB Gold associée)', 'Gamification : badges, challenges, classement amis', 'Cosmos Club Entreprise (programme fidélité B2B pour comités d\'entreprise)'],
      kpis:        ['Membres actifs / total inscrits (cible > 60%)', 'Fréquence visite membres vs non-membres', 'Taux upgrade Silver → Gold → Platinum', 'Panier moyen membre vs non-membre (cible +35%)', 'NPS membres (cible > 55)', 'Taux churn à 6 mois (cible < 15%)'],
    },
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   MODULE 2 — Personas
   ═══════════════════════════════════════════════════════════════════════════ */

export interface Persona {
  id: string;
  name: string;
  age: string;
  role: string;
  icon: React.ReactNode;
  color: string;
  bio: string;
  quartier: string;
  revenu: string;
  frequence: string;
  motivations: string[];
  frustrations: string[];
  touchpoints: string[];
  journeyHighlight: string;
  cosmosClub: string;
}

export const personas: Persona[] = [
  {
    id: 'famille',
    name: 'Awa & Moussa',
    age: '38 & 42 ans',
    role: 'Famille CSP+ · 2 enfants',
    icon: <Baby size={22} strokeWidth={1.5} />,
    color: '#10B981',
    bio: 'Couple cadres vivant à Cocody Angré 7ème tranche. Awa est DRH dans une banque panafricaine, Moussa ingénieur BTP chez SNDI. Deux enfants (Yasmine 6 ans, Ibrahim 10 ans). Shopping en famille le samedi, dîner au food court le vendredi soir. Utilisent Orange Money pour tout.',
    quartier: 'Angré 7ème tranche (5 min en voiture)',
    revenu: '2,5 M FCFA/mois (ménage)',
    frequence: '2×/semaine (samedi famille + vendredi dîner)',
    motivations: ['Espace enfants sécurisé et climatisé', 'Food court avec options enfants', 'Shopping mode enfant + adulte même lieu', 'Parking sous-sol sécurisé et rapide', 'Terrasse rooftop pour le dîner'],
    frustrations: ['Malls existants sans espace enfants digne', 'Parking Playce Marcory = chaos', 'Restauration mall = fast-food bas de gamme', 'Attente caisses > 15 min avec enfants agités'],
    touchpoints: ['Instagram (Awa)', 'Facebook (Moussa)', 'WhatsApp groupe mamans Angré', 'Google Maps', 'Bouche-à-oreille école ISCAE'],
    journeyHighlight: 'Samedi type : parking sous-sol zone A (Gold), 1h shopping enfants RDC, 1h Awa boutiques R+1 pendant Moussa au café lounge, food court terrasse 1h → repartent à 18h.',
    cosmosClub: 'Gold — parking prioritaire zone A + espace enfants gratuit + points ×1.5',
  },
  {
    id: 'jeunePro',
    name: 'Serge',
    age: '28 ans',
    role: 'Jeune pro digital · Riviera',
    icon: <Briefcase size={22} strokeWidth={1.5} />,
    color: '#3B82F6',
    bio: 'Chef de projet digital chez Ogilvy Abidjan. Vit à Riviera Faya (15 min trajet). Ultra-connecté : TikTok, Instagram, LinkedIn. Déjeune au food court 3-4×/semaine, afterwork rooftop le vendredi. Early adopter, sensible au design. Paye tout en Wave.',
    quartier: 'Riviera Faya (15 min en voiture)',
    revenu: '800 000 FCFA/mois',
    frequence: '3-4×/semaine (déjeuner + afterwork vendredi)',
    motivations: ['Food court rapide & qualité midi (< 40 min)', 'WiFi gratuit fiable pour bosser au café', 'Café lounge type coworking (prises, calme)', 'Afterwork rooftop ambiance premium', 'Appli fluide et moderne'],
    frustrations: ['Service lent au food court (rush midi)', 'WiFi instable (réseau CI classique)', 'Pas d\'espaces calmes dans les malls actuels', 'Prises électriques introuvables', 'App buggée = désinstallation directe'],
    touchpoints: ['TikTok (contenu principal)', 'Instagram Stories & Reels', 'LinkedIn (networking)', 'Google « restaurant Angré »', 'App Cosmos Club (push offres midi)'],
    journeyHighlight: 'Midi : parking surface (rapide), monte direct R+2 food court, commande QR code en arrivant, mange en 25 min, café lounge 45 min laptop, repart. Vendredi : afterwork rooftop 18h-21h avec collègues.',
    cosmosClub: 'Silver → Gold en 3 mois grâce au food court quotidien. Objectif : Platinum avant 30 ans.',
  },
  {
    id: 'executive',
    name: 'Pamela',
    age: '45 ans',
    role: 'PA · High Net Worth',
    icon: <UserCircle size={22} strokeWidth={1.5} />,
    color: '#8B5CF6',
    bio: 'PA de New Heaven SA (groupe immobilier). Résidence villa Cocody Ambassades. Habituée Dubai Mall, Mall of the Emirates, Galeries Lafayette Paris. Exigeante sur le service, le calme, la qualité. Déjeuners business au restaurant Le Cosmos. Carte Platinum par invitation.',
    quartier: 'Cocody Ambassades (10 min chauffeur)',
    revenu: '5 M+ FCFA/mois',
    frequence: '1-2×/semaine (business lunch + personal shopping)',
    motivations: ['Restaurant gastronomique Le Cosmos (business lunch)', 'Personal shopper dédié (gain de temps)', 'Lounge VIP calme et discret', 'Marques premium et internationales', 'Voiturier + parking prioritaire'],
    frustrations: ['Service impersonnel « comme tout le monde »', 'Foule et bruit — veut du calme', 'Absence de conciergerie niveau Dubai', 'Personnel non formé au service premium', 'Attendre = inacceptable'],
    touchpoints: ['LinkedIn (seul RS actif)', 'Invitation personnelle DG Cosmos', 'Bouche-à-oreille réseau affaires Cocody', 'Email VIP personnalisé', 'Conciergerie WhatsApp dédié'],
    journeyHighlight: 'Arrive par voiturier (chauffeur repart). Conciergerie l\'accueille, personal shopper a préparé 5 pièces en cabine. Déjeuner business Le Cosmos 12h30 (table habituelle). Repart en 2h, achats livrés à domicile.',
    cosmosClub: 'Platinum dès J0 (invitation DG) — voiturier, lounge, personal shopper, conciergerie dédiée, livraison domicile.',
  },
  {
    id: 'genZ',
    name: 'Aminata',
    age: '21 ans',
    role: 'Étudiante · Gen Z · Micro-influenceuse',
    icon: <GraduationCap size={22} strokeWidth={1.5} />,
    color: '#F59E0B',
    bio: 'Étudiante en marketing digital à l\'INPHB Abidjan. Stage chez une start-up tech à Cocody. Vit chez ses parents à Angré Château (à pied 12 min). TikTok addict, micro-influenceuse mode (3 200 abonnés). Budget serré mais vient quasi tous les jours. Paye en Orange Money.',
    quartier: 'Angré Château (12 min à pied)',
    revenu: '150 000 FCFA/mois (stage)',
    frequence: '4-5×/semaine (point de rencontre quotidien)',
    motivations: ['Point de RDV amis après les cours', 'WiFi gratuit pour étudier au café', 'Food court abordable (menu étudiant -15%)', 'Spots Instagrammables (atrium, terrasse, fontaine)', 'Événements gratuits (concerts acoustiques vendredi)'],
    frustrations: ['Prix boutiques mode inaccessibles', 'Pas de tarif étudiant officiel', 'WiFi saturé quand trop de monde', 'Vigiles parfois intimidants avec les jeunes', 'Prises électriques prises d\'assaut'],
    touchpoints: ['TikTok (contenu + créatrice)', 'Instagram Reels (OOTD au Cosmos)', 'WhatsApp groupe amis + promo Cosmos', 'Snapchat (snaps au food court)', 'TikTok Live events Cosmos'],
    journeyHighlight: 'Vient à pied après les cours (parking = pas de voiture). Étudie 2h au café lounge (WiFi + prise). Déjeune food court menu étudiant à 2 500 FCFA. Rejoint amis au hall pour TikTok. Assiste au concert acoustique vendredi 18h.',
    cosmosClub: 'Silver avec offre étudiante spéciale : -15% food court + WiFi premium + invitations événements gratuits.',
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   MODULE 3 — Touchpoints & Responsabilités
   ═══════════════════════════════════════════════════════════════════════════ */

export interface Touchpoint {
  id: string;
  label: string;
  phase: string;
  type: 'physique' | 'digital' | 'humain';
  responsable: string;
  description: string;
  priority: 'critique' | 'important' | 'secondaire';
}

export const touchpoints: Touchpoint[] = [
  { id: 'tp-01', label: 'Signalétique directionnelle 12 panneaux', phase: 'Approche', type: 'physique', responsable: 'Operations + Mairie Cocody', description: '12 panneaux Bd Latrille, Bd Mitterrand, carrefours Angré. Éclairage solaire nocturne.', priority: 'critique' },
  { id: 'tp-02', label: 'Fiche Google Maps + Waze', phase: 'Approche', type: 'digital', responsable: 'Marketing digital', description: 'Fiche vérifiée, photos HD façade + intérieur, horaires, FAQ, avis > 4.3★.', priority: 'critique' },
  { id: 'tp-03', label: 'Système guidage parking ANPR', phase: 'Parking', type: 'physique', responsable: 'Operations + DSI', description: 'Capteurs IoT + compteurs LED + zones A-B-C-D + ANPR reconnaissance plaques.', priority: 'critique' },
  { id: 'tp-04', label: 'App Cosmos — parking & paiement', phase: 'Parking', type: 'digital', responsable: 'DSI + CRM', description: 'Localisation véhicule GPS indoor, paiement NFC/Orange Money/Wave, réservation Platinum.', priority: 'important' },
  { id: 'tp-05', label: 'Accueil hôtesses bilingues', phase: 'Entrée', type: 'humain', responsable: 'RH + Formation', description: '2 hôtesses FR/EN desk principal, protocole accueil standardisé Cosmos, welcome pack 1ère visite.', priority: 'critique' },
  { id: 'tp-06', label: 'Bornes wayfinding tactiles 55"', phase: 'Entrée', type: 'digital', responsable: 'DSI', description: '4 bornes plan interactif, recherche boutique/produit, itinéraire intérieur, multilingue FR/EN.', priority: 'important' },
  { id: 'tp-07', label: 'Parfum signature Cosmos', phase: 'Entrée', type: 'physique', responsable: 'Operations', description: 'Diffuseur automatisé, senteur boisée-vanillée exclusive, identité olfactive Cosmos Angré.', priority: 'secondaire' },
  { id: 'tp-08', label: 'Atrium + espace événementiel 120m²', phase: 'Hall central', type: 'physique', responsable: 'Events Manager', description: 'Scène modulable, son Bose, éclairage scénographique, mobilier événementiel. Location B2B possible.', priority: 'important' },
  { id: 'tp-09', label: 'WiFi haute densité Cosmos', phase: 'Hall central', type: 'digital', responsable: 'DSI', description: 'WiFi gratuit 200+ connexions, portail captif inscription Cosmos Club, débit garanti 50 Mbps.', priority: 'critique' },
  { id: 'tp-10', label: 'Vitrines charte Cosmos', phase: 'Shopping', type: 'physique', responsable: 'Tenant Coordination', description: 'Charte vitrines standardisée : éclairage 4000K, dimensions, matériaux. Rotation saisonnière obligatoire.', priority: 'important' },
  { id: 'tp-11', label: 'Points de repos design 60m', phase: 'Shopping', type: 'physique', responsable: 'Operations + Design', description: 'Banquettes gold/navy tous les 60m, plantes, prises USB, éclairage doux.', priority: 'important' },
  { id: 'tp-12', label: 'Food court 12 enseignes R+2', phase: 'Restauration', type: 'physique', responsable: 'F&B Manager', description: '12 enseignes (local + international), 400 places, design unifié, terrasse rooftop 80 places.', priority: 'critique' },
  { id: 'tp-13', label: 'QR commande + paiement mobile', phase: 'Restauration', type: 'digital', responsable: 'DSI + F&B', description: 'QR code table, carte digitale, paiement Orange Money/Wave/CB, file virtuelle notification.', priority: 'important' },
  { id: 'tp-14', label: 'Desk Cosmos Club + conciergerie', phase: 'Fidélisation', type: 'humain', responsable: 'CRM Manager', description: 'Inscription, upgrade, réclamations, avantages. Conciergerie Platinum : voiturier, portage, réservations.', priority: 'critique' },
  { id: 'tp-15', label: 'App Cosmos Club native', phase: 'Fidélisation', type: 'digital', responsable: 'DSI + CRM', description: 'React Native iOS/Android. Points, niveau, offres, historique, parking, événements, réservation restaurant.', priority: 'critique' },
];

/* ═══════════════════════════════════════════════════════════════════════════
   MODULE 4 — KPIs Dashboard
   ═══════════════════════════════════════════════════════════════════════════ */

export interface KpiCategory {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: string;
  kpis: Kpi[];
}

export interface Kpi {
  label: string;
  target: string;
  current?: string;
  unit: string;
  frequency: string;
  source: string;
}

export const kpiCategories: KpiCategory[] = [
  {
    id: 'trafic', label: 'Trafic & Fréquentation', icon: <TrendingUp size={18} />, color: '#10B981',
    kpis: [
      { label: 'Visiteurs mensuels', target: '120 000', unit: 'visiteurs/mois', frequency: 'Mensuel', source: 'Compteurs entrées + WiFi' },
      { label: 'Taux re-visite M+1', target: '> 40%', unit: '%', frequency: 'Mensuel', source: 'WiFi analytics + App' },
      { label: 'Durée moyenne visite', target: '> 90 min', unit: 'minutes', frequency: 'Hebdo', source: 'WiFi sessions' },
      { label: 'Pic affluence samedi', target: '< 4 500', unit: 'simultanés', frequency: 'Temps réel', source: 'Capteurs flux' },
    ],
  },
  {
    id: 'satisfaction', label: 'Satisfaction Client', icon: <Heart size={18} />, color: '#F43F5E',
    kpis: [
      { label: 'NPS global Cosmos', target: '> 50', unit: 'score -100/+100', frequency: 'Trimestriel', source: 'Enquête NPS' },
      { label: 'NPS parking', target: '> 35', unit: 'score', frequency: 'Trimestriel', source: 'Enquête parking' },
      { label: 'NPS food court', target: '> 45', unit: 'score', frequency: 'Trimestriel', source: 'Enquête F&B' },
      { label: 'Avis Google Maps', target: '> 4.3 ★', unit: 'étoiles /5', frequency: 'Continu', source: 'Google Business' },
    ],
  },
  {
    id: 'fidelite', label: 'Cosmos Club — Fidélisation', icon: <Target size={18} />, color: '#8B5CF6',
    kpis: [
      { label: 'Membres Cosmos Club actifs', target: '5 000 à M+6', unit: 'membres', frequency: 'Mensuel', source: 'CRM HubSpot' },
      { label: 'Upgrade Silver → Gold', target: '> 25%', unit: '% à 6 mois', frequency: 'Trimestriel', source: 'CRM' },
      { label: 'Panier membre vs non-membre', target: '+35%', unit: 'différentiel', frequency: 'Mensuel', source: 'Caisse + CRM' },
      { label: 'Churn à 6 mois', target: '< 15%', unit: '%', frequency: 'Semestriel', source: 'CRM HubSpot' },
    ],
  },
  {
    id: 'commerce', label: 'Performance Commerciale', icon: <BarChart3 size={18} />, color: '#F59E0B',
    kpis: [
      { label: 'CA enseignes/m²/mois', target: '> 180k FCFA', unit: 'FCFA/m²', frequency: 'Mensuel', source: 'Reporting enseignes' },
      { label: 'Taux d\'occupation commerciale', target: '> 92%', unit: '%', frequency: 'Trimestriel', source: 'Asset Management' },
      { label: 'Conversion visite → achat', target: '> 55%', unit: '%', frequency: 'Mensuel', source: 'Compteurs + caisses' },
      { label: 'CA food court + restaurants', target: '> 250k/m²', unit: 'FCFA/m²', frequency: 'Mensuel', source: 'F&B reporting' },
    ],
  },
  {
    id: 'digital', label: 'Digital & App Cosmos', icon: <Smartphone size={18} />, color: '#06B6D4',
    kpis: [
      { label: 'Downloads app Cosmos Club', target: '10 000 en 6 mois', unit: 'downloads', frequency: 'Mensuel', source: 'App Store + Play Store' },
      { label: 'Utilisateurs actifs mensuels', target: '> 3 500', unit: 'MAU', frequency: 'Mensuel', source: 'Firebase Analytics' },
      { label: 'Abonnés RS cumulés', target: '15 000 à M+6', unit: 'followers', frequency: 'Mensuel', source: 'Meta + TikTok' },
      { label: 'Engagement rate RS', target: '> 4%', unit: '%', frequency: 'Hebdo', source: 'Social analytics' },
    ],
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   MODULE 5 — Plan d'action
   ═══════════════════════════════════════════════════════════════════════════ */

export interface ActionItem {
  id: string;
  phase: string;
  phaseColor: string;
  title: string;
  description: string;
  responsable: string;
  deadline: string;
  status: 'planifié' | 'en_cours' | 'terminé';
  priority: 'haute' | 'moyenne' | 'basse';
}

export const actionPlan: ActionItem[] = [
  { id: 'A01', phase: 'Pré-ouverture', phaseColor: '#8B5CF6', title: 'Charte signalétique Cosmos complète', description: 'Concevoir la charte graphique de toute la signalétique (intérieure + extérieure + parking + étages). Polices Inter/Cormorant. Couleurs navy/gold/crème.', responsable: 'Marketing + Fernand (design)', deadline: 'Juillet 2026', status: 'planifié', priority: 'haute' },
  { id: 'A02', phase: 'Pré-ouverture', phaseColor: '#8B5CF6', title: 'Installation 12 panneaux + totem + bâche', description: 'Autorisation mairie Cocody, pose 12 panneaux Bd Latrille/Mitterrand, totem lumineux H4m, bâche façade 600m².', responsable: 'Operations + Mairie Cocody', deadline: 'Septembre 2026', status: 'planifié', priority: 'haute' },
  { id: 'A03', phase: 'Pré-ouverture', phaseColor: '#8B5CF6', title: 'App Cosmos Club iOS + Android', description: 'Développement React Native : fidélité, parking GPS indoor, événements, commande food court, réservation restaurant. Intégration Orange Money + Wave.', responsable: 'DSI + Agence mobile', deadline: 'Août 2026', status: 'planifié', priority: 'haute' },
  { id: 'A04', phase: 'Pré-ouverture', phaseColor: '#8B5CF6', title: 'Formation personnel accueil Cosmos', description: 'Former 25 personnes : hôtesses, sécurité, conciergerie, agents parking. Protocole accueil Cosmos, gestion conflits, service Platinum.', responsable: 'RH + Cabinet formation', deadline: 'Septembre 2026', status: 'planifié', priority: 'haute' },
  { id: 'A05', phase: 'Pré-ouverture', phaseColor: '#8B5CF6', title: 'CRM HubSpot + automatisations', description: 'Configuration CRM, 15 workflows automatisés (bienvenue, upgrade, anniversaire, win-back, NPS), segments personas.', responsable: 'CRM Manager + DSI', deadline: 'Août 2026', status: 'planifié', priority: 'haute' },
  { id: 'A06', phase: 'Pré-ouverture', phaseColor: '#8B5CF6', title: 'Système parking ANPR + capteurs IoT', description: 'Installation capteurs 450 places sous-sol + caméras ANPR + bornes paiement (CB, Orange Money, Wave). Test charge.', responsable: 'DSI + Intégrateur parking', deadline: 'Septembre 2026', status: 'planifié', priority: 'haute' },
  { id: 'A07', phase: 'Ouverture', phaseColor: '#10B981', title: 'Activation Cosmos Club J0', description: 'Inscriptions physiques desk + tablettes, activation cartes membres, lancement avantages inauguraux (Gold offert 6 mois aux 1 000 premiers).', responsable: 'CRM + Accueil', deadline: '16 Oct 2026', status: 'planifié', priority: 'haute' },
  { id: 'A08', phase: 'Ouverture', phaseColor: '#10B981', title: 'Protocole accueil J0 Soft Opening', description: '2 500 invités : hôtesses renforcées ×6, signalétique événement, welcome packs, DJ, photographe, sécurité renforcée.', responsable: 'Operations + Events', deadline: '16 Oct 2026', status: 'planifié', priority: 'haute' },
  { id: 'A09', phase: 'Ouverture', phaseColor: '#10B981', title: 'Lancement food court + Le Cosmos', description: 'Ouverture simultanée 12 enseignes food court + terrasse rooftop + restaurant Le Cosmos. Test QR commande J-7.', responsable: 'F&B Manager + DSI', deadline: '16 Oct 2026', status: 'planifié', priority: 'haute' },
  { id: 'A10', phase: 'Post-ouverture', phaseColor: '#F59E0B', title: 'Enquête NPS complète M+1', description: 'NPS global + parking + food court + enseignes + accueil. Échantillon 500 visiteurs. Rapport + plan correctif.', responsable: 'Marketing + CRM', deadline: 'Novembre 2026', status: 'planifié', priority: 'moyenne' },
  { id: 'A11', phase: 'Post-ouverture', phaseColor: '#F59E0B', title: 'Optimisation signalétique & flux M+2', description: 'Analyser heatmaps WiFi, ajuster signalétique étages, ajouter points repos si zones mortes détectées.', responsable: 'Operations + DSI', deadline: 'Décembre 2026', status: 'planifié', priority: 'moyenne' },
  { id: 'A12', phase: 'Post-ouverture', phaseColor: '#F59E0B', title: 'Programme « Cosmos Vivant » mensuel', description: 'Lancer le calendrier événementiel : 1er vendredi concert, 2ème samedi atelier enfants, 3ème jeudi afterwork, dernier dimanche marché créateurs CI.', responsable: 'Events Manager', deadline: 'Décembre 2026', status: 'planifié', priority: 'moyenne' },
  { id: 'A13', phase: 'Croisière', phaseColor: '#3B82F6', title: 'Bilan parcours client An 1', description: 'Rapport complet : NPS, KPIs, analytics flux, benchmark Playce/Cap Sud, recommandations, budget ajustements An 2.', responsable: 'Direction + Marketing + CRM', deadline: 'Octobre 2027', status: 'planifié', priority: 'haute' },
];

/* ═══════════════════════════════════════════════════════════════════════════
   MODULE 6 — Signalétique Directionnelle
   ═══════════════════════════════════════════════════════════════════════════ */

export interface SignType {
  id: string;
  type: string;
  description: string;
  location: string;
  specs: string;
  icon: React.ReactNode;
  quantity: number;
}

export const signageTypes: SignType[] = [
  { id: 'sg-01', type: 'Totem entrée principale', description: 'Totem lumineux double face, identité gold/navy, logo Cosmos rétro-éclairé LED. Visible 150m boulevard.', location: 'Entrée parking sous-sol + entrée piétonne principale', specs: 'H: 4m · L: 1.2m · Aluminium anodisé gold · LED 6500K', icon: <Signpost size={18} />, quantity: 2 },
  { id: 'sg-02', type: 'Panneaux directionnels axes', description: 'Fléchage « Cosmos Angré → » sur 3 axes principaux. Éclairage solaire nocturne.', location: 'Bd Latrille (×4), Bd Mitterrand (×4), Carrefours Angré (×4)', specs: '4×3m · Vinyle HD · Éclairage solaire · Résistant UV', icon: <Navigation size={18} />, quantity: 12 },
  { id: 'sg-03', type: 'Signalétique parking zones', description: 'Panneaux zones colorées A (bleu) B (vert) C (orange) D (violet) avec pictogrammes universels.', location: 'Sous-sol -1 et -2 · Rampes · Ascenseurs · Surface', specs: 'Alu dibond · Lettrage découpé · Rétro-éclairé · Code couleur Pantone', icon: <ParkingSquare size={18} />, quantity: 32 },
  { id: 'sg-04', type: 'Plans du centre rétro-éclairés', description: 'Plan général 3 niveaux avec position « Vous êtes ici ». Mise à jour semestrielle enseignes.', location: 'Entrées principales (×2) · Jonctions galeries (×4) · Ascenseurs (×2)', specs: '120×80cm · Plexiglas rétro-éclairé · Impression UV · FR/EN', icon: <PanelTop size={18} />, quantity: 8 },
  { id: 'sg-05', type: 'Bornes wayfinding tactiles', description: 'Écrans 55" tactiles : recherche boutique, itinéraire 3D, événements du jour, inscription Cosmos Club.', location: 'Hall central RDC · Entrées secondaires · R+2 food court', specs: '55" tactile capacitif · Android · API Cosmos · FR/EN · Accessibilité PMR', icon: <Monitor size={18} />, quantity: 4 },
  { id: 'sg-06', type: 'Fléchage galeries par univers', description: 'Signalétique suspendue par univers : Mode · Beauté · Tech · Maison · Services · Food.', location: 'Intersections galeries (×24) · Escalators (×12) · Ascenseurs (×12)', specs: 'Alu brossé · Pictogrammes ISO · Polices Inter 600 / Cormorant 400', icon: <ArrowUpRight size={18} />, quantity: 48 },
  { id: 'sg-07', type: 'Signalétique services & PMR', description: 'Pictogrammes : toilettes, nurserie, PMR, conciergerie, urgence, prière. Braille intégré.', location: 'Chaque niveau · Proximité services · Ascenseurs', specs: 'Alu anodisé · Pictogrammes ISO 7001 · Relief tactile + Braille', icon: <Info size={18} />, quantity: 24 },
  { id: 'sg-08', type: 'Bâche façade pré-ouverture', description: '« Cosmos Angré — Un monde à part — Ouverture Octobre 2026 ». Visible depuis Bd Latrille à 300m.', location: 'Façade principale boulevard Latrille', specs: '600m² · Impression HD 720 dpi · Vinyle résistant UV 6 mois · Œillets inox', icon: <Flag size={18} />, quantity: 1 },
];

/* ═══════════════════════════════════════════════════════════════════════════
   SWIMLANE DATA — Journey Map visuel
   7 stages × 10 couches complètes + dot matrices
   ═══════════════════════════════════════════════════════════════════════════ */

export const stageColors = [
  '#059669', // 01 Approche
  '#0D9488', // 02 Parking
  '#2563EB', // 03 Entrée
  '#7C3AED', // 04 Hall central
  '#C9943A', // 05 Shopping
  '#EA580C', // 06 Restauration
  '#E11D48', // 07 Fidélisation
];

/** Steps: what the customer DOES at each stage */
export const stageSteps: string[][] = [
  ['Repère panneaux Cosmos', 'Suit le fléchage Bd Latrille', 'Active GPS Waze / Maps', 'Aperçoit la façade aluminium grège'],
  ['Choisit sous-sol ou surface', 'Suit compteurs LED zone', 'Se gare zone B-3', 'Mémorise via app Cosmos'],
  ['Franchit portes vitrées', 'Sent le parfum Cosmos', 'Découvre le terrazzo + palmiers', 'Consulte borne wayfinding'],
  ['Admire l\'atrium verrière 12m', 'Photo pour Instagram/TikTok', 'Lit écrans LED événements', 'Choisit son itinéraire'],
  ['Flâne en boucle sans cul-de-sac', 'Vitrines premium éclairées', 'Essaie, compare, achète', 'Pause banquette tous les 60m'],
  ['Monte au R+2 food court', 'Commande QR code table', 'S\'installe terrasse rooftop', 'Profite vue sur Angré'],
  ['Présente carte Cosmos Club', 'Cumule points ×1.5 (Gold)', 'Check avantages dans l\'app', 'Recommande à ses amis'],
];

/** Pain points résumés par stage (pour swimlane) */
export const stagePainPoints: string[][] = [
  ['4 rond-points Angré', 'Axes mal éclairés la nuit', 'Embouteillages 17h-19h'],
  ['Saturé samedi 15h-18h', 'Mobile money lent', 'Chaleur parking surface'],
  ['File entrée événements', 'Orientation 1ère visite', 'Desk sous-staffé weekend'],
  ['Bruit événements résonance', 'Effet serre sous verrière', 'Manque prises électriques'],
  ['Rupture stock enseignes', 'Vendeurs trop insistants', 'Escalators en panne'],
  ['Rush food court midi', 'Tables terrasse weekend', 'Pluie juin-sept terrasse'],
  ['Avantages Silver limités', 'App buggy réseau CI', 'Personal shopper surbooké'],
];

/** Opportunities résumées par stage (pour swimlane) */
export const stageOpportunities: string[][] = [
  ['Waze Ads CSP+ Cocody', 'Éclairage solaire nocturne', 'Accord mairie fléchage'],
  ['Parking Gold prioritaire', 'Bornes recharge électrique', 'Voiturier Platinum'],
  ['Welcome pack 1ère visite', 'Zone selfie logo Cosmos', 'Inscription tablette entrée'],
  ['Cosmos Vivant mensuel', 'Pop-up créateurs CI', 'Location espace B2B'],
  ['Fidélité croisée enseignes', 'Gamification badges', 'Nocturne vendredi 22h'],
  ['Chef invité « Toques Cosmos »', 'Cosmos Nights rooftop', 'Menu étudiant -15%'],
  ['Partenariat Orange/NSIA', 'Events Platinum exclusifs', 'Carte co-brandée banque'],
];

/** Technologies résumées par stage */
export const stageTechnologies: string[][] = [
  ['GPS / Waze / Maps', 'QR code → deep link app', 'LED façade automatisé'],
  ['Capteurs IoT places', 'ANPR plaques', 'Bornes Orange Money/Wave', 'Recharge EV'],
  ['Borne tactile 55"', 'Diffuseur parfum auto', 'Détecteurs flux', 'Clim sas'],
  ['Écrans LED 4K CMS', 'WiFi 200+ connexions', 'Son zoné', 'Éclairage programmable'],
  ['Beacons BT ×60', 'Bornes catalogue ×12', 'Click & collect API', 'Heatmap flux'],
  ['QR commande + paiement', 'File virtuelle SMS', 'Menus dynamiques', 'Résa en ligne'],
  ['CRM HubSpot workflows', 'NFC carte membre', 'App React Native', 'Analytics comportement'],
];

/** Personnel résumé par stage */
export const stagePersonnel: string[][] = [
  ['Agents signalisation (événements)'],
  ['Agents parking · Sécurité 24/7'],
  ['2 Hôtesses · Sécurité · Agent Cosmos Club'],
  ['Événementiel · Conciergerie · DJ weekends'],
  ['120+ vendeurs enseignes · Personal shopper'],
  ['Serveurs · Équipe food court · Chef Le Cosmos'],
  ['CRM Manager · Conciergerie VIP · Personal shopper'],
];

/** All touchpoints labelled for the dot matrix */
export const touchpointLabels = [
  'Panneaux Bd Latrille', 'Panneaux Bd Mitterrand', 'Totem lumineux H4m', 'Bâche façade 600m²',
  'Google Maps / Waze', 'QR code → app', 'Instagram géoloc',
  'Capteurs parking IoT', 'Zones A-B-C-D couleurs', 'Bornes interphone', 'App parking GPS indoor',
  'Portes auto premium', 'Borne wayfinding 55"', 'Parfum signature', 'Desk accueil / Cosmos Club',
  'Atrium verrière 12m', 'Écrans LED ×4', 'WiFi Cosmos gratuit', 'Espace événement 120m²',
  'Vitrines charte Cosmos', 'Points repos 60m', 'Beacons BT push promo', 'Bornes catalogue',
  'Food court 12 enseignes', 'Terrasse rooftop', 'Le Cosmos gastro', 'QR commande table',
  'Desk Cosmos Club R+1', 'App Cosmos Club native', 'Carte NFC membre', 'Lounge VIP Platinum',
  'Email/SMS CRM auto', 'Conciergerie WhatsApp',
];

/** Touchpoint dot matrix: touchpointLabels[row] × 7 stages — true if active */
export const touchpointMatrix: boolean[][] = [
  /* Panneaux Latrille   */ [true,  false, false, false, false, false, false],
  /* Panneaux Mitterrand */ [true,  false, false, false, false, false, false],
  /* Totem lumineux      */ [true,  false, true,  false, false, false, false],
  /* Bâche façade        */ [true,  false, false, false, false, false, false],
  /* Google Maps / Waze  */ [true,  true,  false, false, false, false, false],
  /* QR code → app       */ [true,  false, true,  true,  true,  true,  true ],
  /* Instagram géoloc    */ [true,  false, false, true,  false, false, false],
  /* Capteurs parking    */ [false, true,  false, false, false, false, false],
  /* Zones A-B-C-D       */ [false, true,  false, false, false, false, false],
  /* Bornes interphone   */ [false, true,  false, false, false, false, false],
  /* App parking GPS     */ [false, true,  false, false, false, false, true ],
  /* Portes auto         */ [false, false, true,  false, false, false, false],
  /* Borne wayfinding    */ [false, false, true,  true,  true,  false, false],
  /* Parfum signature    */ [false, false, true,  true,  false, false, false],
  /* Desk accueil        */ [false, false, true,  false, false, false, true ],
  /* Atrium verrière     */ [false, false, false, true,  false, false, false],
  /* Écrans LED          */ [false, false, false, true,  true,  true,  false],
  /* WiFi Cosmos         */ [false, false, true,  true,  true,  true,  true ],
  /* Espace événement    */ [false, false, false, true,  false, false, true ],
  /* Vitrines charte     */ [false, false, false, false, true,  false, false],
  /* Points repos 60m    */ [false, false, false, false, true,  false, false],
  /* Beacons BT promo    */ [false, false, false, false, true,  false, false],
  /* Bornes catalogue    */ [false, false, false, false, true,  true,  false],
  /* Food court 12       */ [false, false, false, false, false, true,  false],
  /* Terrasse rooftop    */ [false, false, false, false, false, true,  false],
  /* Le Cosmos gastro    */ [false, false, false, false, false, true,  false],
  /* QR commande table   */ [false, false, false, false, false, true,  false],
  /* Desk Cosmos Club R+1*/ [false, false, true,  false, false, false, true ],
  /* App Cosmos Club     */ [false, true,  true,  true,  true,  true,  true ],
  /* Carte NFC membre    */ [false, false, false, false, true,  true,  true ],
  /* Lounge VIP Platinum */ [false, false, false, true,  true,  false, true ],
  /* Email/SMS CRM auto  */ [true,  false, false, false, false, false, true ],
  /* Conciergerie WA     */ [false, false, true,  false, true,  true,  true ],
];

/** Départements Cosmos Angré */
export const departments = [
  'Marketing / Communication',
  'Operations / Exploitation',
  'DSI / IT / Digital',
  'Sécurité / Sûreté',
  'RH / Formation',
  'F&B / Restauration',
  'CRM / Fidélisation',
  'Tenant Coordination (enseignes)',
  'Events / Animation culturelle',
  'Conciergerie / Service client',
  'Direction Générale',
];

/** Department matrix: departments[row] × 7 stages */
export const departmentMatrix: boolean[][] = [
  /* Marketing      */ [true,  false, false, true,  true,  false, true ],
  /* Operations     */ [true,  true,  true,  true,  true,  true,  false],
  /* DSI / IT       */ [false, true,  true,  true,  true,  true,  true ],
  /* Sécurité       */ [true,  true,  true,  true,  true,  true,  false],
  /* RH / Form.     */ [false, false, true,  false, false, false, false],
  /* F&B            */ [false, false, false, false, false, true,  false],
  /* CRM            */ [false, false, true,  false, true,  false, true ],
  /* Tenant Coord.  */ [false, false, false, false, true,  true,  false],
  /* Events         */ [false, false, false, true,  false, true,  true ],
  /* Conciergerie   */ [false, false, true,  true,  true,  true,  true ],
  /* Direction      */ [false, false, false, false, false, false, true ],
];

/** Emotions per stage */
export const stageEmotions: { emoji: string; label: string; score: number; verbatim: string }[] = [
  { emoji: '🔍', label: 'Curiosité', score: 3, verbatim: 'C\'est quoi ce nouveau centre à Angré ?' },
  { emoji: '😌', label: 'Rassurance', score: 4, verbatim: 'Le parking est propre et bien éclairé' },
  { emoji: '✨', label: 'Émerveillement', score: 5, verbatim: 'C\'est pas un mall normal. Ça respire la qualité.' },
  { emoji: '🤩', label: 'Wow', score: 5, verbatim: 'On a ça à Abidjan maintenant !' },
  { emoji: '😊', label: 'Plaisir', score: 4, verbatim: 'Tu te laisses porter, tu découvres sans chercher' },
  { emoji: '😋', label: 'Détente', score: 5, verbatim: 'On est montés au food court et on y est restés 2h' },
  { emoji: '💎', label: 'Appartenance', score: 5, verbatim: 'Le programme fidélité donne vraiment envie de revenir' },
];

/** Duration per stage (minutes) */
export const stageDurations = [5, 8, 3, 15, 45, 40, 10];

/** KPIs résumés par stage (pour swimlane) */
export const stageKpis: string[][] = [
  ['Taux arrivée sans détour', 'Impressions Waze Ads/mois'],
  ['Occupation parking/h', 'Temps recherche place < 3min'],
  ['Flux entrées/h', 'Inscriptions Club/jour'],
  ['Temps séjour atrium', 'Posts #CosmosAngré/sem'],
  ['Panier moyen', 'Conversion > 55%'],
  ['CA food/m²/mois', 'Attente < 8min'],
  ['Membres actifs > 60%', 'Churn < 15%'],
];
