import { EnvDTO } from './core/config/env.dto';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TimeoutInterceptor } from './core/interceptors/timeout.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const envDTO = new EnvDTO();
  const timeout = Number(envDTO.RESPONSE_TIMEOUT);

  app.useGlobalInterceptors(new TimeoutInterceptor(timeout));
  app.enableCors({ origin: [envDTO.CORS_ORIGINS] });

  await app.listen(envDTO.PORT);
}

bootstrap();
