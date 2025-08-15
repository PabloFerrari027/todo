import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { EnvDTO } from './core/config/env.dto';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (config) => {
        const envConfig = new EnvDTO();
        Object.assign(envConfig, config);
        return envConfig;
      },
    }),
    ThrottlerModule.forRoot([{ ttl: 60, limit: 10 }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
