
import React from 'react';
import LoadingSpinner from './LoadingSpinner';
import ErrorDisplay from './ErrorDisplay';

interface ImageDisplayProps {
  imageData: string | null; // Base64 image string
  isLoading: boolean; 
  error: string | null;
  onImageClick?: () => void; // Optional click handler for the image
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ imageData, isLoading, error, onImageClick }) => {
  
  return (
    <div className="w-full p-6 bg-slate-800 rounded-xl shadow-2xl flex flex-col items-center justify-center min-h-[400px] lg:min-h-[550px]">
      {isLoading && <LoadingSpinner />} 
      {!isLoading && error && <ErrorDisplay message={error} />}
      {!isLoading && !error && imageData && (
        <div 
          onClick={onImageClick} 
          className="cursor-pointer transition-transform duration-200 hover:scale-105"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onImageClick?.(); }}
          aria-label="Ampliar imagen generada"
        >
          <img 
            src={`data:image/jpeg;base64,${imageData}`} 
            alt="Personaje Generado" 
            className="max-w-full max-h-[500px] lg:max-h-[600px] object-contain rounded-lg shadow-lg"
          />
        </div>
      )}
      {!isLoading && !error && !imageData && (
        <div className="text-center text-slate-400">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mx-auto mb-4 text-slate-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.158 0a.225.225 0 0 1 .225.225V8.55a.225.225 0 0 1-.45 0V8.475a.225.225 0 0 1 .225-.225Z" />
          </svg>
          <p className="text-lg font-medium">La imagen generada aparecerá aquí.</p>
          <p className="text-sm">Completa el formulario y sigue los pasos para generar tu personaje.</p>
        </div>
      )}
    </div>
  );
};

export default ImageDisplay;