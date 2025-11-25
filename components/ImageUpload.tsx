
import React, { useRef, useState } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface Props {
  label: string;
  currentImage?: string;
  onImageChange: (base64: string) => void;
  className?: string;
}

const ImageUpload: React.FC<Props> = ({ label, currentImage, onImageChange, className }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string>(currentImage || '');
  const [isDragging, setIsDragging] = useState(false);

  // Update preview if prop changes externally
  React.useEffect(() => {
    setPreview(currentImage || '');
  }, [currentImage]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    processFile(file);
  };

  const processFile = (file?: File) => {
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert("File terlalu besar (Maksimal 5MB)");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPreview(base64String);
        onImageChange(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    processFile(file);
  };

  const handleRemove = () => {
    setPreview('');
    onImageChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={className}>
      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">{label}</label>
      
      {preview ? (
        <div className="relative w-full max-w-xs aspect-video bg-gray-100 rounded-xl overflow-hidden border border-gray-200 group">
          <img src={preview} alt="Preview" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="bg-white text-slate-900 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-gray-100"
            >
              Ganti
            </button>
            <button
              type="button"
              onClick={handleRemove}
              className="bg-red-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-red-600"
            >
              Hapus
            </button>
          </div>
        </div>
      ) : (
        <div 
          onClick={() => fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition-colors ${
            isDragging 
              ? 'border-muca-blue bg-blue-50 dark:bg-slate-800' 
              : 'border-gray-300 dark:border-gray-600 hover:border-muca-blue hover:bg-gray-50 dark:hover:bg-slate-800'
          }`}
        >
          <div className="w-12 h-12 bg-gray-100 dark:bg-slate-700 rounded-full flex items-center justify-center mb-3 text-gray-400">
             <Upload size={24} />
          </div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300 text-center">
            Klik untuk upload atau drag & drop
          </p>
          <p className="text-xs text-gray-400 mt-1">PNG, JPG, GIF (Max 5MB)</p>
        </div>
      )}

      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept="image/*" 
        className="hidden" 
      />
    </div>
  );
};

export default ImageUpload;
