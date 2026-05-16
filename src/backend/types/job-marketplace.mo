import Principal "mo:core/Principal";
import Time "mo:core/Time";

module {
  public type JobId = Nat;
  public type WorkerProfileId = Nat;
  public type JobApplicationId = Nat;
  public type JobRatingId = Nat;

  public type JobType = {
    #planting;
    #harvesting;
    #livestockCare;
    #spraying;
    #transport;
    #other;
  };

  public type JobStatus = {
    #open;
    #filled;
    #completed;
    #cancelled;
  };

  public type ApplicationStatus = {
    #pending;
    #accepted;
    #declined;
  };

  public type JobListing = {
    id : JobId;
    employer : Principal;
    title : Text;
    description : Text;
    jobType : JobType;
    payRate : Text;
    location : Text;
    deadline : Int;
    requiredSkills : [Text];
    status : JobStatus;
    createdAt : Int;
  };

  public type WorkerProfile = {
    id : WorkerProfileId;
    owner : Principal;
    name : Text;
    skills : [Text];
    serviceArea : Text;
    availability : Text;
    bio : Text;
    rating : Float;
    ratingCount : Nat;
    createdAt : Int;
  };

  public type JobApplication = {
    id : JobApplicationId;
    jobId : JobId;
    applicant : Principal;
    coverNote : Text;
    status : ApplicationStatus;
    appliedAt : Int;
  };

  public type JobRating = {
    id : JobRatingId;
    jobId : JobId;
    rater : Principal;
    ratee : Principal;
    stars : Nat;
    comment : Text;
    createdAt : Int;
  };
};
