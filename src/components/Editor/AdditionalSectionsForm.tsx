import React from 'react';
import type {
  VolunteerItem,
  AwardItem,
  CourseItem,
  LanguageItem,
  PublicationItem,
  CustomSection,
} from '../../types/cv';
import { Plus, Trash2, HeartHandshake, Trophy, BookOpen, Globe, FileText } from 'lucide-react';

interface AdditionalSectionsFormProps {
  volunteer: VolunteerItem[];
  awards: AwardItem[];
  courses: CourseItem[];
  languages: LanguageItem[];
  publications: PublicationItem[];
  customSections: CustomSection[];
  onChange: (updated: {
    volunteer?: VolunteerItem[];
    awards?: AwardItem[];
    courses?: CourseItem[];
    languages?: LanguageItem[];
    publications?: PublicationItem[];
    customSections?: CustomSection[];
  }) => void;
}

export const AdditionalSectionsForm: React.FC<AdditionalSectionsFormProps> = ({
  volunteer,
  awards,
  courses,
  languages,
  publications,
  customSections,
  onChange,
}) => {
  // Languages helpers
  const handleAddLanguage = () => {
    const newItem: LanguageItem = {
      id: `lang-${Date.now()}`,
      name: '',
      level: 'Professional Working',
    };
    onChange({ languages: [...languages, newItem] });
  };

  const handleUpdateLanguage = (id: string, updated: Partial<LanguageItem>) => {
    onChange({
      languages: languages.map((l) => (l.id === id ? { ...l, ...updated } : l)),
    });
  };

  const handleRemoveLanguage = (id: string) => {
    onChange({ languages: languages.filter((l) => l.id !== id) });
  };

  // Awards helpers
  const handleAddAward = () => {
    const newItem: AwardItem = {
      id: `award-${Date.now()}`,
      title: '',
      issuer: '',
      date: '',
      description: '',
    };
    onChange({ awards: [...awards, newItem] });
  };

  const handleUpdateAward = (id: string, updated: Partial<AwardItem>) => {
    onChange({
      awards: awards.map((a) => (a.id === id ? { ...a, ...updated } : a)),
    });
  };

  const handleRemoveAward = (id: string) => {
    onChange({ awards: awards.filter((a) => a.id !== id) });
  };

  // Volunteer helpers
  const handleAddVolunteer = () => {
    const newItem: VolunteerItem = {
      id: `vol-${Date.now()}`,
      role: '',
      organization: '',
      startDate: '',
      endDate: '',
      current: false,
      responsibilities: '',
      bullets: [],
    };
    onChange({ volunteer: [...volunteer, newItem] });
  };

  const handleUpdateVolunteer = (id: string, updated: Partial<VolunteerItem>) => {
    onChange({
      volunteer: volunteer.map((v) => (v.id === id ? { ...v, ...updated } : v)),
    });
  };

  const handleRemoveVolunteer = (id: string) => {
    onChange({ volunteer: volunteer.filter((v) => v.id !== id) });
  };

  // Courses helpers
  const handleAddCourse = () => {
    const newItem: CourseItem = {
      id: `course-${Date.now()}`,
      name: '',
      platform: '',
      date: '',
    };
    onChange({ courses: [...courses, newItem] });
  };

  const handleUpdateCourse = (id: string, updated: Partial<CourseItem>) => {
    onChange({
      courses: courses.map((c) => (c.id === id ? { ...c, ...updated } : c)),
    });
  };

  const handleRemoveCourse = (id: string) => {
    onChange({ courses: courses.filter((c) => c.id !== id) });
  };

  // Publications helpers
  const handleAddPublication = () => {
    const newItem: PublicationItem = {
      id: `pub-${Date.now()}`,
      title: '',
      publisher: '',
      date: '',
      description: '',
    };
    onChange({ publications: [...publications, newItem] });
  };

  const handleUpdatePublication = (id: string, updated: Partial<PublicationItem>) => {
    onChange({
      publications: publications.map((p) => (p.id === id ? { ...p, ...updated } : p)),
    });
  };

  const handleRemovePublication = (id: string) => {
    onChange({ publications: publications.filter((p) => p.id !== id) });
  };

  // Custom Sections helpers
  const handleAddCustomSection = () => {
    const newSec: CustomSection = {
      id: `custom-${Date.now()}`,
      heading: 'Custom Section',
      items: [
        {
          id: `item-${Date.now()}`,
          title: '',
          description: '',
        },
      ],
    };
    onChange({ customSections: [...customSections, newSec] });
  };

  const handleUpdateCustomSection = (id: string, heading: string) => {
    onChange({
      customSections: customSections.map((s) => (s.id === id ? { ...s, heading } : s)),
    });
  };

  const handleRemoveCustomSection = (id: string) => {
    onChange({ customSections: customSections.filter((s) => s.id !== id) });
  };

  const handleAddCustomItem = (secId: string) => {
    onChange({
      customSections: customSections.map((s) => {
        if (s.id !== secId) return s;
        return {
          ...s,
          items: [...s.items, { id: `item-${Date.now()}`, title: '', description: '' }],
        };
      }),
    });
  };

  const handleUpdateCustomItem = (secId: string, itemId: string, field: 'title' | 'description', val: string) => {
    onChange({
      customSections: customSections.map((s) => {
        if (s.id !== secId) return s;
        return {
          ...s,
          items: s.items.map((it) => (it.id === itemId ? { ...it, [field]: val } : it)),
        };
      }),
    });
  };

  const handleRemoveCustomItem = (secId: string, itemId: string) => {
    onChange({
      customSections: customSections.map((s) => {
        if (s.id !== secId) return s;
        return {
          ...s,
          items: s.items.filter((it) => it.id !== itemId),
        };
      }),
    });
  };

  return (
    <div className="space-y-6">
      {/* Languages Section */}
      <div className="space-y-3 bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-blue-600" />
            <h3 className="text-xs font-bold text-slate-900">Languages</h3>
          </div>
          <button
            type="button"
            onClick={handleAddLanguage}
            className="text-xs text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Language</span>
          </button>
        </div>

        {languages.map((l) => (
          <div key={l.id} className="flex items-center gap-2">
            <input
              type="text"
              value={l.name}
              onChange={(e) => handleUpdateLanguage(l.id, { name: e.target.value })}
              placeholder="e.g. English, French, Spanish"
              className="flex-1 bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <select
              value={l.level}
              onChange={(e) => handleUpdateLanguage(l.id, { level: e.target.value })}
              className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="Native / Bilingual">Native / Bilingual</option>
              <option value="Fluent">Fluent</option>
              <option value="Professional Working">Professional Working</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Basic">Basic</option>
            </select>
            <button
              type="button"
              onClick={() => handleRemoveLanguage(l.id)}
              className="text-slate-400 hover:text-rose-600 p-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* Awards Section */}
      <div className="space-y-3 bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-500" />
            <h3 className="text-xs font-bold text-slate-900">Achievements & Awards</h3>
          </div>
          <button
            type="button"
            onClick={handleAddAward}
            className="text-xs text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Award</span>
          </button>
        </div>

        {awards.map((a) => (
          <div key={a.id} className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
            <div className="flex items-center justify-between gap-2">
              <input
                type="text"
                value={a.title}
                onChange={(e) => handleUpdateAward(a.id, { title: e.target.value })}
                placeholder="Award Title (e.g. Employee of the Year, Hackathon 1st Place)"
                className="flex-1 bg-white border border-slate-300 rounded px-2 py-1 text-xs text-slate-800"
              />
              <button
                type="button"
                onClick={() => handleRemoveAward(a.id)}
                className="text-slate-400 hover:text-rose-600"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                value={a.issuer}
                onChange={(e) => handleUpdateAward(a.id, { issuer: e.target.value })}
                placeholder="Issuing Organization"
                className="bg-white border border-slate-300 rounded px-2 py-1 text-xs text-slate-800"
              />
              <input
                type="text"
                value={a.date}
                onChange={(e) => handleUpdateAward(a.id, { date: e.target.value })}
                placeholder="Date (e.g. 2023-11)"
                className="bg-white border border-slate-300 rounded px-2 py-1 text-xs text-slate-800"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Volunteer Experience */}
      <div className="space-y-3 bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <HeartHandshake className="w-4 h-4 text-emerald-600" />
            <h3 className="text-xs font-bold text-slate-900">Volunteer Experience</h3>
          </div>
          <button
            type="button"
            onClick={handleAddVolunteer}
            className="text-xs text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Volunteer Role</span>
          </button>
        </div>

        {volunteer.map((v) => (
          <div key={v.id} className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
            <div className="flex items-center justify-between gap-2">
              <input
                type="text"
                value={v.role}
                onChange={(e) => handleUpdateVolunteer(v.id, { role: e.target.value })}
                placeholder="Volunteer Role (e.g. Code Mentor)"
                className="flex-1 bg-white border border-slate-300 rounded px-2 py-1 text-xs text-slate-800"
              />
              <button
                type="button"
                onClick={() => handleRemoveVolunteer(v.id)}
                className="text-slate-400 hover:text-rose-600"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                value={v.organization}
                onChange={(e) => handleUpdateVolunteer(v.id, { organization: e.target.value })}
                placeholder="Organization Name"
                className="bg-white border border-slate-300 rounded px-2 py-1 text-xs text-slate-800"
              />
              <input
                type="text"
                value={v.startDate}
                onChange={(e) => handleUpdateVolunteer(v.id, { startDate: e.target.value })}
                placeholder="Date (e.g. 2022-01 - Present)"
                className="bg-white border border-slate-300 rounded px-2 py-1 text-xs text-slate-800"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Courses and Training */}
      <div className="space-y-3 bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-indigo-600" />
            <h3 className="text-xs font-bold text-slate-900">Courses & Training</h3>
          </div>
          <button
            type="button"
            onClick={handleAddCourse}
            className="text-xs text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Course</span>
          </button>
        </div>

        {courses.map((c) => (
          <div key={c.id} className="flex items-center gap-2">
            <input
              type="text"
              value={c.name}
              onChange={(e) => handleUpdateCourse(c.id, { name: e.target.value })}
              placeholder="Course Name"
              className="flex-1 bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 text-xs text-slate-800"
            />
            <input
              type="text"
              value={c.platform}
              onChange={(e) => handleUpdateCourse(c.id, { platform: e.target.value })}
              placeholder="Platform (e.g. Coursera)"
              className="w-36 bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 text-xs text-slate-800"
            />
            <button
              type="button"
              onClick={() => handleRemoveCourse(c.id)}
              className="text-slate-400 hover:text-rose-600 p-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* Publications */}
      <div className="space-y-3 bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-600" />
            <h3 className="text-xs font-bold text-slate-900">Publications</h3>
          </div>
          <button
            type="button"
            onClick={handleAddPublication}
            className="text-xs text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Publication</span>
          </button>
        </div>

        {publications.map((p) => (
          <div key={p.id} className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
            <div className="flex items-center justify-between gap-2">
              <input
                type="text"
                value={p.title}
                onChange={(e) => handleUpdatePublication(p.id, { title: e.target.value })}
                placeholder="Publication Title / Paper Name"
                className="flex-1 bg-white border border-slate-300 rounded px-2 py-1 text-xs text-slate-800"
              />
              <button
                type="button"
                onClick={() => handleRemovePublication(p.id)}
                className="text-slate-400 hover:text-rose-600"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                value={p.publisher}
                onChange={(e) => handleUpdatePublication(p.id, { publisher: e.target.value })}
                placeholder="Publisher / Journal"
                className="bg-white border border-slate-300 rounded px-2 py-1 text-xs text-slate-800"
              />
              <input
                type="text"
                value={p.date}
                onChange={(e) => handleUpdatePublication(p.id, { date: e.target.value })}
                placeholder="Date (e.g. 2022-05)"
                className="bg-white border border-slate-300 rounded px-2 py-1 text-xs text-slate-800"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Custom Dynamic Sections */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Custom Independent Sections
          </h3>
          <button
            type="button"
            onClick={handleAddCustomSection}
            className="text-xs text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Custom Section</span>
          </button>
        </div>

        {customSections.map((sec) => (
          <div key={sec.id} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <input
                type="text"
                value={sec.heading}
                onChange={(e) => handleUpdateCustomSection(sec.id, e.target.value)}
                placeholder="Section Heading (e.g. Extracurricular, Interests)"
                className="font-bold text-xs text-slate-900 border-b border-transparent hover:border-slate-300 focus:border-blue-500 focus:outline-none px-1"
              />
              <button
                type="button"
                onClick={() => handleRemoveCustomSection(sec.id)}
                className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer"
                title="Remove entire custom section"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            {sec.items.map((it) => (
              <div key={it.id} className="flex items-center gap-2">
                <input
                  type="text"
                  value={it.title}
                  onChange={(e) => handleUpdateCustomItem(sec.id, it.id, 'title', e.target.value)}
                  placeholder="Item Title"
                  className="w-1/3 bg-slate-50 border border-slate-300 rounded px-2 py-1 text-xs text-slate-800"
                />
                <input
                  type="text"
                  value={it.description || ''}
                  onChange={(e) => handleUpdateCustomItem(sec.id, it.id, 'description', e.target.value)}
                  placeholder="Details / Description"
                  className="flex-1 bg-slate-50 border border-slate-300 rounded px-2 py-1 text-xs text-slate-800"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveCustomItem(sec.id, it.id)}
                  className="text-slate-400 hover:text-rose-600 p-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={() => handleAddCustomItem(sec.id)}
              className="text-[11px] text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1 pt-1 cursor-pointer"
            >
              <Plus className="w-3 h-3" />
              <span>Add Item</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
