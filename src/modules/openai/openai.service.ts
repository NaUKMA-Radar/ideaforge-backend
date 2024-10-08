import { OpenAIModuleOptions } from 'src/modules/openai/types/openai.types';
import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources';

@Injectable()
export class OpenAIService {
  private readonly client: OpenAI;
  private readonly model: string;

  constructor(options: OpenAIModuleOptions) {
    this.client = new OpenAI({ apiKey: options.openAIApiKey });
    this.model = options.openAIModel;
  }

  public async ask(
    prompt: string,
    systemMessage?: string,
  ): Promise<OpenAI.Chat.Completions.ChatCompletion> {
    return this.client.chat.completions.create({
      messages: [
        { role: 'user', content: prompt },
        ...(systemMessage
          ? [{ role: 'system', content: systemMessage } as ChatCompletionMessageParam]
          : []),
      ],
      model: this.model,
    });
  }
}
