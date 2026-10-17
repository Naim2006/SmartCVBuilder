import React from 'react';
import type { EducationItem } from '../../types/cv';
import { Plus, Trash2, GraduationCap, Calendar, MapPin } from 'lucide-react';

interface EducationFormProps {
  items: EducationItem[];
  onChange: (items: EducationItem[]) => void;
}

export const EducationForm: React.FC<EducationFormProps> = ({ items, onChange }) => {
  const handleAddItem = () => {
    const newItem: EducationItem = {
      id: `edu-${Date.now()}`,
      institution: '',
      degree: '',
      fieldOfStudy: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
    };
    onChange([...items, newItem]);
  };

  const handleRemoveItem = (id: string) => {
    onChange(items.filter((item) => item.id !== id));
  };

  const handleUpdateItem = (id: string, updatedFields: Partial<EducationItem>) => {
    onChange(
      items.map((item) => (item.id === id ? { ...item, ...updatedFields } : item))
    );
  };

  return (
    <div className="space-y-4">
      <p className="text-xs text-slate-500">
        Add your academic qualifications starting with your highest level degree. Passing years and degrees are parsed directly by ATS filters.
      </p>

      <div className="space-y-4">
        {items.map((item, index) => (
          <div
            key={item.id}
            className="bg-white border border-slate-200 rounded-xl p-4 space-y-3.5 shadow-xs"
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
                <span>Qualification #{index + 1}</span>
              </span>
              <button
                type="button"
                onClick={() => handleRemoveItem(item.id)}
                className="text-slate-400 hover:text-rose-600 p-1 rounded"
                title="Remove Education"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Degree / Qualification <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={item.degree}
                  onChange={(e) => handleUpdateItem(item.id, { degree: e.target.value })}
                  placeholder="e.g. Bachelor of Science, Master of Science"
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Institution / University Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={item.institution}
                  onChange={(e) => handleUpdateItem(item.id, { institution: e.target.value })}
                  placeholder="e.g. University of Washington, MIT"
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Field of Study / Major
                </label>
                <input
                  type="text"
                  value={item.fieldOfStudy}
                  onChange={(e) => handleUpdateItem(item.id, { fieldOfStudy: e.target.value })}
                  placeholder="e.g. Computer Science, Economics"
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Location</label>
                <div className="relative">
                  <MapPin className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
                  <input
                    type="text"
                    value={item.location}
                    onChange={(e) => handleUpdateItem(item.id, { location: e.target.value })}
                    placeholder="e.g. Seattle, WA"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Start Year / Date</label>
                <div className="relative">
                  <Calendar className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
                  <input
                    type="text"
                    value={item.startDate}
                    onChange={(e) => handleUpdateItem(item.id, { startDate: e.target.value })}
                    placeholder="e.g. 2017"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Passing / Graduation Year
                </label>
                <div className="relative">
                  <Calendar className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
                  <input
                    type="text"
                    value={item.endDate}
                    onChange={(e) => handleUpdateItem(item.id, { endDate: e.target.value })}
                    placeholder="e.g. 2021"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Grade / GPA / Percentage
                </label>
                <input
                  type="text"
                  value={item.gpa || ''}
                  onChange={(e) => handleUpdateItem(item.id, { gpa: e.target.value })}
                  placeholder="e.g. 3.8 / 4.0, First Class"
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Relevant Coursework</label>
                <input
                  type="text"
                  value={item.coursework || ''}
                  onChange={(e) => handleUpdateItem(item.id, { coursework: e.target.value })}
                  placeholder="e.g. Data Structures, Database Systems, Cloud Architecture"
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Academic Honors / Description</label>
                <input
                  type="text"
                  value={item.description || ''}
                  onChange={(e) => handleUpdateItem(item.id, { description: e.target.value })}
                  placeholder="e.g. Magna Cum Laude, Dean's List"
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
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
        <span>Add Education Entry</span>
      </button>
    </div>
  );
};
