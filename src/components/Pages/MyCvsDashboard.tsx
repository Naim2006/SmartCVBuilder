import React, { useState } from 'react';
import type { CvDocument, TemplateType } from '../../types/cv';
import {
  Plus,
  Copy,
  Trash2,
  Edit2,
  ExternalLink,
  Download,
  Calendar,
  AlertCircle,
  Check,
} from 'lucide-react';
import { exportDocumentAsJson } from '../../utils/storage';

interface MyCvsDashboardProps {
  documents: CvDocument[];
  activeId: string;
  onOpenDocument: (id: string) => void;
  onCreateDocument: (title: string, template: TemplateType) => void;
  onDuplicateDocument: (id: string) => void;
  onDeleteDocument: (id: string) => void;
  onRenameDocument: (id: string, newTitle: string) => void;
}

export const MyCvsDashboard: React.FC<MyCvsDashboardProps> = ({
  documents,
  activeId,
  onOpenDocument,
  onCreateDocument,
  onDuplicateDocument,
  onDeleteDocument,
  onRenameDocument,
}) => {
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [newTitle, setNewTitle] = useState('New Resume');
  const [newTemplate, setNewTemplate] = useState<TemplateType>('classic');

  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState('');

  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateDocument(newTitle.trim() || 'My Resume', newTemplate);
    setIsCreatingNew(false);
    setNewTitle('New Resume');
  };

  const handleStartRename = (doc: CvDocument) => {
    setRenamingId(doc.id);
    setRenameValue(doc.title);
  };

  const handleSaveRename = (id: string) => {
    if (renameValue.trim()) {
      onRenameDocument(id, renameValue.trim());
    }
    setRenamingId(null);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6 text-slate-800">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">My CV Documents</h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage, duplicate, and tailor multiple versions of your resume for different job positions. All saved locally.
          </p>
        </div>

        <button
          onClick={() => setIsCreatingNew(true)}
          className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-sm transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4 text-blue-400" />
          <span>Create New CV</span>
        </button>
      </div>

      {/* New CV Modal */}
      {isCreatingNew && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
          <form
            onSubmit={handleCreate}
            className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4"
          >
            <h3 className="text-base font-bold text-slate-900">Create New CV Document</h3>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Document Title</label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. Frontend Developer CV, Marketing Lead CV"
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                autoFocus
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Starting Template</label>
              <select
                value={newTemplate}
                onChange={(e) => setNewTemplate(e.target.value as TemplateType)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="classic">Classic ATS (Single-column Harvard)</option>
                <option value="modern">Modern Professional</option>
                <option value="compact">Compact ATS</option>
                <option value="executive">Executive</option>
                <option value="developer">Developer CV</option>
              </select>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsCreatingNew(false)}
                className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
              >
                Create Document
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {documents.map((doc) => {
          const isActive = doc.id === activeId;
          const isRenaming = renamingId === doc.id;
          const isDeleting = deletingId === doc.id;
          const details = doc.data.personalDetails;
          const experiencesCount = doc.data.experience.length;
          const skillsCount = doc.data.skillCategories.reduce((acc, c) => acc + c.skills.length, 0);

          return (
            <div
              key={doc.id}
              className={`bg-white border rounded-2xl p-5 shadow-sm transition-all flex flex-col justify-between ${
                isActive ? 'border-blue-500 ring-2 ring-blue-500/10' : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div>
                {/* Header with Title and Active Badge */}
                <div className="flex items-start justify-between gap-2 pb-3 border-b border-slate-100">
                  <div className="flex-1">
                    {isRenaming ? (
                      <div className="flex items-center gap-1.5">
                        <input
                          type="text"
                          value={renameValue}
                          onChange={(e) => setRenameValue(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleSaveRename(doc.id)}
                          className="w-full bg-slate-50 border border-slate-300 text-xs px-2 py-1 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                          autoFocus
                        />
                        <button
                          onClick={() => handleSaveRename(doc.id)}
                          className="p-1 text-emerald-600 hover:text-emerald-700"
                          title="Save title"
                        >
                          <Check className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-sm text-slate-900 truncate" title={doc.title}>
                          {doc.title}
                        </h3>
                        <button
                          onClick={() => handleStartRename(doc)}
                          className="text-slate-400 hover:text-slate-600 p-0.5"
                          title="Rename document"
                        >
                          <Edit2 className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      {details.fullName ? `${details.fullName} • ` : ''}
                      {doc.data.settings.template.toUpperCase()}
                    </div>
                  </div>

                  {isActive && (
                    <span className="text-[10px] bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded-full border border-blue-200">
                      Active
                    </span>
                  )}
                </div>

                {/* Metadata stats */}
                <div className="grid grid-cols-2 gap-2 my-3 text-xs text-slate-600">
                  <div className="p-2 bg-slate-50 rounded-lg">
                    <span className="text-[10px] text-slate-400 block">Positions</span>
                    <span className="font-semibold text-slate-800">{experiencesCount} Listed</span>
                  </div>
                  <div className="p-2 bg-slate-50 rounded-lg">
                    <span className="text-[10px] text-slate-400 block">Skills</span>
                    <span className="font-semibold text-slate-800">{skillsCount} Keywords</span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                  <Calendar className="w-3 h-3" />
                  <span>
                    Updated {new Date(doc.updatedAt || doc.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 border-t border-slate-100 mt-3 space-y-2">
                {isDeleting ? (
                  <div className="p-2 bg-rose-50 border border-rose-200 rounded-lg space-y-1.5 text-xs text-rose-800">
                    <div className="flex items-center gap-1 font-semibold">
                      <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
                      <span>Confirm deletion?</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          onDeleteDocument(doc.id);
                          setDeletingId(null);
                        }}
                        className="px-2.5 py-1 bg-rose-600 text-white font-bold rounded text-[11px] hover:bg-rose-700"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => setDeletingId(null)}
                        className="px-2.5 py-1 bg-white border border-slate-200 rounded text-[11px] text-slate-700"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between gap-1">
                    <button
                      onClick={() => onOpenDocument(doc.id)}
                      className="flex-1 py-1.5 px-3 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
                      <span>{isActive ? 'Continue Editing' : 'Open in Editor'}</span>
                    </button>

                    <button
                      onClick={() => onDuplicateDocument(doc.id)}
                      className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200"
                      title="Duplicate this CV"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => exportDocumentAsJson(doc)}
                      className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200"
                      title="Export JSON backup for this CV"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => setDeletingId(doc.id)}
                      className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors border border-slate-200"
                      title="Delete this CV"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
