import React from 'react';
import { ZoomIn, ZoomOut, RotateCcw, Printer, FileText, Copy, Check, Loader2 } from 'lucide-react';
import type { TemplateType, FontType, ResumeSettings } from '../../types/cv';

interface PreviewControlsProps {
  settings: ResumeSettings;
  onUpdateSettings: (newSettings: Partial<ResumeSettings>) => void;
  scale: number;
  onScaleChange: (scale: number) => void;
  onPrintPdf: () => void;
  onDownloadTxt: () => void;
  onCopyTxt: () => void;
  copied: boolean;
  isGeneratingPdf?: boolean;
}

export const PreviewControls: React.FC<PreviewControlsProps> = ({
  settings,
  onUpdateSettings,
  scale,
  onScaleChange,
  onPrintPdf,
  onDownloadTxt,
  onCopyTxt,
  copied,
  isGeneratingPdf = false,
}) => {
  const templates: { id: TemplateType; label: string; badge?: string }[] = [
    { id: 'classic', label: 'Classic ATS', badge: 'Standard' },
    { id: 'modern', label: 'Modern Professional' },
    { id: 'compact', label: 'Compact ATS' },
    { id: 'executive', label: 'Executive' },
    { id: 'developer', label: 'Developer CV' },
  ];

  const fonts: { id: FontType; label: string }[] = [
    { id: 'inter', label: 'Inter (Clean Sans)' },
    { id: 'roboto', label: 'Roboto (Modern Sans)' },
    { id: 'arial', label: 'Arial (Universal ATS)' },
    { id: 'georgia', label: 'Georgia (Refined Serif)' },
    { id: 'times', label: 'Times New Roman (Classic)' },
    { id: 'garamond', label: 'Garamond (Executive)' },
  ];

  return (
    <div className="no-print bg-white border border-slate-200 rounded-2xl p-3 sm:p-3.5 flex flex-wrap items-center justify-between gap-3 shadow-xs mb-4">
      {/* Template Selector Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1 hidden sm:inline">
          Template:
        </span>
        {templates.map((t) => {
          const isActive = settings.template === t.id;
          return (
            <button
              key={t.id}
              onClick={() => onUpdateSettings({ template: t.id })}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'bg-slate-100/80 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              <span>{t.label}</span>
              {t.badge && (
                <span className="text-[9px] bg-blue-500/20 text-blue-300 px-1.5 py-0.2 rounded-full font-bold">
                  {t.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Font & Zoom & Action buttons */}
      <div className="flex items-center gap-2 flex-wrap">
        {/* Font Select */}
        <select
          value={settings.font}
          onChange={(e) => onUpdateSettings({ font: e.target.value as FontType })}
          className="bg-slate-50 border border-slate-300 text-slate-800 text-xs rounded-xl px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
          title="Select ATS-friendly font"
        >
          {fonts.map((f) => (
            <option key={f.id} value={f.id}>
              {f.label}
            </option>
          ))}
        </select>

        {/* Zoom Controls */}
        <div className="flex items-center bg-slate-100 rounded-xl p-0.5 border border-slate-200">
          <button
            onClick={() => onScaleChange(Math.max(0.5, Number((scale - 0.1).toFixed(2))))}
            className="p-1 text-slate-600 hover:text-slate-900 transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="text-[11px] font-mono px-1.5 text-slate-700 min-w-[36px] text-center font-semibold">
            {Math.round(scale * 100)}%
          </span>
          <button
            onClick={() => onScaleChange(Math.min(1.3, Number((scale + 0.1).toFixed(2))))}
            className="p-1 text-slate-600 hover:text-slate-900 transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onScaleChange(1)}
            className="p-1 text-slate-600 hover:text-slate-900 transition-colors border-l border-slate-200 ml-0.5"
            title="Reset Zoom to 100%"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        </div>

        {/* Export Buttons */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={onPrintPdf}
            disabled={isGeneratingPdf}
            className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white text-xs font-semibold px-3 py-1.5 rounded-xl shadow-xs transition-all cursor-pointer"
            title="Download ATS vector PDF"
          >
            {isGeneratingPdf ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Printer className="w-3.5 h-3.5 text-blue-400" />
            )}
            <span>Download PDF</span>
          </button>

          <button
            onClick={onDownloadTxt}
            className="flex items-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium px-2.5 py-1.5 rounded-xl border border-slate-200 transition-colors"
            title="Download clean plain text (.txt) for direct portal pasting"
          >
            <FileText className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">.TXT</span>
          </button>

          <button
            onClick={onCopyTxt}
            className="flex items-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium px-2.5 py-1.5 rounded-xl border border-slate-200 transition-colors"
            title="Copy plain text to clipboard"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-semibold hidden sm:inline">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Copy</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
