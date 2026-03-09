import React from 'react';
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
          defaultValue="Plan Marketing — Catalogue de reference"
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
        defaultValue="Strategie . Brand Book . Focus Group . Plan Marketing . 2026"
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
          { n: '4', l: 'Etapes' },
          { n: '14', l: 'Livrables' },
          { n: '3', l: 'Scenarios' },
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
  </div>
);

export default Cover;
