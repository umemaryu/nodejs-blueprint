import { Router } from "express";

import { myContainer } from "~/di/inversify.config";
import { TYPES } from "~/di/types";
import { UserController } from "~/externalPlatform1/controller/userController";

const controller = myContainer.get<UserController>(TYPES.UserController);

const userRoute = Router();
userRoute.get("/", async (req, res) => controller.getUser(req, res));

export { userRoute };
