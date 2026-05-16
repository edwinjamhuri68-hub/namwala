import List "mo:core/List";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Types "../types/loans";
import Common "../types/common";
import Nat8 "mo:core/Nat8";

module {
  public func applyForLoan(
    applications : List.List<Types.LoanApplication>,
    nextId : Nat,
    caller : Common.UserId,
    amount : Float,
    purpose : Text,
    durationMonths : Nat,
    repaymentTerms : Text
  ) : Types.LoanApplication {
    let now = Time.now();
    let app : Types.LoanApplication = {
      id = nextId;
      applicantId = caller;
      amount;
      purpose;
      durationMonths;
      repaymentTerms;
      activitySummary = "Application submitted via Namwala platform";
      status = #pending;
      lenderNotes = null;
      createdAt = now;
      updatedAt = now;
    };
    applications.add(app);
    app;
  };

  public func getLoanApplication(
    applications : List.List<Types.LoanApplication>,
    id : Types.LoanId
  ) : ?Types.LoanApplication {
    applications.find(func(a) { a.id == id });
  };

  public func listMyApplications(
    applications : List.List<Types.LoanApplication>,
    userId : Common.UserId
  ) : [Types.LoanApplication] {
    applications.filter(func(a) { a.applicantId == userId }).toArray();
  };

  public func updateLoanStatus(
    applications : List.List<Types.LoanApplication>,
    id : Types.LoanId,
    status : Types.LoanStatus,
    notes : ?Text
  ) : Bool {
    switch (applications.find(func(a) { a.id == id })) {
      case null false;
      case (?_) {
        applications.mapInPlace(func(a) {
          if (a.id == id) { { a with status; lenderNotes = notes; updatedAt = Time.now() } }
          else a
        });
        true;
      };
    };
  };

  public func generateActivitySummary(
    userId : Common.UserId
  ) : Types.LoanActivitySummary {
    // Mock summary based on principal bytes for deterministic-ish values
    let blob = userId.toBlob();
    let bytes = blob.vals();
    var seed : Nat = 0;
    for (b in bytes) { seed := (seed * 256 + b.toNat()) % 100000 };
    let sales = 500000.0 + (seed % 300000).toFloat();
    let expenses = 200000.0 + (seed % 150000).toFloat();
    {
      totalSales = sales;
      totalExpenses = expenses;
      transactionCount = 12 + seed % 48;
      recordCount = 5 + seed % 45;
      period = 12;
      generatedAt = Time.now();
    };
  };
}
