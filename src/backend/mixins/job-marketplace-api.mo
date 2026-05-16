import List "mo:core/List";
import Principal "mo:core/Principal";

import Types "../types/job-marketplace";
import Lib "../lib/job-marketplace";

mixin (
  jobs : List.List<Types.JobListing>,
  workerProfiles : List.List<Types.WorkerProfile>,
  jobApplications : List.List<Types.JobApplication>,
  jobRatings : List.List<Types.JobRating>,
  jobState : { var nextJobId : Nat; var nextWorkerProfileId : Nat; var nextApplicationId : Nat; var nextJobRatingId : Nat },
) {

  public shared ({ caller }) func createJobListing(
    title : Text,
    description : Text,
    jobType : Types.JobType,
    payRate : Text,
    location : Text,
    deadline : Int,
    requiredSkills : [Text],
  ) : async Types.JobId {
    Lib.createJobListing(jobs, jobState, caller, title, description, jobType, payRate, location, deadline, requiredSkills);
  };

  public shared ({ caller }) func updateJobStatus(
    jobId : Types.JobId,
    status : Types.JobStatus,
  ) : async Bool {
    Lib.updateJobStatus(jobs, caller, jobId, status);
  };

  public shared ({ caller }) func createWorkerProfile(
    name : Text,
    skills : [Text],
    serviceArea : Text,
    availability : Text,
    bio : Text,
  ) : async Types.WorkerProfileId {
    Lib.createWorkerProfile(workerProfiles, jobState, caller, name, skills, serviceArea, availability, bio);
  };

  public shared ({ caller }) func applyToJob(
    jobId : Types.JobId,
    coverNote : Text,
  ) : async Types.JobApplicationId {
    Lib.applyToJob(jobApplications, jobState, caller, jobId, coverNote);
  };

  public shared ({ caller }) func respondToJobApplication(
    applicationId : Types.JobApplicationId,
    accept : Bool,
  ) : async Bool {
    Lib.respondToApplication(jobApplications, jobs, caller, applicationId, accept);
  };

  public shared ({ caller }) func submitJobRating(
    jobId : Types.JobId,
    ratee : Principal,
    stars : Nat,
    comment : Text,
  ) : async Bool {
    Lib.submitJobRating(jobRatings, workerProfiles, jobState, caller, jobId, ratee, stars, comment);
  };

  public query func listJobs(
    jobType : ?Types.JobType,
    location : ?Text,
    status : ?Types.JobStatus,
  ) : async [Types.JobListing] {
    Lib.listJobs(jobs, jobType, location, status);
  };

  public query func listWorkerProfiles(
    skill : ?Text,
    serviceArea : ?Text,
  ) : async [Types.WorkerProfile] {
    Lib.listWorkerProfiles(workerProfiles, skill, serviceArea);
  };

  public query func getJob(jobId : Types.JobId) : async ?Types.JobListing {
    Lib.getJob(jobs, jobId);
  };

  public query ({ caller }) func getMyWorkerProfile() : async ?Types.WorkerProfile {
    Lib.getWorkerProfile(workerProfiles, caller);
  };

  public query func listApplicationsForJob(jobId : Types.JobId) : async [Types.JobApplication] {
    Lib.listApplicationsForJob(jobApplications, jobId);
  };

  public query ({ caller }) func listMyJobApplications() : async [Types.JobApplication] {
    Lib.listApplicationsByApplicant(jobApplications, caller);
  };
};
