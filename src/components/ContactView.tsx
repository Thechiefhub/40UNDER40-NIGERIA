/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function ContactView() {
  const [activeForm, setActiveForm] = useState<'general' | 'sponsorship' | 'vetting'>('general');
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    topic: 'General Enquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return;

    // Simulate CRM capture
    const currentLeads = JSON.parse(localStorage.getItem('leads') || '[]');
    currentLeads.push({
      ...form,
      date: new Date().toISOString(),
      type: 'Contact'
    });
    localStorage.setItem('leads', JSON.stringify(currentLeads));

    setSubmitted(true);
    setForm({
      name: '',
      email: '',
      phone: '',
      topic: 'General Enquiry',
      message: ''
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 pb-20">
      
      {/* Header */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-[10px] tracking-[0.3em] text-[#E50914] font-display font-bold uppercase">CONNECT CHANNELS</span>
        <h1 className="text-4xl md:text-5xl font-display font-extrabold tracking-tight text-white uppercase leading-none">
          LET'S BUILD SOMETHING SIGNIFICANT
        </h1>
        <p className="text-neutral-400 font-body text-xs sm:text-sm leading-relaxed font-light font-light">
          Reach our administrative council, corporate alliance divisions, media desk, or award vetting committees directly.
        </p>
      </section>

      {/* Info grids */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Coordinates */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#0a0a0a] border border-neutral-900 p-6 rounded-sm space-y-6">
            <h3 className="font-display font-bold text-white text-xs tracking-widest uppercase border-b border-neutral-900 pb-2">
              ORGANIZATIONAL HEADQUARTERS
            </h3>
            
            <div className="space-y-4 text-xs font-body text-neutral-400">
              <div className="flex gap-3">
                <MapPin className="w-4 h-4 text-[#E50914] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white font-display block uppercase text-[10px]">Lagos Secretariat Office</strong>
                  <span className="leading-relaxed block mt-1">Lagos Oriental Hotel Office Complex, 3 Lekki Road, VI, Lagos, Nigeria.</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Mail className="w-4 h-4 text-[#E50914] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white font-display block uppercase text-[10px]">Email Coordinates</strong>
                  <span className="leading-relaxed block mt-1">info@40under40.ng • vetting@40under40.ng</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Phone className="w-4 h-4 text-[#E50914] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white font-display block uppercase text-[10px]">Administrative Contact</strong>
                  <span className="leading-relaxed block mt-1">+234 (0) 906 400 4040 • +234 (0) 805 100 4040</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: Dynamic Form */}
        <div className="lg:col-span-8 bg-[#0a0a0a] border border-neutral-900 p-6 sm:p-10 rounded-sm relative">
          
          {submitted ? (
            <div className="text-center space-y-6 py-6 animate-fade-in">
              <div className="w-12 h-12 rounded-full bg-[#E50914]/10 border border-[#E50914]/20 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6 text-[#E50914]" />
              </div>
              <div>
                <h3 className="text-xl font-display font-extrabold text-white uppercase tracking-tight">MESSAGE DISPATCHED</h3>
                <p className="text-neutral-400 text-xs font-body max-w-sm mx-auto mt-1">
                  Our Administrative Desk has registered your message and will route it to the respective committee lead. Expect correspondence within 24 business hours.
                </p>
              </div>
              <button
                onClick={() => setSubmitted(false)}
                className="bg-[#E50914] hover:bg-[#8F0008] text-white font-display font-bold text-xs py-2.5 px-8 rounded-sm transition-all"
              >
                DISPATCH NEW MESSAGE
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="border-b border-neutral-950 pb-3 mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-[9px] tracking-widest text-neutral-500 font-display font-bold uppercase block">SECURE DESK ROUTING</span>
                  <h3 className="text-sm font-display font-bold text-white uppercase">Direct Contact Terminal</h3>
                </div>
                
                {/* Form type options */}
                <div className="flex bg-neutral-950 border border-neutral-900 p-1 rounded-sm text-[9px] font-display font-bold uppercase">
                  <button type="button" onClick={() => { setActiveForm('general'); setForm(f => ({ ...f, topic: 'General Enquiry' })); }} className={`px-2.5 py-1 rounded-sm transition-all ${activeForm === 'general' ? 'bg-[#E50914] text-white' : 'text-neutral-500'}`}>General</button>
                  <button type="button" onClick={() => { setActiveForm('sponsorship'); setForm(f => ({ ...f, topic: 'Sponsorship Inquiry' })); }} className={`px-2.5 py-1 rounded-sm transition-all ${activeForm === 'sponsorship' ? 'bg-[#E50914] text-white' : 'text-neutral-500'}`}>Sponsor</button>
                  <button type="button" onClick={() => { setActiveForm('vetting'); setForm(f => ({ ...f, topic: 'Vetting Committee Inquiry' })); }} className={`px-2.5 py-1 rounded-sm transition-all ${activeForm === 'vetting' ? 'bg-[#E50914] text-white' : 'text-neutral-500'}`}>Vetting</button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] tracking-widest text-neutral-500 font-display font-bold uppercase mb-1.5">Full Legal Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
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
                    onChange={(e) => setForm(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full bg-neutral-950 border border-neutral-850 focus:border-[#E50914] text-xs py-2.5 px-3 rounded-sm outline-none text-white"
                  />
                </div>
                <div>
                  <label className="block text-[9px] tracking-widest text-neutral-500 font-display font-bold uppercase mb-1.5">Contact Phone Line</label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={(e) => setForm(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+234..."
                    className="w-full bg-neutral-950 border border-neutral-850 focus:border-[#E50914] text-xs py-2.5 px-3 rounded-sm outline-none text-white"
                  />
                </div>
                <div>
                  <label className="block text-[9px] tracking-widest text-neutral-500 font-display font-bold uppercase mb-1.5">Inquiry Department Category</label>
                  <input
                    type="text"
                    name="topic"
                    required
                    value={form.topic}
                    disabled
                    className="w-full bg-neutral-950 border border-neutral-850 text-xs py-2.5 px-3 rounded-sm outline-none text-neutral-400 font-display font-bold uppercase"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[9px] tracking-widest text-neutral-500 font-display font-bold uppercase mb-1.5">Brief Alignment Message</label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Provide detailed description of your administrative enquiry, licensing queries, or sponsorship requests..."
                    className="w-full bg-neutral-950 border border-neutral-850 focus:border-[#E50914] text-xs py-2.5 px-3 rounded-sm outline-none text-white resize-none"
                  />
                </div>
              </div>

              <div className="flex gap-3 p-4 bg-neutral-950 border border-neutral-900 rounded-sm text-xs text-neutral-500">
                <ShieldAlert className="w-5 h-5 text-[#E50914] shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  By submitting this alignment form, you confirm that the corporate details provided are legal and auditable. No data is stored outside the direct sekretariat email channels.
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-950 flex justify-end">
                <button
                  type="submit"
                  className="bg-[#E50914] hover:bg-[#8F0008] text-white font-display font-bold text-xs uppercase px-8 py-3.5 rounded-sm transition-all flex items-center gap-1.5 shadow-lg shadow-[#E50914]/15"
                >
                  <span>Dispatch Secure Message</span>
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
