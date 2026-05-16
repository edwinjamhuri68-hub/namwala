import Common "common";

module {
  public type OutbreakId = Nat;
  public type AlertId = Nat;

  public type OutbreakType = {
    #crop_disease;
    #livestock_infection;
    #pest_invasion;
    #drought;
  };

  public type OutbreakSeverity = {
    #low;
    #medium;
    #high;
    #critical;
  };

  public type OutbreakRecord = {
    id : OutbreakId;
    reporterId : Common.UserId;
    region : Text;
    district : ?Text;
    outbreakType : OutbreakType;
    diseaseName : Text;
    severity : OutbreakSeverity;
    description : Text;
    affectedArea : ?Text;
    reportedAt : Common.Timestamp;
    isActive : Bool;
    coordinates : ?{ lat : Float; lng : Float };
  };

  public type OutbreakFilter = {
    outbreakType : ?OutbreakType;
    region : ?Text;
    fromDate : ?Common.Timestamp;
    toDate : ?Common.Timestamp;
    activeOnly : Bool;
  };

  public type OutbreakAlert = {
    id : AlertId;
    outbreakId : OutbreakId;
    recipientId : Common.UserId;
    message : Text;
    sentAt : Common.Timestamp;
  };
}
