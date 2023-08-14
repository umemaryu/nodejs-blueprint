import { inject, injectable } from "inversify";

import { TYPES } from "~/di/types";
import { User } from "~/externalPlatform1/model/user";
import { UserRepository } from "~/externalPlatform1/service/userRepository";
import { UserService } from "~/externalPlatform1/service/userService";

@injectable()
export class UserServiceImpl implements UserService {
  private userRepo: UserRepository;

  constructor(
    @inject(TYPES.UserRepository)
    userRepo: UserRepository
  ) {
    this.userRepo = userRepo;
  }

  public getUser(): User {
    return this.userRepo.findUser();
  }
}
