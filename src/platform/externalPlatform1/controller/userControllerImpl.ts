import { Request, Response } from "express";
import { inject, injectable } from "inversify";

import { TYPES } from "~/di/types";
import { UserController } from "~/externalPlatform1/controller/userController";
import { GetUserResDTO } from "~/externalPlatform1/dto/getUserResDTO";
import { UserService } from "~/externalPlatform1/service/userService";

@injectable()
export class UserControllerImpl implements UserController {
  private service: UserService;

  constructor(@inject(TYPES.UserService) userService: UserService) {
    this.service = userService;
  }
  public getUser: (req: Request, res: Response) => void = (_, res) => {
    const lot = this.service.getUser();

    const resDTO = new GetUserResDTO(lot);
    res.send(resDTO);
  };
}
