export interface User {
  id: string;
  uuid: string;
  username: string;
  email: string;
  balance: number;
  avatar: string;
  role: string;

  isBlocked: boolean;
  isEmailVerified: boolean;
  lastLoginAt: Date;
  provider: string;
  providerId: string;
  updatedAt: Date;
  createdAt: Date;
}

export default User;
