import  express, { Application } from "express";
import http from "http";

import "reflect-metadata";

import { configureErrorHandler } from "~/server-config/errorHandler";
import { configureLogging } from "~/server-config/logging";
import { configureRequestParser } from "~/server-config/requestParser";
import { configureRoute } from "~/server-config/route";
import { configureSecurity } from "~/server-config/security";

const app: Application = express();
const port: number = 3000;

configureLogging(app)
configureRequestParser(app)
configureRoute(app);
configureSecurity(app);
configureErrorHandler(app);

const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
