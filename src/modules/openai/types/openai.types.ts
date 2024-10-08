import { Provider, Type } from '@nestjs/common';

export interface OpenAIModuleOptions {
  openAIApiKey: string;
  openAIModel: string;
}

export interface OpenAIOptionsFactory {
  createOpenAIOptions(): Promise<OpenAIModuleOptions> | OpenAIModuleOptions;
}

export interface OpenAIModuleAsyncOptions {
  global?: boolean;
  imports?: any[];
  useExisting?: Type<OpenAIOptionsFactory>;
  useClass?: Type<OpenAIOptionsFactory>;
  useFactory?: (...args: any[]) => Promise<OpenAIModuleOptions> | OpenAIModuleOptions;
  inject?: any[];
  extraProviders?: Provider[];
}
