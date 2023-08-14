import { Application } from "express";

import { userRoute } from "~/externalPlatform1/route/userRoute";
import { inspectionRoute } from "~/s4/route/inspectionRoute";

export const configureRoute = (app: Application): void => {
  app.use("/external-platform1/user", userRoute);
  app.use("/s4/inspection", inspectionRoute);
};
