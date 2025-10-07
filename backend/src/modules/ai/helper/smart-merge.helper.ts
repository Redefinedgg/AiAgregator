import { Injectable, Logger } from '@nestjs/common';
import { AIHelper } from './ai.helper';
import { Model } from '../enum/ai.enum';
import { MAX_PROMPT_LENGTH, SMART_MERGE_PROMPT } from '../constant/ai.constant';
import { SmartMergeResponse } from '../response/ai.response';

@Injectable()
export class SmartMergeHelper {
  constructor(private readonly aiHelper: AIHelper) {}

   is414Error(error: any): boolean {
    return (
      error?.status === 414 ||
      error?.response?.status === 414 ||
      (typeof error?.message === 'string' &&
        (error.message.includes('414') ||
          (error.message.toLowerCase().includes('request') &&
            error.message.toLowerCase().includes('too long'))))
    );
  }

   async smartMergeWithTruncation(
    messages: string[],
    selectedModel: Model,
    prompt: string,
  ): Promise<SmartMergeResponse> {
    const templateWithoutMessages = SMART_MERGE_PROMPT(prompt).replace(
      '<<<MESSAGES_PLACEHOLDER>>>',
      '',
    );
    const availableSpace =
      MAX_PROMPT_LENGTH - templateWithoutMessages.length - 200;

    const truncatedMessages = this.truncateMessages(messages, availableSpace);

    const truncatedPrompt = SMART_MERGE_PROMPT(prompt).replace(
      '<<<MESSAGES_PLACEHOLDER>>>',
      truncatedMessages,
    );

    const aiResponse = await this.aiHelper.getAIResponse(
      truncatedPrompt,
      selectedModel,
    );
    return { response: aiResponse.text };
  }

   truncateMessages(messages: string[], maxLength: number): string {
    if (messages.length === 0) return '';

    const separator = '\n\n';
    let result: string[] = [];
    let currentLength = 0;

    for (const msg of messages) {
      const msgWithSep = msg + separator;
      if (currentLength + msgWithSep.length <= maxLength) {
        result.push(msg);
        currentLength += msgWithSep.length;
      } else {
        break;
      }
    }

    if (result.length === messages.length) {
      return result.join(separator);
    }

    if (result.length < messages.length) {
      const perMessageLength =
        Math.floor(maxLength / messages.length) - separator.length;

      if (perMessageLength > 100) {
        result = messages.map((m) => {
          if (m.length <= perMessageLength) return m;
          return m.slice(0, perMessageLength) + '...';
        });
      } else {
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
