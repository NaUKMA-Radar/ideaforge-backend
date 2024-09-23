import { Body, Controller, Get, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { JwtRefreshAuthGuard } from './guards/jwt-refresh-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ConfigVariables, Routes, UserRegistrationMethods } from 'src/core/enums/app.enums';
import { RoutesApiTags } from 'src/core/constants';
import { UserPublicEntity } from 'src/modules/user/entities/user-public.entity';
import { CreateUserDto } from 'src/modules/user/DTO/create-user.dto';
import { LoginDto } from 'src/modules/auth/DTO/login.dto';
import { ConfigService } from '@nestjs/config';
import { Auth } from 'src/core/decorators/auth.decorator';
import {
  LoginResponse,
  RefreshResponse,
  RegisterResponse,
} from 'src/modules/auth/types/auth.types';

@ApiTags(RoutesApiTags[Routes.Auth])
@Controller(Routes.Auth)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Auth(JwtAuthGuard)
  @ApiOkResponse({ description: 'The authenticated user.', type: UserPublicEntity })
  @ApiUnauthorizedResponse({ description: 'The user is unauthorized.' })
  @ApiForbiddenResponse({ description: 'The user is forbidden to perform this action.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error was occured.' })
  @Get('/user')
  public async user(@Req() request: Request): Promise<Express.User | undefined> {
    return request.user;
  }

  @ApiCreatedResponse({ description: 'User was successfully registered.', type: UserPublicEntity })
  @ApiConflictResponse({ description: 'Cannot register the user. Invalid data was provided.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error was occured.' })
  @Post('/register')
  public async register(
    @Body() createUserDto: CreateUserDto,
    @Res() response: Response,
  ): Promise<Response<RegisterResponse>> {
    const user = await this.authService.register(createUserDto);

    return response
      .status(HttpStatus.CREATED)
      .cookie(
        this.configService.get<string>(ConfigVariables.CookieAccessTokenName) ||
          'Ideaforge-Access-Token',
        user.accessToken,
        {
          httpOnly: true,
          domain: this.configService.get<string>(ConfigVariables.CookieDomain),
        },
      )
      .cookie(
        this.configService.get<string>(ConfigVariables.CookieRefreshTokenName) ||
          'Ideaforge-Refresh-Token',
        user.refreshToken,
        {
          httpOnly: true,
          domain: this.configService.get<string>(ConfigVariables.CookieDomain),
        },
      )
      .json(user);
  }

  @ApiCreatedResponse({ description: 'User was successfully logged in.', type: UserPublicEntity })
  @ApiUnauthorizedResponse({ description: 'Cannot log in the user.' })
  @ApiConflictResponse({ description: 'Cannot log in the user. Invalid data was provided.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error was occured.' })
  @Post('/login')
  public async login(
    @Body() loginDto: LoginDto,
    @Res() response: Response,
  ): Promise<Response<LoginResponse>> {
    const user = await this.authService.login(loginDto);

    return response
      .status(HttpStatus.CREATED)
      .cookie(
        this.configService.get<string>(ConfigVariables.CookieAccessTokenName) ||
          'Ideaforge-Access-Token',
        user.accessToken,
        {
          httpOnly: true,
          domain: this.configService.get<string>(ConfigVariables.CookieDomain),
        },
      )
      .cookie(
        this.configService.get<string>(ConfigVariables.CookieRefreshTokenName) ||
          'Ideaforge-Refresh-Token',
        user.refreshToken,
        {
          httpOnly: true,
          domain: this.configService.get<string>(ConfigVariables.CookieDomain),
        },
      )
      .json(user);
  }

  @Auth(JwtRefreshAuthGuard)
  @ApiCreatedResponse({
    description: 'User refresh and access tokens were successfully updated.',
    type: UserPublicEntity,
  })
  @ApiUnauthorizedResponse({ description: 'The user is unauthorized.' })
  @ApiForbiddenResponse({ description: 'The user is forbidden to perform this action.' })
  @ApiConflictResponse({
    description: "Cannot update user's refresh and access tokens. Invalid data was provided.",
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error was occured.' })
  @Post('/refresh')
  public async refresh(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<Response<RefreshResponse>> {
    const { accessToken, refreshToken } = await this.authService.refresh({
      refreshToken:
        request.cookies[
          this.configService.get<string>(ConfigVariables.CookieRefreshTokenName) ||
            'Ideaforge-Refresh-Token'
        ],
    });

    return response
      .status(HttpStatus.CREATED)
      .cookie(
        this.configService.get<string>(ConfigVariables.CookieAccessTokenName) ||
          'Ideaforge-Access-Token',
        accessToken,
        {
          httpOnly: true,
          domain: this.configService.get<string>(ConfigVariables.CookieDomain),
        },
      )
      .cookie(
        this.configService.get<string>(ConfigVariables.CookieRefreshTokenName) ||
          'Ideaforge-Refresh-Token',
        refreshToken,
        {
          httpOnly: true,
          domain: this.configService.get<string>(ConfigVariables.CookieDomain),
        },
      )
      .json({ accessToken, refreshToken });
  }

  @Auth(JwtAuthGuard)
  @ApiCreatedResponse({
    description: 'The user was successfully logged out.',
    type: UserPublicEntity,
  })
  @ApiUnauthorizedResponse({ description: 'The user is unauthorized.' })
  @ApiForbiddenResponse({ description: 'The user is forbidden to perform this action.' })
  @ApiConflictResponse({ description: 'Cannot log out the user. Invalid data was provided.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error was occured.' })
  @Post('/logout')
  public async logout(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<Response<UserPublicEntity>> {
    const user = await this.authService.logout({ userId: (request.user as UserPublicEntity)?.id });

    return response
      .status(HttpStatus.CREATED)
      .clearCookie(
        this.configService.get<string>(ConfigVariables.CookieAccessTokenName) ||
          'Ideaforge-Access-Token',
        {
          httpOnly: true,
          domain: this.configService.get<string>(ConfigVariables.CookieDomain),
        },
      )
      .clearCookie(
        this.configService.get<string>(ConfigVariables.CookieRefreshTokenName) ||
          'Ideaforge-Refresh-Token',
        {
          httpOnly: true,
          domain: this.configService.get<string>(ConfigVariables.CookieDomain),
        },
      )
      .json(user);
  }
}
