import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SilosService } from './silos.service';
import { SilosController } from './silos.controller';
import { SiloEntity } from '../entities/silo.entity';
import { StockLevelEntity } from '../entities/stock-level.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SiloEntity, StockLevelEntity]),
  ],
  controllers: [SilosController],
  providers: [SilosService],
})
export class SilosModule {}