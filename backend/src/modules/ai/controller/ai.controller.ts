// src/modules/ai/controller/ai.controller.ts

import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AiService } from '../service/ai.service';
import { SendPromptDto, SmartMergeDto, LuckyPromptDto } from '../dto/ai.dto';
import { SendPromptResponse, SmartMergeResponse, LuckyPromptResponse } from '../response/ai.response';
import { JwtAuthGuard } from 'src/modules/auth/guard/jwt-auth.guard';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) { }

  @UseGuards(JwtAuthGuard)
  @Post('send-prompt')
  async sendPrompt(@Body() body: SendPromptDto): Promise<SendPromptResponse> {
    return this.aiService.sendPrompt(body);
  }

  @UseGuards(JwtAuthGuard)
  @Post('smart-merge')
  async smartMerge(@Body() body: SmartMergeDto): Promise<SmartMergeResponse> {
    return this.aiService.smartMerge(body);
  }

  @UseGuards(JwtAuthGuard)
  @Post('lucky-prompt')
  async luckyPrompt(@Body() body: LuckyPromptDto): Promise<LuckyPromptResponse> {
    return this.aiService.luckyPrompt(body);
  }
}
