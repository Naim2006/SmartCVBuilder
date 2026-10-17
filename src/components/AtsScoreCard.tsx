import React, { useState } from 'react';
import type { AtsScoreResult } from '../types/cv';
import {
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Zap,
  TrendingUp,
} from 'lucide-react';

interface AtsScoreCardProps {
  analysis: AtsScoreResult;
  onOpenJobMatcher: () => void;
  onOpenActionVerbs: () => void;
  onOpenQualityAudit?: () => void;
}

export const AtsScoreCard: React.FC<AtsScoreCardProps> = ({
  analysis,
  onOpenJobMatcher,
  onOpenActionVerbs,
  onOpenQualityAudit,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { score, feedbacks, metricsFound, actionVerbsFound, weakWordsFound } = analysis;

  const getScoreBadge = (val: number) => {
    if (val >= 85) return { label: 'High ATS Pass Rate', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
    if (val >= 65) return { label: 'Moderate Pass Rate', color: 'bg-amber-50 text-amber-700 border-amber-200' };
    return { label: 'Needs Optimization', color: 'bg-rose-50 text-rose-700 border-rose-200' };
  };

  const badge = getScoreBadge(score);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs transition-all">
      {/* Top summary row */}
      <div className="flex items-center justify-between gap-3 flex-wrap sm:flex-nowrap">
        <div className="flex items-center gap-3">
          <div
            className={`w-13 h-13 rounded-2xl flex flex-col items-center justify-center font-bold border-2 ${
              score >= 85
                ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                : score >= 65
                ? 'bg-amber-50 text-amber-700 border-amber-300'
                : 'bg-rose-50 text-rose-700 border-rose-300'
            }`}
          >
            <span className="text-xl leading-none">{score}</span>
            <span className="text-[9px] uppercase font-mono opacity-80">/ 100</span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>ATS Readiness Meter</span>
              </h3>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${badge.color}`}>
                {badge.label}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              {score >= 85
                ? 'Optimal keyword balance and machine-readable formatting!'
                : `${feedbacks.length} suggested improvements to bypass ATS filtering`}
            </p>
          </div>
        </div>

        {/* Shortcuts */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          {onOpenQualityAudit && (
            <button
              onClick={onOpenQualityAudit}
              className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
              title="Open detailed quality audit"
            >
              <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
              <span className="hidden sm:inline">Quality Audit</span>
            </button>
          )}

          <button
            onClick={onOpenJobMatcher}
            className="flex items-center gap-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
            title="Scan against job posting keywords"
          >
            <Zap className="w-3.5 h-3.5 text-blue-600" />
            <span className="hidden sm:inline">Job Matcher</span>
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
            title={isOpen ? 'Collapse checklist' : 'Expand checklist'}
          >
            {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-100 h-2 rounded-full mt-3 overflow-hidden">
        <div
          className={`h-full transition-all duration-500 rounded-full ${
            score >= 85 ? 'bg-emerald-500' : score >= 65 ? 'bg-amber-500' : 'bg-rose-500'
          }`}
          style={{ width: `${score}%` }}
        />
      </div>

      {/* Quick stats pills */}
      <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-slate-100 text-center">
        <div className="bg-slate-50 p-2 rounded-xl">
          <div className="text-xs font-bold text-slate-800">{metricsFound}</div>
          <div className="text-[10px] text-slate-500">Quantifiable Metrics</div>
        </div>

        <div
          onClick={onOpenActionVerbs}
          className="bg-slate-50 p-2 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors"
          title="Click to view power action verbs"
        >
          <div className="text-xs font-bold text-emerald-700 flex items-center justify-center gap-1">
            <span>{actionVerbsFound.length}</span>
            <Sparkles className="w-3 h-3 text-emerald-600" />
          </div>
          <div className="text-[10px] text-slate-500">Power Verbs (Click)</div>
        </div>

        <div className="bg-slate-50 p-2 rounded-xl">
          <div className={`text-xs font-bold ${weakWordsFound.length > 0 ? 'text-rose-600' : 'text-slate-800'}`}>
            {weakWordsFound.length}
          </div>
          <div className="text-[10px] text-slate-500">Weak Words</div>
        </div>
      </div>

      {/* Collapsible recommendations */}
      {isOpen && (
        <div className="mt-3.5 pt-3 border-t border-slate-100 space-y-2 animate-fadeIn">
          {feedbacks.length === 0 ? (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-xs text-emerald-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>All standard ATS scoring benchmarks passed.</span>
            </div>
          ) : (
            feedbacks.map((fb, idx) => (
              <div
                key={idx}
                className="p-2.5 bg-slate-50 border border-slate-200/80 rounded-xl flex items-start gap-2.5 text-xs text-slate-700"
              >
                <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="font-semibold text-slate-900 flex items-center justify-between">
                    <span>{fb.title}</span>
                    <span className="text-[10px] text-amber-700 font-mono font-bold">{fb.scoreImpact} pts</span>
                  </div>
                  <p className="text-slate-600 mt-0.5 text-[11px] leading-relaxed">{fb.message}</p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
