import { UserWithoutPassword } from 'src/common/types/UserWithoutPassword';

export class RegisterResponse {
  user: UserWithoutPassword;
}

export class LoginResponse {
  user: UserWithoutPassword;
}
