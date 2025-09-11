import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskTypeEntity } from './entities/task-type.entity';
import { TaskTypesController } from './task-types.controller';
import { TaskTypesService } from './task-types.service';

@Module({
  imports: [TypeOrmModule.forFeature([TaskTypeEntity])],
  controllers: [TaskTypesController],
  providers: [TaskTypesService],
})
export class TaskTypesModule {}