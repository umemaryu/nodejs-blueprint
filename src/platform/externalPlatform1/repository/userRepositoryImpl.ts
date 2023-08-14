import { injectable } from "inversify";

import { User } from "~/externalPlatform1/model/user";
import { UserRepository } from "~/externalPlatform1/service/userRepository";

const userData = [
  { id: 0, name: "John" },
  { id: 1, name: "Michel" },
];

@injectable()
export class UserRepositoryImpl implements UserRepository {
  public findUser(): User {
    return userData[0];
  }
}
