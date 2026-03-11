import React from 'react';
import { Instagram, Facebook, Video, Search, MessageCircle } from 'lucide-react';
import EditableText from './EditableText';

const channelIcons = [
  <Instagram size={18} />,
  <Facebook size={18} />,
  <Video size={18} />,
  <Search size={18} />,
  <MessageCircle size={18} />,
];

const channelColors = ['#E1306C', '#1877F2', '#000000', '#4285F4', '#25D366'];

const channels = [
  {
    name: 'Instagram',
    role: 'Canal principal — lifestyle, aspirationnel, communaute',
    kpis: '10K followers J+90 . Engagement rate >= 4%',
    actions: [
      'Feed curated — 70% lifestyle / 20% enseignes / 10% behind-the-scenes',
      'Stories quotidiennes — teasing chantier, enseignes, equipe',
      'Reels hebdomadaires — format immersif architecture + ambiance',
      'Partenariats influenceurs — 2 collabs/semaine pre-ouverture',
    ],
  },
  {
    name: 'Facebook',
    role: 'Canal communautaire — evenements, familles, information locale',
    kpis: '15K followers J+90 . Reach organique >= 8%',
    actions: [
      'Page lieu — evenements, horaires, infos pratiques',
      'Groupe communautaire "Cosmos Angre Insiders"',
      'Lives mensuels — avancement chantier, annonces enseignes',
      'Ads geolocalisees — zone primaire Cocody/Angre',
    ],
  },
  {
    name: 'TikTok',
    role: 'Canal decouverte — viralite, jeune CSP+, creativite',
    kpis: '5K followers J+90 . 1 video virale (100K+ vues)',
    actions: [
      'Format "Day in the life at Cosmos Angre"',
      'Challenges enseignes — UGC avec hashtag #CosmosAngre',
      'Behind-the-scenes chantier — progression en accelere',
      'Partenariat TikTokers Abidjan — top 10 createurs',
    ],
  },
  {
    name: 'Google / SEO',
    role: 'Canal conversion — search, Maps, fiche etablissement',
    kpis: 'Position 1 "centre commercial Angre" . 5K visites/mois site',
    actions: [
      'Site web Cosmos Angre — landing page + pages enseignes',
      'Google Business Profile optimise — photos, horaires, avis',
      'Campagne Google Ads — search + display reseau local',
      'SEO local — blog lifestyle + guide quartier Angre',
    ],
  },
  {
    name: 'WhatsApp Business',
    role: 'Canal CRM direct — notifications, fidelite, service client',
    kpis: '3K contacts opt-in J+90 . Taux ouverture >= 85%',
    actions: [
      'Diffusion VIP — offres exclusives, avant-premieres',
      'Catalogue WhatsApp — enseignes + promotions',
      'Chatbot FAQ — horaires, parking, services',
      'Listes de diffusion segmentees par interet',
    ],
  },
];

const Digital: React.FC = () => (
  <div id="digital" className="px-4 sm:px-8 lg:px-[72px] pb-16">
    <div className="bg-white rounded-2xl border border-black/[.06] overflow-hidden shadow-[0_2px_20px_rgba(0,0,0,.04)]">
      {/* Header */}
      <div className="relative px-8 py-8 bg-gradient-to-br from-navy via-[#16213e] to-navy overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_70%,rgba(201,148,58,.08)_0%,transparent_60%)]" />
        <div className="relative z-10">
          <div className="text-[9px] font-bold tracking-[.2em] uppercase text-gold/70 mb-2">Livrable 4.3</div>
          <EditableText storageKey="digital-title" defaultValue="Plan Digital" className="font-cormorant text-[30px] text-white font-light" tag="div" />
          <EditableText storageKey="digital-subtitle" defaultValue="5 canaux . Strategie de contenu . KPIs par plateforme" className="text-[11px] text-white/60 mt-1.5" tag="div" />
        </div>
      </div>

      <div className="p-8 space-y-6">
        {channels.map((ch, chIndex) => (
          <div key={ch.name} className="rounded-xl border border-black/[.06] overflow-hidden hover:shadow-sm transition-shadow">
            {/* Channel header */}
            <div className="flex items-center gap-4 px-5 py-4 bg-cream/30 border-b border-black/[.04]">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white flex-shrink-0"
                style={{ background: channelColors[chIndex] }}
              >
                {channelIcons[chIndex]}
              </div>
              <div className="flex-1">
                <EditableText
                  storageKey={`digital-channel-name-${chIndex}`}
                  defaultValue={ch.name}
                  className="text-[14px] font-bold text-navy"
                  tag="div"
                />
                <EditableText storageKey={`digital-channel-role-${chIndex}`} defaultValue={ch.role} className="text-[11px] text-black/65 mt-0.5" tag="div" />
              </div>
              <div className="text-right">
                <EditableText storageKey={`digital-channel-kpis-${chIndex}`} defaultValue={ch.kpis} className="text-[10px] font-semibold text-gold bg-gold/10 px-3 py-1.5 rounded-full" tag="div" />
              </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 p-5">
              {ch.actions.map((a, i) => (
                <div key={i} className="flex items-start gap-3 bg-cream/40 rounded-lg p-3.5 border border-black/[.03]">
                  <span
                    className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white mt-0.5"
                    style={{ background: channelColors[chIndex] }}
                  >
                    {i + 1}
                  </span>
                  <span className="text-[12px] text-black/60 leading-relaxed">
                    <EditableText storageKey={`digital-action-${chIndex}-${i}`} defaultValue={a} tag="span" />
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Digital;
