import List "mo:core/List";
import Types "../types/disease-outbreak";
import Common "../types/common";

module {
  public func reportOutbreak(
    outbreaks : List.List<Types.OutbreakRecord>,
    state : { var nextOutbreakId : Nat },
    reporterId : Common.UserId,
    region : Text,
    district : ?Text,
    outbreakType : Types.OutbreakType,
    diseaseName : Text,
    severity : Types.OutbreakSeverity,
    description : Text,
    affectedArea : ?Text,
    coordinates : ?{ lat : Float; lng : Float },
    now : Common.Timestamp
  ) : Types.OutbreakRecord {
    let id = state.nextOutbreakId;
    state.nextOutbreakId += 1;
    let record : Types.OutbreakRecord = {
      id;
      reporterId;
      region;
      district;
      outbreakType;
      diseaseName;
      severity;
      description;
      affectedArea;
      reportedAt = now;
      isActive = true;
      coordinates;
    };
    outbreaks.add(record);
    record;
  };

  public func getOutbreaks(
    outbreaks : List.List<Types.OutbreakRecord>,
    filter : Types.OutbreakFilter
  ) : [Types.OutbreakRecord] {
    outbreaks.filter(func(r) {
      let typeMatch = switch (filter.outbreakType) {
        case (?t) { r.outbreakType == t };
        case null { true };
      };
      let regionMatch = switch (filter.region) {
        case (?reg) { r.region == reg };
        case null { true };
      };
      let fromMatch = switch (filter.fromDate) {
        case (?from) { r.reportedAt >= from };
        case null { true };
      };
      let toMatch = switch (filter.toDate) {
        case (?to) { r.reportedAt <= to };
        case null { true };
      };
      let activeMatch = if (filter.activeOnly) { r.isActive } else { true };
      typeMatch and regionMatch and fromMatch and toMatch and activeMatch;
    }).toArray();
  };

  public func getOutbreak(
    outbreaks : List.List<Types.OutbreakRecord>,
    id : Types.OutbreakId
  ) : ?Types.OutbreakRecord {
    outbreaks.find(func(r) { r.id == id });
  };

  public func deactivateOutbreak(
    outbreaks : List.List<Types.OutbreakRecord>,
    id : Types.OutbreakId,
    caller : Common.UserId
  ) : Bool {
    switch (outbreaks.findIndex(func(r) { r.id == id and r.reporterId == caller })) {
      case (?idx) {
        let existing = outbreaks.at(idx);
        outbreaks.put(idx, { existing with isActive = false });
        true;
      };
      case null { false };
    };
  };

  public func sendAlert(
    alerts : List.List<Types.OutbreakAlert>,
    alertState : { var nextAlertId : Nat },
    outbreakId : Types.OutbreakId,
    recipientId : Common.UserId,
    message : Text,
    now : Common.Timestamp
  ) : Types.OutbreakAlert {
    let id = alertState.nextAlertId;
    alertState.nextAlertId += 1;
    let alert : Types.OutbreakAlert = {
      id;
      outbreakId;
      recipientId;
      message;
      sentAt = now;
    };
    alerts.add(alert);
    alert;
  };

  public func getAlertsForUser(
    alerts : List.List<Types.OutbreakAlert>,
    userId : Common.UserId
  ) : [Types.OutbreakAlert] {
    alerts.filter(func(a) { a.recipientId == userId }).toArray();
  };
}
