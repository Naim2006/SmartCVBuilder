import React from 'react';
import type { ResumeData } from '../../../types/cv';

interface TemplateProps {
  data: ResumeData;
}

export const FreeformTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalDetails, settings, freeformText } = data;

  const contactItems = [
    personalDetails.phone,
    personalDetails.email,
    personalDetails.city && personalDetails.country
      ? `${personalDetails.city}, ${personalDetails.country}`
      : personalDetails.location,
    personalDetails.linkedin,
    personalDetails.github,
    personalDetails.website,
    personalDetails.otherUrl,
    personalDetails.workAuthorization,
  ].filter(Boolean);

  // If freeformText is empty, provide a clean default
  const content =
    freeformText && freeformText.trim()
      ? freeformText
      : `## PROFESSIONAL SUMMARY\nResults-driven professional with proven expertise in project execution, problem-solving, and cross-functional leadership. Adept at optimizing workflows and delivering measurable business outcomes.\n\n## CORE SKILLS\n- Technical Skills: JavaScript, TypeScript, React, Node.js, SQL, Git\n- Professional Competencies: Team Leadership, Agile Methodology, Strategic Planning, Communication\n\n## WORK EXPERIENCE\nSenior Professional — ABC Technology Corp (2022 – Present)\n- Led key operational initiatives resulting in 35% productivity boost.\n- Spearheaded system modernizations while collaborating with cross-functional teams.\n- Mentored junior colleagues and implemented quality assurance best practices.\n\nAssociate Specialist — Global Solutions Ltd (2019 – 2022)\n- Managed end-to-end deliverables adhering to strict timeline and budget constraints.\n- Improved customer satisfaction scores by 28% through iterative client feedback.\n\n## EDUCATION\nBachelor of Science in Computer Science & Engineering\nState University | Graduated with Honors (2015 – 2019)`;

  // Parse markdown-like syntax into clean ATS HTML
  const lines = content.split('\n');
  const renderedElements: React.ReactNode[] = [];
  let currentBulletList: string[] = [];

  const flushBullets = (key: string) => {
    if (currentBulletList.length > 0) {
      renderedElements.push(
        <ul key={key} className="list-disc list-outside ml-4 space-y-0.5 text-xs text-gray-800 leading-snug mb-2">
          {currentBulletList.map((b, i) => (
            <li key={i}>{formatInline(b)}</li>
          ))}
        </ul>
      );
      currentBulletList = [];
    }
  };

  const formatInline = (text: string): React.ReactNode => {
    // Parse bold: **bold** and markdown links: [text](url)
    const tokenRegex = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;
    const parts = text.split(tokenRegex);
    return parts.map((part, idx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={idx}>{part.slice(2, -2)}</strong>;
      }
      const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (linkMatch) {
        return (
          <a
            key={idx}
            href={linkMatch[2].startsWith('http') ? linkMatch[2] : `https://${linkMatch[2]}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 hover:underline font-semibold"
          >
            {linkMatch[1]} ↗
          </a>
        );
      }
      return part;
    });
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    if (!trimmed) {
      flushBullets(`bullet-flush-${index}`);
      return;
    }

    if (trimmed.startsWith('# ') || trimmed.startsWith('## ') || (trimmed.startsWith('===') && index > 0)) {
      flushBullets(`bullet-flush-${index}`);
      const title = trimmed.replace(/^#+\s*/, '').replace(/=+$/, '');
      renderedElements.push(
        <h2
          key={`heading-${index}`}
          className="text-xs font-bold uppercase tracking-wider pb-0.5 mt-2 mb-1 border-b border-gray-400"
          style={{ color: settings.primaryColor }}
        >
          {title}
        </h2>
      );
    } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ') || trimmed.startsWith('• ')) {
      currentBulletList.push(trimmed.replace(/^[-*•]\s*/, ''));
    } else if (trimmed === '---' || trimmed === '___') {
      flushBullets(`bullet-flush-${index}`);
      renderedElements.push(<hr key={`hr-${index}`} className="my-1.5 border-gray-300" />);
    } else {
      flushBullets(`bullet-flush-${index}`);
      renderedElements.push(
        <p key={`p-${index}`} className="text-xs text-gray-800 leading-normal mb-1">
          {formatInline(trimmed)}
        </p>
      );
    }
  });

  flushBullets('bullet-flush-final');

  return (
    <div className="text-black bg-white w-full leading-normal">
      {/* Header */}
      <header className="resume-header text-center pb-2 border-b border-gray-400 mb-2">
        <h1 className="text-2xl font-bold uppercase tracking-wider text-gray-950 mb-0.5">
          {personalDetails.fullName || 'YOUR NAME'}
        </h1>
        {personalDetails.jobTitle && (
          <p className="text-xs font-semibold tracking-wide text-gray-700 uppercase mb-1">
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

      {/* Rendered Freeform Body */}
      <div className="space-y-0.5">{renderedElements}</div>
    </div>
  );
};
