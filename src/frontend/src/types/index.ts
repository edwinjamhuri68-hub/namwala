export type UserRole =
  | "farmer"
  | "livestock_keeper"
  | "agri_specialist"
  | "veterinarian"
  | "input_seller"
  | "input_service_provider"
  | "weather_soil_specialist"
  | "market_advisor"
  | "transport_provider"
  | "buyer";

export type Language = "en" | "sw";

export type NotificationPriority = "critical" | "high" | "normal";

export type NotificationType =
  | "disease_alert"
  | "weather_alert"
  | "price_update"
  | "message"
  | "service_request"
  | "pest_outbreak"
  | "vaccination_reminder"
  | "order_update"
  | "badge_earned";

export type PaymentMethod =
  | "mpesa"
  | "tigo_pesa"
  | "airtel_money"
  | "crdb"
  | "nmb"
  | "cash";

export type PaymentStatus = "pending" | "paid" | "held" | "refunded";

export type TrendDirection = "up" | "down" | "stable";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  language: Language;
  location: string;
  avatarUrl?: string;
  createdAt: string;
  // Role-specific
  farmSize?: number;
  cropTypes?: string[];
  animalTypes?: string[];
  businessName?: string;
  serviceArea?: string[];
  vehicleType?: string;
  specialization?: string;
}

export interface FarmRecord {
  id: string;
  farmerId: string;
  name: string;
  location: string;
  size: number;
  sizeUnit: "acres" | "hectares";
  crops: string[];
  soilType?: string;
  lastUpdated: string;
  imageUrl?: string;
}

export interface CropListing {
  id: string;
  farmerId: string;
  farmerName: string;
  cropType: string;
  quantity: number;
  unit: string;
  pricePerUnit: number;
  location: string;
  quality: "excellent" | "good" | "fair";
  availableFrom: string;
  imageUrl?: string;
  description?: string;
}

export interface AnimalRecord {
  id: string;
  keeperId: string;
  animalType: string;
  count: number;
  healthStatus: "healthy" | "sick" | "under_treatment" | "recovered";
  lastCheckDate: string;
  vaccinationStatus: string;
  notes?: string;
}

export interface AnimalListing {
  id: string;
  keeperId: string;
  keeperName: string;
  animalType: string;
  breed?: string;
  count: number;
  pricePerUnit: number;
  location: string;
  imageUrl?: string;
  description?: string;
}

export interface AnimalListingFull {
  id: string;
  keeperId: string;
  keeperName: string;
  animalType: string;
  breed?: string;
  age?: string;
  count: number;
  pricePerHead: number;
  location: string;
  healthStatus: string;
  healthDescription?: string;
  specialQualities?: string;
  imageUrl?: string;
  isActive: boolean;
  inquiries: number;
  createdAt: string;
}

export interface DiagnosisRequest {
  id: string;
  userId: string;
  type: "crop" | "animal" | "soil";
  symptoms?: string;
  imageUrl?: string;
  location?: string;
  createdAt: string;
  status: "pending" | "analyzed" | "reviewed";
}

export interface DiagnosisResult {
  requestId: string;
  diagnosis: string;
  confidence: number;
  recommendations: string[];
  treatmentPlan?: string;
  urgency: "immediate" | "within_24h" | "within_week" | "routine";
  aiGenerated: boolean;
  reviewedBy?: string;
}

export interface MarketListing {
  id: string;
  sellerId: string;
  sellerName: string;
  type: "crop" | "livestock" | "input" | "service";
  title: string;
  description: string;
  price: number;
  unit: string;
  quantity: number;
  location: string;
  imageUrl?: string;
  category: string;
  createdAt: string;
}

export interface Order {
  id: string;
  buyerId: string;
  sellerId: string;
  listingId: string;
  quantity: number;
  totalPrice: number;
  status: "pending" | "confirmed" | "delivered" | "cancelled";
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  escrow?: boolean;
  createdAt: string;
  deliveryAddress?: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  read: boolean;
  imageUrl?: string;
}

export interface Conversation {
  id: string;
  participants: string[];
  participantNames: string[];
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  topic?: string;
}

export interface AppNotification {
  id: string;
  userId: string;
  type: NotificationType;
  priority: NotificationPriority;
  title: string;
  body: string;
  read: boolean;
  createdAt: string;
  relatedId?: string;
  actionUrl?: string;
}

export interface WeatherData {
  location: string;
  temperature: number;
  feelsLike: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  rainfall?: number;
  forecast: WeatherForecastDay[];
}

export interface WeatherForecastDay {
  day: string;
  high: number;
  low: number;
  condition: string;
  icon: string;
}

export interface SoilReport {
  id: string;
  farmId: string;
  location: string;
  ph: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  organicMatter: number;
  texture: "sandy" | "loam" | "clay" | "silt";
  recommendation: string;
  suitableCrops: string[];
  reportDate: string;
}

export interface MarketPrice {
  commodity: string;
  commoditySwahili: string;
  pricePerKg: number;
  currency: "TSh";
  trend: TrendDirection;
  changeAmount: number;
  market: string;
  updatedAt: string;
  category: "crop" | "livestock";
}

export interface InputProduct {
  id: string;
  sellerId: string;
  sellerName: string;
  name: string;
  category:
    | "seeds"
    | "fertilizer"
    | "pesticide"
    | "feed"
    | "equipment"
    | "other";
  price: number;
  unit: string;
  stock: number;
  description: string;
  imageUrl?: string;
  location: string;
  isActive?: boolean;
  inquiries?: number;
}

export interface ServiceListing {
  id: string;
  providerId: string;
  providerName: string;
  serviceType:
    | "plowing"
    | "spraying"
    | "irrigation"
    | "harvesting"
    | "transport"
    | "machinery_rental"
    | "other";
  title: string;
  price: number;
  priceUnit: "per_acre" | "per_hour" | "per_trip" | "fixed";
  availability: string;
  location: string;
  description: string;
  imageUrl?: string;
}

export interface TransportRequest {
  id: string;
  requesterId: string;
  providerId?: string;
  from: string;
  to: string;
  cargo: string;
  weight?: number;
  requestedDate: string;
  status: "pending" | "accepted" | "in_transit" | "delivered" | "cancelled";
  price?: number;
  paymentMethod?: PaymentMethod;
}
export interface Rating {
  id: string;
  fromUserId: string;
  fromUserName: string;
  toUserId: string;
  rating: 1 | 2 | 3 | 4 | 5;
  comment: string;
  timestamp: string;
  listingId?: string;
  listingTitle?: string;
}

export interface CheckoutOrder {
  listingId: string;
  listingTitle: string;
  quantity: number;
  pricePerUnit: number;
  sellerId: string;
  sellerName: string;
  paymentMethod: PaymentMethod;
}

export interface PaymentConfirmation {
  orderId: string;
  referenceNumber: string;
  paymentMethod: PaymentMethod;
  amount: number;
  status: "pending" | "paid" | "failed";
  timestamp: string;
}

export interface TransportProvider {
  id: string;
  name: string;
  vehicleType: "truck" | "pickup" | "motorcycle" | "cart" | "minivan";
  capacityTons: number;
  pricePerKm: number;
  coverageAreas: string[];
  rating: number;
  ratingCount: number;
  phone: string;
  imageUrl?: string;
  description?: string;
  timeSlots?: string[];
  availabilityStatus?: "available" | "limited" | "full";
}

export interface TransportBooking {
  id: string;
  providerId: string;
  providerName: string;
  status: "pending" | "confirmed" | "in_transit" | "delivered" | "cancelled";
  pickupLocation: string;
  deliveryLocation: string;
  scheduledDate: string;
  notes?: string;
  totalCost: number;
  createdAt: string;
}

// ─── Disease Outbreak Map ────────────────────────────────────────────────────

export type OutbreakType =
  | "crop_disease"
  | "livestock_infection"
  | "pest_invasion"
  | "drought";

export type OutbreakSeverity = "low" | "medium" | "high" | "critical";

export interface OutbreakRecord {
  id: string;
  region: string;
  district: string;
  outbreakType: OutbreakType;
  diseaseName: string;
  severity: OutbreakSeverity;
  description: string;
  affectedArea: number;
  reportedAt: string;
  isActive: boolean;
  coordinates?: { lat: number; lng: number };
}

// ─── Live Auctions ────────────────────────────────────────────────────────────

export type AuctionStatus =
  | "upcoming"
  | "active"
  | "ended"
  | "cancelled"
  | "completed";

export interface AuctionListing {
  id: string;
  sellerId: string;
  listingType: "crop" | "livestock" | "input";
  title: string;
  description: string;
  startingPrice: number;
  currentBid: number;
  currentBidderId?: string;
  bidCount: number;
  startTime: string;
  endTime: string;
  quantity: number;
  unit: string;
  images: string[];
  region: string;
  status: AuctionStatus;
  isAnonymousBidding: boolean;
}

export interface AuctionBid {
  id: string;
  auctionId: string;
  bidderId: string;
  bidAmount: number;
  placedAt: string;
  isWinning: boolean;
}

export interface AuctionResult {
  auctionId: string;
  winnerId: string;
  finalPrice: number;
  sellerAccepted: boolean;
  completedAt: string;
}

// ─── Harvest & Livestock Forecasting ─────────────────────────────────────────

export type ForecastType =
  | "crop_yield"
  | "milk_production"
  | "egg_production"
  | "livestock_weight";

export interface ForecastRecord {
  id: string;
  userId: string;
  forecastType: ForecastType;
  title: string;
  predictedValue: number;
  unit: string;
  confidenceScore: number;
  keyDrivers: { name: string; score: number }[];
  monthlyBreakdown: { month: string; value: number }[];
  sensitivityNote: string;
  basedOn: string[];
  createdAt: string;
  validUntil: string;
}

// ─── Smart Irrigation ────────────────────────────────────────────────────────

export interface IrrigationScheduleEntry {
  dayOfWeek: string;
  timeOfDay: string;
  durationMinutes: number;
  waterAmountLiters: number;
}

export interface IrrigationRecommendation {
  id: string;
  userId: string;
  cropType: string;
  region: string;
  schedule: IrrigationScheduleEntry[];
  reasoning: string;
  estimatedWaterSavingPercent: number;
  yieldImpactPercent: number;
  basedOn: string[];
  createdAt: string;
  validUntil: string;
  hasSetReminder: boolean;
}

export interface IrrigationLog {
  id: string;
  userId: string;
  recommendationId: string;
  followedOn: string;
  actualWaterUseLiters: number;
  notes?: string;
}

// ─── Record Management ───────────────────────────────────────────────────────

export type RecordType =
  | "harvest"
  | "crop_planting"
  | "health_event"
  | "vaccination"
  | "sale"
  | "expense"
  | "purchase"
  | "breeding"
  | "other";

export interface DigitalRecord {
  id: string;
  userId: string;
  recordType: RecordType;
  date: string;
  title: string;
  description: string;
  amount?: number;
  unit?: string;
  category?: string;
  linkedId?: string;
  createdAt: string;
}

// ─── Farming Groups / Cooperatives ───────────────────────────────────────────

export interface FarmingGroup {
  id: string;
  name: string;
  description: string;
  adminId: string;
  memberIds: string[];
  inviteCode: string;
  createdAt: string;
}

export interface GroupMembership {
  userId: string;
  groupId: string;
  role: "admin" | "member";
  joinedAt: string;
}

export interface BulkBuyRequest {
  id: string;
  groupId: string;
  requesterId: string;
  itemName: string;
  quantity: number;
  unit: string;
  targetDate: string;
  status: "open" | "fulfilled" | "cancelled";
  responses: string[];
}

// ─── Loans & Microfinance ─────────────────────────────────────────────────────

export interface LoanActivitySummary {
  totalRecords: number;
  totalSalesRevenue: number;
  totalExpenses: number;
  netProfit: number;
  averageMonthlyRevenue: number;
  topActivities: string[];
}

export interface LoanApplication {
  id: string;
  applicantId: string;
  amount: number;
  purpose: string;
  durationMonths: number;
  repaymentTerms: string;
  activitySummary: LoanActivitySummary;
  status: "pending" | "approved" | "rejected" | "disbursed";
  lenderNotes?: string;
  createdAt: string;
  updatedAt: string;
}

// ─── Product Traceability ─────────────────────────────────────────────────────

export interface ProductTraceability {
  id: string;
  listingId: string;
  origin: string;
  productionHistory: string[];
  specialistNotes: string[];
  orderChain: string[];
  qrCodeId: string;
  createdAt: string;
}

// ─── Inventory Management ─────────────────────────────────────────────────────

export type InventoryCategory =
  | "seeds"
  | "fertilizer"
  | "pesticide"
  | "feed"
  | "medicine"
  | "equipment"
  | "other";

export interface InventoryHistory {
  date: string;
  changeAmount: number;
  reason: string;
}

export interface InventoryItem {
  id: string;
  ownerId: string;
  name: string;
  category: InventoryCategory;
  quantity: number;
  unit: string;
  reorderLevel: number;
  supplierContact?: string;
  lastRestockedAt?: string;
  history?: InventoryHistory[];
  createdAt: string;
}

// ─── Farm Boundary Mapping ────────────────────────────────────────────────────

export type BoundaryType =
  | "farm_field"
  | "grazing_zone"
  | "orchard"
  | "water_source"
  | "other";

export interface FarmBoundary {
  id: string;
  userId: string;
  name: string;
  boundaryType: BoundaryType;
  coordinates: { lat: number; lng: number }[];
  areaHectares?: number;
  areaLabel?: string;
  color?: string;
  createdAt: string;
  updatedAt: string;
}

// ─── Farm Analytics ───────────────────────────────────────────────────────────

export type AnalyticsPeriod = "monthly" | "quarterly" | "yearly";

export interface FarmAnalyticsSnapshot {
  userId: string;
  period: AnalyticsPeriod;
  startDate: string;
  endDate: string;
  totalCropsHarvested: number;
  totalLivestockSold: number;
  totalSalesRevenue: number;
  totalExpenses: number;
  netProfit: number;
  topCrops: string[];
  topAnimals: string[];
  generatedAt: string;
}

// ─── Digital Contracts ────────────────────────────────────────────────────────

export type ContractStatus =
  | "draft"
  | "active"
  | "completed"
  | "disputed"
  | "cancelled";

export type ContractTemplate =
  | "crop_sale"
  | "service_agreement"
  | "delivery_agreement"
  | "livestock_sale"
  | "custom";

export interface DigitalContract {
  id: string;
  creatorId: string;
  counterpartyId: string;
  templateType: ContractTemplate;
  title: string;
  partiesNames: string[];
  terms: string;
  amount: number;
  currency: string;
  startDate: string;
  endDate: string;
  status: ContractStatus;
  creatorSignedAt?: string;
  counterpartySignedAt?: string;
  createdAt: string;
  updatedAt: string;
}

// ─── Sustainability ───────────────────────────────────────────────────────────

export interface SustainabilityRecord {
  id: string;
  userId: string;
  practice: string;
  date: string;
  impactScore: number;
  notes?: string;
  createdAt: string;
}

export interface SustainabilityContent {
  id: string;
  contentType: "article" | "video" | "guide";
  title: string;
  bodyEn: string;
  bodySw: string;
  category: string;
  createdAt: string;
}

// ─── Government & NGO Announcements ──────────────────────────────────────────

export type AnnouncementType =
  | "training"
  | "subsidy"
  | "emergency"
  | "policy"
  | "market_info"
  | "weather_advisory"
  | "general";

export interface GovtNGOAnnouncement {
  id: string;
  authorId: string;
  authorName: string;
  authorOrganization: string;
  announcementType: AnnouncementType;
  titleEn: string;
  titleSw: string;
  bodyEn: string;
  bodySw: string;
  region: string;
  startDate: string;
  endDate?: string;
  contactInfo?: string;
  attachmentUrl?: string;
  createdAt: string;
  isActive: boolean;
}

// ─── Business Intelligence ────────────────────────────────────────────────────

export type BIReportType =
  | "profit_forecast"
  | "crop_profitability"
  | "livestock_profitability"
  | "market_opportunity"
  | "expense_analysis";

export type BIPeriod =
  | "last_30_days"
  | "last_90_days"
  | "last_6_months"
  | "last_year";

export interface BIInsight {
  titleEn: string;
  titleSw: string;
  descriptionEn: string;
  descriptionSw: string;
  value: number;
  unit: string;
  trend: "up" | "down" | "flat";
  recommendationEn: string;
  recommendationSw: string;
}

export interface BIReport {
  id: string;
  userId: string;
  reportType: BIReportType;
  period: BIPeriod;
  insights: BIInsight[];
  generatedAt: string;
}
