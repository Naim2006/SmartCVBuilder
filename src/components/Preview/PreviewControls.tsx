import React from 'react';
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Printer,
  FileText,
  Copy,
  Check,
  Loader2,
  Sparkles,
} from 'lucide-react';
import type { TemplateType, FontType, FontSize, ResumeSettings, MarginType } from '../../types/cv';

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
    { id: 'modern', label: 'Modern Pro' },
    { id: 'compact', label: 'Compact ATS' },
    { id: 'executive', label: 'Executive' },
    { id: 'developer', label: 'Developer CV' },
    { id: 'freeform', label: 'Blank / Freeform' },
  ];

  const fonts: { id: FontType; label: string }[] = [
    { id: 'inter', label: 'Inter (Sans)' },
    { id: 'roboto', label: 'Roboto (Sans)' },
    { id: 'arial', label: 'Arial (Universal ATS)' },
    { id: 'georgia', label: 'Georgia (Serif)' },
    { id: 'times', label: 'Times New Roman' },
    { id: 'garamond', label: 'Garamond' },
  ];

  const fontSizes: { id: FontSize; label: string; pt: string }[] = [
    { id: 'xsmall', label: 'Extra Small', pt: '10pt' },
    { id: 'compact', label: 'Compact', pt: '11pt' },
    { id: 'normal', label: 'Standard', pt: '12pt' },
    { id: 'spacious', label: 'Medium', pt: '13pt' },
    { id: 'large', label: 'Large', pt: '14pt' },
  ];

  const margins: { id: MarginType; label: string }[] = [
    { id: 'compact', label: 'Compact Margins' },
    { id: 'normal', label: 'Normal Margins' },
    { id: 'spacious', label: 'Spacious Margins' },
  ];

  // Quick Font Size Stepper
  const sizeOrder: FontSize[] = ['xsmall', 'compact', 'normal', 'spacious', 'large'];
  const currentSizeIndex = sizeOrder.indexOf(settings.fontSize || 'normal');

  const handleDecreaseFontSize = () => {
    if (currentSizeIndex > 0) {
      onUpdateSettings({ fontSize: sizeOrder[currentSizeIndex - 1] });
    }
  };

  const handleIncreaseFontSize = () => {
    if (currentSizeIndex < sizeOrder.length - 1) {
      onUpdateSettings({ fontSize: sizeOrder[currentSizeIndex + 1] });
    }
  };

  const toggleFitOnePage = () => {
    const nextFit = !settings.fitOnePage;
    if (nextFit) {
      // Auto compress to fit 1 page
      onUpdateSettings({
        fitOnePage: true,
        fontSize: 'compact',
        spacing: 'compact',
        marginSize: 'compact',
      });
    } else {
      onUpdateSettings({ fitOnePage: false });
    }
  };

  return (
    <div className="no-print bg-white border border-slate-200 rounded-2xl p-3 sm:p-3.5 space-y-3 shadow-xs mb-4">
      {/* Top Bar: Template Selector Pills */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
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

        {/* 1-Page Fit Magic Button */}
        <button
          onClick={toggleFitOnePage}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer ${
            settings.fitOnePage
              ? 'bg-emerald-600 hover:bg-emerald-700 text-white ring-2 ring-emerald-300'
              : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300'
          }`}
          title="Automatically compress font size and margins to fit onto exactly 1 page"
        >
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>{settings.fitOnePage ? '✓ 1-Page Fit Active' : '🎯 Fit to 1 Page'}</span>
        </button>
      </div>

      {/* Second Bar: Font Styling, Font Size Stepper, Margins, Zoom & Export */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-3 flex-wrap">
        {/* Font Family & Size Adjustments */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Font Family */}
          <select
            value={settings.font}
            onChange={(e) => onUpdateSettings({ font: e.target.value as FontType })}
            className="bg-slate-50 border border-slate-300 text-slate-800 text-xs rounded-xl px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
            title="Choose ATS font"
          >
            {fonts.map((f) => (
              <option key={f.id} value={f.id}>
                {f.label}
              </option>
            ))}
          </select>

          {/* Font Size Dropdown & Stepper */}
          <div className="flex items-center bg-slate-100 rounded-xl p-0.5 border border-slate-200">
            <button
              onClick={handleDecreaseFontSize}
              disabled={currentSizeIndex === 0}
              className="px-2 py-1 text-xs font-bold text-slate-700 hover:text-slate-950 disabled:opacity-30 cursor-pointer"
              title="Decrease Font Size (A-)"
            >
              A-
            </button>
            <select
              value={settings.fontSize || 'normal'}
              onChange={(e) => onUpdateSettings({ fontSize: e.target.value as FontSize })}
              className="bg-transparent border-none text-slate-800 text-xs font-semibold py-1 px-1 focus:outline-none cursor-pointer"
              title="Font size selection"
            >
              {fontSizes.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label} ({s.pt})
                </option>
              ))}
            </select>
            <button
              onClick={handleIncreaseFontSize}
              disabled={currentSizeIndex === sizeOrder.length - 1}
              className="px-2 py-1 text-xs font-bold text-slate-700 hover:text-slate-950 disabled:opacity-30 cursor-pointer"
              title="Increase Font Size (A+)"
            >
              A+
            </button>
          </div>

          {/* Margins */}
          <select
            value={settings.marginSize || 'normal'}
            onChange={(e) => onUpdateSettings({ marginSize: e.target.value as MarginType })}
            className="bg-slate-50 border border-slate-300 text-slate-800 text-xs rounded-xl px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500 hidden md:inline-block"
            title="Page Margins"
          >
            {margins.map((m) => (
              <option key={m.id} value={m.id}>
                {m.label}
              </option>
            ))}
          </select>
        </div>

        {/* Right side: Zoom & Download Buttons */}
        <div className="flex items-center gap-2 flex-wrap ml-auto">
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

          {/* PDF Download Button */}
          <button
            onClick={onPrintPdf}
            disabled={isGeneratingPdf}
            className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-md transition-all cursor-pointer transform hover:-translate-y-0.5"
            title="Download ATS vector PDF directly (No extra watermarks or headers)"
          >
            {isGeneratingPdf ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Printer className="w-3.5 h-3.5 text-blue-400" />
            )}
            <span>Download PDF</span>
          </button>

          {/* Plain Text (.txt) Download */}
          <button
            onClick={onDownloadTxt}
            className="flex items-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-2.5 py-2 rounded-xl border border-slate-200 transition-colors"
            title="Download plain text (.txt)"
          >
            <FileText className="w-3.5 h-3.5 text-slate-600" />
            <span className="hidden sm:inline">.TXT</span>
          </button>

          {/* Copy Plain Text */}
          <button
            onClick={onCopyTxt}
            className="flex items-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-2.5 py-2 rounded-xl border border-slate-200 transition-colors"
            title="Copy CV text to clipboard"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-semibold hidden sm:inline">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-600" />
                <span className="hidden sm:inline">Copy</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
