import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SafraEntity } from './entities/safra.entity';
import { CreateSafraDto } from './dto/create-safra.dto';
import { UpdateSafraDto } from './dto/update-safra.dto';

@Injectable()
export class CropCyclesService {
  constructor(
    @InjectRepository(SafraEntity)
    private readonly repository: Repository<SafraEntity>,
  ) {}

  create(dto: CreateSafraDto) {
    const safra = this.repository.create(dto);
    return this.repository.save(safra);
  }

  findAll() {
    return this.repository.find({
      relations: ['talhao', 'talhao.propriedade', 'cultura'],
    });
  }

  async findOne(id: number) {
    const safra = await this.repository.findOne({
      where: { id },
      relations: ['talhao', 'talhao.propriedade', 'cultura'],
    });
    if (!safra) {
      throw new NotFoundException(`Safra com o ID #${id} não encontrada.`);
    }
    return safra;
  }

  async update(id: number, dto: UpdateSafraDto) {
    const safra = await this.repository.preload({ id, ...dto });
    if (!safra) {
      throw new NotFoundException(`Safra com o ID #${id} não encontrada.`);
    }
    return this.repository.save(safra);
  }

  async remove(id: number): Promise<void> {
    const safra = await this.findOne(id);
    await this.repository.remove(safra);
  }
}