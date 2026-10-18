import React from 'react';
import type { ResumeData } from '../../../types/cv';

interface TemplateProps {
  data: ResumeData;
}

export const ClassicTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalDetails, settings } = data;
  const isVisible = (key: string) => settings.sectionVisibility[key] !== false;
  const getTitle = (key: string, def: string) => settings.sectionTitles?.[key] || def;

  const contactItems = [
    personalDetails.phone,
    personalDetails.email,
    personalDetails.city && personalDetails.country ? `${personalDetails.city}, ${personalDetails.country}` : personalDetails.location,
    personalDetails.linkedin,
    personalDetails.github,
    personalDetails.website,
    personalDetails.otherUrl,
    personalDetails.workAuthorization,
  ].filter(Boolean);

  const renderSectionByKey = (key: string) => {
    if (!isVisible(key)) return null;

    switch (key) {
      case 'experience':
        if (data.experience.length === 0 || !data.experience.some((e) => e.company || e.role)) return null;
        return (
          <section key="experience" className="resume-section mb-3.5">
            <h2
              className="text-xs font-bold uppercase tracking-wider pb-0.5 mb-1.5 border-b border-gray-400"
              style={{ color: settings.primaryColor }}
            >
              {getTitle('experience', 'Work Experience')}
            </h2>
            <div className="space-y-2.5">
              {data.experience.map((exp) => {
                if (!exp.company && !exp.role) return null;
                return (
                  <div key={exp.id} className="resume-item">
                    <div className="flex justify-between items-baseline text-xs mb-0.5">
                      <span className="font-bold text-gray-950">
                        {exp.role || 'Position'}{exp.employmentType ? ` (${exp.employmentType})` : ''}
                      </span>
                      <span className="text-gray-700 font-medium">
                        {exp.startDate} – {exp.current ? 'Present' : exp.endDate || 'Present'}
                      </span>
                    </div>
                    <div className="flex justify-between items-baseline text-xs italic text-gray-700 mb-1">
                      <span>{exp.company}</span>
                      <span>{exp.location}</span>
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
          <section key="education" className="resume-section mb-3.5">
            <h2
              className="text-xs font-bold uppercase tracking-wider pb-0.5 mb-1.5 border-b border-gray-400"
              style={{ color: settings.primaryColor }}
            >
              {getTitle('education', 'Education')}
            </h2>
            <div className="space-y-2">
              {data.education.map((edu) => {
                if (!edu.institution && !edu.degree) return null;
                return (
                  <div key={edu.id} className="resume-item">
                    <div className="flex justify-between items-baseline text-xs">
                      <span className="font-bold text-gray-950">
                        {edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}
                      </span>
                      <span className="text-gray-700">
                        {edu.startDate ? `${edu.startDate} – ` : ''}{edu.current ? 'Present' : edu.endDate || 'Graduated'}
                      </span>
                    </div>
                    <div className="flex justify-between items-baseline text-xs text-gray-700">
                      <span>{edu.institution}</span>
                      <span>{edu.location}</span>
                    </div>
                    {(edu.gpa || edu.coursework || edu.description) && (
                      <div className="text-[11px] text-gray-600 mt-0.5 space-y-0.5">
                        {edu.gpa && <div>Grade/GPA: {edu.gpa}</div>}
                        {edu.coursework && <div>Relevant Coursework: {edu.coursework}</div>}
                        {edu.description && <div>{edu.description}</div>}
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
            <h2
              className="text-xs font-bold uppercase tracking-wider pb-0.5 mb-1.5 border-b border-gray-400"
              style={{ color: settings.primaryColor }}
            >
              {getTitle('skills', 'Skills & Competencies')}
            </h2>
            <div className="space-y-1 text-xs text-gray-800">
              {data.skillCategories.map((cat) => {
                if (cat.skills.length === 0) return null;
                return (
                  <div key={cat.id} className="flex flex-wrap gap-x-1">
                    <span className="font-bold text-gray-950">{cat.categoryName}:</span>
                    <span>{cat.skills.join(', ')}</span>
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
            <h2
              className="text-xs font-bold uppercase tracking-wider pb-0.5 mb-1.5 border-b border-gray-400"
              style={{ color: settings.primaryColor }}
            >
              {getTitle('projects', 'Key Projects')}
            </h2>
            <div className="space-y-2">
              {data.projects.map((proj) => {
                if (!proj.name) return null;
                return (
                  <div key={proj.id} className="resume-item">
                    <div className="flex justify-between items-baseline text-xs mb-0.5">
                      <span className="font-bold text-gray-950">
                        {proj.name}
                        {proj.techStack.length > 0 && (
                          <span className="font-normal text-gray-600"> | {proj.techStack.join(', ')}</span>
                        )}
                      </span>
                      {(proj.liveUrl || proj.githubUrl) && (
                        <span className="text-gray-600 font-mono text-[10px]">
                          {[proj.liveUrl, proj.githubUrl].filter(Boolean).join(' | ')}
                        </span>
                      )}
                    </div>
                    {proj.description && <p className="text-xs text-gray-700 italic mb-0.5">{proj.description}</p>}
                    {proj.bullets.length > 0 && (
                      <ul className="list-disc list-outside ml-4 space-y-0.5 text-xs text-gray-800 leading-snug">
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
            <h2
              className="text-xs font-bold uppercase tracking-wider pb-0.5 mb-1.5 border-b border-gray-400"
              style={{ color: settings.primaryColor }}
            >
              Certifications
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-xs text-gray-800">
              {data.certifications.map((cert) => {
                if (!cert.name) return null;
                return (
                  <div key={cert.id} className="flex justify-between">
                    <span className="font-semibold text-gray-950">{cert.name}</span>
                    <span className="text-gray-600">{cert.date}</span>
                  </div>
                );
              })}
            </div>
          </section>
        );

      case 'volunteer':
        if (data.volunteer.length === 0 || !data.volunteer.some((v) => v.role || v.organization)) return null;
        return (
          <section key="volunteer" className="resume-section mb-3.5">
            <h2
              className="text-xs font-bold uppercase tracking-wider pb-0.5 mb-1.5 border-b border-gray-400"
              style={{ color: settings.primaryColor }}
            >
              Volunteer Experience
            </h2>
            <div className="space-y-2">
              {data.volunteer.map((vol) => (
                <div key={vol.id} className="resume-item text-xs">
                  <div className="flex justify-between font-bold text-gray-950">
                    <span>{vol.role} — {vol.organization}</span>
                    <span className="text-gray-600 font-normal">{vol.startDate} – {vol.current ? 'Present' : vol.endDate}</span>
                  </div>
                  {vol.responsibilities && <p className="text-gray-700 mt-0.5">{vol.responsibilities}</p>}
                </div>
              ))}
            </div>
          </section>
        );

      case 'awards':
        if (data.awards.length === 0 || !data.awards.some((a) => a.title)) return null;
        return (
          <section key="awards" className="resume-section mb-3.5">
            <h2
              className="text-xs font-bold uppercase tracking-wider pb-0.5 mb-1.5 border-b border-gray-400"
              style={{ color: settings.primaryColor }}
            >
              Honors & Awards
            </h2>
            <div className="space-y-1.5 text-xs">
              {data.awards.map((award) => (
                <div key={award.id} className="flex justify-between">
                  <div>
                    <span className="font-bold text-gray-950">{award.title}</span>
                    {award.issuer && <span className="text-gray-700"> — {award.issuer}</span>}
                    {award.description && <div className="text-[11px] text-gray-600">{award.description}</div>}
                  </div>
                  <span className="text-gray-600">{award.date}</span>
                </div>
              ))}
            </div>
          </section>
        );

      case 'courses':
        if (data.courses.length === 0 || !data.courses.some((c) => c.name)) return null;
        return (
          <section key="courses" className="resume-section mb-3.5">
            <h2
              className="text-xs font-bold uppercase tracking-wider pb-0.5 mb-1.5 border-b border-gray-400"
              style={{ color: settings.primaryColor }}
            >
              Courses & Professional Training
            </h2>
            <div className="space-y-1 text-xs">
              {data.courses.map((course) => (
                <div key={course.id} className="flex justify-between">
                  <span><strong>{course.name}</strong> ({course.platform})</span>
                  <span className="text-gray-600">{course.date}</span>
                </div>
              ))}
            </div>
          </section>
        );

      case 'languages':
        if (data.languages.length === 0 || !data.languages.some((l) => l.name)) return null;
        return (
          <section key="languages" className="resume-section mb-3.5">
            <h2
              className="text-xs font-bold uppercase tracking-wider pb-0.5 mb-1.5 border-b border-gray-400"
              style={{ color: settings.primaryColor }}
            >
              Languages
            </h2>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-800">
              {data.languages.map((l) => (
                <span key={l.id}>
                  <strong>{l.name}</strong> ({l.level})
                </span>
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
                <h2
                  className="text-xs font-bold uppercase tracking-wider pb-0.5 mb-1.5 border-b border-gray-400"
                  style={{ color: settings.primaryColor }}
                >
                  {sec.heading}
                </h2>
                <div className="space-y-1.5 text-xs text-gray-800">
                  {sec.items.map((item) => (
                    <div key={item.id}>
                      <div className="flex justify-between font-bold text-gray-950">
                        <span>{item.title}{item.subtitle ? ` — ${item.subtitle}` : ''}</span>
                        {item.date && <span className="font-normal text-gray-600">{item.date}</span>}
                      </div>
                      {item.description && <p className="text-gray-700">{item.description}</p>}
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
    <div className="text-black bg-white w-full leading-normal">
      {/* Header */}
      <header className="text-center pb-2.5 border-b border-gray-400 mb-3.5">
        <h1 className="text-2xl font-bold uppercase tracking-wider text-gray-950 mb-0.5">
          {personalDetails.fullName || 'YOUR NAME'}
        </h1>
        {personalDetails.jobTitle && (
          <p className="text-xs font-semibold tracking-wide text-gray-700 uppercase mb-1.5">
            {personalDetails.jobTitle}
          </p>
        )}
        <div className="text-[11px] text-gray-700 flex flex-wrap justify-center items-center gap-x-2 gap-y-0.5">
          {contactItems.map((item, idx) => (
            <React.Fragment key={idx}>
              <span>{item}</span>
              {idx < contactItems.length - 1 && <span className="text-gray-400">•</span>}
            </React.Fragment>
          ))}
        </div>
      </header>

      {/* Summary */}
      {personalDetails.summary.trim() && (
        <section className="resume-section mb-3.5">
          <h2
            className="text-xs font-bold uppercase tracking-wider pb-0.5 mb-1.5 border-b border-gray-400"
            style={{ color: settings.primaryColor }}
          >
            Professional Summary
          </h2>
          <p className="text-xs text-gray-800 text-justify leading-relaxed">
            {personalDetails.summary}
          </p>
        </section>
      )}

      {/* Render sections according to user's custom sectionOrder */}
      {settings.sectionOrder.map((sectionKey) => renderSectionByKey(sectionKey))}
    </div>
  );
};
