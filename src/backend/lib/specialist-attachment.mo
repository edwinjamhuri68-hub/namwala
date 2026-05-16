import List "mo:core/List";
import Types "../types/specialist-attachment";
import Common "../types/common";

module {
  public func addSpecialistDiagnosisAttachment(
    attachments : List.List<Types.SpecialistDiagnosisAttachment>,
    specialistId : Common.UserId,
    diagnosisId : Text,
    photoUrls : [Text],
    notes : Text,
    attachedAt : Common.Timestamp,
  ) : Types.SpecialistDiagnosisAttachment {
    let attachment : Types.SpecialistDiagnosisAttachment = {
      diagnosisId;
      specialistId;
      photoUrls;
      notes;
      attachedAt;
    };
    attachments.add(attachment);
    attachment;
  };

  public func getSpecialistAttachments(
    attachments : List.List<Types.SpecialistDiagnosisAttachment>,
    diagnosisId : Text,
  ) : [Types.SpecialistDiagnosisAttachment] {
    attachments.filter(func(a) { a.diagnosisId == diagnosisId }).toArray();
  };
}
