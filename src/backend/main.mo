import List "mo:core/List";
import Principal "mo:core/Principal";

import SustainabilityLib "lib/sustainability";
import GovtNgoLib "lib/govt-ngo";

import UTypes "types/users";
import FTypes "types/farm";
import LTypes "types/livestock";
import MTypes "types/marketplace";
import MsgTypes "types/messaging";
import NTypes "types/notifications";
import PTypes "types/payments";
import MktTypes "types/market";

import UsersApi "mixins/users-api";
import FarmApi "mixins/farm-api";
import LivestockApi "mixins/livestock-api";
import MarketplaceApi "mixins/marketplace-api";
import MessagingApi "mixins/messaging-api";
import NotificationsApi "mixins/notifications-api";
import PaymentsApi "mixins/payments-api";
import MarketApi "mixins/market-api";
import Map "mo:core/Map";
import CalTypes "types/calendar";
import TBTypes "types/transport-booking";
import SATypes "types/specialist-attachment";
import Common "types/common";
import CalendarApi "mixins/calendar-api";
import TransportBookingApi "mixins/transport-booking-api";
import SpecialistAttachmentApi "mixins/specialist-attachment-api";
import DRTypes "types/digital-records";
import FGTypes "types/farming-groups";
import LNTypes "types/loans";
import TRTypes "types/traceability";
import INVTypes "types/inventory";
import FBTypes "types/farm-boundaries";
import FATypes "types/farm-analytics";
import DCTypes "types/digital-contracts";
import SUSTypes "types/sustainability";
import GNTypes "types/govt-ngo";
import BITypes "types/bi-reports";
import DigitalRecordsApi "mixins/digital-records-api";
import FarmingGroupsApi "mixins/farming-groups-api";
import LoansApi "mixins/loans-api";
import TraceabilityApi "mixins/traceability-api";
import InventoryApi "mixins/inventory-api";
import FarmBoundariesApi "mixins/farm-boundaries-api";
import FarmAnalyticsApi "mixins/farm-analytics-api";
import DigitalContractsApi "mixins/digital-contracts-api";
import SustainabilityApi "mixins/sustainability-api";
import GovtNgoApi "mixins/govt-ngo-api";
import BIReportsApi "mixins/bi-reports-api";
import FRTypes "types/forum";
import ForumLib "lib/forum";
import ForumApi "mixins/forum-api";
import RepTypes "types/reputation";
import ReputationApi "mixins/reputation-api";




import DOTypes "types/disease-outbreak";
import AUTypes "types/auction";
import FCTypes "types/forecasting";
import IRTypes "types/irrigation";
import DiseaseOutbreakApi "mixins/disease-outbreak-api";
import AuctionApi "mixins/auction-api";
import ForecastingApi "mixins/forecasting-api";
import IrrigationApi "mixins/irrigation-api";
import DATypes "types/drone-analysis";
import DroneAnalysisApi "mixins/drone-analysis-api";

import JMTypes "types/job-marketplace";
import AITypes "types/agricultural-insurance";
import CFTypes "types/carbon-farming";
import SITypes "types/success-insights";
import JobMarketplaceApi "mixins/job-marketplace-api";
import AgriculturalInsuranceApi "mixins/agricultural-insurance-api";
import CarbonFarmingApi "mixins/carbon-farming-api";
import SuccessInsightsApi "mixins/success-insights-api";

actor {

  // --- Users ---
  let users = List.empty<UTypes.UserProfile>();
  let farmerProfiles = List.empty<UTypes.FarmerProfile>();
  let livestockProfiles = List.empty<UTypes.LivestockProfile>();
  let specialistProfiles = List.empty<UTypes.SpecialistProfile>();
  let otps = List.empty<UTypes.OtpRecord>();
  let ratings = List.empty<UTypes.RatingRecord>();
  let nextUserId : Nat = 0;
  let nextRatingId : Nat = 0;

  // --- Farm ---
  let farms = List.empty<FTypes.FarmRecord>();
  let cropListings = List.empty<FTypes.CropListing>();
  let diagnosisRequests = List.empty<FTypes.DiagnosisRequest>();
  let diagnosisResults = List.empty<FTypes.DiagnosisResult>();
  let soilReports = List.empty<FTypes.SoilReport>();
  let nextFarmId : Nat = 0;
  let nextFarmListingId : Nat = 0;
  let nextDiagnosisId : Nat = 0;
  let nextSoilReportId : Nat = 0;

  // --- Livestock ---
  let animalRecords = List.empty<LTypes.AnimalRecord>();
  let animalListings = List.empty<LTypes.AnimalListing>();
  let vaccinationRecords = List.empty<LTypes.VaccinationRecord>();
  let treatmentRecords = List.empty<LTypes.TreatmentRecord>();
  let nextAnimalId : Nat = 0;
  let nextAnimalListingId : Nat = 0;
  let nextVaccinationId : Nat = 0;
  let nextTreatmentId : Nat = 0;

  // --- Marketplace ---
  let listings = List.empty<MTypes.Listing>();
  let orders = List.empty<MTypes.Order>();
  let inputProducts = List.empty<MTypes.InputProduct>();
  let serviceListings = List.empty<MTypes.ServiceListing>();
  let transportListings = List.empty<MTypes.TransportListing>();
  let bookings = List.empty<MTypes.Booking>();
  let nextListingId : Nat = 0;
  let nextOrderId : Nat = 0;
  let nextProductId : Nat = 0;
  let nextServiceId : Nat = 0;
  let nextTransportId : Nat = 0;
  let nextBookingId : Nat = 0;

  // --- Messaging ---
  let conversations = List.empty<MsgTypes.Conversation>();
  let messages = List.empty<MsgTypes.Message>();
  let nextConvId : Nat = 0;
  let nextMsgId : Nat = 0;

  // --- Notifications ---
  let notifications = List.empty<NTypes.Notification>();
  let notifState = { var nextNotifId : Nat = 0 };

  // --- Payments ---
  let payments = List.empty<PTypes.Payment>();
  let nextPaymentId : Nat = 0;

  // --- Market ---
  let marketPrices = List.empty<MktTypes.MarketPrice>();
  let marketRecommendations = List.empty<MktTypes.MarketRecommendation>();
  let nextPriceId : Nat = 0;
  let nextRecommendationId : Nat = 0;

  // --- Calendar ---
  let calendarEvents = List.empty<CalTypes.CalendarEvent>();
  let calendarNextId : Nat = 0;

  // --- Transport Bookings ---
  let transportBookings = List.empty<TBTypes.TransportBooking>();
  let transportBookingNextId : Nat = 0;
  let transportTimeSlots = Map.empty<Common.UserId, TBTypes.TransportTimeSlot>();

  // --- Specialist Attachments ---
  let specialistAttachments = List.empty<SATypes.SpecialistDiagnosisAttachment>();

  // --- Digital Records ---
  let digitalRecords = List.empty<DRTypes.DigitalRecord>();
  let drState = { var nextRecordId : Nat = 0 };

  // --- Farming Groups ---
  let farmingGroups = List.empty<FGTypes.FarmingGroup>();
  let groupMemberships = List.empty<FGTypes.GroupMembership>();
  let bulkBuyRequests = List.empty<FGTypes.BulkBuyRequest>();
  let groupListings = List.empty<FGTypes.GroupListing>();
  let fgState = { var nextGroupId : Nat = 0; var nextBulkBuyId : Nat = 0; var nextGroupListingId : Nat = 0 };

  // --- Loans ---
  let loanApplications = List.empty<LNTypes.LoanApplication>();
  let lnState = { var nextLoanId : Nat = 0 };

  // --- Traceability ---
  let traceabilityRecords = List.empty<TRTypes.ProductTraceability>();
  let trState = { var nextTraceabilityId : Nat = 0 };

  // --- Inventory ---
  let inventoryItems = List.empty<INVTypes.InventoryItem>();
  let inventoryHistory = List.empty<INVTypes.InventoryHistory>();
  let invState = { var nextInventoryItemId : Nat = 0 };

  // --- Farm Boundaries ---
  let farmBoundaries = List.empty<FBTypes.FarmBoundary>();
  let fbState = { var nextBoundaryId : Nat = 0 };

  // --- Farm Analytics ---
  let analyticsSnapshots = List.empty<FATypes.FarmAnalyticsSnapshot>();

  // --- Digital Contracts ---
  let digitalContracts = List.empty<DCTypes.DigitalContract>();
  let dcState = { var nextContractId : Nat = 0 };

  // --- Sustainability ---
  let sustainabilityRecords = List.empty<SUSTypes.SustainabilityRecord>();
  let sustainabilityContent = List.empty<SUSTypes.SustainabilityContent>();
  let susState = { var nextSustainabilityRecordId : Nat = 0; var nextSustainabilityContentId : Nat = 5 };
  // Seed 5 default educational content entries on first deploy
  SustainabilityLib.seedDefaultContent(sustainabilityContent, 0);

  // --- Govt/NGO Announcements ---
  let govtNgoAnnouncements = List.empty<GNTypes.GovtNGOAnnouncement>();
  let gnState = { var nextAnnouncementId : Nat = 3 };
  // Seed 3 sample announcements on first deploy
  GovtNgoLib.seedSampleAnnouncements(govtNgoAnnouncements, Principal.fromText("aaaaa-aa"), 0);

  // --- BI Reports ---
  let biReports = List.empty<BITypes.BIReport>();
  let biState = { var nextBIReportId : Nat = 0 };

  // --- Forum ---
  let forumTopics = List.empty<FRTypes.ForumTopic>();
  let forumReplies = List.empty<FRTypes.ForumReply>();
  let forumCategories = Map.empty<FRTypes.CategoryId, FRTypes.ForumCategory>();
  let forumState = { var nextTopicId : Nat = 0; var nextReplyId : Nat = 0 };
  // Seed default categories on first deploy
  ForumLib.seedDefaultCategories(forumCategories);

  // --- Reputation ---
  let reputationUpvotes = List.empty<RepTypes.ReputationUpvote>();
  // --- Weekly Activity (for leaderboard) ---
  let weeklyState = { var weeklyActivities : [(Principal, Nat)] = []; var weekStart : Nat = 0 };

  // --- Disease Outbreak Map ---
  let outbreaks = List.empty<DOTypes.OutbreakRecord>();
  let outbreakAlerts = List.empty<DOTypes.OutbreakAlert>();
  let outbreakState = { var nextOutbreakId : Nat = 0; var nextAlertId : Nat = 0 };

  // --- Auction ---
  let auctions = List.empty<AUTypes.AuctionListing>();
  let auctionBids = List.empty<AUTypes.AuctionBid>();
  let auctionResults = List.empty<AUTypes.AuctionResult>();
  let auctionState = { var nextAuctionId : Nat = 0; var nextBidId : Nat = 0 };

  // --- Forecasting ---
  let forecasts = List.empty<FCTypes.ForecastRecord>();
  let forecastState = { var nextForecastId : Nat = 0 };

  // --- Irrigation ---
  let irrigationRecommendations = List.empty<IRTypes.IrrigationRecommendation>();
  let irrigationLogs = List.empty<IRTypes.IrrigationLog>();
  let irrigationState = { var nextIrrigationId : Nat = 0; var nextLogId : Nat = 0 };

  // --- Drone Analysis ---
  let droneAnalyses = List.empty<DATypes.DroneAnalysis>();
  let droneState = { var nextAnalysisId : Nat = 0 };

  // --- Job Marketplace ---
  let jobs = List.empty<JMTypes.JobListing>();
  let workerProfiles = List.empty<JMTypes.WorkerProfile>();
  let jobApplications = List.empty<JMTypes.JobApplication>();
  let jobRatings = List.empty<JMTypes.JobRating>();
  let jobState = { var nextJobId : Nat = 0; var nextWorkerProfileId : Nat = 0; var nextApplicationId : Nat = 0; var nextJobRatingId : Nat = 0 };

  // --- Agricultural Insurance ---
  let insuranceApplications = List.empty<AITypes.InsuranceApplication>();
  let insuranceClaims = List.empty<AITypes.InsuranceClaim>();
  let insuranceState = { var nextInsuranceAppId : Nat = 0; var nextClaimId : Nat = 0 };

  // --- Carbon Farming Rewards ---
  let carbonPractices = List.empty<CFTypes.CarbonPractice>();
  let carbonCerts = List.empty<CFTypes.CarbonCertification>();
  let carbonState = { var nextPracticeId : Nat = 0; var nextCertId : Nat = 0 };

  // --- Success Insights ---
  let improvementSuggestions = List.empty<SITypes.ImprovementSuggestion>();
  let insightState = { var nextSuggestionId : Nat = 0 };

  // --- Mixin includes ---
  include DiseaseOutbreakApi(outbreaks, outbreakAlerts, outbreakState);
  include AuctionApi(auctions, auctionBids, auctionResults, auctionState);
  include ForecastingApi(forecasts, forecastState);
  include IrrigationApi(irrigationRecommendations, irrigationLogs, irrigationState);
  include UsersApi(users, farmerProfiles, livestockProfiles, specialistProfiles, otps, ratings, nextRatingId);
  include FarmApi(farms, cropListings, diagnosisRequests, diagnosisResults, soilReports, nextFarmId, nextFarmListingId, nextDiagnosisId, nextSoilReportId);
  include LivestockApi(animalRecords, animalListings, vaccinationRecords, treatmentRecords, diagnosisRequests, diagnosisResults, nextAnimalId, nextAnimalListingId, nextVaccinationId, nextTreatmentId, nextDiagnosisId);
  include MarketplaceApi(listings, orders, inputProducts, serviceListings, transportListings, bookings, nextListingId, nextOrderId, nextProductId, nextServiceId, nextTransportId, nextBookingId);
  include MessagingApi(conversations, messages, nextConvId, nextMsgId);
  include NotificationsApi(notifications, notifState);
  include PaymentsApi(payments, nextPaymentId);
  include MarketApi(marketPrices, marketRecommendations, nextPriceId, nextRecommendationId);
  include CalendarApi(calendarEvents, calendarNextId);
  include TransportBookingApi(transportBookings, transportTimeSlots, transportBookingNextId);
  include SpecialistAttachmentApi(specialistAttachments);
  include DigitalRecordsApi(digitalRecords, drState);
  include FarmingGroupsApi(farmingGroups, groupMemberships, bulkBuyRequests, groupListings, fgState);
  include LoansApi(loanApplications, lnState);
  include TraceabilityApi(traceabilityRecords, trState);
  include InventoryApi(inventoryItems, inventoryHistory, invState);
  include FarmBoundariesApi(farmBoundaries, fbState);
  include FarmAnalyticsApi(analyticsSnapshots);
  include DigitalContractsApi(digitalContracts, dcState);
  include SustainabilityApi(sustainabilityRecords, sustainabilityContent, susState);
  include GovtNgoApi(govtNgoAnnouncements, gnState);
  include BIReportsApi(biReports, biState);
  include ForumApi(forumTopics, forumReplies, forumCategories, forumState, users);
  include ReputationApi(reputationUpvotes, forumReplies, users, notifications, notifState, ratings, weeklyState);
  include DroneAnalysisApi(droneAnalyses, droneState);  include JobMarketplaceApi(jobs, workerProfiles, jobApplications, jobRatings, jobState);
  include AgriculturalInsuranceApi(insuranceApplications, insuranceClaims, insuranceState);
  include CarbonFarmingApi(carbonPractices, carbonCerts, carbonState);
  include SuccessInsightsApi(improvementSuggestions, insightState);
};
