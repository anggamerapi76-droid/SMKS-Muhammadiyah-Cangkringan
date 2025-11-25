import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingChat from './components/FloatingChat';
import Home from './pages/Home';
import Alumni from './pages/Alumni';
import BKK from './pages/BKK';
import Admin from './pages/Admin';

// Wrapper to conditionally hide Navbar/Footer on Admin pages
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen">
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
          <Route path="/berita" element={<div className="pt-32 text-center pb-20"><h1 className="text-2xl font-bold">Halaman Berita</h1><p>Daftar berita lengkap akan muncul di sini.</p></div>} />
          <Route path="/admin/login" element={<Admin />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;