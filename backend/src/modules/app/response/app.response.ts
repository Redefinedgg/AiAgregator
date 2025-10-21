import { ApiProperty } from '@nestjs/swagger';

export class HealthResponse {
  @ApiProperty({
    example: 'ok',
    enum: ['ok', 'error'],
    description:
      'Service health status. "ok" means the service is running normally, "error" means an issue has been detected.',
  })
  status: 'ok' | 'error';

  @ApiProperty({
    example: 'AIA-BE is running',
    description:
      'Detailed status message. For "ok" it usually contains a confirmation message, for "error" it contains an error description.',
  })
  message: string | any;

  @ApiProperty({
    example: '2025-08-09T21:31:45.123Z',
    type: String,
    format: 'date-time',
    description: 'UTC timestamp when the health check response was generated.',
  })
  timestamp: Date;
}
