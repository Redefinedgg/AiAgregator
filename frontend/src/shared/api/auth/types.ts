export interface RegisterDto {
  nickname: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  user: any;
  token: string;
}

export interface LoginDto {
  nicknameOrEmail: string;
  password: string;
}

export interface LoginResponse {
  user: any;
  token: string;
}
