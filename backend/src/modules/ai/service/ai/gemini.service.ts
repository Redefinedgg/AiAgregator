import { SYSTEM_PROMPT } from '../../constant/ai.constant';
import { AIConfigService } from '../../config/ai.config';
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
    private readonly aiConfigService: AIConfigService,
  ) {}

  async processGeminiRequest(
    prompt: string,
    model: string,
  ): Promise<AIResponse> {
    const isfree = ['gemini_2_5_flash'].includes(model);
    
    // DEBUG: Log sizes
    this.logger.log(`=== REQUEST SIZE DEBUG ===`);
    this.logger.log(`Prompt length: ${prompt.length}`);
    this.logger.log(`System prompt length: ${SYSTEM_PROMPT.length}`);
    this.logger.log(`Total content length: ${prompt.length + SYSTEM_PROMPT.length}`);
    this.logger.log(`Model: ${model}`);
    
    try {
      const response = await this.g4fService.g4fRequest(
        model,
        prompt,
        SYSTEM_PROMPT,
      );

      const text = response;
      const promptTokens = 0;
      const completionTokens = 0;

      if (!text) {
        throw new InternalServerErrorException('Empty response from Gemini');
      }

      const { spent } = this.aiConfigService.calculateCost(
        Model.gemini_2_5_flash,
        promptTokens,
        completionTokens,
        isfree,
      );

      return { text, promptTokens, completionTokens, spent };
    } catch (error: any) {
      this.logger.error(`Gemini error: ${error.message}`);
      this.logger.error(`Error details:`, {
        status: error?.status,
        responseStatus: error?.response?.status,
        code: error?.code,
        message: error?.message,
      });

      // Check for 414 or 431 status codes (request too large)
      const statusCode =
        error?.response?.status ||
        error?.status ||
        (error?.code === 'ERR_BAD_REQUEST' && 
         error?.message?.includes('414') ? 414 : null) ||
        (error?.code === 'ERR_BAD_REQUEST' && 
         error?.message?.includes('431') ? 431 : null);

      // Check message content for size-related errors
      const isRequestTooLarge = 
        statusCode === 414 ||
        statusCode === 431 ||
        (typeof error?.message === 'string' && 
          (error.message.includes('414') || 
           error.message.includes('431') ||
           error.message.includes('Request-URI Too Large') ||
           error.message.includes('URI Too Long') ||
           error.message.includes('Request Header Fields Too Large')));

      if (isRequestTooLarge) {
        this.logger.warn(`Request too large detected (status: ${statusCode})`);
        // Create a properly formatted error that can be caught upstream
        const err: any = new Error('Request too large (headers or URI)');
        err.status = statusCode || 414;
        err.response = { status: statusCode || 414 };
        throw err;
      }

      // For other errors, throw generic error
      throw new InternalServerErrorException('Gemini request failed');
    }
  }

  isGeminiModel(model: string): boolean {
    return model.startsWith('gemini');
  }
}