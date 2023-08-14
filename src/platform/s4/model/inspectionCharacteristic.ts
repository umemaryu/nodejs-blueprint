import { Exclude, Expose } from "class-transformer";

@Exclude()
export class InspectionCharacteristic {
  @Expose({ name: "InspectionLot" })
  lotID: string;

  @Expose({ name: "InspPlanOperationInternalID" })
  operationID: string;

  @Expose({ name: "InspSpecIsQuantitative" })
  isQuantitative: boolean;

  @Expose({ name: "InspectionCharacteristic" })
  characteristicID: string;

  @Expose({ name: "SelectedCodeSet" })
  catalogName: string;

  @Expose({ name: "CharacteristicAttributeCatalog" })
  catalogID: string;

  @Expose({ name: "InspSpecFrmtdUpperLimit" })
  upperLimit: string;

  @Expose({ name: "InspSpecHasUpperLimit" })
  hasUpperLimit: string;

  @Expose({ name: "InspSpecFrmtdLowerLimit" })
  lowerLimit: string;

  @Expose({ name: "InspSpecHasLowerLimit" })
  hasLowerLimit: string;
}
