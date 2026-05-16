import List "mo:core/List";
import Time "mo:core/Time";
import Principal "mo:core/Principal";

import Types "../types/agricultural-insurance";

module {
  public func submitApplication(
    applications : List.List<Types.InsuranceApplication>,
    state : { var nextInsuranceAppId : Nat },
    applicant : Principal,
    coverageType : Types.CoverageType,
    description : Text,
    estimatedValue : Nat,
    supportingNotes : Text,
  ) : Types.InsuranceAppId {
    let id = state.nextInsuranceAppId;
    state.nextInsuranceAppId += 1;
    let app : Types.InsuranceApplication = {
      id;
      applicant;
      coverageType;
      description;
      estimatedValue;
      supportingNotes;
      status = #pending;
      createdAt = Time.now();
    };
    applications.add(app);
    id;
  };

  public func updateApplicationStatus(
    applications : List.List<Types.InsuranceApplication>,
    appId : Types.InsuranceAppId,
    status : Types.AppStatus,
  ) : Bool {
    var found = false;
    applications.mapInPlace(func(a) {
      if (a.id == appId) {
        found := true;
        { a with status };
      } else { a };
    });
    found;
  };

  public func fileClaim(
    claims : List.List<Types.InsuranceClaim>,
    state : { var nextClaimId : Nat },
    claimant : Principal,
    applicationId : Types.InsuranceAppId,
    claimType : Types.ClaimType,
    damageDescription : Text,
    estimatedLoss : Nat,
    evidenceNotes : Text,
  ) : Types.ClaimId {
    let id = state.nextClaimId;
    state.nextClaimId += 1;
    let claim : Types.InsuranceClaim = {
      id;
      applicationId;
      claimant;
      claimType;
      damageDescription;
      estimatedLoss;
      evidenceNotes;
      status = #filed;
      createdAt = Time.now();
    };
    claims.add(claim);
    id;
  };

  public func updateClaimStatus(
    claims : List.List<Types.InsuranceClaim>,
    claimId : Types.ClaimId,
    status : Types.ClaimStatus,
  ) : Bool {
    var found = false;
    claims.mapInPlace(func(c) {
      if (c.id == claimId) {
        found := true;
        { c with status };
      } else { c };
    });
    found;
  };

  public func listApplicationsByUser(
    applications : List.List<Types.InsuranceApplication>,
    user : Principal,
    status : ?Types.AppStatus,
  ) : [Types.InsuranceApplication] {
    applications.filter(func(a) {
      let matchesUser = Principal.equal(a.applicant, user);
      let matchesStatus = switch (status) {
        case null true;
        case (?s) a.status == s;
      };
      matchesUser and matchesStatus;
    }).toArray();
  };

  public func listClaimsByUser(
    claims : List.List<Types.InsuranceClaim>,
    user : Principal,
    status : ?Types.ClaimStatus,
  ) : [Types.InsuranceClaim] {
    claims.filter(func(c) {
      let matchesUser = Principal.equal(c.claimant, user);
      let matchesStatus = switch (status) {
        case null true;
        case (?s) c.status == s;
      };
      matchesUser and matchesStatus;
    }).toArray();
  };

  public func getApplication(
    applications : List.List<Types.InsuranceApplication>,
    appId : Types.InsuranceAppId,
  ) : ?Types.InsuranceApplication {
    applications.find(func(a) { a.id == appId });
  };

  public func getClaim(
    claims : List.List<Types.InsuranceClaim>,
    claimId : Types.ClaimId,
  ) : ?Types.InsuranceClaim {
    claims.find(func(c) { c.id == claimId });
  };
};
