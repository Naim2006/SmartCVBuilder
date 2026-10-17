import React, { useState } from 'react';
import type { ResumeData, ResumeSettings } from '../../types/cv';
import { PersonalInfoForm } from './PersonalInfoForm';
import { ExperienceForm } from './ExperienceForm';
import { SkillsForm } from './SkillsForm';
import { EducationForm } from './EducationForm';
import { ProjectsForm } from './ProjectsForm';
import { CertificationsForm } from './CertificationsForm';
import { AdditionalSectionsForm } from './AdditionalSectionsForm';
import { SectionManager } from './SectionManager';
import {
  User,
  Briefcase,
  Wrench,
  GraduationCap,
  FolderGit2,
  Award,
  Layers,
  Sparkles,
  RotateCcw,
  Sliders,
} from 'lucide-react';
import {
  SAMPLE_SOFTWARE_ENGINEER,
  SAMPLE_PRODUCT_MANAGER,
  BLANK_RESUME,
} from '../../data/sampleResumes';

interface EditorSidebarProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
  onOpenActionVerbs: () => void;
}

type TabType =
  | 'personal'
  | 'experience'
  | 'skills'
  | 'education'
  | 'projects'
  | 'certifications'
  | 'additional'
  | 'layout';

export const EditorSidebar: React.FC<EditorSidebarProps> = ({
  data,
  onChange,
  onOpenActionVerbs,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('personal');

  const tabs: { id: TabType; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'personal', label: 'Contact', icon: User },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'skills', label: 'Skills', icon: Wrench },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'certifications', label: 'Certs', icon: Award },
    { id: 'additional', label: 'More', icon: Sparkles },
    { id: 'layout', label: 'Sections', icon: Layers },
  ];

  // Core sections completion progress
  const hasName = Boolean(data.personalDetails.fullName.trim());
  const hasContact = Boolean(data.personalDetails.email.trim() && data.personalDetails.phone.trim());
  const hasExp = data.experience.length > 0 && Boolean(data.experience[0].role);
  const hasSkills = data.skillCategories.some((c) => c.skills.length > 0);
  const hasEdu = data.education.length > 0 && Boolean(data.education[0].institution);

  const coreChecks = [hasName, hasContact, hasExp, hasSkills, hasEdu];
  const completedCoreCount = coreChecks.filter(Boolean).length;
  const corePercentage = Math.round((completedCoreCount / coreChecks.length) * 100);

  const handleUpdateSettings = (updated: Partial<ResumeSettings>) => {
    onChange({
      ...data,
      settings: { ...data.settings, ...updated },
    });
  };

  const accentColors = [
    { label: 'Navy Charcoal (Standard)', hex: '#0f172a' },
    { label: 'Deep Blue', hex: '#1e3a8a' },
    { label: 'Royal Blue', hex: '#2563eb' },
    { label: 'Teal Blue', hex: '#0369a1' },
    { label: 'Forest Green', hex: '#065f46' },
    { label: 'Burgundy', hex: '#831843' },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col h-full overflow-hidden">
      {/* Sample Presets & Progress Bar */}
      <div className="p-3.5 border-b border-slate-100 bg-slate-50 flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="text-[11px] font-semibold text-slate-700">Core Readiness:</div>
          <div className="w-20 bg-slate-200 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-blue-600 h-full rounded-full transition-all duration-300"
              style={{ width: `${corePercentage}%` }}
            />
          </div>
          <span className="text-[10px] font-mono text-slate-500 font-semibold">{corePercentage}%</span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => onChange(SAMPLE_SOFTWARE_ENGINEER)}
            className="px-2 py-1 bg-white hover:bg-slate-100 text-slate-700 text-[11px] font-medium rounded-md border border-slate-200 shadow-2xs transition-colors"
          >
            Sample Dev
          </button>
          <button
            type="button"
            onClick={() => onChange(SAMPLE_PRODUCT_MANAGER)}
            className="px-2 py-1 bg-white hover:bg-slate-100 text-slate-700 text-[11px] font-medium rounded-md border border-slate-200 shadow-2xs transition-colors"
          >
            Sample PM
          </button>
          <button
            type="button"
            onClick={() => onChange(BLANK_RESUME)}
            className="px-2 py-1 bg-white hover:bg-slate-100 text-slate-600 text-[11px] font-medium rounded-md border border-slate-200 shadow-2xs transition-colors flex items-center gap-1"
            title="Start from blank slate"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Blank</span>
          </button>
        </div>
      </div>

      {/* Navigation tabs */}
      <div className="flex border-b border-slate-200 overflow-x-auto scrollbar-none bg-white">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-semibold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'border-blue-600 text-blue-600 bg-blue-50/50'
                  : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Form Content Area */}
      <div className="p-4 sm:p-5 overflow-y-auto flex-1 space-y-4">
        {activeTab === 'personal' && (
          <PersonalInfoForm
            data={data.personalDetails}
            onChange={(updated) => onChange({ ...data, personalDetails: updated })}
          />
        )}

        {activeTab === 'experience' && (
          <ExperienceForm
            items={data.experience}
            onChange={(items) => onChange({ ...data, experience: items })}
            onOpenActionVerbs={onOpenActionVerbs}
          />
        )}

        {activeTab === 'skills' && (
          <SkillsForm
            categories={data.skillCategories}
            onChange={(skillCategories) => onChange({ ...data, skillCategories })}
          />
        )}

        {activeTab === 'education' && (
          <EducationForm
            items={data.education}
            onChange={(education) => onChange({ ...data, education })}
          />
        )}

        {activeTab === 'projects' && (
          <ProjectsForm
            items={data.projects}
            onChange={(projects) => onChange({ ...data, projects })}
          />
        )}

        {activeTab === 'certifications' && (
          <CertificationsForm
            items={data.certifications}
            onChange={(certifications) => onChange({ ...data, certifications })}
          />
        )}

        {activeTab === 'additional' && (
          <AdditionalSectionsForm
            volunteer={data.volunteer}
            awards={data.awards}
            courses={data.courses}
            languages={data.languages}
            publications={data.publications}
            customSections={data.customSections}
            onChange={(updates) => onChange({ ...data, ...updates })}
          />
        )}

        {activeTab === 'layout' && (
          <div className="space-y-5">
            {/* Section Ordering & Visibility */}
            <SectionManager
              settings={data.settings}
              onChangeSettings={handleUpdateSettings}
            />

            {/* Design & Spacing Controls */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm space-y-3">
              <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-blue-600" />
                <span>Document Typography & Accent Colors</span>
              </h3>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                  Primary Accent Color (Headings & Dividers)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {accentColors.map((color) => (
                    <button
                      key={color.hex}
                      type="button"
                      onClick={() => handleUpdateSettings({ primaryColor: color.hex })}
                      className={`flex items-center gap-2 p-2 rounded-lg border text-left text-xs transition-all ${
                        data.settings.primaryColor === color.hex
                          ? 'border-blue-600 bg-blue-50 text-blue-900 ring-1 ring-blue-500 font-bold'
                          : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-slate-300 flex-shrink-0"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span className="truncate">{color.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Font Density
                  </label>
                  <select
                    value={data.settings.fontSize}
                    onChange={(e) =>
                      handleUpdateSettings({ fontSize: e.target.value as ResumeSettings['fontSize'] })
                    }
                    className="w-full bg-slate-50 border border-slate-300 text-slate-800 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="compact">Compact (Fit 1 page)</option>
                    <option value="normal">Standard (Recommended)</option>
                    <option value="spacious">Spacious (Senior)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Line Spacing
                  </label>
                  <select
                    value={data.settings.spacing}
                    onChange={(e) =>
                      handleUpdateSettings({ spacing: e.target.value as ResumeSettings['spacing'] })
                    }
                    className="w-full bg-slate-50 border border-slate-300 text-slate-800 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="compact">Compact</option>
                    <option value="normal">Normal</option>
                    <option value="relaxed">Relaxed</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
