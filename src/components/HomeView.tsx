/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Calendar, MapPin, Users, Award, ShieldAlert, Sparkles, ChevronRight, MessageSquare, Play, Volume2 } from 'lucide-react';
import { EventModel, Awardee, Testimonial } from '../types';

interface HomeViewProps {
  events: EventModel[];
  awardees: Awardee[];
  testimonials: Testimonial[];
  onNavigate: (view: string, subView?: string) => void;
}

export default function HomeView({ events, awardees, testimonials, onNavigate }: HomeViewProps) {
  // Find the next upcoming event (which is TIME Conference)
  const nextEvent = events.find(e => e.id === 'time-conference') || events[0];

  // Live countdown state
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [activePillar, setActivePillar] = useState<'discover' | 'recognize' | 'connect' | 'empower' | 'impact'>('discover');

  // Terms Carousel Animation
  const [currentTermIndex, setCurrentTermIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const terms = ['EXCEPTIONAL.', 'VISIONARIES.', 'TRAILBLAZERS.', 'PIONEERS.', 'LEADERS.'];

  useEffect(() => {
    const termInterval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setCurrentTermIndex((prev) => (prev + 1) % terms.length);
        setIsFading(false);
      }, 350);
    }, 2800);
    return () => clearInterval(termInterval);
  }, []);

  useEffect(() => {
    // Target April 24, 2027
    const targetDate = new Date('2027-04-24T09:00:00').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const pillars = {
    discover: {
      title: 'DISCOVER',
      subtitle: 'Mapping Unseen Leadership',
      description: 'We run a continuous, research-led, multi-channel national audit to identify quiet young builders, innovative founders, and ethical public officers operating in all 36 Nigerian states. Excellence cannot remain hidden.',
      fact: 'Over 2,500 nominees audited annually across the nation.'
    },
    recognize: {
      title: 'RECOGNIZE',
      subtitle: 'The Standard of Prestige',
      description: 'Our screening committee leverages a rigid vetting schema covering corporate disclosures, auditable jobs, community footprint, and independent audits. Our awards represent authentic achievements.',
      fact: 'Vetted by an independent advisory council of elite business veterans.'
    },
    connect: {
      title: 'CONNECT',
      subtitle: 'Fusing Capital & Ambition',
      description: 'We do not run simple gala dinners. We deliberately curate executive seating, matching founders directly with capital partners, regional governors, public regulators, and corporate stakeholders.',
      fact: 'Facilitated over N2.5B in direct venture and infrastructure match-making.'
    },
    empower: {
      title: 'EMPOWER',
      subtitle: 'A Legacy of Knowledge',
      description: 'Through our masterclasses, quarterly workshops, and executive mentoring pipelines, we transfer critical leadership wisdom from established industrialists to emerging 40Under40 laureates.',
      fact: 'Mentorship network including 30+ advisory board members and global partners.'
    },
    impact: {
      title: 'IMPACT',
      subtitle: 'Pioneering Structural Progress',
      description: 'Our members represent an unbreakable chain of national progress. Together, our awardees currently sustain thousands of jobs and manage key infrastructure arrays fueling the digital economy.',
      fact: 'Laureates sustain an estimated 4,200+ direct jobs nationwide.'
    }
  };

  // Stats Counters (Simulate real values)
  const stats = [
    { label: 'ANNUAL EDITIONS', value: '4' },
    { label: 'NOMINEES AUDITED', value: '3,800+' },
    { label: 'INDUCTED AWARDEES', value: '160+' },
    { label: 'ANNUAL ATTENDEES', value: '2,500+' },
    { label: 'ECONOMIC SECTORS', value: '18+' }
  ];

  return (
    <div className="space-y-24 pb-20 overflow-hidden">
      
      {/* 1. Cinematic Hero Section */}
      <section id="hero-section" className="relative min-h-[90vh] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 text-center py-20 overflow-hidden border-b border-white/5">
        
        {/* Cinematic abstract background overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-transparent to-slate-950/20 z-10 pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-950/10 via-slate-950/30 to-slate-950/50 z-0"></div>
        
        {/* Signature Frosted Glass Spotlights */}
        <div className="absolute top-1/4 -left-36 w-96 h-96 bg-red-600/10 rounded-full blur-[120px] pointer-events-none animate-pulse duration-[8000ms]"></div>
        <div className="absolute bottom-1/4 -right-36 w-96 h-96 bg-amber-600/10 rounded-full blur-[120px] pointer-events-none animate-pulse duration-[6000ms]"></div>

        {/* Marquee scrolling text in background for texture */}
        <div className="absolute inset-x-0 top-1/3 opacity-2 select-none pointer-events-none font-display font-extrabold text-[12vw] tracking-tighter whitespace-nowrap overflow-hidden text-slate-800/20">
          DISCOVER • RECOGNIZE • CONNECT • EMPOWER • IMPACT
        </div>

        <div className="relative z-20 max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 glass rounded-full mb-4 bg-white/5">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span className="text-[10px] sm:text-xs font-display tracking-[0.2em] font-semibold text-red-400 uppercase">
              2027 Nomination Vetting is Currently Open
            </span>
          </div>

          <h1 className="text-5xl sm:text-7xl font-display font-extrabold tracking-tight text-[#F7F7F5] leading-none uppercase">
            CELEBRATING THE{' '}
            <span className={`inline-block transition-all duration-300 transform ${isFading ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'} text-transparent bg-clip-text bg-gradient-to-r from-[#E50914] via-red-500 to-amber-500 min-w-[280px] sm:min-w-[420px]`}>
              {terms[currentTermIndex]}
            </span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-lg max-w-2xl mx-auto font-body font-light leading-relaxed">
            Where Nigeria's most ambitious young leaders, corporate operators, and disruptive innovators are discovered, audited, and connected to national influence.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
            <button
              onClick={() => onNavigate('awards', 'nominate')}
              className="w-full sm:w-auto bg-gradient-to-r from-red-600 via-[#E50914] to-amber-600 hover:opacity-90 text-white font-display font-bold text-xs tracking-wider uppercase px-8 py-4 rounded-full transition-all shadow-lg shadow-red-600/20 active:scale-95"
            >
              Nominate a Leader
            </button>
            <button
              onClick={() => onNavigate('events', 'time-conference')}
              className="w-full sm:w-auto glass glass-hover text-slate-200 font-display font-bold text-xs tracking-wider uppercase px-8 py-4 rounded-full transition-all"
            >
              Explore Events
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden sm:block">
          <div className="w-6 h-10 border border-white/10 rounded-full flex items-start justify-center p-1.5 bg-slate-950/10">
            <div className="w-1.5 h-1.5 bg-red-400 rounded-full animate-bounce"></div>
          </div>
        </div>
      </section>

      {/* 2. Hero Event System & Live Countdown */}
      <section id="countdown-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass p-6 sm:p-10 rounded-3xl relative overflow-hidden bg-white/[0.02]">
          {/* Subtle design element */}
          <div className="absolute top-0 right-0 p-3 text-[9px] tracking-[0.2em] font-display text-slate-500 font-bold select-none">
            LEGACY ECOSYSTEM
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Event Description */}
            <div className="lg:col-span-5 space-y-4">
              <span className="text-[10px] tracking-[0.3em] text-red-500 font-display font-bold uppercase">
                UPCOMING FLAGSHIP EVENT
              </span>
              <h2 className="text-3xl font-display font-extrabold text-white uppercase tracking-tight leading-none">
                {nextEvent.title}
              </h2>
              <p className="text-slate-300 text-xs font-body leading-relaxed">
                Theme: <span className="text-red-300 font-medium">Economic Renaissance: Bold Imperatives for African Growth</span>. Bringing together 1,000+ executives at the Lagos Oriental Hotel.
              </p>
              
              <div className="space-y-2 pt-2 text-xs font-body text-slate-400">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-red-500" />
                  <span>Saturday, April 24, 2027 • 09:00 AM WAT</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-red-500" />
                  <span>Grand Ballroom, Lagos Oriental Hotel, VI</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('events', 'time-conference')}
                  className="inline-flex items-center gap-1.5 text-xs font-display font-bold text-red-500 hover:text-red-400 transition-colors"
                >
                  ACQUIRE DELEGATE SEAT <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Live Ticking Countdown */}
            <div className="lg:col-span-7 flex flex-col items-center lg:items-end justify-center">
              <div className="grid grid-cols-4 gap-2 sm:gap-4 text-center max-w-md w-full">
                
                <div className="glass p-4 rounded-2xl bg-white/[0.02]">
                  <span className="block text-3xl sm:text-4xl font-display font-extrabold text-[#F7F7F5]">{timeLeft.days}</span>
                  <span className="text-[10px] tracking-wider text-slate-400 font-display font-medium">DAYS</span>
                </div>

                <div className="glass p-4 rounded-2xl bg-white/[0.02]">
                  <span className="block text-3xl sm:text-4xl font-display font-extrabold text-[#F7F7F5]">{timeLeft.hours}</span>
                  <span className="text-[10px] tracking-wider text-slate-400 font-display font-medium">HOURS</span>
                </div>

                <div className="glass p-4 rounded-2xl bg-white/[0.02]">
                  <span className="block text-3xl sm:text-4xl font-display font-extrabold text-[#F7F7F5]">{timeLeft.minutes}</span>
                  <span className="text-[10px] tracking-wider text-slate-400 font-display font-medium">MINUTES</span>
                </div>

                <div className="glass p-4 rounded-2xl bg-white/[0.02]">
                  <span className="block text-3xl sm:text-4xl font-display font-extrabold text-red-500 animate-pulse">{timeLeft.seconds}</span>
                  <span className="text-[10px] tracking-wider text-slate-400 font-display font-medium">SECONDS</span>
                </div>

              </div>

              <div className="mt-4 flex items-center gap-2 bg-red-500/5 border border-red-500/20 px-4 py-2 rounded-full max-w-md w-full justify-center">
                <Sparkles className="w-4 h-4 text-red-500" />
                <span className="text-[10px] font-display tracking-wide font-medium text-slate-300">
                  VIP & Corporate Table seating capacity is capped at 150 delegates.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The Platform Pillars Showcase */}
      <section id="platform-pillars" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto space-y-4 mb-12">
          <span className="text-[10px] tracking-[0.25em] text-red-500 font-display font-bold uppercase">
            ECOSYSTEM FRAMEWORK
          </span>
          <h2 className="text-3xl font-display font-extrabold tracking-tight text-white uppercase leading-none">
            MORE THAN AN AWARD.
          </h2>
          <p className="text-slate-300 text-xs font-body">
            40UNDER40 NIGERIA operates as an active corporate networking institution, bridging the gap between raw potential, venture capital, and policy leadership.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 border border-white/10 divide-y lg:divide-y-0 lg:divide-x divide-white/10 rounded-t-3xl overflow-hidden glass bg-white/[0.01]">
          {(Object.keys(pillars) as Array<keyof typeof pillars>).map((key) => {
            const item = pillars[key];
            const isActive = activePillar === key;
            return (
              <button
                key={key}
                onClick={() => setActivePillar(key)}
                className={`text-left p-6 transition-all relative outline-none focus:outline-none ${
                  isActive ? 'bg-white/5 backdrop-blur-md' : 'hover:bg-white/[0.02] bg-transparent'
                }`}
              >
                {isActive && (
                  <div className="absolute left-0 lg:left-auto lg:top-0 lg:right-0 h-full lg:h-[1.5px] w-[1.5px] lg:w-full bg-red-500" />
                )}
                <span className={`block text-[10px] tracking-[0.2em] font-display font-bold mb-1 ${isActive ? 'text-red-400' : 'text-slate-500'}`}>
                  0{Object.keys(pillars).indexOf(key) + 1} • PILLAR
                </span>
                <span className="block text-sm font-display font-bold text-white tracking-wide">{item.title}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Pillar Details card */}
        <div className="glass border-t-0 p-8 rounded-b-3xl relative bg-white/[0.02]">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-8 space-y-3">
              <span className="text-xs tracking-wider font-display font-medium text-red-400">
                {pillars[activePillar].subtitle}
              </span>
              <p className="text-slate-200 font-body text-sm leading-relaxed font-light">
                {pillars[activePillar].description}
              </p>
            </div>
            <div className="md:col-span-4 glass p-4 rounded-2xl bg-white/[0.01] flex flex-col justify-between h-full">
              <span className="text-[10px] text-slate-400 font-display font-bold block mb-2 uppercase">Verified Stat Indicator</span>
              <p className="text-slate-300 text-xs font-body leading-relaxed">{pillars[activePillar].fact}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Statistics counter */}
      <section id="stats-section" className="bg-white/[0.01] border-y border-white/5 py-12 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
            {stats.map((stat, i) => (
              <div key={i} className="space-y-1">
                <span className="block text-2xl sm:text-3xl font-display font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-red-400 via-red-500 to-amber-500 tracking-tight">{stat.value}</span>
                <span className="block text-[9px] tracking-widest text-slate-400 font-display font-bold">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Signature Event Cards */}
      <section id="events-overview" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto space-y-4 mb-12">
          <span className="text-[10px] tracking-[0.25em] text-red-500 font-display font-bold uppercase">
            SIGNATURE ASSEMBLIES
          </span>
          <h2 className="text-3xl font-display font-extrabold tracking-tight text-white uppercase leading-none">
            OUR ANNUAL EVENT SUITE.
          </h2>
          <p className="text-slate-300 text-xs font-body">
            Three distinct annual milestones meticulously designed to identify talent, honor excellence, and celebrate legacy.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {events.map((evt) => (
            <div key={evt.id} className="glass rounded-3xl flex flex-col justify-between hover:border-white/20 transition-all duration-300 group overflow-hidden bg-white/[0.01]">
              <div className="relative h-48 overflow-hidden bg-slate-950/20">
                <img
                  src={evt.image}
                  alt={evt.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/30"></div>
                <div className="absolute top-4 left-4 glass bg-slate-950/80 px-3 py-1 rounded-full text-[10px] font-display font-semibold text-amber-400 uppercase">
                  {evt.timing}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-display font-bold text-white uppercase group-hover:text-red-400 transition-colors">{evt.title}</h3>
                  <p className="text-red-400 text-xs font-display font-semibold tracking-wide">{evt.subtitle}</p>
                  <p className="text-slate-300 text-xs font-body leading-relaxed line-clamp-3 font-light">{evt.description}</p>
                </div>

                <div className="pt-4 border-t border-white/5 space-y-3">
                  <div className="flex items-center gap-2 text-[11px] font-body text-slate-400">
                    <MapPin className="w-3.5 h-3.5 text-red-500" />
                    <span className="truncate">{evt.venue}</span>
                  </div>
                  <button
                    onClick={() => onNavigate('events', evt.id)}
                    className="w-full text-center glass glass-hover text-white font-display font-bold text-xs uppercase py-2.5 rounded-full"
                  >
                    Explore Flagship Assembly
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Event Calendar Timeline */}
      <section id="calendar-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass p-8 rounded-3xl bg-white/[0.01]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-[10px] tracking-[0.25em] text-red-500 font-display font-bold uppercase">Chronological Plan</span>
              <h3 className="text-xl font-display font-extrabold text-white uppercase tracking-tight">Ecosystem Calendar 2027</h3>
            </div>
            <span className="text-xs text-slate-400 font-body">All assemblies operate physically at the Lagos Oriental Hotel, VI.</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white/5 -translate-y-1/2 hidden md:block"></div>
            
            <div className="glass p-5 rounded-2xl relative z-10 group bg-white/[0.01]">
              <span className="text-xs font-display font-extrabold text-red-500 tracking-wider block mb-2">APRIL 24, 2027</span>
              <h4 className="text-sm font-display font-bold text-white uppercase mb-1">TIME CONFERENCE</h4>
              <p className="text-[11px] text-slate-300 font-body leading-relaxed mb-4 font-light">Focus: Fintech, Climate Agribusiness, Venture funding structures, and corporate growth masterclasses.</p>
              <button onClick={() => onNavigate('events', 'time-conference')} className="text-[10px] font-display font-bold text-red-500 group-hover:translate-x-1.5 transition-transform inline-flex items-center gap-1 uppercase">BOOK PASS <ChevronRight className="w-3.5 h-3.5" /></button>
            </div>

            <div className="glass p-5 rounded-2xl relative z-10 group bg-white/[0.01]">
              <span className="text-xs font-display font-extrabold text-red-500 tracking-wider block mb-2">AUGUST 14, 2027</span>
              <h4 className="text-sm font-display font-bold text-white uppercase mb-1">40UNDER40 GALA & AWARDS</h4>
              <p className="text-[11px] text-slate-300 font-body leading-relaxed mb-4 font-light">Focus: Rigorous screening validation of forty outstanding leaders under forty. High luxury black-tie gala banquet.</p>
              <button onClick={() => onNavigate('events', 'gala-night')} className="text-[10px] font-display font-bold text-red-500 group-hover:translate-x-1.5 transition-transform inline-flex items-center gap-1 uppercase">NOMINATE <ChevronRight className="w-3.5 h-3.5" /></button>
            </div>

            <div className="glass p-5 rounded-2xl relative z-10 group bg-white/[0.01]">
              <span className="text-xs font-display font-extrabold text-amber-500 tracking-wider block mb-2">DECEMBER 18, 2027</span>
              <h4 className="text-sm font-display font-bold text-white uppercase mb-1">100 PERSONS OF THE YEAR</h4>
              <p className="text-[11px] text-slate-300 font-body leading-relaxed mb-4 font-light">Focus: Celebrating one hundred exemplary patriots driving societal impact and professional legacy throughout Nigeria.</p>
              <button onClick={() => onNavigate('events', 'persons-of-the-year')} className="text-[10px] font-display font-bold text-amber-500 group-hover:translate-x-1.5 transition-transform inline-flex items-center gap-1 uppercase">LEARN MORE <ChevronRight className="w-3.5 h-3.5" /></button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Featured Hall of Fame Grid */}
      <section id="hof-snippet" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-10">
          <div>
            <span className="text-[10px] tracking-[0.25em] text-red-500 font-display font-bold uppercase">THE ALUMNI</span>
            <h2 className="text-2xl font-display font-extrabold text-white uppercase tracking-tight">MEET THE 40 LAUREATES</h2>
          </div>
          <button
            onClick={() => onNavigate('awards', 'hall-of-fame')}
            className="text-xs font-display font-bold text-red-500 hover:text-red-400 uppercase tracking-wider inline-flex items-center gap-1"
          >
            SEARCH ALL LAUREATES ({awardees.length}) <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {awardees.slice(0, 3).map((aw) => (
            <div key={aw.id} className="glass rounded-2xl hover:border-white/20 transition-all duration-300 p-5 group flex flex-col justify-between bg-white/[0.01]">
              <div className="flex gap-4 items-start">
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-950 shrink-0 border border-white/5">
                  <img src={aw.photoUrl} alt={aw.name} referrerPolicy="no-referrer" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-white group-hover:text-red-400 transition-colors">{aw.name}</h4>
                  <p className="text-xs text-slate-300 font-body">{aw.position}</p>
                  <p className="text-[10px] text-slate-400 font-body uppercase tracking-wider">{aw.company}</p>
                </div>
              </div>

              <div className="my-4 pt-4 border-t border-white/5">
                <span className="inline-block text-[10px] tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-amber-500 font-display font-bold uppercase mb-1">
                  CLASS OF {aw.year} • {aw.category}
                </span>
                <p className="text-slate-300 text-xs font-body line-clamp-2 leading-relaxed font-light">{aw.bio}</p>
              </div>

              <button
                onClick={() => onNavigate('awards', 'hall-of-fame')}
                className="text-[10px] font-display font-bold text-slate-400 hover:text-red-400 text-left uppercase tracking-wider"
              >
                Read Impact Dossier →
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Institutional Social Proof (Publications) */}
      <section id="social-proof" className="bg-neutral-950/40 border-y border-neutral-900 py-10 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[9px] tracking-[0.3em] font-display font-bold text-neutral-500 uppercase mb-6">
            AUDITED • DOCUMENTED • RECORDED
          </p>
          <div className="flex flex-wrap items-center justify-center gap-10 opacity-30 select-none">
            <span className="text-xs sm:text-sm font-display font-black tracking-widest text-white">CNBC AFRICA</span>
            <span className="text-xs sm:text-sm font-display font-black tracking-widest text-white">BUSINESSDAY</span>
            <span className="text-xs sm:text-sm font-display font-black tracking-widest text-white">PULSE NIGERIA</span>
            <span className="text-xs sm:text-sm font-display font-black tracking-widest text-white">VANGUARD MEDIA</span>
            <span className="text-xs sm:text-sm font-display font-black tracking-widest text-white">TECH CABAL</span>
          </div>
        </div>
      </section>

      {/* 9. Testimonials Section */}
      <section id="testimonials" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto space-y-3 mb-10">
          <span className="text-[10px] tracking-[0.25em] text-red-500 font-display font-bold uppercase">Laureate Voices</span>
          <h2 className="text-2xl font-display font-extrabold text-white uppercase tracking-tight">TESTIMONIALS</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((test) => (
            <div key={test.id} className="glass p-6 rounded-2xl relative flex flex-col justify-between bg-white/[0.01] hover:border-white/20 transition-all duration-300">
              <MessageSquare className="w-8 h-8 text-red-500/5 absolute top-4 right-4" />
              <p className="text-slate-300 text-xs font-body leading-relaxed italic mb-6 font-light">
                "{test.quote}"
              </p>
              <div className="flex items-center gap-3">
                <img src={test.photoUrl} alt={test.name} referrerPolicy="no-referrer" className="w-10 h-10 rounded-full object-cover bg-slate-950 border border-white/10" />
                <div>
                  <h4 className="text-xs font-display font-bold text-white uppercase">{test.name}</h4>
                  <p className="text-[10px] text-slate-400 font-body leading-none mt-1">{test.title}, <span className="text-red-400 font-medium">{test.company}</span></p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
