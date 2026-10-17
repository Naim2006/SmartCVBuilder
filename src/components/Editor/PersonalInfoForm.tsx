import React, { useState } from 'react';
import type { PersonalDetails } from '../../types/cv';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Globe,
  Share2,
  Code2,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Image,
  Shield,
  HelpCircle,
} from 'lucide-react';

interface PersonalInfoFormProps {
  data: PersonalDetails;
  onChange: (updated: PersonalDetails) => void;
}

export const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ data, onChange }) => {
  const [showOptionalFields, setShowOptionalFields] = useState(false);
  const [showSummaryGuide, setShowSummaryGuide] = useState(false);

  const handleChange = (field: keyof PersonalDetails, value: string | boolean) => {
    onChange({ ...data, [field]: value });
  };

  const summaryWords = data.summary.trim().split(/\s+/).filter(Boolean).length;
  const summaryChars = data.summary.length;

  return (
    <div className="space-y-4">
      {/* Name and Professional Headline */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-semibold text-slate-700 block mb-1">
            Full Name <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <User className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={data.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
              placeholder="e.g. David Vance"
              className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-700 block mb-1">
            Professional Headline <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            value={data.jobTitle}
            onChange={(e) => handleChange('jobTitle', e.target.value)}
            placeholder="e.g. Senior Software Engineer"
            className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Email, Phone, City, Country */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-semibold text-slate-700 block mb-1">
            Email Address <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <Mail className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="email"
              value={data.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="name@email.com"
              className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-700 block mb-1">
            Phone Number <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <Phone className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="tel"
              value={data.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="+1 (555) 000-0000"
              className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-semibold text-slate-700 block mb-1">City</label>
          <div className="relative">
            <MapPin className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={data.city}
              onChange={(e) => {
                const city = e.target.value;
                handleChange('city', city);
                if (!data.location) {
                  handleChange('location', city ? `${city}, ${data.country || ''}` : '');
                }
              }}
              placeholder="e.g. Seattle, London, Berlin"
              className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-700 block mb-1">Country</label>
          <input
            type="text"
            value={data.country}
            onChange={(e) => {
              const country = e.target.value;
              handleChange('country', country);
              if (!data.location) {
                handleChange('location', data.city ? `${data.city}, ${country}` : country);
              }
            }}
            placeholder="e.g. United States, Germany, Canada"
            className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Online Links: LinkedIn, GitHub, Portfolio, Other URL */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-semibold text-slate-700 block mb-1">LinkedIn Profile</label>
          <div className="relative">
            <Share2 className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={data.linkedin}
              onChange={(e) => handleChange('linkedin', e.target.value)}
              placeholder="linkedin.com/in/username"
              className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-700 block mb-1">GitHub / Code Link</label>
          <div className="relative">
            <Code2 className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={data.github}
              onChange={(e) => handleChange('github', e.target.value)}
              placeholder="github.com/username"
              className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-semibold text-slate-700 block mb-1">Portfolio Website</label>
          <div className="relative">
            <Globe className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={data.website}
              onChange={(e) => handleChange('website', e.target.value)}
              placeholder="portfolio.dev"
              className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-700 block mb-1">Other Professional URL</label>
          <input
            type="text"
            value={data.otherUrl || ''}
            onChange={(e) => handleChange('otherUrl', e.target.value)}
            placeholder="e.g. Substack, Medium, Dribbble"
            className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Professional Summary */}
      <div>
        <div className="flex justify-between items-center mb-1">
          <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Professional Summary</span>
          </label>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setShowSummaryGuide(!showSummaryGuide)}
              className="text-[11px] text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
            >
              <HelpCircle className="w-3 h-3" />
              <span>Writing Guide</span>
            </button>

            <span
              className={`text-[11px] font-mono ${
                summaryWords >= 35 && summaryWords <= 90
                  ? 'text-emerald-600 font-semibold'
                  : summaryWords > 90
                  ? 'text-amber-600 font-semibold'
                  : 'text-slate-500'
              }`}
            >
              {summaryWords} words ({summaryChars} chars)
            </span>
          </div>
        </div>

        {showSummaryGuide && (
          <div className="mb-2 p-3 bg-blue-50/80 border border-blue-200 rounded-xl text-xs text-blue-950 space-y-1.5 animate-fadeIn">
            <strong className="block font-semibold">Summary Formula for High ATS Scoring:</strong>
            <p className="text-[11px] text-blue-900/90 leading-relaxed">
              [Years of Experience] + [Core Domain / Job Title] + [Top 2-3 Technical Strengths] + [1-2 Major Quantifiable Achievements (% or metrics)].
            </p>
            <div className="text-[10px] text-blue-800 italic bg-white/70 p-1.5 rounded border border-blue-100">
              "Senior Full-Stack Engineer with 6+ years of expertise designing distributed microservices and cloud architectures. Proven track record of improving system latency by 45% and saving \$1.2M in annual cloud infrastructure costs."
            </div>
          </div>
        )}

        <textarea
          rows={3}
          value={data.summary}
          onChange={(e) => handleChange('summary', e.target.value)}
          placeholder="Brief 2-3 sentence overview of your career background, primary technical skills, and key accomplishments..."
          className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 leading-relaxed resize-none"
        />
      </div>

      {/* Optional Details Collapsible (Photo, Address, Nationality, Work Authorization) */}
      <div className="border-t border-slate-100 pt-2">
        <button
          type="button"
          onClick={() => setShowOptionalFields(!showOptionalFields)}
          className="text-xs text-slate-600 hover:text-slate-900 font-semibold flex items-center gap-1.5 cursor-pointer py-1"
        >
          {showOptionalFields ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          <span>Additional Optional Information (Work Authorization, Address, Photo)</span>
        </button>

        {showOptionalFields && (
          <div className="mt-3 p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3.5 animate-fadeIn">
            <div className="p-2.5 bg-blue-50/60 border border-blue-100 rounded-lg text-[11px] text-blue-900 flex items-start gap-2">
              <Shield className="w-3.5 h-3.5 text-blue-600 flex-shrink-0 mt-0.5" />
              <span>
                To ensure anti-bias standards and maximum ATS pass rates in US/UK/EU corporate hiring, date of birth, religion, gender, and marital status are intentionally excluded.
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Work Authorization / Visa Status
                </label>
                <input
                  type="text"
                  value={data.workAuthorization || ''}
                  onChange={(e) => handleChange('workAuthorization', e.target.value)}
                  placeholder="e.g. Authorized to work in US / EU Citizen"
                  className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-800"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Nationality</label>
                <input
                  type="text"
                  value={data.nationality || ''}
                  onChange={(e) => handleChange('nationality', e.target.value)}
                  placeholder="e.g. American, Canadian, German"
                  className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-800"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Full Street Address</label>
              <input
                type="text"
                value={data.fullAddress || ''}
                onChange={(e) => handleChange('fullAddress', e.target.value)}
                placeholder="e.g. 123 Main St, Apt 4B"
                className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-800"
              />
            </div>

            {/* Profile Photo Toggle */}
            <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Image className="w-4 h-4 text-slate-500" />
                <div>
                  <span className="text-xs font-semibold text-slate-800 block">Include Profile Photo</span>
                  <span className="text-[10px] text-slate-500">
                    ATS standard in North America recommends text-only without photos.
                  </span>
                </div>
              </div>

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={Boolean(data.showPhoto)}
                  onChange={(e) => handleChange('showPhoto', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            {data.showPhoto && (
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Photo URL / Local Base64
                </label>
                <input
                  type="text"
                  value={data.photoUrl || ''}
                  onChange={(e) => handleChange('photoUrl', e.target.value)}
                  placeholder="https://... or data:image/png;base64,..."
                  className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-800"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
