import React from 'react';
import { Globe, Lightbulb } from 'lucide-react';

const benchmarks = [
  {
    name: 'Two Rivers Mall',
    city: 'Nairobi, Kenya',
    surface: '67 000 m²',
    enseignes: '200+',
    position: 'Lifestyle premium',
    occupation: '92%',
    lesson: 'Mix retail + loisirs + food court haut de gamme = fréquentation récurrente',
    color: '#4A7558',
  },
  {
    name: 'Morocco Mall',
    city: 'Casablanca, Maroc',
    surface: '200 000 m²',
    enseignes: '600',
    position: 'Destination touristique',
    occupation: '95%',
    lesson: 'Anchor tenant international (Galeries Lafayette) = crédibilité immédiate',
    color: '#C9943A',
  },
  {
    name: 'Ikeja City Mall',
    city: 'Lagos, Nigeria',
    surface: '22 000 m²',
    enseignes: '75',
    position: 'Premier mall moderne',
    occupation: '88%',
    lesson: 'Format compact + forte identité locale = succès sur marché émergent',
    color: '#8B7355',
  },
  {
    name: 'Sea Plaza',
    city: 'Dakar, Sénégal',
    surface: '18 000 m²',
    enseignes: '60',
    position: 'Premium Afrique de l\'Ouest',
    occupation: '85%',
    lesson: 'Benchmark direct — même zone géographique, même cible CSP A/B',
    color: '#e65100',
  },
];

const learnings = [
  'Un anchor tenant premium international crédibilise l\'ensemble du centre et accélère le remplissage',
  'Le mix retail + food & beverage + expérience (cinéma, spa) génère 2,5× plus de temps passé',
  'Les formats compacts (< 30 000 m²) peuvent surperformer en taux d\'occupation sur les marchés émergents',
  'La fidélisation digitale (app, CRM) est un différenciateur majeur vs concurrence traditionnelle',
];

const BenchmarkInternational: React.FC = () => (
  <section id="benchmark-international" className="px-4 sm:px-8 lg:px-[72px] py-12">
    <div className="bg-white rounded-2xl border border-black/[.06] overflow-hidden shadow-[0_2px_20px_rgba(0,0,0,.04)]">
      {/* Header */}
      <div className="relative px-8 py-8 bg-gradient-to-br from-navy via-[#16213e] to-navy overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_30%,rgba(201,148,58,.12)_0%,transparent_60%)]" />
        <div className="relative z-10">
          <div className="text-[9px] font-bold tracking-[.22em] uppercase text-gold/70 mb-2">Benchmark</div>
          <div className="font-cormorant text-[32px] text-white font-light leading-tight">
            Benchmark International — 4 Malls Africains de Référence
          </div>
        </div>
      </div>

      <div className="px-8 py-8 space-y-8">
        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {benchmarks.map((b) => (
            <div key={b.name} className="rounded-xl border border-black/[.06] overflow-hidden">
              <div className="h-1" style={{ background: b.color }} />
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Globe size={14} style={{ color: b.color }} />
                  <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: b.color }}>
                    {b.city}
                  </span>
                </div>
                <div className="text-[15px] font-semibold text-navy mb-3">{b.name}</div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[11px]">
                  <div><span className="text-black/40">Surface :</span> <span className="text-navy font-medium">{b.surface}</span></div>
                  <div><span className="text-black/40">Enseignes :</span> <span className="text-navy font-medium">{b.enseignes}</span></div>
                  <div><span className="text-black/40">Position :</span> <span className="text-navy font-medium">{b.position}</span></div>
                  <div><span className="text-black/40">Occupation :</span> <span className="text-navy font-medium">{b.occupation}</span></div>
                </div>
                <div className="mt-3 pt-3 border-t border-black/[.06] flex items-start gap-2">
                  <Lightbulb size={13} className="text-gold mt-0.5 shrink-0" />
                  <span className="text-[11px] text-black/60 italic">{b.lesson}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enseignements */}
        <div className="rounded-xl border border-gold/20 bg-gold/5 p-6">
          <div className="text-[10px] font-bold uppercase tracking-wider text-gold mb-4">
            Enseignements clés pour Cosmos Angré
          </div>
          <div className="space-y-3">
            {learnings.map((l, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-gold/10 text-gold text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                <span className="text-[12px] text-navy/80 leading-relaxed">{l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default BenchmarkInternational;
