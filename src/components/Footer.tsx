import React from 'react';
import { ShieldCheck, HardDrive, Lock } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: 'home' | 'builder' | 'templates' | 'my-cvs' | 'privacy') => void;
  onOpenPrivacyNotice: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenPrivacyNotice,
}) => {
  return (
    <footer className="no-print bg-white border-t border-slate-200 mt-auto py-10 px-4 sm:px-6 lg:px-8 text-slate-600 text-xs">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & Tagline */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
              <div className="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-blue-400" />
              </div>
              <span>Smart CV Builder</span>
            </div>
            <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
              Build Your CV. Keep Your Privacy. A privacy-focused online resume tool that saves your data locally in your browser—no login, signup, or server storage required.
            </p>
            <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-500">
              <HardDrive className="w-3.5 h-3.5 text-blue-600" />
              <span>100% Client-Side Browser Storage</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-blue-600 transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('builder')}
                  className="hover:text-blue-600 transition-colors"
                >
                  Create CV
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('templates')}
                  className="hover:text-blue-600 transition-colors"
                >
                  Templates
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('my-cvs')}
                  className="hover:text-blue-600 transition-colors"
                >
                  My Saved CVs
                </button>
              </li>
            </ul>
          </div>

          {/* Privacy & Legal */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Privacy & Trust</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('privacy')}
                  className="hover:text-blue-600 transition-colors"
                >
                  Privacy Policy & Storage
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenPrivacyNotice}
                  className="hover:text-blue-600 transition-colors flex items-center gap-1"
                >
                  <Lock className="w-3 h-3 text-blue-600" />
                  <span>View Privacy Notice</span>
                </button>
              </li>
              <li>
                <span className="text-slate-400 text-[11px]">
                  ATS compatibility varies by recruitment platform.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} Smart CV Builder. All rights reserved.
          </div>
          <div>
            Privacy-First Architecture • Text-Based Vector PDF Export
          </div>
        </div>
      </div>
    </footer>
  );
};
