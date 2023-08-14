import { IsNotEmpty, IsString, IsInt, Min } from "class-validator";

export class PostInspectionQnResultBodyDTO {
  @IsNotEmpty()
  @IsString()
  lotID: string;

  @IsNotEmpty()
  @IsString()
  operationID: string;

  @IsNotEmpty()
  @IsString()
  characteristicID: string;

  @IsString()
  resultCategory: string;

  @IsString()
  @IsNotEmpty()
  resultValue: string;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  validValuesNumber: number;

  @IsString()
  upperLimit: string;

  @IsString()
  hasUpperLimit: string;

  @IsString()
  lowerLimit: string;

  @IsString()
  hasLowerLimit: string;

  constructor(body: PostInspectionQnResultBodyDTO) {
    this.lotID = body.lotID;
    this.operationID = body.operationID;
    this.characteristicID = body.characteristicID;
    this.resultCategory = body.resultCategory;
    this.resultValue = body.resultValue;
    this.validValuesNumber = body.validValuesNumber;
    this.upperLimit = body.upperLimit;
    this.hasUpperLimit = body.hasUpperLimit;
    this.lowerLimit = body.lowerLimit;
    this.hasLowerLimit = body.hasLowerLimit;
  }
}
