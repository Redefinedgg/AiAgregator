import { UserWithoutPassword } from "src/common/types/UserWithoutPassword";
import { User } from "@prisma/client";

export class GetUserResponse {
  user: UserWithoutPassword;
}

export class CreateUserResponse {
  user: UserWithoutPassword;
}

export class GetMeResponse {
  user: User;
}
