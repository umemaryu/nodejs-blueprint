import { Exclude, Expose, Transform, Type } from "class-transformer";

@Exclude()
class Status {
  InspLotStatusInspCompleted: string;
}

@Exclude()
export class InspectionLot {
  @Expose({ name: "InspectionLot" })
  id: string;

  @Expose({ name: "Plant" })
  plant: string;

  @Expose({ name: "InspectionLotObjectText" })
  objectText: string;

  @Expose({ name: "InspectionLotActualQuantity" })
  quantity: string;

  @Expose({ name: "InspectionLotQuantityUnit" })
  unit: string;

  @Expose({ name: "InspectionLotStartDate" })
  startDate: string;

  @Expose({ name: "InspectionLotEndDate" })
  endDate: string;

  @Expose({ name: "ChangedDateTime" })
  changedDate: string;

  @Type(() => Status)
  to_InspectionLotWithStatus: Status;

  @Expose()
  @Transform(
    ({ obj }) => obj.to_InspectionLotWithStatus.InspLotStatusInspCompleted
  )
  isInspectionCompleted: string;
}
