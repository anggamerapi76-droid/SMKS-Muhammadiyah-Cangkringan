
export interface Major {
  id: string;
  code: string;
  name: string;
  description: string;
  image: string;
  category: 'OTOMOTIF' | 'BISNIS' | 'TATA BUSANA';
}

export interface Alumni {
  id: string;
  name: string;
  graduationYear: string;
  jobTitle: string;
  company: string;
  testimonial: string;
  image: string;
}

export interface JobListing {
  id: string;
  title: string;
  company: string;
  location: string;
  deadline: string;
  type: 'Full-time' | 'Internship' | 'Part-time';
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content: string; // Full HTML content
  category: string;
  image: string;
}

export interface Teacher {
  id: string;
  name: string;
  role: string; // e.g., Kepala Sekolah, Guru Produktif, Staff TU
  subject?: string;
  image: string;
  category: 'Pimpinan' | 'Guru' | 'Karyawan';
  bio?: string;
  education?: string[];
  responsibilities?: string[];
  teachingPhilosophy?: string;
  achievements?: string[];
  hobbies?: string[]; // Added hobbies field
  email?: string;
  linkedin?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  type: 'Academic' | 'Holiday' | 'Event';
  description?: string;
}

export enum UserRole {
  GUEST = 'guest',
  SUPERUSER = 'superuser',
  CONTENT_ADMIN = 'content_admin',
  BKK_ADMIN = 'bkk_admin',
}

export interface User {
  id: string;
  name: string;
  username: string;
  role: UserRole;
  lastLogin?: string;
}

export interface Facility {
  id: string;
  title: string;
  icon: 'Shield' | 'Wifi' | 'Monitor' | 'PenTool' | 'Book' | 'Coffee';
}

export interface GalleryItem {
  id: string;
  image: string;
  caption: string;
}

export interface SiteSettings {
  schoolName: string;
  shortName: string;
  motto: string;
  tagline: string;
  logo: string; // URL for school logo
  addressMain: string;
  addressUnit2: string;
  phone: string;
  email: string;
  heroBackground: string;
  maps: {
    main: string;
    unit2: string;
  };
  socials: {
    instagram: string;
    youtube: string;
    facebook: string;
    tiktok: string;
  };
  principalWelcome: {
    name: string;
    image: string;
    message: string;
  };
  facilities: Facility[];
  gallery: GalleryItem[];
}
