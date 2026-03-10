import React from 'react';
import { Compass, Palette, Users, Megaphone, CheckCircle2, Clock, Circle } from 'lucide-react';
import EditableText from './EditableText';

interface CardItem {
  status: 'done' | 'prog' | 'todo';
  text: string;
}

interface StepCard {
  num: string;
  title: string;
  badge: string;
  badgeType: 'done' | 'prog' | 'todo';
  items: CardItem[];
  footer: string;
  icon: React.ReactNode;
  accent: string;
}

const steps: StepCard[] = [
  {
    num: 'ETAPE 1',
    title: 'Strategie & Plateforme de marque',
    badge: 'En cours',
    badgeType: 'prog',
    items: [
      { status: 'prog', text: 'Plateforme Scenario A — Premium de proximite' },
      { status: 'prog', text: 'Plateforme Scenario B — Destination premium' },
      { status: 'prog', text: 'Plateforme Scenario C — Hybride autonome' },
      { status: 'prog', text: 'Plateforme Scenario D — Nature Contemporaine' },
      { status: 'prog', text: 'Comparatif strategique A vs B vs C vs D' },
    ],
    footer: 'Document plateforme 4 scenarios — EXCO / Cheick',
    icon: <Compass size={20} />,
    accent: '#4A7558',
  },
  {
    num: 'ETAPE 2',
    title: 'Brand Book draft',
    badge: 'A faire',
    badgeType: 'todo',
    items: [
      { status: 'todo', text: 'DA Scenario A — univers, palette, typo' },
      { status: 'todo', text: 'DA Scenario B — univers, palette, typo' },
      { status: 'todo', text: 'DA Scenario C Hybride' },
      { status: 'todo', text: 'DA Scenario D — Nature Contemporaine' },
      { status: 'done', text: 'Naming & 5 signatures posees' },
      { status: 'done', text: 'Moodboards textuels (brief Fernand)' },
      { status: 'done', text: 'Templates application (Color Book v2.0)' },
    ],
    footer: 'Brand Book draft 4 pistes — brief Fernand',
    icon: <Palette size={20} />,
    accent: '#C9943A',
  },
  {
    num: 'ETAPE 3',
    title: 'Focus Group',
    badge: 'En cours',
    badgeType: 'prog',
    items: [
      { status: 'done', text: 'Protocole Yvan — 6 points corriges' },
      { status: 'done', text: 'Stimuli visuels integres' },
      { status: 'done', text: '4 scenarios + bardade bronze' },
      { status: 'prog', text: 'Noms impactants 4 positionnements' },
      { status: 'todo', text: 'Recrutement — brief agence terrain' },
      { status: 'todo', text: "Grille analyse + template rapport" },
    ],
    footer: 'Protocole FG v2.1 — pret a briefer agence',
    icon: <Users size={20} />,
    accent: '#C8A96E',
  },
  {
    num: 'ETAPE 4',
    title: 'Plan Marketing',
    badge: 'Apres FG',
    badgeType: 'todo',
    items: [
      { status: 'todo', text: 'Plateforme finale (post-FG)' },
      { status: 'todo', text: 'Plan 360 par axe' },
      { status: 'todo', text: 'Budget ventile — 20 actions' },
      { status: 'todo', text: 'Business case ROI projete' },
      { status: 'todo', text: 'Plan digital complet' },
      { status: 'todo', text: 'Calendrier editorial 6 mois' },
    ],
    footer: 'Plan marketing validable CODIR',
    icon: <Megaphone size={20} />,
    accent: '#e65100',
  },
];

const badgeStyles: Record<string, { bg: string; text: string; dot: string }> = {
  done: { bg: 'bg-emerald-500/10', text: 'text-emerald-600', dot: 'bg-emerald-500' },
  prog: { bg: 'bg-amber-500/10', text: 'text-amber-600', dot: 'bg-amber-500' },
  todo: { bg: 'bg-black/[.04]', text: 'text-black/40', dot: 'bg-black/20' },
};

const statusIcons: Record<string, React.ReactNode> = {
  done: <CheckCircle2 size={14} className="text-emerald-500 flex-shrink-0" />,
  prog: <Clock size={14} className="text-amber-500 flex-shrink-0" />,
  todo: <Circle size={14} className="text-black/20 flex-shrink-0" />,
};

const PlanOverview: React.FC = () => (
  <div id="plan" className="px-4 sm:px-8 lg:px-[72px] py-16 bg-gradient-to-b from-cream to-white">
    <div className="flex items-center gap-3 mb-2.5">
      <div className="w-8 h-px bg-gold/60" />
      <span className="text-[9px] font-bold tracking-[.22em] uppercase text-gold">
        Vue d'ensemble
      </span>
    </div>
    <EditableText
      storageKey="plan-title"
      defaultValue="Plan de travail global"
      className="font-cormorant text-[42px] font-light text-navy mb-2 leading-tight"
    />
    <EditableText
      storageKey="plan-desc"
      defaultValue="4 etapes sequentielles de la strategie de marque au plan marketing operationnel. Chaque etape conditionne la suivante — le Focus Group est le point de pivot central."
      className="text-[14px] text-black/40 mb-10 leading-relaxed max-w-[640px]"
      multiline
    />

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      {steps.map((step) => {
        const badge = badgeStyles[step.badgeType];
        const doneCount = step.items.filter(i => i.status === 'done').length;
        const progress = (doneCount / step.items.length) * 100;

        return (
          <div
            key={step.num}
            className="bg-white rounded-2xl border border-black/[.06] overflow-hidden shadow-[0_2px_20px_rgba(0,0,0,.04)] hover:shadow-[0_4px_30px_rgba(0,0,0,.08)] transition-shadow duration-300"
          >
            {/* Header with accent */}
            <div className="relative px-6 py-5 border-b border-black/[.06]">
              <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: `linear-gradient(90deg, ${step.accent}, ${step.accent}40)` }} />
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3.5">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${step.accent}12`, color: step.accent }}
                  >
                    {step.icon}
                  </div>
                  <div>
                    <div className="text-[10px] font-bold tracking-[.15em] uppercase mb-1" style={{ color: step.accent }}>
                      {step.num}
                    </div>
                    <EditableText
                      storageKey={`step-${step.num}-title`}
                      defaultValue={step.title}
                      className="text-[15px] font-semibold text-navy"
                      tag="span"
                    />
                  </div>
                </div>
                <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-bold tracking-wide uppercase ${badge.bg} ${badge.text}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                  {step.badge}
                </span>
              </div>

              {/* Progress bar */}
              <div className="mt-4 h-1 bg-black/[.04] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${progress}%`, background: step.accent }}
                />
              </div>
              <div className="text-[9px] text-black/30 mt-1.5 text-right font-medium">
                {doneCount}/{step.items.length} terminee{doneCount > 1 ? 's' : ''}
              </div>
            </div>

            {/* Items */}
            <div className="px-6 py-4">
              {step.items.map((item, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 py-2.5 ${i < step.items.length - 1 ? 'border-b border-black/[.04]' : ''}`}
                >
                  {statusIcons[item.status]}
                  <EditableText
                    storageKey={`step-${step.num}-item-${i}`}
                    defaultValue={item.text}
                    tag="span"
                    className={`text-[13px] ${item.status === 'done' ? 'text-black/50 line-through' : 'text-black/70'}`}
                  />
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="px-6 py-3.5 bg-cream/60 border-t border-black/[.05] flex items-center gap-2">
              <div className="w-1 h-1 rounded-full" style={{ background: step.accent }} />
              <span className="text-[11px] text-black/40">
                <strong className="text-black/60">Livrable :</strong> {step.footer}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

export default PlanOverview;
