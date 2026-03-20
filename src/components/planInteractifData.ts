/* ═══════════════════════════════════════════════════════════════════════════
   Données du Cahier des Charges — Module Plan Interactif 3D
   Atlas Plan · Cosmos Angré · v2.0 · Mars 2026
   ═══════════════════════════════════════════════════════════════════════════ */

export interface ContentBlock {
  type: 'para' | 'subtitle' | 'list' | 'table';
  text?: string;
  title?: string;
  items?: string[];
  rows?: string[][];
  header?: boolean;
}

export interface Section {
  id: string;
  num: string;
  title: string;
  content: ContentBlock[];
}

export const SECTIONS: Section[] = [
  {
    id: 's0', num: '0', title: "Fiche d'identité du projet",
    content: [
      { type: 'table', rows: [
        ['Nom du module', 'Atlas Plan — Module Plan Interactif'],
        ['Produit parent', 'Atlas Studio / Praedium Tech'],
        ['Projet cible (MVP)', 'Cosmos Angré Shopping Center — Abidjan, Côte d\'Ivoire'],
        ['Commanditaire', 'Pamela Atokouna, DGA CRMC / New Heaven SA & CEO Praedium Tech'],
        ['Version CDC', 'v2.0 — Mars 2026'],
        ['Stack', 'Frontend-only : React + TypeScript + Supabase BaaS (aucun backend propriétaire)'],
        ['IA embarquée', 'Proph3t (IA locale — moteur propriétaire Praedium Tech)'],
        ['IA de renforcement', 'Claude API Anthropic (optionnel — analyses prescriptives avancées)'],
        ['Ouverture cible', 'Soft opening 16 octobre 2026 · Inauguration 16 novembre 2026'],
        ['Livrables associés', 'Vol. 2 Plan Sécuritaire · Vol. 3 Parcours Client'],
      ] },
    ],
  },
  {
    id: 's1', num: '1', title: 'Contexte & objectifs',
    content: [
      { type: 'para', text: 'Cosmos Angré est un centre commercial premium mixed-use de 3 niveaux (B1, RDC, R+1) développé par New Heaven SA à Abidjan. Le module Plan Interactif doit servir deux usages majeurs simultanément : (1) produire le Plan Sécuritaire complet (Vol. 2 — 5 zones, 120+ caméras, procédures d\'urgence) et (2) concevoir et animer le Parcours Client de bout en bout (Vol. 3 — 7 moments clés, signalétique, programme Cosmos Club).' },
      { type: 'para', text: 'Le module actuel est insuffisant : il ne lit pas les plans AutoCAD nativement, ne gère pas les calques thématiques sécurité/parcours, ne supporte pas la collaboration multi-utilisateurs et ne dispose d\'aucune intelligence artificielle pour générer automatiquement les plans opérationnels. Ce CDC définit la version cible complète.' },
      { type: 'list', title: 'Objectifs métier', items: [
        'Générer automatiquement depuis les plans DWG/DXF le plan sécuritaire conforme APSAD R82',
        'Produire le plan du parcours client avec wayfinding, POI et heatmaps de fréquentation',
        'Permettre la collaboration simultanée entre les équipes CRMC, prestataires sécurité et designers',
        'Exporter tous les livrables opérationnels en formats normés (PDF, DWG annoté, Word)',
        'Intégrer nativement WiseFM, COCKPIT et l\'écosystème Atlas Studio',
        'Fonctionner en mode offline-first sur site chantier (infrastructure réseau variable)',
      ] },
    ],
  },
  {
    id: 's2', num: '2', title: 'Contraintes techniques fondamentales',
    content: [
      { type: 'subtitle', text: '2.1 Architecture frontend-only obligatoire' },
      { type: 'para', text: 'Aucun backend propriétaire. Toute la logique applicative réside dans le client React/TypeScript. La persistance, l\'authentification et le temps réel sont délégués à Supabase BaaS (PostgreSQL + PostGIS + Realtime + Auth + Storage). Les calculs lourds (coverage solver caméras, algorithme A*) s\'exécutent dans des Web Workers pour ne pas bloquer le thread principal.' },
      { type: 'list', title: 'Règles absolues', items: [
        'Zéro serveur Node.js / Python / backend Express propriétaire',
        'Toutes les opérations passent par le client ou les Edge Functions Supabase (Deno)',
        'Les clés API Claude ne transitent jamais côté client — proxy via Edge Function Supabase',
        'L\'IA Proph3t tourne en local dans le navigateur (ONNX Runtime Web) ou via Ollama local network',
        'Offline-first : Service Worker + IndexedDB pour cache des plans et données spatiales',
      ] },
      { type: 'subtitle', text: '2.2 Contraintes contextuelles Côte d\'Ivoire' },
      { type: 'list', title: '', items: [
        'Connexion intermittente sur site chantier — mode offline obligatoire avec sync différée',
        'Plans AutoCAD produits par bureaux d\'études locaux — qualité de calques variable',
        'Multilinguisme : français prioritaire, anglais secondaire',
        'Sécurité des plans : données sensibles (plan sécuritaire) ne quittent jamais le réseau local',
        'Compatibilité navigateurs : Chrome 110+, Edge 110+, Safari 16+ (pas IE)',
      ] },
    ],
  },
  {
    id: 's3', num: '3', title: 'Stack technique détaillée',
    content: [
      { type: 'table', rows: [
        ['Domaine', 'Technologie', 'Justification'],
        ['Framework UI', 'React 18 + TypeScript 5', 'Cohérence Atlas Studio'],
        ['Styling', 'Tailwind CSS 3', 'Cohérence Atlas Studio'],
        ['State management', 'Zustand + React Query', 'Léger, compatible offline'],
        ['Rendu 2D plan', 'Fabric.js 6 ou Konva.js 9', 'SVG/Canvas vectoriel haute perf, zoom/pan natif'],
        ['Rendu 3D', 'Three.js r128 + react-three-fiber', 'Déjà en stack COCKPIT'],
        ['Helpers 3D', '@react-three/drei', 'Caméras, controls, loaders intégrés'],
        ['AutoCAD DXF', 'dxf-parser (npm)', 'Parse DXF ASCII côté client'],
        ['AutoCAD DWG', 'LibreDWG via WASM', 'Binaire DWG sans serveur'],
        ['IFC / Revit', 'web-ifc (WASM)', 'Parse IFC côté client'],
        ['Données spatiales', 'Supabase + PostGIS', 'Géométries, nearest, within, intersects'],
        ['Temps réel', 'Supabase Realtime Channels', 'Collaboration multi-utilisateurs'],
        ['Auth', 'Supabase Auth (RLS)', 'Contrôle accès par rôle'],
        ['Stockage fichiers', 'Supabase Storage', 'Plans DWG, exports PDF'],
        ['Offline', 'Service Worker + IndexedDB (Dexie.js)', 'Cache plans + données spatiales'],
        ['Web Workers', 'Comlink (Google)', 'Coverage solver, A* — hors thread UI'],
        ['IA locale — Proph3t', 'ONNX Runtime Web + modèle propriétaire', 'Inférence dans le navigateur'],
        ['IA locale — fallback', 'Ollama (réseau local) via fetch()', 'Modèle plus grand si machine dispo'],
        ['IA cloud — renforcement', 'Claude API via Supabase Edge Function', 'Analyses prescriptives avancées — clé sécurisée'],
        ['OCR annotations', 'Tesseract.js (WASM)', 'Lecture annotations DWG côté client'],
        ['Export PDF', 'jsPDF + svg2pdf.js', 'PDF vectoriel normé'],
        ['Export Word', 'docx (npm)', 'Rapports APSAD, SSIAP'],
        ['Algorithme wayfinding', 'PathFinding.js (A*)', 'Itinéraires visiteurs'],
        ['Visualisation heatmap', 'D3.js (hexbin)', 'Fréquentation par zone'],
        ['Tests', 'Vitest + React Testing Library + Playwright', 'Unit + E2E'],
        ['CI/CD', 'GitHub Actions → Vercel / Netlify', 'Deploy frontend-only'],
      ], header: true },
    ],
  },
  {
    id: 's4', num: '4', title: 'Couche 1 : Ingestion AutoCAD',
    content: [
      { type: 'subtitle', text: '4.1 Parser DWG/DXF natif' },
      { type: 'list', title: 'Fonctionnalités', items: [
        'F-101 : Import fichier DXF ASCII via dxf-parser — extraction de toutes les entités (LINE, LWPOLYLINE, INSERT, TEXT, MTEXT, CIRCLE, ARC)',
        'F-102 : Import fichier DWG binaire via LibreDWG compilé en WASM — aucun serveur requis',
        'F-103 : Import IFC (Revit) via web-ifc — extraction géométries IfcWall, IfcDoor, IfcWindow, IfcSpace',
        'F-104 : Détection automatique des calques et proposition de mapping sémantique (calque \'SECU_CAM\' → entité Caméra)',
        'F-105 : Interface de validation du mapping calques — l\'opérateur confirme ou corrige la classification IA',
        'F-106 : Extraction des cotations et textes d\'annotation (surface, numéro de local)',
        'F-107 : Gestion multi-niveaux : B1, RDC, R+1 — import simultané des 3 fichiers avec superposition',
        'F-108 : Historique versions de plans (stockage Supabase Storage + metadata git-like : auteur, date, commentaire)',
        'F-109 : Import coupes verticales AutoCAD pour reconstruction 3D des hauteurs sous plafond',
      ] },
      { type: 'subtitle', text: '4.2 Base de données spatiale (Supabase + PostGIS)' },
      { type: 'list', title: 'Schéma de données', items: [
        'Table zones : id, name, type (commerce/circulation/service/technique), geometry (POLYGON), floor, surface_m2, tenant_id',
        'Table entites : id, type (camera/porte/poi/badgeuse/sortie_secours), geometry (POINT), zone_id, properties (JSONB), floor',
        'Table itineraires : id, from_zone, to_zone, path (LINESTRING), distance_m, accessible_pmr',
        'Table incidents : id, zone_id, timestamp, type, description, statut, created_by',
        'Table heatmap_data : id, zone_id, date, heure, frequentation_score (0-100)',
        'RLS Supabase : policies par rôle (admin_securite, manager_commercial, visiteur_kiosk)',
        'Indexes PostGIS : GIST sur toutes les colonnes geometry pour performances spatiales',
      ] },
    ],
  },
  {
    id: 's5', num: '5', title: 'Couche 2 : Visualisation 2D/3D',
    content: [
      { type: 'subtitle', text: '5.1 Rendu 2D — Moteur plan vectoriel' },
      { type: 'list', title: 'Fonctionnalités', items: [
        'F-201 : Rendu SVG/Canvas vectoriel via Fabric.js — zoom 10%–2000% sans perte de qualité',
        'F-202 : Pan fluide (drag), zoom molette + pinch mobile, retour à l\'emprise initiale (bouton)',
        'F-203 : Niveaux de détail (LOD) : zoom < 25% → masse bâtiment uniquement · 25–100% → zones + labels · > 100% → entités détaillées',
        'F-204 : Navigation par étage — sélecteur B1/RDC/R+1, animation de transition',
        'F-205 : Sélection d\'entité au clic — panneau latéral avec propriétés editables',
        'F-206 : Mode mesure : distance entre deux points, calcul surface d\'une zone',
        'F-207 : Grille d\'accrochage paramétrable pour placement précis des entités',
        'F-208 : Minimap de navigation (vue d\'ensemble + rectangle de position actuelle)',
      ] },
      { type: 'subtitle', text: '5.2 Rendu 3D — Three.js' },
      { type: 'list', title: 'Fonctionnalités', items: [
        'F-211 : Reconstruction 3D automatique depuis le 2D + hauteurs sous plafond (extraites des coupes)',
        'F-212 : Navigation orbit (survol maquette) + first-person (visite intérieure)',
        'F-213 : Maquette extérieure texturée (façades, toiture, parking)',
        'F-214 : Visualisation cônes de vision caméra en 3D (frustum THREE.PerspectiveCamera)',
        'F-215 : Ombres douces (THREE.DirectionalLight + shadowMap)',
        'F-216 : Sélection d\'espace au clic — même panel propriétés que vue 2D',
      ] },
      { type: 'subtitle', text: '5.3 Superposition & calques thématiques' },
      { type: 'list', title: 'Fonctionnalités', items: [
        'F-221 : Toggle instantané 2D ↔ 3D (état persisté par session)',
        'F-222 : Gestionnaire de calques : Sécurité / Parcours Client / Technique / Base — activation indépendante',
        'F-223 : Heatmap fréquentation superposée au plan (D3 hexbin, palette configurable)',
        'F-224 : Vue éclatée : affichage simultané des 3 étages avec décalage vertical configurable',
        'F-225 : Mode comparaison : plan actuel vs version précédente (diff visuel coloré)',
        'F-226 : Mode présentation plein écran — masque tous les panneaux UI',
      ] },
      { type: 'subtitle', text: '5.4 UX & onboarding' },
      { type: 'list', title: 'Fonctionnalités', items: [
        'F-231 : Tour guidé première connexion — 5 étapes contextuelles par profil utilisateur',
        'F-232 : Tooltips persistants sur chaque outil (désactivables)',
        'F-233 : Raccourcis clavier documentés (? = aide, Esc = déselectionner, Ctrl+Z = annuler)',
        'F-234 : Gestion des erreurs d\'import : rapport lisible sur les entités non parsées',
        'F-235 : Mode tablette optimisé (gestes tactiles, boutons 44px min)',
      ] },
    ],
  },
  {
    id: 's6', num: '6', title: 'Couche 3 : Plan Sécuritaire (Vol. 2)',
    content: [
      { type: 'subtitle', text: '6.1 Vidéosurveillance — 120+ caméras' },
      { type: 'list', title: 'Fonctionnalités', items: [
        'F-301 : Bibliothèque modèles Wisenet intégrée (XNV-8080R, QNV-8080R, PNM-9000VQ…) avec specs angle/focale/IR',
        'F-302 : Placement caméra par drag & drop depuis la bibliothèque vers le plan',
        'F-303 : Calcul et affichage du cône de vision 2D (polygone SVG) et 3D (THREE.Mesh frustum)',
        'F-304 : Calcul automatique des zones mortes (différence géométrique PostGIS : surface totale − union des cônes)',
        'F-305 : Heatmap de couverture : gradient vert (couvert) → rouge (zone morte)',
        'F-306 : Rapport de couverture : % surface couverte par zone, liste zones mortes avec surface m²',
        'F-307 : Export plan caméras conforme APSAD R82 — PDF vectoriel A1 avec légende normée',
        'F-308 : Numérotation automatique des caméras (convention Cosmos : CAM-[ZONE]-[NUM])',
        'F-309 : Fiche technique par caméra : modèle, position, hauteur, angle, zone couverte, référence câblage',
      ] },
      { type: 'subtitle', text: '6.2 Contrôle d\'accès' },
      { type: 'list', title: 'Fonctionnalités', items: [
        'F-311 : Placement portes, SAS, tourniquets, badgeuses sur plan',
        'F-312 : Zonage sécuritaire 5 niveaux (Z1 public → Z5 salle forte) avec coloration',
        'F-313 : Matrice des droits : profil × zone × horaire',
        'F-314 : Statut temps réel des accès (ouvert/fermé/forcé/alarme) via Supabase Realtime',
        'F-315 : Historique des passages par point d\'accès',
      ] },
      { type: 'subtitle', text: '6.3 Simulation flux & évacuation' },
      { type: 'list', title: 'Fonctionnalités', items: [
        'F-321 : Calcul du débit aux sorties de secours (NF S 61-938 : 1 UP = 60 pers/min, largeur min 0.90m)',
        'F-322 : Simulation d\'évacuation animée — propagation de la foule modélisée par zones',
        'F-323 : Scénarios configurables : incendie zone X, évacuation totale, confinement secteur',
        'F-324 : Cheminements des agents de sécurité — rondes configurables avec horaires',
        'F-325 : Points de rassemblement géolocalisés avec capacité d\'accueil',
        'F-326 : Export plan évacuation normé SSIAP (PDF vectoriel A1)',
      ] },
      { type: 'subtitle', text: '6.4 Procédures d\'urgence & traçabilité' },
      { type: 'list', title: 'Fonctionnalités', items: [
        'F-331 : Fiches réflexes par zone (édition Markdown, attachées à une entité du plan)',
        'F-332 : Journal d\'incidents horodaté : type, zone, description, statut, créé par, clôturé par',
        'F-333 : Export rapport SSIAP / SDIS (Word + PDF) — template normé',
        'F-334 : Alertes push navigateur sur incidents ouverts depuis > N minutes',
      ] },
    ],
  },
  {
    id: 's7', num: '7', title: 'Couche 4 : Parcours Client (Vol. 3)',
    content: [
      { type: 'subtitle', text: '7.1 Wayfinding & signalétique' },
      { type: 'list', title: 'Fonctionnalités', items: [
        'F-401 : Graphe de navigation généré automatiquement depuis le plan (noeuds = intersections, arêtes = couloirs)',
        'F-402 : Calcul d\'itinéraire A* — plus court chemin entre deux POI',
        'F-403 : Variantes d\'itinéraire : rapide / accessible PMR (évite escaliers) / agréable (passe par food court)',
        'F-404 : Bibliothèque POI : enseignes, caisses, toilettes, ascenseurs, sorties, Cosmos Club desk',
        'F-405 : Génération QR code par local (URL vers fiche enseigne + itinéraire depuis entrée)',
        'F-406 : Export plan signalétique par niveau — PDF A1 avec positionnement totems et flèches directionnelles',
        'F-407 : Simulation du parcours animée — avatar se déplaçant sur l\'itinéraire calculé',
      ] },
      { type: 'subtitle', text: '7.2 Les 7 moments clés du parcours' },
      { type: 'list', title: 'Définition & instrumentation', items: [
        'M1 Arrivée : parking → sas d\'entrée. Métriques : temps moyen, point de friction identifié',
        'M2 Orientation : premier contact signalétique. Métriques : % visiteurs qui consultent le plan',
        'M3 Shopping : navigation galerie. Métriques : nombre d\'enseignes visitées, dwell time par zone',
        'M4 Restauration : food court / restaurants. Métriques : taux de passage, temps moyen',
        'M5 Services : banque, pharmacie, services aux personnes. Métriques : fréquentation',
        'M6 Fidélisation : interaction Cosmos Club. Métriques : taux d\'activation, offres consultées',
        'M7 Sortie : retour parking. Métriques : durée totale visite, satisfaction (NPS kiosk)',
      ] },
      { type: 'subtitle', text: '7.3 Analytics & heatmaps' },
      { type: 'list', title: 'Fonctionnalités', items: [
        'F-411 : Heatmap fréquentation par zone (données alimentées manuellement ou par compteurs WiFi/BLE)',
        'F-412 : Dwell time moyen par zone — comparaison semaine/mois',
        'F-413 : Flux croisés : visualisation des transitions zone A → zone B les plus fréquentes',
        'F-414 : Replay de visite anonymisé — trajectoire agrégée d\'un échantillon de visiteurs',
        'F-415 : Dashboard synthèse parcours — 7 KPIs moments clés en vue unique',
      ] },
      { type: 'subtitle', text: '7.4 Cosmos Club & personnalisation' },
      { type: 'list', title: 'Fonctionnalités', items: [
        'F-421 : Affichage des offres actives géolocalisées sur le plan (badge sur l\'enseigne concernée)',
        'F-422 : Parcours thématiques configurables : VIP, Famille avec enfants, Seniors, Découverte',
        'F-423 : Mode kiosk — plan en accès public sur bornes, wayfinding simplifié',
        'F-424 : Intégration Cosmos Club : lien vers profil membre depuis fiche enseigne',
      ] },
    ],
  },
  {
    id: 's8', num: '8', title: 'Couche 5 : Proph3t IA',
    content: [
      { type: 'subtitle', text: '8.1 Architecture Proph3t — IA locale propriétaire' },
      { type: 'para', text: 'Proph3t est le moteur d\'intelligence artificielle propriétaire de Praedium Tech. Dans ce module, il s\'exécute en local dans le navigateur via ONNX Runtime Web, ou sur un serveur Ollama du réseau local. Aucune donnée des plans ne quitte le réseau de l\'opérateur. Claude API est une couche de renforcement optionnelle pour les analyses prescriptives avancées.' },
      { type: 'subtitle', text: '8.2 Proph3t — Lecture intelligente des plans' },
      { type: 'list', title: 'Fonctionnalités', items: [
        'F-501 : OCR des annotations textuelles AutoCAD via Tesseract.js — extraction numéros de locaux, surfaces, désignations',
        'F-502 : Classification NLP des calques DWG → entités métier (ex : calque \'A-WALL\' → mur porteur, \'S-EQUIP\' → équipement sécurité)',
        'F-503 : Détection automatique : sorties de secours (largeur ≥ 0.90m + désignation), gaines techniques, locaux sensibles',
        'F-504 : Proposition de mapping calques — score de confiance affiché, validation opérateur obligatoire',
        'F-505 : Apprentissage du mapping validé — amélioration au fil des imports (fine-tuning local)',
      ] },
      { type: 'subtitle', text: '8.3 Proph3t — Génération plan sécuritaire' },
      { type: 'list', title: 'Fonctionnalités', items: [
        'F-511 : Coverage solver : placement optimal des 120+ caméras — algorithme de couverture maximale sous contrainte de budget',
        'F-512 : Proposition des 5 zones sécuritaires fondée sur la géométrie (flux, accès, locaux sensibles)',
        'F-513 : Rapport d\'analyse : gaps de couverture, redondances, angles morts avec coordonnées',
        'F-514 : Vérification automatique conformité APSAD R82 — liste des non-conformités',
        'F-515 : Suggestions d\'optimisation : repositionnement de N caméras pour +X% de couverture',
      ] },
      { type: 'subtitle', text: '8.4 Proph3t — Génération parcours client' },
      { type: 'list', title: 'Fonctionnalités', items: [
        'F-521 : Analyse des flux entrants/sortants par point d\'ouverture — déduction des axes de circulation principaux',
        'F-522 : Suggestion des 7 moments clés contextualisés à la géométrie du mall',
        'F-523 : Positionnement optimal des totems de signalétique (points de décision)',
        'F-524 : Score expérience parcours projeté (benchmark malls Afrique de l\'Ouest)',
        'F-525 : Identification des zones de friction (croisements de flux, visibilité réduite)',
      ] },
      { type: 'subtitle', text: '8.5 Claude API — Renforcement optionnel' },
      { type: 'list', title: 'Fonctionnalités', items: [
        'F-531 : Proxy sécurisé via Supabase Edge Function (Deno) — la clé API Claude n\'est jamais exposée côté client',
        'F-532 : Génération du rapport narratif Vol. 2 Plan Sécuritaire (20–30 pages) à partir des données Proph3t',
        'F-533 : Génération du rapport narratif Vol. 3 Parcours Client avec recommandations actionnables',
        'F-534 : Simulation de scénarios complexes : ouverture R+1, extension parking, ajout enseigne ancre',
        'F-535 : Réponses aux questions libres sur les plans (\'Quelle est la surface totale de la zone restauration ?\')',
        'F-536 : Mode activable/désactivable — le module fonctionne intégralement sans Claude API',
      ] },
    ],
  },
  {
    id: 's9', num: '9', title: 'Couche 6 : Collaboration & exports',
    content: [
      { type: 'subtitle', text: '9.1 Collaboration multi-utilisateurs temps réel' },
      { type: 'list', title: 'Fonctionnalités', items: [
        'F-601 : Sessions simultanées via Supabase Realtime — curseurs des autres utilisateurs visibles sur le plan',
        'F-602 : Commentaires attachés à une entité ou une zone du plan (texte + pièce jointe)',
        'F-603 : Fil de discussion par commentaire (résolution, mention @utilisateur)',
        'F-604 : Historique complet des modifications : qui / quand / quelle entité / ancienne valeur / nouvelle valeur',
        'F-605 : Résolution de conflits last-write-wins avec notification à l\'utilisateur évincé',
        'F-606 : Rôles et droits : Admin (tout) · Manager sécurité (Vol.2 en écriture) · Manager commercial (Vol.3 en écriture) · Consultant (lecture seule) · Kiosk (wayfinding public)',
      ] },
      { type: 'subtitle', text: '9.2 Exports opérationnels normés' },
      { type: 'list', title: 'Fonctionnalités', items: [
        'F-611 : Plan sécuritaire PDF vectoriel A1 — conforme APSAD R82 avec légende, cartouche, numérotation caméras',
        'F-612 : Plan évacuation PDF vectoriel A1 — conforme SSIAP/SDIS avec cheminements et points de rassemblement',
        'F-613 : Rapport APSAD Word/PDF — 15–20 pages : descriptif, implantation, tableau des caméras, non-conformités',
        'F-614 : Plan signalétique PDF A3/A1 par niveau — positionnement totems, flèches, QR codes',
        'F-615 : Export DWG annoté — retour bureau d\'études avec couches ajoutées par le module',
        'F-616 : Export données JSON/CSV — zones, entités, heatmaps (pour reporting externe)',
        'F-617 : Rapport parcours client PDF — 7 moments clés, KPIs, recommandations signalétique',
      ] },
      { type: 'subtitle', text: '9.3 Intégrations écosystème Atlas Studio' },
      { type: 'list', title: 'Fonctionnalités', items: [
        'F-621 : WiseFM : clic sur équipement → ouverture fiche maintenance WiseFM, déclenchement OT',
        'F-622 : COCKPIT : jalons de mobilisation visibles sur le plan par zone (ex : \'Food court — J-45 ouverture\')',
        'F-623 : Atlas Finance : CAPEX équipements (caméras, badgeuses) lié aux entités du plan',
        'F-624 : Wise HR : planning des agents de sécurité affiché en surimpression sur le plan (rondes)',
        'F-625 : API interne Atlas Studio : événements pub/sub entre modules via Supabase Realtime',
      ] },
    ],
  },
  {
    id: 's10', num: '10', title: 'Exigences non fonctionnelles',
    content: [
      { type: 'table', rows: [
        ['Exigence', 'Critère d\'acceptance'],
        ['Performance rendu 2D', 'Plan 3 niveaux (5000 entités) chargé et rendu en < 3s sur Chrome desktop'],
        ['Performance rendu 3D', '60 FPS minimum en navigation orbit sur GPU intégré Intel Iris'],
        ['Coverage solver', 'Placement optimal 120 caméras calculé en < 10s (Web Worker)'],
        ['Calcul A* wayfinding', 'Itinéraire calculé en < 200ms pour graphe ≤ 500 noeuds'],
        ['Offline', 'Module 2D plan + consultation données fonctionnel sans connexion internet'],
        ['Sync offline', 'Resynchronisation automatique à la reconnexion, sans perte de données'],
        ['Taille bundle', 'Bundle JS initial < 500KB gzippé (lazy loading des modules 3D et IA)'],
        ['Accessibilité', 'WCAG 2.1 AA — contrastes, navigation clavier, labels ARIA'],
        ['Sécurité plans', 'Plans DWG/DXF stockés chiffrés dans Supabase Storage (AES-256)'],
        ['Disponibilité', '99.5% uptime (dépend SLA Supabase Pro)'],
        ['Multi-utilisateurs', '≤ 10 sessions simultanées sans dégradation perceptible'],
        ['Navigateurs', 'Chrome 110+, Edge 110+, Safari 16+, Firefox 110+'],
      ], header: true },
    ],
  },
  {
    id: 's11', num: '11', title: 'Roadmap d\'implémentation',
    content: [
      { type: 'table', rows: [
        ['Phase', 'Contenu', 'Durée estimée', 'Échéance cible'],
        ['P0 — Fondation', 'Setup Supabase + PostGIS · Parser DXF · Rendu 2D Fabric.js · Auth + RLS · Import plan Cosmos Angré', '3 semaines', 'Avril 2026'],
        ['P1 — Visualisation', 'Rendu 3D Three.js · Superposition calques · Navigation étages · Offline Service Worker', '4 semaines', 'Mai 2026'],
        ['P2 — Vol. 2 Sécurité', 'Caméras + cônes de vision · Coverage solver (Proph3t) · Contrôle accès · Export PDF APSAD', '5 semaines', 'Juin 2026'],
        ['P3 — Vol. 3 Parcours', 'Wayfinding A* · POI · 7 moments clés · Heatmaps · Cosmos Club · Export signalétique', '5 semaines', 'Juillet 2026'],
        ['P4 — IA & collaboration', 'Proph3t lecture plans · Génération automatique · Claude API renforcement · Collaboration Realtime', '4 semaines', 'Août 2026'],
        ['P5 — Intégrations', 'WiseFM · COCKPIT · Atlas Finance · Exports complets · Tests E2E · Recette', '3 semaines', 'Septembre 2026'],
        ['P6 — Go-live', 'Déploiement prod · Formation équipes CRMC · Documentation utilisateur · Support ouverture', '2 semaines', 'Octobre 2026'],
      ], header: true },
    ],
  },
  {
    id: 's12', num: '12', title: 'Critères de recette',
    content: [
      { type: 'list', title: 'Tests fonctionnels obligatoires avant go-live', items: [
        'RC-01 : Import plan DWG Cosmos Angré RDC → toutes les entités reconnues, mapping calques validé',
        'RC-02 : Placement 120 caméras → couverture ≥ 95% surface commerciale calculée et affichée',
        'RC-03 : Export PDF APSAD R82 — vérifié par prestataire sécurité Cosmos Angré',
        'RC-04 : Calcul itinéraire entrée principale → enseigne ancre (Carrefour) en < 200ms',
        'RC-05 : Session simultanée Pame + Lynda — modifications visibles en temps réel (< 1s latence)',
        'RC-06 : Mode offline — plan consultable et caméras ajoutables sans connexion internet',
        'RC-07 : Resynchronisation offline → aucune perte de données après reconnexion',
        'RC-08 : Proph3t génère le plan sécuritaire en < 30s depuis le plan DWG importé',
        'RC-09 : Export plan évacuation PDF — validé par Directeur Sécurité Cosmos Angré',
        'RC-10 : Tous les livrables Vol. 2 et Vol. 3 générables depuis le module sans intervention développeur',
      ] },
    ],
  },
];

/* ─── Metrics for hero section ─── */
export const CDC_METRICS = [
  { n: '13', label: 'Sections' },
  { n: '6', label: 'Couches' },
  { n: '100+', label: 'Fonctionnalités' },
  { n: '7', label: 'Phases' },
];

/* ─── Tags for header ─── */
export const CDC_TAGS = [
  'Frontend-only',
  'React + TypeScript + Supabase',
  'Proph3t IA locale',
  'Vol. 2 & Vol. 3',
  'Go-live Oct. 2026',
];

/* ─── Phase progress for roadmap visualization ─── */
export const PHASES = [
  { id: 'P0', label: 'Fondation', color: '#6366F1', progress: 0 },
  { id: 'P1', label: 'Visualisation', color: '#3B82F6', progress: 0 },
  { id: 'P2', label: 'Sécurité', color: '#0EA5E9', progress: 0 },
  { id: 'P3', label: 'Parcours', color: '#10B981', progress: 0 },
  { id: 'P4', label: 'IA & Collab', color: '#F59E0B', progress: 0 },
  { id: 'P5', label: 'Intégrations', color: '#EF4444', progress: 0 },
  { id: 'P6', label: 'Go-live', color: '#C9943A', progress: 0 },
];
