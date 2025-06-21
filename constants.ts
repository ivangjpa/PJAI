import { CharacterSpecies, CharacterGender, ArtStyle, Mood, LightingStyle, ColorPalette, ImageQuality, ImageAspectRatio, CameraAngle, CharacterPose, ClothingType, ClothingMaterial, CharacterAttributes } from './types';

export const SPECIES_OPTIONS = Object.values(CharacterSpecies).map(value => ({ value, label: value }));
export const GENDER_OPTIONS = Object.values(CharacterGender).map(value => ({ value, label: value }));
export const POSE_OPTIONS = Object.values(CharacterPose).map(value => ({value, label: value}));

export const CLOTHING_TYPE_OPTIONS = Object.values(ClothingType).map(value => ({ value, label: value }));
export const CLOTHING_MATERIAL_OPTIONS = Object.values(ClothingMaterial).map(value => ({ value, label: value }));

export const ART_STYLE_OPTIONS = Object.values(ArtStyle).map(value => ({ value, label: value }));
export const MOOD_OPTIONS = Object.values(Mood).map(value => ({ value, label: value }));
export const LIGHTING_STYLE_OPTIONS = Object.values(LightingStyle).map(value => ({ value, label: value }));
export const COLOR_PALETTE_OPTIONS = Object.values(ColorPalette).map(value => ({ value, label: value }));
export const IMAGE_QUALITY_OPTIONS = Object.values(ImageQuality).map(value => ({ value, label: value }));

// Updated ASPECT_RATIO_OPTIONS with user-friendly labels
export const ASPECT_RATIO_OPTIONS = [
  { value: ImageAspectRatio.RATIO_1_1, label: "1:1 (Cuadrado)" },
  { value: ImageAspectRatio.RATIO_9_16, label: "9:16 (Retrato Vertical)" },
  { value: ImageAspectRatio.RATIO_16_9, label: "16:9 (Paisaje Horizontal)" },
  { value: ImageAspectRatio.RATIO_3_4, label: "3:4 (Retrato Clásico)" },
  { value: ImageAspectRatio.RATIO_4_3, label: "4:3 (Paisaje Clásico)" },
  { value: ImageAspectRatio.RATIO_2_3, label: "2:3 (Retrato Estrecho)" },
  { value: ImageAspectRatio.RATIO_3_2, label: "3:2 (Paisaje Estrecho)" }
];

export const CAMERA_ANGLE_OPTIONS = Object.values(CameraAngle).map(value => ({ value, label: value }));
// IMAGE_ORIENTATION_OPTIONS is removed

export const INITIAL_ATTRIBUTES: CharacterAttributes = {
  species: CharacterSpecies.ELF,
  gender: CharacterGender.FEMALE,
  pose: CharacterPose.STANDING_NEUTRAL, 
  bodyTypeDescription: "complexión atlética, elegante", 
  
  clothingType: ClothingType.FANTASY_ADVENTURER_GEAR,
  clothingMaterial: ClothingMaterial.LEATHER_MATTE,
  clothingColor: "marrón oscuro con detalles plateados",
  clothingDescription: "una capa desgastada por el viaje y botas altas.", 

  hairDescription: "largo y ondulado, color negro azabache",
  specificFeatures: "ojos brillantes color esmeralda, orejas puntiagudas",
  
  artStyle: ArtStyle.FANTASY_ART,
  mood: Mood.MYSTERIOUS,
  lightingStyle: LightingStyle.DRAMATIC_SHADOWS,
  colorPalette: ColorPalette.DARK_MUTED_SOMBRE,
  backgroundSetting: "un bosque encantado al anochecer",
  
  imageQuality: ImageQuality.HIGH_DETAIL,
  aspectRatio: ImageAspectRatio.RATIO_9_16, 
  cameraAngle: CameraAngle.EYE_LEVEL,
  
  negativePrompt: "", 
  // seed: undefined, // Removed

  customDetails: "sosteniendo un bastón mágico que emite una leve luz azul"
};