/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Camera, ShieldCheck, ShieldAlert, Users, CheckCircle2, XCircle, Search, RefreshCw, Key } from 'lucide-react';
import { Registration } from '../types';

export default function CheckInConsole() {
  const [regs, setRegs] = useState<Registration[]>([]);
  const [inputCode, setInputCode] = useState('');
  
  // SCANNER RESULTS PANELS
  const [scanStatus, setScanStatus] = useState<'idle' | 'success' | 'duplicate' | 'invalid'>('idle');
  const [scannedAttendee, setScannedAttendee] = useState<Registration | null>(null);

  // Search local list
  const [searchQuery, setSearchQuery] = useState('');

  // Auto load database
  const loadDatabase = () => {
    const list = JSON.parse(localStorage.getItem('registrations') || '[]');
    setRegs(list);
  };

  useEffect(() => {
    loadDatabase();
  }, []);

  const handleScanCode = (code: string) => {
    if (!code) return;
    const cleanCode = code.trim().toUpperCase();

    // Find the attendee with matching registration ID or QR passcode
    const allRegs = JSON.parse(localStorage.getItem('registrations') || '[]');
    const idx = allRegs.findIndex((r: Registration) => 
      r.id.toUpperCase() === cleanCode || 
      r.qrPassCode.toUpperCase().includes(cleanCode)
    );

    if (idx === -1) {
      setScanStatus('invalid');
      setScannedAttendee(null);
      return;
    }

    const attendee = allRegs[idx];

    if (attendee.checkedIn) {
      setScanStatus('duplicate');
      setScannedAttendee(attendee);
      return;
    }

    // Success check-in!
    allRegs[idx].checkedIn = true;
    allRegs[idx].checkInTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    
    // Save updated DB
    localStorage.setItem('registrations', JSON.stringify(allRegs));
    
    setScannedAttendee(allRegs[idx]);
    setScanStatus('success');
    setInputCode('');
    
    // Reload local list view
    loadDatabase();
  };

  const resetScanner = () => {
    setScanStatus('idle');
    setScannedAttendee(null);
  };

  const filteredRegs = regs.filter(r => 
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-20 space-y-10">
      
      {/* Editorial Header */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-[10px] tracking-[0.3em] text-[#E50914] font-display font-bold uppercase">GATE RECEPTION OPERATIONAL SERVICES</span>
        <h1 className="text-4xl md:text-5xl font-display font-extrabold tracking-tight text-white uppercase leading-none">
          QR ENTRANCE SCANNER
        </h1>
        <p className="text-neutral-400 font-body text-xs sm:text-sm leading-relaxed font-light">
          Simulated digital scanner and entrance controller terminal. Scan and validate delegate tickets to avoid duplications.
        </p>
      </section>

      {/* Main Grid: Live Occupancy and QR Controller */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Occupancy stats & Simulator */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#0a0a0a] border border-neutral-900 p-6 rounded-sm space-y-6">
            <div className="flex justify-between items-center border-b border-neutral-950 pb-3">
              <div>
                <span className="text-[9px] tracking-widest text-[#E50914] font-display font-bold uppercase block">OCCUPANCY LIMITS</span>
                <h3 className="text-xs font-display font-bold text-white uppercase">Venue Capacity Logs</h3>
              </div>
              <button onClick={loadDatabase} className="text-neutral-500 hover:text-white transition-colors" title="Reload Database"><RefreshCw className="w-4 h-4" /></button>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs font-body text-neutral-400">
                <span>VVIP Grand Ballroom Seats</span>
                <span className="text-white font-semibold font-mono">
                  {regs.filter(r => r.ticketType === 'VVIP' && r.checkedIn).length} / 40
                </span>
              </div>
              <div className="flex justify-between items-center text-xs font-body text-neutral-400">
                <span>Corporate Delegates Accreditations</span>
                <span className="text-white font-semibold font-mono">
                  {regs.filter(r => r.ticketType === 'Corporate' && r.checkedIn).length} / 120
                </span>
              </div>
              <div className="flex justify-between items-center text-xs font-body text-neutral-400">
                <span>Regular General Admission Seats</span>
                <span className="text-white font-semibold font-mono">
                  {regs.filter(r => r.ticketType === 'General' && r.checkedIn).length} / 300
                </span>
              </div>

              {/* Graphical gauge of capacity */}
              <div className="pt-4 border-t border-neutral-950">
                <div className="flex justify-between text-[10px] font-display font-bold text-neutral-500 uppercase mb-2">
                  <span>Gross Hall Capacity</span>
                  <span className="text-[#E50914]">
                    {Math.round((regs.filter(r => r.checkedIn).length / 460) * 100)}% Occupied
                  </span>
                </div>
                <div className="w-full bg-neutral-950 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-[#E50914] h-full transition-all duration-500" 
                    style={{ width: `${Math.max(2, Math.round((regs.filter(r => r.checkedIn).length / 460) * 100))}%` }} 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Terminal Scan Engine */}
        <div className="lg:col-span-8 bg-[#0a0a0a] border border-neutral-900 p-6 sm:p-10 rounded-sm space-y-6">
          
          <div className="border-b border-neutral-950 pb-4 flex justify-between items-center">
            <div>
              <span className="text-[9px] tracking-widest text-neutral-500 font-display font-bold uppercase block">INTELLIGENT GATE SCANNER</span>
              <h3 className="text-sm font-display font-bold text-white uppercase">Entrance Controller</h3>
            </div>
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="System Online"></div>
          </div>

          {/* DYNAMIC SCANNERS STATUS OVERLAYS */}
          {scanStatus === 'idle' && (
            <div className="border-2 border-dashed border-neutral-900 rounded-sm p-10 text-center space-y-4 bg-neutral-950/20">
              <Camera className="w-10 h-10 text-neutral-700 mx-auto animate-pulse" />
              <div>
                <span className="block text-xs font-display font-bold text-neutral-400 uppercase">AWAITING ADMISSION QR</span>
                <span className="block text-[11px] text-neutral-600 font-body mt-1">Input a credential ID code below, or select a pending delegate file from the search roster list.</span>
              </div>
            </div>
          )}

          {scanStatus === 'success' && scannedAttendee && (
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-sm p-6 space-y-4 animate-fade-in">
              <div className="flex gap-3 items-center">
                <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                <div>
                  <h4 className="text-sm font-display font-extrabold text-white uppercase">CHECK-IN SUCCESSFUL</h4>
                  <p className="text-[10px] text-emerald-500 font-body uppercase font-bold tracking-wider leading-none mt-1">Gate access approved • Code locked</p>
                </div>
              </div>

              <div className="border-t border-emerald-500/10 pt-4 grid grid-cols-2 gap-4 text-xs font-body text-neutral-400">
                <div>
                  <span className="text-[9px] text-neutral-500 uppercase block font-display">Credential Holder</span>
                  <strong className="text-white">{scannedAttendee.name}</strong>
                </div>
                <div>
                  <span className="text-[9px] text-neutral-500 uppercase block font-display">Pass Tier</span>
                  <span className="text-[#E50914] font-display font-bold">{scannedAttendee.ticketType}</span>
                </div>
                <div>
                  <span className="text-[9px] text-neutral-500 uppercase block font-display">Check-in Stamp</span>
                  <strong className="text-white">{scannedAttendee.checkInTime}</strong>
                </div>
                <div>
                  <span className="text-[9px] text-neutral-500 uppercase block font-display">Credential ID</span>
                  <strong className="text-white font-display font-mono text-[10px]">{scannedAttendee.id}</strong>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button onClick={resetScanner} className="bg-emerald-500 text-black font-display font-bold text-[10px] uppercase px-5 py-2 rounded-sm transition-all hover:bg-emerald-400">Scan next card</button>
              </div>
            </div>
          )}

          {scanStatus === 'duplicate' && scannedAttendee && (
            <div className="bg-rose-500/10 border border-rose-500/20 rounded-sm p-6 space-y-4 animate-fade-in">
              <div className="flex gap-3 items-center">
                <XCircle className="w-6 h-6 text-rose-500" />
                <div>
                  <h4 className="text-sm font-display font-extrabold text-white uppercase">ALREADY CHECKED IN</h4>
                  <p className="text-[10px] text-rose-500 font-body uppercase font-bold tracking-wider leading-none mt-1">Duplicate Entry Prevented</p>
                </div>
              </div>

              <p className="text-neutral-400 text-xs font-body leading-relaxed font-light">
                The credential ticket matching <strong className="text-white">{scannedAttendee.name}</strong> (Pass ID: <strong className="text-white font-mono">{scannedAttendee.id}</strong>) was checked in at <strong className="text-white">{scannedAttendee.checkInTime}</strong>. Entry is strictly single-admission.
              </p>

              <div className="pt-2 flex justify-end">
                <button onClick={resetScanner} className="bg-rose-500 text-white font-display font-bold text-[10px] uppercase px-5 py-2 rounded-sm transition-all hover:bg-rose-600">Reset scanner</button>
              </div>
            </div>
          )}

          {scanStatus === 'invalid' && (
            <div className="bg-[#E50914]/10 border border-[#E50914]/20 rounded-sm p-6 space-y-4 animate-fade-in">
              <div className="flex gap-3 items-center">
                <XCircle className="w-6 h-6 text-[#E50914]" />
                <div>
                  <h4 className="text-sm font-display font-extrabold text-white uppercase">INVALID ADMISSION TICKET</h4>
                  <p className="text-[10px] text-[#E50914] font-body uppercase font-bold tracking-wider leading-none mt-1">Sitemap verification failed</p>
                </div>
              </div>

              <p className="text-neutral-400 text-xs font-body leading-relaxed font-light">
                The credential code supplied could not be located inside our synchronized secure databases. Check spelling or request a new ticket brief at the reception desk.
              </p>

              <div className="pt-2 flex justify-end">
                <button onClick={resetScanner} className="bg-[#E50914] text-white font-display font-bold text-[10px] uppercase px-5 py-2 rounded-sm transition-all hover:bg-[#8F0008]">Try again</button>
              </div>
            </div>
          )}

          {/* INPUT FORM SIMULATING THE CARD SCAN */}
          <form onSubmit={(e) => { e.preventDefault(); handleScanCode(inputCode); }} className="space-y-4">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Key className="w-4 h-4 text-neutral-600 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Input Delegate ID (e.g. REG-412891, REG-189201)..."
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-850 focus:border-[#E50914] pl-9 pr-4 py-3 rounded-sm outline-none text-xs text-white"
                />
              </div>
              <button type="submit" className="bg-[#E50914] hover:bg-[#8F0008] text-white font-display font-bold text-xs uppercase px-6 py-3 rounded-sm transition-all shrink-0">Validate Code</button>
            </div>
          </form>

          {/* Quick lists of registrations to scan from (Roster simulation) */}
          <div className="space-y-4 pt-4 border-t border-neutral-950">
            <div className="flex justify-between items-center">
              <span className="text-[9px] tracking-widest text-neutral-500 font-display font-bold uppercase block">Delegate Accreditation Roster (Quick Scan Mock)</span>
              <span className="text-[9px] bg-[#E50914]/5 border border-[#E50914]/10 text-[#E50914] px-2 py-0.5 rounded-sm uppercase tracking-wider font-mono">{regs.length} REGISTERED FILES</span>
            </div>

            <div className="bg-neutral-950 p-4 border border-neutral-900 rounded-sm max-h-48 overflow-y-auto space-y-2">
              {regs.length > 0 ? (
                regs.map((reg) => (
                  <div key={reg.id} className="flex justify-between items-center bg-[#0a0a0a] border border-neutral-900 hover:border-neutral-800 p-2.5 rounded-sm text-xs font-body">
                    <div>
                      <strong className="text-white">{reg.name}</strong>
                      <span className="text-neutral-500 text-[10px] ml-2 font-mono">ID: {reg.id} ({reg.ticketType})</span>
                    </div>

                    {reg.checkedIn ? (
                      <span className="text-[9px] font-display font-semibold text-neutral-600 uppercase">CHECKED-IN</span>
                    ) : (
                      <button 
                        onClick={() => handleScanCode(reg.id)} 
                        className="text-[9px] font-display font-bold text-[#E50914] border border-[#E50914]/20 hover:border-[#E50914] px-2 py-1 rounded-sm uppercase bg-transparent"
                      >
                        SIMULATE SCAN
                      </button>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center text-neutral-600 text-[11px] font-display py-4">
                  No active delegate files exist in the LocalStorage sandbox. Go to Events to book a seat first.
                </div>
              )}
            </div>
          </div>

        </div>

      </section>

    </div>
  );
}
