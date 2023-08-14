export class GetCharacteristicCodesResDTO {
  catalogName: string;
  resultID: string;
  resultCategory: string;
  resultName: string;

  constructor(data: {
    catalogName: string;
    resultID: string;
    resultCategory: string;
    resultName: string;
  }) {
    this.catalogName = data.catalogName;
    this.resultID = data.resultID;
    this.resultCategory = data.resultCategory;
    this.resultName = data.resultName;
  }
}
