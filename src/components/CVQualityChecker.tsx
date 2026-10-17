import React from 'react';
import type { QualityIssue } from '../types/cv';
import {
  ShieldAlert,
  AlertTriangle,
  AlertCircle,
  Lightbulb,
  CheckCircle2,
  X,
} from 'lucide-react';

interface CVQualityCheckerProps {
  issues: QualityIssue[];
  isOpen: boolean;
  onClose: () => void;
}

export const CVQualityChecker: React.FC<CVQualityCheckerProps> = ({
  issues,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const criticalIssues = issues.filter((i) => i.severity === 'critical');
  const warningIssues = issues.filter((i) => i.severity === 'warning');
  const suggestions = issues.filter((i) => i.severity === 'suggestion');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-xl w-full max-h-[85vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-50 text-blue-700 rounded-xl border border-blue-100">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">CV Quality & ATS Audit</h3>
              <p className="text-xs text-slate-500">
                Rule-based checks to ensure your resume meets standard recruiter criteria
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Score Summary Banner */}
        <div className="px-5 py-3 bg-slate-50 border-b border-slate-100 flex items-center justify-around text-xs">
          <div className="flex items-center gap-1.5 text-rose-700 font-semibold">
            <AlertCircle className="w-4 h-4 text-rose-600" />
            <span>{criticalIssues.length} Critical</span>
          </div>
          <div className="flex items-center gap-1.5 text-amber-700 font-semibold">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>{warningIssues.length} Warnings</span>
          </div>
          <div className="flex items-center gap-1.5 text-blue-700 font-semibold">
            <Lightbulb className="w-4 h-4 text-blue-600" />
            <span>{suggestions.length} Suggestions</span>
          </div>
        </div>

        {/* Issues List */}
        <div className="p-5 overflow-y-auto space-y-3 flex-1">
          {issues.length === 0 ? (
            <div className="p-6 text-center space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
              <h4 className="text-sm font-bold text-slate-900">Exceptional Quality!</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                No major issues found. Your CV includes clean contact details, strong active bullets, and structured sections.
              </p>
            </div>
          ) : (
            issues.map((issue) => (
              <div
                key={issue.id}
                className={`p-3.5 rounded-xl border text-xs space-y-1 ${
                  issue.severity === 'critical'
                    ? 'bg-rose-50/70 border-rose-200 text-rose-950'
                    : issue.severity === 'warning'
                    ? 'bg-amber-50/70 border-amber-200 text-amber-950'
                    : 'bg-blue-50/70 border-blue-200 text-blue-950'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[11px] uppercase tracking-wider opacity-80">
                    {issue.section}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      issue.severity === 'critical'
                        ? 'bg-rose-100 text-rose-700'
                        : issue.severity === 'warning'
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}
                  >
                    {issue.severity.toUpperCase()}
                  </span>
                </div>
                <p className="font-medium">{issue.message}</p>
                {issue.actionTip && (
                  <p className="text-[11px] opacity-90 pt-0.5">
                    <strong>Tip:</strong> {issue.actionTip}
                  </p>
                )}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 text-center text-[11px] text-slate-400">
          Note: ATS scanning algorithms vary by company and software provider. These checks follow industry best practices.
        </div>
      </div>
    </div>
  );
};
