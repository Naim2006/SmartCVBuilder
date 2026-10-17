import React from 'react';
import type { ResumeData } from '../../types/cv';
import { ClassicTemplate } from './Templates/ClassicTemplate';
import { ModernTemplate } from './Templates/ModernTemplate';
import { CompactTemplate } from './Templates/CompactTemplate';
import { ExecutiveTemplate } from './Templates/ExecutiveTemplate';
import { DeveloperTemplate } from './Templates/DeveloperTemplate';

interface ResumeDocumentProps {
  data: ResumeData;
  scale?: number;
}

export const ResumeDocument: React.FC<ResumeDocumentProps> = ({ data, scale = 1 }) => {
  const { settings } = data;

  const fontClass = {
    inter: 'font-sans',
    roboto: 'font-sans',
    arial: 'font-sans font-normal',
    georgia: 'font-serif',
    times: 'font-serif',
    garamond: 'font-serif',
  }[settings.font] || 'font-sans';

  const sizeClass = {
    compact: 'text-[11.5px]',
    normal: 'text-[12.5px]',
    spacious: 'text-[13.5px]',
  }[settings.fontSize] || 'text-[12.5px]';

  const spacingClass = {
    compact: 'leading-tight space-y-1.5',
    normal: 'leading-normal space-y-2.5',
    relaxed: 'leading-relaxed space-y-3.5',
  }[settings.spacing] || 'leading-normal space-y-2.5';

  const renderTemplate = () => {
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
      className="transition-transform duration-200 origin-top flex justify-center w-full"
      style={{ transform: `scale(${scale})` }}
    >
      <div
        id="cv-document"
        className={`bg-white text-gray-900 shadow-xl rounded-sm p-8 sm:p-11 w-full max-w-[800px] min-h-[1050px] box-border relative border border-slate-200 ${fontClass} ${sizeClass} ${spacingClass}`}
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
      </div>
    </div>
  );
};
