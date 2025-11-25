import { Major, Alumni, JobListing, NewsItem } from './types';

export const SCHOOL_INFO = {
  name: "SMK Muhammadiyah Cangkringan",
  shortName: "SMK MUCA",
  motto: "SMK PK, Religius, Unggul, Kompeten",
  accreditation: "A",
  tagline: "SMK Pusat Keunggulan",
  addressMain: "Jetis, Argomulyo, Cangkringan, Sleman",
  addressUnit2: "Jaranan, Argomulyo, Cangkringan, Sleman",
  mapUrlMain: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3954.123456789012!2d110.456789!3d-7.654321!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a678901234567%3A0x1234567890abcdef!2sSMK%20Muhammadiyah%20Cangkringan!5e0!3m2!1sen!2sid!4v1600000000000!5m2!1sen!2sid", // Mock embed
  mapUrlUnit2: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3954.987654321098!2d110.567890!3d-7.765432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a9876543210fe%3A0xfedcba0987654321!2sBengkel%20SMK%20MUCA!5e0!3m2!1sen!2sid!4v1600000000000!5m2!1sen!2sid", // Mock embed
  spmbUrl: "https://spmb.smkmuca.sch.id",
  whatsapp: "https://wa.me/6285163519670",
  socials: {
    instagram: "https://instagram.com/smkmuca",
    youtube: "https://youtube.com/smkmucatv",
    tiktok: "https://tiktok.com/@smkmuca",
    facebook: "https://facebook.com/smkmucajogja"
  }
};

export const MAJORS: Major[] = [
  {
    id: '1',
    code: 'TKRO',
    name: 'Teknik Kendaraan Ringan Otomotif',
    description: 'Mencetak teknisi otomotif handal dengan standar industri modern.',
    image: 'https://picsum.photos/800/600?random=1'
  },
  {
    id: '2',
    code: 'TBSM',
    name: 'Teknik Bisnis Sepeda Motor',
    description: 'Keahlian perawatan dan perbaikan sepeda motor serta manajemen bisnis bengkel.',
    image: 'https://picsum.photos/800/600?random=2'
  },
  {
    id: '3',
    code: 'AKL',
    name: 'Akuntansi dan Keuangan Lembaga',
    description: 'Kompetensi pembukuan, keuangan, dan perpajakan berbasis digital.',
    image: 'https://picsum.photos/800/600?random=3'
  },
  {
    id: '4',
    code: 'BDP',
    name: 'Bisnis Daring dan Pemasaran',
    description: 'Penguasaan e-commerce, digital marketing, dan strategi ritel modern.',
    image: 'https://picsum.photos/800/600?random=4'
  },
  {
    id: '5',
    code: 'TB',
    name: 'Tata Busana',
    description: 'Desain fashion, pattern making, dan produksi garmen kreatif.',
    image: 'https://picsum.photos/800/600?random=5'
  }
];

export const MOCK_ALUMNI: Alumni[] = [
  {
    id: '1',
    name: 'Ahmad Fauzi',
    graduationYear: '2020',
    jobTitle: 'Senior Mechanic',
    company: 'Toyota Nasmoco',
    testimonial: 'SMK MUCA memberikan dasar teknis yang sangat kuat dan disiplin kerja yang tinggi.',
    image: 'https://picsum.photos/200/200?random=10'
  },
  {
    id: '2',
    name: 'Siti Aminah',
    graduationYear: '2021',
    jobTitle: 'Digital Marketer',
    company: 'Shopee Indonesia',
    testimonial: 'Jurusan BDP di sini sangat up-to-date dengan tren digital marketing masa kini.',
    image: 'https://picsum.photos/200/200?random=11'
  },
  {
    id: '3',
    name: 'Budi Santoso',
    graduationYear: '2019',
    jobTitle: 'Entrepreneur',
    company: 'Budi Fashion House',
    testimonial: 'Berkat bimbingan guru TB, saya berani membuka usaha fashion sendiri.',
    image: 'https://picsum.photos/200/200?random=12'
  }
];

export const MOCK_NEWS: NewsItem[] = [
  {
    id: '1',
    title: 'Kunjungan Industri ke Jakarta',
    date: '2023-10-15',
    excerpt: 'Siswa kelas XI melaksanakan kunjungan industri untuk memperluas wawasan dunia kerja.',
    category: 'Kegiatan',
    image: 'https://picsum.photos/600/400?random=20'
  },
  {
    id: '2',
    title: 'Juara 1 Lomba Kompetensi Siswa Tingkat Provinsi',
    date: '2023-11-02',
    excerpt: 'Prestasi membanggakan diraih oleh siswa TKRO dalam ajang LKS DIY.',
    category: 'Prestasi',
    image: 'https://picsum.photos/600/400?random=21'
  },
  {
    id: '3',
    title: 'PPDB Gelombang 1 Segera Dibuka',
    date: '2023-12-01',
    excerpt: 'Siapkan diri anda untuk bergabung dengan SMK Pusat Keunggulan.',
    category: 'Pengumuman',
    image: 'https://picsum.photos/600/400?random=22'
  }
];

export const MOCK_JOBS: JobListing[] = [
  {
    id: '1',
    title: 'Teknisi Junior',
    company: 'PT Astra Honda Motor',
    location: 'Cikarang',
    deadline: '2024-02-28',
    type: 'Full-time'
  },
  {
    id: '2',
    title: 'Staff Administrasi',
    company: 'Bank BRI',
    location: 'Yogyakarta',
    deadline: '2024-03-15',
    type: 'Internship'
  }
];