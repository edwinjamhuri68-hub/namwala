import List "mo:core/List";
import Time "mo:core/Time";
import DigitalContractsLib "../lib/digital-contracts";
import Types "../types/digital-contracts";
import Common "../types/common";

mixin (
  digitalContracts : List.List<Types.DigitalContract>,
  state : { var nextContractId : Nat }
) {
  public shared ({ caller }) func createDigitalContract(
    counterpartyId : Common.UserId,
    templateType : Types.ContractTemplateType,
    title : Text,
    partiesNames : Text,
    terms : Text,
    amount : Float,
    currency : Text,
    startDate : Common.Timestamp,
    endDate : Common.Timestamp
  ) : async Types.DigitalContract {
    let id = state.nextContractId;
    state.nextContractId += 1;
    DigitalContractsLib.createContract(digitalContracts, id, caller, counterpartyId, templateType, title, partiesNames, terms, amount, currency, startDate, endDate);
  };

  public shared query ({ caller }) func listMyContracts() : async [Types.DigitalContract] {
    DigitalContractsLib.listMyContracts(digitalContracts, caller);
  };

  public shared query ({ caller }) func getDigitalContract(id : Types.ContractId) : async ?Types.DigitalContract {
    DigitalContractsLib.getContract(digitalContracts, id);
  };

  public shared ({ caller }) func signDigitalContract(id : Types.ContractId) : async Bool {
    DigitalContractsLib.signContract(digitalContracts, id, caller);
  };

  // Legacy alias
  public shared ({ caller }) func acceptDigitalContract(id : Types.ContractId) : async Bool {
    DigitalContractsLib.signContract(digitalContracts, id, caller);
  };

  public shared ({ caller }) func updateContractStatus(
    id : Types.ContractId,
    status : Types.ContractStatus
  ) : async Bool {
    DigitalContractsLib.updateContractStatus(digitalContracts, id, status);
  };
}
