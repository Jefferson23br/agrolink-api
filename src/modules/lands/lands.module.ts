import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TalhaoEntity } from './entities/talhao.entity';
import { PropriedadeEntity } from './entities/propriedade.entity';
import { PropriedadesController } from './propriedades.controller';
import { PropriedadesService } from './propriedades.service';
import { TalhoesController } from './talhoes.controller';
import { TalhoesService } from './talhoes.service';

@Module({
  imports: [TypeOrmModule.forFeature([PropriedadeEntity, TalhaoEntity])],
  controllers: [PropriedadesController, TalhoesController],
  providers: [PropriedadesService, TalhoesService],
})
export class LandsModule {}