import React from 'react';
import { SCHOOL_INFO } from '../constants';
import { Instagram, Youtube, Facebook, MapPin, Mail, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8 border-t-4 border-muca-yellow">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand & Info */}
          <div>
            <h2 className="text-2xl font-bold font-serif mb-2 flex items-center gap-2">
              <span className="text-muca-yellow">SMK</span> MUCA
            </h2>
            <p className="text-muca-yellow font-bold text-xs tracking-wider uppercase mb-5">
              {SCHOOL_INFO.motto}
            </p>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Sekolah Menengah Kejuruan Pusat Keunggulan yang berkomitmen mencetak generasi unggul, islami, dan kompeten di dunia kerja.
            </p>
            <div className="flex gap-4">
              <a href={SCHOOL_INFO.socials.instagram} target="_blank" rel="noreferrer" className="bg-gray-800 p-2 rounded hover:bg-pink-600 transition-colors"><Instagram size={20} /></a>
              <a href={SCHOOL_INFO.socials.youtube} target="_blank" rel="noreferrer" className="bg-gray-800 p-2 rounded hover:bg-red-600 transition-colors"><Youtube size={20} /></a>
              <a href={SCHOOL_INFO.socials.facebook} target="_blank" rel="noreferrer" className="bg-gray-800 p-2 rounded hover:bg-blue-600 transition-colors"><Facebook size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white border-l-4 border-muca-yellow pl-3">Tautan Cepat</h3>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#" className="hover:text-muca-yellow transition-colors">Profil Sekolah</a></li>
              <li><a href="#" className="hover:text-muca-yellow transition-colors">Visi & Misi</a></li>
              <li><a href={SCHOOL_INFO.spmbUrl} className="hover:text-muca-yellow transition-colors">Info PPDB</a></li>
              <li><a href="#" className="hover:text-muca-yellow transition-colors">Bursa Kerja Khusus</a></li>
              <li><a href="#" className="hover:text-muca-yellow transition-colors">Galeri Kegiatan</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white border-l-4 border-muca-yellow pl-3">Hubungi Kami</h3>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin className="text-muca-yellow mt-1 flex-shrink-0" size={18} />
                <span>{SCHOOL_INFO.addressMain}</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="text-muca-yellow mt-1 flex-shrink-0" size={18} />
                <span>{SCHOOL_INFO.addressUnit2}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-muca-yellow flex-shrink-0" size={18} />
                <span>+62 851-6351-9670</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-muca-yellow flex-shrink-0" size={18} />
                <span>info@smkmuca.sch.id</span>
              </li>
            </ul>
          </div>

          {/* Maps */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white border-l-4 border-muca-yellow pl-3">Lokasi</h3>
            <div className="space-y-4">
              <div className="rounded-lg overflow-hidden border border-gray-700 h-24 relative group">
                <iframe 
                  src={SCHOOL_INFO.mapUrlMain} 
                  width="100%" 
                  height="100%" 
                  style={{border:0}} 
                  allowFullScreen 
                  loading="lazy"
                  title="Main Campus"
                  className="group-hover:opacity-75 transition-opacity"
                ></iframe>
                <span className="absolute bottom-1 right-2 text-xs bg-black/70 px-2 py-1 rounded text-white pointer-events-none">Gedung Utama</span>
              </div>
              <div className="rounded-lg overflow-hidden border border-gray-700 h-24 relative group">
                <iframe 
                  src={SCHOOL_INFO.mapUrlUnit2} 
                  width="100%" 
                  height="100%" 
                  style={{border:0}} 
                  allowFullScreen 
                  loading="lazy"
                  title="Unit 2 Campus"
                  className="group-hover:opacity-75 transition-opacity"
                ></iframe>
                <span className="absolute bottom-1 right-2 text-xs bg-black/70 px-2 py-1 rounded text-white pointer-events-none">Unit 2 (Bengkel)</span>
              </div>
            </div>
          </div>

        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} SMK Muhammadiyah Cangkringan. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;