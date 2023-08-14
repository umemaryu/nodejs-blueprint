export class GetInspectionCharacteristicsResDTO {
  lotID: string;
  operationID: string;
  isQuantitative: boolean;
  characteristicID: string;
  catalogName: string;
  catalogID: string;
  upperLimit: string;
  hasUpperLimit: string;
  lowerLimit: string;
  hasLowerLimit: string;
  constructor(data: {
    lotID: string;
    operationID: string;
    isQuantitative: boolean;
    characteristicID: string;
    catalogName: string;
    catalogID: string;
    upperLimit: string;
    hasUpperLimit: string;
    lowerLimit: string;
    hasLowerLimit: string;
  }) {
    this.lotID = data.lotID;
    this.operationID = data.operationID;
    this.isQuantitative = data.isQuantitative;
    this.characteristicID = data.characteristicID;
    this.catalogName = data.catalogName;
    this.upperLimit = data.upperLimit;
    this.hasUpperLimit = data.hasUpperLimit;
    this.lowerLimit = data.lowerLimit;
  }
}
