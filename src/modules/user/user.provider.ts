import { USER_REPOSITORY } from "./constants";
import { UserModel } from "./user.model";

export const UserProvider = [
  {
    provide: USER_REPOSITORY,
    useValue: UserModel,
  }
];
