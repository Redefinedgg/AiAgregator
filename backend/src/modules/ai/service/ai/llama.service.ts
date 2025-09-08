import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AIResponse } from '../../type/ai.type';
import { SYSTEM_PROMPT } from '../../constant/ai.constant';
import { AIConfigService } from '../../config/ai.config'; // Changed from AIHelper
import { Logger } from '@nestjs/common';
import { G4FService } from './g4f.service';

@Injectable()
export class LlamaService {
  private readonly logger = new Logger(LlamaService.name);
  constructor(
    private readonly g4fService: G4FService,
    private readonly aiConfigService: AIConfigService, // Changed from aiHelper
  ) {}

  isLlamaModel(model: string): boolean {
    return model.startsWith('llama');
  }

  async processLlamaRequest(
    prompt: string,
    model: string,
  ): Promise<AIResponse> {
    let isfree = ['llamascout'].includes(model);
    try {
      const response = isfree
        ? await this.g4fService.g4fRequest(model, prompt, SYSTEM_PROMPT)
        : 'Заглушка';

      const text = isfree
        ? response
        : response.data?.choices[0]?.message?.content;
      const promptTokens = isfree ? 0 : response.data?.usage?.prompt_tokens;
      const completionTokens = isfree
        ? 0
        : response.data?.usage?.completion_tokens;

      if (!text)
        throw new InternalServerErrorException('Empty response from Llama');

      const { spent } = this.aiConfigService.calculateCost( // Use aiConfigService
        'llama',
        promptTokens,
        completionTokens,
        isfree,
      );

      return { text, promptTokens, completionTokens, spent };
    } catch (error) {
      this.logger.error(`Llama API error: ${error.message}`);
      throw new InternalServerErrorException('Llama request failed');
    }
  }
}