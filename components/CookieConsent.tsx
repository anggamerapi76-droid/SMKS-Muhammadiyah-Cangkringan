import React, { useState, useEffect } from 'react';

const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (consent === null) {
      setIsVisible(true);
    } else if (consent === 'true') {
      initializeAnalytics();
    }
  }, []);

  const initializeAnalytics = () => {
    // Google Analytics Initialization Logic
    // In a real app, replace 'G-XXXXXXXXXX' with your actual Tracking ID
    const gaId = 'G-XXXXXXXXXX'; 
    
    if (document.getElementById('google-analytics')) return;

    // Inject gtag.js
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    script1.id = 'google-analytics';
    
    // Inject configuration
    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${gaId}');
    `;

    document.head.appendChild(script1);
    document.head.appendChild(script2);
    
    console.log("Analytics Initialized");
  };

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    initializeAnalytics();
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'false');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div 
      className="fixed bottom-0 left-0 w-full bg-slate-900/95 backdrop-blur-md text-white p-6 z-50 border-t border-muca-yellow shadow-[0_-4px_20px_rgba(0,0,0,0.3)] animate-fade-in-up"
      role="alert"
      aria-live="polite"
    >
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-sm text-gray-300">
          <p className="font-bold text-white mb-1">Kami menghargai privasi Anda</p>
          <p>
            Website ini menggunakan cookie untuk menganalisis trafik dan meningkatkan pengalaman pengguna. 
            Dengan melanjutkan, Anda menyetujui penggunaan cookie kami.
          </p>
        </div>
        <div className="flex gap-3 shrink-0">
          <button 
            onClick={handleDecline}
            className="px-4 py-2 rounded-lg border border-gray-600 hover:bg-gray-800 transition-colors text-sm font-medium focus:outline-none focus:ring-2 focus:ring-white"
          >
            Tolak
          </button>
          <button 
            onClick={handleAccept}
            className="px-6 py-2 rounded-lg bg-muca-yellow text-slate-900 hover:bg-yellow-400 transition-colors text-sm font-bold shadow-lg focus:outline-none focus:ring-2 focus:ring-muca-blue"
          >
            Izinkan Semua
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;