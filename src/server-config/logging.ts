import { Application } from "express";
import morgan from "morgan";

export const configureLogging = (app: Application): void => {
  app.use(morgan("dev"));
};
