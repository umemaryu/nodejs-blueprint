import { Exclude, Expose } from "class-transformer";

@Exclude()
export class CharacteristicCodeWithText {
  @Expose({ name: "CharacteristicAttributeCodeGrp" })
  catalogName: string;

  @Expose({ name: "CharacteristicAttributeCode" })
  resultID: string;

  @Expose({ name: "CharacteristicAttributeCodeTxt" })
  resultName: string;
}
