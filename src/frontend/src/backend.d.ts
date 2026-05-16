import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface WeeklyLeaderboardEntry {
    region: string;
    userName: string;
    userRole: string;
    userId: Principal;
    badges: Array<string>;
    weeklyScore: bigint;
}
export type TraceabilityId = bigint;
export interface MarketPricePublic {
    id: bigint;
    region: string;
    unit: string;
    commodityType: Variant_crop_animal_input;
    pricePerUnit: number;
    recordedBy: UserId;
    updatedAt: Timestamp;
    market: string;
    commodity: string;
}
export type InsightSuggestionId = bigint;
export type SustainabilityContentId = bigint;
export interface EmergencyContact {
    region: string;
    userName: string;
    userRole: string;
    userId: Principal;
    averageRating: number;
    phone?: string;
    reviewCount: bigint;
}
export interface CropAnalytics {
    revenue: number;
    quantity: number;
    cropType: string;
}
export interface GroupListing {
    id: GroupListingId;
    title: string;
    createdAt: Timestamp;
    description: string;
    groupId: GroupId;
    listingIds: Array<ListingId>;
}
export interface InventoryItem {
    id: InventoryItemId;
    supplierContact?: string;
    lastRestockedAt?: Timestamp;
    ownerId: UserId;
    name: string;
    createdAt: Timestamp;
    unit: string;
    quantity: number;
    category: InventoryCategory;
    reorderLevel: number;
}
export type WorkerProfileId = bigint;
export type TopicId = bigint;
export interface TopSeller {
    region: string;
    seller: Principal;
    averageRating: number;
    sellerName: string;
    salesVolume: bigint;
    listingCount: bigint;
}
export type CalendarEventId = bigint;
export interface ProductOrigin {
    farmName: string;
    userId: UserId;
    role: string;
    location: Location;
}
export interface AuctionBid {
    id: BidId;
    auctionId: AuctionId;
    bidAmount: bigint;
    placedAt: Timestamp;
    bidderId: UserId;
    isWinning: boolean;
}
export interface TransportBooking {
    id: TransportBookingId;
    status: TransportBookingStatus;
    deliveryAddress: string;
    ratePerKm: number;
    userId: UserId;
    createdAt: Timestamp;
    totalCost: number;
    pickupAddress: string;
    distanceKm: number;
    selectedTimeSlot: string;
    providerId: UserId;
}
export type ForecastId = bigint;
export type QrCodeId = string;
export interface InputProductPublic {
    id: bigint;
    stockQuantity: number;
    name: string;
    createdAt: Timestamp;
    unit: string;
    isAvailable: boolean;
    description: string;
    pricePerUnit: number;
    updatedAt: Timestamp;
    imageUrl?: string;
    category: Variant_other_equipment_feed_seeds_fertilizer_pesticide;
    sellerId: UserId;
    inquiryCount: bigint;
}
export type ClaimId = bigint;
export interface AnimalListingPublic {
    id: ListingId;
    createdAt: Timestamp;
    count: bigint;
    isAvailable: boolean;
    pricePerHead: number;
    description: string;
    keeperId: UserId;
    updatedAt: Timestamp;
    imageUrl?: string;
    breed?: string;
    inquiryCount: bigint;
    animalType: string;
    location: Location;
}
export interface CarbonPractice {
    id: CarbonPracticeId;
    pointsAwarded: bigint;
    owner: Principal;
    carbonImpactKg: bigint;
    description: string;
    practiceType: PracticeType__1;
    dateLogged: bigint;
}
export interface OutbreakRecord {
    id: OutbreakId;
    region: string;
    affectedArea?: string;
    description: string;
    isActive: boolean;
    district?: string;
    reportedAt: Timestamp;
    reporterId: UserId;
    diseaseName: string;
    severity: OutbreakSeverity;
    outbreakType: OutbreakType;
    coordinates?: {
        lat: number;
        lng: number;
    };
}
export interface WeatherData {
    alert?: string;
    temperature: number;
    updatedAt: Timestamp;
    humidity: number;
    rainfallMm: number;
    forecast: string;
    location: Location;
}
export interface JobListing {
    id: JobId;
    status: JobStatus;
    title: string;
    jobType: JobType;
    createdAt: bigint;
    description: string;
    deadline: bigint;
    employer: Principal;
    requiredSkills: Array<string>;
    payRate: string;
    location: string;
}
export interface FarmAnalyticsSnapshot {
    totalLivestockSold: bigint;
    endDate: Timestamp;
    period: AnalyticsPeriod;
    userId: UserId;
    generatedAt: Timestamp;
    totalCropsHarvested: number;
    totalExpenses: number;
    totalSalesRevenue: number;
    topCrops: Array<CropAnalytics>;
    topAnimals: Array<AnimalAnalytics>;
    netProfit: number;
    startDate: Timestamp;
}
export interface AnimalRecordPublic {
    id: bigint;
    createdAt: Timestamp;
    count: bigint;
    healthStatus: Variant_sick_healthy_deceased_under_treatment;
    keeperId: UserId;
    notes: string;
    breed?: string;
    animalType: string;
}
export type UserId = Principal;
export interface TrendingCrop {
    averagePrice: bigint;
    priceGrowthPct: bigint;
    category: string;
    listingCount: bigint;
}
export interface WorkerProfile {
    id: WorkerProfileId;
    bio: string;
    serviceArea: string;
    ratingCount: bigint;
    owner: Principal;
    name: string;
    createdAt: bigint;
    availability: string;
    rating: number;
    skills: Array<string>;
}
export type CarbonCertId = bigint;
export type PaymentId = bigint;
export type SustainabilityRecordId = bigint;
export type NotificationId = bigint;
export type MessageId = bigint;
export interface MarketGap {
    demandScore: bigint;
    category: string;
    supplyCount: bigint;
    opportunityScore: bigint;
}
export interface SpecialistNote {
    photoUrls: Array<string>;
    date: Timestamp;
    note: string;
    specialistId: UserId;
    specialistRole: string;
}
export type LoanId = bigint;
export interface ImprovementSuggestion {
    id: InsightSuggestionId;
    suggestionText: string;
    userId: Principal;
    createdAt: bigint;
    category: string;
}
export interface DiagnosisResultPublic {
    status: DiagnosisStatus;
    requestId: DiagnosisId;
    reviewNotes?: string;
    recommendations: Array<string>;
    diagnosis: string;
    reviewedBy?: UserId;
    recommendedTreatments: Array<string>;
    confidencePercent: bigint;
    treatments: Array<string>;
    confidence: number;
    diagnosedAt: Timestamp;
    diagnosedBy: {
        __kind__: "ai";
        ai: null;
    } | {
        __kind__: "specialist";
        specialist: UserId;
    };
    diagnosisId: DiagnosisId;
    preventionTips: Array<string>;
    possibleDisease: string;
}
export type CarbonPracticeId = bigint;
export interface InsuranceApplication {
    id: InsuranceAppId;
    status: AppStatus;
    applicant: Principal;
    createdAt: bigint;
    description: string;
    estimatedValue: bigint;
    coverageType: CoverageType;
    supportingNotes: string;
}
export interface SoilReport {
    id: bigint;
    recommendations: Array<string>;
    createdAt: Timestamp;
    specialistId: UserId;
    texture: string;
    phLevel: number;
    nutrients: {
        potassium: number;
        phosphorus: number;
        nitrogen: number;
    };
    farmId: bigint;
    suitableCrops: Array<string>;
}
export interface InsuranceClaim {
    id: ClaimId;
    status: ClaimStatus;
    damageDescription: string;
    claimant: Principal;
    applicationId: InsuranceAppId;
    evidenceNotes: string;
    createdAt: bigint;
    claimType: ClaimType;
    estimatedLoss: bigint;
}
export type ReplyId = bigint;
export interface ForumReplyPublic {
    id: ReplyId;
    upvoteCount: bigint;
    authorId: UserId;
    body: string;
    isAccepted: boolean;
    createdAt: Timestamp;
    authorName: string;
    authorRole: UserRole;
    topicId: TopicId;
}
export type ContractId = bigint;
export type ListingId = bigint;
export interface DigitalContract {
    id: ContractId;
    status: ContractStatus;
    terms: string;
    title: string;
    endDate: Timestamp;
    counterpartySignedAt?: Timestamp;
    createdAt: Timestamp;
    creatorId: UserId;
    templateType: ContractTemplateType;
    updatedAt: Timestamp;
    currency: string;
    counterpartyId: UserId;
    partiesNames: string;
    creatorSignedAt?: Timestamp;
    amount: number;
    startDate: Timestamp;
}
export interface SustainabilityRecord {
    id: SustainabilityRecordId;
    impactScore?: number;
    userId: UserId;
    createdAt: Timestamp;
    description: string;
    practiceType: PracticeType;
    dateImplemented: Timestamp;
}
export interface RatingRecord {
    id: bigint;
    createdAt: Timestamp;
    toUserId: UserId;
    comment?: string;
    fromUserId: UserId;
    rating: bigint;
}
export type AuctionId = bigint;
export interface BulkBuyRequest {
    id: BulkBuyId;
    status: BulkBuyStatus;
    responses: Array<BulkBuyResponse>;
    createdAt: Timestamp;
    unit: string;
    groupId: GroupId;
    targetDate: Timestamp;
    itemName: string;
    quantity: number;
    requesterId: UserId;
}
export interface MarketRecommendation {
    id: bigint;
    action: Variant_buy_hold_sell_wait;
    createdAt: Timestamp;
    targetPrice?: number;
    reasoning: string;
    targetDate?: Timestamp;
    recommendation: string;
    commodity: string;
    advisorId: UserId;
}
export interface BIReport {
    id: BIReportId;
    insights: Array<BIInsight>;
    period: BIPeriod;
    userId: UserId;
    generatedAt: Timestamp;
    reportType: BIReportType;
}
export type JobApplicationId = bigint;
export type JobId = bigint;
export interface FarmRecord {
    id: bigint;
    soilType?: string;
    farmerId: UserId;
    soilPh?: number;
    name: string;
    createdAt: Timestamp;
    sizeHectares: number;
    cropTypes: Array<string>;
    location: Location;
}
export interface Coordinate {
    lat: number;
    lng: number;
}
export interface FarmingGroup {
    id: GroupId;
    name: string;
    createdAt: Timestamp;
    description: string;
    inviteCode: string;
    memberIds: Array<UserId>;
    adminId: UserId;
}
export interface PriceTrend {
    region: string;
    trend: Variant_steady_rising_falling;
    commodity: string;
    dataPoints: Array<[Timestamp, number]>;
}
export interface UserProfilePublic {
    id: UserId;
    ratingCount: bigint;
    name: string;
    createdAt: Timestamp;
    role: UserRole;
    email: string;
    language: Language;
    averageRating: number;
    isVerified: boolean;
    profilePictureUrl?: string;
    phone: string;
    location: Location;
}
export interface CalendarEvent {
    id: CalendarEventId;
    title: string;
    userId: UserId;
    date: string;
    createdAt: Timestamp;
    recurring: RecurringPattern;
    time?: string;
    completed: boolean;
    notes?: string;
    recurringEndDate?: string;
    eventType: CalendarEventType;
}
export interface GroupMembership {
    userId: UserId;
    joinedAt: Timestamp;
    role: GroupMemberRole;
    groupId: GroupId;
}
export type IrrigationLogId = bigint;
export interface ForecastRecord {
    id: ForecastId;
    keyDrivers: Array<string>;
    predictedValue: number;
    title: string;
    basedOn: ForecastBasis;
    userId: UserId;
    createdAt: Timestamp;
    unit: string;
    sensitivityNote: string;
    confidenceScore: number;
    monthlyBreakdown: Array<MonthlyBreakdown>;
    forecastType: ForecastType;
    validUntil: Timestamp;
}
export interface IrrigationLog {
    id: IrrigationLogId;
    userId: UserId;
    actualWaterUseLiters?: bigint;
    recommendationId: IrrigationId;
    notes?: string;
    followedOn: Timestamp;
}
export type IrrigationId = bigint;
export type CategoryId = bigint;
export type AnnouncementId = bigint;
export interface SustainabilityContent {
    id: SustainabilityContentId;
    title: string;
    contentType: ContentType;
    createdAt: Timestamp;
    bodyEn: string;
    bodySw: string;
    category: ContentCategory;
}
export type FarmBoundaryId = bigint;
export interface LoanActivitySummary {
    period: bigint;
    generatedAt: Timestamp;
    totalExpenses: number;
    totalSales: number;
    transactionCount: bigint;
    recordCount: bigint;
}
export type DiagnosisId = bigint;
export interface ProductTraceability {
    id: TraceabilityId;
    listingId: ListingId;
    createdAt: Timestamp;
    origin: ProductOrigin;
    productionHistory: Array<TraceabilityEvent>;
    specialistNotes: Array<SpecialistNote>;
    orderChain: Array<OrderChainEntry>;
    qrCodeId: QrCodeId;
}
export interface InventoryHistory {
    itemId: InventoryItemId;
    changeType: InventoryChangeType;
    note: string;
    timestamp: Timestamp;
    delta: number;
}
export interface FarmBenchmark {
    region: string;
    userId: Principal;
    regionalAvgOrders: bigint;
    orderCount: bigint;
    regionalAvgListings: bigint;
    listingCount: bigint;
}
export interface DroneAnalysis {
    id: AnalysisId;
    status: AnalysisStatus;
    imageType: ImageType;
    analysisDate: Timestamp;
    userId: UserId;
    aiInsights: Array<AiInsight>;
    analysisType: AnalysisType;
    imageUrl: string;
    overallHealthScore?: number;
    farmId?: bigint;
}
export type GroupListingId = bigint;
export interface ListingPublic {
    id: ListingId;
    title: string;
    imageUrls: Array<string>;
    createdAt: Timestamp;
    tags: Array<string>;
    unit?: string;
    description: string;
    isActive: boolean;
    listingType: ListingType;
    updatedAt: Timestamp;
    quantity?: number;
    sellerId: UserId;
    price: number;
    inquiryCount: bigint;
    location: Location;
}
export interface LoanApplication {
    id: LoanId;
    status: LoanStatus;
    applicantId: UserId;
    createdAt: Timestamp;
    durationMonths: bigint;
    lenderNotes?: string;
    activitySummary: string;
    updatedAt: Timestamp;
    amount: number;
    purpose: string;
    repaymentTerms: string;
}
export interface AuctionResult {
    finalPrice: bigint;
    completedAt?: Timestamp;
    winnerId?: UserId;
    auctionId: AuctionId;
    sellerAccepted?: boolean;
}
export interface DigitalRecord {
    id: RecordId;
    linkedId?: bigint;
    title: string;
    userId: UserId;
    date: Timestamp;
    createdAt: Timestamp;
    unit?: string;
    description: string;
    recordType: RecordType;
    category?: string;
    amount?: number;
}
export interface UserReputation {
    region: string;
    userName: string;
    userRole: UserRole;
    reputationScore: bigint;
    earnedBadgesWithDates: Array<[string, bigint]>;
    userId: Principal;
    badges: Array<string>;
}
export type BulkBuyId = bigint;
export interface IrrigationSchedule {
    bestTimeOfDay: string;
    durationMinutes: bigint;
    frequencyPerWeek: bigint;
}
export type InsuranceAppId = bigint;
export interface AnimalAnalytics {
    revenue: number;
    count: bigint;
    animalType: string;
}
export interface TreatmentRecordPublic {
    id: bigint;
    completedAt?: Timestamp;
    startedAt: Timestamp;
    vetId: UserId;
    medication: Array<string>;
    treatment: string;
    diagnosis: string;
    animalId: bigint;
    notes: string;
}
export interface BookingPublic {
    id: bigint;
    status: Variant_cancelled_pending_in_progress_completed_confirmed;
    clientId: UserId;
    createdAt: Timestamp;
    notes: string;
    serviceId: bigint;
    totalPrice: number;
    providerId: UserId;
    location: Location;
    scheduledAt: Timestamp;
}
export interface SpecialistDiagnosisAttachment {
    photoUrls: Array<string>;
    specialistId: UserId;
    notes: string;
    attachedAt: Timestamp;
    diagnosisId: string;
}
export interface GovtNGOAnnouncement {
    id: AnnouncementId;
    region: string;
    attachmentUrl?: string;
    contactInfo?: string;
    announcementType: AnnouncementType;
    endDate?: Timestamp;
    authorId: UserId;
    createdAt: Timestamp;
    authorName: string;
    bodyEn: string;
    bodySw: string;
    isActive: boolean;
    authorOrganization: string;
    titleEn: string;
    titleSw: string;
    startDate: Timestamp;
}
export type TransportBookingId = bigint;
export interface OutbreakAlert {
    id: AlertId;
    sentAt: Timestamp;
    message: string;
    outbreakId: OutbreakId;
    recipientId: UserId;
}
export interface VaccinationRecord {
    id: bigint;
    vaccineName: string;
    keeperId: UserId;
    animalId: bigint;
    nextDueAt?: Timestamp;
    notes: string;
    administeredAt: Timestamp;
    administeredBy?: UserId;
}
export interface BulkBuyResponse {
    note: string;
    quantity: number;
    respondedAt: Timestamp;
    responderId: UserId;
}
export interface ForumCategoryPublic {
    id: CategoryId;
    postCount: bigint;
    icon: string;
    name: string;
    description: string;
    descriptionSwahili: string;
    nameSwahili: string;
}
export interface BIInsight {
    trend: BITrend;
    descriptionEn: string;
    descriptionSw: string;
    value: number;
    unit: string;
    recommendationEn: string;
    recommendationSw: string;
    titleEn: string;
    titleSw: string;
}
export interface TraceabilityEvent {
    date: Timestamp;
    description: string;
    performedBy: UserId;
    eventType: string;
}
export interface ForumReplyWithUpvotes {
    id: bigint;
    upvoteCount: bigint;
    authorId: UserId;
    body: string;
    isAccepted: boolean;
    createdAt: Timestamp;
    authorName: string;
    authorRole: UserRole;
    hasVoted: boolean;
    topicId: bigint;
}
export type AnalysisId = bigint;
export interface OrderChainEntry {
    status: string;
    date: Timestamp;
    orderId: OrderId;
    buyerId: UserId;
}
export interface TransportTimeSlot {
    slots: Array<string>;
    providerId: UserId;
    availabilityStatus: TransportAvailabilityStatus;
}
export type Timestamp = bigint;
export interface Location {
    region: string;
    district: string;
    village: string;
    coordinates?: {
        lat: number;
        lng: number;
    };
}
export interface ServiceListingPublic {
    id: bigint;
    serviceType: string;
    coverageAreas: Array<string>;
    equipment: Array<string>;
    createdAt: Timestamp;
    isAvailable: boolean;
    description: string;
    priceRange: {
        max: number;
        min: number;
    };
    updatedAt: Timestamp;
    inquiryCount: bigint;
    providerId: UserId;
}
export interface IrrigationBasis {
    soilMoisture: string;
    weatherForecast: string;
    seasonalCondition: string;
}
export interface DiagnosisRequest {
    id: DiagnosisId;
    imageData?: string;
    createdAt: Timestamp;
    description: string;
    imageUrl?: string;
    animalId?: bigint;
    symptoms: Array<string>;
    cropType?: string;
    animalType?: string;
    location?: Location;
    requesterId: UserId;
    diagnosisType: Variant_crop_soil_animal;
}
export interface CropListingPublic {
    id: ListingId;
    farmerId: UserId;
    createdAt: Timestamp;
    pricePerKg: number;
    isAvailable: boolean;
    description: string;
    updatedAt: Timestamp;
    imageUrl?: string;
    cropType: string;
    inquiryCount: bigint;
    location: Location;
    quantityKg: number;
}
export interface JobApplication {
    id: JobApplicationId;
    status: ApplicationStatus;
    applicant: Principal;
    appliedAt: bigint;
    jobId: JobId;
    coverNote: string;
}
export type BidId = bigint;
export type OutbreakId = bigint;
export interface OrderPublic {
    id: OrderId;
    status: OrderStatus;
    listingId: ListingId;
    createdAt: Timestamp;
    updatedAt: Timestamp;
    notes: string;
    buyerId: UserId;
    quantity: number;
    sellerId: UserId;
    totalPrice: number;
}
export interface MonthlyBreakdown {
    month: string;
    value: number;
}
export type RecordId = bigint;
export type GroupId = bigint;
export interface ForecastFilter {
    userId?: UserId;
    forecastType?: ForecastType;
}
export interface OutbreakFilter {
    region?: string;
    toDate?: Timestamp;
    fromDate?: Timestamp;
    outbreakType?: OutbreakType;
    activeOnly: boolean;
}
export type ConversationId = bigint;
export interface AiInsight {
    finding: string;
    category: string;
    severity: InsightSeverity;
    recommendation: string;
}
export interface ForecastBasis {
    weatherScore: number;
    historyScore: number;
    soilScore: number;
    feedingScore: number;
}
export interface NotificationPublic {
    id: NotificationId;
    title: string;
    body: string;
    notificationType: NotificationType;
    createdAt: Timestamp;
    isRead: boolean;
    priority: NotificationPriority;
    relatedId?: bigint;
    recipientId: UserId;
}
export interface MessagePublic {
    id: MessageId;
    content: string;
    isRead: boolean;
    sentAt: Timestamp;
    imageUrl?: string;
    conversationId: ConversationId;
    senderId: UserId;
}
export type AlertId = bigint;
export interface ConversationPublic {
    id: ConversationId;
    participants: Array<UserId>;
    lastMessageAt: Timestamp;
    subject?: string;
    lastMessagePreview: string;
    createdAt: Timestamp;
}
export interface PaymentPublic {
    id: PaymentId;
    heldAt?: Timestamp;
    status: PaymentStatus;
    method: PaymentMethod;
    createdAt: Timestamp;
    reference: string;
    escrowNote?: string;
    orderId?: OrderId;
    updatedAt: Timestamp;
    currency: string;
    releasedAt?: Timestamp;
    amount: number;
    payeeId: UserId;
    payerId: UserId;
}
export type BIReportId = bigint;
export interface CarbonCertification {
    id: CarbonCertId;
    owner: Principal;
    level: CertificationLevel;
    awardedAt: bigint;
    totalPoints: bigint;
}
export type InventoryItemId = bigint;
export interface AuctionListing {
    id: AuctionId;
    region: string;
    startTime: Timestamp;
    status: AuctionStatus;
    startingPrice: bigint;
    title: string;
    endTime: Timestamp;
    unit: string;
    isAnonymousBidding: boolean;
    description: string;
    listingType: AuctionListingType;
    currentBidderId?: UserId;
    quantity: bigint;
    sellerId: UserId;
    currentBid: bigint;
    bidCount: bigint;
    images: Array<string>;
}
export interface FarmBoundary {
    id: FarmBoundaryId;
    boundaryType: BoundaryType;
    areaHectares?: number;
    userId: UserId;
    name: string;
    createdAt: Timestamp;
    color?: string;
    updatedAt: Timestamp;
    areaLabel?: string;
    coordinates: Array<Coordinate>;
}
export interface ForumTopicSummary {
    id: TopicId;
    categoryId: CategoryId;
    title: string;
    createdAt: Timestamp;
    authorName: string;
    authorRole: UserRole;
    isResolved: boolean;
    viewCount: bigint;
    replyCount: bigint;
}
export interface TransportListingPublic {
    id: bigint;
    vehicleType: string;
    coverageAreas: Array<string>;
    createdAt: Timestamp;
    pricePerKm: number;
    isAvailable: boolean;
    updatedAt: Timestamp;
    capacityTons: number;
    inquiryCount: bigint;
    providerId: UserId;
}
export interface IrrigationRecommendation {
    id: IrrigationId;
    region: string;
    basedOn: IrrigationBasis;
    userId: UserId;
    createdAt: Timestamp;
    hasSetReminder: boolean;
    reasoning: string;
    cropType: string;
    estimatedWaterSavingPercent: bigint;
    schedule: IrrigationSchedule;
    yieldImpactPercent: bigint;
    validUntil: Timestamp;
}
export type OrderId = bigint;
export interface ForumTopicPublic {
    id: TopicId;
    categoryId: CategoryId;
    title: string;
    authorId: UserId;
    body: string;
    createdAt: Timestamp;
    tags: Array<string>;
    authorName: string;
    authorRole: UserRole;
    language: Language;
    updatedAt: Timestamp;
    isResolved: boolean;
    viewCount: bigint;
    replyCount: bigint;
}
export enum AnalysisStatus {
    pending = "pending",
    complete = "complete",
    failed = "failed"
}
export enum AnalysisType {
    irrigation_coverage = "irrigation_coverage",
    crop_health = "crop_health",
    disease_spread = "disease_spread",
    grazing_conditions = "grazing_conditions"
}
export enum AnalyticsPeriod {
    month = "month",
    quarter = "quarter",
    year = "year"
}
export enum AnnouncementType {
    emergency = "emergency",
    subsidy = "subsidy",
    opportunity = "opportunity",
    policy_update = "policy_update",
    training = "training"
}
export enum AppStatus {
    pending = "pending",
    approved = "approved",
    rejected = "rejected"
}
export enum ApplicationStatus {
    pending = "pending",
    accepted = "accepted",
    declined = "declined"
}
export enum AuctionListingType {
    crop = "crop",
    livestock = "livestock"
}
export enum AuctionStatus {
    active = "active",
    cancelled = "cancelled",
    completed = "completed",
    ended = "ended"
}
export enum BIPeriod {
    quarterly = "quarterly",
    monthly = "monthly",
    weekly = "weekly"
}
export enum BIReportType {
    profit_forecast = "profit_forecast",
    crop_profitability = "crop_profitability",
    livestock_profitability = "livestock_profitability",
    market_opportunity = "market_opportunity"
}
export enum BITrend {
    up = "up",
    down = "down",
    flat = "flat"
}
export enum BoundaryType {
    other = "other",
    farm_field = "farm_field",
    grazing_zone = "grazing_zone",
    orchard = "orchard"
}
export enum BulkBuyStatus {
    cancelled = "cancelled",
    fulfilled = "fulfilled",
    open = "open"
}
export enum CalendarEventType {
    vetAppointment = "vetAppointment",
    vaccination = "vaccination",
    breeding = "breeding",
    marketDay = "marketDay",
    feeding = "feeding",
    soilTesting = "soilTesting",
    healthCheck = "healthCheck",
    fertilizer = "fertilizer",
    deworming = "deworming",
    harvest = "harvest",
    irrigation = "irrigation",
    livestockSale = "livestockSale",
    pestControl = "pestControl",
    planting = "planting"
}
export enum CertificationLevel {
    carbonChampion = "carbonChampion",
    waterGuardian = "waterGuardian",
    soilSteward = "soilSteward"
}
export enum ClaimStatus {
    filed = "filed",
    underReview = "underReview",
    paid = "paid",
    approved = "approved",
    rejected = "rejected"
}
export enum ClaimType {
    flood = "flood",
    drought = "drought",
    theft = "theft",
    other = "other",
    pestDisease = "pestDisease"
}
export enum ContentCategory {
    soil = "soil",
    grazing = "grazing",
    pesticide = "pesticide",
    water = "water",
    energy = "energy"
}
export enum ContentType {
    tip = "tip",
    article = "article",
    guide = "guide"
}
export enum ContractStatus {
    active = "active",
    disputed = "disputed",
    completed = "completed",
    pending_acceptance = "pending_acceptance",
    draft = "draft"
}
export enum ContractTemplateType {
    service_agreement = "service_agreement",
    delivery_agreement = "delivery_agreement",
    crop_sale = "crop_sale"
}
export enum DiagnosisStatus {
    pending_review = "pending_review",
    rejected = "rejected",
    confirmed = "confirmed"
}
export enum ForecastType {
    milk_production = "milk_production",
    crop_yield = "crop_yield",
    egg_production = "egg_production",
    livestock_weight = "livestock_weight"
}
export enum GroupMemberRole {
    member = "member",
    admin = "admin"
}
export enum ImageType {
    satellite = "satellite",
    drone = "drone"
}
export enum InventoryCategory {
    other = "other",
    equipment = "equipment",
    feed = "feed",
    medicine = "medicine",
    seeds = "seeds",
    fertilizer = "fertilizer"
}
export enum InventoryChangeType {
    adjustment = "adjustment",
    restock = "restock",
    usage = "usage"
}
export enum JobStatus {
    cancelled = "cancelled",
    open = "open",
    completed = "completed",
    filled = "filled"
}
export enum JobType {
    other = "other",
    transport = "transport",
    harvesting = "harvesting",
    spraying = "spraying",
    livestockCare = "livestockCare",
    planting = "planting"
}
export enum Language {
    swahili = "swahili",
    english = "english"
}
export enum ListingType {
    service = "service",
    crop = "crop",
    transport = "transport",
    animal = "animal",
    input = "input"
}
export enum LoanStatus {
    pending = "pending",
    approved = "approved",
    rejected = "rejected",
    under_review = "under_review"
}
export enum NotificationPriority {
    normal = "normal",
    high = "high",
    critical = "critical"
}
export enum NotificationType {
    service_request = "service_request",
    disease_alert = "disease_alert",
    price_update = "price_update",
    low_stock_alert = "low_stock_alert",
    weather_alert = "weather_alert",
    govt_announcement = "govt_announcement",
    contract_pending = "contract_pending",
    loan_status_update = "loan_status_update",
    badge_earned = "badge_earned",
    message = "message",
    order_update = "order_update",
    pest_outbreak = "pest_outbreak",
    group_invite = "group_invite",
    vaccination_reminder = "vaccination_reminder"
}
export enum OrderStatus {
    cancelled = "cancelled",
    pending = "pending",
    in_transit = "in_transit",
    delivered = "delivered",
    confirmed = "confirmed"
}
export enum OutbreakSeverity {
    low = "low",
    high = "high",
    critical = "critical",
    medium = "medium"
}
export enum OutbreakType {
    livestock_infection = "livestock_infection",
    drought = "drought",
    crop_disease = "crop_disease",
    pest_invasion = "pest_invasion"
}
export enum PaymentMethod {
    nmb = "nmb",
    mpesa = "mpesa",
    airtel_money = "airtel_money",
    tigo_pesa = "tigo_pesa",
    cash = "cash",
    crdb = "crdb"
}
export enum PaymentStatus {
    pending = "pending",
    held = "held",
    completed = "completed",
    refunded = "refunded",
    failed = "failed"
}
export enum PracticeType {
    other = "other",
    composting = "composting",
    water_harvesting = "water_harvesting",
    crop_rotation = "crop_rotation",
    agroforestry = "agroforestry",
    drip_irrigation = "drip_irrigation",
    integrated_pest_management = "integrated_pest_management",
    organic_fertilizer = "organic_fertilizer"
}
export enum PracticeType__1 {
    sustainableGrazing = "sustainableGrazing",
    treePlanting = "treePlanting",
    soilConservation = "soilConservation",
    composting = "composting",
    ecoPesticide = "ecoPesticide",
    waterManagement = "waterManagement"
}
export enum RecordType {
    expense = "expense",
    vaccination = "vaccination",
    sale = "sale",
    crop_planting = "crop_planting",
    harvest = "harvest",
    health_event = "health_event"
}
export enum RecurringPattern {
    none = "none",
    monthly = "monthly",
    yearly = "yearly",
    daily = "daily",
    weekly = "weekly"
}
export enum TransportAvailabilityStatus {
    available = "available",
    limited = "limited",
    fullyBooked = "fullyBooked"
}
export enum TransportBookingStatus {
    cancelled = "cancelled",
    pending = "pending",
    inTransit = "inTransit",
    delivered = "delivered",
    confirmed = "confirmed"
}
export enum UserRole {
    agri_specialist = "agri_specialist",
    market_advisor = "market_advisor",
    veterinarian = "veterinarian",
    weather_soil_specialist = "weather_soil_specialist",
    transport_provider = "transport_provider",
    input_service_provider = "input_service_provider",
    input_seller = "input_seller",
    buyer = "buyer",
    livestock_keeper = "livestock_keeper",
    farmer = "farmer"
}
export enum Variant_buy_hold_sell_wait {
    buy = "buy",
    hold = "hold",
    sell = "sell",
    wait = "wait"
}
export enum Variant_cancelled_pending_in_progress_completed_confirmed {
    cancelled = "cancelled",
    pending = "pending",
    in_progress = "in_progress",
    completed = "completed",
    confirmed = "confirmed"
}
export enum Variant_crop_animal_input {
    crop = "crop",
    animal = "animal",
    input = "input"
}
export enum Variant_crop_soil_animal {
    crop = "crop",
    soil = "soil",
    animal = "animal"
}
export enum Variant_other_equipment_feed_seeds_fertilizer_pesticide {
    other = "other",
    equipment = "equipment",
    feed = "feed",
    seeds = "seeds",
    fertilizer = "fertilizer",
    pesticide = "pesticide"
}
export enum Variant_rejected_confirmed {
    rejected = "rejected",
    confirmed = "confirmed"
}
export enum Variant_sick_healthy_deceased_under_treatment {
    sick = "sick",
    healthy = "healthy",
    deceased = "deceased",
    under_treatment = "under_treatment"
}
export enum Variant_steady_rising_falling {
    steady = "steady",
    rising = "rising",
    falling = "falling"
}
export interface backendInterface {
    acceptDigitalContract(id: ContractId): Promise<boolean>;
    addAnimal(animalType: string, breed: string | null, count: bigint): Promise<AnimalRecordPublic>;
    addAnimalListing(animalType: string, breed: string | null, count: bigint, pricePerHead: number, description: string, imageUrl: string | null, location: Location): Promise<AnimalListingPublic>;
    addCropListing(cropType: string, quantityKg: number, pricePerKg: number, description: string, imageUrl: string | null, location: Location): Promise<CropListingPublic>;
    addDigitalRecord(recordType: RecordType, date: Timestamp, title: string, description: string, amount: number | null, unit: string | null, category: string | null, linkedId: bigint | null): Promise<DigitalRecord>;
    addImprovementSuggestion(suggestionText: string, category: string): Promise<InsightSuggestionId>;
    addInputProduct(name: string, category: Variant_other_equipment_feed_seeds_fertilizer_pesticide, description: string, pricePerUnit: number, unit: string, stockQuantity: number, imageUrl: string | null): Promise<InputProductPublic>;
    addInventoryItem(name: string, category: InventoryCategory, quantity: number, unit: string, reorderLevel: number, supplierContact: string | null): Promise<InventoryItem>;
    addMarketPrice(commodity: string, commodityType: Variant_crop_animal_input, pricePerUnit: number, unit: string, market: string, region: string): Promise<MarketPricePublic>;
    addMarketRecommendation(commodity: string, recommendation: string, action: Variant_buy_hold_sell_wait, targetPrice: number | null, targetDate: Timestamp | null, reasoning: string): Promise<MarketRecommendation>;
    addServiceListing(serviceType: string, description: string, priceMin: number, priceMax: number, coverageAreas: Array<string>, equipment: Array<string>): Promise<ServiceListingPublic>;
    addSoilReport(farmId: bigint, phLevel: number, nitrogen: number, phosphorus: number, potassium: number, texture: string, suitableCrops: Array<string>): Promise<SoilReport>;
    addSpecialistDiagnosisAttachment(diagnosisId: string, photoUrls: Array<string>, notes: string): Promise<SpecialistDiagnosisAttachment>;
    addSpecialistNote(id: TraceabilityId, note: string, photoUrls: Array<string>): Promise<boolean>;
    addSpecialistProductNote(id: TraceabilityId, note: string, photoUrls: Array<string>): Promise<boolean>;
    addSustainabilityContent(contentType: ContentType, title: string, bodyEn: string, bodySw: string, category: ContentCategory): Promise<SustainabilityContent>;
    addTraceabilityEvent(id: TraceabilityId, eventType: string, description: string): Promise<boolean>;
    addTransportListing(vehicleType: string, capacityTons: number, pricePerKm: number, coverageAreas: Array<string>): Promise<TransportListingPublic>;
    addTreatmentRecord(animalId: bigint, diagnosis: string, treatment: string, medication: Array<string>, notes: string): Promise<TreatmentRecordPublic>;
    addVaccinationRecord(animalId: bigint, keeperId: UserId, vaccineName: string, nextDueAt: Timestamp | null, notes: string): Promise<VaccinationRecord>;
    applyForLoan(amount: number, purpose: string, durationMonths: bigint, repaymentTerms: string): Promise<LoanApplication>;
    applyToJob(jobId: JobId, coverNote: string): Promise<JobApplicationId>;
    cancelAuction(auctionId: AuctionId): Promise<boolean>;
    changePassword(oldPasswordHash: string, newPasswordHash: string): Promise<boolean>;
    closeAuction(auctionId: AuctionId): Promise<{
        __kind__: "ok";
        ok: AuctionResult;
    } | {
        __kind__: "err";
        err: string;
    }>;
    confirmDelivery(paymentId: PaymentId): Promise<boolean>;
    confirmPayment(paymentId: PaymentId): Promise<boolean>;
    createAuction(listingType: AuctionListingType, title: string, description: string, startingPrice: bigint, endTime: Timestamp, quantity: bigint, unit: string, images: Array<string>, region: string, isAnonymousBidding: boolean): Promise<AuctionListing>;
    createBulkBuyRequest(groupId: GroupId, itemName: string, quantity: number, unit: string, targetDate: Timestamp): Promise<BulkBuyRequest>;
    createCalendarEvent(eventType: CalendarEventType, title: string, date: string, time: string | null, notes: string | null, recurring: RecurringPattern, recurringEndDate: string | null): Promise<CalendarEvent>;
    createDigitalContract(counterpartyId: UserId, templateType: ContractTemplateType, title: string, partiesNames: string, terms: string, amount: number, currency: string, startDate: Timestamp, endDate: Timestamp): Promise<DigitalContract>;
    createFarm(name: string, location: Location, sizeHectares: number, cropTypes: Array<string>): Promise<FarmRecord>;
    createFarmingGroup(name: string, description: string): Promise<FarmingGroup>;
    createGroupListing(groupId: GroupId, listingIds: Array<ListingId>, title: string, description: string): Promise<GroupListing>;
    createJobListing(title: string, description: string, jobType: JobType, payRate: string, location: string, deadline: bigint, requiredSkills: Array<string>): Promise<JobId>;
    createListing(listingType: ListingType, title: string, description: string, price: number, quantity: number | null, unit: string | null, location: Location, imageUrls: Array<string>, tags: Array<string>): Promise<ListingPublic>;
    createProductTraceability(listingId: ListingId, farmName: string, location: Location): Promise<ProductTraceability>;
    createTopic(categoryId: CategoryId, title: string, body: string, tags: Array<string>, language: Language): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    createTransportBooking(providerId: UserId, distanceKm: number, ratePerKm: number, selectedTimeSlot: string, pickupAddress: string, deliveryAddress: string): Promise<TransportBooking>;
    createWorkerProfile(name: string, skills: Array<string>, serviceArea: string, availability: string, bio: string): Promise<WorkerProfileId>;
    deactivateAnnouncement(id: AnnouncementId): Promise<boolean>;
    deactivateListing(id: ListingId): Promise<boolean>;
    deactivateOutbreak(id: OutbreakId): Promise<boolean>;
    deleteCalendarEvent(id: CalendarEventId): Promise<boolean>;
    deleteDigitalRecord(id: RecordId): Promise<boolean>;
    deleteFarmBoundary(id: FarmBoundaryId): Promise<boolean>;
    deleteForecast(id: ForecastId): Promise<boolean>;
    deleteInputProduct(id: bigint): Promise<boolean>;
    deleteServiceListing(id: bigint): Promise<boolean>;
    deleteSustainabilityPractice(id: SustainabilityRecordId): Promise<boolean>;
    fileInsuranceClaim(applicationId: InsuranceAppId, claimType: ClaimType, damageDescription: string, estimatedLoss: bigint, evidenceNotes: string): Promise<ClaimId>;
    generateBIReport(reportType: BIReportType, period: BIPeriod): Promise<BIReport>;
    generateFarmAnalytics(period: AnalyticsPeriod): Promise<FarmAnalyticsSnapshot>;
    generateForecast(forecastType: ForecastType, title: string, cropOrAnimalType: string, region: string): Promise<ForecastRecord>;
    generateIrrigationRecommendation(cropType: string, region: string): Promise<IrrigationRecommendation>;
    getAnalysesByFarm(farmId: bigint): Promise<Array<DroneAnalysis>>;
    getAnalysisById(id: AnalysisId): Promise<DroneAnalysis | null>;
    getAnimalDiagnosisById(diagnosisId: DiagnosisId): Promise<[DiagnosisRequest, DiagnosisResultPublic | null] | null>;
    getAnimalListings(keeperId: UserId | null): Promise<Array<AnimalListingPublic>>;
    getAnnouncement(id: AnnouncementId): Promise<GovtNGOAnnouncement | null>;
    getAuction(id: AuctionId): Promise<AuctionListing | null>;
    getAuctionResult(auctionId: AuctionId): Promise<AuctionResult | null>;
    getAuctions(status: AuctionStatus | null, listingType: AuctionListingType | null, region: string | null): Promise<Array<AuctionListing>>;
    getBIReport(id: BIReportId): Promise<BIReport | null>;
    getBidsForAuction(auctionId: AuctionId): Promise<Array<AuctionBid>>;
    getCalendarEvents(): Promise<Array<CalendarEvent>>;
    getCategories(): Promise<Array<ForumCategoryPublic>>;
    getCropListings(farmerId: UserId | null): Promise<Array<CropListingPublic>>;
    getDiagnosisById(diagnosisId: DiagnosisId): Promise<[DiagnosisRequest, DiagnosisResultPublic | null] | null>;
    getDigitalContract(id: ContractId): Promise<DigitalContract | null>;
    getDigitalRecord(id: RecordId): Promise<DigitalRecord | null>;
    getEmergencyContacts(region: string): Promise<Array<EmergencyContact>>;
    getFarmBoundariesForUser(userId: UserId): Promise<Array<FarmBoundary>>;
    getFarmBoundary(id: FarmBoundaryId): Promise<FarmBoundary | null>;
    getForecast(id: ForecastId): Promise<ForecastRecord | null>;
    getForecasts(filter: ForecastFilter): Promise<Array<ForecastRecord>>;
    getForumReplyWithUpvotes(replyId: bigint): Promise<ForumReplyWithUpvotes | null>;
    getGroup(id: GroupId): Promise<FarmingGroup | null>;
    getInputProducts(sellerId: UserId | null): Promise<Array<InputProductPublic>>;
    getInsuranceApplication(appId: InsuranceAppId): Promise<InsuranceApplication | null>;
    getInsuranceClaim(claimId: ClaimId): Promise<InsuranceClaim | null>;
    getInventoryHistory(itemId: InventoryItemId): Promise<Array<InventoryHistory>>;
    getIrrigationRecommendation(id: IrrigationId): Promise<IrrigationRecommendation | null>;
    getJob(jobId: JobId): Promise<JobListing | null>;
    getLatestFarmAnalytics(): Promise<FarmAnalyticsSnapshot | null>;
    getLatestPrices(commodity: string | null, region: string | null): Promise<Array<MarketPricePublic>>;
    getLeaderboard(region: string, roleFilter: string | null): Promise<Array<UserReputation>>;
    getListingById(id: ListingId): Promise<ListingPublic | null>;
    getListings(listingType: ListingType | null, region: string | null, searchTerm: string | null, priceMin: number | null, priceMax: number | null): Promise<Array<ListingPublic>>;
    getLoanActivitySummary(): Promise<LoanActivitySummary>;
    getLoanApplication(id: LoanId): Promise<LoanApplication | null>;
    getLowStockItems(): Promise<Array<InventoryItem>>;
    getMarketGaps(limit: bigint): Promise<Array<MarketGap>>;
    getMarketRecommendations(commodity: string | null): Promise<Array<MarketRecommendation>>;
    getMessages(conversationId: ConversationId): Promise<Array<MessagePublic>>;
    getMyAnalyses(): Promise<Array<DroneAnalysis>>;
    getMyAnimalListings(): Promise<Array<AnimalListingPublic>>;
    getMyAnimals(): Promise<Array<AnimalRecordPublic>>;
    getMyAuctions(): Promise<Array<AuctionListing>>;
    getMyBookings(): Promise<Array<BookingPublic>>;
    getMyCarbonCertifications(): Promise<Array<CarbonCertification>>;
    getMyCarbonPoints(): Promise<bigint>;
    getMyConversations(): Promise<Array<ConversationPublic>>;
    getMyCropListings(): Promise<Array<CropListingPublic>>;
    getMyDiagnoses(): Promise<Array<[DiagnosisRequest, DiagnosisResultPublic | null]>>;
    getMyFarmBenchmark(region: string): Promise<FarmBenchmark>;
    getMyFarms(): Promise<Array<FarmRecord>>;
    getMyForecasts(): Promise<Array<ForecastRecord>>;
    getMyImprovementSuggestions(): Promise<Array<ImprovementSuggestion>>;
    getMyInputProducts(): Promise<Array<InputProductPublic>>;
    getMyIrrigationLogs(): Promise<Array<IrrigationLog>>;
    getMyIrrigationRecommendations(): Promise<Array<IrrigationRecommendation>>;
    getMyListings(): Promise<Array<ListingPublic>>;
    getMyNotifications(unreadOnly: boolean): Promise<Array<NotificationPublic>>;
    getMyOrders(): Promise<Array<OrderPublic>>;
    getMyOutbreakAlerts(): Promise<Array<OutbreakAlert>>;
    getMyProfile(): Promise<UserProfilePublic | null>;
    getMySales(): Promise<Array<OrderPublic>>;
    getMyServiceListings(): Promise<Array<ServiceListingPublic>>;
    getMyServiceRequests(): Promise<Array<BookingPublic>>;
    getMyTransactions(): Promise<Array<PaymentPublic>>;
    getMyTransportBookings(): Promise<Array<TransportBooking>>;
    getMyWorkerProfile(): Promise<WorkerProfile | null>;
    getOutbreak(id: OutbreakId): Promise<OutbreakRecord | null>;
    getOutbreaks(filter: OutbreakFilter): Promise<Array<OutbreakRecord>>;
    getPaymentById(paymentId: PaymentId): Promise<PaymentPublic | null>;
    getPriceTrend(commodity: string, region: string): Promise<PriceTrend>;
    getProductTraceability(listingId: ListingId): Promise<ProductTraceability | null>;
    getRecentTopics(limit: bigint): Promise<Array<ForumTopicSummary>>;
    getRepliesByTopic(topicId: TopicId): Promise<Array<ForumReplyPublic>>;
    getReplyUpvoteCount(replyId: bigint): Promise<bigint>;
    getServiceListings(area: string | null): Promise<Array<ServiceListingPublic>>;
    getSoilReports(farmId: bigint): Promise<Array<SoilReport>>;
    getSpecialistAttachments(diagnosisId: string): Promise<Array<SpecialistDiagnosisAttachment>>;
    getTopContributorOfWeek(): Promise<UserReputation | null>;
    getTopSellersByRegion(region: string, limit: bigint): Promise<Array<TopSeller>>;
    getTopicById(topicId: TopicId): Promise<ForumTopicPublic | null>;
    getTopicsByCategory(categoryId: CategoryId): Promise<Array<ForumTopicSummary>>;
    getTraceabilityByQrCode(qrCodeId: QrCodeId): Promise<ProductTraceability | null>;
    getTransportListings(area: string | null): Promise<Array<TransportListingPublic>>;
    getTransportTimeSlots(providerId: UserId): Promise<TransportTimeSlot | null>;
    getTreatmentHistory(animalId: bigint): Promise<Array<TreatmentRecordPublic>>;
    getTrendingCrops(limit: bigint): Promise<Array<TrendingCrop>>;
    getUnreadMessageCount(): Promise<bigint>;
    getUnreadNotificationCount(): Promise<bigint>;
    getUserCarbonCertifications(userId: Principal): Promise<Array<CarbonCertification>>;
    getUserCarbonPoints(userId: Principal): Promise<bigint>;
    getUserProfile(userId: UserId): Promise<UserProfilePublic | null>;
    getUserRating(userId: UserId): Promise<number>;
    getUserRatings(userId: UserId): Promise<Array<RatingRecord>>;
    getUserReputation(userId: Principal): Promise<UserReputation | null>;
    getVaccinationHistory(animalId: bigint): Promise<Array<VaccinationRecord>>;
    getWeather(location: Location): Promise<WeatherData>;
    getWeeklyLeaderboard(region: string): Promise<Array<WeeklyLeaderboardEntry>>;
    hasUserUpvotedReply(replyId: bigint): Promise<boolean>;
    incrementAnimalInquiry(listingId: ListingId): Promise<boolean>;
    incrementCropInquiry(listingId: ListingId): Promise<boolean>;
    incrementInputInquiry(id: bigint): Promise<boolean>;
    incrementListingInquiry(id: ListingId): Promise<boolean>;
    incrementServiceInquiry(id: bigint): Promise<boolean>;
    initiateEscrowPayment(payeeId: UserId, orderId: OrderId | null, amount: number, method: PaymentMethod, escrowNote: string | null): Promise<PaymentPublic>;
    initiatePayment(payeeId: UserId, orderId: OrderId | null, amount: number, method: PaymentMethod): Promise<PaymentPublic>;
    joinFarmingGroup(inviteCode: string): Promise<boolean>;
    leaveFarmingGroup(groupId: GroupId): Promise<boolean>;
    listAnnouncements(region: string | null): Promise<Array<GovtNGOAnnouncement>>;
    listAnnouncementsByType(region: string | null, announcementType: AnnouncementType): Promise<Array<GovtNGOAnnouncement>>;
    listApplicationsForJob(jobId: JobId): Promise<Array<JobApplication>>;
    listBulkBuyRequests(groupId: GroupId): Promise<Array<BulkBuyRequest>>;
    listDigitalRecords(): Promise<Array<DigitalRecord>>;
    listDigitalRecordsByType(recordType: RecordType): Promise<Array<DigitalRecord>>;
    listDigitalRecordsByUserId(userId: UserId): Promise<Array<DigitalRecord>>;
    listFarmAnalytics(): Promise<Array<FarmAnalyticsSnapshot>>;
    listFarmBoundaries(): Promise<Array<FarmBoundary>>;
    listGroupListings(groupId: GroupId): Promise<Array<GroupListing>>;
    listGroupMembers(groupId: GroupId): Promise<Array<GroupMembership>>;
    listInventoryItems(): Promise<Array<InventoryItem>>;
    listJobs(jobType: JobType | null, location: string | null, status: JobStatus | null): Promise<Array<JobListing>>;
    listMyBIReports(): Promise<Array<BIReport>>;
    listMyCarbonPractices(): Promise<Array<CarbonPractice>>;
    listMyContracts(): Promise<Array<DigitalContract>>;
    listMyGroups(): Promise<Array<FarmingGroup>>;
    listMyInsuranceApplications(status: AppStatus | null): Promise<Array<InsuranceApplication>>;
    listMyInsuranceClaims(status: ClaimStatus | null): Promise<Array<InsuranceClaim>>;
    listMyJobApplications(): Promise<Array<JobApplication>>;
    listMyLoanApplications(): Promise<Array<LoanApplication>>;
    listMySustainabilityPractices(): Promise<Array<SustainabilityRecord>>;
    listSpecialists(roleFilter: UserRole | null, searchQuery: string | null, location: Location | null): Promise<Array<UserProfilePublic>>;
    listSustainabilityContent(category: ContentCategory | null): Promise<Array<SustainabilityContent>>;
    listWorkerProfiles(skill: string | null, serviceArea: string | null): Promise<Array<WorkerProfile>>;
    logCarbonPractice(practiceType: PracticeType__1, description: string, dateLogged: bigint, carbonImpactKg: bigint): Promise<CarbonPracticeId>;
    logIrrigation(recommendationId: IrrigationId, followedOn: Timestamp, actualWaterUseLiters: bigint | null, notes: string | null): Promise<IrrigationLog>;
    logSustainabilityPractice(practiceType: PracticeType, description: string, dateImplemented: Timestamp, impactScore: number | null): Promise<SustainabilityRecord>;
    login(identifier: string, passwordHash: string): Promise<UserProfilePublic | null>;
    markAllNotificationsRead(): Promise<bigint>;
    markMessagesRead(conversationId: ConversationId): Promise<bigint>;
    markNotificationRead(notificationId: NotificationId): Promise<boolean>;
    markTopicResolved(topicId: TopicId): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    pauseAnimalListing(listingId: ListingId): Promise<boolean>;
    pauseCropListing(listingId: ListingId): Promise<boolean>;
    pauseInputProduct(id: bigint): Promise<boolean>;
    pauseListing(id: ListingId): Promise<boolean>;
    pauseServiceListing(id: bigint): Promise<boolean>;
    pauseTransportListing(id: bigint): Promise<boolean>;
    placeBid(auctionId: AuctionId, bidAmount: bigint): Promise<{
        __kind__: "ok";
        ok: AuctionBid;
    } | {
        __kind__: "err";
        err: string;
    }>;
    placeOrder(listingId: ListingId, sellerId: UserId, quantity: number, totalPrice: number, deliveryAddress: Location, notes: string): Promise<OrderPublic>;
    publishAnnouncement(authorName: string, authorOrganization: string, announcementType: AnnouncementType, titleEn: string, titleSw: string, bodyEn: string, bodySw: string, region: string, startDate: Timestamp, endDate: Timestamp | null, contactInfo: string | null, attachmentUrl: string | null): Promise<GovtNGOAnnouncement>;
    rateUser(userId: UserId, rating: bigint, comment: string | null): Promise<boolean>;
    registerUser(name: string, email: string, phone: string, nationalId: string | null, role: UserRole, location: Location, passwordHash: string): Promise<UserProfilePublic>;
    removeAnimalListing(listingId: ListingId): Promise<boolean>;
    removeCropListing(listingId: ListingId): Promise<boolean>;
    removeGroupMember(groupId: GroupId, userId: UserId): Promise<boolean>;
    removeInventoryItem(id: InventoryItemId): Promise<boolean>;
    replyToTopic(topicId: TopicId, body: string): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    reportOutbreak(region: string, district: string | null, outbreakType: OutbreakType, diseaseName: string, severity: OutbreakSeverity, description: string, affectedArea: string | null, coordinates: {
        lat: number;
        lng: number;
    } | null): Promise<OutbreakRecord>;
    requestBooking(providerId: UserId, serviceId: bigint, scheduledAt: Timestamp, location: Location, totalPrice: number, notes: string): Promise<BookingPublic>;
    requestOtp(identifier: string): Promise<string>;
    respondToBulkBuy(requestId: BulkBuyId, quantity: number, note: string): Promise<boolean>;
    respondToJobApplication(applicationId: JobApplicationId, accept: boolean): Promise<boolean>;
    resumeAnimalListing(listingId: ListingId): Promise<boolean>;
    resumeCropListing(listingId: ListingId): Promise<boolean>;
    resumeInputProduct(id: bigint): Promise<boolean>;
    resumeListing(id: ListingId): Promise<boolean>;
    resumeServiceListing(id: bigint): Promise<boolean>;
    resumeTransportListing(id: bigint): Promise<boolean>;
    reviewAnimalDiagnosis(diagnosisId: DiagnosisId, newStatus: Variant_rejected_confirmed, notes: string | null): Promise<DiagnosisResultPublic | null>;
    reviewCropDiagnosis(diagnosisId: DiagnosisId, newStatus: Variant_rejected_confirmed, notes: string | null): Promise<DiagnosisResultPublic | null>;
    saveFarmBoundary(name: string, boundaryType: BoundaryType, coordinates: Array<Coordinate>, areaHectares: number | null, areaLabel: string | null, color: string | null): Promise<FarmBoundary>;
    sendMessage(conversationId: ConversationId, content: string, imageUrl: string | null): Promise<MessagePublic>;
    sendOutbreakAlert(outbreakId: OutbreakId, recipientId: UserId, message: string): Promise<OutbreakAlert>;
    setIrrigationReminder(id: IrrigationId): Promise<boolean>;
    setTransportTimeSlots(slots: Array<string>, availabilityStatus: TransportAvailabilityStatus): Promise<void>;
    setupFarmerProfile(farmSize: number, cropTypes: Array<string>, soilType: string | null): Promise<boolean>;
    setupLivestockProfile(animalTypes: Array<string>, totalHeadCount: bigint): Promise<boolean>;
    signDigitalContract(id: ContractId): Promise<boolean>;
    startConversation(recipientId: UserId, subject: string | null, firstMessage: string): Promise<ConversationPublic>;
    submitAnimalDiagnosis(description: string, imageData: string | null, symptoms: Array<string>, animalType: string | null, animalId: bigint | null): Promise<DiagnosisResultPublic>;
    submitCropDiagnosis(description: string, imageData: string | null, symptoms: Array<string>, cropType: string | null, location: Location | null): Promise<DiagnosisResultPublic>;
    submitImageAnalysis(farmId: bigint | null, imageUrl: string, imageType: ImageType, analysisType: AnalysisType): Promise<DroneAnalysis>;
    submitInsuranceApplication(coverageType: CoverageType, description: string, estimatedValue: bigint, supportingNotes: string): Promise<InsuranceAppId>;
    submitJobRating(jobId: JobId, ratee: Principal, stars: bigint, comment: string): Promise<boolean>;
    submitSoilAnalysis(description: string, imageData: string | null): Promise<DiagnosisResultPublic>;
    updateAnimalHealth(animalId: bigint, healthStatus: Variant_sick_healthy_deceased_under_treatment, notes: string): Promise<boolean>;
    updateAnimalListing(listingId: ListingId, count: bigint | null, pricePerHead: number | null, description: string | null, imageUrl: string | null): Promise<AnimalListingPublic | null>;
    updateBookingStatus(bookingId: bigint, newStatus: Variant_cancelled_pending_in_progress_completed_confirmed): Promise<boolean>;
    updateCalendarEvent(id: CalendarEventId, eventType: CalendarEventType | null, title: string | null, date: string | null, time: string | null, notes: string | null, recurring: RecurringPattern | null, recurringEndDate: string | null, completed: boolean | null): Promise<boolean>;
    updateContractStatus(id: ContractId, status: ContractStatus): Promise<boolean>;
    updateCropListing(listingId: ListingId, quantityKg: number | null, pricePerKg: number | null, description: string | null, imageUrl: string | null): Promise<CropListingPublic | null>;
    updateDigitalRecord(id: RecordId, title: string, description: string, amount: number | null): Promise<boolean>;
    updateFarmBoundary(id: FarmBoundaryId, name: string, coordinates: Array<Coordinate>, areaHectares: number | null, areaLabel: string | null, color: string | null): Promise<boolean>;
    updateInputProduct(id: bigint, name: string | null, description: string | null, pricePerUnit: number | null, stockQuantity: number | null, imageUrl: string | null): Promise<InputProductPublic | null>;
    updateInsuranceApplicationStatus(appId: InsuranceAppId, status: AppStatus): Promise<boolean>;
    updateInsuranceClaimStatus(claimId: ClaimId, status: ClaimStatus): Promise<boolean>;
    updateInventoryItem(id: InventoryItemId, quantity: number, changeType: InventoryChangeType, note: string): Promise<boolean>;
    updateJobStatus(jobId: JobId, status: JobStatus): Promise<boolean>;
    updateListing(id: ListingId, title: string | null, description: string | null, price: number | null, quantity: number | null, imageUrls: Array<string> | null): Promise<ListingPublic | null>;
    updateLoanStatus(id: LoanId, status: LoanStatus, notes: string | null): Promise<boolean>;
    updateMarketPrice(priceId: bigint, newPrice: number): Promise<boolean>;
    updateMyProfile(name: string | null, location: Location | null, language: Language | null, profilePictureData: string | null): Promise<boolean>;
    updateOrderStatus(orderId: OrderId, newStatus: OrderStatus): Promise<boolean>;
    updateServiceListing(id: bigint, description: string | null, priceMin: number | null, priceMax: number | null, coverageAreas: Array<string> | null, equipment: Array<string> | null): Promise<ServiceListingPublic | null>;
    upvoteReply(replyId: bigint): Promise<boolean>;
    verifyOtp(identifier: string, otp: string): Promise<boolean>;
}
