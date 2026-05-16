/**
 * advisorEngine.ts
 * Context-aware, multi-turn AI advisor response generator for Namwala.
 * Considers: role, season, weather, location, crop/animal types, conversation history.
 */

import type {
  AdvisorReminder,
  AdvisorUserContext,
  QAMessage,
} from "@/components/AIAdvisorWidget";
import type { Language } from "@/types";

// ─── Tanzania region classification ──────────────────────────────────────────

const HIGHLAND_REGIONS = [
  "Mbeya",
  "Iringa",
  "Njombe",
  "Kilimanjaro",
  "Arusha",
  "Ruvuma",
];
const COASTAL_REGIONS = ["Dar es Salaam", "Tanga", "Pwani", "Lindi", "Mtwara"];
const LAKE_REGIONS = ["Mwanza", "Kagera", "Mara", "Geita", "Simiyu", "Kigoma"];

function getTerrainType(
  location: string,
): "highland" | "coastal" | "lake" | "inland" {
  if (HIGHLAND_REGIONS.some((r) => location.includes(r))) return "highland";
  if (COASTAL_REGIONS.some((r) => location.includes(r))) return "coastal";
  if (LAKE_REGIONS.some((r) => location.includes(r))) return "lake";
  return "inland";
}

// ─── Keyword detection ────────────────────────────────────────────────────────

type Topic =
  | "fertilizer"
  | "disease"
  | "pest"
  | "market"
  | "water"
  | "planting"
  | "harvest"
  | "soil"
  | "weather"
  | "vaccine"
  | "feed"
  | "breed"
  | "health"
  | "general";

function detectTopic(q: string): Topic {
  const t = q.toLowerCase();
  if (/(fertiliz|mbolea|urea|can|dap|npk)/.test(t)) return "fertilizer";
  if (/(disease|ugonjwa|infection|fungus|blight|rust|kutu)/.test(t))
    return "disease";
  if (/(pest|wadudu|armyworm|viwavi|aphid|caterpillar)/.test(t)) return "pest";
  if (/(market|bei|price|sell|soko|uza)/.test(t)) return "market";
  if (/(water|maji|irrigat|umwagiliaj|dry|kame)/.test(t)) return "water";
  if (/(plant|panda|sow|seed|mbegu)/.test(t)) return "planting";
  if (/(harvest|mavuno|pick|collect|vuna)/.test(t)) return "harvest";
  if (/(soil|udongo|ph|nitrogen|phosphorus|organic)/.test(t)) return "soil";
  if (
    /(weather|hali ya hewa|rain|mvua|forecast|reminder|kumbusho|show me|nionyeshe)/.test(
      t,
    )
  )
    return "weather";
  if (/(vaccin|chanjo|fmd|ecf|blackquarter|brucell)/.test(t)) return "vaccine";
  if (/(feed|chakula|fodder|hay|silage|malisho)/.test(t)) return "feed";
  if (/(breed|mating|uzazi|reproduction|calf|lamb)/.test(t)) return "breed";
  if (/(health|mgonjwa|sick|afya|treatment|matibabu)/.test(t)) return "health";
  return "general";
}

// ─── Context summary for multi-turn back-references ───────────────────────────

function buildContextRef(
  history: QAMessage[],
  lang: Language,
  crop: string,
): string {
  const lastAdvisorMsg = [...history]
    .reverse()
    .find((m) => m.role === "advisor");
  if (!lastAdvisorMsg) return "";
  const hasRef = lastAdvisorMsg.text.toLowerCase().includes(crop.toLowerCase());
  if (hasRef) {
    return lang === "sw"
      ? `Kama nilivyotaja kuhusu ${crop} wako, `
      : `As I mentioned about your ${crop}, `;
  }
  return lang === "sw"
    ? "Kuongezea ushauri wangu wa awali, "
    : "Building on my earlier advice, ";
}

// ─── FARMER response generator ────────────────────────────────────────────────

export function generateFarmerResponse(
  question: string,
  history: QAMessage[],
  ctx: AdvisorUserContext,
  lang: Language,
): string {
  const topic = detectTopic(question);
  const crop = ctx.cropTypes?.[0] ?? "your crops";
  const allCrops = ctx.cropTypes?.join(", ") ?? crop;
  const terrain = getTerrainType(ctx.location);
  const ref = history.length > 1 ? buildContextRef(history, lang, crop) : "";
  const isMultiTurn = history.filter((m) => m.role === "advisor").length > 0;

  const continuity = isMultiTurn && ref ? ref : "";

  // Season + weather combined context
  const isRainy = ctx.weatherCondition === "rainy" || ctx.season === "planting";
  const isDry = ctx.weatherCondition === "dry" || ctx.season === "dry";
  const isHarvest = ctx.season === "harvesting";
  const isPlanting = ctx.season === "planting";

  if (topic === "fertilizer") {
    if (lang === "sw") {
      return `${continuity}Kwa ${crop} huko ${ctx.location}, ${
        isPlanting
          ? "wakati huu wa kupanda, weka DAP (50kg/ekari) shambani kabla ya kupanda. Hii itasaidia mizizi kukua vizuri."
          : isRainy
            ? "kwa sababu ya mvua, weka mbolea ya CAN (50kg/ekari) taratibu ili kuzuia kupotea kwa virutubisho."
            : isDry
              ? "wakati wa ukame, subiri mvua kwanza au mwagilie vizuri kabla ya kuweka mbolea."
              : "weka mbolea ya top-dress (CAN 50kg/ekari) mimea ikiwa urefu wa magoti."
      }`;
    }
    return `${continuity}For ${crop} in ${ctx.location}, ${
      isPlanting
        ? "at planting time, apply DAP (50kg/acre) in the planting furrow. This supports strong root development from the start."
        : isRainy
          ? "with rain coming, apply CAN (50kg/acre) in split doses to minimize nutrient leaching."
          : isDry
            ? "wait for rain or irrigate before applying fertilizer \u2014 dry soil leads to nutrient burn."
            : "top-dress with CAN (50kg/acre) when plants reach knee height for best uptake."
    } ${terrain === "highland" ? "Highland soils in your area benefit from added phosphorus." : ""}`;
  }

  if (topic === "disease" || topic === "pest") {
    const riskLevel = isRainy ? "high" : isDry ? "low" : "moderate";
    if (lang === "sw") {
      return `${continuity}Hatari ya magonjwa kwa ${crop} huko ${ctx.location} ni ${riskLevel === "high" ? "ya juu" : riskLevel === "low" ? "ya chini" : "ya wastani"} ${
        isRainy
          ? "kutokana na mvua nyingi"
          : isDry
            ? "wakati wa kiangazi"
            : "msimu huu"
      }. Angalia ${
        crop.toLowerCase().includes("maize") ||
        crop.toLowerCase().includes("mahindi")
          ? "dalili za ugonjwa wa blight na viwavi (fall armyworm)"
          : crop.toLowerCase().includes("bean") ||
              crop.toLowerCase().includes("maharagwe")
            ? "dalili za bean rust na aphids"
            : "dalili za magonjwa mapema"
      }. Pakia picha kwenye zana ya Gundua Ugonjwa kwa uchunguzi wa haraka.`;
    }
    return `${continuity}Disease risk for ${crop} in ${ctx.location} is currently ${riskLevel} ${
      isRainy
        ? "due to wet conditions"
        : isDry
          ? "during the dry period"
          : "this season"
    }. Watch for ${
      crop.toLowerCase().includes("maize")
        ? "fall armyworm, grey leaf spot, and blight"
        : crop.toLowerCase().includes("bean")
          ? "bean rust, angular leaf spot, and aphid infestations"
          : crop.toLowerCase().includes("rice")
            ? "rice blast and stem borers"
            : "early signs of fungal lesions or wilting"
    }. Use the AI Diagnosis tool for an instant photo-based assessment.`;
  }

  if (topic === "market") {
    if (lang === "sw") {
      return `${continuity}Bei za ${allCrops} huko ${ctx.location} ${
        isHarvest
          ? "zinaendelea kushuka wakati wa mavuno \u2014 subiri wiki 4\u20136 baada ya mavuno mengi kuisha ili kupata bei nzuri zaidi."
          : isPlanting
            ? "zinaendelea kupanda kwa sababu ya akiba ndogo \u2014 wakati huu ni mzuri wa kuuza kama una akiba."
            : "zina hali nzuri. Fuatilia soko la Dar es Salaam na Mwanza kwa bei za juu zaidi."
      }`;
    }
    return `${continuity}Market prices for ${allCrops} in ${ctx.location} ${
      isHarvest
        ? "tend to dip at peak harvest \u2014 hold stock for 4\u20136 weeks post-harvest to capture a 15\u201325% price premium."
        : isPlanting
          ? "are elevated due to low stocks \u2014 if you have stored produce, now is a good time to sell."
          : "are currently stable. Monitor Dar es Salaam and Mwanza markets for best buyer prices."
    } ${terrain === "highland" ? "Highland crops command quality premiums in urban markets." : ""}`;
  }

  if (topic === "water") {
    if (lang === "sw") {
      return `${continuity}${
        isDry
          ? `Wakati wa kiangazi huko ${ctx.location}, ${crop} unahitaji umwagiliaji wa kina (mm 25–30) kila wiki 1–2. Inashauriwa kumwagilia mara 3 kwa wiki kwa dakika 40–50 kila wakati, asubuhi mapema (saa 11–2am) kupunguza uvukizi kwa 40%. Matone ya umwagiliaji hupunguza upotevu wa maji kwa hadi 50%.`
          : isRainy
            ? `Kutokana na mvua, hakikisha mashamba yana mifereji mizuri ya maji. Maji mengi yanaweza kusababisha magonjwa ya mizizi kwa ${crop}. Subiri mvua ipungue kabla ya kuanza umwagiliaji tena.`
            : `Unyevu wa udongo uko wastani. Kabla ya kumwagilia, angalia unyevu kwa kuingiza vidole viwili sentimita 5 kwenye udongo. Kwa hali ya sasa, umwagiliaji wa mara 2 kwa wiki kwa ${crop} wako huko ${ctx.location} ni mzuri. Tembea kwenye ukurasa wa Umwagiliaji Mahiri kwa ratiba kamili.`
      }${isDry ? " Tembelea ukurasa wa Umwagiliaji Mahiri kwa ratiba ya kina na muda wa kila umwagiliaji." : ""}`;
    }
    return `${continuity}${
      isDry
        ? `During the dry spell in ${ctx.location}, ${crop} needs irrigation every 10–14 days (25–30mm). Recommended schedule: 3 times per week for 40–50 minutes each session, ideally between 5–7am to reduce evaporation by up to 40%. Drip irrigation cuts water use by 50% vs. flood irrigation.`
        : isRainy
          ? `With ongoing rains, ensure your fields have adequate drainage. Waterlogging is the main risk for ${crop} roots and can cause root rot within days. Hold off on additional irrigation until the rains subside.`
          : `Soil moisture looks adequate for now. Before irrigating, push two fingers 5cm into the soil — if dry at that depth, irrigate. For current conditions, ${crop} in ${ctx.location} benefits from 2x per week watering. Visit the Smart Irrigation page for a full personalised schedule.`
    }${isDry ? " Visit the Smart Irrigation page for a detailed schedule with exact timing and water volume recommendations." : ""}`;
  }

  if (topic === "planting") {
    if (lang === "sw") {
      return `${continuity}Wakati mzuri wa kupanda ${crop} huko ${ctx.location} ${
        isPlanting
          ? `ni sasa hivi — mvua za mwanzo zimewadia. Panda kwa kina cha cm 5–7 na nafasi ya ${
              crop.toLowerCase().includes("maize")
                ? "75cm × 30cm"
                : "45cm × 15cm"
            }.`
          : isDry
            ? "utakapokuja mwanzo wa mvua. Andaa mbegu sasa \u2014 sanitize na dawa ya mbegu kabla ya kupanda."
            : "unategemea sasa. Angalia utabiri wa hali ya hewa \u2014 mvua za kwanza za mwaka ni ishara ya kuanza kupanda."
      }`;
    }
    return `${continuity}Optimal planting time for ${crop} in ${ctx.location} ${
      isPlanting
        ? `is now — first rains have arrived. Plant at 5–7cm depth, spacing ${
            crop.toLowerCase().includes("maize") ? "75cm × 30cm" : "45cm × 15cm"
          } for maximum yield.`
        : isDry
          ? "will be at the start of the next rain season. Prepare your seeds now \u2014 treat with fungicide seed dressing before storage."
          : "is approaching. Monitor the first reliable rains \u2014 that is your planting signal for best germination rates."
    } ${terrain === "highland" ? "Highland areas get more reliable rains but can experience frost — plant after the last frost risk." : ""}`;
  }

  if (topic === "harvest") {
    if (lang === "sw") {
      return `${continuity}Mavuno ya ${crop} huko ${ctx.location} ${
        isHarvest
          ? "yako karibu au yanaendelea. Vuna asubuhi mapema kupunguza kupotea kwa unyevu. Kausha vizuri kabla ya kuhifadhi \u2014 unyevu chini ya 13% unazuia kutu."
          : "hayajakaribia bado. Endelea kutunza mazao na ufanye ukaguzi wa masamba kila wiki."
      }`;
    }
    return `${continuity}Harvest timing for ${crop} in ${ctx.location} ${
      isHarvest
        ? "is now or imminent. Harvest in the morning to reduce moisture loss. Dry to below 13% moisture before storage to prevent mould and losses."
        : "is still ahead. Continue good crop management and scout fields weekly for any issues that could reduce final yield."
    }`;
  }

  if (topic === "soil") {
    if (lang === "sw") {
      return `${continuity}Udongo huko ${ctx.location} ${
        terrain === "highland"
          ? `(ardhi ya juu) mara nyingi una asidi nyingi. Weka chokaa (2 tani/hekta) kila miaka 2–3 ili kusawazisha pH. Faida kubwa kwa ${crop}.`
          : terrain === "coastal"
            ? "(pwani) una chumvi ya juu. Weka viumbe vya udongo (mbolea ya samadi) kuimarisha muundo wa udongo."
            : "una afya nzuri kwa ujumla. Fanya uchunguzi wa udongo kila mwaka 2 kupata mapendekezo sahihi ya mbolea."
      }`;
    }
    return `${continuity}Soils in ${ctx.location} ${
      terrain === "highland"
        ? `(highland) are typically acidic. Apply lime (2 tonnes/ha) every 2–3 years to correct pH — this alone can improve ${crop} yields by up to 20%.`
        : terrain === "coastal"
          ? "(coastal) can have higher salinity. Work in compost or organic matter to improve soil structure and reduce salt stress."
          : "are generally productive. Conduct a soil test every 2 years for precise fertilizer recommendations tailored to your specific field."
    }`;
  }

  if (topic === "weather") {
    if (lang === "sw") {
      return `${continuity}Hali ya hewa huko ${ctx.location} ni ${
        ctx.weatherCondition === "rainy"
          ? "mvua — angalia mafuriko na magonjwa"
          : ctx.weatherCondition === "dry"
            ? "kame — weka mpango wa umwagiliaji"
            : `jua — hali nzuri kwa ukuaji wa ${crop}`
      }. Msimu wa sasa: ${SEASON_LABELS_SW[ctx.season]}. Angalia utabiri wako wa hali ya hewa kila siku.`;
    }
    return `${continuity}Current weather in ${ctx.location} is ${
      ctx.weatherCondition === "rainy"
        ? "rainy — monitor for flooding and fungal disease risk"
        : ctx.weatherCondition === "dry"
          ? "dry — prioritise irrigation and water conservation"
          : `sunny — ideal conditions for ${crop} photosynthesis and growth`
    }. We are in the ${ctx.season} season. Check the daily forecast in your Weather widget.`;
  }

  // General / default — context-rich fallback
  if (lang === "sw") {
    return `${continuity}Kulingana na shamba lako la ${allCrops} huko ${ctx.location} wakati wa ${
      SEASON_LABELS_SW[ctx.season]
    }, ninakushauri ${
      isRainy
        ? "kukagua magonjwa ya majani kila siku na kuhakikisha mifereji ya maji inafanya kazi vizuri"
        : isDry
          ? "kuangalia unyevu wa udongo na kupanga umwagiliaji mapema"
          : "kuendelea na ukaguzi wa kawaida wa shamba na kufuatilia bei za soko"
    }. Je, una swali mahususi kuhusu ${crop} wako?`;
  }
  return `${continuity}Based on your ${allCrops} farm in ${ctx.location} during ${
    ctx.season
  } season with current ${ctx.weatherCondition} conditions, I recommend ${
    isRainy
      ? "daily scouting for leaf diseases and ensuring drainage channels are clear"
      : isDry
        ? "monitoring soil moisture closely and scheduling irrigation before stress signs appear"
        : "continuing regular field scouting and tracking market prices for optimal selling timing"
  }. Do you have a specific question about your ${crop}?`;
}

// ─── LIVESTOCK response generator ────────────────────────────────────────────

export function generateLivestockResponse(
  question: string,
  history: QAMessage[],
  ctx: AdvisorUserContext,
  lang: Language,
): string {
  const topic = detectTopic(question);
  const animal = ctx.animalTypes?.[0] ?? "your animals";
  const allAnimals = ctx.animalTypes?.join(", ") ?? animal;
  const isDry = ctx.weatherCondition === "dry" || ctx.season === "dry";
  const isRainy = ctx.weatherCondition === "rainy" || ctx.season === "planting";
  const ref = history.length > 1 ? buildContextRef(history, lang, animal) : "";
  const continuity =
    history.filter((m) => m.role === "advisor").length > 0 && ref ? ref : "";

  if (topic === "vaccine") {
    if (lang === "sw") {
      return `${continuity}Ratiba ya chanjo kwa ${allAnimals} huko ${ctx.location}: FMD (kila miezi 6), Brucellosis (kila mwaka kwa majike), Black Quarter (kila mwaka). ${
        ctx.season === "dry"
          ? "Wakati wa kiangazi, mifugo inakusanyika karibu na maji \u2014 hatari ya kuambukizana inaongezeka. Hakikisha chanjo zote zimefanywa kabla ya kiangazi."
          : "Chanjo za msimu huu zinahusisha CBPP na LSD. Wasiliana na daktari wa mifugo kupitia app."
      }`;
    }
    return `${continuity}Vaccination schedule for ${allAnimals} in ${ctx.location}: FMD (every 6 months), Brucellosis (annually for females), Black Quarter (annually). ${
      isDry
        ? "During dry season, animals congregate at water points \u2014 disease transmission risk rises significantly. Ensure all vaccines are current before the dry season peaks."
        : "This season also includes CBPP and LSD boosters. Book a vet visit through the app to stay on schedule."
    }`;
  }

  if (topic === "feed") {
    if (lang === "sw") {
      return `${continuity}Chakula bora kwa ${animal} huko ${ctx.location}: ${
        isDry
          ? "Wakati wa kiangazi, nyasi inaisha \u2014 hifadhi silage au hay mapema. Mtiririko wa maji lazima udumishwe (lita 30\u201350/siku kwa ng'ombe)."
          : "Nyasi ya kijani iko vizuri msimu huu. Ongeza kiwango cha madini (mineral block) kwa uzalishaji bora wa maziwa."
      } Kiwango cha lishe: roughage 60–70%, concentrates 20–30%, madini 5%.`;
    }
    return `${continuity}Feeding requirements for ${animal} in ${ctx.location}: ${
      isDry
        ? "Dry season challenges are critical \u2014 secure silage or hay stockpiles now. Water access is vital: cattle need 30\u201350L/day; ensure troughs and boreholes are operational."
        : "Good green pasture is available this season. Supplement with a mineral block to improve milk yield and weight gain."
    } Balanced ratio: 60–70% roughage, 20–30% concentrates, 5–10% minerals.`;
  }

  if (topic === "health" || topic === "disease") {
    if (lang === "sw") {
      return `${continuity}Dalili za kawaida za ugonjwa kwa ${animal} huko ${ctx.location} msimu huu: ${
        isRainy
          ? "mvua zinaongeza hatari ya Lumpy Skin Disease na ECF. Angalia mapunye, homa, na macho ya mtiririko."
          : isDry
            ? "kiangazi kinaongeza hatari ya trypanosomiasis (nagana) na FMD. Angalia wanyama wanaopungua uzito haraka au kukimbia maji."
            : "angalia dalili kama vile kupungua kwa chakula, macho ya mtiririko, au homa juu ya 39.5\u00b0C."
      } Pakia picha kwenye zana ya Gundua Ugonjwa kwa uchunguzi wa haraka wa AI.`;
    }
    return `${continuity}Common health risks for ${animal} in ${ctx.location} this season: ${
      isRainy
        ? "wet season increases risk of Lumpy Skin Disease and ECF. Watch for skin nodules, fever, and nasal discharge."
        : isDry
          ? "dry conditions raise risk of trypanosomiasis and FMD as animals crowd at water points. Monitor for rapid weight loss or reluctance to drink."
          : "watch for signs of reduced appetite, nasal discharge, or fever above 39.5\u00b0C."
    } Use the AI Diagnosis tool for a photo-based health assessment.`;
  }

  if (topic === "market") {
    if (lang === "sw") {
      return `${continuity}Bei za ${allAnimals} huko ${ctx.location} ${
        ctx.season === "dry"
          ? "zinapanda kabla ya sikukuu \u2014 wakati mzuri wa kuuza ng'ombe wazima (TSh 850,000\u20131,200,000 kulingana na uzito)."
          : "ziko wastani sasa. Panga kuuza wakati ambapo maudhui ya lishe ya wanyama wako yako mazuri \u2014 hii huongeza thamani."
      } Panga mifugo yako vizuri (grading) kabla ya kuipeleka sokoni.`;
    }
    return `${continuity}${animal} market prices in ${ctx.location} ${
      isDry
        ? "are rising ahead of festive season \u2014 prime selling window for mature bulls (TSh 850,000\u20131,200,000 depending on weight and condition)."
        : "are at a moderate level. Plan sales when animals are in peak body condition \u2014 well-fed animals command significantly higher prices."
    } Grade your animals before bringing them to market for better negotiating power.`;
  }

  if (topic === "breed") {
    if (lang === "sw") {
      return `${continuity}Uzazi bora kwa ${animal} huko ${ctx.location}: ${
        animal.toLowerCase().includes("cattle") ||
        animal.toLowerCase().includes("ng'ombe")
          ? "Muda mzuri wa kupandisha ni baada ya mwezi mmoja wa mavuno wakati lishe iko bora. Nguruwe / ng'ombe wa kuzaa lazima wawe na BCS ya 3.0\u20133.5."
          : animal.toLowerCase().includes("goat") ||
              animal.toLowerCase().includes("mbuzi")
            ? "Mbuzi huzaa mara 2 kwa mwaka. Tandabui zizaliwe wakati wa mvua \u2014 lishe iko bora."
            : "Fuatilia mzunguko wa uzazi na uhakikishe lishe bora kabla ya kipindi cha mating."
      }`;
    }
    return `${continuity}Breeding management for ${animal} in ${ctx.location}: ${
      animal.toLowerCase().includes("cattle")
        ? "Best conception rates occur when cows have a BCS of 3.0\u20133.5. Target breeding after the main harvest when nutrition is good."
        : animal.toLowerCase().includes("goat")
          ? "Goats can kid twice a year. Time kidding to coincide with the rainy season when nutrition is best for does and kids."
          : "Track your breeding calendar and ensure good nutrition in the pre-mating period for maximum conception rates."
    }`;
  }

  if (topic === "water") {
    if (lang === "sw") {
      return `${continuity}${
        isDry
          ? `Wakati wa kiangazi huko ${ctx.location}, maji ni muhimu sana. Ng'ombe 1 anahitaji lita 30–50 kwa siku. Hakikisha visima na mabwawa vina maji ya kutosha. Fanya mpango mbadala wa maji (water point).
          Mbuzi na kondoo wanahitaji lita 3–5 kwa siku.`
          : "Wakati wa mvua, maji yanapatikana vizuri. Hata hivyo, angalia mabwawa yasije yakichafuka \u2014 maji machafu yanasababisha magonjwa ya matumbo."
      }`;
    }
    return `${continuity}${
      isDry
        ? `Water management is critical in ${ctx.location} during the dry season. Cattle need 30–50L/day; goats and sheep need 3–5L/day. Inspect and clean water troughs weekly and identify backup water sources.`
        : "During rains, water is plentiful \u2014 but watch for contamination. Dirty standing water causes gastrointestinal diseases. Keep troughs elevated and clean."
    }`;
  }

  // General fallback
  if (lang === "sw") {
    return `${continuity}Kwa mifugo yako ya ${allAnimals} huko ${ctx.location} wakati wa ${
      ctx.season === "dry"
        ? "kiangazi"
        : ctx.season === "planting"
          ? "kupanda"
          : ctx.season === "growing"
            ? "ukuaji"
            : "mavuno"
    }, ninakushauri ${
      isDry
        ? "kuhakikisha maji na chakula vinatosha, na chanjo zote zimefanywa"
        : isRainy
          ? "kutazama dalili za magonjwa ya mvua na kuweka malisho kavu"
          : "kuendelea na ufuatiliaji wa kawaida wa afya na kumbukumbu za mifugo"
    }. Je, una swali mahususi?`;
  }
  return `${continuity}For your ${allAnimals} in ${ctx.location} during ${
    ctx.season
  } season, I recommend ${
    isDry
      ? "ensuring adequate water and feed supplies, and ensuring vaccination records are up to date"
      : isRainy
        ? "monitoring for wet-season diseases and keeping feed dry and protected"
        : "continuing regular health monitoring and maintaining accurate animal records"
  }. What specific aspect of your herd would you like advice on?`;
}

// ─── Reminders generators ───────────────────────────────────────────────

export function generateFarmerReminders(
  ctx: AdvisorUserContext,
  lang: Language,
): AdvisorReminder[] {
  const crop = ctx.cropTypes?.[0] ?? "crops";
  const reminders: AdvisorReminder[] = [];

  if (ctx.season === "planting") {
    reminders.push({
      dueLabel: lang === "sw" ? "Wiki hii" : "This week",
      text:
        lang === "sw"
          ? `Andaa mbegu za ${crop} — fanya matibabu ya mbegu kabla ya kupanda.`
          : `Prepare ${crop} seeds — treat with fungicide seed dressing before planting.`,
    });
    reminders.push({
      dueLabel: lang === "sw" ? "Baada ya wiki 2" : "In 2 weeks",
      text:
        lang === "sw"
          ? "Weka mbolea ya DAP wakati wa kupanda \u2014 50kg/ekari kwenye mstari wa kupanda."
          : "Apply DAP fertilizer at planting \u2014 50kg/acre in the planting furrow.",
    });
  } else if (ctx.season === "growing") {
    reminders.push({
      dueLabel: lang === "sw" ? "Juma lijalo" : "Next week",
      text:
        lang === "sw"
          ? `Weka mbolea ya CAN (top-dressing) kwa ${crop} — mimea ikiwa urefu wa goti.`
          : `Apply CAN top-dressing for ${crop} — plants at knee height is ideal timing.`,
    });
    reminders.push({
      dueLabel: lang === "sw" ? "Mwezi ujao" : "Next month",
      text:
        lang === "sw"
          ? "Kagua masamba kwa viwavi na wadudu wengine \u2014 ongeza dawa ikiwa inahitajika."
          : "Scout fields for fall armyworm and aphids \u2014 spray only if thresholds are exceeded.",
    });
  } else if (ctx.season === "harvesting") {
    reminders.push({
      dueLabel: lang === "sw" ? "Sasa hivi" : "Now",
      text:
        lang === "sw"
          ? `Vuna ${crop} asubuhi — kausha hadi unyevu wa chini ya 13% kabla ya kuhifadhi.`
          : `Harvest ${crop} in the early morning — dry to below 13% moisture before storage.`,
    });
    reminders.push({
      dueLabel: lang === "sw" ? "Wiki ijayo" : "Next week",
      text:
        lang === "sw"
          ? `Angalia bei za soko — usipeleke ghala kabla ya kujua bei za soko za ${crop}.`
          : `Check market prices before selling — compare Dar es Salaam and local market rates for ${crop}.`,
    });
  } else {
    reminders.push({
      dueLabel: lang === "sw" ? "Mwezi huu" : "This month",
      text:
        lang === "sw"
          ? "Fanya uchunguzi wa udongo wa shamba lako kabla ya msimu wa kupanda."
          : "Conduct a soil test before the upcoming planting season to plan fertilizer correctly.",
    });
    reminders.push({
      dueLabel: lang === "sw" ? "Mwezi ujao" : "Next month",
      text:
        lang === "sw"
          ? `Hifadhi mbegu bora za ${crop} — tenga mbegu za ubora kutoka mavuno ya mwisho.`
          : `Store quality ${crop} seeds — select the best grain from last harvest for replanting.`,
    });
  }

  if (ctx.weatherCondition === "rainy") {
    reminders.push({
      dueLabel: lang === "sw" ? "Haraka" : "Urgent",
      text:
        lang === "sw"
          ? "Mvua nyingi \u2014 kagua mifereji ya maji kwenye mashamba leo ili kuzuia mafuriko."
          : "Heavy rain alert \u2014 check field drainage channels today to prevent waterlogging.",
    });
  }

  return reminders.slice(0, 3);
}

export function generateLivestockReminders(
  ctx: AdvisorUserContext,
  lang: Language,
): AdvisorReminder[] {
  const animal = ctx.animalTypes?.[0] ?? "animals";
  const reminders: AdvisorReminder[] = [];

  reminders.push({
    dueLabel: lang === "sw" ? "Mwezi ujao" : "Next month",
    text:
      lang === "sw"
        ? `Chanjo ya FMD kwa ${animal} — wasiliana na daktari wa mifugo kupanga ziara.`
        : `FMD vaccination due for ${animal} — contact a vet through the app to schedule a visit.`,
  });

  if (ctx.season === "dry") {
    reminders.push({
      dueLabel: lang === "sw" ? "Wiki hii" : "This week",
      text:
        lang === "sw"
          ? "Kiangazi \u2014 hifadhi silage / hay ya ziada ili kuhakikisha lishe ya kutosha."
          : "Dry season \u2014 stockpile extra silage or hay now to ensure adequate feed through the dry period.",
    });
    reminders.push({
      dueLabel: lang === "sw" ? "Sasa hivi" : "Now",
      text:
        lang === "sw"
          ? "Angalia vyanzo vya maji \u2014 visima na mabwawa yanatoa maji ya kutosha?"
          : `Check all water sources — are boreholes and dams providing enough water for your ${animal} herd?`,
    });
  } else if (ctx.season === "planting") {
    reminders.push({
      dueLabel: lang === "sw" ? "Wiki ijayo" : "Next week",
      text:
        lang === "sw"
          ? "Angalia dalili za Lumpy Skin Disease \u2014 mvua nyingi zinaongeza hatari."
          : "Monitor for Lumpy Skin Disease \u2014 wet season significantly increases transmission risk.",
    });
  } else {
    reminders.push({
      dueLabel: lang === "sw" ? "Wiki ijayo" : "Next week",
      text:
        lang === "sw"
          ? `Rekodi za uzito wa ${animal} — pima uzito kila miezi 2 kufuatilia maendeleo.`
          : `Record body weight for ${animal} — weigh every 2 months to track growth and condition.`,
    });
  }

  reminders.push({
    dueLabel: lang === "sw" ? "Kila wiki" : "Weekly",
    text:
      lang === "sw"
        ? "Angalia hali ya afya ya mifugo kila asubuhi \u2014 homa, kutokula, au macho ya mtiririko."
        : `Daily health check for ${animal} — look for fever, not eating, nasal discharge, or lethargy.`,
  });

  return reminders.slice(0, 3);
}

// ─── Suggested questions generators ─────────────────────────────────────────

export function getFarmerSuggestedQuestions(
  ctx: AdvisorUserContext,
  lang: Language,
): string[] {
  const crop = ctx.cropTypes?.[0] ?? "crops";
  if (lang === "sw") {
    return [
      `Ni lini wakati mzuri wa kupanda ${crop}?`,
      "Ni wadudu gani wa kuangalia msimu huu?",
      `Ninahitaji mbolea ngapi kwa ${crop}?`,
      `Bei ya ${crop} inaonekana vipi soko sasa?`,
      ctx.weatherCondition === "rainy"
        ? `Mvua nyingi zinathiri nini kwenye ${crop}?`
        : "Nitatumia maji kiasi gani kwa umwagiliaji?",
      `Ni magonjwa gani hatari kwa ${crop} msimu huu?`,
      "Hali ya udongo wangu ina athari gani kwa mavuno?",
      `Ni ratiba gani ya umwagiliaji inayofaa kwa ${crop} wakati huu?`,
      "Naweza kuokoa maji kiasi gani kwa kutumia umwagiliaji wa matone?",
    ].slice(0, 6);
  }
  return [
    `When should I plant ${crop}?`,
    "What pests should I watch for this season?",
    `How much fertilizer does ${crop} need?`,
    `What are ${crop} prices like right now?`,
    ctx.weatherCondition === "rainy"
      ? `How does the rain affect my ${crop}?`
      : "How often should I irrigate?",
    "What diseases should I look out for this season?",
    `How does my soil type affect ${crop} yields?`,
    `What is the best irrigation schedule for ${crop} right now?`,
    "How much water can I save with drip irrigation?",
  ].slice(0, 6);
}

export function getLivestockSuggestedQuestions(
  ctx: AdvisorUserContext,
  lang: Language,
): string[] {
  const animal = ctx.animalTypes?.[0] ?? "animals";
  if (lang === "sw") {
    return [
      `Ni lini wakati mzuri wa kupandisha ${animal}?`,
      `Ninachohitaji kufanya kwa chanjo ya ${animal}?`,
      `Chakula kipi ni bora kwa ${animal} msimu huu?`,
      `Bei ya ${animal} iko vipi sokoni sasa?`,
      ctx.season === "dry"
        ? `Nitatoa maji kiasi gani kwa ${animal} wakati wa kiangazi?`
        : `Magonjwa gani ya mvua yanaweza kuathiri ${animal}?`,
      `Dalili za kwanza za ugonjwa kwa ${animal} ni zipi?`,
    ].slice(0, 6);
  }
  return [
    `When is the best time to breed ${animal}?`,
    `What vaccinations does my ${animal} need?`,
    `What feed is best for ${animal} this season?`,
    `What are current ${animal} market prices?`,
    ctx.season === "dry"
      ? `How much water do ${animal} need in dry season?`
      : "What wet-season diseases should I watch for?",
    `What are early signs of illness in ${animal}?`,
  ].slice(0, 6);
}

// Internal helper — Swahili season label
const SEASON_LABELS_SW: Record<string, string> = {
  planting: "msimu wa kupanda",
  growing: "msimu wa ukuaji",
  harvesting: "msimu wa mavuno",
  dry: "kiangazi",
};

// ─── Predictive Reminders ────────────────────────────────────────────────────

export type ReminderType = "weather" | "seasonal" | "pest" | "market";
export type ReminderUrgency = "high" | "medium" | "low";

export interface PredictiveReminder {
  id: string;
  type: ReminderType;
  title: string;
  message: string;
  urgency: ReminderUrgency;
  icon: string;
  canSnooze: true;
}

/**
 * Rotating weekly weather pattern: week 1 = rain, week 2 = dry,
 * week 3 = moderate, week 4 = rain.
 */
function getForecastWeather(): "rain" | "dry" | "moderate" {
  const weekNum = Math.ceil(new Date().getDate() / 7);
  if (weekNum === 1 || weekNum >= 4) return "rain";
  if (weekNum === 2) return "dry";
  return "moderate";
}

export function generatePredictiveReminders(
  ctx: AdvisorUserContext,
  lang: Language,
): PredictiveReminder[] {
  const forecast = getForecastWeather();
  const crop = ctx.cropTypes?.[0] ?? (lang === "sw" ? "mazao" : "crops");
  const allCrops = ctx.cropTypes?.join(", ") ?? crop;
  const animal = ctx.animalTypes?.[0] ?? (lang === "sw" ? "mifugo" : "animals");
  const isLivestock = ctx.role === "livestock_keeper";
  const reminders: PredictiveReminder[] = [];

  if (isLivestock) {
    // ── Livestock reminders ────────────────────────────────────────────────

    if (forecast === "rain") {
      reminders.push({
        id: "lv-weather-rain",
        type: "weather",
        title:
          lang === "sw"
            ? "Mvua Inatarajiwa Wiki Hii"
            : "Rain Forecast This Week",
        message:
          lang === "sw"
            ? `Mvua inatarajiwa wiki hii — hakikisha malago ya ${animal} ni kavu na yenye hewa ya kutosha ili kuzuia magonjwa ya ngozi.`
            : `Rain is forecast this week — ensure ${animal} shelters are dry and well-ventilated to prevent skin diseases.`,
        urgency: "high",
        icon: "🌧️",
        canSnooze: true,
      });
      reminders.push({
        id: "lv-weather-lsd",
        type: "weather",
        title:
          lang === "sw"
            ? "Hatari ya Lumpy Skin Disease"
            : "Lumpy Skin Disease Risk",
        message:
          lang === "sw"
            ? `Mvua nyingi zinaongeza hatari ya Lumpy Skin Disease kwa ${animal}. Angalia mapunye kwenye ngozi na wasiliana na daktari ikiwa utagundua dalili.`
            : `Heavy rains increase Lumpy Skin Disease risk for ${animal}. Monitor for skin nodules and contact a vet immediately if symptoms appear.`,
        urgency: "high",
        icon: "⚠️",
        canSnooze: true,
      });
    }

    if (forecast === "dry") {
      reminders.push({
        id: "lv-heat-stress",
        type: "weather",
        title: lang === "sw" ? "Tahadhari ya Joto" : "Heat Stress Alert",
        message:
          lang === "sw"
            ? `Ukame unatarajiwa — ongeza maji na kivuli kwa ${animal} wiki hii. Ng'ombe anahitaji lita 50 kwa siku katika hali ya joto.`
            : `Dry spell expected — provide additional water and shade for your ${animal} this week. Cattle need up to 50L/day in heat.`,
        urgency: "high",
        icon: "🌡️",
        canSnooze: true,
      });
      reminders.push({
        id: "lv-feed-reserve",
        type: "seasonal",
        title:
          lang === "sw"
            ? "Hifadhi Malisho ya Ukame"
            : "Dry Season Feed Reserve",
        message:
          lang === "sw"
            ? `Kiangazi kinatarajiwa — nunua au hifadhi silage na hay sasa kwa ajili ya ${animal}. Bei zinaongezeka kadri ukame unavyozidi.`
            : `Dry conditions expected — stock up on silage or hay now for your ${animal}. Prices rise as the dry season deepens.`,
        urgency: "medium",
        icon: "🌾",
        canSnooze: true,
      });
    }

    reminders.push({
      id: "lv-vaccine-ecf",
      type: "seasonal",
      title:
        lang === "sw"
          ? "Chanjo: East Coast Fever"
          : "Vaccination: East Coast Fever",
      message:
        lang === "sw"
          ? `Chanjo ya East Coast Fever kwa ${animal} inapaswa kufanywa mwezi ujao. Wasiliana na daktari wa wanyama kupanga ziara.`
          : `East Coast Fever vaccine is due next week for your ${animal}. Contact a vet through the app to schedule a visit.`,
      urgency: "high",
      icon: "💉",
      canSnooze: true,
    });

    reminders.push({
      id: "lv-vaccine-fmd",
      type: "seasonal",
      title: lang === "sw" ? "Chanjo ya FMD Inakaribia" : "FMD Vaccination Due",
      message:
        lang === "sw"
          ? `Chanjo ya FMD (Foot and Mouth Disease) kwa ${animal} inahitajika kila miezi 6. Hakikisha rekodi za chanjo ziko sahihi.`
          : `FMD vaccination for ${animal} is due — schedule every 6 months. Ensure your vaccination records are up to date.`,
      urgency: "medium",
      icon: "🏥",
      canSnooze: true,
    });

    reminders.push({
      id: "lv-water-check",
      type: "seasonal",
      title: lang === "sw" ? "Kagua Vyanzo vya Maji" : "Check Water Sources",
      message:
        lang === "sw"
          ? `Visima na mabwawa ya ${ctx.location} lazima vikaguliwe wiki hii. Uhakikishaji wa maji kwa wakati unaweza kuzuia vifo vya mifugo.`
          : `Check all boreholes and dams near ${ctx.location} this week. Proactive water security prevents livestock losses during dry spells.`,
      urgency: "medium",
      icon: "💧",
      canSnooze: true,
    });

    if (ctx.season === "planting" || forecast === "rain") {
      reminders.push({
        id: "lv-market-festive",
        type: "market",
        title: lang === "sw" ? "Fursa ya Soko" : "Market Opportunity",
        message:
          lang === "sw"
            ? `Bei ya ${animal} inaendelea kupanda kabla ya sikukuu. Uuzaji wa sasa unaweza kuleta faida ya hadi 20% zaidi.`
            : `${animal} prices are rising ahead of the festive season. Selling now could yield up to 20% above baseline prices.`,
        urgency: "low",
        icon: "📈",
        canSnooze: true,
      });
    }
  } else {
    // ── Farmer reminders ──────────────────────────────────────────────────

    if (forecast === "rain") {
      reminders.push({
        id: "fw-hold-spray",
        type: "weather",
        title:
          lang === "sw"
            ? "Usinyunyize Dawa — Mvua Inakuja"
            : "Hold Off on Spraying — Rain Coming",
        message:
          lang === "sw"
            ? `Kulingana na utabiri wa mvua wiki hii, subiri kupulizia dawa kwenye ${crop}. Mvua itaosha dawa kabla haijafanya kazi.`
            : `Based on forecasted rain this week, hold off on spraying your ${crop}. Rain will wash off pesticides before they take effect.`,
        urgency: "high",
        icon: "🌧️",
        canSnooze: true,
      });
      reminders.push({
        id: "fw-drainage",
        type: "weather",
        title:
          lang === "sw" ? "Angalia Mifereji ya Maji" : "Check Field Drainage",
        message:
          lang === "sw"
            ? `Mvua nyingi inatarajiwa — kagua mifereji ya maji kwenye mashamba ya ${allCrops} sasa ili kuzuia mafuriko na kuoza kwa mizizi.`
            : `Heavy rain expected — inspect drainage channels in your ${allCrops} fields now to prevent waterlogging and root rot.`,
        urgency: "high",
        icon: "🌊",
        canSnooze: true,
      });
    }

    if (forecast === "dry") {
      reminders.push({
        id: "fw-irrigation",
        type: "weather",
        title:
          lang === "sw"
            ? "Kipindi cha Ukame — Mwagilia"
            : "Dry Spell — Irrigate Now",
        message:
          lang === "sw"
            ? `Ukame unatarajiwa — fikiria umwagiliaji kwa ${crop} kwa siku 10 zijazo. Matone ya umwagiliaji hupunguza upotevu wa maji kwa 50%.`
            : `Dry spell expected — consider irrigation for your ${crop} over the next 10 days. Drip irrigation cuts water use by 50%.`,
        urgency: "high",
        icon: "💧",
        canSnooze: true,
      });
    }

    if (ctx.season === "planting" || forecast === "rain") {
      reminders.push({
        id: "fw-planting-prep",
        type: "seasonal",
        title:
          lang === "sw"
            ? "Msimu wa Kupanda Unakaribia"
            : "Planting Season Approaching",
        message:
          lang === "sw"
            ? `Msimu wa kupanda ${crop} unaanza wiki 2 zijazo — andaa udongo wako sasa. Weka chokaa ikiwa pH ni chini ya 5.5.`
            : `Planting season for ${crop} starts in 2 weeks — prepare your soil now. Apply lime if soil pH is below 5.5.`,
        urgency: "medium",
        icon: "🌱",
        canSnooze: true,
      });
    }

    reminders.push({
      id: "fw-fertilizer",
      type: "seasonal",
      title:
        lang === "sw"
          ? "Wakati wa Mbolea ya Juu"
          : "Top-Dressing Fertilizer Time",
      message:
        lang === "sw"
          ? `Weka mbolea ya CAN (50kg/ekari) kwa ${crop} — mimea ikiwa urefu wa goti ni wakati bora wa kulisha.`
          : `Apply CAN top-dressing (50kg/acre) to your ${crop} — knee-height stage is the optimal window for nutrient uptake.`,
      urgency: "medium",
      icon: "🌿",
      canSnooze: true,
    });

    reminders.push({
      id: "fw-pest-scout",
      type: "pest",
      title:
        lang === "sw" ? "Angalia Viwavi wa Anguko" : "Scout for Fall Armyworm",
      message:
        lang === "sw"
          ? `Hatari ya viwavi (fall armyworm) ipo juu msimu huu kwa ${crop}. Kagua mashamba kila siku — angalia matundu kwenye majani na kinyesi cha viwavi.`
          : `Fall armyworm risk is elevated this season for ${crop}. Scout fields daily — look for leaf holes and frass trails. Act early before populations explode.`,
      urgency: forecast === "rain" ? "high" : "medium",
      icon: "🐛",
      canSnooze: true,
    });

    reminders.push({
      id: "fw-soil-test",
      type: "seasonal",
      title: lang === "sw" ? "Fanya Uchunguzi wa Udongo" : "Conduct Soil Test",
      message:
        lang === "sw"
          ? "Uchunguzi wa udongo wa kila miaka 2 unakusaidia kupanga mbolea kwa usahihi. Wasiliana na mtaalamu wa udongo kupitia programu."
          : `A soil test every 2 years ensures precise fertilizer planning for ${crop}. Contact a soil specialist through the app.`,
      urgency: "low",
      icon: "🔬",
      canSnooze: true,
    });

    reminders.push({
      id: "fw-market-timing",
      type: "market",
      title: lang === "sw" ? "Angalia Bei za Soko" : "Monitor Market Prices",
      message:
        lang === "sw"
          ? `Bei za ${allCrops} zinaendelea kupanda huko Dar es Salaam na Mwanza. Fuatilia soko kila wiki ili kujua wakati mzuri wa kuuza.`
          : `Prices for ${allCrops} are trending upward in Dar es Salaam and Mwanza markets. Track weekly to identify the optimal selling window.`,
      urgency: "low",
      icon: "📊",
      canSnooze: true,
    });
  }

  return reminders.slice(0, isLivestock ? 6 : 8);
}
