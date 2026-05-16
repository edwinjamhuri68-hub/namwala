import List "mo:core/List";
import Time "mo:core/Time";
import Types "../types/sustainability";
import Common "../types/common";

module {
  // Impact score per practice type (higher = better environmental impact)
  func practiceScore(pt : Types.PracticeType) : Float {
    switch pt {
      case (#drip_irrigation) 8.5;
      case (#organic_fertilizer) 9.0;
      case (#crop_rotation) 8.0;
      case (#composting) 8.5;
      case (#water_harvesting) 9.5;
      case (#agroforestry) 9.0;
      case (#integrated_pest_management) 8.0;
      case (#other) 5.0;
    };
  };

  public func logPractice(
    records : List.List<Types.SustainabilityRecord>,
    nextId : Nat,
    caller : Common.UserId,
    practiceType : Types.PracticeType,
    description : Text,
    dateImplemented : Common.Timestamp,
    impactScore : ?Float
  ) : Types.SustainabilityRecord {
    let score = switch (impactScore) { case (?s) ?s; case null ?practiceScore(practiceType) };
    let record : Types.SustainabilityRecord = {
      id = nextId;
      userId = caller;
      practiceType;
      description;
      dateImplemented;
      impactScore = score;
      createdAt = Time.now();
    };
    records.add(record);
    record;
  };

  public func listMyPractices(
    records : List.List<Types.SustainabilityRecord>,
    userId : Common.UserId
  ) : [Types.SustainabilityRecord] {
    records.filter(func(r) { r.userId == userId }).toArray();
  };

  public func deletePractice(
    records : List.List<Types.SustainabilityRecord>,
    id : Types.SustainabilityRecordId,
    caller : Common.UserId
  ) : Bool {
    switch (records.find(func(r) { r.id == id })) {
      case null false;
      case (?r) {
        if (r.userId != caller) return false;
        let filtered = records.filter(func(rec) { rec.id != id });
        records.clear();
        records.append(filtered);
        true;
      };
    };
  };

  public func listContent(
    content : List.List<Types.SustainabilityContent>,
    category : ?Types.ContentCategory
  ) : [Types.SustainabilityContent] {
    switch (category) {
      case null content.toArray();
      case (?cat) content.filter(func(c) { c.category == cat }).toArray();
    };
  };

  public func addContent(
    content : List.List<Types.SustainabilityContent>,
    nextId : Nat,
    contentType : Types.ContentType,
    title : Text,
    bodyEn : Text,
    bodySw : Text,
    category : Types.ContentCategory
  ) : Types.SustainabilityContent {
    let entry : Types.SustainabilityContent = {
      id = nextId;
      contentType;
      title;
      bodyEn;
      bodySw;
      category;
      createdAt = Time.now();
    };
    content.add(entry);
    entry;
  };

  // Seed default educational content (call once at init)
  public func seedDefaultContent(
    content : List.List<Types.SustainabilityContent>,
    startId : Nat
  ) {
    let now = Time.now();
    let entries : [(Types.ContentType, Text, Text, Text, Types.ContentCategory)] = [
      (#guide, "Drip Irrigation Basics",
       "Drip irrigation delivers water directly to plant roots, reducing waste by up to 50% compared to flood irrigation.",
       "Umwagiliaji wa tone hutoa maji moja kwa moja kwenye mizizi ya mmea, kupunguza upotevu kwa hadi 50% ikilinganishwa na umwagiliaji wa mafuriko.",
       #water),
      (#article, "Benefits of Organic Fertilizer",
       "Organic fertilizers improve soil structure, increase microbial activity, and release nutrients slowly for sustained crop growth.",
       "Mbolea za kikaboni huboresha muundo wa udongo, kuongeza shughuli za vijidudu, na kutoa virutubisho polepole kwa ukuaji endelevu wa mazao.",
       #soil),
      (#tip, "Crop Rotation for Soil Health",
       "Rotating crops each season prevents nutrient depletion and reduces pest build-up. Alternate legumes with cereals for best results.",
       "Kubadilisha mazao kila msimu huzuia upungufu wa virutubisho na kupunguza wadudu. Badilisha mikunde na nafaka kwa matokeo bora.",
       #soil),
      (#guide, "Safe Pesticide Use",
       "Always wear protective gear, follow label instructions, and avoid spraying near water sources to protect the environment.",
       "Daima vaa vifaa vya kujikinga, fuata maelekezo ya lebo, na epuka kunyunyizia karibu na vyanzo vya maji ili kulinda mazingira.",
       #pesticide),
      (#article, "Sustainable Grazing Practices",
       "Rotational grazing allows pastures to recover, prevents soil erosion, and maintains long-term land productivity for livestock keepers.",
       "Malisho ya kuzunguka huruhusu malisho kupona, huzuia mmomonyoko wa udongo, na kudumisha tija ya ardhi ya muda mrefu kwa wafugaji.",
       #grazing),
    ];
    var i = 0;
    for ((ct, title, bodyEn, bodySw, cat) in entries.vals()) {
      content.add({
        id = startId + i;
        contentType = ct;
        title;
        bodyEn;
        bodySw;
        category = cat;
        createdAt = now;
      });
      i += 1;
    };
  };
}
