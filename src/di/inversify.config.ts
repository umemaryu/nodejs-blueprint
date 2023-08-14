//WARNING: Don't fix comments and export way below

import { Container } from "inversify";

import { TYPES } from "~/di/types";
import { UserController } from "~/externalPlatform1/controller/userController";
import { UserControllerImpl } from "~/externalPlatform1/controller/userControllerImpl";
import { UserRepositoryImpl } from "~/externalPlatform1/repository/userRepositoryImpl";
import { UserRepository } from "~/externalPlatform1/service/userRepository";
import { UserService } from "~/externalPlatform1/service/userService";
import { UserServiceImpl } from "~/externalPlatform1/service/userServiceImpl";
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
myContainer.bind<UserController>(TYPES.UserController).to(UserControllerImpl);
//@Insert

//Service
myContainer
  .bind<InspectionService>(TYPES.InspectionService)
  .to(InspectionServiceImpl);
myContainer.bind<UserService>(TYPES.UserService).to(UserServiceImpl);
//@Insert

//Repository
myContainer
  .bind<InspectionRepository>(TYPES.InspectionRepository)
  .to(InspectionRepositoryImpl);
myContainer
  .bind<CatalogRepository>(TYPES.CatalogRepository)
  .to(CatalogRepositoryImpl);
myContainer.bind<UserRepository>(TYPES.UserRepository).to(UserRepositoryImpl);
//@Insert

export { myContainer };
