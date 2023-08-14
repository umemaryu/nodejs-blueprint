import { GetInspectionLotsQueryDTO } from "~/s4/dto/getInspectionLotsQueryDTO";
import { InspectionCharacteristic } from "~/s4/model/inspectionCharacteristic";
import { InspectionLot } from "~/s4/model/inspectionLot";
import { InspectionQlResult } from "~/s4/model/inspectionQlResult";
import { InspectionQnResult } from "~/s4/model/inspectionQnResult";
import { InspectionResult } from "~/s4/model/inspectionResult";
import { UsageDecision } from "~/s4/model/usageDecision";
import { AuthData } from "~/type/authData";

export interface InspectionRepository {
  findAuthData(): Promise<AuthData>;
  findInspectionLotByLotID(lotID: string): Promise<InspectionLot>;
  findLotsByDateRangeAndInspectionStatus(
    queryDTO: GetInspectionLotsQueryDTO
  ): Promise<InspectionLot[]>;
  findInspectionCharacteristicsByLotID(
    lotID: string
  ): Promise<InspectionCharacteristic[]>;
  findInspectionResultsByLotID(lotID: string): Promise<InspectionResult[]>;
  saveInspectionQnResult(
    authData: AuthData,
    inspectionQnResult: InspectionQnResult
  ): Promise<void>;
  saveInspectionQlResult(
    authData: AuthData,
    inspectionQlResult: InspectionQlResult
  ): Promise<void>;
  saveUsageDecision(
    authData: AuthData,
    usageDecision: UsageDecision
  ): Promise<void>;
}
