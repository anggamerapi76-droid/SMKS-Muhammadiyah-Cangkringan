export interface Major {
  id: string;
  code: string;
  name: string;
  description: string;
  image: string;
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
  category: string;
  image: string;
}

export enum UserRole {
  GUEST = 'guest',
  SUPERUSER = 'superuser',
  CONTENT_ADMIN = 'content_admin',
  BKK_ADMIN = 'bkk_admin',
}