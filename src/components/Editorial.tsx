import React from 'react';
import { CalendarRange } from 'lucide-react';
import EditableText from './EditableText';

const platformColors: Record<string, string> = {
  'Instagram': '#E1306C',
  'Facebook': '#1877F2',
  'TikTok': '#000000',
  'WhatsApp': '#25D366',
  'Google': '#4285F4',
};

const months = [
  {
    month: 'Mois 1 — Teasing (J-90)',
    theme: '"Quelque chose arrive a Angre"',
    posts: [
      { platform: 'Instagram', type: 'Reel', content: 'Timelapse chantier + musique epique' },
      { platform: 'Facebook', type: 'Post', content: 'Annonce officielle — "Un nouveau monde arrive"' },
      { platform: 'Instagram', type: 'Story', content: 'Countdown sticker — compte a rebours inauguration' },
      { platform: 'TikTok', type: 'Video', content: 'POV : tu decouvres le futur centre le plus premium d\'Abidjan' },
    ],
  },
  {
    month: 'Mois 2 — Revelation (J-60)',
    theme: '"Decouvrez Cosmos Angre"',
    posts: [
      { platform: 'Instagram', type: 'Carrousel', content: 'Presentation des enseignes — 1 enseigne/jour pendant 10 jours' },
      { platform: 'Facebook', type: 'Live', content: 'Visite virtuelle avec le directeur — 30 min Q&A' },
      { platform: 'Instagram', type: 'Reel', content: 'Reveal palette couleurs + signature "Un monde a part"' },
      { platform: 'WhatsApp', type: 'Broadcast', content: 'Inscription liste VIP — acces prioritaire Soft Opening' },
    ],
  },
  {
    month: 'Mois 3 — Activation (J-30)',
    theme: '"L\'exception, bientot chez vous"',
    posts: [
      { platform: 'Instagram', type: 'Reel', content: 'Influenceur visite chantier — reaction authentique' },
      { platform: 'TikTok', type: 'Challenge', content: '#MonCosmosAngre — les gens imaginent leur visite ideale' },
      { platform: 'Facebook', type: 'Event', content: 'Creation evenement Soft Opening — RSVP digital' },
      { platform: 'Google', type: 'Ads', content: 'Lancement campagne search "centre commercial Angre"' },
    ],
  },
  {
    month: 'Mois 4 — Lancement (J-Day)',
    theme: '"Vivez l\'exception"',
    posts: [
      { platform: 'Instagram', type: 'Live', content: 'Inauguration en direct — red carpet, discours, visite' },
      { platform: 'TikTok', type: 'Video', content: 'Montage best-of inauguration — format viral' },
      { platform: 'Facebook', type: 'Album', content: 'Photos officielles inauguration — presse + invites' },
      { platform: 'WhatsApp', type: 'Message', content: 'Bon de bienvenue 5 000 FCFA — premiers visiteurs' },
    ],
  },
  {
    month: 'Mois 5 — Ancrage (J+30)',
    theme: '"Votre nouveau rendez-vous"',
    posts: [
      { platform: 'Instagram', type: 'Carrousel', content: 'Temoignages premiers visiteurs — UGC curated' },
      { platform: 'Facebook', type: 'Post', content: 'Annonce programme fidelite Cosmos Club' },
      { platform: 'Instagram', type: 'Reel', content: '"5 raisons de revenir cette semaine a Cosmos Angre"' },
      { platform: 'TikTok', type: 'Serie', content: '"Les secrets de Cosmos" — 1 detail architecture/jour' },
    ],
  },
  {
    month: 'Mois 6 — Fidelisation (J+60)',
    theme: '"Un monde a part, le votre"',
    posts: [
      { platform: 'Instagram', type: 'Reel', content: 'Evenement mensuel — exposition art / concert acoustique' },
      { platform: 'Facebook', type: 'Post', content: 'Bilan 2 mois — chiffres, temoignages, next steps' },
      { platform: 'WhatsApp', type: 'Broadcast', content: 'Offres exclusives Cosmos Club — membres uniquement' },
      { platform: 'Google', type: 'Blog', content: 'Article SEO — "Guide du quartier Angre avec Cosmos"' },
    ],
  },
];

const Editorial: React.FC = () => (
  <div id="editorial" className="px-4 sm:px-8 lg:px-[72px] pb-16">
    <div className="bg-white rounded-2xl border border-black/[.06] overflow-hidden shadow-[0_2px_20px_rgba(0,0,0,.04)]">
      {/* Header */}
      <div className="relative px-8 py-8 bg-gradient-to-br from-navy via-[#16213e] to-navy overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_30%,rgba(201,148,58,.08)_0%,transparent_60%)]" />
        <div className="relative z-10">
          <div className="text-[9px] font-bold tracking-[.2em] uppercase text-gold/70 mb-2">Livrable 4.4</div>
          <EditableText storageKey="editorial-title" defaultValue="Calendrier Editorial" className="font-cormorant text-[30px] text-white font-light" tag="div" />
          <EditableText storageKey="editorial-subtitle" defaultValue="6 mois . 5 plateformes . Pre-ouverture -> Fidelisation" className="text-[11px] text-white/60 mt-1.5" tag="div" />
        </div>
      </div>

      <div className="p-8 space-y-6">
        {months.map((m, mIndex) => (
          <div key={m.month} className="rounded-xl border border-black/[.06] overflow-hidden">
            {/* Month header */}
            <div className="flex items-center justify-between px-5 py-3.5 bg-cream/40 border-b border-black/[.04]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center text-gold">
                  <CalendarRange size={16} />
                </div>
                <div>
                  <EditableText
                    storageKey={`editorial-month-title-${mIndex}`}
                    defaultValue={m.month}
                    className="text-[13px] font-bold text-navy"
                    tag="div"
                  />
                  <div className="text-[11px] text-black/65 italic mt-0.5">
                    Theme : <EditableText storageKey={`editorial-month-theme-${mIndex}`} defaultValue={m.theme} tag="span" />
                  </div>
                </div>
              </div>
              <span className="text-[9px] font-bold text-gold/50 tracking-wider uppercase">
                {4} publications
              </span>
            </div>

            {/* Posts grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 p-5">
              {m.posts.map((p, i) => {
                const pColor = platformColors[p.platform] || '#666';
                return (
                  <div key={i} className="flex items-start gap-3 bg-cream/30 rounded-lg p-3.5 border border-black/[.03] hover:shadow-sm transition-shadow">
                    <div
                      className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5"
                      style={{ background: pColor }}
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1.5">
                        <EditableText
                          storageKey={`editorial-post-platform-${mIndex}-${i}`}
                          defaultValue={p.platform}
                          className="text-[11px] font-bold"
                          tag="span"
                          // @ts-ignore
                          style={{ color: pColor }}
                        />
                        <EditableText
                          storageKey={`editorial-post-type-${mIndex}-${i}`}
                          defaultValue={p.type}
                          className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-black/[.04] text-black/65"
                          tag="span"
                        />
                      </div>
                      <EditableText storageKey={`editorial-post-content-${mIndex}-${i}`} defaultValue={p.content} className="text-[12px] text-black/55 leading-relaxed" tag="div" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Editorial;
