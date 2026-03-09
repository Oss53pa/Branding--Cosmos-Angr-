import React from 'react';
import EditableText from './EditableText';

interface SectionHeaderProps {
  id: string;
  eyebrow: string;
  title: string;
  desc?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ id, eyebrow, title, desc }) => (
  <div id={id} className="relative overflow-hidden">
    {/* Full-width hero band */}
    <div className="relative bg-gradient-to-br from-navy via-[#16213e] to-navy px-4 sm:px-8 lg:px-[72px] py-20">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(201,148,58,.08)_0%,transparent_60%)]" />
      <div className="absolute inset-0 opacity-[.02]" style={{
        backgroundImage: 'linear-gradient(rgba(201,148,58,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,148,58,1) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      {/* Corner accents */}
      <div className="absolute top-6 left-[72px] w-16 h-16 border-t border-l border-gold/15" />
      <div className="absolute bottom-6 right-[72px] w-16 h-16 border-b border-r border-gold/15" />

      {/* Floating dots */}
      <div className="absolute top-1/3 right-[15%] w-1.5 h-1.5 rounded-full bg-gold/20" />
      <div className="absolute bottom-1/3 right-[25%] w-2 h-2 rounded-full bg-gold/10" />

      <div className="relative z-10 max-w-[680px]">
        {/* Eyebrow with decorative line */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-8 h-px bg-gold/60" />
          <span className="text-[10px] font-bold tracking-[.25em] uppercase text-gold/80">
            {eyebrow}
          </span>
        </div>

        {/* Title */}
        <EditableText
          storageKey={`section-${id}-title`}
          defaultValue={title}
          className="font-cormorant text-[42px] font-light text-white leading-[1.15] mb-4"
        />

        {/* Description */}
        {desc && (
          <EditableText
            storageKey={`section-${id}-desc`}
            defaultValue={desc}
            className="text-[14px] text-white/40 leading-relaxed max-w-[560px]"
            multiline
          />
        )}
      </div>
    </div>

    {/* Bottom gold accent line */}
    <div className="h-[2px] bg-gradient-to-r from-gold/60 via-gold/20 to-transparent" />
  </div>
);

export default SectionHeader;
