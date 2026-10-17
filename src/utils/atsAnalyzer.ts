import type { ResumeData, AtsScoreResult, AtsScoreFeedback, KeywordMatchResult } from '../types/cv';
import { ALL_ACTION_VERBS, WEAK_VERBS } from '../data/actionVerbs';

// Common English stopwords to ignore when analyzing job postings
const STOP_WORDS = new Set([
  'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any', 'are', 'aren\'t', 'as',
  'at', 'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'but', 'by', 'can', 'can\'t',
  'cannot', 'could', 'couldn\'t', 'did', 'didn\'t', 'do', 'does', 'doesn\'t', 'doing', 'don\'t', 'down', 'during',
  'each', 'few', 'for', 'from', 'further', 'had', 'hadn\'t', 'has', 'hasn\'t', 'have', 'haven\'t', 'having',
  'he', 'he\'d', 'he\'ll', 'he\'s', 'her', 'here', 'here\'s', 'hers', 'herself', 'him', 'himself', 'his', 'how',
  'how\'s', 'i', 'i\'d', 'i\'ll', 'i\'m', 'i\'ve', 'if', 'in', 'into', 'is', 'isn\'t', 'it', 'it\'s', 'its',
  'itself', 'let\'s', 'me', 'more', 'most', 'mustn\'t', 'my', 'myself', 'no', 'nor', 'not', 'of', 'off', 'on',
  'once', 'only', 'or', 'other', 'ought', 'our', 'ours', 'ourselves', 'out', 'over', 'own', 'same', 'shan\'t',
  'she', 'she\'d', 'she\'ll', 'she\'s', 'should', 'shouldn\'t', 'so', 'some', 'such', 'than', 'that', 'that\'s',
  'the', 'their', 'theirs', 'them', 'themselves', 'then', 'there', 'there\'s', 'these', 'they', 'they\'d',
  'they\'ll', 'they\'re', 'they\'ve', 'this', 'those', 'through', 'to', 'too', 'under', 'until', 'up', 'very',
  'was', 'wasn\'t', 'we', 'we\'d', 'we\'ll', 'we\'re', 'we\'ve', 'were', 'weren\'t', 'what', 'what\'s', 'when',
  'when\'s', 'where', 'where\'s', 'which', 'while', 'who', 'who\'s', 'whom', 'why', 'why\'s', 'with', 'won\'t',
  'would', 'wouldn\'t', 'you', 'you\'d', 'you\'ll', 'you\'re', 'you\'ve', 'your', 'yours', 'yourself', 'yourselves',
  'will', 'also', 'etc', 'including', 'across', 'within', 'per', 'years', 'experience', 'role', 'team', 'work',
  'candidate', 'must', 'plus', 'preferred', 'required', 'ideal', 'ability', 'skills', 'strong', 'good', 'great'
]);

export function analyzeAtsScore(resume: ResumeData): AtsScoreResult {
  const feedbacks: AtsScoreFeedback[] = [];
  let score = 0;

  const { personalDetails, experience, education, skillCategories, projects } = resume;

  // 1. Contact Information Analysis (Weight: 20 pts)
  const hasName = Boolean(personalDetails.fullName.trim());
  const hasJobTitle = Boolean(personalDetails.jobTitle.trim());
  const hasEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personalDetails.email.trim());
  const hasPhone = personalDetails.phone.trim().length >= 7;
  const hasLocation = Boolean((personalDetails.city || personalDetails.location || '').trim());
  const hasSocial = Boolean(personalDetails.linkedin.trim() || personalDetails.github.trim() || personalDetails.website.trim());

  if (hasName) {
    score += 4;
  } else {
    feedbacks.push({
      category: 'contact',
      title: 'Full Name Missing',
      scoreImpact: -4,
      isPassed: false,
      message: 'ATS scanners require a clear candidate name at the top.',
    });
  }

  if (hasJobTitle) {
    score += 4;
  } else {
    feedbacks.push({
      category: 'contact',
      title: 'Target Job Title Missing',
      scoreImpact: -4,
      isPassed: false,
      message: 'Add a target title under your name to match recruiter search filters.',
    });
  }

  if (hasEmail) {
    score += 4;
  } else {
    feedbacks.push({
      category: 'contact',
      title: 'Valid Email Required',
      scoreImpact: -4,
      isPassed: false,
      message: 'A valid email format is required for ATS recruiter outreach.',
    });
  }

  if (hasPhone) {
    score += 3;
  } else {
    feedbacks.push({
      category: 'contact',
      title: 'Phone Number Missing',
      scoreImpact: -3,
      isPassed: false,
      message: 'Include a contact phone number with country/area code.',
    });
  }

  if (hasLocation) {
    score += 3;
  } else {
    feedbacks.push({
      category: 'contact',
      title: 'City / Location Missing',
      scoreImpact: -3,
      isPassed: false,
      message: 'ATS filters candidates by geographic location (City, State / Country).',
    });
  }

  if (hasSocial) {
    score += 2;
  } else {
    feedbacks.push({
      category: 'contact',
      title: 'Professional Profile Link (Optional but Recommended)',
      scoreImpact: -2,
      isPassed: false,
      message: 'Adding LinkedIn or GitHub increases recruiter credibility score.',
    });
  }

  // 2. Professional Summary (Weight: 10 pts)
  const summaryWords = personalDetails.summary.trim().split(/\s+/).filter(Boolean);
  if (summaryWords.length >= 30 && summaryWords.length <= 120) {
    score += 10;
  } else if (summaryWords.length > 0 && summaryWords.length < 30) {
    score += 5;
    feedbacks.push({
      category: 'summary',
      title: 'Summary is Too Brief',
      scoreImpact: -5,
      isPassed: false,
      message: `Your summary is ${summaryWords.length} words. Aim for 35–80 words highlighting your specialization and years of impact.`,
    });
  } else if (summaryWords.length > 120) {
    score += 6;
    feedbacks.push({
      category: 'summary',
      title: 'Summary is Too Long',
      scoreImpact: -4,
      isPassed: false,
      message: 'Keep your summary concise (under 100 words). Recruiters spend only 6 seconds scanning.',
    });
  } else {
    feedbacks.push({
      category: 'summary',
      title: 'Professional Summary Missing',
      scoreImpact: -10,
      isPassed: false,
      message: 'A concise 2-3 sentence career summary is key for ATS keyword ranking.',
    });
  }

  // 3. Work Experience Quality & Impact (Weight: 35 pts)
  let metricsCount = 0;
  const actionVerbsFoundSet = new Set<string>();
  const weakWordsFoundSet = new Set<string>();

  const allBullets: string[] = [];
  experience.forEach((exp) => {
    exp.bullets.forEach((b) => {
      if (b.trim()) allBullets.push(b.trim());
    });
  });

  // Metric detection regex: detects numbers, percentages, dollar signs, multiplier 'x'
  const metricRegex = /(\b\d+(\.\d+)?%|\$\d+(\.\d+)?(k|m|b)?|\b\d+\s*(k|m|b|x|\+)?\b)/i;

  allBullets.forEach((bullet) => {
    const lower = bullet.toLowerCase();

    // Check for metrics
    if (metricRegex.test(bullet) || /\b(reduced|increased|improved|decreased|accelerated|saved)\s+by\b/i.test(bullet)) {
      metricsCount++;
    }

    // Check starting action verb
    const firstWord = bullet.trim().split(/\s+/)[0]?.toLowerCase().replace(/[^a-z]/g, '');
    if (firstWord && ALL_ACTION_VERBS.includes(firstWord)) {
      actionVerbsFoundSet.add(firstWord);
    }

    // Check for weak verbs
    WEAK_VERBS.forEach((item) => {
      if (lower.includes(item.weak)) {
        weakWordsFoundSet.add(item.weak);
      }
    });
  });

  if (experience.length > 0) {
    score += 8;
  } else {
    feedbacks.push({
      category: 'experience',
      title: 'No Work Experience Listed',
      scoreImpact: -8,
      isPassed: false,
      message: 'Add at least one professional or internship role.',
    });
  }

  // Bullet points count
  if (allBullets.length >= 4) {
    score += 7;
  } else {
    feedbacks.push({
      category: 'experience',
      title: 'Insufficient Bullet Points',
      scoreImpact: -7,
      isPassed: false,
      message: 'Aim for at least 3-4 descriptive bullet points per position.',
    });
  }

  // Measurable impact check
  if (metricsCount >= 3) {
    score += 10;
  } else if (metricsCount >= 1) {
    score += 5;
    feedbacks.push({
      category: 'experience',
      title: 'Add More Quantifiable Metrics',
      scoreImpact: -5,
      isPassed: false,
      message: `Found ${metricsCount} bullet(s) with metrics. Top ATS-rated resumes include specific numbers (e.g. "increased speed by 35%", "saved \$40K", "handled 50k users").`,
    });
  } else {
    feedbacks.push({
      category: 'experience',
      title: 'Missing Measurable Achievements (STAR Formula)',
      scoreImpact: -10,
      isPassed: false,
      message: 'Add measurable results (% increases, revenue, time saved, team size) to prove your impact.',
    });
  }

  // Action verbs check
  if (actionVerbsFoundSet.size >= 3) {
    score += 10;
  } else if (actionVerbsFoundSet.size >= 1) {
    score += 5;
    feedbacks.push({
      category: 'experience',
      title: 'Start Bullets with Power Action Verbs',
      scoreImpact: -5,
      isPassed: false,
      message: 'Start each bullet point with a strong action verb (e.g. Spearheaded, Engineered, Orchestrated, Optimized).',
    });
  } else {
    feedbacks.push({
      category: 'experience',
      title: 'No Strong Action Verbs Detected',
      scoreImpact: -10,
      isPassed: false,
      message: 'Use our Action Verbs library to replace passive descriptions with high-impact verbs.',
    });
  }

  if (weakWordsFoundSet.size > 0) {
    feedbacks.push({
      category: 'experience',
      title: 'Passive/Weak Language Detected',
      scoreImpact: -3,
      isPassed: false,
      message: `Found passive phrasing: "${Array.from(weakWordsFoundSet).join(', ')}". Replace with active leadership words.`,
    });
    score = Math.max(0, score - 3);
  }

  // 4. Skills Section (Weight: 20 pts)
  const totalSkillsCount = skillCategories.reduce((acc, cat) => acc + cat.skills.length, 0);

  if (totalSkillsCount >= 8) {
    score += 15;
  } else if (totalSkillsCount >= 4) {
    score += 8;
    feedbacks.push({
      category: 'skills',
      title: 'Expand Technical & Core Skills',
      scoreImpact: -7,
      isPassed: false,
      message: `You currently have ${totalSkillsCount} skills listed. Modern ATS systems search for at least 8–15 targeted keywords.`,
    });
  } else {
    feedbacks.push({
      category: 'skills',
      title: 'Skills Section is Incomplete',
      scoreImpact: -15,
      isPassed: false,
      message: 'List relevant technical competencies, tools, frameworks, and methodologies.',
    });
  }

  // Skill categorization bonus (ATS parsing loves categorized technical vs tool skills)
  if (skillCategories.length >= 2 && totalSkillsCount >= 6) {
    score += 5;
  } else if (totalSkillsCount >= 4) {
    feedbacks.push({
      category: 'skills',
      title: 'Categorize Your Skills',
      scoreImpact: -5,
      isPassed: false,
      message: 'Grouping skills (e.g., Languages, Frameworks, Cloud, Tools) increases ATS readability by 40%.',
    });
  }

  // 5. Education Section (Weight: 10 pts)
  if (education.length > 0 && education[0].institution.trim() && education[0].degree.trim()) {
    score += 10;
  } else if (education.length > 0 && education[0].institution.trim()) {
    score += 5;
    feedbacks.push({
      category: 'education',
      title: 'Degree or Field of Study Missing',
      scoreImpact: -5,
      isPassed: false,
      message: 'ATS education parsers match against specific degrees (B.S., B.A., M.S., etc.).',
    });
  } else {
    feedbacks.push({
      category: 'education',
      title: 'Education Section Missing',
      scoreImpact: -10,
      isPassed: false,
      message: 'List your highest degree, university name, and graduation year.',
    });
  }

  // 6. Projects & Certifications (Weight: 5 pts bonus)
  if (projects.length > 0 || resume.certifications.length > 0) {
    score += 5;
  }

  // Ensure score is clamped between 0 and 100
  const finalScore = Math.min(100, Math.max(0, score));

  // Determine estimated resume length
  const totalContentWords = [
    personalDetails.summary,
    ...allBullets,
    ...skillCategories.flatMap((c) => c.skills),
    ...education.map((e) => `${e.degree} ${e.institution} ${e.fieldOfStudy}`),
  ].join(' ').split(/\s+/).filter(Boolean).length;

  let estimatedLength: 'optimal' | 'short' | 'too_long' = 'optimal';
  if (totalContentWords < 150) estimatedLength = 'short';
  if (totalContentWords > 750) estimatedLength = 'too_long';

  const totalChecks = 9;
  const passedChecks = feedbacks.filter((f) => f.isPassed).length + (totalChecks - feedbacks.length);

  return {
    score: finalScore,
    totalChecks,
    passedChecks: Math.max(0, passedChecks),
    feedbacks,
    metricsFound: metricsCount,
    actionVerbsFound: Array.from(actionVerbsFoundSet),
    weakWordsFound: Array.from(weakWordsFoundSet),
    estimatedLength,
  };
}

export function matchJobDescription(resume: ResumeData, jobDescription: string): KeywordMatchResult {
  if (!jobDescription.trim()) {
    return {
      matchedKeywords: [],
      missingKeywords: [],
      matchRate: 0,
      totalJobKeywords: 0,
    };
  }

  // Normalize full resume text
  const resumeText = [
    resume.personalDetails.jobTitle,
    resume.personalDetails.summary,
    ...resume.experience.map((e) => `${e.role} ${e.company} ${e.bullets.join(' ')}`),
    ...resume.education.map((e) => `${e.degree} ${e.fieldOfStudy} ${e.institution}`),
    ...resume.skillCategories.flatMap((c) => c.skills),
    ...resume.projects.map((p) => `${p.name} ${p.techStack.join(' ')} ${p.bullets.join(' ')}`),
    ...resume.certifications.map((c) => c.name),
  ]
    .join(' ')
    .toLowerCase();

  // Extract clean keywords from job description (alphanumeric + common symbols like .js, c++, c#, etc.)
  const rawWords = jobDescription
    .replace(/[^\w\s+#.-]/g, ' ')
    .split(/\s+/)
    .map((w) => w.trim().toLowerCase())
    .filter((w) => w.length > 2 && !STOP_WORDS.has(w));

  // Count word frequencies to find high priority keywords in the job posting
  const frequencyMap = new Map<string, number>();
  rawWords.forEach((word) => {
    frequencyMap.set(word, (frequencyMap.get(word) || 0) + 1);
  });

  // Sort unique keywords by relevance/frequency
  const sortedKeywords = Array.from(frequencyMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 30) // top 30 key terms
    .map(([word]) => word);

  const matchedKeywords: string[] = [];
  const missingKeywords: string[] = [];

  sortedKeywords.forEach((kw) => {
    // Regex boundary search or substring for compound tech terms
    const escaped = kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`\\b${escaped}\\b`, 'i');
    if (regex.test(resumeText) || resumeText.includes(kw)) {
      matchedKeywords.push(kw);
    } else {
      missingKeywords.push(kw);
    }
  });

  const total = sortedKeywords.length;
  const matchRate = total > 0 ? Math.round((matchedKeywords.length / total) * 100) : 0;

  return {
    matchedKeywords,
    missingKeywords,
    matchRate,
    totalJobKeywords: total,
  };
}
