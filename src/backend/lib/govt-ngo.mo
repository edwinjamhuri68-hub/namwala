import List "mo:core/List";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Types "../types/govt-ngo";
import Common "../types/common";

module {
  public func publishAnnouncement(
    announcements : List.List<Types.GovtNGOAnnouncement>,
    nextId : Nat,
    caller : Common.UserId,
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
  ) : Types.GovtNGOAnnouncement {
    let entry : Types.GovtNGOAnnouncement = {
      id = nextId;
      authorId = caller;
      authorName;
      authorOrganization;
      announcementType;
      titleEn;
      titleSw;
      bodyEn;
      bodySw;
      region;
      startDate;
      endDate;
      contactInfo;
      attachmentUrl;
      createdAt = Time.now();
      isActive = true;
    };
    announcements.add(entry);
    entry;
  };

  public func listActiveAnnouncements(
    announcements : List.List<Types.GovtNGOAnnouncement>,
    region : ?Text,
    announcementType : ?Types.AnnouncementType
  ) : [Types.GovtNGOAnnouncement] {
    let now = Time.now();
    announcements.filter(func(a) {
      a.isActive and
      (switch (region) { case (?r) a.region == r or a.region == "all"; case null true }) and
      (switch (announcementType) { case (?t) a.announcementType == t; case null true }) and
      (switch (a.endDate) { case (?ed) ed > now; case null true })
    }).toArray();
  };

  public func getAnnouncement(
    announcements : List.List<Types.GovtNGOAnnouncement>,
    id : Types.AnnouncementId
  ) : ?Types.GovtNGOAnnouncement {
    announcements.find(func(a) { a.id == id });
  };

  public func deactivateAnnouncement(
    announcements : List.List<Types.GovtNGOAnnouncement>,
    id : Types.AnnouncementId,
    caller : Common.UserId
  ) : Bool {
    switch (announcements.find(func(a) { a.id == id })) {
      case null false;
      case (?a) {
        if (a.authorId != caller) return false;
        announcements.mapInPlace(func(ann) {
          if (ann.id == id) { { ann with isActive = false } } else ann
        });
        true;
      };
    };
  };

  // Seed 3 sample announcements (call once at init)
  public func seedSampleAnnouncements(
    announcements : List.List<Types.GovtNGOAnnouncement>,
    caller : Common.UserId,
    startId : Nat
  ) {
    let now = Time.now();
    let samples : [(Types.AnnouncementType, Text, Text, Text, Text, Text)] = [
      (#training,
       "Free Farmer Training — Dodoma",
       "Mafunzo ya Bure kwa Wakulima — Dodoma",
       "The Ministry of Agriculture is offering free training on modern farming techniques in Dodoma from 15–20 June. Registration open to all farmers.",
       "Wizara ya Kilimo inatoa mafunzo ya bure kuhusu mbinu za kisasa za kilimo Dodoma kuanzia tarehe 15–20 Juni. Usajili umefunguliwa kwa wakulima wote.",
       "Dodoma"),
      (#subsidy,
       "Fertilizer Subsidy Program 2026",
       "Programu ya Ruzuku ya Mbolea 2026",
       "Eligible smallholder farmers can apply for a 50% fertilizer subsidy under the 2026 national agriculture support program. Apply through your ward agricultural officer.",
       "Wakulima wadogo wanaostahili wanaweza kuomba ruzuku ya mbolea ya 50% chini ya programu ya msaada wa kilimo ya kitaifa ya 2026. Omba kupitia afisa kilimo wako wa kata.",
       "all"),
      (#emergency,
       "Fall Armyworm Alert — Northern Regions",
       "Onyo la Viwavi Jeshi — Mikoa ya Kaskazini",
       "An outbreak of fall armyworm has been reported in Arusha, Manyara, and Kilimanjaro regions. Farmers are advised to inspect crops immediately and contact extension officers.",
       "Mlipuko wa viwavi jeshi umeripotiwa katika mikoa ya Arusha, Manyara, na Kilimanjaro. Wakulima wanashauriwa kukagua mazao mara moja na kuwasiliana na maafisa ugani.",
       "Northern"),
    ];
    var i = 0;
    for ((atype, titleEn, titleSw, bodyEn, bodySw, region) in samples.vals()) {
      announcements.add({
        id = startId + i;
        authorId = caller;
        authorName = "System";
        authorOrganization = "Namwala Admin";
        announcementType = atype;
        titleEn;
        titleSw;
        bodyEn;
        bodySw;
        region;
        startDate = now;
        endDate = null;
        contactInfo = null;
        attachmentUrl = null;
        createdAt = now;
        isActive = true;
      });
      i += 1;
    };
  };
}
