import React from 'react';
import type { ResumeData } from '../../../types/cv';

interface TemplateProps {
  data: ResumeData;
}

export const ExecutiveTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalDetails, settings } = data;
  const isVisible = (key: string) => settings.sectionVisibility[key] !== false;
  const getTitle = (key: string, def: string) => settings.sectionTitles?.[key] || def;

  const contactItems = [
    personalDetails.phone,
    personalDetails.email,
    personalDetails.city && personalDetails.country ? `${personalDetails.city}, ${personalDetails.country}` : personalDetails.location,
    personalDetails.linkedin,
    personalDetails.website,
  ].filter(Boolean);

  const renderSectionByKey = (key: string) => {
    if (!isVisible(key)) return null;

    switch (key) {
      case 'experience':
        if (data.experience.length === 0 || !data.experience.some((e) => e.company || e.role)) return null;
        return (
          <section key="experience" className="resume-section mb-2">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-950 pb-0.5 mb-1.5 border-b-2 border-gray-800">
              {getTitle('experience', 'Executive Experience')}
            </h2>
            <div className="space-y-2">
              {data.experience.map((exp) => {
                if (!exp.company && !exp.role) return null;
                return (
                  <div key={exp.id} className="resume-item">
                    <div className="flex justify-between items-baseline text-xs mb-0.5">
                      <span className="font-bold text-gray-950 text-sm">{exp.role}</span>
                      <span className="text-gray-600 font-serif text-[11px]">
                        {exp.startDate} – {exp.current ? 'Present' : exp.endDate || 'Present'}
                      </span>
                    </div>
                    <div className="flex justify-between items-baseline text-xs font-semibold text-gray-700 mb-0.5">
                      <span>{exp.company}</span>
                      <span className="font-normal text-gray-600">{exp.location}</span>
                    </div>
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

      case 'education':
        if (data.education.length === 0 || !data.education.some((e) => e.institution || e.degree)) return null;
        return (
          <section key="education" className="resume-section mb-2">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-950 pb-0.5 mb-1.5 border-b-2 border-gray-800">
              {getTitle('education', 'Education & Credentials')}
            </h2>
            <div className="space-y-1.5">
              {data.education.map((edu) => (
                <div key={edu.id} className="resume-item text-xs">
                  <div className="flex justify-between items-baseline font-bold text-gray-950">
                    <span>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</span>
                    <span className="font-normal text-gray-600 text-[11px]">{edu.startDate ? `${edu.startDate} – ` : ''}{edu.endDate || 'Graduated'}</span>
                  </div>
                  <div className="text-gray-700">{edu.institution}{edu.location ? ` — ${edu.location}` : ''}</div>
                  {edu.description && <div className="text-[11px] text-gray-600 italic mt-0.5">{edu.description}</div>}
                </div>
              ))}
            </div>
          </section>
        );

      case 'skills':
        if (data.skillCategories.length === 0 || !data.skillCategories.some((c) => c.skills.length > 0)) return null;
        return (
          <section key="skills" className="resume-section mb-2">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-950 pb-0.5 mb-1.5 border-b-2 border-gray-800">
              {getTitle('skills', 'Core Competencies')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-gray-800">
              {data.skillCategories.map((cat) => (
                <div key={cat.id}>
                  <strong className="text-gray-950">{cat.categoryName}: </strong>
                  <span>{cat.skills.join(', ')}</span>
                </div>
              ))}
            </div>
          </section>
        );

      case 'projects':
        if (data.projects.length === 0 || !data.projects.some((p) => p.name)) return null;
        return (
          <section key="projects" className="resume-section mb-2">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-950 pb-0.5 mb-1.5 border-b-2 border-gray-800">
              {getTitle('projects', 'Strategic Initiatives')}
            </h2>
            <div className="space-y-1.5">
              {data.projects.map((proj) => (
                <div key={proj.id} className="resume-item text-xs">
                  <div className="flex justify-between items-baseline font-bold text-gray-950">
                    <span>{proj.name}</span>
                    <div className="flex items-center gap-2 text-[10.5px] font-normal text-gray-600">
                      {proj.liveUrl && (
                        <a
                          href={proj.liveUrl.startsWith('http') ? proj.liveUrl : `https://${proj.liveUrl}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-700 hover:underline font-semibold"
                        >
                          Live Web ↗
                        </a>
                      )}
                      {proj.githubUrl && (
                        <a
                          href={proj.githubUrl.startsWith('http') ? proj.githubUrl : `https://${proj.githubUrl}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-700 hover:underline font-semibold"
                        >
                          GitHub Repo ↗
                        </a>
                      )}
                    </div>
                  </div>
                  {proj.description && <p className="text-[11.5px] text-gray-700 italic">{proj.description}</p>}
                </div>
              ))}
            </div>
          </section>
        );

      case 'awards':
        if (data.awards.length === 0) return null;
        return (
          <section key="awards" className="resume-section mb-2">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-950 pb-0.5 mb-1.5 border-b-2 border-gray-800">
              {getTitle('awards', 'Executive Honors & Distinctions')}
            </h2>
            <div className="space-y-1 text-xs">
              {data.awards.map((a) => (
                <div key={a.id} className="flex justify-between">
                  <span><strong>{a.title}</strong> — {a.issuer}</span>
                  <span className="text-gray-600 text-[11px]">{a.date}</span>
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
      <header className="text-center pb-2 mb-2 border-b-2 border-gray-900">
        <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-wide text-gray-950 mb-0.5 font-serif">
          {personalDetails.fullName || 'YOUR NAME'}
        </h1>
        {personalDetails.jobTitle && (
          <p className="text-xs font-bold tracking-widest text-gray-700 uppercase mb-1">
            {personalDetails.jobTitle}
          </p>
        )}
        <div className="text-[11px] text-gray-700 flex flex-wrap justify-center items-center gap-x-3 gap-y-0.5">
          {contactItems.map((c, i) => (
            <React.Fragment key={i}>
              <span>{c}</span>
              {i < contactItems.length - 1 && <span className="text-gray-400">|</span>}
            </React.Fragment>
          ))}
        </div>
      </header>

      {personalDetails.summary.trim() && (
        <section className="resume-section mb-2">
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-950 pb-0.5 mb-1 border-b-2 border-gray-800">
            Executive Summary
          </h2>
          <p className="text-xs text-gray-800 leading-relaxed text-justify">
            {personalDetails.summary}
          </p>
        </section>
      )}

      {settings.sectionOrder.map((sectionKey) => renderSectionByKey(sectionKey))}
    </div>
  );
};
