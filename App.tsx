import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingChat from './components/FloatingChat';
import Home from './pages/Home';
import Alumni from './pages/Alumni';
import BKK from './pages/BKK';
import News from './pages/News';
import Admin from './pages/Admin';

// Utility to handle scrolling to top or to hash anchors
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

// Wrapper to conditionally hide Navbar/Footer on Admin pages
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollHandler />
      {!isAdminPage && <Navbar />}
      <main className="flex-grow">
        {children}
      </main>
      {!isAdminPage && <Footer />}
      {!isAdminPage && <FloatingChat />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/alumni" element={<Alumni />} />
          <Route path="/bkk" element={<BKK />} />
          <Route path="/berita" element={<News />} />
          <Route path="/admin/login" element={<Admin />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;