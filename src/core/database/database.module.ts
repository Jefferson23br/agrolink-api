import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST')!,
        port: parseInt(configService.get<string>('DB_PORT')!),
        username: configService.get<string>('DB_USERNAME')!,
        password: configService.get<string>('DB_PASSWORD')!,
        database: configService.get<string>('DB_DATABASE')!,
        
        // --- MUDANÇA AQUI ---
        // Diz ao TypeORM para carregar automaticamente as entidades
        // que registramos nos módulos (como no LandsModule).
        autoLoadEntities: true,

        synchronize: false,
      }),
    }),
  ],
})
export class DatabaseModule {}