import { IsNotEmpty, IsString } from "class-validator";
import { ParsedQs } from "qs";

export class GetInspectionCharacteristicsQueryDTO {
  @IsNotEmpty()
  @IsString()
  lotID: string;

  constructor(query: ParsedQs) {
    this.lotID = query.lotID as string;
  }
}
