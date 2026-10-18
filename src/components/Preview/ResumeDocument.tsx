import React, { useEffect, useRef, useState } from 'react';
import type { ResumeData } from '../../types/cv';
import { ClassicTemplate } from './Templates/ClassicTemplate';
import { ModernTemplate } from './Templates/ModernTemplate';
import { CompactTemplate } from './Templates/CompactTemplate';
import { ExecutiveTemplate } from './Templates/ExecutiveTemplate';
import { DeveloperTemplate } from './Templates/DeveloperTemplate';
import { FreeformTemplate } from './Templates/FreeformTemplate';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';

interface ResumeDocumentProps {
  data: ResumeData;
  scale?: number;
}

export const ResumeDocument: React.FC<ResumeDocumentProps> = ({ data, scale = 1 }) => {
  const { settings } = data;
  const docRef = useRef<HTMLDivElement>(null);
  const [docHeight, setDocHeight] = useState<number>(0);

  // A4 standard height at 96 DPI is approximately 1122px (297mm)
  const A4_PAGE_HEIGHT = 1122;

  useEffect(() => {
    if (!docRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setDocHeight(entry.contentRect.height);
      }
    });
    observer.observe(docRef.current);
    return () => observer.disconnect();
  }, [data]);

  const isOverOnePage = docHeight > A4_PAGE_HEIGHT + 10;
  const calculatedPageCount = Math.max(1, Math.ceil(docHeight / A4_PAGE_HEIGHT));

  const fontClass =
    {
      inter: 'font-sans',
      roboto: 'font-sans',
      arial: 'font-sans font-normal',
      georgia: 'font-serif',
      times: 'font-serif',
      garamond: 'font-serif',
    }[settings.font] || 'font-sans';

  const sizeClass =
    {
      xsmall: 'text-[10px] leading-snug',
      compact: 'text-[11px] leading-tight',
      normal: 'text-[12px] leading-normal',
      spacious: 'text-[13px] leading-relaxed',
      large: 'text-[14px] leading-relaxed',
    }[settings.fontSize] || 'text-[12px] leading-normal';

  const spacingClass =
    {
      compact: 'space-y-1',
      normal: 'space-y-2',
      relaxed: 'space-y-3',
    }[settings.spacing] || 'space-y-2';

  const marginClass =
    {
      compact: 'p-6 sm:p-7',
      normal: 'p-8 sm:p-10',
      spacious: 'p-10 sm:p-12',
    }[settings.marginSize || 'normal'];

  const renderTemplate = () => {
    if (data.freeformMode || settings.template === 'freeform') {
      return <FreeformTemplate data={data} />;
    }

    switch (settings.template) {
      case 'modern':
        return <ModernTemplate data={data} />;
      case 'compact':
        return <CompactTemplate data={data} />;
      case 'executive':
        return <ExecutiveTemplate data={data} />;
      case 'developer':
        return <DeveloperTemplate data={data} />;
      case 'classic':
      default:
        return <ClassicTemplate data={data} />;
    }
  };

  return (
    <div
      id="cv-preview-container"
      className="transition-transform duration-200 origin-top flex flex-col items-center w-full"
      style={{ transform: `scale(${scale})` }}
    >
      {/* On-screen Page Fit Alert Pill (Screen only, hidden in print) */}
      <div className="no-print mb-2.5 flex items-center gap-2 text-xs font-medium">
        {settings.fitOnePage || !isOverOnePage ? (
          <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full text-[11px] font-semibold shadow-2xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Fits on exactly 1 Page ({docHeight}px / {A4_PAGE_HEIGHT}px)</span>
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-800 border border-amber-300 px-3 py-1 rounded-full text-[11px] font-semibold shadow-2xs">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            <span>
              Spills over to {calculatedPageCount} Pages. Reduce font size or enable "Fit 1 Page".
            </span>
          </span>
        )}
      </div>

      <div
        ref={docRef}
        id="cv-document"
        className={`bg-white text-gray-900 shadow-xl rounded-sm w-full max-w-[800px] min-h-[1122px] box-border relative border border-slate-200 ${fontClass} ${sizeClass} ${spacingClass} ${marginClass} ${
          settings.fitOnePage ? 'strict-one-page' : ''
        }`}
        style={{
          fontFamily:
            settings.font === 'times'
              ? '"Times New Roman", Times, serif'
              : settings.font === 'georgia'
              ? 'Georgia, serif'
              : settings.font === 'garamond'
              ? 'Garamond, Baskerville, serif'
              : settings.font === 'arial'
              ? 'Arial, Helvetica, sans-serif'
              : 'Inter, system-ui, -apple-system, sans-serif',
        }}
      >
        {renderTemplate()}

        {/* Visual A4 Page 1 Boundary Indicator (Visible only in screen preview if content overflows) */}
        {isOverOnePage && (
          <div
            className="no-print absolute left-0 right-0 border-b-2 border-dashed border-rose-400 pointer-events-none z-10 flex items-center justify-between px-3 py-0.5 bg-rose-50/90 text-[10px] font-bold text-rose-600 shadow-xs"
            style={{ top: `${A4_PAGE_HEIGHT}px` }}
          >
            <span>✂️ PAGE 1 END (A4 Boundary)</span>
            <span>Content below this line will print on Page 2</span>
          </div>
        )}
      </div>
    </div>
  );
};
