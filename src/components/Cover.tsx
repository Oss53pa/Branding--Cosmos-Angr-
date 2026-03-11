import React from 'react';
import { Layers } from 'lucide-react';
import CosmosLogo from './CosmosLogo';
import EditableText from './EditableText';

const Cover: React.FC = () => (
  <div
    id="cover"
    className="bg-navy min-h-screen flex flex-col justify-center items-center text-center px-20 py-16 relative overflow-hidden"
  >
    {/* Decorative background layers */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_40%,rgba(201,148,58,.12)_0%,transparent_55%)]" />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_80%,rgba(201,148,58,.06)_0%,transparent_50%)]" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(139,115,85,.08)_0%,transparent_40%)]" />

    {/* Subtle grid pattern */}
    <div className="absolute inset-0 opacity-[.03]" style={{
      backgroundImage: 'linear-gradient(rgba(201,148,58,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,148,58,1) 1px, transparent 1px)',
      backgroundSize: '80px 80px',
    }} />

    {/* Corner decorations */}
    <div className="absolute top-12 left-12 w-24 h-24 border-t border-l border-gold/20 rounded-tl-lg" />
    <div className="absolute top-12 right-12 w-24 h-24 border-t border-r border-gold/20 rounded-tr-lg" />
    <div className="absolute bottom-12 left-12 w-24 h-24 border-b border-l border-gold/20 rounded-bl-lg" />
    <div className="absolute bottom-12 right-12 w-24 h-24 border-b border-r border-gold/20 rounded-br-lg" />

    {/* Floating decorative circles */}
    <div className="absolute top-[15%] right-[10%] w-64 h-64 rounded-full border border-gold/[.06]" />
    <div className="absolute bottom-[20%] left-[8%] w-48 h-48 rounded-full border border-gold/[.04]" />
    <div className="absolute top-[40%] left-[5%] w-3 h-3 rounded-full bg-gold/20" />
    <div className="absolute top-[25%] right-[15%] w-2 h-2 rounded-full bg-gold/15" />
    <div className="absolute bottom-[30%] right-[8%] w-2.5 h-2.5 rounded-full bg-gold/10" />

    <div className="relative z-10 max-w-[720px]">
      {/* Top line */}
      <div className="flex items-center justify-center gap-4 mb-8">
        <div className="w-16 h-px bg-gradient-to-r from-transparent to-gold/40" />
        <EditableText
          storageKey="cover-eyebrow"
          defaultValue="Plan Marketing — Catalogue de référence"
          className="text-[10px] font-bold tracking-[.3em] uppercase text-gold/80"
        />
        <div className="w-16 h-px bg-gradient-to-l from-transparent to-gold/40" />
      </div>

      {/* Logo */}
      <div className="mb-6 flex justify-center">
        <CosmosLogo height={100} />
      </div>

      {/* Subtitle */}
      <EditableText
        storageKey="cover-subtitle"
        defaultValue="Stratégie . Brand Book . Focus Group . Plan Marketing . 2026"
        className="text-[15px] text-white/40 mb-14 tracking-[.15em] font-light"
      />

      {/* Decorative divider */}
      <div className="flex items-center justify-center gap-3 mb-12">
        <div className="w-12 h-px bg-gradient-to-r from-transparent to-gold/50" />
        <div className="w-2 h-2 rotate-45 border border-gold/50" />
        <div className="w-20 h-px bg-gold/50" />
        <div className="w-2 h-2 rotate-45 border border-gold/50" />
        <div className="w-12 h-px bg-gradient-to-l from-transparent to-gold/50" />
      </div>

      {/* Stats */}
      <div className="flex gap-12 justify-center flex-wrap">
        {[
          { n: '4', l: 'Étapes' },
          { n: '14', l: 'Livrables' },
          { n: '4', l: 'Scénarios' },
          { n: 'Q4', l: 'Ouverture 2026' },
        ].map((s) => (
          <div key={s.l} className="text-center group">
            <div className="font-cormorant text-5xl text-gold font-light mb-1 transition-transform group-hover:scale-110">
              {s.n}
            </div>
            <div className="text-[9px] text-white/30 tracking-[.15em] uppercase font-medium">
              {s.l}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom badge */}
      <div className="mt-16 inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-gold/20 bg-gold/[.06] backdrop-blur-sm">
        <div className="w-2 h-2 rounded-full bg-gold/60 animate-pulse" />
        <span className="text-[10px] text-gold/70 tracking-[.12em] uppercase font-medium">
          Document confidentiel — EXCO / Cheick
        </span>
      </div>
    </div>

    {/* Identité architecturale — Palette matières */}
    <div className="relative z-10 w-full max-w-[1100px] mt-20 mb-4 px-4">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center text-gold">
          <Layers size={16} strokeWidth={1.5} />
        </div>
        <div>
          <div className="text-[9px] font-bold tracking-[.25em] uppercase text-gold/50">Identité architecturale</div>
          <div className="font-cormorant text-[22px] font-light text-white/80 leading-tight">Palette matières définitive</div>
        </div>
        <div className="h-px flex-1 bg-gold/10" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {/* Façade extérieure */}
        <div className="rounded-2xl overflow-hidden border border-white/[.06] bg-navy/60 backdrop-blur-sm">
          <div className="h-20 relative" style={{ background: '#B8AA8C' }}>
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 8px, rgba(0,0,0,.08) 8px, rgba(0,0,0,.08) 9px)' }} />
            <div className="absolute bottom-2 right-2 text-[8px] font-mono font-bold px-1.5 py-0.5 rounded bg-black/30 text-white/80">#B8AA8C</div>
          </div>
          <div className="px-3 py-2.5">
            <div className="text-[10px] font-semibold text-white/70 mb-0.5">Façade extérieure</div>
            <div className="text-[8px] text-white/30 leading-relaxed">Aluminium nervuré mat</div>
            <div className="text-[8px] text-gold/50 mt-0.5 font-medium">Grège doré</div>
          </div>
        </div>

        {/* Têtes de mur — Kutu Baffle */}
        <div className="rounded-2xl overflow-hidden border border-white/[.06] bg-navy/60 backdrop-blur-sm">
          <div className="h-20 relative" style={{ background: '#7A5C42' }}>
            <div className="absolute inset-0 opacity-15" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,.12) 3px, rgba(0,0,0,.12) 4px)' }} />
            <div className="absolute bottom-2 right-2 text-[8px] font-mono font-bold px-1.5 py-0.5 rounded bg-black/30 text-white/80">#7A5C42</div>
          </div>
          <div className="px-3 py-2.5">
            <div className="text-[10px] font-semibold text-white/70 mb-0.5">Têtes de mur</div>
            <div className="text-[8px] text-white/30 leading-relaxed">Kutu Baffle noyer fumé</div>
            <div className="text-[8px] text-gold/50 mt-0.5 font-medium">Brun noyer</div>
          </div>
        </div>

        {/* Murs intérieurs — Terracotta */}
        <div className="rounded-2xl overflow-hidden border border-white/[.06] bg-navy/60 backdrop-blur-sm">
          <div className="h-20 relative overflow-hidden">
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #C2724A 0%, #D4885C 50%, #B8643E 100%)' }} />
            <div className="absolute bottom-2 right-2 text-[8px] font-mono font-bold px-1.5 py-0.5 rounded bg-black/30 text-white/80">RAL 040</div>
          </div>
          <div className="px-3 py-2.5">
            <div className="text-[10px] font-semibold text-white/70 mb-0.5">Murs intérieurs</div>
            <div className="text-[8px] text-white/30 leading-relaxed">Teja + Ignero RAL 040</div>
            <div className="text-[8px] text-gold/50 mt-0.5 font-medium">Terracotta</div>
          </div>
        </div>

        {/* Sol — Terrazo */}
        <div className="rounded-2xl overflow-hidden border border-white/[.06] bg-navy/60 backdrop-blur-sm">
          <div className="h-20 relative" style={{ background: '#D4C9B0' }}>
            <div className="absolute inset-0 opacity-40" style={{
              backgroundImage: 'radial-gradient(circle 2px, rgba(255,255,255,.6) 0%, transparent 100%), radial-gradient(circle 1.5px, rgba(200,190,170,.5) 0%, transparent 100%), radial-gradient(circle 3px, rgba(240,235,220,.4) 0%, transparent 100%)',
              backgroundSize: '18px 18px, 12px 14px, 22px 20px',
              backgroundPosition: '0 0, 6px 8px, 14px 4px',
            }} />
            <div className="absolute bottom-2 right-2 text-[8px] font-mono font-bold px-1.5 py-0.5 rounded bg-black/30 text-white/80">#D4C9B0</div>
          </div>
          <div className="px-3 py-2.5">
            <div className="text-[10px] font-semibold text-white/70 mb-0.5">Sol</div>
            <div className="text-[8px] text-white/30 leading-relaxed">Terrazo granito beige</div>
            <div className="text-[8px] text-gold/50 mt-0.5 font-medium">Éclats lumineux</div>
          </div>
        </div>

        {/* Végétation */}
        <div className="rounded-2xl overflow-hidden border border-white/[.06] bg-navy/60 backdrop-blur-sm">
          <div className="h-20 relative overflow-hidden">
            <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, #2D5A3D 0%, #3A7A4E 40%, #4A8C5A 70%, #2D5A3D 100%)' }} />
            <svg className="absolute inset-0 w-full h-full opacity-15" viewBox="0 0 100 100">
              <path d="M20,80 Q30,40 50,30 Q45,55 20,80Z" fill="white" />
              <path d="M60,90 Q65,50 80,35 Q78,60 60,90Z" fill="white" />
              <path d="M40,70 Q48,45 65,40 Q58,55 40,70Z" fill="white" />
            </svg>
            <div className="absolute bottom-2 right-2 text-[8px] font-mono font-bold px-1.5 py-0.5 rounded bg-black/30 text-white/80">Naturel</div>
          </div>
          <div className="px-3 py-2.5">
            <div className="text-[10px] font-semibold text-white/70 mb-0.5">Végétation</div>
            <div className="text-[8px] text-white/30 leading-relaxed">Arbres tropicaux intégrés</div>
            <div className="text-[8px] text-gold/50 mt-0.5 font-medium">Verts naturels</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Cover;
