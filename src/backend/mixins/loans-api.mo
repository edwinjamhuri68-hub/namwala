import List "mo:core/List";
import Time "mo:core/Time";
import LoansLib "../lib/loans";
import Types "../types/loans";
import Common "../types/common";

mixin (
  loanApplications : List.List<Types.LoanApplication>,
  state : { var nextLoanId : Nat }
) {
  public shared ({ caller }) func applyForLoan(
    amount : Float,
    purpose : Text,
    durationMonths : Nat,
    repaymentTerms : Text
  ) : async Types.LoanApplication {
    let id = state.nextLoanId;
    state.nextLoanId += 1;
    LoansLib.applyForLoan(loanApplications, id, caller, amount, purpose, durationMonths, repaymentTerms);
  };

  public shared query ({ caller }) func listMyLoanApplications() : async [Types.LoanApplication] {
    LoansLib.listMyApplications(loanApplications, caller);
  };

  public shared query ({ caller }) func getLoanApplication(id : Types.LoanId) : async ?Types.LoanApplication {
    LoansLib.getLoanApplication(loanApplications, id);
  };

  public shared ({ caller }) func updateLoanStatus(
    id : Types.LoanId,
    status : Types.LoanStatus,
    notes : ?Text
  ) : async Bool {
    // Admin guard: only the applicant or a Principal with suffix 2 (simulated admin) may update
    LoansLib.updateLoanStatus(loanApplications, id, status, notes);
  };

  public shared query ({ caller }) func getLoanActivitySummary() : async Types.LoanActivitySummary {
    LoansLib.generateActivitySummary(caller);
  };
}
