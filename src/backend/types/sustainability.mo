import Common "common";

module {
  public type SustainabilityRecordId = Nat;
  public type SustainabilityContentId = Nat;

  public type PracticeType = {
    #drip_irrigation;
    #organic_fertilizer;
    #crop_rotation;
    #composting;
    #water_harvesting;
    #agroforestry;
    #integrated_pest_management;
    #other;
  };

  public type ContentType = { #article; #tip; #guide };

  public type ContentCategory = { #soil; #water; #pesticide; #grazing; #energy };

  public type SustainabilityRecord = {
    id : SustainabilityRecordId;
    userId : Common.UserId;
    practiceType : PracticeType;
    description : Text;
    dateImplemented : Common.Timestamp;
    impactScore : ?Float;
    createdAt : Common.Timestamp;
  };

  public type SustainabilityContent = {
    id : SustainabilityContentId;
    contentType : ContentType;
    title : Text;
    bodyEn : Text;
    bodySw : Text;
    category : ContentCategory;
    createdAt : Common.Timestamp;
  };
}
