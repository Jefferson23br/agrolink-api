import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColaboradorEntity } from './entities/colaborador.entity';
import { CollaboratorsController } from './collaborators/collaborators.controller';
import { CollaboratorsService } from './collaborators/collaborators.service';

@Module({
  imports: [TypeOrmModule.forFeature([ColaboradorEntity])],
  controllers: [CollaboratorsController],
  providers: [CollaboratorsService],
})
export class PeopleModule {}