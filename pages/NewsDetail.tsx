
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_NEWS } from '../constants';
import { NewsItem } from '../types';
import { Calendar, ArrowLeft, Tag, Share2, Clock, CheckCircle } from 'lucide-react';
import SEO from '../components/SEO';

const NewsDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Simulate API fetch delay
    const fetchArticle = async () => {
      setLoading(true);
      setTimeout(() => {
        const found = MOCK_NEWS.find(n => n.id === id);
        setArticle(found || null);
        setLoading(false);
      }, 500);
    };

    fetchArticle();
  }, [id]);

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900 pt-32 pb-20 flex flex-col justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-muca-blue mb-4"></div>
        <p className="text-gray-500 dark:text-gray-400 animate-pulse">Memuat Berita...</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900 pt-32 pb-20 text-center px-4 flex flex-col items-center justify-center">
         <SEO title="Berita Tidak Ditemukan" description="Halaman yang Anda cari tidak tersedia." />
        <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">Berita Tidak Ditemukan</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">Artikel yang Anda cari mungkin telah dihapus, dipindahkan, atau URL yang Anda tuju salah.</p>
        <Link to="/berita" className="inline-flex items-center px-6 py-3 bg-muca-blue text-white rounded-full font-bold hover:bg-blue-700 transition-colors">
          <ArrowLeft size={20} className="mr-2" /> Kembali ke Daftar Berita
        </Link>
      </div>
    );
  }

  // Filter related news (exclude current article)
  const relatedNews = MOCK_NEWS.filter(n => n.id !== article.id && n.category === article.category).slice(0, 2);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 pt-28 pb-20 transition-colors">
      <SEO title={article.title} description={article.excerpt} image={article.image} />
      
      <article className="container mx-auto px-4 max-w-4xl">
        {/* Breadcrumb / Back */}
        <div className="mb-8 flex items-center gap-2 text-sm">
          <Link to="/" className="text-gray-500 hover:text-muca-blue transition-colors">Beranda</Link>
          <span className="text-gray-300">/</span>
          <Link to="/berita" className="text-gray-500 hover:text-muca-blue transition-colors">Berita</Link>
          <span className="text-gray-300">/</span>
          <span className="text-muca-blue font-medium truncate max-w-[200px]">{article.title}</span>
        </div>

        {/* Header */}
        <header className="mb-8">
          <div className="flex flex-wrap gap-3 mb-6">
             <Link to="/berita" className="bg-muca-yellow/20 text-yellow-800 dark:text-yellow-300 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 hover:bg-muca-yellow/30 transition-colors">
                <Tag size={14} /> {article.category}
             </Link>
             <span className="bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                <Calendar size={14} /> {article.date}
             </span>
             <span className="bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                <Clock size={14} /> 5 min read
             </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 dark:text-white leading-tight mb-8">
            {article.title}
          </h1>
        </header>

        {/* Featured Image */}
        <div className="rounded-2xl overflow-hidden shadow-2xl mb-12 aspect-video relative group">
           <img 
            src={article.image} 
            alt={article.title} 
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm p-8 md:p-12 border border-gray-100 dark:border-gray-700">
            <div 
              className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed font-sans"
              dangerouslySetInnerHTML={{ __html: article.content }}
            ></div>

            {/* Share / Tags Footer */}
            <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-center gap-4">
               <div className="text-gray-500 dark:text-gray-400 text-sm">
                  Tags: <span className="text-muca-blue dark:text-blue-400 font-medium cursor-pointer hover:underline">#SMKMUCA</span> <span className="text-muca-blue dark:text-blue-400 font-medium cursor-pointer hover:underline">#{article.category}</span> <span className="text-muca-blue dark:text-blue-400 font-medium cursor-pointer hover:underline">#SMKPK</span>
               </div>
               <button 
                onClick={handleShare}
                className="flex items-center gap-2 text-slate-700 dark:text-white hover:text-muca-blue dark:hover:text-muca-blue transition-colors px-4 py-2 rounded-lg bg-gray-50 dark:bg-slate-700 hover:bg-gray-100 dark:hover:bg-slate-600"
               >
                  {copied ? <CheckCircle size={18} className="text-green-500"/> : <Share2 size={18} />} 
                  <span className="font-medium">{copied ? 'Link Tersalin' : 'Bagikan Artikel'}</span>
               </button>
            </div>
        </div>
      </article>

      {/* Related News */}
      <div className="container mx-auto px-4 max-w-4xl mt-16">
         <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Berita Terkait</h3>
            <Link to="/berita" className="text-muca-blue dark:text-blue-400 font-bold text-sm hover:underline">Lihat Semua</Link>
         </div>
         
         {relatedNews.length > 0 ? (
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedNews.map(news => (
                 <Link key={news.id} to={`/berita/${news.id}`} className="group bg-white dark:bg-slate-800 p-4 rounded-xl shadow border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all flex gap-4">
                    <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                       <img src={news.image} alt={news.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="flex flex-col justify-center">
                       <span className="text-xs font-bold text-muca-blue dark:text-blue-400 uppercase mb-1">{news.category}</span>
                       <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-muca-blue dark:group-hover:text-blue-400 transition-colors line-clamp-2 leading-tight">{news.title}</h4>
                       <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 flex items-center gap-1">
                          <Calendar size={12}/> {news.date}
                       </p>
                    </div>
                 </Link>
              ))}
           </div>
         ) : (
           <p className="text-gray-500 dark:text-gray-400 italic">Belum ada berita terkait lainnya.</p>
         )}
      </div>
    </div>
  );
};

export default NewsDetail;
