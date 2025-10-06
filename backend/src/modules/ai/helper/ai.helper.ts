import { Injectable, Logger } from '@nestjs/common';
import { Model } from '../enum/ai.enum';
import { BadRequestException } from '@nestjs/common';
import { AIResponse } from '../type/ai.type';
import { AiService } from '../service/ai.service';
import { OpenAIService } from '../service/ai/openAI.service';
import { AnthropicService } from '../service/ai/anthropic.service';
import { QwenService } from '../service/ai/qwen.service';
import { LlamaService } from '../service/ai/llama.service';
import { GeminiService } from '../service/ai/gemini.service';
import { DeepSeekService } from '../service/ai/deepseek.service';
import { AIConfigService } from '../config/ai.config';

@Injectable()
export class AIHelper {
  private readonly logger = new Logger(AiService.name);

  constructor(
    private readonly configService: AIConfigService,
    private readonly openAIService: OpenAIService,
    private readonly anthropicService: AnthropicService,
    private readonly qwenService: QwenService,
    private readonly llamaService: LlamaService,
    private readonly geminiService: GeminiService,
    private readonly deepSeekService: DeepSeekService,
  ) {}

  validateModel(model: any): void {
    if (typeof model !== 'string') {
      throw new BadRequestException('Model must be a string');
    }
    if (!Object.values(Model).includes(model as Model)) {
      throw new BadRequestException(
        `Invalid model: ${model}. Supported models: ${Object.values(Model).join(', ')}`,
      );
    }
  }

  validatePrompt(prompt: string): void {
    if (!prompt || prompt.trim().length === 0) {
      throw new BadRequestException('Prompt cannot be empty');
    }
    if (prompt.length > 20000) {
      throw new BadRequestException('Prompt is too long');
    }
  }

  calculateCost(
    model: string,
    promptTokens: number,
    completionTokens: number,
    isfree: boolean,
  ): { spent: number } {
    return this.configService.calculateCost(
      model,
      promptTokens,
      completionTokens,
      isfree,
    );
  }

  async getAIResponse(prompt: string, model: Model): Promise<AIResponse> {
    const handlers: Record<
      string,
      (prompt: string, model: Model) => Promise<AIResponse>
    > = {
      openai: (p, m) => this.openAIService.processOpenAIRequest(p, m),
      anthropic: (p, m) => this.anthropicService.processAnthropicRequest(p, m),
      deepseek: (p, m) => this.deepSeekService.processDeepSeekRequest(p, m),
      qwen: (p, m) => this.qwenService.processQwenRequest(p, m),
      llama: (p, m) => this.llamaService.processLlamaRequest(p, m),
      gemini: (p, m) => this.geminiService.processGeminiRequest(p, m),
    };

    if (this.openAIService.isOpenAIModel(model))
      return handlers.openai(prompt, model);
    if (this.anthropicService.isAnthropicModel(model))
      return handlers.anthropic(prompt, model);
    if (this.deepSeekService.isDeepSeekModel(model))
      return handlers.deepseek(prompt, model);
    if (this.qwenService.isQwenModel(model))
      return handlers.qwen(prompt, model);
    if (this.llamaService.isLlamaModel(model))
      return handlers.llama(prompt, model);
    if (this.geminiService.isGeminiModel(model))
      return handlers.gemini(prompt, model);

    throw new BadRequestException(`Unsupported model: ${model}`);
  }

  async getModelStats(): Promise<Record<string, any>> {
    return {
      supportedModels: Object.values(Model),
      pricing: this.configService.modelPricing,
    };
  }

  async getRandomModel(
    body: {
      models?: Model[];
    } = {},
  ): Promise<Model> {
    const models = body.models || Object.values(Model);
    const randomIndex = Math.floor(Math.random() * models.length);
    return models[randomIndex];
  }
}
