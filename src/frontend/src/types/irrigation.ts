export interface IrrigationScheduleEntry {
  frequencyPerWeek: number;
  durationMinutes: number;
  bestTimeOfDay: "early_morning" | "morning" | "evening" | "night";
}

export interface IrrigationRecommendation {
  id: string;
  userId: string;
  cropType: string;
  region: string;
  schedule: IrrigationScheduleEntry;
  reasoning: string;
  estimatedWaterSavingPercent: number;
  yieldImpactPercent: number;
  basedOn: {
    soilMoisture: "low" | "moderate" | "high";
    weatherForecast: "dry" | "moderate" | "rain";
    seasonalCondition: "dry" | "planting" | "growing" | "harvesting";
  };
  createdAt: string;
  validUntil: string;
  hasSetReminder: boolean;
}

export interface IrrigationLog {
  id: string;
  userId: string;
  recommendationId: string;
  followedOn: string;
  actualWaterUseLiters: number;
  notes: string;
  cropType: string;
}
