import React, { useState } from 'react';
import type { ResumeData, ResumeSettings } from '../../types/cv';
import { PersonalInfoForm } from './PersonalInfoForm';
import { ExperienceForm } from './ExperienceForm';
import { SkillsForm } from './SkillsForm';
import { EducationForm } from './EducationForm';
import { ProjectsForm } from './ProjectsForm';
import { CertificationsForm } from './CertificationsForm';
import { AdditionalSectionsForm } from './AdditionalSectionsForm';
import { FreeformForm } from './FreeformForm';
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
  ChevronDown,
  ChevronUp,
  MoveUp,
  MoveDown,
  Eye,
  EyeOff,
  Edit2,
  FileEdit,
  ListOrdered,
  LayoutGrid,
} from 'lucide-react';
import {
  SAMPLE_SOFTWARE_ENGINEER,
  SAMPLE_PRODUCT_MANAGER,
  BLANK_RESUME,
  BLANK_FREEFORM_RESUME,
} from '../../data/sampleResumes';

interface EditorSidebarProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
  onOpenActionVerbs: () => void;
}

type TabType =
  | 'personal'
  | 'experience'
  | 'education'
  | 'skills'
  | 'projects'
  | 'certifications'
  | 'additional'
  | 'freeform'
  | 'layout';

export const EditorSidebar: React.FC<EditorSidebarProps> = ({
  data,
  onChange,
  onOpenActionVerbs,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>(data.freeformMode ? 'freeform' : 'personal');
  const [viewMode, setViewMode] = useState<'tabs' | 'accordion'>('tabs');
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    personal: true,
    experience: true,
    education: true,
    skills: false,
    projects: false,
    certifications: false,
    additional: false,
    freeform: true,
  });
  const [editingTitleKey, setEditingTitleKey] = useState<string | null>(null);

  const tabs: { id: TabType; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'personal', label: 'Personal Details', icon: User },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'skills', label: 'Skills', icon: Wrench },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'certifications', label: 'Certs', icon: Award },
    { id: 'additional', label: 'More', icon: Sparkles },
    { id: 'freeform', label: 'Blank / Freeform', icon: FileEdit },
    { id: 'layout', label: 'Sections & Order', icon: Layers },
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

  const toggleAccordion = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const sectionOrder = data.settings.sectionOrder || [
    'experience',
    'education',
    'skills',
    'projects',
    'certifications',
    'volunteer',
    'awards',
    'courses',
    'languages',
    'publications',
    'custom',
  ];

  const visibility = data.settings.sectionVisibility || {};
  const customTitles = data.settings.sectionTitles || {};

  const handleMoveSection = (key: string, direction: 'up' | 'down') => {
    const idx = sectionOrder.indexOf(key);
    if (idx === -1) return;
    if (direction === 'up' && idx > 0) {
      const next = [...sectionOrder];
      const temp = next[idx - 1];
      next[idx - 1] = next[idx];
      next[idx] = temp;
      handleUpdateSettings({ sectionOrder: next });
    } else if (direction === 'down' && idx < sectionOrder.length - 1) {
      const next = [...sectionOrder];
      const temp = next[idx + 1];
      next[idx + 1] = next[idx];
      next[idx] = temp;
      handleUpdateSettings({ sectionOrder: next });
    }
  };

  const handleToggleSectionVisibility = (key: string) => {
    const nextVis = { ...visibility, [key]: !visibility[key] };
    handleUpdateSettings({ sectionVisibility: nextVis });
  };

  const handleSetSectionTitle = (key: string, title: string) => {
    const nextTitles = { ...customTitles, [key]: title };
    handleUpdateSettings({ sectionTitles: nextTitles });
  };

  const getSectionTitle = (key: string, defaultName: string) => {
    return customTitles[key] || defaultName;
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col h-full overflow-hidden">
      {/* Top Preset Bar & Readiness */}
      <div className="p-3 border-b border-slate-100 bg-slate-50 flex items-center justify-between gap-2.5 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="text-[11px] font-bold text-slate-700">Readiness:</div>
          <div className="w-16 bg-slate-200 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-blue-600 h-full rounded-full transition-all duration-300"
              style={{ width: `${corePercentage}%` }}
            />
          </div>
          <span className="text-[10px] font-mono text-slate-500 font-semibold">{corePercentage}%</span>
        </div>

        {/* Quick Presets */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            type="button"
            onClick={() => onChange(SAMPLE_SOFTWARE_ENGINEER)}
            className="px-2 py-1 bg-white hover:bg-slate-100 text-slate-700 text-[11px] font-medium rounded-md border border-slate-200 shadow-2xs transition-colors cursor-pointer"
          >
            Sample Dev
          </button>
          <button
            type="button"
            onClick={() => onChange(SAMPLE_PRODUCT_MANAGER)}
            className="px-2 py-1 bg-white hover:bg-slate-100 text-slate-700 text-[11px] font-medium rounded-md border border-slate-200 shadow-2xs transition-colors cursor-pointer"
          >
            Sample PM
          </button>
          <button
            type="button"
            onClick={() => {
              onChange(BLANK_FREEFORM_RESUME);
              setActiveTab('freeform');
            }}
            className="px-2 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 text-[11px] font-bold rounded-md border border-blue-200 shadow-2xs transition-colors flex items-center gap-1 cursor-pointer"
            title="Write CV text freely without strict form fields"
          >
            <FileEdit className="w-3 h-3 text-blue-600" />
            <span>Blank CV Maker</span>
          </button>
          <button
            type="button"
            onClick={() => onChange(BLANK_RESUME)}
            className="px-2 py-1 bg-white hover:bg-slate-100 text-slate-600 text-[11px] font-medium rounded-md border border-slate-200 shadow-2xs transition-colors flex items-center gap-1 cursor-pointer"
            title="Clear all fields to start from scratch"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Clear</span>
          </button>
        </div>
      </div>

      {/* Section Navigation Header: Quick Dropdown & View Mode Switcher */}
      <div className="px-3.5 py-2 bg-slate-50/80 border-b border-slate-200 flex items-center justify-between gap-2 flex-wrap">
        {/* Quick Jump Dropdown */}
        <div className="flex items-center gap-1.5 flex-1 min-w-[200px]">
          <span className="text-[11px] font-bold text-slate-500 whitespace-nowrap">Jump to:</span>
          <select
            value={activeTab}
            onChange={(e) => {
              setActiveTab(e.target.value as TabType);
              if (viewMode === 'accordion') {
                setOpenSections((prev) => ({ ...prev, [e.target.value]: true }));
              }
            }}
            className="bg-white border border-slate-300 text-slate-800 text-xs font-semibold rounded-lg px-2.5 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500 w-full cursor-pointer shadow-2xs"
          >
            {tabs.map((t) => (
              <option key={t.id} value={t.id}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        {/* View Mode Switcher (Tabs vs Dropdown Accordions) */}
        <div className="flex items-center bg-slate-200/80 rounded-lg p-0.5">
          <button
            type="button"
            onClick={() => setViewMode('tabs')}
            className={`px-2 py-1 text-[11px] font-semibold rounded-md transition-all flex items-center gap-1 cursor-pointer ${
              viewMode === 'tabs'
                ? 'bg-white text-blue-700 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Horizontal tabs mode"
          >
            <LayoutGrid className="w-3 h-3" />
            <span className="hidden sm:inline">Tabs</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('accordion')}
            className={`px-2 py-1 text-[11px] font-semibold rounded-md transition-all flex items-center gap-1 cursor-pointer ${
              viewMode === 'accordion'
                ? 'bg-white text-blue-700 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Collapsible dropdown accordions mode"
          >
            <ListOrdered className="w-3 h-3" />
            <span>Drop Down View</span>
          </button>
        </div>
      </div>

      {/* Tabs Row (when in tabs mode) */}
      {viewMode === 'tabs' && (
        <div className="flex border-b border-slate-200 overflow-x-auto scrollbar-none bg-white">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
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
      )}

      {/* Main Content Area */}
      <div className="p-4 sm:p-5 overflow-y-auto flex-1 space-y-4">
        {/* TAB MODE CONTENT */}
        {viewMode === 'tabs' && (
          <>
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

            {activeTab === 'education' && (
              <EducationForm
                items={data.education}
                onChange={(education) => onChange({ ...data, education })}
              />
            )}

            {activeTab === 'skills' && (
              <SkillsForm
                categories={data.skillCategories}
                onChange={(skillCategories) => onChange({ ...data, skillCategories })}
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

            {activeTab === 'freeform' && (
              <FreeformForm data={data} onChange={onChange} />
            )}

            {activeTab === 'layout' && (
              <SectionManager
                settings={data.settings}
                onChangeSettings={handleUpdateSettings}
              />
            )}
          </>
        )}

        {/* ACCORDION / DROP DOWN MODE: ALL SECTIONS COLLAPSIBLE & REORDERABLE */}
        {viewMode === 'accordion' && (
          <div className="space-y-3">
            {/* 1. Contact / Personal Information Accordion */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
              <div
                onClick={() => toggleAccordion('personal')}
                className="px-4 py-3 bg-slate-50/90 hover:bg-slate-100 flex items-center justify-between cursor-pointer border-b border-slate-100 select-none"
              >
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-blue-600" />
                  <span className="font-bold text-xs text-slate-800">
                    Personal Details (Name, Contact, Links)
                  </span>
                </div>
                {openSections.personal ? (
                  <ChevronUp className="w-4 h-4 text-slate-500" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-500" />
                )}
              </div>
              {openSections.personal && (
                <div className="p-4 border-t border-slate-100 bg-white">
                  <PersonalInfoForm
                    data={data.personalDetails}
                    onChange={(updated) => onChange({ ...data, personalDetails: updated })}
                  />
                </div>
              )}
            </div>

            {/* Render Reorderable Sections in User-Specified Order */}
            {sectionOrder.map((sectionKey, index) => {
              if (sectionKey === 'experience') {
                const isShown = visibility.experience !== false;
                const title = getSectionTitle('experience', 'Work Experience');
                return (
                  <div key="experience" className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
                    <div className="px-3.5 py-2.5 bg-slate-50/90 flex items-center justify-between border-b border-slate-100">
                      <div
                        onClick={() => toggleAccordion('experience')}
                        className="flex items-center gap-2 cursor-pointer flex-1 select-none"
                      >
                        <Briefcase className="w-4 h-4 text-blue-600" />
                        {editingTitleKey === 'experience' ? (
                          <input
                            type="text"
                            value={title}
                            autoFocus
                            onClick={(e) => e.stopPropagation()}
                            onBlur={() => setEditingTitleKey(null)}
                            onChange={(e) => handleSetSectionTitle('experience', e.target.value)}
                            className="text-xs font-bold text-slate-900 border border-blue-400 rounded px-1.5 py-0.5 bg-white"
                          />
                        ) : (
                          <span className="font-bold text-xs text-slate-800 flex items-center gap-1.5">
                            <span>{title}</span>
                            <span
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditingTitleKey('experience');
                              }}
                              className="text-slate-400 hover:text-blue-600 cursor-pointer inline-flex items-center"
                              title="Rename section"
                            >
                              <Edit2 className="w-3 h-3" />
                            </span>
                          </span>
                        )}
                        <span className="text-[10px] text-slate-400 font-mono">({data.experience.length})</span>
                      </div>

                      {/* Controls: Reorder Up/Down, Visibility, Accordion Toggle */}
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleMoveSection('experience', 'up')}
                          disabled={index === 0}
                          className="p-1 text-slate-500 hover:text-slate-800 disabled:opacity-20 cursor-pointer"
                          title="Move section up"
                        >
                          <MoveUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleMoveSection('experience', 'down')}
                          disabled={index === sectionOrder.length - 1}
                          className="p-1 text-slate-500 hover:text-slate-800 disabled:opacity-20 cursor-pointer"
                          title="Move section down"
                        >
                          <MoveDown className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleToggleSectionVisibility('experience')}
                          className={`p-1 cursor-pointer ${isShown ? 'text-blue-600' : 'text-slate-400'}`}
                          title={isShown ? 'Visible on CV' : 'Hidden from CV'}
                        >
                          {isShown ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                        </button>
                        <button
                          type="button"
                          onClick={() => toggleAccordion('experience')}
                          className="p-1 text-slate-500 cursor-pointer"
                        >
                          {openSections.experience ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    {openSections.experience && (
                      <div className="p-4 bg-white border-t border-slate-100">
                        <ExperienceForm
                          items={data.experience}
                          onChange={(items) => onChange({ ...data, experience: items })}
                          onOpenActionVerbs={onOpenActionVerbs}
                        />
                      </div>
                    )}
                  </div>
                );
              }

              if (sectionKey === 'education') {
                const isShown = visibility.education !== false;
                const title = getSectionTitle('education', 'Education');
                return (
                  <div key="education" className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
                    <div className="px-3.5 py-2.5 bg-slate-50/90 flex items-center justify-between border-b border-slate-100">
                      <div
                        onClick={() => toggleAccordion('education')}
                        className="flex items-center gap-2 cursor-pointer flex-1 select-none"
                      >
                        <GraduationCap className="w-4 h-4 text-blue-600" />
                        {editingTitleKey === 'education' ? (
                          <input
                            type="text"
                            value={title}
                            autoFocus
                            onClick={(e) => e.stopPropagation()}
                            onBlur={() => setEditingTitleKey(null)}
                            onChange={(e) => handleSetSectionTitle('education', e.target.value)}
                            className="text-xs font-bold text-slate-900 border border-blue-400 rounded px-1.5 py-0.5 bg-white"
                          />
                        ) : (
                          <span className="font-bold text-xs text-slate-800 flex items-center gap-1.5">
                            <span>{title}</span>
                            <span
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditingTitleKey('education');
                              }}
                              className="text-slate-400 hover:text-blue-600 cursor-pointer inline-flex items-center"
                              title="Rename section"
                            >
                              <Edit2 className="w-3 h-3" />
                            </span>
                          </span>
                        )}
                        <span className="text-[10px] text-slate-400 font-mono">({data.education.length})</span>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleMoveSection('education', 'up')}
                          disabled={index === 0}
                          className="p-1 text-slate-500 hover:text-slate-800 disabled:opacity-20 cursor-pointer"
                          title="Move section up"
                        >
                          <MoveUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleMoveSection('education', 'down')}
                          disabled={index === sectionOrder.length - 1}
                          className="p-1 text-slate-500 hover:text-slate-800 disabled:opacity-20 cursor-pointer"
                          title="Move section down"
                        >
                          <MoveDown className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleToggleSectionVisibility('education')}
                          className={`p-1 cursor-pointer ${isShown ? 'text-blue-600' : 'text-slate-400'}`}
                          title={isShown ? 'Visible on CV' : 'Hidden from CV'}
                        >
                          {isShown ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                        </button>
                        <button
                          type="button"
                          onClick={() => toggleAccordion('education')}
                          className="p-1 text-slate-500 cursor-pointer"
                        >
                          {openSections.education ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    {openSections.education && (
                      <div className="p-4 bg-white border-t border-slate-100">
                        <EducationForm
                          items={data.education}
                          onChange={(education) => onChange({ ...data, education })}
                        />
                      </div>
                    )}
                  </div>
                );
              }

              if (sectionKey === 'skills') {
                const isShown = visibility.skills !== false;
                const title = getSectionTitle('skills', 'Skills & Competencies');
                return (
                  <div key="skills" className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
                    <div className="px-3.5 py-2.5 bg-slate-50/90 flex items-center justify-between border-b border-slate-100">
                      <div
                        onClick={() => toggleAccordion('skills')}
                        className="flex items-center gap-2 cursor-pointer flex-1 select-none"
                      >
                        <Wrench className="w-4 h-4 text-blue-600" />
                        {editingTitleKey === 'skills' ? (
                          <input
                            type="text"
                            value={title}
                            autoFocus
                            onClick={(e) => e.stopPropagation()}
                            onBlur={() => setEditingTitleKey(null)}
                            onChange={(e) => handleSetSectionTitle('skills', e.target.value)}
                            className="text-xs font-bold text-slate-900 border border-blue-400 rounded px-1.5 py-0.5 bg-white"
                          />
                        ) : (
                          <span className="font-bold text-xs text-slate-800 flex items-center gap-1.5">
                            <span>{title}</span>
                            <span
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditingTitleKey('skills');
                              }}
                              className="text-slate-400 hover:text-blue-600 cursor-pointer inline-flex items-center"
                              title="Rename section"
                            >
                              <Edit2 className="w-3 h-3" />
                            </span>
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleMoveSection('skills', 'up')}
                          disabled={index === 0}
                          className="p-1 text-slate-500 hover:text-slate-800 disabled:opacity-20 cursor-pointer"
                          title="Move section up"
                        >
                          <MoveUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleMoveSection('skills', 'down')}
                          disabled={index === sectionOrder.length - 1}
                          className="p-1 text-slate-500 hover:text-slate-800 disabled:opacity-20 cursor-pointer"
                          title="Move section down"
                        >
                          <MoveDown className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleToggleSectionVisibility('skills')}
                          className={`p-1 cursor-pointer ${isShown ? 'text-blue-600' : 'text-slate-400'}`}
                        >
                          {isShown ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                        </button>
                        <button
                          type="button"
                          onClick={() => toggleAccordion('skills')}
                          className="p-1 text-slate-500 cursor-pointer"
                        >
                          {openSections.skills ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    {openSections.skills && (
                      <div className="p-4 bg-white border-t border-slate-100">
                        <SkillsForm
                          categories={data.skillCategories}
                          onChange={(skillCategories) => onChange({ ...data, skillCategories })}
                        />
                      </div>
                    )}
                  </div>
                );
              }

              if (sectionKey === 'projects') {
                const isShown = visibility.projects !== false;
                const title = getSectionTitle('projects', 'Key Projects');
                return (
                  <div key="projects" className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
                    <div className="px-3.5 py-2.5 bg-slate-50/90 flex items-center justify-between border-b border-slate-100">
                      <div
                        onClick={() => toggleAccordion('projects')}
                        className="flex items-center gap-2 cursor-pointer flex-1 select-none"
                      >
                        <FolderGit2 className="w-4 h-4 text-blue-600" />
                        <span className="font-bold text-xs text-slate-800">{title}</span>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleMoveSection('projects', 'up')}
                          disabled={index === 0}
                          className="p-1 text-slate-500 hover:text-slate-800 disabled:opacity-20 cursor-pointer"
                        >
                          <MoveUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleMoveSection('projects', 'down')}
                          disabled={index === sectionOrder.length - 1}
                          className="p-1 text-slate-500 hover:text-slate-800 disabled:opacity-20 cursor-pointer"
                        >
                          <MoveDown className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleToggleSectionVisibility('projects')}
                          className={`p-1 cursor-pointer ${isShown ? 'text-blue-600' : 'text-slate-400'}`}
                        >
                          {isShown ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                        </button>
                        <button
                          type="button"
                          onClick={() => toggleAccordion('projects')}
                          className="p-1 text-slate-500 cursor-pointer"
                        >
                          {openSections.projects ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    {openSections.projects && (
                      <div className="p-4 bg-white border-t border-slate-100">
                        <ProjectsForm
                          items={data.projects}
                          onChange={(projects) => onChange({ ...data, projects })}
                        />
                      </div>
                    )}
                  </div>
                );
              }

              if (sectionKey === 'certifications') {
                const isShown = visibility.certifications !== false;
                const title = getSectionTitle('certifications', 'Certifications');
                return (
                  <div key="certifications" className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
                    <div className="px-3.5 py-2.5 bg-slate-50/90 flex items-center justify-between border-b border-slate-100">
                      <div
                        onClick={() => toggleAccordion('certifications')}
                        className="flex items-center gap-2 cursor-pointer flex-1 select-none"
                      >
                        <Award className="w-4 h-4 text-blue-600" />
                        <span className="font-bold text-xs text-slate-800">{title}</span>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleMoveSection('certifications', 'up')}
                          disabled={index === 0}
                          className="p-1 text-slate-500 hover:text-slate-800 disabled:opacity-20 cursor-pointer"
                        >
                          <MoveUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleMoveSection('certifications', 'down')}
                          disabled={index === sectionOrder.length - 1}
                          className="p-1 text-slate-500 hover:text-slate-800 disabled:opacity-20 cursor-pointer"
                        >
                          <MoveDown className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleToggleSectionVisibility('certifications')}
                          className={`p-1 cursor-pointer ${isShown ? 'text-blue-600' : 'text-slate-400'}`}
                        >
                          {isShown ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                        </button>
                        <button
                          type="button"
                          onClick={() => toggleAccordion('certifications')}
                          className="p-1 text-slate-500 cursor-pointer"
                        >
                          {openSections.certifications ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    {openSections.certifications && (
                      <div className="p-4 bg-white border-t border-slate-100">
                        <CertificationsForm
                          items={data.certifications}
                          onChange={(certifications) => onChange({ ...data, certifications })}
                        />
                      </div>
                    )}
                  </div>
                );
              }

              return null;
            })}

            {/* Additional Sections Accordion */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
              <div
                onClick={() => toggleAccordion('additional')}
                className="px-4 py-3 bg-slate-50/90 hover:bg-slate-100 flex items-center justify-between cursor-pointer border-b border-slate-100 select-none"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  <span className="font-bold text-xs text-slate-800">
                    Additional Sections (Volunteer, Awards, Languages, Courses)
                  </span>
                </div>
                {openSections.additional ? (
                  <ChevronUp className="w-4 h-4 text-slate-500" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-500" />
                )}
              </div>
              {openSections.additional && (
                <div className="p-4 bg-white border-t border-slate-100">
                  <AdditionalSectionsForm
                    volunteer={data.volunteer}
                    awards={data.awards}
                    courses={data.courses}
                    languages={data.languages}
                    publications={data.publications}
                    customSections={data.customSections}
                    onChange={(updates) => onChange({ ...data, ...updates })}
                  />
                </div>
              )}
            </div>

            {/* Freeform / Blank Text Maker Accordion */}
            <div className="bg-white border border-blue-200 rounded-xl overflow-hidden shadow-2xs">
              <div
                onClick={() => toggleAccordion('freeform')}
                className="px-4 py-3 bg-blue-50/70 hover:bg-blue-100/60 flex items-center justify-between cursor-pointer border-b border-blue-100 select-none"
              >
                <div className="flex items-center gap-2">
                  <FileEdit className="w-4 h-4 text-blue-600" />
                  <span className="font-bold text-xs text-blue-900">
                    📝 Blank / Freeform Custom CV Mode
                  </span>
                </div>
                {openSections.freeform ? (
                  <ChevronUp className="w-4 h-4 text-blue-600" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-blue-600" />
                )}
              </div>
              {openSections.freeform && (
                <div className="p-4 bg-white border-t border-blue-100">
                  <FreeformForm data={data} onChange={onChange} />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
