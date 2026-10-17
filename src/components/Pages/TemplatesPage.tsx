import React from 'react';
import type { TemplateType } from '../../types/cv';
import { ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

interface TemplatesPageProps {
  currentTemplate: TemplateType;
  onSelectTemplate: (template: TemplateType) => void;
}

export const TemplatesPage: React.FC<TemplatesPageProps> = ({
  currentTemplate,
  onSelectTemplate,
}) => {
  const templates: {
    id: TemplateType;
    name: string;
    description: string;
    badge: string;
    bestFor: string;
    features: string[];
  }[] = [
    {
      id: 'classic',
      name: 'Classic ATS',
      description: 'Single-column traditional layout modeled after Harvard and Ivy League standards. Features clear horizontal rules, bold headings, and standard bullet indentation.',
      badge: 'Maximum ATS Compatibility',
      bestFor: 'Corporate, Banking, Entry-Level, Legal, and General Applications',
      features: [
        'Single-column structure (100% linear ATS parsing)',
        'Clear standard section headings',
        'Standard ATS web-safe serif/sans-serif typography',
        'High contrast black and charcoal formatting',
      ],
    },
    {
      id: 'modern',
      name: 'Modern Professional',
      description: 'Clean modern typography with subtle primary accent dividers and distinct metadata alignment. Balances visual appeal for human recruiters with strict machine-readability.',
      badge: 'Recruiter Favorite',
      bestFor: 'Business, Tech, Management, Design, and Marketing Roles',
      features: [
        'Structured header with compact contact matrix',
        'Left-border section hierarchy',
        'Categorized skills grid layout',
        'Modern sans-serif typography',
      ],
    },
    {
      id: 'compact',
      name: 'Compact ATS',
      description: 'High-density, space-efficient layout with refined margins and condensed line spacing. Perfect for fitting extensive experience into a strict 1-page document without spilling.',
      badge: 'High Density 1-Page',
      bestFor: 'Mid-Level Professionals, Dense Technical Experience, Career Switchers',
      features: [
        'Optimized margins to prevent awkward overflow',
        'Streamlined section headers',
        'High data-to-ink ratio',
        'Tightly formatted bullet items',
      ],
    },
    {
      id: 'executive',
      name: 'Executive',
      description: 'Authoritative, refined serif design with prominent candidate name and headline. Structured to spotlight leadership milestones, board credentials, and strategic impact.',
      badge: 'Senior & Executive',
      bestFor: 'Directors, VPs, Executives, Senior Managers, Academic Leaders',
      features: [
        'Refined serif typography (Times / Georgia / Garamond)',
        'Prominent professional summary section',
        'Strategic initiatives and achievements emphasis',
        'Spacious, dignified layout',
      ],
    },
    {
      id: 'developer',
      name: 'Developer CV',
      description: 'Engineered specifically for software engineers, DevOps, and IT professionals. Positions the technical skills matrix upfront and highlights GitHub repositories and live deployments.',
      badge: 'Tech Specialist',
      bestFor: 'Software Engineers, DevOps, Data Scientists, IT Specialists',
      features: [
        'Technical arsenal section prioritized at the top',
        'Project tech stack tags and GitHub repository links',
        'Subtle monospace code aesthetics',
        'Recruiter-tested bullet point structure',
      ],
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8 text-slate-800">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold border border-blue-200">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>100% Machine-Readable Vector Designs</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Professional CV Templates
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Switching templates never loses your entered data. Choose a design optimized for your target industry and job level.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {templates.map((tpl) => {
          const isSelected = currentTemplate === tpl.id;
          return (
            <div
              key={tpl.id}
              className={`bg-white border rounded-2xl p-6 shadow-sm flex flex-col justify-between transition-all space-y-5 ${
                isSelected ? 'border-blue-600 ring-2 ring-blue-500/20' : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full border border-blue-100">
                    {tpl.badge}
                  </span>
                  {isSelected && (
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      Currently Active
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-slate-900">{tpl.name}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{tpl.description}</p>

                <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Best Suited For:
                  </span>
                  <span className="text-xs font-semibold text-slate-800">{tpl.bestFor}</span>
                </div>

                <div className="space-y-1.5 pt-1">
                  {tpl.features.map((feat, i) => (
                    <div key={i} className="text-xs text-slate-600 flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => onSelectTemplate(tpl.id)}
                className={`w-full py-2.5 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-slate-900 hover:bg-slate-800 text-white'
                }`}
              >
                <span>{isSelected ? 'Continue in Editor' : `Use ${tpl.name}`}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
