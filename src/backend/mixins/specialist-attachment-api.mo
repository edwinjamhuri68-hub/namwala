import List "mo:core/List";
import Time "mo:core/Time";
import SpecialistAttachmentLib "../lib/specialist-attachment";
import Types "../types/specialist-attachment";
import Common "../types/common";

mixin (
  specialistAttachments : List.List<Types.SpecialistDiagnosisAttachment>,
) {
  /// Specialist attaches photos and notes to an existing diagnosis.
  public shared ({ caller }) func addSpecialistDiagnosisAttachment(
    diagnosisId : Text,
    photoUrls : [Text],
    notes : Text,
  ) : async Types.SpecialistDiagnosisAttachment {
    SpecialistAttachmentLib.addSpecialistDiagnosisAttachment(
      specialistAttachments, caller, diagnosisId, photoUrls, notes, Time.now()
    );
  };

  /// Get all specialist attachments for a given diagnosis ID.
  public query func getSpecialistAttachments(
    diagnosisId : Text,
  ) : async [Types.SpecialistDiagnosisAttachment] {
    SpecialistAttachmentLib.getSpecialistAttachments(specialistAttachments, diagnosisId);
  };
}
