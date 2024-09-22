export enum ConfigVariables {
  UserPasswordSaltPrefix = 'USER_PASSWORD_SALT_PREFIX',
  UserPasswordSaltSuffix = 'USER_PASSWORD_SALT_SUFFIX',
  UserPasswordSaltRounds = 'USER_PASSWORD_SALT_ROUNDS',
  JwtSecret = 'JWT_SECRET',
  JwtAccessTokenDuration = 'JWT_ACCESS_TOKEN_DURATION',
  DatabaseHost = 'DATABASE_HOST',
  DatabasePort = 'DATABASE_PORT',
  DatabaseUsername = 'DATABASE_USERNAME',
  DatabasePassword = 'DATABASE_PASSWORD',
  DatabaseName = 'DATABASE_NAME',
  DatabaseType = 'DATABASE_TYPE',
}

export enum UserRegistrationMethods {
  Credentials = 'credentials',
  Google = 'google',
}

export enum Routes {
  Users = 'users',
}
