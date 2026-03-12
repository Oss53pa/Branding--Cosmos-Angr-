import React from 'react';
import { Shield, ArrowRight } from 'lucide-react';

const GOLD = '#C9943A';
const RGB = '201,148,58';

interface RaciRow {
  action: string;
  pame: string;
  fernand: string;
  hadja: string;
  yvan: string;
  exco: string;
}

const raciData: RaciRow[] = [
  { action: 'Définition du positionnement de marque', pame: 'A', fernand: 'C', hadja: 'I', yvan: 'C', exco: 'R' },
  { action: 'Choix du scénario directionnel', pame: 'A', fernand: 'C', hadja: 'I', yvan: 'C', exco: 'R' },
  { action: 'Validation des créations graphiques finales', pame: 'R', fernand: 'A', hadja: 'I', yvan: 'C', exco: 'I' },
  { action: 'Production des supports (identité, signalétique, print)', pame: 'I', fernand: 'R', hadja: 'I', yvan: 'I', exco: 'A' },
  { action: 'Usage quotidien de la charte (réseaux, affichage standard)', pame: 'R', fernand: 'C', hadja: 'A', yvan: 'I', exco: 'I' },
  { action: 'Campagnes publicitaires et événements', pame: 'A', fernand: 'C', hadja: 'C', yvan: 'R', exco: 'A' },
  { action: 'Conformité enseigne / tenant guidelines', pame: 'R', fernand: 'I', hadja: 'A', yvan: 'I', exco: 'I' },
  { action: 'Évolutions identitaires majeures', pame: 'C', fernand: 'C', hadja: 'I', yvan: 'C', exco: 'R' },
  { action: 'Partenariats stratégiques impliquant la marque', pame: 'A', fernand: 'I', hadja: 'I', yvan: 'C', exco: 'R' },
  { action: 'Benchmarks marché & veille concurrentielle', pame: 'C', fernand: 'I', hadja: 'I', yvan: 'R', exco: 'I' },
];

const raciColors: Record<string, { bg: string; text: string }> = {
  R: { bg: 'bg-emerald-100', text: 'text-emerald-700' },
  A: { bg: 'bg-gold/15', text: 'text-amber-700' },
  C: { bg: 'bg-blue-100', text: 'text-blue-700' },
  I: { bg: 'bg-black/[.04]', text: 'text-black/40' },
};

const actors = [
  { short: 'Pame', full: 'Pame (SDR)' },
  { short: 'Fernand', full: 'Fernand (Designer)' },
  { short: 'Hadja', full: 'Hadja (Center Manager)' },
  { short: 'Yvan', full: 'Yvan Guehi (Consultant)' },
  { short: 'EXCO', full: 'EXCO (Cheick, Mariama, Julien)' },
];

const validationLevels = [
  { level: 'Niveau 1', who: 'Pame (SDR)', scope: 'Usage quotidien, posts réseaux sociaux, signalétique standard, campagnes publicitaires, événements, partenariats commerciaux', color: '#16a34a' },
  { level: 'Niveau 2', who: 'Pame (SDR) → Fernand', scope: 'Production graphique, créations visuelles, supports de communication', color: GOLD },
  { level: 'Niveau 3', who: 'EXCO (Cheick, Mariama, Julien)', scope: 'Évolutions identitaires, partenariats stratégiques, refonte majeure', color: '#dc2626' },
];

const controlTools = [
  { tool: 'Brand Book digital', desc: 'Ce document — référence unique et centralisée pour toutes les décisions de marque. Mis à jour trimestriellement.', freq: 'Référence permanente' },
  { tool: 'Kit média téléchargeable', desc: 'Logos (tous formats), templates (PPT, social, print), polices officielles. Accessible via un lien protégé par mot de passe.', freq: 'Mis à jour à chaque évolution' },
  { tool: 'Checklist validation enseigne', desc: 'Formulaire standardisé que chaque nouveau locataire doit compléter avant installation. Vérification façade, signalétique, matériaux.', freq: 'À chaque nouvelle enseigne' },
  { tool: 'Audit de cohérence', desc: 'Revue terrain trimestrielle de tous les points de contact : signalétique, propreté, conformité enseignes, état des supports.', freq: 'Trimestriel' },
];

const GouvernanceMarque: React.FC = () => (
  <section id="gouvernance-marque" className="px-4 sm:px-8 lg:px-[72px] py-12">
    <div className="bg-white rounded-2xl border border-black/[.06] overflow-hidden shadow-[0_2px_20px_rgba(0,0,0,.04)]">
      {/* Header */}
      <div className="relative px-8 py-8 bg-gradient-to-br from-navy via-[#16213e] to-navy overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_30%,rgba(201,148,58,.12)_0%,transparent_60%)]" />
        <div className="relative z-10">
          <div className="text-[9px] font-bold tracking-[.22em] uppercase text-gold/70 mb-2">Gouvernance de Marque</div>
          <div className="font-cormorant text-[32px] text-white font-light leading-tight">
            Organisation, circuit de validation et responsabilités
          </div>
          <div className="text-[11px] text-white/50 mt-1.5">Matrice RACI · Circuit de validation · Outils de contrôle</div>
        </div>
      </div>

      <div className="px-8 py-8 space-y-8">
        {/* Matrice RACI */}
        <div>
          <div className="text-[9px] font-bold tracking-[.22em] uppercase text-black/40 mb-4">
            Matrice RACI — Responsabilités
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-[11px]">
              <thead>
                <tr className="bg-navy text-white text-left">
                  <th className="px-4 py-3 font-semibold rounded-tl-lg min-w-[220px]">Décision / Action</th>
                  {actors.map((a) => (
                    <th key={a.short} className="px-3 py-3 font-semibold text-center text-[10px]">
                      <div>{a.short}</div>
                      <div className="text-white/40 text-[8px] font-normal">{a.full.replace(`${a.short}`, '').replace('(', '').replace(')', '').trim()}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {raciData.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-cream/40' : 'bg-white'}>
                    <td className="px-4 py-2.5 text-navy font-medium text-[11px]">{row.action}</td>
                    {[row.pame, row.fernand, row.hadja, row.yvan, row.exco].map((val, j) => {
                      const style = raciColors[val] || raciColors.I;
                      return (
                        <td key={j} className="px-3 py-2.5 text-center">
                          <span className={`inline-flex items-center justify-center w-7 h-7 rounded-lg text-[11px] font-bold ${style.bg} ${style.text}`}>
                            {val}
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Légende RACI */}
          <div className="flex gap-6 mt-4 text-[10px] text-black/50">
            <span><span className="inline-block w-5 h-5 rounded bg-emerald-100 text-emerald-700 text-center font-bold text-[9px] leading-5 mr-1">R</span> Responsable de l'exécution</span>
            <span><span className="inline-block w-5 h-5 rounded bg-gold/15 text-amber-700 text-center font-bold text-[9px] leading-5 mr-1">A</span> Approbateur</span>
            <span><span className="inline-block w-5 h-5 rounded bg-blue-100 text-blue-700 text-center font-bold text-[9px] leading-5 mr-1">C</span> Consulté</span>
            <span><span className="inline-block w-5 h-5 rounded bg-black/[.04] text-black/40 text-center font-bold text-[9px] leading-5 mr-1">I</span> Informé</span>
          </div>

          {/* Note décisionnaire */}
          <div className="mt-4 rounded-xl border border-gold/20 bg-gold/5 px-5 py-3 flex items-start gap-3">
            <Shield size={14} className="text-gold mt-0.5 shrink-0" />
            <p className="text-[11px] text-navy/80 leading-relaxed">
              <strong>Note :</strong> Au sein de l'EXCO, <strong>Cheick Sanankoua (PDG)</strong> dispose du statut de décisionnaire final sur toute décision stratégique de marque.
            </p>
          </div>
        </div>

        {/* Circuit de validation */}
        <div>
          <div className="text-[9px] font-bold tracking-[.22em] uppercase text-black/40 mb-4">
            Circuit de validation
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-black/[.06] rounded-xl overflow-hidden">
            {validationLevels.map((l, i) => (
              <div key={i} className="bg-white p-6 relative" style={{ borderRight: i < 2 ? '1px solid rgba(0,0,0,0.06)' : 'none' }}>
                {i < 2 && (
                  <div className="absolute right-[-10px] top-1/2 -translate-y-1/2 z-10 hidden md:block">
                    <ArrowRight size={16} className="text-black/15" />
                  </div>
                )}
                <div className="w-2 h-2 rounded-full mb-3" style={{ background: l.color }} />
                <div className="text-[9px] font-bold uppercase tracking-wider mb-1" style={{ color: l.color }}>{l.level}</div>
                <div className="font-cormorant text-[18px] font-semibold text-navy mb-2">{l.who}</div>
                <div className="text-[11px] text-black/60 leading-relaxed">{l.scope}</div>
              </div>
            ))}
          </div>


        </div>

        {/* Outils de contrôle */}
        <div>
          <div className="text-[9px] font-bold tracking-[.22em] uppercase text-black/40 mb-4">
            Outils de contrôle
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {controlTools.map((t, i) => (
              <div key={i} className="rounded-xl border border-black/[.06] overflow-hidden flex">
                <div className="w-1 shrink-0" style={{ background: GOLD }} />
                <div className="p-5 flex-1">
                  <div className="text-[12px] font-semibold text-navy mb-1">{t.tool}</div>
                  <div className="text-[11px] text-black/60 leading-relaxed mb-2">{t.desc}</div>
                  <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: GOLD }}>{t.freq}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default GouvernanceMarque;
