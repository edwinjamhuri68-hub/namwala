import Principal "mo:core/Principal";

module {
  public type InsuranceAppId = Nat;
  public type ClaimId = Nat;

  public type CoverageType = {
    #crop;
    #livestock;
  };

  public type AppStatus = {
    #pending;
    #approved;
    #rejected;
  };

  public type ClaimType = {
    #drought;
    #flood;
    #pestDisease;
    #theft;
    #other;
  };

  public type ClaimStatus = {
    #filed;
    #underReview;
    #approved;
    #rejected;
    #paid;
  };

  public type InsuranceApplication = {
    id : InsuranceAppId;
    applicant : Principal;
    coverageType : CoverageType;
    description : Text;
    estimatedValue : Nat;
    supportingNotes : Text;
    status : AppStatus;
    createdAt : Int;
  };

  public type InsuranceClaim = {
    id : ClaimId;
    applicationId : InsuranceAppId;
    claimant : Principal;
    claimType : ClaimType;
    damageDescription : Text;
    estimatedLoss : Nat;
    evidenceNotes : Text;
    status : ClaimStatus;
    createdAt : Int;
  };
};
