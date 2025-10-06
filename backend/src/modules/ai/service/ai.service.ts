import {
  Injectable,
  InternalServerErrorException,
  Logger,
  BadRequestException,
} from '@nestjs/common';
import { LuckyPromptDto, SendPromptDto, SmartMergeDto } from '../dto/ai.dto';
import {
  LuckyPromptResponse,
  SendPromptResponse,
  SmartMergeResponse,
} from '../response/ai.response';
import { AIHelper } from '../helper/ai.helper';
import { Model } from '../enum/ai.enum';
import {
  LUCKY_PROMPT,
  MAX_PROMPT_LENGTH,
  SMART_MERGE_PROMPT,
} from '../constant/ai.constant';
import { SmartMergeHelper } from '../helper/smart-merge.helper';

@Injectable()
export class AiService {
  constructor(
    private readonly aiHelper: AIHelper,
    private readonly smartMergeHelper: SmartMergeHelper,
  ) {}

  async sendPrompt(body: SendPromptDto): Promise<SendPromptResponse> {
    try {
      const { prompt, model } = body;

      this.aiHelper.validateModel(model);
      this.aiHelper.validatePrompt(prompt);

      const aiResponse = await this.aiHelper.getAIResponse(prompt, model);

      return {
        response: aiResponse.text,
        spent: aiResponse.spent,
      };
    } catch (error: any) {
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

    try {
      const fullMessages = messages.map((m) => m + '\n\n').join('');
      const fullPrompt = SMART_MERGE_PROMPT(prompt).replace(
        '<<<MESSAGES_PLACEHOLDER>>>',
        fullMessages,
      );

      if (fullPrompt.length > MAX_PROMPT_LENGTH) {
        return await this.smartMergeHelper.smartMergeWithTruncation(
          messages,
          selectedModel,
          prompt,
        );
      }

      const aiResponse = await this.aiHelper.getAIResponse(
        fullPrompt,
        selectedModel,
      );
      return { response: aiResponse.text };
    } catch (error: any) {
      const is414 = this.smartMergeHelper.is414Error(error);

      if (is414) {
        return await this.smartMergeHelper.smartMergeWithTruncation(
          messages,
          selectedModel,
          prompt,
        );
      }

      throw error;
    }
  }

  async luckyPrompt(body: LuckyPromptDto): Promise<LuckyPromptResponse> {
    try {
      let prompt = body.prompt;
      let model = body.model;

      if (!prompt) {
        prompt = LUCKY_PROMPT();
      }

      model = await this.aiHelper.getRandomModel();

      this.aiHelper.validateModel(model);
      this.aiHelper.validatePrompt(prompt);

      const aiResponse = await this.aiHelper.getAIResponse(prompt, model);

      return {
        response: aiResponse.text,
        model,
      };
    } catch (error: any) {
      throw new InternalServerErrorException('Failed to get AI response');
    }
  }
}
