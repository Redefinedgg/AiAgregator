import { UserWithoutPassword } from "src/common/types/UserWithoutPassword";

export class GetUserResponse {
  user: UserWithoutPassword;
}

export class CreateUserResponse {
  user: UserWithoutPassword;
}

export class GetMeResponse {
  user: UserWithoutPassword;
}
