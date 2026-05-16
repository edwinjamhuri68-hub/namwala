import List "mo:core/List";
import Time "mo:core/Time";
import Principal "mo:core/Principal";

import Types "../types/job-marketplace";

module {
  public func createJobListing(
    jobs : List.List<Types.JobListing>,
    state : { var nextJobId : Nat },
    employer : Principal,
    title : Text,
    description : Text,
    jobType : Types.JobType,
    payRate : Text,
    location : Text,
    deadline : Int,
    requiredSkills : [Text],
  ) : Types.JobId {
    let id = state.nextJobId;
    state.nextJobId += 1;
    let listing : Types.JobListing = {
      id;
      employer;
      title;
      description;
      jobType;
      payRate;
      location;
      deadline;
      requiredSkills;
      status = #open;
      createdAt = Time.now();
    };
    jobs.add(listing);
    id;
  };

  public func updateJobStatus(
    jobs : List.List<Types.JobListing>,
    caller : Principal,
    jobId : Types.JobId,
    status : Types.JobStatus,
  ) : Bool {
    var found = false;
    jobs.mapInPlace(func(job) {
      if (job.id == jobId and Principal.equal(job.employer, caller)) {
        found := true;
        { job with status };
      } else { job };
    });
    found;
  };

  public func createWorkerProfile(
    profiles : List.List<Types.WorkerProfile>,
    state : { var nextWorkerProfileId : Nat },
    caller : Principal,
    name : Text,
    skills : [Text],
    serviceArea : Text,
    availability : Text,
    bio : Text,
  ) : Types.WorkerProfileId {
    switch (profiles.find(func(p) { Principal.equal(p.owner, caller) })) {
      case (?existing) {
        profiles.mapInPlace(func(p) {
          if (Principal.equal(p.owner, caller)) {
            { p with name; skills; serviceArea; availability; bio };
          } else { p };
        });
        existing.id;
      };
      case null {
        let id = state.nextWorkerProfileId;
        state.nextWorkerProfileId += 1;
        let profile : Types.WorkerProfile = {
          id;
          owner = caller;
          name;
          skills;
          serviceArea;
          availability;
          bio;
          rating = 0.0;
          ratingCount = 0;
          createdAt = Time.now();
        };
        profiles.add(profile);
        id;
      };
    };
  };

  public func applyToJob(
    applications : List.List<Types.JobApplication>,
    state : { var nextApplicationId : Nat },
    caller : Principal,
    jobId : Types.JobId,
    coverNote : Text,
  ) : Types.JobApplicationId {
    switch (applications.find(func(a) { a.jobId == jobId and Principal.equal(a.applicant, caller) })) {
      case (?existing) { existing.id };
      case null {
        let id = state.nextApplicationId;
        state.nextApplicationId += 1;
        let app : Types.JobApplication = {
          id;
          jobId;
          applicant = caller;
          coverNote;
          status = #pending;
          appliedAt = Time.now();
        };
        applications.add(app);
        id;
      };
    };
  };

  public func respondToApplication(
    applications : List.List<Types.JobApplication>,
    jobs : List.List<Types.JobListing>,
    caller : Principal,
    applicationId : Types.JobApplicationId,
    accept : Bool,
  ) : Bool {
    let newAppStatus : Types.ApplicationStatus = if (accept) #accepted else #declined;
    var updated = false;
    var targetJobId : ?Types.JobId = null;
    switch (applications.find(func(a) { a.id == applicationId })) {
      case null { false };
      case (?app) {
        switch (jobs.find(func(j) { j.id == app.jobId and Principal.equal(j.employer, caller) })) {
          case null { false };
          case (?_job) {
            applications.mapInPlace(func(a) {
              if (a.id == applicationId) {
                updated := true;
                targetJobId := ?a.jobId;
                { a with status = newAppStatus };
              } else { a };
            });
            if (accept) {
              switch (targetJobId) {
                case (?jid) {
                  jobs.mapInPlace(func(j) {
                    if (j.id == jid) { { j with status = #filled } } else { j };
                  });
                };
                case null {};
              };
            };
            updated;
          };
        };
      };
    };
  };

  public func submitJobRating(
    ratings : List.List<Types.JobRating>,
    profiles : List.List<Types.WorkerProfile>,
    state : { var nextJobRatingId : Nat },
    caller : Principal,
    jobId : Types.JobId,
    ratee : Principal,
    stars : Nat,
    comment : Text,
  ) : Bool {
    switch (ratings.find(func(r) { r.jobId == jobId and Principal.equal(r.rater, caller) and Principal.equal(r.ratee, ratee) })) {
      case (?_) { false };
      case null {
        let id = state.nextJobRatingId;
        state.nextJobRatingId += 1;
        let rating : Types.JobRating = {
          id;
          jobId;
          rater = caller;
          ratee;
          stars;
          comment;
          createdAt = Time.now();
        };
        ratings.add(rating);
        profiles.mapInPlace(func(p) {
          if (Principal.equal(p.owner, ratee)) {
            let newCount = p.ratingCount + 1;
            let newRating = (p.rating * p.ratingCount.toFloat() + stars.toFloat()) / newCount.toFloat();
            { p with rating = newRating; ratingCount = newCount };
          } else { p };
        });
        true;
      };
    };
  };

  public func listJobs(
    jobs : List.List<Types.JobListing>,
    jobType : ?Types.JobType,
    location : ?Text,
    status : ?Types.JobStatus,
  ) : [Types.JobListing] {
    jobs.filter(func(j) {
      let matchesType = switch (jobType) {
        case null true;
        case (?jt) j.jobType == jt;
      };
      let matchesLocation = switch (location) {
        case null true;
        case (?loc) j.location == loc;
      };
      let matchesStatus = switch (status) {
        case null true;
        case (?s) j.status == s;
      };
      matchesType and matchesLocation and matchesStatus;
    }).toArray();
  };

  public func listWorkerProfiles(
    profiles : List.List<Types.WorkerProfile>,
    skill : ?Text,
    serviceArea : ?Text,
  ) : [Types.WorkerProfile] {
    profiles.filter(func(p) {
      let matchesSkill = switch (skill) {
        case null true;
        case (?sk) p.skills.find(func(s) { s == sk }) != null;
      };
      let matchesArea = switch (serviceArea) {
        case null true;
        case (?area) p.serviceArea == area;
      };
      matchesSkill and matchesArea;
    }).toArray();
  };

  public func getJob(
    jobs : List.List<Types.JobListing>,
    jobId : Types.JobId,
  ) : ?Types.JobListing {
    jobs.find(func(j) { j.id == jobId });
  };

  public func getWorkerProfile(
    profiles : List.List<Types.WorkerProfile>,
    owner : Principal,
  ) : ?Types.WorkerProfile {
    profiles.find(func(p) { Principal.equal(p.owner, owner) });
  };

  public func listApplicationsForJob(
    applications : List.List<Types.JobApplication>,
    jobId : Types.JobId,
  ) : [Types.JobApplication] {
    applications.filter(func(a) { a.jobId == jobId }).toArray();
  };

  public func listApplicationsByApplicant(
    applications : List.List<Types.JobApplication>,
    applicant : Principal,
  ) : [Types.JobApplication] {
    applications.filter(func(a) { Principal.equal(a.applicant, applicant) }).toArray();
  };
};
