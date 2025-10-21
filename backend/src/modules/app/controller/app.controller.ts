import { Controller, Get } from '@nestjs/common';
import { AppService } from '../service/app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HealthResponse } from '../response/app.response';

@ApiTags('Health')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({
    summary: 'Health check',
    description:
      'Checks if the service is up and running. Returns the current status, a descriptive message, and a timestamp.',
  })
  @ApiResponse({
    status: 200,
    description: 'The service is running normally.',
    type: HealthResponse,
  })
  @ApiResponse({
    status: 500,
    description: 'The service encountered an error.',
    type: HealthResponse,
  })
  health(): HealthResponse {
    return this.appService.health();
  }
}
