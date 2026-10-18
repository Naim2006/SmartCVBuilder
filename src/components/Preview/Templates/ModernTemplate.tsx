import React from 'react';
import type { ResumeData } from '../../../types/cv';

interface TemplateProps {
  data: ResumeData;
}

export const ModernTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalDetails, settings } = data;
  const isVisible = (key: string) => settings.sectionVisibility[key] !== false;
  const getTitle = (key: string, def: string) => settings.sectionTitles?.[key] || def;

  const renderSectionByKey = (key: string) => {
    if (!isVisible(key)) return null;

    switch (key) {
      case 'experience':
        if (data.experience.length === 0 || !data.experience.some((e) => e.company || e.role)) return null;
        return (
          <section key="experience" className="resume-section mb-3.5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-950 mb-1.5 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: settings.primaryColor }}></span>
              {getTitle('experience', 'Experience')}
            </h2>
            <div className="space-y-3 pl-3 border-l-2 border-gray-100">
              {data.experience.map((exp) => {
                if (!exp.company && !exp.role) return null;
                return (
                  <div key={exp.id} className="resume-item">
                    <div className="flex justify-between items-baseline text-xs">
                      <span className="font-bold text-gray-950">{exp.role}</span>
                      <span className="text-gray-500 font-medium">
                        {exp.startDate} – {exp.current ? 'Present' : exp.endDate || 'Present'}
                      </span>
                    </div>
                    <div className="flex justify-between items-baseline text-xs text-gray-600 mb-1">
                      <span className="font-semibold" style={{ color: settings.primaryColor }}>
                        {exp.company}{exp.employmentType ? ` • ${exp.employmentType}` : ''}
                      </span>
                      <span>{exp.location}</span>
                    </div>
                    {exp.bullets.length > 0 && (
                      <ul className="list-disc list-outside ml-3.5 space-y-0.5 text-xs text-gray-700 leading-snug">
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
          <section key="education" className="resume-section mb-3.5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-950 mb-1.5 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: settings.primaryColor }}></span>
              {getTitle('education', 'Education')}
            </h2>
            <div className="space-y-2 pl-3 border-l-2 border-gray-100">
              {data.education.map((edu) => {
                if (!edu.institution && !edu.degree) return null;
                return (
                  <div key={edu.id} className="resume-item text-xs">
                    <div className="flex justify-between items-baseline">
                      <span className="font-bold text-gray-950">
                        {edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}
                      </span>
                      <span className="text-gray-500">
                        {edu.startDate ? `${edu.startDate} – ` : ''}{edu.current ? 'Present' : edu.endDate || 'Graduated'}
                      </span>
                    </div>
                    <div className="flex justify-between items-baseline text-gray-600">
                      <span>{edu.institution}</span>
                      <span>{edu.location}</span>
                    </div>
                    {(edu.gpa || edu.coursework) && (
                      <div className="text-[11px] text-gray-500 mt-0.5">
                        {edu.gpa && <span>GPA: {edu.gpa}</span>}
                        {edu.gpa && edu.coursework && <span> • </span>}
                        {edu.coursework && <span>Courses: {edu.coursework}</span>}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        );

      case 'skills':
        if (data.skillCategories.length === 0 || !data.skillCategories.some((c) => c.skills.length > 0)) return null;
        return (
          <section key="skills" className="resume-section mb-3.5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-950 mb-1.5 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: settings.primaryColor }}></span>
              {getTitle('skills', 'Key Skills')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pl-3 border-l-2 border-gray-100 text-xs">
              {data.skillCategories.map((cat) => {
                if (cat.skills.length === 0) return null;
                return (
                  <div key={cat.id} className="bg-gray-50 p-2 rounded">
                    <span className="font-bold text-gray-950 block mb-0.5">{cat.categoryName}</span>
                    <span className="text-gray-700">{cat.skills.join(', ')}</span>
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
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-950 mb-1.5 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: settings.primaryColor }}></span>
              {getTitle('projects', 'Projects')}
            </h2>
            <div className="space-y-2 pl-3 border-l-2 border-gray-100">
              {data.projects.map((proj) => {
                if (!proj.name) return null;
                return (
                  <div key={proj.id} className="resume-item text-xs">
                    <div className="flex justify-between items-baseline mb-0.5">
                      <span className="font-bold text-gray-950">
                        {proj.name}
                        {proj.techStack.length > 0 && (
                          <span className="font-normal text-gray-500"> • {proj.techStack.join(', ')}</span>
                        )}
                      </span>
                      {(proj.liveUrl || proj.githubUrl) && (
                        <span className="text-gray-500 font-mono text-[10px]">
                          {[proj.liveUrl, proj.githubUrl].filter(Boolean).join(' | ')}
                        </span>
                      )}
                    </div>
                    {proj.description && <p className="text-gray-600 mb-0.5">{proj.description}</p>}
                    {proj.bullets.length > 0 && (
                      <ul className="list-disc list-outside ml-3.5 space-y-0.5 text-gray-700">
                        {proj.bullets.map((b, i) => b.trim() && <li key={i}>{b.trim()}</li>)}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        );

      case 'certifications':
        if (data.certifications.length === 0 || !data.certifications.some((c) => c.name)) return null;
        return (
          <section key="certifications" className="resume-section mb-3.5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-950 mb-1 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: settings.primaryColor }}></span>
              Certifications
            </h2>
            <div className="pl-3 border-l-2 border-gray-100 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-700">
              {data.certifications.map((c) => (
                <span key={c.id}>
                  <strong>{c.name}</strong> – {c.issuer} ({c.date})
                </span>
              ))}
            </div>
          </section>
        );

      case 'volunteer':
        if (data.volunteer.length === 0) return null;
        return (
          <section key="volunteer" className="resume-section mb-3.5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-950 mb-1 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: settings.primaryColor }}></span>
              Volunteer Work
            </h2>
            <div className="pl-3 border-l-2 border-gray-100 space-y-1 text-xs">
              {data.volunteer.map((v) => (
                <div key={v.id}>
                  <span className="font-bold text-gray-950">{v.role}</span> — {v.organization} ({v.startDate} – {v.current ? 'Present' : v.endDate})
                </div>
              ))}
            </div>
          </section>
        );

      case 'awards':
        if (data.awards.length === 0) return null;
        return (
          <section key="awards" className="resume-section mb-3.5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-950 mb-1 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: settings.primaryColor }}></span>
              Awards
            </h2>
            <div className="pl-3 border-l-2 border-gray-100 space-y-1 text-xs text-gray-700">
              {data.awards.map((a) => (
                <div key={a.id} className="flex justify-between">
                  <span><strong>{a.title}</strong> — {a.issuer}</span>
                  <span>{a.date}</span>
                </div>
              ))}
            </div>
          </section>
        );

      case 'languages':
        if (data.languages.length === 0) return null;
        return (
          <section key="languages" className="resume-section mb-3.5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-950 mb-1 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: settings.primaryColor }}></span>
              Languages
            </h2>
            <div className="pl-3 border-l-2 border-gray-100 flex flex-wrap gap-x-4 text-xs text-gray-700">
              {data.languages.map((l) => (
                <span key={l.id}><strong>{l.name}</strong> ({l.level})</span>
              ))}
            </div>
          </section>
        );

      case 'custom':
        if (data.customSections.length === 0) return null;
        return (
          <React.Fragment key="custom">
            {data.customSections.map((sec) => (
              <section key={sec.id} className="resume-section mb-3.5">
                <h2 className="text-xs font-bold uppercase tracking-wider text-gray-950 mb-1 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: settings.primaryColor }}></span>
                  {sec.heading}
                </h2>
                <div className="pl-3 border-l-2 border-gray-100 space-y-1 text-xs text-gray-700">
                  {sec.items.map((it) => (
                    <div key={it.id}>
                      <span className="font-bold text-gray-900">{it.title}</span>: {it.description}
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </React.Fragment>
        );

      default:
        return null;
    }
  };

  return (
    <div className="text-gray-900 bg-white w-full leading-normal">
      {/* Header */}
      <header className="pb-3 mb-3.5 border-b-2" style={{ borderColor: settings.primaryColor }}>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-950">
              {personalDetails.fullName || 'YOUR NAME'}
            </h1>
            {personalDetails.jobTitle && (
              <p className="text-xs font-semibold tracking-wide mt-0.5" style={{ color: settings.primaryColor }}>
                {personalDetails.jobTitle}
              </p>
            )}
          </div>
          <div className="text-right text-[11px] text-gray-600 space-y-0.5 flex flex-col sm:items-end">
            <div className="flex flex-wrap gap-x-2 sm:justify-end">
              {personalDetails.email && <span>{personalDetails.email}</span>}
              {personalDetails.phone && <span>• {personalDetails.phone}</span>}
            </div>
            <div className="flex flex-wrap gap-x-2 sm:justify-end">
              {(personalDetails.city || personalDetails.location) && (
                <span>{personalDetails.city ? `${personalDetails.city}, ${personalDetails.country || ''}` : personalDetails.location}</span>
              )}
              {personalDetails.linkedin && <span>• {personalDetails.linkedin}</span>}
              {personalDetails.github && <span>• {personalDetails.github}</span>}
            </div>
          </div>
        </div>
      </header>

      {/* Summary */}
      {personalDetails.summary.trim() && (
        <section className="resume-section mb-3.5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-950 mb-1 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: settings.primaryColor }}></span>
            Professional Summary
          </h2>
          <p className="text-xs text-gray-700 leading-relaxed pl-3 border-l-2 border-gray-100">
            {personalDetails.summary}
          </p>
        </section>
      )}

      {/* Render sections in user order */}
      {settings.sectionOrder.map((sectionKey) => renderSectionByKey(sectionKey))}
    </div>
  );
};
