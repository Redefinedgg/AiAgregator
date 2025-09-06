import User from "@/shared/types/User";

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

export interface UpdateUserDto {
  username?: string;
  email?: string;
  balance?: number;
  password?: string;
}

export interface MeResponse {
  user: any;
}
