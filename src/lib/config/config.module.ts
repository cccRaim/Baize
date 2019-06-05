import { Module, Global } from '@nestjs/common';
import { ConfigService } from './config.service';
import * as path from 'path';

@Global()
@Module({
  providers: [
    {
      provide: ConfigService,
      useValue: new ConfigService(path.resolve('config', `${process.env.NODE_ENV}.yaml`)),
    },
  ],
  exports: [ConfigService],
})
export class ConfigModule {}
