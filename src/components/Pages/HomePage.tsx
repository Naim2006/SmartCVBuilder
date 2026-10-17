import React from 'react';
import type { TemplateType } from '../../types/cv';
import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Eye,
  Lock,
  Layers,
} from 'lucide-react';

interface HomePageProps {
  onCreateCv: () => void;
  onSelectTemplate: (template: TemplateType) => void;
  onOpenPrivacy?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onCreateCv,
  onSelectTemplate,
  onOpenPrivacy,
}) => {
  const templates: {
    id: TemplateType;
    name: string;
    description: string;
    badge: string;
    highlights: string[];
  }[] = [
    {
      id: 'classic',
      name: 'Classic ATS',
      description: 'Single-column traditional layout with high contrast lines and clear section headers. Highest parsing success rate across enterprise ATS.',
      badge: '100% ATS Safe',
      highlights: ['Single-column structure', 'Harvard / Ivy standard', 'Clean line dividers'],
    },
    {
      id: 'modern',
      name: 'Modern Professional',
      description: 'Clean typography, strong visual hierarchy, and subtle color accents. Perfect for corporate, business, and tech roles.',
      badge: 'Recruiter Favorite',
      highlights: ['Accent borders', 'Clean metadata alignment', 'Categorized skills'],
    },
    {
      id: 'compact',
      name: 'Compact ATS',
      description: 'Space-optimized layout with streamlined margins designed to fit dense experience into a single pristine page.',
      badge: 'High Density 1-Page',
      highlights: ['Optimized margins', 'Tight typography', 'Zero wasted space'],
    },
    {
      id: 'executive',
      name: 'Executive',
      description: 'Refined serif typography and authoritative layout emphasizing senior leadership milestones and strategic impact.',
      badge: 'Mid & Senior Level',
      highlights: ['Executive typography', 'Leadership emphasis', 'Strategic summary'],
    },
    {
      id: 'developer',
      name: 'Developer CV',
      description: 'Designed specifically for Software Engineers and IT specialists with technical arsenal upfront and emphasized project links.',
      badge: 'Tech Specialist',
      highlights: ['Skills matrix upfront', 'GitHub & demo links', 'Clean monospace hints'],
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 py-8">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200/80 px-3 py-1 rounded-full text-xs font-semibold text-blue-700">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Build Your CV. Keep Your Privacy.</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Build a Professional CV in Minutes
            </h1>

            <p className="text-base text-slate-600 leading-relaxed max-w-xl">
              Create a clean, ATS-friendly CV, customize every section, and download it as a PDF. No account required. Your information stays in your browser.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={onCreateCv}
                className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-3.5 rounded-xl text-sm shadow-md transition-all hover:shadow-lg cursor-pointer"
              >
                <span>Create My CV</span>
                <ArrowRight className="w-4 h-4 text-blue-400" />
              </button>

              <a
                href="#templates"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-semibold px-6 py-3.5 rounded-xl text-sm transition-colors"
              >
                <span>Explore Templates</span>
              </a>
            </div>

            {/* 3 Trust Indicators */}
            <div className="pt-6 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span className="font-semibold text-slate-800">No Login Required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span className="font-semibold text-slate-800">ATS-Friendly Templates</span>
              </div>
              <div
                onClick={onOpenPrivacy}
                className={`flex items-center gap-2 ${onOpenPrivacy ? 'cursor-pointer hover:text-blue-600' : ''}`}
                title="Learn how browser storage works"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span className="font-semibold text-slate-800">Your Data Stays in Your Browser</span>
              </div>
            </div>
          </div>

          {/* Realistic CSS/HTML Resume Mockup */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-[380px] bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 space-y-4 transform hover:-translate-y-1 transition-transform relative select-none">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <div className="h-4 w-32 bg-slate-800 rounded font-bold text-xs text-white px-2 py-0.5 inline-block">
                    ALEX MORGAN
                  </div>
                  <div className="text-[10px] text-blue-600 font-semibold mt-1">
                    Senior Full-Stack Software Engineer
                  </div>
                </div>
                <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[10px] font-bold">
                  ATS
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                  Experience
                </div>
                <div className="h-2 w-full bg-slate-200 rounded"></div>
                <div className="h-2 w-5/6 bg-slate-200 rounded"></div>
                <div className="h-2 w-4/6 bg-slate-100 rounded"></div>
              </div>

              <div className="space-y-1">
                <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                  Skills Arsenal
                </div>
                <div className="flex flex-wrap gap-1">
                  <span className="text-[8px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded">
                    TypeScript
                  </span>
                  <span className="text-[8px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded">
                    React
                  </span>
                  <span className="text-[8px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded">
                    Node.js
                  </span>
                  <span className="text-[8px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded">
                    AWS
                  </span>
                  <span className="text-[8px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded">
                    Docker
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[9px] text-slate-500">
                <span className="text-emerald-600 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  94% ATS Ready
                </span>
                <span>Selectable Vector Text</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white border-y border-slate-200 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              How Smart CV Builder Works
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Three simple steps to craft a recruiter-ready CV without setting up any account.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center text-sm shadow-md shadow-blue-500/20">
                1
              </div>
              <h3 className="text-base font-bold text-slate-900">Enter Your Information</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Add your experience, education, skills, and projects into guided forms. Toggle sections on or off as needed.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center text-sm shadow-md shadow-blue-500/20">
                2
              </div>
              <h3 className="text-base font-bold text-slate-900">Choose Your Template</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Switch instantly between five ATS-compliant designs without retyping or losing any of your data.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center text-sm shadow-md shadow-blue-500/20">
                3
              </div>
              <h3 className="text-base font-bold text-slate-900">Download Your PDF</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Export a clean, text-based A4 vector PDF directly from your browser. High-resolution and machine-readable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Template Showcase */}
      <section id="templates" className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            ATS-Tested Professional Templates
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Each template adheres to standard font hierarchies, clean bullet formatting, and single-column ATS reading orders.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((tpl) => (
            <div
              key={tpl.id}
              className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:border-blue-300 transition-all space-y-5"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full border border-blue-100">
                    {tpl.badge}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900">{tpl.name}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{tpl.description}</p>
                <div className="space-y-1.5 pt-2">
                  {tpl.highlights.map((h, i) => (
                    <div key={i} className="text-[11px] text-slate-600 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => onSelectTemplate(tpl.id)}
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
              >
                <span>Use {tpl.name}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-slate-100/60 border-t border-slate-200 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Engineered for Modern Job Seekers
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Everything you need to create compelling resumes without annoying signups or paywalls.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-2">
              <Eye className="w-5 h-5 text-blue-600" />
              <h4 className="text-sm font-bold text-slate-900">Live CV Preview</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Instant real-time preview updates as you type with realistic A4 dimensions and zoom controls.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <h4 className="text-sm font-bold text-slate-900">ATS-Friendly Formatting</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Standard headers, machine-readable date structures, and selectable vector typography.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-2">
              <Layers className="w-5 h-5 text-indigo-600" />
              <h4 className="text-sm font-bold text-slate-900">Optional Sections</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Add only what you need: Volunteer, Certifications, Awards, Languages, or Custom sections.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-2">
              <Lock className="w-5 h-5 text-blue-600" />
              <h4 className="text-sm font-bold text-slate-900">Privacy-Focused</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Zero tracking, no login credentials, and no CV information uploaded to any server.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-10 text-center space-y-5 shadow-xl">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Ready to Build Your Professional CV?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Start creating right now in your browser. No credit card, no email registration, completely private.
          </p>
          <button
            onClick={onCreateCv}
            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold px-7 py-3 rounded-xl text-sm shadow-lg shadow-blue-500/25 transition-all cursor-pointer"
          >
            <span>Create Your CV Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
