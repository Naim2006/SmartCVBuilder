import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Menu,
  X,
  Plus,
  Printer,
} from 'lucide-react';

interface NavbarProps {
  currentView: 'home' | 'builder' | 'templates' | 'my-cvs' | 'privacy';
  onNavigate: (view: 'home' | 'builder' | 'templates' | 'my-cvs' | 'privacy') => void;
  saveStatusText?: string;
  onPrintPdf?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  saveStatusText = 'Saved in this browser',
  onPrintPdf,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: 'home' | 'builder' | 'templates' | 'my-cvs' | 'privacy'; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'builder', label: 'Create CV' },
    { id: 'templates', label: 'Templates' },
    { id: 'my-cvs', label: 'My CVs' },
    { id: 'privacy', label: 'Privacy' },
  ];

  const handleNavClick = (view: 'home' | 'builder' | 'templates' | 'my-cvs' | 'privacy') => {
    onNavigate(view);
    setMobileMenuOpen(false);
  };

  return (
    <header className="no-print bg-white/95 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40 px-4 sm:px-6 lg:px-8 py-3 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none"
        >
          <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-sm group-hover:bg-slate-800 transition-colors">
            <ShieldCheck className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base tracking-tight text-slate-900">
                Smart CV <span className="text-blue-600">Builder</span>
              </span>
            </div>
            <div className="text-[10px] text-slate-500 font-medium hidden sm:block">
              Build Your CV. Keep Your Privacy.
            </div>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 text-xs font-semibold">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  isActive
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right CTA & Storage Status */}
        <div className="hidden sm:flex items-center gap-3">
          {currentView === 'builder' ? (
            <div className="flex items-center gap-2">
              <div className="text-[11px] text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full flex items-center gap-1.5 border border-slate-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>{saveStatusText}</span>
              </div>
              {onPrintPdf && (
                <button
                  onClick={onPrintPdf}
                  className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white px-3.5 py-1.5 rounded-xl text-xs font-semibold shadow-sm transition-colors cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5 text-blue-400" />
                  <span>Download PDF</span>
                </button>
              )}
            </div>
          ) : (
            <button
              onClick={() => handleNavClick('builder')}
              className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-sm transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-blue-400" />
              <span>Create Your CV</span>
            </button>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden flex items-center gap-2">
          {currentView === 'builder' && onPrintPdf && (
            <button
              onClick={onPrintPdf}
              className="p-1.5 bg-slate-900 text-white rounded-lg text-xs"
              title="Download PDF"
            >
              <Printer className="w-4 h-4 text-blue-400" />
            </button>
          )}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden pt-3 pb-2 border-t border-slate-100 mt-2 space-y-1 animate-fadeIn">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-between ${
                  isActive ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span>{item.label}</span>
              </button>
            );
          })}
          <div className="pt-2">
            <button
              onClick={() => handleNavClick('builder')}
              className="w-full py-2 bg-slate-900 text-white text-xs font-bold rounded-xl text-center"
            >
              Create Your CV
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
