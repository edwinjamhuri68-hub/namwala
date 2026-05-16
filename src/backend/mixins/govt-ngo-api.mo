import List "mo:core/List";
import Time "mo:core/Time";
import GovtNgoLib "../lib/govt-ngo";
import Types "../types/govt-ngo";
import Common "../types/common";

mixin (
  govtNgoAnnouncements : List.List<Types.GovtNGOAnnouncement>,
  state : { var nextAnnouncementId : Nat }
) {
  public shared ({ caller }) func publishAnnouncement(
    authorName : Text,
    authorOrganization : Text,
    announcementType : Types.AnnouncementType,
    titleEn : Text,
    titleSw : Text,
    bodyEn : Text,
    bodySw : Text,
    region : Text,
    startDate : Common.Timestamp,
    endDate : ?Common.Timestamp,
    contactInfo : ?Text,
    attachmentUrl : ?Text
  ) : async Types.GovtNGOAnnouncement {
    let id = state.nextAnnouncementId;
    state.nextAnnouncementId += 1;
    GovtNgoLib.publishAnnouncement(govtNgoAnnouncements, id, caller, authorName, authorOrganization, announcementType, titleEn, titleSw, bodyEn, bodySw, region, startDate, endDate, contactInfo, attachmentUrl);
  };

  public shared query ({ caller }) func listAnnouncements(
    region : ?Text
  ) : async [Types.GovtNGOAnnouncement] {
    GovtNgoLib.listActiveAnnouncements(govtNgoAnnouncements, region, null);
  };

  public shared query ({ caller }) func listAnnouncementsByType(
    region : ?Text,
    announcementType : Types.AnnouncementType
  ) : async [Types.GovtNGOAnnouncement] {
    GovtNgoLib.listActiveAnnouncements(govtNgoAnnouncements, region, ?announcementType);
  };

  public shared query ({ caller }) func getAnnouncement(
    id : Types.AnnouncementId
  ) : async ?Types.GovtNGOAnnouncement {
    GovtNgoLib.getAnnouncement(govtNgoAnnouncements, id);
  };

  public shared ({ caller }) func deactivateAnnouncement(id : Types.AnnouncementId) : async Bool {
    GovtNgoLib.deactivateAnnouncement(govtNgoAnnouncements, id, caller);
  };
}
