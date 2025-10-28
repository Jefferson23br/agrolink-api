import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivitiesService } from './activities.service';
import { ActivitiesController } from './activities.controller';
import { ActivityEntity } from './entities/activity.entity';
import { ColaboradorEntity } from '../people/entities/colaborador.entity';
import { MachineryEntity } from '../assets/entities/machinery.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ActivityEntity,
      ColaboradorEntity,
      MachineryEntity,
    ]),
  ],
  controllers: [ActivitiesController],
  providers: [ActivitiesService],
})
export class ActivitiesModule {}