import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Award } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { SCHOOL_INFO } from '../constants';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navClass = `fixed w-full z-50 transition-all duration-300 ${
    isScrolled || location.pathname !== '/' 
      ? 'bg-muca-dark/95 backdrop-blur-md shadow-lg py-2' 
      : 'bg-gradient-to-b from-black/80 to-transparent py-6'
  }`;

  const linkClass = "text-white hover:text-muca-yellow transition-colors font-medium text-sm uppercase tracking-wide px-3 py-2";
  const mobileLinkClass = "block text-white hover:text-muca-yellow py-3 text-lg font-medium border-b border-gray-700";

  return (
    <nav className={navClass}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo Area */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-muca-blue font-bold shadow-lg border-2 border-muca-yellow group-hover:scale-105 transition-transform overflow-hidden">
                 {/* Replaced with simple text logo if image unavailable, but implies Logo */}
                 <span className="text-xs font-black">MUCA</span>
              </div>
              <div className="absolute -bottom-1 -right-1 bg-muca-yellow text-muca-dark text-[8px] font-bold px-1 rounded shadow-sm border border-white">
                PK
              </div>
            </div>
            <div className="hidden md:block">
              <h1 className="text-white font-extrabold text-xl leading-none tracking-tight">SMK MUHAMMADIYAH</h1>
              <div className="flex items-center gap-2">
                <p className="text-gray-300 text-xs font-medium tracking-widest">CANGKRINGAN</p>
                <span className="w-1 h-1 bg-muca-yellow rounded-full"></span>
                <p className="text-muca-yellow text-xs font-bold tracking-widest flex items-center gap-1">
                  <Award size={10} /> SMK PUSAT KEUNGGULAN
                </p>
              </div>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-1">
            <Link to="/" className={linkClass}>Beranda</Link>
            
            <div className="relative group">
              <button className={`${linkClass} flex items-center gap-1`}>
                Profil <ChevronDown size={14} />
              </button>
              <div className="absolute top-full left-0 w-56 bg-white text-gray-800 rounded-lg shadow-2xl opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 transform translate-y-4 group-hover:translate-y-0 overflow-hidden border-t-4 border-muca-yellow">
                <Link to="/#visi" className="block px-6 py-3 hover:bg-gray-50 border-b border-gray-100 transition-colors">Visi & Misi</Link>
                <Link to="/#jurusan" className="block px-6 py-3 hover:bg-gray-50 border-b border-gray-100 transition-colors">Kompetensi Keahlian</Link>
                <Link to="/#fasilitas" className="block px-6 py-3 hover:bg-gray-50 transition-colors">Fasilitas SMK PK</Link>
              </div>
            </div>

            <Link to="/bkk" className={linkClass}>BKK (Karir)</Link>
            <Link to="/alumni" className={linkClass}>Alumni</Link>
            <Link to="/berita" className={linkClass}>Berita</Link>
            <Link to="/admin/login" className={linkClass}>Admin</Link>

            <a 
              href={SCHOOL_INFO.spmbUrl} 
              target="_blank" 
              rel="noreferrer"
              className="ml-4 bg-muca-yellow text-muca-dark hover:bg-white hover:text-muca-blue px-6 py-2.5 rounded-full font-bold text-sm transition-all transform hover:scale-105 shadow-[0_0_15px_rgba(251,191,36,0.5)] flex items-center gap-2"
            >
              PPDB Online
            </a>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="lg:hidden text-white hover:text-muca-yellow transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden fixed inset-0 z-40 bg-muca-dark/98 backdrop-blur-xl pt-24 px-6 animate-fade-in">
             <button 
              className="absolute top-6 right-6 text-white"
              onClick={() => setIsOpen(false)}
            >
              <X size={32} />
            </button>
            <div className="flex flex-col space-y-2">
              <Link to="/" className={mobileLinkClass} onClick={() => setIsOpen(false)}>Beranda</Link>
              <Link to="/bkk" className={mobileLinkClass} onClick={() => setIsOpen(false)}>Bursa Kerja</Link>
              <Link to="/alumni" className={mobileLinkClass} onClick={() => setIsOpen(false)}>Alumni</Link>
              <Link to="/berita" className={mobileLinkClass} onClick={() => setIsOpen(false)}>Berita Terkini</Link>
              <Link to="/admin/login" className={mobileLinkClass} onClick={() => setIsOpen(false)}>Login Admin</Link>
              <a 
                href={SCHOOL_INFO.spmbUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-8 w-full text-center bg-gradient-to-r from-muca-yellow to-yellow-500 text-muca-dark py-4 rounded-xl font-bold text-lg shadow-lg"
              >
                Daftar Sekolah (SPMB)
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;