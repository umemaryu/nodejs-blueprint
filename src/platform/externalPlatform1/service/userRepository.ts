import { User } from "~/externalPlatform1/model/user";

export interface UserRepository {
  findUser(): User;
}
