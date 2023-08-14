import { Application } from "express";

import { inspectionRoute } from "~/s4/route/inspectionRoute";

export const configureRoute = (app: Application): void => {
  app.use("/s4/inspection", inspectionRoute);
};
