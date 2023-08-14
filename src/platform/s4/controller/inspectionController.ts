import { ControllerMethod } from "~/type/controllerMethod";

export interface InspectionController {
  getInspectionLot: ControllerMethod;
  getInspectionLots: ControllerMethod;
  getInspectionCharacteristics: ControllerMethod;
  getCharacteristicCodes: ControllerMethod;
  postInspectionResults: ControllerMethod;
  postUsageDecision: ControllerMethod;
}
