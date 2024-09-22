import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { ConfigVariables } from 'src/core/utils/contstants';
import { PasswordModule } from 'src/modules/password/password.module';
import { PasswordModuleOptions } from 'src/modules/password/types/password.types';
import { PrismaModule } from 'src/modules/prisma/prisma.module';
import { UserModule } from 'src/modules/user/user.module';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({
      envFilePath: [],
      isGlobal: true,
    }),
    PassportModule.registerAsync({
      useFactory: async () => ({
        session: true,
      }),
    }),
    PasswordModule.registerAsync({
      useFactory: async (configService: ConfigService): Promise<PasswordModuleOptions> => ({
        saltPrefix: configService.get<string>(ConfigVariables.UserPasswordSaltPrefix) || '',
        saltSuffix: configService.get<string>(ConfigVariables.UserPasswordSaltSuffix) || '',
        saltRounds: configService.get<number>(ConfigVariables.UserPasswordSaltRounds) || 0,
      }),
      inject: [ConfigService],
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
