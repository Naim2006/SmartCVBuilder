import React, { useState } from 'react';
import type { SkillCategory } from '../../types/cv';
import { Plus, Trash2, X, Wrench, Sparkles } from 'lucide-react';

interface SkillsFormProps {
  categories: SkillCategory[];
  onChange: (categories: SkillCategory[]) => void;
}

export const SkillsForm: React.FC<SkillsFormProps> = ({ categories, onChange }) => {
  const [newSkillInputs, setNewSkillInputs] = useState<Record<string, string>>({});

  const popularSuggestions = [
    'TypeScript',
    'React',
    'Next.js',
    'Node.js',
    'Python',
    'Go (Golang)',
    'PostgreSQL',
    'Docker',
    'Kubernetes',
    'AWS',
    'GraphQL',
    'Git',
    'Tailwind CSS',
    'Agile / Scrum',
  ];

  const handleAddCategory = (defaultName = 'New Category') => {
    const newCat: SkillCategory = {
      id: `skill-cat-${Date.now()}`,
      categoryName: defaultName,
      skills: [],
    };
    onChange([...categories, newCat]);
  };

  const handleRemoveCategory = (id: string) => {
    onChange(categories.filter((cat) => cat.id !== id));
  };

  const handleUpdateCategoryName = (id: string, name: string) => {
    onChange(
      categories.map((cat) => (cat.id === id ? { ...cat, categoryName: name } : cat))
    );
  };

  const handleAddSkillToCategory = (catId: string, skill: string) => {
    const trimmed = skill.trim();
    if (!trimmed) return;
    onChange(
      categories.map((cat) => {
        if (cat.id !== catId) return cat;
        if (cat.skills.includes(trimmed)) return cat;
        return { ...cat, skills: [...cat.skills, trimmed] };
      })
    );
    setNewSkillInputs((prev) => ({ ...prev, [catId]: '' }));
  };

  const handleRemoveSkill = (catId: string, skillToRemove: string) => {
    onChange(
      categories.map((cat) => {
        if (cat.id !== catId) return cat;
        return { ...cat, skills: cat.skills.filter((s) => s !== skillToRemove) };
      })
    );
  };

  const handleKeyDown = (catId: string, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const val = newSkillInputs[catId] || '';
      handleAddSkillToCategory(catId, val);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-1 border-b border-slate-100">
        <p className="text-xs text-slate-500">
          Group your skills into clear categories (e.g. Languages, Frameworks, Tools). Grouped skills parse 40% higher in ATS keyword extraction.
        </p>
      </div>

      {/* Suggested Quick Add Chips */}
      <div className="bg-blue-50/60 border border-blue-200/80 rounded-xl p-3.5 space-y-2">
        <span className="text-[11px] font-bold text-blue-950 block flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>Quick-Add In-Demand Technical Skills:</span>
        </span>
        <div className="flex flex-wrap gap-1.5">
          {popularSuggestions.map((skill) => (
            <button
              key={skill}
              type="button"
              onClick={() => {
                if (categories.length === 0) {
                  const newCat: SkillCategory = {
                    id: 'skills-1',
                    categoryName: 'Technical Skills',
                    skills: [skill],
                  };
                  onChange([newCat]);
                } else {
                  handleAddSkillToCategory(categories[0].id, skill);
                }
              }}
              className="text-[11px] bg-white hover:bg-blue-100 text-slate-700 hover:text-blue-900 px-2.5 py-1 rounded-lg border border-slate-200 shadow-2xs transition-colors cursor-pointer"
            >
              + {skill}
            </button>
          ))}
        </div>
      </div>

      {/* Skill Categories */}
      <div className="space-y-3">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="bg-white border border-slate-200 rounded-xl p-4 space-y-3 shadow-xs"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 flex-1">
                <Wrench className="w-3.5 h-3.5 text-blue-600" />
                <input
                  type="text"
                  value={cat.categoryName}
                  onChange={(e) => handleUpdateCategoryName(cat.id, e.target.value)}
                  placeholder="Category Name (e.g. Programming Languages, Frameworks, Cloud)"
                  className="bg-transparent text-xs font-bold text-slate-900 border-b border-transparent hover:border-slate-300 focus:border-blue-500 focus:outline-none px-1 py-0.5 w-full sm:w-64"
                />
              </div>
              <button
                type="button"
                onClick={() => handleRemoveCategory(cat.id)}
                className="text-slate-400 hover:text-rose-600 p-1 rounded transition-colors"
                title="Remove Category"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Tag List */}
            <div className="flex flex-wrap gap-1.5 min-h-[36px] p-2.5 bg-slate-50 rounded-xl border border-slate-200 items-center">
              {cat.skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1.5 bg-white border border-slate-200 text-slate-800 px-2.5 py-1 rounded-lg text-xs font-medium shadow-2xs"
                >
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(cat.id, skill)}
                    className="text-slate-400 hover:text-rose-600 cursor-pointer"
                    title="Remove skill"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}

              <input
                type="text"
                placeholder={cat.skills.length === 0 ? 'Type a skill and press Enter or comma...' : '+ add skill...'}
                value={newSkillInputs[cat.id] || ''}
                onChange={(e) =>
                  setNewSkillInputs((prev) => ({ ...prev, [cat.id]: e.target.value }))
                }
                onKeyDown={(e) => handleKeyDown(cat.id, e)}
                onBlur={() => {
                  const val = newSkillInputs[cat.id];
                  if (val) handleAddSkillToCategory(cat.id, val);
                }}
                className="bg-transparent text-xs text-slate-800 placeholder-slate-400 focus:outline-none flex-1 min-w-[130px] px-1 py-0.5"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => handleAddCategory('New Category')}
          className="w-full py-2.5 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
        >
          <Plus className="w-4 h-4 text-blue-600" />
          <span>Add Skill Category</span>
        </button>
      </div>
    </div>
  );
};
