import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ColaboradorEntity } from '../entities/colaborador.entity';
import { CreateColaboradorDto } from './dto/create-colaborador.dto';
import { UpdateColaboradorDto } from './dto/update-colaborador.dto';

@Injectable()
export class CollaboratorsService {
  constructor(
    @InjectRepository(ColaboradorEntity)
    private readonly repository: Repository<ColaboradorEntity>,
  ) {}

  async create(dto: CreateColaboradorDto): Promise<ColaboradorEntity> {
    const colaborador = this.repository.create(dto);
    return this.repository.save(colaborador);
  }

  async findAll(): Promise<ColaboradorEntity[]> {
    return this.repository.find();
  }

  async findOne(id: number): Promise<ColaboradorEntity> {
    const colaborador = await this.repository.findOneBy({ id });
    if (!colaborador) {
      throw new NotFoundException(`Colaborador com ID #${id} não encontrado.`);
    }
    return colaborador;
  }

  async update(id: number, dto: UpdateColaboradorDto): Promise<ColaboradorEntity> {
    const colaborador = await this.repository.preload({
      id,
      ...dto,
    });
    if (!colaborador) {
      throw new NotFoundException(`Colaborador com ID #${id} não encontrado.`);
    }
    return this.repository.save(colaborador);
  }

  async remove(id: number): Promise<void> {
    const colaborador = await this.findOne(id);
    await this.repository.remove(colaborador);
  }
}