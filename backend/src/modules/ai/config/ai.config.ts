import { Injectable, Logger } from '@nestjs/common';
import OpenAI from 'openai';
import Anthropic from '@anthropic-ai/sdk';
import axios, { AxiosInstance } from 'axios';
import { TokenPricing } from '../type/ai.type';
import { Model } from '../enum/ai.enum';
import {
  TOKEN_PRICES_GPT_3_5_TURBO,
  TOKEN_PRICES_GPT_4O_MINI,
  TOKEN_PRICES_CLAUDE_SONNET_4_0,
  TOKEN_PRICES_DEEPSEEK_CHAT,
} from '../constant/ai.constant';

@Injectable()
export class AIConfigService {
  private readonly logger = new Logger(AIConfigService.name);
  public readonly openai: OpenAI;
  public readonly anthropic: Anthropic;
  public readonly deepseek: AxiosInstance;
  public readonly modelPricing: Record<string, TokenPricing> = {
    [Model.gpt_3_5_turbo]: TOKEN_PRICES_GPT_3_5_TURBO,
    [Model.gpt_4o_mini]: TOKEN_PRICES_GPT_4O_MINI,
    [Model.claude_sonnet_4_0]: TOKEN_PRICES_CLAUDE_SONNET_4_0,
    [Model.deepseek_chat]: TOKEN_PRICES_DEEPSEEK_CHAT,
  };

  constructor() {
    const openaiApiKey = process.env.OPENAI_API_KEY;
    const anthropicApiKey = process.env.ANTHROPIC_API_KEY;
    const deepseekApiKey = process.env.DEEPSEEK_API_KEY;

    if (!openaiApiKey) {
      this.logger.warn('OPENAI_API_KEY is not configured');
    }
    if (!anthropicApiKey) {
      this.logger.warn('ANTHROPIC_API_KEY is not configured');
    }
    if (!deepseekApiKey) {
      this.logger.warn('DEEPSEEK_API_KEY is not configured');
    }

    this.openai = new OpenAI({
      apiKey: openaiApiKey,
    });

    this.anthropic = new Anthropic({
      apiKey: anthropicApiKey,
    });

    this.deepseek = axios.create({
      baseURL: 'https://api.deepseek.com/v1',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${deepseekApiKey}`,
      },
    });
  }

  calculateCost(
    model: string,
    promptTokens: number,
    completionTokens: number,
    isfree: boolean,
  ): { spent: number } {
    if (isfree) {
      return { spent: 0.0001 };
    }
    
    const pricing = this.modelPricing[model];
    if (!pricing) {
      this.logger.warn(`No pricing information for model: ${model}`);
      return { spent: 0 };
    }
    
    const spent = promptTokens * pricing.prompt + completionTokens * pricing.completion;
    return { spent };
  }
}