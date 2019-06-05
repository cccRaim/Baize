import { Module } from '@nestjs/common';
import { TypeOrmModule as BaseTypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import * as path from 'path';

const rootPath = path.join(__dirname, '../../..');

@Module({
  imports: [
    BaseTypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: configService.get('database.type'),
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.database'),
        entities: configService
          .get('database.entities')
          .map(p => path.join(rootPath, p)),
        synchronize: true,
        // migrations: configService
        //   .get('database.migrations')
        //   .map(p => path.join(rootPath, p)),
        // migrationsTableName: configService.get('database.migrationsTableName'),
        // migrationsRun: configService.get('database.migrationsRun'),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class TypeOrmModule {}
