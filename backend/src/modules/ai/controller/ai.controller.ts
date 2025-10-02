// src/modules/ai/controller/ai.controller.ts

import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AiService } from '../service/ai.service';
import { SendPromptDto } from '../dto/ai.dto';
import { SendPromptResponse } from '../response/ai.response';
import { JwtAuthGuard } from 'src/modules/auth/guard/jwt-auth.guard';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) { }

  @UseGuards(JwtAuthGuard)
  @Post('send-prompt')
  async sendPrompt(@Body() body: SendPromptDto): Promise<SendPromptResponse> {
    return this.aiService.sendPrompt(body);
  }
}
