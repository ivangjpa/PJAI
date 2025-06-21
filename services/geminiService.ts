import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
// Import ImageAspectRatio if it were needed here, though it's passed as a string.

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error("API_KEY no está configurada. Las llamadas a la API de Gemini fallarán.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! }); 

export const enhancePromptWithGeminiText = async (preliminaryPrompt: string): Promise<string> => {
  if (!API_KEY) {
    throw new Error("La clave API de Google Gemini no está configurada. Por favor, configure la variable de entorno API_KEY.");
  }
  
  const systemInstruction = `Eres un asistente experto en la creación de prompts para IA generativa de imágenes. Tu tarea es tomar el siguiente conjunto de especificaciones técnicas y transformarlas en una descripción natural, vívida y cohesiva en IDIOMA ESPAÑOL que inspire la creación de una imagen visualmente atractiva.

Directivas CRÍTICAS para la transformación:
1. IDIOMA Y NATURALIDAD: El prompt mejorado final DEBE ESTAR COMPLETAMENTE EN ESPAÑOL. Enriquece el lenguaje para que sea más descriptivo y evocador, pero sin alterar la sustancia ni las directivas originales.
2. CONSERVACIÓN TOTAL DE DETALLES: Debes mantener ABSOLUTAMENTE TODOS los detalles, imperativos, restricciones y especificaciones técnicas (como especie, género, estilo artístico, composición, calidad, etc.) del prompt original.
3. ÉNFASIS EN PARÁMETROS CLAVE: Presta especial atención a mantener y enfatizar la instrucción sobre el 'Ángulo de Cámara ESPECÍFICO / Tipo de Plano OBLIGATORIO' del prompt original, asegurándote de que esta directiva sea clara, prominente y se formule de manera imperativa en el texto en español. También preserva la directiva sobre 'Calidad de Imagen / Nivel de Detalle'.
4. FORMATO DE SALIDA: El resultado debe ser ÚNICAMENTE el prompt mejorado en español. No incluyas comentarios, introducciones, saludos, explicaciones adicionales, ni ningún texto que no sea el propio prompt.

Prompt técnico a transformar:
---
${preliminaryPrompt}
---
`;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash-preview-04-17', 
      contents: systemInstruction,
    });
    
    const enhancedText = response.text;

    if (!enhancedText || enhancedText.trim() === "") {
        console.warn("Gemini devolvió un prompt mejorado vacío. Se usará el prompt original.");
        return preliminaryPrompt; 
    }
    return enhancedText;

  } catch (error) {
    console.error("Error al mejorar el prompt con Gemini API:", error);
    if (error instanceof Error) {
      const geminiError = error as any;
      if (geminiError.message && geminiError.message.includes("API key not valid")) {
        throw new Error("Clave API no válida para mejorar prompt. Verifique su API_KEY.");
      }
      throw new Error(`Error al mejorar prompt: ${error.message}`);
    }
    throw new Error("Error desconocido al mejorar el prompt.");
  }
};


export const generateImageFromPrompt = async (
  prompt: string, 
  aspectRatioValue: string,
  // seed?: number, // Seed parameter removed
  negativePrompt?: string
): Promise<string> => {
  if (!API_KEY) {
    throw new Error("La clave API de Google Gemini no está configurada. Por favor, configure la variable de entorno API_KEY.");
  }
  
  const imageConfig: any = { 
    numberOfImages: 1, 
    outputMimeType: 'image/jpeg',
    aspectRatio: aspectRatioValue
  };

  // Seed configuration removed as it's not supported
  // if (seed !== undefined && !isNaN(seed)) {
  //   imageConfig.seed = seed;
  // }

  if (negativePrompt && negativePrompt.trim() !== "") {
    imageConfig.negativePrompt = negativePrompt.trim();
  }

  try {
    const response = await ai.models.generateImages({
      model: 'imagen-3.0-generate-002',
      prompt: prompt,
      config: imageConfig,
    });

    if (response.generatedImages && response.generatedImages.length > 0 && response.generatedImages[0].image?.imageBytes) {
      return response.generatedImages[0].image.imageBytes;
    } else {
      console.error("Respuesta inesperada de la API de generación de imágenes:", response);
      throw new Error("La API no devolvió ninguna imagen o la estructura de la respuesta fue inesperada.");
    }
  } catch (error) {
    console.error("Error al generar imagen con Gemini API:", error);
    if (error instanceof Error) {
        const geminiError = error as any; 
        if (geminiError.message && geminiError.message.includes("API key not valid")) {
             throw new Error("Clave API no válida para generar imagen. Verifique su API_KEY.");
        }
        if (geminiError.message && geminiError.message.includes("quota")) {
            throw new Error("Se ha excedido la cuota de la API para generar imagen. Inténtelo más tarde.");
        }
         throw new Error(`Error al generar imagen: ${error.message}`);
    }
    throw new Error("Error desconocido al generar imagen.");
  }
};