import { Exclude, Expose } from "class-transformer";

@Exclude()
export class CharacteristicCode {
  @Expose({ name: "CharacteristicAttributeCodeGrp" })
  catalogName: string;

  @Expose({ name: "CharacteristicAttributeCode" })
  resultID: string;

  @Expose({ name: "CharcAttributeValuation" })
  resultCategory: string;

  @Expose({ name: "CharacteristicAttributeCodeTxt" })
  resultName: string | null;

  public addResultName = (resultIDMap: Map<string, string>): string =>
    resultIDMap.get(this.resultID) || "";
}
