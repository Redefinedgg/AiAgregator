// src/ai/ai.service.ts
import {
  Injectable,
  InternalServerErrorException,
  Logger,
  BadRequestException,
} from '@nestjs/common';
import { SendPromptDto, SmartMergeDto } from '../dto/ai.dto';
import {
  SendPromptResponse,
  SmartMergeResponse,
} from '../response/ai.response';
import { AIHelper } from '../helper/ai.helper';
import { Model } from '../enum/ai.enum';

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);
  constructor(private readonly aiHelper: AIHelper) {}

  async sendPrompt(body: SendPromptDto): Promise<SendPromptResponse> {
    try {
      const { prompt, model } = body;

      this.aiHelper.validateModel(model);
      this.aiHelper.validatePrompt(prompt);
      this.logger.log(`Processing request with model: ${model}`);

      const aiResponse = await this.aiHelper.getAIResponse(prompt, model);

      this.logger.log(
        `Request completed successfully. Tokens used: ${aiResponse.promptTokens + aiResponse.completionTokens}`,
      );

      return {
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

  async smartMerge(body: SmartMergeDto): Promise<SmartMergeResponse> {
    try {
      const { prompt, model, messages } = body;

      this.aiHelper.validateModel(model || Model.gemini_2_5_flash);
      this.aiHelper.validatePrompt(prompt);

      const smartMergePrompt = `You are an AI assistant specialized in information synthesis. 
                                Your overall task: ${prompt}
                                You will be given multiple inputs (responses, summaries, or texts) from different sources. 
                                Your task is to merge them into a single, coherent, well-structured output that:  
                                - Eliminates redundancy and contradictions.  
                                - Preserves all unique, important, and complementary information.  
                                - Uses clear and consistent style and terminology.  
                                - Structures the result logically (introduction → main points → conclusion if applicable).  
                                
                                Inputs:  
                                <<<${messages.map((message) => message + '\n\n').join('')}}>>>  
                                
                                Final Answer (merged, polished, human-readable, according to the task above):
                                `;

      console.log(smartMergePrompt);

      const aiResponse = await this.aiHelper.getAIResponse(
        smartMergePrompt,
        model || Model.gemini_2_5_flash,
      );

      return {
        response: aiResponse.text,
      };
    } catch (error: any) {
      throw error;
    }
  }
}
