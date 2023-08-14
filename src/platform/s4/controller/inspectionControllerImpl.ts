import { inject, injectable } from "inversify";

import { TYPES } from "~/di/types";
import { InspectionController } from "~/s4/controller/inspectionController";
import { GetCharacteristicCodesQueryDTO } from "~/s4/dto/getCharacteristicCodesQueryDTO";
import { GetCharacteristicCodesResDTO } from "~/s4/dto/getCharacteristicCodesResDTO";
import { GetInspectionCharacteristicsQueryDTO } from "~/s4/dto/getInspectionCharacteristicsQueryDTO";
import { GetInspectionCharacteristicsResDTO } from "~/s4/dto/getInspectionCharacteristicsResDTO";
import { GetInspectionLotQueryDTO } from "~/s4/dto/getInspectionLotQueryDTO";
import { GetInspectionLotResDTO } from "~/s4/dto/getInspectionLotResDTO";
import { GetInspectionLotsQueryDTO } from "~/s4/dto/getInspectionLotsQueryDTO";
import { GetInspectionLotsResDTO } from "~/s4/dto/getInspectionLotsResDTO";
import { PostInspectionQlResultBodyDTO } from "~/s4/dto/postInspectionQlResultBodyDTO";
import { PostInspectionQnResultBodyDTO } from "~/s4/dto/postInspectionQnResultBodyDTO";
import { UsageDecision } from "~/s4/model/usageDecision";
import { InspectionService } from "~/s4/service/inspectionService";
import { ControllerMethod } from "~/type/controllerMethod";
import { HttpStatusCode } from "~/type/httpStatusCode";
import { HTTP400Error } from "~/utils/errors";
import { fromModelList2ResDTO } from "~/utils/fromModelList2ResDTO";
import { validateDTO } from "~/utils/validateDTO";

@injectable()
export class InspectionControllerImpl implements InspectionController {
  private service: InspectionService;

  constructor(
    @inject(TYPES.InspectionService) inspectionService: InspectionService
  ) {
    this.service = inspectionService;
  }
  public getInspectionLot: ControllerMethod = async (req, res) => {
    const queryDTO = new GetInspectionLotQueryDTO(req.query);
    await validateDTO(queryDTO);

    const lot = await this.service.getInspectionLot(queryDTO.lotID);

    const resDTO = new GetInspectionLotResDTO(lot);
    res.send(resDTO);
  };

  public getInspectionLots: ControllerMethod = async (req, res) => {
    const queryDTO = new GetInspectionLotsQueryDTO(req.query);
    await validateDTO(queryDTO);

    const lots = await this.service.getInspectionLots(queryDTO);

    const resDTO = fromModelList2ResDTO(GetInspectionLotsResDTO, lots);
    res.send(resDTO);
  };

  public getInspectionCharacteristics: ControllerMethod = async (req, res) => {
    const queryDTO = new GetInspectionCharacteristicsQueryDTO(req.query);
    await validateDTO(queryDTO);

    const characteristics = await this.service.getInspectionCharacteristics(
      queryDTO.lotID
    );

    const resDTO = fromModelList2ResDTO(
      GetInspectionCharacteristicsResDTO,
      characteristics
    );
    res.send(resDTO);
  };

  public getCharacteristicCodes: ControllerMethod = async (req, res) => {
    const queryDTO = new GetCharacteristicCodesQueryDTO(req.query);
    await validateDTO(queryDTO);

    const codes = await this.service.getCharacteristicCodes(
      queryDTO.catalogName
    );

    const resDTO = fromModelList2ResDTO(GetCharacteristicCodesResDTO, codes);
    res.send(resDTO);
  };

  public postInspectionResults: ControllerMethod = async (req, res) => {
    const promises = [];

    for (const data of req.body) {
      const isQuantitative = data.isQuantitative;
      if (typeof isQuantitative !== "boolean") {
        throw new HTTP400Error("isQuantitative query type must be boolean");
      }

      if (isQuantitative) {
        const bodyDTO = new PostInspectionQnResultBodyDTO(data);
        await validateDTO(bodyDTO);
        const servicePromise = this.service.postInspectionQnResult(bodyDTO);
        promises.push(servicePromise);
      } else {
        const bodyDTO = new PostInspectionQlResultBodyDTO(data);
        await validateDTO(bodyDTO);
        const servicePromise = this.service.postInspectionQlResult(bodyDTO);
        promises.push(servicePromise);
      }
    }
    await Promise.all(promises);

    res.status(HttpStatusCode.CREATED).send({ message: "Post success" });
  };

  public postUsageDecision: ControllerMethod = async (req, res) => {
    const bodyDTO = new UsageDecision(req.body);
    await validateDTO(bodyDTO);

    await this.service.postUsageDecision(bodyDTO);

    res.status(HttpStatusCode.CREATED).send({ message: "Post success" });
  };
}
