import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './lib/config/config.module';
import { TypeOrmModule } from './lib/type-orm/type-orm.module';
import { UserModule } from './module/user/user.module';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
