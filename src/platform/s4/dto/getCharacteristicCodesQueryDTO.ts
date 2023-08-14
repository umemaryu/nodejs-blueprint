import { IsNotEmpty, IsString } from "class-validator";
import { ParsedQs } from "qs";

export class GetCharacteristicCodesQueryDTO {
  @IsNotEmpty()
  @IsString()
  catalogName: string;

  constructor(query: ParsedQs) {
    this.catalogName = query.catalogName as string;
  }
}
