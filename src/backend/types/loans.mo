import Common "common";

module {
  public type LoanId = Nat;

  public type LoanStatus = {
    #pending;
    #under_review;
    #approved;
    #rejected;
  };

  public type LoanApplication = {
    id : LoanId;
    applicantId : Common.UserId;
    amount : Float;
    purpose : Text;
    durationMonths : Nat;
    repaymentTerms : Text;
    activitySummary : Text;
    status : LoanStatus;
    lenderNotes : ?Text;
    createdAt : Common.Timestamp;
    updatedAt : Common.Timestamp;
  };

  public type LoanActivitySummary = {
    totalSales : Float;
    totalExpenses : Float;
    transactionCount : Nat;
    recordCount : Nat;
    period : Nat;
    generatedAt : Common.Timestamp;
  };
}
