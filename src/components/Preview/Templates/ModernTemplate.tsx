import React from 'react';
import type { ResumeData } from '../../../types/cv';

interface TemplateProps {
  data: ResumeData;
}

export const ModernTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalDetails, settings } = data;
  const isVisible = (key: string) => settings.sectionVisibility[key] !== false;
  const getTitle = (key: string, def: string) => settings.sectionTitles?.[key] || def;

  // Dynamic spacing based on user preference or page fill mode
  const sSpacing = {
    compact: 'mb-1.5',
    normal: 'mb-2.5',
    relaxed: 'mb-3.5',
  }[settings.spacing || 'normal'];

  const iSpacing = {
    compact: 'space-y-1',
    normal: 'space-y-1.5',
    relaxed: 'space-y-2',
  }[settings.spacing || 'normal'];

  const renderSectionByKey = (key: string) => {
    if (!isVisible(key)) return null;

    switch (key) {
      case 'experience':
        if (data.experience.length === 0 || !data.experience.some((e) => e.company || e.role)) return null;
        return (
          <section key="experience" className={`resume-section ${sSpacing}`}>
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-950 mb-0.5 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: settings.primaryColor }}></span>
              {getTitle('experience', 'Experience')}
            </h2>
            <div className={`${iSpacing} pl-3 border-l-2 border-gray-100`}>
              {data.experience.map((exp) => {
                if (!exp.company && !exp.role) return null;
                return (
                  <div key={exp.id} className="resume-item">
                    <div className="flex justify-between items-baseline text-xs">
                      <span className="font-bold text-gray-950">{exp.role}</span>
                      <span className="text-gray-500 font-medium text-[10.5px]">
                        {exp.startDate} – {exp.current ? 'Present' : exp.endDate || 'Present'}
                      </span>
                    </div>
                    <div className="flex justify-between items-baseline text-[11px] text-gray-600 mb-0.5">
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
          <section key="education" className={`resume-section ${sSpacing}`}>
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-950 mb-0.5 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: settings.primaryColor }}></span>
              {getTitle('education', 'Education')}
            </h2>
            <div className={`${iSpacing} pl-3 border-l-2 border-gray-100`}>
              {data.education.map((edu) => {
                if (!edu.institution && !edu.degree) return null;
                return (
                  <div key={edu.id} className="resume-item text-xs">
                    <div className="flex justify-between items-baseline">
                      <span className="font-bold text-gray-950">
                        {edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}
                      </span>
                      <span className="text-gray-500 text-[11px]">
                        {edu.startDate ? `${edu.startDate} – ` : ''}{edu.current ? 'Present' : edu.endDate || 'Graduated'}
                      </span>
                    </div>
                    <div className="flex justify-between items-baseline text-[11.5px] text-gray-600">
                      <span>{edu.institution}</span>
                      <div className="flex items-center gap-2">
                        {edu.gpa && <span className="font-semibold text-gray-800">GPA: {edu.gpa}</span>}
                        {edu.location && <span>{edu.location}</span>}
                      </div>
                    </div>
                    {edu.coursework && (
                      <div className="text-[11px] text-gray-500 mt-0.5">
                        <span>Coursework: {edu.coursework}</span>
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
          <section key="skills" className={`resume-section ${sSpacing}`}>
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-950 mb-0.5 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: settings.primaryColor }}></span>
              {getTitle('skills', 'Key Skills')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5 pl-3 border-l-2 border-gray-100 text-xs">
              {data.skillCategories.map((cat) => {
                if (cat.skills.length === 0) return null;
                return (
                  <div key={cat.id} className="bg-gray-50 px-2 py-0.5 rounded">
                    <span className="font-bold text-gray-950 block text-[11px]">{cat.categoryName}</span>
                    <span className="text-gray-700 text-[10.5px]">{cat.skills.join(', ')}</span>
                  </div>
                );
              })}
            </div>
          </section>
        );

      case 'projects':
        if (data.projects.length === 0 || !data.projects.some((p) => p.name)) return null;
        return (
          <section key="projects" className={`resume-section ${sSpacing}`}>
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-950 mb-0.5 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: settings.primaryColor }}></span>
              {getTitle('projects', 'Projects')}
            </h2>
            <div className={`${iSpacing} pl-3 border-l-2 border-gray-100`}>
              {data.projects.map((proj) => {
                if (!proj.name) return null;
                return (
                  <div key={proj.id} className="resume-item text-xs">
                    <div className="flex justify-between items-baseline mb-0.5">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-bold text-gray-950">{proj.name}</span>
                        {proj.techStack.length > 0 && (
                          <span className="font-normal text-gray-500 text-[10px]">
                            [{proj.techStack.join(', ')}]
                          </span>
                        )}
                      </div>
                      {/* Right-aligned Live Web and GitHub Repo links */}
                      <div className="flex items-center gap-2 text-[10px] font-medium text-gray-600">
                        {proj.liveUrl && (
                          <a
                            href={proj.liveUrl.startsWith('http') ? proj.liveUrl : `https://${proj.liveUrl}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline font-semibold inline-flex items-center gap-0.5"
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
                            className="text-blue-600 hover:underline font-semibold inline-flex items-center gap-0.5"
                          >
                            <span>GitHub Repo</span>
                            <span className="text-[9px]">↗</span>
                          </a>
                        )}
                      </div>
                    </div>
                    {proj.description && <p className="text-[11px] text-gray-600 mb-0.5 leading-snug">{proj.description}</p>}
                    {proj.bullets.length > 0 && (
                      <ul className="list-disc list-outside ml-3.5 space-y-0.5 text-xs text-gray-700 leading-snug">
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
          <section key="certifications" className={`resume-section ${sSpacing}`}>
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-950 mb-0.5 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: settings.primaryColor }}></span>
              {getTitle('certifications', 'Certifications')}
            </h2>
            <div className={`pl-3 border-l-2 border-gray-100 ${iSpacing} text-xs text-gray-700`}>
              {data.certifications.map((c) => (
                <div key={c.id} className="flex justify-between items-baseline">
                  <div>
                    <span className="font-semibold text-gray-950">{c.name}</span>
                    {c.issuer && <span className="text-gray-600"> — {c.issuer}</span>}
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-gray-600">
                    {c.date && <span>{c.date}</span>}
                    {c.url && (
                      <a
                        href={c.url.startsWith('http') ? c.url : `https://${c.url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline font-semibold"
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

      case 'volunteer':
        if (data.volunteer.length === 0) return null;
        return (
          <section key="volunteer" className={`resume-section ${sSpacing}`}>
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-950 mb-0.5 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: settings.primaryColor }}></span>
              {getTitle('volunteer', 'Volunteer Work')}
            </h2>
            <div className={`pl-3 border-l-2 border-gray-100 ${iSpacing} text-xs`}>
              {data.volunteer.map((v) => (
                <div key={v.id} className="flex justify-between items-baseline">
                  <span><strong>{v.role}</strong> — {v.organization}</span>
                  <span className="text-gray-500 text-[10.5px]">{v.startDate} – {v.current ? 'Present' : v.endDate}</span>
                </div>
              ))}
            </div>
          </section>
        );

      case 'awards':
        if (data.awards.length === 0) return null;
        return (
          <section key="awards" className={`resume-section ${sSpacing}`}>
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-950 mb-0.5 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: settings.primaryColor }}></span>
              {getTitle('awards', 'Honors & Awards')}
            </h2>
            <div className={`pl-3 border-l-2 border-gray-100 ${iSpacing} text-xs`}>
              {data.awards.map((a) => (
                <div key={a.id} className="flex justify-between items-baseline">
                  <span><strong>{a.title}</strong> — {a.issuer}</span>
                  <span className="text-gray-500 text-[10.5px]">{a.date}</span>
                </div>
              ))}
            </div>
          </section>
        );

      case 'courses':
        if (data.courses.length === 0) return null;
        return (
          <section key="courses" className={`resume-section ${sSpacing}`}>
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-950 mb-0.5 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: settings.primaryColor }}></span>
              {getTitle('courses', 'Professional Training')}
            </h2>
            <div className={`pl-3 border-l-2 border-gray-100 ${iSpacing} text-xs`}>
              {data.courses.map((c) => (
                <div key={c.id} className="flex justify-between items-baseline">
                  <span><strong>{c.name}</strong> ({c.platform})</span>
                  <div className="flex items-center gap-2 text-[10px] text-gray-600">
                    <span>{c.date}</span>
                    {c.url && (
                      <a
                        href={c.url.startsWith('http') ? c.url : `https://${c.url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline font-semibold"
                      >
                        View Course ↗
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        );

      case 'languages':
        if (data.languages.length === 0) return null;
        return (
          <section key="languages" className={`resume-section ${sSpacing}`}>
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-950 mb-0.5 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: settings.primaryColor }}></span>
              {getTitle('languages', 'Languages')}
            </h2>
            <div className="pl-3 border-l-2 border-gray-100 flex flex-wrap gap-x-4 text-xs text-gray-700">
              {data.languages.map((l) => (
                <span key={l.id}><strong>{l.name}</strong> {l.level && `(${l.level})`}</span>
              ))}
            </div>
          </section>
        );

      case 'custom':
        if (data.customSections.length === 0) return null;
        return (
          <React.Fragment key="custom">
            {data.customSections.map((cs) => (
              <section key={cs.id} className={`resume-section ${sSpacing}`}>
                <h2 className="text-xs font-bold uppercase tracking-wider text-gray-950 mb-1 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: settings.primaryColor }}></span>
                  {cs.heading}
                </h2>
                <div className={`pl-3 border-l-2 border-gray-100 ${iSpacing} text-xs`}>
                  {cs.items.map((item) => (
                    <div key={item.id}>
                      <div className="flex justify-between font-bold text-gray-950">
                        <span>{item.title}</span>
                        {item.date && <span className="text-gray-500 font-normal text-[11px]">{item.date}</span>}
                      </div>
                      {item.subtitle && <div className="italic text-gray-600">{item.subtitle}</div>}
                      {item.description && <p className="text-gray-700 mt-0.5">{item.description}</p>}
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
      <header className={`resume-header pb-2 ${sSpacing} border-b-2`} style={{ borderColor: settings.primaryColor }}>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-1.5">
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
        <section className={`resume-section ${sSpacing}`}>
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-950 mb-0.5 flex items-center gap-1.5">
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
