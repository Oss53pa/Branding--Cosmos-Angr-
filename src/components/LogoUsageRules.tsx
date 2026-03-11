import React from 'react';
import { Check, X, AlertTriangle } from 'lucide-react';
import type { ScenarioKey } from './Scenarios';
import CosmosLogo from './CosmosLogo';

const accents: Record<ScenarioKey, { main: string; bg: string; rgb: string }> = {
  A: { main: '#4A7558', bg: 'rgba(74,117,88,0.08)', rgb: '74,117,88' },
  B: { main: '#0D1B4B', bg: 'rgba(13,27,75,0.08)', rgb: '13,27,75' },
  C: { main: '#C9943A', bg: 'rgba(201,148,58,0.08)', rgb: '201,148,58' },
  D: { main: '#898D5D', bg: 'rgba(137,141,93,0.08)', rgb: '137,141,93' },
};

export default function LogoUsageRules({ scenarioKey }: { scenarioKey: ScenarioKey }) {
  const ac = accents[scenarioKey];

  const cardStyle: React.CSSProperties = {
    background: '#fff',
    border: '1px solid rgba(0,0,0,0.06)',
    borderRadius: 14,
    overflow: 'hidden',
  };

  return (
    <div id="bw-logo-rules" style={{ paddingTop: 48 }}>
      <div style={{ fontSize: 9, letterSpacing: 3, textTransform: 'uppercase', color: ac.main, fontWeight: 600, marginBottom: 8 }}>B9 · Règles d'usage</div>
      <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, fontWeight: 300, color: '#1a1a2e', marginBottom: 8 }}>Usage du logo</div>
      <div style={{ fontSize: 11, color: 'rgba(0,0,0,0.65)', marginBottom: 32 }}>Zone de protection, tailles minimales, fonds autorisés et interdictions</div>
      <div style={{ width: 40, height: 2, background: ac.main, marginBottom: 40, opacity: 0.4 }} />

      {/* ── Zone de protection ── */}
      <div style={{ marginBottom: 40 }}>
        <div style={{ fontSize: 9, letterSpacing: 2, textTransform: 'uppercase', color: ac.main, fontWeight: 600, marginBottom: 16 }}>Zone de protection (clear space)</div>
        <div style={{ ...cardStyle, padding: 40, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ position: 'relative', padding: 48 }}>
            {/* Dashed border = exclusion zone */}
            <div style={{ position: 'absolute', inset: 0, border: '2px dashed rgba(0,0,0,0.2)', borderRadius: 8 }} />
            {/* x labels */}
            {(['top', 'bottom', 'left', 'right'] as const).map(side => (
              <div key={side} style={{
                position: 'absolute',
                ...(side === 'top' ? { top: 4, left: '50%', transform: 'translateX(-50%)' } : {}),
                ...(side === 'bottom' ? { bottom: 4, left: '50%', transform: 'translateX(-50%)' } : {}),
                ...(side === 'left' ? { left: 6, top: '50%', transform: 'translateY(-50%)' } : {}),
                ...(side === 'right' ? { right: 6, top: '50%', transform: 'translateY(-50%)' } : {}),
                fontSize: 11, fontWeight: 700, color: ac.main, fontStyle: 'italic',
              }}>x</div>
            ))}
            {/* Guide lines */}
            <div style={{ position: 'absolute', top: 16, left: '50%', width: 1, height: 32, background: `rgba(${ac.rgb},0.3)` }} />
            <div style={{ position: 'absolute', bottom: 16, left: '50%', width: 1, height: 32, background: `rgba(${ac.rgb},0.3)` }} />
            <div style={{ position: 'absolute', left: 16, top: '50%', height: 1, width: 32, background: `rgba(${ac.rgb},0.3)` }} />
            <div style={{ position: 'absolute', right: 16, top: '50%', height: 1, width: 32, background: `rgba(${ac.rgb},0.3)` }} />
            {/* Real CosmosLogo */}
            <CosmosLogo height={50} dotColor="#1a1a2e" />
          </div>
          <div style={{ marginTop: 20, fontSize: 10.5, color: 'rgba(0,0,0,0.65)', textAlign: 'center', lineHeight: 1.7 }}>
            <strong style={{ color: ac.main }}>x</strong> = hauteur du <strong>O</strong> de COSMOS · Aucun élément ne doit pénétrer cette zone
          </div>
        </div>
      </div>

      {/* ── Taille minimale ── */}
      <div style={{ marginBottom: 40 }}>
        <div style={{ fontSize: 9, letterSpacing: 2, textTransform: 'uppercase', color: ac.main, fontWeight: 600, marginBottom: 16 }}>Taille minimale</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
          {[
            { label: 'Print', value: '25 mm', note: 'Largeur minimale sur tout support imprimé (carte, brochure, affiche)' },
            { label: 'Digital', value: '120 px', note: 'Largeur minimale sur écran (site web, app, réseaux sociaux)' },
            { label: 'Favicon / Icône', value: 'O doré seul', note: 'En dessous de 120px, utiliser uniquement le O doré comme favicon' },
          ].map((item, i) => (
            <div key={i} style={cardStyle}>
              <div style={{ background: `rgba(${ac.rgb},0.06)`, padding: '20px 24px', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                <div style={{ fontSize: 9, letterSpacing: 2, textTransform: 'uppercase', color: ac.main, fontWeight: 600 }}>{item.label}</div>
              </div>
              <div style={{ padding: '24px' }}>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, fontWeight: 600, color: '#1a1a2e', marginBottom: 8 }}>{item.value}</div>
                <div style={{ fontSize: 10, color: 'rgba(0,0,0,0.65)', lineHeight: 1.6 }}>{item.note}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Fonds autorisés ── */}
      <div style={{ marginBottom: 40 }}>
        <div style={{ fontSize: 9, letterSpacing: 2, textTransform: 'uppercase', color: ac.main, fontWeight: 600, marginBottom: 16 }}>Fonds autorisés</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
          {[
            { bg: '#ffffff', dotColor: '#1a1a2e', label: 'Fond blanc', hex: '#FFFFFF', border: true },
            { bg: '#f8f6f2', dotColor: '#1a1a2e', label: 'Fond crème', hex: '#F8F6F2', border: false },
            { bg: '#1a1a2e', dotColor: '#f8f6f2', label: 'Fond navy', hex: '#1A1A2E', border: false },
            { bg: ac.main, dotColor: '#f8f6f2', label: 'Fond scénario', hex: ac.main.toUpperCase(), border: false },
          ].map((item, i) => (
            <div key={i} style={cardStyle}>
              <div style={{ background: item.bg, padding: '24px 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 100, border: item.border ? '1px solid rgba(0,0,0,0.08)' : 'none', borderRadius: '14px 14px 0 0' }}>
                <CosmosLogo height={32} dotColor={item.dotColor} />
              </div>
              <div style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
                <Check size={14} color="#16a34a" strokeWidth={2.5} />
                <div>
                  <div style={{ fontSize: 10, fontWeight: 600, color: '#1a1a2e' }}>{item.label}</div>
                  <div style={{ fontSize: 9, color: 'rgba(0,0,0,0.65)' }}>{item.hex}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Interdictions ── */}
      <div style={{ marginBottom: 40 }}>
        <div style={{ fontSize: 9, letterSpacing: 2, textTransform: 'uppercase', color: '#dc2626', fontWeight: 600, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 6 }}>
          <AlertTriangle size={12} /> Interdictions
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
          {[
            { label: 'Ne pas déformer', transform: 'scaleX(1.4) scaleY(0.7)', dotColor: '#1a1a2e' },
            { label: 'Ne pas pivoter', transform: 'rotate(15deg)', dotColor: '#1a1a2e' },
            { label: 'Ne pas changer les couleurs du O', transform: '', dotColor: '#dc2626', goldOverride: true },
            { label: 'Ne pas ajouter d\'effets', filter: 'drop-shadow(0 0 8px rgba(0,0,0,0.5))', transform: '', dotColor: '#1a1a2e' },
            { label: 'Ne pas utiliser sur fond complexe', transform: '', dotColor: '#fff', bgComplex: true },
            { label: 'Ne pas modifier l\'espacement', transform: 'scaleX(1.3)', dotColor: '#1a1a2e' },
          ].map((item, i) => (
            <div key={i} style={{ ...cardStyle, border: '1px solid rgba(220,38,38,0.15)' }}>
              <div style={{
                padding: '24px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 80,
                background: item.bgComplex
                  ? 'linear-gradient(135deg, #e74c3c 0%, #3498db 50%, #2ecc71 100%)'
                  : 'rgba(220,38,38,0.03)',
                position: 'relative',
              }}>
                <div style={{
                  transform: item.transform || undefined,
                  filter: item.filter || undefined,
                }}>
                  <CosmosLogo height={30} dotColor={item.dotColor} />
                </div>
                {/* Red X badge */}
                <div style={{ position: 'absolute', top: 8, right: 8, width: 22, height: 22, borderRadius: '50%', background: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <X size={12} color="#fff" strokeWidth={3} />
                </div>
              </div>
              <div style={{ padding: '12px 16px', fontSize: 10, color: '#dc2626', fontWeight: 600, textAlign: 'center' }}>
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: `rgba(${ac.rgb},0.06)`, border: `1px solid rgba(${ac.rgb},0.15)`, padding: '16px 24px', fontSize: 10.5, color: '#1a1a2e', lineHeight: 1.7 }}>
        <strong style={{ color: ac.main, fontSize: 9, letterSpacing: 2, textTransform: 'uppercase' }}>Règle fondamentale</strong>
        <div style={{ marginTop: 8 }}>Le logo Cosmos Angré est le premier ambassadeur de la marque. Il doit toujours apparaître <strong>lisible, respecté et valorisé</strong>. En cas de doute, consulter le Brand Manager avant toute utilisation.</div>
      </div>
    </div>
  );
}
