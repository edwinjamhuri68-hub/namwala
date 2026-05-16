import List "mo:core/List";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Types "../types/bi-reports";
import Common "../types/common";
import Nat8 "mo:core/Nat8";

module {
  func profitForecastInsights(seed : Nat) : [Types.BIInsight] {
    [
      {
        titleEn = "Projected Revenue";
        titleSw = "Mapato Yanayotarajiwa";
        descriptionEn = "Based on current market trends, revenue is expected to grow this period.";
        descriptionSw = "Kulingana na mwenendo wa sasa wa soko, mapato yanatarajiwa kukua kipindi hiki.";
        value = 900000.0 + (seed % 300000).toFloat();
        unit = "TZS";
        trend = #up;
        recommendationEn = "Increase maize production by 10% to capitalize on rising prices.";
        recommendationSw = "Ongeza uzalishaji wa mahindi kwa 10% kutumia fursa ya bei inayopanda.";
      },
      {
        titleEn = "Projected Expenses";
        titleSw = "Gharama Zinazotarajiwa";
        descriptionEn = "Input costs are moderately stable with a slight upward pressure from fertilizer prices.";
        descriptionSw = "Gharama za pembejeo ni imara kiasi na shinikizo kidogo la kupanda kutokana na bei za mbolea.";
        value = 350000.0 + (seed % 100000).toFloat();
        unit = "TZS";
        trend = #flat;
        recommendationEn = "Consider bulk buying fertilizer before the next price increase.";
        recommendationSw = "Fikiria kununua mbolea kwa wingi kabla ya ongezeko lijalo la bei.";
      },
    ];
  };

  func cropProfitabilityInsights(seed : Nat) : [Types.BIInsight] {
    [
      {
        titleEn = "Maize Profitability";
        titleSw = "Faida ya Mahindi";
        descriptionEn = "Maize continues to be the highest-value crop in your region this season.";
        descriptionSw = "Mahindi yanaendelea kuwa zao la thamani zaidi katika eneo lako msimu huu.";
        value = 480000.0 + (seed % 200000).toFloat();
        unit = "TZS per acre";
        trend = #up;
        recommendationEn = "Expand maize acreage and invest in improved seed varieties.";
        recommendationSw = "Panua ekari za mahindi na uwekeze katika aina bora za mbegu.";
      },
      {
        titleEn = "Bean Profitability";
        titleSw = "Faida ya Maharage";
        descriptionEn = "Beans show moderate returns with lower input costs than cereals.";
        descriptionSw = "Maharage yanaonyesha faida ya wastani na gharama za chini za pembejeo kuliko nafaka.";
        value = 320000.0 + (seed % 80000).toFloat();
        unit = "TZS per acre";
        trend = #flat;
        recommendationEn = "Maintain current bean acreage; rotate with maize for soil health.";
        recommendationSw = "Dumisha ekari za sasa za maharage; badilisha na mahindi kwa afya ya udongo.";
      },
    ];
  };

  func livestockProfitabilityInsights(seed : Nat) : [Types.BIInsight] {
    [
      {
        titleEn = "Cattle Sales Return";
        titleSw = "Mapato ya Mauzo ya Ng'ombe";
        descriptionEn = "Cattle prices are rising ahead of the festive season, presenting a good selling opportunity.";
        descriptionSw = "Bei za ng'ombe zinapanda kabla ya msimu wa sherehe, kutoa fursa nzuri ya kuuza.";
        value = 350000.0 + (seed % 150000).toFloat();
        unit = "TZS per head";
        trend = #up;
        recommendationEn = "Consider selling mature cattle now before post-holiday price correction.";
        recommendationSw = "Fikiria kuuza ng'ombe wazima sasa kabla ya marekebisho ya bei baada ya likizo.";
      },
      {
        titleEn = "Poultry Margin";
        titleSw = "Faida ya Kuku";
        descriptionEn = "Poultry margins are under pressure due to rising feed costs.";
        descriptionSw = "Faida ya kuku iko chini ya shinikizo kutokana na gharama za malisho zinazopanda.";
        value = 8000.0 + (seed % 4000).toFloat();
        unit = "TZS per bird";
        trend = #down;
        recommendationEn = "Reduce flock size temporarily or switch to cheaper locally-sourced feed.";
        recommendationSw = "Punguza idadi ya kundi kwa muda au badili kwenye chakula cha bei nafuu cha ndani.";
      },
    ];
  };

  func marketOpportunityInsights(seed : Nat) : [Types.BIInsight] {
    [
      {
        titleEn = "Dar es Salaam Market Demand";
        titleSw = "Mahitaji ya Soko la Dar es Salaam";
        descriptionEn = "Urban demand for fresh vegetables is highest in Dar es Salaam — prices 30% above rural averages.";
        descriptionSw = "Mahitaji ya mijini ya mboga mboga safi ni ya juu zaidi Dar es Salaam — bei 30% juu ya wastani wa vijijini.";
        value = 30.0;
        unit = "% price premium";
        trend = #up;
        recommendationEn = "Consider direct supply partnerships with Dar es Salaam wholesalers.";
        recommendationSw = "Fikiria ushirikiano wa usambazaji wa moja kwa moja na wanunuzi wa jumla wa Dar es Salaam.";
      },
      {
        titleEn = "Export Opportunity — Sesame";
        titleSw = "Fursa ya Usafirishaji — Ufuta";
        descriptionEn = "International demand for organic sesame from Tanzania has grown 20% year-on-year.";
        descriptionSw = "Mahitaji ya kimataifa ya ufuta wa kikaboni kutoka Tanzania yamekua kwa 20% mwaka hadi mwaka.";
        value = 2800000.0 + (seed % 400000).toFloat();
        unit = "TZS per ton";
        trend = #up;
        recommendationEn = "Explore certification for organic sesame to access premium export markets.";
        recommendationSw = "Chunguza uthibitisho wa ufuta wa kikaboni kupata masoko ya nje ya bei ya juu.";
      },
    ];
  };

  public func generateReport(
    reports : List.List<Types.BIReport>,
    nextId : Nat,
    userId : Common.UserId,
    reportType : Types.BIReportType,
    period : Types.BIPeriod
  ) : Types.BIReport {
    let blob = userId.toBlob();
    var seed : Nat = 0;
    for (b in blob.vals()) { seed := (seed * 31 + b.toNat()) % 1000000 };
    let insights = switch (reportType) {
      case (#profit_forecast) profitForecastInsights(seed);
      case (#crop_profitability) cropProfitabilityInsights(seed);
      case (#livestock_profitability) livestockProfitabilityInsights(seed);
      case (#market_opportunity) marketOpportunityInsights(seed);
    };
    let report : Types.BIReport = {
      id = nextId;
      userId;
      reportType;
      period;
      insights;
      generatedAt = Time.now();
    };
    reports.add(report);
    report;
  };

  public func listMyReports(
    reports : List.List<Types.BIReport>,
    userId : Common.UserId
  ) : [Types.BIReport] {
    reports.filter(func(r) { r.userId == userId }).toArray();
  };

  public func getReport(
    reports : List.List<Types.BIReport>,
    id : Types.BIReportId
  ) : ?Types.BIReport {
    reports.find(func(r) { r.id == id });
  };
}
