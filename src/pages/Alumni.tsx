
import React, { useState, useEffect } from 'react';
import { db } from '../services/database';
import { Alumni as AlumniType } from '../types';
import { Quote, UserPlus, CheckCircle } from 'lucide-react';
import SEO from '../components/SEO';

const Alumni: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [alumniList, setAlumniList] = useState<AlumniType[]>([]);

  useEffect(() => {
    setAlumniList(db.getAlumni());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => setFormSubmitted(true), 1000);
  };

  return (
    <div className="pt-24 pb-20 bg-gray-50 dark:bg-slate-900 min-h-screen transition-colors duration-300">
      <SEO 
        title="Alumni" 
        description="Jejak sukses dan testimoni alumni SMK Muhammadiyah Cangkringan. Gabung ikatan alumni untuk peluang karir." 
      />

      {/* Header */}
      <div className="bg-muca-blue dark:bg-slate-800 text-white py-20 mb-16 transition-colors">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Jejak Alumni</h1>
          <p className="text-blue-100 dark:text-gray-300 max-w-2xl mx-auto text-lg">
            Kisah sukses para lulusan SMK Muhammadiyah Cangkringan yang telah berkarya di berbagai industri.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4">
        {/* Featured Alumni Reviews */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {alumniList.map((alum) => (
            <div 
              key={alum.id} 
              className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg border-t-4 border-muca-yellow relative transition-all duration-300 transform hover:-translate-y-3 hover:shadow-2xl group"
            >
              <Quote className="absolute top-6 right-6 text-gray-100 dark:text-slate-700 group-hover:text-muca-yellow/20 transition-colors" size={48} />
              <div className="flex items-center gap-4 mb-6 relative z-10">
                <img 
                  src={alum.image} 
                  alt={alum.name} 
                  loading="lazy"
                  className="w-16 h-16 rounded-full object-cover border-2 border-muca-blue" 
                />
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-lg">{alum.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{alum.jobTitle} at {alum.company}</p>
                  <p className="text-xs text-muca-blue dark:text-blue-400 font-semibold">Lulusan {alum.graduationYear}</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 italic leading-relaxed relative z-10">"{alum.testimonial}"</p>
            </div>
          ))}
        </div>

        {/* Registration Section */}
        <div className="max-w-4xl mx-auto bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-gray-100 dark:border-gray-700">
          <div className="md:w-1/3 bg-slate-900 dark:bg-slate-950 p-8 text-white flex flex-col justify-center">
            <UserPlus size={48} className="text-muca-yellow mb-6" />
            <h3 className="text-2xl font-bold mb-4">Gabung Ikatan Alumni</h3>
            <p className="text-gray-400 mb-6">
              Tetap terhubung dengan almamater. Dapatkan informasi lowongan kerja, reuni, dan jejaring profesional.
            </p>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-400"/> Info Loker Eksklusif</li>
              <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-400"/> Undangan Reuni</li>
              <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-400"/> Networking</li>
            </ul>
          </div>
          
          <div className="md:w-2/3 p-8">
            {formSubmitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-green-600 dark:text-green-400">
                <CheckCircle size={64} className="mb-4" />
                <h3 className="text-2xl font-bold mb-2">Terima Kasih!</h3>
                <p className="text-gray-600 dark:text-gray-300">Data anda telah berhasil dikirim. Admin akan memverifikasi data anda.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Formulir Pendaftaran Alumni</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nama Lengkap</label>
                    <input type="text" required className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-muca-blue focus:border-transparent outline-none dark:bg-slate-700 dark:text-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tahun Lulus</label>
                    <input type="number" required className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-muca-blue focus:border-transparent outline-none dark:bg-slate-700 dark:text-white" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Pekerjaan Saat Ini</label>
                  <input type="text" className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-muca-blue focus:border-transparent outline-none dark:bg-slate-700 dark:text-white" placeholder="Contoh: Staff Admin" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Perusahaan / Instansi</label>
                  <input type="text" className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-muca-blue focus:border-transparent outline-none dark:bg-slate-700 dark:text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Testimoni Singkat</label>
                  <textarea rows={3} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-muca-blue focus:border-transparent outline-none dark:bg-slate-700 dark:text-white"></textarea>
                </div>
                <button type="submit" className="w-full bg-muca-blue text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-lg">
                  Kirim Data
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alumni;
