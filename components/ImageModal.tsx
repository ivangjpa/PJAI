import React, { useEffect } from 'react';

interface ImageModalProps {
  isOpen: boolean;
  imageData: string | null;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, imageData, onClose }) => {
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
      window.addEventListener('keydown', handleEscKey);
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !imageData) {
    return null;
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={onClose} // Close on backdrop click
      role="dialog"
      aria-modal="true"
      aria-labelledby="image-modal-title"
    >
      <div 
        className="relative bg-slate-900 p-2 rounded-lg shadow-2xl max-w-[95vw] max-h-[95vh] flex"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the image container
      >
        <img 
          src={`data:image/jpeg;base64,${imageData}`} 
          alt="Personaje Generado en Pantalla Completa" 
          className="object-contain max-w-full max-h-full rounded" 
        />
        <button
          onClick={onClose}
          className="absolute top-2 right-2 sm:top-3 sm:right-3 p-2 bg-slate-700/70 hover:bg-slate-600/90 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-colors"
          aria-label="Cerrar vista de imagen ampliada"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 sm:w-7 sm:h-7">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <h2 id="image-modal-title" className="sr-only">Imagen Generada Ampliada</h2>
    </div>
  );
};

export default ImageModal;