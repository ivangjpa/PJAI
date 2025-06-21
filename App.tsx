import React, { useState, useCallback, useEffect } from 'react';
import CharacterForm from './components/CharacterForm';
import ImageDisplay from './components/ImageDisplay';
import PromptReviewArea from './components/PromptReviewArea';
import ImageModal from './components/ImageModal';
import PromptHistoryDropdown from './components/PromptHistoryDropdown'; // Import the new component
import { generateImageFromPrompt, enhancePromptWithGeminiText } from './services/geminiService'; 
import { CharacterAttributes, ImageAspectRatio, PromptHistoryItem } from './types'; 
import { INITIAL_ATTRIBUTES } from './constants';

type AppStep = 'form' | 'review';
const MAX_HISTORY_ITEMS = 5;

const App: React.FC = () => {
  const [attributes, setAttributes] = useState<CharacterAttributes>(INITIAL_ATTRIBUTES);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGeneratingImage, setIsGeneratingImage] = useState<boolean>(false); 
  const [isEnhancingPrompt, setIsEnhancingPrompt] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const [currentStep, setCurrentStep] = useState<AppStep>('form');
  const [displayPrompt, setDisplayPrompt] = useState<string>("");

  const [isImageModalOpen, setIsImageModalOpen] = useState<boolean>(false);
  const [promptHistory, setPromptHistory] = useState<PromptHistoryItem[]>([]);

  const handleAttributeChange = useCallback(<K extends keyof CharacterAttributes>(
    key: K, 
    value: CharacterAttributes[K] | string 
  ) => {
    setAttributes(prev => ({ ...prev, [key]: value }));
  }, []);

  const constructPrompt = useCallback((attrs: CharacterAttributes): string => {
    
    let clothingDetails = `Principalmente un/una ${attrs.clothingType} de color "${attrs.clothingColor}", hecho/a de ${attrs.clothingMaterial}.`;
    if (attrs.clothingDescription && attrs.clothingDescription.trim() !== "") {
      clothingDetails += ` Detalles adicionales y/o de armadura: ${attrs.clothingDescription}.`;
    }

    return `SOLICITUD DE IMAGEN DETALLADA Y ESTRICTA

1. Sujeto Principal:
Crear un personaje con las siguientes características base:
- Especie: "${attrs.species}"
- Género: "${attrs.gender}"

2. Descripción Detallada del Personaje (Aspecto Físico):
- Tipo de Cuerpo: ${attrs.bodyTypeDescription}.
- Pose del Personaje: ${attrs.pose}.
- Cabello y Características de la Cabeza: ${attrs.hairDescription}.
- Vestimenta Completa: ${clothingDetails}
- Rasgos Físicos Distintivos (ej: cicatrices, tatuajes, cuernos notables): ${attrs.specificFeatures}.

3. IMPERATIVO: Estilo Visual y Ambiente (Seguir estrictamente los siguientes parámetros):
- Estilo Artístico Primario: La imagen DEBE tener un estilo "${attrs.artStyle}".
- Atmósfera General / Estado de Ánimo: El ambiente DEBE ser "${attrs.mood}".
- Paleta de Colores Dominante: Utilizar OBLIGATORIAMENTE una paleta de colores "${attrs.colorPalette}".

4. Escena y Composición (Seguir estrictamente la iluminación y el fondo):
- Entorno o Fondo de la Escena: Situar al personaje en: ${attrs.backgroundSetting}.
- Estilo de Iluminación Requerido: La iluminación DEBE ser "${attrs.lightingStyle}".

5. IMPERATIVO: Parámetros Técnicos de la Imagen (Aplicar con precisión):
- Calidad de Imagen / Nivel de Detalle: Se exige un nivel de "${attrs.imageQuality}".
- Ángulo de Cámara ESPECÍFICO / Tipo de Plano OBLIGATORIO: La perspectiva de la imagen DEBE ser estrictamente desde un "${attrs.cameraAngle}". Esta perspectiva es OBLIGATORIA y NO DEBE ALTERARSE.
(Nota: La Proporción de Aspecto y Prompt Negativo se gestionan directamente por configuración de API y no necesitan especificarse aquí en el texto.)

6. Detalles Adicionales y Personalizados (Incorporar si se proveen):
${attrs.customDetails || "No se especificaron detalles adicionales para esta sección."}

Instrucción Final y Mandatoria para la IA:
GENERAR LA IMAGEN SIGUIENDO RIGUROSAMENTE TODAS LAS ESPECIFICACIONES ANTERIORES. La fidelidad a los parámetros de estilo, ambiente y técnicos es CRUCIAL. Producir una imagen de muy alta calidad, con gran nivel de detalle, donde el personaje principal sea el foco central y todos los elementos se integren coherentemente. NO OMITIR NI ALTERAR LOS PARÁMETROS IMPERATIVOS, especialmente el ángulo de cámara especificado.
`;
  }, []);

  const handleGeneratePromptClicked = useCallback(async () => {
    setError(null);
    setGeneratedImage(null); 
    setIsEnhancingPrompt(true); 

    const preliminaryPrompt = constructPrompt(attributes);
    
    try {
      const enhancedPrompt = await enhancePromptWithGeminiText(preliminaryPrompt);
      setDisplayPrompt(enhancedPrompt); 
      setCurrentStep('review');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Ocurrió un error desconocido al mejorar el prompt.");
      }
      console.error("Error en handleGeneratePromptClicked durante la mejora:", err);
    } finally {
      setIsEnhancingPrompt(false); 
    }
    
  }, [attributes, constructPrompt]);

  const addPromptToHistory = (promptText: string, currentAttributes: CharacterAttributes) => {
    setPromptHistory(prevHistory => {
      const newHistoryItem: PromptHistoryItem = {
        id: Date.now().toString() + Math.random().toString(36).substring(2, 9), // More robust unique ID
        name: `${currentAttributes.species} ${currentAttributes.gender} - ${currentAttributes.artStyle}`.substring(0, 50), // Short name
        timestamp: Date.now(),
        attributes: { ...currentAttributes },
        promptText,
      };
      const updatedHistory = [newHistoryItem, ...prevHistory];
      if (updatedHistory.length > MAX_HISTORY_ITEMS) {
        return updatedHistory.slice(0, MAX_HISTORY_ITEMS);
      }
      return updatedHistory;
    });
  };

  const internalGenerateImage = useCallback(async (promptToUse: string, attributesForGeneration: CharacterAttributes) => {
    setIsGeneratingImage(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const imageBase64 = await generateImageFromPrompt(
        promptToUse, 
        attributesForGeneration.aspectRatio,
        attributesForGeneration.negativePrompt 
      );
      setGeneratedImage(imageBase64);
      // Add to history only if it's a new generation from review, not from history selection itself
      // This logic is tricky, consider when to call addPromptToHistory carefully.
      // For now, let's call it here and ensure handleSelectHistoryItem doesn't re-add.
      // We'll gate it in handleGenerateImageClickedFromReview
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Ocurrió un error desconocido al generar la imagen.");
      }
      console.error("Error en internalGenerateImage:", err);
      throw err; // Re-throw to be caught by caller if needed
    } finally {
      setIsGeneratingImage(false);
    }
  }, []);


  const handleGenerateImageClickedFromReview = useCallback(async (promptToUse: string) => {
    try {
      await internalGenerateImage(promptToUse, attributes);
      // Add to history after successful generation from the review step
      addPromptToHistory(promptToUse, attributes);
    } catch (err) {
      // Error already set by internalGenerateImage
      console.error("Error en handleGenerateImageClickedFromReview:",err);
    }
  }, [attributes, internalGenerateImage]);


  const handleSelectHistoryItem = useCallback(async (historyItemId: string) => {
    const selectedItem = promptHistory.find(item => item.id === historyItemId);
    if (selectedItem) {
      setAttributes(selectedItem.attributes);
      setDisplayPrompt(selectedItem.promptText);
      setCurrentStep('review'); // Show the prompt in review area
      
      // Directly generate image
      try {
        await internalGenerateImage(selectedItem.promptText, selectedItem.attributes);
        // DO NOT add to history again here, it's already in history.
      } catch (err) {
         // Error already set by internalGenerateImage
        console.error("Error al generar imagen desde historial:", err);
      }
    }
  }, [promptHistory, internalGenerateImage]);


  const handleBackToFormClicked = useCallback(() => {
    setCurrentStep('form');
    // setDisplayPrompt(""); // Keep displayPrompt if user wants to see what was last reviewed.
  }, []);

  const openImageModal = useCallback(() => {
    if (generatedImage) {
      setIsImageModalOpen(true);
    }
  }, [generatedImage]);

  const closeImageModal = useCallback(() => {
    setIsImageModalOpen(false);
  }, []);


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-sky-900 p-4 sm:p-6 lg:p-8">
      <header className="text-center mb-8 lg:mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300">
          Creador de Personajes Imaginarios
        </h1>
        <p className="mt-2 text-lg text-sky-200">
          Da vida a tus ideas generando imágenes únicas con IA. Personaliza cada detalle.
        </p>
      </header>

      {/* Prompt History Dropdown */}
      <div className="container mx-auto max-w-3xl mb-6">
        <PromptHistoryDropdown 
          history={promptHistory} 
          onSelectItem={handleSelectHistoryItem} 
          disabled={isGeneratingImage || isEnhancingPrompt}
        />
      </div>

      <main className="container mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        <section aria-labelledby="form-or-prompt-heading" className="lg:col-span-1">
          {currentStep === 'form' && (
            <>
              <h2 id="form-or-prompt-heading" className="sr-only">Formulario de creación de personaje</h2>
              <CharacterForm
                attributes={attributes}
                onAttributeChange={handleAttributeChange}
                onSubmit={handleGeneratePromptClicked}
                isEnhancingPrompt={isEnhancingPrompt} 
                isGeneratingImage={isGeneratingImage}
              />
            </>
          )}
          {currentStep === 'review' && (
            <>
              <h2 id="form-or-prompt-heading" className="sr-only">Revisión y edición del prompt</h2>
              <PromptReviewArea
                initialPrompt={displayPrompt}
                onGenerateImage={handleGenerateImageClickedFromReview} // Changed to new handler
                onBackToForm={handleBackToFormClicked}
                isLoading={isGeneratingImage} 
              />
            </>
          )}
        </section>
        <section aria-labelledby="image-display-heading" className="lg:col-span-1">
           <h2 id="image-display-heading" className="sr-only">Visualización de imagen generada</h2>
          <ImageDisplay
            imageData={generatedImage}
            isLoading={isGeneratingImage || isEnhancingPrompt} 
            error={error}
            onImageClick={openImageModal} 
          />
        </section>
      </main>

      {generatedImage && (
         <ImageModal 
            isOpen={isImageModalOpen}
            imageData={generatedImage}
            onClose={closeImageModal}
         />
      )}

      <footer className="text-center mt-10 lg:mt-16 py-6 border-t border-slate-700">
        <p className="text-sm text-slate-400">
          Desarrollado con React, Tailwind CSS y Gemini API.
        </p>
      </footer>
    </div>
  );
};

export default App;