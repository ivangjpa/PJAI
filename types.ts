export enum CharacterSpecies {
  ELF = "Elfo",
  ORC = "Orco",
  HUMAN = "Humano",
  DWARF = "Enano",
  CYBORG = "Cyborg",
  ALIEN = "Alien",
  FANTASY_CREATURE = "Criatura Fantástica",
  ROBOT = "Robot",
  UNDEAD = "No-muerto",
  MYTHICAL_BEING = "Ser Mítico"
}

export enum CharacterGender {
  MALE = "Masculino",
  FEMALE = "Femenino",
  NON_BINARY = "No Binario",
  UNSPECIFIED = "Sin especificar"
}

export enum CharacterPose {
  STANDING_NEUTRAL = "De pie, neutral, vista frontal",
  STANDING_HEROIC = "De pie, pose heroica (pecho erguido, puños en cadera)",
  STANDING_CONFIDENT = "De pie, confiado (brazos cruzados, mirando al espectador)",
  STANDING_THINKING = "De pie, pensativo (mano en la barbilla, mirando a un lado)",
  WALKING_FORWARD = "Caminando hacia adelante con determinación",
  RUNNING_DYNAMIC_ACTION = "Corriendo, en plena acción dinámica",
  JUMPING_MID_AIR = "Saltando en el aire (acción, dinámico)",
  SITTING_RELAXED_ON_CHAIR = "Sentado, relajado en una silla o trono",
  SITTING_THOUGHTFUL_GROUND = "Sentado en el suelo, pensativo (codos en rodillas)",
  CROUCHING_STEALTHILY = "Agachado, en pose sigilosa o de acecho",
  KNEELING_RESPECTFUL = "Arrodillado, en señal de respeto o sumisión",
  LYING_DOWN_RELAXED_POSE = "Tumbado, en pose relajada o descansando",
  FIGHTING_STANCE_READY = "En guardia, listo para el combate (con o sin arma)",
  ACTION_ATTACKING_LUNGE = "Atacando, en plena embestida o golpe",
  ACTION_DEFENDING_BLOCK = "Defendiendo, bloqueando un ataque (con escudo o brazos)",
  MAGICAL_CASTING_HANDS_UP = "Lanzando un hechizo (manos en alto, energía visible)",
  DANCING_GRACEFUL_MOVEMENT = "Bailando, con movimiento grácil y fluido",
  LEANING_CASUALLY_WALL = "Apoyado casualmente contra una pared u objeto",
  FLYING_DYNAMIC_POSE_AIR = "Volando, en pose dinámica en el aire",
  MEDITATING_CROSS_LEGGED = "Meditando, sentado con las piernas cruzadas, sereno",
  LOOKING_INTO_DISTANCE = "Mirando a la distancia, contemplativo o vigilante",
  HANDS_ON_HIPS_AUTHORITATIVE = "Con las manos en las caderas, pose autoritaria",
  REACHING_OUT_HAND = "Extendiendo una mano (ofreciendo, pidiendo o tocando algo)",
  VICTORY_POSE_ARM_RAISED = "Pose de victoria (brazo alzado, exultante)",
  STEALTH_MOVEMENT_LOW_PROFILE = "Movimiento sigiloso, perfil bajo, acechando"
}

export enum ArtStyle {
  PHOTOREALISTIC = "Fotorrealista",
  CARTOON = "Dibujo Animado Clásico",
  ANIME_MANGA = "Anime/Manga Japonés",
  PIXEL_ART = "Pixel Art Detallado",
  FANTASY_ART = "Arte Fantástico Épico",
  SCI_FI_ART = "Arte Sci-Fi Futurista",
  WATERCOLOR = "Acuarela Suave",
  OIL_PAINTING = "Pintura al Óleo Clásica",
  STEAMPUNK = "Estilo Steampunk Detallado",
  CYBERPUNK = "Estilo Cyberpunk Neón",
  IMPRESSIONIST = "Impresionista",
  SURREALIST = "Surrealista Abstracto",
  MINIMALIST = "Minimalista Moderno",
  ABSTRACT_ART = "Arte Abstracto Expresivo",
  COMIC_BOOK_ART = "Estilo Cómic Americano",
  GOTHIC_ART = "Arte Gótico Oscuro",
  POP_ART = "Pop Art Vibrante",
  CONCEPT_ART = "Arte Conceptual (Videojuegos/Películas)",
  BLACK_AND_WHITE_CLASSIC = "Blanco y Negro Clásico",
  SEPIA_TONE = "Tono Sepia Vintage",
  PENCIL_SKETCH = "Boceto a Lápiz Artístico",
  GRADIENT_ART = "Arte Degradado Moderno",
  STAINED_GLASS = "Vidriera Artística",
  MOSAIC_ART = "Mosaico Detallado",
  TRIBAL_ART = "Arte Tribal Auténtico",
  GRAFFITI_ART = "Estilo Graffiti Urbano",
  RENDER_3D_STYLED = "Render 3D Estilizado",
  ISOMETRIC_VIEW = "Vista Isométrica Detallada",
  LOW_POLY_ART = "Arte Low Poly Geométrico",
  VAPORWAVE_AESTHETIC = "Estética Vaporwave"
}

export enum Mood {
  HAPPY = "Feliz, Alegre",
  SAD = "Triste, Melancólico",
  ANGRY = "Enojado, Furioso",
  MYSTERIOUS = "Misterioso, Enigmático",
  EPIC = "Épico, Grandioso",
  PEACEFUL = "Pacífico, Sereno",
  DETERMINED = "Determinado, Resuelto",
  CHAOTIC = "Caótico, Desordenado",
  HEROIC = "Heroico, Valiente",
  PLAYFUL = "Juguetón, Travieso",
  SOLEMN = "Solemne, Grave",
  UNSETTLING = "Inquietante, Perturbador",
  ENERGETIC = "Energético, Dinámico",
  DREAMY = "Soñador, Etéreo",
  TENSE = "Tenso, Suspenso",
  GLORIOUS = "Glorioso, Triunfante",
  MACABRE = "Macabro, Siniestro",
  NOSTALGIC = "Nostálgico, Reminiscente",
  APOCALYPTIC = "Apocalíptico, Desolado",
  ROMANTIC = "Romántico, Apasionado",
  HOPEFUL = "Esperanzador",
  DESPERATE = "Desesperado",
  VENGEFUL = "Vengativo",
  CURIOUS = "Curioso",
  CONTENT = "Contento, Satisfecho"
}

export enum LightingStyle {
  BRIGHT_DAYLIGHT = "Luz diurna brillante y clara",
  OVERCAST = "Cielo Nublado, luz difusa",
  GOLDEN_HOUR = "Hora dorada (amanecer/atardecer)",
  BLUE_HOUR = "Hora azul (crepúsculo)",
  NIGHT_NEON = "Neón nocturno brillante",
  MYSTICAL_GLOW = "Brillo místico o mágico",
  DRAMATIC_SHADOWS = "Sombras dramáticas y profundas",
  MOONLIGHT = "Luz de luna llena",
  CANDLELIGHT = "Luz de vela íntima",
  VOLUMETRIC_LIGHTING = "Luz volumétrica (rayos visibles)",
  BACKLIGHT_SILHOUETTE = "Contraluz creando silueta",
  STUDIO_LIGHTING = "Iluminación de estudio profesional",
  UNDERWATER_LIGHT = "Luz subacuática etérea",
  FIRE_LIGHT = "Luz de fuego (fogata, antorchas)",
  CINEMATIC_LIGHTING = "Iluminación cinematográfica dramática",
  FAIRY_LIGHTS = "Luces de hadas decorativas",
  SPOTLIGHTS = "Focos de luz (Spotlights)",
  CELESTIAL_LIGHT = "Luz celestial o divina",
  DARK_AMBIENT_FOCUSED = "Ambiente oscuro con focos de luz",
  IRIDESCENT_LIGHT = "Luz iridiscente cambiante",
  FLASHLIGHT_BEAM = "Haz de luz de linterna",
  NUCLEAR_GLOW = "Resplandor nuclear o post-apocalíptico",
  AURORA_BOREALIS_LIGHT = "Luz de Aurora Boreal",
  FILTERED_LIGHT = "Luz filtrada (a través de hojas, persianas)",
  HIGH_CONTRAST_NOIR = "Blanco y negro de alto contraste (Noir)"
}

export enum ColorPalette {
  VIBRANT_MULTI = "Vibrante y Multicolor",
  PASTEL_SOFT = "Pastel Suave y Delicado",
  MONOCHROME_SHADES = "Monocromático (varios tonos de un color)",
  EARTH_TONES_NATURAL = "Tonos Tierra Naturales",
  NEON_BRIGHT = "Neón Eléctrico Brillante",
  DARK_MUTED_SOMBRE = "Oscura y Apagada Sombría",
  FULL_RAINBOW = "Arcoíris Completo Espectral",
  METALLIC_SHINE = "Metálicos (oro, plata, bronce, cromo)",
  GRAYSCALE_BW = "Escala de Grises (Blanco y Negro)",
  SEPIA_VINTAGE = "Tonos Sepia Vintage",
  JEWEL_TONES_RICH = "Tonos Joya Ricos (rubí, esmeralda, zafiro)",
  AQUATIC_BLUES_GREENS = "Acuáticos (azules y verdes marinos)",
  VOLCANIC_REDS_ORANGES = "Volcánicos (rojos, naranjas, negros intensos)",
  DESERT_SANDS_OCHRES = "Desérticos (arenas, ocres, marrones claros)",
  WINTER_COOL_BLUES_WHITES = "Invernales (blancos, azules fríos, grises pálidos)",
  AUTUMNAL_WARM_BROWNS_REDS = "Otoñales (naranjas, marrones, rojos apagados)",
  SPRING_FRESH_GREENS_PINKS = "Primaverales (verdes claros, rosas, amarillos suaves)",
  TROPICAL_EXOTIC_BRIGHT = "Tropicales (colores brillantes y exóticos)",
  GOTHIC_DARK_PURPLES_REDS = "Góticos Oscuros (negro, morado oscuro, rojo sangre)",
  CYBERPUNK_NEON_DARK_BG = "Cyberpunk (Neón sobre Fondo Oscuro)",
  SOLARIZED_EFFECT = "Efecto Solarizado",
  HIGH_CONTRAST_BLACK_WHITE = "Alto Contraste Blanco y Negro Puro",
  COMPLEMENTARY_BOLD = "Complementarios Llamativos y Audaces",
  ANALOGOUS_HARMONIOUS = "Análogos Armoniosos y Suaves",
  TRIADIC_BALANCED = "Triádicos Equilibrados y Vibrantes",
  DUOTONE_SPECIFIC = "Duotono (dos colores específicos contrastantes)"
}

export enum ImageQuality {
  STANDARD = "Calidad Estándar", // e.g., "standard quality"
  HIGH_DETAIL = "Alta Calidad, más detalles", // e.g., "high quality, more details"
  ULTRA_DETAIL = "Ultra Detallada, calidad cinematográfica" // e.g., "ultra detailed, cinematic quality"
}

// Updated to reflect API supported values directly. Labels will be in constants.ts
export enum ImageAspectRatio {
  RATIO_1_1 = "1:1",
  RATIO_9_16 = "9:16", // Portrait
  RATIO_16_9 = "16:9", // Landscape
  RATIO_4_3 = "4:3",   // Landscape-ish
  RATIO_3_4 = "3:4",   // Portrait-ish
  RATIO_3_2 = "3:2",   // Landscape-ish
  RATIO_2_3 = "2:3"    // Portrait-ish
}

export enum CameraAngle {
  EYE_LEVEL = "Nivel de los ojos",
  LOW_ANGLE = "Ángulo bajo (contrapicado)",
  HIGH_ANGLE = "Ángulo alto (picado)",
  DUTCH_ANGLE = "Ángulo holandés (aberrante)",
  CLOSE_UP = "Primer plano (rostro/detalle importante)",
  MEDIUM_SHOT = "Plano medio (cintura para arriba)",
  FULL_SHOT = "Plano completo (cuerpo entero)",
  BIRDS_EYE_VIEW = "Vista de pájaro (cenital)"
}

// ImageOrientation enum is removed

export enum ClothingType {
  // Bikinis y bañadores
  BIKINI_CLASSIC = "Bikini clásico",
  BIKINI_TANGA = "Bikini tanga",
  BIKINI_HIGH_LEG = "Bikini de pierna alta",
  BIKINI_SPORT = "Bikini deportivo",
  BIKINI_TRIANGLE = "Bikini de triángulo",
  BIKINI_BANDEAU = "Bikini bandeau (sin tirantes)",
  SWIMSUIT_ONE_PIECE = "Bañador de una pieza",
  SWIMSUIT_CUTOUT = "Bañador con aberturas (cut-out)",
  // Ropa general
  CASUAL_OUTFIT = "Atuendo casual (jeans y camiseta)",
  ELEGANT_DRESS = "Vestido elegante de noche",
  FORMAL_SUIT_MALE = "Traje formal masculino",
  FORMAL_SUIT_FEMALE = "Traje formal femenino (pantalón o falda)",
  ROBE_MAGE = "Túnica de mago/hechicera",
  ARMOR_KNIGHT = "Armadura de caballero medieval",
  ARMOR_SCI_FI = "Armadura futurista/sci-fi",
  LEATHER_JACKET_PANTS = "Chaqueta y pantalones de cuero",
  TACTICAL_GEAR = "Equipo táctico/militar moderno",
  NOMAD_ROBES = "Vestiduras de nómada del desierto",
  ROYAL_GOWN = "Vestido real opulento",
  STEAMPUNK_OUTFIT = "Atuendo Steampunk complejo",
  CYBERPUNK_GEAR = "Ropa Cyberpunk con implantes",
  POST_APOCALYPTIC_RAGS = "Harapos post-apocalípticos",
  FANTASY_ADVENTURER_GEAR = "Equipo de aventurero de fantasía",
  SPORTSWEAR_MODERN = "Ropa deportiva moderna",
  LINGERIE_SET = "Conjunto de lencería",
  HISTORICAL_GARB = "Vestimenta histórica específica (ej. victoriana)",
  WORK_UNIFORM = "Uniforme de trabajo específico (ej. científico)",
  FESTIVAL_ATTIRE = "Atuendo de festival bohemio",
  NINJA_OUTFIT = "Traje de Ninja sigiloso",
  PIRATE_CLOTHING = "Ropa de pirata"
}

export enum ClothingMaterial {
  COTTON = "Algodón",
  LINEN = "Lino",
  SILK = "Seda",
  SILK_TRANSPARENT = "Seda transparente",
  WOOL = "Lana",
  LEATHER_MATTE = "Cuero mate",
  LEATHER_SHINY = "Cuero brillante",
  SUEDE = "Ante",
  DENIM = "Tela vaquera (Denim)",
  VELVET = "Terciopelo",
  SATIN = "Satén",
  LACE = "Encaje",
  LATEX_OPAQUE = "Látex opaco",
  LATEX_TRANSLUCENT = "Látex translúcido",
  NEOPRENE = "Neopreno",
  METALLIC_FABRIC = "Tela metálica (brillante)",
  CHAINMAIL = "Cota de malla",
  PLATE_METAL_ARMOR = "Metal de placas (armadura)",
  CARBON_FIBER = "Fibra de carbono",
  SYNTHETIC_FIBER_SPORT = "Fibra sintética deportiva",
  FUR_FAUX = "Piel sintética",
  BROCADE = "Brocado (tela con relieves)",
  CHIFFON = "Gasa (Chiffon)",
  ORGANZA = "Organza",
  RUBBER = "Goma/Caucho",
  PLASTIC_TRANSPARENT = "Plástico transparente rígido"
}


export interface CharacterAttributes {
  species: CharacterSpecies;
  gender: CharacterGender;
  pose: CharacterPose;
  bodyTypeDescription: string; 
  
  // Clothing
  clothingType: ClothingType;
  clothingMaterial: ClothingMaterial;
  clothingColor: string; 
  clothingDescription: string; 

  hairDescription: string;
  specificFeatures: string;
  
  artStyle: ArtStyle;
  mood: Mood;
  lightingStyle: LightingStyle;
  colorPalette: ColorPalette;
  backgroundSetting: string;
  
  imageQuality: ImageQuality;
  aspectRatio: ImageAspectRatio; 
  cameraAngle: CameraAngle;
  
  negativePrompt: string; 

  customDetails: string;
}

export interface PromptHistoryItem {
  id: string;
  name: string;
  timestamp: number;
  attributes: CharacterAttributes;
  promptText: string;
}