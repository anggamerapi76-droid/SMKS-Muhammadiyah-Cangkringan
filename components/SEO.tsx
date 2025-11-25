import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface Props {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  type?: string;
}

const SEO: React.FC<Props> = ({ 
  title, 
  description, 
  keywords, 
  image = 'https://picsum.photos/1200/630?random=school_preview', // Default share image
  type = 'website'
}) => {
  const location = useLocation();
  const fullUrl = window.location.origin + location.pathname;
  const siteName = "SMK Muhammadiyah Cangkringan";

  useEffect(() => {
    // Update Title
    document.title = `${title} | ${siteName}`;
    
    // Helper to update or create meta tags
    const updateMeta = (name: string, content: string, attribute = 'name') => {
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Standard Meta Tags
    updateMeta('description', description);
    if (keywords) updateMeta('keywords', keywords);
    
    // Open Graph / Facebook
    updateMeta('og:type', type, 'property');
    updateMeta('og:url', fullUrl, 'property');
    updateMeta('og:title', title, 'property');
    updateMeta('og:description', description, 'property');
    updateMeta('og:image', image, 'property');
    updateMeta('og:site_name', siteName, 'property');

    // Twitter
    updateMeta('twitter:card', 'summary_large_image', 'name');
    updateMeta('twitter:url', fullUrl, 'name');
    updateMeta('twitter:title', title, 'name');
    updateMeta('twitter:description', description, 'name');
    updateMeta('twitter:image', image, 'name');

  }, [title, description, keywords, image, type, fullUrl]);

  return null;
};

export default SEO;