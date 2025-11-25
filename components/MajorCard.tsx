
import React from 'react';
import { Major } from '../types';
import { ArrowRight } from 'lucide-react';

interface Props {
  major: Major;
}

const MajorCard: React.FC<Props> = ({ major }) => {
  return (
    <div className="group relative overflow-hidden rounded-xl shadow-lg cursor-pointer h-96 dark:border dark:border-gray-700">
      <img 
        src={major.image} 
        alt={major.name} 
        loading="lazy"
        width="400"
        height="600"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      {/* Increased opacity of gradient for dark mode readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent opacity-90 group-hover:opacity-100 transition-opacity"></div>
      
      <div className="absolute bottom-0 left-0 p-6 w-full transform transition-transform duration-500 translate-y-4 group-hover:translate-y-0">
        <div className="bg-muca-yellow w-12 h-1 mb-4 transition-all duration-500 group-hover:w-20"></div>
        <h3 className="text-3xl font-bold text-white mb-2 font-serif">{major.code}</h3>
        <h4 className="text-lg font-medium text-gray-200 mb-4 leading-tight">{major.name}</h4>
        <p className="text-gray-400 text-sm mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 line-clamp-2">
          {major.description}
        </p>
        <span className="inline-flex items-center text-muca-yellow font-bold text-sm uppercase tracking-wider gap-2">
          Selengkapnya <ArrowRight size={16} />
        </span>
      </div>
    </div>
  );
};

export default MajorCard;
