import { User } from "~/externalPlatform1/model/user";

export interface UserService {
  getUser(): User;
}
