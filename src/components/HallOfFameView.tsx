/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { Search, Filter, Globe, Linkedin, X, ChevronRight, MapPin, Award, Layers } from 'lucide-react';
import * as d3 from 'd3';
import { motion } from 'motion/react';
import { Awardee } from '../types';

interface HallOfFameViewProps {
  awardees: Awardee[];
}

interface MapStateNode {
  name: string;
  code: string;
  region: string;
  x: number;
  y: number;
  count: number;
  awardees: string[];
}

export default function HallOfFameView({ awardees }: HallOfFameViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStateFilter, setSelectedStateFilter] = useState('All');
  const [selectedIndustryTab, setSelectedIndustryTab] = useState<'All' | 'Tech' | 'Healthcare' | 'Finance'>('All');
  const [activeProfile, setActiveProfile] = useState<Awardee | null>(null);

  const svgRef = useRef<SVGSVGElement | null>(null);

  // Nigeria States coordinates representation on SVG (scaled grid mapping)
  const [statesData, setStatesData] = useState<MapStateNode[]>([
    { name: 'Lagos', code: 'LA', region: 'South West', x: 120, y: 280, count: 0, awardees: [] },
    { name: 'Kano', code: 'KN', region: 'North West', x: 280, y: 70, count: 0, awardees: [] },
    { name: 'Enugu', code: 'EN', region: 'South East', x: 290, y: 250, count: 0, awardees: [] },
    { name: 'Ogun', code: 'OG', region: 'South West', x: 100, y: 260, count: 0, awardees: [] },
    { name: 'Kaduna', code: 'KD', region: 'North West', x: 245, y: 140, count: 0, awardees: [] },
    { name: 'Anambra', code: 'AN', region: 'South East', x: 270, y: 270, count: 0, awardees: [] },
    { name: 'FCT', code: 'FC', region: 'North Central', x: 230, y: 190, count: 0, awardees: [] },
    { name: 'Rivers', code: 'RI', region: 'South South', x: 260, y: 310, count: 0, awardees: [] },
    { name: 'Oyo', code: 'OY', region: 'South West', x: 110, y: 230, count: 0, awardees: [] },
    { name: 'Delta', code: 'DE', region: 'South South', x: 220, y: 290, count: 0, awardees: [] },
    { name: 'Plateau', code: 'PL', region: 'North Central', x: 290, y: 180, count: 0, awardees: [] },
    { name: 'Borno', code: 'BO', region: 'North East', x: 410, y: 80, count: 0, awardees: [] },
  ]);

  // Aggregate counts dynamically from actual current awardees array
  useEffect(() => {
    const updated = statesData.map(node => {
      // Find matches
      const matches = awardees.filter(aw => aw.state?.toLowerCase() === node.name.toLowerCase());
      return {
        ...node,
        count: matches.length,
        awardees: matches.map(aw => aw.name)
      };
    });
    setStatesData(updated);
  }, [awardees]);

  // Render the D3.js Nigeria State Distribution Map
  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove(); // Reset canvas

    const width = 500;
    const height = 350;

    // Outer border of Nigeria abstract path outline
    const nigeriaPath = [
      [60, 240], [80, 180], [120, 110], [180, 70], [240, 50], [320, 40], [400, 50],
      [450, 90], [460, 160], [410, 220], [420, 280], [360, 310], [280, 330],
      [220, 310], [140, 295], [80, 290], [60, 260]
    ];

    const lineGenerator = d3.line<number[]>()
      .x(d => d[0])
      .y(d => d[1])
      .curve(d3.curveCardinalClosed);

    // Render country background contours
    svg.append('path')
      .attr('d', lineGenerator(nigeriaPath) || '')
      .attr('fill', 'rgba(10, 10, 10, 0.6)')
      .attr('stroke', 'rgba(229, 9, 20, 0.15)')
      .attr('stroke-width', '2')
      .attr('class', 'transition-all duration-700');

    // Add visual geometric connection network lines representing national impact integration
    const activeNodes = statesData.filter(d => d.count > 0);
    if (activeNodes.length > 1) {
      for (let i = 0; i < activeNodes.length; i++) {
        for (let j = i + 1; j < activeNodes.length; j++) {
          svg.append('line')
            .attr('x1', activeNodes[i].x)
            .attr('y1', activeNodes[i].y)
            .attr('x2', activeNodes[j].x)
            .attr('y2', activeNodes[j].y)
            .attr('stroke', 'rgba(229, 9, 20, 0.12)')
            .attr('stroke-width', '1')
            .attr('stroke-dasharray', '3,3');
        }
      }
    }

    // Render the interactive state nodes
    const nodeGroups = svg.selectAll('.state-node')
      .data(statesData)
      .enter()
      .append('g')
      .attr('class', 'state-node cursor-pointer')
      .attr('transform', (d: any) => `translate(${d.x}, ${d.y})`)
      .on('click', (event, d: any) => {
        setSelectedStateFilter(prev => prev === d.name ? 'All' : d.name);
      });

    // Outer pulse ring for active states (states with awardees)
    nodeGroups.filter((d: any) => d.count > 0)
      .append('circle')
      .attr('r', 16)
      .attr('fill', 'none')
      .attr('stroke', '#E50914')
      .attr('stroke-width', '1.5')
      .attr('opacity', '0.4')
      .append('animate')
      .attr('attributeName', 'r')
      .attr('values', '6;20;6')
      .attr('dur', '3s')
      .attr('repeatCount', 'indefinite');

    // Solid inner coordinate marker
    nodeGroups.append('circle')
      .attr('r', (d: any) => d.count > 0 ? 7 : 4)
      .attr('fill', (d: any) => {
        if (selectedStateFilter === d.name) return '#FFFFFF';
        return d.count > 0 ? '#E50914' : '#262626';
      })
      .attr('stroke', (d: any) => d.count > 0 ? '#FFFFFF' : '#404040')
      .attr('stroke-width', '1.5')
      .attr('class', 'transition-all duration-300');

    // State abbreviation text inside active coordinate nodes
    nodeGroups.filter((d: any) => d.count > 0)
      .append('text')
      .text((d: any) => d.code)
      .attr('text-anchor', 'middle')
      .attr('dy', '.35em')
      .attr('fill', '#FFFFFF')
      .attr('font-size', '8px')
      .attr('font-family', 'sans-serif')
      .attr('font-weight', 'bold');

    // State name text labels next to coordinates
    nodeGroups.append('text')
      .text((d: any) => d.name)
      .attr('dx', 10)
      .attr('dy', '.35em')
      .attr('fill', (d: any) => {
        if (selectedStateFilter === d.name) return '#E50914';
        return d.count > 0 ? '#E5E5E5' : '#737373';
      })
      .attr('font-size', '9px')
      .attr('font-weight', (d: any) => d.count > 0 ? 'bold' : 'normal')
      .attr('class', 'transition-all duration-300');

  }, [statesData, selectedStateFilter]);

  // Combined real-time Vetting/Search logic (filters awardees)
  const filteredAwardees = awardees.filter((aw) => {
    const matchesSearch =
      aw.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      aw.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      aw.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      aw.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
      aw.year.includes(searchQuery);

    const matchesYear = selectedYear === 'All' || aw.year === selectedYear;
    const matchesCategory = selectedCategory === 'All' || aw.category.includes(selectedCategory);
    const matchesState = selectedStateFilter === 'All' || aw.state?.toLowerCase() === selectedStateFilter.toLowerCase();

    const matchesIndustryTab = selectedIndustryTab === 'All' || (() => {
      const ind = aw.industry.toLowerCase();
      const cat = aw.category.toLowerCase();
      if (selectedIndustryTab === 'Tech') {
        return ind.includes('tech') || cat.includes('tech') || ind.includes('software') || ind.includes('digital') || ind.includes('cyber');
      }
      if (selectedIndustryTab === 'Healthcare') {
        return ind.includes('health') || cat.includes('health') || ind.includes('medical') || ind.includes('medicine') || ind.includes('pharma');
      }
      if (selectedIndustryTab === 'Finance') {
        return ind.includes('finance') || cat.includes('finance') || ind.includes('bank') || ind.includes('pay') || ind.includes('capital') || ind.includes('insurance') || cat.includes('business');
      }
      return false;
    })();

    return matchesSearch && matchesYear && matchesCategory && matchesState && matchesIndustryTab;
  });

  const years = ['All', '2026', '2025'];
  const categories = [
    'All',
    'Business & Entrepreneurship',
    'Technology & Innovation',
    'Professional Services & Health',
    'Manufacturing & Engineering',
    'Social Impact & Public Service',
    'Media & Creative Industries'
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 pb-20 relative">
      
      {/* Editorial Header */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-[10px] tracking-[0.3em] text-[#E50914] font-display font-bold uppercase">THE ELITE ALUMNI</span>
        <h1 className="text-4xl md:text-5xl font-display font-extrabold tracking-tight text-white uppercase leading-none">
          THE 40UNDER40 HALL OF FAME
        </h1>
        <p className="text-neutral-400 font-body text-xs sm:text-sm leading-relaxed font-light">
          An audited, transparent historical repository celebrating the outstanding laureates inducted across previous editions of the 40UNDER40 NIGERIA Prestige Awards.
        </p>
      </section>

      {/* Grid containing D3 Map Component & Geographic Summary */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Geographic D3.js Map Panel */}
        <div className="lg:col-span-7 bg-[#050505] border border-neutral-900 rounded-3xl p-6 relative overflow-hidden glass">
          <div className="absolute top-0 right-0 p-3 text-[8px] tracking-[0.2em] font-display text-[#E50914] font-bold">
            D3.JS MAP GRID
          </div>
          <div className="mb-4">
            <h3 className="text-sm font-display font-bold text-white uppercase flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#E50914]" />
              Geographic Laureate Distribution
            </h3>
            <p className="text-neutral-400 text-[11px] font-body">
              Click any coordinate node to filter awardees belonging to that state.
            </p>
          </div>

          {/* D3 Map Canvas */}
          <div className="flex justify-center items-center bg-black/40 rounded-2xl py-4 overflow-x-auto">
            <svg
              ref={svgRef}
              width="500"
              height="350"
              className="max-w-full block"
            />
          </div>

          <div className="mt-4 flex flex-wrap gap-4 items-center justify-between text-[10px] font-display text-neutral-500 border-t border-neutral-900 pt-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#E50914] rounded-full inline-block"></span>
              <span>Active State Node (Has Inductees)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-neutral-800 rounded-full inline-block"></span>
              <span>Regional Representative Node</span>
            </div>
          </div>
        </div>

        {/* Selected State Summary / Interactive Analytics Card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#050505] border border-neutral-900 rounded-3xl p-6 glass flex flex-col justify-between h-full">
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-neutral-900 pb-3">
                <span className="text-[10px] tracking-widest text-[#E50914] font-display font-bold uppercase">
                  State Focus Panel
                </span>
                {selectedStateFilter !== 'All' && (
                  <button
                    onClick={() => setSelectedStateFilter('All')}
                    className="text-[10px] font-display font-bold text-white bg-neutral-900 border border-neutral-800 px-2.5 py-1 rounded-full hover:bg-red-600 transition-colors"
                  >
                    RESET MAP FILTER
                  </button>
                )}
              </div>

              {selectedStateFilter === 'All' ? (
                <div className="space-y-4 py-4 text-center sm:text-left">
                  <div className="w-12 h-12 rounded-2xl bg-red-950/30 border border-red-900/30 flex items-center justify-center mx-auto sm:mx-0">
                    <Layers className="w-5 h-5 text-[#E50914]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-display font-bold text-white uppercase">All Nigeria Territories</h4>
                    <p className="text-neutral-400 text-xs font-body mt-1 leading-relaxed">
                      Laureates are distributed across geopolitical regions. Use the interactive map outline to explore specific clusters, network connections, and local impact centers.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="bg-neutral-950/60 p-3 border border-neutral-900 rounded-2xl text-center">
                      <span className="block text-xl font-display font-extrabold text-white">{awardees.length}</span>
                      <span className="text-[9px] font-display text-neutral-500 font-bold uppercase">TOTAL INDUCTEES</span>
                    </div>
                    <div className="bg-neutral-950/60 p-3 border border-neutral-900 rounded-2xl text-center">
                      <span className="block text-xl font-display font-extrabold text-[#E50914]">{statesData.filter(n => n.count > 0).length}</span>
                      <span className="text-[9px] font-display text-neutral-500 font-bold uppercase">ACTIVE STATES</span>
                    </div>
                  </div>
                </div>
              ) : (
                (() => {
                  const node = statesData.find(n => n.name === selectedStateFilter);
                  return (
                    <div className="space-y-4 py-2">
                      <div>
                        <span className="text-[10px] tracking-widest text-neutral-500 font-display font-bold uppercase">
                          {node?.region} Region
                        </span>
                        <h4 className="text-xl font-display font-extrabold text-white uppercase mt-0.5">
                          {node?.name} State
                        </h4>
                      </div>

                      <div className="p-4 bg-neutral-950/60 border border-neutral-900 rounded-2xl">
                        <span className="block text-2xl font-display font-extrabold text-[#E50914]">
                          {node?.count || 0}
                        </span>
                        <span className="text-[9px] font-display text-neutral-500 font-bold uppercase block mt-0.5">
                          Verified Laureate{node?.count !== 1 ? 's' : ''} Inducted
                        </span>
                      </div>

                      {node && node.count > 0 ? (
                        <div className="space-y-2">
                          <span className="text-[9px] text-neutral-500 font-display font-bold uppercase block">
                            Featured Inductees from {node.name}
                          </span>
                          <div className="space-y-2">
                            {node.awardees.map((name, idx) => (
                              <div
                                key={idx}
                                className="flex items-center gap-2 p-2.5 bg-[#0a0a0a]/80 border border-neutral-900 rounded-xl"
                              >
                                <Award className="w-4 h-4 text-[#E50914] shrink-0" />
                                <span className="text-xs font-display font-bold text-white uppercase">{name}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <p className="text-neutral-500 text-xs font-body leading-relaxed py-2">
                          No inductees are currently listed under {node?.name} State for these specific cohorts. Nominate emerging pioneers from this state using our nominations portal!
                        </p>
                      )}
                    </div>
                  );
                })()
              )}
            </div>
          </div>
        </div>

      </section>
      
      {/* Horizontal Industry Tab Navigation with Framer Motion layout transition */}
      <div className="flex justify-center">
        <div className="flex flex-wrap sm:flex-nowrap gap-1 p-1 bg-[#050505] border border-neutral-900 rounded-full max-w-lg w-full relative">
          {(['All', 'Tech', 'Healthcare', 'Finance'] as const).map((tab) => {
            const isActive = selectedIndustryTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setSelectedIndustryTab(tab)}
                className={`relative flex-1 text-center py-2 text-[10px] sm:text-xs font-display font-extrabold uppercase transition-colors rounded-full z-10 select-none ${
                  isActive ? 'text-white font-black' : 'text-neutral-500 hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeIndustryTab"
                    className="absolute inset-0 bg-[#E50914] rounded-full -z-10"
                    transition={{ type: 'spring', stiffness: 420, damping: 30 }}
                  />
                )}
                {tab}
              </button>
            );
          })}
        </div>
      </div>

      {/* Vetting Control Bar with Search Bar & Filters */}
      <section className="bg-[#050505] border border-neutral-900 p-4 sm:p-6 rounded-3xl glass">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          
          {/* Advanced Search bar */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter by name, industry, award year, or position..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-neutral-950/80 border border-neutral-800 focus:border-[#E50914] pl-10 pr-4 py-2.5 rounded-full outline-none text-xs text-white placeholder-neutral-500 transition-colors"
            />
          </div>

          {/* Year select */}
          <div className="md:col-span-3 flex items-center gap-2">
            <span className="text-[9px] font-display text-neutral-500 font-bold uppercase shrink-0">Award Year</span>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full bg-neutral-950/80 border border-neutral-800 text-xs py-2 px-3 rounded-full text-neutral-300 outline-none cursor-pointer focus:border-[#E50914]"
            >
              {years.map((y) => <option key={y} value={y}>{y === 'All' ? 'All Classes' : `Class of ${y}`}</option>)}
            </select>
          </div>

          {/* Category select */}
          <div className="md:col-span-3 flex items-center gap-2">
            <span className="text-[9px] font-display text-neutral-500 font-bold uppercase shrink-0">Sector Focus</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-neutral-950/80 border border-neutral-800 text-xs py-2 px-3 rounded-full text-neutral-300 outline-none cursor-pointer focus:border-[#E50914]"
            >
              {categories.map((c) => <option key={c} value={c}>{c === 'All' ? 'All Sectors' : c}</option>)}
            </select>
          </div>

        </div>
      </section>

      {/* Grid: Asymmetric Editorial Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAwardees.length > 0 ? (
          filteredAwardees.map((aw) => (
            <div
              key={aw.id}
              onClick={() => setActiveProfile(aw)}
              className="bg-[#050505] border border-neutral-900 hover:border-red-900/40 hover:scale-[1.02] transition-all p-5 group flex flex-col justify-between cursor-pointer rounded-3xl glass glass-hover"
            >
              <div className="space-y-4">
                {/* Header portrait row */}
                <div className="flex gap-4 items-start">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-850 shrink-0">
                    <img
                      src={aw.photoUrl}
                      alt={aw.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top opacity-85 group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div>
                    <h3 className="font-display font-extrabold text-white text-sm uppercase group-hover:text-[#E50914] transition-colors">
                      {aw.name}
                    </h3>
                    <p className="text-xs text-neutral-400 font-body leading-tight mt-0.5">{aw.position}</p>
                    <p className="text-[10px] text-[#E50914] font-body uppercase tracking-wider font-semibold">{aw.company}</p>
                  </div>
                </div>

                <div className="border-t border-neutral-900 pt-4">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="inline-block text-[9px] tracking-widest text-[#E50914] font-display font-bold uppercase">
                      CLASS OF {aw.year} • {aw.category}
                    </span>
                    {aw.state && (
                      <span className="text-[9px] font-display font-semibold text-neutral-500 uppercase flex items-center gap-0.5">
                        <MapPin className="w-2.5 h-2.5 text-[#E50914]" /> {aw.state}
                      </span>
                    )}
                  </div>
                  <p className="text-neutral-400 text-xs font-body leading-relaxed line-clamp-2">{aw.bio}</p>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between text-[10px] font-display font-bold tracking-wider text-neutral-500 group-hover:text-[#E50914] transition-colors border-t border-neutral-900/40 mt-4">
                <span>EXPLORE DOSSIER</span>
                <ChevronRight className="w-4 h-4 translate-x-0 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full bg-[#050505] border border-neutral-900 p-12 text-center rounded-3xl glass">
            <Award className="w-10 h-10 text-neutral-800 mx-auto mb-3" />
            <span className="block text-xs font-display font-bold text-neutral-400 uppercase">NO AWARDEES FOUND</span>
            <span className="block text-[11px] text-neutral-600 font-body mt-1">Try adjusting your search criteria, class filters, or select another state.</span>
          </div>
        )}
      </section>

      {/* Slide-out Profile Drawer Detail view */}
      {activeProfile && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex justify-end animate-fade-in">
          
          {/* Backdrop exit */}
          <div className="absolute inset-0" onClick={() => setActiveProfile(null)} />

          {/* Drawer content */}
          <div className="relative w-full max-w-xl bg-[#050505]/95 border-l border-neutral-900 h-full overflow-y-auto p-6 sm:p-10 flex flex-col justify-between shadow-2xl z-10 animate-slide-left glass">
            
            <button
              onClick={() => setActiveProfile(null)}
              className="absolute top-4 right-4 p-2 text-neutral-500 hover:text-white transition-colors"
              aria-label="Close details"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-8">
              {/* Profile header row */}
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <div className="w-32 h-32 rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-800 shrink-0">
                  <img
                    src={activeProfile.photoUrl}
                    alt={activeProfile.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top opacity-90"
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-block text-[10px] tracking-widest text-[#E50914] font-display font-bold uppercase bg-black/80 border border-neutral-800 px-3 py-1 rounded-full">
                      CLASS OF {activeProfile.year} INDUCTEE
                    </span>
                    {activeProfile.state && (
                      <span className="inline-block text-[10px] tracking-widest text-white font-display font-bold uppercase bg-red-950/40 border border-red-900/30 px-3 py-1 rounded-full flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#E50914]" /> {activeProfile.state}
                      </span>
                    )}
                  </div>
                  <h2 className="text-2xl font-display font-extrabold text-white uppercase tracking-tight leading-none pt-1">
                    {activeProfile.name}
                  </h2>
                  <p className="text-sm text-neutral-300 font-body">{activeProfile.position}</p>
                  <p className="text-xs text-[#E50914] font-body uppercase font-bold tracking-wider">{activeProfile.company}</p>
                </div>
              </div>

              {/* Biography */}
              <div className="space-y-2 border-t border-neutral-900 pt-6">
                <h4 className="text-[10px] tracking-[0.2em] text-neutral-500 font-display font-bold uppercase">Executive Biography</h4>
                <p className="text-neutral-400 text-xs font-body leading-relaxed font-light">
                  {activeProfile.bio}
                </p>
              </div>

              {/* Why they won */}
              <div className="space-y-2 bg-neutral-950/60 border border-neutral-900 p-5 rounded-2xl">
                <h4 className="text-[10px] tracking-[0.2em] text-[#E50914] font-display font-bold uppercase">Why they were recognized</h4>
                <p className="text-white text-xs font-body leading-relaxed font-light">
                  {activeProfile.impactStory}
                </p>
              </div>
            </div>

            {/* Social connections & connect */}
            <div className="border-t border-neutral-900 pt-6 mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
              <span className="text-[10px] font-display text-neutral-500 font-bold uppercase">Verified Laureate Channel</span>
              
              <div className="flex gap-3 w-full sm:w-auto">
                {activeProfile.linkedin && (
                  <a
                    href={activeProfile.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-1.5 px-4 py-2 bg-neutral-950 border border-neutral-800 hover:border-neutral-700 rounded-full text-xs text-neutral-400 hover:text-white transition-all font-display w-full sm:w-auto"
                  >
                    <Linkedin className="w-4 h-4 text-[#E50914]" />
                    <span>CONNECT</span>
                  </a>
                )}
                <button
                  onClick={() => alert(`Direct corporate routing is locked to authenticated Community members. Please sign in to request a formal business match.`)}
                  className="flex items-center justify-center gap-1.5 px-5 py-2.5 bg-[#E50914] hover:bg-red-700 rounded-full text-xs text-white transition-all font-display font-bold w-full sm:w-auto"
                >
                  <Globe className="w-4 h-4" />
                  <span>REQUEST MATCH</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
