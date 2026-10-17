import type { ResumeData, QualityIssue } from '../types/cv';
import { WEAK_VERBS } from '../data/actionVerbs';

export function runQualityCheck(resume: ResumeData): QualityIssue[] {
  const issues: QualityIssue[] = [];
  const { personalDetails, experience, education, skillCategories, projects, settings } = resume;

  // 1. Personal Details Checks
  if (!personalDetails.fullName.trim()) {
    issues.push({
      id: 'name-missing',
      severity: 'critical',
      section: 'Personal Details',
      message: 'Full Name is missing. Recruiters and ATS scanners cannot index your identity.',
      actionTip: 'Enter your formal first and last name at the top of the Contact tab.',
    });
  }

  if (!personalDetails.jobTitle.trim()) {
    issues.push({
      id: 'headline-missing',
      severity: 'warning',
      section: 'Personal Details',
      message: 'Professional headline is missing. Target titles help ATS match your profile to recruiter searches.',
      actionTip: 'Add a target title like "Senior Full-Stack Engineer" or "Junior Product Manager".',
    });
  }

  if (!personalDetails.email.trim()) {
    issues.push({
      id: 'email-missing',
      severity: 'critical',
      section: 'Personal Details',
      message: 'Email address is missing.',
      actionTip: 'Provide a professional contact email address.',
    });
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personalDetails.email.trim())) {
    issues.push({
      id: 'email-invalid',
      severity: 'warning',
      section: 'Personal Details',
      message: 'Email format looks invalid or incomplete.',
      actionTip: 'Ensure your email matches the format: username@domain.com.',
    });
  }

  if (!personalDetails.phone.trim()) {
    issues.push({
      id: 'phone-missing',
      severity: 'warning',
      section: 'Personal Details',
      message: 'Phone number is missing.',
      actionTip: 'Include a contact phone number with country/area code.',
    });
  }

  if (!personalDetails.city.trim() && !personalDetails.location?.trim()) {
    issues.push({
      id: 'location-missing',
      severity: 'suggestion',
      section: 'Personal Details',
      message: 'City or location is not provided.',
      actionTip: 'Add your city and country to match location-based recruiter filters.',
    });
  }

  // 2. Professional Summary
  const summaryWords = personalDetails.summary.trim().split(/\s+/).filter(Boolean);
  if (!personalDetails.summary.trim()) {
    issues.push({
      id: 'summary-empty',
      severity: 'suggestion',
      section: 'Professional Summary',
      message: 'Consider adding a 2–3 sentence professional summary.',
      actionTip: 'Highlight your primary expertise, key strengths, and career highlights.',
    });
  } else if (summaryWords.length < 25) {
    issues.push({
      id: 'summary-short',
      severity: 'suggestion',
      section: 'Professional Summary',
      message: `Your summary is brief (${summaryWords.length} words).`,
      actionTip: 'Expand to 35–80 words to include more role-relevant keywords.',
    });
  } else if (summaryWords.length > 120) {
    issues.push({
      id: 'summary-long',
      severity: 'warning',
      section: 'Professional Summary',
      message: `Summary is quite long (${summaryWords.length} words). Recruiters scan summaries in 5–8 seconds.`,
      actionTip: 'Condense into 2–4 concise, punchy sentences.',
    });
  }

  // 3. Work Experience Checks
  const isExpVisible = settings.sectionVisibility['experience'] ?? true;
  if (isExpVisible) {
    if (experience.length === 0) {
      issues.push({
        id: 'exp-none',
        severity: 'suggestion',
        section: 'Work Experience',
        message: 'No work experience listed.',
        actionTip: 'Add professional roles, internships, or freelance positions.',
      });
    } else {
      experience.forEach((exp, idx) => {
        if (!exp.role.trim() || !exp.company.trim()) {
          issues.push({
            id: `exp-${idx}-incomplete`,
            severity: 'critical',
            section: 'Work Experience',
            message: `Position #${idx + 1} has an empty job title or company name.`,
            actionTip: 'Complete the job title and company fields.',
          });
        }

        const validBullets = exp.bullets.filter((b) => b.trim().length > 0);
        if (validBullets.length === 0) {
          issues.push({
            id: `exp-${idx}-no-bullets`,
            severity: 'warning',
            section: 'Work Experience',
            message: `Position #${idx + 1} (${exp.role || 'Role'}) has no bullet points describing your impact.`,
            actionTip: 'Add at least 2–3 bullet points highlighting achievements and responsibilities.',
          });
        } else {
          // Check for weak phrases
          validBullets.forEach((bullet) => {
            const lower = bullet.toLowerCase();
            const weak = WEAK_VERBS.find((w) => lower.includes(w.weak));
            if (weak) {
              issues.push({
                id: `exp-${idx}-weak-word`,
                severity: 'suggestion',
                section: 'Work Experience',
                message: `Passive wording detected in ${exp.company || 'role'}: "${weak.weak}".`,
                actionTip: `Replace with high-impact action verbs like: ${weak.suggested.slice(0, 3).join(', ')}.`,
              });
            }
          });
        }

        if (!exp.startDate.trim()) {
          issues.push({
            id: `exp-${idx}-no-date`,
            severity: 'suggestion',
            section: 'Work Experience',
            message: `Start date is missing for position at ${exp.company || `#${idx + 1}`}.`,
            actionTip: 'Add employment start dates (e.g., 2021-03) for consistent timeline parsing.',
          });
        }
      });

      // Measurable impact check
      const metricRegex = /(\b\d+(\.\d+)?%|\$\d+(\.\d+)?(k|m|b)?|\b\d+\s*(k|m|b|x|\+)?\b)/i;
      const allBullets = experience.flatMap((e) => e.bullets);
      const metricsCount = allBullets.filter((b) => metricRegex.test(b)).length;
      if (metricsCount === 0 && allBullets.length > 0) {
        issues.push({
          id: 'exp-no-metrics',
          severity: 'suggestion',
          section: 'Work Experience',
          message: 'No quantifiable metrics found across your work experience bullets.',
          actionTip: 'Quantify your impact using numbers, percentages, dollar amounts, or time saved (e.g. "increased speed by 35%").',
        });
      }
    }
  }

  // 4. Skills Checks
  const isSkillsVisible = settings.sectionVisibility['skills'] ?? true;
  if (isSkillsVisible) {
    const totalSkills = skillCategories.reduce((acc, cat) => acc + cat.skills.length, 0);
    if (totalSkills === 0) {
      issues.push({
        id: 'skills-none',
        severity: 'critical',
        section: 'Skills',
        message: 'No skills entered. ATS algorithms score resumes heavily on skill keyword matching.',
        actionTip: 'Add relevant technical, language, and core domain competencies.',
      });
    } else if (totalSkills < 6) {
      issues.push({
        id: 'skills-few',
        severity: 'suggestion',
        section: 'Skills',
        message: `You have ${totalSkills} skill(s) listed. Most competitive ATS resumes list 8–15 relevant skills.`,
        actionTip: 'Expand your skills section with relevant tools, methodologies, and frameworks.',
      });
    }
  }

  // 5. Education Checks
  const isEduVisible = settings.sectionVisibility['education'] ?? true;
  if (isEduVisible) {
    if (education.length === 0) {
      issues.push({
        id: 'edu-none',
        severity: 'warning',
        section: 'Education',
        message: 'No education listed.',
        actionTip: 'Add your university degree, college diploma, or high school credential.',
      });
    } else {
      education.forEach((edu, idx) => {
        if (!edu.institution.trim() || !edu.degree.trim()) {
          issues.push({
            id: `edu-${idx}-incomplete`,
            severity: 'warning',
            section: 'Education',
            message: `Education entry #${idx + 1} is missing the institution name or degree.`,
            actionTip: 'Specify the degree name (e.g. B.S., M.S.) and university.',
          });
        }
      });
    }
  }

  // 6. Projects Checks
  const isProjVisible = settings.sectionVisibility['projects'] ?? true;
  if (isProjVisible && projects.length > 0) {
    projects.forEach((proj, idx) => {
      if (!proj.name.trim()) {
        issues.push({
          id: `proj-${idx}-no-title`,
          severity: 'warning',
          section: 'Projects',
          message: `Project #${idx + 1} has no title.`,
          actionTip: 'Enter a clear descriptive title for the project.',
        });
      }
      if (!proj.description.trim() && proj.bullets.length === 0) {
        issues.push({
          id: `proj-${idx}-no-desc`,
          severity: 'suggestion',
          section: 'Projects',
          message: `Project "${proj.name || `#${idx + 1}`}" lacks a description or bullet points.`,
          actionTip: 'Add what you built, problems solved, and technologies utilized.',
        });
      }
    });
  }

  return issues;
}
