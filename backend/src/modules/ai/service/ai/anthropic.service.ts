import { Injectable } from '@nestjs/common';
import { AIResponse } from '../../type/ai.type';
import { InternalServerErrorException } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { SYSTEM_PROMPT } from '../../constant/ai.constant';
import { AIConfigService } from '../../config/ai.config'; // Changed from AIHelper

@Injectable()
export class AnthropicService {
  private readonly logger = new Logger(AnthropicService.name); // Fixed logger name
  constructor(
    private readonly aiConfigService: AIConfigService, // Changed from aiHelper
  ) {}

  isAnthropicModel(model: string): boolean {
    return model.startsWith('claude');
  }

  async processAnthropicRequest(
    prompt: string,
    model: string,
  ): Promise<AIResponse> {
    const isfree = [''].includes(model);
    try {
      const response = await this.aiConfigService.anthropic.messages.create({ // Use aiConfigService.anthropic
        model,
        system: SYSTEM_PROMPT,
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 4096,
        temperature: 0.1,
      });

      const text =
        response.content[0]?.type === 'text' ? response.content[0].text : '';
      const promptTokens = response.usage?.input_tokens ?? 0;
      const completionTokens = response.usage?.output_tokens ?? 0;

      if (!text) {
        throw new InternalServerErrorException('Empty response from Anthropic');
      }

      const { spent } = this.aiConfigService.calculateCost( // Use aiConfigService
        model,
        promptTokens,
        completionTokens,
        isfree,
      );

      return {
        text,
        promptTokens,
        completionTokens,
        spent,
      };
    } catch (error: any) {
      this.logger.error(`Anthropic API error: ${error.message}`);
      throw new InternalServerErrorException(
        `Anthropic request failed: ${error.message}`,
      );
    }
  }
}