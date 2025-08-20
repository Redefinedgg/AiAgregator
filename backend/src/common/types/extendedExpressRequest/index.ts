import { Request as ExpressRequest } from 'express';

export interface UserRequest extends ExpressRequest {
  user: { uuid: string; };
}