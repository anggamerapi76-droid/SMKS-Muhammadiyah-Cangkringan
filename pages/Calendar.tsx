
import React, { useState } from 'react';
import SEO from '../components/SEO';
import { MOCK_EVENTS } from '../constants';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';

const CalendarPage: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Simplified calendar logic for demo purposes
  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  // Helper to find events for a specific day
  const getEventsForDay = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return MOCK_EVENTS.filter(e => e.date === dateStr);
  };

  return (
    <div className="pt-24 pb-20 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <SEO title="Agenda Sekolah" description="Kalender akademik dan agenda kegiatan SMK Muhammadiyah Cangkringan." />

      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-serif font-bold text-slate-900 dark:text-white mb-2">Kalender Akademik</h1>
          <p className="text-gray-600 dark:text-gray-400">Jadwal kegiatan belajar mengajar dan event sekolah.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar Grid */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{monthNames[month]} {year}</h2>
              <div className="flex gap-2">
                <button onClick={prevMonth} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full text-slate-600 dark:text-gray-300"><ChevronLeft /></button>
                <button onClick={nextMonth} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full text-slate-600 dark:text-gray-300"><ChevronRight /></button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-2 mb-2 text-center font-bold text-gray-500 dark:text-gray-400">
              <div>Min</div><div>Sen</div><div>Sel</div><div>Rab</div><div>Kam</div><div>Jum</div><div>Sab</div>
            </div>

            <div className="grid grid-cols-7 gap-2">
              {[...Array(firstDay)].map((_, i) => <div key={`empty-${i}`} className="h-24"></div>)}
              {[...Array(daysInMonth)].map((_, i) => {
                const day = i + 1;
                const events = getEventsForDay(day);
                const isToday = new Date().toDateString() === new Date(year, month, day).toDateString();
                
                return (
                  <div key={day} className={`h-24 border dark:border-slate-700 rounded-lg p-2 relative group hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors ${isToday ? 'bg-blue-50 dark:bg-slate-700 ring-2 ring-muca-blue' : 'bg-gray-50 dark:bg-slate-800'}`}>
                    <span className={`text-sm font-medium ${isToday ? 'text-muca-blue font-bold' : 'text-gray-700 dark:text-gray-300'}`}>{day}</span>
                    <div className="mt-1 flex flex-col gap-1 overflow-y-auto max-h-[70%] custom-scrollbar">
                      {events.map(event => (
                        <div key={event.id} className={`text-[10px] px-1 py-0.5 rounded truncate text-white ${
                            event.type === 'Holiday' ? 'bg-red-500' : 
                            event.type === 'Academic' ? 'bg-blue-500' : 'bg-green-500'
                          }`}
                          title={event.title}
                        >
                          {event.title}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Upcoming Events List */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 h-fit">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <CalendarIcon className="text-muca-yellow" /> Agenda Mendatang
            </h3>
            <div className="space-y-4">
              {MOCK_EVENTS.slice(0, 5).map(event => (
                <div key={event.id} className="flex gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 border-b border-gray-100 dark:border-gray-700 last:border-0">
                   <div className="flex-shrink-0 w-12 text-center">
                      <span className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">{new Date(event.date).toLocaleString('default', { month: 'short' })}</span>
                      <span className="block text-xl font-bold text-muca-blue">{new Date(event.date).getDate()}</span>
                   </div>
                   <div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm">{event.title}</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{event.description || event.type}</p>
                   </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
