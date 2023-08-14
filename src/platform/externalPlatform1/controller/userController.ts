import { Request, Response } from "express";

export interface UserController {
  getUser: (req: Request, res: Response) => void;
}
