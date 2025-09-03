import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TalhaoEntity } from './entities/talhao.entity';
import { CreateTalhaoDto } from './dto/create-talhao.dto';
import { UpdateTalhaoDto } from './dto/update-talhao.dto';

@Injectable()
export class LandsService {
  constructor(
    @InjectRepository(TalhaoEntity)
    private readonly talhaoRepository: Repository<TalhaoEntity>,
  ) {}

  async findAll(): Promise<TalhaoEntity[]> {
    return this.talhaoRepository.find();
  }

  async findOne(id: number): Promise<TalhaoEntity> {
    const talhao = await this.talhaoRepository.findOneBy({ id });
    if (!talhao) {
      throw new NotFoundException(`Talhão com o ID #${id} não encontrado.`);
    }
    return talhao;
  }

  async create(createTalhaoDto: CreateTalhaoDto): Promise<TalhaoEntity> {
    const novoTalhao = this.talhaoRepository.create(createTalhaoDto);
    return this.talhaoRepository.save(novoTalhao);
  }

  async update(id: number, updateTalhaoDto: UpdateTalhaoDto): Promise<TalhaoEntity> {
    const talhao = await this.talhaoRepository.preload({
      id: id,
      ...updateTalhaoDto,
    });

    if (!talhao) {
      throw new NotFoundException(`Talhão com o ID #${id} não encontrado.`);
    }

    return this.talhaoRepository.save(talhao);
  }

  // --- NOVO MÉTODO DE DELEÇÃO ABAIXO ---
  async remove(id: number): Promise<void> {
    const talhao = await this.findOne(id); // Reutiliza o findOne para checar se o talhão existe
    await this.talhaoRepository.remove(talhao);
  }
}