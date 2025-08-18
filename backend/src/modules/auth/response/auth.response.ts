import { UserWithoutPassword } from 'src/common/types/UserWithoutPassword';

export class RegisterResponse {
  user: UserWithoutPassword;
  token: string;
}

export class LoginResponse {
  user: UserWithoutPassword;
  token: string;
}
