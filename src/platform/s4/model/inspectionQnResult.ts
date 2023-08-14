export class InspectionQnResult {
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
  resultValue: string;
  upperLimit: string;
  hasUpperLimit: string;
  lowerLimit: string;
  hasLowerLimit: string;

  constructor(data: {
    lotID: string;
    operationID: string;
    characteristicID: string;
    validValuesNumber: number;
    resultValue: string;
    upperLimit: string;
    hasUpperLimit: string;
    lowerLimit: string;
    hasLowerLimit: string;
  }) {
    this.resultValue = data.resultValue;
    this.validValuesNumber = data.validValuesNumber;
    this.lotID = data.lotID;
    this.operationID = data.operationID;
    this.characteristicID = data.characteristicID;
    this.validValuesNumber = data.validValuesNumber;
    this.upperLimit = data.upperLimit;
    this.hasUpperLimit = data.hasUpperLimit;
    this.lowerLimit = data.lowerLimit;
    this.hasLowerLimit = data.hasLowerLimit;
    this.resultStatus = "5";
    this.resultCategory = "";
    this.resultText = "";
    this.resultHasLongText = "";
  }

  private isAccepted = (bool: boolean): "A" | "R" => (bool ? "A" : "R");

  public calcResultCategory = (result: {
    hasLowerLimit: string;
    hasUpperLimit: string;
    lowerLimit: string;
    upperLimit: string;
    resultValue: string;
  }): "A" | "R" => {
    const {
      hasLowerLimit,
      hasUpperLimit,
      lowerLimit,
      upperLimit,
      resultValue,
    } = result;

    if (hasLowerLimit && hasUpperLimit) {
      return this.isAccepted(
        lowerLimit <= resultValue && resultValue <= upperLimit
      );
    } else if (hasLowerLimit && !hasUpperLimit) {
      return this.isAccepted(lowerLimit <= resultValue);
    } else if (!hasLowerLimit && hasUpperLimit) {
      return this.isAccepted(upperLimit >= resultValue);
    } else {
      return "A";
    }
  };
}
