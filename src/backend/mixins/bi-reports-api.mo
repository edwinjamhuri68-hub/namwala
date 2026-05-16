import List "mo:core/List";
import Time "mo:core/Time";
import BIReportsLib "../lib/bi-reports";
import Types "../types/bi-reports";
import Common "../types/common";

mixin (
  biReports : List.List<Types.BIReport>,
  state : { var nextBIReportId : Nat }
) {
  public shared ({ caller }) func generateBIReport(
    reportType : Types.BIReportType,
    period : Types.BIPeriod
  ) : async Types.BIReport {
    let id = state.nextBIReportId;
    state.nextBIReportId += 1;
    BIReportsLib.generateReport(biReports, id, caller, reportType, period);
  };

  public shared query ({ caller }) func listMyBIReports() : async [Types.BIReport] {
    BIReportsLib.listMyReports(biReports, caller);
  };

  public shared query ({ caller }) func getBIReport(id : Types.BIReportId) : async ?Types.BIReport {
    BIReportsLib.getReport(biReports, id);
  };
}
