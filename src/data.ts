/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { EventModel, Awardee, Article, Partner, Testimonial } from './types';

// High-fidelity initial events
export const INITIAL_EVENTS: EventModel[] = [
  {
    id: 'time-conference',
    title: 'TIME Conference',
    subtitle: 'Teach. Inspire. Mentor. Empower.',
    tagline: 'Nigeria\'s Flagship Entrepreneurship & Leadership Summit',
    timing: 'Annual — Every April',
    date: 'April 24, 2027',
    venue: 'Grand Ballroom, Lagos Oriental Hotel',
    address: '3 Lekki Road, Victoria Island, Lagos, Nigeria',
    description: 'The TIME Conference is a flagship corporate gathering designed to bring together Nigeria\'s most ambitious entrepreneurs, emerging executives, venture investors, and policy shapers. Focused on the core pillars of Teaching innovative frameworks, Inspiring courageous action, Mentoring raw talent, and Empowering scalable enterprises, this summit hosts executive keynotes, tactical masterclasses, and high-level networking matches.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200&auto=format&fit=crop',
    speakers: [
      {
        id: 'spk-1',
        name: 'Amb. Dr. Omotayo Salako',
        title: 'Founder & Convener',
        company: '40UNDER40 Nigeria Ecosystem',
        bio: 'Dr. Omotayo Salako is an internationally recognized entrepreneurship development specialist, philanthropist, and leadership convener. He has pioneered premium business platforms across West Africa, focusing on executive networking and cross-border investment.',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
        sessionTopic: 'The Core Imperatives of Vetting and Leadership',
        socialLinks: { linkedin: 'https://linkedin.com/in/omotayo-salako' }
      },
      {
        id: 'spk-2',
        name: 'Dr. Chioma Nnaji',
        title: 'Managing Director & Co-Founder',
        company: 'Vanguard Ventures Africa',
        bio: 'Dr. Chioma Nnaji is a prominent venture capitalist specializing in fintech expansion and decentralized digital payment systems in emerging markets, managing over $150M in regional seed investments.',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop',
        sessionTopic: 'Decoding Venture Capital for Scale: African Opportunities',
        socialLinks: { linkedin: 'https://linkedin.com' }
      },
      {
        id: 'spk-3',
        name: 'Tunde Adebayo',
        title: 'Chief Technology Officer',
        company: 'Helix-Pay Technologies',
        bio: 'Tunde is an engineering veteran and blockchain innovator who designed high-throughput billing rails for over 10 million daily active African consumers.',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop',
        sessionTopic: 'AI-Native Business Infrastructures: Preparing for 2030',
        socialLinks: { linkedin: 'https://linkedin.com' }
      }
    ],
    ticketTiers: [
      {
        name: 'General Access',
        price: 0,
        currency: 'NGN',
        description: 'Access to main conference sessions, panel debates, and exhibition area.',
        benefits: ['Access to main auditorium panels', 'Sponsor exhibition pass', 'Conference digital delegate kit', 'Post-event recorded material'],
        capacity: 1000,
        sold: 412
      },
      {
        name: 'VIP Experience',
        price: 75000,
        currency: 'NGN',
        description: 'Elevated seating, curated lunch, and dedicated networking lounge entry.',
        benefits: ['Premium front-row auditorium seating', 'Catered executive lunch', 'Dedicated VIP lounge with speakers', 'Printed prospectus & media toolkit', 'Certificate of Leadership Impact'],
        capacity: 150,
        sold: 89
      },
      {
        name: 'Corporate Table (8 Seats)',
        price: 500000,
        currency: 'NGN',
        description: 'Elite corporate table with brand representation and VIP perks.',
        benefits: ['Premium branded table of 8', 'Logo featured in event brochures & screens', 'VIP Dinner Invitation', 'Direct networking matcher with awardees', 'Full media accreditation & professional photo session'],
        capacity: 20,
        sold: 11
      }
    ],
    programme: [
      { time: '08:00 AM — 09:00 AM', title: 'Delegate Registration & Breakfast Match', description: 'Accreditation at Grand Foyer & morning executive coffee pairing.' },
      { time: '09:00 AM — 09:30 AM', title: 'Convener Opening Address', speaker: 'Amb. Dr. Omotayo Salako', description: 'Theme: Bold Imperatives for African Economic Renaissance.' },
      { time: '09:30 AM — 10:45 AM', title: 'Keynote Panel: Scalability & Regulatory Navigation', speaker: 'Dr. Chioma Nnaji', description: 'Addressing regional border frictions and cross-currency digital trade routing.' },
      { time: '10:45 AM — 11:15 AM', title: 'Coffee Break & Network Matching', description: 'Facilitated networking with institutional investors.' },
      { time: '11:15 AM — 12:45 PM', title: 'Fireside Chat: AI and Infrastructure Engineering', speaker: 'Tunde Adebayo', description: 'Practical code architectures and agentic AI pipelines in modern African SaaS.' },
      { time: '01:00 PM — 02:30 PM', title: 'VIP Executive Luncheon & Closing Toast', description: 'Exclusive dining for VIP ticket holders and speakers.' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=600&auto=format&fit=crop'
    ],
    pastEditions: [
      { year: '2026', theme: 'Unlocking Capital: Local Solutions, Global Markets', date: 'April 25, 2026', venue: 'Lagos Oriental Hotel', attendeesCount: 850, awardeesCount: 0, description: 'Brought together leaders across fintech, agriculture, and smart city infrastructure to debate real-time domestic investment channels.' },
      { year: '2025', theme: 'The Disruptive Frontier: Building Resilience', date: 'April 19, 2025', venue: 'Lagos Oriental Hotel', attendeesCount: 720, description: 'An outstanding assembly addressing supply chain restructuring and domestic manufacturing.' }
    ],
    faqs: [
      { question: 'Who is eligible to attend the TIME Conference?', answer: 'The conference is open to active founders, business managers, industry professionals, policymakers, researchers, and young ambitious leaders who seek to scale their operations.' },
      { question: 'Are certificates provided upon completion?', answer: 'Yes, VIP and Corporate delegates receive an official printed Certificate of Leadership Impact signed by the Convener.' },
      { question: 'How is physical access verified at the entrance?', answer: 'Every confirmed registrant will receive a cryptographically secure VIP QR Pass via email and their user dashboard. Staff will scan this pass at the entrance.' }
    ]
  },
  {
    id: 'gala-night',
    title: '40Under40 Gala Night & Award',
    subtitle: 'Where Excellence Takes the Stage.',
    tagline: 'Nigeria\'s Most Prestigious Elite Recognition and Black-Tie Gala',
    timing: 'Annual — Every August',
    date: 'August 14, 2027',
    venue: 'The Grand Ballroom, Lagos Oriental Hotel',
    address: '3 Lekki Road, Victoria Island, Lagos, Nigeria',
    description: 'The annual 40UNDER40 NIGERIA Gala Night is an elite black-tie event celebrating forty outstanding Nigerians under the age of forty. Handpicked through a rigorous screening and research validation workflow led by our distinguished advisory council, these individuals represent the finest minds pioneering disruptive business models, creating immense economic value, and embodying true leadership across the nation.',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1200&auto=format&fit=crop',
    speakers: [
      {
        id: 'spk-4',
        name: 'Amb. Dr. Omotayo Salako',
        title: 'Founder & Convener',
        company: '40UNDER40 Nigeria',
        bio: 'Convener of the 40UNDER40 Gala and visionary of the leadership network.',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
        sessionTopic: 'Celebrating 40 Under 40: Excellence on Stage'
      }
    ],
    ticketTiers: [
      {
        name: 'Award Finalist Pass',
        price: 0,
        currency: 'NGN',
        description: 'Reserved exclusively for confirmed 40Under40 Nominees/Finalists of the current year.',
        benefits: ['Premium Finalist Reserved Table', 'Exclusive red carpet photoshoot & feature', 'Sponsor gift bag', 'Media spotlight placement'],
        capacity: 40,
        sold: 40
      },
      {
        name: 'VIP Guest Ticket',
        price: 150000,
        currency: 'NGN',
        description: 'Standard VIP access to the black-tie gala dinner, premium table seating, and cocktail networking reception.',
        benefits: ['High-level networking cocktail session', 'Grand Banquet dinner access', 'Professional media photography access', 'Ecosystem prospectus booklet'],
        capacity: 200,
        sold: 142
      },
      {
        name: 'VVIP Patrons Table',
        price: 1200000,
        currency: 'NGN',
        description: 'Elite corporate or patron table of 8 at the absolute center stage, complete with premier champagne pairing.',
        benefits: ['Front-stage VVIP Table (8 Seats)', 'Curated multi-course dining with vintage champagne', 'High-profile logo recognition in all live media coverage', 'A dedicated brand ambassador assigned to the table', 'Full-page brand feature inside the souvenir brochure'],
        capacity: 10,
        sold: 6
      }
    ],
    programme: [
      { time: '05:00 PM — 06:30 PM', title: 'Red Carpet & Champagne Cocktail Session', description: 'Elite photography, executive press interviews, and networking cocktail pouring.' },
      { time: '06:30 PM — 07:00 PM', title: 'Opening Remarks & Presidential Keynote', description: 'Strategic opening address on "Sustaining Private Enterprise in Challenging Markets".' },
      { time: '07:00 PM — 08:30 PM', title: 'Banquet & Musical Symphony', description: 'Curated 5-course Nigerian-French fusion dining accompanied by live classical instrumentation.' },
      { time: '08:30 PM — 10:00 PM', title: 'The 40UNDER40 NIGERIA Award Ceremony', description: 'Placing the spotlight on forty exceptional leaders across diverse economic categories.' },
      { time: '10:00 PM — 11:30 PM', title: 'Patron Toast & Official After-Mix', description: 'Executive cigar and network lounge match.' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1505232458729-464066d915a3?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=600&auto=format&fit=crop'
    ],
    pastEditions: [
      { year: '2026', theme: 'Economic Growth: Partnership, Investment and Entrepreneurship', date: 'August 15, 2026', venue: 'Lagos Oriental Hotel', attendeesCount: 450, awardeesCount: 40, description: 'Celebrated exceptional changemakers contributing directly to regional job creation, export optimization, and digital technology integration.' },
      { year: '2025', theme: 'Powering Progress: Innovation & Executive Integrity', date: 'August 16, 2025', venue: 'Lagos Oriental Hotel', attendeesCount: 400, awardeesCount: 40, description: 'Highlighted pioneering work in clean tech, real estate funding, and health-tech accessibility.' }
    ],
    faqs: [
      { question: 'What is the dress code for the Gala?', answer: 'The dress code is strictly Black-Tie or Premium Royal Traditional Attire. Adherence is mandatory for entry.' },
      { question: 'How is the selection process governed?', answer: 'Nominees are vetted by an independent Advisory Board using criteria like company revenue, audited jobs created, sector impact, scalability, and ethical records over a 3-month research period.' },
      { question: 'Can corporate brands sponsor the tables?', answer: 'Yes, VVIP Tables are highly recommended for corporate sponsors to gain premium visibility and seat senior executives alongside our awardees.' }
    ]
  },
  {
    id: 'persons-of-the-year',
    title: '100 Persons of the Year Award',
    subtitle: 'Honouring Influence. Celebrating Impact.',
    tagline: 'Annual Legacy Gathering Recognizing Outstanding National Influence',
    timing: 'Annual — Every December',
    date: 'December 18, 2027',
    venue: 'Grand Banquet Hall, Lagos Oriental Hotel',
    address: '3 Lekki Road, Victoria Island, Lagos, Nigeria',
    description: 'The 100 Persons of the Year Award is an expansive national legacy platform held every December. It honors one hundred outstanding individuals who have demonstrated exemplary leadership, professional excellence, and high-level social impact. Spanning sectors from creative arts to public service, this platform serves as an annual audit of the individuals driving Nigerian progress forward.',
    image: 'https://images.unsplash.com/photo-1531058020387-3be344559be6?q=80&w=1200&auto=format&fit=crop',
    speakers: [
      {
        id: 'spk-5',
        name: 'Amb. Dr. Omotayo Salako',
        title: 'Founder & Convener',
        company: '40UNDER40 Nigeria Council',
        bio: 'Founder and chair of the National Leadership Audit committee.',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
        sessionTopic: 'Summary of the National Progress Index'
      }
    ],
    ticketTiers: [
      {
        name: 'General Admission',
        price: 20000,
        currency: 'NGN',
        description: 'Standard seating at the general gallery section and digital program booklet access.',
        benefits: ['Main hall admission', 'Digital impact yearbook', 'General networking courtyard access'],
        capacity: 500,
        sold: 220
      },
      {
        name: 'Patron Gold Pass',
        price: 200000,
        currency: 'NGN',
        description: 'Exclusive seat at a front-tier VIP table, gourmet dinner, and printed legacy book.',
        benefits: ['Front-tier VIP table seating', 'Full multi-course legacy dinner', 'Premium leather-bound Year of Impact book', 'Invitation to Pre-Gala private cocktail with board'],
        capacity: 100,
        sold: 54
      }
    ],
    programme: [
      { time: '04:00 PM — 05:30 PM', title: 'Pre-Dinner Cocktail & National Integration Courtyard', description: 'A welcoming lounge featuring cultural representations and dynamic state delegations.' },
      { time: '05:30 PM — 06:15 PM', title: 'The Legacy Address', speaker: 'Amb. Dr. Omotayo Salako', description: 'Synthesizing the annual National Progress Index.' },
      { time: '06:15 PM — 09:30 PM', title: 'Presentation of Honors & Celebrations', description: 'Highlighting the stories of 100 outstanding Nigerians across multiple socio-economic categories.' },
      { time: '09:30 PM — 10:30 PM', title: 'Closing Symphony & Networking', description: 'Orchestral celebration and national growth resolutions.' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1531058020387-3be344559be6?q=80&w=600&auto=format&fit=crop'
    ],
    pastEditions: [
      { year: '2026', theme: 'Sustaining Democracy through Economic Empowerment', date: 'December 19, 2026', venue: 'Lagos Oriental Hotel', attendeesCount: 620, awardeesCount: 100, description: 'Honored civic pioneers, technology educators, creative builders, and industrial operators.' },
      { year: '2025', theme: 'Honoring Legacy, Creating Tomorrow', date: 'December 20, 2025', venue: 'Lagos Oriental Hotel', attendeesCount: 580, awardeesCount: 100, description: 'A gorgeous assembly with high focus on healthcare innovators and social justice reform advocates.' }
    ],
    faqs: [
      { question: 'What categories are recognized in the 100 Persons of the Year?', answer: 'Categories include Business & Corporate Operations, Tech & Smart Infrastructure, Media & Public Relations, Social Justice & Civic Policy, healthcare, and Creative Industries.' },
      { question: 'Is the nomination open to the general public?', answer: 'Yes, public nominations open every year in September. Nominees are subjected to strict public integrity audits and background checks.' }
    ]
  }
];

// High-fidelity initial awardees (Hall of Fame)
export const INITIAL_AWARDEES: Awardee[] = [
  {
    id: 'aw-1',
    name: 'Ibrahim Danjuma',
    company: 'Agro-Pulse Logistics',
    position: 'Chief Executive Officer',
    industry: 'Agriculture & Supply Chain',
    year: '2026',
    category: 'Business & Entrepreneurship',
    bio: 'Ibrahim Danjuma is a dynamic agribusiness operator who engineered a smart climate-controlled cold chain logistics framework in northern Nigeria. His infrastructure cuts post-harvest transit losses for tomato farmers by up to 60%, connecting them directly to Lagos wholesale markets.',
    photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop',
    impactStory: 'By leveraging local manufacturing for heavy cold-truck cooling arrays and creating a mobile routing app, Ibrahim enabled over 15,000 smallholder northern farmers to double their weekly incomes while stabilizing urban food availability in Lagos and Port Harcourt.',
    linkedin: 'https://linkedin.com/in/ibrahim-danjuma',
    state: 'Kano'
  },
  {
    id: 'aw-2',
    name: 'Oluwatosin Awosika',
    company: 'RemitFlow Inc.',
    position: 'Co-Founder & Product lead',
    industry: 'Fintech & Digital Trade',
    year: '2026',
    category: 'Technology & Innovation',
    bio: 'Oluwatosin Awosika is an expert systems architect who led the development of low-latency API infrastructure allowing regional African trade merchants to settle invoices instantly across different local mobile money and banking networks.',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
    impactStory: 'Under her leadership, RemitFlow completed over $40M in transaction volume within 12 months, slashing settlement costs by 4.5% and enabling small enterprises to purchase raw materials internationally without banking delays.',
    linkedin: 'https://linkedin.com/in/oluwatosin-awosika',
    state: 'Lagos'
  },
  {
    id: 'aw-3',
    name: 'Chinedu Okoro',
    company: 'Apex Health Systems',
    position: 'Clinical Director & Founder',
    industry: 'Healthcare & Diagnostics',
    year: '2026',
    category: 'Professional Services & Health',
    bio: 'Dr. Chinedu Okoro is an innovative surgeon who returned to Nigeria to establish Apex Health Systems, a network of affordable diagnostic clinics leveraging proprietary tele-sonography diagnostics to screen expectant mothers in rural communities.',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop',
    impactStory: 'Apex Health has safely processed over 45,000 screenings, detecting pregnancy anomalies early in thousands of underserved women, reducing local maternal mortality rates in participating rural districts by a record 34%.',
    linkedin: 'https://linkedin.com',
    state: 'Enugu'
  },
  {
    id: 'aw-4',
    name: 'Funmilayo Bello',
    company: 'Ecore-Structures Ltd',
    position: 'Lead Architect & Materials Engineer',
    industry: 'Real Estate & Infrastructure',
    year: '2025',
    category: 'Manufacturing & Engineering',
    bio: 'Funmilayo Bello is a pioneering civil engineer who manufactures structural bricks utilizing high-density recycled plastics and local clay, providing a highly durable, low-cost building block for Nigeria\'s housing challenges.',
    photoUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop',
    impactStory: 'Her patented building blocks have been used to construct 5 school centers and 120 affordable housing units in Lagos suburbs, cutting material production costs by 40% and diverting over 120 tons of plastic from municipal waterways.',
    linkedin: 'https://linkedin.com',
    state: 'Ogun'
  },
  {
    id: 'aw-5',
    name: 'Amina Yusuf',
    company: 'The Civic-Grid Project',
    position: 'Executive Director',
    industry: 'Social Impact & Education',
    year: '2026',
    category: 'Social Impact & Public Service',
    bio: 'Amina Yusuf is a public policy strategist and community builder who established the Civic-Grid Project, an advocacy platform training public secondary school teachers in digital literacy and policy frameworks across six Nigerian states.',
    photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop',
    impactStory: 'Civic-Grid has successfully upskilled over 1,800 public educators, equipping them to integrate basic coding and civic duties into regional curricula, impacting more than 80,000 young students.',
    linkedin: 'https://linkedin.com',
    state: 'Kaduna'
  },
  {
    id: 'aw-6',
    name: 'Emeka Obi',
    company: 'Luminate Entertainment',
    position: 'Co-Founder & Creative Director',
    industry: 'Creative Industries & Media',
    year: '2025',
    category: 'Media & Creative Industries',
    bio: 'Emeka Obi is an award-winning cinematic director and content economist who pioneered local high-fidelity digital sound stages, making world-class cinematography equipment and editing suites accessible to emerging Nigerian filmmakers.',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
    impactStory: 'His film incubator has funded and co-produced 8 independent films which successfully streamed on premium global networks, generating over 400 direct creative jobs in the Nollywood ecosystem.',
    linkedin: 'https://linkedin.com',
    state: 'Anambra'
  }
];

// High-fidelity initial news & media
export const INITIAL_ARTICLES: Article[] = [
  {
    id: 'art-1',
    title: '40UNDER40 NIGERIA Announces Official Call for 2027 Nominations',
    subtitle: 'Celebrating the Next Generation of Industrialists, Tech Innovators, and Civic Leaders',
    author: 'Ecosystem Communications Team',
    date: 'September 1, 2026',
    category: 'Press Release',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=600&auto=format&fit=crop',
    content: 'LAGOS, NIGERIA — The Executive Advisory Council of the 40UNDER40 NIGERIA ecosystem under the leadership of the Convener, Amb. Dr. Omotayo Salako, has officially opened the public nomination channel for the 2027 edition. This prestigious initiative is designed to identify, vet, and place a national spotlight on forty exceptional young Nigerians under forty years old who are pioneering high-growth business enterprises, inventing sustainable industrial frameworks, or driving critical social policy reforms.\n\n"We are looking for builders, not talkers," Dr. Omotayo Salako stated at the press conference. "Our country is being moved forward by energetic, highly focused young professionals who do not make excuses. They are creating jobs, scaling capital, and modernizing communities. Through our rigorous multi-tiered screening system, we will ensure that only the most transparent, ethical, and high-impact leaders make the final list of the 40."\n\nNomination is open to all Nigerian citizens or individuals operating high-growth business frameworks within the country. Nominations can be submitted via self-entry or third-party endorsements on our secure digital portal before the deadline.',
    readingTime: '4 min read',
    isPressRelease: true,
    downloadableDocUrl: '#'
  },
  {
    id: 'art-2',
    title: 'Inside the 2026 Gala: How Amb. Dr. Omotayo Salako is Standardizing Leadership Recognition',
    subtitle: 'Highlights from the Historic Gathering of Entrepreneurs and Patrons at Lagos Oriental Hotel',
    author: 'Adebayo Falola, Business Editor',
    date: 'August 18, 2026',
    category: 'Editorial Feature',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=600&auto=format&fit=crop',
    content: 'It was a night where luxury merged with pure entrepreneurial energy. On August 15, 2026, the Grand Ballroom of the Lagos Oriental Hotel played host to the annual 40UNDER40 NIGERIA Gala Night. The event, which had the theme "Economic Growth: Partnership, Investment and Entrepreneurship", recognized exceptional minds across agriculture, healthcare technology, deep logistics, and fintech.\n\nFrom a sleek, high-contrast black-carpet reception to custom orchestral scores composed by young local prodigies, the atmosphere represented executive excellence. But the real luxury lay in the conversations. Sitting at tables together were corporate venture leaders, seasoned policymakers, and emerging 20-something founders.\n\nIn his opening keynote, Dr. Omotayo Salako emphasized that 40Under40 is more than an award night—it is an active network. "When exceptional people are separated, they are fragile. But when we connect them, we form an unbreakable chain of progress," he noted. The highlights included the presentation of official corporate plaques, live panel matches, and the launch of the 2026 Hall of Fame digital yearbook.',
    readingTime: '6 min read',
    isPressRelease: false
  },
  {
    id: 'art-3',
    title: 'Fintech, Cold-chains, and Sustainable Architecture: An Audit of the 2026 Winners',
    subtitle: 'Exploring the Real-world Impact Generated by Current Hall of Fame Laureates',
    author: 'Kemi Sowemimo, Business Research',
    date: 'August 24, 2026',
    category: 'Special Report',
    image: 'https://images.unsplash.com/photo-1531058020387-3be344559be6?q=80&w=600&auto=format&fit=crop',
    content: 'Our research department conducted a deep-dive audit on the business assets managed by the newly inducted 2026 40UNDER40 NIGERIA Awardees. The results reveal massive momentum. Across agriculture, laureates like Ibrahim Danjuma are leveraging custom engineering to solve transit wastage. Oluwatosin Awosika has enabled international trade velocity via real-time invoice matching, and Funmilayo Bello has pioneered sustainable brick-clay molding.\n\nTogether, the companies owned or led by the 40 laureates have generated an estimated 3,200 direct jobs and over 18,000 indirect economic opportunities in the past 18 months alone. Furthermore, more than 65% of these companies have actively expanded their operations outside Nigeria into other West African regions. This is concrete proof that Nigerian youth are leading the charge for the African Continental Free Trade Area (AfCFTA).',
    readingTime: '5 min read',
    isPressRelease: false
  }
];

// Initial partners
export const INITIAL_PARTNERS: Partner[] = [
  { id: 'pt-1', name: 'Lagos State Government', logoUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=150&auto=format&fit=crop', category: 'strategic' },
  { id: 'pt-2', name: 'Bank of Industry (BOI)', logoUrl: '', category: 'strategic' },
  { id: 'pt-3', name: 'Vanguard Ventures Africa', logoUrl: '', category: 'corporate' },
  { id: 'pt-4', name: 'Helix Technologies', logoUrl: '', category: 'corporate' },
  { id: 'pt-5', name: 'BusinessDay Nigeria', logoUrl: '', category: 'media' },
  { id: 'pt-6', name: 'NTA Network', logoUrl: '', category: 'media' },
  { id: 'pt-7', name: 'Lagos Oriental Hotel', logoUrl: '', category: 'sponsor' }
];

// Initial testimonials
export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: 'Ibrahim Danjuma',
    title: 'Founder & CEO',
    company: 'Agro-Pulse Logistics',
    quote: 'Being inducted into the 40UNDER40 NIGERIA Hall of Fame was a major turning point. The visibility immediately attracted strategic corporate partners and institutional funders who helped us scale our cold-chain storage assets.',
    photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 't-2',
    name: 'Oluwatosin Awosika',
    title: 'Co-Founder',
    company: 'RemitFlow Inc.',
    quote: 'The ecosystem is real. We did not just receive a plaque; we sat at a table with decision-makers who actually shaped policy for cross-border banking rails. Highly premium.',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 't-3',
    name: 'Dr. Chioma Nnaji',
    title: 'Partner',
    company: 'Vanguard Ventures Africa',
    quote: 'As an investor and board advisor, I have found 40UNDER40 NIGERIA to be the most rigorous, transparent, and prestigious pipeline of authentic, verified young executive talent on the continent.',
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop'
  }
];
