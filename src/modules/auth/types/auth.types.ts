import { User } from "@prisma/client";

export interface LoginResponse extends User {
  accessToken: string;
  refreshToken: string;
  [key: string]: any;
}

export interface RegisterResponse extends User {
  accessToken: string;
  refreshToken: string;
  [key: string]: any;
}

export interface RefreshResponse {
  accessToken: string;
  refreshToken: string;
}

export interface JwtTokensPairResponse {
  accessToken: string;
  refreshToken: string;
}

export interface JwtTokenPayload {
  userId: string;
  iat: number;
  exp: number;
  [key: string]: any;
}

export interface AuthGuardOptions {
  permissions?: number;
}

export interface OAuth2Payload {
  referer: string;
}

export interface GenerateGoogleOAuth2Response {
  token: string;
}
