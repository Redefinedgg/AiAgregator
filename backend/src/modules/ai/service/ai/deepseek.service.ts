import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AIResponse } from '../../type/ai.type';
import { Model } from '../../enum/ai.enum';
import { SYSTEM_PROMPT } from '../../constant/ai.constant';
import { TOKEN_PRICES_DEEPSEEK_CHAT } from '../../constant/ai.constant';
import { AIConfigService } from '../../config/ai.config'; // Changed from AIHelper
import { Logger } from '@nestjs/common';
import { TokenPricing } from '../../type/ai.type';
import { G4FService } from './g4f.service';

@Injectable()
export class DeepSeekService {
  private readonly logger = new Logger(DeepSeekService.name); // Fixed logger name

  constructor(
    private readonly aiConfigService: AIConfigService, // Changed from aiHelper
    private readonly g4fService: G4FService,
  ) {}

  isDeepSeekModel(model: string): boolean {
    return model.startsWith('deepseek');
  }

  async processDeepSeekRequest(
    prompt: string,
    model: string,
  ): Promise<AIResponse> {
    let isfree = ['deepseek-reasoning'].includes(model);
    try {
      const response = isfree
        ? await this.g4fService.g4fRequest(model, prompt, SYSTEM_PROMPT)
        : await this.aiConfigService.deepseek.post('/chat/completions', { // Use aiConfigService.deepseek
            model: Model.deepseek_chat,
            messages: [
              { role: 'system', content: SYSTEM_PROMPT },
              { role: 'user', content: prompt },
            ],
            max_tokens: TOKEN_PRICES_DEEPSEEK_CHAT.maxOutput,
          });

      const text = isfree
        ? response
        : response.data.choices[0]?.message?.content;
      const promptTokens = isfree ? 0 : response.data.usage?.prompt_tokens;
      const completionTokens = isfree
        ? 0
        : response.data.usage?.completion_tokens;

      if (!text)
        throw new InternalServerErrorException('Empty response from DeepSeek');

      const { spent } = this.aiConfigService.calculateCost( // Use aiConfigService
        Model.deepseek_chat,
        promptTokens,
        completionTokens,
        isfree,
      );

      return { text, promptTokens, completionTokens, spent };
    } catch (error) {
      this.logger.error(`DeepSeek API error: ${error.message}`);
      throw new InternalServerErrorException('DeepSeek request failed');
    }
  }
}