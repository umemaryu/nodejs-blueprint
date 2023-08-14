import { inject, injectable } from "inversify";

import { TYPES } from "~/di/types";
import { GetInspectionLotsQueryDTO } from "~/s4/dto/getInspectionLotsQueryDTO";
import { PostInspectionQlResultBodyDTO } from "~/s4/dto/postInspectionQlResultBodyDTO";
import { PostInspectionQnResultBodyDTO } from "~/s4/dto/postInspectionQnResultBodyDTO";
import { PostUsageDecisionBodyDTO } from "~/s4/dto/postUsageDecisionBodyDTO";
import { CharacteristicCode } from "~/s4/model/characteristicCode";
import { InspectionCharacteristic } from "~/s4/model/inspectionCharacteristic";
import { InspectionLot } from "~/s4/model/inspectionLot";
import { InspectionQlResult } from "~/s4/model/inspectionQlResult";
import { InspectionQnResult } from "~/s4/model/inspectionQnResult";
import { UsageDecision } from "~/s4/model/usageDecision";
import { CatalogRepository } from "~/s4/service/catalogRepository";
import { InspectionRepository } from "~/s4/service/inspectionRepository";
import { InspectionService } from "~/s4/service/inspectionService";

@injectable()
export class InspectionServiceImpl implements InspectionService {
  private inspectionRepo: InspectionRepository;
  private catalogRepo: CatalogRepository;

  constructor(
    @inject(TYPES.InspectionRepository)
    inspectionRepo: InspectionRepository,
    @inject(TYPES.CatalogRepository)
    catalogRepo: CatalogRepository
  ) {
    this.inspectionRepo = inspectionRepo;
    this.catalogRepo = catalogRepo;
  }

  public async getInspectionLot(lotID: string): Promise<InspectionLot> {
    return await this.inspectionRepo.findInspectionLotByLotID(lotID);
  }

  public async getInspectionLots(
    queryDTO: GetInspectionLotsQueryDTO
  ): Promise<InspectionLot[]> {
    return await this.inspectionRepo.findLotsByDateRangeAndInspectionStatus(
      queryDTO
    );
  }

  public async getInspectionCharacteristics(
    lotID: string
  ): Promise<InspectionCharacteristic[]> {
    return await this.inspectionRepo.findInspectionCharacteristicsByLotID(
      lotID
    );
  }

  public async getCharacteristicCodes(
    catalogName: string
  ): Promise<CharacteristicCode[]> {
    const codes: CharacteristicCode[] =
      await this.catalogRepo.findCharacteristicCodesByCatalogName(catalogName);
    const resultIDMap =
      await this.catalogRepo.findCharacteristicCodesWithTextMapByCatalogName(
        catalogName
      );
    codes.map((code) => (code.resultName = code.addResultName(resultIDMap)));
    return codes;
  }

  public async postInspectionQnResult(
    bodyDTO: PostInspectionQnResultBodyDTO
  ): Promise<void> {
    const authData = await this.inspectionRepo.findAuthData();
    const inspectionQnResult = new InspectionQnResult({ ...bodyDTO });
    inspectionQnResult.resultCategory =
      inspectionQnResult.calcResultCategory(bodyDTO);
    await this.inspectionRepo.saveInspectionQnResult(
      authData,
      inspectionQnResult
    );
  }

  public async postInspectionQlResult(
    bodyDTO: PostInspectionQlResultBodyDTO
  ): Promise<void> {
    const authData = await this.inspectionRepo.findAuthData();
    const inspectionQlResult = new InspectionQlResult({ ...bodyDTO });
    await this.inspectionRepo.saveInspectionQlResult(
      authData,
      inspectionQlResult
    );
  }
  public async postUsageDecision(
    bodyDTO: PostUsageDecisionBodyDTO
  ): Promise<void> {
    const authData = await this.inspectionRepo.findAuthData();
    const usageDecision = new UsageDecision({ ...bodyDTO });
    const inspectionResults =
      await this.inspectionRepo.findInspectionResultsByLotID(bodyDTO.lotID);
    usageDecision.qualityScore =
      usageDecision.calcQualityScore(inspectionResults);
    usageDecision.usageDecisionCode = usageDecision.addUsageDecision();
    await this.inspectionRepo.saveUsageDecision(authData, usageDecision);
  }
}
