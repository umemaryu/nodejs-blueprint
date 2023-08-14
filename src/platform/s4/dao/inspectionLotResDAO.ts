export interface InspectionLotResDAO {
  InspectionLot: string;
  InspectionLotObjectText: string;
  InspectionLotActualQuantity: string;
  InspectionLotQuantityUnit: string;
  InspectionLotStartDate: string;
  InspectionLotEndDate: string;
  to_InspectionLotWithStatus: { InspLotStatusInspCompleted: string };
}
