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
  
  // Maximum safe prompt length for G4F/Gemini (accounting for headers)
  private readonly MAX_PROMPT_LENGTH = 3000;
  
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
    const { prompt, model, messages } = body;
    const selectedModel = model || Model.gemini_2_5_flash;
    
    this.aiHelper.validateModel(selectedModel);
    this.aiHelper.validatePrompt(prompt);

    // Build the prompt
    const basePromptTemplate = `You are an AI assistant specialized in information synthesis.
Your overall task: ${prompt}

You will be given multiple inputs (responses, summaries, or texts) from different sources.
Your task is to merge them into a single, coherent, well-structured output that:
- Eliminates redundancy and contradictions.
- Preserves all unique, important, and complementary information.
- Uses clear and consistent style and terminology.
- Structures the result logically (introduction → main points → conclusion if applicable).

Inputs:
<<<MESSAGES_PLACEHOLDER>>>

Final Answer (merged, polished, human-readable, according to the task above):`;

    try {
      // Try with full messages first
      const fullMessages = messages.map((m) => m + '\n\n').join('');
      const fullPrompt = basePromptTemplate.replace('<<<MESSAGES_PLACEHOLDER>>>', fullMessages);
      
      this.logger.log(`Initial smartMergePrompt length: ${fullPrompt.length}`);

      // If prompt is too long, truncate preemptively
      if (fullPrompt.length > this.MAX_PROMPT_LENGTH) {
        this.logger.warn(`Prompt exceeds ${this.MAX_PROMPT_LENGTH} chars, truncating preemptively`);
        return await this.smartMergeWithTruncation(messages, selectedModel, basePromptTemplate);
      }

      const aiResponse = await this.aiHelper.getAIResponse(fullPrompt, selectedModel);
      return { response: aiResponse.text };
      
    } catch (error: any) {
      // Check if it's a 414 error
      const is414 = this.is414Error(error);
      
      if (is414) {
        this.logger.warn('414 error detected, retrying with truncated prompt');
        return await this.smartMergeWithTruncation(messages, selectedModel, basePromptTemplate);
      }

      this.logger.error(`smartMerge error: ${error.message}`, error.stack);
      throw error;
    }
  }

  private is414Error(error: any): boolean {
    return (
      error?.status === 414 ||
      error?.response?.status === 414 ||
      (typeof error?.message === 'string' && 
        (error.message.includes('414') || 
         error.message.toLowerCase().includes('request') && 
         error.message.toLowerCase().includes('too long')))
    );
  }

  private async smartMergeWithTruncation(
    messages: string[],
    selectedModel: Model,
    basePromptTemplate: string,
  ): Promise<SmartMergeResponse> {
    // Calculate available space for messages
    const templateWithoutMessages = basePromptTemplate.replace('<<<MESSAGES_PLACEHOLDER>>>', '');
    const availableSpace = this.MAX_PROMPT_LENGTH - templateWithoutMessages.length - 200; // 200 char safety buffer

    // Intelligently truncate messages
    const truncatedMessages = this.truncateMessages(messages, availableSpace);
    
    const truncatedPrompt = basePromptTemplate.replace(
      '<<<MESSAGES_PLACEHOLDER>>>',
      truncatedMessages
    );

    this.logger.log(`Fallback prompt length: ${truncatedPrompt.length}`);

    const aiResponse = await this.aiHelper.getAIResponse(truncatedPrompt, selectedModel);
    return { response: aiResponse.text };
  }

  private truncateMessages(messages: string[], maxLength: number): string {
    if (messages.length === 0) return '';

    // Strategy: Try to include as many complete messages as possible
    // If we can't fit all, truncate each proportionally
    const separator = '\n\n';
    let result: string[] = [];
    let currentLength = 0;

    // First pass: try to fit complete messages
    for (const msg of messages) {
      const msgWithSep = msg + separator;
      if (currentLength + msgWithSep.length <= maxLength) {
        result.push(msg);
        currentLength += msgWithSep.length;
      } else {
        break;
      }
    }

    // If we got all messages, return them
    if (result.length === messages.length) {
      return result.join(separator);
    }

    // If we couldn't fit any complete message, or need to include more
    // Truncate each message proportionally
    if (result.length < messages.length) {
      const perMessageLength = Math.floor(maxLength / messages.length) - separator.length;
      
      if (perMessageLength > 100) { // Minimum 100 chars per message to be useful
        result = messages.map(m => {
          if (m.length <= perMessageLength) return m;
          return m.slice(0, perMessageLength) + '...';
        });
      } else {
        // If even proportional doesn't work, just take first N messages
        result = messages.slice(0, Math.max(1, result.length));
      }
    }

    const finalResult = result.join(separator);
    
    // Final safety check
    if (finalResult.length > maxLength) {
      return finalResult.slice(0, maxLength - 3) + '...';
    }

    return finalResult;
  }
}