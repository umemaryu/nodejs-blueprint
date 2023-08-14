import { injectable } from "inversify";

import { InspectionCharacteristicResDAO } from "~/s4/dao/inspectionCharacteristicResDAO";
import { InspectionLotResDAO } from "~/s4/dao/inspectionLotResDAO";
import { InspectionQlResultQlReqDAO } from "~/s4/dao/inspectionQlResultReqDAO";
import { InspectionQnResultReqDAO } from "~/s4/dao/inspectionQnResultReqDAO";
import { InspectionResultResDAO } from "~/s4/dao/inspectionResultResDAO";
import { UsageDecisionReqDAO } from "~/s4/dao/usageDecisionReqDAO";
import { GetInspectionLotsQueryDTO } from "~/s4/dto/getInspectionLotsQueryDTO";
import { InspectionCharacteristic } from "~/s4/model/inspectionCharacteristic";
import { InspectionLot } from "~/s4/model/inspectionLot";
import { InspectionQlResult } from "~/s4/model/inspectionQlResult";
import { InspectionQnResult } from "~/s4/model/inspectionQnResult";
import { InspectionResult } from "~/s4/model/inspectionResult";
import { UsageDecision } from "~/s4/model/usageDecision";
import { createAPIClientDefault } from "~/s4/repository/index";
import { InspectionRepository } from "~/s4/service/inspectionRepository";
import { AuthData } from "~/type/authData";
import { fromDAO2Model, fromDAO2ModelList } from "~/utils/fromDAO2Model";

const client = createAPIClientDefault(
  "/sap/opu/odata/sap/API_INSPECTIONLOT_SRV"
);

@injectable()
export class InspectionRepositoryImpl implements InspectionRepository {
  public async findAuthData(): Promise<AuthData> {
    const res = await client.get(`/`, {
      headers: {
        "x-csrf-token": "FETCH",
      },
    });
    return {
      cookie: res.headers["set-cookie"],
      xCSRFToken: res.headers["x-csrf-token"],
    };
  }

  public async findInspectionLotByLotID(lotID: string): Promise<InspectionLot> {
    const res = await client.get(
      `/A_InspectionLot('${lotID}')?$expand=to_InspectionLotWithStatus`
    );
    const dao: InspectionLotResDAO = res.data.d;
    return fromDAO2Model(InspectionLot, dao);
  }

  public async findLotsByDateRangeAndInspectionStatus(
    query: GetInspectionLotsQueryDTO
  ): Promise<InspectionLot[]> {
    const res = await client.get(
      `/A_InspectionLot
      ?$expand=to_InspectionLotWithStatus&
      $filter=InspectionLotStartDate ge datetime'${query.startDate}T00:00:00'
      and InspectionLotStartDate le datetime'${query.endDate}T23:59:59'
      and to_InspectionLotWithStatus/InspLotStatusInspCompleted eq ${query.isInspectionCompleted}
      and Plant eq '1710'`
    );
    const dao: InspectionLotResDAO[] = res.data.d.results;
    return fromDAO2ModelList(InspectionLot, dao);
  }

  public async findInspectionCharacteristicsByLotID(
    lotID: string
  ): Promise<InspectionCharacteristic[]> {
    const res = await client.get(
      `/A_InspectionCharacteristic?$filter=InspectionLot eq '${lotID}'`
    );
    const dao: InspectionCharacteristicResDAO[] = res.data.d.results;
    return fromDAO2ModelList(InspectionCharacteristic, dao);
  }

  public async findInspectionResultsByLotID(
    lotID: string
  ): Promise<InspectionResult[]> {
    const res = await client.get(
      `/A_InspectionResult?$filter=InspectionLot eq '${lotID}'`
    );
    const dao: InspectionResultResDAO[] = res.data.d.results;
    return fromDAO2ModelList(InspectionResult, dao);
  }

  public async saveInspectionQnResult(
    authData: AuthData,
    qnResult: InspectionQnResult
  ): Promise<void> {
    const body: InspectionQnResultReqDAO = {
      InspectionLot: qnResult.lotID,
      InspPlanOperationInternalID: qnResult.operationID,
      InspectionCharacteristic: qnResult.characteristicID,
      InspResultValidValuesNumber: qnResult.validValuesNumber,
      InspectionResultText: qnResult.resultText,
      InspectionValuationResult: qnResult.resultCategory,
      InspectionResultStatus: qnResult.resultStatus,
      InspResultFrmtdMeanValue: qnResult.resultValue,
    };

    await client.post(`/A_InspectionResult`, body, {
      headers: {
        "Content-Type": "application/json",
        "x-csrf-token": authData.xCSRFToken,
        Cookie: authData.cookie,
      },
    });
  }
  public async saveInspectionQlResult(
    authData: AuthData,
    qlResult: InspectionQlResult
  ): Promise<void> {
    const body: InspectionQlResultQlReqDAO = {
      InspectionLot: qlResult.lotID,
      InspPlanOperationInternalID: qlResult.operationID,
      InspectionCharacteristic: qlResult.characteristicID,
      CharacteristicAttributeCatalog: qlResult.catalogID,
      CharacteristicAttributeCodeGrp: qlResult.catalogName,
      CharacteristicAttributeCode: qlResult.resultID,
      InspResultValidValuesNumber: qlResult.validValuesNumber,
      InspectionResultText: qlResult.resultText,
      InspectionResultHasLongText: qlResult.resultHasLongText,
      InspectionValuationResult: qlResult.resultCategory,
      InspectionResultStatus: qlResult.resultStatus,
    };

    await client.post(`/A_InspectionResult`, body, {
      headers: {
        "Content-Type": "application/json",
        "x-csrf-token": authData.xCSRFToken,
        Cookie: authData.cookie,
      },
    });
  }

  public async saveUsageDecision(
    authData: AuthData,
    usageDecision: UsageDecision
  ): Promise<void> {
    const body: UsageDecisionReqDAO = {
      d: {
        InspectionLot: usageDecision.lotID,
        InspLotUsageDecisionLevel: usageDecision.usageDecisionLevel,
        InspectionLotQualityScore: usageDecision.qualityScore,
        InspLotUsageDecisionCatalog: usageDecision.catalogID,
        SelectedCodeSetPlant: usageDecision.plant,
        InspLotUsgeDcsnSelectedSet: usageDecision.usageDecisionSelectedSet,
        InspLotUsageDecisionCodeGroup: usageDecision.catalogName,
        InspectionLotUsageDecisionCode: usageDecision.usageDecisionCode,
        ChangedDateTime: usageDecision.changedDate,
      },
    };

    await client.post(`/A_InspLotUsageDecision`, body, {
      headers: {
        "Content-Type": "application/json",
        "x-csrf-token": authData.xCSRFToken,
        Cookie: authData.cookie,
      },
    });
  }
}
