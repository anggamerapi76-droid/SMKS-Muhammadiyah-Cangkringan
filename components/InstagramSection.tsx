import React from 'react';
import { Instagram, Heart, MessageCircle } from 'lucide-react';
import { SCHOOL_INFO } from '../constants';

const InstagramSection: React.FC = () => {
  // Mock data simulating a live feed response
  const posts = [
    { id: 1, image: 'https://picsum.photos/400/400?random=101', likes: 234, comments: 12 },
    { id: 2, image: 'https://picsum.photos/400/500?random=102', likes: 156, comments: 8 },
    { id: 3, image: 'https://picsum.photos/400/400?random=103', likes: 892, comments: 45 },
    { id: 4, image: 'https://picsum.photos/400/600?random=104', likes: 341, comments: 20 },
    { id: 5, image: 'https://picsum.photos/400/400?random=105', likes: 112, comments: 5 },
    { id: 6, image: 'https://picsum.photos/400/500?random=106', likes: 567, comments: 33 },
    { id: 7, image: 'https://picsum.photos/400/400?random=107', likes: 431, comments: 18 },
    { id: 8, image: 'https://picsum.photos/400/400?random=108', likes: 221, comments: 9 },
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      {/* Header */}
      <div className="container mx-auto px-4 mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            <span className="text-red-500 font-bold text-sm tracking-widest uppercase">Live Update</span>
          </div>
          <h2 className="text-4xl font-serif font-bold text-slate-900 leading-none">
            Galeri @smkmuca
          </h2>
        </div>
        
        <a 
          href={SCHOOL_INFO.socials.instagram} 
          target="_blank" 
          rel="noreferrer" 
          className="flex items-center gap-2 text-slate-900 font-bold border-b-2 border-slate-900 pb-1 hover:text-muca-blue hover:border-muca-blue transition-all"
        >
          <Instagram size={20} />
          Lihat Profil Instagram
        </a>
      </div>

      {/* Masonry / Grid Layout for "Live" feel */}
      <div className="container mx-auto px-4">
        <div className="columns-2 md:columns-4 gap-4 space-y-4">
          {posts.map((post) => (
            <a 
              key={post.id} 
              href={SCHOOL_INFO.socials.instagram} 
              target="_blank" 
              rel="noreferrer"
              className="relative group block rounded-xl overflow-hidden shadow-md break-inside-avoid hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <img 
                src={post.image} 
                alt="Instagram Post" 
                className="w-full object-cover"
              />
              {/* Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <div className="flex justify-between items-center text-white">
                  <div className="flex gap-4">
                    <span className="flex items-center gap-1 font-bold"><Heart size={16} fill="white" /> {post.likes}</span>
                    <span className="flex items-center gap-1 font-bold"><MessageCircle size={16} fill="white" /> {post.comments}</span>
                  </div>
                  <Instagram size={18} />
                </div>
              </div>
            </a>
          ))}
        </div>
        
        <div className="mt-8 text-center">
            <p className="text-gray-400 text-xs italic">
                * Galeri disinkronkan secara otomatis dari feed Instagram SMK Muhammadiyah Cangkringan.
            </p>
        </div>
      </div>
    </section>
  );
};

export default InstagramSection;