import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActivityEntity } from './entities/activity.entity';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';

@Injectable()
export class ActivitiesService {
  constructor(
    @InjectRepository(ActivityEntity)
    private readonly repository: Repository<ActivityEntity>,
  ) {}

  create(dto: CreateActivityDto) {
    const activity = this.repository.create(dto);
    return this.repository.save(activity);
  }

  findAll() {
    return this.repository.find({ relations: ['safra', 'tipoTarefa'] });
  }

  async findOne(id: number) {
    const activity = await this.repository.findOne({
      where: { id },
      relations: ['safra', 'tipoTarefa'],
    });
    if (!activity) {
      throw new NotFoundException(`Atividade com o ID #${id} não encontrada.`);
    }
    return activity;
  }

  async update(id: number, dto: UpdateActivityDto) {
    const activity = await this.repository.preload({ id, ...dto });
    if (!activity) {
      throw new NotFoundException(`Atividade com o ID #${id} não encontrada.`);
    }
    return this.repository.save(activity);
  }

  async remove(id: number): Promise<void> {
    const activity = await this.findOne(id);
    await this.repository.remove(activity);
  }
}