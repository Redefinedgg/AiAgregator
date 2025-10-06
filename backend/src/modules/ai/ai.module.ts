import { Module } from '@nestjs/common';
import { AiController } from './controller/ai.controller';
import { AiService } from './service/ai.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { AIHelper } from './helper/ai.helper';
import { OpenAIService } from './service/ai/openAI.service';
import { AnthropicService } from './service/ai/anthropic.service';
import { DeepSeekService } from './service/ai/deepseek.service';
import { QwenService } from './service/ai/qwen.service';
import { LlamaService } from './service/ai/llama.service';
import { GeminiService } from './service/ai/gemini.service';
import { G4FService } from './service/ai/g4f.service'; // Add this import
import { AIConfigService } from './config/ai.config';
import { SmartMergeHelper } from './helper/smart-merge.helper';

@Module({
  imports: [PrismaModule],
  controllers: [AiController],
  providers: [
    AIConfigService, // Should be first (no dependencies)
    G4FService, // Add this - it's used by multiple services
    OpenAIService,
    AnthropicService,
    DeepSeekService,
    QwenService,
    LlamaService,
    GeminiService,
    AIHelper, // Should be after all AI services (depends on them)
    AiService, // Should be last (depends on AIHelper)
    SmartMergeHelper,
  ],
})
export class AiModule {}
