
import React, { useState, useEffect } from 'react';

interface PromptReviewAreaProps {
  initialPrompt: string;
  onGenerateImage: (editedPrompt: string) => void;
  onBackToForm: () => void;
  isLoading: boolean; // For the "Generate Image" button in this area
}

const PromptReviewArea: React.FC<PromptReviewAreaProps> = ({ initialPrompt, onGenerateImage, onBackToForm, isLoading }) => {
  const [editedPrompt, setEditedPrompt] = useState(initialPrompt);

  useEffect(() => {
    setEditedPrompt(initialPrompt);
  }, [initialPrompt]);

  const handleGenerateClick = () => {
    onGenerateImage(editedPrompt);
  };

  return (
    <div className="space-y-6 p-4 sm:p-6 bg-slate-800 rounded-xl shadow-2xl">
      <h3 className="text-xl font-semibold text-sky-300 mb-3 border-b border-slate-700 pb-2">
        Revisar y Editar Prompt Generado
      </h3>
      <div className="mb-4">
        <label htmlFor="prompt-textarea" className="block text-sm font-medium text-sky-200 mb-1">Prompt para la IA:</label>
        <textarea
          id="prompt-textarea"
          value={editedPrompt}
          onChange={(e) => setEditedPrompt(e.target.value)}
          rows={12}
          className="w-full p-2 text-base bg-slate-700 border-slate-600 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm rounded-md text-slate-100 shadow-sm"
          aria-label="Prompt editable para generación de imagen"
        />
      </div>
      <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
        <button
          onClick={handleGenerateClick}
          disabled={isLoading}
          className="w-full sm:flex-1 flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-slate-900 bg-sky-400 hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-sky-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
          aria-label="Generar imagen utilizando el prompt editado"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-slate-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generando Imagen...
            </>
          ) : (
            <>
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L1.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09l2.846.813-.813 2.846a4.5 4.5 0 0 0-3.09 3.09ZM18.25 12l.813-2.846a4.5 4.5 0 0 0-3.09-3.09L13.125 5.25l-.813 2.846a4.5 4.5 0 0 0-3.09 3.09L6.375 12l2.846.813a4.5 4.5 0 0 0 3.09 3.09L15 18.75l.813-2.846a4.5 4.5 0 0 0 3.09-3.09L21.75 12l-2.846-.813a4.5 4.5 0 0 0-3.09-3.09Z" />
              </svg>
              Generar Imagen con este Prompt
            </>
          )}
        </button>
        <button
          onClick={onBackToForm}
          disabled={isLoading} 
          className="w-full sm:w-auto flex items-center justify-center px-6 py-3 border border-slate-600 text-base font-medium rounded-md text-sky-200 bg-slate-700 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-sky-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
          aria-label="Volver al formulario de atributos"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
          Volver al Formulario
        </button>
      </div>
    </div>
  );
};

export default PromptReviewArea;
