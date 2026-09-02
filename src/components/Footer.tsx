/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, ArrowRight, Instagram, Linkedin, Twitter, Youtube, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string, subView?: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const [email, setEmail] = useState('');
  const [interest, setInterest] = useState('Events');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    // Simulate API lead capture
    const existingLeads = JSON.parse(localStorage.getItem('leads') || '[]');
    existingLeads.push({
      email,
      interest,
      date: new Date().toISOString(),
      type: 'Newsletter'
    });
    localStorage.setItem('leads', JSON.stringify(existingLeads));

    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 5000);
  };

  return (
    <footer id="main-footer" className="bg-slate-950/20 backdrop-blur-xl border-t border-white/10 pt-16 pb-8 relative overflow-hidden rounded-t-[32px]">
      {/* Background soft indigo ambient light sweep */}
      <div className="absolute left-1/2 bottom-0 w-[600px] h-[300px] bg-indigo-500/5 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-6 pb-12 border-b border-white/5">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-5">
            <span
              onClick={() => onNavigate('home')}
              className="text-2xl font-display font-extrabold tracking-tighter cursor-pointer flex items-center gap-1"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">40</span>
              <span className="text-slate-100 font-light">UNDER</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">40</span>
              <span className="text-[10px] tracking-[0.3em] font-medium text-slate-400 ml-2">NIGERIA</span>
            </span>
            <p className="text-slate-300 text-xs font-body leading-relaxed max-w-sm font-light">
              An elite, audited platform dedicated to identifying, celebrating, connecting, and empowering the next generation of exceptional young leaders, entrepreneurs, and public policymakers shaping Nigeria's economic future.
            </p>
            <div className="flex space-x-3 pt-2">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-indigo-400 hover:border-indigo-400 transition-colors p-2 glass rounded-full">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-indigo-400 hover:border-indigo-400 transition-colors p-2 glass rounded-full">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-indigo-400 hover:border-indigo-400 transition-colors p-2 glass rounded-full">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-indigo-400 hover:border-indigo-400 transition-colors p-2 glass rounded-full">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-display tracking-[0.25em] text-slate-400 uppercase font-bold">PLATFORMS</h4>
            <ul className="space-y-2 text-xs font-body text-slate-400">
              <li>
                <button onClick={() => onNavigate('events', 'time-conference')} className="hover:text-indigo-300 transition-colors">TIME Conference</button>
              </li>
              <li>
                <button onClick={() => onNavigate('events', 'gala-night')} className="hover:text-indigo-300 transition-colors">40Under40 Gala Night</button>
              </li>
              <li>
                <button onClick={() => onNavigate('events', 'persons-of-the-year')} className="hover:text-indigo-300 transition-colors">100 Persons of the Year</button>
              </li>
              <li>
                <button onClick={() => onNavigate('awards', 'hall-of-fame')} className="hover:text-indigo-300 transition-colors">Hall of Fame DB</button>
              </li>
            </ul>
          </div>

          {/* Applications */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-display tracking-[0.25em] text-slate-400 uppercase font-bold">APPLICATIONS</h4>
            <ul className="space-y-2 text-xs font-body text-slate-400">
              <li>
                <button onClick={() => onNavigate('awards', 'nominate')} className="hover:text-indigo-300 transition-colors">Award Nomination</button>
              </li>
              <li>
                <button onClick={() => onNavigate('community', 'volunteer')} className="hover:text-indigo-300 transition-colors">Volunteer Application</button>
              </li>
              <li>
                <button onClick={() => onNavigate('community', 'accreditation')} className="hover:text-indigo-300 transition-colors">Media Accreditation</button>
              </li>
              <li>
                <button onClick={() => onNavigate('community', 'partner')} className="hover:text-indigo-300 transition-colors">Sponsorship Proposal</button>
              </li>
            </ul>
          </div>

          {/* Newsletter Form */}
          <div className="space-y-4 lg:col-span-1">
            <h4 className="text-[11px] font-display tracking-[0.25em] text-slate-400 uppercase font-bold">STAY IN THE LOOP</h4>
            <p className="text-slate-400 text-xs leading-relaxed font-light">
              Receive updates, invitations, and exclusive nomination alerts directly in your inbox.
            </p>
            
            {subscribed ? (
              <div className="flex items-center gap-2 p-2.5 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-xs text-indigo-400 font-display font-medium">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>Welcome to the ecosystem!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Corporate Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full glass focus:border-indigo-400 text-xs py-2.5 pl-3 pr-10 text-white rounded-full outline-none transition-colors"
                  />
                  <button type="submit" className="absolute right-1 top-1 bottom-1 bg-slate-900 border-l border-white/5 hover:bg-indigo-500 text-slate-400 hover:text-white px-3 transition-all rounded-full">
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex gap-2">
                  <select
                    value={interest}
                    onChange={(e) => setInterest(e.target.value)}
                    className="glass focus:border-indigo-400 text-[10px] py-1 px-3 text-slate-300 rounded-full outline-none cursor-pointer"
                  >
                    <option value="Events">Interested in Events</option>
                    <option value="Awards">Interested in Nominations</option>
                    <option value="Business">Interested in Mentorship</option>
                  </select>
                </div>
              </form>
            )}
          </div>

        </div>

        {/* Corporate Slogan and Bottom Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 text-slate-500 text-[11px] font-display">
          <div className="flex items-center space-x-2">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-400 font-bold tracking-wider">CELEBRATING THE EXCEPTIONAL.</span>
            <span>|</span>
            <span>© {new Date().getFullYear()} 40UNDER40 NIGERIA. ALL RIGHTS RESERVED.</span>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <button onClick={() => onNavigate('contact')} className="hover:text-slate-300 transition-colors">PRIVACY POLICY</button>
            <span>•</span>
            <button onClick={() => onNavigate('contact')} className="hover:text-slate-300 transition-colors">TERMS OF SERVICE</button>
            <span>•</span>
            <button onClick={() => onNavigate('contact')} className="hover:text-slate-300 transition-colors">ACCESSIBILITY</button>
          </div>
        </div>

      </div>
    </footer>
  );
}
