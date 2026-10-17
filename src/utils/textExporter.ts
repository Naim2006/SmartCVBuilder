import type { ResumeData } from '../types/cv';

export function generatePlainTextResume(resume: ResumeData): string {
  const {
    personalDetails,
    experience,
    education,
    skillCategories,
    projects,
    certifications,
    volunteer,
    awards,
    courses,
    languages,
    customSections,
    settings,
  } = resume;

  const isVisible = (key: string) => settings.sectionVisibility[key] !== false;
  const lines: string[] = [];

  // Header
  lines.push((personalDetails.fullName || 'YOUR NAME').toUpperCase());
  if (personalDetails.jobTitle) lines.push(personalDetails.jobTitle);

  const locationStr = personalDetails.city && personalDetails.country
    ? `${personalDetails.city}, ${personalDetails.country}`
    : personalDetails.location;

  const contactPieces = [
    personalDetails.email,
    personalDetails.phone,
    locationStr,
    personalDetails.linkedin,
    personalDetails.github,
    personalDetails.website,
    personalDetails.otherUrl,
  ].filter(Boolean);

  if (contactPieces.length > 0) {
    lines.push(contactPieces.join(' | '));
  }
  lines.push('');

  // Professional Summary
  if (personalDetails.summary.trim()) {
    lines.push('PROFESSIONAL SUMMARY');
    lines.push('----------------------------------------');
    lines.push(personalDetails.summary.trim());
    lines.push('');
  }

  // Loop through sections in user's custom sectionOrder
  settings.sectionOrder.forEach((sectionKey) => {
    if (!isVisible(sectionKey)) return;

    switch (sectionKey) {
      case 'experience':
        if (experience.length > 0 && experience.some((e) => e.company || e.role)) {
          lines.push('WORK EXPERIENCE');
          lines.push('----------------------------------------');
          experience.forEach((exp) => {
            if (!exp.company && !exp.role) return;
            const titleLine = `${exp.role || 'Role'}${exp.employmentType ? ` (${exp.employmentType})` : ''} | ${exp.company || 'Company'}`;
            const dateLine = `${exp.startDate} - ${exp.current ? 'Present' : exp.endDate || 'Present'}${
              exp.location ? ` | ${exp.location}` : ''
            }`;
            lines.push(titleLine);
            lines.push(dateLine);
            exp.bullets.forEach((bullet) => {
              if (bullet.trim()) lines.push(`  • ${bullet.trim()}`);
            });
            lines.push('');
          });
        }
        break;

      case 'skills':
        if (skillCategories.some((cat) => cat.skills.length > 0)) {
          lines.push('SKILLS & COMPETENCIES');
          lines.push('----------------------------------------');
          skillCategories.forEach((cat) => {
            if (cat.skills.length > 0) {
              lines.push(`${cat.categoryName || 'Skills'}: ${cat.skills.join(', ')}`);
            }
          });
          lines.push('');
        }
        break;

      case 'education':
        if (education.length > 0 && education.some((e) => e.institution || e.degree)) {
          lines.push('EDUCATION');
          lines.push('----------------------------------------');
          education.forEach((edu) => {
            if (!edu.institution && !edu.degree) return;
            lines.push(`${edu.degree || 'Degree'}${edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}`);
            lines.push(`${edu.institution || 'University'}${edu.location ? ` - ${edu.location}` : ''}`);
            lines.push(`${edu.startDate} - ${edu.current ? 'Present' : edu.endDate || 'Graduated'}`);
            if (edu.gpa) lines.push(`GPA: ${edu.gpa}`);
            if (edu.coursework) lines.push(`Coursework: ${edu.coursework}`);
            lines.push('');
          });
        }
        break;

      case 'projects':
        if (projects.length > 0 && projects.some((p) => p.name)) {
          lines.push('KEY PROJECTS');
          lines.push('----------------------------------------');
          projects.forEach((proj) => {
            if (!proj.name) return;
            const techStr = proj.techStack.length > 0 ? ` (${proj.techStack.join(', ')})` : '';
            lines.push(`${proj.name}${techStr}`);
            if (proj.description) lines.push(proj.description);
            if (proj.liveUrl || proj.githubUrl) {
              const urls = [proj.liveUrl, proj.githubUrl].filter(Boolean).join(' | ');
              lines.push(`Link: ${urls}`);
            }
            proj.bullets.forEach((bullet) => {
              if (bullet.trim()) lines.push(`  • ${bullet.trim()}`);
            });
            lines.push('');
          });
        }
        break;

      case 'certifications':
        if (certifications.length > 0 && certifications.some((c) => c.name)) {
          lines.push('CERTIFICATIONS');
          lines.push('----------------------------------------');
          certifications.forEach((cert) => {
            if (!cert.name) return;
            lines.push(`${cert.name} - ${cert.issuer} (${cert.date})`);
          });
          lines.push('');
        }
        break;

      case 'volunteer':
        if (volunteer.length > 0 && volunteer.some((v) => v.role || v.organization)) {
          lines.push('VOLUNTEER EXPERIENCE');
          lines.push('----------------------------------------');
          volunteer.forEach((v) => {
            lines.push(`${v.role} | ${v.organization} (${v.startDate} - ${v.current ? 'Present' : v.endDate})`);
            if (v.responsibilities) lines.push(`  ${v.responsibilities}`);
          });
          lines.push('');
        }
        break;

      case 'awards':
        if (awards.length > 0 && awards.some((a) => a.title)) {
          lines.push('AWARDS & HONORS');
          lines.push('----------------------------------------');
          awards.forEach((a) => {
            lines.push(`${a.title} - ${a.issuer} (${a.date})`);
            if (a.description) lines.push(`  ${a.description}`);
          });
          lines.push('');
        }
        break;

      case 'courses':
        if (courses.length > 0 && courses.some((c) => c.name)) {
          lines.push('COURSES & TRAINING');
          lines.push('----------------------------------------');
          courses.forEach((c) => {
            lines.push(`${c.name} - ${c.platform} (${c.date})`);
          });
          lines.push('');
        }
        break;

      case 'languages':
        if (languages.length > 0 && languages.some((l) => l.name)) {
          lines.push('LANGUAGES');
          lines.push('----------------------------------------');
          lines.push(languages.map((l) => `${l.name} (${l.level})`).join(', '));
          lines.push('');
        }
        break;

      case 'custom':
        if (customSections.length > 0) {
          customSections.forEach((sec) => {
            lines.push(sec.heading.toUpperCase());
            lines.push('----------------------------------------');
            sec.items.forEach((it) => {
              lines.push(`${it.title}: ${it.description || ''}`);
            });
            lines.push('');
          });
        }
        break;

      default:
        break;
    }
  });

  return lines.join('\n');
}

export function downloadPlainTextResume(resume: ResumeData, filename = 'Smart_CV.txt') {
  const text = generatePlainTextResume(resume);
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
