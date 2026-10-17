import React, { useRef, useState } from 'react';
import type { CvDocument } from '../../types/cv';
import { exportDocumentAsJson, validateAndParseImport } from '../../utils/storage';
import { X, Download, Upload, Check, AlertCircle, FileCode } from 'lucide-react';

interface ImportExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  document: CvDocument;
  onImport: (importedDoc: CvDocument) => void;
}

export const ImportExportModal: React.FC<ImportExportModalProps> = ({
  isOpen,
  onClose,
  document,
  onImport,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [pendingDoc, setPendingDoc] = useState<CvDocument | null>(null);

  if (!isOpen) return null;

  const handleExport = () => {
    exportDocumentAsJson(document);
    setSuccessMsg('Resume JSON successfully exported!');
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMsg(null);
    setSuccessMsg(null);
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const validDoc = validateAndParseImport(text);
        setPendingDoc(validDoc);
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Invalid backup file format';
        setErrorMsg(`Failed to import JSON: ${msg}`);
      }
    };
    reader.readAsText(file);
  };

  const handleConfirmImport = () => {
    if (pendingDoc) {
      onImport(pendingDoc);
      setSuccessMsg('CV draft successfully imported and active!');
      setPendingDoc(null);
      setTimeout(() => {
        onClose();
      }, 1200);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 text-slate-800">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <FileCode className="w-5 h-5 text-blue-600" />
            <h3 className="text-base font-bold text-slate-900">Backup & Restore</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Notifications */}
        {errorMsg && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}
        {successMsg && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Pending Import Confirmation */}
        {pendingDoc ? (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl space-y-3">
            <h4 className="text-xs font-bold text-blue-950">Confirm Import</h4>
            <p className="text-xs text-blue-900/80 leading-relaxed">
              Found valid resume data: <strong>"{pendingDoc.title}"</strong> ({pendingDoc.data.personalDetails.fullName || 'Unnamed'}).
              Would you like to import this as an active CV?
            </p>
            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={handleConfirmImport}
                className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg transition-colors"
              >
                Confirm Import
              </button>
              <button
                type="button"
                onClick={() => setPendingDoc(null)}
                className="px-3 py-2 bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 text-xs font-semibold rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {/* Export Card */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
              <h4 className="text-xs font-bold text-slate-900">Export JSON Backup</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Download your current CV data to a `.json` file on your device. You can restore this backup anytime on any computer.
              </p>
              <button
                onClick={handleExport}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-blue-400" />
                <span>Export JSON File</span>
              </button>
            </div>

            {/* Import Card */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
              <h4 className="text-xs font-bold text-slate-900">Import Resume File</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Upload a previously saved Smart CV Builder JSON file to restore your information.
              </p>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".json"
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors border border-slate-300 cursor-pointer shadow-2xs"
              >
                <Upload className="w-3.5 h-3.5 text-slate-500" />
                <span>Choose JSON Backup</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
