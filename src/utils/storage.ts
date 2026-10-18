import type { CvDocument, ResumeData, TemplateType } from '../types/cv';
import { SAMPLE_SOFTWARE_ENGINEER, createNewCvDocument, DEFAULT_SECTION_ORDER, DEFAULT_SECTION_VISIBILITY } from '../data/sampleResumes';

const STORAGE_KEY_DOCS = 'smart_cv_documents_v1';
const STORAGE_KEY_ACTIVE = 'smart_cv_active_id';
const STORAGE_KEY_PRIVACY = 'smart_cv_privacy_acknowledged';

// Ensure backward compatibility and safe fallback defaults
export function sanitizeResumeData(data: Partial<ResumeData>): ResumeData {
  return {
    personalDetails: {
      fullName: data.personalDetails?.fullName || '',
      jobTitle: data.personalDetails?.jobTitle || '',
      email: data.personalDetails?.email || '',
      phone: data.personalDetails?.phone || '',
      city: data.personalDetails?.city || '',
      country: data.personalDetails?.country || '',
      location: data.personalDetails?.location || (data.personalDetails?.city ? `${data.personalDetails.city}, ${data.personalDetails.country || ''}` : ''),
      linkedin: data.personalDetails?.linkedin || '',
      github: data.personalDetails?.github || '',
      website: data.personalDetails?.website || '',
      otherUrl: data.personalDetails?.otherUrl || '',
      summary: data.personalDetails?.summary || '',
      photoUrl: data.personalDetails?.photoUrl || '',
      showPhoto: Boolean(data.personalDetails?.showPhoto),
      fullAddress: data.personalDetails?.fullAddress || '',
      nationality: data.personalDetails?.nationality || '',
      workAuthorization: data.personalDetails?.workAuthorization || '',
    },
    experience: Array.isArray(data.experience) ? data.experience : [],
    education: Array.isArray(data.education) ? data.education : [],
    skillCategories: Array.isArray(data.skillCategories) ? data.skillCategories : [],
    projects: Array.isArray(data.projects) ? data.projects : [],
    certifications: Array.isArray(data.certifications) ? data.certifications : [],
    volunteer: Array.isArray(data.volunteer) ? data.volunteer : [],
    awards: Array.isArray(data.awards) ? data.awards : [],
    courses: Array.isArray(data.courses) ? data.courses : [],
    languages: Array.isArray(data.languages) ? data.languages : [],
    publications: Array.isArray(data.publications) ? data.publications : [],
    customSections: Array.isArray(data.customSections) ? data.customSections : [],
    settings: {
      template: data.settings?.template || 'classic',
      font: data.settings?.font || 'inter',
      fontSize: data.settings?.fontSize || 'normal',
      spacing: data.settings?.spacing || 'normal',
      primaryColor: data.settings?.primaryColor || '#0f172a',
      paperSize: data.settings?.paperSize || 'a4',
      sectionOrder: Array.isArray(data.settings?.sectionOrder) ? data.settings.sectionOrder : [...DEFAULT_SECTION_ORDER],
      sectionVisibility: data.settings?.sectionVisibility || { ...DEFAULT_SECTION_VISIBILITY },
      showIcons: data.settings?.showIcons ?? true,
    },
  };
}

export function getStoredDocuments(): CvDocument[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_DOCS);
    if (!raw) {
      // First visit initialization with clean sample
      const initialDoc: CvDocument = {
        id: 'cv-sample-1',
        title: 'Full-Stack Developer Resume',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        data: SAMPLE_SOFTWARE_ENGINEER,
      };
      saveDocuments([initialDoc]);
      setActiveDocumentId(initialDoc.id);
      return [initialDoc];
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      const initialDoc: CvDocument = {
        id: 'cv-sample-1',
        title: 'Full-Stack Developer Resume',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        data: SAMPLE_SOFTWARE_ENGINEER,
      };
      saveDocuments([initialDoc]);
      setActiveDocumentId(initialDoc.id);
      return [initialDoc];
    }
    return parsed.map((doc) => {
      // If user has the uncalibrated initial sample with 4+ bullets, migrate to calibrated 1-page sample
      if (doc.id === 'cv-sample-1' && (doc.data?.experience?.[0]?.bullets?.length || 0) >= 4) {
        return {
          ...doc,
          data: sanitizeResumeData(SAMPLE_SOFTWARE_ENGINEER),
        };
      }
      return {
        ...doc,
        data: sanitizeResumeData(doc.data),
      };
    });
  } catch (err) {
    console.error('Failed to read from localStorage:', err);
    return [];
  }
}

export function saveDocuments(docs: CvDocument[]): boolean {
  try {
    localStorage.setItem(STORAGE_KEY_DOCS, JSON.stringify(docs));
    return true;
  } catch (err) {
    console.error('Failed to save to localStorage:', err);
    return false;
  }
}

export function getActiveDocumentId(): string {
  try {
    const active = localStorage.getItem(STORAGE_KEY_ACTIVE);
    if (active) return active;
    const docs = getStoredDocuments();
    return docs[0]?.id || 'cv-sample-1';
  } catch {
    return 'cv-sample-1';
  }
}

export function setActiveDocumentId(id: string): void {
  try {
    localStorage.setItem(STORAGE_KEY_ACTIVE, id);
  } catch (err) {
    console.error('Failed to set active CV ID:', err);
  }
}

export function saveActiveDocument(updatedDoc: CvDocument): boolean {
  try {
    const docs = getStoredDocuments();
    const index = docs.findIndex((d) => d.id === updatedDoc.id);
    const updatedWithTimestamp = {
      ...updatedDoc,
      updatedAt: new Date().toISOString(),
      data: sanitizeResumeData(updatedDoc.data),
    };

    let nextDocs: CvDocument[];
    if (index >= 0) {
      nextDocs = [...docs];
      nextDocs[index] = updatedWithTimestamp;
    } else {
      nextDocs = [...docs, updatedWithTimestamp];
    }

    const ok = saveDocuments(nextDocs);
    if (ok) {
      setActiveDocumentId(updatedDoc.id);
    }
    return ok;
  } catch (err) {
    console.error('Failed to save active document:', err);
    return false;
  }
}

export function createDocument(title = 'New Resume', template: TemplateType = 'classic'): CvDocument {
  const newDoc = createNewCvDocument(title, template);
  const docs = getStoredDocuments();
  saveDocuments([newDoc, ...docs]);
  setActiveDocumentId(newDoc.id);
  return newDoc;
}

export function duplicateDocument(id: string): CvDocument | null {
  const docs = getStoredDocuments();
  const source = docs.find((d) => d.id === id);
  if (!source) return null;

  const duplicate: CvDocument = {
    id: `cv-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    title: `${source.title} (Copy)`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    data: JSON.parse(JSON.stringify(source.data)),
  };

  saveDocuments([duplicate, ...docs]);
  setActiveDocumentId(duplicate.id);
  return duplicate;
}

export function deleteDocument(id: string): boolean {
  const docs = getStoredDocuments();
  if (docs.length <= 1) {
    // If deleting the only document, replace with a fresh empty one
    const fresh = createNewCvDocument('My Resume');
    saveDocuments([fresh]);
    setActiveDocumentId(fresh.id);
    return true;
  }

  const filtered = docs.filter((d) => d.id !== id);
  const ok = saveDocuments(filtered);
  if (ok && getActiveDocumentId() === id) {
    setActiveDocumentId(filtered[0].id);
  }
  return ok;
}

export function deleteAllApplicationData(): void {
  try {
    localStorage.removeItem(STORAGE_KEY_DOCS);
    localStorage.removeItem(STORAGE_KEY_ACTIVE);
    localStorage.removeItem(STORAGE_KEY_PRIVACY);
  } catch (err) {
    console.error('Failed to clear application storage:', err);
  }
}

export function hasAcknowledgedPrivacy(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY_PRIVACY) === 'true';
  } catch {
    return false;
  }
}

export function setPrivacyAcknowledged(acknowledged = true): void {
  try {
    localStorage.setItem(STORAGE_KEY_PRIVACY, acknowledged ? 'true' : 'false');
  } catch (err) {
    console.error('Failed to save privacy acknowledgment:', err);
  }
}

// JSON Backup & Restore
export function exportDocumentAsJson(doc: CvDocument): void {
  const payload = {
    version: '1.0',
    exportedAt: new Date().toISOString(),
    document: doc,
  };
  const json = JSON.stringify(payload, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const sanitizedName = (doc.title || doc.data.personalDetails.fullName || 'smart_cv')
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, '_');
  a.href = url;
  a.download = `${sanitizedName}_backup.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function validateAndParseImport(jsonString: string): CvDocument {
  const parsed = JSON.parse(jsonString);
  const doc = parsed.document || parsed; // support both wrapped and direct formats
  if (!doc || typeof doc !== 'object') {
    throw new Error('Invalid format: root must be an object');
  }
  if (!doc.data || typeof doc.data !== 'object') {
    throw new Error('Invalid format: missing CV data payload');
  }

  const cleanData = sanitizeResumeData(doc.data);
  return {
    id: `cv-import-${Date.now()}`,
    title: String(doc.title || cleanData.personalDetails.fullName || 'Imported CV'),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    data: cleanData,
  };
}
