import { Exclude, Expose } from "class-transformer";

@Exclude()
export class InspectionResult {
  @Expose({ name: "InspectionLot" })
  lotID: string;

  @Expose({ name: "InspectionValuationResult" })
  resultCategory: string;
}
