// src/modules/ai/controller/ai.controller.ts

import { Controller, Post, Body } from '@nestjs/common';
import { AiService } from '../service/ai.service';
import { SendPromptDto, SendPromptsDto } from '../dto/ai.dto';
import { SendPromptResponse, SendPromptsResponse } from '../response/ai.response';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('send-prompt')
  async sendPrompt(@Body() body: SendPromptDto): Promise<SendPromptResponse> {
    return this.aiService.sendPrompt(body);
  }

  @Post('send-prompts')
  async sendPrompts(@Body() body: SendPromptsDto): Promise<SendPromptsResponse> {
    return this.aiService.sendPrompts(body);
  } 
}
