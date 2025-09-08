// src/ai/ai.service.ts
import {
  Injectable,
  InternalServerErrorException,
  Logger,
  BadRequestException,
} from '@nestjs/common';
import { SendPromptDto } from '../dto/ai.dto';
import { SendPromptResponse } from '../response/ai.response';
import { AIHelper } from '../helper/ai.helper';

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);
  constructor(
    private readonly aiHelper: AIHelper,
  ) {}

  async sendPrompt(body: SendPromptDto): Promise<SendPromptResponse> {
    const { prompt, model } = body;

    this.aiHelper.validateModel(model);
    this.aiHelper.validatePrompt(prompt);

    try {
      this.logger.log(`Processing request with model: ${model}`);

      const aiResponse = await this.aiHelper.getAIResponse(prompt, model);

      this.logger.log(
        `Request completed successfully. Tokens used: ${aiResponse.promptTokens + aiResponse.completionTokens}`,
      );

      return {
        id: 0,
        response: aiResponse.text,
        spent: aiResponse.spent,
      };
    } catch (error: any) {
      this.logger.error(`AI request failed: ${error.message}`, error.stack);

      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new InternalServerErrorException('Failed to get AI response');
    }
  }
}
