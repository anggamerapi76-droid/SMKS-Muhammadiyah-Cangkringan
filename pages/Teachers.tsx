


import React, { useState, useEffect } from 'react';
import { MOCK_TEACHERS } from '../constants';
import { Teacher } from '../types';
import { Search, GraduationCap, Briefcase, Linkedin, Mail, ArrowRight, BookOpen, Share2, Frown, Star, Users, Check, Copy } from 'lucide-react';
import TeacherDetailModal from '../components/TeacherDetailModal';
import SEO from '../components/SEO';
import { useSearchParams } from 'react-router-dom';

const Teachers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Pimpinan' | 'Guru' | 'Karyawan'>('All');
  const [isLoading, setIsLoading] = useState(false);
  const [filteredTeachers, setFilteredTeachers] = useState<Teacher[]>([]);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchParams] = useSearchParams();

  // Handle URL params for direct linking
  useEffect(() => {
    const teacherId = searchParams.get('id');
    if (teacherId) {
      const foundTeacher = MOCK_TEACHERS.find(t => t.id === teacherId);
      if (foundTeacher) {
        setSelectedTeacher(foundTeacher);
      }
    }
  }, [searchParams]);

  useEffect(() => {
    const filterData = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 600));

      const results = MOCK_TEACHERS.filter(teacher => {
        const matchesSearch = teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              teacher.role.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || teacher.category === selectedCategory;
        return matchesSearch && matchesCategory;
      });

      setFilteredTeachers(results);
      setIsLoading(false);
    };

    filterData();
  }, [searchTerm, selectedCategory]);

  const handleOpenModal = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
  };

  const handleShareCard = (e: React.MouseEvent, teacherId: string) => {
    e.stopPropagation();
    const url = `${window.location.origin}/#/guru-karyawan?id=${teacherId}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedId(teacherId);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  // Filter Configuration
  const filters = [
    { label: 'All', value: 'All', icon: Users },
    { label: 'Kepala Sekolah', value: 'Pimpinan', icon: Star },
    { label: 'Guru', value: 'Guru', icon: GraduationCap },
    { label: 'Karyawan', value: 'Karyawan', icon: Briefcase },
  ] as const;

  // Skeleton Loader for Teachers
  const TeacherSkeleton = () => (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm overflow-hidden h-[400px] animate-pulse border border-gray-100 dark:border-gray-700">
      <div className="bg-gray-200 dark:bg-slate-700 h-2/3 w-full"></div>
      <div className="p-6 space-y-3">
        <div className="h-6 bg-gray-200 dark:bg-slate-700 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-1/2"></div>
        <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-full mt-2"></div>
      </div>
    </div>
  );

  return (
    <div className="pt-24 pb-20 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <SEO 
        title="Guru & Karyawan" 
        description="Direktori profil Guru dan Karyawan SMK Muhammadiyah Cangkringan yang profesional dan berdedikasi."
      />

      <TeacherDetailModal 
        teacher={selectedTeacher} 
        isOpen={!!selectedTeacher} 
        onClose={() => setSelectedTeacher(null)} 
      />

      {/* Header */}
      <div className="bg-muca-blue dark:bg-slate-800 text-white py-16 mb-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-serif font-bold mb-4">Direktori Guru & Karyawan</h1>
          <p className="text-blue-100 max-w-2xl mx-auto">
            Mengenal lebih dekat tenaga pendidik dan kependidikan profesional yang siap membimbing siswa SMK Muhammadiyah Cangkringan menuju kesuksesan.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4">
        {/* Filters */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md mb-12 border border-gray-100 dark:border-gray-700 sticky top-24 z-30 transition-all duration-300">
          <div className="flex flex-col md:flex-row gap-6 justify-between items-center">
             
             {/* Category Buttons */}
             <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto custom-scrollbar">
               {filters.map((filter) => (
                 <button
                   key={filter.value}
                   onClick={() => setSelectedCategory(filter.value as any)}
                   aria-pressed={selectedCategory === filter.value}
                   className={`px-5 py-2.5 rounded-full font-bold text-sm transition-all duration-300 transform whitespace-nowrap outline-none focus:ring-2 focus:ring-muca-blue flex items-center gap-2 ${
                     selectedCategory === filter.value
                       ? 'bg-muca-yellow text-slate-900 shadow-lg ring-2 ring-muca-yellow ring-offset-2 dark:ring-offset-slate-800 scale-105' 
                       : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600 hover:shadow-md hover:scale-105'
                   }`}
                 >
                   <filter.icon size={16} />
                   {filter.label}
                 </button>
               ))}
             </div>

             {/* Search */}
             <div className="relative w-full md:w-80 group">
                <input 
                  type="text" 
                  placeholder="Cari nama atau jabatan..."
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-slate-900 dark:text-white focus:ring-2 focus:ring-muca-blue outline-none transition-all shadow-sm group-hover:shadow-md"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-4 top-3.5 text-gray-400 group-hover:text-muca-blue transition-colors" size={20} />
             </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {isLoading ? (
               [...Array(8)].map((_, i) => <TeacherSkeleton key={i} />)
            ) : filteredTeachers.map((teacher) => (
               <div 
                  key={teacher.id} 
                  className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-300 cursor-pointer border border-gray-100 dark:border-gray-700 hover:-translate-y-2 relative"
                  onClick={() => handleOpenModal(teacher)}
               >
                  <div className="aspect-[3/4] overflow-hidden relative bg-gray-200 dark:bg-slate-700">
                    <img 
                      src={teacher.image} 
                      alt={teacher.name} 
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Share Button on Card */}
                    <div className="absolute top-3 right-3 z-20">
                       <button
                         onClick={(e) => handleShareCard(e, teacher.id)}
                         className={`p-2 rounded-full transition-all shadow-lg border border-white/20 flex items-center gap-1 ${
                           copiedId === teacher.id 
                            ? 'bg-green-500 text-white scale-110' 
                            : 'bg-white/30 backdrop-blur-md text-white hover:bg-muca-yellow hover:text-slate-900'
                         }`}
                         title="Salin Link Profil"
                       >
                         {copiedId === teacher.id ? (
                           <Check size={18} />
                         ) : (
                           <Share2 size={18} />
                         )}
                       </button>
                    </div>
                     {/* Copied Feedback Toast inside Card */}
                     <div className={`absolute top-14 right-3 z-20 bg-slate-900/80 text-white text-xs px-2 py-1 rounded transition-all duration-300 ${copiedId === teacher.id ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
                        Tersalin!
                     </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                       <p className="text-white text-sm font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex items-center gap-2">
                         <BookOpen size={16} /> Lihat detail lengkap
                       </p>
                    </div>
                  </div>
                  
                  <div className="p-6 relative">
                    <div className={`absolute top-0 right-0 transform -translate-y-1/2 mr-6 w-12 h-12 rounded-full flex items-center justify-center border-4 border-white dark:border-slate-800 shadow-md ${teacher.category === 'Guru' ? 'bg-muca-blue' : 'bg-muca-yellow'}`}>
                       {teacher.category === 'Guru' || teacher.category === 'Pimpinan' ? (
                         <GraduationCap size={20} className="text-white" />
                       ) : (
                         <Briefcase size={20} className="text-slate-900" />
                       )}
                    </div>

                    <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-1 leading-tight">{teacher.name}</h3>
                    <p className="text-muca-blue dark:text-blue-400 font-medium text-sm mb-3">{teacher.role}</p>
                    
                    {teacher.subject && (
                      <div className="inline-flex items-center gap-1.5 bg-blue-50 dark:bg-slate-700 border border-blue-100 dark:border-slate-600 px-3 py-1.5 rounded-lg text-xs font-bold text-muca-blue dark:text-blue-300 mb-4">
                        <BookOpen size={14} />
                        {teacher.subject}
                      </div>
                    )}

                    <div className="flex gap-3 mt-2 border-t border-gray-100 dark:border-gray-700 pt-4">
                       {teacher.email && (
                         <div className="text-gray-400 hover:text-muca-blue transition-colors" title="Email">
                            <Mail size={18} />
                         </div>
                       )}
                       {teacher.linkedin && (
                          <div className="text-gray-400 hover:text-blue-600 transition-colors" title="LinkedIn">
                             <Linkedin size={18} />
                          </div>
                       )}
                       <div className="ml-auto text-muca-yellow opacity-0 group-hover:opacity-100 transition-opacity">
                          <ArrowRight size={18} />
                       </div>
                    </div>
                  </div>
               </div>
             ))}
        </div>

        {!isLoading && filteredTeachers.length === 0 && (
          <div className="text-center py-24 bg-white dark:bg-slate-800 rounded-3xl border border-dashed border-gray-300 dark:border-gray-700 shadow-sm animate-fade-in-up flex flex-col items-center justify-center">
             <div className="w-24 h-24 bg-red-50 dark:bg-slate-700/50 rounded-full flex items-center justify-center mb-6 text-red-400 animate-bounce">
               <Search size={48} />
             </div>
             <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Guru/Karyawan tidak ditemukan</h3>
             <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto leading-relaxed">
               Mohon maaf, kami tidak dapat menemukan data yang cocok dengan pencarian Anda. Silakan coba kata kunci lain.
             </p>
             <button 
               onClick={() => {setSearchTerm(''); setSelectedCategory('All');}}
               className="mt-6 px-6 py-2 bg-gray-100 dark:bg-slate-700 text-slate-700 dark:text-white font-bold rounded-full hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
             >
               Reset Pencarian
             </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Teachers;
