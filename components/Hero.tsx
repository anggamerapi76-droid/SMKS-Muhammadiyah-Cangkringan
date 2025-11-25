import React from 'react';
import { SCHOOL_INFO } from '../constants';
import { ChevronRight, Star, BookOpen, PenTool, Award } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden flex flex-col justify-center">
      {/* Background with darker overlay for text contrast */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0 scale-105 animate-slow-zoom"
        style={{ backgroundImage: 'url("https://picsum.photos/1920/1080?random=school_building")' }}
      >
        <div className="absolute inset-0 bg-slate-900/70 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-900 via-transparent to-slate-900/40"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8 mt-20 lg:mt-0">
        <div className="max-w-5xl">
          {/* Badge SMK PK */}
          <div className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-xs md:text-sm tracking-widest uppercase mb-8 shadow-2xl animate-fade-in-up">
            <span className="bg-muca-yellow text-muca-dark px-2 py-0.5 rounded text-[10px] font-black">NEW</span>
            <span>SMK Pusat Keunggulan</span>
            <Award size={16} className="text-muca-yellow" />
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 font-sans leading-tight tracking-tight animate-fade-in-up delay-100">
            CETAK GENERASI <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-muca-yellow via-yellow-200 to-muca-yellow filter drop-shadow-lg">
              JUARA & KOMPETEN
            </span>
          </h1>
          
          <p className="text-lg md:text-2xl text-gray-200 mb-10 max-w-2xl leading-relaxed font-light animate-fade-in-up delay-200">
            SMK Muhammadiyah Cangkringan. Mengintegrasikan nilai keislaman dengan teknologi industri modern untuk masa depan yang gemilang.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-300">
            <a 
              href={SCHOOL_INFO.spmbUrl} 
              target="_blank"
              rel="noreferrer"
              className="px-8 py-4 bg-muca-blue hover:bg-blue-600 text-white font-bold rounded-full shadow-[0_10px_30px_rgba(0,74,173,0.5)] transition-all transform hover:-translate-y-1 flex items-center justify-center gap-3"
            >
              Daftar Sekarang <ChevronRight size={20} />
            </a>
            <button className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/30 text-white font-bold rounded-full hover:bg-white hover:text-slate-900 transition-all flex items-center justify-center">
              Jelajahi Jurusan
            </button>
          </div>
        </div>
      </div>

      {/* Motto Cards - Absolute Bottom */}
      <div className="relative z-20 container mx-auto px-4 lg:px-8 mt-20 lg:mt-24 mb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Religius */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl hover:bg-muca-blue/90 hover:border-muca-blue transition-all duration-300 group cursor-default">
            <div className="bg-white/20 w-14 h-14 rounded-2xl flex items-center justify-center mb-4 text-white group-hover:bg-white group-hover:text-muca-blue transition-colors">
              <BookOpen size={28} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Religius</h3>
            <p className="text-gray-300 text-sm leading-relaxed group-hover:text-blue-100">
              Menanamkan nilai-nilai keislaman dan akhlak mulia dalam setiap aktivitas pembelajaran.
            </p>
          </div>

          {/* Unggul */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl hover:bg-muca-yellow hover:border-muca-yellow transition-all duration-300 group cursor-default">
             <div className="bg-white/20 w-14 h-14 rounded-2xl flex items-center justify-center mb-4 text-white group-hover:bg-white group-hover:text-yellow-600 transition-colors">
              <Star size={28} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-slate-900">Unggul</h3>
            <p className="text-gray-300 text-sm leading-relaxed group-hover:text-slate-800">
              Berprestasi di bidang akademik dan non-akademik, menjadi sekolah rujukan nasional (SMK PK).
            </p>
          </div>

          {/* Kompeten */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl hover:bg-emerald-600 hover:border-emerald-500 transition-all duration-300 group cursor-default">
             <div className="bg-white/20 w-14 h-14 rounded-2xl flex items-center justify-center mb-4 text-white group-hover:bg-white group-hover:text-emerald-600 transition-colors">
              <PenTool size={28} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Kompeten</h3>
            <p className="text-gray-300 text-sm leading-relaxed group-hover:text-emerald-100">
              Siap kerja dengan skill standar industri, sertifikasi profesi, dan wirausaha mandiri.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Hero;