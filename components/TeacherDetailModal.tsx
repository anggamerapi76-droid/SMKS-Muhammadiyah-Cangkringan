
import React, { useEffect, useState } from 'react';
import { Teacher } from '../types';
import { X, GraduationCap, Mail, Linkedin, Briefcase, Award, Lightbulb, Star, Share2, Heart, Check } from 'lucide-react';

interface Props {
  teacher: Teacher | null;
  isOpen: boolean;
  onClose: () => void;
}

const TeacherDetailModal: React.FC<Props> = ({ teacher, isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  // Handle Escape key to close modal
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  // Reset copied state when modal opens
  useEffect(() => {
    setCopied(false);
  }, [isOpen]);

  const handleShare = () => {
    if (teacher) {
      const url = `${window.location.origin}/#/guru-karyawan?id=${teacher.id}`;
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  if (!isOpen || !teacher) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} aria-hidden="true"></div>
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-2xl relative z-10 overflow-hidden flex flex-col max-h-[90vh]">
        <div className="absolute top-4 right-4 z-20 flex gap-2">
           <button
            onClick={handleShare}
            className="bg-white/20 backdrop-blur-sm p-2 rounded-full text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors focus:ring-2 focus:ring-muca-blue"
            title="Salin Link Profil"
           >
             {copied ? <Check size={24} className="text-green-500" /> : <Share2 size={24} />}
           </button>
           <button 
             onClick={onClose}
             aria-label="Tutup Modal"
             className="bg-white/20 backdrop-blur-sm p-2 rounded-full text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors focus:ring-2 focus:ring-muca-blue"
           >
             <X size={24} />
           </button>
        </div>

        <div className="overflow-y-auto custom-scrollbar">
          {/* Header Image */}
          <div className="relative h-48 bg-muca-blue">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50"></div>
            <img 
              src={teacher.image} 
              alt=""
              className="w-full h-full object-cover opacity-50"
            />
            <div className="absolute -bottom-16 left-8 border-4 border-white dark:border-slate-800 rounded-xl overflow-hidden shadow-lg w-32 h-40 bg-gray-200">
               <img src={teacher.image} alt={teacher.name} className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="pt-20 px-8 pb-8">
            <div className="mb-6">
              <h2 id="modal-title" className="text-3xl font-bold text-slate-900 dark:text-white leading-tight">{teacher.name}</h2>
              <p className="text-muca-blue dark:text-blue-400 font-bold text-lg">{teacher.role}</p>
              {teacher.subject && (
                 <span className="inline-block mt-2 bg-muca-yellow/20 text-yellow-800 dark:text-yellow-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                   {teacher.subject}
                 </span>
              )}
            </div>

            <div className="space-y-6">
              {/* Bio */}
              <div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-gray-200 mb-2 border-b border-gray-100 dark:border-gray-700 pb-1">Tentang</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {teacher.bio || "Belum ada biografi yang ditambahkan."}
                </p>
              </div>

               {/* Teaching Philosophy */}
               {teacher.teachingPhilosophy && (
                <div className="bg-blue-50 dark:bg-slate-700/50 p-4 rounded-xl border border-blue-100 dark:border-slate-600">
                  <h3 className="text-lg font-bold text-slate-800 dark:text-gray-200 mb-2 pb-1 flex items-center gap-2">
                    <Lightbulb size={20} className="text-muca-yellow" /> Filosofi Mengajar
                  </h3>
                  <p className="text-slate-700 dark:text-gray-300 italic leading-relaxed">
                    "{teacher.teachingPhilosophy}"
                  </p>
                </div>
              )}

              {/* Hobbies */}
              {teacher.hobbies && teacher.hobbies.length > 0 && (
                <div>
                   <h3 className="text-lg font-bold text-slate-800 dark:text-gray-200 mb-2 border-b border-gray-100 dark:border-gray-700 pb-1 flex items-center gap-2">
                     <Heart size={20} className="text-red-500" /> Hobi & Minat
                   </h3>
                   <div className="flex flex-wrap gap-2">
                     {teacher.hobbies.map((hobby, idx) => (
                       <span key={idx} className="bg-pink-50 dark:bg-slate-700 text-pink-700 dark:text-pink-300 px-3 py-1 rounded-full text-sm font-medium border border-pink-100 dark:border-slate-600">
                         {hobby}
                       </span>
                     ))}
                   </div>
                </div>
              )}

              {/* Education */}
              {teacher.education && (
                <div>
                   <h3 className="text-lg font-bold text-slate-800 dark:text-gray-200 mb-2 border-b border-gray-100 dark:border-gray-700 pb-1 flex items-center gap-2">
                     <GraduationCap size={20} className="text-muca-blue dark:text-blue-400" /> Pendidikan
                   </h3>
                   <ul className="space-y-2">
                     {teacher.education.map((edu, idx) => (
                       <li key={idx} className="flex items-start gap-3 text-gray-600 dark:text-gray-300">
                         <div className="w-1.5 h-1.5 bg-muca-yellow rounded-full mt-2"></div>
                         <span>{edu}</span>
                       </li>
                     ))}
                   </ul>
                </div>
              )}

              {/* Achievements */}
              {teacher.achievements && teacher.achievements.length > 0 && (
                 <div>
                    <h3 className="text-lg font-bold text-slate-800 dark:text-gray-200 mb-2 border-b border-gray-100 dark:border-gray-700 pb-1 flex items-center gap-2">
                      <Star size={20} className="text-muca-yellow" /> Prestasi & Penghargaan
                    </h3>
                    <ul className="space-y-2">
                      {teacher.achievements.map((achievement, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-gray-600 dark:text-gray-300">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2"></div>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                 </div>
              )}

              {/* Responsibilities */}
              {teacher.responsibilities && (
                 <div>
                    <h3 className="text-lg font-bold text-slate-800 dark:text-gray-200 mb-2 border-b border-gray-100 dark:border-gray-700 pb-1 flex items-center gap-2">
                      <Award size={20} className="text-muca-blue dark:text-blue-400" /> Tanggung Jawab
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {teacher.responsibilities.map((item, idx) => (
                        <span key={idx} className="bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-200 px-3 py-1 rounded-lg text-sm font-medium">
                          {item}
                        </span>
                      ))}
                    </div>
                 </div>
              )}

              {/* Contact */}
              <div>
                 <h3 className="text-lg font-bold text-slate-800 dark:text-gray-200 mb-3 border-b border-gray-100 dark:border-gray-700 pb-1 flex items-center gap-2">
                   <Briefcase size={20} className="text-muca-blue dark:text-blue-400" /> Kontak Profesional
                 </h3>
                 <div className="flex flex-wrap gap-4">
                    {teacher.email && (
                      <a href={`mailto:${teacher.email}`} className="flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-slate-700 rounded-lg hover:bg-muca-blue hover:text-white transition-colors text-gray-700 dark:text-gray-300 text-sm font-medium">
                        <Mail size={16} /> {teacher.email}
                      </a>
                    )}
                    {teacher.linkedin && (
                      <a href={teacher.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-slate-700 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-600 hover:text-white transition-colors text-sm font-medium">
                        <Linkedin size={16} /> LinkedIn Profile
                      </a>
                    )}
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDetailModal;