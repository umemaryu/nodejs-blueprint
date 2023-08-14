import { GetInspectionLotsQueryDTO } from "~/s4/dto/getInspectionLotsQueryDTO";
import { PostInspectionQlResultBodyDTO } from "~/s4/dto/postInspectionQlResultBodyDTO";
import { PostInspectionQnResultBodyDTO } from "~/s4/dto/postInspectionQnResultBodyDTO";
import { PostUsageDecisionBodyDTO } from "~/s4/dto/postUsageDecisionBodyDTO";
import { CharacteristicCode } from "~/s4/model/characteristicCode";
import { InspectionCharacteristic } from "~/s4/model/inspectionCharacteristic";
import { InspectionLot } from "~/s4/model/inspectionLot";

export interface InspectionService {
  getInspectionLot(lotID: string): Promise<InspectionLot>;
  getInspectionLots(
    queryDTO: GetInspectionLotsQueryDTO
  ): Promise<InspectionLot[]>;
  getInspectionCharacteristics(
    lotID: string
  ): Promise<InspectionCharacteristic[]>;
  getCharacteristicCodes(catalogName: string): Promise<CharacteristicCode[]>;
  postInspectionQnResult(bodyDTO: PostInspectionQnResultBodyDTO): Promise<void>;
  postInspectionQlResult(bodyDTO: PostInspectionQlResultBodyDTO): Promise<void>;
  postUsageDecision(bodyDTO: PostUsageDecisionBodyDTO): Promise<void>;
}
