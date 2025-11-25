import React, { useState } from 'react';
import { UserRole } from '../types';
import { Lock, Settings, FileText, Users, Briefcase, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Admin: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'hanyakita99*') {
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('Username atau Password salah!');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
    navigate('/');
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
        <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-muca-blue text-white rounded-full mx-auto flex items-center justify-center mb-4">
              <Lock size={32} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">CMS SMK MUCA</h2>
            <p className="text-gray-500">Silahkan login untuk mengelola konten</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            {error && <div className="bg-red-100 text-red-600 p-3 rounded text-sm text-center">{error}</div>}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-muca-blue outline-none"
                placeholder="superadmin"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-muca-blue outline-none"
                placeholder="••••••••"
              />
            </div>
            <button type="submit" className="w-full bg-muca-blue text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-lg">
              Masuk Dashboard
            </button>
          </form>
          <div className="mt-6 text-center text-xs text-gray-400">
            &copy; CMS System v1.0 • Secure Login
          </div>
        </div>
      </div>
    );
  }

  // Dashboard View
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex-shrink-0 hidden md:block">
        <div className="p-6 border-b border-gray-700">
          <h1 className="font-bold text-xl">Admin Panel</h1>
          <p className="text-gray-400 text-sm">Superuser Access</p>
        </div>
        <nav className="p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded text-left ${activeTab === 'dashboard' ? 'bg-muca-blue' : 'hover:bg-gray-800'}`}
          >
            <Settings size={20} /> Dashboard
          </button>
          <button 
            onClick={() => setActiveTab('berita')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded text-left ${activeTab === 'berita' ? 'bg-muca-blue' : 'hover:bg-gray-800'}`}
          >
            <FileText size={20} /> Kelola Berita
          </button>
          <button 
            onClick={() => setActiveTab('alumni')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded text-left ${activeTab === 'alumni' ? 'bg-muca-blue' : 'hover:bg-gray-800'}`}
          >
            <Users size={20} /> Data Alumni
          </button>
          <button 
            onClick={() => setActiveTab('bkk')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded text-left ${activeTab === 'bkk' ? 'bg-muca-blue' : 'hover:bg-gray-800'}`}
          >
            <Briefcase size={20} /> Bursa Kerja (BKK)
          </button>
        </nav>
        <div className="absolute bottom-0 w-64 p-4 border-t border-gray-700">
          <button onClick={handleLogout} className="flex items-center gap-2 text-red-400 hover:text-red-300 w-full">
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-slate-800 capitalize">{activeTab}</h2>
          <div className="flex items-center gap-4">
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold">System Online</span>
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
          </div>
        </header>

        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow border-l-4 border-blue-500">
              <h3 className="text-gray-500 font-medium">Total Berita</h3>
              <p className="text-4xl font-bold text-slate-900 mt-2">142</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow border-l-4 border-yellow-500">
              <h3 className="text-gray-500 font-medium">Alumni Terdaftar</h3>
              <p className="text-4xl font-bold text-slate-900 mt-2">1,205</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow border-l-4 border-green-500">
              <h3 className="text-gray-500 font-medium">Lowongan Aktif</h3>
              <p className="text-4xl font-bold text-slate-900 mt-2">8</p>
            </div>
            
            <div className="col-span-full bg-white p-8 rounded-xl shadow mt-4">
              <h3 className="text-lg font-bold mb-4">Aktivitas Terkini</h3>
              <ul className="space-y-4">
                <li className="flex justify-between border-b pb-2">
                  <span>New alumni registration: <strong>Dewi Sartika</strong></span>
                  <span className="text-gray-400 text-sm">2 mins ago</span>
                </li>
                <li className="flex justify-between border-b pb-2">
                  <span>News updated: <strong>PPDB Gelombang 1</strong></span>
                  <span className="text-gray-400 text-sm">1 hour ago</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {(activeTab === 'berita' || activeTab === 'alumni' || activeTab === 'bkk') && (
          <div className="bg-white rounded-xl shadow p-12 text-center">
            <div className="bg-gray-100 w-24 h-24 rounded-full mx-auto flex items-center justify-center mb-4">
              <Settings className="text-gray-400" size={40} />
            </div>
            <h3 className="text-xl font-bold text-gray-700">Modul CMS</h3>
            <p className="text-gray-500 max-w-md mx-auto mt-2">
              Ini adalah tampilan demonstrasi Frontend. Dalam implementasi penuh, bagian ini akan terhubung ke database MySQL menggunakan Laravel API untuk CRUD (Create, Read, Update, Delete) data.
            </p>
            <button className="mt-6 bg-muca-blue text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors">
              Tambah Data Baru (Demo)
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;