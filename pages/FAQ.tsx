
import React, { useState } from 'react';
import SEO from '../components/SEO';
import { MOCK_FAQS } from '../constants';
import { ChevronDown, ChevronUp, MessageCircle } from 'lucide-react';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  const toggleFAQ = (id: string) => {
    setOpenIndex(openIndex === id ? null : id);
  };

  return (
    <div className="pt-24 pb-20 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <SEO title="FAQ" description="Pertanyaan yang sering diajukan seputar SMK Muhammadiyah Cangkringan." />

      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4 text-muca-blue dark:text-blue-300">
            <MessageCircle size={32} />
          </div>
          <h1 className="text-3xl font-serif font-bold text-slate-900 dark:text-white mb-2">Pertanyaan Umum (FAQ)</h1>
          <p className="text-gray-600 dark:text-gray-400">Temukan jawaban cepat untuk pertanyaan yang sering diajukan.</p>
        </div>

        <div className="space-y-4">
          {MOCK_FAQS.map((faq) => (
            <div 
              key={faq.id} 
              className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-lg"
            >
              <button
                className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"
                onClick={() => toggleFAQ(faq.id)}
                aria-expanded={openIndex === faq.id}
              >
                <span className="font-bold text-slate-800 dark:text-gray-100 text-lg">{faq.question}</span>
                {openIndex === faq.id ? (
                  <ChevronUp className="text-muca-blue flex-shrink-0" />
                ) : (
                  <ChevronDown className="text-gray-400 flex-shrink-0" />
                )}
              </button>
              
              <div 
                className={`px-6 text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-slate-700/50 transition-all duration-300 ease-in-out overflow-hidden ${
                  openIndex === faq.id ? 'max-h-96 py-5 opacity-100' : 'max-h-0 py-0 opacity-0'
                }`}
              >
                <p className="leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center bg-muca-blue dark:bg-slate-800 rounded-xl p-8 text-white">
          <h3 className="text-xl font-bold mb-2">Masih punya pertanyaan?</h3>
          <p className="text-blue-100 mb-6">Jangan ragu untuk menghubungi kami langsung.</p>
          <a 
            href="https://wa.me/6285163519670" 
            target="_blank" 
            rel="noreferrer"
            className="bg-white text-muca-blue px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors"
          >
            Hubungi via WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
