/* eslint-disable */
const fs = require("fs");
const { exec } = require("child_process");

const {
  upperCaseClass,
  lowerCaseClass,
  upperCaseModel,
  lowerCaseModel,
  isListData,
  suffixType,
  suffixName,
  apiPath,
  endpointPath,
} = (() => {
  const className = process.argv[2];
  const isListData = process.argv[3];
  const apiPath = process.argv[4];
  const endpointPath = process.argv[5];
  const modelName = endpointPath.replace("/", "");

  if (!className || !modelName || !isListData || !apiPath || !endpointPath) {
    console.error(
      "Usage:   yarn create-template <Class name> <Is getting data list> <API Path> <Endpoint Path>"
    );
    console.log(
      "Example: yarn create-template Equipment true /sap/opu/odata/sap/API_EQUIPMENT /EquipmentLongText"
    );
    console.log("");
    console.log(
      "Note: https://example.api.sap.com/sap/opu/odata/sap/API_EQUIPMENT/EquipmentLongText is separated:"
    );
    console.log("S4_URL(.enf): https://example.api.sap.com");
    console.log("<API Path>: /sap/opu/odata/sap/API_EQUIPMENT");
    console.log("<Endpoint Path>: /EquipmentLongText");
    process.exit(1);
  } else if (!apiPath.startsWith("/") || !endpointPath.startsWith("/")) {
    console.error(
      "Usage:   yarn create-template <Class name> <Is getting data list> <API Path> <Endpoint Path>"
    );
    console.log("<API Path> and <Endpoint Path> starts with '/'");
    console.log(
      "Example: yarn create-template Equipment true /sap/opu/odata/sap/API_EQUIPMENT /EquipmentLongText"
    );
    process.exit(1);
  }
  return {
    upperCaseClass: className.charAt(0).toUpperCase() + className.slice(1),
    lowerCaseClass: className.toLowerCase(),
    upperCaseModel: modelName.charAt(0).toUpperCase() + modelName.slice(1),
    lowerCaseModel:
      modelName.charAt(0).toLocaleLowerCase() + modelName.slice(1),
    isListData,
    suffixType: isListData ? "[]" : "",
    suffixName: isListData ? "s" : "",
    apiPath: apiPath,
    endpointPath: endpointPath,
  };
})();

const fsWrap = (path, script) => {
  if (!fs.existsSync(path)) {
    fs.writeFileSync(path, script, "utf-8");
    console.log(`File ${path} created.`);
  } else {
    console.log(`Skip file ${path} process because the file already exist.`);
  }
};

const isIncludeWordInList = (word, list) =>
  list.some((element) => element.includes(word));

const addDIScript = (path) => {
  const typesPath = "./src/di/types.ts";

  const inversifyPath = "./src/di/inversify.config.ts";
  const script = fs.readFileSync(path, "utf-8");
  const lines = script.split("\n");
  let list = ["Controller", "Service", "Repository"];

  const checkSkipInsert = (word, logMessage) => {
    if (isIncludeWordInList(word, lines)) {
      console.log(
        `Skip file ${path} process because it has already ${logMessage}`
      );
      return true;
    }
    return false;
  };

  for (let i = 1; i < lines.length; i++) {
    const symbol = `  ${upperCaseClass}${list[0]}: Symbol.for("${upperCaseClass}${list[0]}"),`;
    const bind = `myContainer.bind<${upperCaseClass}${list[0]}>(TYPES.${upperCaseClass}${list[0]}).to(${upperCaseClass}${list[0]}Impl);`;
    if (
      path === typesPath &&
      checkSkipInsert(symbol, `${upperCaseClass}${list[0]} Symbol`)
    ) {
      return null;
    } else if (
      path === inversifyPath &&
      checkSkipInsert(bind, `${upperCaseClass}${list[0]}Impl), bind`)
    ) {
      return null;
    }
    if (lines[i].trim() === "//@Insert" && path === typesPath) {
      lines.splice(i, 0, symbol);
      list = list.slice(1);
      i++;
    } else if (lines[i].trim() === "//@Insert" && path === inversifyPath) {
      lines.splice(i, 0, bind);
      list = list.slice(1);
      i++;
    }
  }

  if (path === inversifyPath) {
    const importStatements = [
      `import { ${upperCaseClass}Controller } from "~/s4/controller/${lowerCaseClass}Controller";`,
      `import { ${upperCaseClass}ControllerImpl } from "~/s4/controller/${lowerCaseClass}ControllerImpl";`,
      `import { ${upperCaseClass}RepositoryImpl } from "~/s4/repository/${lowerCaseClass}RepositoryImpl";`,
      `import { ${upperCaseClass}Repository } from "~/s4/service/${lowerCaseClass}Repository";`,
      `import { ${upperCaseClass}Service } from "~/s4/service/${lowerCaseClass}Service";`,
      `import { ${upperCaseClass}ServiceImpl } from "~/s4/service/${lowerCaseClass}ServiceImpl";`,
    ];

    lines.splice(0, 0, ...importStatements);
  }

  return lines.join("\n");
};

const addRouteScript = (path) => {
  const script = fs.readFileSync(path, "utf-8");
  const lines = script.split("\n");
  if (isIncludeWordInList(`${lowerCaseClass}Route`, lines)) {
    console.log(
      `Skip file ${path} process because it has already ${lowerCaseClass}Route`
    );
    return null;
  }
  for (let i = 1; i < lines.length; i++) {
    if (
      lines[i].trim() === "};" &&
      !isIncludeWordInList(`${lowerCaseClass}Route`, lines)
    ) {
      lines.splice(
        i,
        0,
        `  app.use("/s4/${lowerCaseClass}", ${lowerCaseClass}Route);`
      );
      lines.splice(
        0,
        0,
        `import { ${lowerCaseClass}Route } from "~/s4/route/${lowerCaseClass}Route";`
      );
      break;
    }
  }
  return lines.join("\n");
};

const modelScript = `import { Exclude } from "class-transformer";

// TODO DDefine a correct model
Exclude()
export class ${upperCaseModel} {
  [key: string]: any;
}

`;

const daoScript = `// TODO Define a correct DAO
export interface ${upperCaseModel}ResDAO {
  [key: string]: any;
}

`;

const dtoScript = `// TODO Define a correct DAO
export class Get${upperCaseModel}ResDTO {
}

`;

const repositoryScript = `import { ${upperCaseModel} } from "~/s4/model/${lowerCaseModel}";
import { AuthData } from "~/type/authData";

export interface ${upperCaseClass}Repository {
  findAuthData(): Promise<AuthData>;
  find${upperCaseModel}${suffixName}(): Promise<${upperCaseModel}${suffixType}>;
}

`;

const repositoryImplScript = `import { injectable } from "inversify";

import { ${upperCaseModel}ResDAO } from "~/s4/dao/${lowerCaseModel}ResDAO";
import { ${upperCaseModel} } from "~/s4/model/${lowerCaseModel}";
import { createAPIClientDefault } from "~/s4/repository/index";
import { ${upperCaseClass}Repository } from "~/s4/service/${lowerCaseClass}Repository";
import { AuthData } from "~/type/authData";
import { ${
  isListData ? "fromDAO2ModelList" : "fromDAO2Model"
} } from "~/utils/fromDAO2Model";

const client = createAPIClientDefault("${apiPath}");

@injectable()
export class ${upperCaseClass}RepositoryImpl implements ${upperCaseClass}Repository {
  public async findAuthData(): Promise<AuthData> {
    const res = await client.get("/", {
      headers: {
        "x-csrf-token": "FETCH",
      },
    });
    return {
      cookie: res.headers["set-cookie"],
      xCSRFToken: res.headers["x-csrf-token"],
    };
  }

  public async find${upperCaseModel}${suffixName}(): Promise<${upperCaseModel}${suffixType}> {
    const res = await client.get(
      "${endpointPath}"
    );
      ${
        isListData
          ? `const dao: ${upperCaseModel}ResDAO${suffixType} = res.data.d.results;`
          : `const dao: ${upperCaseModel}ResDAO${suffixType} = res.data.d;`
      }
    ${
      isListData
        ? `return fromDAO2ModelList(${upperCaseModel}, dao);`
        : `return fromDAO2Model(${upperCaseModel}, dao);`
    }
  }
}

`;

const serviceScript = `import { ${upperCaseModel} } from "~/s4/model/${lowerCaseModel}";

export interface ${upperCaseClass}Service {
  get${upperCaseModel}${suffixName}(): Promise<${upperCaseModel}${suffixType}>;
}

`;

const serviceImplScript = `import { inject, injectable } from "inversify";

import { TYPES } from "~/di/types";
import { ${upperCaseModel} } from "~/s4/model/${lowerCaseModel}";
import { ${upperCaseClass}Repository } from "~/s4/service/${lowerCaseClass}Repository";
import { ${upperCaseClass}Service } from "~/s4/service/${lowerCaseClass}Service";

@injectable()
export class ${upperCaseClass}ServiceImpl implements ${upperCaseClass}Service {
  private ${lowerCaseClass}Repo: ${upperCaseClass}Repository;

  constructor(
    @inject(TYPES.${upperCaseClass}Repository)
    ${lowerCaseClass}Repo: ${upperCaseClass}Repository
  ) {
    this.${lowerCaseClass}Repo = ${lowerCaseClass}Repo;
  }

  public async get${upperCaseModel}${suffixName}(): Promise<${upperCaseModel}${suffixType}> {
    return await this.${lowerCaseClass}Repo.find${upperCaseModel}${suffixName}();
  }
}

`;

const controllerScript = `import { ControllerMethod } from "~/type/controllerMethod";

export interface ${upperCaseClass}Controller {
  get${upperCaseModel}${suffixName}: ControllerMethod;
}

`;

const controllerImplScript = `import { inject, injectable } from "inversify";

import "reflect-metadata";

import { TYPES } from "~/di/types";
import { ${upperCaseClass}Controller } from "~/s4/controller/${lowerCaseClass}Controller";
import { ${upperCaseClass}Service } from "~/s4/service/${lowerCaseClass}Service";
import { ControllerMethod } from "~/type/controllerMethod";

@injectable()
export class ${upperCaseClass}ControllerImpl implements ${upperCaseClass}Controller {
  private service: ${upperCaseClass}Service;

  constructor(
    @inject(TYPES.${upperCaseClass}Service) ${upperCaseModel}Service: ${upperCaseClass}Service
  ) {
    this.service = ${upperCaseModel}Service;
  }
  public get${upperCaseModel}${suffixName}: ControllerMethod = async (req, res) => {
    const ${lowerCaseModel} = await this.service.get${upperCaseModel}${suffixName}();

    // TODO After define Get${upperCaseModel}ResDTO, delete res.send(${lowerCaseModel}) and uncomment below.
    // const resDTO = new Get${upperCaseModel}ResDTO(${lowerCaseModel});
    // res.send(resDTO);
    res.send(${lowerCaseModel})
  };
}

`;

const s4RouteScript = `import { Router } from "express";

import "reflect-metadata";

import { myContainer } from "~/di/inversify.config";
import { TYPES } from "~/di/types";
import { ${upperCaseClass}Controller } from "~/s4/controller/${lowerCaseClass}Controller";
import { asyncWrapper } from "~/utils/asyncWrapper";

const controller = myContainer.get<${upperCaseClass}Controller>(
  TYPES.${upperCaseClass}Controller
);

const ${lowerCaseClass}Route = Router();
${lowerCaseClass}Route.get(
  "${endpointPath}",
  asyncWrapper(async (req, res) => await controller.get${upperCaseModel}${suffixName}(req, res))
);

export { ${lowerCaseClass}Route };

`;

const lintFix = () => {
  return new Promise((resolve, reject) => {
    const command = "yarn lint-fix";
    exec(command, (error) => {
      if (error) {
        console.error(`Error executing command: ${error.message}`);
        reject(error);
        return;
      }
      resolve();
    });
  });
};

const build = () => {
  return new Promise((resolve, reject) => {
    const command = "yarn build";
    exec(command, (error) => {
      if (error) {
        console.error(`Error executing command: ${error.message}`);
        reject(error);
        return;
      }
      resolve();
    });
  });
};

const main = async () => {
  fsWrap(`./src/platform/s4/model/${lowerCaseModel}.ts`, modelScript);
  fsWrap(`./src/platform/s4/dao/${lowerCaseModel}ResDAO.ts`, daoScript);
  fsWrap(`./src/platform/s4/dto/get${upperCaseModel}ResDTO.ts`, dtoScript);
  fsWrap(
    `./src/platform/s4/service/${lowerCaseClass}Repository.ts`,
    repositoryScript
  );
  fsWrap(
    `./src/platform/s4/repository/${lowerCaseClass}RepositoryImpl.ts`,
    repositoryImplScript
  );
  fsWrap(
    `./src/platform/s4/service/${lowerCaseClass}Service.ts`,
    serviceScript
  );
  fsWrap(
    `./src/platform/s4/service/${lowerCaseClass}ServiceImpl.ts`,
    serviceImplScript
  );
  fsWrap(
    `./src/platform/s4/controller/${lowerCaseClass}Controller.ts`,
    controllerScript
  );
  fsWrap(
    `./src/platform/s4/controller/${lowerCaseClass}ControllerImpl.ts`,
    controllerImplScript
  );

  fsWrap(`./src/platform/s4/route/${lowerCaseClass}Route.ts`, s4RouteScript);

  const routePath = "./src/server-config/route.ts";
  const routeScript = addRouteScript(routePath);
  if (routeScript) {
    fs.writeFileSync(routePath, routeScript, "utf-8");
    console.log(`File  ${routePath} created.`);
  }

  const typesPath = "./src/di/types.ts";
  const symbolScript = addDIScript(typesPath);
  if (symbolScript) {
    fs.writeFileSync(typesPath, symbolScript, "utf-8");
    console.log(`File ${typesPath}  created.`);
  }

  const inversifyPath = "./src/di/inversify.config.ts";
  const bindsScript = addDIScript(inversifyPath);
  if (bindsScript) {
    fs.writeFileSync(inversifyPath, bindsScript, "utf-8");
    console.log(`File ${inversifyPath}  created.`);
  }
  console.log("Fixing lint errors...");

  try {
    await lintFix();
    console.log("Lint errors fixed.");
  } catch (error) {
    console.error("Failed to fix lint errors.");
    return;
  }

  console.log("Building...");
  try {
    await build();
    console.log("Build completed.");
  } catch (error) {
    console.error("Failed to build.");
    return;
  }

  console.log("Done🎉🎉🎉");
  console.log(
    "Route, Controller, Service, Repository and DI files have been created."
  );

  console.log("Run 'yarn start' and call GET method:");
  console.log(`http://localhost:3000/s4/${lowerCaseClass}${endpointPath}`);
};

main();
