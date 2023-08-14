//WARNING: Don't fix comments and export way below

const TYPES = {
  //Controller
  InspectionController: Symbol.for("InspectionController"),
  UserController: Symbol.for("UserController"),
  //@Insert

  //Service
  InspectionService: Symbol.for("InspectionService"),
  UserService: Symbol.for("UserService"),
  //@Insert

  //Repository
  InspectionRepository: Symbol.for("InspectionRepository"),
  CatalogRepository: Symbol.for("CatalogRepository"),
  UserRepository: Symbol.for("UserRepository"),
  //@Insert
};

export { TYPES };
