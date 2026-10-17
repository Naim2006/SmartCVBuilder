import React, { useState } from 'react';
import type { TemplateType } from '../../types/cv';
import {
  CheckCircle2,
  ArrowRight,
  Eye,
  Lock,
  Layers,
  Sparkles,
  TrendingUp,
  Search,
  FileCode,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Zap,
  Star,
  XCircle,
  Copy,
  Check,
  ShieldCheck,
  Download,
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
  // Interactive Template Selector for the Hero Mockup
  const [heroTemplate, setHeroTemplate] = useState<TemplateType>('modern');

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const templates: {
    id: TemplateType;
    name: string;
    description: string;
    badge: string;
    bestFor: string;
    highlights: string[];
  }[] = [
    {
      id: 'classic',
      name: 'Classic ATS',
      description: 'Single-column traditional layout with high contrast lines and clear section headers. Highest parsing success rate across enterprise ATS.',
      badge: 'Harvard / Ivy Standard',
      bestFor: 'Finance, Law, Government & Corporate',
      highlights: ['Single-column sequential flow', 'Universal font standard', 'Clean horizontal rule dividers'],
    },
    {
      id: 'modern',
      name: 'Modern Professional',
      description: 'Clean typography, strong visual hierarchy, and subtle color accents. Perfect for corporate, business, and tech roles.',
      badge: 'Recruiter Favorite',
      bestFor: 'Tech, Marketing, Consulting & Startups',
      highlights: ['Accent borders & metadata alignment', 'Categorized skills matrix', 'Balanced visual density'],
    },
    {
      id: 'compact',
      name: 'Compact ATS',
      description: 'Space-optimized layout with streamlined margins designed to fit dense experience into a single pristine page.',
      badge: 'Strict 1-Page Fit',
      bestFor: 'Experienced Pros & Dense Profiles',
      highlights: ['Optimized margins & tight line height', 'Zero wasted space', 'Structured multi-column skills'],
    },
    {
      id: 'executive',
      name: 'Executive Leadership',
      description: 'Refined serif typography and authoritative layout emphasizing senior leadership milestones and strategic impact.',
      badge: 'Senior & C-Suite',
      bestFor: 'Directors, Executives & Senior Managers',
      highlights: ['Executive serif typography', 'Leadership milestone emphasis', 'Strategic career summary'],
    },
    {
      id: 'developer',
      name: 'Developer Tech CV',
      description: 'Designed specifically for Software Engineers and IT specialists with technical arsenal upfront and emphasized project links.',
      badge: 'Engineering & IT',
      bestFor: 'Full-Stack, DevOps & Data Engineers',
      highlights: ['Technical skills matrix upfront', 'GitHub & Live Demo repository links', 'Clean monospace hints'],
    },
  ];

  const faqs = [
    {
      question: 'What actually makes a CV "ATS-friendly"?',
      answer:
        'Applicant Tracking Systems (like Workday, Taleo, Greenhouse, and Lever) parse CVs using algorithmic text extraction. Many graphic CVs with multiple columns, icons, tables, text-boxes, or rasterized images fail because the parser cannot determine reading order or extract words. Smart CV Builder generates strictly single-column, semantic hierarchy documents exported as high-resolution selectable vector text PDFs that ATS parsers extract with 100% fidelity.',
    },
    {
      question: 'Is Smart CV Builder really 100% free with no paywall on download?',
      answer:
        'Yes, absolutely. Unlike many online resume builders that let you write your CV and then demand $1.99 or a monthly subscription when you click download, Smart CV Builder allows you to download clean, high-resolution vector PDFs and plain-text files completely free with zero watermarks.',
    },
    {
      question: 'How do you protect my personal data if there are no user accounts?',
      answer:
        'All your personal data, work history, and custom drafts are saved exclusively in your browser’s local storage (localStorage). Nothing is ever sent to a remote server, external cloud database, or third-party AI tracking service. Your data stays entirely on your device.',
    },
    {
      question: 'Can I switch templates later without losing my written content?',
      answer:
        'Yes! All 5 templates share the same underlying data structure. You can switch between Classic, Modern, Developer, Executive, and Compact at any moment in the editor, and your content adapts immediately with zero re-typing.',
    },
    {
      question: 'What if I need to move to another computer or browser?',
      answer:
        'Smart CV Builder includes a 1-click "Export JSON Backup" feature. You can save your encrypted/clean resume data to an offline JSON file and import it anytime onto any device or browser with zero data loss.',
    },
  ];

  return (
    <div className="relative overflow-hidden space-y-20 sm:space-y-28 py-6 sm:py-10">
      {/* Background Decorative Ambient Lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[550px] pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[750px] h-[400px] bg-gradient-to-tr from-blue-500/15 via-indigo-500/15 to-cyan-400/10 blur-[110px] rounded-full" />
        <div className="absolute top-[200px] right-[10%] w-[350px] h-[300px] bg-sky-400/10 blur-[90px] rounded-full" />
      </div>

      {/* ========================================================================= */}
      {/* 1. HERO SECTION */}
      {/* ========================================================================= */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline, Value Props & Actions */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 bg-white/90 border border-blue-200 shadow-xs px-3.5 py-1.5 rounded-full text-xs font-semibold text-blue-800 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>100% Free • Privacy-First • No Login Required</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
              Build an <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">ATS-Friendly CV</span> That Lands Interviews.
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
              Create a recruiter-approved, machine-readable resume in minutes. Get real-time ATS scoring, keyword gap analysis, and instant vector PDF downloads — with complete privacy.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <button
                onClick={onCreateCv}
                className="group inline-flex items-center justify-center gap-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold px-7 py-3.5 rounded-xl text-sm shadow-lg shadow-slate-900/15 hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-0.5"
              >
                <span>Create My Free CV</span>
                <ArrowRight className="w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#templates"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-semibold px-6 py-3.5 rounded-xl text-sm shadow-xs transition-all hover:border-slate-300"
              >
                <Layers className="w-4 h-4 text-blue-600" />
                <span>Explore 5 Templates</span>
              </a>
            </div>

            {/* 4 Trust & Guarantee Indicators */}
            <div className="pt-6 border-t border-slate-200/90 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span className="font-medium text-slate-800">Zero Sign-Up Required</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span className="font-medium text-slate-800">100% Local Storage</span>
              </div>
              <div className="flex items-center gap-2">
                <Download className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span className="font-medium text-slate-800">Crisp Vector A4 PDF</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span className="font-medium text-slate-800">Real-Time ATS Checker</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span className="font-medium text-slate-800">Job Keyword Matcher</span>
              </div>
              <div
                onClick={onOpenPrivacy}
                className={`flex items-center gap-2 ${onOpenPrivacy ? 'cursor-pointer hover:text-blue-600' : ''}`}
                title="Read our client-side privacy policy"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span className="font-medium text-slate-800 underline decoration-dotted">Zero Cloud Tracking</span>
              </div>
            </div>
          </div>

          {/* Right Column: Realistic Interactive CV Mockup with Dynamic Template Switcher */}
          <div className="lg:col-span-5 flex justify-center relative">
            {/* Ambient Backlight for Mockup */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 blur-2xl rounded-3xl -z-10 transform -rotate-1 scale-95" />

            {/* Main Interactive Resume Preview Card */}
            <div className="w-full max-w-[420px] bg-white rounded-2xl shadow-2xl border border-slate-200/90 overflow-hidden space-y-0 transition-all select-none">
              {/* Mockup Top Header / Switcher Bar */}
              <div className="bg-slate-900 text-white px-4 py-2.5 flex items-center justify-between border-b border-slate-800">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  <span className="ml-2 text-[10px] font-mono text-slate-400">Live Preview Engine</span>
                </div>
                <span className="text-[10px] bg-blue-600/30 text-blue-300 font-semibold px-2 py-0.5 rounded border border-blue-500/30">
                  A4 High-Res
                </span>
              </div>

              {/* Template Quick Preview Switcher Buttons */}
              <div className="bg-slate-50 px-3 py-2 border-b border-slate-200 flex items-center justify-between gap-1 overflow-x-auto text-[10px]">
                <span className="text-slate-400 font-medium whitespace-nowrap pl-1">Style:</span>
                <div className="flex items-center gap-1">
                  {(['classic', 'modern', 'developer', 'executive', 'compact'] as TemplateType[]).map((t) => (
                    <button
                      key={t}
                      onClick={() => setHeroTemplate(t)}
                      className={`px-2 py-1 rounded capitalize font-semibold transition-all cursor-pointer ${
                        heroTemplate === t
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Resume Body Mockup Content */}
              <div className={`p-5 sm:p-6 space-y-4 bg-white text-slate-900 ${
                heroTemplate === 'executive' ? 'font-serif' : heroTemplate === 'developer' ? 'font-sans' : ''
              }`}>
                {/* Header Section */}
                <div className={`pb-3 ${
                  heroTemplate === 'classic'
                    ? 'border-b-2 border-slate-900 text-center'
                    : heroTemplate === 'modern'
                    ? 'border-l-4 border-blue-600 pl-3'
                    : heroTemplate === 'developer'
                    ? 'border-b border-slate-200'
                    : heroTemplate === 'executive'
                    ? 'border-b-2 border-amber-800/40 text-center'
                    : 'border-b border-slate-200 pb-2'
                }`}>
                  <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
                    ALEX MORGAN
                  </h3>
                  <p className="text-[11px] font-semibold text-blue-600">
                    Lead Full-Stack Software Engineer
                  </p>
                  <div className="text-[9px] text-slate-500 flex flex-wrap gap-2 mt-1">
                    <span>San Francisco, CA</span>
                    <span>•</span>
                    <span>alex.morgan@email.com</span>
                    <span>•</span>
                    <span>github.com/alexmorgan</span>
                  </div>
                </div>

                {/* Professional Summary */}
                <div className="space-y-1">
                  <div className="text-[9px] font-bold text-slate-700 uppercase tracking-wider flex items-center justify-between">
                    <span>Professional Summary</span>
                    <span className="text-[8px] text-emerald-600 font-semibold lowercase">ATS Verified ✓</span>
                  </div>
                  <p className="text-[10px] text-slate-600 leading-relaxed">
                    Results-driven Lead Engineer with 6+ years orchestrating scalable cloud architectures, React ecosystems, and distributed microservices for enterprise SaaS products.
                  </p>
                </div>

                {/* Experience Item */}
                <div className="space-y-1.5">
                  <div className="text-[9px] font-bold text-slate-700 uppercase tracking-wider">
                    Experience
                  </div>
                  <div>
                    <div className="flex justify-between items-baseline text-[10px] font-bold text-slate-800">
                      <span>Senior Staff Engineer — CloudCorp Inc.</span>
                      <span className="text-[9px] font-normal text-slate-500">2021 – Present</span>
                    </div>
                    <ul className="list-disc list-inside text-[9.5px] text-slate-600 space-y-0.5 mt-0.5">
                      <li>Architected high-throughput microservices handling 12M+ daily requests.</li>
                      <li>Reduced page load latency by 42% through code-splitting & CDN optimization.</li>
                      <li>Mentored team of 8 engineers and introduced automated CI/CD pipelines.</li>
                    </ul>
                  </div>
                </div>

                {/* Technical Skills Arsenal */}
                <div className="space-y-1.5">
                  <div className="text-[9px] font-bold text-slate-700 uppercase tracking-wider">
                    Core Technical Skills
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {['TypeScript', 'React.js', 'Next.js', 'Node.js', 'AWS', 'Docker', 'PostgreSQL', 'GraphQL'].map(
                      (skill) => (
                        <span
                          key={skill}
                          className="text-[8.5px] font-medium bg-slate-100 text-slate-800 px-2 py-0.5 rounded border border-slate-200/60"
                        >
                          {skill}
                        </span>
                      )
                    )}
                  </div>
                </div>

                {/* Floating Micro-Badge: 96% ATS Score */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full text-[10px] font-bold text-emerald-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>ATS Score: 96 / 100 (Pass)</span>
                  </div>
                  <span className="text-[9px] text-slate-400 font-mono">
                    Single-Column Flow
                  </span>
                </div>
              </div>

              {/* Bottom Quick-Start Button in Mockup */}
              <div className="p-3 bg-slate-50 border-t border-slate-200">
                <button
                  onClick={() => onSelectTemplate(heroTemplate)}
                  className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <span>Start with this {heroTemplate} design</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. THE ATS REALITY CHECK: WHY GRAPHIC RESUMES FAIL */}
      {/* ========================================================================= */}
      <section className="bg-gradient-to-b from-white via-slate-50/80 to-white border-y border-slate-200/80 py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>ATS Technical Standards</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Why 75% of Well-Qualified Resumes Get Rejected by ATS
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Recruiters use Applicant Tracking Systems (Workday, Taleo, Greenhouse) that scrape raw text. Fancy Canva graphics, multi-column tables, and image PDFs scramble the parser and drop your application.
            </p>
          </div>

          {/* Comparison Cards: The Wrong Way vs The Smart CV Builder Way */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* The Wrong Way */}
            <div className="bg-white border-2 border-rose-200/90 rounded-2xl p-6 sm:p-8 space-y-5 shadow-xs relative">
              <div className="flex items-center justify-between pb-4 border-b border-rose-100">
                <div className="flex items-center gap-2">
                  <XCircle className="w-6 h-6 text-rose-500" />
                  <h3 className="text-base font-bold text-slate-900">Traditional Graphic / Canva Resumes</h3>
                </div>
                <span className="text-[10px] font-bold bg-rose-50 text-rose-700 px-2 py-0.5 rounded border border-rose-200">
                  High Rejection Risk
                </span>
              </div>

              <ul className="space-y-3 text-xs text-slate-600">
                <li className="flex items-start gap-2.5">
                  <XCircle className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Multi-column sidebars:</strong> ATS reading order scans left-to-right, mixing job titles with sidebar skills into unreadable gibberish.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <XCircle className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Non-standard section titles:</strong> Creative headers like "What I'm Good At" fail to be recognized as Experience or Skills.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <XCircle className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Icons & Graphic Skill Bars:</strong> 5-star ratings or skill progress bars cannot be indexed by parsers, resulting in 0 detected skills.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <XCircle className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Rasterized PDF / Paywalls:</strong> Heavy image PDFs cannot be indexed, and other builders demand a credit card right at download.</span>
                </li>
              </ul>
            </div>

            {/* The Smart CV Builder Way */}
            <div className="bg-white border-2 border-emerald-400/90 rounded-2xl p-6 sm:p-8 space-y-5 shadow-md relative ring-4 ring-emerald-50">
              <div className="flex items-center justify-between pb-4 border-b border-emerald-100">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                  <h3 className="text-base font-bold text-slate-900">Smart CV Builder Architecture</h3>
                </div>
                <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-200">
                  100% ATS Verified
                </span>
              </div>

              <ul className="space-y-3 text-xs text-slate-600">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Strict single-column reading hierarchy:</strong> Every parser reads your contact info, experience, and education in the exact sequence intended.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Semantic Section Recognition:</strong> Standard headers mapped directly to Workday and Taleo taxonomy filters.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Machine-Readable Text & Dates:</strong> Normalized date formats and clean comma-separated skill lists parsed automatically.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Selectable Vector A4 PDF:</strong> Crisp text layer that you can highlight, copy, and search, plus plain-text (.txt) export.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. HOW IT WORKS: 3 EFFORTLESS STEPS */}
      {/* ========================================================================= */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full">
            <Zap className="w-3.5 h-3.5 text-indigo-600" />
            <span>Simple & Streamlined</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            How Smart CV Builder Works
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            From blank slate to job application in three simple steps — zero account required.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Step 1 */}
          <div className="bg-white border border-slate-200/90 hover:border-blue-300 rounded-2xl p-6 sm:p-7 space-y-4 shadow-sm hover:shadow-md transition-all group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-bold flex items-center justify-center text-lg shadow-md shadow-blue-500/25 group-hover:scale-105 transition-transform">
              1
            </div>
            <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
              Enter or Load Information
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Use our modular forms to enter your experience, education, skills, and projects. Use the built-in Action Verbs guide to strengthen your impact.
            </p>
            <div className="pt-2 flex items-center gap-2 text-[11px] font-semibold text-blue-600">
              <span>Smart character counter included</span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white border border-slate-200/90 hover:border-blue-300 rounded-2xl p-6 sm:p-7 space-y-4 shadow-sm hover:shadow-md transition-all group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-bold flex items-center justify-center text-lg shadow-md shadow-blue-500/25 group-hover:scale-105 transition-transform">
              2
            </div>
            <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
              Live ATS & Keyword Audit
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Watch your live ATS score (0-100) update instantly. Paste a target job description to match missing skills and keywords before applying.
            </p>
            <div className="pt-2 flex items-center gap-2 text-[11px] font-semibold text-emerald-600">
              <span>Rule-based quality checker</span>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white border border-slate-200/90 hover:border-blue-300 rounded-2xl p-6 sm:p-7 space-y-4 shadow-sm hover:shadow-md transition-all group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-bold flex items-center justify-center text-lg shadow-md shadow-blue-500/25 group-hover:scale-105 transition-transform">
              3
            </div>
            <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
              Download Vector PDF & .TXT
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Export an A4 vector PDF directly from your browser engine or grab an ATS-clean plain-text (.txt) version for older job application portals.
            </p>
            <div className="pt-2 flex items-center gap-2 text-[11px] font-semibold text-indigo-600">
              <span>No watermarks • 100% free</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. TEMPLATE SHOWCASE */}
      {/* ========================================================================= */}
      <section id="templates" className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
            <Layers className="w-3.5 h-3.5 text-blue-600" />
            <span>Recruiter-Approved Layouts</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            5 Professional, ATS-Optimized Templates
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Each template is engineered for high contrast, clean hierarchy, and flawless text parsing. Switch anytime with a single click.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((tpl) => (
            <div
              key={tpl.id}
              className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs flex flex-col justify-between hover:border-blue-400 hover:shadow-lg transition-all group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold bg-blue-50 text-blue-700 px-3 py-1 rounded-full border border-blue-100">
                    {tpl.badge}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 uppercase">
                    ATS Safe
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {tpl.name}
                  </h3>
                  <p className="text-[11px] text-blue-700 font-medium mt-0.5">
                    Best for: {tpl.bestFor}
                  </p>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {tpl.description}
                </p>

                {/* Highlights */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  {tpl.highlights.map((h, i) => (
                    <div key={i} className="text-[11px] text-slate-600 flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => onSelectTemplate(tpl.id)}
                  className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm group-hover:bg-blue-600"
                >
                  <span>Use {tpl.name}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}

          {/* Quick Customization Card */}
          <div className="bg-gradient-to-br from-blue-900 to-indigo-950 text-white rounded-2xl p-6 flex flex-col justify-between shadow-md">
            <div className="space-y-3">
              <span className="text-[11px] font-bold bg-white/10 text-blue-200 px-3 py-1 rounded-full border border-white/10 inline-block">
                Infinite Flexibility
              </span>
              <h3 className="text-lg font-bold">Custom Layout Controls</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Need more control? You can customize font sizes (compact, standard, relaxed), margin spacing, primary accent colors, and toggle any section on or off in real-time.
              </p>
              <div className="space-y-1.5 pt-2 text-[11px] text-slate-300">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-blue-400" />
                  <span>Custom section names</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-blue-400" />
                  <span>Toggle profile photo on/off</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-blue-400" />
                  <span>A4 print-ready vector styles</span>
                </div>
              </div>
            </div>

            <button
              onClick={onCreateCv}
              className="mt-6 w-full py-2.5 bg-white text-slate-900 hover:bg-slate-100 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <span>Open Builder</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-900" />
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. FEATURE BENTO GRID */}
      {/* ========================================================================= */}
      <section className="bg-slate-50 border-t border-slate-200/90 py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1.5 bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
              <Star className="w-3.5 h-3.5 text-blue-600" />
              <span>Full Suite Features</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Engineered for Modern Job Seekers
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Everything you need to craft high-impact resumes without paying monthly subscriptions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3 shadow-xs hover:border-blue-300 transition-all">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Eye className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">Live WYSIWYG A4 Preview</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Watch your CV update live with realistic A4 dimensions, responsive mobile tabs, and zoom controls. What you see is exactly what prints.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3 shadow-xs hover:border-blue-300 transition-all">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">Real-Time ATS Scoring (0-100)</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Immediate score feedback across contact details, summary length, metrics, and action verbs with celebration confetti when you hit 90%+.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3 shadow-xs hover:border-blue-300 transition-all">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Search className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">Job Description Keyword Gap Matcher</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Paste any job vacancy text to discover high-priority keyword matches and missing terms, allowing you to tailor your resume for specific openings.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3 shadow-xs hover:border-blue-300 transition-all">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <Copy className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">Multi-CV Management</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Create multiple versions of your resume for different roles (e.g. Frontend, Fullstack, Manager). Duplicate, rename, and switch effortlessly.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3 shadow-xs hover:border-blue-300 transition-all">
              <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
                <Lock className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">100% Client-Side Privacy</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                No passwords, no databases, no personal details uploaded to cloud servers. Your sensitive contact and career history stays in your browser.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3 shadow-xs hover:border-blue-300 transition-all">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <FileCode className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">Offline JSON & Plain-Text (.txt)</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Export and import offline JSON backups to migrate between computers, plus generate clean plain-text for legacy corporate application portals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. FAQ ACCORDION SECTION */}
      {/* ========================================================================= */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
            <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Clear, honest answers about our ATS compliance, privacy policy, and file downloads.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-xl overflow-hidden transition-all shadow-xs"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-bold text-sm text-slate-900 hover:text-blue-600 transition-colors cursor-pointer"
                >
                  <span>{faq.question}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. HIGH-CONVERTING BOTTOM CALL TO ACTION */}
      {/* ========================================================================= */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="relative overflow-hidden bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 text-white rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-2xl border border-slate-800">
          {/* Subtle Ambient Radial Light */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-blue-500/10 blur-[80px] pointer-events-none rounded-full" />

          <div className="relative space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
              No Sign-Up • Instant Vector PDF • 100% Free
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Ready to Land More Job Interviews?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Create an ATS-proof, recruiter-approved resume in just a few clicks. Your dream career is only one great CV away.
            </p>
          </div>

          <div className="relative flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={onCreateCv}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-3.5 rounded-xl text-sm shadow-lg shadow-blue-600/30 transition-all cursor-pointer transform hover:-translate-y-0.5"
            >
              <span>Build My CV Right Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="#templates"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold px-6 py-3.5 rounded-xl text-sm transition-colors"
            >
              <span>View Templates</span>
            </a>
          </div>

          <p className="text-[11px] text-slate-400">
            Backed by Harvard & Ivy Single-Column Parsing Guidelines • Zero Cloud Tracking
          </p>
        </div>
      </section>
    </div>
  );
};
