import React from 'react';
import type { CertificationItem } from '../../types/cv';
import { Plus, Trash2, Award, Calendar, ExternalLink } from 'lucide-react';

interface CertificationsFormProps {
  items: CertificationItem[];
  onChange: (items: CertificationItem[]) => void;
}

export const CertificationsForm: React.FC<CertificationsFormProps> = ({ items, onChange }) => {
  const handleAddItem = () => {
    const newItem: CertificationItem = {
      id: `cert-${Date.now()}`,
      name: '',
      issuer: '',
      date: '',
      expirationDate: '',
      credentialId: '',
      url: '',
    };
    onChange([...items, newItem]);
  };

  const handleRemoveItem = (id: string) => {
    onChange(items.filter((item) => item.id !== id));
  };

  const handleUpdateItem = (id: string, updatedFields: Partial<CertificationItem>) => {
    onChange(
      items.map((item) => (item.id === id ? { ...item, ...updatedFields } : item))
    );
  };

  return (
    <div className="space-y-4">
      <p className="text-xs text-slate-500">
        Industry credentials (e.g. AWS, CKA, PMP, Scrum) match recruiter boolean filters. Empty fields are hidden from the final export.
      </p>

      <div className="space-y-3">
        {items.map((item, index) => (
          <div
            key={item.id}
            className="bg-white border border-slate-200 rounded-xl p-4 space-y-3 shadow-xs"
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-blue-600" />
                <span>Certification #{index + 1}</span>
              </span>
              <button
                type="button"
                onClick={() => handleRemoveItem(item.id)}
                className="text-slate-400 hover:text-rose-600 p-1"
                title="Remove Certification"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Certificate Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => handleUpdateItem(item.id, { name: e.target.value })}
                  placeholder="e.g. AWS Certified Solutions Architect"
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Issuing Organization <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={item.issuer}
                  onChange={(e) => handleUpdateItem(item.id, { issuer: e.target.value })}
                  placeholder="e.g. Amazon Web Services, CNCF"
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Issue Date</label>
                <div className="relative">
                  <Calendar className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
                  <input
                    type="text"
                    value={item.date}
                    onChange={(e) => handleUpdateItem(item.id, { date: e.target.value })}
                    placeholder="YYYY-MM"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Credential ID (Optional)</label>
                <input
                  type="text"
                  value={item.credentialId || ''}
                  onChange={(e) => handleUpdateItem(item.id, { credentialId: e.target.value })}
                  placeholder="e.g. AWS-892182"
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Verification URL (Optional)</label>
                <div className="relative">
                  <ExternalLink className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
                  <input
                    type="text"
                    value={item.url || ''}
                    onChange={(e) => handleUpdateItem(item.id, { url: e.target.value })}
                    placeholder="https://credly.com/..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
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
        <span>Add Certification</span>
      </button>
    </div>
  );
};
