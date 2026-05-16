import Common "common";

module {
  public type AnnouncementId = Nat;

  public type AnnouncementType = {
    #training;
    #subsidy;
    #emergency;
    #policy_update;
    #opportunity;
  };

  public type GovtNGOAnnouncement = {
    id : AnnouncementId;
    authorId : Common.UserId;
    authorName : Text;
    authorOrganization : Text;
    announcementType : AnnouncementType;
    titleEn : Text;
    titleSw : Text;
    bodyEn : Text;
    bodySw : Text;
    region : Text;
    startDate : Common.Timestamp;
    endDate : ?Common.Timestamp;
    contactInfo : ?Text;
    attachmentUrl : ?Text;
    createdAt : Common.Timestamp;
    isActive : Bool;
  };
}
