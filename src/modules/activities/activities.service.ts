import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { ActivityEntity } from './entities/activity.entity';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { ColaboradorEntity } from '../people/entities/colaborador.entity';
import { MachineryEntity } from '../assets/entities/machinery.entity';

@Injectable()
export class ActivitiesService {
  constructor(
    @InjectRepository(ActivityEntity)
    private readonly repository: Repository<ActivityEntity>,
    @InjectRepository(ColaboradorEntity)
    private readonly colaboradorRepository: Repository<ColaboradorEntity>,
    @InjectRepository(MachineryEntity)
    private readonly machineryRepository: Repository<MachineryEntity>,
  ) {}

  async create(dto: CreateActivityDto): Promise<ActivityEntity> {
    const { colaboradorIds, maquinarioIds, ...activityData } = dto;
    const activity = this.repository.create({
      ...activityData,
      safra: { id: dto.safraId },
      tipoTarefa: { id: dto.tipoTarefaId },
    });

    if (colaboradorIds && colaboradorIds.length > 0) {
      const colaboradores = await this.colaboradorRepository.findBy({
        id: In(colaboradorIds),
      });
      if (colaboradores.length !== colaboradorIds.length) {
        throw new BadRequestException('Um ou mais IDs de colaboradores são inválidos.');
      }
      activity.colaboradores = colaboradores;
    }

    if (maquinarioIds && maquinarioIds.length > 0) {
      const maquinario = await this.machineryRepository.findBy({
        id: In(maquinarioIds),
      });
      if (maquinario.length !== maquinarioIds.length) {
        throw new BadRequestException('Um ou mais IDs de maquinários são inválidos.');
      }
      activity.maquinario = maquinario;
    }

    return this.repository.save(activity);
  }

  findAll() {
    return this.repository.find({
      relations: ['safra', 'tipoTarefa', 'colaboradores', 'maquinario'],
    });
  }

  async findOne(id: number) {
    const activity = await this.repository.findOne({
      where: { id },
      relations: ['safra', 'tipoTarefa', 'colaboradores', 'maquinario'],
    });
    if (!activity) {
      throw new NotFoundException(`Atividade com o ID #${id} não encontrada.`);
    }
    return activity;
  }

  async update(id: number, dto: UpdateActivityDto): Promise<ActivityEntity> {
    const { colaboradorIds, maquinarioIds, ...activityData } = dto;

    const activity = await this.repository.findOne({
      where: { id },
      relations: ['colaboradores', 'maquinario'],
    });

    if (!activity) {
      throw new NotFoundException(`Atividade com o ID #${id} não encontrada.`);
    }

    Object.assign(activity, activityData);

    if (colaboradorIds) {
      const colaboradores = await this.colaboradorRepository.findBy({
        id: In(colaboradorIds),
      });
      if (colaboradores.length !== colaboradorIds.length) {
        throw new BadRequestException('Um ou mais IDs de colaboradores são inválidos.');
      }
      activity.colaboradores = colaboradores;
    }

    if (maquinarioIds) {
      const maquinario = await this.machineryRepository.findBy({
        id: In(maquinarioIds),
      });
      if (maquinario.length !== maquinarioIds.length) {
        throw new BadRequestException('Um ou mais IDs de maquinários são inválidos.');
      }
      activity.maquinario = maquinario;
    }

    return this.repository.save(activity);
  }

  async remove(id: number): Promise<void> {
    const activity = await this.findOne(id);
    await this.repository.remove(activity);
  }
}