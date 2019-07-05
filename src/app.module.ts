import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
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
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      installSubscriptionHandlers: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
