
import { 
  SiteSettings, User, Teacher, NewsItem, Alumni, JobListing, Major, Facility, GalleryItem, UserRole 
} from '../types';
import { 
  SCHOOL_INFO, MOCK_TEACHERS, PRINCIPAL, MOCK_NEWS, MOCK_ALUMNI, MOCK_JOBS, MAJORS 
} from '../constants';

// Keys for LocalStorage
const KEYS = {
  SETTINGS: 'db_settings',
  USERS: 'db_users',
  TEACHERS: 'db_teachers',
  NEWS: 'db_news',
  ALUMNI: 'db_alumni',
  JOBS: 'db_jobs',
  MAJORS: 'db_majors',
};

// Initial Data Seeding
const SEED_DATA = {
  settings: {
    schoolName: SCHOOL_INFO.name,
    shortName: SCHOOL_INFO.shortName,
    motto: SCHOOL_INFO.motto,
    tagline: SCHOOL_INFO.tagline,
    logo: '/vite.svg',
    addressMain: SCHOOL_INFO.addressMain,
    addressUnit2: SCHOOL_INFO.addressUnit2,
    phone: SCHOOL_INFO.phone,
    email: SCHOOL_INFO.email,
    heroBackground: SCHOOL_INFO.heroBackground,
    maps: {
      main: SCHOOL_INFO.mapUrlMain,
      unit2: SCHOOL_INFO.mapUrlUnit2,
    },
    socials: { ...SCHOOL_INFO.socials },
    principalWelcome: {
      name: PRINCIPAL.name,
      image: PRINCIPAL.image,
      message: PRINCIPAL.message
    },
    facilities: [
      { id: '1', title: "Bengkel Standar Industri", icon: 'Shield' },
      { id: '2', title: "Free Hotspot Area", icon: 'Wifi' },
      { id: '3', title: "Laboratorium Komputer", icon: 'Monitor' },
      { id: '4', title: "Unit Produksi & Jasa", icon: 'PenTool' }
    ],
    gallery: [
      { id: '1', image: 'https://picsum.photos/800/600?random=g1', caption: 'Gedung Utama' },
      { id: '2', image: 'https://picsum.photos/800/600?random=g2', caption: 'Kegiatan Praktik' }
    ]
  } as SiteSettings,
  users: [
    { id: '1', name: 'Super Administrator', username: 'admin', role: UserRole.SUPERUSER, lastLogin: '2024-03-10 08:00' }
  ] as User[],
  teachers: MOCK_TEACHERS,
  news: MOCK_NEWS,
  alumni: MOCK_ALUMNI,
  jobs: MOCK_JOBS,
  majors: MAJORS
};

// Generic Helper to Get Data
function getData<T>(key: string, seed: T): T {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : seed;
  } catch (e) {
    console.error(`Error loading ${key}`, e);
    return seed;
  }
}

// Generic Helper to Save Data
function saveData<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    // Dispatch event for real-time updates across components
    window.dispatchEvent(new Event('db_update')); 
  } catch (e) {
    console.error(`Error saving ${key}`, e);
  }
}

// --- PUBLIC API ---

export const db = {
  // SETTINGS
  getSettings: () => getData<SiteSettings>(KEYS.SETTINGS, SEED_DATA.settings),
  saveSettings: (data: SiteSettings) => saveData(KEYS.SETTINGS, data),

  // USERS
  getUsers: () => getData<User[]>(KEYS.USERS, SEED_DATA.users),
  saveUsers: (data: User[]) => saveData(KEYS.USERS, data),

  // TEACHERS
  getTeachers: () => getData<Teacher[]>(KEYS.TEACHERS, SEED_DATA.teachers),
  saveTeachers: (data: Teacher[]) => saveData(KEYS.TEACHERS, data),

  // NEWS
  getNews: () => getData<NewsItem[]>(KEYS.NEWS, SEED_DATA.news),
  saveNews: (data: NewsItem[]) => saveData(KEYS.NEWS, data),

  // ALUMNI
  getAlumni: () => getData<Alumni[]>(KEYS.ALUMNI, SEED_DATA.alumni),
  saveAlumni: (data: Alumni[]) => saveData(KEYS.ALUMNI, data),

  // JOBS (BKK)
  getJobs: () => getData<JobListing[]>(KEYS.JOBS, SEED_DATA.jobs),
  saveJobs: (data: JobListing[]) => saveData(KEYS.JOBS, data),

  // MAJORS
  getMajors: () => getData<Major[]>(KEYS.MAJORS, SEED_DATA.majors),
  saveMajors: (data: Major[]) => saveData(KEYS.MAJORS, data),
  
  // Helpers
  getSchoolInfo: () => getData<SiteSettings>(KEYS.SETTINGS, SEED_DATA.settings),

  // RESET DB (For debugging)
  reset: () => {
    localStorage.clear();
    window.location.reload();
  }
};
