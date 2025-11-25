import React from 'react';
import { MOCK_JOBS } from '../constants';
import { Briefcase, MapPin, Clock, Building } from 'lucide-react';

const BKK: React.FC = () => {
  return (
    <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
      <div className="bg-slate-900 text-white py-16 mb-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h1 className="text-4xl font-serif font-bold mb-2">Bursa Kerja Khusus (BKK)</h1>
              <p className="text-gray-400">Menjembatani lulusan SMK MUCA dengan dunia industri.</p>
            </div>
            <div className="mt-6 md:mt-0">
               <button className="bg-muca-yellow text-slate-900 px-6 py-3 rounded-full font-bold hover:bg-white transition-colors">
                 Pasang Lowongan (Mitra)
               </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-28">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Briefcase size={20} className="text-muca-blue"/> Filter Lowongan
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kata Kunci</label>
                  <input type="text" placeholder="Posisi atau Perusahaan" className="w-full border p-2 rounded" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Lokasi</label>
                  <select className="w-full border p-2 rounded">
                    <option>Semua Lokasi</option>
                    <option>Yogyakarta</option>
                    <option>Jakarta</option>
                    <option>Luar Jawa</option>
                  </select>
                </div>
                <button className="w-full bg-muca-blue text-white py-2 rounded font-bold hover:bg-blue-700">Terapkan</button>
              </div>
            </div>
          </div>

          {/* Job List */}
          <div className="lg:col-span-2 space-y-4">
            {MOCK_JOBS.map((job) => (
              <div key={job.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-muca-blue flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1">{job.title}</h3>
                  <div className="flex items-center text-gray-600 mb-2 gap-4 text-sm">
                    <span className="flex items-center gap-1"><Building size={14}/> {job.company}</span>
                    <span className="flex items-center gap-1"><MapPin size={14}/> {job.location}</span>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded font-medium">{job.type}</span>
                    <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded font-medium flex items-center gap-1"><Clock size={12}/> Deadline: {job.deadline}</span>
                  </div>
                </div>
                <div className="mt-4 md:mt-0">
                  <button className="bg-slate-900 text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-slate-700 transition-colors">
                    Lamar Sekarang
                  </button>
                </div>
              </div>
            ))}
            
            {/* Promo for BKK */}
            <div className="bg-gradient-to-r from-muca-blue to-blue-600 rounded-lg p-8 text-white text-center mt-8">
              <h3 className="text-2xl font-bold mb-2">Belum menemukan yang cocok?</h3>
              <p className="mb-6">Daftarkan data diri anda di database BKK kami, agar kami bisa menghubungi jika ada lowongan yang sesuai.</p>
              <button className="bg-white text-muca-blue px-8 py-3 rounded-full font-bold shadow hover:bg-gray-100">
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