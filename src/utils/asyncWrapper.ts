import { NextFunction, Request, Response } from "express";

type RouteHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

type AsyncWrapper = (handler: RouteHandler) => RouteHandler;

export const asyncWrapper: AsyncWrapper =
  (handler) => async (req, res, next) => {
    try {
      await handler(req, res, next);
    } catch (error) {
      next(error);
    }
  };
