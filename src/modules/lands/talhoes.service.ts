import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TalhaoEntity } from './entities/talhao.entity';
import { CreateTalhaoDto } from './dto/create-talhao.dto';
import { UpdateTalhaoDto } from './dto/update-talhao.dto';

@Injectable()
export class TalhoesService {
  constructor(
    @InjectRepository(TalhaoEntity)
    private readonly repository: Repository<TalhaoEntity>,
  ) {}

  create(dto: CreateTalhaoDto) {
    const talhao = this.repository.create(dto);
    return this.repository.save(talhao);
  }

  findAll() {
    return this.repository.find({ relations: ['propriedade'] });
  }

  async findOne(id: number) {
    const talhao = await this.repository.findOne({
      where: { id },
      relations: ['propriedade'],
    });
    if (!talhao) {
      throw new NotFoundException(`Talhão com o ID #${id} não encontrado.`);
    }
    return talhao;
  }

  async update(id: number, dto: UpdateTalhaoDto) {
    const talhao = await this.repository.preload({ id, ...dto });
    if (!talhao) {
      throw new NotFoundException(`Talhão com o ID #${id} não encontrado.`);
    }
    return this.repository.save(talhao);
  }

  async remove(id: number): Promise<void> {
    const talhao = await this.findOne(id);
    await this.repository.remove(talhao);
  }
}