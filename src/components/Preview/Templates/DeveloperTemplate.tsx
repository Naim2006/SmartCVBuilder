import React from 'react';
import type { ResumeData } from '../../../types/cv';

interface TemplateProps {
  data: ResumeData;
}

export const DeveloperTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalDetails, settings } = data;
  const isVisible = (key: string) => settings.sectionVisibility[key] !== false;
  const getTitle = (key: string, def: string) => settings.sectionTitles?.[key] || def;

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
          <section key="skills" className="resume-section mb-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-950 font-mono mb-1 bg-gray-100 px-1 py-0.5 inline-block">
              {getTitle('skills', 'TECHNICAL ARSENAL')}
            </h2>
            <div className="grid grid-cols-1 gap-0.5 text-xs">
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
          <section key="experience" className="resume-section mb-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-950 font-mono mb-1 bg-gray-100 px-1 py-0.5 inline-block">
              {getTitle('experience', 'ENGINEERING EXPERIENCE')}
            </h2>
            <div className="space-y-1.5">
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
                    <div className="text-[11px] text-gray-500 mb-0.5">{exp.location}</div>
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
          <section key="projects" className="resume-section mb-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-950 font-mono mb-1 bg-gray-100 px-1 py-0.5 inline-block">
              {getTitle('projects', 'FEATURED SYSTEMS & PROJECTS')}
            </h2>
            <div className="space-y-1.5">
              {data.projects.map((proj) => {
                if (!proj.name) return null;
                return (
                  <div key={proj.id} className="resume-item text-xs">
                    <div className="flex justify-between items-baseline mb-0.5">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-bold text-gray-950 font-mono">{proj.name}</span>
                        {proj.techStack.length > 0 && (
                          <span className="text-[10.5px] font-mono text-gray-600">
                            [{proj.techStack.join(', ')}]
                          </span>
                        )}
                      </div>
                      {/* Right aligned links: Live Web and GitHub Repo */}
                      <div className="flex items-center gap-2 text-[10.5px] font-medium text-gray-600">
                        {proj.liveUrl && (
                          <a
                            href={proj.liveUrl.startsWith('http') ? proj.liveUrl : `https://${proj.liveUrl}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-700 hover:underline font-semibold font-mono inline-flex items-center gap-0.5"
                          >
                            <span>Live Web</span>
                            <span className="text-[9px]">↗</span>
                          </a>
                        )}
                        {proj.githubUrl && (
                          <a
                            href={proj.githubUrl.startsWith('http') ? proj.githubUrl : `https://${proj.githubUrl}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-700 hover:underline font-semibold font-mono inline-flex items-center gap-0.5"
                          >
                            <span>GitHub Repo</span>
                            <span className="text-[9px]">↗</span>
                          </a>
                        )}
                      </div>
                    </div>
                    {proj.description && <p className="text-[11.5px] text-gray-700 mb-0.5">{proj.description}</p>}
                    {proj.bullets.length > 0 && (
                      <ul className="list-disc list-outside ml-4 space-y-0.5 text-xs text-gray-800">
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
          <section key="education" className="resume-section mb-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-950 font-mono mb-1 bg-gray-100 px-1 py-0.5 inline-block">
              {getTitle('education', 'EDUCATION')}
            </h2>
            <div className="space-y-1">
              {data.education.map((edu) => (
                <div key={edu.id} className="resume-item text-xs flex justify-between items-baseline">
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
          <section key="certifications" className="resume-section mb-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-950 font-mono mb-1 bg-gray-100 px-1 py-0.5 inline-block">
              {getTitle('certifications', 'CERTIFICATIONS')}
            </h2>
            <div className="text-xs text-gray-800 space-y-1">
              {data.certifications.map((c) => (
                <div key={c.id} className="flex justify-between items-baseline">
                  <div>
                    <span className="font-bold">{c.name}</span>
                    {c.issuer && <span className="text-gray-600"> ({c.issuer})</span>}
                  </div>
                  <div className="flex items-center gap-2 text-[10.5px] text-gray-600">
                    {c.date && <span className="font-mono">{c.date}</span>}
                    {c.url && (
                      <a
                        href={c.url.startsWith('http') ? c.url : `https://${c.url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-700 hover:underline font-semibold font-mono"
                      >
                        Verify Certificate ↗
                      </a>
                    )}
                  </div>
                </div>
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
      <header className="pb-2 mb-2 border-b-2 border-gray-900">
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
        <section className="resume-section mb-2">
          <p className="text-xs text-gray-800 leading-relaxed">{personalDetails.summary}</p>
        </section>
      )}

      {settings.sectionOrder.map((sectionKey) => renderSectionByKey(sectionKey))}
    </div>
  );
};
