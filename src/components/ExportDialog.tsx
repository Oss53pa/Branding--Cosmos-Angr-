import React, { useState } from 'react';
import { X, Printer, FileDown, FileImage, CheckSquare, Square } from 'lucide-react';

interface Section {
  id: string;
  label: string;
  group: string;
}

const allSections: Section[] = [
  { id: 'cover', label: 'Page de garde', group: 'Introduction' },
  { id: 'plan', label: "Vue d'ensemble", group: 'Introduction' },
  { id: 'decisions', label: 'Décisions actées', group: 'Introduction' },
  { id: 'calendrier', label: 'Calendrier cible', group: 'Introduction' },
  { id: 'etape1', label: 'Vue stratégie', group: 'Stratégie' },
  { id: 'plateforme', label: 'Plateforme EXCO', group: 'Stratégie' },
  { id: 'kapferer', label: 'Prisme de Kapferer', group: 'Stratégie' },
  { id: 'scenarios', label: '4 Scénarios', group: 'Stratégie' },
  { id: 'comparatif', label: 'Comparatif A·B·C·D', group: 'Stratégie' },
  { id: 'etape2', label: 'Vue Brand Book', group: 'Brand Book' },
  { id: 'da', label: 'Brand Book v2.2', group: 'Brand Book' },
  { id: 'etape3', label: 'Vue Focus Group', group: 'Focus Group' },
  { id: 'protocole', label: 'Protocole v2.1', group: 'Focus Group' },
  { id: 'recrutement', label: 'Recrutement', group: 'Focus Group' },
  { id: 'grille', label: "Grille d'analyse", group: 'Focus Group' },
  { id: 'etape4', label: 'Vue Stratégie Marketing', group: 'Stratégie Marketing' },
  { id: 'plan360', label: 'Plan Opérationnel', group: 'Stratégie Marketing' },
];

const groups = [...new Set(allSections.map((s) => s.group))];

interface ExportDialogProps {
  open: boolean;
  onClose: () => void;
}

const ExportDialog: React.FC<ExportDialogProps> = ({ open, onClose }) => {
  const [selected, setSelected] = useState<Set<string>>(new Set(allSections.map((s) => s.id)));
  const [format, setFormat] = useState<'pdf' | 'image'>('pdf');

  if (!open) return null;

  const allSelected = selected.size === allSections.length;
  const noneSelected = selected.size === 0;

  const toggleAll = () => {
    setSelected(allSelected ? new Set() : new Set(allSections.map((s) => s.id)));
  };

  const toggleSection = (id: string) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  };

  const toggleGroup = (group: string) => {
    const groupIds = allSections.filter((s) => s.group === group).map((s) => s.id);
    const allGroupSelected = groupIds.every((id) => selected.has(id));
    const next = new Set(selected);
    groupIds.forEach((id) => (allGroupSelected ? next.delete(id) : next.add(id)));
    setSelected(next);
  };

  const handleExport = () => {
    // Hide non-selected sections, sidebar, dialogs
    const style = document.createElement('style');
    style.id = 'export-style';
    style.textContent = `
      @media print {
        /* Hide UI elements */
        nav, #sidebar, [data-export-hide], .fixed { display: none !important; }

        /* Reset layout for print */
        #main {
          height: auto !important;
          overflow: visible !important;
        }
        .flex.h-screen {
          display: block !important;
          height: auto !important;
          overflow: visible !important;
        }
        .flex-1.flex.flex-col {
          height: auto !important;
          overflow: visible !important;
        }

        /* Page breaks */
        .section, [id] > .px-\\[72px\\] {
          page-break-inside: avoid;
        }

        /* Hide unselected sections */
        ${allSections
          .filter((s) => !selected.has(s.id))
          .map((s) => `#${s.id} { display: none !important; }`)
          .join('\n')}
      }
    `;
    document.head.appendChild(style);

    if (format === 'pdf') {
      // Use browser print dialog (Save as PDF option)
      window.print();
    } else if (format === 'image') {
      // For image export, we print and user can screenshot or use browser PDF→image
      window.print();
    }

    // Clean up after print
    setTimeout(() => {
      const el = document.getElementById('export-style');
      if (el) el.remove();
    }, 1000);

    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl w-[560px] max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-black/[.08]">
          <div>
            <div className="font-semibold text-[15px] text-black">Exporter le catalogue</div>
            <div className="text-[11px] text-black/65 mt-0.5">
              Sélectionnez les pages à inclure
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-black/5 transition-colors">
            <X size={18} className="text-black/65" />
          </button>
        </div>

        {/* Format selector */}
        <div className="px-6 py-3 border-b border-black/[.08] flex gap-2">
          <button
            onClick={() => setFormat('pdf')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all ${
              format === 'pdf'
                ? 'bg-navy text-white'
                : 'bg-black/[.04] text-black/60 hover:bg-black/[.08]'
            }`}
          >
            <FileDown size={14} />
            PDF
          </button>
          <button
            onClick={() => setFormat('image')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all ${
              format === 'image'
                ? 'bg-navy text-white'
                : 'bg-black/[.04] text-black/60 hover:bg-black/[.08]'
            }`}
          >
            <FileImage size={14} />
            Image
          </button>
          <div className="flex-1" />
          <button
            onClick={() => { handleExport(); }}
            disabled={noneSelected}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium bg-navy text-white hover:bg-navy/90 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <Printer size={14} />
            Imprimer
          </button>
        </div>

        {/* Section selector */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {/* Select all */}
          <button
            onClick={toggleAll}
            className="flex items-center gap-2.5 w-full text-left mb-3 pb-3 border-b border-black/[.08]"
          >
            {allSelected ? (
              <CheckSquare size={16} className="text-gold" />
            ) : (
              <Square size={16} className="text-black/60" />
            )}
            <span className="text-[12px] font-semibold text-black">
              {allSelected ? 'Tout désélectionner' : 'Tout sélectionner'}
            </span>
            <span className="text-[10px] text-black/65 ml-auto">
              {selected.size}/{allSections.length} pages
            </span>
          </button>

          {/* Groups */}
          {groups.map((group) => {
            const groupSections = allSections.filter((s) => s.group === group);
            const groupAllSelected = groupSections.every((s) => selected.has(s.id));
            const groupSomeSelected = groupSections.some((s) => selected.has(s.id));

            return (
              <div key={group} className="mb-3">
                <button
                  onClick={() => toggleGroup(group)}
                  className="flex items-center gap-2.5 w-full text-left py-1.5"
                >
                  {groupAllSelected ? (
                    <CheckSquare size={14} className="text-gold" />
                  ) : groupSomeSelected ? (
                    <CheckSquare size={14} className="text-gold/40" />
                  ) : (
                    <Square size={14} className="text-black/60" />
                  )}
                  <span className="text-[11px] font-bold text-black/70 tracking-wide uppercase">
                    {group}
                  </span>
                </button>
                <div className="ml-6 mt-1 space-y-0.5">
                  {groupSections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => toggleSection(section.id)}
                      className="flex items-center gap-2.5 w-full text-left py-1 hover:bg-black/[.02] rounded px-1 -mx-1 transition-colors"
                    >
                      {selected.has(section.id) ? (
                        <CheckSquare size={13} className="text-gold" />
                      ) : (
                        <Square size={13} className="text-black/60" />
                      )}
                      <span
                        className={`text-[12px] ${
                          selected.has(section.id) ? 'text-black/80' : 'text-black/65'
                        }`}
                      >
                        {section.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-black/[.08] flex justify-between items-center">
          <div className="text-[10px] text-black/65">
            Astuce : dans la boîte d'impression, choisissez « Enregistrer en PDF » pour exporter
          </div>
          <button
            onClick={handleExport}
            disabled={noneSelected}
            className="px-5 py-2 rounded-lg text-xs font-semibold bg-gold text-white hover:bg-gold/90 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            Exporter {selected.size} page{selected.size > 1 ? 's' : ''}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExportDialog;
