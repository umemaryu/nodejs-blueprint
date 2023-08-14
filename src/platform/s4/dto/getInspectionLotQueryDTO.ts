import { IsNotEmpty, IsString } from "class-validator";
import { ParsedQs } from "qs";

export class GetInspectionLotQueryDTO {
  @IsNotEmpty()
  @IsString()
  lotID: string;

  constructor(query: ParsedQs) {
    this.lotID = query.lotID as string;
  }
}
