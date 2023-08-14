export class InspectionQlResult {
  lotID: string;
  operationID: string;
  characteristicID: string;
  catalogID: string;
  catalogName: string;
  resultID: string;
  validValuesNumber: number;
  resultCategory: string;
  resultText: string;
  resultHasLongText: string;
  resultStatus: string;

  constructor(data: {
    lotID: string;
    operationID: string;
    characteristicID: string;
    catalogID: string;
    catalogName: string;
    resultID: string;
    validValuesNumber: number;
    resultCategory: string;
  }) {
    this.lotID = data.lotID;
    this.operationID = data.operationID;
    this.characteristicID = data.characteristicID;
    this.catalogID = data.catalogID;
    this.catalogName = data.catalogName;
    this.resultID = data.resultID;
    this.validValuesNumber = data.validValuesNumber;
    this.resultCategory = data.resultCategory;
    this.resultText = "";
    this.resultHasLongText = "";
    this.resultStatus = "5";
  }
}
