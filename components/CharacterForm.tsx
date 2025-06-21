import React from 'react';
import { CharacterAttributes, ClothingType, ClothingMaterial } from '../types'; 
import { 
  SPECIES_OPTIONS, 
  GENDER_OPTIONS,
  POSE_OPTIONS, 
  ART_STYLE_OPTIONS, 
  MOOD_OPTIONS, 
  LIGHTING_STYLE_OPTIONS, 
  COLOR_PALETTE_OPTIONS,
  IMAGE_QUALITY_OPTIONS,
  ASPECT_RATIO_OPTIONS,
  CAMERA_ANGLE_OPTIONS,
  // IMAGE_ORIENTATION_OPTIONS, // Removed
  CLOTHING_TYPE_OPTIONS, 
  CLOTHING_MATERIAL_OPTIONS 
} from '../constants';

interface CharacterFormProps {
  attributes: CharacterAttributes;
  onAttributeChange: <K extends keyof CharacterAttributes>(key: K, value: CharacterAttributes[K]) => void;
  onSubmit: () => void;
  isEnhancingPrompt: boolean; 
  isGeneratingImage: boolean; 
}

const SelectField: React.FC<{
  label: string;
  id: keyof CharacterAttributes; 
  value: string; 
  options: { value: string; label: string }[];
  onChange: (id: keyof CharacterAttributes, value: string) => void;
  ariaDescribedBy?: string;
}> = ({ label, id, value, options, onChange, ariaDescribedBy }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-sm font-medium text-sky-200 mb-1">{label}:</label>
    <select
      id={id}
      name={id}
      value={value}
      onChange={(e) => onChange(id, e.target.value)}
      aria-describedby={ariaDescribedBy}
      className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-slate-700 border-slate-600 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm rounded-md text-slate-100 shadow-sm"
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>
  </div>
);

const TextField: React.FC<{
  label: string;
  id: keyof CharacterAttributes | 'clothingColor' | 'negativePrompt'; // Removed 'seed'
  value: string | number | undefined; 
  onChange: (id: keyof CharacterAttributes | 'clothingColor' | 'negativePrompt', value: string) => void; 
  placeholder?: string;
  isTextArea?: boolean;
  type?: 'text' | 'number'; 
  ariaDescribedBy?: string;
}> = ({ label, id, value, onChange, placeholder, isTextArea, type, ariaDescribedBy }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-sm font-medium text-sky-200 mb-1">{label}:</label>
    {isTextArea ? (
      <textarea
        id={id}
        name={id}
        rows={3}
        value={value as string || ""} 
        onChange={(e) => onChange(id, e.target.value)}
        placeholder={placeholder}
        aria-describedby={ariaDescribedBy}
        className="mt-1 block w-full p-2 text-base bg-slate-700 border-slate-600 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm rounded-md text-slate-100 shadow-sm"
      />
    ) : (
      <input
        type={type || "text"} 
        id={id}
        name={id}
        value={value || ""} 
        onChange={(e) => onChange(id, e.target.value)}
        placeholder={placeholder}
        aria-describedby={ariaDescribedBy}
        className="mt-1 block w-full p-2 text-base bg-slate-700 border-slate-600 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm rounded-md text-slate-100 shadow-sm"
        min={type === 'number' ? "0" : undefined} 
      />
    )}
  </div>
);


const CharacterForm: React.FC<CharacterFormProps> = ({ attributes, onAttributeChange, onSubmit, isEnhancingPrompt, isGeneratingImage }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  const isButtonDisabled = isEnhancingPrompt || isGeneratingImage;
  let buttonText = "Generar Prompt";
  if (isEnhancingPrompt) {
    buttonText = "Mejorando Prompt...";
  }


  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-4 sm:p-6 bg-slate-800 rounded-xl shadow-2xl">
      
      <fieldset>
        <legend className="text-lg font-semibold text-sky-300 mb-3 border-b border-slate-700 pb-2">Atributos del Personaje</legend>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1">
          <SelectField label="Especie del Personaje" id="species" value={attributes.species} options={SPECIES_OPTIONS} onChange={onAttributeChange} />
          <SelectField label="Género del Personaje" id="gender" value={attributes.gender} options={GENDER_OPTIONS} onChange={onAttributeChange} />
        </div>
        <TextField label="Descripción del Tipo de Cuerpo" id="bodyTypeDescription" value={attributes.bodyTypeDescription} onChange={onAttributeChange as any} placeholder="Ej: musculoso, esbelto, robusto" />
        <SelectField label="Pose del Personaje" id="pose" value={attributes.pose} options={POSE_OPTIONS} onChange={onAttributeChange} />
        
        <div className="mt-4 pt-4 border-t border-slate-700">
            <h4 className="text-md font-medium text-sky-200 mb-2">Vestimenta Principal</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1">
                <SelectField label="Tipo de Vestimenta Principal" id="clothingType" value={attributes.clothingType} options={CLOTHING_TYPE_OPTIONS} onChange={onAttributeChange} />
                <SelectField label="Material Principal de la Vestimenta" id="clothingMaterial" value={attributes.clothingMaterial} options={CLOTHING_MATERIAL_OPTIONS} onChange={onAttributeChange} />
            </div>
            <TextField 
              label="Color Principal de la Vestimenta" 
              id="clothingColor" 
              value={attributes.clothingColor} 
              onChange={onAttributeChange as any} 
              placeholder="Ej: rojo sangre, azul nocturno" 
            />
        </div>
        <TextField label="Detalles Adicionales de Vestimenta/Armadura" id="clothingDescription" value={attributes.clothingDescription} onChange={onAttributeChange as any} placeholder="Ej: armadura de placas futurista, túnica de mago arcana" isTextArea />

        <TextField label="Descripción del Cabello/Cabeza" id="hairDescription" value={attributes.hairDescription} onChange={onAttributeChange as any} placeholder="Ej: largo y ondulado, rojo fuego" />
        <TextField label="Rasgos Específicos Distintivos" id="specificFeatures" value={attributes.specificFeatures} onChange={onAttributeChange as any} placeholder="Ej: cicatriz en el ojo, tatuajes cibernéticos, cuernos" />
      </fieldset>
      
      <fieldset>
        <legend className="text-lg font-semibold text-sky-300 mb-3 border-b border-slate-700 pb-2">Estilo y Ambiente</legend>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1">
          <SelectField label="Estilo Artístico" id="artStyle" value={attributes.artStyle} options={ART_STYLE_OPTIONS} onChange={onAttributeChange} />
          <SelectField label="Estado de Ánimo" id="mood" value={attributes.mood} options={MOOD_OPTIONS} onChange={onAttributeChange} />
          <SelectField label="Estilo de Iluminación" id="lightingStyle" value={attributes.lightingStyle} options={LIGHTING_STYLE_OPTIONS} onChange={onAttributeChange} />
          <SelectField label="Paleta de Colores" id="colorPalette" value={attributes.colorPalette} options={COLOR_PALETTE_OPTIONS} onChange={onAttributeChange} />
        </div>
        <TextField label="Entorno/Fondo" id="backgroundSetting" value={attributes.backgroundSetting} onChange={onAttributeChange as any} placeholder="Ej: ciudad cyberpunk lluviosa, bosque místico" />
        <TextField 
            label="Prompt Negativo (Opcional)" 
            id="negativePrompt" 
            value={attributes.negativePrompt} 
            onChange={onAttributeChange as any} 
            placeholder="Ej: mal dibujado, deforme, texto, logos, borroso" 
            isTextArea={true} 
            ariaDescribedBy="negative-prompt-description"
        />
        <p id="negative-prompt-description" className="text-xs text-slate-400 mt-1">Describe lo que NO quieres ver en la imagen.</p>
      </fieldset>

      <fieldset>
        <legend className="text-lg font-semibold text-sky-300 mb-3 border-b border-slate-700 pb-2">Parámetros Técnicos de la Imagen</legend>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1">
          <SelectField label="Calidad de Imagen" id="imageQuality" value={attributes.imageQuality} options={IMAGE_QUALITY_OPTIONS} onChange={onAttributeChange} />
          <SelectField label="Proporción de Aspecto" id="aspectRatio" value={attributes.aspectRatio} options={ASPECT_RATIO_OPTIONS} onChange={onAttributeChange} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1 mt-4">
          <SelectField label="Ángulo de Cámara" id="cameraAngle" value={attributes.cameraAngle} options={CAMERA_ANGLE_OPTIONS} onChange={onAttributeChange} />
          {/* Seed TextField removed */}
        </div>
         {/* Seed description removed */}
      </fieldset>
      
      <TextField label="Detalles Adicionales Personalizados" id="customDetails" value={attributes.customDetails} onChange={onAttributeChange as any} placeholder="Cualquier otra cosa que quieras añadir para la IA" isTextArea={true} />
      
      <button
        type="submit"
        disabled={isButtonDisabled}
        className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-slate-900 bg-sky-400 hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-sky-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
        aria-label="Generar y mejorar prompt basado en los atributos seleccionados"
      >
        {isEnhancingPrompt ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-slate-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {buttonText}
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
              </svg>
              {buttonText}
            </>
        )}
      </button>
    </form>
  );
};

export default CharacterForm;