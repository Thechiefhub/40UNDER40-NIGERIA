/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { User, ShieldCheck, Ticket, Award, Settings, Bell, LogOut, CheckCircle2, Copy, FileText, Send, Lock } from 'lucide-react';
import { Registration, Nomination, VolunteerApplication, MediaApplication } from '../types';

interface PortalViewProps {
  isLoggedIn: boolean;
  currentUser: any;
  onLogin: (user: any) => void;
  onLogout: () => void;
  onNavigate: (view: string, subView?: string) => void;
}

export default function PortalView({ isLoggedIn, currentUser, onLogin, onLogout, onNavigate }: PortalViewProps) {
  // Login input states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Dashboard Tab state
  const [activeTab, setActiveTab] = useState<'overview' | 'passes' | 'nominations' | 'applications' | 'settings'>('overview');

  // Dynamic state fetched from LocalStorage
  const [myPasses, setMyPasses] = useState<Registration[]>([]);
  const [myNominations, setMyNominations] = useState<Nomination[]>([]);
  const [myVolunteerApps, setMyVolunteerApps] = useState<VolunteerApplication[]>([]);
  const [myMediaApps, setMyMediaApps] = useState<MediaApplication[]>([]);

  // Submissions forms
  const [volApp, setVolApp] = useState({ category: 'Ushering & Protocol', reason: '' });
  const [volSubmitted, setVolSubmitted] = useState(false);

  const [mediaApp, setMediaApp] = useState({ company: '', mediaType: 'Digital Publication', website: '', assignment: '' });
  const [mediaSubmitted, setMediaSubmitted] = useState(false);

  useEffect(() => {
    if (isLoggedIn && currentUser) {
      // Load registrations matching this user email from LocalStorage
      const allRegs = JSON.parse(localStorage.getItem('registrations') || '[]');
      const userRegs = allRegs.filter((r: Registration) => r.email.toLowerCase() === currentUser.email.toLowerCase());
      setMyPasses(userRegs);

      // Load nominations matching this user email
      const allNoms = JSON.parse(localStorage.getItem('nominations') || '[]');
      const userNoms = allNoms.filter((n: Nomination) => n.refereeEmail.toLowerCase() === currentUser.email.toLowerCase());
      setMyNominations(userNoms);

      // Load applications
      const allVol = JSON.parse(localStorage.getItem('volunteers') || '[]');
      const userVol = allVol.filter((v: VolunteerApplication) => v.email.toLowerCase() === currentUser.email.toLowerCase());
      setMyVolunteerApps(userVol);

      const allMedia = JSON.parse(localStorage.getItem('media_accreditations') || '[]');
      const userMedia = allMedia.filter((m: MediaApplication) => m.email.toLowerCase() === currentUser.email.toLowerCase());
      setMyMediaApps(userMedia);
    }
  }, [isLoggedIn, currentUser, volSubmitted, mediaSubmitted]);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setLoginError('Corporate email is required.');
      return;
    }

    // Authenticate and save user session
    const mockUser = {
      name: email.split('@')[0].toUpperCase().replace(/\./g, ' '),
      email: email.toLowerCase(),
      company: 'Apex Digital Group',
      position: 'Managing Director'
    };

    onLogin(mockUser);
    setLoginError('');
  };

  const handleVolunteerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!volApp.reason) return;

    const newVol: VolunteerApplication = {
      id: 'VOL-' + Math.floor(100000 + Math.random() * 900000),
      name: currentUser.name,
      email: currentUser.email,
      phone: '+234 809 100 4040',
      category: volApp.category as any,
      reason: volApp.reason,
      status: 'pending',
      applicationDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    };

    const allVol = JSON.parse(localStorage.getItem('volunteers') || '[]');
    allVol.push(newVol);
    localStorage.setItem('volunteers', JSON.stringify(allVol));

    setVolSubmitted(true);
    setVolApp({ category: 'Ushering & Protocol', reason: '' });
    setTimeout(() => setVolSubmitted(false), 5000);
  };

  const handleMediaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mediaApp.company || !mediaApp.assignment) return;

    const newMedia: MediaApplication = {
      id: 'MED-' + Math.floor(100000 + Math.random() * 900000),
      name: currentUser.name,
      email: currentUser.email,
      phone: '+234 809 100 4040',
      company: mediaApp.company,
      mediaType: mediaApp.mediaType,
      website: mediaApp.website,
      assignment: mediaApp.assignment,
      status: 'pending',
      applicationDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    };

    const allMedia = JSON.parse(localStorage.getItem('media_accreditations') || '[]');
    allMedia.push(newMedia);
    localStorage.setItem('media_accreditations', JSON.stringify(allMedia));

    setMediaSubmitted(true);
    setMediaApp({ company: '', mediaType: 'Digital Publication', website: '', assignment: '' });
    setTimeout(() => setMediaSubmitted(false), 5000);
  };

  if (!isLoggedIn) {
    /* Login Form interface */
    return (
      <div className="max-w-md mx-auto py-16 px-4">
        <div className="bg-[#0a0a0a] border border-neutral-900 p-8 rounded-sm space-y-6 relative overflow-hidden">
          {/* Subtle branding elements */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#8F0008]/5 rounded-full blur-2xl pointer-events-none"></div>

          <div className="text-center space-y-2 border-b border-neutral-950 pb-4">
            <span className="text-[10px] tracking-[0.3em] text-[#E50914] font-display font-bold uppercase">MEMBER LOG-IN</span>
            <h2 className="text-xl font-display font-extrabold text-[#F7F7F5] uppercase tracking-tight">MY 40UNDER40 PORTAL</h2>
            <p className="text-neutral-500 text-[11px] font-body">Access your verified event passes, nomination tracking files, and applications.</p>
          </div>

          {loginError && (
            <div className="p-3 bg-[#E50914]/10 border border-[#E50914]/20 rounded-sm text-xs text-[#E50914]">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-[9px] tracking-widest text-neutral-500 font-display font-bold uppercase mb-1.5">Corporate Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="chieftolulope@gmail.com"
                className="w-full bg-neutral-950 border border-neutral-850 focus:border-[#E50914] text-xs py-2.5 px-3 rounded-sm outline-none text-white"
              />
            </div>

            <div>
              <label className="block text-[9px] tracking-widest text-neutral-500 font-display font-bold uppercase mb-1.5">Ecosystem Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-neutral-950 border border-neutral-850 focus:border-[#E50914] text-xs py-2.5 px-3 rounded-sm outline-none text-white"
              />
            </div>

            <div className="flex items-center gap-1.5 justify-center text-[10px] text-neutral-600 font-display uppercase tracking-wider pt-2">
              <Lock className="w-3.5 h-3.5 text-[#E50914]" />
              <span>SSL Secure Access Tunnel</span>
            </div>

            <button
              type="submit"
              className="w-full bg-[#E50914] hover:bg-[#8F0008] text-white font-display font-bold text-xs uppercase py-3.5 rounded-sm transition-all shadow-lg shadow-[#E50914]/15"
            >
              Sign In to Dashboard
            </button>
          </form>

          <div className="text-center pt-2 border-t border-neutral-950">
            <span className="text-[10px] text-neutral-500 font-body">Don't have an authenticated account? Create one instantly by completing a <strong onClick={() => onNavigate('events', 'time-conference')} className="text-white hover:text-[#E50914] cursor-pointer underline">delegate seat reservation</strong>.</span>
          </div>

        </div>
      </div>
    );
  }

  /* Logged In Dashboard interface */
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-20">
      
      {/* Top Welcome Panel */}
      <div className="bg-[#0a0a0a] border border-neutral-900 p-6 rounded-sm mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="flex gap-4 items-center">
          <div className="w-12 h-12 rounded-full bg-neutral-950 border border-neutral-800 flex items-center justify-center text-white shrink-0">
            <User className="w-6 h-6 text-[#E50914]" />
          </div>
          <div>
            <span className="text-[9px] tracking-widest text-[#E50914] font-display font-bold uppercase block">LAUREATE PORTAL</span>
            <h2 className="text-lg font-display font-extrabold text-white uppercase tracking-tight">WELCOME, {currentUser.name}</h2>
            <p className="text-[11px] text-neutral-500 font-body leading-none mt-1">Authorized Account Coordinates • <span className="text-neutral-400 font-semibold">{currentUser.email}</span></p>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-950 border border-neutral-850 hover:border-[#E50914] text-[10px] font-display font-bold uppercase text-neutral-400 hover:text-white rounded-sm transition-all"
          >
            <LogOut className="w-3.5 h-3.5 text-[#E50914]" />
            LOG OUT
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side Tab Navigation */}
        <div className="lg:col-span-3 bg-[#0a0a0a] border border-neutral-900 p-4 rounded-sm space-y-1 h-fit">
          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full text-left px-4 py-3 text-xs font-display font-bold uppercase tracking-wider rounded-sm transition-all flex items-center gap-2 ${
              activeTab === 'overview' ? 'bg-[#E50914] text-white' : 'text-neutral-400 hover:bg-neutral-950 hover:text-white'
            }`}
          >
            <User className="w-4 h-4" />
            <span>OVERVIEW</span>
          </button>

          <button
            onClick={() => setActiveTab('passes')}
            className={`w-full text-left px-4 py-3 text-xs font-display font-bold uppercase tracking-wider rounded-sm transition-all flex items-center justify-between ${
              activeTab === 'passes' ? 'bg-[#E50914] text-white' : 'text-neutral-400 hover:bg-neutral-950 hover:text-white'
            }`}
          >
            <span className="flex items-center gap-2">
              <Ticket className="w-4 h-4" />
              <span>MY ENTRY PASSES</span>
            </span>
            <span className="text-[9px] bg-neutral-950 border border-neutral-800 text-neutral-400 px-2 py-0.5 rounded-full font-mono">{myPasses.length}</span>
          </button>

          <button
            onClick={() => setActiveTab('nominations')}
            className={`w-full text-left px-4 py-3 text-xs font-display font-bold uppercase tracking-wider rounded-sm transition-all flex items-center justify-between ${
              activeTab === 'nominations' ? 'bg-[#E50914] text-white' : 'text-neutral-400 hover:bg-neutral-950 hover:text-white'
            }`}
          >
            <span className="flex items-center gap-2">
              <Award className="w-4 h-4" />
              <span>MY NOMINATIONS</span>
            </span>
            <span className="text-[9px] bg-neutral-950 border border-neutral-800 text-neutral-400 px-2 py-0.5 rounded-full font-mono">{myNominations.length}</span>
          </button>

          <button
            onClick={() => setActiveTab('applications')}
            className={`w-full text-left px-4 py-3 text-xs font-display font-bold uppercase tracking-wider rounded-sm transition-all flex items-center justify-between ${
              activeTab === 'applications' ? 'bg-[#E50914] text-white' : 'text-neutral-400 hover:bg-neutral-950 hover:text-white'
            }`}
          >
            <span className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              <span>APPLICATIONS</span>
            </span>
            <span className="text-[9px] bg-neutral-950 border border-neutral-800 text-neutral-400 px-2 py-0.5 rounded-full font-mono">
              {myVolunteerApps.length + myMediaApps.length}
            </span>
          </button>
        </div>

        {/* Right Side Content Pane */}
        <div className="lg:col-span-9 bg-transparent space-y-6">
          
          {/* Tab: Overview */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-[#0a0a0a] border border-neutral-900 p-5 rounded-sm">
                  <span className="text-[9px] tracking-widest text-neutral-500 font-display font-bold uppercase">ENTRY ACCREDITATIONS</span>
                  <span className="block text-2xl font-display font-extrabold text-white mt-1">{myPasses.length}</span>
                  <span className="block text-[10px] text-neutral-400 font-body mt-1">Confirmed event passes active.</span>
                </div>
                <div className="bg-[#0a0a0a] border border-neutral-900 p-5 rounded-sm">
                  <span className="text-[9px] tracking-widest text-neutral-500 font-display font-bold uppercase">NOMINEE DOSSIERS</span>
                  <span className="block text-2xl font-display font-extrabold text-white mt-1">{myNominations.length}</span>
                  <span className="block text-[10px] text-neutral-400 font-body mt-1">Candidate files in vetting workflow.</span>
                </div>
                <div className="bg-[#0a0a0a] border border-neutral-900 p-5 rounded-sm">
                  <span className="text-[9px] tracking-widest text-neutral-500 font-display font-bold uppercase">ECOSYSTEM ROLE</span>
                  <span className="block text-sm font-display font-extrabold text-[#E50914] mt-2 uppercase">CORPORATE PATRON</span>
                  <span className="block text-[10px] text-neutral-400 font-body mt-1">Awaiting 2027 vetting updates.</span>
                </div>
              </div>

              {/* Notification card */}
              <div className="bg-[#0a0a0a] border border-neutral-900 p-6 rounded-sm space-y-4">
                <div className="flex gap-2 items-center">
                  <Bell className="w-4 h-4 text-[#E50914]" />
                  <h3 className="font-display font-bold text-white uppercase text-xs">OFFICIAL ECOSYSTEM REMINDER</h3>
                </div>
                <p className="text-neutral-400 text-xs font-body leading-relaxed font-light">
                  Welcome to your secure 40UNDER40 NIGERIA account portal. If you recently completed a delegate seat booking or submitted an awards nomination, your verified digital assets will propagate instantly across this page.
                </p>
              </div>
            </div>
          )}

          {/* Tab: Passes */}
          {activeTab === 'passes' && (
            <div className="space-y-6 animate-fade-in">
              <h3 className="text-sm font-display font-bold text-[#F7F7F5] uppercase border-b border-neutral-900 pb-3">Confirmed Entry Accreditations</h3>
              
              {myPasses.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {myPasses.map((pass) => (
                    <div key={pass.id} className="bg-[#0a0a0a] border border-neutral-900 p-5 rounded-sm space-y-4 relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-20 h-24 bg-[#8F0008]/5 rounded-full blur-xl pointer-events-none"></div>
                      <div className="flex justify-between items-start border-b border-neutral-950 pb-3">
                        <div>
                          <span className="text-[8px] tracking-widest text-neutral-500 font-display font-bold uppercase block">PASS VALIDATED</span>
                          <h4 className="text-xs font-display font-bold text-white uppercase leading-snug">{pass.eventTitle}</h4>
                        </div>
                        <span className="text-white bg-[#E50914] text-[9px] font-display font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider">{pass.ticketType}</span>
                      </div>

                      <div className="space-y-2 font-body text-xs text-neutral-400">
                        <div>
                          <span className="text-[9px] text-neutral-600 uppercase font-display block">Pass Holder</span>
                          <span className="text-white font-semibold">{pass.name}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <span className="text-[9px] text-neutral-600 uppercase font-display block">Credential ID</span>
                            <span className="text-white font-semibold font-display text-[10px]">{pass.id}</span>
                          </div>
                          <div>
                            <span className="text-[9px] text-neutral-600 uppercase font-display block">Verification URL</span>
                            <span className="text-neutral-400 select-all font-mono text-[9px] truncate block">{pass.qrPassCode}</span>
                          </div>
                        </div>
                      </div>

                      {/* Display beautiful small stylized QR */}
                      <div className="border-t border-neutral-950 pt-4 flex justify-between items-center">
                        <span className="text-[9px] font-display text-neutral-500 font-bold uppercase">GATE ACCREDITED</span>
                        <button
                          onClick={() => alert(`Downloading verified delegate pass sitemap files for ${pass.name}. Registration ID: ${pass.id}`)}
                          className="text-[10px] font-display font-bold text-[#E50914] flex items-center gap-1 hover:underline"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          <span>EXPORT CARD</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-[#0a0a0a] border border-neutral-900 p-8 text-center rounded-sm">
                  <Ticket className="w-10 h-10 text-neutral-800 mx-auto mb-3" />
                  <span className="block text-xs font-display font-bold text-neutral-400 uppercase">NO ACTIVE ENTRY PASSES</span>
                  <span className="block text-[11px] text-neutral-600 font-body mt-1">Please book a delegate seat at our upcoming <strong onClick={() => onNavigate('events', 'time-conference')} className="text-[#E50914] hover:underline cursor-pointer">TIME Conference</strong>.</span>
                </div>
              )}
            </div>
          )}

          {/* Tab: Nominations */}
          {activeTab === 'nominations' && (
            <div className="space-y-6 animate-fade-in">
              <h3 className="text-sm font-display font-bold text-[#F7F7F5] uppercase border-b border-neutral-900 pb-3">Candidacy Vetting Tracks</h3>
              
              {myNominations.length > 0 ? (
                <div className="space-y-4">
                  {myNominations.map((nom) => (
                    <div key={nom.id} className="bg-[#0a0a0a] border border-neutral-900 p-5 rounded-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                      <div className="space-y-2">
                        <div className="flex gap-2 items-center">
                          <span className="text-white font-display font-bold text-xs uppercase">{nom.nomineeName}</span>
                          <span className="text-neutral-600">|</span>
                          <span className="text-[10px] text-neutral-500 font-body uppercase font-bold">{nom.industry}</span>
                        </div>
                        <p className="text-[11px] text-neutral-500 font-body">Nomination Date: {nom.nominationDate} • Vetting ID: <strong className="text-neutral-400 font-display font-mono text-[10px]">{nom.id}</strong></p>
                      </div>

                      {/* Vetting Tracker Stages UI */}
                      <div className="flex items-center gap-4 shrink-0">
                        <div className="text-right">
                          <span className="text-[9px] tracking-widest text-neutral-500 font-display font-bold block uppercase">Vetting Stage</span>
                          <span className="text-[#E50914] font-display font-bold text-xs uppercase block mt-0.5">UNDER BACKGROUND AUDIT</span>
                        </div>
                        <div className="w-2.5 h-2.5 rounded-full bg-[#E50914] animate-pulse"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-[#0a0a0a] border border-neutral-900 p-8 text-center rounded-sm">
                  <Award className="w-10 h-10 text-neutral-800 mx-auto mb-3" />
                  <span className="block text-xs font-display font-bold text-neutral-400 uppercase">NO ACTIVE DOSSIERS</span>
                  <span className="block text-[11px] text-neutral-600 font-body mt-1">Nominate a peer, collaborator, or yourself via the <strong onClick={() => onNavigate('awards', 'nominate')} className="text-[#E50914] hover:underline cursor-pointer">Nomination Terminal</strong>.</span>
                </div>
              )}
            </div>
          )}

          {/* Tab: Applications (Volunteer or Media) */}
          {activeTab === 'applications' && (
            <div className="space-y-12 animate-fade-in">
              
              {/* Media application section */}
              <div className="space-y-6">
                <h3 className="text-sm font-display font-bold text-[#F7F7F5] uppercase border-b border-neutral-900 pb-3">Press & Media Accreditation</h3>
                
                {myMediaApps.length > 0 ? (
                  <div className="space-y-3">
                    {myMediaApps.map((med) => (
                      <div key={med.id} className="bg-[#0a0a0a] border border-neutral-900 p-4 rounded-sm flex justify-between items-center text-xs">
                        <div>
                          <h4 className="font-display font-bold text-white uppercase">{med.company} ({med.mediaType})</h4>
                          <p className="text-[10px] text-neutral-500 font-body leading-relaxed mt-1">Vetting ID: {med.id} • Registered assignment: {med.assignment}</p>
                        </div>
                        <span className="text-xs text-[#E50914] font-display font-bold uppercase">PENDING COUNCIL REVIEW</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <form onSubmit={handleMediaSubmit} className="bg-[#0a0a0a] border border-neutral-900 p-5 rounded-sm space-y-4">
                    <span className="text-[9px] tracking-widest text-[#E50914] font-display font-bold uppercase block">MEDIA REGISTER BRIEF</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[9px] text-neutral-500 font-display font-bold uppercase mb-1">Media Organisation</label>
                        <input type="text" required value={mediaApp.company} onChange={e => setMediaApp(p => ({ ...p, company: e.target.value }))} className="w-full bg-neutral-950 border border-neutral-850 text-xs py-2 px-3 rounded-sm text-white" />
                      </div>
                      <div>
                        <label className="block text-[9px] text-neutral-500 font-display font-bold uppercase mb-1">Media Type</label>
                        <select value={mediaApp.mediaType} onChange={e => setMediaApp(p => ({ ...p, mediaType: e.target.value }))} className="w-full bg-neutral-950 border border-neutral-850 text-xs py-2 px-3 rounded-sm text-white cursor-pointer">
                          <option value="Television Network">Television Network</option>
                          <option value="Digital Publication">Digital Publication</option>
                          <option value="Print Magazine / Newspaper">Print Newspaper</option>
                          <option value="Podcast Host">Podcast Host</option>
                        </select>
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-[9px] text-neutral-500 font-display font-bold uppercase mb-1">Editorial Assignment Purpose</label>
                        <textarea required rows={2} value={mediaApp.assignment} onChange={e => setMediaApp(p => ({ ...p, assignment: e.target.value }))} className="w-full bg-neutral-950 border border-neutral-850 text-xs py-2 px-3 rounded-sm text-white resize-none" placeholder="Provide details of editorial assignment coverage scopes..." />
                      </div>
                    </div>
                    <button type="submit" className="bg-[#E50914] text-white text-[10px] font-display font-bold uppercase px-4 py-2 rounded-sm transition-all flex items-center gap-1.5"><Send className="w-3.5 h-3.5" /> Request Media accreditation</button>
                  </form>
                )}
              </div>

              {/* Volunteer application section */}
              <div className="space-y-6">
                <h3 className="text-sm font-display font-bold text-[#F7F7F5] uppercase border-b border-neutral-900 pb-3">Ecosystem Volunteer Opportunities</h3>
                
                {myVolunteerApps.length > 0 ? (
                  <div className="space-y-3">
                    {myVolunteerApps.map((vol) => (
                      <div key={vol.id} className="bg-[#0a0a0a] border border-neutral-900 p-4 rounded-sm flex justify-between items-center text-xs">
                        <div>
                          <h4 className="font-display font-bold text-white uppercase">{vol.category}</h4>
                          <p className="text-[10px] text-neutral-500 font-body leading-relaxed mt-1">Application ID: {vol.id} • Submitted: {vol.applicationDate}</p>
                        </div>
                        <span className="text-xs text-[#E50914] font-display font-bold uppercase">PENDING COUNCIL REVIEW</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <form onSubmit={handleVolunteerSubmit} className="bg-[#0a0a0a] border border-neutral-900 p-5 rounded-sm space-y-4">
                    <span className="text-[9px] tracking-widest text-[#E50914] font-display font-bold uppercase block">VOLUNTEER BRIEF REGISTER</span>
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="block text-[9px] text-neutral-500 font-display font-bold uppercase mb-1">Preferred Volunteer Category</label>
                        <select value={volApp.category} onChange={e => setVolApp(p => ({ ...p, category: e.target.value }))} className="w-full bg-neutral-950 border border-neutral-850 text-xs py-2 px-3 rounded-sm text-white cursor-pointer">
                          <option value="Ushering & Protocol">Ushering & Protocol</option>
                          <option value="Media & Publicity">Media & Publicity</option>
                          <option value="Registration & Accreditation">Registration & Accreditation</option>
                          <option value="Operations & Logistics">Operations & Logistics</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[9px] text-neutral-500 font-display font-bold uppercase mb-1">Reason for Applying</label>
                        <textarea required rows={2} value={volApp.reason} onChange={e => setVolApp(p => ({ ...p, reason: e.target.value }))} className="w-full bg-neutral-950 border border-neutral-850 text-xs py-2 px-3 rounded-sm text-white resize-none" placeholder="Explain your alignment motivation or logistics experiences..." />
                      </div>
                    </div>
                    <button type="submit" className="bg-[#E50914] text-white text-[10px] font-display font-bold uppercase px-4 py-2 rounded-sm transition-all flex items-center gap-1.5"><Send className="w-3.5 h-3.5" /> Submit Volunteer Application</button>
                  </form>
                )}
              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}
