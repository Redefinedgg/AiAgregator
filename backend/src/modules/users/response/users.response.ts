import { UserWithoutPassword } from "src/common/types/UserWithoutPassword";

export class GetUserByIdResponse {
  user: UserWithoutPassword;
}

export class CreateUserResponse {
  user: UserWithoutPassword;
}
