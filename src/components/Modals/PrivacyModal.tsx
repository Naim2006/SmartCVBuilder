import React from 'react';
import { ShieldCheck, HardDrive, AlertTriangle, ArrowRight, X } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLearnMore: () => void;
  isFirstVisit?: boolean;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({
  isOpen,
  onClose,
  onLearnMore,
  isFirstVisit = false,
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn"
    >
      <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 sm:p-7 shadow-2xl space-y-5 text-slate-800 relative">
        {!isFirstVisit && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
            aria-label="Close privacy notice"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Icon & Title */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center border border-blue-100 flex-shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">
              Privacy First & Local Storage
            </span>
            <h2 id="privacy-modal-title" className="text-xl font-bold text-slate-900 tracking-tight">
              Your Privacy Matters
            </h2>
          </div>
        </div>

        {/* Main message */}
        <div className="space-y-3 text-sm text-slate-600 leading-relaxed">
          <p className="font-medium text-slate-700">
            Smart CV Builder does not upload or store your CV data on our servers. No login or signup is required. Your information is saved locally in your browser, so you can return and continue editing your CV using the same browser on this device.
          </p>

          <div className="p-3.5 bg-amber-50/80 border border-amber-200 rounded-xl flex items-start gap-2.5 text-xs text-amber-900">
            <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold block mb-0.5 text-amber-950">Important Storage Notice:</strong>
              <span>
                Your CV data may be lost if you clear your browser storage, use private browsing, or change devices or browsers. Download your CV regularly to keep a backup.
              </span>
            </div>
          </div>
        </div>

        {/* Key Points */}
        <div className="grid grid-cols-2 gap-2.5 text-xs">
          <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-lg flex items-center gap-2 text-slate-700">
            <HardDrive className="w-4 h-4 text-blue-600 flex-shrink-0" />
            <span>Saved in your browser</span>
          </div>
          <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-lg flex items-center gap-2 text-slate-700">
            <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>Zero server tracking</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:flex-1 py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors flex items-center justify-center gap-1.5"
          >
            <span>Got It, Let's Start</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => {
              onClose();
              onLearnMore();
            }}
            className="w-full sm:w-auto py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors"
          >
            Learn More About Privacy
          </button>
        </div>
      </div>
    </div>
  );
};
