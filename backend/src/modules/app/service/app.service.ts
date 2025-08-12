import { Injectable } from '@nestjs/common';
import { HealthResponse } from '../response/app.response';

@Injectable()
export class AppService {
  health(): HealthResponse {
    try {
      return {
        status: 'ok',
        message: 'AIA-BE is running',
        timestamp: new Date(),
      };
    } catch (error: any) {
      return {
        status: 'error',
        message: error.message,
        timestamp: new Date(),
      };
    }
  }
}
