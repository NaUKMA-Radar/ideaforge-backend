import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigVariables } from 'src/core/enums/app.enums';
import { AuthModule } from 'src/modules/auth/auth.module';
import { PasswordModule } from 'src/modules/password/password.module';
import { PasswordModuleOptions } from 'src/modules/password/types/password.types';
import { PrismaModule } from 'src/modules/prisma/prisma.module';
import { ProjectModule } from 'src/modules/project/project.module';
import { SupabaseModule } from 'src/modules/supabase/supabase.module';
import { SupabaseModuleOptions } from 'src/modules/supabase/types/supabase.types';
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
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>(ConfigVariables.SupabaseJwtSecret),
        signOptions: {
          audience: configService.get<string>(ConfigVariables.JwtAudience),
          issuer: configService.get<string>(ConfigVariables.JwtIssuer),
          expiresIn: configService.get<string>(ConfigVariables.JwtAccessTokenDuration),
        },
      }),
      inject: [ConfigService],
    }),
    SupabaseModule.registerAsync({
      useFactory: async (configService: ConfigService): Promise<SupabaseModuleOptions> => ({
        supabaseUrl: configService.get<string>(ConfigVariables.SupabaseUrl) || '',
        supabaseKey: configService.get<string>(ConfigVariables.SupabaseKey) || '',
        supabaseBucketName: configService.get<string>(ConfigVariables.SupabaseBucketName) || '',
        supabaseJwtSecret: configService.get<string>(ConfigVariables.SupabaseJwtSecret) || '',
      }),
      inject: [ConfigService, JwtService],
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
    AuthModule,
    ProjectModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
