


import { Major, Alumni, JobListing, NewsItem, Teacher, FAQItem, CalendarEvent } from './types';

export const SCHOOL_INFO = {
  name: "SMK Muhammadiyah Cangkringan",
  shortName: "SMK MUCA",
  motto: "SMK PK, Religius, Unggul, Kompeten",
  accreditation: "A",
  tagline: "SMK Pusat Keunggulan",
  addressMain: "Jetis, Argomulyo, Cangkringan, Sleman",
  addressUnit2: "Jaranan, Argomulyo, Cangkringan, Sleman",
  phone: "+62 851-6351-9670",
  email: "info@smkmuca.sch.id",
  mapUrlMain: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3954.123456789012!2d110.456789!3d-7.654321!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a678901234567%3A0x1234567890abcdef!2sSMK%20Muhammadiyah%20Cangkringan!5e0!3m2!1sen!2sid!4v1600000000000!5m2!1sen!2sid", // Mock embed
  mapUrlUnit2: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3954.987654321098!2d110.567890!3d-7.765432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a9876543210fe%3A0xfedcba0987654321!2sBengkel%20SMK%20MUCA!5e0!3m2!1sen!2sid!4v1600000000000!5m2!1sen!2sid", // Mock embed
  spmbUrl: "https://spmb.smkmuca.sch.id",
  whatsapp: "https://wa.me/6285163519670",
  socials: {
    instagram: "https://instagram.com/smkmuca",
    youtube: "https://youtube.com/smkmucatv",
    tiktok: "https://tiktok.com/@smkmuca",
    facebook: "https://facebook.com/smkmucajogja"
  },
  instagramToken: process.env.REACT_APP_INSTAGRAM_TOKEN || "",
  heroBackground: process.env.REACT_APP_HERO_BG || "https://picsum.photos/1920/1080?random=school_building"
};

export const SCHOOL_HISTORY = `SMK Muhammadiyah Cangkringan didirikan pada tahun 1989 sebagai wujud kepedulian Persyarikatan Muhammadiyah terhadap pendidikan vokasi di wilayah Cangkringan, Sleman. 

Berawal dari gedung sederhana dengan satu jurusan, kini SMK MUCA telah berkembang pesat menjadi SMK Pusat Keunggulan (SMK PK) dengan fasilitas modern dan 5 kompetensi keahlian. Perjalanan panjang ini diwarnai dengan berbagai prestasi dan dedikasi para pendidik untuk mencetak generasi yang kompeten dan berkarakter.`;

export const PRINCIPAL = {
  name: "Titik Sunarti, S.Pd., M.Pd.",
  role: "Kepala Sekolah",
  image: "https://picsum.photos/400/500?random=principal", 
  message: `Assalamu'alaikum Warahmatullahi Wabarakatuh.
  
  Selamat datang di website resmi SMK Muhammadiyah Cangkringan. Sebagai Sekolah Menengah Kejuruan Pusat Keunggulan (SMK PK), kami berkomitmen untuk mencetak generasi yang tidak hanya unggul dalam kompetensi teknis, tetapi juga memiliki karakter religius yang kuat.
  
  Di era digital yang berkembang pesat ini, SMK MUCA terus berinovasi dalam pembelajaran berbasis industri dan teknologi. Kami menyiapkan peserta didik untuk siap kerja, siap wirausaha, dan siap melanjutkan ke jenjang pendidikan yang lebih tinggi.
  
  Mari bergabung bersama kami untuk mewujudkan masa depan yang gemilang. SMK Bisa, SMK Hebat, SMK MUCA Luar Biasa!`
};

export const MAJORS: Major[] = [
  {
    id: '1',
    code: 'TKRO',
    name: 'Teknik Kendaraan Ringan Otomotif',
    description: 'Mencetak teknisi otomotif handal dengan standar industri modern.',
    image: 'https://picsum.photos/800/600?random=1',
    category: 'OTOMOTIF'
  },
  {
    id: '2',
    code: 'TBSM',
    name: 'Teknik Bisnis Sepeda Motor',
    description: 'Keahlian perawatan dan perbaikan sepeda motor serta manajemen bisnis bengkel.',
    image: 'https://picsum.photos/800/600?random=2',
    category: 'OTOMOTIF'
  },
  {
    id: '3',
    code: 'AKL',
    name: 'Akuntansi dan Keuangan Lembaga',
    description: 'Kompetensi pembukuan, keuangan, dan perpajakan berbasis digital.',
    image: 'https://picsum.photos/800/600?random=3',
    category: 'BISNIS'
  },
  {
    id: '4',
    code: 'BDP',
    name: 'Bisnis Daring dan Pemasaran',
    description: 'Penguasaan e-commerce, digital marketing, dan strategi ritel modern.',
    image: 'https://picsum.photos/800/600?random=4',
    category: 'BISNIS'
  },
  {
    id: '5',
    code: 'TB',
    name: 'Tata Busana',
    description: 'Desain fashion, pattern making, dan produksi garmen kreatif.',
    image: 'https://picsum.photos/800/600?random=5',
    category: 'TATA BUSANA'
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

export const MOCK_TEACHERS: Teacher[] = [
  { 
    id: '1', 
    name: 'Titik Sunarti, S.Pd., M.Pd.', 
    role: 'Kepala Sekolah', 
    category: 'Pimpinan', 
    image: 'https://picsum.photos/300/400?random=t1',
    bio: 'Berpengalaman lebih dari 20 tahun dalam dunia pendidikan vokasi. Berkomitmen untuk memajukan SMK Muhammadiyah Cangkringan menjadi pusat keunggulan.',
    education: ['S1 Pendidikan Matematika - UNY', 'S2 Manajemen Pendidikan - UAD'],
    responsibilities: ['Manajemen Strategis Sekolah', 'Pengembangan SDM', 'Supervisi Akademik'],
    teachingPhilosophy: 'Pendidikan bukan hanya mengisi wadah, tetapi menyalakan api. Saya percaya setiap siswa memiliki potensi unik yang perlu digali.',
    achievements: ['Kepala Sekolah Berprestasi Tingkat Kabupaten 2022', 'Inisiator SMK Pusat Keunggulan'],
    hobbies: ['Membaca', 'Berkebun', 'Traveling'],
    email: 'kepsek@smkmuca.sch.id',
    linkedin: 'https://linkedin.com'
  },
  { 
    id: '2', 
    name: 'Drs. H. Suharjo', 
    role: 'Waka Kurikulum', 
    category: 'Pimpinan', 
    subject: 'Matematika', 
    image: 'https://picsum.photos/300/400?random=t2',
    bio: 'Ahli dalam penyusunan kurikulum berbasis industri. Aktif dalam pengembangan modul ajar matematika terapan.',
    education: ['S1 Pendidikan Matematika - UGM'],
    responsibilities: ['Penyusunan Jadwal Pelajaran', 'Koordinasi Kegiatan Belajar Mengajar', 'Evaluasi Akademik'],
    teachingPhilosophy: 'Matematika adalah bahasa universal. Saya berusaha membuat matematika relevan dengan kehidupan sehari-hari siswa vokasi.',
    achievements: ['Penulis Buku Matematika SMK', 'Fasilitator Kurikulum Merdeka'],
    hobbies: ['Catur', 'Bersepeda', 'Mendaki'],
    email: 'suharjo@smkmuca.sch.id'
  },
  { 
    id: '3', 
    name: 'Budi Hartono, S.T.', 
    role: 'Kaprodi TKRO', 
    category: 'Guru', 
    subject: 'Produktif Otomotif', 
    image: 'https://picsum.photos/300/400?random=t3',
    bio: 'Praktisi otomotif yang pernah bekerja di industri perakitan mobil nasional selama 10 tahun sebelum mengabdikan diri sebagai pendidik.',
    education: ['S1 Teknik Mesin - UNY'],
    responsibilities: ['Kepala Bengkel TKRO', 'Pembimbing LKS Otomotif', 'Wali Kelas XI TKRO 1'],
    teachingPhilosophy: 'Learning by doing. Keterampilan teknis hanya bisa dikuasai melalui praktik langsung yang konsisten.',
    achievements: ['Pembimbing Juara 1 LKS Otomotif Provinsi 2023', 'Sertifikasi Asesor Kompetensi BNSP'],
    hobbies: ['Modifikasi Motor', 'Touring', 'Fotografi Otomotif'],
    email: 'budi.h@smkmuca.sch.id',
    linkedin: 'https://linkedin.com'
  },
  { 
    id: '4', 
    name: 'Siti Nurhaliza, S.Pd.', 
    role: 'Guru Bahasa Inggris', 
    category: 'Guru', 
    subject: 'Bahasa Inggris', 
    image: 'https://picsum.photos/300/400?random=t4',
    bio: 'Guru bahasa Inggris yang inovatif dengan metode pembelajaran yang menyenangkan dan interaktif bagi siswa.',
    education: ['S1 Sastra Inggris - UGM'],
    responsibilities: ['Koordinator English Club', 'Wali Kelas X AKL'],
    teachingPhilosophy: 'Bahasa adalah jembatan dunia. Saya ingin siswa percaya diri berkomunikasi di tingkat global.',
    achievements: ['Juara Lomba Inovasi Pembelajaran Digital 2022'],
    hobbies: ['Menulis Blog', 'Fotografi', 'Menonton Film'],
    email: 'siti.n@smkmuca.sch.id'
  },
  { 
    id: '5', 
    name: 'Ahmad Dahlan, S.Kom.', 
    role: 'Guru Informatika', 
    category: 'Guru', 
    subject: 'Informatika', 
    image: 'https://picsum.photos/300/400?random=t5',
    bio: 'Spesialis jaringan komputer dan pemrograman web. Pembimbing ekstrakurikuler coding dan robotik.',
    education: ['S1 Teknik Informatika - UII'],
    responsibilities: ['Admin Dapodik', 'Kepala Lab Komputer', 'Pembina Ekstrakurikuler Robotik'],
    teachingPhilosophy: 'Teknologi harus menjadi alat untuk memecahkan masalah nyata, bukan sekadar hiburan.',
    hobbies: ['Gaming', 'Coding', 'Hiking'],
    email: 'ahmad.d@smkmuca.sch.id',
    linkedin: 'https://linkedin.com'
  },
  { 
    id: '6', 
    name: 'Ratna Sari, S.E.', 
    role: 'Kepala Tata Usaha', 
    category: 'Karyawan', 
    image: 'https://picsum.photos/300/400?random=t6',
    bio: 'Mengelola administrasi sekolah dengan profesional dan transparan.',
    education: ['S1 Ekonomi Manajemen - UPN'],
    responsibilities: ['Administrasi Keuangan', 'Surat Menyurat', 'Arsip Data Siswa'],
    teachingPhilosophy: 'Ketertiban administrasi adalah kunci kelancaran layanan pendidikan.',
    achievements: ['Pengelolaan Arsip Digital Terbaik 2023'],
    hobbies: ['Memasak', 'Membaca Novel', 'Yoga'],
    email: 'tu@smkmuca.sch.id'
  },
  { 
    id: '7', 
    name: 'Joko Susilo', 
    role: 'Staff Kebersihan', 
    category: 'Karyawan', 
    image: 'https://picsum.photos/300/400?random=t7',
    bio: 'Berdedikasi menjaga kebersihan dan kenyamanan lingkungan sekolah agar kondusif untuk belajar.',
    education: ['SMA'],
    responsibilities: ['Kebersihan Lingkungan Sekolah', 'Perawatan Taman'],
    teachingPhilosophy: 'Lingkungan yang bersih menciptakan pikiran yang jernih bagi para siswa.',
    achievements: ['Karyawan Teladan Kebersihan 2022'],
    hobbies: ['Memancing', 'Berkebun', 'Burung Kicau']
  },
];

// Expanded Mock News for Pagination Demonstration
export const MOCK_NEWS: NewsItem[] = [
  {
    id: '1',
    title: 'Kunjungan Industri ke Jakarta',
    date: '2023-10-15',
    category: 'Kegiatan',
    image: 'https://picsum.photos/600/400?random=20',
    excerpt: 'Siswa kelas XI melaksanakan kunjungan industri untuk memperluas wawasan dunia kerja.',
    content: '<p>Siswa kelas XI dari berbagai jurusan melaksanakan kunjungan industri ke beberapa perusahaan besar di Jakarta. Kegiatan ini bertujuan untuk memberikan gambaran nyata tentang dunia kerja dan standar industri yang berlaku.</p><p>Para siswa mengunjungi pabrik perakitan otomotif, kantor pusat e-commerce, dan studio fashion ternama. Mereka mendapatkan kesempatan untuk berdialog langsung dengan para praktisi dan melihat proses produksi secara dekat.</p>'
  },
  {
    id: '2',
    title: 'Juara 1 Lomba Kompetensi Siswa Tingkat Provinsi',
    date: '2023-11-02',
    category: 'Prestasi',
    image: 'https://picsum.photos/600/400?random=21',
    excerpt: 'Prestasi membanggakan diraih oleh siswa TKRO dalam ajang LKS DIY.',
    content: '<p>Selamat kepada tim TKRO SMK Muhammadiyah Cangkringan yang berhasil meraih Juara 1 dalam Lomba Kompetensi Siswa (LKS) tingkat Provinsi DIY. Kemenangan ini merupakan hasil dari kerja keras siswa dan bimbingan intensif dari para guru.</p><p>Dengan kemenangan ini, tim akan mewakili provinsi di tingkat nasional. Mohon doa dan dukungannya agar dapat memberikan hasil yang terbaik.</p>'
  },
  {
    id: '3',
    title: 'PPDB Gelombang 1 Segera Dibuka',
    date: '2023-12-01',
    category: 'Pengumuman',
    image: 'https://picsum.photos/600/400?random=22',
    excerpt: 'Siapkan diri anda untuk bergabung dengan SMK Pusat Keunggulan.',
    content: '<p>Penerimaan Peserta Didik Baru (PPDB) Gelombang 1 untuk tahun ajaran mendatang akan segera dibuka. SMK Muhammadiyah Cangkringan sebagai SMK Pusat Keunggulan menawarkan berbagai keunggulan fasilitas dan kurikulum.</p><p>Calon siswa dapat mendaftar secara online melalui website resmi spmb.smkmuca.sch.id atau datang langsung ke sekretariat pendaftaran di gedung utama sekolah.</p>'
  },
  {
    id: '4',
    title: 'Pelatihan Kewirausahaan Siswa',
    date: '2023-11-15',
    category: 'Kegiatan',
    image: 'https://picsum.photos/600/400?random=23',
    excerpt: 'Siswa diajarkan cara memulai bisnis sejak dini melalui program Business Center.',
    content: '<p>Program Business Center sekolah kembali mengadakan pelatihan kewirausahaan bagi siswa kelas X dan XI. Materi yang disampaikan meliputi perencanaan bisnis, manajemen keuangan, hingga strategi pemasaran digital.</p><p>Diharapkan melalui kegiatan ini, akan lahir wirausahawan muda yang tangguh dan kreatif dari lingkungan sekolah.</p>'
  },
  {
    id: '5',
    title: 'Upacara Hari Pahlawan',
    date: '2023-11-10',
    category: 'Kegiatan',
    image: 'https://picsum.photos/600/400?random=24',
    excerpt: 'Memperingati jasa pahlawan dengan khidmat di lapangan utama.',
    content: '<p>Seluruh civitas akademika SMK Muhammadiyah Cangkringan melaksanakan upacara bendera dalam rangka memperingati Hari Pahlawan. Kepala sekolah bertindak sebagai pembina upacara dan menyampaikan amanat tentang pentingnya meneladani semangat juang para pahlawan dalam konteks pendidikan masa kini.</p>'
  },
  {
    id: '6',
    title: 'Job Fair SMK MUCA 2024',
    date: '2024-01-20',
    category: 'BKK',
    image: 'https://picsum.photos/600/400?random=25',
    excerpt: 'Dihadiri oleh 20 perusahaan besar nasional, membuka peluang kerja bagi alumni.',
    content: '<p>Bursa Kerja Khusus (BKK) SMK MUCA sukses menggelar Job Fair tahunan yang dihadiri oleh lebih dari 20 perusahaan mitra industri. Ribuan pencari kerja, baik alumni maupun masyarakat umum, memadati lokasi acara untuk melamar berbagai posisi yang tersedia.</p>'
  },
  {
    id: '7',
    title: 'Workshop Guru Produktif',
    date: '2024-01-25',
    category: 'Kegiatan',
    image: 'https://picsum.photos/600/400?random=26',
    excerpt: 'Peningkatan kompetensi guru melalui workshop teknologi terbaru.',
    content: '<p>Untuk menjaga kualitas pengajaran, para guru produktif mengikuti workshop intensif mengenai perkembangan teknologi terbaru di industri otomotif dan IT. Workshop ini menghadirkan narasumber ahli dari industri terkait.</p>'
  },
  {
    id: '8',
    title: 'Bantuan Sosial untuk Warga Sekitar',
    date: '2024-02-05',
    category: 'Kegiatan',
    image: 'https://picsum.photos/600/400?random=27',
    excerpt: 'IPM SMK MUCA menyalurkan bantuan sembako kepada warga kurang mampu.',
    content: '<p>Ikatan Pelajar Muhammadiyah (IPM) ranting SMK MUCA mengadakan bakti sosial dengan membagikan paket sembako kepada warga kurang mampu di lingkungan sekitar sekolah. Kegiatan ini merupakan bentuk kepedulian sosial dan pengamalan nilai-nilai kemanusiaan.</p>'
  },
  {
    id: '9',
    title: 'Pengajian Rutin Bulanan',
    date: '2024-02-10',
    category: 'Kegiatan',
    image: 'https://picsum.photos/600/400?random=28',
    excerpt: 'Mempererat silaturahmi guru dan karyawan melalui pengajian.',
    content: '<p>Pengajian rutin bulanan bagi guru dan karyawan kembali dilaksanakan di Masjid Sekolah. Tausiyah disampaikan oleh penceramah dari Pimpinan Daerah Muhammadiyah Sleman, menekankan pentingnya integritas dalam bekerja.</p>'
  },
  {
    id: '10',
    title: 'Ujian Kompetensi Keahlian (UKK)',
    date: '2024-02-20',
    category: 'Pengumuman',
    image: 'https://picsum.photos/600/400?random=29',
    excerpt: 'Jadwal pelaksanaan UKK bagi siswa kelas XII.',
    content: '<p>Diberitahukan kepada seluruh siswa kelas XII bahwa Ujian Kompetensi Keahlian (UKK) akan dilaksanakan mulai tanggal 1 Maret. Siswa diharapkan mempersiapkan diri sebaik mungkin, baik dari segi materi maupun fisik.</p>'
  },
  {
    id: '11',
    title: 'Penerimaan Raport Semester Genap',
    date: '2024-06-20',
    category: 'Pengumuman',
    image: 'https://picsum.photos/600/400?random=30',
    excerpt: 'Jadwal pembagian raport dan libur semester.',
    content: '<p>Pembagian hasil belajar siswa (raport) semester genap akan dilaksanakan pada tanggal 20 Juni. Orang tua wali murid diharap hadir untuk mengambil raport dan berkonsultasi dengan wali kelas.</p>'
  },
  {
    id: '12',
    title: 'Lomba Futsal Antar Kelas',
    date: '2024-06-22',
    category: 'Kegiatan',
    image: 'https://picsum.photos/600/400?random=31',
    excerpt: 'Classmeeting seru untuk mengisi waktu luang setelah ujian.',
    content: '<p>OSIS mengadakan lomba futsal antar kelas sebagai bagian dari kegiatan Classmeeting. Kegiatan ini bertujuan untuk mempererat kekompakan antar siswa dan menyalurkan bakat olahraga.</p>'
  },
  {
    id: '13',
    title: 'Workshop Digital Marketing',
    date: '2024-07-05',
    category: 'Kegiatan',
    image: 'https://picsum.photos/600/400?random=32',
    excerpt: 'Siswa BDP belajar langsung dari praktisi agensi digital.',
    content: '<p>Jurusan Bisnis Daring dan Pemasaran menghadirkan praktisi dari agensi digital ternama di Yogyakarta untuk memberikan workshop tentang SEO dan Social Media Marketing kepada siswa kelas XII.</p>'
  },
  {
    id: '14',
    title: 'Prestasi Tapak Suci',
    date: '2024-07-10',
    category: 'Prestasi',
    image: 'https://picsum.photos/600/400?random=33',
    excerpt: 'Tim Tapak Suci bawa pulang 3 medali emas.',
    content: '<p>Tim bela diri Tapak Suci SMK MUCA berhasil memborong 3 medali emas dalam kejuaraan daerah tingkat kabupaten. Selamat kepada para atlet yang telah mengharumkan nama sekolah.</p>'
  },
  {
    id: '15',
    title: 'Sosialisasi Bahaya Narkoba',
    date: '2024-07-15',
    category: 'Kegiatan',
    image: 'https://picsum.photos/600/400?random=34',
    excerpt: 'Kerjasama dengan BNN untuk sekolah bebas narkoba.',
    content: '<p>Dalam rangka Masa Pengenalan Lingkungan Sekolah (MPLS), SMK MUCA bekerjasama dengan BNN Kabupaten Sleman mengadakan sosialisasi bahaya penyalahgunaan narkoba bagi remaja.</p>'
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

export const MOCK_FAQS: FAQItem[] = [
  {
    id: '1',
    question: 'Bagaimana cara mendaftar di SMK Muhammadiyah Cangkringan?',
    answer: 'Pendaftaran dapat dilakukan secara online melalui website spmb.smkmuca.sch.id atau datang langsung ke sekretariat pendaftaran di gedung utama sekolah pada jam kerja (Senin-Jumat, 08.00-14.00 WIB).'
  },
  {
    id: '2',
    question: 'Apa saja jurusan yang tersedia?',
    answer: 'Saat ini kami memiliki 5 Kompetensi Keahlian: Teknik Kendaraan Ringan Otomotif (TKRO), Teknik Bisnis Sepeda Motor (TBSM), Akuntansi dan Keuangan Lembaga (AKL), Bisnis Daring dan Pemasaran (BDP), dan Tata Busana (TB).'
  },
  {
    id: '3',
    question: 'Apakah tersedia beasiswa?',
    answer: 'Ya, kami menyediakan berbagai jenis beasiswa, antara lain Beasiswa Prestasi Akademik/Non-Akademik, Beasiswa Kader Muhammadiyah, dan Beasiswa bagi siswa dari keluarga kurang mampu (KIP).'
  },
  {
    id: '4',
    question: 'Bagaimana prospek kerja lulusan SMK MUCA?',
    answer: 'Sebagai SMK Pusat Keunggulan, kami memiliki jaringan kerjasama luas dengan DUDI (Dunia Usaha Dunia Industri). Kami juga memiliki BKK (Bursa Kerja Khusus) yang aktif menyalurkan alumni ke perusahaan mitra seperti Toyota Nasmoco, AHM, dan ritel modern.'
  },
  {
    id: '5',
    question: 'Apakah ada fasilitas asrama/boarding?',
    answer: 'Untuk saat ini kami belum menyediakan asrama di dalam lingkungan sekolah, namun kami dapat merekomendasikan kos atau pondok pesantren mitra di sekitar lingkungan sekolah bagi siswa yang berasal dari luar daerah.'
  }
];

export const MOCK_EVENTS: CalendarEvent[] = [
  { id: '1', title: 'Awal Masuk Sekolah', date: '2024-07-15', type: 'Academic', description: 'Hari pertama masuk sekolah tahun ajaran baru.' },
  { id: '2', title: 'Masa Pengenalan Lingkungan Sekolah (MPLS)', date: '2024-07-15', type: 'Academic', description: 'Kegiatan pengenalan bagi siswa baru.' },
  { id: '3', title: 'HUT RI ke-79', date: '2024-08-17', type: 'Holiday', description: 'Upacara bendera memperingati kemerdekaan RI.' },
  { id: '4', title: 'Penilaian Tengah Semester (PTS)', date: '2024-09-23', type: 'Academic', description: 'Pelaksanaan ujian tengah semester ganjil.' },
  { id: '5', title: 'Job Fair Akbar', date: '2024-10-10', type: 'Event', description: 'Bursa kerja terbuka untuk umum.' },
  { id: '6', title: 'Penerimaan Raport Semester 1', date: '2024-12-20', type: 'Academic' },
  { id: '7', title: 'Libur Semester Ganjil', date: '2024-12-23', type: 'Holiday' },
];
