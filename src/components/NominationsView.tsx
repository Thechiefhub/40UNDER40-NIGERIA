/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Award, Users, ShieldAlert, CheckCircle2, ChevronRight, HelpCircle, FileText, Send, Sparkles, X } from 'lucide-react';
import { Nomination } from '../types';

interface NominationsViewProps {
  onNavigate: (view: string, subView?: string) => void;
}

export default function NominationsView({ onNavigate }: NominationsViewProps) {
  const [nomType, setNomType] = useState<'self' | 'other'>('other');
  const [submitted, setSubmitted] = useState(false);
  const [nominationId, setNominationId] = useState('');
  const [toast, setToast] = useState<{ id: string; nomineeName: string } | null>(null);

  // Portal Countdown Timer
  const [portalTimeLeft, setPortalTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Portal Closing Date: October 30, 2026
    const target = new Date('2026-10-30T23:59:59').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        clearInterval(interval);
        setPortalTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setPortalTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Form Fields
  const [form, setForm] = useState({
    nomineeName: '',
    age: 28,
    nomineeEmail: '',
    nomineePhone: '',
    company: '',
    position: '',
    industry: 'Business & Entrepreneurship',
    achievements: '',
    leadershipImpact: '',
    evidenceLink: '',
    refereeName: '',
    refereeEmail: '',
    refereeRelation: ''
  });

  const categories = [
    { title: 'Business & Entrepreneurship', desc: 'Sustaining high-growth physical commerce, manufacturing, and trade operations.' },
    { title: 'Technology & Innovation', desc: 'Engineering local software, fintech billing rails, or AI-native services.' },
    { title: 'Healthcare & Biotech', desc: 'Innovating clinical access, tele-medicine, and diagnostics for underserved people.' },
    { title: 'Real Estate & Smart Cities', desc: 'Building sustainable structures, energy grids, and green public housing.' },
    { title: 'Social Impact & Civic Duty', desc: 'Advocating community literacy, public teacher training, and legislative ethics.' },
    { title: 'Creative Industries & Media', desc: 'Directing cinema, supporting soundstages, and driving global content economics.' }
  ];

  const processSteps = [
    { name: '01 • NOMINATIONS', desc: 'Public submissions open. Nominations verified against age ceilings (<40).' },
    { name: '02 • SCREENING', desc: 'Vetting committee conducts preliminary filters on ethical standards & legal filings.' },
    { name: '03 • RESEARCH AUDIT', desc: 'Independent analysts verify corporate turnover, verified employees, and tax compliance.' },
    { name: '04 • BOARD VETTING', desc: 'The Advisory Board evaluates leadership narratives and scores candidate contributions.' },
    { name: '05 • INDUCTION GALA', desc: 'Inducting forty elite laureates into the prestigious Hall of Fame at the Gala Dinner.' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nomineeName || !form.nomineeEmail) return;

    const id = 'NOM-' + Math.floor(100000 + Math.random() * 900000);
    
    const newNomination: Nomination = {
      id,
      nomineeName: form.nomineeName,
      age: Number(form.age),
      nomineeEmail: form.nomineeEmail,
      nomineePhone: form.nomineePhone,
      company: form.company,
      position: form.position,
      industry: form.industry,
      achievements: form.achievements,
      leadershipImpact: form.leadershipImpact,
      evidenceLink: form.evidenceLink,
      refereeName: form.refereeName || (nomType === 'self' ? 'Self' : ''),
      refereeEmail: form.refereeEmail || (nomType === 'self' ? form.nomineeEmail : ''),
      refereeRelation: form.refereeRelation || (nomType === 'self' ? 'Applicant' : ''),
      nominationDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      status: 'pending'
    };

    // Save nomination in LocalStorage
    const currentNoms = JSON.parse(localStorage.getItem('nominations') || '[]');
    currentNoms.push(newNomination);
    localStorage.setItem('nominations', JSON.stringify(currentNoms));

    setNominationId(id);
    setSubmitted(true);
    setToast({ id, nomineeName: form.nomineeName });
    
    // Auto-dismiss the toast notification after 6 seconds
    const timer = setTimeout(() => {
      setToast(null);
    }, 6000);

    setForm({
      nomineeName: '',
      age: 28,
      nomineeEmail: '',
      nomineePhone: '',
      company: '',
      position: '',
      industry: 'Business & Entrepreneurship',
      achievements: '',
      leadershipImpact: '',
      evidenceLink: '',
      refereeName: '',
      refereeEmail: '',
      refereeRelation: ''
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 pb-20">
      
      {/* Introduction Header */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-[10px] tracking-[0.3em] text-[#E50914] font-display font-bold uppercase">PRESTIGE AWARDS 2027</span>
        <h1 className="text-4xl md:text-5xl font-display font-extrabold tracking-tight text-white uppercase leading-none">
          NOMINATE AN EXCEPTIONAL LEADER
        </h1>
        <p className="text-neutral-400 font-body text-xs sm:text-sm leading-relaxed font-light">
          Identify and nominate a peer or yourself. All candidates must be citizens or active operators in Nigeria, under the age of forty at the time of vetting induction.
        </p>
      </section>

      {/* Live Portal Countdown Timer Card */}
      <section className="max-w-3xl mx-auto">
        <div className="bg-[#050505] border border-red-900/30 p-6 rounded-3xl relative overflow-hidden glass text-center space-y-4">
          <div className="absolute top-0 right-0 p-2.5 text-[8px] tracking-[0.25em] text-[#E50914] font-display font-bold">
            LIVE SYSTEM STATUS
          </div>
          
          <div className="space-y-1">
            <span className="text-[10px] tracking-[0.3em] text-[#E50914] font-display font-bold uppercase animate-pulse">
              ● NOMINATION PORTAL CLOSING COUNTDOWN
            </span>
            <p className="text-neutral-400 text-xs font-body">
              All electronic candidate submissions, reference letters, and vetted filings must be completed before the system lock.
            </p>
          </div>

          <div className="grid grid-cols-4 gap-3 max-w-md mx-auto">
            <div className="bg-black/60 border border-neutral-800/80 p-3 rounded-2xl">
              <span className="block text-2xl sm:text-3xl font-display font-extrabold text-white">{portalTimeLeft.days}</span>
              <span className="text-[9px] tracking-wider text-neutral-500 font-display font-bold">DAYS</span>
            </div>
            <div className="bg-black/60 border border-neutral-800/80 p-3 rounded-2xl">
              <span className="block text-2xl sm:text-3xl font-display font-extrabold text-white">{portalTimeLeft.hours}</span>
              <span className="text-[9px] tracking-wider text-neutral-500 font-display font-bold">HOURS</span>
            </div>
            <div className="bg-black/60 border border-neutral-800/80 p-3 rounded-2xl">
              <span className="block text-2xl sm:text-3xl font-display font-extrabold text-white">{portalTimeLeft.minutes}</span>
              <span className="text-[9px] tracking-wider text-neutral-500 font-display font-bold">MINS</span>
            </div>
            <div className="bg-black/60 border border-neutral-800/80 p-3 rounded-2xl">
              <span className="block text-2xl sm:text-3xl font-display font-extrabold text-[#E50914] animate-pulse">{portalTimeLeft.seconds}</span>
              <span className="text-[9px] tracking-wider text-neutral-500 font-display font-bold">SECS</span>
            </div>
          </div>
        </div>
      </section>

      {/* Grid: Process and Categories */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Categories (6) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="border-b border-neutral-900 pb-3">
            <span className="text-[9px] tracking-widest text-neutral-500 font-display font-bold uppercase">CLASSIFICATIONS</span>
            <h2 className="text-xl font-display font-bold text-white uppercase mt-1">AWARDS CATEGORIES</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {categories.map((cat, i) => (
              <div key={i} className="bg-[#0a0a0a] border border-neutral-900 p-4 rounded-sm hover:border-neutral-800 transition-colors">
                <h4 className="text-xs font-display font-bold text-white uppercase mb-1">{cat.title}</h4>
                <p className="text-[10px] text-neutral-500 font-body leading-relaxed">{cat.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Selection Process Chart */}
        <div className="lg:col-span-6 space-y-6">
          <div className="border-b border-neutral-900 pb-3">
            <span className="text-[9px] tracking-widest text-neutral-500 font-display font-bold uppercase">GOVERNANCE</span>
            <h2 className="text-xl font-display font-bold text-white uppercase mt-1">SELECTION PROCESS TIMELINE</h2>
          </div>
          <div className="bg-[#0a0a0a] border border-neutral-900 p-6 rounded-sm divide-y divide-neutral-950">
            {processSteps.map((step, idx) => (
              <div key={idx} className="py-3 flex items-start gap-4 first:pt-0 last:pb-0">
                <div className="w-6 h-6 rounded-full bg-neutral-950 border border-neutral-800 flex items-center justify-center shrink-0">
                  <span className="text-[9px] font-display font-bold text-[#E50914]">{idx + 1}</span>
                </div>
                <div>
                  <h4 className="text-xs font-display font-bold text-white uppercase">{step.name}</h4>
                  <p className="text-[10px] text-neutral-500 font-body mt-0.5">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* Main Nomination Form */}
      <section id="nomination-form-container" className="max-w-3xl mx-auto">
        <div className="bg-[#0a0a0a] border border-neutral-900 p-6 sm:p-10 rounded-sm relative overflow-hidden">
          
          {submitted ? (
            <div className="text-center space-y-6 py-6 animate-fade-in">
              <div className="flex items-center justify-center mx-auto py-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52" style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  display: 'block',
                  strokeWidth: '3',
                  stroke: '#fff',
                  strokeMiterlimit: '10',
                  boxShadow: 'inset 0px 0px 0px #E50914',
                  animation: 'fill .3s ease-in-out .3s forwards, scale .2s ease-in-out .7s both'
                }}>
                  <circle cx="26" cy="26" r="25" fill="none" style={{
                    strokeDasharray: '166',
                    strokeDashoffset: '166',
                    strokeWidth: '3',
                    strokeMiterlimit: '10',
                    stroke: '#E50914',
                    fill: 'none',
                    animation: 'stroke 0.5s cubic-bezier(0.65, 0, 0.45, 1) forwards'
                  }}/>
                  <path fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" style={{
                    transformOrigin: '50% 50%',
                    strokeDasharray: '48',
                    strokeDashoffset: '48',
                    animation: 'stroke 0.25s cubic-bezier(0.65, 0, 0.45, 1) 0.6s forwards'
                  }}/>
                </svg>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-display font-extrabold text-white uppercase tracking-tight">NOMINATED SUCCESSFULLY</h3>
                <p className="text-neutral-400 text-xs font-body max-w-sm mx-auto">
                  The candidacy files have been locked, registered, and forwarded to the Vetting Committee.
                </p>
              </div>

              <div className="bg-neutral-950 border border-neutral-900 p-4 rounded-sm text-left max-w-xs mx-auto">
                <span className="text-[9px] tracking-widest text-neutral-500 font-display font-bold uppercase block">FILE VERIFICATION ID</span>
                <span className="text-[#E50914] font-display font-extrabold text-sm block mt-1">{nominationId}</span>
                <p className="text-[10px] text-neutral-600 font-body leading-relaxed mt-2 border-t border-neutral-900 pt-2">
                  Use this tracking ID code inside the membership portal to review candidate vetting status reports.
                </p>
              </div>

              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => setSubmitted(false)}
                  className="bg-neutral-950 border border-neutral-800 hover:border-neutral-700 text-[#F7F7F5] font-display font-bold text-xs py-2.5 px-6 rounded-sm transition-all"
                >
                  NOMINATE ANOTHER
                </button>
                <button
                  onClick={() => onNavigate('community', 'portal')}
                  className="bg-[#E50914] hover:bg-[#8F0008] text-white font-display font-bold text-xs py-2.5 px-6 rounded-sm transition-all"
                >
                  TRACK NOMINATION
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-neutral-950 pb-4">
                <div>
                  <span className="text-[9px] tracking-widest text-neutral-500 font-display font-bold uppercase block">METADATA CONFIGURATION</span>
                  <h3 className="text-sm font-display font-bold text-white uppercase">CANDIDATURE TYPE</h3>
                </div>
                
                <div className="flex bg-neutral-950 border border-neutral-900 p-1 rounded-sm shrink-0">
                  <button
                    type="button"
                    onClick={() => setNomType('other')}
                    className={`px-3 py-1.5 text-[10px] font-display font-bold uppercase rounded-sm transition-all ${
                      nomType === 'other' ? 'bg-[#E50914] text-white' : 'text-neutral-500'
                    }`}
                  >
                    Nominate Someone Else
                  </button>
                  <button
                    type="button"
                    onClick={() => setNomType('self')}
                    className={`px-3 py-1.5 text-[10px] font-display font-bold uppercase rounded-sm transition-all ${
                      nomType === 'self' ? 'bg-[#E50914] text-white' : 'text-neutral-500'
                    }`}
                  >
                    Self-Nomination
                  </button>
                </div>
              </div>

              {/* Step 1: Candidate Contact Info */}
              <div className="space-y-4">
                <h4 className="text-xs font-display font-bold text-[#E50914] uppercase border-l-2 border-[#E50914] pl-2">01 • Nominee Details</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[9px] tracking-widest text-neutral-500 font-display font-bold uppercase mb-1.5">Candidate Full Name</label>
                    <input
                      type="text"
                      name="nomineeName"
                      required
                      placeholder="e.g. Ibrahim Danjuma"
                      value={form.nomineeName}
                      onChange={handleInputChange}
                      className="w-full bg-neutral-950 border border-neutral-800 focus:border-[#E50914] text-xs py-2.5 px-3 rounded-sm outline-none text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] tracking-widest text-neutral-500 font-display font-bold uppercase mb-1.5">Candidate Age (Vetting Rule: &lt;40)</label>
                    <input
                      type="number"
                      name="age"
                      required
                      min={18}
                      max={45}
                      value={form.age}
                      onChange={handleInputChange}
                      className="w-full bg-neutral-950 border border-neutral-800 focus:border-[#E50914] text-xs py-2.5 px-3 rounded-sm outline-none text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] tracking-widest text-neutral-500 font-display font-bold uppercase mb-1.5">Candidate Email Address</label>
                    <input
                      type="email"
                      name="nomineeEmail"
                      required
                      placeholder="ibrahim@corp.ng"
                      value={form.nomineeEmail}
                      onChange={handleInputChange}
                      className="w-full bg-neutral-950 border border-neutral-800 focus:border-[#E50914] text-xs py-2.5 px-3 rounded-sm outline-none text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] tracking-widest text-neutral-500 font-display font-bold uppercase mb-1.5">Candidate Contact Phone</label>
                    <input
                      type="tel"
                      name="nomineePhone"
                      required
                      placeholder="+234..."
                      value={form.nomineePhone}
                      onChange={handleInputChange}
                      className="w-full bg-neutral-950 border border-neutral-800 focus:border-[#E50914] text-xs py-2.5 px-3 rounded-sm outline-none text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Step 2: Professional context */}
              <div className="space-y-4">
                <h4 className="text-xs font-display font-bold text-[#E50914] uppercase border-l-2 border-[#E50914] pl-2">02 • Corporate Positioning</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[9px] tracking-widest text-neutral-500 font-display font-bold uppercase mb-1.5">Company or Brand</label>
                    <input
                      type="text"
                      name="company"
                      required
                      placeholder="e.g. Agro-Pulse Logistics"
                      value={form.company}
                      onChange={handleInputChange}
                      className="w-full bg-neutral-950 border border-neutral-800 focus:border-[#E50914] text-xs py-2.5 px-3 rounded-sm outline-none text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] tracking-widest text-neutral-500 font-display font-bold uppercase mb-1.5">Executive Position</label>
                    <input
                      type="text"
                      name="position"
                      required
                      placeholder="e.g. Chief Executive Officer"
                      value={form.position}
                      onChange={handleInputChange}
                      className="w-full bg-neutral-950 border border-neutral-800 focus:border-[#E50914] text-xs py-2.5 px-3 rounded-sm outline-none text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] tracking-widest text-neutral-500 font-display font-bold uppercase mb-1.5">Category Sector</label>
                    <select
                      name="industry"
                      value={form.industry}
                      onChange={handleInputChange}
                      className="w-full bg-neutral-950 border border-neutral-800 focus:border-[#E50914] text-xs py-2.5 px-3 rounded-sm outline-none text-white cursor-pointer"
                    >
                      <option value="Business & Entrepreneurship">Business & Entrepreneurship</option>
                      <option value="Technology & Innovation">Technology & Innovation</option>
                      <option value="Healthcare & Biotech">Healthcare & Biotech</option>
                      <option value="Real Estate & Smart Cities">Real Estate & Smart Cities</option>
                      <option value="Social Impact & Civic Duty">Social Impact & Civic Duty</option>
                      <option value="Creative Industries & Media">Creative Industries & Media</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Step 3: Vetting Narratives */}
              <div className="space-y-4">
                <h4 className="text-xs font-display font-bold text-[#E50914] uppercase border-l-2 border-[#E50914] pl-2">03 • Vetting Impact Narratives</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-[9px] tracking-widest text-neutral-500 font-display font-bold uppercase mb-1.5">
                      Business Milestones & Achievements (Max 400 words)
                    </label>
                    <textarea
                      name="achievements"
                      required
                      rows={4}
                      placeholder="Identify company growth, revenue achievements, technology platforms created, or audited jobs sustained..."
                      value={form.achievements}
                      onChange={handleInputChange}
                      className="w-full bg-neutral-950 border border-neutral-800 focus:border-[#E50914] text-xs py-2.5 px-3 rounded-sm outline-none text-white resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] tracking-widest text-neutral-500 font-display font-bold uppercase mb-1.5">
                      Leadership Narrative & Civic Impact (Max 400 words)
                    </label>
                    <textarea
                      name="leadershipImpact"
                      required
                      rows={4}
                      placeholder="Explain how candidate demonstrates executive integrity, ethical leadership, or social advocacy footprints..."
                      value={form.leadershipImpact}
                      onChange={handleInputChange}
                      className="w-full bg-neutral-950 border border-neutral-800 focus:border-[#E50914] text-xs py-2.5 px-3 rounded-sm outline-none text-white resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] tracking-widest text-neutral-500 font-display font-bold uppercase mb-1.5">Supporting Links or Evidence Files</label>
                    <input
                      type="url"
                      name="evidenceLink"
                      placeholder="Link to corporate publications, news profiles, or press releases..."
                      value={form.evidenceLink}
                      onChange={handleInputChange}
                      className="w-full bg-neutral-950 border border-neutral-800 focus:border-[#E50914] text-xs py-2.5 px-3 rounded-sm outline-none text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Step 4: Referee details (only if Nominating Else) */}
              {nomType === 'other' && (
                <div className="space-y-4">
                  <h4 className="text-xs font-display font-bold text-[#E50914] uppercase border-l-2 border-[#E50914] pl-2">04 • Referee Validation</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[9px] tracking-widest text-neutral-500 font-display font-bold uppercase mb-1.5">Referee Full Name</label>
                      <input
                        type="text"
                        name="refereeName"
                        required={nomType === 'other'}
                        placeholder="e.g. Chief Coker"
                        value={form.refereeName}
                        onChange={handleInputChange}
                        className="w-full bg-neutral-950 border border-neutral-800 focus:border-[#E50914] text-xs py-2.5 px-3 rounded-sm outline-none text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] tracking-widest text-neutral-500 font-display font-bold uppercase mb-1.5">Referee Email Address</label>
                      <input
                        type="email"
                        name="refereeEmail"
                        required={nomType === 'other'}
                        placeholder="coker@law.ng"
                        value={form.refereeEmail}
                        onChange={handleInputChange}
                        className="w-full bg-neutral-950 border border-neutral-800 focus:border-[#E50914] text-xs py-2.5 px-3 rounded-sm outline-none text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] tracking-widest text-neutral-500 font-display font-bold uppercase mb-1.5">Relationship to Candidate</label>
                      <input
                        type="text"
                        name="refereeRelation"
                        required={nomType === 'other'}
                        placeholder="Advisor, Investor, Director..."
                        value={form.refereeRelation}
                        onChange={handleInputChange}
                        className="w-full bg-neutral-950 border border-neutral-800 focus:border-[#E50914] text-xs py-2.5 px-3 rounded-sm outline-none text-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Vetting disclaimer */}
              <div className="flex gap-3 p-4 bg-neutral-950 border border-neutral-900 rounded-sm text-xs text-neutral-500">
                <ShieldAlert className="w-5 h-5 text-[#E50914] shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  By submitting this leadership candidature dossier, you authorize the 40UNDER40 NIGERIA Executive Vetting Council to perform independent corporate audits, reference validations, and background ethical record reviews. False listings will trigger immediate file cancellation.
                </p>
              </div>

              {/* Submit CTA */}
              <div className="pt-4 border-t border-neutral-950 flex justify-end">
                <button
                  type="submit"
                  className="bg-[#E50914] hover:bg-[#8F0008] text-white font-display font-bold text-xs uppercase px-8 py-3.5 rounded-sm transition-all flex items-center gap-1.5 shadow-lg shadow-[#E50914]/15"
                >
                  <span>Lock & Submit Candidacy</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>

            </form>
          )}

        </div>
      </section>

      {/* Floating Animated Vetting Notification Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-[#050505] border border-red-900/40 p-4 rounded-2xl shadow-2xl animate-slide-up glass flex gap-4 items-start">
          <style>{`
            @keyframes stroke {
              100% {
                stroke-dashoffset: 0;
              }
            }
            @keyframes scale {
              0%, 100% {
                transform: none;
              }
              50% {
                transform: scale3d(1.1, 1.1, 1);
              }
            }
            @keyframes fill {
              100% {
                box-shadow: inset 0px 0px 0px 30px #E50914;
              }
            }
            @keyframes slide-up {
              0% { transform: translateY(100px); opacity: 0; }
              100% { transform: translateY(0); opacity: 1; }
            }
            @keyframes toast-shrink {
              0% { width: 100%; }
              100% { width: 0%; }
            }
            .animate-slide-up {
              animation: slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            }
            .animate-toast-shrink {
              animation: toast-shrink 6s linear forwards;
            }
          `}</style>
          
          {/* Subtle Check-mark Animation */}
          <div className="shrink-0 pt-0.5">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52" style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              display: 'block',
              strokeWidth: '3',
              stroke: '#fff',
              strokeMiterlimit: '10',
              boxShadow: 'inset 0px 0px 0px #E50914',
              animation: 'fill .3s ease-in-out .3s forwards, scale .2s ease-in-out .7s both'
            }}>
              <circle cx="26" cy="26" r="25" fill="none" style={{
                strokeDasharray: '166',
                strokeDashoffset: '166',
                strokeWidth: '3',
                strokeMiterlimit: '10',
                stroke: '#E50914',
                fill: 'none',
                animation: 'stroke 0.5s cubic-bezier(0.65, 0, 0.45, 1) forwards'
              }}/>
              <path fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" style={{
                transformOrigin: '50% 50%',
                strokeDasharray: '48',
                strokeDashoffset: '48',
                animation: 'stroke 0.25s cubic-bezier(0.65, 0, 0.45, 1) 0.6s forwards'
              }}/>
            </svg>
          </div>

          <div className="space-y-1.5 flex-1 pr-6 relative">
            <span className="text-[9px] tracking-[0.2em] text-[#E50914] font-display font-bold uppercase block animate-pulse">
              DOSSIER LOCKED & RECEIVED
            </span>
            <p className="text-white text-xs font-display font-bold uppercase tracking-tight">
              {toast.nomineeName}
            </p>
            <p className="text-neutral-400 text-[10px] font-body leading-relaxed">
              Candidacy file successfully registered under reference ID <span className="text-[#E50914] font-mono font-bold">{toast.id}</span>.
            </p>
            
            {/* Visual countdown progress line */}
            <div className="h-0.5 bg-neutral-900 w-full rounded-full overflow-hidden mt-2">
              <div className="h-full bg-[#E50914] animate-toast-shrink" />
            </div>
          </div>

          <button
            onClick={() => setToast(null)}
            className="absolute top-3 right-3 text-neutral-500 hover:text-white transition-colors"
            aria-label="Dismiss receipt"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

    </div>
  );
}
