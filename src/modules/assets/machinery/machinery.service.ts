import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MachineryEntity } from '../entities/machinery.entity';
import { CreateMachineryDto } from './dto/create-machinery.dto';
import { UpdateMachineryDto } from './dto/update-machinery.dto';

@Injectable()
export class MachineryService {
  constructor(
    @InjectRepository(MachineryEntity)
    private readonly repository: Repository<MachineryEntity>,
  ) {}

  async create(dto: CreateMachineryDto): Promise<MachineryEntity> {
    const machinery = this.repository.create(dto);
    return this.repository.save(machinery);
  }

  async findAll(): Promise<MachineryEntity[]> {
    return this.repository.find();
  }

  async findOne(id: number): Promise<MachineryEntity> {
    const machinery = await this.repository.findOneBy({ id });
    if (!machinery) {
      throw new NotFoundException(`Maquinário com ID #${id} não encontrado.`);
    }
    return machinery;
  }

  async update(id: number, dto: UpdateMachineryDto): Promise<MachineryEntity> {
    const machinery = await this.repository.preload({
      id,
      ...dto,
    });
    if (!machinery) {
      throw new NotFoundException(`Maquinário com ID #${id} não encontrado.`);
    }
    return this.repository.save(machinery);
  }

  async remove(id: number): Promise<void> {
    const machinery = await this.findOne(id);
    await this.repository.remove(machinery);
  }
}