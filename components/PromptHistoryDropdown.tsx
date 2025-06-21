import React from 'react';
import { PromptHistoryItem } from '../types';

interface PromptHistoryDropdownProps {
  history: PromptHistoryItem[];
  onSelectItem: (id: string) => void;
  disabled?: boolean;
}

const PromptHistoryDropdown: React.FC<PromptHistoryDropdownProps> = ({ history, onSelectItem, disabled }) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    if (selectedId) {
      onSelectItem(selectedId);
    }
  };

  return (
    <div className="mb-4">
      <label htmlFor="prompt-history-select" className="block text-sm font-medium text-sky-200 mb-1">
        Historial de Prompts (Últimos {history.length > 0 ? history.length : '0'}):
      </label>
      <select
        id="prompt-history-select"
        onChange={handleChange}
        disabled={disabled || history.length === 0}
        value="" // Controlled by selection, reset to placeholder
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-slate-700 border-slate-600 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm rounded-md text-slate-100 shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
        aria-label="Seleccionar un prompt del historial para recargar y generar"
      >
        <option value="" disabled>
          {history.length === 0 ? "No hay historial disponible" : "Seleccionar prompt anterior..."}
        </option>
        {history.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name} (Generado: {new Date(item.timestamp).toLocaleTimeString()})
          </option>
        ))}
      </select>
       {history.length > 0 && (
         <p className="text-xs text-slate-400 mt-1">
           Seleccionar un prompt restaurará los parámetros y generará la imagen.
         </p>
       )}
    </div>
  );
};

export default PromptHistoryDropdown;