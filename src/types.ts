/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Speaker {
  id: string;
  name: string;
  title: string;
  company: string;
  bio: string;
  image: string;
  sessionTopic: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
}

export interface TicketTier {
  name: string;
  price: number; // 0 for free
  currency: string;
  description: string;
  benefits: string[];
  capacity: number;
  sold: number;
}

export interface ProgrammeItem {
  time: string;
  title: string;
  speaker?: string;
  description?: string;
}

export interface EventEdition {
  year: string;
  theme: string;
  date: string;
  venue: string;
  attendeesCount?: number;
  awardeesCount?: number;
  description: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface EventModel {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  timing: string;
  date: string;
  venue: string;
  address: string;
  description: string;
  image: string;
  speakers: Speaker[];
  ticketTiers: TicketTier[];
  programme: ProgrammeItem[];
  gallery: string[];
  pastEditions: EventEdition[];
  faqs: FAQItem[];
}

export interface Registration {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  position: string;
  industry: string;
  state: string;
  linkedin: string;
  ticketType: string;
  eventId: string;
  eventTitle: string;
  qrPassCode: string;
  registrationDate: string;
  checkedIn: boolean;
  checkedInAt?: string;
  paymentStatus: 'paid' | 'free' | 'pending';
  referralCode?: string;
  dietaryPreference?: string;
  specialRequirements?: string;
}

export interface Nomination {
  id: string;
  nomineeName: string;
  age: number;
  nomineeEmail: string;
  nomineePhone: string;
  company: string;
  position: string;
  industry: string;
  achievements: string;
  leadershipImpact: string;
  evidenceLink?: string;
  photoUrl?: string;
  refereeName: string;
  refereeEmail: string;
  refereeRelation: string;
  nominationDate: string;
  status: 'pending' | 'screened' | 'finalist' | 'approved';
}

export interface Awardee {
  id: string;
  name: string;
  company: string;
  position: string;
  industry: string;
  year: string;
  category: string;
  bio: string;
  photoUrl: string;
  impactStory: string;
  linkedin?: string;
  website?: string;
  state?: string;
}

export interface Article {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  date: string;
  category: string;
  image: string;
  content: string;
  readingTime: string;
  isPressRelease: boolean;
  downloadableDocUrl?: string;
}

export interface VolunteerApplication {
  id: string;
  name: string;
  email: string;
  phone: string;
  category: 'Ushering & Protocol' | 'Media & Publicity' | 'Registration & Accreditation' | 'Operations & Logistics' | 'Stage & Awards';
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  applicationDate: string;
}

export interface MediaApplication {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  mediaType: string;
  website: string;
  assignment: string;
  status: 'pending' | 'approved' | 'rejected';
  applicationDate: string;
}

export interface Partner {
  id: string;
  name: string;
  logoUrl: string;
  category: 'strategic' | 'corporate' | 'media' | 'sponsor';
}

export interface Testimonial {
  id: string;
  name: string;
  title: string;
  company: string;
  quote: string;
  photoUrl: string;
}
