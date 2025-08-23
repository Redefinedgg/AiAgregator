export interface RegisterDto {
  username: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  user: any;
  token: string;
}

export interface LoginDto {
  usernameOrEmail: string;
  password: string;
}

export interface LoginResponse {
  user: any;
  token: string;
}
