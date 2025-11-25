
import React, { useEffect, useState } from 'react';
import { Instagram, Heart, MessageCircle, ExternalLink, Loader2 } from 'lucide-react';
import { SCHOOL_INFO } from '../constants';

interface InstagramPost {
  id: string;
  media_url: string;
  permalink: string;
  caption?: string;
  thumbnail_url?: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  like_count?: number;
  comments_count?: number;
}

const InstagramSection: React.FC = () => {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [usingMockData, setUsingMockData] = useState(false);

  const mockPosts: InstagramPost[] = [
    { id: '1', media_type: 'IMAGE', media_url: 'https://picsum.photos/400/400?random=101', permalink: SCHOOL_INFO.socials.instagram, like_count: 234, comments_count: 12 },
    { id: '2', media_type: 'IMAGE', media_url: 'https://picsum.photos/400/500?random=102', permalink: SCHOOL_INFO.socials.instagram, like_count: 156, comments_count: 8 },
    { id: '3', media_type: 'IMAGE', media_url: 'https://picsum.photos/400/400?random=103', permalink: SCHOOL_INFO.socials.instagram, like_count: 892, comments_count: 45 },
    { id: '4', media_type: 'IMAGE', media_url: 'https://picsum.photos/400/600?random=104', permalink: SCHOOL_INFO.socials.instagram, like_count: 341, comments_count: 20 },
    { id: '5', media_type: 'IMAGE', media_url: 'https://picsum.photos/400/400?random=105', permalink: SCHOOL_INFO.socials.instagram, like_count: 112, comments_count: 5 },
    { id: '6', media_type: 'IMAGE', media_url: 'https://picsum.photos/400/500?random=106', permalink: SCHOOL_INFO.socials.instagram, like_count: 567, comments_count: 33 },
    { id: '7', media_type: 'IMAGE', media_url: 'https://picsum.photos/400/400?random=107', permalink: SCHOOL_INFO.socials.instagram, like_count: 431, comments_count: 18 },
    { id: '8', media_type: 'IMAGE', media_url: 'https://picsum.photos/400/400?random=108', permalink: SCHOOL_INFO.socials.instagram, like_count: 221, comments_count: 9 },
  ];

  useEffect(() => {
    const fetchInstagramPosts = async () => {
      if (!SCHOOL_INFO.instagramToken) {
        setTimeout(() => {
          setPosts(mockPosts);
          setUsingMockData(true);
          setLoading(false);
        }, 1500);
        return;
      }

      try {
        const response = await fetch(
          `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink&access_token=${SCHOOL_INFO.instagramToken}&limit=8`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch Instagram posts');
        }

        const data = await response.json();
        setPosts(data.data);
      } catch (error) {
        setPosts(mockPosts); 
        setUsingMockData(true);
      } finally {
        setLoading(false);
      }
    };

    fetchInstagramPosts();
  }, []);

  return (
    <section className="py-24 bg-white dark:bg-slate-800 overflow-hidden transition-colors">
      <div className="container mx-auto px-4 mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            <span className="text-red-500 font-bold text-sm tracking-widest uppercase">Live Update</span>
          </div>
          <h2 className="text-4xl font-serif font-bold text-slate-900 dark:text-white leading-none">
            Galeri @smkmuca
          </h2>
          {usingMockData && (
             <p className="text-gray-400 dark:text-gray-500 text-xs mt-2 italic">
               (Demo Mode: Menampilkan data simulasi karena token API belum dikonfigurasi)
             </p>
          )}
        </div>
        
        <a 
          href={SCHOOL_INFO.socials.instagram} 
          target="_blank" 
          rel="noreferrer" 
          className="flex items-center gap-2 text-slate-900 dark:text-white font-bold border-b-2 border-slate-900 dark:border-white pb-1 hover:text-muca-blue hover:border-muca-blue transition-all"
        >
          <Instagram size={20} />
          Lihat Profil Instagram
        </a>
      </div>

      <div className="container mx-auto px-4">
        {loading ? (
          <div className="columns-2 md:columns-4 gap-4 space-y-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-gray-200 dark:bg-slate-700 rounded-xl break-inside-avoid h-64 animate-pulse relative overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700 animate-[shimmer_1.5s_infinite]"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="columns-2 md:columns-4 gap-4 space-y-4">
            {posts.map((post) => (
              <a 
                key={post.id} 
                href={post.permalink} 
                target="_blank" 
                rel="noreferrer"
                className="relative group block rounded-xl overflow-hidden shadow-md break-inside-avoid hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 backface-hidden"
              >
                <img 
                  src={post.media_type === 'VIDEO' ? post.thumbnail_url || post.media_url : post.media_url} 
                  alt={post.caption || 'Instagram Post'} 
                  className="w-full object-cover min-h-[150px]"
                  loading="lazy"
                />
                
                {post.media_type === 'VIDEO' && (
                  <div className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <div className="flex justify-between items-end text-white">
                    <div className="flex flex-col gap-1 w-full">
                      {(post.like_count !== undefined) && (
                         <div className="flex gap-4 mb-2">
                           <span className="flex items-center gap-1 font-bold text-sm"><Heart size={14} fill="white" /> {post.like_count}</span>
                           <span className="flex items-center gap-1 font-bold text-sm"><MessageCircle size={14} fill="white" /> {post.comments_count}</span>
                         </div>
                      )}
                      
                      <p className="text-xs text-gray-300 line-clamp-2 mb-2 font-medium">
                        {post.caption || 'Lihat postingan ini di Instagram...'}
                      </p>
                      
                      <div className="flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold text-muca-yellow">
                        Buka di IG <ExternalLink size={10} />
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}

        <div className="mt-8 text-center border-t border-gray-100 dark:border-gray-700 pt-8">
            <p className="text-gray-400 text-xs">
                * Galeri disinkronkan secara otomatis dari feed Instagram @smkmuca. Gunakan hashtag #SMKMUCA untuk kesempatan direpost.
            </p>
        </div>
      </div>
    </section>
  );
};

export default InstagramSection;
