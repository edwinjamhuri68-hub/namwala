import Common "common";

module {
  public type ContractId = Nat;

  public type ContractTemplateType = {
    #crop_sale;
    #service_agreement;
    #delivery_agreement;
  };

  public type ContractStatus = {
    #draft;
    #pending_acceptance;
    #active;
    #completed;
    #disputed;
  };

  public type DigitalContract = {
    id : ContractId;
    creatorId : Common.UserId;
    counterpartyId : Common.UserId;
    templateType : ContractTemplateType;
    title : Text;
    partiesNames : Text;
    terms : Text;
    amount : Float;
    currency : Text;
    startDate : Common.Timestamp;
    endDate : Common.Timestamp;
    status : ContractStatus;
    creatorSignedAt : ?Common.Timestamp;
    counterpartySignedAt : ?Common.Timestamp;
    createdAt : Common.Timestamp;
    updatedAt : Common.Timestamp;
  };
}
