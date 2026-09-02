/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { HelpCircle, ChevronRight, FileText, Send, CheckCircle2, Award, Users, ShieldAlert } from 'lucide-react';
import { Partner } from '../types';

interface PartnersViewProps {
  partners: Partner[];
}

export default function PartnersView({ partners }: PartnersViewProps) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    position: '',
    category: 'TITLE PARTNER',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const sponsorshipTiers = [
    { name: 'TITLE PARTNER', slot: '1 Slot Available', desc: 'Absolute maximum brand integration across the entire yearly lifecycle, including full naming rights of the time conference and gala stages.', benefits: ['Strategic keynote speech by your Group Managing Director', 'Exclusive VVIP branded center-stage tables (16 seats)', 'Full back-cover advertisement in Year of Impact books', 'Featured brand logos in all television broadcasts'] },
    { name: 'PRESENTING PARTNER', slot: '2 Slots Available', desc: 'High-level presentation co-hosting rights of the core awards ceremony, with integrated visual brand exposure.', benefits: ['Direct presentation of three key awards categories', 'VVIP Table seating arrangements (8 seats)', 'Inside double-page ad in the souvenir prospectus', 'Corporate banner placement at the main ballroom entrance'] },
    { name: 'GOLD PARTNER', slot: '4 Slots Available', desc: 'Prominent branding and delegation presence across our signature assemblies and cocktail receptions.', benefits: ['VIP Table seating arrangements (4 seats)', 'Logo placement across all digital marketing screens', 'Full-page advertisement in program books', 'A dedicated brand ambassador assigned to your delegates'] }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.company) return;

    // Save lead to local storage CRM
    const currentLeads = JSON.parse(localStorage.getItem('leads') || '[]');
    currentLeads.push({
      ...form,
      date: new Date().toISOString(),
      type: 'Sponsorship'
    });
    localStorage.setItem('leads', JSON.stringify(currentLeads));

    setSubmitted(true);
    setForm({
      name: '',
      email: '',
      company: '',
      position: '',
      category: 'TITLE PARTNER',
      message: ''
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 pb-20">
      
      {/* Header */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-[10px] tracking-[0.3em] text-[#E50914] font-display font-bold uppercase">BRAND ALLIANCES</span>
        <h1 className="text-4xl md:text-5xl font-display font-extrabold tracking-tight text-white uppercase leading-none">
          SPONSORSHIP & PARTNERSHIPS
        </h1>
        <p className="text-neutral-400 font-body text-xs sm:text-sm leading-relaxed font-light">
          Align your corporate brand with excellence. We offer strategic sponsorship, hospitality tables, and activation integration across three annual milestones.
        </p>
      </section>

      {/* Tiers List */}
      <section className="space-y-6">
        <div className="text-center max-w-sm mx-auto mb-6">
          <h3 className="font-display font-bold text-white uppercase text-base">SPONSORSHIP TIERS</h3>
          <p className="text-[10px] text-neutral-500 font-body">Meticulously curated sponsorship allocations for premier corporate brands.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sponsorshipTiers.map((tier) => (
            <div key={tier.name} className="bg-[#0a0a0a] border border-neutral-900 p-6 rounded-sm flex flex-col justify-between group hover:border-neutral-800 transition-colors">
              <div className="space-y-4">
                <div>
                  <span className="text-[9px] font-display font-bold text-[#E50914] tracking-widest uppercase bg-[#E50914]/5 border border-[#E50914]/10 px-2 py-0.5 rounded-sm inline-block">{tier.slot}</span>
                  <h3 className="font-display font-bold text-white uppercase text-base mt-2">{tier.name}</h3>
                  <p className="text-neutral-400 text-[10px] font-body leading-relaxed mt-1">{tier.desc}</p>
                </div>
                <ul className="space-y-2 border-t border-neutral-900 pt-4 text-[10px] font-body text-neutral-500">
                  {tier.benefits.map((b, idx) => (
                    <li key={idx} className="flex gap-2 items-start">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#E50914] shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button onClick={() => { setForm(f => ({ ...f, category: tier.name })); document.getElementById('sponsor-form')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-[10px] font-display font-bold text-[#E50914] uppercase text-left mt-6 inline-flex items-center gap-1">REQUEST INTEGRATION BRIEF <ChevronRight className="w-3.5 h-3.5" /></button>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive lead capture form */}
      <section id="sponsor-form" className="max-w-2xl mx-auto">
        <div className="bg-[#0a0a0a] border border-neutral-900 p-6 sm:p-10 rounded-sm">
          {submitted ? (
            <div className="text-center space-y-6 py-6 animate-fade-in">
              <div className="w-12 h-12 rounded-full bg-[#E50914]/10 border border-[#E50914]/20 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6 text-[#E50914]" />
              </div>
              <div>
                <h3 className="text-xl font-display font-extrabold text-white uppercase tracking-tight">INQUIRY LOGGED</h3>
                <p className="text-neutral-400 text-xs font-body max-w-sm mx-auto mt-1">
                  Our Corporate Relations department will compile a bespoke prospectus and coordinate a strategic discovery brief.
                </p>
              </div>
              <button
                onClick={() => setSubmitted(false)}
                className="bg-[#E50914] hover:bg-[#8F0008] text-white font-display font-bold text-xs py-2.5 px-8 rounded-sm transition-all"
              >
                SUBMIT ANOTHER REQUEST
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="border-b border-neutral-950 pb-3 mb-4">
                <span className="text-[9px] tracking-widest text-neutral-500 font-display font-bold uppercase block">LEAD ENGAGEMENT PORTAL</span>
                <h3 className="text-sm font-display font-bold text-white uppercase">Sponsorship & Deck Request</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] tracking-widest text-neutral-500 font-display font-bold uppercase mb-1.5">Your Full Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleInputChange}
                    className="w-full bg-neutral-950 border border-neutral-850 focus:border-[#E50914] text-xs py-2.5 px-3 rounded-sm outline-none text-white"
                  />
                </div>
                <div>
                  <label className="block text-[9px] tracking-widest text-neutral-500 font-display font-bold uppercase mb-1.5">Corporate Email Address</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleInputChange}
                    className="w-full bg-neutral-950 border border-neutral-850 focus:border-[#E50914] text-xs py-2.5 px-3 rounded-sm outline-none text-white"
                  />
                </div>
                <div>
                  <label className="block text-[9px] tracking-widest text-neutral-500 font-display font-bold uppercase mb-1.5">Company Brand</label>
                  <input
                    type="text"
                    name="company"
                    required
                    value={form.company}
                    onChange={handleInputChange}
                    className="w-full bg-neutral-950 border border-neutral-850 focus:border-[#E50914] text-xs py-2.5 px-3 rounded-sm outline-none text-white"
                  />
                </div>
                <div>
                  <label className="block text-[9px] tracking-widest text-neutral-500 font-display font-bold uppercase mb-1.5">Your Executive Position</label>
                  <input
                    type="text"
                    name="position"
                    required
                    value={form.position}
                    onChange={handleInputChange}
                    className="w-full bg-neutral-950 border border-neutral-850 focus:border-[#E50914] text-xs py-2.5 px-3 rounded-sm outline-none text-white"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[9px] tracking-widest text-neutral-500 font-display font-bold uppercase mb-1.5">Intended Partnership Tier</label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleInputChange}
                    className="w-full bg-neutral-950 border border-neutral-850 focus:border-[#E50914] text-xs py-2.5 px-3 rounded-sm outline-none text-white cursor-pointer"
                  >
                    <option value="TITLE PARTNER">TITLE PARTNER</option>
                    <option value="PRESENTING PARTNER">PRESENTING PARTNER</option>
                    <option value="GOLD PARTNER">GOLD PARTNER</option>
                    <option value="SILVER PARTNER">SILVER PARTNER</option>
                    <option value="CORPORATE TABLE">CORPORATE TABLE MATCHING</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[9px] tracking-widest text-neutral-500 font-display font-bold uppercase mb-1.5">Brief Alignment Message</label>
                  <textarea
                    name="message"
                    rows={4}
                    value={form.message}
                    onChange={handleInputChange}
                    placeholder="Enter alignment goals, activation ideas, or corporate inquiries..."
                    className="w-full bg-neutral-950 border border-neutral-850 focus:border-[#E50914] text-xs py-2.5 px-3 rounded-sm outline-none text-white resize-none"
                  />
                </div>
              </div>

              <div className="flex gap-3 p-4 bg-neutral-950 border border-neutral-900 rounded-sm text-xs text-neutral-500">
                <ShieldAlert className="w-5 h-5 text-[#E50914] shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  By submitting this request, you agree to receive direct corporate correspondence and formal sponsorship documentation matching the registered brand interests. No data is distributed outside the 40UNDER40 organization.
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-950 flex justify-end">
                <button
                  type="submit"
                  className="bg-[#E50914] hover:bg-[#8F0008] text-white font-display font-bold text-xs uppercase px-8 py-3.5 rounded-sm transition-all flex items-center gap-1.5 shadow-lg shadow-[#E50914]/15"
                >
                  <span>Submit Partnership Request</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

    </div>
  );
}
