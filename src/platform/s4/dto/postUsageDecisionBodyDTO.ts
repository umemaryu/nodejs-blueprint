import { IsNotEmpty, IsString } from "class-validator";

export class PostUsageDecisionBodyDTO {
  @IsNotEmpty()
  @IsString()
  lotID: string;

  @IsNotEmpty()
  @IsString()
  plant: string;

  @IsNotEmpty()
  @IsString()
  changedDate: string;

  constructor(body: PostUsageDecisionBodyDTO) {
    this.lotID = body.lotID;
    this.plant = body.plant;
    this.changedDate = body.changedDate;
  }
}
