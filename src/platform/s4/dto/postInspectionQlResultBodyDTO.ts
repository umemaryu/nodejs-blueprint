import { IsNotEmpty, IsString, IsInt, Min } from "class-validator";

export class PostInspectionQlResultBodyDTO {
  @IsNotEmpty()
  @IsString()
  lotID: string;

  @IsNotEmpty()
  @IsString()
  operationID: string;

  @IsNotEmpty()
  @IsString()
  characteristicID: string;

  @IsNotEmpty()
  @IsString()
  catalogID: string;

  @IsNotEmpty()
  @IsString()
  catalogName: string;

  @IsNotEmpty()
  @IsString()
  resultID: string;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  validValuesNumber: number;

  @IsString()
  resultCategory: string;

  constructor(body: PostInspectionQlResultBodyDTO) {
    this.lotID = body.lotID;
    this.operationID = body.operationID;
    this.characteristicID = body.characteristicID;
    this.catalogID = body.catalogID;
    this.catalogName = body.catalogName;
    this.resultID = body.resultID;
    this.validValuesNumber = body.validValuesNumber;
    this.resultCategory = body.resultCategory;
  }
}
