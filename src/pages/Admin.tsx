
import React, { useState, useEffect } from 'react';
import { UserRole, SiteSettings, User, Teacher, NewsItem, Alumni, JobListing, Major, GalleryItem } from '../types';
import { 
  Lock, Settings, FileText, Users, Briefcase, LogOut, 
  Save, Plus, Trash2, CheckCircle, AlertCircle, LayoutDashboard,
  Image as ImageIcon, Globe, Shield, UserCog, Edit, X, Layers, Info, Eye, EyeOff, Menu
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import ImageUpload from '../components/ImageUpload';
import ThemeToggle from '../components/ThemeToggle';
import { db } from '../services/database';

const Admin: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Mobile menu state
  const navigate = useNavigate();
  const [toast, setToast] = useState<{message: string, type: 'success' | 'error'} | null>(null);

  // --- CMS STATES (INITIALIZED FROM DB) ---
  const [settings, setSettings] = useState<SiteSettings>(db.getSettings());
  const [users, setUsers] = useState<User[]>(db.getUsers());
  const [teachers, setTeachers] = useState<Teacher[]>(db.getTeachers());
  const [majorsList, setMajorsList] = useState<Major[]>(db.getMajors());
  const [newsList, setNewsList] = useState<NewsItem[]>(db.getNews());
  const [alumniList, setAlumniList] = useState<Alumni[]>(db.getAlumni());
  const [jobList, setJobList] = useState<JobListing[]>(db.getJobs());

  // Edit States
  const [newUser, setNewUser] = useState({ name: '', username: '', role: UserRole.CONTENT_ADMIN });
  const [showAddUser, setShowAddUser] = useState(false);
  
  const [isEditingStaff, setIsEditingStaff] = useState(false);
  const [editingStaffId, setEditingStaffId] = useState<string | null>(null);
  
  const [isEditingMajor, setIsEditingMajor] = useState(false);
  const [editingMajorId, setEditingMajorId] = useState<string | null>(null);
  const [majorForm, setMajorForm] = useState<Major>({ id: '', code: '', name: '', description: '', category: 'OTOMOTIF', image: '' });

  const [isEditingNews, setIsEditingNews] = useState(false);
  const [editingNewsId, setEditingNewsId] = useState<string | null>(null);
  const [newsForm, setNewsForm] = useState<NewsItem>({ id: '', title: '', category: 'Kegiatan', date: '', excerpt: '', content: '', image: '' });

  const [isEditingAlumni, setIsEditingAlumni] = useState(false);
  const [editingAlumniId, setEditingAlumniId] = useState<string | null>(null);
  const [alumniForm, setAlumniForm] = useState<Alumni>({ id: '', name: '', graduationYear: '', jobTitle: '', company: '', testimonial: '', image: '' });

  const [isEditingJob, setIsEditingJob] = useState(false);
  const [editingJobId, setEditingJobId] = useState<string | null>(null);
  const [jobForm, setJobForm] = useState<JobListing>({ id: '', title: '', company: '', location: '', deadline: '', type: 'Full-time' });

  const [newGalleryItem, setNewGalleryItem] = useState({ image: '', caption: '' });

  const initialStaffForm: Teacher = {
    id: '', name: '', role: '', category: 'Guru', image: '', subject: '', bio: '', email: '', linkedin: '', education: [], responsibilities: [], achievements: [], hobbies: [], teachingPhilosophy: ''
  };
  const [staffForm, setStaffForm] = useState<Teacher>(initialStaffForm);

  // --- HANDLERS ---

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

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

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false); // Close mobile menu on selection
  };

  // PERSISTENCE WRAPPERS
  const saveAndSetSettings = (newSettings: SiteSettings) => {
    setSettings(newSettings);
    db.saveSettings(newSettings);
  };
  const saveAndSetUsers = (newUsers: User[]) => {
    setUsers(newUsers);
    db.saveUsers(newUsers);
  };
  const saveAndSetTeachers = (newTeachers: Teacher[]) => {
    setTeachers(newTeachers);
    db.saveTeachers(newTeachers);
  };
  const saveAndSetMajors = (newMajors: Major[]) => {
    setMajorsList(newMajors);
    db.saveMajors(newMajors);
  };
  const saveAndSetNews = (newNews: NewsItem[]) => {
    setNewsList(newNews);
    db.saveNews(newNews);
  };
  const saveAndSetAlumni = (newAlumni: Alumni[]) => {
    setAlumniList(newAlumni);
    db.saveAlumni(newAlumni);
  };
  const saveAndSetJobs = (newJobs: JobListing[]) => {
    setJobList(newJobs);
    db.saveJobs(newJobs);
  };


  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    saveAndSetSettings(settings);
    showToast("Pengaturan website berhasil disimpan!");
  };

  // Gallery
  const handleAddGalleryItem = () => {
    if (!newGalleryItem.image) return showToast("Mohon upload foto terlebih dahulu", "error");
    const newItem: GalleryItem = {
      id: Date.now().toString(),
      image: newGalleryItem.image,
      caption: newGalleryItem.caption || 'Tanpa Keterangan'
    };
    saveAndSetSettings({
      ...settings,
      gallery: [...settings.gallery, newItem]
    });
    setNewGalleryItem({ image: '', caption: '' });
    showToast("Foto berhasil ditambahkan ke galeri");
  };

  const handleDeleteGalleryItem = (id: string) => {
    if (confirm("Hapus foto ini dari galeri?")) {
      saveAndSetSettings({
        ...settings,
        gallery: settings.gallery.filter(item => item.id !== id)
      });
    }
  };

  const handleUpdateGalleryCaption = (id: string, caption: string) => {
    saveAndSetSettings({
      ...settings,
      gallery: settings.gallery.map(item => item.id === id ? { ...item, caption } : item)
    });
  };

  // Users
  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUser.name || !newUser.username) return;
    const user: User = {
      id: Date.now().toString(),
      name: newUser.name,
      username: newUser.username,
      role: newUser.role,
      lastLogin: '-'
    };
    saveAndSetUsers([...users, user]);
    setNewUser({ name: '', username: '', role: UserRole.CONTENT_ADMIN });
    setShowAddUser(false);
    showToast("Pengguna baru berhasil ditambahkan!");
  };

  const handleDeleteUser = (id: string) => {
    if (confirm("Apakah anda yakin ingin menghapus pengguna ini?")) {
      saveAndSetUsers(users.filter(u => u.id !== id));
      showToast("Pengguna berhasil dihapus.");
    }
  };

  // Staff
  const handleSaveStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingStaffId) {
      saveAndSetTeachers(teachers.map(t => t.id === editingStaffId ? staffForm : t));
      showToast("Data staf diperbarui.");
    } else {
      saveAndSetTeachers([...teachers, { ...staffForm, id: Date.now().toString() }]);
      showToast("Staf baru ditambahkan.");
    }
    setIsEditingStaff(false);
  };
  const handleDeleteStaff = (id: string) => {
    if(confirm("Hapus data ini?")) {
        saveAndSetTeachers(teachers.filter(t => t.id !== id));
        showToast("Data dihapus");
    }
  }

  // Majors
  const handleSaveMajor = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingMajorId) {
      saveAndSetMajors(majorsList.map(m => m.id === editingMajorId ? majorForm : m));
      showToast("Jurusan diperbarui.");
    } else {
      saveAndSetMajors([...majorsList, { ...majorForm, id: Date.now().toString() }]);
      showToast("Jurusan ditambahkan.");
    }
    setIsEditingMajor(false);
  };
  const handleDeleteMajor = (id: string) => {
    if(confirm("Hapus jurusan?")) {
        saveAndSetMajors(majorsList.filter(m => m.id !== id));
        showToast("Jurusan dihapus");
    }
  }

  // News
  const handleSaveNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingNewsId) {
      saveAndSetNews(newsList.map(n => n.id === editingNewsId ? newsForm : n));
      showToast("Berita diperbarui.");
    } else {
      saveAndSetNews([newsForm, ...newsList]);
      showToast("Berita diterbitkan.");
    }
    setIsEditingNews(false);
  };
  const handleDeleteNews = (id: string) => {
    if(confirm("Hapus berita?")) {
        saveAndSetNews(newsList.filter(n => n.id !== id));
        showToast("Berita dihapus");
    }
  }

  // Alumni
  const handleSaveAlumni = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingAlumniId) {
      saveAndSetAlumni(alumniList.map(a => a.id === editingAlumniId ? alumniForm : a));
      showToast("Data alumni diperbarui.");
    } else {
      saveAndSetAlumni([alumniForm, ...alumniList]);
      showToast("Alumni ditambahkan.");
    }
    setIsEditingAlumni(false);
  };
  const handleDeleteAlumni = (id: string) => {
    if(confirm("Hapus alumni?")) {
        saveAndSetAlumni(alumniList.filter(a => a.id !== id));
        showToast("Alumni dihapus");
    }
  }

  // Jobs
  const handleSaveJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingJobId) {
      saveAndSetJobs(jobList.map(j => j.id === editingJobId ? jobForm : j));
      showToast("Lowongan diperbarui.");
    } else {
      saveAndSetJobs([jobForm, ...jobList]);
      showToast("Lowongan ditambahkan.");
    }
    setIsEditingJob(false);
  };
  const handleDeleteJob = (id: string) => {
    if(confirm("Hapus lowongan?")) {
        saveAndSetJobs(jobList.filter(j => j.id !== id));
        showToast("Lowongan dihapus");
    }
  }

  // --- COMMON STYLES ---
  const inputClass = "w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-muca-blue outline-none text-slate-900 dark:text-white bg-white dark:bg-slate-700 transition-colors placeholder-gray-400 dark:placeholder-gray-500";
  const labelClass = "block text-sm font-bold text-slate-900 dark:text-white mb-2";
  const cardClass = "bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden transition-colors";

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
        <SEO title="Admin Login" description="Halaman Login Administrator" />
        <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-muca-blue text-white rounded-full mx-auto flex items-center justify-center mb-4">
              <Lock size={32} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">CMS SMK MUCA</h2>
            <p className="text-gray-500">Silahkan login untuk mengelola konten</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            {error && <div className="bg-red-100 text-red-600 p-3 rounded text-sm text-center flex items-center justify-center gap-2"><AlertCircle size={16}/>{error}</div>}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input 
                type="text" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-muca-blue outline-none bg-white text-slate-900 placeholder-gray-400" 
                placeholder="superadmin" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-muca-blue outline-none bg-white text-slate-900 placeholder-gray-400 pr-12" 
                  placeholder="••••••••" 
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            <button type="submit" className="w-full bg-muca-blue text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-lg flex items-center justify-center gap-2">
              <Lock size={18} /> Masuk Dashboard
            </button>
          </form>
          <div className="mt-6 text-center text-xs text-gray-400">&copy; {new Date().getFullYear()} CMS System v2.0 • Secure Login</div>
        </div>
      </div>
    );
  }

  // Handlers for switching modes
  const handleEditMajor = (item: Major) => {
    setMajorForm(item);
    setEditingMajorId(item.id);
    setIsEditingMajor(true);
  }
  const handleCreateMajor = () => {
    setMajorForm({ id: Date.now().toString(), code: '', name: '', description: '', category: 'OTOMOTIF', image: '' });
    setEditingMajorId(null);
    setIsEditingMajor(true);
  }

  const handleEditStaff = (item: Teacher) => {
    setStaffForm(item);
    setEditingStaffId(item.id);
    setIsEditingStaff(true);
  }
  const handleCreateStaff = () => {
    setStaffForm({ ...initialStaffForm, id: Date.now().toString() });
    setEditingStaffId(null);
    setIsEditingStaff(true);
  }

  const handleEditNews = (item: NewsItem) => {
    setNewsForm(item);
    setEditingNewsId(item.id);
    setIsEditingNews(true);
  }
  const handleCreateNews = () => {
    setNewsForm({ id: Date.now().toString(), title: '', category: 'Kegiatan', date: new Date().toISOString().split('T')[0], excerpt: '', content: '', image: '' });
    setEditingNewsId(null);
    setIsEditingNews(true);
  }

  const handleEditAlumni = (item: Alumni) => {
    setAlumniForm(item);
    setEditingAlumniId(item.id);
    setIsEditingAlumni(true);
  }
  const handleCreateAlumni = () => {
    setAlumniForm({ id: Date.now().toString(), name: '', graduationYear: '', jobTitle: '', company: '', testimonial: '', image: '' });
    setEditingAlumniId(null);
    setIsEditingAlumni(true);
  }

  const handleEditJob = (item: JobListing) => {
    setJobForm(item);
    setEditingJobId(item.id);
    setIsEditingJob(true);
  }
  const handleCreateJob = () => {
    setJobForm({ id: Date.now().toString(), title: '', company: '', location: '', deadline: '', type: 'Full-time' });
    setEditingJobId(null);
    setIsEditingJob(true);
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-950 flex font-sans transition-colors duration-300">
      <SEO title="Admin Dashboard" description="CMS SMK MUCA" />
      
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-4 right-4 z-[60] px-6 py-3 rounded-lg shadow-xl text-white font-medium animate-fade-in-up flex items-center gap-2 ${toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
          {toast.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
          {toast.message}
        </div>
      )}

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black/50 backdrop-blur-sm md:hidden" 
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside className={`fixed inset-y-0 left-0 z-30 w-64 bg-slate-900 border-r border-slate-800 text-white flex-col h-screen transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:flex-shrink-0 ${isMobileMenuOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-muca-yellow rounded-lg flex items-center justify-center text-slate-900 font-bold text-xs">CMS</div>
            <div><h1 className="font-bold text-lg leading-tight">Admin Panel</h1><p className="text-gray-500 text-xs">v2.0.1 (Beta)</p></div>
          </div>
          <button onClick={() => setIsMobileMenuOpen(false)} className="md:hidden text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>
        <nav className="p-4 space-y-1 overflow-y-auto flex-grow custom-scrollbar">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 px-4 mt-2">Main Menu</p>
          <button onClick={() => handleTabChange('dashboard')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${activeTab === 'dashboard' ? 'bg-muca-blue text-white shadow-lg' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}><LayoutDashboard size={18} /> Dashboard</button>
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 px-4 mt-6">Content</p>
          <button onClick={() => handleTabChange('majors')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${activeTab === 'majors' ? 'bg-muca-blue text-white shadow-lg' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}><Layers size={18} /> Jurusan</button>
          <button onClick={() => handleTabChange('staff')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${activeTab === 'staff' ? 'bg-muca-blue text-white shadow-lg' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}><UserCog size={18} /> Staff & Guru</button>
          <button onClick={() => handleTabChange('berita')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${activeTab === 'berita' ? 'bg-muca-blue text-white shadow-lg' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}><FileText size={18} /> Kelola Berita</button>
          <button onClick={() => handleTabChange('alumni')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${activeTab === 'alumni' ? 'bg-muca-blue text-white shadow-lg' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}><Users size={18} /> Data Alumni</button>
          <button onClick={() => handleTabChange('bkk')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${activeTab === 'bkk' ? 'bg-muca-blue text-white shadow-lg' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}><Briefcase size={18} /> Bursa Kerja (BKK)</button>
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 px-4 mt-6">System</p>
          <button onClick={() => handleTabChange('settings')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${activeTab === 'settings' ? 'bg-muca-blue text-white shadow-lg' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}><Settings size={18} /> Pengaturan Website</button>
          <button onClick={() => handleTabChange('users')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${activeTab === 'users' ? 'bg-muca-blue text-white shadow-lg' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}><Shield size={18} /> Manajemen User</button>
        </nav>
        <div className="p-4 border-t border-gray-800">
          <button onClick={handleLogout} className="flex items-center gap-2 text-red-400 hover:text-red-300 hover:bg-red-900/20 w-full px-4 py-3 rounded-lg transition-colors"><LogOut size={18} /> Logout</button>
        </div>
      </aside>

      <main className="flex-1 md:ml-0 p-4 md:p-8 overflow-y-auto h-screen custom-scrollbar relative z-10 w-full">
        <header className="flex justify-between items-center mb-8 sticky top-0 bg-gray-100/95 dark:bg-slate-950/95 backdrop-blur z-20 py-2">
          <div className="flex items-center gap-4">
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-slate-700 dark:text-white hover:bg-gray-200 dark:hover:bg-slate-800 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
            <div>
               <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white capitalize flex items-center gap-2">
                {activeTab === 'dashboard' && "Dashboard Overview"}
                {activeTab !== 'dashboard' && activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <div className="text-right hidden sm:block">
               <p className="text-sm font-bold text-slate-800 dark:text-white">Super Admin</p>
               <p className="text-xs text-green-600 dark:text-green-400 flex items-center justify-end gap-1"><span className="w-2 h-2 bg-green-500 rounded-full"></span> Online</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-tr from-muca-blue to-blue-400 rounded-full flex items-center justify-center text-white font-bold shadow-lg">SA</div>
          </div>
        </header>

        {/* --- DYNAMIC CONTENT RENDERING --- */}
        {activeTab === 'dashboard' && (
           <div className="grid grid-cols-1 md:grid-cols-4 gap-6 animate-fade-in">
              <div className={cardClass + " p-6"}>
                 <p className="text-sm text-gray-500 dark:text-gray-400">Total Berita</p>
                 <p className="text-3xl font-bold text-slate-900 dark:text-white">{newsList.length}</p>
              </div>
              <div className={cardClass + " p-6"}>
                 <p className="text-sm text-gray-500 dark:text-gray-400">Total Staff</p>
                 <p className="text-3xl font-bold text-slate-900 dark:text-white">{teachers.length}</p>
              </div>
              <div className={cardClass + " p-6"}>
                 <p className="text-sm text-gray-500 dark:text-gray-400">Total Jurusan</p>
                 <p className="text-3xl font-bold text-slate-900 dark:text-white">{majorsList.length}</p>
              </div>
              <div className={cardClass + " p-6"}>
                 <p className="text-sm text-gray-500 dark:text-gray-400">Lowongan BKK</p>
                 <p className="text-3xl font-bold text-slate-900 dark:text-white">{jobList.length}</p>
              </div>
           </div>
        )}

        {/* MAJORS TAB */}
        {activeTab === 'majors' && (
          <div className="animate-fade-in">
             {!isEditingMajor ? (
              <div className={cardClass}>
                <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex flex-col md:flex-row justify-between items-start md:items-center bg-gray-50/50 dark:bg-slate-900/50 gap-4">
                   <div><h3 className="text-lg font-bold text-slate-800 dark:text-white">Pilihan Jurusan Masa Depan</h3><p className="text-gray-500 dark:text-gray-400 text-sm">Kelola program keahlian yang ditampilkan di beranda.</p></div>
                   <button onClick={handleCreateMajor} className="bg-muca-blue text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-blue-700 flex items-center gap-2 w-full md:w-auto justify-center"><Plus size={18} /> Tambah Jurusan</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left min-w-[600px]">
                     <thead className="bg-gray-50 dark:bg-slate-900 border-b border-gray-100 dark:border-gray-700"><tr><th className="p-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Kode</th><th className="p-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Nama Jurusan</th><th className="p-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Kategori</th><th className="p-4 text-right">Aksi</th></tr></thead>
                     <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                        {majorsList.map(item => (
                           <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50">
                              <td className="p-4 font-bold text-slate-800 dark:text-white">{item.code}</td>
                              <td className="p-4 text-gray-700 dark:text-gray-300 flex items-center gap-3">
                                 <img src={item.image} alt="" className="w-10 h-10 rounded-lg object-cover bg-gray-200 dark:bg-slate-600" />
                                 {item.name}
                              </td>
                              <td className="p-4"><span className="text-xs px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-bold">{item.category}</span></td>
                              <td className="p-4 text-right"><div className="flex justify-end gap-2"><button onClick={() => handleEditMajor(item)} className="text-blue-500 dark:text-blue-400 p-2"><Edit size={18}/></button><button onClick={() => handleDeleteMajor(item.id)} className="text-red-500 dark:text-red-400 p-2"><Trash2 size={18}/></button></div></td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className={cardClass + " p-8 animate-fade-in-up"}>
                 <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100 dark:border-gray-700">
                    <div>
                      <h3 className="text-xl font-bold text-slate-800 dark:text-white">{editingMajorId ? 'Edit Jurusan' : 'Tambah Jurusan Baru'}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Isi detail kompetensi keahlian</p>
                    </div>
                    <button onClick={() => setIsEditingMajor(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"><X size={24}/></button>
                 </div>
                 <form onSubmit={handleSaveMajor} className="space-y-6">
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                       <h4 className="font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2"><Info size={18} className="text-muca-blue dark:text-blue-400"/> Informasi Dasar</h4>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className={labelClass}>Kode Jurusan</label>
                            <input type="text" required value={majorForm.code} onChange={e => setMajorForm({...majorForm, code: e.target.value})} className={inputClass} placeholder="Contoh: TKRO" />
                          </div>
                          <div>
                            <label className={labelClass}>Kategori Bidang</label>
                            <select value={majorForm.category} onChange={e => setMajorForm({...majorForm, category: e.target.value as any})} className={inputClass}>
                                <option value="OTOMOTIF">OTOMOTIF</option>
                                <option value="BISNIS">BISNIS</option>
                                <option value="TATA BUSANA">TATA BUSANA</option>
                            </select>
                          </div>
                          <div className="col-span-full">
                            <label className={labelClass}>Nama Lengkap Jurusan</label>
                            <input type="text" required value={majorForm.name} onChange={e => setMajorForm({...majorForm, name: e.target.value})} className={inputClass} />
                          </div>
                       </div>
                    </div>

                    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                       <h4 className="font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2"><ImageIcon size={18} className="text-muca-blue dark:text-blue-400"/> Visual & Deskripsi</h4>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                             <ImageUpload 
                               label="Foto Ilustrasi Jurusan" 
                               currentImage={majorForm.image} 
                               onImageChange={(base64) => setMajorForm({...majorForm, image: base64})} 
                             />
                          </div>
                          <div>
                            <label className={labelClass}>Deskripsi Singkat</label>
                            <textarea rows={4} required value={majorForm.description} onChange={e => setMajorForm({...majorForm, description: e.target.value})} className={inputClass} placeholder="Jelaskan kompetensi keahlian..."></textarea>
                          </div>
                       </div>
                    </div>
                    <div className="flex justify-end gap-4 flex-col md:flex-row">
                       <button type="button" onClick={() => setIsEditingMajor(false)} className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg font-bold text-gray-600 dark:text-gray-300">Batal</button>
                       <button type="submit" className="px-6 py-2 bg-muca-blue text-white rounded-lg font-bold hover:bg-blue-700 shadow-lg flex items-center gap-2 justify-center"><Save size={18}/> Simpan Data</button>
                    </div>
                 </form>
              </div>
            )}
          </div>
        )}

        {/* STAFF TAB */}
        {activeTab === 'staff' && (
           <div className="animate-fade-in">
             {!isEditingStaff ? (
                <div className={cardClass}>
                  <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex flex-col md:flex-row justify-between items-start md:items-center bg-gray-50/50 dark:bg-slate-900/50 gap-4">
                     <div><h3 className="text-lg font-bold text-slate-800 dark:text-white">Direktori Guru & Karyawan</h3><p className="text-gray-500 dark:text-gray-400 text-sm">Kelola data tenaga pendidik dan kependidikan.</p></div>
                     <button onClick={handleCreateStaff} className="bg-muca-blue text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-blue-700 flex items-center gap-2 w-full md:w-auto justify-center"><Plus size={18} /> Tambah Staff</button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[600px]">
                       <thead className="bg-gray-50 dark:bg-slate-900 border-b border-gray-100 dark:border-gray-700"><tr><th className="p-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Nama Lengkap</th><th className="p-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Jabatan</th><th className="p-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Kategori</th><th className="p-4 text-right">Aksi</th></tr></thead>
                       <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                          {teachers.map(item => (
                             <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50">
                                <td className="p-4 text-gray-700 dark:text-gray-300 flex items-center gap-3">
                                   <img src={item.image} alt="" className="w-8 h-8 rounded-full object-cover bg-gray-200 dark:bg-slate-600" />
                                   {item.name}
                                </td>
                                <td className="p-4 text-gray-700 dark:text-gray-300">{item.role}</td>
                                <td className="p-4"><span className="text-xs px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-bold">{item.category}</span></td>
                                <td className="p-4 text-right"><div className="flex justify-end gap-2"><button onClick={() => handleEditStaff(item)} className="text-blue-500 dark:text-blue-400 p-2"><Edit size={18}/></button><button onClick={() => handleDeleteStaff(item.id)} className="text-red-500 dark:text-red-400 p-2"><Trash2 size={18}/></button></div></td>
                             </tr>
                          ))}
                       </tbody>
                    </table>
                  </div>
                </div>
             ) : (
                <div className={cardClass + " p-8 animate-fade-in-up"}>
                  <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100 dark:border-gray-700">
                     <h3 className="text-xl font-bold text-slate-800 dark:text-white">{editingStaffId ? 'Edit Data Staff' : 'Tambah Staff Baru'}</h3>
                     <button onClick={() => setIsEditingStaff(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"><X size={24}/></button>
                  </div>
                  <form onSubmit={handleSaveStaff} className="space-y-6">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                           <label className={labelClass}>Nama Lengkap</label>
                           <input type="text" required value={staffForm.name} onChange={e => setStaffForm({...staffForm, name: e.target.value})} className={inputClass} />
                        </div>
                        <div>
                           <label className={labelClass}>Jabatan</label>
                           <input type="text" required value={staffForm.role} onChange={e => setStaffForm({...staffForm, role: e.target.value})} className={inputClass} />
                        </div>
                        <div>
                           <label className={labelClass}>Kategori</label>
                           <select value={staffForm.category} onChange={e => setStaffForm({...staffForm, category: e.target.value as any})} className={inputClass}>
                              <option value="Guru">Guru</option>
                              <option value="Pimpinan">Pimpinan</option>
                              <option value="Karyawan">Karyawan</option>
                           </select>
                        </div>
                        <div>
                           <label className={labelClass}>Mata Pelajaran (Opsional)</label>
                           <input type="text" value={staffForm.subject || ''} onChange={e => setStaffForm({...staffForm, subject: e.target.value})} className={inputClass} />
                        </div>
                        <div className="col-span-full">
                           <label className={labelClass}>Biografi Singkat</label>
                           <textarea rows={3} value={staffForm.bio || ''} onChange={e => setStaffForm({...staffForm, bio: e.target.value})} className={inputClass}></textarea>
                        </div>
                        <div>
                           <ImageUpload label="Foto Profil" currentImage={staffForm.image} onImageChange={(base64) => setStaffForm({...staffForm, image: base64})} />
                        </div>
                     </div>
                     <div className="flex justify-end gap-4 mt-6 flex-col md:flex-row">
                        <button type="button" onClick={() => setIsEditingStaff(false)} className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg font-bold text-gray-600 dark:text-gray-300">Batal</button>
                        <button type="submit" className="px-6 py-2 bg-muca-blue text-white rounded-lg font-bold hover:bg-blue-700 shadow-lg flex items-center gap-2 justify-center"><Save size={18}/> Simpan</button>
                     </div>
                  </form>
                </div>
             )}
           </div>
        )}

        {/* NEWS TAB */}
        {activeTab === 'berita' && (
           <div className="animate-fade-in">
             {!isEditingNews ? (
                <div className={cardClass}>
                   <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex flex-col md:flex-row justify-between items-start md:items-center bg-gray-50/50 dark:bg-slate-900/50 gap-4">
                     <div><h3 className="text-lg font-bold text-slate-800 dark:text-white">Daftar Berita & Artikel</h3></div>
                     <button onClick={handleCreateNews} className="bg-muca-blue text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-blue-700 flex items-center gap-2 w-full md:w-auto justify-center"><Plus size={18} /> Tambah Berita</button>
                   </div>
                   <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[600px]">
                        <thead className="bg-gray-50 dark:bg-slate-900 border-b border-gray-100 dark:border-gray-700"><tr><th className="p-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Judul</th><th className="p-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Tanggal</th><th className="p-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Kategori</th><th className="p-4 text-right">Aksi</th></tr></thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                            {newsList.map(item => (
                                <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50">
                                <td className="p-4 text-gray-700 dark:text-gray-300 font-medium truncate max-w-xs">{item.title}</td>
                                <td className="p-4 text-gray-600 dark:text-gray-400">{item.date}</td>
                                <td className="p-4"><span className="text-xs px-2 py-1 rounded-full bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 font-bold">{item.category}</span></td>
                                <td className="p-4 text-right"><div className="flex justify-end gap-2"><button onClick={() => handleEditNews(item)} className="text-blue-500 dark:text-blue-400 p-2"><Edit size={18}/></button><button onClick={() => handleDeleteNews(item.id)} className="text-red-500 dark:text-red-400 p-2"><Trash2 size={18}/></button></div></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                   </div>
                </div>
             ) : (
                <div className={cardClass + " p-8 animate-fade-in-up"}>
                   <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-bold text-slate-800 dark:text-white">{editingNewsId ? 'Edit Berita' : 'Tulis Berita Baru'}</h3>
                      <button onClick={() => setIsEditingNews(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"><X size={24}/></button>
                   </div>
                   <form onSubmit={handleSaveNews} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div className="col-span-full">
                            <label className={labelClass}>Judul Berita</label>
                            <input type="text" required value={newsForm.title} onChange={e => setNewsForm({...newsForm, title: e.target.value})} className={inputClass} />
                         </div>
                         <div>
                            <label className={labelClass}>Kategori</label>
                            <input type="text" required value={newsForm.category} onChange={e => setNewsForm({...newsForm, category: e.target.value})} className={inputClass} />
                         </div>
                         <div>
                            <label className={labelClass}>Tanggal</label>
                            <input type="date" required value={newsForm.date} onChange={e => setNewsForm({...newsForm, date: e.target.value})} className={inputClass} />
                         </div>
                         <div className="col-span-full">
                            <label className={labelClass}>Ringkasan (Excerpt)</label>
                            <textarea rows={2} required value={newsForm.excerpt} onChange={e => setNewsForm({...newsForm, excerpt: e.target.value})} className={inputClass}></textarea>
                         </div>
                         <div className="col-span-full">
                            <label className={labelClass}>Konten Lengkap (HTML Supported)</label>
                            <textarea rows={8} required value={newsForm.content} onChange={e => setNewsForm({...newsForm, content: e.target.value})} className={inputClass + " font-mono text-sm"}></textarea>
                         </div>
                         <div>
                            <ImageUpload label="Gambar Utama" currentImage={newsForm.image} onImageChange={(base64) => setNewsForm({...newsForm, image: base64})} />
                         </div>
                      </div>
                      <div className="flex justify-end gap-4 mt-6 flex-col md:flex-row">
                        <button type="button" onClick={() => setIsEditingNews(false)} className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg font-bold text-gray-600 dark:text-gray-300">Batal</button>
                        <button type="submit" className="px-6 py-2 bg-muca-blue text-white rounded-lg font-bold hover:bg-blue-700 shadow-lg flex items-center gap-2 justify-center"><Save size={18}/> Publish</button>
                      </div>
                   </form>
                </div>
             )}
           </div>
        )}

        {/* ALUMNI TAB */}
        {activeTab === 'alumni' && (
           <div className="animate-fade-in">
             {!isEditingAlumni ? (
                <div className={cardClass}>
                   <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex flex-col md:flex-row justify-between items-start md:items-center bg-gray-50/50 dark:bg-slate-900/50 gap-4">
                      <div><h3 className="text-lg font-bold text-slate-800 dark:text-white">Data Alumni Sukses</h3></div>
                      <button onClick={handleCreateAlumni} className="bg-muca-blue text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-blue-700 flex items-center gap-2 w-full md:w-auto justify-center"><Plus size={18} /> Tambah Alumni</button>
                   </div>
                   <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[600px]">
                        <thead className="bg-gray-50 dark:bg-slate-900 border-b border-gray-100 dark:border-gray-700"><tr><th className="p-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Nama</th><th className="p-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Lulusan</th><th className="p-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Pekerjaan</th><th className="p-4 text-right">Aksi</th></tr></thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                            {alumniList.map(item => (
                                <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50">
                                <td className="p-4 flex items-center gap-3 dark:text-gray-300"><img src={item.image} className="w-8 h-8 rounded-full bg-gray-200" alt=""/>{item.name}</td>
                                <td className="p-4 dark:text-gray-300">{item.graduationYear}</td>
                                <td className="p-4 dark:text-gray-300">{item.jobTitle} at {item.company}</td>
                                <td className="p-4 text-right"><div className="flex justify-end gap-2"><button onClick={() => handleEditAlumni(item)} className="text-blue-500 p-2"><Edit size={18}/></button><button onClick={() => handleDeleteAlumni(item.id)} className="text-red-500 p-2"><Trash2 size={18}/></button></div></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                   </div>
                </div>
             ) : (
                <div className={cardClass + " p-8 animate-fade-in-up"}>
                   <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-bold text-slate-800 dark:text-white">{editingAlumniId ? 'Edit Data Alumni' : 'Tambah Alumni Baru'}</h3>
                      <button onClick={() => setIsEditingAlumni(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"><X size={24}/></button>
                   </div>
                   <form onSubmit={handleSaveAlumni} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div><label className={labelClass}>Nama Lengkap</label><input type="text" required value={alumniForm.name} onChange={e => setAlumniForm({...alumniForm, name: e.target.value})} className={inputClass} /></div>
                         <div><label className={labelClass}>Tahun Lulus</label><input type="text" required value={alumniForm.graduationYear} onChange={e => setAlumniForm({...alumniForm, graduationYear: e.target.value})} className={inputClass} /></div>
                         <div><label className={labelClass}>Pekerjaan</label><input type="text" required value={alumniForm.jobTitle} onChange={e => setAlumniForm({...alumniForm, jobTitle: e.target.value})} className={inputClass} /></div>
                         <div><label className={labelClass}>Perusahaan</label><input type="text" required value={alumniForm.company} onChange={e => setAlumniForm({...alumniForm, company: e.target.value})} className={inputClass} /></div>
                         <div className="col-span-full"><label className={labelClass}>Testimoni</label><textarea rows={3} value={alumniForm.testimonial} onChange={e => setAlumniForm({...alumniForm, testimonial: e.target.value})} className={inputClass}></textarea></div>
                         <div><ImageUpload label="Foto Alumni" currentImage={alumniForm.image} onImageChange={(base64) => setAlumniForm({...alumniForm, image: base64})} /></div>
                      </div>
                      <div className="flex justify-end gap-4 flex-col md:flex-row"><button type="button" onClick={() => setIsEditingAlumni(false)} className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg font-bold text-gray-600 dark:text-gray-300">Batal</button><button type="submit" className="px-6 py-2 bg-muca-blue text-white rounded-lg font-bold shadow-lg flex items-center gap-2 justify-center"><Save size={18}/> Simpan</button></div>
                   </form>
                </div>
             )}
           </div>
        )}

        {/* BKK TAB */}
        {activeTab === 'bkk' && (
           <div className="animate-fade-in">
             {!isEditingJob ? (
                <div className={cardClass}>
                   <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex flex-col md:flex-row justify-between items-start md:items-center bg-gray-50/50 dark:bg-slate-900/50 gap-4">
                      <div><h3 className="text-lg font-bold text-slate-800 dark:text-white">Lowongan Kerja (BKK)</h3></div>
                      <button onClick={handleCreateJob} className="bg-muca-blue text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-blue-700 flex items-center gap-2 w-full md:w-auto justify-center"><Plus size={18} /> Tambah Lowongan</button>
                   </div>
                   <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[600px]">
                        <thead className="bg-gray-50 dark:bg-slate-900 border-b border-gray-100 dark:border-gray-700"><tr><th className="p-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Posisi</th><th className="p-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Perusahaan</th><th className="p-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Tipe</th><th className="p-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Deadline</th><th className="p-4 text-right">Aksi</th></tr></thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                            {jobList.map(item => (
                                <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50">
                                <td className="p-4 font-medium dark:text-white">{item.title}</td>
                                <td className="p-4 dark:text-gray-300">{item.company}</td>
                                <td className="p-4"><span className="text-xs px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-bold">{item.type}</span></td>
                                <td className="p-4 text-red-500 dark:text-red-400 font-bold text-xs">{item.deadline}</td>
                                <td className="p-4 text-right"><div className="flex justify-end gap-2"><button onClick={() => handleEditJob(item)} className="text-blue-500 p-2"><Edit size={18}/></button><button onClick={() => handleDeleteJob(item.id)} className="text-red-500 p-2"><Trash2 size={18}/></button></div></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                   </div>
                </div>
             ) : (
                <div className={cardClass + " p-8 animate-fade-in-up"}>
                   <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-bold text-slate-800 dark:text-white">{editingJobId ? 'Edit Lowongan' : 'Tambah Lowongan Baru'}</h3>
                      <button onClick={() => setIsEditingJob(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"><X size={24}/></button>
                   </div>
                   <form onSubmit={handleSaveJob} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div><label className={labelClass}>Posisi / Jabatan</label><input type="text" required value={jobForm.title} onChange={e => setJobForm({...jobForm, title: e.target.value})} className={inputClass} /></div>
                         <div><label className={labelClass}>Nama Perusahaan</label><input type="text" required value={jobForm.company} onChange={e => setJobForm({...jobForm, company: e.target.value})} className={inputClass} /></div>
                         <div><label className={labelClass}>Lokasi Penempatan</label><input type="text" required value={jobForm.location} onChange={e => setJobForm({...jobForm, location: e.target.value})} className={inputClass} /></div>
                         <div><label className={labelClass}>Batas Lamaran</label><input type="date" required value={jobForm.deadline} onChange={e => setJobForm({...jobForm, deadline: e.target.value})} className={inputClass} /></div>
                         <div><label className={labelClass}>Jenis Pekerjaan</label><select value={jobForm.type} onChange={e => setJobForm({...jobForm, type: e.target.value as any})} className={inputClass}><option>Full-time</option><option>Part-time</option><option>Internship</option></select></div>
                      </div>
                      <div className="flex justify-end gap-4 flex-col md:flex-row"><button type="button" onClick={() => setIsEditingJob(false)} className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg font-bold text-gray-600 dark:text-gray-300">Batal</button><button type="submit" className="px-6 py-2 bg-muca-blue text-white rounded-lg font-bold shadow-lg flex items-center gap-2 justify-center"><Save size={18}/> Publish</button></div>
                   </form>
                </div>
             )}
           </div>
        )}

        {/* SETTINGS TAB */}
        {activeTab === 'settings' && (
           <div className="animate-fade-in max-w-4xl mx-auto">
              <form onSubmit={handleSaveSettings} className="space-y-8">
                 <div className={cardClass + " p-8"}>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2"><Globe size={20} className="text-muca-blue"/> Identitas Sekolah</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div><label className={labelClass}>Nama Sekolah</label><input type="text" value={settings.schoolName} onChange={e => setSettings({...settings, schoolName: e.target.value})} className={inputClass} /></div>
                       <div><label className={labelClass}>Moto</label><input type="text" value={settings.motto} onChange={e => setSettings({...settings, motto: e.target.value})} className={inputClass} /></div>
                       <div className="col-span-full"><label className={labelClass}>Alamat Utama</label><input type="text" value={settings.addressMain} onChange={e => setSettings({...settings, addressMain: e.target.value})} className={inputClass} /></div>
                       <div><label className={labelClass}>Email</label><input type="email" value={settings.email} onChange={e => setSettings({...settings, email: e.target.value})} className={inputClass} /></div>
                       <div><label className={labelClass}>Telepon</label><input type="text" value={settings.phone} onChange={e => setSettings({...settings, phone: e.target.value})} className={inputClass} /></div>
                    </div>
                 </div>
                 
                 <div className={cardClass + " p-8"}>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2"><ImageIcon size={20} className="text-muca-blue"/> Sambutan Kepala Sekolah</h3>
                    <div className="space-y-4">
                       <div><label className={labelClass}>Nama Kepala Sekolah</label><input type="text" value={settings.principalWelcome.name} onChange={e => setSettings({...settings, principalWelcome: {...settings.principalWelcome, name: e.target.value}})} className={inputClass} /></div>
                       <div>
                         <ImageUpload 
                           label="Foto Kepala Sekolah" 
                           currentImage={settings.principalWelcome.image} 
                           onImageChange={(base64) => setSettings({...settings, principalWelcome: {...settings.principalWelcome, image: base64}})} 
                         />
                       </div>
                       <div><label className={labelClass}>Isi Sambutan</label><textarea rows={6} value={settings.principalWelcome.message} onChange={e => setSettings({...settings, principalWelcome: {...settings.principalWelcome, message: e.target.value}})} className={inputClass}></textarea></div>
                    </div>
                 </div>

                 {/* GALLERY SECTION */}
                 <div className={cardClass + " p-8"}>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                        <ImageIcon size={20} className="text-muca-blue"/> Galeri Sekolah
                    </h3>
                    
                    {/* Add Form */}
                    <div className="bg-gray-50 dark:bg-slate-700/30 p-4 rounded-xl border border-gray-200 dark:border-gray-600 mb-6">
                        <h4 className="font-bold text-sm text-slate-800 dark:text-white mb-3">Tambah Foto Galeri</h4>
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                            <div className="md:col-span-5">
                                <ImageUpload 
                                    label="Upload Foto" 
                                    currentImage={newGalleryItem.image} 
                                    onImageChange={(val) => setNewGalleryItem({...newGalleryItem, image: val})}
                                    className="mb-0" 
                                />
                            </div>
                            <div className="md:col-span-5">
                                <label className={labelClass}>Keterangan / Caption</label>
                                <input 
                                    type="text" 
                                    value={newGalleryItem.caption} 
                                    onChange={(e) => setNewGalleryItem({...newGalleryItem, caption: e.target.value})} 
                                    className={inputClass} 
                                    placeholder="Contoh: Kegiatan Upacara Bendera" 
                                />
                            </div>
                            <div className="md:col-span-2">
                                <button 
                                    type="button" 
                                    onClick={handleAddGalleryItem}
                                    className="w-full py-2.5 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                                >
                                    <Plus size={18} /> Tambah
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Gallery List */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {settings.gallery.map((item) => (
                            <div key={item.id} className="group relative bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all">
                                <div className="aspect-video relative overflow-hidden bg-gray-100 dark:bg-slate-700">
                                    <img src={item.image} alt={item.caption} className="w-full h-full object-cover" />
                                    {/* Actions Overlay */}
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                        <button 
                                            type="button"
                                            onClick={() => handleDeleteGalleryItem(item.id)}
                                            className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                                            title="Hapus"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                                <div className="p-3">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 block">Caption</label>
                                    <input 
                                        type="text" 
                                        value={item.caption}
                                        onChange={(e) => handleUpdateGalleryCaption(item.id, e.target.value)}
                                        className="w-full text-sm font-medium text-slate-800 dark:text-white bg-transparent border-b border-transparent focus:border-muca-blue outline-none transition-colors"
                                    />
                                </div>
                            </div>
                        ))}
                        {settings.gallery.length === 0 && (
                            <div className="col-span-full py-8 text-center text-gray-500 dark:text-gray-400 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl">
                                Belum ada foto di galeri.
                            </div>
                        )}
                    </div>
                 </div>

                 <div className="flex justify-end">
                    <button type="submit" className="px-8 py-3 bg-muca-blue text-white rounded-xl font-bold hover:bg-blue-700 shadow-xl flex items-center gap-2 justify-center w-full md:w-auto"><Save size={20}/> Simpan Perubahan</button>
                 </div>
              </form>
           </div>
        )}

        {/* USERS TAB */}
        {activeTab === 'users' && (
           <div className="animate-fade-in">
              <div className={cardClass + " p-8"}>
                 <div className="flex justify-between items-center mb-8">
                    <div>
                       <h3 className="text-xl font-bold text-slate-800 dark:text-white">Manajemen Pengguna</h3>
                       <p className="text-gray-500 dark:text-gray-400">Kelola akses administrator website.</p>
                    </div>
                    <button onClick={() => setShowAddUser(true)} className="bg-slate-900 dark:bg-white dark:text-slate-900 text-white px-4 py-2 rounded-lg font-bold text-sm hover:opacity-90 flex items-center gap-2"><Plus size={18} /> Tambah User</button>
                 </div>
                 
                 {showAddUser && (
                    <div className="mb-8 p-6 bg-gray-50 dark:bg-slate-700/50 rounded-xl border border-gray-200 dark:border-gray-600 animate-fade-in-up">
                       <h4 className="font-bold text-gray-800 dark:text-white mb-4">Tambah Pengguna Baru</h4>
                       <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                          <div><label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">Nama Lengkap</label><input type="text" value={newUser.name} onChange={e => setNewUser({...newUser, name: e.target.value})} className={inputClass + " text-sm"} /></div>
                          <div><label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">Username</label><input type="text" value={newUser.username} onChange={e => setNewUser({...newUser, username: e.target.value})} className={inputClass + " text-sm"} /></div>
                          <div><label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">Role</label><select value={newUser.role} onChange={e => setNewUser({...newUser, role: e.target.value as any})} className={inputClass + " text-sm"}><option value={UserRole.CONTENT_ADMIN}>Content Admin</option><option value={UserRole.BKK_ADMIN}>BKK Admin</option><option value={UserRole.SUPERUSER}>Superuser</option></select></div>
                          <div className="flex gap-2">
                             <button onClick={handleAddUser} className="bg-green-600 text-white px-4 py-2 rounded font-bold text-sm flex-1 hover:bg-green-700">Simpan</button>
                             <button onClick={() => setShowAddUser(false)} className="bg-gray-300 dark:bg-slate-600 text-gray-700 dark:text-gray-200 px-4 py-2 rounded font-bold text-sm hover:bg-gray-400 dark:hover:bg-slate-500">Batal</button>
                          </div>
                       </div>
                    </div>
                 )}

                 <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[600px]">
                        <thead className="bg-gray-100 dark:bg-slate-900"><tr><th className="p-4 rounded-l-lg text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Nama</th><th className="p-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Username</th><th className="p-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Role</th><th className="p-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Last Login</th><th className="p-4 rounded-r-lg text-right">Aksi</th></tr></thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                        {users.map(u => (
                            <tr key={u.id}>
                                <td className="p-4 font-bold dark:text-white">{u.name}</td>
                                <td className="p-4 dark:text-gray-300 text-sm font-mono">@{u.username}</td>
                                <td className="p-4"><span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 px-2 py-1 rounded text-xs font-bold uppercase">{u.role}</span></td>
                                <td className="p-4 text-gray-500 dark:text-gray-400 text-sm">{u.lastLogin}</td>
                                <td className="p-4 text-right"><button onClick={() => handleDeleteUser(u.id)} className="text-red-500 hover:text-red-700 dark:hover:text-red-400 p-2"><Trash2 size={18}/></button></td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                 </div>
              </div>
           </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
