import React from 'react';
import { Camera, Sun, Maximize, Palette, Sparkles, Image, Users, Search } from 'lucide-react';
import type { ScenarioKey } from './Scenarios';

const data: Record<ScenarioKey, {
  guidelines: { icon: string; title: string; desc: string }[];
  hero: string; lifestyle: string; detail: string;
}> = {
  A: {
    guidelines: [
      { icon: 'sun', title: 'Lumière', desc: 'Lumière naturelle dorée, golden hour, ombres douces. Privilégier les prises en fin d\'après-midi pour une chaleur maximale.' },
      { icon: 'frame', title: 'Cadrage', desc: 'Plans moyens chaleureux, profondeur de champ douce. Inclure le contexte humain — montrer les gens dans leur quotidien.' },
      { icon: 'camera', title: 'Sujets', desc: 'Familles, artisans, textures naturelles, wax, bois d\'iroko, raphia. Le sourire est naturel, jamais posé.' },
      { icon: 'palette', title: 'Post-production', desc: 'Tons chauds terracotta, léger grain film, saturation terre cuite renforcée. Éviter les filtres froids ou cliniques.' },
      { icon: 'sparkles', title: 'Ambiance', desc: 'Authenticité, proximité, vie quotidienne sublimée. On doit sentir la chaleur humaine dans chaque cliché.' },
    ],
    hero: 'Vue large d\'une famille ivoirienne déambulant dans une allée du mall, lumière dorée rasante, sourires naturels, sacs shopping en wax réinterprété.',
    lifestyle: 'Moments de partage : un père et sa fille devant une vitrine, un groupe d\'amies au café, un artisan au travail. Toujours naturel, jamais mis en scène.',
    detail: 'Gros plans sur les textures : fibres de raphia, bois sculpté, tissu wax, poterie terracotta. Profondeur de champ très courte, bokeh chaud.',
  },
  B: {
    guidelines: [
      { icon: 'sun', title: 'Lumière', desc: 'Éclairage studio maîtrisé, reflets dorés sur surfaces polies, contrastes marqués. Jeux de lumière architecturaux.' },
      { icon: 'frame', title: 'Cadrage', desc: 'Plans serrés luxe, détails matières nobles, angles bas valorisants. Perspectives fuyantes dans les galeries.' },
      { icon: 'camera', title: 'Sujets', desc: 'Architecture premium, matières nobles (marbre, laiton), lifestyle sophistiqué, mode haute gamme, gastronomie.' },
      { icon: 'palette', title: 'Post-production', desc: 'Contraste élevé, tons froids navy dominants, reflets gold. Netteté maximale. Peau parfaite sans excès.' },
      { icon: 'sparkles', title: 'Ambiance', desc: 'Exclusivité, aspiration, sophistication urbaine. Chaque image doit évoquer un magazine lifestyle international.' },
    ],
    hero: 'Vue en contre-plongée de l\'atrium principal, lignes architecturales épurées, reflets dorés sur le marbre, un couple élégant en mouvement flou.',
    lifestyle: 'Silhouettes élégantes, shopping bags premium, pause café dans un lobby feutré. L\'élégance naturelle, jamais ostentatoire.',
    detail: 'Surfaces polies, textures de cuir, reflets sur du verre, packaging premium. Éclairage directionnel, ombres nettes.',
  },
  C: {
    guidelines: [
      { icon: 'sun', title: 'Lumière', desc: 'Mix naturel et artificiel, jeux d\'ombre cosmiques, spots dirigés à travers la végétation. Effet « forêt enchantée ».' },
      { icon: 'frame', title: 'Cadrage', desc: 'Grand angle et macro alternés, perspectives audacieuses, symétrie brisée. Cadres dynamiques, diagonales.' },
      { icon: 'camera', title: 'Sujets', desc: 'Nature et architecture fusionnées, végétation luxuriante, jeux de lumière à travers les feuilles, cascades intérieures.' },
      { icon: 'palette', title: 'Post-production', desc: 'Vibrance élevée, verts profonds saturés, accents dorés. Clarté dans les ombres. Aspect cinématographique.' },
      { icon: 'sparkles', title: 'Ambiance', desc: 'Émerveillement, découverte, fusion nature-luxe. Chaque image doit provoquer un « wow » immédiat.' },
    ],
    hero: 'Vue immersive d\'une allée végétalisée, canopée de feuilles tropicales, lumière filtrant en rayons, visiteurs émerveillés en arrière-plan.',
    lifestyle: 'Découverte et émerveillement : une main touchant une feuille géante, un enfant levant les yeux vers la canopée, un couple sous une cascade de lumière.',
    detail: 'Macro sur feuilles tropicales humides, textures d\'écorce, reflets de lumière à travers l\'eau. Couleurs saturées, verts profonds.',
  },
  D: {
    guidelines: [
      { icon: 'sun', title: 'Lumière', desc: 'Lumière tamisée naturelle, ambiance sous-bois, verdure filtrante. Douceur absolue, pas de flash ni de lumière dure.' },
      { icon: 'frame', title: 'Cadrage', desc: 'Plans larges jardin, plongée douce, lignes organiques. Pas de symétrie forcée — laisser la nature composer.' },
      { icon: 'camera', title: 'Sujets', desc: 'Végétation abondante, allées ombragées, espaces verts, fleurs tropicales, fontaines, pergolas. L\'humain en harmonie.' },
      { icon: 'palette', title: 'Post-production', desc: 'Tons verts dominants, douceur, faible contraste. Saturation naturelle. Aspect « jardin secret » préservé.' },
      { icon: 'sparkles', title: 'Ambiance', desc: 'Sérénité, nature préservée, promenade paisible. Le temps s\'arrête — on respire, on flâne, on vit.' },
    ],
    hero: 'Allée de jardin luxuriante, pergola couverte de bougainvilliers, lumière douce filtrée, visiteurs en promenade sereine, sacs shopping en toile naturelle.',
    lifestyle: 'Flânerie : lecture sur un banc ombragé, pause thé dans un patio verdoyant, enfants jouant près d\'une fontaine. Rythme lent, sourires paisibles.',
    detail: 'Pétales de fleurs tropicales, gouttes de rosée sur feuille, texture de pierre mousse, grain de bois naturel. Tons verts et beige chauds.',
  },
};

const iconMap: Record<string, React.FC<{ size: number; color: string }>> = {
  sun: Sun as React.FC<{ size: number; color: string }>,
  frame: Maximize as React.FC<{ size: number; color: string }>,
  camera: Camera as React.FC<{ size: number; color: string }>,
  palette: Palette as React.FC<{ size: number; color: string }>,
  sparkles: Sparkles as React.FC<{ size: number; color: string }>,
};

const accents: Record<ScenarioKey, { main: string; rgb: string }> = {
  A: { main: '#4A7558', rgb: '74,117,88' },
  B: { main: '#0D1B4B', rgb: '13,27,75' },
  C: { main: '#C9943A', rgb: '201,148,58' },
  D: { main: '#898D5D', rgb: '137,141,93' },
};

export default function PhotographyGuidelines({ scenarioKey }: { scenarioKey: ScenarioKey }) {
  const ac = accents[scenarioKey];
  const d = data[scenarioKey];

  return (
    <div id="bw-photo" style={{ paddingTop: 48 }}>
      <div style={{ fontSize: 9, letterSpacing: 3, textTransform: 'uppercase', color: ac.main, fontWeight: 600, marginBottom: 8 }}>B10 · Direction artistique</div>
      <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, fontWeight: 300, color: '#1a1a2e', marginBottom: 8 }}>Direction photographique</div>
      <div style={{ fontSize: 11, color: 'rgba(0,0,0,0.45)', marginBottom: 32 }}>Lumière, cadrage, sujets, post-production — les codes visuels de l'identité Cosmos</div>
      <div style={{ width: 40, height: 2, background: ac.main, marginBottom: 40, opacity: 0.4 }} />

      {/* Guidelines grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 16, marginBottom: 40 }}>
        {d.guidelines.map((g, i) => {
          const Icon = iconMap[g.icon];
          return (
            <div key={i} style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 14, overflow: 'hidden' }}>
              <div style={{ background: `rgba(${ac.rgb},0.06)`, padding: '20px 16px', borderBottom: '1px solid rgba(0,0,0,0.04)', display: 'flex', alignItems: 'center', gap: 10 }}>
                {Icon && <Icon size={16} color={ac.main} />}
                <div style={{ fontSize: 11, fontWeight: 600, color: '#1a1a2e' }}>{g.title}</div>
              </div>
              <div style={{ padding: '16px' }}>
                <div style={{ fontSize: 10, color: 'rgba(0,0,0,0.55)', lineHeight: 1.7 }}>{g.desc}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Moodboard briefs */}
      <div style={{ fontSize: 9, letterSpacing: 2, textTransform: 'uppercase', color: ac.main, fontWeight: 600, marginBottom: 16 }}>Briefs moodboard</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
        {[
          { type: 'Hero shot', icon: Image, desc: d.hero },
          { type: 'Lifestyle', icon: Users, desc: d.lifestyle },
          { type: 'Détail / Texture', icon: Search, desc: d.detail },
        ].map((brief, i) => (
          <div key={i} style={{ background: `rgba(${ac.rgb},0.04)`, border: `1px solid rgba(${ac.rgb},0.12)`, borderRadius: 14, padding: 24 }}>
            <brief.icon size={24} color={ac.main} style={{ marginBottom: 12 }} />
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 16, fontWeight: 600, color: '#1a1a2e', marginBottom: 10 }}>{brief.type}</div>
            <div style={{ fontSize: 10.5, color: 'rgba(0,0,0,0.55)', lineHeight: 1.7 }}>{brief.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
