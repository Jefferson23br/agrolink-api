import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CulturaEntity } from './entities/cultura.entity';
import { CreateCulturaDto } from './dto/create-cultura.dto';
import { UpdateCulturaDto } from './dto/update-cultura.dto';

@Injectable()
export class CropsService {
  constructor(
    @InjectRepository(CulturaEntity)
    private readonly repository: Repository<CulturaEntity>,
  ) {}

  create(dto: CreateCulturaDto) {
    const cultura = this.repository.create(dto);
    return this.repository.save(cultura);
  }

  findAll() {
    return this.repository.find();
  }

  async findOne(id: number) {
    const cultura = await this.repository.findOneBy({ id });
    if (!cultura) {
      throw new NotFoundException(`Cultura com o ID #${id} não encontrada.`);
    }
    return cultura;
  }

  async update(id: number, dto: UpdateCulturaDto) {
    const cultura = await this.repository.preload({ id, ...dto });
    if (!cultura) {
      throw new NotFoundException(`Cultura com o ID #${id} não encontrada.`);
    }
    return this.repository.save(cultura);
  }

  async remove(id: number): Promise<void> {
    const cultura = await this.findOne(id);
    await this.repository.remove(cultura);
  }
}