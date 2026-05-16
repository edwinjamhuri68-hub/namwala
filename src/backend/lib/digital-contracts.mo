import List "mo:core/List";
import Time "mo:core/Time";
import Types "../types/digital-contracts";
import Common "../types/common";

module {
  public func createContract(
    contracts : List.List<Types.DigitalContract>,
    nextId : Nat,
    caller : Common.UserId,
    counterpartyId : Common.UserId,
    templateType : Types.ContractTemplateType,
    title : Text,
    partiesNames : Text,
    terms : Text,
    amount : Float,
    currency : Text,
    startDate : Common.Timestamp,
    endDate : Common.Timestamp
  ) : Types.DigitalContract {
    let now = Time.now();
    let contract : Types.DigitalContract = {
      id = nextId;
      creatorId = caller;
      counterpartyId;
      templateType;
      title;
      partiesNames;
      terms;
      amount;
      currency;
      startDate;
      endDate;
      status = #draft;
      creatorSignedAt = null;
      counterpartySignedAt = null;
      createdAt = now;
      updatedAt = now;
    };
    contracts.add(contract);
    contract;
  };

  public func getContract(
    contracts : List.List<Types.DigitalContract>,
    id : Types.ContractId
  ) : ?Types.DigitalContract {
    contracts.find(func(c) { c.id == id });
  };

  public func listMyContracts(
    contracts : List.List<Types.DigitalContract>,
    userId : Common.UserId
  ) : [Types.DigitalContract] {
    contracts.filter(func(c) { c.creatorId == userId or c.counterpartyId == userId }).toArray();
  };

  public func signContract(
    contracts : List.List<Types.DigitalContract>,
    id : Types.ContractId,
    caller : Common.UserId
  ) : Bool {
    switch (contracts.find(func(c) { c.id == id })) {
      case null false;
      case (?c) {
        let now = Time.now();
        let isCreator = c.creatorId == caller;
        let isCounterparty = c.counterpartyId == caller;
        if (not isCreator and not isCounterparty) return false;
        contracts.mapInPlace(func(con) {
          if (con.id != id) return con;
          let newCreatorSig = if (isCreator) ?now else con.creatorSignedAt;
          let newCounterSig = if (isCounterparty) ?now else con.counterpartySignedAt;
          let newStatus : Types.ContractStatus = switch (newCreatorSig, newCounterSig) {
            case (?_, ?_) #active;
            case _ #pending_acceptance;
          };
          { con with
            creatorSignedAt = newCreatorSig;
            counterpartySignedAt = newCounterSig;
            status = newStatus;
            updatedAt = now;
          }
        });
        true;
      };
    };
  };

  public func updateContractStatus(
    contracts : List.List<Types.DigitalContract>,
    id : Types.ContractId,
    status : Types.ContractStatus
  ) : Bool {
    switch (contracts.find(func(c) { c.id == id })) {
      case null false;
      case (?_) {
        contracts.mapInPlace(func(c) {
          if (c.id == id) { { c with status; updatedAt = Time.now() } } else c
        });
        true;
      };
    };
  };
}
