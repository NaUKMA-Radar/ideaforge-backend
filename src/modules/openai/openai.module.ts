import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ServerException } from 'src/core/exceptions/server.exception';
import { OpenAIService } from 'src/modules/openai/openai.service';
import {
  OpenAIModuleAsyncOptions,
  OpenAIModuleOptions,
} from 'src/modules/openai/types/openai.types';

@Global()
@Module({})
export class OpenAIModule {
  static register(options: OpenAIModuleOptions): DynamicModule {
    return {
      module: OpenAIModule,
      providers: [
        {
          provide: OpenAIService,
          useFactory: async () => new OpenAIService(options),
        },
      ],
      exports: [OpenAIService],
    };
  }

  static registerAsync(options: OpenAIModuleAsyncOptions): DynamicModule {
    const asyncProviders = this.createAsyncProviders(options);

    return {
      module: OpenAIModule,
      providers: [...asyncProviders, ...(options.extraProviders || [])],
      exports: [OpenAIService],
      global: options.global || false,
    };
  }

  private static createAsyncProviders(options: OpenAIModuleAsyncOptions): Provider[] {
    if (options.useFactory) {
      return [
        {
          provide: OpenAIService,
          useFactory: async (
            configService: ConfigService,
            ...args: any[]
          ): Promise<OpenAIService> => {
            const config = (await options.useFactory?.(configService, ...args)) || {
              openAIApiKey: '',
              openAIModel: '',
            };

            return new OpenAIService(config);
          },
          inject: options.inject || [ConfigService],
        },
      ];
    }

    if (options.useClass) {
      return [
        {
          provide: OpenAIService,
          useClass: options.useClass,
        },
      ];
    }

    if (options.useExisting) {
      return [
        {
          provide: OpenAIService,
          useExisting: options.useExisting,
        },
      ];
    }

    throw new ServerException('Invalid async options for OpenAI module were provided');
  }
}
