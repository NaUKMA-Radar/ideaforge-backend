import { Body, Controller, Get, HttpStatus, Post, Query, Req, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Request, Response } from 'express';
import { RoutesApiTags } from 'src/core/constants';
import { ConfigVariables, Routes } from 'src/core/enums/app.enums';
import { AuthService } from 'src/modules/auth/auth.service';

@ApiTags(RoutesApiTags[Routes.OAuth2])
@Controller(Routes.OAuth2)
export class OAuth2Controller {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @ApiCreatedResponse({ description: 'Google OAuth2 url was successfully generated.' })
  @ApiUnauthorizedResponse({ description: 'Cannot generate Google OAuth2 url.' })
  @ApiConflictResponse({
    description: 'Cannot generate Google OAuth2 url. Invalid data was provided.',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error was occured.' })
  @Post('/google')
  public async generateGoogleOAuth2Url(@Body() data, @Res() response: Response) {
    const url = await this.authService.generateGoogleOAuth2Url(data);

    return response.status(HttpStatus.CREATED).json({ url });
  }

  @ApiCreatedResponse({ description: 'Google Oauth2 token was successfully generated.' })
  @ApiUnauthorizedResponse({ description: 'Cannot generate Google Oauth2 token.' })
  @ApiConflictResponse({
    description: 'Cannot generate Google Oauth2 token. Invalid data was provided.',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error was occured.' })
  @Get('/callback/google')
  public async generateGoogleOAuth2Token(
    @Query('state') state: string,
    @Query('code') code: string,
    @Res() response: Response,
  ): Promise<void> {
    const { token } = await this.authService.generateGoogleOAuth2Token(code, state);

    return response
      .cookie(
        this.configService.get<string>(ConfigVariables.CookieOAuth2TokenName) ||
          'Ideaforge-OAuth-Token',
        token,
        {
          path: '/',
          domain: this.configService.get<string>(ConfigVariables.CookieDomain),
        },
      )
      .redirect(JSON.parse(state).referer);
  }
}
