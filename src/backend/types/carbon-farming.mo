import Principal "mo:core/Principal";

module {
  public type CarbonPracticeId = Nat;
  public type CarbonCertId = Nat;

  public type PracticeType = {
    #soilConservation;
    #waterManagement;
    #ecoPesticide;
    #sustainableGrazing;
    #treePlanting;
    #composting;
  };

  public type CertificationLevel = {
    #soilSteward;     // 50 pts
    #waterGuardian;   // 100 pts
    #carbonChampion;  // 250 pts
  };

  public type CarbonPractice = {
    id : CarbonPracticeId;
    owner : Principal;
    practiceType : PracticeType;
    description : Text;
    dateLogged : Int;
    carbonImpactKg : Nat;
    pointsAwarded : Nat;
  };

  public type CarbonCertification = {
    id : CarbonCertId;
    owner : Principal;
    level : CertificationLevel;
    totalPoints : Nat;
    awardedAt : Int;
  };
};
