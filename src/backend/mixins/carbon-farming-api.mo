import List "mo:core/List";
import Principal "mo:core/Principal";

import Types "../types/carbon-farming";
import Lib "../lib/carbon-farming";

mixin (
  carbonPractices : List.List<Types.CarbonPractice>,
  carbonCerts : List.List<Types.CarbonCertification>,
  carbonState : { var nextPracticeId : Nat; var nextCertId : Nat },
) {

  public shared ({ caller }) func logCarbonPractice(
    practiceType : Types.PracticeType,
    description : Text,
    dateLogged : Int,
    carbonImpactKg : Nat,
  ) : async Types.CarbonPracticeId {
    Lib.logPractice(carbonPractices, carbonCerts, carbonState, caller, practiceType, description, dateLogged, carbonImpactKg);
  };

  public query ({ caller }) func getMyCarbonPoints() : async Nat {
    Lib.getTotalPoints(carbonPractices, caller);
  };

  public query ({ caller }) func getMyCarbonCertifications() : async [Types.CarbonCertification] {
    Lib.getEarnedCertifications(carbonCerts, caller);
  };

  public query ({ caller }) func listMyCarbonPractices() : async [Types.CarbonPractice] {
    Lib.listPracticesByUser(carbonPractices, caller);
  };

  public query func getUserCarbonPoints(userId : Principal) : async Nat {
    Lib.getTotalPoints(carbonPractices, userId);
  };

  public query func getUserCarbonCertifications(
    userId : Principal,
  ) : async [Types.CarbonCertification] {
    Lib.getEarnedCertifications(carbonCerts, userId);
  };
};
