
import React, { useState, useEffect } from 'react';
import { db } from '../services/database';
import { NewsItem } from '../types';
import { Calendar, Search, ArrowRight, Filter, ChevronLeft, ChevronRight, Tag, Share2, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const ITEMS_PER_PAGE = 6;

const News: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [currentPage, setCurrentPage] = useState(1);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [allNews, setAllNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Load initial data
  useEffect(() => {
    const data = db.getNews();
    setAllNews(data);
  }, []);

  // Derived categories from actual data
  const categories: string[] = ['Semua', ...Array.from(new Set(allNews.map((item) => item.category))) as string[]];

  useEffect(() => {
    const fetchNewsData = async () => {
      setLoading(true);
      
      // Simulate network delay for better UX
      await new Promise(resolve => setTimeout(resolve, 600)); 

      // Get latest data from DB (in case of updates)
      let data = db.getNews(); 
      setAllNews(data);
      
      // Filter Logic
      if (selectedCategory !== 'Semua') {
        data = data.filter(item => item.category === selectedCategory);
      }
      
      if (searchTerm) {
        data = data.filter(item => 
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      // Pagination Logic
      const total = Math.ceil(data.length / ITEMS_PER_PAGE);
      const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
      const paginatedData = data.slice(startIdx, startIdx + ITEMS_PER_PAGE);

      setNews(paginatedData);
      setTotalPages(total);
      setLoading(false);
    };

    fetchNewsData();
  }, [searchTerm, selectedCategory, currentPage]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleShareCard = (e: React.MouseEvent, newsId: string) => {
    e.preventDefault();
    e.stopPropagation();
    const url = `${window.location.origin}/#/berita/${newsId}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedId(newsId);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const NewsSkeleton = () => (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col h-full animate-pulse">
      <div className="relative h-56 bg-gray-200 dark:bg-slate-700 w-full">
         <div className="absolute top-4 left-4 bg-gray-300 dark:bg-slate-600 h-6 w-20 rounded-full"></div>
      </div>
      <div className="p-8 flex flex-col flex-grow">
        <div className="flex items-center gap-2 mb-3">
           <div className="w-4 h-4 bg-gray-200 dark:bg-slate-700 rounded"></div>
           <div className="w-24 h-4 bg-gray-200 dark:bg-slate-700 rounded"></div>
        </div>
        <div className="h-7 bg-gray-200 dark:bg-slate-700 rounded w-full mb-2"></div>
        <div className="h-7 bg-gray-200 dark:bg-slate-700 rounded w-2/3 mb-4"></div>
        <div className="space-y-2 mb-6 flex-grow">
           <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-full"></div>
           <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-full"></div>
           <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-3/4"></div>
        </div>
        <div className="h-5 bg-gray-200 dark:bg-slate-700 rounded w-32 mt-auto"></div>
      </div>
    </div>
  );

  return (
    <div className="pt-24 pb-20 bg-gray-50 dark:bg-gray-900 min-h-screen">
       <SEO 
         title="Berita & Agenda" 
         description="Dapatkan informasi terbaru seputar kegiatan sekolah, prestasi siswa, dan pengumuman akademik di SMK Muhammadiyah Cangkringan."
       />

       <div className="bg-slate-900 dark:bg-slate-950 text-white py-16 mb-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-serif font-bold mb-4">Berita & Agenda</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Informasi terbaru seputar kegiatan sekolah, prestasi siswa, dan pengumuman akademik SMK Muhammadiyah Cangkringan.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto mb-12">
            <div className="relative w-full mb-4">
                <input 
                    type="text" 
                    placeholder="Cari artikel berdasarkan judul atau kutipan..." 
                    className="w-full px-5 py-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm focus:ring-2 focus:ring-muca-blue outline-none pl-12 transition-all dark:bg-slate-800 dark:text-white text-lg"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-4 top-4.5 text-gray-400" size={24} />
            </div>

            <div className="flex flex-wrap items-center gap-3 p-2 bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
               <div className="flex items-center gap-2 px-3 py-2 text-gray-500 dark:text-gray-400 border-r border-gray-200 dark:border-gray-700">
                  <Filter size={18} />
                  <span className="text-sm font-bold">Filter:</span>
               </div>
               <div className="flex-grow flex flex-wrap gap-2">
                 {categories.map((cat) => (
                   <button
                     key={cat}
                     onClick={() => setSelectedCategory(cat)}
                     className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                       selectedCategory === cat 
                         ? 'bg-muca-blue text-white shadow-md' 
                         : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600'
                     }`}
                   >
                     {cat}
                   </button>
                 ))}
               </div>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {loading ? (
               [...Array(ITEMS_PER_PAGE)].map((_, i) => <NewsSkeleton key={i} />)
            ) : news.length > 0 ? (
                news.map(item => (
                <Link to={`/berita/${item.id}`} key={item.id} className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 overflow-hidden group flex flex-col h-full animate-fade-in hover:-translate-y-1 relative">
                    <div className="relative h-56 overflow-hidden flex-shrink-0">
                    <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/10 transition-colors z-10"></div>
                    <img src={item.image} alt={item.title} loading="lazy" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                    
                    <div className="absolute top-3 right-3 z-30">
                       <button
                         onClick={(e) => handleShareCard(e, item.id)}
                         className={`p-2 rounded-full transition-all shadow-lg border border-white/20 flex items-center gap-1 ${
                           copiedId === item.id 
                            ? 'bg-green-500 text-white scale-110' 
                            : 'bg-white/30 backdrop-blur-md text-slate-900 hover:bg-muca-yellow'
                         }`}
                         title="Salin Link Berita"
                       >
                         {copiedId === item.id ? <Check size={16} /> : <Share2 size={16} />}
                       </button>
                    </div>
                     <div className={`absolute top-14 right-3 z-30 bg-slate-900/90 text-white text-[10px] font-bold px-2 py-1 rounded transition-all duration-300 ${copiedId === item.id ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
                        Tersalin!
                     </div>

                    <span className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-sm text-slate-900 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
                        <Tag size={12} /> {item.category}
                    </span>
                    </div>
                    <div className="p-8 flex flex-col flex-grow">
                    <div className="flex items-center text-muca-blue dark:text-blue-400 text-sm font-semibold mb-3">
                        <Calendar size={16} className="mr-2" />
                        {item.date}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-muca-blue dark:group-hover:text-blue-400 transition-colors leading-tight">
                        {item.title}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-6 line-clamp-3 leading-relaxed flex-grow">{item.excerpt}</p>
                    <span className="inline-flex items-center text-slate-900 dark:text-white font-bold hover:text-muca-yellow transition-colors mt-auto">
                        Baca Selengkapnya <ArrowRight size={16} className="ml-2" />
                    </span>
                    </div>
                </Link>
                ))
            ) : (
                <div className="col-span-full text-center py-24 text-gray-500 bg-white dark:bg-slate-800 rounded-xl border border-dashed border-gray-300 dark:border-gray-700 flex flex-col items-center justify-center">
                    <div className="w-20 h-20 bg-gray-100 dark:bg-slate-700 rounded-full flex items-center justify-center mb-4 text-gray-400">
                      <Search size={32} />
                    </div>
                    <p className="text-xl font-medium text-slate-900 dark:text-white mb-2">Tidak ada berita yang ditemukan.</p>
                    <p className="text-sm">Coba ubah kata kunci pencarian atau kategori filter anda.</p>
                </div>
            )}
        </div>

        {!loading && totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-12">
              <button 
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-slate-700 dark:text-white disabled:opacity-50 disabled:hover:bg-transparent transition-all"
                aria-label="Previous Page"
              >
                <ChevronLeft size={20} />
              </button>
              
              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                   <button
                     key={page}
                     onClick={() => handlePageChange(page)}
                     className={`w-10 h-10 rounded-lg font-bold text-sm transition-all ${
                       currentPage === page
                         ? 'bg-muca-blue text-white shadow-lg scale-105'
                         : 'bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-slate-700'
                     }`}
                   >
                     {page}
                   </button>
                ))}
              </div>

              <button 
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-slate-700 dark:text-white disabled:opacity-50 disabled:hover:bg-transparent transition-all"
                aria-label="Next Page"
              >
                <ChevronRight size={20} />
              </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default News;
