import React from 'react';
import { Star, XCircle, CheckCircle2 } from 'lucide-react';

const criteria = [
  { title: 'Loyers premium', detail: '25 000 – 45 000 FCFA/m²/mois (vs marché 15 000 – 20 000)', icon: <Star size={16} /> },
  { title: 'CA seuil enseignes', detail: 'Minimum 150 M FCFA/an par enseigne', icon: <Star size={16} /> },
  { title: 'Services premium', detail: 'Conciergerie, valet parking, personal shopping, espace VIP', icon: <Star size={16} /> },
  { title: 'Exclusions', detail: 'Pas de marché alimentaire ouvert, pas de discount, pas de friperie', icon: <XCircle size={16} /> },
];

const rentGrid = [
  { centre: 'Cosmos Angré (cible)', min: '25 000', max: '45 000', note: 'Premium', highlight: true },
  { centre: 'Cap Sud', min: '20 000', max: '35 000', note: 'Premium fonctionnel', highlight: false },
  { centre: 'Abidjan Mall', min: '18 000', max: '28 000', note: 'Mid-premium', highlight: false },
  { centre: 'PlaYce Palmeraie', min: '15 000', max: '22 000', note: 'Mainstream+', highlight: false },
];

const services = [
  'Conciergerie multilingue (FR/EN/AR)',
  'Service valet parking',
  'Personal shopping sur rendez-vous',
  'Espace lounge VIP',
  'Wi-Fi haut débit gratuit',
  'Programme fidélité Cosmos Gold',
  'Service de livraison véhicule',
  'Nurserie & espace enfants premium',
];

const DefinitionPremium: React.FC = () => (
  <section id="definition-premium" className="px-4 sm:px-8 lg:px-[72px] py-12">
    <div className="bg-white rounded-2xl border border-black/[.06] overflow-hidden shadow-[0_2px_20px_rgba(0,0,0,.04)]">
      {/* Header */}
      <div className="relative px-8 py-8 bg-gradient-to-br from-navy via-[#16213e] to-navy overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_30%,rgba(201,148,58,.12)_0%,transparent_60%)]" />
        <div className="relative z-10">
          <div className="text-[9px] font-bold tracking-[.22em] uppercase text-gold/70 mb-2">Positionnement</div>
          <div className="font-cormorant text-[32px] text-white font-light leading-tight">
            Définition du Premium — Critères & Standards
          </div>
        </div>
      </div>

      <div className="px-8 py-8 space-y-8">
        {/* Critères */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {criteria.map((c, i) => (
            <div key={i} className="rounded-xl border border-black/[.06] bg-cream/40 p-5 flex items-start gap-4">
              <div className={`mt-0.5 ${i === 3 ? 'text-red-400' : 'text-gold'}`}>{c.icon}</div>
              <div>
                <div className="text-[13px] font-semibold text-navy">{c.title}</div>
                <div className="text-[12px] text-black/60 mt-1">{c.detail}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Grille loyers */}
        <div>
          <div className="text-[9px] font-bold tracking-[.22em] uppercase text-black/40 mb-4">
            Grille comparative des loyers (FCFA/m²/mois)
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-[12px]">
              <thead>
                <tr className="bg-navy text-white text-left">
                  <th className="px-4 py-3 font-semibold rounded-tl-lg">Centre commercial</th>
                  <th className="px-4 py-3 font-semibold">Min</th>
                  <th className="px-4 py-3 font-semibold">Max</th>
                  <th className="px-4 py-3 font-semibold rounded-tr-lg">Positionnement</th>
                </tr>
              </thead>
              <tbody>
                {rentGrid.map((r, i) => (
                  <tr key={r.centre} className={r.highlight ? 'bg-gold/10 font-semibold' : i % 2 === 0 ? 'bg-cream/40' : 'bg-white'}>
                    <td className="px-4 py-3 text-navy">{r.centre}</td>
                    <td className="px-4 py-3 text-black/70">{r.min}</td>
                    <td className="px-4 py-3 text-black/70">{r.max}</td>
                    <td className="px-4 py-3 text-black/60">{r.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Standards de service */}
        <div>
          <div className="text-[9px] font-bold tracking-[.22em] uppercase text-black/40 mb-4">
            Standards de service premium
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {services.map((s) => (
              <div key={s} className="flex items-center gap-2.5 py-2">
                <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                <span className="text-[13px] text-navy/80">{s}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default DefinitionPremium;
