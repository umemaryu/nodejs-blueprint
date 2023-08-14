import express, { Application } from "express";

export const configureRequestParser = (app: Application): void => {
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ extended: true, limit: "1000mb" }));
};
