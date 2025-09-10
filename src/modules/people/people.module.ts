import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColaboradorEntity } from './entities/colaborador.entity';
import { CollaboratorsController } from './collaborators/collaborators.controller';
import { CollaboratorsService } from './collaborators/collaborators.service';
import { HistoricoColaboradorEntity } from './entities/historico-colaborador.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ColaboradorEntity,
      HistoricoColaboradorEntity,
    ]),
  ],
  controllers: [CollaboratorsController],
  providers: [CollaboratorsService],
})
export class PeopleModule {}