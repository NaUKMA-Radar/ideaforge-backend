export enum ConfigVariables {
  ServerUri = 'SERVER_URI',
  UserPasswordSaltPrefix = 'USER_PASSWORD_SALT_PREFIX',
  UserPasswordSaltSuffix = 'USER_PASSWORD_SALT_SUFFIX',
  UserPasswordSaltRounds = 'USER_PASSWORD_SALT_ROUNDS',
  DatabaseHost = 'DATABASE_HOST',
  DatabasePort = 'DATABASE_PORT',
  DatabaseUsername = 'DATABASE_USERNAME',
  DatabasePassword = 'DATABASE_PASSWORD',
  DatabaseName = 'DATABASE_NAME',
  DatabaseType = 'DATABASE_TYPE',
  SupabaseUrl = 'SUPABASE_URL',
  SupabaseKey = 'SUPABASE_KEY',
  SupabaseBucketName = 'SUPABASE_BUCKET_NAME',
  SupabaseJwtSecret = 'SUPABASE_JWT_SECRET',
  CookieAccessTokenName = 'COOKIE_ACCESS_TOKEN_NAME',
  CookieRefreshTokenName = 'COOKIE_REFRESH_TOKEN_NAME',
  CookieOAuth2TokenName = 'COOKIE_OAUTH2_TOKEN_NAME',
  CookieDomain = 'COOKIE_DOMAIN',
  CookieSecret = 'COOKIE_SECRET',
  JwtSecret = 'JWT_SECRET',
  JwtAccessTokenDuration = 'JWT_ACCESS_TOKEN_DURATION',
  JwtRefreshTokenDuration = 'JWT_REFRESH_TOKEN_DURATION',
  JwtOAuth2TokenDuration = 'JWT_OAUTH2_TOKEN_DURATION',
  JwtIssuer = 'JWT_ISSUER',
  JwtAudience = 'JWT_AUDIENCE',
  GoogleClientId = 'GOOGLE_CLIENT_ID',
  GoogleClientSecret = 'GOOGLE_CLIENT_SECRET',
}

export enum UserRegistrationMethods {
  Credentials = 'credentials',
  Google = 'google',
}

export enum Routes {
  Users = 'users',
  Auth = 'auth',
  OAuth2 = 'oauth2',
}