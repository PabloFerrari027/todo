import {
  IsInt,
  IsEnum,
  IsOptional,
  IsArray,
  IsString,
  ArrayNotEmpty,
  ArrayMinSize,
} from 'class-validator';

export enum NodeEnv {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
  TEST = 'test',
}

export class EnvDTO {
  @IsEnum(NodeEnv, {
    message: 'NODE_ENV must be one of: development, production, test',
  })
  NODE_ENV: NodeEnv = NodeEnv.DEVELOPMENT;

  @IsInt({ message: 'PORT must be an integer' })
  @IsOptional()
  PORT: number = 3000;

  @IsArray({ message: 'CORS_ORIGINS must be an array' })
  @ArrayNotEmpty({ message: 'CORS_ORIGINS array cannot be empty' })
  @ArrayMinSize(1, { message: 'CORS_ORIGINS must contain at least 1 item' })
  @IsString({
    each: true,
    message: 'Each item in CORS_ORIGINS must be a string',
  })
  CORS_ORIGINS: string[];

  @IsInt({ message: 'RESPONSE_TIMEOUT must be an integer' })
  RESPONSE_TIMEOUT: number = 5000;

  @IsInt({ message: 'RATE_LIMIT_TTL must be an integer' })
  RATE_LIMIT_TTL: number = 60;

  @IsInt({ message: 'RATE_LIMIT_LIMIT must be an integer' })
  RATE_LIMIT_LIMIT: number = 10;
}
