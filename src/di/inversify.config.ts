//WARNING: Don't fix comments and export way below

import { Container } from "inversify";

import { TYPES } from "~/di/types";
import { InspectionController } from "~/s4/controller/inspectionController";
import { InspectionControllerImpl } from "~/s4/controller/inspectionControllerImpl";
import { CatalogRepositoryImpl } from "~/s4/repository/catalogRepositoryImpl";
import { InspectionRepositoryImpl } from "~/s4/repository/inspectionRepositoryImpl";
import { CatalogRepository } from "~/s4/service/catalogRepository";
import { InspectionRepository } from "~/s4/service/inspectionRepository";
import { InspectionService } from "~/s4/service/inspectionService";
import { InspectionServiceImpl } from "~/s4/service/inspectionServiceImpl";

const myContainer = new Container();

//Controller
myContainer
  .bind<InspectionController>(TYPES.InspectionController)
  .to(InspectionControllerImpl);
//@Insert

//Service
myContainer
  .bind<InspectionService>(TYPES.InspectionService)
  .to(InspectionServiceImpl);
//@Insert

//Repository
myContainer
  .bind<InspectionRepository>(TYPES.InspectionRepository)
  .to(InspectionRepositoryImpl);
myContainer
  .bind<CatalogRepository>(TYPES.CatalogRepository)
  .to(CatalogRepositoryImpl);
//@Insert

export { myContainer };
