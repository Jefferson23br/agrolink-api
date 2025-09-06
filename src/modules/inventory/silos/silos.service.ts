import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SiloEntity } from '../entities/silo.entity';
import { CreateSiloDto } from './dto/create-silo.dto';
import { UpdateSiloDto } from './dto/update-silo.dto';
import { StockLevelEntity } from '../entities/stock-level.entity'; // 1. Importar

@Injectable()
export class SilosService {
  constructor(
    @InjectRepository(SiloEntity)
    private readonly repository: Repository<SiloEntity>,

    // 2. Injetar o repositório de Níveis de Estoque
    @InjectRepository(StockLevelEntity)
    private readonly stockLevelRepository: Repository<StockLevelEntity>,
  ) {}

  // ... (os métodos create, findAll, findOne, update, remove continuam aqui, sem alterações)
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
    const silo = await this.repository.preload({ id, ...dto });
    if (!silo) {
      throw new NotFoundException(`Silo com ID #${id} não encontrado.`);
    }
    return this.repository.save(silo);
  }

  async remove(id: number): Promise<void> {
    const silo = await this.findOne(id);
    await this.repository.remove(silo);
  }

  // 3. MÉTODO NOVO PARA BUSCAR O ESTOQUE DO SILO
  async findStock(id: number) {
    // Primeiro, busca os dados do silo em si
    const silo = await this.findOne(id);

    // Depois, busca todos os níveis de estoque PARA AQUELE silo,
    // já trazendo os dados do produto relacionado (join).
    const stockLevels = await this.stockLevelRepository.find({
      where: { silo: { id: id } },
      relations: ['produto'], // Isso faz o JOIN com a tabela de produtos
    });

    // Formata a resposta para ficar mais amigável
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
}