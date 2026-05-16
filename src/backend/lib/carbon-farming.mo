import List "mo:core/List";
import Time "mo:core/Time";
import Principal "mo:core/Principal";

import Types "../types/carbon-farming";

module {
  public func pointsForImpact(carbonImpactKg : Nat) : Nat {
    // Integer ceiling division: (n + 9) / 10, minimum 1
    let pts = (carbonImpactKg + 9) / 10;
    if (pts < 1) 1 else pts;
  };

  public func getTotalPoints(
    practices : List.List<Types.CarbonPractice>,
    owner : Principal,
  ) : Nat {
    var total : Nat = 0;
    for (p in practices.values()) {
      if (Principal.equal(p.owner, owner)) {
        total += p.pointsAwarded;
      };
    };
    total;
  };

  public func getEarnedCertifications(
    certs : List.List<Types.CarbonCertification>,
    owner : Principal,
  ) : [Types.CarbonCertification] {
    certs.filter(func(c) { Principal.equal(c.owner, owner) }).toArray();
  };

  public func listPracticesByUser(
    practices : List.List<Types.CarbonPractice>,
    owner : Principal,
  ) : [Types.CarbonPractice] {
    practices.filter(func(p) { Principal.equal(p.owner, owner) }).toArray();
  };

  public func checkAndAwardCertifications(
    practices : List.List<Types.CarbonPractice>,
    certs : List.List<Types.CarbonCertification>,
    state : { var nextCertId : Nat },
    owner : Principal,
  ) : [Types.CarbonCertification] {
    let total = getTotalPoints(practices, owner);
    let now = Time.now();
    let hasCert = func(level : Types.CertificationLevel) : Bool {
      certs.find(func(c) { Principal.equal(c.owner, owner) and c.level == level }) != null;
    };
    let newCerts = List.empty<Types.CarbonCertification>();
    // soilSteward at 50 pts
    if (total >= 50 and not hasCert(#soilSteward)) {
      let id = state.nextCertId;
      state.nextCertId += 1;
      let cert : Types.CarbonCertification = { id; owner; level = #soilSteward; totalPoints = total; awardedAt = now };
      certs.add(cert);
      newCerts.add(cert);
    };
    // waterGuardian at 100 pts
    if (total >= 100 and not hasCert(#waterGuardian)) {
      let id = state.nextCertId;
      state.nextCertId += 1;
      let cert : Types.CarbonCertification = { id; owner; level = #waterGuardian; totalPoints = total; awardedAt = now };
      certs.add(cert);
      newCerts.add(cert);
    };
    // carbonChampion at 250 pts
    if (total >= 250 and not hasCert(#carbonChampion)) {
      let id = state.nextCertId;
      state.nextCertId += 1;
      let cert : Types.CarbonCertification = { id; owner; level = #carbonChampion; totalPoints = total; awardedAt = now };
      certs.add(cert);
      newCerts.add(cert);
    };
    newCerts.toArray();
  };

  public func logPractice(
    practices : List.List<Types.CarbonPractice>,
    certs : List.List<Types.CarbonCertification>,
    state : { var nextPracticeId : Nat; var nextCertId : Nat },
    owner : Principal,
    practiceType : Types.PracticeType,
    description : Text,
    dateLogged : Int,
    carbonImpactKg : Nat,
  ) : Types.CarbonPracticeId {
    let id = state.nextPracticeId;
    state.nextPracticeId += 1;
    let pts = pointsForImpact(carbonImpactKg);
    let practice : Types.CarbonPractice = {
      id;
      owner;
      practiceType;
      description;
      dateLogged;
      carbonImpactKg;
      pointsAwarded = pts;
    };
    practices.add(practice);
    ignore checkAndAwardCertifications(practices, certs, state, owner);
    id;
  };
};
