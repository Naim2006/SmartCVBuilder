import React from 'react';
import type { ResumeData } from '../../../types/cv';

interface TemplateProps {
  data: ResumeData;
}

export const CompactTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalDetails, settings } = data;
  const isVisible = (key: string) => settings.sectionVisibility[key] !== false;
  const getTitle = (key: string, def: string) => settings.sectionTitles?.[key] || def;

  const contactItems = [
    personalDetails.email,
    personalDetails.phone,
    personalDetails.city && personalDetails.country ? `${personalDetails.city}, ${personalDetails.country}` : personalDetails.location,
    personalDetails.linkedin,
    personalDetails.github,
    personalDetails.website,
  ].filter(Boolean);

  const renderSectionByKey = (key: string) => {
    if (!isVisible(key)) return null;

    switch (key) {
      case 'experience':
        if (data.experience.length === 0 || !data.experience.some((e) => e.company || e.role)) return null;
        return (
          <section key="experience" className="resume-section mb-2">
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-gray-950 border-b border-gray-400 pb-0.5 mb-1">
              {getTitle('experience', 'Experience')}
            </h2>
            <div className="space-y-1">
              {data.experience.map((exp) => {
                if (!exp.company && !exp.role) return null;
                return (
                  <div key={exp.id} className="resume-item">
                    <div className="flex justify-between items-baseline text-[11px]">
                      <span className="font-bold text-gray-950">
                        {exp.role} <span className="font-normal text-gray-700">— {exp.company}</span>
                      </span>
                      <span className="text-gray-600 text-[10px]">
                        {exp.startDate} – {exp.current ? 'Present' : exp.endDate || 'Present'}
                      </span>
                    </div>
                    {exp.bullets.length > 0 && (
                      <ul className="list-disc list-outside ml-3.5 space-y-0.5 text-[11px] text-gray-800 leading-tight">
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
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-gray-950 border-b border-gray-400 pb-0.5 mb-1">
              {getTitle('education', 'Education')}
            </h2>
            <div className="space-y-1">
              {data.education.map((edu) => (
                <div key={edu.id} className="resume-item text-[11px] flex justify-between items-baseline">
                  <span>
                    <strong>{edu.degree}</strong> {edu.fieldOfStudy ? `in ${edu.fieldOfStudy}` : ''} — {edu.institution}
                    {edu.gpa ? ` (GPA: ${edu.gpa})` : ''}
                  </span>
                  <span className="text-gray-600 text-[10px]">{edu.startDate ? `${edu.startDate} – ` : ''}{edu.endDate || 'Graduated'}</span>
                </div>
              ))}
            </div>
          </section>
        );

      case 'skills':
        if (data.skillCategories.length === 0 || !data.skillCategories.some((c) => c.skills.length > 0)) return null;
        return (
          <section key="skills" className="resume-section mb-2">
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-gray-950 border-b border-gray-400 pb-0.5 mb-1">
              {getTitle('skills', 'Skills')}
            </h2>
            <div className="space-y-0.5 text-[11px] text-gray-800">
              {data.skillCategories.map((cat) => (
                <div key={cat.id}>
                  <span className="font-semibold text-gray-950">{cat.categoryName}: </span>
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
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-gray-950 border-b border-gray-400 pb-0.5 mb-1">
              {getTitle('projects', 'Projects')}
            </h2>
            <div className="space-y-1 text-[11px]">
              {data.projects.map((proj) => (
                <div key={proj.id} className="resume-item">
                  <div className="flex justify-between items-baseline font-bold text-gray-950">
                    <span>{proj.name}{proj.techStack.length > 0 ? ` (${proj.techStack.join(', ')})` : ''}</span>
                    <div className="flex items-center gap-2 text-[10px] font-normal text-gray-600">
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
                  {proj.bullets.map((b, i) => b.trim() && <div key={i} className="text-gray-700 pl-2">• {b.trim()}</div>)}
                </div>
              ))}
            </div>
          </section>
        );

      case 'certifications':
        if (data.certifications.length === 0) return null;
        return (
          <section key="certifications" className="resume-section mb-1.5">
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-gray-950 border-b border-gray-400 pb-0.5 mb-1">
              {getTitle('certifications', 'Certifications')}
            </h2>
            <div className="space-y-0.5 text-[11px] text-gray-800">
              {data.certifications.map((c) => (
                <div key={c.id} className="flex justify-between items-baseline">
                  <span><strong>{c.name}</strong> ({c.issuer})</span>
                  <div className="flex items-center gap-2 text-[10px] text-gray-600">
                    {c.date && <span>{c.date}</span>}
                    {c.url && (
                      <a
                        href={c.url.startsWith('http') ? c.url : `https://${c.url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-700 hover:underline font-semibold"
                      >
                        Verify ↗
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        );

      case 'volunteer':
        if (data.volunteer.length === 0) return null;
        return (
          <section key="volunteer" className="resume-section mb-1.5">
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-gray-950 border-b border-gray-400 pb-0.5 mb-1">
              {getTitle('volunteer', 'Volunteering')}
            </h2>
            <div className="space-y-0.5 text-[11px]">
              {data.volunteer.map((v) => (
                <div key={v.id} className="flex justify-between items-baseline">
                  <span><strong>{v.role}</strong> — {v.organization}</span>
                  <span className="text-gray-500 text-[10px]">{v.startDate} – {v.current ? 'Present' : v.endDate}</span>
                </div>
              ))}
            </div>
          </section>
        );

      case 'awards':
        if (data.awards.length === 0) return null;
        return (
          <section key="awards" className="resume-section mb-1.5">
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-gray-950 border-b border-gray-400 pb-0.5 mb-1">
              {getTitle('awards', 'Awards')}
            </h2>
            <div className="space-y-0.5 text-[11px]">
              {data.awards.map((a) => (
                <div key={a.id} className="flex justify-between items-baseline">
                  <span><strong>{a.title}</strong> — {a.issuer}</span>
                  <span className="text-gray-500 text-[10px]">{a.date}</span>
                </div>
              ))}
            </div>
          </section>
        );

      case 'courses':
        if (data.courses.length === 0) return null;
        return (
          <section key="courses" className="resume-section mb-1.5">
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-gray-950 border-b border-gray-400 pb-0.5 mb-1">
              {getTitle('courses', 'Training')}
            </h2>
            <div className="space-y-0.5 text-[11px]">
              {data.courses.map((c) => (
                <div key={c.id} className="flex justify-between items-baseline">
                  <span><strong>{c.name}</strong> ({c.platform})</span>
                  <span className="text-gray-500 text-[10px]">{c.date}</span>
                </div>
              ))}
            </div>
          </section>
        );

      case 'languages':
        if (data.languages.length === 0) return null;
        return (
          <section key="languages" className="resume-section mb-1">
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-gray-950 border-b border-gray-400 pb-0.5 mb-1">
              {getTitle('languages', 'Languages')}
            </h2>
            <div className="flex flex-wrap gap-x-3 text-[11px]">
              {data.languages.map((l) => (
                <span key={l.id}>{l.name} ({l.level})</span>
              ))}
            </div>
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <div className="text-gray-900 bg-white w-full leading-tight">
      <header className="mb-2 pb-1 border-b border-gray-400">
        <h1 className="text-xl font-bold tracking-tight text-gray-950">
          {personalDetails.fullName || 'YOUR NAME'}
        </h1>
        {personalDetails.jobTitle && (
          <div className="text-xs font-semibold text-gray-700 mb-0.5">{personalDetails.jobTitle}</div>
        )}
        <div className="text-[10px] text-gray-600 flex flex-wrap gap-x-2">
          {contactItems.map((c, i) => (
            <span key={i}>
              {c}{i < contactItems.length - 1 ? ' • ' : ''}
            </span>
          ))}
        </div>
      </header>

      {personalDetails.summary.trim() && (
        <section className="resume-section mb-1.5">
          <p className="text-[11px] text-gray-800 leading-tight">{personalDetails.summary}</p>
        </section>
      )}

      {settings.sectionOrder.map((sectionKey) => renderSectionByKey(sectionKey))}
    </div>
  );
};
