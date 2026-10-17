import React from 'react';
import type { ProjectItem } from '../../types/cv';
import { Plus, Trash2, FolderGit2, Link as LinkIcon } from 'lucide-react';

interface ProjectsFormProps {
  items: ProjectItem[];
  onChange: (items: ProjectItem[]) => void;
}

export const ProjectsForm: React.FC<ProjectsFormProps> = ({ items, onChange }) => {
  const handleAddItem = () => {
    const newItem: ProjectItem = {
      id: `proj-${Date.now()}`,
      name: '',
      description: '',
      techStack: [],
      liveUrl: '',
      githubUrl: '',
      bullets: [''],
    };
    onChange([...items, newItem]);
  };

  const handleRemoveItem = (id: string) => {
    onChange(items.filter((item) => item.id !== id));
  };

  const handleUpdateItem = (id: string, updatedFields: Partial<ProjectItem>) => {
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

  const handleUpdateBullet = (itemId: string, bulletIdx: number, text: string) => {
    onChange(
      items.map((item) => {
        if (item.id !== itemId) return item;
        const newBullets = [...item.bullets];
        newBullets[bulletIdx] = text;
        return { ...item, bullets: newBullets };
      })
    );
  };

  const handleRemoveBullet = (itemId: string, bulletIdx: number) => {
    onChange(
      items.map((item) => {
        if (item.id !== itemId) return item;
        const newBullets = item.bullets.filter((_, idx) => idx !== bulletIdx);
        return { ...item, bullets: newBullets.length ? newBullets : [''] };
      })
    );
  };

  return (
    <div className="space-y-4">
      <p className="text-xs text-slate-500">
        Showcase technical systems, open-source repositories, or academic capstones. Highlight the exact technologies and live URLs.
      </p>

      <div className="space-y-4">
        {items.map((item, index) => (
          <div
            key={item.id}
            className="bg-white border border-slate-200 rounded-xl p-4 space-y-3.5 shadow-xs"
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <FolderGit2 className="w-3.5 h-3.5 text-blue-600" />
                <span>Project #{index + 1}</span>
              </span>
              <button
                type="button"
                onClick={() => handleRemoveItem(item.id)}
                className="text-slate-400 hover:text-rose-600 p-1"
                title="Remove Project"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Project Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => handleUpdateItem(item.id, { name: e.target.value })}
                  placeholder="e.g. Distributed Task Queue"
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Tech Stack (comma separated)
                </label>
                <input
                  type="text"
                  value={item.techStack.join(', ')}
                  onChange={(e) =>
                    handleUpdateItem(item.id, {
                      techStack: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                    })
                  }
                  placeholder="e.g. React, Node.js, Redis, Docker"
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Live Demo URL</label>
                <div className="relative">
                  <LinkIcon className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
                  <input
                    type="text"
                    value={item.liveUrl || ''}
                    onChange={(e) => handleUpdateItem(item.id, { liveUrl: e.target.value })}
                    placeholder="https://myproject.app"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">GitHub Repository URL</label>
                <div className="relative">
                  <LinkIcon className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
                  <input
                    type="text"
                    value={item.githubUrl || ''}
                    onChange={(e) => handleUpdateItem(item.id, { githubUrl: e.target.value })}
                    placeholder="https://github.com/user/repo"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Brief Description</label>
              <input
                type="text"
                value={item.description}
                onChange={(e) => handleUpdateItem(item.id, { description: e.target.value })}
                placeholder="High-scale event aggregation platform handling streaming telemetry..."
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Bullets */}
            <div className="space-y-2 pt-1">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-slate-700">
                  Key Accomplishments / System Features
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

              {item.bullets.map((bullet, bIdx) => (
                <div key={bIdx} className="flex items-center gap-2">
                  <span className="text-slate-400 text-xs">•</span>
                  <input
                    type="text"
                    value={bullet}
                    onChange={(e) => handleUpdateBullet(item.id, bIdx, e.target.value)}
                    placeholder="e.g. Achieved sub-50ms query latency across 100k test records"
                    className="flex-1 bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  {item.bullets.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveBullet(item.id, bIdx)}
                      className="text-slate-400 hover:text-rose-600 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
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
        <span>Add Another Project</span>
      </button>
    </div>
  );
};
