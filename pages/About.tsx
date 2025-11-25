
import React from 'react';
import SEO from '../components/SEO';
import { SCHOOL_HISTORY, SCHOOL_INFO } from '../constants';
import { Target, Zap, Award, BookOpen, Users } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="pt-24 pb-20 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <SEO 
        title="Tentang Kami" 
        description="Sejarah, Visi, Misi, dan Nilai-nilai SMK Muhammadiyah Cangkringan." 
      />

      {/* Header */}
      <div className="bg-muca-blue dark:bg-slate-800 text-white py-16 mb-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-serif font-bold mb-4">Tentang Kami</h1>
          <p className="text-blue-100 max-w-2xl mx-auto">
            Mengenal lebih dekat sejarah dan cita-cita luhur SMK Muhammadiyah Cangkringan.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4">
        {/* History Section */}
        <section className="mb-20">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="text-muca-yellow" size={32} />
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Sejarah Sekolah</h2>
            </div>
            <div className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 whitespace-pre-line leading-relaxed">
              {SCHOOL_HISTORY}
            </div>
          </div>
        </section>

        {/* Visi Misi */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg border-l-4 border-muca-blue dark:border-muca-blue">
            <div className="flex items-center gap-3 mb-6">
              <Target className="text-muca-blue" size={32} />
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Visi</h3>
            </div>
            <p className="text-lg italic text-gray-600 dark:text-gray-300">
              "Terwujudnya tamatan yang berakhlak mulia, kompeten, unggul, mandiri, dan berwawasan lingkungan."
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg border-l-4 border-muca-yellow dark:border-muca-yellow">
             <div className="flex items-center gap-3 mb-6">
              <Zap className="text-muca-yellow" size={32} />
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Misi</h3>
            </div>
            <ul className="space-y-4 text-gray-600 dark:text-gray-300">
              <li className="flex gap-3">
                <span className="mt-1.5 w-2 h-2 bg-muca-yellow rounded-full shrink-0"></span>
                <span>Menyelenggarakan pendidikan berbasis nilai-nilai keislaman.</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 w-2 h-2 bg-muca-yellow rounded-full shrink-0"></span>
                <span>Mengembangkan pembelajaran berbasis kompetensi dan teknologi informasi.</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 w-2 h-2 bg-muca-yellow rounded-full shrink-0"></span>
                <span>Meningkatkan kerjasama dengan Dunia Usaha dan Dunia Industri (DUDI).</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Values */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Nilai-Nilai Kami</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Budaya kerja dan belajar di SMK MUCA</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4 text-muca-blue dark:text-blue-300">
                   <Users size={28} />
                </div>
                <h3 className="font-bold text-xl mb-2 text-slate-900 dark:text-white">Islami</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Mengedepankan adab dan akhlak mulia dalam setiap interaksi.</p>
             </div>
             <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl text-center">
                <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center mx-auto mb-4 text-muca-yellow dark:text-yellow-300">
                   <Award size={28} />
                </div>
                <h3 className="font-bold text-xl mb-2 text-slate-900 dark:text-white">Profesional</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Bekerja dan belajar dengan standar kualitas tinggi.</p>
             </div>
             <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600 dark:text-green-300">
                   <Zap size={28} />
                </div>
                <h3 className="font-bold text-xl mb-2 text-slate-900 dark:text-white">Inovatif</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Selalu beradaptasi dengan perkembangan teknologi terbaru.</p>
             </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
