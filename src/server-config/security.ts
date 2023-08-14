import cors from "cors";
import { Application } from "express";
import helmet from "helmet";

export const configureSecurity = (app: Application): void => {
  app.use(helmet());
  app.use(cors({ origin: true }));
};
