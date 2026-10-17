import React, { useState } from 'react';
import { ShieldCheck, HardDrive, AlertTriangle, FileDown, Trash2, ArrowLeft, Check, Lock } from 'lucide-react';
import { deleteAllApplicationData } from '../../utils/storage';

interface PrivacyPageProps {
  onBackToBuilder: () => void;
  onDataPurged: () => void;
}

export const PrivacyPage: React.FC<PrivacyPageProps> = ({ onBackToBuilder, onDataPurged }) => {
  const [showConfirmPurge, setShowConfirmPurge] = useState(false);
  const [purgedSuccess, setPurgedSuccess] = useState(false);

  const handlePurge = () => {
    deleteAllApplicationData();
    setPurgedSuccess(true);
    setTimeout(() => {
      onDataPurged();
    }, 1200);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8 text-slate-800">
      {/* Back button */}
      <div>
        <button
          onClick={onBackToBuilder}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-sm hover:border-slate-300 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to CV Builder</span>
        </button>
      </div>

      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center border border-blue-100">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Smart CV Builder</span>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Privacy Policy & Storage Architecture</h1>
          </div>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed max-w-2xl">
          At Smart CV Builder, we believe your personal career history, contact details, and qualifications belong solely to you. Here is a clear, transparent explanation of how your data is handled.
        </p>
      </div>

      {/* Core Principles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-2">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
            <HardDrive className="w-4 h-4 text-blue-600" />
            <span>1. Local Browser Storage (localStorage)</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            All the information you type into Smart CV Builder (such as your name, job history, education, skills, and projects) is saved directly in your web browser’s local storage on your device. We do not store or transmit your CV records to a remote database.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-2">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>2. No Accounts or Passwords Required</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            You do not need to create an account, log in with Google, or provide an email to use the tool. Because there are no user accounts, there are no credentials stored on any server.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-2">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
            <FileDown className="w-4 h-4 text-indigo-600" />
            <span>3. Client-Side PDF Generation</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            When you click "Download ATS PDF", the document layout is generated right inside your browser window using native vector print styling. Your CV is not sent to an external rendering farm or third-party PDF service.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-2">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>4. Limitations of Browser Storage</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Because data lives exclusively on your current device and browser:
            clearing your browser history or site data will remove your local draft; private/incognito windows will not persist data once closed; and data does not automatically sync across different devices or phones.
          </p>
        </div>
      </div>

      {/* Backup Advice Card */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6 space-y-3">
        <h3 className="text-sm font-bold text-blue-950 flex items-center gap-2">
          <FileDown className="w-4 h-4 text-blue-700" />
          <span>Recommended Practice: Export JSON Backups Regularly</span>
        </h3>
        <p className="text-xs text-blue-900/80 leading-relaxed">
          We encourage users to use the "Backup / Restore" option in the workspace navbar. This downloads a `.json` file to your computer containing all your resume sections, which you can restore at any point in time on any browser.
        </p>
      </div>

      {/* Data Management Section: Purge / Delete Data */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-sm space-y-4">
        <div>
          <h3 className="text-base font-bold text-slate-900">Manage Stored Local Data</h3>
          <p className="text-xs text-slate-600 mt-1">
            You can erase all Smart CV Builder data stored in this browser at any time. This only cleans keys created by Smart CV Builder (`smart_cv_*`), leaving unrelated websites untouched.
          </p>
        </div>

        {purgedSuccess ? (
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>All local Smart CV Builder records have been successfully erased. Reloading fresh state...</span>
          </div>
        ) : !showConfirmPurge ? (
          <button
            type="button"
            onClick={() => setShowConfirmPurge(true)}
            className="inline-flex items-center gap-2 text-xs font-semibold text-rose-700 hover:text-rose-800 bg-rose-50 hover:bg-rose-100 border border-rose-200 px-4 py-2.5 rounded-xl transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete All My Stored CV Data</span>
          </button>
        ) : (
          <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl space-y-3 max-w-lg">
            <div className="flex items-start gap-2.5 text-xs text-rose-900">
              <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
              <span>
                Are you sure you want to delete all locally stored CV drafts and preferences from this browser? This action cannot be undone unless you previously exported a JSON backup.
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePurge}
                className="px-3.5 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg shadow-sm transition-colors"
              >
                Yes, Delete Everything
              </button>
              <button
                type="button"
                onClick={() => setShowConfirmPurge(false)}
                className="px-3.5 py-2 bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 text-xs font-semibold rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
