/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import EntryLoader from './components/EntryLoader';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import AboutView from './components/AboutView';
import EventsView from './components/EventsView';
import NominationsView from './components/NominationsView';
import HallOfFameView from './components/HallOfFameView';
import MediaView from './components/MediaView';
import PartnersView from './components/PartnersView';
import ContactView from './components/ContactView';
import PortalView from './components/PortalView';
import AdminConsole from './components/AdminConsole';
import CheckInConsole from './components/CheckInConsole';

import { INITIAL_EVENTS, INITIAL_AWARDEES, INITIAL_ARTICLES, INITIAL_PARTNERS, INITIAL_TESTIMONIALS } from './data';
import { Registration, Nomination, VolunteerApplication, MediaApplication } from './types';

const pageVariants = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -15 }
};

const pageTransition = {
  duration: 0.45,
  ease: [0.16, 1, 0.3, 1] // Elegant custom cubic-bezier ease-out
};

export default function App() {
  const [showLoader, setShowLoader] = useState(true);
  const [currentView, setCurrentView] = useState('home');
  const [subView, setSubView] = useState('');

  // Authentication & Administrative states
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [staffMode, setStaffMode] = useState(false);

  // Initialize sandbox databases in LocalStorage on startup
  useEffect(() => {
    // 1. Initial Registrations
    const existingRegs = localStorage.getItem('registrations');
    if (!existingRegs) {
      const defaultRegs: Registration[] = [
        {
          id: 'REG-189201',
          name: 'Amb. Dr. Omotayo Salako',
          email: 'salako@apex.com',
          phone: '+234 803 100 4040',
          company: 'Apex Leadership Council',
          position: 'Director of Vetting',
          industry: 'Professional Services',
          state: 'Lagos State',
          linkedin: 'https://linkedin.com/in/salako',
          ticketType: 'VVIP',
          eventId: 'time-conference',
          eventTitle: 'TIME Conference',
          qrPassCode: '40U40-VIP-SEC-189201',
          registrationDate: 'September 1, 2026',
          checkedIn: false,
          paymentStatus: 'paid'
        },
        {
          id: 'REG-412891',
          name: 'Chief Coker',
          email: 'coker@law.ng',
          phone: '+234 905 200 4040',
          company: 'Coker & Partners Legal Chambers',
          position: 'Senior Advocate',
          industry: 'Professional Services',
          state: 'Federal Capital Territory',
          linkedin: '',
          ticketType: 'Corporate',
          eventId: 'time-conference',
          eventTitle: 'TIME Conference',
          qrPassCode: '40U40-CORP-SEC-412891',
          registrationDate: 'September 2, 2026',
          checkedIn: false,
          paymentStatus: 'paid'
        },
        {
          id: 'REG-850122',
          name: 'Aliko Ibrahim',
          email: 'aliko@danjuma.org',
          phone: '+234 809 300 4040',
          company: 'Danjuma Logistics Systems',
          position: 'Operations Officer',
          industry: 'Professional Services',
          state: 'Kano State',
          linkedin: '',
          ticketType: 'General',
          eventId: 'time-conference',
          eventTitle: 'TIME Conference',
          qrPassCode: '40U40-GEN-SEC-850122',
          registrationDate: 'September 2, 2026',
          checkedIn: false,
          paymentStatus: 'paid'
        }
      ];
      localStorage.setItem('registrations', JSON.stringify(defaultRegs));
    }

    // 2. Initial Nominations
    const existingNoms = localStorage.getItem('nominations');
    if (!existingNoms) {
      const defaultNoms: Nomination[] = [
        {
          id: 'NOM-140289',
          nomineeName: 'Dr. Amara Okechukwu',
          age: 34,
          nomineeEmail: 'amara@health.ng',
          nomineePhone: '+234 803 200 3030',
          company: 'Lumos Bio-Diagnostics',
          position: 'Lead Pathologist & Founder',
          industry: 'Healthcare & Biotech',
          achievements: 'Created low-cost sickle cell diagnostic kits deployed across three rural local governments in Oyo State.',
          leadershipImpact: 'Spearheaded medical student scholarships and community health outreach programs.',
          evidenceLink: 'https://lumos-bio.ng/media',
          refereeName: 'Prof. Chidi Okechukwu',
          refereeEmail: 'chidi@unilag.edu.ng',
          refereeRelation: 'Academic Supervisor',
          nominationDate: 'September 1, 2026',
          status: 'screened'
        },
        {
          id: 'NOM-780911',
          nomineeName: 'Tunde Alao',
          age: 29,
          nomineeEmail: 'tunde@fintech.ng',
          nomineePhone: '+234 812 500 1010',
          company: 'Biller Rails Systems',
          position: 'Chief Technology Officer',
          industry: 'Technology & Innovation',
          achievements: 'Developed zero-fee payment infrastructure servicing 120,000 petty traders in Southwest Nigeria.',
          leadershipImpact: 'Mentors local software engineers and hosts open-source hackathons.',
          evidenceLink: 'https://github.com/tunde-biller',
          refereeName: 'Salim Bello',
          refereeEmail: 'salim@bello-investments.com',
          refereeRelation: 'Lead Investor',
          nominationDate: 'September 2, 2026',
          status: 'pending'
        }
      ];
      localStorage.setItem('nominations', JSON.stringify(defaultNoms));
    }

    // 3. Initial Volunteers & Media Accreditations empty lists if missing
    if (!localStorage.getItem('volunteers')) {
      localStorage.setItem('volunteers', JSON.stringify([]));
    }
    if (!localStorage.getItem('media_accreditations')) {
      localStorage.setItem('media_accreditations', JSON.stringify([]));
    }
    if (!localStorage.getItem('leads')) {
      localStorage.setItem('leads', JSON.stringify([]));
    }

  }, []);

  const handleNavigate = (view: string, sub?: string) => {
    setCurrentView(view);
    setSubView(sub || '');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogin = (user: any) => {
    setIsLoggedIn(true);
    setCurrentUser(user);
    // If administrative email addresses are inputted, unlock admin CMS
    if (user.email.toLowerCase().includes('admin') || user.email.toLowerCase().includes('vetting') || user.email.toLowerCase() === 'salako@apex.com') {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
    setCurrentView('community');
    setSubView('portal');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setIsAdmin(false);
    setCurrentView('home');
    setSubView('');
  };

  return (
    <div className="min-h-screen mesh-gradient text-[#F7F7F5] font-body flex flex-col justify-between selection:bg-[#6366f1] selection:text-white relative overflow-hidden">
      
      {/* Cinematic Ambient Overlay Grain effect */}
      <div className="grain-overlay"></div>
      
      {showLoader ? (
        <EntryLoader onComplete={() => setShowLoader(false)} />
      ) : (
        <div className="flex-1 flex flex-col justify-between z-10 animate-fade-in">
          
          {/* Header Navigation Section */}
          <Navbar 
            currentView={currentView}
            subView={subView}
            isLoggedIn={isLoggedIn}
            isAdmin={isAdmin}
            onNavigate={handleNavigate}
            onToggleAdmin={() => {
              if (isAdmin) {
                setIsAdmin(false);
                setIsLoggedIn(false);
                setCurrentUser(null);
                setCurrentView('home');
              } else {
                handleLogin({
                  name: 'SYSTEM ADMINISTRATOR',
                  email: 'vetting-admin@40under40.ng',
                  company: 'Vetting Committee Secretariat',
                  position: 'Chief Auditor'
                });
                setCurrentView('community');
                setSubView('admin');
              }
            }}
            onLogout={handleLogout}
          />

          {/* Core Layout Panels Router Switcher */}
          <main className="flex-1 overflow-hidden">
            <motion.div
              key={currentView + '_' + subView}
              initial="initial"
              animate="animate"
              variants={pageVariants}
              transition={pageTransition}
            >
              {/* View: Home */}
              {currentView === 'home' && (
                <HomeView 
                  events={INITIAL_EVENTS} 
                  awardees={INITIAL_AWARDEES} 
                  testimonials={INITIAL_TESTIMONIALS} 
                  onNavigate={handleNavigate} 
                />
              )}

              {/* View: About */}
              {currentView === 'about' && (
                <AboutView subView={subView} />
              )}

              {/* View: Events (Booking and info panels) */}
              {currentView === 'events' && (
                <EventsView 
                  events={INITIAL_EVENTS} 
                  subView={subView} 
                  onNavigate={handleNavigate} 
                  isLoggedIn={isLoggedIn} 
                  currentUser={currentUser} 
                />
              )}

              {/* View: Awards & nominations */}
              {currentView === 'awards' && (
                <>
                  {subView === 'nominate' ? (
                    <NominationsView onNavigate={handleNavigate} />
                  ) : (
                    <HallOfFameView awardees={INITIAL_AWARDEES} />
                  )}
                </>
              )}

              {/* View: News & Media */}
              {currentView === 'media' && (
                <MediaView articles={INITIAL_ARTICLES} subView={subView} />
              )}

              {/* View: Partners & sponsorships */}
              {currentView === 'partners' && (
                <PartnersView partners={INITIAL_PARTNERS} />
              )}

              {/* View: Direct Contact Secretariat */}
              {currentView === 'contact' && (
                <ContactView />
              )}

              {/* View: User Account Portal */}
              {currentView === 'community' && subView === 'portal' && (
                <PortalView 
                  isLoggedIn={isLoggedIn}
                  currentUser={currentUser}
                  onLogin={handleLogin}
                  onLogout={handleLogout}
                  onNavigate={handleNavigate}
                />
              )}

              {/* View: Admin CMS Panel (Only if validated) */}
              {currentView === 'community' && subView === 'admin' && (
                <>
                  {isAdmin ? (
                    <AdminConsole />
                  ) : (
                    <div className="max-w-md mx-auto py-20 px-4 text-center space-y-4">
                      <span className="text-[10px] tracking-[0.3em] text-[#E50914] font-display font-bold uppercase">SECURITY ALERT</span>
                      <h2 className="text-xl font-display font-extrabold text-white uppercase">UNAUTHORIZED TERMINAL</h2>
                      <p className="text-neutral-500 text-xs font-body leading-relaxed">
                        You are trying to access a secure administrative directory. Please log in with an authorized corporate vetting address.
                      </p>
                      <button onClick={() => { setCurrentView('community'); setSubView('portal'); }} className="bg-[#E50914] text-white font-display font-bold text-xs uppercase px-6 py-2.5 rounded-sm">Sign In</button>
                    </div>
                  )}
                </>
              )}

              {/* View: Gate Entry QR Scanner Terminal */}
              {currentView === 'community' && subView === 'scanner' && (
                <CheckInConsole />
              )}
            </motion.div>
          </main>

          {/* Footer Navigation Section */}
          <Footer onNavigate={handleNavigate} />

        </div>
      )}

    </div>
  );
}
