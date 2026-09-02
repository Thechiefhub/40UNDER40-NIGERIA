/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Instagram, Send, Bookmark, RefreshCw, X, ExternalLink, Sparkles, Check } from 'lucide-react';

interface InstagramPost {
  id: string;
  image: string;
  caption: string;
  likes: number;
  commentsCount: number;
  date: string;
  location: string;
  comments: Array<{ username: string; text: string }>;
}

const INITIAL_POSTS: InstagramPost[] = [
  {
    id: 'ig-1',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800&auto=format&fit=crop',
    caption: 'Official kickoff of the 40UNDER40 screening process for the Class of 2027. Our independent vetting committee is currently assessing nominations from all 36 states. Transparency, integrity, and merit remain our standard. 🇳🇬👔\n\n#40Under40Nigeria #CelebratingTheExceptional #LeadershipAudit #LagosEvents',
    likes: 1240,
    commentsCount: 42,
    date: '2 Hours Ago',
    location: 'Lagos Oriental Hotel, Victoria Island',
    comments: [
      { username: 'tayo_falola', text: 'So proud of the meticulous vetting process. Real impact over hype!' },
      { username: 'bukola_ceo', text: 'Highly anticipated list. Best wishes to all nominated young leaders.' },
      { username: 'invest_africa', text: 'An excellent directory of credible talent.' }
    ]
  },
  {
    id: 'ig-2',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop',
    caption: 'Throwback to the high-level policy dialogue on financial technology and regional integrations at the TIME Conference. Connecting young creators with regulatory frameworks. 🏦💡\n\n#TIMEDebates #VentureFunding #AfricanFintech #EconomicRenaissance',
    likes: 958,
    commentsCount: 28,
    date: '1 Day Ago',
    location: 'Grand Ballroom, Lagos Oriental Hotel',
    comments: [
      { username: 'chidi_nwosu', text: 'This panel changed my perspective on cross-border operations entirely.' },
      { username: 'regulatory_mind', text: 'Policy makers must listen to these brilliant young builders.' }
    ]
  },
  {
    id: 'ig-3',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop',
    caption: 'The standard of luxury. Visual highlights from the red carpet of the 40UNDER40 NIGERIA Annual Induction Gala. Honouring those who build in quiet corridors. ✨🍷\n\n#GalaNight #InductionCeremony #BlackTieLuxury #QuietBuilders',
    likes: 1824,
    commentsCount: 61,
    date: '3 Days Ago',
    location: 'Lagos Oriental Hotel, VI',
    comments: [
      { username: 'kemi_adeyemi', text: 'The most prestigious gala in West Africa! Unmatched elegance.' },
      { username: 'noble_nigeria', text: 'A truly breathtaking standard of celebration.' },
      { username: 'femi_classic', text: 'The details on the red carpet was perfect.' }
    ]
  },
  {
    id: 'ig-4',
    image: 'https://images.unsplash.com/photo-1505232458729-464066d915a3?q=80&w=800&auto=format&fit=crop',
    caption: '“To whom much is given, much is expected.” Our inducted laureates represent an active corporate network sustaining thousands of jobs nationwide. Let us continue to build. 🏗️💼\n\n#NationalProgress #EconomicImpact #JobCreation #LaureateLegacy',
    likes: 1420,
    commentsCount: 37,
    date: '5 Days Ago',
    location: 'Lagos Oriental Hotel',
    comments: [
      { username: 'samson_adebayo', text: 'Sustaining jobs is the greatest contribution to national stability.' },
      { username: 'dr_chioma', text: 'Real leaders create multipliers of opportunities.' }
    ]
  },
  {
    id: 'ig-5',
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=800&auto=format&fit=crop',
    caption: 'Keynote presentation on ethical public leadership and accountability frameworks. Aligning young public officers with verified global corporate governance. 📜🏛️\n\n#GovernanceAudit #CivicDuty #EthicalLeadership #YouthInPolicy',
    likes: 834,
    commentsCount: 19,
    date: '1 Week Ago',
    location: 'VI, Lagos',
    comments: [
      { username: 'ola_governance', text: 'Ethical leadership is the core pillar of progress.' },
      { username: 'emeka_public', text: 'This presentation should be mandatory reading.' }
    ]
  },
  {
    id: 'ig-6',
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=800&auto=format&fit=crop',
    caption: 'Executive matchmaking roundtable at the annual conference. Facilitating venture partnerships and regional industrial mergers worth over N2.5B. 🤝📈\n\n#InvestmentMatchmaking #VentureCapital #AfricanUnicorns #IndustrialMergers',
    likes: 1642,
    commentsCount: 53,
    date: '1 Week Ago',
    location: 'Executive Lounge, Lagos Oriental',
    comments: [
      { username: 'capital_investor', text: 'We matched with two superb agrotech startups here. Absolute gold.' },
      { username: 'tony_el_builder', text: 'The quality of discussions was incredibly premium.' }
    ]
  }
];

export default function SocialFeed() {
  const [posts, setPosts] = useState<InstagramPost[]>(INITIAL_POSTS);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncSuccess, setSyncSuccess] = useState(false);
  const [activePost, setActivePost] = useState<InstagramPost | null>(null);
  const [newComment, setNewComment] = useState('');

  // Dynamically update engagement rates occasionally to simulate live Instagram activity
  useEffect(() => {
    const engagementInterval = setInterval(() => {
      setPosts((currentPosts) =>
        currentPosts.map((post) => {
          // 25% chance to increment likes/comments for that real-time social feel
          if (Math.random() > 0.75) {
            const extraLikes = Math.floor(Math.random() * 3) + 1;
            const extraComments = Math.random() > 0.85 ? 1 : 0;
            return {
              ...post,
              likes: post.likes + extraLikes,
              commentsCount: post.commentsCount + extraComments
            };
          }
          return post;
        })
      );
    }, 6000);

    return () => clearInterval(engagementInterval);
  }, []);

  const handleSyncFeed = () => {
    setIsSyncing(true);
    setSyncSuccess(false);

    // Simulate Instagram Graph API sync wait
    setTimeout(() => {
      setIsSyncing(false);
      setSyncSuccess(true);
      
      // Inject some fresh randomized likes
      setPosts((currentPosts) =>
        currentPosts.map((post) => ({
          ...post,
          likes: post.likes + Math.floor(Math.random() * 25) + 5
        }))
      );

      // Dismiss success indicator after 3 seconds
      setTimeout(() => {
        setSyncSuccess(false);
      }, 3000);
    }, 1800);
  };

  const submitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activePost || !newComment.trim()) return;

    const updatedComments = [
      ...activePost.comments,
      { username: 'you_visitor', text: newComment.trim() }
    ];

    const updatedPost = {
      ...activePost,
      commentsCount: activePost.commentsCount + 1,
      comments: updatedComments
    };

    setPosts((prevPosts) => prevPosts.map((p) => (p.id === activePost.id ? updatedPost : p)));
    setActivePost(updatedPost);
    setNewComment('');
  };

  return (
    <div className="space-y-8">
      {/* Live Sync Action Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-neutral-950 border border-neutral-900 rounded-sm gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-500 via-red-500 to-purple-600 flex items-center justify-center text-white font-bold select-none shrink-0 shadow-lg">
            <Instagram className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-white font-display font-extrabold text-xs tracking-tight">@40under40nigeria</span>
              <span className="w-3.5 h-3.5 rounded-full bg-[#E50914] flex items-center justify-center text-white text-[8px] font-bold" title="Verified Account">✓</span>
            </div>
            <p className="text-[10px] text-neutral-400 font-body">Official Live Instagram Engagement Stream</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {syncSuccess && (
            <span className="text-[10px] text-green-500 font-display font-bold uppercase flex items-center gap-1 animate-fade-in bg-green-500/10 border border-green-500/20 px-3 py-1.5 rounded-sm">
              <Check className="w-3.5 h-3.5" /> API Sync Perfect
            </span>
          )}

          <button
            onClick={handleSyncFeed}
            disabled={isSyncing}
            className="glass hover:bg-[#E50914]/10 hover:border-[#E50914]/30 text-white font-display font-bold text-[10px] uppercase px-4 py-2.5 rounded-sm transition-all flex items-center gap-2 select-none disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-[#E50914] ${isSyncing ? 'animate-spin' : ''}`} />
            {isSyncing ? 'Synchronizing API...' : 'Fetch Live Content'}
          </button>
        </div>
      </div>

      {/* Instagram Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
            onClick={() => setActivePost(post)}
            className="group relative aspect-square bg-[#0a0a0a] border border-neutral-900 rounded-sm overflow-hidden cursor-pointer hover:border-neutral-750 transition-all shadow-xl"
          >
            {/* Post Image */}
            <img
              src={post.image}
              alt="Instagram content"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover opacity-80 group-hover:opacity-40 transition-opacity duration-300"
            />

            {/* Simulated Video/Image Badge */}
            <div className="absolute top-3 right-3 p-1.5 bg-black/70 rounded-full border border-neutral-800 text-white z-10">
              <Instagram className="w-3.5 h-3.5 text-neutral-400" />
            </div>

            {/* Hover Overlay with Likes & Comments Count */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-6 text-white font-display font-extrabold z-20">
              <div className="flex items-center gap-1.5 hover:scale-105 transition-transform text-[#E50914]">
                <Heart className="w-5 h-5 fill-[#E50914]" />
                <span className="text-sm font-mono">{post.likes}</span>
              </div>
              <div className="flex items-center gap-1.5 hover:scale-105 transition-transform text-white">
                <MessageCircle className="w-5 h-5 fill-white text-black" />
                <span className="text-sm font-mono">{post.commentsCount}</span>
              </div>
            </div>

            {/* Subtle Bottom Card Caption Snippet */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/80 to-transparent p-3.5 flex flex-col justify-end">
              <p className="text-white text-[10px] font-display font-semibold uppercase tracking-tight">{post.location}</p>
              <p className="text-neutral-400 text-[9px] font-body line-clamp-1 truncate mt-0.5">{post.caption}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Instagram Modal Overlay */}
      {activePost && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-md animate-fade-in">
          <div className="bg-[#050505] border border-neutral-900 max-w-4xl w-full rounded-sm overflow-hidden grid grid-cols-1 md:grid-cols-2 shadow-2xl relative">
            
            {/* Modal Image Section */}
            <div className="aspect-square md:aspect-auto bg-black flex items-center justify-center relative border-r border-neutral-900/50">
              <img
                src={activePost.image}
                alt="Selected Instagram Post"
                referrerPolicy="no-referrer"
                className="max-h-[60vh] md:max-h-[80vh] w-full object-cover opacity-90"
              />
              <div className="absolute top-4 left-4 bg-black/85 border border-neutral-800 px-3 py-1 rounded-sm text-[8px] font-display font-bold text-[#E50914] uppercase tracking-wider">
                INSTAGRAM GRAPH
              </div>
            </div>

            {/* Modal Details / Engagement Section */}
            <div className="p-6 flex flex-col justify-between h-[450px] md:h-auto min-h-[450px]">
              
              {/* Header block */}
              <div className="space-y-4 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                <div className="flex justify-between items-start border-b border-neutral-950 pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-500 via-red-500 to-purple-600 flex items-center justify-center text-white shrink-0">
                      <Instagram className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="text-white font-display font-bold text-xs uppercase">@40under40nigeria</span>
                        <span className="text-[#E50914] text-[8px]" title="Verified Account">✓</span>
                      </div>
                      <p className="text-[9px] text-neutral-500 font-body leading-none">{activePost.location}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => setActivePost(null)}
                    className="text-neutral-500 hover:text-white transition-colors p-1"
                    aria-label="Close"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Caption content */}
                <div className="space-y-2">
                  <p className="text-white text-xs font-body leading-relaxed whitespace-pre-wrap font-light">
                    {activePost.caption}
                  </p>
                  <span className="text-[9px] text-neutral-500 font-mono uppercase block">
                    {activePost.date}
                  </span>
                </div>

                {/* Comments List block */}
                <div className="border-t border-neutral-950 pt-4 space-y-3">
                  <span className="text-[9px] text-[#E50914] tracking-widest font-display font-bold uppercase block">COMMENTS ({activePost.comments.length})</span>
                  
                  <div className="space-y-2.5 max-h-[140px] overflow-y-auto pr-1">
                    {activePost.comments.map((comm, idx) => (
                      <div key={idx} className="text-[11px] font-body leading-relaxed">
                        <strong className="text-neutral-300 mr-1.5 font-semibold">@{comm.username}</strong>
                        <span className="text-neutral-400 font-light">{comm.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons Block */}
              <div className="border-t border-neutral-950 pt-4 mt-auto space-y-3">
                <div className="flex items-center justify-between text-white">
                  <div className="flex gap-4">
                    <button className="flex items-center gap-1 text-[#E50914]" aria-label="Like Post">
                      <Heart className="w-5 h-5 fill-[#E50914]" />
                      <span className="text-xs font-mono font-bold text-neutral-200">{activePost.likes}</span>
                    </button>
                    <div className="flex items-center gap-1 text-neutral-400">
                      <MessageCircle className="w-5 h-5" />
                      <span className="text-xs font-mono font-bold">{activePost.commentsCount}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="text-neutral-500 hover:text-white" aria-label="Bookmark post">
                      <Bookmark className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Interactive Comment Input field */}
                <form onSubmit={submitComment} className="flex gap-2">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a verified comment..."
                    className="flex-1 text-xs bg-neutral-950 border border-neutral-900 rounded-sm px-3 py-2 text-white focus:outline-none focus:border-red-950 placeholder-neutral-600"
                  />
                  <button
                    type="submit"
                    className="bg-[#E50914] text-white font-display font-bold text-[10px] uppercase px-3 rounded-sm hover:bg-[#8F0008] transition-colors"
                  >
                    Post
                  </button>
                </form>

                <div className="pt-2 flex justify-between items-center border-t border-neutral-950 text-[10px]">
                  <span className="text-neutral-500 font-body">Instagram API Sandbox</span>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#E50914] hover:underline font-display font-bold flex items-center gap-1 uppercase"
                  >
                    View on Instagram <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
