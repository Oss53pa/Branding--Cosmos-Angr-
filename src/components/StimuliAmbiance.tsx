import React, { useState } from 'react';

type Tab = 'pA' | 'pB' | 'pComp';

const signaturesA = [
  { sig: '"Enfin tout,\nenfin ici."', sub: 'Signature 01 · Émotionnelle & libératoire', declinaisons: [
    { num: '02 · Fréquentation quotidienne', txt: '"Tout converge ici"' },
    { num: '03 · Institutionnel & BtoB', txt: '"Votre quotidien, en mieux"' },
  ]},
  { sig: '"Tout converge\nici"', sub: 'Signature 02 · Convergence & complétude', declinaisons: [
    { num: '02 · Fréquentation quotidienne', txt: '"Enfin tout, enfin ici."' },
    { num: '03 · Institutionnel & BtoB', txt: '"Le centre de vos envies"' },
  ]},
  { sig: '"Votre quotidien,\nen mieux"', sub: 'Signature 03 · Premium accessible', declinaisons: [
    { num: '02 · Fréquentation quotidienne', txt: '"Votre repère, Votre rythme"' },
    { num: '03 · Institutionnel & BtoB', txt: '"Tout converge ici"' },
  ]},
  { sig: '"Votre repère,\nVotre rythme"', sub: 'Signature 04 · Centre de gravité local', declinaisons: [
    { num: '02 · Fréquentation quotidienne', txt: '"Votre quotidien, en mieux"' },
    { num: '03 · Institutionnel & BtoB', txt: '"Le centre de vos envies"' },
  ]},
  { sig: '"Le centre\nde vos envies"', sub: 'Signature 05 · Besoins & envies', declinaisons: [
    { num: '02 · Fréquentation quotidienne', txt: '"Votre repère, Votre rythme"' },
    { num: '03 · Institutionnel & BtoB', txt: '"Tout commence par vous"' },
  ]},
  { sig: '"Tout commence\npar vous"', sub: 'Signature 06 · Expérience client', declinaisons: [
    { num: '02 · Fréquentation quotidienne', txt: '"Enfin tout, enfin ici."' },
    { num: '03 · Institutionnel & BtoB', txt: '"Le centre de vos envies"' },
  ]},
];

const signaturesB = [
  { sig: '"Un monde\nà part."', sub: 'Signature 01 · Rupture & univers distinct', declinaisons: [
    { num: '02 · Campagne & digital', txt: '"Vivez l\'exception"' },
    { num: '03 · Partenaires & presse', txt: '"Un monde d\'exception"' },
  ]},
  { sig: '"Vivez\nl\'exception"', sub: 'Signature 02 · Aspirationnel assumé', declinaisons: [
    { num: '02 · Campagne & digital', txt: '"Un monde à découvrir"' },
    { num: '03 · Partenaires & presse', txt: '"Un monde à part."' },
  ]},
  { sig: '"Un monde\nà découvrir"', sub: 'Signature 03 · Univers immersif', declinaisons: [
    { num: '02 · Campagne & digital', txt: '"Vivez l\'exception"' },
    { num: '03 · Partenaires & presse', txt: '"Le standard nouveau"' },
  ]},
  { sig: '"L\'adresse qui\nchange tout"', sub: 'Signature 04 · Code de distinction', declinaisons: [
    { num: '02 · Campagne & digital', txt: '"Vivez l\'exception"' },
    { num: '03 · Partenaires & presse', txt: '"Un monde d\'exception"' },
  ]},
  { sig: '"Le standard\nnouveau"', sub: 'Signature 05 · Positionnement offensif', declinaisons: [
    { num: '02 · Campagne & digital', txt: '"Un monde à découvrir"' },
    { num: '03 · Partenaires & presse', txt: '"Un monde d\'exception"' },
  ]},
  { sig: '"Un monde\nd\'exception"', sub: 'Signature 06 · Destination premium immersive', declinaisons: [
    { num: '02 · Campagne & digital', txt: '"Vivez l\'exception"' },
    { num: '03 · Partenaires & presse', txt: '"Un monde à part."' },
  ]},
];

const PlancheA: React.FC<{ sig: string; sub: string; index: number; total: number; declinaisons: { num: string; txt: string }[] }> = ({ sig, sub, index, total, declinaisons }) => {
  const lines = sig.split('\n');
  return (
    <div style={{ minHeight: '100vh', background: '#2F5439', display: 'grid', gridTemplateRows: '1fr auto auto', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(-45deg, transparent, transparent 60px, rgba(255,255,255,0.018) 60px, rgba(255,255,255,0.018) 61px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: 0, right: 0, width: '28vw', height: '28vw', maxWidth: 340, maxHeight: 340, background: '#B8AA8C', opacity: 0.12, borderRadius: '0 0 0 100%' }} />
      <div style={{ position: 'absolute', bottom: '-8vw', left: '-6vw', width: '40vw', height: '40vw', maxWidth: 480, maxHeight: 480, borderRadius: '50%', border: '1px solid rgba(201,148,58,0.15)' }} />
      <div style={{ position: 'absolute', top: 28, left: 48, fontSize: 8, letterSpacing: 3, textTransform: 'uppercase', color: 'rgba(255,255,255,0.22)' }}>
        Scénario A · Signature {String(index + 1).padStart(2, '0')}/{String(total).padStart(2, '0')} · Cosmos Angré · Mars 2026
      </div>
      <div style={{ position: 'absolute', top: '50%', left: 48, transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#B8AA8C' }} />
        <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#2F5439', border: '0.5px solid rgba(255,255,255,0.3)' }} />
        <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#A85430' }} />
        <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#D4C9B0' }} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', padding: '80px 15vw 40px', textAlign: 'center', position: 'relative', zIndex: 2 }}>
        <div style={{ fontSize: 8, letterSpacing: 5, textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 32 }}>Premium de Proximité</div>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(52px, 7vw, 96px)', fontWeight: 300, fontStyle: 'italic', color: '#fff', lineHeight: 1.05, marginBottom: 20, letterSpacing: -0.5 }}>
          {lines[0]}<br /><span style={{ color: '#D4C9B0' }}>{lines[1]}</span>
        </div>
        <div style={{ width: 48, height: 1, background: '#C9943A', margin: '0 auto 20px' }} />
        <div style={{ fontSize: 9.5, letterSpacing: 3, textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)' }}>{sub}</div>
      </div>
      {/* Déclinaisons */}
      <div style={{ display: 'flex', borderTop: '0.5px solid rgba(255,255,255,0.08)', position: 'relative', zIndex: 2 }}>
        {declinaisons.map((d, i) => (
          <div key={i} style={{ flex: 1, padding: '28px 36px', borderRight: i < declinaisons.length - 1 ? '0.5px solid rgba(255,255,255,0.08)' : 'none' }}>
            <div style={{ fontSize: 8, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(201,148,58,0.6)', marginBottom: 8 }}>{d.num}</div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 20, fontWeight: 300, color: 'rgba(255,255,255,0.55)', lineHeight: 1.3 }}>{d.txt}</div>
          </div>
        ))}
      </div>
      <div style={{ padding: '12px 48px', background: 'rgba(0,0,0,0.2)', display: 'flex', justifyContent: 'space-between', position: 'relative', zIndex: 2 }}>
        <span style={{ fontSize: 7.5, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(255,255,255,0.18)' }}>Cosmos Angré · Stimuli A · Focus Group 20–25 Mars 2026</span>
        <span style={{ fontSize: 7.5, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(255,255,255,0.18)' }}>Confidentiel — New Heaven SA / CRMC</span>
      </div>
    </div>
  );
};

const PlancheB: React.FC<{ sig: string; sub: string; index: number; total: number; declinaisons: { num: string; txt: string }[] }> = ({ sig, sub, index, total, declinaisons }) => {
  const lines = sig.split('\n');
  return (
    <div style={{ minHeight: '100vh', background: '#040A1E', display: 'grid', gridTemplateRows: '1fr auto auto', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '70vw', height: '70vw', maxWidth: 700, maxHeight: 700, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(184,146,74,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: 0, bottom: 0, left: 'calc(50% - 0.5px)', width: 1, background: 'rgba(184,146,74,0.07)' }} />
      <div style={{ position: 'absolute', top: '-30vw', right: '-20vw', width: '70vw', height: '70vw', maxWidth: 700, maxHeight: 700, borderRadius: '50%', border: '1px solid rgba(184,146,74,0.06)' }} />
      <div style={{ position: 'absolute', top: 28, left: 48, fontSize: 8, letterSpacing: 3, textTransform: 'uppercase', color: 'rgba(255,255,255,0.15)' }}>
        Scénario B · Signature {String(index + 1).padStart(2, '0')}/{String(total).padStart(2, '0')} · Cosmos Angré · Mars 2026
      </div>
      <div style={{ position: 'absolute', top: '50%', left: 48, transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#B8AA8C' }} />
        <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#0D1B4B', border: '0.5px solid rgba(184,146,74,0.3)' }} />
        <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#B8924A' }} />
        <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#D4C9B0' }} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', padding: '80px 15vw 40px', textAlign: 'center', position: 'relative', zIndex: 2 }}>
        <div style={{ fontSize: 8, letterSpacing: 5, textTransform: 'uppercase', color: 'rgba(184,146,74,0.35)', marginBottom: 32 }}>Destination Premium</div>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(52px, 7vw, 96px)', fontWeight: 300, fontStyle: 'italic', color: '#fff', lineHeight: 1.05, marginBottom: 20, letterSpacing: -0.5 }}>
          {lines[0]}<br /><span style={{ color: '#B8924A' }}>{lines[1]}</span>
        </div>
        <div style={{ width: 48, height: 1, background: '#B8924A', margin: '0 auto 20px' }} />
        <div style={{ fontSize: 9.5, letterSpacing: 3, textTransform: 'uppercase', color: 'rgba(255,255,255,0.18)' }}>{sub}</div>
      </div>
      {/* Déclinaisons */}
      <div style={{ display: 'flex', borderTop: '0.5px solid rgba(184,146,74,0.08)', position: 'relative', zIndex: 2 }}>
        {declinaisons.map((d, i) => (
          <div key={i} style={{ flex: 1, padding: '28px 36px', borderRight: i < declinaisons.length - 1 ? '0.5px solid rgba(184,146,74,0.07)' : 'none' }}>
            <div style={{ fontSize: 8, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(184,146,74,0.4)', marginBottom: 8 }}>{d.num}</div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 20, fontWeight: 300, color: 'rgba(184,146,74,0.5)', lineHeight: 1.3 }}>{d.txt}</div>
          </div>
        ))}
      </div>
      <div style={{ padding: '12px 48px', background: 'rgba(0,0,0,0.4)', display: 'flex', justifyContent: 'space-between', position: 'relative', zIndex: 2 }}>
        <span style={{ fontSize: 7.5, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(255,255,255,0.12)' }}>Cosmos Angré · Stimuli B · Focus Group 20–25 Mars 2026</span>
        <span style={{ fontSize: 7.5, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(255,255,255,0.12)' }}>Confidentiel — New Heaven SA / CRMC</span>
      </div>
    </div>
  );
};

const StimuliAmbiance: React.FC = () => {
  const [tab, setTab] = useState<Tab>('pA');

  return (
    <div style={{ height: '100%', background: '#000', fontFamily: "'Montserrat', sans-serif", overflow: 'auto' }}>
      {/* NAV */}
      <div style={{ display: 'flex', position: 'sticky', top: 0, zIndex: 100, background: 'rgba(0,0,0,0.92)', borderBottom: '0.5px solid #222' }}>
        {([
          { t: 'pA' as Tab, label: 'Planche A — Proximité Premium', activeColor: '#7DC99A', borderColor: '#2F5439' },
          { t: 'pB' as Tab, label: 'Planche B — Destination Premium', activeColor: '#B8924A', borderColor: '#0D1B4B' },
          { t: 'pComp' as Tab, label: 'A vs B — Vue comparative', activeColor: '#C9943A', borderColor: '#C9943A' },
        ]).map(({ t, label, activeColor, borderColor }, idx, arr) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              flex: 1, padding: '13px 6px', border: 'none', cursor: 'pointer',
              fontFamily: "'Montserrat', sans-serif", fontSize: '8.5px', letterSpacing: '2.5px',
              textTransform: 'uppercase', fontWeight: 500,
              color: tab === t ? activeColor : 'rgba(255,255,255,0.25)',
              background: 'transparent', transition: 'all 0.3s',
              borderRight: idx < arr.length - 1 ? '0.5px solid #1a1a1a' : 'none',
              borderBottom: tab === t ? `2px solid ${borderColor}` : '2px solid transparent',
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* PLANCHE A */}
      <div style={{ display: tab === 'pA' ? 'block' : 'none' }}>
        {signaturesA.map((s, i) => (
          <PlancheA key={i} sig={s.sig} sub={s.sub} index={i} total={signaturesA.length} declinaisons={s.declinaisons} />
        ))}
      </div>

      {/* PLANCHE B */}
      <div style={{ display: tab === 'pB' ? 'block' : 'none' }}>
        {signaturesB.map((s, i) => (
          <PlancheB key={i} sig={s.sig} sub={s.sub} index={i} total={signaturesB.length} declinaisons={s.declinaisons} />
        ))}
      </div>

      {/* VUE COMPARATIVE */}
      <div style={{ display: tab === 'pComp' ? 'block' : 'none' }}>
        {/* Header */}
        <div style={{ padding: '28px 52px 24px', background: '#080808', borderBottom: '0.5px solid #1a1a1a', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, fontWeight: 300, color: '#fff', letterSpacing: 1 }}>Scénario A vs Scénario B</div>
            <div style={{ fontSize: 8, letterSpacing: 3, textTransform: 'uppercase', color: '#333', marginTop: 4 }}>Vue comparative · Focus Group Cosmos Angré · Mars 2026</div>
          </div>
          <div style={{ fontSize: 7.5, letterSpacing: 2, textTransform: 'uppercase', color: '#222' }}>Confidentiel — New Heaven SA / CRMC</div>
        </div>
        {/* Signatures côte à côte */}
        {signaturesA.map((sA, i) => {
          const sB = signaturesB[i];
          const linesA = sA.sig.split('\n');
          const linesB = sB.sig.split('\n');
          return (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 0.5px 1fr', minHeight: '100vh', borderBottom: i < signaturesA.length - 1 ? '0.5px solid #1a1a1a' : 'none' }}>
              {/* Col A */}
              <div style={{ background: '#2F5439', position: 'relative', overflow: 'hidden', display: 'grid', gridTemplateRows: '1fr auto' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(-45deg, transparent, transparent 60px, rgba(255,255,255,0.018) 60px, rgba(255,255,255,0.018) 61px)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', top: 0, right: 0, width: '20vw', height: '20vw', maxWidth: 200, maxHeight: 200, background: '#B8AA8C', opacity: 0.08, borderRadius: '0 0 0 100%' }} />
                <div style={{ position: 'absolute', bottom: '-6vw', left: '-4vw', width: '25vw', height: '25vw', maxWidth: 250, maxHeight: 250, borderRadius: '50%', border: '1px solid rgba(201,148,58,0.12)' }} />
                <div style={{ position: 'absolute', top: 24, left: 36, fontSize: 7, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)' }}>
                  Scénario A · Signature {String(i + 1).padStart(2, '0')}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', padding: '60px 10vw 30px', textAlign: 'center', position: 'relative', zIndex: 2 }}>
                  <div style={{ fontSize: 7, letterSpacing: 4, textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 24 }}>Premium de Proximité</div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 300, fontStyle: 'italic', color: '#fff', lineHeight: 1.05, marginBottom: 16, letterSpacing: -0.5 }}>
                    {linesA[0]}<br /><span style={{ color: '#D4C9B0' }}>{linesA[1]}</span>
                  </div>
                  <div style={{ width: 36, height: 1, background: '#C9943A', margin: '0 auto 16px' }} />
                  <div style={{ fontSize: 8, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)' }}>{sA.sub}</div>
                </div>
                <div style={{ display: 'flex', borderTop: '0.5px solid rgba(255,255,255,0.08)', position: 'relative', zIndex: 2 }}>
                  {sA.declinaisons.map((d, j) => (
                    <div key={j} style={{ flex: 1, padding: '20px 24px', borderRight: j === 0 ? '0.5px solid rgba(255,255,255,0.08)' : 'none' }}>
                      <div style={{ fontSize: 7, letterSpacing: 1.5, textTransform: 'uppercase', color: 'rgba(201,148,58,0.5)', marginBottom: 6 }}>{d.num}</div>
                      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 16, fontWeight: 300, color: 'rgba(255,255,255,0.5)', lineHeight: 1.3 }}>{d.txt}</div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Divider */}
              <div style={{ background: '#1a1a1a' }} />
              {/* Col B */}
              <div style={{ background: '#040A1E', position: 'relative', overflow: 'hidden', display: 'grid', gridTemplateRows: '1fr auto' }}>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '60vw', height: '60vw', maxWidth: 500, maxHeight: 500, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(184,146,74,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', top: 0, bottom: 0, left: 'calc(50% - 0.5px)', width: 1, background: 'rgba(184,146,74,0.05)' }} />
                <div style={{ position: 'absolute', top: 24, left: 36, fontSize: 7, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(255,255,255,0.15)' }}>
                  Scénario B · Signature {String(i + 1).padStart(2, '0')}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', padding: '60px 10vw 30px', textAlign: 'center', position: 'relative', zIndex: 2 }}>
                  <div style={{ fontSize: 7, letterSpacing: 4, textTransform: 'uppercase', color: 'rgba(184,146,74,0.35)', marginBottom: 24 }}>Destination Premium</div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 300, fontStyle: 'italic', color: '#fff', lineHeight: 1.05, marginBottom: 16, letterSpacing: -0.5 }}>
                    {linesB[0]}<br /><span style={{ color: '#B8924A' }}>{linesB[1]}</span>
                  </div>
                  <div style={{ width: 36, height: 1, background: '#B8924A', margin: '0 auto 16px' }} />
                  <div style={{ fontSize: 8, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(255,255,255,0.16)' }}>{sB.sub}</div>
                </div>
                <div style={{ display: 'flex', borderTop: '0.5px solid rgba(184,146,74,0.08)', position: 'relative', zIndex: 2 }}>
                  {sB.declinaisons.map((d, j) => (
                    <div key={j} style={{ flex: 1, padding: '20px 24px', borderRight: j === 0 ? '0.5px solid rgba(184,146,74,0.07)' : 'none' }}>
                      <div style={{ fontSize: 7, letterSpacing: 1.5, textTransform: 'uppercase', color: 'rgba(184,146,74,0.4)', marginBottom: 6 }}>{d.num}</div>
                      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 16, fontWeight: 300, color: 'rgba(184,146,74,0.5)', lineHeight: 1.3 }}>{d.txt}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
        {/* Footer */}
        <div style={{ padding: '12px 52px', background: '#050505', borderTop: '0.5px solid #111', display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 7.5, letterSpacing: 2, textTransform: 'uppercase', color: '#222' }}>Cosmos Angré · Vue comparative A vs B · Focus Group 20–25 Mars 2026</span>
          <span style={{ fontSize: 7.5, letterSpacing: 2, textTransform: 'uppercase', color: '#222' }}>Confidentiel — New Heaven SA / CRMC</span>
        </div>
      </div>
    </div>
  );
};

export default StimuliAmbiance;
