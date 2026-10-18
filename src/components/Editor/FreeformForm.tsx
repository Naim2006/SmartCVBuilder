import React from 'react';
import type { ResumeData } from '../../types/cv';
import {
  FileText,
  Sparkles,
  Heading,
  List,
  RotateCcw,
  CheckCircle2,
  Copy,
} from 'lucide-react';
import { generatePlainTextResume } from '../../utils/textExporter';

interface FreeformFormProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

export const FreeformForm: React.FC<FreeformFormProps> = ({ data, onChange }) => {
  const currentText = data.freeformText || '';

  const handleTextChange = (text: string) => {
    onChange({
      ...data,
      freeformText: text,
      freeformMode: true,
      settings: {
        ...data.settings,
        template: 'freeform',
      },
    });
  };

  const insertSnippet = (snippet: string) => {
    const updated = currentText ? `${currentText}\n\n${snippet}` : snippet;
    handleTextChange(updated);
  };

  const handleConvertStructuredToFreeform = () => {
    const plainText = generatePlainTextResume(data);
    handleTextChange(plainText);
  };

  const handleLoadBlankStarter = () => {
    const starter = `## PROFESSIONAL SUMMARY\nDynamic and motivated professional with demonstrated success in driving organizational goals, problem-solving, and cross-functional team collaboration.\n\n## CORE SKILLS\n- Technical Skills: React, TypeScript, JavaScript, SQL, Git, REST APIs\n- Business Competencies: Project Management, Agile/Scrum, Communication, Strategic Leadership\n\n## WORK EXPERIENCE\nSenior Specialist — Apex Solutions Inc (2022 – Present)\n- Engineered core product features improving user engagement by 40%.\n- Directed cross-disciplinary sprints delivering milestones 2 weeks ahead of target.\n- Conducted code audits and mentored 5 junior teammates.\n\nOperations Analyst — TechCorp Dynamics (2019 – 2022)\n- Streamlined operational reporting workflows reducing data latency by 35%.\n- Prepared executive briefs and maintained SLA performance standards.\n\n## EDUCATION\nBachelor of Science in Information Technology\nMetropolitan University | GPA: 3.8/4.0 (2015 – 2019)\n\n## CERTIFICATIONS\n- Certified ScrumMaster (CSM) — Scrum Alliance\n- AWS Certified Solutions Architect — Amazon Web Services`;
    handleTextChange(starter);
  };

  return (
    <div className="space-y-4">
      <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-3.5 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-900">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>Blank / Freeform CV Maker Mode</span>
          </div>
          <span className="text-[10px] bg-blue-100 text-blue-800 font-semibold px-2 py-0.5 rounded-full">
            Full Creative Freedom
          </span>
        </div>
        <p className="text-[11px] text-blue-800 leading-relaxed">
          Type or paste your CV text freely. Use <code>## HEADING</code> for section titles, and <code>- Bullet point</code> for achievements. Everything is formatted instantly to ATS standards!
        </p>

        <div className="flex items-center gap-2 pt-1 flex-wrap">
          <button
            type="button"
            onClick={handleLoadBlankStarter}
            className="px-2.5 py-1 bg-white hover:bg-blue-50 text-blue-700 text-xs font-semibold rounded-lg border border-blue-300 shadow-2xs transition-colors flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Load Sample Starter</span>
          </button>
          <button
            type="button"
            onClick={handleConvertStructuredToFreeform}
            className="px-2.5 py-1 bg-white hover:bg-blue-50 text-blue-700 text-xs font-semibold rounded-lg border border-blue-300 shadow-2xs transition-colors flex items-center gap-1 cursor-pointer"
            title="Convert your existing form sections into editable text"
          >
            <Copy className="w-3 h-3" />
            <span>Import Current Form Data</span>
          </button>
        </div>
      </div>

      {/* Quick Insert Toolbar */}
      <div className="flex items-center gap-1.5 flex-wrap">
        <span className="text-[11px] font-bold text-slate-500 mr-1">Insert:</span>
        <button
          type="button"
          onClick={() => insertSnippet('## SECTION TITLE')}
          className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold rounded-md border border-slate-200 flex items-center gap-1 cursor-pointer"
        >
          <Heading className="w-3 h-3 text-slate-500" />
          <span>+ Section</span>
        </button>
        <button
          type="button"
          onClick={() => insertSnippet('Job Title — Company Name (2022 – Present)\n- Spearheaded key project achieving 25% efficiency.\n- Collaborated with teams to meet SLAs.')}
          className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold rounded-md border border-slate-200 flex items-center gap-1 cursor-pointer"
        >
          <FileText className="w-3 h-3 text-slate-500" />
          <span>+ Experience</span>
        </button>
        <button
          type="button"
          onClick={() => insertSnippet('- Key achievement or skill bullet point')}
          className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold rounded-md border border-slate-200 flex items-center gap-1 cursor-pointer"
        >
          <List className="w-3 h-3 text-slate-500" />
          <span>+ Bullet</span>
        </button>
      </div>

      {/* Text Area */}
      <div className="space-y-1">
        <textarea
          rows={18}
          value={currentText}
          onChange={(e) => handleTextChange(e.target.value)}
          placeholder={`## PROFESSIONAL SUMMARY\nWrite your summary here...\n\n## WORK EXPERIENCE\nSoftware Engineer — ABC Company (2022 – Present)\n- Designed microservices...\n- Improved performance...\n\n## EDUCATION\nB.Sc. in Computer Science — University Name (2018 – 2022)\n\n## SKILLS\n- JavaScript, React, Python, SQL`}
          className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3.5 text-xs text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all leading-relaxed"
        />
        <div className="flex items-center justify-between text-[11px] text-slate-500 px-1">
          <span>{currentText.length} characters • {currentText.split('\n').filter(Boolean).length} lines</span>
          <span className="text-emerald-600 font-medium flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            Live sync with Preview & PDF
          </span>
        </div>
      </div>
    </div>
  );
};
