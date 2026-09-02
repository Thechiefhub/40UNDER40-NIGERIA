/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { FileText, Download, Play, X, ChevronRight, ChevronLeft, Calendar, Image as ImageIcon } from 'lucide-react';
import { Article } from '../types';
import SocialFeed from './SocialFeed';

interface MediaViewProps {
  articles: Article[];
  subView: string;
}

export default function MediaView({ articles, subView }: MediaViewProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'news' | 'press' | 'gallery' | 'videos' | 'social'>(
    subView === 'press-releases' ? 'press' : subView === 'gallery' ? 'gallery' : subView === 'video-hub' ? 'videos' : 'all'
  );

  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  
  // Gallery state
  const [activeImageIdx, setActiveImageIdx] = useState<number | null>(null);

  const galleryImages = [
    { src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop', caption: 'Keynote Panel Vetting VVIP Seating — TIME Conference', category: 'Conference' },
    { src: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800&auto=format&fit=crop', caption: 'Corporate Network Matchmaking Lounge — Lagos Oriental Hotel', category: 'Networking' },
    { src: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop', caption: 'The 40UNDER40 NIGERIA Gala Evening Ceremony Inductees', category: 'Gala' },
    { src: 'https://images.unsplash.com/photo-1505232458729-464066d915a3?q=80&w=800&auto=format&fit=crop', caption: 'Award Laureates Banquet Hall Reception — Black Tie', category: 'Gala' },
    { src: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=800&auto=format&fit=crop', caption: 'Press Conference Backdrop and Media Accreditation Briefings', category: 'Conference' },
    { src: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=800&auto=format&fit=crop', caption: 'Closing Ceremony Toast and Civic Leadership Panel Speeches', category: 'Speakers' }
  ];

  const videosList = [
    { id: 'v1', title: '40UNDER40 NIGERIA 2026 Highlight Movie', desc: 'The official visual chronicle of the August Black-tie induction ceremony.', duration: '4:12' },
    { id: 'v2', title: 'TIME Conference 2026 Executive Panels', desc: 'Debating domestic capital pooling strategies at Lagos Oriental Hotel.', duration: '18:45' },
    { id: 'v3', title: 'Interview Series: Amb. Dr. Omotayo Salako on Youth Productivity', desc: 'A special broadcast talking through our background vetting models.', duration: '12:08' }
  ];

  const filteredArticles = articles.filter((art) => {
    if (activeTab === 'news') return !art.isPressRelease;
    if (activeTab === 'press') return art.isPressRelease;
    return true; // all
  });

  const triggerDownload = (artTitle: string) => {
    alert(`Downloading official media files and sitemap kit for: "${artTitle}"`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 pb-20 relative">
      
      {/* Header */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-[10px] tracking-[0.3em] text-[#E50914] font-display font-bold uppercase">MEDIA CENTER</span>
        <h1 className="text-4xl md:text-5xl font-display font-extrabold tracking-tight text-white uppercase leading-none">
          NEWS, PRESS & GALLERY
        </h1>
        <p className="text-neutral-400 font-body text-xs sm:text-sm leading-relaxed font-light">
          Follow verified announcements, research editorials, event highlights, and press materials from across our corporate ecosystem.
        </p>
      </section>

      {/* Tabs Menu Controls */}
      <div className="flex flex-wrap sm:flex-nowrap bg-neutral-950 border border-neutral-900 p-1 rounded-sm max-w-2xl mx-auto font-display">
        <button onClick={() => { setActiveTab('all'); setActiveArticle(null); }} className={`flex-1 text-center py-2 text-[10px] sm:text-xs font-bold uppercase rounded-sm transition-all ${activeTab === 'all' ? 'bg-[#E50914] text-white' : 'text-neutral-500 hover:text-white'}`}>ALL STORIES</button>
        <button onClick={() => { setActiveTab('news'); setActiveArticle(null); }} className={`flex-1 text-center py-2 text-[10px] sm:text-xs font-bold uppercase rounded-sm transition-all ${activeTab === 'news' ? 'bg-[#E50914] text-white' : 'text-neutral-500 hover:text-white'}`}>NEWS</button>
        <button onClick={() => { setActiveTab('press'); setActiveArticle(null); }} className={`flex-1 text-center py-2 text-[10px] sm:text-xs font-bold uppercase rounded-sm transition-all ${activeTab === 'press' ? 'bg-[#E50914] text-white' : 'text-neutral-500 hover:text-white'}`}>PRESS</button>
        <button onClick={() => { setActiveTab('gallery'); setActiveArticle(null); }} className={`flex-1 text-center py-2 text-[10px] sm:text-xs font-bold uppercase rounded-sm transition-all ${activeTab === 'gallery' ? 'bg-[#E50914] text-white' : 'text-neutral-500 hover:text-white'}`}>GALLERY</button>
        <button onClick={() => { setActiveTab('videos'); setActiveArticle(null); }} className={`flex-1 text-center py-2 text-[10px] sm:text-xs font-bold uppercase rounded-sm transition-all ${activeTab === 'videos' ? 'bg-[#E50914] text-white' : 'text-neutral-500 hover:text-white'}`}>VIDEOS</button>
        <button onClick={() => { setActiveTab('social'); setActiveArticle(null); }} className={`flex-1 text-center py-2 text-[10px] sm:text-xs font-bold uppercase rounded-sm transition-all ${activeTab === 'social' ? 'bg-[#E50914] text-white' : 'text-neutral-500 hover:text-white'}`}>INSTAGRAM</button>
      </div>

      {/* Grid Dispatcher */}
      {!activeArticle && (activeTab === 'all' || activeTab === 'news' || activeTab === 'press') && (
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
          {filteredArticles.map((art) => (
            <div key={art.id} className="bg-[#0a0a0a] border border-neutral-900 p-5 rounded-sm flex flex-col justify-between group hover:border-neutral-800 transition-all">
              <div className="space-y-4">
                {/* Photo */}
                <div className="aspect-[16/10] rounded-sm overflow-hidden bg-neutral-950 border border-neutral-850">
                  <img src={art.image} alt={art.title} referrerPolicy="no-referrer" className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-500" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[9px] font-display font-semibold tracking-wide uppercase text-neutral-500">
                    <span className="text-[#E50914]">{art.category}</span>
                    <span>{art.readingTime}</span>
                  </div>
                  <h3 onClick={() => setActiveArticle(art)} className="text-sm font-display font-extrabold text-white uppercase group-hover:text-[#E50914] cursor-pointer line-clamp-2 transition-colors">
                    {art.title}
                  </h3>
                  <p className="text-neutral-400 text-xs font-body line-clamp-3 leading-relaxed font-light">{art.subtitle}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-950 mt-4 flex justify-between items-center">
                <div className="flex items-center gap-1 text-[10px] text-neutral-500 font-body">
                  <Calendar className="w-3.5 h-3.5 text-[#E50914]" />
                  <span>{art.date}</span>
                </div>
                
                {art.isPressRelease ? (
                  <button onClick={() => triggerDownload(art.title)} className="text-[10px] font-display font-bold text-[#E50914] flex items-center gap-1 hover:text-[#8F0008] uppercase">
                    <Download className="w-3.5 h-3.5" /> DOWNLOAD
                  </button>
                ) : (
                  <button onClick={() => setActiveArticle(art)} className="text-[10px] font-display font-bold text-neutral-400 hover:text-[#E50914] flex items-center gap-1 uppercase">
                    READ ARTICLE <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Interactive Gallery Masonry section */}
      {activeTab === 'gallery' && (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
          {galleryImages.map((img, idx) => (
            <div key={idx} onClick={() => setActiveImageIdx(idx)} className="bg-[#0a0a0a] border border-neutral-900 p-3 rounded-sm group cursor-pointer hover:border-neutral-800 transition-all">
              <div className="aspect-[4/3] bg-neutral-950 rounded-sm overflow-hidden relative mb-3">
                <img src={img.src} alt={img.caption} referrerPolicy="no-referrer" className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-2 left-2 bg-black/80 border border-neutral-850 px-2 py-0.5 rounded-sm text-[8px] font-display font-bold text-[#E50914] uppercase">
                  {img.category}
                </div>
              </div>
              <p className="text-neutral-400 text-[11px] font-body line-clamp-1 leading-relaxed group-hover:text-white transition-colors">{img.caption}</p>
            </div>
          ))}
        </section>
      )}

      {/* Video Hub Section */}
      {activeTab === 'videos' && (
        <section className="max-w-4xl mx-auto space-y-6 animate-fade-in">
          <div className="text-center max-w-sm mx-auto mb-6">
            <h3 className="font-display font-bold text-white uppercase text-base">WATCH THE MOMENTS</h3>
            <p className="text-[11px] text-neutral-500 font-body">Browse high-fidelity coverage of our gala dinners, guest forums, and convener addresses.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {videosList.map((vid) => (
              <div key={vid.id} className="bg-[#0a0a0a] border border-neutral-900 p-4 rounded-sm hover:border-neutral-800 transition-colors flex flex-col justify-between group">
                <div className="space-y-3">
                  {/* Mock Play video placeholder */}
                  <div className="aspect-[16/10] bg-neutral-950 rounded-sm relative flex flex-col justify-center items-center text-center border border-neutral-900 group-hover:border-neutral-800">
                    <div className="w-10 h-10 rounded-full bg-[#E50914]/10 border border-[#E50914] flex items-center justify-center group-hover:bg-[#E50914] group-hover:text-white text-[#E50914] transition-all">
                      <Play className="w-4 h-4 translate-x-0.5" />
                    </div>
                    <span className="text-[10px] text-neutral-500 font-display font-bold uppercase mt-3">{vid.duration} MINUTES</span>
                  </div>
                  <h4 className="font-display font-bold text-white uppercase text-xs line-clamp-1 group-hover:text-[#E50914] transition-colors">{vid.title}</h4>
                  <p className="text-neutral-400 text-[10px] font-body leading-relaxed">{vid.desc}</p>
                </div>
                <button onClick={() => alert(`Streaming video panel is processing. Verification ID: ${vid.id}`)} className="text-[10px] font-display font-bold text-[#E50914] uppercase text-left mt-4 inline-flex items-center gap-1">PLAY STREAM <ChevronRight className="w-3.5 h-3.5" /></button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Instagram Social Feed Section */}
      {activeTab === 'social' && !activeArticle && (
        <section className="animate-fade-in">
          <SocialFeed />
        </section>
      )}

      {/* Full Screen Article Reader */}
      {activeArticle && (
        <article className="max-w-3xl mx-auto bg-[#0a0a0a] border border-neutral-900 p-6 sm:p-10 rounded-sm space-y-6 animate-fade-in">
          <button onClick={() => setActiveArticle(null)} className="text-xs font-display font-bold text-neutral-500 hover:text-white flex items-center gap-1 uppercase pb-2 border-b border-neutral-950 mb-4">
            ← Back to Media Stream
          </button>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-[10px] font-display font-bold tracking-wide text-neutral-500 uppercase">
              <span className="text-[#E50914]">{activeArticle.category}</span>
              <span>Published {activeArticle.date}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white uppercase tracking-tight leading-none">{activeArticle.title}</h2>
            <p className="text-neutral-400 text-xs sm:text-sm font-body italic leading-relaxed">{activeArticle.subtitle}</p>
          </div>

          <div className="aspect-[16/9] bg-neutral-950 border border-neutral-900 rounded-sm overflow-hidden">
            <img src={activeArticle.image} alt={activeArticle.title} referrerPolicy="no-referrer" className="w-full h-full object-cover opacity-80" />
          </div>

          <div className="space-y-4 text-xs sm:text-sm font-body text-neutral-300 leading-relaxed font-light">
            {activeArticle.content.split('\n\n').map((para, i) => <p key={i}>{para}</p>)}
          </div>

          <div className="border-t border-neutral-900 pt-6 flex justify-between items-center text-xs text-neutral-500">
            <span>By: <strong className="text-neutral-300">{activeArticle.author}</strong></span>
            {activeArticle.isPressRelease && (
              <button onClick={() => triggerDownload(activeArticle.title)} className="bg-[#E50914] text-white font-display font-bold text-xs uppercase px-4 py-2 rounded-sm flex items-center gap-1.5 hover:bg-[#8F0008] transition-colors">
                <Download className="w-4 h-4" /> DOWNLOAD BRIEF
              </button>
            )}
          </div>
        </article>
      )}

      {/* Full Screen Gallery Lightbox overlay */}
      {activeImageIdx !== null && (
        <div className="fixed inset-0 bg-black/95 z-50 flex flex-col justify-between p-6">
          <div className="flex justify-between items-center">
            <span className="text-neutral-500 text-[10px] font-display font-bold tracking-widest uppercase">IMAGE {activeImageIdx + 1} OF {galleryImages.length}</span>
            <button onClick={() => setActiveImageIdx(null)} className="text-neutral-400 hover:text-white p-2">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Large image wrapper */}
          <div className="flex-1 flex justify-center items-center relative max-w-5xl mx-auto w-full">
            {/* Left selector */}
            <button
              onClick={() => setActiveImageIdx((prev) => (prev! > 0 ? prev! - 1 : galleryImages.length - 1))}
              className="absolute left-2 p-3 rounded-full bg-black/60 border border-neutral-850 hover:border-white transition-colors text-white z-10"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <img
              src={galleryImages[activeImageIdx].src}
              alt={galleryImages[activeImageIdx].caption}
              referrerPolicy="no-referrer"
              className="max-h-[70vh] max-w-full object-contain border border-neutral-900 rounded-sm"
            />

            {/* Right selector */}
            <button
              onClick={() => setActiveImageIdx((prev) => (prev! < galleryImages.length - 1 ? prev! + 1 : 0))}
              className="absolute right-2 p-3 rounded-full bg-black/60 border border-neutral-850 hover:border-white transition-colors text-white z-10"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="text-center space-y-1">
            <p className="text-white text-xs sm:text-sm font-body max-w-xl mx-auto leading-relaxed">{galleryImages[activeImageIdx].caption}</p>
            <span className="text-[10px] text-[#E50914] font-display font-bold tracking-wider uppercase block">{galleryImages[activeImageIdx].category} SECTOR</span>
          </div>
        </div>
      )}

    </div>
  );
}
