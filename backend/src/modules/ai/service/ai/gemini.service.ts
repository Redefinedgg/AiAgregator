import { SYSTEM_PROMPT } from '../../constant/ai.constant';
import { AIConfigService } from '../../config/ai.config'; // Changed from AIHelper
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { G4FService } from './g4f.service';
import { Model } from '../../enum/ai.enum';
import { AIResponse } from '../../type/ai.type';

@Injectable()
export class GeminiService {
  private readonly logger = new Logger(GeminiService.name);
  constructor(
    private readonly g4fService: G4FService,
    private readonly aiConfigService: AIConfigService, // Changed from aiHelper
  ) {}

  async processGeminiRequest(
    prompt: string,
    model: string,
  ): Promise<AIResponse> {
    const isfree = ['gemini_2_5_flash'].includes(model);
    try {
      const response = await this.g4fService.g4fRequest(
        model,
        prompt,
        SYSTEM_PROMPT,
      );
      const text = response;
      const promptTokens = 0;
      const completionTokens = 0;

      if (!text)
        throw new InternalServerErrorException('Empty response from Gemini');

      const { spent } = this.aiConfigService.calculateCost( // Use aiConfigService
        Model.gemini_2_5_flash,
        promptTokens,
        completionTokens,
        isfree,
      );

      return { text, promptTokens, completionTokens, spent };
    } catch (error) {
      this.logger.error(`Gemini error: ${error.message}`);
      throw new InternalServerErrorException('Gemini request failed');
    }
  }

  isGeminiModel(model: string): boolean {
    return model.startsWith('gemini');
  }
}