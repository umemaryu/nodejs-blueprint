import { Router } from "express";

import { myContainer } from "~/di/inversify.config";
import { TYPES } from "~/di/types";
import { InspectionController } from "~/s4/controller/inspectionController";
import { asyncWrapper } from "~/utils/asyncWrapper";

const controller = myContainer.get<InspectionController>(
  TYPES.InspectionController
);

const inspectionRoute = Router();
inspectionRoute.get(
  "/lot",
  asyncWrapper(async (req, res) => await controller.getInspectionLot(req, res))
);

inspectionRoute.get(
  "/lots",
  asyncWrapper(async (req, res) => await controller.getInspectionLots(req, res))
);

inspectionRoute.get(
  "/characteristics",
  asyncWrapper(
    async (req, res) => await controller.getInspectionCharacteristics(req, res)
  )
);

inspectionRoute.get(
  "/characteristic-codes",
  asyncWrapper(
    async (req, res) => await controller.getCharacteristicCodes(req, res)
  )
);

inspectionRoute.post(
  "/results",
  asyncWrapper(
    async (req, res) => await controller.postInspectionResults(req, res)
  )
);

inspectionRoute.post(
  "/usage-decision",
  asyncWrapper(async (req, res) => await controller.postUsageDecision(req, res))
);

export { inspectionRoute };
