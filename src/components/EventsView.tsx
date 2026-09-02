/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Calendar, MapPin, Users, Award, ShieldCheck, CreditCard, ChevronRight, CheckCircle2, Ticket, Sparkles, Download, DownloadCloud, Lock } from 'lucide-react';
import { EventModel, TicketTier, Registration } from '../types';

interface EventsViewProps {
  events: EventModel[];
  subView: string;
  onNavigate: (view: string, subView?: string) => void;
  isLoggedIn: boolean;
  currentUser: any;
}

export default function EventsView({ events, subView, onNavigate, isLoggedIn, currentUser }: EventsViewProps) {
  // Determine active event
  const eventId = subView || 'time-conference';
  const activeEvent = events.find(e => e.id === eventId) || events[0];

  // Booking Flow State
  const [bookingActive, setBookingActive] = useState(false);
  const [selectedTier, setSelectedTier] = useState<TicketTier | null>(null);
  const [checkoutStep, setCheckoutStep] = useState(1); // 1 to 6

  // Form Fields
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: '',
    company: currentUser?.company || '',
    position: currentUser?.position || '',
    industry: '',
    state: '',
    linkedin: '',
    attendanceType: 'Physical',
    dietaryPreference: 'None',
    specialRequirements: '',
    promoCode: ''
  });

  // Verification pass
  const [generatedPass, setGeneratedPass] = useState<Registration | null>(null);
  const [paymentSpinner, setPaymentSpinner] = useState(false);

  const startBooking = (tier: TicketTier) => {
    setSelectedTier(tier);
    setBookingActive(true);
    setCheckoutStep(1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    if (checkoutStep < 5) {
      setCheckoutStep(prev => prev + 1);
    } else if (checkoutStep === 5) {
      // Step 5 is Payment -> Spinner -> Step 6 (Confirmation)
      setPaymentSpinner(true);
      setTimeout(() => {
        setPaymentSpinner(false);
        
        // Generate cryptographic registration
        const regId = 'REG-' + Math.floor(100000 + Math.random() * 900000);
        const qrCodeValue = `40U40-NG-${activeEvent.id.toUpperCase()}-${regId}-${selectedTier?.name.toUpperCase().replace(/\s+/g, '-')}`;
        
        const newReg: Registration = {
          id: regId,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          position: formData.position,
          industry: formData.industry || 'Tech & Venture',
          state: formData.state || 'Lagos',
          linkedin: formData.linkedin || 'https://linkedin.com',
          ticketType: selectedTier?.name || 'General Access',
          eventId: activeEvent.id,
          eventTitle: activeEvent.title,
          qrPassCode: qrCodeValue,
          registrationDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
          checkedIn: false,
          paymentStatus: selectedTier!.price > 0 ? 'paid' : 'free',
          dietaryPreference: formData.dietaryPreference,
          specialRequirements: formData.specialRequirements
        };

        // Persist registration in LocalStorage so it instantly syncs with admin console
        const existingRegs = JSON.parse(localStorage.getItem('registrations') || '[]');
        existingRegs.push(newReg);
        localStorage.setItem('registrations', JSON.stringify(existingRegs));

        // Also save to current session for dashboard viewing
        sessionStorage.setItem('lastRegistration', JSON.stringify(newReg));

        setGeneratedPass(newReg);
        setCheckoutStep(6);
      }, 2000);
    }
  };

  const prevStep = () => {
    if (checkoutStep > 1) {
      setCheckoutStep(prev => prev - 1);
    }
  };

  const handleDownloadPass = () => {
    alert(`Downloading verified QR pass card for ${generatedPass?.name}. Identification Code: ${generatedPass?.id}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 pb-20">
      
      {!bookingActive ? (
        /* Event Details Layout */
        <>
          {/* Hero Banner */}
          <section className="relative h-[400px] rounded-sm overflow-hidden border border-neutral-900 group">
            <img
              src={activeEvent.image}
              alt={activeEvent.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover opacity-55"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
            <div className="absolute bottom-8 left-8 right-8 z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <span className="text-[10px] tracking-[0.3em] text-[#E50914] font-display font-bold uppercase block">
                  SIGNATURE ASSEMBLY
                </span>
                <h1 className="text-3xl md:text-5xl font-display font-extrabold text-white tracking-tight uppercase leading-none">
                  {activeEvent.title}
                </h1>
                <p className="text-neutral-300 text-xs sm:text-sm font-body font-light">
                  {activeEvent.tagline}
                </p>
              </div>

              <div className="bg-black/90 border border-neutral-800 p-4 rounded-sm flex items-center gap-3 shrink-0">
                <Calendar className="w-8 h-8 text-[#E50914]" />
                <div className="text-xs">
                  <span className="block text-neutral-500 font-display uppercase font-bold">NEXT ASSEMBLY</span>
                  <span className="text-white font-semibold font-body">{activeEvent.date}</span>
                </div>
              </div>
            </div>
          </section>

          {/* Description & Metadata grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column: Details & Program */}
            <div className="lg:col-span-8 space-y-10">
              <div className="space-y-4">
                <h2 className="text-xl font-display font-bold text-white uppercase tracking-tight border-b border-neutral-900 pb-3">
                  Assembly Overview
                </h2>
                <p className="text-neutral-400 text-xs sm:text-sm font-body leading-relaxed font-light">
                  {activeEvent.description}
                </p>
              </div>

              {/* Speakers panel */}
              <div className="space-y-6">
                <h2 className="text-xl font-display font-bold text-white uppercase tracking-tight border-b border-neutral-900 pb-3">
                  Distinguished Organizers & Speakers
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {activeEvent.speakers.map((spk) => (
                    <div key={spk.id} className="bg-[#0a0a0a] border border-neutral-900 p-4 rounded-sm space-y-3">
                      <div className="aspect-square rounded-sm overflow-hidden bg-neutral-950 border border-neutral-800">
                        <img src={spk.image} alt={spk.name} referrerPolicy="no-referrer" className="w-full h-full object-cover object-top opacity-85" />
                      </div>
                      <div>
                        <h4 className="text-xs font-display font-bold text-white uppercase leading-none">{spk.name}</h4>
                        <p className="text-[10px] text-[#E50914] font-body mt-1 leading-tight">{spk.title}</p>
                        <p className="text-[9px] text-neutral-500 font-body leading-none">{spk.company}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Schedule / Programme */}
              <div className="space-y-6">
                <h2 className="text-xl font-display font-bold text-white uppercase tracking-tight border-b border-neutral-900 pb-3">
                  Interactive Assembly Programme
                </h2>
                <div className="space-y-3">
                  {activeEvent.programme.map((item, idx) => (
                    <div key={idx} className="bg-[#0a0a0a] border border-neutral-900/60 p-4 rounded-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="sm:w-1/4">
                        <span className="text-xs font-display font-bold text-[#E50914] tracking-wider">{item.time}</span>
                      </div>
                      <div className="sm:w-3/4 space-y-1">
                        <h4 className="text-xs font-display font-bold text-white uppercase">{item.title}</h4>
                        {item.speaker && <p className="text-[10px] text-neutral-500 font-body">Session Speaker: <span className="text-neutral-400 font-semibold">{item.speaker}</span></p>}
                        {item.description && <p className="text-[11px] text-neutral-400 font-body font-light leading-relaxed">{item.description}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Venue Details */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-[#0a0a0a] border border-neutral-900 p-6 rounded-sm space-y-4">
                <h3 className="font-display font-bold text-white text-sm uppercase tracking-wide border-b border-neutral-900 pb-2">
                  VENUE & LOCATION
                </h3>
                <div className="space-y-3 text-xs font-body">
                  <div className="flex gap-2">
                    <MapPin className="w-4 h-4 text-[#E50914] shrink-0" />
                    <div>
                      <span className="block text-white font-semibold font-display uppercase text-[10px]">LAGOS ORIENTAL HOTEL</span>
                      <span className="text-neutral-400 leading-relaxed block mt-1">{activeEvent.address}</span>
                    </div>
                  </div>
                </div>
                
                {/* Embedded Stylized Map Graphic */}
                <div className="aspect-[16/10] bg-neutral-950 border border-neutral-900 rounded-sm relative flex flex-col justify-center items-center text-center p-4">
                  <div className="w-8 h-8 rounded-full bg-[#E50914]/10 border border-[#E50914] flex items-center justify-center animate-pulse mb-2">
                    <MapPin className="w-4 h-4 text-[#E50914]" />
                  </div>
                  <span className="text-[10px] font-display text-neutral-400 font-bold uppercase tracking-wider">Lagos Oriental Hotel</span>
                  <span className="text-[9px] text-neutral-600 font-body uppercase mt-1">Lekki-Epe Expressway Corridor</span>
                </div>
              </div>

              {/* Past Editions dropdown */}
              <div className="bg-[#0a0a0a] border border-neutral-900 p-6 rounded-sm space-y-4">
                <h3 className="font-display font-bold text-white text-sm uppercase tracking-wide border-b border-neutral-900 pb-2">
                  PAST ASSEMBLY ARCHIVES
                </h3>
                <div className="space-y-3">
                  {activeEvent.pastEditions.map((ed, idx) => (
                    <div key={idx} className="border-b border-neutral-950 pb-3 last:border-b-0 last:pb-0 space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="font-display font-bold text-[#E50914]">EDITION {ed.year}</span>
                        <span className="text-neutral-500 font-body">{ed.date}</span>
                      </div>
                      <h4 className="text-[11px] font-display font-bold text-neutral-300 uppercase leading-snug">{ed.theme}</h4>
                      <p className="text-[10px] text-neutral-500 font-body leading-relaxed">{ed.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Marquee/Tiers Section */}
          <section className="space-y-8 pt-6">
            <div className="text-center max-w-xl mx-auto space-y-3">
              <span className="text-[10px] tracking-[0.25em] text-[#E50914] font-display font-bold uppercase">Pass Admissions</span>
              <h2 className="text-2xl font-display font-extrabold text-white uppercase tracking-tight">ACQUIRE DELEGATE PASS</h2>
              <p className="text-neutral-400 text-xs font-body">Select an admission tier below to configure your credentialing and QR Access Card.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {activeEvent.ticketTiers.map((tier) => (
                <div key={tier.name} className="bg-[#0a0a0a] border border-neutral-900 p-6 rounded-sm flex flex-col justify-between hover:border-neutral-800 transition-all group">
                  <div className="space-y-4">
                    <div>
                      <span className="text-[10px] tracking-widest text-[#E50914] font-display font-bold uppercase">ADMISSION</span>
                      <h3 className="text-lg font-display font-bold text-white uppercase mt-1">{tier.name}</h3>
                      <p className="text-neutral-400 text-[11px] font-body mt-1 leading-relaxed">{tier.description}</p>
                    </div>

                    <div className="py-4 border-y border-neutral-900 flex items-baseline gap-1">
                      <span className="text-2xl font-display font-extrabold text-white">
                        {tier.price === 0 ? 'FREE' : `${tier.price.toLocaleString()} ${tier.currency}`}
                      </span>
                    </div>

                    <ul className="space-y-2 text-[11px] font-body text-neutral-400">
                      {tier.benefits.map((b, i) => (
                        <li key={i} className="flex gap-2 items-start">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#E50914] shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6">
                    <button
                      onClick={() => startBooking(tier)}
                      className="w-full text-center bg-[#E50914] hover:bg-[#8F0008] text-white font-display font-bold text-xs uppercase py-3 rounded-sm transition-colors"
                    >
                      Configure Pass
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FAQs and Legal */}
          <section className="bg-[#0a0a0a] border border-neutral-900 p-8 rounded-sm">
            <h3 className="font-display font-bold text-white text-base uppercase tracking-wide border-b border-neutral-900 pb-3 mb-6">
              Assembly Frequently Asked Questions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeEvent.faqs.map((faq, i) => (
                <div key={i} className="space-y-2">
                  <h4 className="text-xs font-display font-bold text-[#E50914] uppercase">{faq.question}</h4>
                  <p className="text-[11px] text-neutral-400 font-body leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        </>
      ) : (
        /* Luxury Checkout Experience */
        <div className="max-w-2xl mx-auto bg-[#0a0a0a] border border-neutral-900 p-6 sm:p-10 rounded-sm relative overflow-hidden">
          
          {/* Header */}
          <div className="border-b border-neutral-900 pb-4 mb-6 flex justify-between items-center">
            <div>
              <span className="text-[10px] tracking-widest text-[#E50914] font-display font-bold uppercase block">PASS GENERATION</span>
              <span className="text-white font-display font-bold uppercase text-xs">
                {selectedTier?.name} • {activeEvent.title}
              </span>
            </div>
            {checkoutStep < 6 && (
              <span className="text-neutral-500 font-display font-bold text-xs">
                STEP {checkoutStep} of 5
              </span>
            )}
          </div>

          {/* Form Progress bar */}
          {checkoutStep < 6 && (
            <div className="w-full bg-neutral-950 h-1 rounded-full mb-8 overflow-hidden relative">
              <div
                className="h-full bg-[#E50914] transition-all duration-300"
                style={{ width: `${(checkoutStep / 5) * 100}%` }}
              />
            </div>
          )}

          {/* Checkout Steps */}
          {checkoutStep === 1 && (
            <div className="space-y-5 animate-fade-in">
              <h3 className="text-sm font-display font-bold text-[#F7F7F5] uppercase">01 • Personal Identity Vetting</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] tracking-widest text-neutral-500 font-display font-semibold uppercase mb-1.5">Full Corporate Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-neutral-950 border border-neutral-800 focus:border-[#E50914] text-xs py-2.5 px-3 rounded-sm outline-none text-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] tracking-widest text-neutral-500 font-display font-semibold uppercase mb-1.5">Corporate Email Address</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-neutral-950 border border-neutral-800 focus:border-[#E50914] text-xs py-2.5 px-3 rounded-sm outline-none text-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] tracking-widest text-neutral-500 font-display font-semibold uppercase mb-1.5">Mobile Contact Line</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="+234..."
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-neutral-950 border border-neutral-800 focus:border-[#E50914] text-xs py-2.5 px-3 rounded-sm outline-none text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {checkoutStep === 2 && (
            <div className="space-y-5 animate-fade-in">
              <h3 className="text-sm font-display font-bold text-[#F7F7F5] uppercase">02 • Professional Background</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] tracking-widest text-neutral-500 font-display font-semibold uppercase mb-1.5">Company Name</label>
                  <input
                    type="text"
                    name="company"
                    required
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full bg-neutral-950 border border-neutral-800 focus:border-[#E50914] text-xs py-2.5 px-3 rounded-sm outline-none text-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] tracking-widest text-neutral-500 font-display font-semibold uppercase mb-1.5">Executive Position</label>
                  <input
                    type="text"
                    name="position"
                    required
                    value={formData.position}
                    onChange={handleInputChange}
                    className="w-full bg-neutral-950 border border-neutral-800 focus:border-[#E50914] text-xs py-2.5 px-3 rounded-sm outline-none text-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] tracking-widest text-neutral-500 font-display font-semibold uppercase mb-1.5">Business Industry</label>
                  <select
                    name="industry"
                    value={formData.industry}
                    onChange={handleInputChange}
                    className="w-full bg-neutral-950 border border-neutral-800 focus:border-[#E50914] text-xs py-2.5 px-3 rounded-sm outline-none text-white cursor-pointer"
                  >
                    <option value="">Select Industry</option>
                    <option value="Agriculture">Agriculture & Agribusiness</option>
                    <option value="Fintech">Fintech & Finance</option>
                    <option value="Real Estate">Real Estate & Smart Cities</option>
                    <option value="Technology">Technology & Software Engineering</option>
                    <option value="Healthcare">Healthcare & Biotech</option>
                    <option value="Creative">Creative Industries & Nollywood</option>
                    <option value="Media">Media & Public Relations</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] tracking-widest text-neutral-500 font-display font-semibold uppercase mb-1.5">State of Operation</label>
                  <input
                    type="text"
                    name="state"
                    placeholder="Lagos, Abuja, Rivers..."
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full bg-neutral-950 border border-neutral-800 focus:border-[#E50914] text-xs py-2.5 px-3 rounded-sm outline-none text-white"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[10px] tracking-widest text-neutral-500 font-display font-semibold uppercase mb-1.5">LinkedIn Profile Link</label>
                  <input
                    type="url"
                    name="linkedin"
                    placeholder="https://linkedin.com/in/..."
                    value={formData.linkedin}
                    onChange={handleInputChange}
                    className="w-full bg-neutral-950 border border-neutral-800 focus:border-[#E50914] text-xs py-2.5 px-3 rounded-sm outline-none text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {checkoutStep === 3 && (
            <div className="space-y-5 animate-fade-in">
              <h3 className="text-sm font-display font-bold text-[#F7F7F5] uppercase">03 • Attendance Routing</h3>
              <div className="space-y-4">
                <label className="block text-[10px] tracking-widest text-neutral-500 font-display font-semibold uppercase mb-1.5">Engagement Mode</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData(p => ({ ...p, attendanceType: 'Physical' }))}
                    className={`p-4 rounded-sm border text-left flex flex-col justify-between h-24 transition-all ${
                      formData.attendanceType === 'Physical'
                        ? 'bg-neutral-950 border-[#E50914]'
                        : 'bg-transparent border-neutral-850 hover:border-neutral-800'
                    }`}
                  >
                    <span className="block text-white font-display font-bold text-xs">PHYSICAL PRESENCE</span>
                    <span className="text-[10px] text-neutral-500 font-body">Lagos Oriental Hotel Grand Ballroom seating.</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData(p => ({ ...p, attendanceType: 'Virtual' }))}
                    className={`p-4 rounded-sm border text-left flex flex-col justify-between h-24 transition-all ${
                      formData.attendanceType === 'Virtual'
                        ? 'bg-neutral-950 border-[#E50914]'
                        : 'bg-transparent border-neutral-850 hover:border-neutral-800'
                    }`}
                  >
                    <span className="block text-white font-display font-bold text-xs">VIRTUAL ACCESS</span>
                    <span className="text-[10px] text-neutral-500 font-body">HD Real-time audio-visual stream matches.</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {checkoutStep === 4 && (
            <div className="space-y-5 animate-fade-in">
              <h3 className="text-sm font-display font-bold text-[#F7F7F5] uppercase">04 • VIP Preference Customization</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] tracking-widest text-neutral-500 font-display font-semibold uppercase mb-1.5">Dietary Selection (VIP Buffet)</label>
                  <select
                    name="dietaryPreference"
                    value={formData.dietaryPreference}
                    onChange={handleInputChange}
                    className="w-full bg-neutral-950 border border-neutral-800 focus:border-[#E50914] text-xs py-2.5 px-3 rounded-sm outline-none text-white cursor-pointer"
                  >
                    <option value="None">Standard Luxury Menu</option>
                    <option value="Vegetarian">Vegetarian Selection</option>
                    <option value="Halal">Halal Selection</option>
                    <option value="Kosher">Kosher Selection</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] tracking-widest text-neutral-500 font-display font-semibold uppercase mb-1.5">Special Dietary or Access Requirements</label>
                  <textarea
                    name="specialRequirements"
                    rows={3}
                    placeholder="Enter any access, seating, or medical requirements..."
                    value={formData.specialRequirements}
                    onChange={handleInputChange}
                    className="w-full bg-neutral-950 border border-neutral-800 focus:border-[#E50914] text-xs py-2.5 px-3 rounded-sm outline-none text-white resize-none"
                  />
                </div>
              </div>
            </div>
          )}

          {checkoutStep === 5 && (
            <div className="space-y-5 animate-fade-in">
              <h3 className="text-sm font-display font-bold text-[#F7F7F5] uppercase">05 • Secure Payment Clearance</h3>
              
              <div className="bg-neutral-950 border border-neutral-900 p-4 rounded-sm space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="text-neutral-400">Pass Type Selected</span>
                  <span className="text-white font-semibold font-display">{selectedTier?.name}</span>
                </div>
                <div className="flex justify-between text-xs border-t border-neutral-900 pt-2">
                  <span className="text-neutral-400">Due Payment</span>
                  <span className="text-[#E50914] font-extrabold font-display">
                    {selectedTier?.price === 0 ? 'FREE / SECURE' : `${selectedTier?.price.toLocaleString()} NGN`}
                  </span>
                </div>
              </div>

              {selectedTier && selectedTier.price > 0 ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-[10px] tracking-wider font-display text-neutral-500 uppercase">
                    <CreditCard className="w-4 h-4 text-[#E50914]" />
                    <span>SECURE CARD CLEARANCE (SIMULATION)</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-[10px] tracking-widest text-neutral-500 font-display font-semibold uppercase mb-1.5">Cardholder Name</label>
                      <input
                        type="text"
                        required
                        placeholder={formData.name}
                        className="w-full bg-neutral-950 border border-neutral-800 text-xs py-2.5 px-3 rounded-sm outline-none text-neutral-400"
                        disabled
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] tracking-widest text-neutral-500 font-display font-semibold uppercase mb-1.5">Card Number</label>
                      <input
                        type="text"
                        required
                        placeholder="•••• •••• •••• ••••"
                        maxLength={19}
                        className="w-full bg-neutral-950 border border-neutral-800 focus:border-[#E50914] text-xs py-2.5 px-3 rounded-sm outline-none text-white"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] tracking-widest text-neutral-500 font-display font-semibold uppercase mb-1.5">Expiry</label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          maxLength={5}
                          className="w-full bg-neutral-950 border border-neutral-800 focus:border-[#E50914] text-xs py-2.5 px-3 rounded-sm outline-none text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] tracking-widest text-neutral-500 font-display font-semibold uppercase mb-1.5">CVC</label>
                        <input
                          type="password"
                          placeholder="•••"
                          maxLength={3}
                          className="w-full bg-neutral-950 border border-neutral-800 focus:border-[#E50914] text-xs py-2.5 px-3 rounded-sm outline-none text-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3 p-4 bg-[#E50914]/5 border border-[#E50914]/10 rounded-sm text-xs text-neutral-400">
                  <CheckCircle2 className="w-5 h-5 text-[#E50914] shrink-0" />
                  <p className="leading-relaxed">
                    This registration represents a Free general delegate reservation. No banking transactions are required. Press continue to secure your QR pass card instantly.
                  </p>
                </div>
              )}

              <div className="flex items-center gap-1.5 justify-center text-[10px] text-neutral-600 font-display uppercase tracking-wider pt-2">
                <Lock className="w-3.5 h-3.5 text-[#E50914]" />
                <span>Encrypted SECURE Socket Routing</span>
              </div>
            </div>
          )}

          {checkoutStep === 6 && generatedPass && (
            <div className="space-y-6 text-center animate-fade-in py-4">
              <div className="w-12 h-12 rounded-full bg-[#E50914]/10 border border-[#E50914] flex items-center justify-center mx-auto mb-2">
                <ShieldCheck className="w-6 h-6 text-[#E50914]" />
              </div>
              <div>
                <h3 className="text-xl font-display font-extrabold text-white uppercase tracking-tight">YOU'RE REGISTERED</h3>
                <p className="text-neutral-400 text-xs font-body mt-1 max-w-sm mx-auto">
                  Your VIP Pass and check-in QR code have been compiled and registered successfully.
                </p>
              </div>

              {/* GORGEOUS VERIFIED PASS CARD */}
              <div className="bg-neutral-950 border border-neutral-800 p-6 rounded-sm text-left relative max-w-sm mx-auto overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#8F0008]/5 rounded-full blur-2xl pointer-events-none"></div>
                <div className="flex justify-between items-start border-b border-neutral-900 pb-3 mb-4">
                  <div>
                    <span className="text-[9px] tracking-widest text-[#E50914] font-display font-bold uppercase block">VERIFIED CREDENTIAL</span>
                    <span className="text-white text-xs font-display font-bold uppercase">{generatedPass.eventTitle}</span>
                  </div>
                  <span className="text-white bg-[#E50914] text-[9px] font-display font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider">
                    {generatedPass.ticketType}
                  </span>
                </div>

                <div className="space-y-3 font-body text-xs text-neutral-400">
                  <div>
                    <span className="text-[9px] tracking-wider text-neutral-600 uppercase font-display block">Delegate Name</span>
                    <span className="text-white font-semibold">{generatedPass.name}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-[9px] tracking-wider text-neutral-600 uppercase font-display block">Pass ID Code</span>
                      <span className="text-white font-semibold font-display text-[10px]">{generatedPass.id}</span>
                    </div>
                    <div>
                      <span className="text-[9px] tracking-wider text-neutral-600 uppercase font-display block">State Range</span>
                      <span className="text-white font-semibold">{generatedPass.state}</span>
                    </div>
                  </div>
                </div>

                {/* Simulated CSS QR Code */}
                <div className="mt-5 border-t border-neutral-900 pt-5 flex justify-center items-center">
                  <div className="bg-white p-3 rounded-sm flex flex-col items-center">
                    {/* Generates a nice abstract digital grid representation of QR Code */}
                    <div className="w-32 h-32 bg-white flex flex-col gap-1 justify-between select-none">
                      <div className="flex justify-between h-7 w-full">
                        <div className="w-7 bg-black rounded-sm border-2 border-white"></div>
                        <div className="w-14 flex flex-wrap gap-0.5 p-0.5">
                          {Array.from({ length: 8 }).map((_, i) => <div key={i} className={`w-2.5 h-2.5 ${i % 3 === 0 ? 'bg-black' : 'bg-transparent'}`} />)}
                        </div>
                        <div className="w-7 bg-black rounded-sm border-2 border-white"></div>
                      </div>
                      <div className="flex justify-between h-14 w-full">
                        <div className="w-full flex flex-wrap gap-0.5 p-0.5">
                          {Array.from({ length: 32 }).map((_, i) => <div key={i} className={`w-2.5 h-2.5 ${i % 2 === 0 || i % 7 === 0 ? 'bg-black' : 'bg-transparent'}`} />)}
                        </div>
                      </div>
                      <div className="flex justify-between h-7 w-full">
                        <div className="w-7 bg-black rounded-sm border-2 border-white"></div>
                        <div className="w-14 flex flex-wrap gap-0.5 p-0.5">
                          {Array.from({ length: 8 }).map((_, i) => <div key={i} className={`w-2.5 h-2.5 ${i % 4 === 1 ? 'bg-black' : 'bg-transparent'}`} />)}
                        </div>
                        <div className="w-7 bg-black rounded-sm border-2 border-white"></div>
                      </div>
                    </div>
                    <span className="text-[8px] font-display text-neutral-500 font-bold tracking-wider mt-1.5 uppercase">SCAN AT GATE ENTRY</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 max-w-sm mx-auto">
                <button
                  onClick={handleDownloadPass}
                  className="flex-1 bg-neutral-950 border border-neutral-800 hover:border-neutral-700 text-[#F7F7F5] font-display font-bold text-xs py-3 px-4 rounded-sm transition-all flex items-center justify-center gap-1.5"
                >
                  <DownloadCloud className="w-4 h-4 text-[#E50914]" />
                  DOWNLOAD PASS
                </button>
                <button
                  onClick={() => onNavigate('community', 'portal')}
                  className="flex-1 bg-[#E50914] hover:bg-[#8F0008] text-white font-display font-bold text-xs py-3 px-4 rounded-sm transition-all"
                >
                  VIEW PORTAL
                </button>
              </div>
            </div>
          )}

          {/* Action buttons */}
          {checkoutStep < 6 && (
            <div className="mt-8 pt-6 border-t border-neutral-900 flex justify-between gap-4">
              <button
                onClick={checkoutStep === 1 ? () => setBookingActive(false) : prevStep}
                className="bg-transparent text-neutral-500 hover:text-white font-display font-bold text-xs uppercase py-2"
                disabled={paymentSpinner}
              >
                {checkoutStep === 1 ? 'Cancel' : 'Back'}
              </button>

              <button
                onClick={nextStep}
                className="bg-[#E50914] hover:bg-[#8F0008] text-white font-display font-bold text-xs uppercase px-6 py-2.5 rounded-sm transition-all flex items-center gap-1.5 disabled:opacity-50"
                disabled={paymentSpinner}
              >
                {paymentSpinner ? (
                  <>
                    <span className="animate-spin h-3.5 w-3.5 border-2 border-white border-t-transparent rounded-full" />
                    <span>Clearing Transit...</span>
                  </>
                ) : (
                  <>
                    <span>{checkoutStep === 5 ? 'Authorize & Pay' : 'Continue'}</span>
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
