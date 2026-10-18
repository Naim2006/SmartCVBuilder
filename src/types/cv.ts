export type TemplateType = 'classic' | 'modern' | 'compact' | 'executive' | 'developer' | 'freeform';
export type FontType = 'inter' | 'roboto' | 'arial' | 'georgia' | 'times' | 'garamond';
export type FontSize = 'xsmall' | 'compact' | 'normal' | 'spacious' | 'large';
export type SpacingType = 'compact' | 'normal' | 'relaxed';
export type MarginType = 'compact' | 'normal' | 'spacious';

export interface PersonalDetails {
  fullName: string;
  jobTitle: string; // Professional Headline
  email: string;
  phone: string;
  city: string;
  country: string;
  location?: string; // Fallback or combined
  linkedin: string;
  github: string;
  website: string;
  otherUrl?: string;
  summary: string;
  // Optional details
  photoUrl?: string;
  showPhoto?: boolean;
  fullAddress?: string;
  nationality?: string;
  workAuthorization?: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  employmentType?: string; // Full-time, Contract, Internship, etc.
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  bullets: string[];
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  location: string;
  startDate: string;
  endDate: string; // Passing / expected year
  current: boolean;
  gpa?: string;
  coursework?: string;
  description?: string;
}

export interface SkillCategory {
  id: string;
  categoryName: string;
  skills: string[];
}

export interface ProjectItem {
  id: string;
  name: string;
  description: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  startDate?: string;
  endDate?: string;
  bullets: string[];
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expirationDate?: string;
  credentialId?: string;
  url?: string;
}

export interface VolunteerItem {
  id: string;
  role: string;
  organization: string;
  startDate: string;
  endDate: string;
  current: boolean;
  responsibilities: string;
  bullets: string[];
}

export interface AwardItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
}

export interface CourseItem {
  id: string;
  name: string;
  platform: string;
  date: string;
  skillsLearned?: string;
  url?: string;
}

export interface LanguageItem {
  id: string;
  name: string;
  level: string; // Native, Fluent, Professional Working, Intermediate, Basic, or custom
}

export interface PublicationItem {
  id: string;
  title: string;
  publisher: string;
  date: string;
  description: string;
  url?: string;
}

export interface CustomSectionItem {
  id: string;
  title: string;
  subtitle?: string;
  date?: string;
  description?: string;
  bullets?: string[];
}

export interface CustomSection {
  id: string;
  heading: string;
  items: CustomSectionItem[];
}

export interface ResumeSettings {
  template: TemplateType;
  font: FontType;
  fontSize: FontSize;
  spacing: SpacingType;
  marginSize?: MarginType;
  fitOnePage?: boolean;
  paperSize?: 'a4' | 'letter';
  primaryColor: string;
  sectionOrder: string[];
  sectionVisibility: Record<string, boolean>;
  sectionTitles?: Record<string, string>;
  showIcons: boolean;
}

export interface ResumeData {
  personalDetails: PersonalDetails;
  experience: ExperienceItem[];
  education: EducationItem[];
  skillCategories: SkillCategory[];
  projects: ProjectItem[];
  certifications: CertificationItem[];
  volunteer: VolunteerItem[];
  awards: AwardItem[];
  courses: CourseItem[];
  languages: LanguageItem[];
  publications: PublicationItem[];
  customSections: CustomSection[];
  freeformMode?: boolean;
  freeformText?: string;
  settings: ResumeSettings;
}

export interface CvDocument {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  data: ResumeData;
}

export interface AtsScoreFeedback {
  category: 'contact' | 'summary' | 'experience' | 'skills' | 'education' | 'formatting';
  title: string;
  scoreImpact: number;
  isPassed: boolean;
  message: string;
  tip?: string;
}

export interface AtsScoreResult {
  score: number;
  totalChecks: number;
  passedChecks: number;
  feedbacks: AtsScoreFeedback[];
  metricsFound: number;
  actionVerbsFound: string[];
  weakWordsFound: string[];
  estimatedLength: 'optimal' | 'short' | 'too_long';
}

export interface KeywordMatchResult {
  matchedKeywords: string[];
  missingKeywords: string[];
  matchRate: number;
  totalJobKeywords: number;
}

export interface QualityIssue {
  id: string;
  severity: 'critical' | 'warning' | 'suggestion';
  section: string;
  message: string;
  actionTip?: string;
}
