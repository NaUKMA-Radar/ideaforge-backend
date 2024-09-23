export enum ConfigVariables {
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
  JwtSecret = 'JWT_SECRET',
  JwtAccessTokenDuration = 'JWT_ACCESS_TOKEN_DURATION',
  JwtRefreshTokenDuration = 'JWT_REFRESH_TOKEN_DURATION',
  JwtOAuth2TokenDuration = 'JWT_OAUTH2_TOKEN_DURATION',
  JwtIssuer = 'JWT_ISSUER',
  JwtAudience = 'JWT_AUDIENCE'
}

export enum UserRegistrationMethods {
  Credentials = 'credentials',
  Google = 'google',
}

export enum Routes {
  Users = 'users',
}
