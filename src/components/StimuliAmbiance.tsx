import React, { useState } from 'react';

type Tab = 'A' | 'B' | 'C';

const StimuliAmbiance: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('A');

  const go = (tab: Tab) => {
    setActiveTab(tab);
    window.scrollTo(0, 0);
  };

  return (
    <section id="stimuli-ambiance" className="relative" style={{ background: '#000', fontFamily: "'Montserrat', sans-serif" }}>
      {/* NAV */}
      <div className="flex sticky top-0 z-[100]" style={{ background: 'rgba(0,0,0,0.92)', borderBottom: '0.5px solid #222' }}>
        <button
          onClick={() => go('A')}
          className={`flex-1 border-none cursor-pointer text-center transition-all`}
          style={{
            padding: '11px 6px',
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '8.5px',
            letterSpacing: '2.5px',
            textTransform: 'uppercase',
            fontWeight: 500,
            color: activeTab === 'A' ? '#7DC99A' : 'rgba(255,255,255,0.25)',
            background: 'transparent',
            borderRight: '0.5px solid #1a1a1a',
            borderBottom: activeTab === 'A' ? '2px solid #2F5439' : '2px solid transparent',
          }}
        >
          Planche A — Proximité Premium
        </button>
        <button
          onClick={() => go('B')}
          className={`flex-1 border-none cursor-pointer text-center transition-all`}
          style={{
            padding: '11px 6px',
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '8.5px',
            letterSpacing: '2.5px',
            textTransform: 'uppercase',
            fontWeight: 500,
            color: activeTab === 'B' ? '#B8924A' : 'rgba(255,255,255,0.25)',
            background: 'transparent',
            borderRight: '0.5px solid #1a1a1a',
            borderBottom: activeTab === 'B' ? '2px solid #0D1B4B' : '2px solid transparent',
          }}
        >
          Planche B — Destination Premium
        </button>
        <button
          onClick={() => go('C')}
          className={`flex-1 border-none cursor-pointer text-center transition-all`}
          style={{
            padding: '11px 6px',
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '8.5px',
            letterSpacing: '2.5px',
            textTransform: 'uppercase',
            fontWeight: 500,
            color: activeTab === 'C' ? '#C9943A' : 'rgba(255,255,255,0.25)',
            background: 'transparent',
            borderBottom: activeTab === 'C' ? '2px solid #C9943A' : '2px solid transparent',
          }}
        >
          A vs B — Vue comparative
        </button>
      </div>

      {/* PLANCHE A */}
      {activeTab === 'A' && (
        <div style={{
          minHeight: '100vh',
          background: '#2F5439',
          display: 'grid',
          gridTemplateRows: '1fr auto auto',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Texture diagonale */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'repeating-linear-gradient(-45deg, transparent, transparent 60px, rgba(255,255,255,0.018) 60px, rgba(255,255,255,0.018) 61px)',
          }} />
          {/* Accent coin */}
          <div style={{
            position: 'absolute', top: 0, right: 0,
            width: '28vw', height: '28vw', maxWidth: 340, maxHeight: 340,
            background: '#B8AA8C', opacity: 0.12, borderRadius: '0 0 0 100%',
          }} />
          {/* Cercle or */}
          <div style={{
            position: 'absolute', bottom: '-8vw', left: '-6vw',
            width: '40vw', height: '40vw', maxWidth: 480, maxHeight: 480,
            borderRadius: '50%', background: 'transparent',
            border: '1px solid rgba(201,148,58,0.15)',
          }} />
          {/* Meta */}
          <div style={{
            position: 'absolute', top: 28, left: 48,
            fontSize: 8, letterSpacing: 3, textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.22)',
          }}>
            Scénario A · Focus Group Cosmos Angré · Mars 2026
          </div>
          {/* Swatches */}
          <div style={{
            position: 'absolute', top: '50%', left: 48,
            transform: 'translateY(-50%)',
            display: 'flex', flexDirection: 'column', gap: 10,
          }}>
            <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#B8AA8C' }} />
            <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#2F5439', border: '0.5px solid rgba(255,255,255,0.3)' }} />
            <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#A85430' }} />
            <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#D4C9B0' }} />
          </div>
          {/* Centre */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexDirection: 'column', padding: '80px 15vw 40px', textAlign: 'center',
            position: 'relative', zIndex: 2,
          }}>
            <div style={{ fontSize: 8, letterSpacing: 5, textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 32 }}>
              Premium de Proximité
            </div>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(52px, 7vw, 96px)', fontWeight: 300, fontStyle: 'italic',
              color: '#fff', lineHeight: 1.05, marginBottom: 20, letterSpacing: -0.5,
            }}>
              "Enfin tout,<br /><span style={{ color: '#D4C9B0' }}>enfin ici."</span>
            </div>
            <div style={{ width: 48, height: 1, background: '#C9943A', margin: '0 auto 20px' }} />
            <div style={{ fontSize: 9.5, letterSpacing: 3, textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)' }}>
              Signature principale · Façade &amp; institutionnel
            </div>
          </div>
          {/* Signatures secondaires */}
          <div style={{ display: 'flex', borderTop: '0.5px solid rgba(255,255,255,0.08)', position: 'relative', zIndex: 2 }}>
            <div style={{ flex: 1, padding: '28px 36px', borderRight: '0.5px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: 8, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(201,148,58,0.6)', marginBottom: 8 }}>
                02 · Fréquentation quotidienne
              </div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 20, fontWeight: 300, color: 'rgba(255,255,255,0.55)', lineHeight: 1.3 }}>
                "Votre repère, votre rythme."
              </div>
            </div>
            <div style={{ flex: 1, padding: '28px 36px' }}>
              <div style={{ fontSize: 8, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(201,148,58,0.6)', marginBottom: 8 }}>
                03 · Institutionnel &amp; BtoB
              </div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 20, fontWeight: 300, color: 'rgba(255,255,255,0.55)', lineHeight: 1.3 }}>
                "Le centre de vos envies."
              </div>
            </div>
          </div>
          {/* Footer */}
          <div style={{ padding: '12px 48px', background: 'rgba(0,0,0,0.2)', display: 'flex', justifyContent: 'space-between', position: 'relative', zIndex: 2 }}>
            <span style={{ fontSize: 7.5, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(255,255,255,0.18)' }}>
              Cosmos Angré · Planche Ambiance A · Focus Group 20–25 Mars 2026
            </span>
            <span style={{ fontSize: 7.5, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(255,255,255,0.18)' }}>
              Confidentiel — New Heaven SA / CRMC
            </span>
          </div>
        </div>
      )}

      {/* PLANCHE B */}
      {activeTab === 'B' && (
        <div style={{
          minHeight: '100vh',
          background: '#040A1E',
          display: 'grid',
          gridTemplateRows: '1fr auto auto',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Halo or */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%,-50%)',
            width: '70vw', height: '70vw', maxWidth: 700, maxHeight: 700,
            borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(184,146,74,0.06) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />
          {/* Ligne verticale */}
          <div style={{
            position: 'absolute', top: 0, bottom: 0, left: 'calc(50% - 0.5px)',
            width: 1, background: 'rgba(184,146,74,0.07)',
          }} />
          {/* Arc */}
          <div style={{
            position: 'absolute', top: '-30vw', right: '-20vw',
            width: '70vw', height: '70vw', maxWidth: 700, maxHeight: 700,
            borderRadius: '50%', border: '1px solid rgba(184,146,74,0.06)',
          }} />
          {/* Meta */}
          <div style={{
            position: 'absolute', top: 28, left: 48,
            fontSize: 8, letterSpacing: 3, textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.15)',
          }}>
            Scénario B · Focus Group Cosmos Angré · Mars 2026
          </div>
          {/* Swatches */}
          <div style={{
            position: 'absolute', top: '50%', left: 48,
            transform: 'translateY(-50%)',
            display: 'flex', flexDirection: 'column', gap: 10,
          }}>
            <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#B8AA8C' }} />
            <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#0D1B4B', border: '0.5px solid rgba(184,146,74,0.3)' }} />
            <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#B8924A' }} />
            <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#D4C9B0' }} />
          </div>
          {/* Centre */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexDirection: 'column', padding: '80px 15vw 40px', textAlign: 'center',
            position: 'relative', zIndex: 2,
          }}>
            <div style={{ fontSize: 8, letterSpacing: 5, textTransform: 'uppercase', color: 'rgba(184,146,74,0.35)', marginBottom: 32 }}>
              Destination Premium
            </div>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(52px, 7vw, 96px)', fontWeight: 300, fontStyle: 'italic',
              color: '#fff', lineHeight: 1.05, marginBottom: 20, letterSpacing: -0.5,
            }}>
              "Un monde<br /><span style={{ color: '#B8924A' }}>à part."</span>
            </div>
            <div style={{ width: 48, height: 1, background: '#B8924A', margin: '0 auto 20px' }} />
            <div style={{ fontSize: 9.5, letterSpacing: 3, textTransform: 'uppercase', color: 'rgba(255,255,255,0.18)' }}>
              Signature principale · Façade &amp; institutionnel
            </div>
          </div>
          {/* Signatures secondaires */}
          <div style={{ display: 'flex', borderTop: '0.5px solid rgba(184,146,74,0.08)', position: 'relative', zIndex: 2 }}>
            <div style={{ flex: 1, padding: '28px 36px', borderRight: '0.5px solid rgba(184,146,74,0.07)' }}>
              <div style={{ fontSize: 8, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(184,146,74,0.4)', marginBottom: 8 }}>
                02 · Campagne &amp; digital
              </div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 20, fontWeight: 300, color: 'rgba(184,146,74,0.5)', lineHeight: 1.3 }}>
                "Vivez l'exception."
              </div>
            </div>
            <div style={{ flex: 1, padding: '28px 36px' }}>
              <div style={{ fontSize: 8, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(184,146,74,0.4)', marginBottom: 8 }}>
                03 · Partenaires &amp; presse
              </div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 20, fontWeight: 300, color: 'rgba(184,146,74,0.5)', lineHeight: 1.3 }}>
                "Un monde d'exception."
              </div>
            </div>
          </div>
          {/* Footer */}
          <div style={{ padding: '12px 48px', background: 'rgba(0,0,0,0.4)', display: 'flex', justifyContent: 'space-between', position: 'relative', zIndex: 2 }}>
            <span style={{ fontSize: 7.5, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(255,255,255,0.12)' }}>
              Cosmos Angré · Planche Ambiance B · Focus Group 20–25 Mars 2026
            </span>
            <span style={{ fontSize: 7.5, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(255,255,255,0.12)' }}>
              Confidentiel — New Heaven SA / CRMC
            </span>
          </div>
        </div>
      )}

      {/* PLANCHE COMPARATIVE */}
      {activeTab === 'C' && (
        <div style={{ minHeight: '100vh', background: '#080808', display: 'flex', flexDirection: 'column' }}>
          {/* Header */}
          <div style={{ padding: '28px 52px 24px', borderBottom: '0.5px solid #1a1a1a', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, fontWeight: 300, color: '#fff', letterSpacing: 1 }}>
                Scénario A vs Scénario B
              </div>
              <div style={{ fontSize: 8, letterSpacing: 3, textTransform: 'uppercase', color: '#333', marginTop: 4 }}>
                Vue comparative · Focus Group Cosmos Angré · Mars 2026
              </div>
            </div>
            <div style={{ fontSize: 7.5, letterSpacing: 2, textTransform: 'uppercase', color: '#222' }}>
              Confidentiel — New Heaven SA / CRMC
            </div>
          </div>
          {/* Colonnes */}
          <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 0.5px 1fr' }}>
            {/* Col A */}
            <div style={{ background: '#2F5439', padding: '60px 52px', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
              <div style={{
                position: 'absolute', bottom: -80, right: -80,
                width: 280, height: 280, borderRadius: '50%',
                border: '1px solid rgba(255,255,255,0.06)',
              }} />
              <div style={{ fontSize: 8, letterSpacing: 4, textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: 20 }}>
                Scénario A
              </div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 300, color: '#fff', lineHeight: 1, marginBottom: 6 }}>
                Premium<br />de Proximité
              </div>
              <div style={{ fontSize: 9, letterSpacing: 2.5, textTransform: 'uppercase', color: '#7DC99A', marginBottom: 36 }}>
                L'évidence du quartier
              </div>
              {/* Swatches */}
              <div style={{ display: 'flex', gap: 10, marginBottom: 36 }}>
                {[{ c: '#B8AA8C', h: '#B8AA8C' }, { c: '#2F5439', h: '#2F5439' }, { c: '#A85430', h: '#A85430' }, { c: '#D4C9B0', h: '#D4C9B0' }].map((s, i) => (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: s.c }} />
                    <div style={{ fontSize: 7, color: 'rgba(255,255,255,0.25)', letterSpacing: 0.5 }}>{s.h}</div>
                  </div>
                ))}
              </div>
              <div style={{ width: 40, height: 1, background: '#C9943A', marginBottom: 36 }} />
              {/* Signatures */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 'auto' }}>
                {[
                  { r: '01 · Principale', q: '"Enfin tout, enfin ici."' },
                  { r: '02 · Quotidien', q: '"Votre repère, votre rythme."' },
                  { r: '03 · Institutionnel', q: '"Le centre de vos envies."' },
                ].map((sig, i, arr) => (
                  <div key={i} style={{ paddingBottom: i < arr.length - 1 ? 20 : 0, borderBottom: i < arr.length - 1 ? '0.5px solid rgba(255,255,255,0.07)' : 'none' }}>
                    <div style={{ fontSize: 8, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(201,148,58,0.6)', marginBottom: 6 }}>{sig.r}</div>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 22, fontWeight: 300, color: '#fff', lineHeight: 1.25 }}>{sig.q}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* Divider */}
            <div style={{ background: '#1a1a1a' }} />
            {/* Col B */}
            <div style={{ background: '#040A1E', padding: '60px 52px', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
              <div style={{
                position: 'absolute', top: -60, left: -60,
                width: 250, height: 250, borderRadius: '50%',
                border: '1px solid rgba(184,146,74,0.06)',
              }} />
              <div style={{ fontSize: 8, letterSpacing: 4, textTransform: 'uppercase', color: 'rgba(255,255,255,0.18)', marginBottom: 20 }}>
                Scénario B
              </div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 300, color: '#fff', lineHeight: 1, marginBottom: 6 }}>
                Destination<br />Premium
              </div>
              <div style={{ fontSize: 9, letterSpacing: 2.5, textTransform: 'uppercase', color: '#B8924A', marginBottom: 36 }}>
                L'exception abidjanaise
              </div>
              {/* Swatches */}
              <div style={{ display: 'flex', gap: 10, marginBottom: 36 }}>
                {[{ c: '#B8AA8C', h: '#B8AA8C' }, { c: '#0D1B4B', h: '#0D1B4B' }, { c: '#B8924A', h: '#B8924A' }, { c: '#D4C9B0', h: '#D4C9B0' }].map((s, i) => (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: s.c }} />
                    <div style={{ fontSize: 7, color: 'rgba(255,255,255,0.2)', letterSpacing: 0.5 }}>{s.h}</div>
                  </div>
                ))}
              </div>
              <div style={{ width: 40, height: 1, background: '#B8924A', marginBottom: 36 }} />
              {/* Signatures */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 'auto' }}>
                {[
                  { r: '01 · Principale', q: '"Un monde à part."' },
                  { r: '02 · Campagne', q: '"Vivez l\'exception."' },
                  { r: '03 · BtoB & presse', q: '"Un monde d\'exception."' },
                ].map((sig, i, arr) => (
                  <div key={i} style={{ paddingBottom: i < arr.length - 1 ? 20 : 0, borderBottom: i < arr.length - 1 ? '0.5px solid rgba(184,146,74,0.08)' : 'none' }}>
                    <div style={{ fontSize: 8, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(184,146,74,0.45)', marginBottom: 6 }}>{sig.r}</div>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 22, fontWeight: 300, color: '#D4C9B0', lineHeight: 1.25 }}>{sig.q}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Footer */}
          <div style={{ padding: '12px 52px', background: '#050505', borderTop: '0.5px solid #111', display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 7.5, letterSpacing: 2, textTransform: 'uppercase', color: '#222' }}>
              Cosmos Angré · Vue comparative A vs B · Focus Group 20–25 Mars 2026
            </span>
            <span style={{ fontSize: 7.5, letterSpacing: 2, textTransform: 'uppercase', color: '#222' }}>
              Confidentiel — New Heaven SA / CRMC
            </span>
          </div>
        </div>
      )}
    </section>
  );
};

export default StimuliAmbiance;
