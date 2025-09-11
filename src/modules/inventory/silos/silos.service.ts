import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SiloEntity } from '../entities/silo.entity';
import { CreateSiloDto } from './dto/create-silo.dto';
import { UpdateSiloDto } from './dto/update-silo.dto';
import { StockLevelEntity } from '../entities/stock-level.entity';
import { MovementEntity } from '../entities/movement.entity';

@Injectable()
export class SilosService {
  constructor(
    @InjectRepository(SiloEntity)
    private readonly repository: Repository<SiloEntity>,
    @InjectRepository(StockLevelEntity)
    private readonly stockLevelRepository: Repository<StockLevelEntity>,
    @InjectRepository(MovementEntity)
    private readonly movementRepository: Repository<MovementEntity>,
  ) {}

  async create(dto: CreateSiloDto): Promise<SiloEntity> {
    const silo = this.repository.create(dto);
    return this.repository.save(silo);
  }

  async findAll(): Promise<SiloEntity[]> {
    return this.repository.find();
  }

  async findOne(id: number): Promise<SiloEntity> {
    const silo = await this.repository.findOneBy({ id });
    if (!silo) {
      throw new NotFoundException(`Silo com ID #${id} não encontrado.`);
    }
    return silo;
  }

  async update(id: number, dto: UpdateSiloDto): Promise<SiloEntity> {
    const silo = await this.repository.preload({
      id,
      ...dto,
    });
    if (!silo) {
      throw new NotFoundException(`Silo com ID #${id} não encontrado.`);
    }
    return this.repository.save(silo);
  }

  async remove(id: number): Promise<void> {
    const silo = await this.findOne(id);
    await this.repository.remove(silo);
  }

  async findStock(id: number) {
    const silo = await this.findOne(id);
    const stockLevels = await this.stockLevelRepository.find({
      where: { silo: { id: id } },
      relations: ['produto'],
    });
    const estoqueAtual = stockLevels.map((level) => ({
      produtoId: level.produto.id,
      produtoNome: level.produto.nome,
      unidadeMedida: level.produto.unidadeMedida,
      quantidade: level.quantidade_atual,
    }));
    return {
      ...silo,
      estoqueAtual,
    };
  }

  async findMovements(id: number): Promise<MovementEntity[]> {
    await this.findOne(id);
    return this.movementRepository.find({
      where: { silo: { id: id } },
      relations: ['produto', 'atividade'],
      order: { createdAt: 'DESC' },
    });
  }
}