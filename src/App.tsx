import { useState, useEffect, useMemo, useCallback } from 'react';
import confetti from 'canvas-confetti';
import type { CvDocument, ResumeData, TemplateType } from './types/cv';
import {
  getStoredDocuments,
  getActiveDocumentId,
  saveActiveDocument,
  createDocument,
  duplicateDocument,
  deleteDocument,
  hasAcknowledgedPrivacy,
  setPrivacyAcknowledged,
} from './utils/storage';
import { analyzeAtsScore } from './utils/atsAnalyzer';
import { runQualityCheck } from './utils/qualityChecker';
import { generatePlainTextResume, downloadPlainTextResume } from './utils/textExporter';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './components/Pages/HomePage';
import { TemplatesPage } from './components/Pages/TemplatesPage';
import { MyCvsDashboard } from './components/Pages/MyCvsDashboard';
import { PrivacyPage } from './components/Pages/PrivacyPage';

import { AtsScoreCard } from './components/AtsScoreCard';
import { EditorSidebar } from './components/Editor/EditorSidebar';
import { ResumeDocument } from './components/Preview/ResumeDocument';
import { PreviewControls } from './components/Preview/PreviewControls';

import { PrivacyModal } from './components/Modals/PrivacyModal';
import { ActionVerbsModal } from './components/Editor/ActionVerbsModal';
import { JobMatcherModal } from './components/Editor/JobMatcherModal';
import { ImportExportModal } from './components/Modals/ImportExportModal';
import { CVQualityChecker } from './components/CVQualityChecker';

import { Eye, Edit3 } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'builder' | 'templates' | 'my-cvs' | 'privacy'>('home');

  // Documents state
  const [documents, setDocuments] = useState<CvDocument[]>(getStoredDocuments);
  const [activeId, setActiveId] = useState<string>(getActiveDocumentId);

  // Active document
  const activeDocument = useMemo(() => {
    return documents.find((d) => d.id === activeId) || documents[0];
  }, [documents, activeId]);

  // Saving state
  const [saveStatusText, setSaveStatusText] = useState('Saved in this browser');

  // Preview & Editor zoom / mobile tabs
  const [scale, setScale] = useState<number>(1);
  const [mobileTab, setMobileTab] = useState<'editor' | 'preview'>('editor');
  const [copiedTxt, setCopiedTxt] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  // Privacy notice modal state (first-visit trigger)
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isFirstVisitNotice, setIsFirstVisitNotice] = useState(false);

  // Other modals
  const [isVerbsModalOpen, setIsVerbsModalOpen] = useState(false);
  const [isJobMatcherOpen, setIsJobMatcherOpen] = useState(false);
  const [isBackupOpen, setIsBackupOpen] = useState(false);
  const [isQualityAuditOpen, setIsQualityAuditOpen] = useState(false);

  // Check privacy acknowledgment on initial mount
  useEffect(() => {
    if (!hasAcknowledgedPrivacy()) {
      setIsPrivacyModalOpen(true);
      setIsFirstVisitNotice(true);
    }
  }, []);

  const handleAcknowledgePrivacy = () => {
    setPrivacyAcknowledged(true);
    setIsPrivacyModalOpen(false);
  };

  const handleLearnMorePrivacy = () => {
    setPrivacyAcknowledged(true);
    setIsPrivacyModalOpen(false);
    setCurrentView('privacy');
  };

  // Real-time ATS & Quality checks
  const atsAnalysis = useMemo(() => {
    if (!activeDocument) return null;
    return analyzeAtsScore(activeDocument.data);
  }, [activeDocument]);

  const qualityIssues = useMemo(() => {
    if (!activeDocument) return [];
    return runQualityCheck(activeDocument.data);
  }, [activeDocument]);

  // Update active document data
  const handleUpdateResumeData = useCallback(
    (newData: ResumeData) => {
      if (!activeDocument) return;
      const updatedDoc: CvDocument = {
        ...activeDocument,
        data: newData,
        updatedAt: new Date().toISOString(),
      };

      setSaveStatusText('Saving...');
      const ok = saveActiveDocument(updatedDoc);

      setDocuments((prev) =>
        prev.map((d) => (d.id === updatedDoc.id ? updatedDoc : d))
      );

      setTimeout(() => {
        setSaveStatusText(ok ? 'Saved in this browser' : 'Unable to save');
      }, 400);
    },
    [activeDocument]
  );

  // Celebration confetti when ATS score hits 90+
  const [celebrated90, setCelebrated90] = useState(false);
  useEffect(() => {
    if (atsAnalysis && atsAnalysis.score >= 90 && !celebrated90) {
      setCelebrated90(true);
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
      });
    }
  }, [atsAnalysis, celebrated90]);

  // Document Operations
  const handleCreateDocument = (title: string, template: TemplateType) => {
    const newDoc = createDocument(title, template);
    setDocuments(getStoredDocuments());
    setActiveId(newDoc.id);
    setCurrentView('builder');
  };

  const handleDuplicateDocument = (id: string) => {
    const dup = duplicateDocument(id);
    if (dup) {
      setDocuments(getStoredDocuments());
      setActiveId(dup.id);
    }
  };

  const handleDeleteDocument = (id: string) => {
    deleteDocument(id);
    const updated = getStoredDocuments();
    setDocuments(updated);
    setActiveId(getActiveDocumentId());
  };

  const handleRenameDocument = (id: string, newTitle: string) => {
    const doc = documents.find((d) => d.id === id);
    if (doc) {
      const updated = { ...doc, title: newTitle, updatedAt: new Date().toISOString() };
      saveActiveDocument(updated);
      setDocuments(getStoredDocuments());
    }
  };

  const handleOpenDocument = (id: string) => {
    setActiveId(id);
    setCurrentView('builder');
  };

  // PDF Export
  const handlePrintPdf = () => {
    setIsGeneratingPdf(true);
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.7 },
    });
    setTimeout(() => {
      window.print();
      setIsGeneratingPdf(false);
    }, 250);
  };

  // Plain Text Download & Copy
  const handleDownloadTxt = () => {
    if (!activeDocument) return;
    const name = activeDocument.data.personalDetails.fullName || activeDocument.title || 'Resume';
    downloadPlainTextResume(activeDocument.data, `${name.replace(/\s+/g, '_')}_CV.txt`);
  };

  const handleCopyTxt = () => {
    if (!activeDocument) return;
    const txt = generatePlainTextResume(activeDocument.data);
    navigator.clipboard.writeText(txt);
    setCopiedTxt(true);
    setTimeout(() => setCopiedTxt(false), 2000);
  };

  // 1-Click skill insertion from Job Matcher
  const handleAddSkillFromMatcher = (newSkill: string) => {
    if (!activeDocument) return;
    const categories = [...activeDocument.data.skillCategories];
    if (categories.length === 0) {
      categories.push({
        id: `skills-${Date.now()}`,
        categoryName: 'Technical Skills',
        skills: [newSkill],
      });
    } else {
      if (!categories[0].skills.includes(newSkill)) {
        categories[0] = {
          ...categories[0],
          skills: [...categories[0].skills, newSkill],
        };
      }
    }
    handleUpdateResumeData({
      ...activeDocument.data,
      skillCategories: categories,
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Top Navbar */}
      <Navbar
        currentView={currentView}
        onNavigate={setCurrentView}
        saveStatusText={saveStatusText}
        onPrintPdf={currentView === 'builder' ? handlePrintPdf : undefined}
      />

      {/* Main View Router */}
      <div className="flex-1 flex flex-col">
        {currentView === 'home' && (
          <HomePage
            onCreateCv={() => setCurrentView('builder')}
            onSelectTemplate={(template) => {
              if (activeDocument) {
                handleUpdateResumeData({
                  ...activeDocument.data,
                  settings: { ...activeDocument.data.settings, template },
                });
              }
              setCurrentView('builder');
            }}
            onOpenPrivacy={() => setCurrentView('privacy')}
          />
        )}

        {currentView === 'templates' && (
          <TemplatesPage
            currentTemplate={activeDocument?.data.settings.template || 'classic'}
            onSelectTemplate={(template) => {
              if (activeDocument) {
                handleUpdateResumeData({
                  ...activeDocument.data,
                  settings: { ...activeDocument.data.settings, template },
                });
              }
              setCurrentView('builder');
            }}
          />
        )}

        {currentView === 'my-cvs' && (
          <MyCvsDashboard
            documents={documents}
            activeId={activeId}
            onOpenDocument={handleOpenDocument}
            onCreateDocument={handleCreateDocument}
            onDuplicateDocument={handleDuplicateDocument}
            onDeleteDocument={handleDeleteDocument}
            onRenameDocument={handleRenameDocument}
          />
        )}

        {currentView === 'privacy' && (
          <PrivacyPage
            onBackToBuilder={() => setCurrentView('builder')}
            onDataPurged={() => {
              setDocuments(getStoredDocuments());
              setActiveId(getActiveDocumentId());
              setCurrentView('builder');
            }}
          />
        )}

        {currentView === 'builder' && activeDocument && atsAnalysis && (
          <div className="flex-1 flex flex-col">
            {/* Mobile View Switcher Tab */}
            <div className="no-print lg:hidden flex border-b border-slate-200 bg-white sticky top-[57px] z-30">
              <button
                onClick={() => setMobileTab('editor')}
                className={`flex-1 py-2.5 text-xs font-semibold flex items-center justify-center gap-1.5 border-b-2 ${
                  mobileTab === 'editor'
                    ? 'border-blue-600 text-blue-600 bg-blue-50/50'
                    : 'border-transparent text-slate-500'
                }`}
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Editor & Score ({atsAnalysis.score}%)</span>
              </button>
              <button
                onClick={() => setMobileTab('preview')}
                className={`flex-1 py-2.5 text-xs font-semibold flex items-center justify-center gap-1.5 border-b-2 ${
                  mobileTab === 'preview'
                    ? 'border-blue-600 text-blue-600 bg-blue-50/50'
                    : 'border-transparent text-slate-500'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Live Document Preview</span>
              </button>
            </div>

            {/* Main Builder Workspace */}
            <div className="flex-1 max-w-[1700px] w-full mx-auto p-3 sm:p-5 lg:p-6 flex flex-col lg:flex-row gap-6">
              {/* Left Column: ATS Score & Editor Forms */}
              <section
                className={`no-print lg:w-[48%] xl:w-[45%] flex flex-col gap-4 ${
                  mobileTab === 'preview' ? 'hidden lg:flex' : 'flex'
                }`}
              >
                <AtsScoreCard
                  analysis={atsAnalysis}
                  onOpenJobMatcher={() => setIsJobMatcherOpen(true)}
                  onOpenActionVerbs={() => setIsVerbsModalOpen(true)}
                  onOpenQualityAudit={() => setIsQualityAuditOpen(true)}
                />

                <div className="flex-1">
                  <EditorSidebar
                    data={activeDocument.data}
                    onChange={handleUpdateResumeData}
                    onOpenActionVerbs={() => setIsVerbsModalOpen(true)}
                  />
                </div>
              </section>

              {/* Right Column: Live Document Preview */}
              <section
                className={`lg:w-[52%] xl:w-[55%] flex flex-col ${
                  mobileTab === 'editor' ? 'hidden lg:flex' : 'flex'
                }`}
              >
                <PreviewControls
                  settings={activeDocument.data.settings}
                  onUpdateSettings={(newSettings) =>
                    handleUpdateResumeData({
                      ...activeDocument.data,
                      settings: { ...activeDocument.data.settings, ...newSettings },
                    })
                  }
                  scale={scale}
                  onScaleChange={setScale}
                  onPrintPdf={handlePrintPdf}
                  onDownloadTxt={handleDownloadTxt}
                  onCopyTxt={handleCopyTxt}
                  copied={copiedTxt}
                  isGeneratingPdf={isGeneratingPdf}
                />

                {/* Canvas */}
                <div className="flex-1 overflow-auto bg-slate-200/60 border border-slate-300/80 rounded-2xl p-4 sm:p-8 flex justify-center items-start shadow-inner min-h-[700px]">
                  <ResumeDocument data={activeDocument.data} scale={scale} />
                </div>
              </section>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer
        onNavigate={setCurrentView}
        onOpenPrivacyNotice={() => {
          setIsFirstVisitNotice(false);
          setIsPrivacyModalOpen(true);
        }}
      />

      {/* First-Visit Privacy Notice Modal */}
      <PrivacyModal
        isOpen={isPrivacyModalOpen}
        onClose={handleAcknowledgePrivacy}
        onLearnMore={handleLearnMorePrivacy}
        isFirstVisit={isFirstVisitNotice}
      />

      {/* Action Verbs Modal */}
      <ActionVerbsModal
        isOpen={isVerbsModalOpen}
        onClose={() => setIsVerbsModalOpen(false)}
      />

      {/* Job Description Keyword Matcher Modal */}
      {activeDocument && (
        <JobMatcherModal
          isOpen={isJobMatcherOpen}
          onClose={() => setIsJobMatcherOpen(false)}
          resume={activeDocument.data}
          onAddSkill={handleAddSkillFromMatcher}
        />
      )}

      {/* Backup & Restore JSON Modal */}
      {activeDocument && (
        <ImportExportModal
          isOpen={isBackupOpen}
          onClose={() => setIsBackupOpen(false)}
          document={activeDocument}
          onImport={(importedDoc) => {
            saveActiveDocument(importedDoc);
            setDocuments(getStoredDocuments());
            setActiveId(importedDoc.id);
          }}
        />
      )}

      {/* Quality Checker Audit Modal */}
      <CVQualityChecker
        issues={qualityIssues}
        isOpen={isQualityAuditOpen}
        onClose={() => setIsQualityAuditOpen(false)}
      />
    </div>
  );
}
