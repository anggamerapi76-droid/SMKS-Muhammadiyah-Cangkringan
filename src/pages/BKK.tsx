
import React, { useState, useEffect } from 'react';
import { db } from '../services/database';
import { JobListing } from '../types';
import { Briefcase, MapPin, Clock, Building, Loader2, Handshake } from 'lucide-react';
import SEO from '../components/SEO';

const BKK: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState<JobListing[]>([]);

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setJobs(db.getJobs());
      setLoading(false);
    }, 800);
  }, []);

  const BKKSkeleton = () => (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md border-l-4 border-gray-200 dark:border-gray-700 animate-pulse flex flex-col md:flex-row justify-between items-start md:items-center">
      <div className="w-full">
        <div className="h-6 bg-gray-200 dark:bg-slate-700 rounded w-1/3 mb-2"></div>
        <div className="flex gap-4 mb-2">
           <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-1/4"></div>
           <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-1/4"></div>
        </div>
        <div className="flex gap-2 mt-2">
           <div className="h-6 bg-gray-200 dark:bg-slate-700 rounded w-16"></div>
           <div className="h-6 bg-gray-200 dark:bg-slate-700 rounded w-24"></div>
        </div>
      </div>
      <div className="mt-4 md:mt-0 w-32 h-10 bg-gray-200 dark:bg-slate-700 rounded-lg"></div>
    </div>
  );

  return (
    <div className="pt-24 pb-20 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <SEO 
        title="Bursa Kerja Khusus (BKK)" 
        description="Pusat informasi lowongan kerja bagi alumni SMK Muhammadiyah Cangkringan dan masyarakat umum. Jembatan karir masa depan." 
      />

      <div className="bg-slate-900 dark:bg-slate-950 text-white py-16 mb-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h1 className="text-4xl font-serif font-bold mb-2">Bursa Kerja Khusus (BKK)</h1>
              <p className="text-gray-400">Menjembatani lulusan SMK MUCA dengan dunia industri.</p>
            </div>
            <div className="mt-6 md:mt-0">
               <a 
                 href="mailto:bkk@smkmuca.sch.id?subject=Permohonan%20Kerjasama%20Pasang%20Lowongan"
                 className="inline-flex items-center gap-2 bg-muca-blue text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition-all shadow-lg border-2 border-transparent hover:border-white/20 hover:-translate-y-1 hover:shadow-blue-500/30 duration-300"
               >
                 <Handshake size={20} />
                 Pasang Lowongan (Mitra)
               </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md sticky top-28 border border-gray-100 dark:border-gray-700">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-slate-900 dark:text-white">
                <Briefcase size={20} className="text-muca-blue"/> Filter Lowongan
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Kata Kunci</label>
                  <input type="text" placeholder="Posisi atau Perusahaan" className="w-full border dark:border-gray-600 p-2 rounded dark:bg-slate-700 dark:text-white outline-none focus:ring-2 focus:ring-muca-blue" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Lokasi</label>
                  <select className="w-full border dark:border-gray-600 p-2 rounded dark:bg-slate-700 dark:text-white outline-none focus:ring-2 focus:ring-muca-blue">
                    <option>Semua Lokasi</option>
                    <option>Yogyakarta</option>
                    <option>Jakarta</option>
                    <option>Luar Jawa</option>
                  </select>
                </div>
                <button className="w-full bg-muca-blue text-white py-2 rounded font-bold hover:bg-blue-700 transition-colors">Terapkan</button>
              </div>
            </div>
          </div>

          {/* Job List */}
          <div className="lg:col-span-2 space-y-4">
            {loading ? (
               [...Array(3)].map((_, i) => <BKKSkeleton key={i} />)
            ) : (
              jobs.map((job) => (
                <div key={job.id} className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-muca-blue flex flex-col md:flex-row justify-between items-start md:items-center">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{job.title}</h3>
                    <div className="flex items-center text-gray-600 dark:text-gray-400 mb-2 gap-4 text-sm">
                      <span className="flex items-center gap-1"><Building size={14}/> {job.company}</span>
                      <span className="flex items-center gap-1"><MapPin size={14}/> {job.location}</span>
                    </div>
                    <div className="flex gap-2 mt-2">
                      <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded font-medium">{job.type}</span>
                      <span className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 text-xs px-2 py-1 rounded font-medium flex items-center gap-1"><Clock size={12}/> Deadline: {job.deadline}</span>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <button className="bg-slate-900 dark:bg-slate-700 text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-slate-700 dark:hover:bg-slate-600 transition-colors">
                      Lamar Sekarang
                    </button>
                  </div>
                </div>
              ))
            )}
            
            <div className="bg-gradient-to-r from-muca-blue to-blue-600 rounded-lg p-8 text-white text-center mt-8 shadow-xl">
              <h3 className="text-2xl font-bold mb-2">Belum menemukan yang cocok?</h3>
              <p className="mb-6 text-blue-100">Daftarkan data diri anda di database BKK kami, agar kami bisa menghubungi jika ada lowongan yang sesuai.</p>
              <button className="bg-white text-muca-blue px-8 py-3 rounded-full font-bold shadow hover:bg-gray-100 transition-colors">
                Isi Data Pelamar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BKK;
