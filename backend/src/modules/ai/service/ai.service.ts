// src/ai/ai.service.ts
import {
  Injectable,
  InternalServerErrorException,
  Logger,
  BadRequestException,
  Header,
} from '@nestjs/common';
import { OpenAI } from 'openai';
import Anthropic from '@anthropic-ai/sdk';
import { SendPromptDto, SendPromptsDto } from '../dto/ai.dto';
import {
  SendPromptResponse,
  SendPromptsResponse,
} from '../response/ai.response';
import {
  SYSTEM_PROMPT,
  TOKEN_PRICES_CLAUDE_SONNET_4_0,
  TOKEN_PRICES_DEEPSEEK_CHAT,
  TOKEN_PRICES_GPT_3_5_TURBO,
  TOKEN_PRICES_GPT_4O_MINI,
} from '../constant/ai.constant';
import { Model } from '../enum/ai.enum';
import { TokenPricing, AIResponse } from '../type/ai.type';
import axios, { AxiosInstance } from 'axios';

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);
  private readonly openai: OpenAI;
  private readonly anthropic: Anthropic;
  private readonly deepseek: AxiosInstance;

  private readonly modelPricing: Record<string, TokenPricing> = {
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

  async sendPrompts(body: SendPromptsDto): Promise<SendPromptsResponse> {
    const responses = await Promise.all(
      body.models.map((model) =>
        this.sendPrompt({ prompt: body.prompt, model }),
      ),
    );
    const spent = responses.reduce((acc, response) => acc + response.spent, 0);
    return { responses, spent };
  }

  async sendPrompt(body: SendPromptDto): Promise<SendPromptResponse> {
    const { prompt, model } = body;

    this.validateModel(model);
    this.validatePrompt(prompt);

    try {
      this.logger.log(`Processing request with model: ${model}`);

      const aiResponse = await this.getAIResponse(prompt, model);

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

  private validateModel(model: string): void {
    if (!Object.values(Model).includes(model as Model)) {
      throw new BadRequestException(
        `Invalid model: ${model}. Supported models: ${Object.values(Model).join(', ')}`,
      );
    }
  }

  private validatePrompt(prompt: string): void {
    if (!prompt || prompt.trim().length === 0) {
      throw new BadRequestException('Prompt cannot be empty');
    }

    if (prompt.length > 20000) {
      throw new BadRequestException('Prompt is too long');
    }
  }

  private async getAIResponse(
    prompt: string,
    model: Model,
  ): Promise<AIResponse> {
    if (this.isOpenAIModel(model)) {
      return this.processOpenAIRequest(prompt, model);
    } else if (this.isAnthropicModel(model)) {
      return this.processAnthropicRequest(prompt, model);
    } else if (this.isDeepSeekModel(model)) {
      return this.processDeepSeekRequest(prompt, model);
    } else if (this.isQwenModel(model)) {
      return this.processQwenRequest(prompt, model); 
    } else if (this.isLlamaModel(model)) {
      return this.processLlamaRequest(prompt, model); 
    } else if (this.isGeminiModel(model)) {
      return this.processGeminiRequest(prompt, model); 
    } else {
      throw new BadRequestException(`Unsupported model: ${model}`);
    }
  }


  private async processGeminiRequest(prompt: string, model:string): Promise<AIResponse> {
    const isfree = ['gemini_2_5_flash'].includes(model)
    try {
    
      const response = await this.g4fRequest(model, prompt, SYSTEM_PROMPT)

      const text = response;
      const promptTokens = 0;
      const completionTokens = 0;

      if (!text)
        throw new InternalServerErrorException('Empty response from Gemini');

      const { spent } = this.calculateCost(
        Model.gemini_2_5_flash,
        promptTokens,
        completionTokens,
        isfree
      );

      return { text, promptTokens, completionTokens, spent };
    } catch(error) {
      this.logger.error(`Gemini error: ${error.message}`);
      throw new InternalServerErrorException('Gemini request failed');
    }
  }

  private isGeminiModel(model: string): boolean {
    return model.startsWith('gemini');
  }


  private async processDeepSeekRequest(prompt: string, model:string): Promise<AIResponse> {
    let isfree = ['deepseek-reasoning'].includes(model)
    try {
      const response = isfree ? await this.g4fRequest(model, prompt, SYSTEM_PROMPT): await this.deepseek.post('/chat/completions', {
        model: Model.deepseek_chat,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: prompt },
        ],
        max_tokens: TOKEN_PRICES_DEEPSEEK_CHAT.maxOutput,
      });
      
    
      const text = isfree ? response : response.data.choices[0]?.message?.content;
      const promptTokens = isfree ? 0 : response.data.usage?.prompt_tokens;
      const completionTokens = isfree ? 0 : response.data.usage?.completion_tokens;

      if (!text)
        throw new InternalServerErrorException('Empty response from DeepSeek');

    
      const { spent } = this.calculateCost(
        Model.deepseek_chat,
        promptTokens,
        completionTokens,
        isfree
      );
    
      

      return { text, promptTokens, completionTokens, spent };

    } catch (error) {
      this.logger.error(`DeepSeek API error: ${error.message}`);
      throw new InternalServerErrorException('DeepSeek request failed');
    }
  }
  
  private async processQwenRequest(prompt:string, model:string): Promise<AIResponse> {
    let isfree = ['qwen-coder'].includes(model)
    try {
      const response = isfree ? await this.g4fRequest(model, prompt, SYSTEM_PROMPT) : "Заглушка";

      const text = isfree ? response : response.data.choices[0]?.message?.content;
      const promptTokens = isfree ? 0 : response.data.usage?.prompt_tokens;
      const completionTokens = isfree ? 0 : response.data.usage?.completion_tokens;
      if (!text)
        throw new InternalServerErrorException('Empty response from DeepSeek');

      const { spent } = this.calculateCost(
        "qwen",
        promptTokens,
        completionTokens,
        isfree
      );

      return { text, promptTokens, completionTokens, spent };
    } catch (error) {
      this.logger.error(`QWEN API error: ${error.message}`);
      throw new InternalServerErrorException('QWEN request failed');
    }
  }

  private async processLlamaRequest(prompt:string, model:string): Promise<AIResponse> {
    let isfree = ['llamascout'].includes(model)
    try {
      const response = isfree ? await this.g4fRequest(model, prompt, SYSTEM_PROMPT) : "Заглушка";

      const text = isfree ? response : response.data.choices[0]?.message?.content;
      const promptTokens = isfree ? 0 : response.data.usage?.prompt_tokens;
      const completionTokens = isfree ? 0 : response.data.usage?.completion_tokens;
      if (!text)
        throw new InternalServerErrorException('Empty response from DeepSeek');

      const { spent } = this.calculateCost(
        "llama",
        promptTokens,
        completionTokens,
        isfree
      );

      return { text, promptTokens, completionTokens, spent };
    } catch (error) {
      this.logger.error(`Llama API error: ${error.message}`);
      throw new InternalServerErrorException('Llama request failed');
    }
  }

  private isOpenAIModel(model: string): boolean {
    return model.startsWith('gpt') || model.startsWith('openai');
  }

  private isAnthropicModel(model: string): boolean {
    return model.startsWith('claude');
  }

  private isDeepSeekModel(model: string): boolean {
    return model.startsWith('deepseek');
  }
  private isQwenModel(model: string): boolean {
    return model.startsWith('qwen');
  }
  private isLlamaModel(model:string):boolean {
    return model.startsWith('llama')
  }

  private async g4fRequest(model:string, prompt:string, system_prompt: string) {
    if (model == "gemini_2_5_flash")
      model = "gemini"
    try {
      let config = {
        headers: {
          Authorization: "Bearer Ke6niUXgcrOYrZBi"
        }
      }

      const response = await axios.get(`https://text.pollinations.ai/${prompt}?model=${model}&system=${system_prompt}`, config)
      const text = response.data

      return text
    } catch(error) {
      this.logger.error(error.message)
      throw new InternalServerErrorException(
        `G4F request failed: ${error.message}`,
      );
    }
    
  }

  private async processOpenAIRequest(
    prompt: string,
    model: string,
  ): Promise<AIResponse> {
    let isfree = ['gpt-5-nano', 'openai-large'].includes(model);
    try {

      const response = isfree ? await this.g4fRequest(model, prompt, SYSTEM_PROMPT) : await this.openai.chat.completions.create({
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
      const completionTokens = isfree? 0 : response.usage?.completion_tokens;


      if (!text) {
        throw new InternalServerErrorException('Empty response from OpenAI');
      }

      
      const { spent } = this.calculateCost(
        model,
        promptTokens,
        completionTokens,
        isfree
      );

      return {
        text,
        promptTokens,
        completionTokens,
        spent
      };

    } catch (error: any) {
      this.logger.error(`OpenAI API error: ${error.message}`);
      throw new InternalServerErrorException(
        `OpenAI request failed: ${error.message}`,
      );
    }
  }

  private async processAnthropicRequest(
    prompt: string,
    model: string,
  ): Promise<AIResponse> {
    const isfree = [''].includes(model)  
    try {
      const response = await this.anthropic.messages.create({
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

      const { spent } =  this.calculateCost(
        model,
        promptTokens,
        completionTokens,
        isfree
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

  private calculateCost(
    model: string,
    promptTokens: number,
    completionTokens: number,
    isfree: boolean
  ): { spent: number } {
    let pricing: TokenPricing;
    if (isfree) {
      return {spent:0.0001};
    } else{
      pricing = this.modelPricing[model];
      const spent = 
      promptTokens * pricing.prompt + completionTokens * pricing.completion;
      return { spent };
    }
    
  }

  // Метод для получения статистики использования (может быть полезен)
  async getModelStats(): Promise<Record<string, any>> {
    return {
      supportedModels: Object.values(Model),
      pricing: this.modelPricing,
    };
  }
}