import List "mo:core/List";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Types "../types/farm-analytics";
import Common "../types/common";
import Nat8 "mo:core/Nat8";

module {
  public func generateSnapshot(
    snapshots : List.List<Types.FarmAnalyticsSnapshot>,
    userId : Common.UserId,
    period : Types.AnalyticsPeriod
  ) : Types.FarmAnalyticsSnapshot {
    let now = Time.now();
    // Derive a deterministic seed from principal for realistic mock values
    let blob = userId.toBlob();
    var seed : Nat = 0;
    for (b in blob.vals()) { seed := (seed * 31 + b.toNat()) % 1000000 };
    let revenue = 800000.0 + (seed % 400000).toFloat();
    let expenses = 300000.0 + (seed % 200000).toFloat();
    let durationNs : Int = switch (period) {
      case (#month) 2592000000000000;
      case (#quarter) 7776000000000000;
      case (#year) 31536000000000000;
    };
    let snapshot : Types.FarmAnalyticsSnapshot = {
      userId;
      period;
      startDate = now - durationNs;
      endDate = now;
      totalCropsHarvested = 2000.0 + (seed % 8000).toFloat();
      totalLivestockSold = 5 + seed % 45;
      totalSalesRevenue = revenue;
      totalExpenses = expenses;
      netProfit = revenue - expenses;
      topCrops = [
        { cropType = "Maize"; quantity = 1200.0 + (seed % 800).toFloat(); revenue = 480000.0 },
        { cropType = "Beans"; quantity = 400.0 + (seed % 200).toFloat(); revenue = 160000.0 },
        { cropType = "Rice"; quantity = 300.0 + (seed % 100).toFloat(); revenue = 120000.0 },
      ];
      topAnimals = [
        { animalType = "Cattle"; count = 3 + seed % 12; revenue = 300000.0 },
        { animalType = "Goats"; count = 5 + seed % 15; revenue = 100000.0 },
      ];
      generatedAt = now;
    };
    snapshots.add(snapshot);
    snapshot;
  };

  public func listSnapshots(
    snapshots : List.List<Types.FarmAnalyticsSnapshot>,
    userId : Common.UserId
  ) : [Types.FarmAnalyticsSnapshot] {
    snapshots.filter(func(s) { s.userId == userId }).toArray();
  };

  public func getLatestSnapshot(
    snapshots : List.List<Types.FarmAnalyticsSnapshot>,
    userId : Common.UserId
  ) : ?Types.FarmAnalyticsSnapshot {
    let mine = snapshots.filter(func(s) { s.userId == userId });
    mine.last();
  };
}
