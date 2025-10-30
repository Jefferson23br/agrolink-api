import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CulturaEntity } from './entities/cultura.entity';
import { CropsController } from './crops.controller';
import { CropsService } from './crops.service';

@Module({
  imports: [TypeOrmModule.forFeature([CulturaEntity])],
  controllers: [CropsController],
  providers: [CropsService],
})
export class CropsModule {}