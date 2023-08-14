import { CharacteristicCode } from "~/s4/model/characteristicCode";

export interface CatalogRepository {
  findCharacteristicCodesByCatalogName(
    catalogName: string
  ): Promise<CharacteristicCode[]>;
  findCharacteristicCodesWithTextMapByCatalogName(
    catalogName: string
  ): Promise<Map<string, string>>;
}
