import React, { useState } from 'react';
import type { ResumeData, KeywordMatchResult } from '../../types/cv';
import { matchJobDescription } from '../../utils/atsAnalyzer';
import { X, Zap, CheckCircle2, AlertCircle, Plus, Sparkles } from 'lucide-react';

interface JobMatcherModalProps {
  isOpen: boolean;
  onClose: () => void;
  resume: ResumeData;
  onAddSkill: (skill: string) => void;
}

export const JobMatcherModal: React.FC<JobMatcherModalProps> = ({
  isOpen,
  onClose,
  resume,
  onAddSkill,
}) => {
  const [jobText, setJobText] = useState('');
  const [matchResult, setMatchResult] = useState<KeywordMatchResult | null>(null);

  if (!isOpen) return null;

  const handleAnalyze = () => {
    if (!jobText.trim()) return;
    const result = matchJobDescription(resume, jobText);
    setMatchResult(result);
  };

  const sampleJobPosting = `We are looking for a Senior Full Stack Software Engineer experienced with React, TypeScript, Node.js, and modern cloud architectures (AWS, Docker, Kubernetes).
Responsibilities:
- Build high-scale microservices with Go or Node.js.
- Optimize database queries in PostgreSQL and Redis cache layers.
- Implement GraphQL and REST APIs.
- Collaborate with agile product teams to deliver resilient CI/CD pipelines with GitHub Actions.
- Strong knowledge of unit testing (Jest) and system monitoring (Datadog).`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-50 text-blue-700 rounded-xl border border-blue-100">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Job Description Keyword Matcher</h3>
              <p className="text-xs text-slate-500">
                Compare your CV directly against a target job posting to uncover keyword gaps
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

        {/* Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1">
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Paste Job Description / Requirements:
              </label>
              <button
                type="button"
                onClick={() => setJobText(sampleJobPosting)}
                className="text-[11px] text-blue-600 hover:text-blue-700 underline font-medium cursor-pointer"
              >
                Insert Sample Job Posting
              </button>
            </div>
            <textarea
              rows={5}
              value={jobText}
              onChange={(e) => setJobText(e.target.value)}
              placeholder="Paste the full job posting requirements and description here..."
              className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 leading-relaxed resize-none"
            />
          </div>

          <button
            onClick={handleAnalyze}
            disabled={!jobText.trim()}
            className="w-full bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white font-semibold py-2.5 px-4 rounded-xl text-xs shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span>Analyze ATS Keyword Match</span>
          </button>

          {/* Results section */}
          {matchResult && (
            <div className="mt-4 pt-4 border-t border-slate-100 space-y-4 animate-fadeIn">
              {/* Match Score Display */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-slate-500 font-semibold uppercase">Keyword Match Rate</div>
                  <div className="text-2xl font-bold text-slate-900 flex items-baseline gap-1 mt-0.5">
                    <span>{matchResult.matchRate}%</span>
                    <span className="text-xs font-normal text-slate-500">
                      ({matchResult.matchedKeywords.length} of {matchResult.totalJobKeywords} keywords)
                    </span>
                  </div>
                </div>

                <div>
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full font-bold border ${
                      matchResult.matchRate >= 70
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : matchResult.matchRate >= 45
                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : 'bg-rose-50 text-rose-700 border-rose-200'
                    }`}
                  >
                    {matchResult.matchRate >= 70
                      ? 'Strong ATS Fit'
                      : matchResult.matchRate >= 45
                      ? 'Moderate Match'
                      : 'Missing Critical Keywords'}
                  </span>
                </div>
              </div>

              {/* Matched Keywords */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Matched Keywords ({matchResult.matchedKeywords.length})</span>
                </h4>
                {matchResult.matchedKeywords.length === 0 ? (
                  <p className="text-xs text-slate-400 italic">No matching keywords found.</p>
                ) : (
                  <div className="flex flex-wrap gap-1.5">
                    {matchResult.matchedKeywords.map((kw) => (
                      <span
                        key={kw}
                        className="px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-md text-xs font-mono font-medium"
                      >
                        ✓ {kw}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Missing Keywords */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  <span>Missing Keywords ({matchResult.missingKeywords.length}) — Click to Add</span>
                </h4>
                <p className="text-[11px] text-slate-500">
                  Click any keyword to automatically insert it into your Skills section.
                </p>
                {matchResult.missingKeywords.length === 0 ? (
                  <p className="text-xs text-emerald-600 font-semibold">All target keywords are present in your resume!</p>
                ) : (
                  <div className="flex flex-wrap gap-1.5">
                    {matchResult.missingKeywords.map((kw) => (
                      <button
                        key={kw}
                        onClick={() => {
                          onAddSkill(kw);
                          setMatchResult((prev) => {
                            if (!prev) return null;
                            return {
                              ...prev,
                              matchedKeywords: [...prev.matchedKeywords, kw],
                              missingKeywords: prev.missingKeywords.filter((k) => k !== kw),
                              matchRate: Math.round(
                                ((prev.matchedKeywords.length + 1) / prev.totalJobKeywords) * 100
                              ),
                            };
                          });
                        }}
                        className="px-2 py-0.5 bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-300 hover:border-blue-500 rounded-md text-xs font-mono transition-colors flex items-center gap-1 cursor-pointer"
                        title={`Click to add "${kw}" to skills`}
                      >
                        <Plus className="w-3 h-3 text-blue-600" />
                        <span>{kw}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
