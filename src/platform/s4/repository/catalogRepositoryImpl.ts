import { injectable } from "inversify";

import { CharacteristicCodesResDAO } from "~/s4/dao/characteristicCodesResDAO";
import { CharacteristicCodesWithTextResDAO } from "~/s4/dao/characteristicCodesWithTextResDAO";
import { CharacteristicCode } from "~/s4/model/characteristicCode";
import { CharacteristicCodeWithText } from "~/s4/model/characteristicCodeWithText";
import { createAPIClientDefault } from "~/s4/repository/index";
import { CatalogRepository } from "~/s4/service/catalogRepository";
import { fromDAO2Model, fromDAO2ModelList } from "~/utils/fromDAO2Model";

const client = createAPIClientDefault(
  "/sap/opu/odata/sap/API_CHARCATTRIBUTECATALOG_SRV"
);

@injectable()
export class CatalogRepositoryImpl implements CatalogRepository {
  public async findCharacteristicCodesByCatalogName(
    catalogName: string
  ): Promise<CharacteristicCode[]> {
    const res = await client.get(
      `/A_CharcAttribSeldSetCode?$filter=CharacteristicAttributeCodeGrp eq '${catalogName}'`
    );
    const dao: CharacteristicCodesResDAO[] = res.data.d.results;
    return fromDAO2ModelList(CharacteristicCode, dao);
  }

  public async findCharacteristicCodesWithTextMapByCatalogName(
    catalogName: string
  ): Promise<Map<string, string>> {
    const res = await client.get(
      `/A_CharcAttribSeldSetCodeT?$filter=CharacteristicAttributeCodeGrp eq '${catalogName}'`
    );
    const dao: CharacteristicCodesWithTextResDAO[] = res.data.d.results;
    const codesWithText = dao.map((ele) =>
      fromDAO2Model(CharacteristicCodeWithText, ele)
    );
    return new Map(codesWithText.map((ele) => [ele.resultID, ele.resultName]));
  }
}
