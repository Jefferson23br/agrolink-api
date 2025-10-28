import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SafraEntity } from './entities/safra.entity';
import { CropCyclesController } from './crop-cycles.controller';
import { CropCyclesService } from './crop-cycles.service';

@Module({
  imports: [TypeOrmModule.forFeature([SafraEntity])],
  controllers: [CropCyclesController],
  providers: [CropCyclesService],
})
export class CropCyclesModule {}