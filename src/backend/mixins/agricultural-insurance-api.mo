import List "mo:core/List";
import Principal "mo:core/Principal";

import Types "../types/agricultural-insurance";
import Lib "../lib/agricultural-insurance";

mixin (
  insuranceApplications : List.List<Types.InsuranceApplication>,
  insuranceClaims : List.List<Types.InsuranceClaim>,
  insuranceState : { var nextInsuranceAppId : Nat; var nextClaimId : Nat },
) {

  public shared ({ caller }) func submitInsuranceApplication(
    coverageType : Types.CoverageType,
    description : Text,
    estimatedValue : Nat,
    supportingNotes : Text,
  ) : async Types.InsuranceAppId {
    Lib.submitApplication(insuranceApplications, insuranceState, caller, coverageType, description, estimatedValue, supportingNotes);
  };

  public shared func updateInsuranceApplicationStatus(
    appId : Types.InsuranceAppId,
    status : Types.AppStatus,
  ) : async Bool {
    Lib.updateApplicationStatus(insuranceApplications, appId, status);
  };

  public shared ({ caller }) func fileInsuranceClaim(
    applicationId : Types.InsuranceAppId,
    claimType : Types.ClaimType,
    damageDescription : Text,
    estimatedLoss : Nat,
    evidenceNotes : Text,
  ) : async Types.ClaimId {
    Lib.fileClaim(insuranceClaims, insuranceState, caller, applicationId, claimType, damageDescription, estimatedLoss, evidenceNotes);
  };

  public shared func updateInsuranceClaimStatus(
    claimId : Types.ClaimId,
    status : Types.ClaimStatus,
  ) : async Bool {
    Lib.updateClaimStatus(insuranceClaims, claimId, status);
  };

  public query ({ caller }) func listMyInsuranceApplications(
    status : ?Types.AppStatus,
  ) : async [Types.InsuranceApplication] {
    Lib.listApplicationsByUser(insuranceApplications, caller, status);
  };

  public query ({ caller }) func listMyInsuranceClaims(
    status : ?Types.ClaimStatus,
  ) : async [Types.InsuranceClaim] {
    Lib.listClaimsByUser(insuranceClaims, caller, status);
  };

  public query func getInsuranceApplication(
    appId : Types.InsuranceAppId,
  ) : async ?Types.InsuranceApplication {
    Lib.getApplication(insuranceApplications, appId);
  };

  public query func getInsuranceClaim(
    claimId : Types.ClaimId,
  ) : async ?Types.InsuranceClaim {
    Lib.getClaim(insuranceClaims, claimId);
  };
};
