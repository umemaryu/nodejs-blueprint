import { InspectionResult } from "~/s4/model/inspectionResult";

export class UsageDecision {
  lotID: string;
  plant: string;
  changedDate: string;
  qualityScore: string;
  catalogID: string;
  catalogName: string;
  usageDecisionCode: string;
  usageDecisionLevel: string;
  usageDecisionSelectedSet: string;

  constructor(data: { lotID: string; plant: string; changedDate: string }) {
    this.lotID = data.lotID;
    this.plant = data.plant;
    this.changedDate = data.changedDate;
    this.catalogID = "3";
    this.usageDecisionLevel = "L";
    this.catalogName = "UD01";
    this.usageDecisionSelectedSet = "UD01";
  }

  public calcQualityScore = (results: InspectionResult[]): string => {
    let score: number = 100;
    for (const result of results) {
      if (result.resultCategory === "R") {
        score -= 5;
        if (score <= 0) {
          return "0";
        }
      }
    }
    return score.toString();
  };

  public addUsageDecision = (): string => {
    if (this.qualityScore === "100") {
      return "A1";
    } else {
      return "R1";
    }
  };
}
