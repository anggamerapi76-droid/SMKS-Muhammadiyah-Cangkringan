import React, { useState } from 'react';
import { MOCK_NEWS } from '../constants';
import { Calendar, Search, ArrowRight } from 'lucide-react';

const News: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Create more mock news for the full list
  const allNews = [
    ...MOCK_NEWS,
    {
        id: '4',
        title: 'Pelatihan Kewirausahaan Siswa',
        date: '2023-11-15',
        excerpt: 'Siswa diajarkan cara memulai bisnis sejak dini melalui program Business Center.',
        category: 'Kegiatan',
        image: 'https://picsum.photos/600/400?random=23'
    },
    {
        id: '5',
        title: 'Upacara Hari Pahlawan',
        date: '2023-11-10',
        excerpt: 'Memperingati jasa pahlawan dengan khidmat di lapangan utama.',
        category: 'Kegiatan',
        image: 'https://picsum.photos/600/400?random=24'
    },
    {
        id: '6',
        title: 'Job Fair SMK MUCA 2024',
        date: '2024-01-20',
        excerpt: 'Dihadiri oleh 20 perusahaan besar nasional, membuka peluang kerja bagi alumni.',
        category: 'BKK',
        image: 'https://picsum.photos/600/400?random=25'
    }
  ];

  const filteredNews = allNews.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
       <div className="bg-slate-900 text-white py-16 mb-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-serif font-bold mb-4">Berita & Agenda</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Informasi terbaru seputar kegiatan sekolah, prestasi siswa, dan pengumuman akademik SMK Muhammadiyah Cangkringan.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4">
        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-12 relative">
            <input 
                type="text" 
                placeholder="Cari berita..." 
                className="w-full px-6 py-4 rounded-full border border-gray-200 shadow-md focus:ring-2 focus:ring-muca-blue focus:border-transparent outline-none pl-14"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-5 top-4 text-gray-400" size={24} />
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.length > 0 ? (
                filteredNews.map(news => (
                <div key={news.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 overflow-hidden group flex flex-col h-full">
                    <div className="relative h-56 overflow-hidden flex-shrink-0">
                    <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/10 transition-colors z-10"></div>
                    <img src={news.image} alt={news.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                    <span className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-sm text-slate-900 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                        {news.category}
                    </span>
                    </div>
                    <div className="p-8 flex flex-col flex-grow">
                    <div className="flex items-center text-muca-blue text-sm font-semibold mb-3">
                        <Calendar size={16} className="mr-2" />
                        {news.date}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-muca-blue transition-colors leading-tight">
                        {news.title}
                    </h3>
                    <p className="text-gray-500 mb-6 line-clamp-3 leading-relaxed flex-grow">{news.excerpt}</p>
                    <a href="#" className="inline-flex items-center text-slate-900 font-bold hover:text-muca-yellow transition-colors mt-auto">
                        Baca Selengkapnya <ArrowRight size={16} className="ml-2" />
                    </a>
                    </div>
                </div>
                ))
            ) : (
                <div className="col-span-full text-center py-12 text-gray-500">
                    <p className="text-xl">Tidak ada berita yang ditemukan.</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default News;