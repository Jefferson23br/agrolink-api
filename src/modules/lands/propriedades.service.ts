import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PropriedadeEntity } from './entities/propriedade.entity';
import { CreatePropriedadeDto } from './dto/create-propriedade.dto';
import { UpdatePropriedadeDto } from './dto/update-propriedade.dto';

@Injectable()
export class PropriedadesService {
  constructor(
    @InjectRepository(PropriedadeEntity)
    private readonly repository: Repository<PropriedadeEntity>,
  ) {}

  create(dto: CreatePropriedadeDto) {
    const propriedade = this.repository.create(dto);
    return this.repository.save(propriedade);
  }

  findAll() {
    return this.repository.find();
  }

  async findOne(id: number) {
    const propriedade = await this.repository.findOne({
      where: { id },
      relations: ['talhoes'], 
    });
    if (!propriedade) {
      throw new NotFoundException(`Propriedade com o ID #${id} não encontrada.`);
    }
    return propriedade;
  }

  async update(id: number, dto: UpdatePropriedadeDto) {
    const propriedade = await this.repository.preload({ id, ...dto });
    if (!propriedade) {
      throw new NotFoundException(`Propriedade com o ID #${id} não encontrada.`);
    }
    return this.repository.save(propriedade);
  }

  async remove(id: number): Promise<void> {
    const propriedade = await this.findOne(id);
    await this.repository.remove(propriedade);
  }
}