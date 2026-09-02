/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Menu, X, ChevronDown, User, Award, Calendar, Volume2, Shield } from 'lucide-react';

interface NavbarProps {
  currentView: string;
  subView: string;
  onNavigate: (view: string, subView?: string) => void;
  isAdmin: boolean;
  onToggleAdmin: () => void;
  isLoggedIn: boolean;
  onLogout: () => void;
}

export default function Navbar({
  currentView,
  subView,
  onNavigate,
  isAdmin,
  onToggleAdmin,
  isLoggedIn,
  onLogout
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleNavClick = (view: string, sub?: string) => {
    onNavigate(view, sub || '');
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  const menuStructure = [
    {
      id: 'about',
      label: 'ABOUT',
      items: [
        { label: 'About 40Under40 Nigeria', sub: 'about-us' },
        { label: 'Our Story & Milestones', sub: 'our-story' },
        { label: 'Meet the Founder', sub: 'founder' },
        { label: 'Advisory Board', sub: 'board' },
        { label: 'Management & Team', sub: 'team' }
      ]
    },
    {
      id: 'events',
      label: 'EVENTS',
      items: [
        { label: 'TIME Conference (April)', sub: 'time-conference' },
        { label: '40Under40 Gala Night (August)', sub: 'gala-night' },
        { label: '100 Persons of the Year (December)', sub: 'persons-of-the-year' }
      ]
    },
    {
      id: 'awards',
      label: '40UNDER40',
      items: [
        { label: 'Nominate a Young Leader', sub: 'nominate' },
        { label: 'Award Categories & Vetting', sub: 'categories' },
        { label: 'Transparent Selection Process', sub: 'selection-process' },
        { label: 'Hall of Fame Database', sub: 'hall-of-fame' }
      ]
    },
    {
      id: 'media',
      label: 'MEDIA',
      items: [
        { label: 'Ecosystem News', sub: 'news' },
        { label: 'Official Press Releases', sub: 'press-releases' },
        { label: 'Media Gallery', sub: 'gallery' },
        { label: 'Event Videos', sub: 'video-hub' }
      ]
    },
    {
      id: 'community',
      label: 'COMMUNITY',
      items: [
        { label: 'Join the Community', sub: 'join' },
        { label: 'Become a Partner', sub: 'partner' },
        { label: 'Volunteer Application', sub: 'volunteer' },
        { label: 'Media Accreditation', sub: 'accreditation' }
      ]
    }
  ];

  return (
    <header id="main-header" className="sticky top-0 z-40 bg-slate-950/20 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Brand Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleNavClick('home')}>
            <span className="text-xl font-display font-extrabold tracking-tighter flex items-center gap-1">
              <span className="text-[#E50914]">40</span>
              <span className="text-slate-100 font-light">UNDER</span>
              <span className="text-[#E50914]">40</span>
            </span>
            <div className="hidden sm:block h-6 w-[1px] bg-white/10"></div>
            <span className="hidden sm:inline-block text-[10px] tracking-[0.25em] text-slate-400 font-display font-medium">
              NIGERIA
            </span>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center space-x-1">
            <button
              onClick={() => handleNavClick('home')}
              className={`px-4 py-2 text-xs font-display font-semibold tracking-wider transition-colors hover:text-indigo-300 ${
                currentView === 'home' ? 'text-indigo-400 font-bold' : 'text-slate-300'
              }`}
            >
              HOME
            </button>

            {menuStructure.map((menu) => (
              <div
                key={menu.id}
                className="relative"
                onMouseEnter={() => setActiveDropdown(menu.id)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  className={`flex items-center gap-1.5 px-4 py-2 text-xs font-display font-semibold tracking-wider transition-colors hover:text-indigo-300 ${
                    currentView === menu.id ? 'text-indigo-400 font-bold' : 'text-slate-300'
                  }`}
                >
                  {menu.label}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === menu.id ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Card */}
                {activeDropdown === menu.id && (
                  <div className="absolute left-0 mt-0 w-64 glass shadow-xl shadow-black/40 rounded-xl py-2 z-50 animate-fade-in bg-slate-900/40 backdrop-blur-xl">
                    {menu.items.map((item) => (
                      <button
                        key={item.sub}
                        onClick={() => handleNavClick(menu.id, item.sub)}
                        className={`w-full text-left px-5 py-2.5 text-xs font-body font-medium transition-colors hover:bg-white/5 hover:text-indigo-300 ${
                          subView === item.sub ? 'text-indigo-400 bg-white/5 font-semibold' : 'text-slate-300'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <button
              onClick={() => handleNavClick('contact')}
              className={`px-4 py-2 text-xs font-display font-semibold tracking-wider transition-colors hover:text-indigo-300 ${
                currentView === 'contact' ? 'text-indigo-400 font-bold' : 'text-slate-300'
              }`}
            >
              CONTACT
            </button>
          </nav>

          {/* CTAs / Portal Actions */}
          <div className="hidden sm:flex items-center space-x-3">
            {/* Quick Demo Staff Panel Toggle (very neat way to demo everything!) */}
            <button
              onClick={onToggleAdmin}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[10px] tracking-wider font-display font-semibold transition-all ${
                isAdmin
                  ? 'bg-indigo-500/20 border-indigo-500/40 text-indigo-300'
                  : 'glass glass-hover text-slate-300'
              }`}
              title="Toggle Institutional CMS/Scanner Console"
            >
              <Shield className="w-3.5 h-3.5 text-indigo-400" />
              {isAdmin ? 'ADMIN ACTIVE' : 'ADMIN BOARD'}
            </button>

            {isLoggedIn ? (
              <div className="flex items-center gap-2 glass py-1.5 px-3 rounded-full bg-slate-900/10">
                <button
                  onClick={() => handleNavClick('community', 'portal')}
                  className="text-xs font-display font-semibold tracking-wider text-slate-100 flex items-center gap-1 hover:text-indigo-300"
                >
                  <User className="w-3.5 h-3.5 text-indigo-400" />
                  MY PORTAL
                </button>
                <span className="text-white/10">|</span>
                <button onClick={onLogout} className="text-[10px] text-slate-400 hover:text-pink-400 uppercase font-display font-semibold">
                  Log Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleNavClick('community', 'portal')}
                className="glass glass-hover text-slate-200 font-display font-semibold text-xs tracking-wider px-4 py-2 rounded-full transition-all"
              >
                MEMBER LOGIN
              </button>
            )}

            <button
              onClick={() => handleNavClick('awards', 'nominate')}
              className="bg-[#E50914] hover:bg-red-700 text-white font-display font-semibold text-xs tracking-wider px-5 py-2 rounded-full transition-all active:scale-95 shadow-lg shadow-red-600/20"
            >
              NOMINATE NOW
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden space-x-2">
            <button
              onClick={onToggleAdmin}
              className={`p-1.5 rounded-full border text-[10px] tracking-wider font-display font-semibold transition-all ${
                isAdmin ? 'bg-indigo-500/20 border-indigo-500/40 text-indigo-300' : 'glass'
              }`}
            >
              <Shield className="w-3.5 h-3.5 text-indigo-400" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-300 hover:text-white p-2"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Full Screen Animated Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-20 glass bg-slate-950/95 backdrop-blur-2xl border-b border-white/10 z-30 max-h-[calc(100vh-80px)] overflow-y-auto">
          <div className="px-4 pt-4 pb-6 space-y-6">
            
            <button
              onClick={() => handleNavClick('home')}
              className="block w-full text-left text-sm font-display font-bold text-slate-100 py-2 border-b border-white/5 hover:text-indigo-300"
            >
              HOME PAGE
            </button>

            {menuStructure.map((menu) => (
              <div key={menu.id} className="space-y-1">
                <p className="text-[10px] font-display tracking-[0.2em] text-indigo-400 font-bold">{menu.label}</p>
                <div className="pl-2 border-l border-white/10 space-y-2 mt-1">
                  {menu.items.map((item) => (
                    <button
                      key={item.sub}
                      onClick={() => handleNavClick(menu.id, item.sub)}
                      className={`block w-full text-left text-xs font-body py-1.5 transition-colors ${
                        subView === item.sub ? 'text-indigo-400 font-bold' : 'text-slate-400 hover:text-slate-100'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            <button
              onClick={() => handleNavClick('contact')}
              className="block w-full text-left text-sm font-display font-bold text-slate-100 py-2 border-b border-white/5 hover:text-indigo-300"
            >
              CONTACT DIRECT
            </button>

            <div className="pt-4 flex flex-col gap-3 border-t border-white/10">
              {isLoggedIn ? (
                <button
                  onClick={() => handleNavClick('community', 'portal')}
                  className="w-full text-center glass py-3 text-xs font-display font-bold tracking-wider rounded-full text-slate-100"
                >
                  MY PORTAL
                </button>
              ) : (
                <button
                  onClick={() => handleNavClick('community', 'portal')}
                  className="w-full text-center glass py-3 text-xs font-display font-bold tracking-wider rounded-full text-slate-100"
                >
                  MEMBER LOGIN
                </button>
              )}

              <button
                onClick={() => handleNavClick('awards', 'nominate')}
                className="w-full text-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-3 text-xs font-display font-bold tracking-wider rounded-full text-white shadow-lg"
              >
                NOMINATE A CANDIDATE
              </button>
            </div>

          </div>
        </div>
      )}
    </header>
  );
}
