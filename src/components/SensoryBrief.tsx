import React from 'react';
import { Music, Wind, Volume2 } from 'lucide-react';
import type { ScenarioKey } from './Scenarios';

const data: Record<ScenarioKey, {
  sound: { genre: string; instruments: string; ambiance: string };
  scent: { notes: string; famille: string; intensite: string };
  tempo: { bpm: string; volume: string; note: string };
}> = {
  A: {
    sound: { genre: 'Afrobeat doux, Highlife revisité', instruments: 'Kora, percussions légères, balafon, voix chaleureuses', ambiance: 'Marché d\'Adjamé sublimé — vie, conversation, rythme doux' },
    scent: { notes: 'Beurre de karité, bois de santal, fleur d\'oranger', famille: 'Boisé-gourmand — chaleur enveloppante', intensite: 'Modérée — présente mais jamais envahissante' },
    tempo: { bpm: '90–110 BPM', volume: 'Modéré — musique de fond conversationnelle', note: 'La musique accompagne sans dominer. Les conversations restent possibles partout.' },
  },
  B: {
    sound: { genre: 'Lounge jazz, Deep house feutrée', instruments: 'Piano feutré, basses profondes, saxophone doux, beats électro subtils', ambiance: 'Lobby d\'hôtel 5 étoiles — raffinement, exclusivité' },
    scent: { notes: 'Cuir, ambre gris, oud, note de champagne', famille: 'Oriental-cuiré — sophistication absolue', intensite: 'Subtile — signature olfactive reconnaissable mais discrète' },
    tempo: { bpm: '70–90 BPM', volume: 'Bas — ambiance feutrée exclusive', note: 'Le silence est aussi premium que la musique. Alterner zones sonores et zones de calme.' },
  },
  C: {
    sound: { genre: 'Electronic ambient, Neo-tropical', instruments: 'Synthés organiques, sons de nature (eau, oiseaux), beats doux, harpe', ambiance: 'Forêt enchantée futuriste — émerveillement sonore' },
    scent: { notes: 'Vétiver, feuille de figuier, écorce de cèdre', famille: 'Vert-boisé — fraîcheur mystérieuse', intensite: 'Variable par zone — plus intense dans les espaces végétalisés' },
    tempo: { bpm: '80–100 BPM', volume: 'Variable par zone — transitions fluides', note: 'Le paysage sonore évolue avec le parcours. Chaque zone a sa propre signature acoustique.' },
  },
  D: {
    sound: { genre: 'Nature sounds, Ambient minimal', instruments: 'Sons naturels purs, fontaines, bruissement de feuilles, wind chimes, flûte', ambiance: 'Jardin botanique — sérénité, contemplation' },
    scent: { notes: 'Herbe fraîche coupée, jasmin, terre après la pluie (pétrichor)', famille: 'Vert-floral — naturalité pure', intensite: 'Légère — la nature parle d\'elle-même' },
    tempo: { bpm: '60–80 BPM', volume: 'Très bas — sons naturels dominants', note: 'La musique est presque absente. Laisser les sons du jardin (eau, oiseaux, vent) créer l\'ambiance.' },
  },
};

const accents: Record<ScenarioKey, { main: string; rgb: string }> = {
  A: { main: '#4A7558', rgb: '74,117,88' },
  B: { main: '#0D1B4B', rgb: '13,27,75' },
  C: { main: '#C9943A', rgb: '201,148,58' },
  D: { main: '#898D5D', rgb: '137,141,93' },
};

export default function SensoryBrief({ scenarioKey }: { scenarioKey: ScenarioKey }) {
  const ac = accents[scenarioKey];
  const d = data[scenarioKey];

  const cardStyle: React.CSSProperties = {
    background: '#fff',
    border: '1px solid rgba(0,0,0,0.06)',
    borderRadius: 14,
    overflow: 'hidden',
  };

  return (
    <div id="bw-sensory" style={{ paddingTop: 48 }}>
      <div style={{ fontSize: 9, letterSpacing: 3, textTransform: 'uppercase', color: ac.main, fontWeight: 600, marginBottom: 8 }}>B11 · Brief sensoriel</div>
      <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, fontWeight: 300, color: '#1a1a2e', marginBottom: 8 }}>Identité sonore & olfactive</div>
      <div style={{ fontSize: 11, color: 'rgba(0,0,0,0.45)', marginBottom: 32 }}>La marque se vit aussi par l'ouïe et l'odorat — brief pour les prestataires</div>
      <div style={{ width: 40, height: 2, background: ac.main, marginBottom: 40, opacity: 0.4 }} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
        {/* Sound */}
        <div style={cardStyle}>
          <div style={{ background: `rgba(${ac.rgb},0.06)`, padding: '20px 24px', borderBottom: '1px solid rgba(0,0,0,0.04)', display: 'flex', alignItems: 'center', gap: 10 }}>
            <Music size={18} color={ac.main} />
            <div style={{ fontSize: 12, fontWeight: 600, color: '#1a1a2e' }}>Identité sonore</div>
          </div>
          <div style={{ padding: 24 }}>
            {[
              { label: 'Genre', value: d.sound.genre },
              { label: 'Instruments', value: d.sound.instruments },
              { label: 'Ambiance', value: d.sound.ambiance },
            ].map((item, i) => (
              <div key={i} style={{ marginBottom: i < 2 ? 16 : 0 }}>
                <div style={{ fontSize: 8, letterSpacing: 2, textTransform: 'uppercase', color: ac.main, fontWeight: 600, marginBottom: 4 }}>{item.label}</div>
                <div style={{ fontSize: 11, color: 'rgba(0,0,0,0.6)', lineHeight: 1.6 }}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scent */}
        <div style={cardStyle}>
          <div style={{ background: `rgba(${ac.rgb},0.06)`, padding: '20px 24px', borderBottom: '1px solid rgba(0,0,0,0.04)', display: 'flex', alignItems: 'center', gap: 10 }}>
            <Wind size={18} color={ac.main} />
            <div style={{ fontSize: 12, fontWeight: 600, color: '#1a1a2e' }}>Signature olfactive</div>
          </div>
          <div style={{ padding: 24 }}>
            {[
              { label: 'Notes', value: d.scent.notes },
              { label: 'Famille', value: d.scent.famille },
              { label: 'Intensité', value: d.scent.intensite },
            ].map((item, i) => (
              <div key={i} style={{ marginBottom: i < 2 ? 16 : 0 }}>
                <div style={{ fontSize: 8, letterSpacing: 2, textTransform: 'uppercase', color: ac.main, fontWeight: 600, marginBottom: 4 }}>{item.label}</div>
                <div style={{ fontSize: 11, color: 'rgba(0,0,0,0.6)', lineHeight: 1.6 }}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tempo */}
        <div style={cardStyle}>
          <div style={{ background: `rgba(${ac.rgb},0.06)`, padding: '20px 24px', borderBottom: '1px solid rgba(0,0,0,0.04)', display: 'flex', alignItems: 'center', gap: 10 }}>
            <Volume2 size={18} color={ac.main} />
            <div style={{ fontSize: 12, fontWeight: 600, color: '#1a1a2e' }}>Tempo & Volume</div>
          </div>
          <div style={{ padding: 24 }}>
            {[
              { label: 'BPM', value: d.tempo.bpm },
              { label: 'Volume', value: d.tempo.volume },
              { label: 'Note', value: d.tempo.note },
            ].map((item, i) => (
              <div key={i} style={{ marginBottom: i < 2 ? 16 : 0 }}>
                <div style={{ fontSize: 8, letterSpacing: 2, textTransform: 'uppercase', color: ac.main, fontWeight: 600, marginBottom: 4 }}>{item.label}</div>
                <div style={{ fontSize: 11, color: 'rgba(0,0,0,0.6)', lineHeight: 1.6 }}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 24, background: `rgba(${ac.rgb},0.06)`, border: `1px solid rgba(${ac.rgb},0.15)`, padding: '16px 24px', fontSize: 10.5, color: '#1a1a2e', lineHeight: 1.7 }}>
        <strong style={{ color: ac.main, fontSize: 9, letterSpacing: 2, textTransform: 'uppercase' }}>Brief prestataire</strong>
        <div style={{ marginTop: 8 }}>Ce brief est destiné aux agences de design sonore et aux créateurs de parfums d'ambiance. Les solutions retenues devront être <strong>testées en conditions réelles</strong> pendant 2 semaines avant déploiement définitif. Prévoir des <strong>variantes saisonnières</strong> (saison sèche / saison des pluies).</div>
      </div>
    </div>
  );
}
