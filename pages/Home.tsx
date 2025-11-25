
import React, { useState } from 'react';
import Hero from '../components/Hero';
import MajorCard from '../components/MajorCard';
import InstagramSection from '../components/InstagramSection';
import SEO from '../components/SEO';
import { MAJORS, MOCK_NEWS, PRINCIPAL } from '../constants';
import { Calendar, ArrowRight, Award, CheckCircle2, Target, Zap, Shield, Wifi, PenTool, Monitor, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const [selectedMajorCategory, setSelectedMajorCategory] = useState<'SEMUA' | 'OTOMOTIF' | 'BISNIS' | 'TATA BUSANA'>('SEMUA');

  const filteredMajors = selectedMajorCategory === 'SEMUA' 
    ? MAJORS 
    : MAJORS.filter(major => major.category === selectedMajorCategory);

  return (
    <div className="bg-gray-50 dark:bg-slate-900">
      <SEO 
        title="Beranda" 
        description="SMK Muhammadiyah Cangkringan (SMK MUCA) - SMK Pusat Keunggulan. Mencetak generasi religius, unggul, dan kompeten." 
      />
      
      <Hero />

      {/* SECTION: SAMBUTAN KEPALA SEKOLAH */}
      <section className="py-20 bg-white dark:bg-slate-800 relative overflow-hidden transition-colors">
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="bg-slate-900 dark:bg-slate-950 rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden relative">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-muca-yellow/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-muca-blue/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>

            <div className="flex flex-col lg:flex-row gap-12 items-center">
              {/* Image Column */}
              <div className="lg:w-1/3 flex-shrink-0 relative">
                 <div className="absolute inset-0 bg-muca-yellow transform rotate-3 rounded-2xl z-0"></div>
                 <img 
                    src={PRINCIPAL.image} 
                    alt={PRINCIPAL.name}
                    loading="lazy"
                    className="relative z-10 w-full h-auto rounded-2xl shadow-lg border-2 border-white dark:border-gray-800 object-cover aspect-[3/4]"
                 />
                 <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white dark:bg-slate-800 px-6 py-2 rounded-full shadow-xl z-20 whitespace-nowrap border border-gray-100 dark:border-gray-700">
                    <p className="font-bold text-slate-900 dark:text-white text-sm">Kepala Sekolah</p>
                 </div>
              </div>

              {/* Text Column */}
              <div className="lg:w-2/3 text-white">
                <div className="flex items-center gap-3 mb-6">
                   <span className="h-1 w-12 bg-muca-yellow rounded-full"></span>
                   <span className="text-muca-yellow font-bold tracking-widest uppercase text-sm">Headline News</span>
                </div>
                
                <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6 leading-tight">
                  Sambutan Kepala Sekolah
                </h2>
                
                <div className="relative">
                  <Quote className="absolute -top-4 -left-4 text-white/10" size={64} />
                  <div className="relative z-10 space-y-4 text-gray-300 text-lg leading-relaxed whitespace-pre-line">
                     {PRINCIPAL.message}
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                   <div>
                      <h4 className="text-xl font-bold text-white">{PRINCIPAL.name}</h4>
                      <p className="text-muca-yellow text-sm">Kepala SMK Muhammadiyah Cangkringan</p>
                   </div>
                   <Link to="/guru-karyawan" className="text-white hover:text-muca-yellow font-medium flex items-center gap-2 transition-colors">
                      Lihat Profil Staff <ArrowRight size={18} />
                   </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: SMK PK Explanation */}
      <section className="py-24 bg-white dark:bg-slate-800 transition-colors">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 relative">
               <div className="absolute -top-4 -left-4 w-24 h-24 bg-muca-yellow/20 rounded-full blur-xl"></div>
               <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-muca-blue/20 rounded-full blur-xl"></div>
               <img 
                src="https://picsum.photos/800/600?random=pk" 
                alt="SMK Pusat Keunggulan" 
                loading="lazy"
                className="relative rounded-2xl shadow-2xl z-10 border-4 border-white dark:border-gray-700"
               />
               <div className="absolute bottom-8 -right-8 bg-white dark:bg-slate-700 p-6 rounded-xl shadow-xl z-20 hidden md:block border-l-4 border-muca-yellow">
                  <p className="text-4xl font-bold text-slate-900 dark:text-white">A+</p>
                  <p className="text-sm text-gray-500 dark:text-gray-300 uppercase tracking-wide">Terakreditasi Unggul</p>
               </div>
            </div>
            
            <div className="lg:w-1/2">
              <div className="flex items-center gap-2 mb-4">
                <Award className="text-muca-yellow" size={24} />
                <span className="text-muca-blue dark:text-blue-400 font-bold tracking-widest uppercase text-sm">Center of Excellence</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 dark:text-white mb-6 leading-tight">
                Mengapa Memilih <br/>
                <span className="text-muca-blue dark:text-blue-400">SMK Pusat Keunggulan?</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg mb-8 leading-relaxed">
                Sebagai SMK Pusat Keunggulan (SMK PK), SMK Muhammadiyah Cangkringan dipercaya oleh Kemendikbudristek untuk menjadi sekolah rujukan dan pusat peningkatan kualitas dan kinerja. Kami menerapkan kurikulum yang diselaraskan dengan dunia kerja.
              </p>
              
              <ul className="space-y-4 mb-8">
                {[
                  "Kurikulum Berbasis Industri (Link & Match)",
                  "Guru Tamu dari Praktisi Profesional",
                  "Fasilitas Bengkel Standar Industri",
                  "Program Magang & Penyerapan Kerja Tinggi"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="text-green-500 flex-shrink-0 mt-1" size={20} />
                    <span className="text-slate-800 dark:text-gray-200 font-medium text-lg">{item}</span>
                  </li>
                ))}
              </ul>

              <a href="#jurusan" className="inline-flex items-center text-slate-900 dark:text-white font-bold border-b-2 border-muca-yellow hover:text-muca-blue transition-colors pb-1">
                Lihat Kompetensi Keahlian <ArrowRight size={18} className="ml-2" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: Visi & Misi */}
      <section id="visi" className="py-20 bg-slate-900 dark:bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
           <div className="absolute top-10 right-10 w-64 h-64 bg-muca-yellow rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
           <div className="absolute bottom-10 left-10 w-64 h-64 bg-muca-blue rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-muca-yellow font-bold tracking-widest uppercase mb-2">Visi & Misi</h2>
            <h3 className="text-3xl md:text-4xl font-serif font-bold mb-4">Landasan Pendidikan Kami</h3>
            <p className="text-gray-400">Mewujudkan lulusan yang tidak hanya kompeten secara teknis, tetapi juga memiliki fondasi agama yang kokoh.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10">
              <div className="flex items-center gap-3 mb-6">
                <Target className="text-muca-yellow" size={32} />
                <h3 className="text-2xl font-bold">Visi Sekolah</h3>
              </div>
              <p className="text-lg leading-relaxed italic text-gray-200">
                "Terwujudnya tamatan yang berakhlak mulia, kompeten, unggul, mandiri, dan berwawasan lingkungan."
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10">
               <div className="flex items-center gap-3 mb-6">
                <Zap className="text-muca-yellow" size={32} />
                <h3 className="text-2xl font-bold">Misi Utama</h3>
              </div>
              <ul className="space-y-4 text-gray-300">
                <li className="flex gap-3">
                  <div className="mt-1.5 w-2 h-2 bg-muca-yellow rounded-full"></div>
                  <p>Menyelenggarakan pendidikan berbasis nilai-nilai keislaman dan Kemuhammadiyahan.</p>
                </li>
                <li className="flex gap-3">
                  <div className="mt-1.5 w-2 h-2 bg-muca-yellow rounded-full"></div>
                  <p>Mengembangkan pembelajaran berbasis kompetensi dan teknologi informasi.</p>
                </li>
                <li className="flex gap-3">
                  <div className="mt-1.5 w-2 h-2 bg-muca-yellow rounded-full"></div>
                  <p>Meningkatkan kerjasama dengan Dunia Usaha dan Dunia Industri (DUDI).</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Majors Section */}
      <section id="jurusan" className="py-24 bg-slate-50 dark:bg-slate-900 relative transition-colors">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-muca-blue dark:text-blue-400 font-bold tracking-widest uppercase mb-2">Program Keahlian</h2>
            <h3 className="text-4xl font-serif font-bold text-slate-900 dark:text-white mb-6">Pilihan Jurusan Masa Depan</h3>
            <div className="h-1 w-20 bg-muca-yellow mx-auto rounded-full mb-8"></div>
            
            {/* Majors Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { label: 'SEMUA', value: 'SEMUA' },
                { label: 'OTOMOTIF', value: 'OTOMOTIF' },
                { label: 'BISNIS', value: 'BISNIS' },
                { label: 'TATA BUSANA', value: 'TATA BUSANA' }
              ].map((category) => (
                <button
                  key={category.value}
                  onClick={() => setSelectedMajorCategory(category.value as any)}
                  className={`px-6 py-2 rounded-full font-bold text-sm transition-all duration-300 ${
                    selectedMajorCategory === category.value
                      ? 'bg-muca-blue text-white shadow-lg transform scale-105'
                      : 'bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 border border-gray-200 dark:border-gray-700'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMajors.map(major => (
              <MajorCard key={major.id} major={major} />
            ))}
          </div>
        </div>
      </section>

       {/* SECTION: Fasilitas */}
       <section id="fasilitas" className="py-24 bg-white dark:bg-slate-800 transition-colors">
        <div className="container mx-auto px-4">
           <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="md:w-1/3">
                 <h2 className="text-muca-blue dark:text-blue-400 font-bold tracking-widest uppercase mb-2">Fasilitas</h2>
                 <h3 className="text-3xl font-serif font-bold text-slate-900 dark:text-white mb-6">Sarana Penunjang Pembelajaran</h3>
                 <p className="text-gray-600 dark:text-gray-300 mb-6">Kami menyediakan fasilitas lengkap sesuai standar industri untuk memastikan siswa siap kerja.</p>
                 <a href="#jurusan" className="text-muca-blue dark:text-blue-400 font-bold flex items-center gap-2 hover:underline">
                    Lihat Galeri Sekolah <ArrowRight size={16}/>
                 </a>
              </div>
              <div className="md:w-2/3 grid grid-cols-2 gap-4">
                  {[
                    { Icon: Shield, title: "Bengkel Standar Industri" },
                    { Icon: Wifi, title: "Free Hotspot Area" },
                    { Icon: Monitor, title: "Laboratorium Komputer" },
                    { Icon: PenTool, title: "Unit Produksi & Jasa" }
                  ].map((facility, idx) => (
                    <div key={idx} className="bg-slate-50 dark:bg-slate-700 p-6 rounded-xl text-center hover:shadow-lg transition-shadow border border-gray-100 dark:border-gray-600">
                       <facility.Icon className="mx-auto text-muca-yellow mb-3" size={32} />
                       <h4 className="font-bold text-slate-900 dark:text-white">{facility.title}</h4>
                    </div>
                  ))}
              </div>
           </div>
        </div>
      </section>

      {/* Latest News / Events */}
      <section className="py-24 bg-gray-50 dark:bg-slate-900 border-t border-gray-200 dark:border-gray-700 transition-colors">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-muca-blue dark:text-blue-400 font-bold tracking-widest uppercase mb-2">Berita & Artikel</h2>
              <h3 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 dark:text-white">Kabar Sekolah Terkini</h3>
            </div>
            <Link to="/berita" className="px-6 py-3 rounded-full border-2 border-slate-900 dark:border-white text-slate-900 dark:text-white font-bold hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 transition-all flex items-center gap-2">
              Lihat Semua <ArrowRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {MOCK_NEWS.slice(0, 3).map(news => (
              <div key={news.id} className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 overflow-hidden group">
                <div className="relative h-56 overflow-hidden">
                  <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/10 transition-colors z-10"></div>
                  <img src={news.image} alt={news.title} loading="lazy" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                  <span className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-sm text-slate-900 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                    {news.category}
                  </span>
                </div>
                <div className="p-8">
                  <div className="flex items-center text-muca-blue dark:text-blue-400 text-sm font-semibold mb-3">
                    <Calendar size={16} className="mr-2" />
                    {news.date}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-muca-blue dark:group-hover:text-blue-400 transition-colors leading-tight">
                    {news.title}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-6 line-clamp-2 leading-relaxed">{news.excerpt}</p>
                  <Link to={`/berita/${news.id}`} className="inline-flex items-center text-slate-900 dark:text-white font-bold hover:text-muca-yellow transition-colors">
                    Baca Selengkapnya <ArrowRight size={16} className="ml-2" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <InstagramSection />
    </div>
  );
};

export default Home;
