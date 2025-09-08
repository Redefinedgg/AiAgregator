import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class G4FService {
  private readonly logger = new Logger(G4FService.name); // Move logger to property

  constructor() {} // Empty constructor

  async g4fRequest(model: string, prompt: string, system_prompt: string) {
    if (model == 'gemini_2_5_flash') model = 'gemini';
    if (!process.env.POLLINATIONS_AI_KEY) {
      throw new InternalServerErrorException(
        'POLLINATIONS_AI_KEY is not configured',
      );
    }
    try {
      let config = {
        headers: {
          Authorization: `Bearer ${process.env.POLLINATIONS_AI_KEY}`,
        },
      };
      const response = await axios.get(
        `https://text.pollinations.ai/${prompt}?model=${model}&system=${system_prompt}`,
        config,
      );
      const text = response.data;
      return text;
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(
        `G4F request failed: ${error.message}`,
      );
    }
  }
}