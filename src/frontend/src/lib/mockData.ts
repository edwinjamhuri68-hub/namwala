import type {
  AnimalListing,
  AnimalListingFull,
  AnimalRecord,
  AppNotification,
  Conversation,
  CropListing,
  DiagnosisResult,
  FarmRecord,
  InputProduct,
  MarketListing,
  MarketPrice,
  Message,
  Rating,
  ServiceListing,
  SoilReport,
  TransportProvider,
  UserProfile,
  WeatherData,
} from "@/types";

export const WEATHER_DATA: Record<string, WeatherData> = {
  Dodoma: {
    location: "Dodoma",
    temperature: 30,
    feelsLike: 33,
    condition: "Partly Cloudy",
    humidity: 58,
    windSpeed: 14,
    rainfall: 0,
    forecast: [
      { day: "Sun", high: 31, low: 18, condition: "Sunny", icon: "☀️" },
      { day: "Mon", high: 29, low: 17, condition: "Partly Cloudy", icon: "⛅" },
      { day: "Tue", high: 27, low: 16, condition: "Rainy", icon: "🌧️" },
    ],
  },
  Arusha: {
    location: "Arusha",
    temperature: 22,
    feelsLike: 23,
    condition: "Clear Sky",
    humidity: 72,
    windSpeed: 8,
    rainfall: 2.5,
    forecast: [
      { day: "Sun", high: 23, low: 14, condition: "Clear Sky", icon: "☀️" },
      { day: "Mon", high: 21, low: 13, condition: "Cloudy", icon: "☁️" },
      { day: "Tue", high: 19, low: 12, condition: "Rainy", icon: "🌧️" },
    ],
  },
  Mwanza: {
    location: "Mwanza",
    temperature: 27,
    feelsLike: 30,
    condition: "Sunny",
    humidity: 65,
    windSpeed: 11,
    rainfall: 0,
    forecast: [
      { day: "Sun", high: 28, low: 19, condition: "Sunny", icon: "☀️" },
      { day: "Mon", high: 27, low: 18, condition: "Partly Cloudy", icon: "⛅" },
      { day: "Tue", high: 25, low: 17, condition: "Partly Cloudy", icon: "⛅" },
    ],
  },
  "Dar es Salaam": {
    location: "Dar es Salaam",
    temperature: 32,
    feelsLike: 36,
    condition: "Partly Cloudy",
    humidity: 80,
    windSpeed: 16,
    rainfall: 0,
    forecast: [
      { day: "Sun", high: 33, low: 24, condition: "Sunny", icon: "☀️" },
      { day: "Mon", high: 31, low: 23, condition: "Partly Cloudy", icon: "⛅" },
      { day: "Tue", high: 29, low: 22, condition: "Rainy", icon: "🌧️" },
    ],
  },
  Mbeya: {
    location: "Mbeya",
    temperature: 25,
    feelsLike: 26,
    condition: "Clear Sky",
    humidity: 62,
    windSpeed: 9,
    rainfall: 0,
    forecast: [
      { day: "Sun", high: 26, low: 15, condition: "Sunny", icon: "☀️" },
      { day: "Mon", high: 24, low: 14, condition: "Clear Sky", icon: "☀️" },
      { day: "Tue", high: 22, low: 13, condition: "Partly Cloudy", icon: "⛅" },
    ],
  },
};

export const MARKET_PRICES: MarketPrice[] = [
  {
    commodity: "Maize",
    commoditySwahili: "Mahindi",
    pricePerKg: 950,
    currency: "TSh",
    trend: "up",
    changeAmount: 20,
    market: "Kariakoo",
    updatedAt: "2025-05-05T08:00:00Z",
    category: "crop",
  },
  {
    commodity: "Rice",
    commoditySwahili: "Mchele",
    pricePerKg: 2100,
    currency: "TSh",
    trend: "down",
    changeAmount: 50,
    market: "Mwenge",
    updatedAt: "2025-05-05T08:00:00Z",
    category: "crop",
  },
  {
    commodity: "Coffee",
    commoditySwahili: "Kahawa",
    pricePerKg: 4500,
    currency: "TSh",
    trend: "up",
    changeAmount: 120,
    market: "Moshi",
    updatedAt: "2025-05-05T08:00:00Z",
    category: "crop",
  },
  {
    commodity: "Sunflower",
    commoditySwahili: "Alizeti",
    pricePerKg: 1400,
    currency: "TSh",
    trend: "stable",
    changeAmount: 0,
    market: "Singida",
    updatedAt: "2025-05-05T08:00:00Z",
    category: "crop",
  },
  {
    commodity: "Cassava",
    commoditySwahili: "Muhogo",
    pricePerKg: 450,
    currency: "TSh",
    trend: "up",
    changeAmount: 15,
    market: "Bagamoyo",
    updatedAt: "2025-05-05T08:00:00Z",
    category: "crop",
  },
  {
    commodity: "Beans",
    commoditySwahili: "Maharagwe",
    pricePerKg: 2300,
    currency: "TSh",
    trend: "down",
    changeAmount: 80,
    market: "Kariakoo",
    updatedAt: "2025-05-05T08:00:00Z",
    category: "crop",
  },
  {
    commodity: "Cattle",
    commoditySwahili: "Ng'ombe",
    pricePerKg: 6500,
    currency: "TSh",
    trend: "up",
    changeAmount: 200,
    market: "Arusha",
    updatedAt: "2025-05-05T08:00:00Z",
    category: "livestock",
  },
  {
    commodity: "Goats",
    commoditySwahili: "Mbuzi",
    pricePerKg: 5200,
    currency: "TSh",
    trend: "stable",
    changeAmount: 0,
    market: "Dodoma",
    updatedAt: "2025-05-05T08:00:00Z",
    category: "livestock",
  },
  {
    commodity: "Chickens",
    commoditySwahili: "Kuku",
    pricePerKg: 4800,
    currency: "TSh",
    trend: "up",
    changeAmount: 300,
    market: "Mwanza",
    updatedAt: "2025-05-05T08:00:00Z",
    category: "livestock",
  },
];

export const FARM_RECORDS: FarmRecord[] = [
  {
    id: "f1",
    farmerId: "u1",
    name: "Shamba la Juma",
    location: "Mbeya Rural",
    size: 5,
    sizeUnit: "acres",
    crops: ["Maize", "Sunflower", "Beans"],
    soilType: "Loam",
    lastUpdated: "2025-04-30",
    imageUrl: "/assets/generated/hero-agriculture.dim_800x500.jpg",
  },
  {
    id: "f2",
    farmerId: "u1",
    name: "Northern Plot",
    location: "Mbeya North",
    size: 2.5,
    sizeUnit: "acres",
    crops: ["Cassava", "Sweet Potato"],
    soilType: "Sandy Loam",
    lastUpdated: "2025-04-28",
    imageUrl: "/assets/generated/hero-agriculture.dim_800x500.jpg",
  },
];

export const ANIMAL_RECORDS: AnimalRecord[] = [
  {
    id: "a1",
    keeperId: "u2",
    animalType: "Cattle",
    count: 12,
    healthStatus: "healthy",
    lastCheckDate: "2025-05-03T08:30:00Z",
    vaccinationStatus: "Up to date",
    notes: "All herd vaccinated for FMD",
  },
  {
    id: "a2",
    keeperId: "u2",
    animalType: "Goats",
    count: 35,
    healthStatus: "healthy",
    lastCheckDate: "2025-05-04T10:00:00Z",
    vaccinationStatus: "Due in 10 days",
    notes: "PPR vaccination due",
  },
  {
    id: "a3",
    keeperId: "u2",
    animalType: "Chickens",
    count: 150,
    healthStatus: "under_treatment",
    lastCheckDate: "2025-05-05T07:00:00Z",
    vaccinationStatus: "Partial",
    notes: "Newcastle disease treatment ongoing",
  },
];

export const CROP_LISTINGS: CropListing[] = [
  {
    id: "cl1",
    farmerId: "u1",
    farmerName: "Juma Mwangi",
    cropType: "Maize",
    quantity: 2000,
    unit: "kg",
    pricePerUnit: 900,
    location: "Mbeya",
    quality: "excellent",
    availableFrom: "2025-05-10",
    imageUrl: "/assets/generated/hero-agriculture.dim_800x500.jpg",
    description: "Freshly harvested yellow maize, well dried and bagged.",
  },
  {
    id: "cl2",
    farmerId: "u3",
    farmerName: "Peter Kamau",
    cropType: "Beans",
    quantity: 500,
    unit: "kg",
    pricePerUnit: 2100,
    location: "Arusha",
    quality: "good",
    availableFrom: "2025-05-08",
    imageUrl: "/assets/generated/hero-agriculture.dim_800x500.jpg",
    description: "Red kidney beans, clean and dry.",
  },
  {
    id: "cl3",
    farmerId: "u4",
    farmerName: "Anna Sanga",
    cropType: "Sunflower",
    quantity: 3000,
    unit: "kg",
    pricePerUnit: 1350,
    location: "Singida",
    quality: "excellent",
    availableFrom: "2025-05-15",
    imageUrl: "/assets/generated/hero-agriculture.dim_800x500.jpg",
    description: "Premium sunflower seeds for oil processing.",
  },
];

export const ANIMAL_LISTINGS: AnimalListing[] = [
  {
    id: "al1",
    keeperId: "u2",
    keeperName: "Amina Hassan",
    animalType: "Cattle",
    breed: "Sahiwal Cross",
    count: 5,
    pricePerUnit: 850000,
    location: "Arusha",
    imageUrl: "/assets/generated/livestock-hero.dim_800x500.jpg",
    description: "Mature cattle, healthy and well-fed. Good for dairy or beef.",
  },
  {
    id: "al2",
    keeperId: "u2",
    keeperName: "Amina Hassan",
    animalType: "Goats",
    breed: "Boer Cross",
    count: 20,
    pricePerUnit: 120000,
    location: "Arusha",
    imageUrl: "/assets/generated/livestock-hero.dim_800x500.jpg",
    description: "Boer cross goats, 8-12 months old.",
  },
];

export const ANIMAL_LISTINGS_FULL: AnimalListingFull[] = [
  {
    id: "alf1",
    keeperId: "u2",
    keeperName: "Amina Hassan",
    animalType: "Cattle",
    breed: "Sahiwal Cross",
    age: "4 years",
    count: 5,
    pricePerHead: 850000,
    location: "Arusha",
    healthStatus: "Excellent",
    healthDescription:
      "All vaccinated against FMD, Brucellosis, and Black Quarter. Last vet check May 2025.",
    specialQualities:
      "High milk yield (12L/day). Calm temperament, good for dairy or beef.",
    imageUrl: "/assets/generated/livestock-hero.dim_800x500.jpg",
    isActive: true,
    inquiries: 3,
    createdAt: "2025-04-20T10:00:00Z",
  },
  {
    id: "alf2",
    keeperId: "u2",
    keeperName: "Amina Hassan",
    animalType: "Goats",
    breed: "Boer Cross",
    age: "10 months",
    count: 20,
    pricePerHead: 120000,
    location: "Arusha",
    healthStatus: "Good",
    healthDescription:
      "PPR vaccinated. Currently on mineral supplementation program.",
    specialQualities:
      "Fast-growing, meaty build. Ideal for festive season sales.",
    imageUrl: "/assets/generated/livestock-hero.dim_800x500.jpg",
    isActive: true,
    inquiries: 1,
    createdAt: "2025-04-25T09:00:00Z",
  },
  {
    id: "alf3",
    keeperId: "u2",
    keeperName: "Amina Hassan",
    animalType: "Poultry",
    breed: "Kuroiler",
    age: "6 months",
    count: 80,
    pricePerHead: 18000,
    location: "Arusha",
    healthStatus: "Excellent",
    healthDescription:
      "Newcastle and Marek's disease vaccinated. Free-range raised.",
    specialQualities:
      "Dual-purpose breed — excellent egg layer and good meat yield.",
    isActive: false,
    inquiries: 0,
    createdAt: "2025-05-01T11:00:00Z",
  },
];

export const MARKETPLACE_LISTINGS: MarketListing[] = [
  {
    id: "ml1",
    sellerId: "u5",
    sellerName: "Ally Agro Supplies",
    type: "input",
    title: "NPK Fertilizer 50kg",
    description: "High quality NPK 17-17-17 compound fertilizer.",
    price: 95000,
    unit: "bag",
    quantity: 200,
    location: "Mwanza",
    imageUrl: "/assets/generated/hero-agriculture.dim_800x500.jpg",
    category: "fertilizer",
    createdAt: "2025-04-28",
  },
  {
    id: "ml2",
    sellerId: "u5",
    sellerName: "Ally Agro Supplies",
    type: "input",
    title: "Hybrid Maize Seeds 5kg",
    description: "SEEDCO SC403 certified hybrid maize seeds.",
    price: 18500,
    unit: "pack",
    quantity: 500,
    location: "Mwanza",
    imageUrl: "/assets/generated/hero-agriculture.dim_800x500.jpg",
    category: "seeds",
    createdAt: "2025-04-25",
  },
  {
    id: "ml3",
    sellerId: "u6",
    sellerName: "Msigwa Farm Services",
    type: "service",
    title: "Tractor Plowing Service",
    description: "Tractor plowing for 1-10 acres. Fast and efficient.",
    price: 45000,
    unit: "per acre",
    quantity: 50,
    location: "Morogoro",
    imageUrl: "/assets/generated/hero-agriculture.dim_800x500.jpg",
    category: "plowing",
    createdAt: "2025-04-20",
  },
];

export const INPUT_PRODUCTS: InputProduct[] = [
  {
    id: "ip1",
    sellerId: "u5",
    sellerName: "Ally Agro Supplies",
    name: "NPK 17-17-17 Fertilizer",
    category: "fertilizer",
    price: 95000,
    unit: "bags",
    stock: 200,
    description: "Balanced compound fertilizer for all crops.",
    imageUrl: "/assets/generated/hero-agriculture.dim_800x500.jpg",
    location: "Mwanza",
    isActive: true,
    inquiries: 8,
  },
  {
    id: "ip2",
    sellerId: "u5",
    sellerName: "Ally Agro Supplies",
    name: "SEEDCO SC403 Maize Seeds",
    category: "seeds",
    price: 18500,
    unit: "packs",
    stock: 500,
    description: "High-yield hybrid maize seeds, certified.",
    imageUrl: "/assets/generated/hero-agriculture.dim_800x500.jpg",
    location: "Mwanza",
    isActive: true,
    inquiries: 14,
  },
  {
    id: "ip3",
    sellerId: "u5",
    sellerName: "Ally Agro Supplies",
    name: "Dudu Kill Pesticide",
    category: "pesticide",
    price: 12000,
    unit: "litres",
    stock: 150,
    description: "Broad-spectrum insecticide for crop protection.",
    imageUrl: "/assets/generated/hero-agriculture.dim_800x500.jpg",
    location: "Mwanza",
    isActive: false,
    inquiries: 3,
  },
  {
    id: "ip4",
    sellerId: "u5",
    sellerName: "Ally Agro Supplies",
    name: "Livestock Mineral Feed",
    category: "feed",
    price: 35000,
    unit: "bags",
    stock: 80,
    description: "Mineral supplement for dairy and beef cattle.",
    imageUrl: "/assets/generated/livestock-hero.dim_800x500.jpg",
    location: "Mwanza",
    isActive: true,
    inquiries: 5,
  },
];

export const SERVICE_LISTINGS: ServiceListing[] = [
  {
    id: "sl1",
    providerId: "u6",
    providerName: "Msigwa Farm Services",
    serviceType: "plowing",
    title: "Tractor Plowing Service",
    price: 45000,
    priceUnit: "per_acre",
    availability: "Mon-Sat",
    location: "Morogoro",
    description: "Deep plowing service for maize and sunflower farms.",
    imageUrl: "/assets/generated/hero-agriculture.dim_800x500.jpg",
  },
  {
    id: "sl2",
    providerId: "u6",
    providerName: "Msigwa Farm Services",
    serviceType: "spraying",
    title: "Pesticide Spraying",
    price: 25000,
    priceUnit: "per_acre",
    availability: "Daily",
    location: "Morogoro",
    description: "Motorized pesticide and herbicide spraying.",
    imageUrl: "/assets/generated/hero-agriculture.dim_800x500.jpg",
  },
  {
    id: "sl3",
    providerId: "u9",
    providerName: "Kariuki Transport",
    serviceType: "transport",
    title: "Farm Produce Transport",
    price: 180000,
    priceUnit: "per_trip",
    availability: "Daily",
    location: "Arusha",
    description: "5-ton truck for transporting crops to market.",
    imageUrl: "/assets/generated/hero-agriculture.dim_800x500.jpg",
  },
];

export const CONVERSATIONS: Conversation[] = [
  {
    id: "cv1",
    participants: ["u1", "u4"],
    participantNames: ["Juma Mwangi", "Dr. Sarah Ndunguru"],
    lastMessage:
      "I have reviewed your crop images. Please schedule a farm visit.",
    lastMessageTime: "2025-05-05T08:30:00Z",
    unreadCount: 2,
    topic: "Crop disease consultation",
  },
  {
    id: "cv2",
    participants: ["u1", "u5"],
    participantNames: ["Juma Mwangi", "Mohamed Ally"],
    lastMessage: "The fertilizer will be delivered tomorrow.",
    lastMessageTime: "2025-05-04T14:00:00Z",
    unreadCount: 0,
    topic: "Fertilizer order",
  },
  {
    id: "cv3",
    participants: ["u2", "u3"],
    participantNames: ["Amina Hassan", "Dr. Peter Kimaro"],
    lastMessage: "Continue the treatment for 5 more days.",
    lastMessageTime: "2025-05-05T09:00:00Z",
    unreadCount: 1,
    topic: "Newcastle disease treatment",
  },
];

export const MESSAGES: Message[] = [
  {
    id: "m1",
    conversationId: "cv1",
    senderId: "u4",
    senderName: "Dr. Sarah Ndunguru",
    content:
      "I have received your farm photos. The yellowing leaves indicate nitrogen deficiency combined with early signs of leaf blight.",
    timestamp: "2025-05-05T08:00:00Z",
    read: false,
  },
  {
    id: "m2",
    conversationId: "cv1",
    senderId: "u4",
    senderName: "Dr. Sarah Ndunguru",
    content:
      "I have reviewed your crop images. Please schedule a farm visit for detailed assessment.",
    timestamp: "2025-05-05T08:30:00Z",
    read: false,
  },
  {
    id: "m3",
    conversationId: "cv1",
    senderId: "u1",
    senderName: "Juma Mwangi",
    content: "Thank you doctor. When are you available to visit?",
    timestamp: "2025-05-05T08:45:00Z",
    read: true,
  },
];

export const AI_DIAGNOSES: Record<string, DiagnosisResult> = {
  crop_blight: {
    requestId: "dr1",
    diagnosis: "Early Blight (Alternaria solani)",
    confidence: 87,
    recommendations: [
      "Apply copper-based fungicide within 48 hours",
      "Remove and destroy infected leaves",
      "Avoid overhead irrigation",
      "Improve air circulation between plants",
    ],
    treatmentPlan:
      "Spray with Ridomil Gold MZ at 2.5g/L water. Repeat every 7 days for 3 applications. Ensure good drainage.",
    urgency: "within_24h",
    aiGenerated: true,
  },
  animal_fmd: {
    requestId: "dr2",
    diagnosis: "Foot and Mouth Disease (FMD) Suspected",
    confidence: 73,
    recommendations: [
      "Isolate affected animals immediately",
      "Contact veterinarian urgently",
      "Disinfect all equipment and facilities",
      "Report to local livestock office",
    ],
    treatmentPlan:
      "Isolate animals. Apply antiseptic to mouth and hoof lesions. Provide soft feed and clean water. Veterinary examination required within 24 hours.",
    urgency: "immediate",
    aiGenerated: true,
  },
  soil_acidic: {
    requestId: "dr3",
    diagnosis: "Acidic Soil (pH 5.2) with Low Phosphorus",
    confidence: 91,
    recommendations: [
      "Apply agricultural lime at 2 tonnes/acre",
      "Add superphosphate fertilizer",
      "Incorporate organic matter",
      "Suitable crops: cassava, sweet potato, pineapple",
    ],
    treatmentPlan:
      "Lime application 3 months before planting. Follow with DAP at planting time. Mulch with crop residue.",
    urgency: "within_week",
    aiGenerated: true,
  },
};

export const SOIL_REPORTS: SoilReport[] = [
  {
    id: "sr1",
    farmId: "f1",
    location: "Mbeya Rural",
    ph: 6.2,
    nitrogen: 0.18,
    phosphorus: 12,
    potassium: 185,
    organicMatter: 2.8,
    texture: "loam",
    recommendation:
      "Soil is in good condition. Apply balanced NPK fertilizer and maintain organic matter levels.",
    suitableCrops: ["Maize", "Sunflower", "Beans", "Sorghum"],
    reportDate: "2025-04-15",
  },
];

// Provider search mock data
export type ProviderCategory =
  | "specialist"
  | "veterinarian"
  | "input_seller"
  | "service_provider";

export interface MockProvider {
  id: string;
  name: string;
  category: ProviderCategory;
  location: string;
  rating: number;
  tagline: string;
  taglineSw: string;
  phone?: string;
  email?: string;
  specialization?: string;
  specializationSw?: string;
  offerings?: string[];
}

export const MOCK_PROVIDERS: MockProvider[] = [
  {
    id: "sp1",
    name: "Dr. Sarah Ndunguru",
    category: "specialist",
    location: "Arusha",
    rating: 4.8,
    tagline:
      "Expert in crop disease diagnosis and soil management for 12+ years.",
    taglineSw:
      "Mtaalamu wa magonjwa ya mazao na usimamizi wa udongo kwa miaka 12+.",
    phone: "+255 712 345 678",
    email: "sarah.ndunguru@agri.tz",
    specialization: "Crop Pathology & Soil Science — Maize, Beans, Coffee",
    specializationSw:
      "Magonjwa ya Mazao na Sayansi ya Udongo — Mahindi, Maharagwe, Kahawa",
    offerings: [
      "Crop Disease Diagnosis",
      "Soil Analysis",
      "Farm Visits",
      "Fertilizer Advice",
    ],
  },
  {
    id: "sp2",
    name: "James Omondi",
    category: "specialist",
    location: "Mbeya",
    rating: 4.5,
    tagline:
      "Certified agronomist specializing in highland crop systems and climate adaptation.",
    taglineSw:
      "Mwanakilimo aliyeidhinishwa anayebobea katika mazao ya milima na kukabiliana na hali ya hewa.",
    phone: "+255 754 222 333",
    email: "j.omondi@mbeya-agri.tz",
    specialization: "Agronomy — Sunflower, Maize, Wheat",
    specializationSw: "Ugea wa Mazao — Alizeti, Mahindi, Ngano",
    offerings: [
      "Crop Planning",
      "Soil pH Testing",
      "Pest Management",
      "Yield Improvement",
    ],
  },
  {
    id: "vet1",
    name: "Dr. Peter Kimaro",
    category: "veterinarian",
    location: "Dodoma",
    rating: 4.9,
    tagline:
      "Veterinarian with 15 years experience in cattle, goats, and poultry health.",
    taglineSw:
      "Daktari wa wanyama mwenye uzoefu wa miaka 15 katika afya ya ng'ombe, mbuzi na kuku.",
    phone: "+255 767 891 234",
    email: "peter.kimaro@vettz.tz",
    specialization: "Livestock Health — FMD, Newcastle, PPR vaccinations",
    specializationSw: "Afya ya Mifugo — Chanjo za FMD, Newcastle, PPR",
    offerings: [
      "Animal Diagnosis",
      "Vaccination Services",
      "Treatment Plans",
      "Farm Visits",
    ],
  },
  {
    id: "vet2",
    name: "Dr. Grace Mwamba",
    category: "veterinarian",
    location: "Mwanza",
    rating: 4.6,
    tagline:
      "Specialist in dairy cattle health, milk quality, and reproductive management.",
    taglineSw:
      "Mtaalamu wa afya ya ng'ombe wa maziwa, ubora wa maziwa na usimamizi wa uzazi.",
    phone: "+255 789 456 012",
    email: "grace.mwamba@vetmwanza.tz",
    specialization: "Dairy Cattle & Reproductive Health",
    specializationSw: "Afya ya Ng'ombe wa Maziwa na Uzazi",
    offerings: [
      "Pregnancy Diagnosis",
      "Milk Fever Treatment",
      "Herd Health Plans",
      "Deworming",
    ],
  },
  {
    id: "is1",
    name: "Ally Agro Supplies",
    category: "input_seller",
    location: "Mwanza",
    rating: 4.3,
    tagline:
      "Leading supplier of certified seeds, fertilizers, and pesticides across Lake Zone.",
    taglineSw:
      "Muuzaji mkuu wa mbegu zilizoidhinishwa, mbolea na dawa za wadudu katika Kanda ya Ziwa.",
    phone: "+255 742 100 200",
    email: "ally.agro@supplies.tz",
    specialization: "Agro-inputs — Fertilizers, Seeds, Pesticides",
    specializationSw: "Pembejeo — Mbolea, Mbegu, Dawa",
    offerings: [
      "NPK Fertilizer",
      "Maize Seeds (SEEDCO)",
      "Pesticides",
      "Animal Feed",
      "Herbicides",
    ],
  },
  {
    id: "is2",
    name: "Kilimo Solutions Ltd",
    category: "input_seller",
    location: "Dar es Salaam",
    rating: 4.1,
    tagline:
      "Agricultural inputs wholesaler serving farmers across all Tanzania regions.",
    taglineSw:
      "Muuzaji wa jumla wa pembejeo za kilimo anayehudumia wakulima Tanzania nzima.",
    phone: "+255 713 500 600",
    email: "info@kilimosolutions.tz",
    specialization: "Wholesale Inputs & Equipment",
    specializationSw: "Pembejeo za Jumla na Vifaa",
    offerings: [
      "Drip Irrigation Kits",
      "Sprayers",
      "Bean Seeds",
      "Urea Fertilizer",
      "Lime",
    ],
  },
  {
    id: "svp1",
    name: "Msigwa Farm Services",
    category: "service_provider",
    location: "Morogoro",
    rating: 4.4,
    tagline:
      "Tractor plowing, pesticide spraying, and harvesting services at affordable rates.",
    taglineSw:
      "Huduma za kulima kwa trekta, kunyunyizia dawa na kuvuna kwa bei nafuu.",
    phone: "+255 768 300 400",
    email: "msigwa.services@farm.tz",
    specialization: "Mechanized Farm Services",
    specializationSw: "Huduma za Kilimo kwa Mashine",
    offerings: [
      "Tractor Plowing",
      "Pesticide Spraying",
      "Harvesting",
      "Land Clearing",
    ],
  },
  {
    id: "svp2",
    name: "Furaha Agri Services",
    category: "service_provider",
    location: "Arusha",
    rating: 4.7,
    tagline:
      "Irrigation installation, greenhouse setup, and farm advisory consulting.",
    taglineSw:
      "Ufungaji wa umwagiliaji, usanidi wa chafu na ushauri wa shamba.",
    phone: "+255 755 700 800",
    email: "furaha.agri@services.tz",
    specialization: "Irrigation & Greenhouse Services",
    specializationSw: "Huduma za Umwagiliaji na Chafu",
    offerings: [
      "Drip Irrigation Setup",
      "Greenhouse Construction",
      "Soil Testing",
      "Farm Advisory",
    ],
  },
];

export function getWeatherForLocation(location: string): WeatherData {
  return WEATHER_DATA[location] ?? WEATHER_DATA.Dodoma;
}

export function formatTSh(amount: number): string {
  return `TSh ${amount.toLocaleString()}`;
}

export const TRANSPORT_PROVIDERS: TransportProvider[] = [
  {
    id: "tp1",
    name: "Kariuki Transport Services",
    vehicleType: "truck",
    capacityTons: 5,
    pricePerKm: 2500,
    coverageAreas: ["Dodoma", "Morogoro", "Dar es Salaam"],
    rating: 4.7,
    ratingCount: 23,
    phone: "+255 712 001 100",
    imageUrl: "/assets/generated/hero-agriculture.dim_800x500.jpg",
    description:
      "Reliable 5-ton truck for bulk farm produce. Covered cargo area available.",
    timeSlots: [
      "Mon 6am-10am",
      "Mon 2pm-6pm",
      "Wed 6am-10am",
      "Wed 2pm-6pm",
      "Fri 6am-10am",
    ],
    availabilityStatus: "available",
  },
  {
    id: "tp2",
    name: "Zawadi Pickup Express",
    vehicleType: "pickup",
    capacityTons: 1.2,
    pricePerKm: 1200,
    coverageAreas: ["Mwanza", "Shinyanga", "Kagera"],
    rating: 4.5,
    ratingCount: 41,
    phone: "+255 754 002 200",
    imageUrl: "/assets/generated/hero-agriculture.dim_800x500.jpg",
    description:
      "Fast pickup truck for small to medium loads. Available weekends.",
    timeSlots: ["Sat 7am-11am", "Sat 1pm-5pm", "Sun 8am-12pm"],
    availabilityStatus: "available",
  },
  {
    id: "tp3",
    name: "Msomi Motorcycle Deliveries",
    vehicleType: "motorcycle",
    capacityTons: 0.1,
    pricePerKm: 400,
    coverageAreas: ["Mwanza", "Geita"],
    rating: 4.2,
    ratingCount: 67,
    phone: "+255 768 003 300",
    imageUrl: "/assets/generated/hero-agriculture.dim_800x500.jpg",
    description:
      "Fast motorcycle delivery for lightweight urgent goods and documents.",
    timeSlots: ["Tue 8am-12pm"],
    availabilityStatus: "limited",
  },
  {
    id: "tp4",
    name: "Baraka Heavy Haulage",
    vehicleType: "truck",
    capacityTons: 10,
    pricePerKm: 4500,
    coverageAreas: ["Mbeya", "Iringa", "Dodoma"],
    rating: 4.8,
    ratingCount: 15,
    phone: "+255 742 004 400",
    imageUrl: "/assets/generated/hero-agriculture.dim_800x500.jpg",
    description:
      "10-ton heavy truck for large maize, sunflower, and equipment hauls.",
    timeSlots: ["Thu 7am-1pm", "Thu 2pm-8pm", "Fri 7am-1pm", "Sat 7am-1pm"],
    availabilityStatus: "available",
  },
  {
    id: "tp5",
    name: "Neema Cart & Donkey Services",
    vehicleType: "cart",
    capacityTons: 0.5,
    pricePerKm: 200,
    coverageAreas: ["Singida", "Tabora"],
    rating: 4.0,
    ratingCount: 30,
    phone: "+255 767 005 500",
    imageUrl: "/assets/generated/hero-agriculture.dim_800x500.jpg",
    description:
      "Affordable cart services for short-distance village deliveries and market runs.",
    timeSlots: [],
    availabilityStatus: "full",
  },
  {
    id: "tp6",
    name: "Furaha Minivan Logistics",
    vehicleType: "minivan",
    capacityTons: 0.8,
    pricePerKm: 900,
    coverageAreas: ["Arusha", "Kilimanjaro", "Manyara"],
    rating: 4.6,
    ratingCount: 28,
    phone: "+255 789 006 600",
    imageUrl: "/assets/generated/hero-agriculture.dim_800x500.jpg",
    description:
      "Covered minivan for seeds, pesticides, and delicate cargo. AC available.",
    timeSlots: ["Mon 9am-1pm", "Wed 9am-1pm"],
    availabilityStatus: "limited",
  },
  {
    id: "tp7",
    name: "Asha Produce Transport",
    vehicleType: "pickup",
    capacityTons: 1.5,
    pricePerKm: 1400,
    coverageAreas: ["Pwani", "Tanga", "Morogoro"],
    rating: 4.3,
    ratingCount: 19,
    phone: "+255 755 007 700",
    imageUrl: "/assets/generated/hero-agriculture.dim_800x500.jpg",
    description:
      "Pickup truck specializing in livestock and fresh produce transport.",
    timeSlots: [
      "Tue 6am-10am",
      "Tue 2pm-6pm",
      "Thu 6am-10am",
      "Thu 2pm-6pm",
      "Sat 6am-10am",
    ],
    availabilityStatus: "available",
  },
  {
    id: "tp8",
    name: "Juma Long-Haul Freight",
    vehicleType: "truck",
    capacityTons: 7,
    pricePerKm: 3500,
    coverageAreas: ["Dar es Salaam", "Mwanza", "Arusha"],
    rating: 4.9,
    ratingCount: 11,
    phone: "+255 713 008 800",
    imageUrl: "/assets/generated/hero-agriculture.dim_800x500.jpg",
    description:
      "7-ton truck for cross-country freight. GPS tracked, experienced driver.",
    timeSlots: ["Wed 5am-11am", "Fri 5am-11am", "Fri 12pm-6pm"],
    availabilityStatus: "available",
  },
];

export const MOCK_RATINGS: Rating[] = [
  {
    id: "r1",
    fromUserId: "u7",
    fromUserName: "Baraka Mwenda",
    toUserId: "u5",
    rating: 5,
    comment:
      "Excellent fertilizer quality. Delivered on time and well packaged. I will order again.",
    timestamp: "2025-04-28T10:00:00Z",
    listingId: "ml1",
    listingTitle: "NPK Fertilizer 50kg",
  },
  {
    id: "r2",
    fromUserId: "u1",
    fromUserName: "Juma Mwangi",
    toUserId: "u5",
    rating: 4,
    comment:
      "Good seeds, germination rate was above 90%. Packaging could be improved.",
    timestamp: "2025-04-22T14:00:00Z",
    listingId: "ml2",
    listingTitle: "Hybrid Maize Seeds 5kg",
  },
  {
    id: "r3",
    fromUserId: "u8",
    fromUserName: "Neema Ochieng",
    toUserId: "u5",
    rating: 4,
    comment:
      "Reliable supplier. Had one item out of stock but communicated promptly.",
    timestamp: "2025-04-18T09:30:00Z",
  },
  {
    id: "r4",
    fromUserId: "u7",
    fromUserName: "Baraka Mwenda",
    toUserId: "u6",
    rating: 5,
    comment:
      "Tractor arrived early, plowing was thorough and professional. Highly recommended.",
    timestamp: "2025-04-30T16:00:00Z",
    listingId: "ml3",
    listingTitle: "Tractor Plowing Service",
  },
  {
    id: "r5",
    fromUserId: "u3",
    fromUserName: "Peter Kamau",
    toUserId: "u6",
    rating: 3,
    comment:
      "Service was okay but started 2 hours late. The actual work quality was fine.",
    timestamp: "2025-04-15T11:00:00Z",
  },
  {
    id: "r6",
    fromUserId: "u1",
    fromUserName: "Juma Mwangi",
    toUserId: "u2",
    rating: 5,
    comment:
      "Healthy cattle as described. Very honest seller, straightforward transaction.",
    timestamp: "2025-05-01T08:00:00Z",
    listingId: "alf1",
    listingTitle: "Sahiwal Cross Cattle",
  },
];

export function timeAgo(isoDate: string, lang: "en" | "sw" = "en"): string {
  const diff = Date.now() - new Date(isoDate).getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (lang === "sw") {
    if (mins < 1) return "Sasa hivi";
    if (mins < 60) return `Dakika ${mins} zilizopita`;
    if (hours < 24) return `Saa ${hours} zilizopita`;
    return `Siku ${days} zilizopita`;
  }
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}
