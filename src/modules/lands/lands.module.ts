import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TalhaoEntity } from './entities/talhao.entity'; // <--- CORRIGIDO: Removido o .ts
import { LandsController } from './lands.controller';
import { LandsService } from './lands.service';

@Module({
  imports: [TypeOrmModule.forFeature([TalhaoEntity])],
  controllers: [LandsController],
  providers: [LandsService],
})
export class LandsModule {}