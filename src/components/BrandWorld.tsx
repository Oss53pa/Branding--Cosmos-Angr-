import React, { useState } from 'react';
import { Crown, Gift, ShoppingBag, Shirt, Coffee, Key, BadgeCheck, Droplets, MapPin, ArrowUpRight, ArrowRight, ArrowDownRight, Star, Smartphone, CreditCard, Flag } from 'lucide-react';
import type { ScenarioKey } from './Scenarios';
import CosmosLogo from './CosmosLogo';
import SignaletiqueTotemSection from './SignaletiqueTotems';
import GoodiesMockupsSection from './GoodiesMockups';
import TextileMockupsSection from './TextileMockups';
import DigitalMockupsSection from './DigitalMockups';
import PersonasFocusGroupSection from './PersonasFocusGroup';

/* ═══════════════════════════════════════════
   DONNÉES PARTAGÉES
   ═══════════════════════════════════════════ */

interface ScColors { primary: string; dark: string; accent: string; secondary: string; light: string; tagline: string; tagline2: string; textOnDark: string }
const sc: Record<ScenarioKey, ScColors> = {
  A: { primary: '#2F5439', dark: '#1A1410', accent: '#C9943A', secondary: '#F2EBDD', light: '#76764D', tagline: 'Le quartier que vous méritez', tagline2: 'Enfin tout, enfin ici', textOnDark: '#fff' },
  B: { primary: '#0D1B4B', dark: '#060E2A', accent: '#B8924A', secondary: '#F2EBDD', light: '#1A3060', tagline: 'Un monde à part', tagline2: "Vivez l'exception", textOnDark: '#D4B06A' },
  C: { primary: '#B25A38', dark: '#2C1A0A', accent: '#C9943A', secondary: '#F2EBDD', light: '#6D7447', tagline: "L'exception, tout simplement", tagline2: "L'exceptionnel, au quotidien", textOnDark: '#fff' },
  D: { primary: '#898D5D', dark: '#1C2215', accent: '#D4A843', secondary: '#F5F0E4', light: '#6B7A4A', tagline: 'Ici, on vit quelque chose', tagline2: 'Le meilleur de Cocody', textOnDark: '#fff' },
};

interface Swatch { color: string; name: string; usage: string; role: string; pct: number }
const palettes: Record<ScenarioKey, Swatch[]> = {
  A: [
    { color: '#2F5439', name: 'Forêt Profond', usage: 'Façades, panneaux', role: 'Principale', pct: 30 },
    { color: '#76764D', name: 'Kaki Minéral', usage: 'Accents, végétation', role: 'Secondaire', pct: 10 },
    { color: '#C9943A', name: 'Or Cuivré', usage: 'Logo, détails premium', role: 'Accent', pct: 15 },
    { color: '#E8C97A', name: 'Or Doux', usage: 'Icônes, filets', role: 'Accent clair', pct: 5 },
    { color: '#F2EBDD', name: 'Sable Territorial', usage: 'Surfaces, murs', role: 'Fond', pct: 35 },
    { color: '#1A1410', name: 'Noir Chaud', usage: 'Signalétique', role: 'Sombre', pct: 5 },
  ],
  B: [
    { color: '#FAF7F2', name: 'Blanc chaud', usage: 'Plafonds, transitions', role: 'Neutre', pct: 10 },
    { color: '#E8E0D5', name: 'Pierre naturelle', usage: 'Sols galeries, murs', role: 'Neutre', pct: 20 },
    { color: '#F2EDE3', name: 'Ivoire', usage: 'Print, signalétique', role: 'Fond', pct: 15 },
    { color: '#B8924A', name: 'Or Mat', usage: 'Logo, lettrage, CTA', role: 'Signature', pct: 20 },
    { color: '#1A3060', name: 'Bleu Profond', usage: 'Sous-menus, hover', role: 'Structure', pct: 10 },
    { color: '#0D1B4B', name: 'Bleu Nuit', usage: 'Fond digital, façade, textile', role: 'Dominant', pct: 15 },
  ],
  C: [
    { color: '#2C1A0A', name: 'Ébène Chaud', usage: 'Prestige, signalétique', role: 'Sombre', pct: 5 },
    { color: '#B25A38', name: 'Terracotta Foncé', usage: 'Bardage, accents archi, textile', role: 'Signature', pct: 15 },
    { color: '#6D7447', name: 'Kaki Végétal', usage: 'Jardinières, événements', role: 'Végétal', pct: 12 },
    { color: '#C9943A', name: 'Bronze Doré', usage: 'Logo, lettrage, luminaires', role: 'Prestige', pct: 15 },
    { color: '#D6C29C', name: 'Sable Naturel', usage: 'Icônes', role: 'Accent clair', pct: 3 },
    { color: '#F2EBDD', name: 'Sable Territorial', usage: 'Chaleur, accueil', role: 'Fond', pct: 30 },
    { color: '#0B1026', name: 'Bleu Cosmos', usage: 'Carte Club, dark mode digital', role: 'Cosmique', pct: 5 },
  ],
  D: [
    { color: '#E5DECC', name: 'Pierre Beige', usage: 'Sols, murs, hall — socle minéral', role: 'Dominant', pct: 32 },
    { color: '#898D5D', name: 'Kaki Végétal', usage: 'Accents archi, bardage, textile', role: 'Signature', pct: 20 },
    { color: '#F5F0E4', name: 'Ivoire Chaud', usage: 'Contre-fonds, transitions', role: 'Neutre clair', pct: 14 },
    { color: '#D4A843', name: 'Or Soleil', usage: 'Signalétique, lettrage, CTA', role: 'Or vif', pct: 12 },
    { color: '#6B7A4A', name: 'Mousse', usage: 'Jardinières, bandes, événements', role: 'Végétal', pct: 8 },
    { color: '#FAFAF6', name: 'Blanc Pur', usage: 'Plafonds, transitions', role: 'Neutre pur', pct: 6 },
  ],
};

const zones = [
  { name: 'Supermarché', nameEn: 'Supermarket' },
  { name: 'Restauration', nameEn: 'Dining' },
  { name: 'Cinéma', nameEn: 'Cinema' },
  { name: 'Mode & Beauté', nameEn: 'Fashion & Beauty' },
  { name: 'Parking', nameEn: 'Parking' },
  { name: 'Accueil', nameEn: 'Information' },
];

interface TimelineStep { title: string; touchpoint: string; emotion: string; verbatim: string }
const timeline: Record<ScenarioKey, TimelineStep[]> = {
  A: [
    { title: 'Arrivée', touchpoint: 'Totem entrée parking', emotion: 'Rassuré', verbatim: "C'est bien indiqué, on trouve facilement." },
    { title: 'Parking', touchpoint: 'Panneau niveau P1', emotion: 'Guidé', verbatim: 'Place trouvée en 2 minutes.' },
    { title: 'Entrée', touchpoint: "Panneau d'accueil", emotion: 'Bienvenu', verbatim: "Enfin, je n'ai plus besoin de traverser Abidjan." },
    { title: 'Hall central', touchpoint: 'Écran digital', emotion: 'Impressionné', verbatim: "C'est lumineux, moderne, aéré." },
    { title: 'Shopping', touchpoint: 'Panneau direction', emotion: 'Autonome', verbatim: 'Tout est bien organisé par zones.' },
    { title: 'Restaurant', touchpoint: 'Menu board', emotion: 'Satisfait', verbatim: 'Bon choix de restaurants, bons prix.' },
    { title: 'Sortie', touchpoint: 'Panneau "À bientôt"', emotion: 'Fidélisé', verbatim: 'On reviendra samedi prochain.' },
  ],
  B: [
    { title: 'Arrivée', touchpoint: 'Totem or mat', emotion: 'Impressionné', verbatim: 'On sent la qualité dès le parking.' },
    { title: 'Parking', touchpoint: 'Signalétique bleu/or', emotion: 'Guidé', verbatim: 'Parking premium, bien éclairé.' },
    { title: 'Entrée', touchpoint: 'Façade lettrée', emotion: 'Aspiré', verbatim: "On entre dans un autre monde." },
    { title: 'Hall central', touchpoint: 'Écran immersif', emotion: 'Émerveillé', verbatim: 'Les matériaux sont nobles, élégants.' },
    { title: 'Shopping', touchpoint: 'Panneaux suspendus', emotion: 'Distingué', verbatim: 'Chaque boutique est une découverte.' },
    { title: 'Restaurant', touchpoint: 'Carte gastronomique', emotion: 'Conquis', verbatim: "Pas besoin d'aller à Dubaï." },
    { title: 'Sortie', touchpoint: 'Panneau "À très bientôt"', emotion: 'Membre', verbatim: "J'appartiens à quelque chose." },
  ],
  C: [
    { title: 'Arrivée', touchpoint: 'Totem bronze', emotion: 'Curieux', verbatim: 'La bardage bronze, ça a de la gueule.' },
    { title: 'Parking', touchpoint: 'Panneau bronze/sable', emotion: 'Guidé', verbatim: 'Chaleureux même au parking.' },
    { title: 'Entrée', touchpoint: 'Bardage illuminé', emotion: 'Fier', verbatim: "L'exception, ici chez moi." },
    { title: 'Hall central', touchpoint: 'Écran terracotta', emotion: 'Chez soi', verbatim: "C'est premium mais on se sent bien." },
    { title: 'Shopping', touchpoint: 'Panneaux sable', emotion: 'Libre', verbatim: 'Courses ET shopping — tout ici.' },
    { title: 'Restaurant', touchpoint: 'Carte terrasse', emotion: 'Comblé', verbatim: 'Terrasse en journée, gastronomie le soir.' },
    { title: 'Sortie', touchpoint: "Panneau de sortie", emotion: 'Conquis', verbatim: 'La fierté sans arrogance.' },
  ],
  D: [
    { title: 'Arrivée', touchpoint: 'Totem végétalisé', emotion: 'Apaisé', verbatim: 'On respire déjà en arrivant.' },
    { title: 'Parking', touchpoint: 'Panneau kaki/ivoire', emotion: 'Guidé', verbatim: 'Du vert partout, même au parking.' },
    { title: 'Entrée', touchpoint: 'Façade végétale', emotion: 'Émerveillé', verbatim: "C'est un jardin ou un centre commercial ?" },
    { title: 'Hall central', touchpoint: 'Mur végétal central', emotion: 'Immergé', verbatim: "On se sent dans la nature, mais avec tout sous la main." },
    { title: 'Shopping', touchpoint: 'Panneaux bois/kaki', emotion: 'Serein', verbatim: 'Tout est fluide et naturel.' },
    { title: 'Restaurant', touchpoint: 'Terrasse jardin', emotion: 'Ressourcé', verbatim: 'Déjeuner sous les arbres à Cocody.' },
    { title: 'Sortie', touchpoint: 'Panneau "À bientôt"', emotion: 'Fidélisé', verbatim: "On revient pour l'ambiance autant que pour les boutiques." },
  ],
};

interface TonRow { support: string; formulation: string; note: string }
const tonExamples: Record<ScenarioKey, TonRow[]> = {
  A: [
    { support: "Panneau d'accueil", formulation: 'Bienvenue chez vous. Tout est là.', note: 'Chaleureux, direct' },
    { support: 'Push app', formulation: 'Vos courses fraîches vous attendent — Carrefour, Bât. 3', note: 'Amical' },
    { support: 'Affiche événement', formulation: 'Samedi en famille — ateliers, cinéma, goûter. On vous attend !', note: 'Invitant' },
  ],
  B: [
    { support: "Panneau d'accueil", formulation: 'Cosmos Angré. Entrez dans un autre monde.', note: 'Sobre, aspirationnel' },
    { support: 'Push app', formulation: 'Ce soir : table gastronomique + séance 20h. Réservez.', note: 'Curation' },
    { support: 'Affiche événement', formulation: 'Vernissage privé — Collection Printemps. Sur invitation.', note: 'Exclusif' },
  ],
  C: [
    { support: "Panneau d'accueil", formulation: "L'exception vous attend. Entrez comme chez vous.", note: 'Hospitalité souveraine' },
    { support: 'Push app', formulation: 'De la terrasse au cinéma — votre orbite du samedi.', note: 'ADN cosmique' },
    { support: 'Affiche événement', formulation: 'Cosmos attire. Cosmos réunit. Cosmos élève.', note: 'Triptyque cosmique' },
  ],
  D: [
    { support: "Panneau d'accueil", formulation: 'Bienvenue dans votre jardin. Ici, on vit quelque chose.', note: 'Vivant + naturel' },
    { support: 'Push app', formulation: 'Marché bio ce samedi — produits frais, ateliers enfants, terrasse jardin.', note: 'Direct + désirable' },
    { support: 'Affiche événement', formulation: 'Soirée Cosmos Nature — musique live, food garden, ciel ouvert.', note: 'Ancré + premium' },
  ],
};

// Données collection produits
interface ProductSpec { name: string; category: string; body: string; logo: string; detail: string; material: string }
const products: Record<ScenarioKey, ProductSpec[]> = {
  A: [
    { name: 'Polo Staff', category: 'Textile', body: '#2F5439', logo: '#C9943A', detail: 'Col & bords crème', material: 'Piqué coton bio 220g · Logo brodé or poitrine gauche · Boutons laiton brossé' },
    { name: 'Blazer Direction', category: 'Textile', body: '#1A1410', logo: '#C9943A', detail: "Pin's or au revers", material: 'Laine mélangée noire · Doublure vert forêt · Boutons corne naturelle' },
    { name: 'Bleu de Travail', category: 'Textile', body: '#76764D', logo: '#E8C97A', detail: 'Bandes réfléchissantes', material: 'Sergé coton 280g · Logo or doux brodé dos 20cm + poitrine 8cm' },
    { name: 'T-shirt Événement', category: 'Textile', body: '#2F5439', logo: '#F2EBDD', detail: 'Sérigraphie crème', material: 'Jersey coton bio 180g · Impression HD poitrine et dos' },
    { name: 'Gourde Isotherme', category: 'Goodies', body: '#2F5439', logo: '#C9943A', detail: 'Bouchon bambou', material: 'Inox double paroi 500ml · Logo gravé laser · Coffret kraft recyclé' },
    { name: 'Tasse Céramique', category: 'Goodies', body: '#F2EBDD', logo: '#2F5439', detail: 'Intérieur or cuivré', material: 'Céramique émaillée 350ml · Finition mate · Boîte cadeau verte' },
    { name: 'Porte-clés', category: 'Goodies', body: '#C9943A', logo: '#1A1410', detail: 'Émail noir logo', material: 'Zamak plaqué or · Anneau 25mm · Forme arrondie · Pochette velours' },
    { name: 'Badge Nominatif', category: 'Goodies', body: '#1A1410', logo: '#C9943A', detail: 'Fixation aimant', material: 'Aluminium anodisé noir · Gravure laser · 75×25mm · Aimant néodyme' },
  ],
  B: [
    { name: 'Polo Staff', category: 'Textile', body: '#0D1B4B', logo: '#B8924A', detail: 'Col & bords ivoire', material: 'Piqué coton pima 220g · Logo brodé or mat poitrine · Boutons laiton poli' },
    { name: 'Blazer Direction', category: 'Textile', body: '#060E2A', logo: '#B8924A', detail: "Pin's or mat revers", material: 'Laine vierge bleu nuit · Doublure bleu profond · Cravate/foulard assorti' },
    { name: 'Bleu de Travail', category: 'Textile', body: '#1A3060', logo: '#D4B06A', detail: 'Passepoil ivoire', material: 'Sergé coton 280g · Logo or clair brodé dos 20cm + poitrine 8cm' },
    { name: 'T-shirt Événement', category: 'Textile', body: '#0D1B4B', logo: '#F2EDE3', detail: 'Sérigraphie ivoire', material: 'Jersey coton pima 180g · Impression HD poitrine et dos' },
    { name: 'Gourde Isotherme', category: 'Goodies', body: '#060E2A', logo: '#B8924A', detail: 'Bouchon ivoire', material: 'Inox double paroi 500ml · Logo gravé laser or · Coffret bleu nuit' },
    { name: 'Tasse Céramique', category: 'Goodies', body: '#060E2A', logo: '#F2EDE3', detail: 'Intérieur or mat', material: 'Céramique émaillée 350ml · Finition mate noire · Soucoupe assortie' },
    { name: 'Porte-clés', category: 'Goodies', body: '#B8924A', logo: '#060E2A', detail: 'Émail bleu nuit', material: 'Zamak plaqué or mat · Anneau gunmetal · Forme rectangulaire épurée' },
    { name: 'Badge Nominatif', category: 'Goodies', body: '#060E2A', logo: '#B8924A', detail: 'Fixation aimant', material: 'Aluminium anodisé noir · Gravure laser or · 75×25mm · Aimant néodyme' },
  ],
  C: [
    { name: 'Polo Staff', category: 'Textile', body: '#B25A38', logo: '#C9943A', detail: 'Col & bords crème sablée', material: 'Piqué coton bio 220g · Logo brodé bronze poitrine · Boutons corne naturelle' },
    { name: 'Blazer Direction', category: 'Textile', body: '#2C1A0A', logo: '#C9943A', detail: "Pin's bronze revers", material: 'Laine mélangée ébène · Pochette terracotta · Doublure sable doré' },
    { name: 'Bleu de Travail', category: 'Textile', body: '#6D7447', logo: '#D6C29C', detail: 'Passepoil crème', material: 'Sergé coton 280g · Logo sable doré brodé dos 20cm + poitrine 8cm' },
    { name: 'T-shirt Événement', category: 'Textile', body: '#B25A38', logo: '#F2EBDD', detail: 'Sérigraphie crème', material: 'Jersey coton bio 180g · Impression HD poitrine et dos · Motif géo africain' },
    { name: 'Gourde Isotherme', category: 'Goodies', body: '#2C1A0A', logo: '#C9943A', detail: 'Bouchon bois naturel', material: 'Inox double paroi 500ml · Logo gravé laser bronze · Étui raphia tressé' },
    { name: 'Tasse Céramique', category: 'Goodies', body: '#F2EBDD', logo: '#B25A38', detail: 'Intérieur bronze doré', material: 'Céramique émaillée 350ml · Motif géométrique africain discret · Boîte kraft' },
    { name: 'Porte-clés', category: 'Goodies', body: '#C9943A', logo: '#2C1A0A', detail: 'Émail ébène + relief', material: 'Zamak plaqué bronze · Motif géométrique africain en relief · Pochette raphia' },
    { name: 'Badge Nominatif', category: 'Goodies', body: '#2C1A0A', logo: '#C9943A', detail: 'Fixation aimant', material: 'Bronze patiné · Gravure laser · 75×25mm · Aimant néodyme · Lanière raphia' },
  ],
  D: [
    { name: 'Polo Staff', category: 'Textile', body: '#898D5D', logo: '#D4A843', detail: 'Col & bords ivoire', material: 'Piqué coton bio 220g · Logo brodé or soleil poitrine gauche · Boutons bois naturel' },
    { name: 'Blazer Direction', category: 'Textile', body: '#1C2215', logo: '#D4A843', detail: "Pin's or revers", material: 'Laine mélangée forêt nuit · Doublure kaki nature · Boutons corne naturelle' },
    { name: 'Bleu de Travail', category: 'Textile', body: '#6B7A4A', logo: '#D6D4C0', detail: 'Bandes réfléchissantes', material: 'Sergé coton 280g · Logo pierre naturelle brodé dos 20cm + poitrine 8cm' },
    { name: 'T-shirt Événement', category: 'Textile', body: '#898D5D', logo: '#F5F0E4', detail: 'Sérigraphie ivoire', material: 'Jersey coton bio 180g · Impression HD poitrine et dos · Motif feuillage' },
    { name: 'Gourde Isotherme', category: 'Goodies', body: '#1C2215', logo: '#D4A843', detail: 'Bouchon bois naturel', material: 'Inox double paroi 500ml · Logo gravé laser or · Étui coton recyclé' },
    { name: 'Tasse Céramique', category: 'Goodies', body: '#F5F0E4', logo: '#898D5D', detail: 'Intérieur or soleil', material: 'Céramique émaillée 350ml · Finition mate · Boîte kraft recyclé' },
    { name: 'Porte-clés', category: 'Goodies', body: '#D4A843', logo: '#1C2215', detail: 'Émail forêt nuit', material: 'Zamak plaqué or · Anneau 25mm · Forme feuille stylisée · Pochette coton' },
    { name: 'Badge Nominatif', category: 'Goodies', body: '#1C2215', logo: '#D4A843', detail: 'Fixation aimant', material: 'Aluminium anodisé vert nuit · Gravure laser or · 75×25mm · Aimant néodyme' },
  ],
};

const MonoLogo: React.FC<{ color: string; h: number }> = ({ color, h }) => (
  <svg viewBox="-2 -2 334 78" height={h} xmlns="http://www.w3.org/2000/svg">
    <path d="M 37,5 A 22,22 0 1,0 37,39" fill="none" stroke={color} strokeWidth={3.5} strokeDasharray="0.1 5.8" strokeLinecap="round" />
    <circle cx={74} cy={22} r={20} fill="none" stroke={color} strokeWidth={2} />
    <path d="M 34,8 C 32,2 26,0 19,0 C 10,0 1,4 1,12 C 1,19 9,22 19,22 C 29,22 37,25 37,33 C 37,40 30,44 21,44 C 15,44 5,42 2,36" transform="translate(108,0)" fill="none" stroke={color} strokeWidth={3.5} strokeDasharray="0.1 5.8" strokeLinecap="round" />
    <path d="M 0,44 L 0,0 L 20,26 L 40,0 L 40,44" transform="translate(162,0)" fill="none" stroke={color} strokeWidth={3.5} strokeDasharray="0.1 5.8" strokeLinecap="round" />
    <circle cx={236} cy={22} r={20} fill={color} />
    <path d="M 34,8 C 32,2 26,0 19,0 C 10,0 1,4 1,12 C 1,19 9,22 19,22 C 29,22 37,25 37,33 C 37,40 30,44 21,44 C 15,44 5,42 2,36" transform="translate(270,0)" fill="none" stroke={color} strokeWidth={3.5} strokeDasharray="0.1 5.8" strokeLinecap="round" />
    <text x={308} y={72} textAnchor="end" fontFamily="'Inter',sans-serif" fontSize={16} fontWeight={600} letterSpacing={4} fill={color}>ANGR&#xC9;</text>
  </svg>
);

const grad = (k: ScenarioKey) => k === 'A' ? 'from-[#2F5439] to-[#76764D]' : k === 'B' ? 'from-[#060E2A] to-[#0D1B4B]' : k === 'D' ? 'from-[#1C2215] to-[#3D4A2A]' : 'from-[#2C1A0A] via-[#3D2218] to-[#2C1A0A]';
/* Pour C, le fond premium est Ébène pur avec un subtil reflet doré — pas de terracotta en aplat */
const darkBg = (c: ScColors, k: ScenarioKey, angle = 145) => k === 'C'
  ? `linear-gradient(${angle}deg, #2C1A0A 0%, #1F1309 50%, #2C1A0A 100%)`
  : k === 'D'
  ? `linear-gradient(${angle}deg, #1C2215 0%, #2A3520 50%, #1C2215 100%)`
  : `linear-gradient(${angle}deg, ${c.dark}, ${c.primary})`;

/* ═══════════════════════════════════════════
   01 — HERO IMMERSIF + PALETTE + TON
   ═══════════════════════════════════════════ */

const AmbianceSection: React.FC<{ k: ScenarioKey }> = ({ k }) => {
  const c = sc[k];
  const pal = palettes[k];
  const ton = tonExamples[k];

  return (
    <div id="bw-ambiance" className="py-16 border-b border-black/[.08]">
      {/* Hero immersif */}
      <div className="rounded-[18px] overflow-hidden mb-12" style={{ boxShadow: '0 30px 80px rgba(0,0,0,.2)' }}>
        <div className="relative h-[340px] overflow-hidden">
          <div className="absolute inset-0" style={{ background: k === 'C' ? `linear-gradient(135deg, #2C1A0A 0%, #1F1309 30%, #2C1A0A 60%, ${c.accent} 100%)` : `linear-gradient(135deg, ${c.dark} 0%, ${c.primary} 40%, ${c.light} 70%, ${c.accent} 100%)`, backgroundSize: '300% 300%', animation: 'bw-hero 12s ease infinite' }}>
            <style>{`@keyframes bw-hero{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}`}</style>
          </div>
          <div className="absolute inset-0 opacity-[.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-16">
            <div className="text-[10px] font-bold tracking-[.5em] uppercase mb-5" style={{ color: c.accent }}>Brand World · Cosmos Angré</div>
            <div className="font-cormorant text-[56px] font-light leading-[1.02] mb-4" style={{ color: c.textOnDark }}>"{c.tagline}"</div>
            <div className="w-20 h-[2px] rounded-full mb-5" style={{ background: c.accent }} />
            <div className="text-[15px] font-light tracking-widest uppercase" style={{ color: `${c.textOnDark}66` }}>{c.tagline2}</div>
          </div>
        </div>
      </div>

      {/* Palette — barre proportionnelle + détails */}
      <div className="bg-white rounded-[18px] border border-black/[.06] overflow-hidden mb-10" style={{ boxShadow: '0 4px 24px rgba(0,0,0,.04)' }}>
        <div className={`px-8 py-6 border-b border-black/[.06] bg-gradient-to-br ${grad(k)}`}>
          <div className="text-[9px] font-bold tracking-[.25em] uppercase mb-1" style={{ color: c.accent }}>Brand World · 01</div>
          <div className="font-cormorant text-[24px] text-white font-light">Palette chromatique</div>
        </div>
        <div className="p-8">
          {/* Grande barre proportionnelle */}
          <div className="flex h-20 rounded-2xl overflow-hidden mb-8" style={{ boxShadow: 'inset 0 2px 8px rgba(0,0,0,.06), 0 4px 16px rgba(0,0,0,.08)' }}>
            {pal.map((s, i) => {
              const isLight = ['#F2EBDD','#E8C97A','#D6C29C','#D4B06A','#F5F0E4','#D6D4C0'].includes(s.color);
              return (
                <div key={i} className="flex flex-col items-center justify-center transition-all hover:scale-y-110 origin-bottom" style={{ width: `${s.pct}%`, background: s.color }}>
                  <div className="text-[11px] font-bold" style={{ color: isLight ? c.primary : '#fff' }}>{s.pct}%</div>
                  <div className="text-[7px] font-medium opacity-60 mt-0.5" style={{ color: isLight ? c.primary : '#fff' }}>{s.role}</div>
                </div>
              );
            })}
          </div>

          {/* Détails couleurs en grille */}
          <div className="grid grid-cols-6 gap-4">
            {pal.map((s, i) => {
              const isLight = ['#F2EBDD','#E8C97A','#D6C29C','#D4B06A','#F5F0E4','#D6D4C0'].includes(s.color);
              return (
                <div key={i} className="group">
                  <div className="rounded-xl p-4 mb-2 transition-all group-hover:scale-[1.03] group-hover:shadow-lg" style={{ background: s.color, minHeight: 80 }}>
                    <div className="text-[9px] font-bold" style={{ color: isLight ? c.primary : `${c.textOnDark}cc` }}>{s.role}</div>
                  </div>
                  <div className="text-[11px] font-bold text-black/75">{s.name}</div>
                  <div className="text-[9px] font-mono text-black/30 mt-0.5">{s.color}</div>
                  <div className="text-[9px] text-black/40 mt-0.5">{s.usage}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Ton éditorial */}
      <div className="bg-white rounded-[18px] border border-black/[.06] overflow-hidden" style={{ boxShadow: '0 4px 24px rgba(0,0,0,.04)' }}>
        <div className={`px-8 py-6 border-b border-black/[.06] bg-gradient-to-br ${grad(k)}`}>
          <div className="text-[9px] font-bold tracking-[.25em] uppercase mb-1" style={{ color: c.accent }}>Communication</div>
          <div className="font-cormorant text-[24px] text-white font-light">Ton éditorial</div>
        </div>
        <div className="p-8 space-y-4">
          {ton.map((r, i) => (
            <div key={i} className="flex items-stretch rounded-2xl overflow-hidden border border-black/[.04] transition-all hover:shadow-md">
              <div className="w-36 flex-shrink-0 flex items-center justify-center px-5 py-5" style={{ background: `linear-gradient(135deg, ${k === 'C' ? c.dark : c.primary}, ${c.light || c.primary})` }}>
                <div className="text-[11px] font-bold text-center" style={{ color: c.textOnDark }}>{r.support}</div>
              </div>
              <div className="flex-1 px-6 py-5 border-l border-black/[.04]">
                <div className="font-cormorant text-[18px] italic leading-snug mb-2" style={{ color: c.primary }}>"{r.formulation}"</div>
                <div className="text-[9px] text-black/35 font-semibold tracking-[.12em] uppercase">{r.note}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════
   02 — DÉCLINAISONS LOGO (10 mockups immersifs)
   ═══════════════════════════════════════════ */

const LogoSection: React.FC<{ k: ScenarioKey }> = ({ k }) => {
  const c = sc[k];

  return (
    <div id="bw-logo" className="py-16 border-b border-black/[.08]">
      <div className="bg-white rounded-[18px] border border-black/[.06] overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,.04)]">
        <div className={`px-8 py-6 border-b border-black/[.06] bg-gradient-to-br ${grad(k)}`}>
          <div className="text-[9px] font-bold tracking-[.25em] uppercase mb-1" style={{ color: c.accent }}>Brand World · 02</div>
          <div className="font-cormorant text-[24px] text-white font-light">Déclinaisons du Logo</div>
          <div className="text-[10px] text-white/30 mt-1">6 déclinaisons · Supports physiques & digitaux</div>
        </div>

        <div className="p-8 space-y-6">

          {/* ── 01-02 : Logo fond sombre + clair ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,.10)]">
              <div className="flex justify-center items-center py-16 px-8" style={{ background: `${darkBg(c, k, 145)}` }}>
                <CosmosLogo height={75} dotColor={c.textOnDark} />
              </div>
              <div className="px-6 py-5 bg-white border-t border-black/[.04]">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-[13px] font-bold" style={{ color: c.primary }}>Version principale — Fond sombre</div>
                  <span className="text-[8px] font-bold tracking-[.12em] uppercase px-3 py-1 rounded-full" style={{ background: `${c.accent}15`, color: c.accent }}>Référence</span>
                </div>
                <div className="text-[11px] text-black/45">Façade, en-tête, site web. Lettres pointillées blanches, O or.</div>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,.06)]">
              <div className="flex justify-center items-center py-16 px-8" style={{ background: c.secondary }}>
                <CosmosLogo height={75} dotColor={c.primary} />
              </div>
              <div className="px-6 py-5 bg-white border-t border-black/[.04]">
                <div className="text-[13px] font-bold mb-2" style={{ color: c.primary }}>Version fond clair</div>
                <div className="text-[11px] text-black/45">Brochures, papier en-tête, signalétique intérieure.</div>
              </div>
            </div>
          </div>

          {/* ── 03 : CARTE COSMOS CLUB — même style que HomePage ── */}
          <div className="rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,.12)]">
            <div className="flex justify-center items-center py-14 px-8" style={{ background: `${darkBg(c, k, 145)}` }}>
              {/* Card — identique au style de la carte Club */}
              <div className="relative w-80 h-48 md:w-96 md:h-56">
                <div className="absolute inset-0 rounded-xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,.35)] transform rotate-3 hover:rotate-0 transition-transform duration-500" style={{ background: `linear-gradient(135deg, ${c.accent}ee, ${c.accent}bb 40%, ${c.accent}dd 60%, ${c.accent}aa)` }}>
                  {/* Reflet */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent" />
                  <div className="absolute inset-0 p-6 flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <span className="font-cormorant text-lg font-medium tracking-wide" style={{ color: c.dark }}>COSMOS CLUB</span>
                      <Crown className="w-6 h-6 opacity-60" style={{ color: c.dark }} strokeWidth={1.5} />
                    </div>
                    <div>
                      <div className="w-10 h-7 rounded-sm mb-4" style={{ background: `${c.dark}20` }} />
                      <div className="text-xs font-inter tracking-[0.3em] uppercase" style={{ color: `${c.dark}60` }}>
                        **** **** **** 2026
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-inter uppercase tracking-wider" style={{ color: `${c.dark}60` }}>Platinum</span>
                      <Gift className="w-5 h-5 opacity-40" style={{ color: c.dark }} strokeWidth={1.5} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-6 py-5 bg-white border-t border-black/[.04]">
              <div className="flex items-center justify-between mb-2">
                <div className="text-[13px] font-bold" style={{ color: c.primary }}>Carte Cosmos Club — Platinum</div>
                <span className="text-[8px] font-bold tracking-[.12em] uppercase px-3 py-1 rounded-full" style={{ background: `${c.accent}15`, color: c.accent }}>Flagship</span>
              </div>
              <div className="text-[11px] text-black/45">PVC métallisé, puce contact, dorure à chaud, numérotation individuelle.</div>
            </div>
          </div>

          {/* ── 04-05 : Monochrome + Favicon ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,.10)]">
              <div className="flex justify-center items-center py-14 px-8" style={{ background: `${darkBg(c, k, 135)}` }}>
                <MonoLogo color="white" h={60} />
              </div>
              <div className="px-6 py-5 bg-white border-t border-black/[.04]">
                <div className="text-[13px] font-bold mb-2" style={{ color: c.primary }}>Monochrome blanc</div>
                <div className="text-[11px] text-black/45">Gravure, embossage cuir, filigrane, watermark.</div>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden border border-black/[.06] shadow-[0_8px_30px_rgba(0,0,0,.06)]">
              <div className="flex justify-center items-center gap-8 py-14 px-8" style={{ background: c.secondary }}>
                {[80, 52, 32].map((s, i) => (
                  <div key={i} className="flex items-center justify-center shadow-lg" style={{
                    width: s, height: s, borderRadius: s * 0.22,
                    background: `${darkBg(c, k, 145)}`,
                  }}>
                    <svg viewBox="0 0 40 40" width={s * 0.5} height={s * 0.5}><circle cx={20} cy={20} r={16} fill={c.accent} /></svg>
                  </div>
                ))}
              </div>
              <div className="px-6 py-5 bg-white border-t border-black/[.04]">
                <div className="text-[13px] font-bold mb-2" style={{ color: c.primary }}>Favicon / Icône App</div>
                <div className="text-[11px] text-black/45">O plein or sur fond scénario. 512×512, 180×180, 32×32px.</div>
              </div>
            </div>
          </div>

          {/* ── 06 : Enseigne façade ── */}
          <div className="rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,.12)]">
            <div className="relative flex justify-center items-center py-12 px-8 bg-gray-900">
              <div className="relative w-full max-w-[400px]">
                <div className="h-3 rounded-t-lg opacity-50" style={{ background: c.primary }} />
                <div className="relative px-10 py-12 text-center" style={{ background: `${darkBg(c, k, 180)}` }}>
                  <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 50% 50%, ${c.accent}15, transparent 60%)` }} />
                  <div className="relative z-10">
                    <CosmosLogo height={55} dotColor={c.textOnDark} />
                    <div className="w-20 h-px mx-auto mt-4 opacity-40" style={{ background: c.accent }} />
                    <div className="font-cormorant text-[11px] tracking-[.3em] mt-3 italic" style={{ color: `${c.accent}70` }}>{c.tagline}</div>
                  </div>
                </div>
                <div className="h-2" style={{ background: `${c.dark}40` }} />
              </div>
            </div>
            <div className="px-6 py-5 bg-white border-t border-black/[.04]">
              <div className="flex items-center justify-between mb-2">
                <div className="text-[13px] font-bold" style={{ color: c.primary }}>Enseigne façade — Rétro-éclairée</div>
                <span className="text-[8px] font-bold tracking-[.12em] uppercase px-3 py-1 rounded-full" style={{ background: `${c.accent}15`, color: c.accent }}>Extérieur</span>
              </div>
              <div className="text-[11px] text-black/45">Logo inox brossé 80cm. Halo LED 3000K, bardage scénario. Visible à 150m.</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════
   03 — GALERIE 3D
   ═══════════════════════════════════════════ */

const GalerieSection: React.FC<{ k: ScenarioKey }> = ({ k }) => {
  const c = sc[k];
  const [active, setActive] = useState(0);
  const images = [
    { src: '/facade-cosmos.png', label: 'Entrée principale · Écran LED incurvé' },
    { src: '/cosmos-1.png', label: 'Place centrale · Fontaines & végétation' },
    { src: '/cosmos-2.png', label: 'Allée commerciale · Boutiques & terrasses' },
    { src: '/cosmos-4.png', label: 'Vue galerie · Passerelles & mezzanine' },
  ];

  return (
    <div id="bw-signage" className="py-16 border-b border-black/[.08]">
      <div className="bg-white rounded-[18px] border border-black/[.06] overflow-hidden" style={{ boxShadow: '0 4px 24px rgba(0,0,0,.04)' }}>
        <div className={`px-8 py-6 border-b border-black/[.06] bg-gradient-to-br ${grad(k)}`}>
          <div className="text-[9px] font-bold tracking-[.25em] uppercase mb-1" style={{ color: c.accent }}>Brand World · 03</div>
          <div className="font-cormorant text-[24px] text-white font-light">Cosmos Angré — Vues 3D</div>
        </div>
        <div className="p-8">
          <div className="relative rounded-2xl overflow-hidden mb-5" style={{ aspectRatio: '16/9', boxShadow: '0 16px 50px rgba(0,0,0,.15)' }}>
            <img src={images[active].src} alt={images[active].label} className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500" />
            <div className="absolute bottom-0 left-0 right-0 h-1/3" style={{ background: `linear-gradient(to top, ${c.dark}dd, transparent)` }} />
            <div className="absolute bottom-5 left-6 right-6 flex items-end justify-between">
              <div>
                <div className="text-[10px] font-bold tracking-[.2em] uppercase" style={{ color: c.accent }}>{String(active + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}</div>
                <div className="text-[15px] text-white font-medium mt-1">{images[active].label}</div>
              </div>
              <div className="font-cormorant text-[18px] font-light tracking-[.2em]" style={{ color: c.textOnDark }}>COSMOS ANGRÉ</div>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {images.map((img, i) => (
              <button key={i} onClick={() => setActive(i)} className={`relative rounded-xl overflow-hidden transition-all ${i === active ? 'ring-2 scale-[1.02]' : 'opacity-40 hover:opacity-70'}`} style={{ aspectRatio: '16/9', ringColor: c.accent }}>
                <img src={img.src} alt={img.label} className="absolute inset-0 w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════
   04 — SIGNALÉTIQUE & WAYFINDING
   ═══════════════════════════════════════════ */

const SignageSection: React.FC<{ k: ScenarioKey }> = ({ k }) => {
  const c = sc[k];
  const ArrowIcons = [ArrowUpRight, ArrowUpRight, ArrowRight, ArrowRight, ArrowDownRight, ArrowDownRight];

  return (
    <div id="bw-stylized" className="py-16 border-b border-black/[.08]">
      <div className="bg-white rounded-[18px] border border-black/[.06] overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,.04)]">
        <div className={`px-8 py-6 border-b border-black/[.06] bg-gradient-to-br ${grad(k)}`}>
          <div className="text-[9px] font-bold tracking-[.25em] uppercase mb-1" style={{ color: c.accent }}>Brand World · 04</div>
          <div className="font-cormorant text-[24px] text-white font-light">Signalétique & Wayfinding</div>
        </div>
        <div className="p-8 space-y-8">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* ── Totem digital ── */}
            <div>
              <div className="flex items-center justify-center py-10 rounded-2xl bg-gradient-to-b from-stone-200 to-stone-300">
                <div className="relative w-[120px]">
                  {/* Écran */}
                  <div className="relative rounded-md border-[3px] border-gray-800 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,.25)]" style={{ background: c.dark }}>
                    <div className="h-[2px]" style={{ background: c.accent }} />
                    <div className="text-center pt-4 pb-2">
                      <CosmosLogo height={14} dotColor={c.textOnDark} />
                      <div className="w-8 h-px mx-auto mt-2 opacity-40" style={{ background: c.accent }} />
                    </div>
                    <div className="px-3 pb-3 space-y-1.5">
                      {zones.slice(0, 5).map((z, i) => {
                        const Arrow = ArrowIcons[i];
                        return (
                          <div key={i} className="flex items-center justify-between py-1" style={{ borderBottom: i < 4 ? `1px solid ${c.accent}08` : 'none' }}>
                            <span className="text-[7px] font-medium" style={{ color: c.textOnDark }}>{z.name}</span>
                            <Arrow size={8} style={{ color: c.accent }} />
                          </div>
                        );
                      })}
                    </div>
                    <div className="py-1.5 text-center" style={{ background: `${c.accent}08` }}>
                      <span className="text-[5px] tracking-[.2em] uppercase" style={{ color: `${c.textOnDark}30` }}>Touchez pour naviguer</span>
                    </div>
                  </div>
                  {/* Pied + socle */}
                  <div className="mx-8 h-20 bg-gradient-to-b from-gray-700 to-gray-800 rounded-b shadow-lg" />
                  <div className="mx-4 h-3 bg-gradient-to-b from-gray-500 to-gray-400 rounded-b-md" />
                </div>
              </div>
              <div className="px-5 py-4 border-t border-black/[.04]">
                <div className="text-[13px] font-bold" style={{ color: c.primary }}>Totem digital interactif — 75"</div>
                <div className="text-[11px] text-black/45 mt-1">Écran tactile LED 4K · Cadre aluminium anodisé · Socle granit poli</div>
              </div>
            </div>

            {/* ── Panneau directionnel suspendu ── */}
            <div>
              <div className="flex items-center justify-center py-10 rounded-2xl bg-gradient-to-b from-stone-200 to-stone-300">
                <div className="relative w-[280px]">
                  {/* Câbles */}
                  <div className="flex justify-between px-10 h-8">
                    <div className="w-px bg-gradient-to-b from-stone-400 to-transparent" />
                    <div className="w-px bg-gradient-to-b from-stone-400 to-transparent" />
                  </div>
                  {/* Panneau */}
                  <div className="rounded-md overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,.25)]" style={{ background: c.dark }}>
                    <div className="h-[2px]" style={{ background: c.accent }} />
                    <div className="text-center pt-5 pb-3">
                      <CosmosLogo height={16} dotColor={c.textOnDark} />
                      <div className="w-12 h-px mx-auto mt-3 opacity-30" style={{ background: c.accent }} />
                    </div>
                    <div className="px-5 pb-3">
                      {zones.map((z, i) => {
                        const Arrow = ArrowIcons[i];
                        return (
                          <div key={i} className="flex items-center py-2.5" style={{ borderBottom: i < zones.length - 1 ? `1px solid ${c.accent}06` : 'none' }}>
                            <div className="flex-1">
                              <div className="text-[11px] font-medium" style={{ color: c.textOnDark }}>{z.name}</div>
                              <div className="text-[7px]" style={{ color: `${c.textOnDark}33` }}>{z.nameEn}</div>
                            </div>
                            <div className="w-6 h-6 rounded flex items-center justify-center" style={{ background: `${c.accent}12` }}>
                              <Arrow size={12} style={{ color: c.accent }} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="py-2.5 text-center" style={{ background: `${c.accent}06` }}>
                      <span className="text-[7px] tracking-[.25em] uppercase" style={{ color: `${c.textOnDark}20` }}>Bienvenue · Welcome · Akwaba</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-5 py-4 border-t border-black/[.04]">
                <div className="text-[13px] font-bold" style={{ color: c.primary }}>Panneau directionnel suspendu</div>
                <div className="text-[11px] text-black/45 mt-1">Aluminium anodisé · Gravure laser · LED rétro-éclairé · Câbles inox</div>
              </div>
            </div>
          </div>

          {/* ── Badges de zone ── */}
          <div>
            <div className="flex items-center gap-2 text-[11px] font-bold tracking-[.2em] uppercase mb-4 pb-2 border-b" style={{ color: c.primary, borderColor: `${c.primary}15` }}>
              <MapPin size={14} style={{ color: c.accent }} />
              Badges de zone
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {zones.map((z, i) => {
                const Arrow = ArrowIcons[i];
                return (
                  <div key={i} className="relative rounded-xl overflow-hidden border border-black/[.04] hover:shadow-md transition-all" style={{ background: c.secondary }}>
                    <div className="h-[3px]" style={{ background: `linear-gradient(90deg, ${k === 'C' ? c.dark : c.primary}, ${c.accent})` }} />
                    <div className="p-4 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: c.dark }}>
                        <span className="text-[10px] font-bold font-mono" style={{ color: c.textOnDark }}>N{i + 1}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[11px] font-bold truncate" style={{ color: c.primary }}>{z.name}</div>
                        <div className="text-[8px]" style={{ color: `${c.primary}55` }}>{z.nameEn}</div>
                      </div>
                      <Arrow size={14} className="flex-shrink-0 opacity-50" style={{ color: c.accent }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════
   05 — COLLECTION DE MARQUE
   ═══════════════════════════════════════════ */

/* ═══════════════════════════════════════════
   LOGO SVG INLINE — Le vrai logo COSMOS ANGRÉ en pointillés, embarqué dans n'importe quel SVG
   ═══════════════════════════════════════════ */

const GOLD = '#C9943A';

/** Inline SVG logo — reproduit le vrai COSMOS ANGRÉ (points, O outline, O plein, ANGRÉ) */
const InlineLogo: React.FC<{
  x: number; y: number; width: number;
  dotColor: string; goldColor?: string;
}> = ({ x, y, width, dotColor, goldColor = GOLD }) => {
  const s = width / 330;
  // Adapter la taille des points selon la taille du logo
  const ds = width < 70 ? 0.55 : width < 110 ? 0.75 : 1;
  const sw = (3.5 * ds) / s;
  const gap = (5.8 * ds) / s;
  const oSw = 2 / s;
  const dot = { fill: 'none' as const, stroke: dotColor, strokeWidth: sw, strokeDasharray: `0.1 ${gap}`, strokeLinecap: 'round' as const };

  return (
    <g transform={`translate(${x},${y}) scale(${s})`}>
      <path d="M 37,5 A 22,22 0 1,0 37,39" {...dot} />
      <circle cx={74} cy={22} r={20} fill="none" stroke={goldColor} strokeWidth={oSw} />
      <path d="M 34,8 C 32,2 26,0 19,0 C 10,0 1,4 1,12 C 1,19 9,22 19,22 C 29,22 37,25 37,33 C 37,40 30,44 21,44 C 15,44 5,42 2,36" transform="translate(108,0)" {...dot} />
      <path d="M 0,44 L 0,0 L 20,26 L 40,0 L 40,44" transform="translate(162,0)" {...dot} />
      <circle cx={236} cy={22} r={20} fill={goldColor} />
      <path d="M 34,8 C 32,2 26,0 19,0 C 10,0 1,4 1,12 C 1,19 9,22 19,22 C 29,22 37,25 37,33 C 37,40 30,44 21,44 C 15,44 5,42 2,36" transform="translate(270,0)" {...dot} />
      {width >= 70 && (
        <text x={308} y={72} textAnchor="end" fontFamily="'Inter','Helvetica Neue',sans-serif" fontSize={16} fontWeight={600} letterSpacing={4} fill={goldColor}>ANGRÉ</text>
      )}
    </g>
  );
};

/** Brand mark minimaliste — les deux O iconiques (outline + plein) pour petites surfaces */
const BrandMark: React.FC<{
  cx: number; cy: number; r: number; goldColor?: string; outlineColor?: string;
}> = ({ cx, cy, r, goldColor = GOLD, outlineColor }) => (
  <g>
    <circle cx={cx - r * 0.75} cy={cy} r={r} fill="none" stroke={outlineColor || goldColor} strokeWidth={r * 0.12} />
    <circle cx={cx + r * 0.75} cy={cy} r={r} fill={goldColor} />
  </g>
);

/* ═══════════════════════════════════════════
   MOCKUP SVG INDIVIDUELS — Chaque item a sa propre illustration soignée
   ═══════════════════════════════════════════ */

/* Tote Bag */
const ToteBagMockup: React.FC<{ dark: string; accent: string; textOnDark: string; w?: number }> = ({ dark, accent, textOnDark, w = 160 }) => (
  <svg viewBox="0 0 160 210" width={w} fill="none">
    <defs><filter id="tb-sh"><feDropShadow dx="1" dy="3" stdDeviation="4" floodOpacity="0.15" /></filter></defs>
    <g filter="url(#tb-sh)">
      {/* Handles */}
      <path d="M42,55 C42,28 58,22 58,55" fill="none" stroke={textOnDark} strokeWidth={3} strokeLinecap="round" opacity={0.4} />
      <path d="M102,55 C102,28 118,22 118,55" fill="none" stroke={textOnDark} strokeWidth={3} strokeLinecap="round" opacity={0.4} />
      {/* Bag body */}
      <rect x={15} y={50} width={130} height={150} rx={3} fill={dark} />
      {/* Accent stripe */}
      <rect x={15} y={100} width={130} height={45} fill={accent} opacity={0.15} />
      {/* Vrai logo COSMOS ANGRÉ pointillé */}
      <InlineLogo x={18} y={104} width={120} dotColor={textOnDark} goldColor={accent} />
    </g>
  </svg>
);
/* Wrap CosmosLogo inside an SVG foreignObject for mockup usage */
const MockupCard: React.FC<{
  visual: React.ReactNode;
  title: string;
  desc: string;
  bgColor: string;
  primary: string;
  accent?: string;
  icon?: React.ReactNode;
}> = ({ visual, title, desc, bgColor, primary, icon }) => (
  <div className="rounded-2xl overflow-hidden border border-black/[.04] shadow-[0_4px_20px_rgba(0,0,0,.06)] hover:shadow-xl transition-all">
    <div className="flex items-center justify-center py-10 px-6 min-h-[220px]" style={{ background: bgColor }}>
      {visual}
    </div>
    <div className="px-5 py-4 bg-white border-t border-black/[.04]">
      <div className="flex items-center gap-2">
        {icon}
        <div className="text-[13px] font-bold" style={{ color: primary }}>{title}</div>
      </div>
      <div className="text-[10px] text-black/40 mt-1">{desc}</div>
    </div>
  </div>
);

/* Gobelet takeaway */
const GobeletMockup: React.FC<{ dark: string; accent: string; textOnDark: string; w?: number }> = ({ dark, accent, textOnDark, w = 70 }) => (
  <svg viewBox="0 0 70 150" width={w} fill="none">
    <defs><filter id="gb-sh"><feDropShadow dx="1" dy="3" stdDeviation="3" floodOpacity="0.15" /></filter></defs>
    <g filter="url(#gb-sh)">
      <rect x={6} y={0} width={58} height={11} rx={4} fill="#333" />
      <rect x={24} y={-5} width={22} height={7} rx={3.5} fill="#444" />
      <path d="M10,11 L6,128 C6,135 12,142 35,142 C58,142 64,135 64,128 L60,11 Z" fill={dark} />
      <rect x={8} y={35} width={54} height={40} fill={accent} opacity={0.85} rx={0} />
      {/* Vrai logo sur bandeau accent */}
      <InlineLogo x={9} y={40} width={50} dotColor={dark} goldColor={dark} />
      <rect x={9} y={80} width={52} height={22} fill={textOnDark} opacity={0.06} />
    </g>
  </svg>
);

/* Tasse */
const TasseMockup: React.FC<{ dark: string; accent: string; textOnDark: string; w?: number }> = ({ dark, accent, textOnDark, w = 120 }) => (
  <svg viewBox="0 0 130 110" width={w} fill="none">
    <defs><filter id="ts-sh"><feDropShadow dx="1" dy="3" stdDeviation="4" floodOpacity="0.12" /></filter></defs>
    <g filter="url(#ts-sh)">
      <path d="M5,15 L5,82 C5,92 20,100 50,100 C80,100 95,92 95,82 L95,15 Z" fill={dark} />
      <ellipse cx={50} cy={15} rx={45} ry={11} fill={dark} stroke={accent} strokeWidth={1.5} />
      <ellipse cx={50} cy={15} rx={40} ry={8.5} fill={accent} opacity={0.1} />
      <path d="M95,30 C118,30 125,48 125,60 C125,72 118,85 95,85" fill="none" stroke={dark} strokeWidth={7} />
      <path d="M95,35 C113,35 119,48 119,60 C119,72 113,80 95,80" fill="none" stroke={textOnDark} strokeWidth={1.5} opacity={0.1} />
      {/* Vrai logo sur tasse */}
      <InlineLogo x={7} y={38} width={80} dotColor={accent} goldColor={accent} />
    </g>
  </svg>
);

/* Porte-clés */
const PortecleMockup: React.FC<{ dark: string; accent: string; w?: number }> = ({ dark, accent, w = 55 }) => (
  <svg viewBox="0 0 55 110" width={w} fill="none">
    <circle cx={27.5} cy={18} r={14} fill="none" stroke={accent} strokeWidth={3} />
    <rect x={23} y={30} width={9} height={12} rx={3} fill={dark} opacity={0.7} />
    <rect x={8} y={42} width={39} height={42} rx={9} fill={dark} />
    {/* Brand mark : les deux O iconiques */}
    <BrandMark cx={27.5} cy={63} r={9} goldColor={accent} />
  </svg>
);

/* Badge */
const BadgeMockup: React.FC<{ dark: string; accent: string; textOnDark: string; w?: number }> = ({ dark, accent, textOnDark, w = 130 }) => (
  <svg viewBox="0 0 130 65" width={w} fill="none">
    {/* Clip */}
    <rect x={55} y={0} width={20} height={8} rx={3} fill={accent} opacity={0.6} />
    <rect x={0} y={8} width={130} height={52} rx={6} fill={dark} />
    <rect x={0} y={8} width={130} height={3.5} rx={1} fill={accent} opacity={0.5} />
    {/* Vrai logo sur le badge */}
    <InlineLogo x={8} y={22} width={55} dotColor={textOnDark} goldColor={accent} />
    <rect x={72} y={28} width={45} height={5.5} rx={2} fill={textOnDark} opacity={0.5} />
    <rect x={72} y={38} width={30} height={4} rx={1.5} fill={textOnDark} opacity={0.25} />
    <rect x={72} y={47} width={38} height={3} rx={1} fill={textOnDark} opacity={0.12} />
  </svg>
);

/* Enveloppe */
const EnveloppeMockup: React.FC<{ dark: string; accent: string; textOnDark: string; w?: number }> = ({ dark, accent, textOnDark, w = 150 }) => (
  <svg viewBox="0 0 150 95" width={w} fill="none">
    <rect x={0} y={0} width={150} height={95} rx={4} fill={dark} />
    <path d="M0,0 L75,42 L150,0" fill="none" stroke={accent} strokeWidth={1.2} opacity={0.3} />
    {/* Vrai logo en bas à gauche */}
    <InlineLogo x={12} y={58} width={90} dotColor={textOnDark} goldColor={accent} />
  </svg>
);

/* Papier à en-tête */
const LetterheadMockup: React.FC<{ primary: string; accent: string; w?: number }> = ({ primary, accent, w = 130 }) => (
  <svg viewBox="0 0 130 175" width={w} fill="none">
    <rect x={0} y={0} width={130} height={175} rx={3} fill="white" />
    {/* Vrai logo en-tête */}
    <InlineLogo x={12} y={8} width={80} dotColor={primary} goldColor={accent} />
    <line x1={12} y1={30} x2={118} y2={30} stroke={accent} strokeWidth={0.6} opacity={0.35} />
    <text x={12} y={46} fontSize="5.5" fontWeight="600" fill={primary} fontFamily="'Inter',sans-serif">Dear John Smith</text>
    {[55, 64, 73, 82, 91, 104, 113, 122, 135, 144, 153].map((y, i) => (
      <rect key={i} x={12} y={y} width={i % 4 === 3 ? 60 : 106} height={3} rx={1.5} fill={primary} opacity={0.1} />
    ))}
    <text x={12} y={168} fontSize="4" fontWeight="400" fill={primary} opacity={0.35} fontFamily="'Inter',sans-serif">Signature here</text>
  </svg>
);

/* Packaging / sachet */
const PackagingMockup: React.FC<{ dark: string; accent: string; textOnDark: string; w?: number }> = ({ dark, accent, textOnDark, w = 70 }) => (
  <svg viewBox="0 0 70 105" width={w} fill="none">
    <rect x={0} y={0} width={70} height={105} rx={3} fill={dark} />
    <rect x={0} y={0} width={70} height={14} rx={3} fill={textOnDark} opacity={0.08} />
    <path d="M0,14 L35,21 L70,14" fill="none" stroke={accent} strokeWidth={0.7} opacity={0.4} />
    {/* Vrai logo centré */}
    <InlineLogo x={5} y={36} width={60} dotColor={textOnDark} goldColor={accent} />
    <rect x={14} y={80} width={42} height={3} rx={1.5} fill={textOnDark} opacity={0.15} />
    <rect x={18} y={87} width={34} height={3} rx={1.5} fill={textOnDark} opacity={0.1} />
  </svg>
);

/* ── Polo Mockup SVG ── */
const PoloMockup: React.FC<{ body: string; logo: string; collar: string; w?: number }> = ({ body, logo, collar, w = 160 }) => (
  <svg viewBox="0 0 160 200" width={w} fill="none">
    {/* Body */}
    <path d="M30 55 L10 75 L10 180 Q10 195 25 195 L135 195 Q150 195 150 180 L150 75 L130 55" fill={body} />
    {/* Sleeves */}
    <path d="M30 55 L2 90 L10 95 L30 75 Z" fill={body} opacity={0.85} />
    <path d="M130 55 L158 90 L150 95 L130 75 Z" fill={body} opacity={0.85} />
    {/* Collar */}
    <path d="M55 40 L80 60 L105 40 L100 35 Q80 50 60 35 Z" fill={collar} />
    {/* Placket */}
    <rect x={77} y={55} width={6} height={40} rx={2} fill={collar} opacity={0.6} />
    <circle cx={80} cy={68} r={2} fill={body} />
    <circle cx={80} cy={80} r={2} fill={body} />
    {/* Logo — brand mark deux O */}
    <BrandMark cx={60} cy={90} r={7} goldColor={logo} />
    {/* Side seams */}
    <line x1={30} y1={75} x2={25} y2={190} stroke={collar} strokeWidth={0.5} opacity={0.3} />
    <line x1={130} y1={75} x2={135} y2={190} stroke={collar} strokeWidth={0.5} opacity={0.3} />
  </svg>
);

/* ── Blazer Mockup SVG ── */
const BlazerMockup: React.FC<{ body: string; accent: string; pin: string; w?: number }> = ({ body, accent, pin, w = 160 }) => (
  <svg viewBox="0 0 160 210" width={w} fill="none">
    {/* Body */}
    <path d="M35 50 L8 80 L8 200 L72 200 L72 120 L88 120 L88 200 L152 200 L152 80 L125 50" fill={body} />
    {/* Shoulders */}
    <path d="M35 50 L0 70 L8 80 L35 60 Z" fill={body} opacity={0.8} />
    <path d="M125 50 L160 70 L152 80 L125 60 Z" fill={body} opacity={0.8} />
    {/* Lapels */}
    <path d="M72 50 L50 55 L60 120 L72 120 Z" fill={body} filter="brightness(1.15)" />
    <path d="M88 50 L110 55 L100 120 L88 120 Z" fill={body} filter="brightness(1.15)" />
    <path d="M72 50 L50 55 L60 120 L72 120 Z" fill="white" opacity={0.08} />
    <path d="M88 50 L110 55 L100 120 L88 120 Z" fill="white" opacity={0.08} />
    {/* Collar notch */}
    <path d="M60 52 L50 55 L55 65 Z" fill={body} stroke="white" strokeWidth={0.3} opacity={0.5} />
    <path d="M100 52 L110 55 L105 65 Z" fill={body} stroke="white" strokeWidth={0.3} opacity={0.5} />
    {/* Pocket square */}
    <path d="M42 95 L56 95 L52 80 L46 82 Z" fill={accent} opacity={0.85} />
    {/* Pin */}
    <circle cx={105} cy={85} r={4} fill={pin} />
    <circle cx={105} cy={85} r={2} fill="white" opacity={0.4} />
    {/* Buttons */}
    <circle cx={80} cy={130} r={3} fill={accent} opacity={0.6} />
    <circle cx={80} cy={150} r={3} fill={accent} opacity={0.6} />
    {/* Inner shirt */}
    <rect x={72} y={55} width={16} height={65} fill="white" opacity={0.12} />
  </svg>
);

/* ── Phone Mockup SVG ── */
const PhoneMockup: React.FC<{ primary: string; accent: string; dark: string; secondary: string; textOnDark: string; tagline: string; w?: number }> = ({ primary, accent, dark, secondary, textOnDark, tagline, w = 140 }) => (
  <svg viewBox="0 0 140 280" width={w} fill="none">
    <defs>
      <clipPath id="phone-screen"><rect x={8} y={8} width={124} height={264} rx={18} /></clipPath>
      <filter id="ph-sh"><feDropShadow dx={0} dy={6} stdDeviation={8} floodOpacity={0.18} /></filter>
    </defs>
    {/* Frame */}
    <rect x={4} y={4} width={132} height={272} rx={22} fill="#1a1a1a" filter="url(#ph-sh)" />
    <rect x={6} y={6} width={128} height={268} rx={20} fill="#2a2a2a" />
    {/* Screen */}
    <g clipPath="url(#phone-screen)">
      {/* Status bar */}
      <rect x={8} y={8} width={124} height={264} fill={dark} />
      <rect x={42} y={12} width={56} height={18} rx={9} fill="#000" />
      <circle cx={70} cy={21} r={4} fill="#111" />
      {/* Header — vrai logo */}
      <InlineLogo x={18} y={38} width={100} dotColor={textOnDark} goldColor={accent} />
      {/* Search */}
      <rect x={16} y={64} width={108} height={22} rx={8} fill="white" opacity={0.08} />
      <text x={30} y={79} fontSize="7" fill={`${textOnDark}55`}>Rechercher…</text>
      {/* Category grid */}
      {['Boutiques', 'Resto', 'Cinéma', 'Parking', 'Offres', 'Plan'].map((l, i) => (
        <g key={l} transform={`translate(${16 + (i % 3) * 37}, ${94 + Math.floor(i / 3) * 30})`}>
          <rect width={33} height={24} rx={6} fill="white" opacity={0.06} />
          <text x={16.5} y={15} textAnchor="middle" fontSize="5.5" fontWeight="600" fill={`${textOnDark}88`}>{l}</text>
        </g>
      ))}
      {/* Promo card */}
      <rect x={16} y={160} width={108} height={52} rx={10} fill={primary} />
      <text x={26} y={180} fontSize="7" fontWeight="bold" fill={textOnDark}>Ouverture oct. 2026</text>
      <text x={26} y={192} fontSize="5.5" fill={`${textOnDark}77`}>{tagline}</text>
      <rect x={16} y={200} width={108} height={3} rx={1.5} fill={accent} opacity={0.4} />
      {/* Bottom nav */}
      <rect x={8} y={232} width={124} height={40} fill={dark} />
      <line x1={8} y1={232} x2={132} y2={232} stroke="white" strokeWidth={0.3} opacity={0.1} />
      {['Accueil', 'Plan', 'Offres', 'Compte'].map((l, i) => (
        <g key={l} transform={`translate(${18 + i * 30}, 240)`}>
          <circle cx={10} cy={6} r={4} fill={i === 0 ? accent : 'white'} opacity={i === 0 ? 0.8 : 0.12} />
          <text x={10} y={18} textAnchor="middle" fontSize="4.5" fill={i === 0 ? accent : `${textOnDark}44`}>{l}</text>
        </g>
      ))}
      {/* Home indicator */}
      <rect x={48} y={266} width={44} height={4} rx={2} fill="white" opacity={0.2} />
    </g>
  </svg>
);

/* ── Sign Post Mockup SVG ── */
const SignPostMockup: React.FC<{ primary: string; accent: string; dark: string; textOnDark: string; w?: number }> = ({ primary, accent, dark, textOnDark, w = 180 }) => (
  <svg viewBox="0 0 180 220" width={w} fill="none">
    <defs>
      <filter id="sp-sh"><feDropShadow dx={0} dy={2} stdDeviation={3} floodOpacity={0.12} /></filter>
    </defs>
    {/* Post */}
    <rect x={86} y={20} width={8} height={190} rx={2} fill={dark} />
    <rect x={84} y={205} width={12} height={8} rx={2} fill={dark} opacity={0.5} />
    {/* Top cap */}
    <circle cx={90} cy={20} r={8} fill={accent} />
    <circle cx={90} cy={20} r={4} fill="white" opacity={0.3} />
    {/* Arrow panels */}
    {[
      { y: 35, label: 'Cinéma', dir: 1, bg: primary },
      { y: 65, label: 'Restauration', dir: -1, bg: dark },
      { y: 95, label: 'Mode & Beauté', dir: 1, bg: primary },
      { y: 125, label: 'Supermarché', dir: -1, bg: dark },
      { y: 155, label: 'Parking P1', dir: 1, bg: accent },
    ].map((p) => (
      <g key={p.label} filter="url(#sp-sh)">
        {p.dir === 1 ? (
          <path d={`M${90 - 5} ${p.y} L${90 + 70} ${p.y} L${90 + 82} ${p.y + 12} L${90 + 70} ${p.y + 24} L${90 - 5} ${p.y + 24} Z`} fill={p.bg} rx={3} />
        ) : (
          <path d={`M${90 + 5} ${p.y} L${90 - 70} ${p.y} L${90 - 82} ${p.y + 12} L${90 - 70} ${p.y + 24} L${90 + 5} ${p.y + 24} Z`} fill={p.bg} rx={3} />
        )}
        <text
          x={p.dir === 1 ? 100 : 80}
          y={p.y + 16}
          textAnchor={p.dir === 1 ? 'start' : 'end'}
          fontSize="8"
          fontWeight="600"
          letterSpacing="0.5"
          fill={p.bg === accent ? dark : textOnDark}
        >{p.label}</text>
      </g>
    ))}
  </svg>
);

const CollectionSection: React.FC<{ k: ScenarioKey }> = ({ k }) => {
  const c = sc[k];
  const bg = c.secondary;

  return (
    <div id="bw-mockups" className="py-16 border-b border-black/[.08]">
      <div className="bg-white rounded-[18px] border border-black/[.06] overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,.04)]">
        <div className={`px-4 sm:px-8 py-6 border-b border-black/[.06] bg-gradient-to-br ${grad(k)}`}>
          <div className="text-[9px] font-bold tracking-[.25em] uppercase mb-1" style={{ color: c.accent }}>Brand World · 05</div>
          <div className="font-cormorant text-[24px] text-white font-light">Collection de Marque</div>
          <div className="text-[10px] text-white/30 mt-1">Papeterie · Goodies · Textile · Supports digitaux</div>
        </div>
        <div className="p-4 sm:p-8 space-y-10">

          {/* ── 1. Uniformes & Textile ── */}
          <div>
            <div className="flex items-center gap-2 text-[11px] font-bold tracking-[.2em] uppercase mb-5 pb-2 border-b" style={{ color: c.primary, borderColor: `${c.primary}15` }}>
              <Shirt size={14} style={{ color: c.accent }} />
              Uniformes & Textile
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <MockupCard
                visual={<PoloMockup body={c.primary} logo={c.accent} collar={c.accent} w={120} />}
                title="Polo Staff"
                desc="Piqué coton bio 220g · Broderie logo poitrine"
                bgColor={bg}
                primary={c.primary}
                icon={<Shirt size={14} style={{ color: c.accent }} />}
              />
              <MockupCard
                visual={<BlazerMockup body={c.dark} accent={c.accent} pin={c.accent} w={120} />}
                title="Blazer Manager"
                desc="Laine mélangée · Pin's doré · Doublure signature"
                bgColor={bg}
                primary={c.primary}
                icon={<Shirt size={14} style={{ color: c.accent }} />}
              />
              <MockupCard
                visual={<PoloMockup body={c.secondary} logo={c.primary} collar={c.primary} w={120} />}
                title="Polo Accueil"
                desc="Piqué coton 220g · Version claire · Logo brodé"
                bgColor={bg}
                primary={c.primary}
                icon={<Shirt size={14} style={{ color: c.accent }} />}
              />
              <MockupCard
                visual={<PoloMockup body="#1a1a1a" logo={c.accent} collar={c.accent} w={120} />}
                title="Polo Sécurité"
                desc="Coton renforcé · Bandes réfléchissantes · Logo brodé"
                bgColor={bg}
                primary={c.primary}
                icon={<Shirt size={14} style={{ color: c.accent }} />}
              />
            </div>
          </div>

          {/* ── 2. Goodies & Objets ── */}
          <div>
            <div className="flex items-center gap-2 text-[11px] font-bold tracking-[.2em] uppercase mb-5 pb-2 border-b" style={{ color: c.primary, borderColor: `${c.primary}15` }}>
              <Coffee size={14} style={{ color: c.accent }} />
              Goodies & Objets
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <MockupCard
                visual={<GobeletMockup dark={c.dark} accent={c.accent} textOnDark={c.textOnDark} w={55} />}
                title="Gobelet takeaway"
                desc="Carton double paroi 350ml · Bandeau accent · Logo imprimé"
                bgColor={bg}
                primary={c.primary}
                icon={<Coffee size={14} style={{ color: c.accent }} />}
              />
              <MockupCard
                visual={<TasseMockup dark={c.dark} accent={c.accent} textOnDark={c.textOnDark} w={110} />}
                title="Tasse céramique"
                desc="Porcelaine 300ml · Anse ergonomique · Logo or"
                bgColor={bg}
                primary={c.primary}
                icon={<Coffee size={14} style={{ color: c.accent }} />}
              />
              <MockupCard
                visual={<PortecleMockup dark={c.dark} accent={c.accent} w={45} />}
                title="Porte-clés"
                desc="Métal doré · Médaillon émaillé · Anneau premium"
                bgColor={bg}
                primary={c.primary}
                icon={<Key size={14} style={{ color: c.accent }} />}
              />
              <MockupCard
                visual={<BadgeMockup dark={c.dark} accent={c.accent} textOnDark={c.textOnDark} w={120} />}
                title="Badge nominatif"
                desc="PVC premium · Clip magnétique · Impression recto-verso"
                bgColor={bg}
                primary={c.primary}
                icon={<BadgeCheck size={14} style={{ color: c.accent }} />}
              />
            </div>
          </div>

          {/* ── 3. Papeterie & Print ── */}
          <div>
            <div className="flex items-center gap-2 text-[11px] font-bold tracking-[.2em] uppercase mb-5 pb-2 border-b" style={{ color: c.primary, borderColor: `${c.primary}15` }}>
              <CreditCard size={14} style={{ color: c.accent }} />
              Papeterie & Print
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {/* Carte de visite — HTML mockup avec vrai CosmosLogo */}
              <div className="rounded-2xl overflow-hidden border border-black/[.04] shadow-[0_4px_20px_rgba(0,0,0,.06)] hover:shadow-xl transition-all">
                <div className="flex items-center justify-center py-10 px-6 min-h-[220px]" style={{ background: bg }}>
                  <div className="relative w-64 h-40">
                    <div className="absolute inset-0 rounded-xl overflow-hidden shadow-[0_12px_35px_rgba(0,0,0,.2)] transform -rotate-3 hover:rotate-0 transition-transform duration-500" style={{ background: `${darkBg(c, k, 135)}` }}>
                      <div className="absolute inset-0 p-5 flex flex-col justify-between">
                        <CosmosLogo height={20} dotColor={c.textOnDark} />
                        <div>
                          <div className="w-8 h-px opacity-40" style={{ background: c.accent }} />
                          <div className="text-[7px] mt-2 tracking-[.15em]" style={{ color: `${c.textOnDark}40` }}>cosmos-angre.ci</div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-2 -right-2 w-20 h-32 rounded-lg opacity-40 shadow-sm" style={{ background: c.secondary, border: `1px solid ${c.primary}10`, transform: 'rotate(6deg)' }} />
                  </div>
                </div>
                <div className="px-5 py-4 bg-white border-t border-black/[.04]">
                  <div className="text-[13px] font-bold" style={{ color: c.primary }}>Carte de visite</div>
                  <div className="text-[10px] text-black/40 mt-1">85×55mm · Coton 350g · Dorure à chaud</div>
                </div>
              </div>

              <MockupCard
                visual={<EnveloppeMockup dark={c.dark} accent={c.accent} textOnDark={c.textOnDark} w={140} />}
                title="Enveloppe"
                desc="C5 & DL · Impression intérieur personnalisé · Logo en relief"
                bgColor={bg}
                primary={c.primary}
                icon={<CreditCard size={14} style={{ color: c.accent }} />}
              />
              <MockupCard
                visual={<LetterheadMockup primary={c.primary} accent={c.accent} w={100} />}
                title="Papier à en-tête"
                desc="A4 · Vergé 120g · Filigrane discret"
                bgColor={bg}
                primary={c.primary}
                icon={<CreditCard size={14} style={{ color: c.accent }} />}
              />
            </div>
          </div>

          {/* ── 4. Supports & Digital ── */}
          <div>
            <div className="flex items-center gap-2 text-[11px] font-bold tracking-[.2em] uppercase mb-5 pb-2 border-b" style={{ color: c.primary, borderColor: `${c.primary}15` }}>
              <ShoppingBag size={14} style={{ color: c.accent }} />
              Supports Physiques & Digitaux
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <MockupCard
                visual={<ToteBagMockup dark={c.dark} accent={c.accent} textOnDark={c.textOnDark} w={100} />}
                title="Tote bag"
                desc="Coton épais 280g · Sérigraphie logo · Anses renforcées"
                bgColor={bg}
                primary={c.primary}
                icon={<ShoppingBag size={14} style={{ color: c.accent }} />}
              />
              <MockupCard
                visual={<PackagingMockup dark={c.dark} accent={c.accent} textOnDark={c.textOnDark} w={55} />}
                title="Packaging cadeau"
                desc="Sachet kraft premium · Impression logo · Ruban satin"
                bgColor={bg}
                primary={c.primary}
                icon={<Gift size={14} style={{ color: c.accent }} />}
              />
              <MockupCard
                visual={<PhoneMockup primary={c.primary} accent={c.accent} dark={c.dark} secondary={c.secondary} textOnDark={c.textOnDark} tagline={c.tagline} w={90} />}
                title="Application mobile"
                desc="iOS & Android · Push · Programme fidélité"
                bgColor={bg}
                primary={c.primary}
                icon={<Smartphone size={14} style={{ color: c.accent }} />}
              />
              <MockupCard
                visual={<SignPostMockup primary={c.primary} accent={c.accent} dark={c.dark} textOnDark={c.textOnDark} w={110} />}
                title="Signalétique"
                desc="Totems orienteurs · Fléchage · Aluminium laqué"
                bgColor={bg}
                primary={c.primary}
                icon={<Flag size={14} style={{ color: c.accent }} />}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════
   06 — PARCOURS CLIENT
   ═══════════════════════════════════════════ */

const TimelineSection: React.FC<{ k: ScenarioKey }> = ({ k }) => {
  const c = sc[k];
  const steps = timeline[k];
  const [step, setStep] = useState(0);
  const stepIcons = ['🚗', '🅿️', '🚪', '✨', '🛍️', '🍽️', '👋'];

  return (
    <div id="bw-timeline" className="py-16 border-b border-black/[.08]">
      <div className="bg-white rounded-[18px] border border-black/[.06] overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,.04)]">
        <div className={`px-8 py-6 border-b border-black/[.06] bg-gradient-to-br ${grad(k)}`}>
          <div className="text-[9px] font-bold tracking-[.25em] uppercase mb-1" style={{ color: c.accent }}>Brand World · 04b</div>
          <div className="font-cormorant text-[24px] text-white font-light">Parcours Client</div>
          <div className="text-[10px] text-white/30 mt-1">De l'arrivée au parking jusqu'à la fidélisation</div>
        </div>
        <div className="p-8">

          {/* Timeline visuelle horizontale */}
          <div className="relative mb-8">
            {/* Ligne de progression */}
            <div className="absolute top-5 left-0 right-0 h-[2px] bg-black/[.06] rounded-full" />
            <div className="absolute top-5 left-0 h-[2px] rounded-full transition-all duration-500" style={{
              width: `${(step / (steps.length - 1)) * 100}%`,
              background: `linear-gradient(90deg, ${k === 'C' ? c.dark : c.primary}, ${c.accent})`,
            }} />

            {/* Points cliquables */}
            <div className="relative flex justify-between">
              {steps.map((s, i) => (
                <button key={i} onClick={() => setStep(i)} className="flex flex-col items-center group transition-all" style={{ width: `${100 / steps.length}%` }}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-[16px] transition-all border-2 ${
                    i <= step ? 'shadow-lg scale-110' : 'opacity-40 hover:opacity-70'
                  }`} style={{
                    background: i === step ? `linear-gradient(135deg, ${k === 'C' ? c.dark : c.primary}, ${c.accent})` : i < step ? (k === 'C' ? c.dark : c.primary) : 'white',
                    borderColor: i <= step ? c.accent : 'transparent',
                  }}>
                    <span className={i <= step ? 'grayscale-0' : 'grayscale'}>{stepIcons[i]}</span>
                  </div>
                  <div className={`text-[8px] font-bold mt-2 tracking-wider uppercase transition-all ${i === step ? '' : 'opacity-30'}`} style={{ color: i === step ? c.primary : 'black' }}>
                    {s.title}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Détail de l'étape active — style carte premium */}
          <div className="relative rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,.08)]" style={{ background: c.secondary }}>
            {/* Barre accent */}
            <div className="h-[3px]" style={{ background: `linear-gradient(90deg, ${k === 'C' ? c.dark : c.primary}, ${c.accent})` }} />

            <div className="p-8 flex items-start gap-6">
              {/* Numéro */}
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg" style={{ background: `linear-gradient(135deg, ${k === 'C' ? c.dark : c.primary}, ${c.light || c.primary})` }}>
                <span className="font-cormorant text-[24px] font-bold" style={{ color: c.textOnDark }}>{String(step + 1).padStart(2, '0')}</span>
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-[20px]">{stepIcons[step]}</span>
                  <div className="text-[20px] font-bold" style={{ color: c.primary }}>{steps[step].title}</div>
                </div>
                <div className="text-[11px] text-black/35 mb-4 font-medium flex items-center gap-2">
                  <MapPin size={11} className="opacity-50" />
                  Touchpoint : {steps[step].touchpoint}
                </div>

                {/* Citation — style premium */}
                <div className="relative pl-5 mb-5" style={{ borderLeft: `3px solid ${c.accent}40` }}>
                  <div className="font-cormorant text-[20px] italic leading-snug" style={{ color: c.primary }}>
                    "{steps[step].verbatim}"
                  </div>
                </div>

                {/* Émotion badge */}
                <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-[10px] font-bold text-white shadow-md" style={{ background: `linear-gradient(135deg, ${k === 'C' ? c.dark : c.primary}, ${c.accent})` }}>
                  <Star size={10} />
                  {steps[step].emotion}
                </span>
              </div>
            </div>
          </div>

          {/* Nav */}
          <div className="flex justify-between mt-6">
            <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}
              className="px-6 py-3 rounded-xl text-[11px] font-semibold border border-black/[.08] disabled:opacity-15 hover:bg-black/[.02] transition-all">
              Précédent
            </button>
            <span className="text-[11px] font-bold self-center" style={{ color: `${c.primary}50` }}>
              {step + 1} / {steps.length}
            </span>
            <button onClick={() => setStep(Math.min(steps.length - 1, step + 1))} disabled={step === steps.length - 1}
              className="px-6 py-3 rounded-xl text-[11px] font-semibold text-white disabled:opacity-15 transition-all shadow-md"
              style={{ background: `linear-gradient(135deg, ${k === 'C' ? c.dark : c.primary}, ${c.light || c.primary})` }}>
              Suivant
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════
   EXPORT
   ═══════════════════════════════════════════ */

const BrandWorld: React.FC<{ scenarioKey: ScenarioKey }> = ({ scenarioKey }) => (
  <>
    <AmbianceSection k={scenarioKey} />
    <LogoSection k={scenarioKey} />
    <TimelineSection k={scenarioKey} />
    <SignaletiqueTotemSection k={scenarioKey} />
    <TextileMockupsSection k={scenarioKey} />
    <GoodiesMockupsSection k={scenarioKey} />
    <DigitalMockupsSection k={scenarioKey} />
    <PersonasFocusGroupSection k={scenarioKey} />
    <div className="py-10 text-center text-[8px] text-black/15">
      Brand World · Cosmos Angré · Mars 2026 · Document EXCO confidentiel — New Heaven SA / CRMC
    </div>
  </>
);

export default BrandWorld;
