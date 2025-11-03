import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MachineryEntity } from './entities/machinery.entity';
import { MachineryController } from './machinery/machinery.controller';
import { MachineryService } from './machinery/machinery.service';

@Module({
  imports: [TypeOrmModule.forFeature([MachineryEntity])],
  controllers: [MachineryController],
  providers: [MachineryService],
})
export class AssetsModule {}