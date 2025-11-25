import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingChat from './components/FloatingChat';
import CookieConsent from './components/CookieConsent';
import Home from './pages/Home';
import Alumni from './pages/Alumni';
import BKK from './pages/BKK';
import News from './pages/News';
import NewsDetail from './pages/NewsDetail';
import Admin from './pages/Admin';
import Teachers from './pages/Teachers';
import About from './pages/About';
import CalendarPage from './pages/Calendar';
import FAQ from './pages/FAQ';

const ScrollHandler: React.FC = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-white transition-colors duration-300">
      <ScrollHandler />
      {!isAdminPage && <Navbar />}
      {/* id="main-content" added for accessibility skip link */}
      <main className="flex-grow" id="main-content">
        {children}
      </main>
      {!isAdminPage && <Footer />}
      {!isAdminPage && <FloatingChat />}
      <CookieConsent />
    </div>
  );
};

const App: React.FC = () => {
  // Initialize theme on app load
  useEffect(() => {
     const savedTheme = localStorage.getItem('theme');
     if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
       document.documentElement.classList.add('dark');
     } else {
       document.documentElement.classList.remove('dark');
     }
  }, []);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tentang" element={<About />} />
          <Route path="/alumni" element={<Alumni />} />
          <Route path="/bkk" element={<BKK />} />
          <Route path="/berita" element={<News />} />
          <Route path="/berita/:id" element={<NewsDetail />} />
          <Route path="/guru-karyawan" element={<Teachers />} />
          <Route path="/agenda" element={<CalendarPage />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/admin/login" element={<Admin />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;