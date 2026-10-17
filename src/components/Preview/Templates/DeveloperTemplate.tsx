import React from 'react';
import type { ResumeData } from '../../../types/cv';

interface TemplateProps {
  data: ResumeData;
}

export const DeveloperTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalDetails, settings } = data;
  const isVisible = (key: string) => settings.sectionVisibility[key] !== false;

  const contactItems = [
    personalDetails.email,
    personalDetails.phone,
    personalDetails.city && personalDetails.country ? `${personalDetails.city}, ${personalDetails.country}` : personalDetails.location,
    personalDetails.github ? `github.com/${personalDetails.github.replace(/^https?:\/\/(www\.)?github\.com\//, '')}` : '',
    personalDetails.linkedin ? `linkedin: ${personalDetails.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}` : '',
    personalDetails.website,
  ].filter(Boolean);

  const renderSectionByKey = (key: string) => {
    if (!isVisible(key)) return null;

    switch (key) {
      case 'skills':
        if (data.skillCategories.length === 0 || !data.skillCategories.some((c) => c.skills.length > 0)) return null;
        return (
          <section key="skills" className="resume-section mb-3.5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-950 font-mono mb-1.5 bg-gray-100 px-1 py-0.5 inline-block">
              TECHNICAL ARSENAL
            </h2>
            <div className="grid grid-cols-1 gap-1 text-xs">
              {data.skillCategories.map((cat) => {
                if (cat.skills.length === 0) return null;
                return (
                  <div key={cat.id} className="flex flex-wrap gap-x-1.5">
                    <span className="font-bold text-gray-950 min-w-[130px] font-mono text-[11px]">
                      {cat.categoryName}:
                    </span>
                    <span className="text-gray-800">{cat.skills.join(', ')}</span>
                  </div>
                );
              })}
            </div>
          </section>
        );

      case 'experience':
        if (data.experience.length === 0 || !data.experience.some((e) => e.company || e.role)) return null;
        return (
          <section key="experience" className="resume-section mb-3.5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-950 font-mono mb-1.5 bg-gray-100 px-1 py-0.5 inline-block">
              ENGINEERING EXPERIENCE
            </h2>
            <div className="space-y-3">
              {data.experience.map((exp) => {
                if (!exp.company && !exp.role) return null;
                return (
                  <div key={exp.id} className="resume-item">
                    <div className="flex justify-between items-baseline text-xs">
                      <span className="font-bold text-gray-950">
                        {exp.role} <span className="font-normal text-gray-600">@ {exp.company}</span>
                      </span>
                      <span className="text-gray-600 font-mono text-[11px]">
                        {exp.startDate} – {exp.current ? 'Present' : exp.endDate || 'Present'}
                      </span>
                    </div>
                    <div className="text-[11px] text-gray-500 mb-1">{exp.location}</div>
                    {exp.bullets.length > 0 && (
                      <ul className="list-disc list-outside ml-4 space-y-0.5 text-xs text-gray-800 leading-snug">
                        {exp.bullets.map((b, i) => b.trim() && <li key={i}>{b.trim()}</li>)}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        );

      case 'projects':
        if (data.projects.length === 0 || !data.projects.some((p) => p.name)) return null;
        return (
          <section key="projects" className="resume-section mb-3.5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-950 font-mono mb-1.5 bg-gray-100 px-1 py-0.5 inline-block">
              FEATURED SYSTEMS & PROJECTS
            </h2>
            <div className="space-y-2.5">
              {data.projects.map((proj) => {
                if (!proj.name) return null;
                return (
                  <div key={proj.id} className="resume-item text-xs">
                    <div className="flex justify-between items-baseline mb-0.5">
                      <span className="font-bold text-gray-950 font-mono">{proj.name}</span>
                      {(proj.liveUrl || proj.githubUrl) && (
                        <span className="text-gray-600 font-mono text-[10px]">
                          {[proj.liveUrl, proj.githubUrl].filter(Boolean).join(' | ')}
                        </span>
                      )}
                    </div>
                    {proj.techStack.length > 0 && (
                      <div className="text-[11px] font-mono text-gray-600 mb-0.5">
                        Tech: {proj.techStack.join(', ')}
                      </div>
                    )}
                    {proj.description && <p className="text-gray-700 mb-0.5">{proj.description}</p>}
                    {proj.bullets.length > 0 && (
                      <ul className="list-disc list-outside ml-4 space-y-0.5 text-gray-800">
                        {proj.bullets.map((b, i) => b.trim() && <li key={i}>{b.trim()}</li>)}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        );

      case 'education':
        if (data.education.length === 0 || !data.education.some((e) => e.institution || e.degree)) return null;
        return (
          <section key="education" className="resume-section mb-3.5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-950 font-mono mb-1 bg-gray-100 px-1 py-0.5 inline-block">
              EDUCATION
            </h2>
            <div className="space-y-1.5">
              {data.education.map((edu) => (
                <div key={edu.id} className="resume-item text-xs flex justify-between">
                  <div>
                    <span className="font-bold text-gray-950">{edu.degree} {edu.fieldOfStudy ? `in ${edu.fieldOfStudy}` : ''}</span>
                    <span className="text-gray-700"> — {edu.institution}</span>
                    {edu.gpa && <span className="text-gray-500 font-mono text-[11px]"> (GPA: {edu.gpa})</span>}
                  </div>
                  <span className="text-gray-600 font-mono text-[11px]">
                    {edu.startDate ? `${edu.startDate} – ` : ''}{edu.endDate || 'Graduated'}
                  </span>
                </div>
              ))}
            </div>
          </section>
        );

      case 'certifications':
        if (data.certifications.length === 0 || !data.certifications.some((c) => c.name)) return null;
        return (
          <section key="certifications" className="resume-section mb-3.5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-950 font-mono mb-1 bg-gray-100 px-1 py-0.5 inline-block">
              CERTIFICATIONS
            </h2>
            <div className="text-xs text-gray-800 flex flex-wrap gap-x-4">
              {data.certifications.map((c) => (
                <span key={c.id}>
                  <strong>{c.name}</strong> ({c.issuer}, {c.date})
                </span>
              ))}
            </div>
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <div className="text-gray-900 bg-white w-full leading-normal">
      <header className="pb-2.5 mb-3 border-b-2 border-gray-900">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
          <h1 className="text-2xl font-black tracking-tight text-gray-950 font-mono">
            {personalDetails.fullName || 'YOUR NAME'}
          </h1>
          {personalDetails.jobTitle && (
            <span className="text-xs font-bold text-gray-700 uppercase tracking-wider font-mono">
              // {personalDetails.jobTitle}
            </span>
          )}
        </div>
        <div className="text-[11px] font-mono text-gray-700 flex flex-wrap gap-x-3 gap-y-0.5 mt-1">
          {contactItems.map((c, i) => (
            <span key={i}>
              {c}{i < contactItems.length - 1 ? ' | ' : ''}
            </span>
          ))}
        </div>
      </header>

      {personalDetails.summary.trim() && (
        <section className="resume-section mb-3">
          <p className="text-xs text-gray-800 leading-relaxed">{personalDetails.summary}</p>
        </section>
      )}

      {settings.sectionOrder.map((sectionKey) => renderSectionByKey(sectionKey))}
    </div>
  );
};
