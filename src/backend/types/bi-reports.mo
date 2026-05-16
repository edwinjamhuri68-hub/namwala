import Common "common";

module {
  public type BIReportId = Nat;

  public type BIReportType = {
    #profit_forecast;
    #crop_profitability;
    #livestock_profitability;
    #market_opportunity;
  };

  public type BIPeriod = { #weekly; #monthly; #quarterly };

  public type BITrend = { #up; #down; #flat };

  public type BIInsight = {
    titleEn : Text;
    titleSw : Text;
    descriptionEn : Text;
    descriptionSw : Text;
    value : Float;
    unit : Text;
    trend : BITrend;
    recommendationEn : Text;
    recommendationSw : Text;
  };

  public type BIReport = {
    id : BIReportId;
    userId : Common.UserId;
    reportType : BIReportType;
    period : BIPeriod;
    insights : [BIInsight];
    generatedAt : Common.Timestamp;
  };
}
