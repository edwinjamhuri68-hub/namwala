import Common "common";

module {
  public type AnalyticsPeriod = { #month; #quarter; #year };

  public type CropAnalytics = {
    cropType : Text;
    quantity : Float;
    revenue : Float;
  };

  public type AnimalAnalytics = {
    animalType : Text;
    count : Nat;
    revenue : Float;
  };

  public type FarmAnalyticsSnapshot = {
    userId : Common.UserId;
    period : AnalyticsPeriod;
    startDate : Common.Timestamp;
    endDate : Common.Timestamp;
    totalCropsHarvested : Float;
    totalLivestockSold : Nat;
    totalSalesRevenue : Float;
    totalExpenses : Float;
    netProfit : Float;
    topCrops : [CropAnalytics];
    topAnimals : [AnimalAnalytics];
    generatedAt : Common.Timestamp;
  };
}
