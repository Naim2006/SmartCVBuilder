import React, { useState } from 'react';
import type { ResumeSettings } from '../../types/cv';
import {
  Layers,
  Eye,
  EyeOff,
  MoveUp,
  MoveDown,
  Plus,
  Check,
  RotateCcw,
} from 'lucide-react';
import { DEFAULT_SECTION_ORDER, DEFAULT_SECTION_VISIBILITY } from '../../data/sampleResumes';

interface SectionManagerProps {
  settings: ResumeSettings;
  onChangeSettings: (settings: Partial<ResumeSettings>) => void;
}

export const SectionManager: React.FC<SectionManagerProps> = ({
  settings,
  onChangeSettings,
}) => {
  const [showAddMenu, setShowAddMenu] = useState(false);

  const allAvailableSections: { key: string; label: string }[] = [
    { key: 'experience', label: 'Work Experience' },
    { key: 'education', label: 'Education' },
    { key: 'skills', label: 'Skills & Competencies' },
    { key: 'projects', label: 'Key Projects' },
    { key: 'certifications', label: 'Certifications' },
    { key: 'volunteer', label: 'Volunteer Experience' },
    { key: 'awards', label: 'Honors & Awards' },
    { key: 'courses', label: 'Courses & Training' },
    { key: 'languages', label: 'Languages' },
    { key: 'publications', label: 'Publications' },
    { key: 'custom', label: 'Custom Sections' },
  ];

  const sectionOrder = settings.sectionOrder || [...DEFAULT_SECTION_ORDER];
  const visibility = settings.sectionVisibility || { ...DEFAULT_SECTION_VISIBILITY };

  const handleToggleVisibility = (key: string) => {
    const nextVis = { ...visibility, [key]: !visibility[key] };
    onChangeSettings({ sectionVisibility: nextVis });
  };

  const handleMoveUp = (index: number) => {
    if (index <= 0) return;
    const nextOrder = [...sectionOrder];
    const temp = nextOrder[index - 1];
    nextOrder[index - 1] = nextOrder[index];
    nextOrder[index] = temp;
    onChangeSettings({ sectionOrder: nextOrder });
  };

  const handleMoveDown = (index: number) => {
    if (index >= sectionOrder.length - 1) return;
    const nextOrder = [...sectionOrder];
    const temp = nextOrder[index + 1];
    nextOrder[index + 1] = nextOrder[index];
    nextOrder[index] = temp;
    onChangeSettings({ sectionOrder: nextOrder });
  };

  const handleActivateSection = (key: string) => {
    const nextVis = { ...visibility, [key]: true };
    let nextOrder = [...sectionOrder];
    if (!nextOrder.includes(key)) {
      nextOrder.push(key);
    }
    onChangeSettings({ sectionVisibility: nextVis, sectionOrder: nextOrder });
    setShowAddMenu(false);
  };

  const handleResetDefaultOrder = () => {
    onChangeSettings({
      sectionOrder: [...DEFAULT_SECTION_ORDER],
      sectionVisibility: { ...DEFAULT_SECTION_VISIBILITY },
    });
  };

  return (
    <div className="space-y-4 bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div>
          <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-blue-600" />
            <span>Section Order & Visibility</span>
          </h3>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Drag or use arrows to rearrange sections. Hidden sections are omitted from the final PDF.
          </p>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handleResetDefaultOrder}
            className="text-[11px] text-slate-500 hover:text-slate-800 p-1 flex items-center gap-1"
            title="Reset to default order"
          >
            <RotateCcw className="w-3 h-3" />
            <span className="hidden sm:inline">Reset</span>
          </button>

          {/* Add Section Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowAddMenu(!showAddMenu)}
              className="py-1 px-2.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Section</span>
            </button>

            {showAddMenu && (
              <div className="absolute right-0 mt-1 w-56 bg-white border border-slate-200 rounded-xl shadow-xl py-1 z-20 text-xs animate-fadeIn">
                <div className="px-3 py-1 text-[10px] font-bold uppercase text-slate-400">
                  Available Sections:
                </div>
                {allAvailableSections.map((sec) => {
                  const isActive = visibility[sec.key];
                  return (
                    <button
                      key={sec.key}
                      type="button"
                      onClick={() => handleActivateSection(sec.key)}
                      className="w-full px-3 py-1.5 text-left flex items-center justify-between hover:bg-slate-50 text-slate-700"
                    >
                      <span>{sec.label}</span>
                      {isActive && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Ordered Section List */}
      <div className="space-y-1.5">
        {sectionOrder.map((key, index) => {
          const info = allAvailableSections.find((s) => s.key === key) || { key, label: key };
          const isShown = visibility[key] !== false;

          return (
            <div
              key={key}
              className={`flex items-center justify-between p-2 rounded-lg border text-xs transition-colors ${
                isShown
                  ? 'bg-slate-50 border-slate-200 text-slate-800'
                  : 'bg-slate-100/50 border-slate-200 text-slate-400'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-slate-400 w-4">{index + 1}.</span>
                <span className={`font-medium ${isShown ? 'text-slate-900' : 'line-through text-slate-400'}`}>
                  {info.label}
                </span>
                {!isShown && (
                  <span className="text-[10px] bg-slate-200 text-slate-600 px-1.5 py-0.2 rounded">
                    Hidden in PDF
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => handleMoveUp(index)}
                  disabled={index === 0}
                  className="p-1 text-slate-500 hover:text-slate-800 disabled:opacity-30 disabled:cursor-not-allowed"
                  title="Move section up"
                >
                  <MoveUp className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleMoveDown(index)}
                  disabled={index === sectionOrder.length - 1}
                  className="p-1 text-slate-500 hover:text-slate-800 disabled:opacity-30 disabled:cursor-not-allowed"
                  title="Move section down"
                >
                  <MoveDown className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleToggleVisibility(key)}
                  className={`p-1 rounded ${
                    isShown ? 'text-blue-600 hover:bg-blue-50' : 'text-slate-400 hover:bg-slate-200'
                  }`}
                  title={isShown ? 'Hide section from CV' : 'Show section in CV'}
                >
                  {isShown ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
