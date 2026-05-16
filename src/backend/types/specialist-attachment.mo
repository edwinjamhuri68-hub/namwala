import Common "common";

module {
  public type SpecialistDiagnosisAttachment = {
    diagnosisId : Text;
    specialistId : Common.UserId;
    photoUrls : [Text];
    notes : Text;
    attachedAt : Common.Timestamp;
  };
}
