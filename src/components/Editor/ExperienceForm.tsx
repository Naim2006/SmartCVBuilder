import React from 'react';
import type { ExperienceItem } from '../../types/cv';
import {
  Plus,
  Trash2,
  Briefcase,
  MapPin,
  Sparkles,
  AlertCircle,
  MoveUp,
  MoveDown,
} from 'lucide-react';
import { WEAK_VERBS } from '../../data/actionVerbs';

interface ExperienceFormProps {
  items: ExperienceItem[];
  onChange: (items: ExperienceItem[]) => void;
  onOpenActionVerbs: () => void;
}

export const ExperienceForm: React.FC<ExperienceFormProps> = ({
  items,
  onChange,
  onOpenActionVerbs,
}) => {
  const handleAddItem = () => {
    const newItem: ExperienceItem = {
      id: `exp-${Date.now()}`,
      company: '',
      role: '',
      employmentType: 'Full-time',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      bullets: [''],
    };
    onChange([...items, newItem]);
  };

  const handleRemoveItem = (id: string) => {
    onChange(items.filter((item) => item.id !== id));
  };

  const handleMoveUp = (index: number) => {
    if (index <= 0) return;
    const next = [...items];
    const temp = next[index - 1];
    next[index - 1] = next[index];
    next[index] = temp;
    onChange(next);
  };

  const handleMoveDown = (index: number) => {
    if (index >= items.length - 1) return;
    const next = [...items];
    const temp = next[index + 1];
    next[index + 1] = next[index];
    next[index] = temp;
    onChange(next);
  };

  const handleUpdateItem = (id: string, updatedFields: Partial<ExperienceItem>) => {
    onChange(
      items.map((item) => (item.id === id ? { ...item, ...updatedFields } : item))
    );
  };

  const handleAddBullet = (itemId: string) => {
    onChange(
      items.map((item) =>
        item.id === itemId ? { ...item, bullets: [...item.bullets, ''] } : item
      )
    );
  };

  const handleUpdateBullet = (itemId: string, bulletIndex: number, text: string) => {
    onChange(
      items.map((item) => {
        if (item.id !== itemId) return item;
        const newBullets = [...item.bullets];
        newBullets[bulletIndex] = text;
        return { ...item, bullets: newBullets };
      })
    );
  };

  const handleRemoveBullet = (itemId: string, bulletIndex: number) => {
    onChange(
      items.map((item) => {
        if (item.id !== itemId) return item;
        const newBullets = item.bullets.filter((_, idx) => idx !== bulletIndex);
        return { ...item, bullets: newBullets.length ? newBullets : [''] };
      })
    );
  };

  const detectWeakPhrases = (text: string) => {
    const lower = text.toLowerCase();
    return WEAK_VERBS.find((w) => lower.includes(w.weak));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-1 border-b border-slate-100">
        <p className="text-xs text-slate-500">
          List your professional history in reverse chronological order. Use the STAR formula (Action Verb + Context + Result).
        </p>
        <button
          type="button"
          onClick={onOpenActionVerbs}
          className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1 font-semibold whitespace-nowrap ml-2 cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>Action Verbs</span>
        </button>
      </div>

      <div className="space-y-4">
        {items.map((item, index) => (
          <div
            key={item.id}
            className="bg-white border border-slate-200 rounded-xl p-4 space-y-3.5 shadow-xs"
          >
            {/* Header with Title and Reorder Controls */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-blue-600" />
                <span>Position #{index + 1}</span>
              </span>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => handleMoveUp(index)}
                  disabled={index === 0}
                  className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed"
                  title="Move position up"
                >
                  <MoveUp className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleMoveDown(index)}
                  disabled={index === items.length - 1}
                  className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed"
                  title="Move position down"
                >
                  <MoveDown className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleRemoveItem(item.id)}
                  className="text-slate-400 hover:text-rose-600 p-1 ml-1"
                  title="Remove Position"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Job Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={item.role}
                  onChange={(e) => handleUpdateItem(item.id, { role: e.target.value })}
                  placeholder="e.g. Senior Software Engineer"
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Company Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={item.company}
                  onChange={(e) => handleUpdateItem(item.id, { company: e.target.value })}
                  placeholder="e.g. Stripe, Google, Datadog"
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Employment Type</label>
                <select
                  value={item.employmentType || 'Full-time'}
                  onChange={(e) => handleUpdateItem(item.id, { employmentType: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                  <option value="Freelance">Freelance</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Location</label>
                <div className="relative">
                  <MapPin className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
                  <input
                    type="text"
                    value={item.location}
                    onChange={(e) => handleUpdateItem(item.id, { location: e.target.value })}
                    placeholder="e.g. Seattle, WA / Remote"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-semibold text-slate-700">Dates</label>
                  <label className="text-[10px] text-slate-500 flex items-center gap-1 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={item.current}
                      onChange={(e) => handleUpdateItem(item.id, { current: e.target.checked })}
                      className="rounded text-blue-600 focus:ring-0"
                    />
                    <span>Present</span>
                  </label>
                </div>
                <div className="flex items-center gap-1">
                  <input
                    type="text"
                    value={item.startDate}
                    onChange={(e) => handleUpdateItem(item.id, { startDate: e.target.value })}
                    placeholder="Start (YYYY-MM)"
                    className="w-1/2 bg-slate-50 border border-slate-300 rounded-lg px-2 py-1.5 text-xs text-slate-800 placeholder-slate-400"
                  />
                  {!item.current ? (
                    <input
                      type="text"
                      value={item.endDate}
                      onChange={(e) => handleUpdateItem(item.id, { endDate: e.target.value })}
                      placeholder="End (YYYY-MM)"
                      className="w-1/2 bg-slate-50 border border-slate-300 rounded-lg px-2 py-1.5 text-xs text-slate-800 placeholder-slate-400"
                    />
                  ) : (
                    <span className="w-1/2 text-center text-xs font-semibold text-blue-700 bg-blue-50 py-1.5 rounded-lg border border-blue-200">
                      Present
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Bullet Points */}
            <div className="space-y-2 pt-1">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-slate-700">
                  Key Achievements & Responsibilities
                </label>
                <button
                  type="button"
                  onClick={() => handleAddBullet(item.id)}
                  className="text-[11px] text-blue-600 hover:text-blue-700 flex items-center gap-1 font-semibold cursor-pointer"
                >
                  <Plus className="w-3 h-3" />
                  <span>Add Bullet</span>
                </button>
              </div>

              {item.bullets.map((bullet, bIdx) => {
                const weakDetected = detectWeakPhrases(bullet);
                return (
                  <div key={bIdx} className="space-y-1">
                    <div className="flex items-start gap-2">
                      <span className="text-slate-400 text-xs mt-2">•</span>
                      <textarea
                        rows={2}
                        value={bullet}
                        onChange={(e) => handleUpdateBullet(item.id, bIdx, e.target.value)}
                        placeholder="Action Verb + Task + Measurable Metric (e.g. Architected payment pipeline handling 14M daily transactions, reducing p99 latency by 75%)"
                        className="flex-1 bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 leading-relaxed resize-none"
                      />
                      {item.bullets.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveBullet(item.id, bIdx)}
                          className="text-slate-400 hover:text-rose-600 p-1.5"
                          title="Remove bullet point"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                    {weakDetected && (
                      <div className="text-[10px] text-amber-700 ml-5 flex items-center gap-1 bg-amber-50 p-1 rounded border border-amber-200">
                        <AlertCircle className="w-3 h-3 text-amber-600 flex-shrink-0" />
                        <span>
                          Avoid "{weakDetected.weak}". Try: {weakDetected.suggested.slice(0, 3).join(', ')}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={handleAddItem}
        className="w-full py-2.5 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
      >
        <Plus className="w-4 h-4 text-blue-600" />
        <span>Add Another Position</span>
      </button>
    </div>
  );
};
