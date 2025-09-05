import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskTypeEntity } from './entities/task-type.entity';
import { CreateTaskTypeDto } from './dto/create-task-type.dto';
import { UpdateTaskTypeDto } from './dto/update-task-type.dto';

@Injectable()
export class TaskTypesService {
  constructor(
    @InjectRepository(TaskTypeEntity)
    private readonly repository: Repository<TaskTypeEntity>,
  ) {}

  create(dto: CreateTaskTypeDto) {
    const taskType = this.repository.create(dto);
    return this.repository.save(taskType);
  }

  findAll() {
    return this.repository.find();
  }

  async findOne(id: number) {
    const taskType = await this.repository.findOneBy({ id });
    if (!taskType) {
      throw new NotFoundException(`Tipo de Tarefa com o ID #${id} não encontrado.`);
    }
    return taskType;
  }

  async update(id: number, dto: UpdateTaskTypeDto) {
    const taskType = await this.repository.preload({ id, ...dto });
    if (!taskType) {
      throw new NotFoundException(`Tipo de Tarefa com o ID #${id} não encontrado.`);
    }
    return this.repository.save(taskType);
  }

  async remove(id: number): Promise<void> {
    const taskType = await this.findOne(id);
    await this.repository.remove(taskType);
  }
}