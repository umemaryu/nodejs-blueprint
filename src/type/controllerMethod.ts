import { Request, Response } from "express";

export type ControllerMethod = (req: Request, res: Response) => Promise<void>;
