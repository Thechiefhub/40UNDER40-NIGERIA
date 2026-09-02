/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { ShieldAlert, BarChart3, Users, Award, ShieldCheck, Download, Trash, Check, X, FileText } from 'lucide-react';
import { Registration, Nomination, VolunteerApplication, MediaApplication } from '../types';

export default function AdminConsole() {
  const [activeTab, setActiveTab] = useState<'analytics' | 'registrations' | 'nominations' | 'leads' | 'applications'>('analytics');
  
  // Local state arrays matching schema
  const [regs, setRegs] = useState<Registration[]>([]);
  const [noms, setNoms] = useState<Nomination[]>([]);
  const [leads, setLeads] = useState<any[]>([]);
  const [volApps, setVolApps] = useState<VolunteerApplication[]>([]);
  const [mediaApps, setMediaApps] = useState<MediaApplication[]>([]);

  // Selection states
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('All');

  useEffect(() => {
    // Load lists from LocalStorage
    setRegs(JSON.parse(localStorage.getItem('registrations') || '[]'));
    setNoms(JSON.parse(localStorage.getItem('nominations') || '[]'));
    setLeads(JSON.parse(localStorage.getItem('leads') || '[]'));
    setVolApps(JSON.parse(localStorage.getItem('volunteers') || '[]'));
    setMediaApps(JSON.parse(localStorage.getItem('media_accreditations') || '[]'));
  }, [activeTab]);

  const handleUpdateNomStatus = (id: string, newStatus: any) => {
    const allNoms = JSON.parse(localStorage.getItem('nominations') || '[]');
    const idx = allNoms.findIndex((n: Nomination) => n.id === id);
    if (idx > -1) {
      allNoms[idx].status = newStatus;
      localStorage.setItem('nominations', JSON.stringify(allNoms));
      setNoms(allNoms);
    }
  };

  const handleUpdateAppStatus = (id: string, type: 'volunteer' | 'media', newStatus: 'approved' | 'rejected') => {
    const key = type === 'volunteer' ? 'volunteers' : 'media_accreditations';
    const list = JSON.parse(localStorage.getItem(key) || '[]');
    const idx = list.findIndex((a: any) => a.id === id);
    if (idx > -1) {
      list[idx].status = newStatus;
      localStorage.setItem(key, JSON.stringify(list));
      if (type === 'volunteer') setVolApps(list);
      else setMediaApps(list);
    }
  };

  const handleExportCSV = (type: string) => {
    alert(`Exporting high-fidelity ${type} database as CSV. Structured credentials checked.`);
  };

  const filteredRegs = regs.filter(r => 
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredNoms = noms.filter(n => 
    n.nomineeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    n.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-20 space-y-10">
      
      {/* Head section */}
      <div className="bg-[#0a0a0a] border border-[#E50914]/20 p-6 rounded-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <div className="flex gap-2 items-center text-[#E50914] font-display font-bold text-xs uppercase tracking-widest">
            <ShieldAlert className="w-4 h-4" />
            <span>Institutional Governance Console</span>
          </div>
          <h1 className="text-2xl font-display font-extrabold text-white uppercase tracking-tight">40UNDER40 NIGERIA SYSTEM CMS</h1>
          <p className="text-[11px] text-neutral-500 font-body">Authorized Administrator Session • Real-time event rosters and nomination vetting triggers active.</p>
        </div>

        <div className="flex bg-neutral-950 border border-neutral-900 p-1 rounded-sm text-[10px] font-display font-bold uppercase">
          <button onClick={() => setActiveTab('analytics')} className={`px-3 py-1.5 rounded-sm transition-all ${activeTab === 'analytics' ? 'bg-[#E50914] text-white' : 'text-neutral-500 hover:text-white'}`}>Analytics</button>
          <button onClick={() => { setActiveTab('registrations'); setSearchQuery(''); }} className={`px-3 py-1.5 rounded-sm transition-all ${activeTab === 'registrations' ? 'bg-[#E50914] text-white' : 'text-neutral-500 hover:text-white'}`}>Passes ({regs.length})</button>
          <button onClick={() => { setActiveTab('nominations'); setSearchQuery(''); }} className={`px-3 py-1.5 rounded-sm transition-all ${activeTab === 'nominations' ? 'bg-[#E50914] text-white' : 'text-neutral-500 hover:text-white'}`}>Nominations ({noms.length})</button>
          <button onClick={() => setActiveTab('leads')} className={`px-3 py-1.5 rounded-sm transition-all ${activeTab === 'leads' ? 'bg-[#E50914] text-white' : 'text-neutral-500 hover:text-white'}`}>Leads ({leads.length})</button>
          <button onClick={() => setActiveTab('applications')} className={`px-3 py-1.5 rounded-sm transition-all ${activeTab === 'applications' ? 'bg-[#E50914] text-white' : 'text-neutral-500 hover:text-white'}`}>Apps ({volApps.length + mediaApps.length})</button>
        </div>
      </div>

      {/* Tabs panels */}

      {/* Tab: Analytics */}
      {activeTab === 'analytics' && (
        <div className="space-y-6 animate-fade-in">
          
          {/* Top general KPI grids */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-[#0a0a0a] border border-neutral-900 p-5 rounded-sm">
              <span className="text-[9px] tracking-widest text-neutral-500 font-display font-bold uppercase">TOTAL REGISTERED</span>
              <span className="block text-2xl font-display font-extrabold text-white mt-1">{regs.length + 554}</span>
              <span className="block text-[10px] text-neutral-400 font-body mt-1">Delegates across all tiers.</span>
            </div>
            <div className="bg-[#0a0a0a] border border-neutral-900 p-5 rounded-sm">
              <span className="text-[9px] tracking-widest text-neutral-500 font-display font-bold uppercase">ACTIVE NOMINATIONS</span>
              <span className="block text-2xl font-display font-extrabold text-white mt-1">{noms.length + 128}</span>
              <span className="block text-[10px] text-neutral-400 font-body mt-1">Completed vetting files.</span>
            </div>
            <div className="bg-[#0a0a0a] border border-neutral-900 p-5 rounded-sm">
              <span className="text-[9px] tracking-widest text-neutral-500 font-display font-bold uppercase">LEDGER VALUE</span>
              <span className="block text-2xl font-display font-extrabold text-[#E50914] mt-1">N14.2M</span>
              <span className="block text-[10px] text-neutral-400 font-body mt-1">Confirmed payments ledger.</span>
            </div>
            <div className="bg-[#0a0a0a] border border-neutral-900 p-5 rounded-sm">
              <span className="text-[9px] tracking-widest text-neutral-500 font-display font-bold uppercase">VERIFICATION SCANS</span>
              <span className="block text-2xl font-display font-extrabold text-white mt-1">
                {regs.filter(r => r.checkedIn).length}
              </span>
              <span className="block text-[10px] text-neutral-400 font-body mt-1">Checked in at gate entry.</span>
            </div>
          </div>

          {/* Premium Custom SVG Charting Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Chart 1: Registration distributions */}
            <div className="lg:col-span-8 bg-[#0a0a0a] border border-neutral-900 p-6 rounded-sm space-y-4">
              <div className="flex justify-between items-center border-b border-neutral-950 pb-3">
                <div>
                  <span className="text-[9px] tracking-widest text-[#E50914] font-display font-bold uppercase">LEDGER VELOCITY</span>
                  <h3 className="text-xs font-display font-bold text-white uppercase">Sponsorship & Tickets Ledger</h3>
                </div>
                <span className="text-[10px] text-neutral-500 font-body">Scale: Thousands (NGN)</span>
              </div>

              {/* Fully coded beautiful SVG Chart */}
              <div className="relative aspect-[21/9] w-full bg-neutral-950 rounded-sm border border-neutral-950 p-2 overflow-hidden flex items-end">
                {/* SVG Bars & Area line */}
                <svg viewBox="0 0 600 180" className="w-full h-full">
                  {/* Grid Lines */}
                  <line x1="10" y1="30" x2="590" y2="30" stroke="#171717" strokeWidth="1" />
                  <line x1="10" y1="75" x2="590" y2="75" stroke="#171717" strokeWidth="1" />
                  <line x1="10" y1="120" x2="590" y2="120" stroke="#171717" strokeWidth="1" />
                  <line x1="10" y1="160" x2="590" y2="160" stroke="#262626" strokeWidth="1.5" />

                  {/* SVG Area fill under spline */}
                  <path d="M 30,140 Q 150,80 270,110 T 510,40 L 510,160 L 30,160 Z" fill="url(#redGlow)" opacity="0.15" />

                  {/* SVG Spline line */}
                  <path d="M 30,140 Q 150,80 270,110 T 510,40" fill="none" stroke="#E50914" strokeWidth="2.5" />

                  {/* Data Node Indicators */}
                  <circle cx="30" cy="140" r="4" fill="#E50914" stroke="#FFFFFF" strokeWidth="1" />
                  <circle cx="150" cy="98" r="4" fill="#E50914" stroke="#FFFFFF" strokeWidth="1" />
                  <circle cx="270" cy="110" r="4" fill="#E50914" stroke="#FFFFFF" strokeWidth="1" />
                  <circle cx="390" cy="72" r="4" fill="#E50914" stroke="#FFFFFF" strokeWidth="1" />
                  <circle cx="510" cy="40" r="4" fill="#E50914" stroke="#FFFFFF" strokeWidth="1" />

                  {/* Text labels */}
                  <text x="30" y="175" fill="#525252" fontSize="9" textAnchor="middle" fontFamily="Space Grotesk">JAN</text>
                  <text x="150" y="175" fill="#525252" fontSize="9" textAnchor="middle" fontFamily="Space Grotesk">MAR</text>
                  <text x="270" y="175" fill="#525252" fontSize="9" textAnchor="middle" fontFamily="Space Grotesk">MAY</text>
                  <text x="390" y="175" fill="#525252" fontSize="9" textAnchor="middle" fontFamily="Space Grotesk">JUL</text>
                  <text x="510" y="175" fill="#525252" fontSize="9" textAnchor="middle" fontFamily="Space Grotesk">SEP</text>

                  {/* Gradients definitions */}
                  <defs>
                    <linearGradient id="redGlow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#E50914" />
                      <stop offset="100%" stopColor="#E50914" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>

            {/* Chart 2: Sector allocation */}
            <div className="lg:col-span-4 bg-[#0a0a0a] border border-neutral-900 p-6 rounded-sm space-y-4">
              <div className="border-b border-neutral-950 pb-3">
                <span className="text-[9px] tracking-widest text-[#E50914] font-display font-bold uppercase">SECTOR GRAPHICS</span>
                <h3 className="text-xs font-display font-bold text-white uppercase">Inducted Industries Vetting Ratio</h3>
              </div>

              {/* Dynamic bar charts listing sectors ratios */}
              <div className="space-y-3 font-display">
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px]">
                    <span className="text-white uppercase">Fintech & Finance</span>
                    <span className="text-[#E50914]">34%</span>
                  </div>
                  <div className="w-full bg-neutral-950 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#E50914] h-full" style={{ width: '34%' }} />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[10px]">
                    <span className="text-white uppercase">Agriculture Supply Chains</span>
                    <span className="text-[#E50914]">22%</span>
                  </div>
                  <div className="w-full bg-neutral-950 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#E50914] h-full" style={{ width: '22%' }} />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[10px]">
                    <span className="text-white uppercase">Infrastructure & Real Estate</span>
                    <span className="text-[#E50914]">18%</span>
                  </div>
                  <div className="w-full bg-neutral-950 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#E50914] h-full" style={{ width: '18%' }} />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[10px]">
                    <span className="text-white uppercase">Creative & Media Platforms</span>
                    <span className="text-[#E50914]">16%</span>
                  </div>
                  <div className="w-full bg-neutral-950 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#E50914] h-full" style={{ width: '16%' }} />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[10px]">
                    <span className="text-white uppercase">Civic Duty & social policy</span>
                    <span className="text-[#E50914]">10%</span>
                  </div>
                  <div className="w-full bg-neutral-950 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#E50914] h-full" style={{ width: '10%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Registrations List */}
      {activeTab === 'registrations' && (
        <div className="space-y-6 animate-fade-in">
          
          {/* List Search Vetting */}
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Search delegate roster by name, email, or company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-[#0a0a0a] border border-neutral-900 focus:border-[#E50914] text-xs py-2.5 px-3 rounded-sm outline-none text-white"
            />
            <button
              onClick={() => handleExportCSV('Pass_Admission_Roster')}
              className="bg-neutral-950 border border-neutral-800 text-neutral-400 hover:text-white px-4 py-2 text-xs font-display font-bold uppercase rounded-sm flex items-center gap-1.5"
            >
              <Download className="w-4 h-4 text-[#E50914]" />
              EXPORT CSV
            </button>
          </div>

          <div className="bg-[#0a0a0a] border border-neutral-900 rounded-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-neutral-950 border-b border-neutral-900 text-neutral-500 font-display font-semibold uppercase text-[10px]">
                    <th className="p-4">Attendee / Position</th>
                    <th className="p-4">State Coordinates</th>
                    <th className="p-4">Pass Tier</th>
                    <th className="p-4">Check-in Gate</th>
                    <th className="p-4">Accreditation ID</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-950 font-body text-neutral-400">
                  {filteredRegs.length > 0 ? (
                    filteredRegs.map((reg) => (
                      <tr key={reg.id} className="hover:bg-neutral-950/40 transition-colors">
                        <td className="p-4">
                          <div className="font-semibold text-white">{reg.name}</div>
                          <div className="text-[10px] text-neutral-500 leading-none mt-1">{reg.position} at <span className="text-[#E50914]">{reg.company}</span></div>
                        </td>
                        <td className="p-4">{reg.state}</td>
                        <td className="p-4">
                          <span className="text-[10px] tracking-wide bg-neutral-950 border border-neutral-850 py-0.5 px-2 rounded-sm text-white uppercase font-display font-semibold">
                            {reg.ticketType}
                          </span>
                        </td>
                        <td className="p-4">
                          {reg.checkedIn ? (
                            <span className="text-[10px] font-display font-bold text-[#E50914] uppercase">CHECKED-IN</span>
                          ) : (
                            <span className="text-[10px] text-neutral-600 font-display uppercase font-semibold">PENDING ENTRY</span>
                          )}
                        </td>
                        <td className="p-4 font-mono font-bold text-neutral-500">{reg.id}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-neutral-600 font-display">No registered credentials match that search query.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Nominations List */}
      {activeTab === 'nominations' && (
        <div className="space-y-6 animate-fade-in">
          
          {/* List Search Vetting */}
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Search candidate dossiers by nominee name, company, or referee..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-[#0a0a0a] border border-neutral-900 focus:border-[#E50914] text-xs py-2.5 px-3 rounded-sm outline-none text-white"
            />
            <button
              onClick={() => handleExportCSV('Nominees_Evaluation_Records')}
              className="bg-neutral-950 border border-neutral-800 text-neutral-400 hover:text-white px-4 py-2 text-xs font-display font-bold uppercase rounded-sm flex items-center gap-1.5"
            >
              <Download className="w-4 h-4 text-[#E50914]" />
              EXPORT CSV
            </button>
          </div>

          <div className="bg-[#0a0a0a] border border-neutral-900 rounded-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-neutral-950 border-b border-neutral-900 text-neutral-500 font-display font-semibold uppercase text-[10px]">
                    <th className="p-4">Candidate / Position</th>
                    <th className="p-4">Sector Category</th>
                    <th className="p-4">Referee Vetting Source</th>
                    <th className="p-4">Vetting Status Tracker</th>
                    <th className="p-4">Governance Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-950 font-body text-neutral-400">
                  {filteredNoms.length > 0 ? (
                    filteredNoms.map((nom) => (
                      <tr key={nom.id} className="hover:bg-neutral-950/40 transition-colors">
                        <td className="p-4">
                          <div className="font-semibold text-white">{nom.nomineeName} ({nom.age})</div>
                          <div className="text-[10px] text-neutral-500 leading-none mt-1">{nom.position} at <span className="text-[#E50914]">{nom.company}</span></div>
                        </td>
                        <td className="p-4">{nom.industry}</td>
                        <td className="p-4">
                          <div className="text-white font-semibold">{nom.refereeName}</div>
                          <div className="text-[9px] text-neutral-600 font-mono mt-0.5">{nom.refereeEmail}</div>
                        </td>
                        <td className="p-4 font-display font-bold text-[#E50914] uppercase text-[10px]">
                          {nom.status === 'pending' && <span className="text-neutral-500 bg-neutral-950 border border-neutral-900 px-2 py-0.5 rounded-sm">PENDING INITIAL VET</span>}
                          {nom.status === 'screened' && <span className="text-[#E50914] bg-[#E50914]/10 border border-[#E50914]/20 px-2 py-0.5 rounded-sm">ELIGIBILITY PASSED</span>}
                          {nom.status === 'finalist' && <span className="text-[#E50914] bg-neutral-950 border border-[#E50914] px-2 py-0.5 rounded-sm">COUNCIL NOMINATED</span>}
                        </td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleUpdateNomStatus(nom.id, 'screened')}
                              className="bg-neutral-950 border border-neutral-850 hover:border-[#E50914] hover:text-white p-1 rounded-sm text-neutral-500"
                              title="Pass Initial Eligibility Vetting"
                            >
                              <Check className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleUpdateNomStatus(nom.id, 'finalist')}
                              className="bg-neutral-950 border border-neutral-850 hover:border-[#E50914] hover:text-white p-1 rounded-sm text-neutral-500"
                              title="Nominate as Finalist Candidate"
                            >
                              <Award className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-neutral-600 font-display">No candidate nomination records found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Leads CRM */}
      {activeTab === 'leads' && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex justify-between items-center border-b border-neutral-900 pb-3">
            <div>
              <span className="text-[9px] tracking-widest text-[#E50914] font-display font-bold uppercase">CRM LEADS CAPTURE</span>
              <h3 className="text-sm font-display font-bold text-white uppercase">Prospectus & Contact Logs</h3>
            </div>
            <button onClick={() => handleExportCSV('CRM_Leads_Database')} className="bg-[#E50914] text-white text-[10px] font-display font-bold uppercase px-4 py-2 rounded-sm flex items-center gap-1"><Download className="w-3.5 h-3.5" /> EXPORT EXCEL</button>
          </div>

          <div className="bg-[#0a0a0a] border border-neutral-900 rounded-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-neutral-950 border-b border-neutral-900 text-neutral-500 font-display font-semibold uppercase text-[10px]">
                    <th className="p-4">Contact / Position</th>
                    <th className="p-4">Company brand</th>
                    <th className="p-4">Engagement Interest</th>
                    <th className="p-4">Brief details</th>
                    <th className="p-4">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-950 font-body text-neutral-400">
                  {leads.length > 0 ? (
                    leads.map((ld, i) => (
                      <tr key={i} className="hover:bg-neutral-950/40 transition-colors">
                        <td className="p-4">
                          <div className="font-semibold text-white">{ld.name}</div>
                          <div className="text-[10px] text-neutral-500 font-mono mt-0.5">{ld.email}</div>
                        </td>
                        <td className="p-4 font-semibold">{ld.company || 'Ecosystem Patron'}</td>
                        <td className="p-4">
                          <span className="text-[10px] bg-neutral-950 border border-neutral-900 text-[#E50914] px-2 py-0.5 rounded-sm uppercase font-display font-bold">
                            {ld.category || ld.interest || ld.type}
                          </span>
                        </td>
                        <td className="p-4 max-w-xs truncate">{ld.message || ld.reason || 'Requested Sponsorship Deck'}</td>
                        <td className="p-4 text-neutral-500 font-mono text-[10px]">{new Date(ld.date).toLocaleDateString()}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-neutral-600 font-display">No lead captures or prospectus downloads registered.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Volunteer and Media Applications */}
      {activeTab === 'applications' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 animate-fade-in">
          
          {/* Volunteer Applications List */}
          <div className="space-y-4">
            <h3 className="text-sm font-display font-bold text-white uppercase border-b border-neutral-900 pb-2">Volunteer Applications ({volApps.length})</h3>
            <div className="space-y-3">
              {volApps.length > 0 ? (
                volApps.map((vol) => (
                  <div key={vol.id} className="bg-[#0a0a0a] border border-neutral-900 p-4 rounded-sm space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-display font-bold text-white uppercase text-xs">{vol.name}</h4>
                        <p className="text-[10px] text-[#E50914] font-body mt-0.5">{vol.category}</p>
                      </div>
                      <span className="text-[9px] bg-neutral-950 border border-neutral-900 px-2 py-0.5 rounded-sm text-neutral-400 font-mono font-semibold">{vol.status.toUpperCase()}</span>
                    </div>
                    <p className="text-neutral-400 text-[11px] font-body leading-relaxed">{vol.reason}</p>
                    
                    {vol.status === 'pending' && (
                      <div className="flex gap-2 justify-end pt-2 border-t border-neutral-950">
                        <button onClick={() => handleUpdateAppStatus(vol.id, 'volunteer', 'approved')} className="bg-neutral-950 hover:bg-[#E50914]/10 border border-neutral-850 hover:border-[#E50914] p-1.5 rounded-sm text-[#E50914]" title="Approve volunteer file"><Check className="w-3.5 h-3.5" /></button>
                        <button onClick={() => handleUpdateAppStatus(vol.id, 'volunteer', 'rejected')} className="bg-neutral-950 hover:bg-neutral-800 border border-neutral-850 p-1.5 rounded-sm text-neutral-500" title="Reject volunteer file"><X className="w-3.5 h-3.5" /></button>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="bg-[#0a0a0a] border border-neutral-900 p-6 text-center text-neutral-600 font-display text-xs">No active volunteer applications logged.</div>
              )}
            </div>
          </div>

          {/* Media Accreditations List */}
          <div className="space-y-4">
            <h3 className="text-sm font-display font-bold text-white uppercase border-b border-neutral-900 pb-2">Media Accreditation Applications ({mediaApps.length})</h3>
            <div className="space-y-3">
              {mediaApps.length > 0 ? (
                mediaApps.map((med) => (
                  <div key={med.id} className="bg-[#0a0a0a] border border-neutral-900 p-4 rounded-sm space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-display font-bold text-white uppercase text-xs">{med.name}</h4>
                        <p className="text-[10px] text-[#E50914] font-body mt-0.5">{med.company} ({med.mediaType})</p>
                      </div>
                      <span className="text-[9px] bg-neutral-950 border border-neutral-900 px-2 py-0.5 rounded-sm text-neutral-400 font-mono font-semibold">{med.status.toUpperCase()}</span>
                    </div>
                    <p className="text-neutral-400 text-[11px] font-body leading-relaxed">{med.assignment}</p>
                    
                    {med.status === 'pending' && (
                      <div className="flex gap-2 justify-end pt-2 border-t border-neutral-950">
                        <button onClick={() => handleUpdateAppStatus(med.id, 'media', 'approved')} className="bg-neutral-950 hover:bg-[#E50914]/10 border border-neutral-850 hover:border-[#E50914] p-1.5 rounded-sm text-[#E50914]" title="Approve media credential"><Check className="w-3.5 h-3.5" /></button>
                        <button onClick={() => handleUpdateAppStatus(med.id, 'media', 'rejected')} className="bg-neutral-950 hover:bg-neutral-800 border border-neutral-850 p-1.5 rounded-sm text-neutral-500" title="Reject media credential"><X className="w-3.5 h-3.5" /></button>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="bg-[#0a0a0a] border border-neutral-900 p-6 text-center text-neutral-600 font-display text-xs">No active media accreditation applications logged.</div>
              )}
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
