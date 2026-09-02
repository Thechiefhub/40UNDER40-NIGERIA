/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Calendar, Award, Star, TrendingUp, Users, ShieldAlert, Award as AwardIcon } from 'lucide-react';

interface AboutViewProps {
  subView: string;
}

export default function AboutView({ subView }: AboutViewProps) {
  // Mock Board
  const boardMembers = [
    {
      name: 'Chief Oladimeji Coker, SAN',
      title: 'Advisory Board Chairperson',
      company: 'Coker & Partners Chambers',
      bio: 'A distinguished Senior Advocate of Nigeria with 30+ years of legal and corporate governance experience across energy, regulatory compliance, and joint venture infrastructure frameworks.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop'
    },
    {
      name: 'Princess Folasade Adeleke',
      title: 'Executive Board Member',
      company: 'Heritage Capital Trust',
      bio: 'Expert treasury manager and asset allocator. Former executive director of private equity at West African Trust Bank, advising on municipal infrastructure bonds.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop'
    },
    {
      name: 'Prof. Aliyu Maikaba',
      title: 'Board Advisor & Lead Vetting Auditor',
      company: 'Lagos Business School (LBS)',
      bio: 'Professor of Entrepreneurship Economics. Former public advisor on macroeconomic restructuring and institutional ethics models for emerging markets.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop'
    }
  ];

  // Mock Team
  const teamMembers = [
    { name: 'Dr. Omotayo Salako', role: 'Founder & Convener', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop' },
    { name: 'Nkemdilim Nze', role: 'Chief of Operations & Event Director', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=300&auto=format&fit=crop' },
    { name: 'Tunde Lawson', role: 'Director of Vetting & VVIP Protocol', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop' },
    { name: 'Funmi Alao', role: 'Lead Counsel & Compliance Officer', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop' }
  ];

  // Timeline
  const timelineEvents = [
    { year: '2016', title: 'Platform Conception', description: 'Established as an advisory panel to highlight ethical business practices and raw entrepreneurial potential among youth under 40.' },
    { year: '2019', title: 'Flagship TIME Launch', description: 'Inaugural TIME Conference hosted in Lagos, uniting over 500 emerging operators with early-stage regional seed funds.' },
    { year: '2022', title: 'Institutional Vetting Audit', description: 'Designed and introduced our rigorous multi-tier corporate screening and background vetting algorithm for the 40Under40 Gala.' },
    { year: '2026', title: 'Socio-economic Milestone', description: 'Our inducted alumni network surpassed N2B in aggregated valuations, creating thousands of verified domestic jobs across the logistics and technology grids.' },
    { year: '2027 & Beyond', title: 'West African Expansion', description: 'Pioneering strategic collaborations in French-speaking West African regions to build a contiguous cross-border youth business pipeline.' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-20 pb-20">
      
      {/* 1. Header/Intro */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-[10px] tracking-[0.3em] text-[#E50914] font-display font-bold uppercase">THE INSTITUTION</span>
        <h1 className="text-4xl md:text-5xl font-display font-extrabold tracking-tight text-white uppercase leading-none">
          ABOUT 40UNDER40 NIGERIA
        </h1>
        <p className="text-neutral-400 font-body text-xs sm:text-sm leading-relaxed font-light">
          We operate as Nigeria\'s leading private leadership council, focused on discovering, auditing, celebrating, and empowering the young executives driving national productivity forward.
        </p>
      </section>

      {/* 2. Sub-views dispatcher */}
      {/* Subview: ABOUT-US or general */}
      {(subView === 'about-us' || subView === '') && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-2xl font-display font-extrabold text-white uppercase tracking-tight">Our Core Mission</h2>
            <p className="text-neutral-400 text-xs font-body leading-relaxed">
              40UNDER40 NIGERIA was founded under a strict mandate: to counter generic, shallow award templates and introduce a highly credible, researched, and institutional evaluation standard for youthful leadership in Africa. 
            </p>
            <p className="text-neutral-400 text-xs font-body leading-relaxed">
              We believe that private enterprises managed by energetic, transparent, and ethically-bound individuals represent the absolute foundation of national development. By isolating these leaders, conducting independent audits on their assets, and bringing them together, we forge an unbreakable ecosystem capable of scaling across borders.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="bg-[#0a0a0a] border border-neutral-900 p-4 rounded-sm">
                <TrendingUp className="w-6 h-6 text-[#E50914] mb-2" />
                <h4 className="text-xs font-display font-bold text-white uppercase mb-1">Scale Acceleration</h4>
                <p className="text-[11px] text-neutral-500 font-body">Connecting audited founders directly to legal counsels, corporate finance houses, and venture backing grids.</p>
              </div>
              <div className="bg-[#0a0a0a] border border-neutral-900 p-4 rounded-sm">
                <Users className="w-6 h-6 text-[#E50914] mb-2" />
                <h4 className="text-xs font-display font-bold text-white uppercase mb-1">Ecosystem Unity</h4>
                <p className="text-[11px] text-neutral-500 font-body">Establishing high-density platforms where executive leaders share ideas, collaborate on joint ventures, and draft policies.</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="aspect-[4/3] bg-neutral-900 border border-neutral-800 rounded-sm overflow-hidden relative group">
              <img
                src="https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=600&auto=format&fit=crop"
                alt="Leadership"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4">
                <span className="text-[9px] font-display tracking-widest text-[#E50914] font-bold block">AUDITED ECOSYSTEM</span>
                <span className="text-white text-xs font-display font-bold uppercase">TIME CONFERENCE MOMENT</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Subview: OUR STORY */}
      {subView === 'our-story' && (
        <div className="space-y-12">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-display font-extrabold text-white uppercase tracking-tight mb-4">Our Historical Path</h2>
            <p className="text-neutral-400 text-xs font-body leading-relaxed">
              Explore the developmental roadmap of 40UNDER40 NIGERIA from a vision of transparency into a prestigious national institution.
            </p>
          </div>

          <div className="border-l border-neutral-900 pl-6 ml-4 space-y-10 relative">
            {timelineEvents.map((evt, idx) => (
              <div key={idx} className="relative group">
                {/* Timeline node */}
                <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 bg-neutral-950 border border-neutral-800 group-hover:border-[#E50914] rounded-full flex items-center justify-center transition-colors">
                  <div className="w-1.5 h-1.5 bg-[#E50914] rounded-full scale-0 group-hover:scale-100 transition-transform"></div>
                </div>

                <div className="bg-[#0a0a0a] border border-neutral-900/60 p-5 rounded-sm hover:border-neutral-800 transition-colors">
                  <span className="text-sm font-display font-extrabold text-[#E50914] tracking-wider block mb-1">{evt.year}</span>
                  <h3 className="text-xs font-display font-bold text-white uppercase mb-1">{evt.title}</h3>
                  <p className="text-neutral-400 text-[11px] font-body leading-relaxed">{evt.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Subview: FOUNDER */}
      {subView === 'founder' && (
        <div className="space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 bg-neutral-950 border border-neutral-900 p-6 rounded-sm space-y-4">
              <div className="aspect-[3/4] bg-neutral-900 rounded-sm overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop"
                  alt="Amb. Dr. Omotayo Salako"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
              </div>
              <div className="text-center">
                <h3 className="font-display font-extrabold text-white text-base">AMB. DR. OMOTAYO SALAKO</h3>
                <p className="text-[#E50914] text-[10px] font-display font-bold uppercase tracking-wider mt-1">Founder, Convener & Executive Chairperson</p>
                <p className="text-neutral-500 text-[9px] font-body uppercase mt-1">40UNDER40 NIGERIA • TIME CONFERENCE</p>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <span className="text-[10px] tracking-[0.2em] text-[#E50914] font-display font-bold uppercase">The Convener\'s Philosophy</span>
              <h2 className="text-2xl font-display font-extrabold text-white uppercase tracking-tight">"YOUR SEAT AT THE TABLE."</h2>
              
              <div className="space-y-4 text-xs font-body text-neutral-400 leading-relaxed">
                <p>
                  Amb. Dr. Omotayo Salako is a highly recognized West African entrepreneurship development specialist, executive strategist, and convener. Throughout his decade-long career, he has focused on building regional platforms designed to accelerate industrial capacity, structure micro-venture finance systems, and establish corporate governance protocols.
                </p>
                <p>
                  As the visionary leader of the 40UNDER40 NIGERIA ecosystem, the annual TIME Conference, and the 100 Persons of the Year Award, Dr. Salako operates on a simple conviction: <span className="text-white font-semibold italic">"Excellence deserves a stage. When we isolate the builders of progress, they are vulnerable to societal friction. But when we connect them, we form an unbreakable infrastructure of progress."</span>
                </p>
                <p>
                  Under his leadership, the ecosystem has designed a proprietary background evaluation standard that vets nominations strictly based on corporate transparency, verified employee headcounts, sector-specific growth metrics, and community footprint. This ensures our awards remain a pristine standard of authentic national accomplishment.
                </p>
              </div>

              <div className="border-t border-neutral-900 pt-6">
                <h4 className="text-xs font-display font-bold text-white uppercase mb-3">Key Leadership Pillars</h4>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-[#0a0a0a] border border-neutral-900 p-3 rounded-sm">
                    <span className="block text-[#E50914] text-xs font-display font-extrabold">TRANSPARENCY</span>
                    <span className="text-[9px] text-neutral-500 font-body uppercase mt-1">Audit-Led Vetting</span>
                  </div>
                  <div className="bg-[#0a0a0a] border border-neutral-900 p-3 rounded-sm">
                    <span className="block text-[#E50914] text-xs font-display font-extrabold">INTEGRATION</span>
                    <span className="text-[9px] text-neutral-500 font-body uppercase mt-1">Corporate Match</span>
                  </div>
                  <div className="bg-[#0a0a0a] border border-neutral-900 p-3 rounded-sm">
                    <span className="block text-[#E50914] text-xs font-display font-extrabold">PROGRESS</span>
                    <span className="text-[9px] text-neutral-500 font-body uppercase mt-1">Job Creation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Subview: ADVISORY BOARD */}
      {subView === 'board' && (
        <div className="space-y-10">
          <div className="max-w-xl">
            <h2 className="text-2xl font-display font-extrabold text-white uppercase tracking-tight mb-3">Executive Advisory Council</h2>
            <p className="text-neutral-400 text-xs font-body leading-relaxed">
              Our vetting workflows and awards nominations are audited and approved under the guidance of our independent Advisory Board, consisting of veteran corporate operators, legal advocates, and professors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {boardMembers.map((member, i) => (
              <div key={i} className="bg-[#0a0a0a] border border-neutral-900 p-6 rounded-sm space-y-4 group hover:border-neutral-800 transition-colors">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-neutral-950 border border-neutral-800">
                  <img src={member.image} alt={member.name} referrerPolicy="no-referrer" className="w-full h-full object-cover object-top opacity-85" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-display font-bold text-white uppercase group-hover:text-[#E50914] transition-colors">{member.name}</h3>
                  <p className="text-[10px] text-neutral-500 font-body font-semibold uppercase">{member.title}</p>
                  <p className="text-[10px] text-[#E50914] font-body uppercase tracking-wider">{member.company}</p>
                </div>
                <p className="text-neutral-400 text-[11px] font-body leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Subview: TEAM */}
      {subView === 'team' && (
        <div className="space-y-10">
          <div className="max-w-xl">
            <h2 className="text-2xl font-display font-extrabold text-white uppercase tracking-tight mb-3">Management & Organizing Team</h2>
            <p className="text-neutral-400 text-xs font-body leading-relaxed">
              The professional operators and planners driving our events execution, corporate relations, and vetting compliances.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {teamMembers.map((member, idx) => (
              <div key={idx} className="bg-[#0a0a0a] border border-neutral-900 p-4 rounded-sm space-y-3 group text-center">
                <div className="aspect-square w-24 h-24 rounded-full overflow-hidden bg-neutral-950 border border-neutral-800 mx-auto">
                  <img src={member.image} alt={member.name} referrerPolicy="no-referrer" className="w-full h-full object-cover object-top opacity-80 group-hover:scale-105 transition-transform" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-white uppercase text-xs">{member.name}</h4>
                  <p className="text-[10px] text-neutral-500 font-body mt-1 leading-tight">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
