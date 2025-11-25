
import React, { useState, useEffect, useRef } from 'react';
import { SCHOOL_INFO } from '../constants';
import { ChevronRight, Star, BookOpen, Briefcase, Award, Settings, RefreshCw, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  const [bgUrl, setBgUrl] = useState(SCHOOL_INFO.heroBackground);
  const [keyword, setKeyword] = useState('school building');
  const [showSettings, setShowSettings] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const mottoRef = useRef<HTMLDivElement>(null);
  const [mottoVisible, setMottoVisible] = useState(false);

  // Dynamic Image Generation Logic
  const handleRegenerate = () => {
    setIsRegenerating(true);
    // Add random seed to force refresh
    const newUrl = `https://picsum.photos/1920/1080?random=${Date.now()}&q=${encodeURIComponent(keyword)}`;
    
    // Preload image before setting to avoid white flash
    const img = new Image();
    img.src = newUrl;
    img.onload = () => {
      setBgUrl(newUrl);
      setIsRegenerating(false);
    };
  };

  // Scroll Animation Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setMottoVisible(true);
          observer.disconnect(); // Only animate once
        }
      },
      { threshold: 0.2 } // Trigger when 20% visible
    );

    if (mottoRef.current) {
      observer.observe(mottoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex flex-col justify-center bg-slate-900">
      {/* Custom Animations Styles */}
      <style>{`
        @keyframes slow-zoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.15); }
        }
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-slow-zoom {
          animation: slow-zoom 20s infinite alternate ease-in-out;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
        .delay-500 { animation-delay: 500ms; }
      `}</style>

      {/* Background with darker overlay for text contrast */}
      <div 
        className={`absolute inset-0 bg-cover bg-center z-0 animate-slow-zoom will-change-transform transition-opacity duration-700 ${isRegenerating ? 'opacity-50' : 'opacity-100'}`}
        style={{ backgroundImage: `url("${bgUrl}")` }}
      >
        <div className="absolute inset-0 bg-slate-900/80 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-900/50 to-transparent"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8 mt-20 lg:mt-0">
        <div className="max-w-5xl">
          {/* Badge SMK PK */}
          <div className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-xs md:text-sm tracking-widest uppercase mb-8 shadow-2xl opacity-0 animate-fade-in-up">
            <span className="bg-muca-yellow text-muca-dark px-2 py-0.5 rounded text-[10px] font-black">NEW</span>
            <span>SMK Pusat Keunggulan</span>
            <Award size={16} className="text-muca-yellow" />
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 font-sans leading-tight tracking-tight opacity-0 animate-fade-in-up delay-100">
            CETAK GENERASI <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-muca-yellow via-yellow-200 to-muca-yellow filter drop-shadow-lg">
              RELIGIUS, UNGGUL & KOMPETEN
            </span>
          </h1>
          
          <p className="text-lg md:text-2xl text-gray-200 mb-10 max-w-2xl leading-relaxed font-light opacity-0 animate-fade-in-up delay-200">
            SMK Muhammadiyah Cangkringan. Mengintegrasikan nilai keislaman dengan teknologi industri modern untuk masa depan yang gemilang.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in-up delay-300 flex-wrap">
            <a 
              href={SCHOOL_INFO.spmbUrl} 
              target="_blank"
              rel="noreferrer"
              className="px-8 py-4 bg-gradient-to-r from-muca-blue to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold rounded-full shadow-[0_4px_20px_rgba(0,74,173,0.5)] hover:shadow-[0_6px_25px_rgba(0,74,173,0.7)] transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3 group"
            >
              Daftar Sekarang 
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
            
            <a href="#jurusan" className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white font-bold rounded-full hover:bg-white/20 hover:border-white/50 transition-all duration-300 hover:scale-105 flex items-center justify-center shadow-lg">
              Jelajahi Jurusan
            </a>

            {/* Secondary CTA Button */}
            <Link to="/tentang" className="px-8 py-4 border-2 border-transparent text-gray-300 font-bold rounded-full hover:text-white hover:border-white/30 transition-all duration-300 flex items-center justify-center gap-2 group">
               <Info size={20} className="group-hover:text-muca-yellow transition-colors"/>
               Tentang Kami
            </Link>
          </div>
        </div>
      </div>

      {/* Motto Cards - Absolute Bottom with Scroll Trigger */}
      <div 
        ref={mottoRef}
        className={`relative z-20 container mx-auto px-4 lg:px-8 mt-24 mb-10 transition-all duration-1000 ease-out transform ${
          mottoVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Religius */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl hover:bg-muca-blue/80 hover:border-muca-blue/50 transition-all duration-500 group cursor-default shadow-lg hover:shadow-muca-blue/30 transform hover:-translate-y-2">
            <div className="bg-gradient-to-br from-white/20 to-white/5 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-white group-hover:bg-white group-hover:text-muca-blue transition-colors duration-500 shadow-inner">
              <BookOpen size={32} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Religius</h3>
            <p className="text-gray-300 text-sm leading-relaxed group-hover:text-blue-50 transition-colors">
              Menanamkan nilai-nilai keislaman, adab, dan akhlak mulia sebagai fondasi utama karakter siswa dalam setiap aktivitas.
            </p>
          </div>

          {/* Unggul */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl hover:bg-muca-yellow hover:border-muca-yellow/50 transition-all duration-500 group cursor-default shadow-lg hover:shadow-muca-yellow/30 transform hover:-translate-y-2">
             <div className="bg-gradient-to-br from-white/20 to-white/5 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-white group-hover:bg-white group-hover:text-yellow-600 transition-colors duration-500 shadow-inner">
              <Star size={32} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-slate-900 transition-colors">Unggul</h3>
            <p className="text-gray-300 text-sm leading-relaxed group-hover:text-slate-800 transition-colors">
              Berprestasi di bidang akademik dan non-akademik, menjadi sekolah rujukan nasional (SMK PK) dengan standar kualitas terbaik.
            </p>
          </div>

          {/* Kompeten */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl hover:bg-emerald-600 hover:border-emerald-500 transition-all duration-500 group cursor-default shadow-lg hover:shadow-emerald-600/30 transform hover:-translate-y-2">
             <div className="bg-gradient-to-br from-white/20 to-white/5 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-white group-hover:bg-white group-hover:text-emerald-600 transition-colors duration-500 shadow-inner">
              <Briefcase size={32} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Kompeten</h3>
            <p className="text-gray-300 text-sm leading-relaxed group-hover:text-emerald-50 transition-colors">
              Mencetak lulusan yang siap kerja dengan keahlian standar industri, bersertifikasi profesi, dan memiliki jiwa wirausaha.
            </p>
          </div>

        </div>
      </div>

      {/* Admin Settings Toggle (Floating) */}
      <div className="absolute bottom-6 right-6 z-50">
         <button 
           onClick={() => setShowSettings(!showSettings)}
           className="bg-black/50 text-white p-2 rounded-full hover:bg-black/80 transition-colors"
           title="Background Settings"
         >
            <Settings size={18} />
         </button>
         
         {showSettings && (
           <div className="absolute bottom-10 right-0 bg-white dark:bg-slate-800 p-4 rounded-lg shadow-xl w-64 animate-fade-in-up border border-gray-200 dark:border-gray-700">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">Background Settings</h4>
              <div className="flex gap-2 mb-2">
                 <input 
                   type="text" 
                   value={keyword}
                   onChange={(e) => setKeyword(e.target.value)}
                   className="w-full text-xs p-2 border rounded dark:bg-slate-700 dark:text-white dark:border-gray-600"
                   placeholder="Keyword (e.g. school)"
                 />
                 <button 
                   onClick={handleRegenerate}
                   disabled={isRegenerating}
                   className="bg-muca-blue text-white p-2 rounded hover:bg-blue-700 disabled:opacity-50"
                 >
                    <RefreshCw size={14} className={isRegenerating ? "animate-spin" : ""} />
                 </button>
              </div>
              <p className="text-[10px] text-gray-500">
                 Changes the hero background image dynamically based on keyword.
              </p>
           </div>
         )}
      </div>
    </div>
  );
};

export default Hero;
