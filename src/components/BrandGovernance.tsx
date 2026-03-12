import React from 'react';
import { Eye, Users, CheckCircle, ArrowRight, Sun, CloudRain, BookOpen, Sparkles, Calendar } from 'lucide-react';
import type { ScenarioKey } from './Scenarios';

const accents: Record<ScenarioKey, { main: string; rgb: string }> = {
  A: { main: '#4A7558', rgb: '74,117,88' },
  B: { main: '#0D1B4B', rgb: '13,27,75' },
  C: { main: '#C9943A', rgb: '201,148,58' },
  D: { main: '#898D5D', rgb: '137,141,93' },
};

export default function BrandGovernance({ scenarioKey }: { scenarioKey: ScenarioKey }) {
  const ac = accents[scenarioKey];

  const cardStyle: React.CSSProperties = {
    background: '#fff',
    border: '1px solid rgba(0,0,0,0.06)',
    borderRadius: 14,
    overflow: 'hidden',
  };

  return (
    <>
      {/* ═══ C8 — ADAPTATION SAISONNIÈRE ═══ */}
      <section className="bg-warm" id="smb-saisons">
        <div className="eyebrow green">C8 · Saisonnalité</div>
        <h2 className="light">Adaptation saisonnière</h2>
        <div className="sub">Ajustements d'ambiance par période — sans jamais modifier l'identité</div>
        <div className="divider kaki" />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 16, marginBottom: 32 }}>
          {[
            { period: 'Saison sèche', months: 'Nov – Mars', icon: Sun, guidelines: ['Intensifier les tons chauds dans la communication', 'Campagnes outdoor et terrasses mises en avant', 'Événements extérieurs, animations en plein air', 'Éclairage plus vif, ambiance solaire'] },
            { period: 'Saison des pluies', months: 'Avr – Juil', icon: CloudRain, guidelines: ['Tons plus frais et apaisants', 'Focus sur les espaces intérieurs et le cocooning', 'Éclairage chaleureux compensatoire', 'Campagnes digitales renforcées'] },
            { period: 'Rentrée', months: 'Août – Oct', icon: BookOpen, guidelines: ['Campagnes dynamiques et énergiques', 'Focus familles et back-to-school', 'Nouvelles collections mises en avant', 'Animations enfants et ados'] },
            { period: 'Fêtes', months: 'Déc – Jan', icon: Sparkles, guidelines: ['Décoration festive respectant la charte', 'Éditions limitées et coffrets cadeaux', 'Illuminations (blanc chaud + accents gold)', 'Programmation culturelle spéciale'] },
          ].map((s, i) => (
            <div key={i} style={cardStyle}>
              <div style={{ background: `rgba(${ac.rgb},0.06)`, padding: '16px 20px', borderBottom: '1px solid rgba(0,0,0,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <s.icon size={20} color={ac.main} />
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: '#1a1a2e' }}>{s.period}</div>
                    <div style={{ fontSize: 9, color: 'rgba(0,0,0,0.65)' }}>{s.months}</div>
                  </div>
                </div>
              </div>
              <div style={{ padding: '16px 20px' }}>
                {s.guidelines.map((g, j) => (
                  <div key={j} style={{ fontSize: 10.5, color: 'rgba(0,0,0,0.6)', lineHeight: 1.7, paddingLeft: 16, position: 'relative', marginBottom: 4 }}>
                    <span style={{ position: 'absolute', left: 0, color: ac.main }}>•</span>{g}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Événements récurrents */}
        <div style={{ fontSize: 9, letterSpacing: 2, textTransform: 'uppercase', color: ac.main, fontWeight: 600, marginBottom: 12 }}>Événements récurrents</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 24 }}>
          {[
            { event: 'Fête des Mères', date: 'Mai', rule: 'Campagne émotion, tons doux, cadeaux mis en avant' },
            { event: 'Noël & Jour de l\'An', date: 'Déc–Jan', rule: 'Déco premium, gold renforcé, éditions limitées' },
            { event: 'Tabaski / Ramadan', date: 'Variable', rule: 'Respect culturel, offres famille, ambiance conviviale' },
            { event: 'Indépendance', date: '7 Août', rule: 'Fierté nationale, couleurs CI intégrées subtilement' },
          ].map((e, i) => (
            <div key={i} style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 10, padding: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                <Calendar size={12} color={ac.main} />
                <div style={{ fontSize: 11, fontWeight: 600, color: '#1a1a2e' }}>{e.event}</div>
              </div>
              <div style={{ fontSize: 9, color: ac.main, fontWeight: 600, marginBottom: 6 }}>{e.date}</div>
              <div style={{ fontSize: 10, color: 'rgba(0,0,0,0.65)', lineHeight: 1.6 }}>{e.rule}</div>
            </div>
          ))}
        </div>

        <div style={{ background: `rgba(${ac.rgb},0.06)`, border: `1px solid rgba(${ac.rgb},0.15)`, padding: '16px 24px', fontSize: 10.5, color: '#1a1a2e', lineHeight: 1.7 }}>
          <strong style={{ color: ac.main, fontSize: 9, letterSpacing: 2, textTransform: 'uppercase' }}>Règle d'or</strong>
          <div style={{ marginTop: 8 }}>Les adaptations saisonnières modifient <strong>l'ambiance</strong>, jamais <strong>l'identité</strong>. Le logo, la typographie et la palette de base restent strictement inchangés. Seules les proportions d'utilisation des couleurs secondaires peuvent varier.</div>
        </div>
      </section>

      {/* ═══ C9 — ACCESSIBILITÉ ═══ */}
      <section className="bg-white" id="smb-accessibilite">
        <div className="eyebrow green">C9 · Accessibilité</div>
        <h2 className="light">Design inclusif</h2>
        <div className="sub">Normes d'accessibilité — communication, signalétique et espaces</div>
        <div className="divider kaki" />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 16 }}>
          {[
            { icon: Eye, title: 'Contraste texte', rules: ['Ratio minimum 4.5:1 (WCAG AA)', 'Grands titres : ratio 3:1 minimum', 'Jamais de texte sur fond complexe sans overlay', 'Tester avec un simulateur daltonisme'] },
            { icon: Shield, title: 'Signalétique', rules: ['Pictogrammes universels ISO 7001', 'Braille sur les plaques directionnelles', 'Taille minimale 14pt pour texte directionnel', 'Contraste fond/texte renforcé (5:1)'] },
            { icon: Users, title: 'Digital', rules: ['Alt-text obligatoire sur toutes les images', 'Navigation clavier complète', 'ARIA labels sur les éléments interactifs', 'Design responsive (mobile-first)'] },
            { icon: CheckCircle, title: 'Espaces', rules: ['Allées PMR : 1,50m minimum', 'Rampes d\'accès : pente max 5%', 'Boucles magnétiques aux caisses', 'Places PMR en parking (2% minimum)'] },
            { icon: ArrowRight, title: 'Communication', rules: ['Langage inclusif et non-discriminant', 'Éviter le jargon technique', 'Sous-titrage de toutes les vidéos', 'Versions audio des supports clés'] },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} style={cardStyle}>
                <div style={{ background: `rgba(${ac.rgb},0.06)`, padding: '16px', borderBottom: '1px solid rgba(0,0,0,0.04)', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Icon size={14} color={ac.main} />
                  <div style={{ fontSize: 10, fontWeight: 600, color: '#1a1a2e' }}>{item.title}</div>
                </div>
                <div style={{ padding: '14px 16px' }}>
                  {item.rules.map((r, j) => (
                    <div key={j} style={{ fontSize: 9.5, color: 'rgba(0,0,0,0.65)', lineHeight: 1.6, paddingLeft: 12, position: 'relative', marginBottom: 4 }}>
                      <span style={{ position: 'absolute', left: 0, color: ac.main, fontSize: 8 }}>●</span>{r}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </>
  );
}
