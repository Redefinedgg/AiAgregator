import { Injectable } from '@nestjs/common';
import { AIResponse } from '../../type/ai.type';
import { OpenAI } from 'openai';
import { AIConfigService } from '../../config/ai.config'; // Changed from AIHelper
import { Logger } from '@nestjs/common';
import { InternalServerErrorException } from '@nestjs/common';
import { SYSTEM_PROMPT } from '../../constant/ai.constant';
import { G4FService } from './g4f.service';

@Injectable()
export class OpenAIService {
  private readonly logger = new Logger(OpenAIService.name);
  constructor(
    private readonly aiConfigService: AIConfigService, // Changed from aiHelper
    private readonly g4fService: G4FService,
  ) {}

  isOpenAIModel(model: string): boolean {
    return model.startsWith('gpt') || model.startsWith('openai');
  }

  async processOpenAIRequest(
    prompt: string,
    model: string,
  ): Promise<AIResponse> {
    let isfree = ['gpt-5-nano', 'openai-large'].includes(model);
    
    try {
      const response = isfree
        ? await this.g4fService.g4fRequest(model, prompt, SYSTEM_PROMPT)
        : await this.aiConfigService.openai.chat.completions.create({ // Use aiConfigService.openai
            model,
            messages: [
              { role: 'system', content: SYSTEM_PROMPT },
              { role: 'user', content: prompt },
            ],
            temperature: 0.1,
            max_tokens: 4096,
          });

      const text = isfree ? response : response.choices[0]?.message?.content;
      const promptTokens = isfree ? 0 : response.usage?.prompt_tokens;
      const completionTokens = isfree ? 0 : response.usage?.completion_tokens;

      if (!text) {
        throw new InternalServerErrorException('Empty response from OpenAI');
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
      this.logger.error(`OpenAI API error: ${error.message}`);
      throw new InternalServerErrorException(
        `OpenAI request failed: ${error.message}`,
      );
    }
  }
}