import React, { useState } from 'react';
import { ACTION_VERBS_CATEGORIES, WEAK_VERBS } from '../../data/actionVerbs';
import { X, Search, Sparkles, Copy, Check, ArrowRight } from 'lucide-react';

interface ActionVerbsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectVerb?: (verb: string) => void;
}

export const ActionVerbsModal: React.FC<ActionVerbsModalProps> = ({
  isOpen,
  onClose,
  onSelectVerb,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedVerb, setCopiedVerb] = useState<string | null>(null);

  if (!isOpen) return null;

  const categories = ['All', ...ACTION_VERBS_CATEGORIES.map((c) => c.category)];

  const filteredCategories = ACTION_VERBS_CATEGORIES.map((cat) => {
    if (selectedCategory !== 'All' && cat.category !== selectedCategory) {
      return null;
    }
    const filteredVerbs = cat.verbs.filter((v) =>
      v.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return filteredVerbs.length > 0 ? { ...cat, verbs: filteredVerbs } : null;
  }).filter(Boolean) as typeof ACTION_VERBS_CATEGORIES;

  const handleCopy = (verb: string) => {
    navigator.clipboard.writeText(verb);
    setCopiedVerb(verb);
    setTimeout(() => setCopiedVerb(null), 1500);
    if (onSelectVerb) onSelectVerb(verb);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-100">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Power Action Verbs Library</h3>
              <p className="text-xs text-slate-500">
                Replace passive duties with active, high-impact accomplishment verbs
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

        {/* Search & Tabs */}
        <div className="p-4 border-b border-slate-100 space-y-3 bg-slate-50">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search power verbs (e.g. Architected, Accelerated, Spearheaded)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-2xs"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white'
                    : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-5 flex-1">
          {/* Weak words alert */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 space-y-2">
            <h4 className="text-xs font-bold text-amber-950 flex items-center gap-1.5">
              <span>⚠️ Common Weak Phrases to Replace:</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {WEAK_VERBS.slice(0, 4).map((w, idx) => (
                <div key={idx} className="flex items-center gap-1.5 bg-white p-2 rounded-lg border border-amber-100">
                  <span className="text-rose-600 line-through font-medium">"{w.weak}"</span>
                  <ArrowRight className="w-3 h-3 text-slate-400" />
                  <span className="text-emerald-700 font-bold">{w.suggested.slice(0, 2).join(', ')}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Verbs Grid */}
          {filteredCategories.map((cat) => (
            <div key={cat.category} className="space-y-2">
              <div className="flex items-baseline justify-between">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">{cat.category}</h4>
                <span className="text-[11px] text-slate-500">{cat.description}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {cat.verbs.map((verb) => {
                  const isCopied = copiedVerb === verb;
                  return (
                    <button
                      key={verb}
                      onClick={() => handleCopy(verb)}
                      className="px-2.5 py-1 bg-white hover:bg-slate-50 border border-slate-200 hover:border-blue-400 rounded-lg text-xs font-semibold text-slate-700 hover:text-slate-900 transition-all flex items-center gap-1 shadow-2xs group cursor-pointer"
                      title="Click to copy verb"
                    >
                      <span>{verb}</span>
                      {isCopied ? (
                        <Check className="w-3 h-3 text-emerald-600" />
                      ) : (
                        <Copy className="w-3 h-3 text-slate-400 group-hover:text-slate-600" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-3.5 border-t border-slate-100 text-center text-xs text-slate-500 bg-slate-50">
          Tip: Click any power verb to copy it to your clipboard
        </div>
      </div>
    </div>
  );
};
