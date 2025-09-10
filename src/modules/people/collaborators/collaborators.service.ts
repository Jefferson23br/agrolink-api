import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { ColaboradorEntity } from '../entities/colaborador.entity';
import { CreateColaboradorDto } from './dto/create-colaborador.dto';
import { UpdateColaboradorDto } from './dto/update-colaborador.dto';
import { HistoricoColaboradorEntity, TipoEventoHistorico } from '../entities/historico-colaborador.entity';
import { CreateHistoricoDto } from './dto/create-historico.dto';

@Injectable()
export class CollaboratorsService {
  constructor(
    @InjectRepository(ColaboradorEntity)
    private readonly repository: Repository<ColaboradorEntity>,
    @InjectRepository(HistoricoColaboradorEntity)
    private readonly historicoRepository: Repository<HistoricoColaboradorEntity>,
    private readonly dataSource: DataSource,
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
    return this.dataSource.transaction(async (manager) => {
      const colaborador = await manager.findOneBy(ColaboradorEntity, { id });
      if (!colaborador) {
        throw new NotFoundException(`Colaborador com ID #${id} não encontrado.`);
      }

      const estadoAntigo = { ...colaborador };
      manager.merge(ColaboradorEntity, colaborador, dto);

      if (dto.funcao && estadoAntigo.funcao !== colaborador.funcao) {
        const historicoPromocao = manager.create(HistoricoColaboradorEntity, {
          colaborador,
          tipoEvento: TipoEventoHistorico.PROMOCAO,
          dataEvento: new Date(),
          descricao: `Função alterada de "${estadoAntigo.funcao}" para "${colaborador.funcao}".`,
        });
        await manager.save(historicoPromocao);
      }

      if (dto.remuneracao && Number(estadoAntigo.remuneracao) !== colaborador.remuneracao) {
        const historicoSalario = manager.create(HistoricoColaboradorEntity, {
          colaborador,
          tipoEvento: TipoEventoHistorico.AUMENTO_SALARIO,
          dataEvento: new Date(),
          descricao: `Remuneração alterada de R$ ${estadoAntigo.remuneracao} para R$ ${colaborador.remuneracao}.`,
          detalhesJson: {
            valor_antigo: estadoAntigo.remuneracao,
            valor_novo: colaborador.remuneracao,
          },
        });
        await manager.save(historicoSalario);
      }

      return manager.save(colaborador);
    });
  }

  async remove(id: number): Promise<void> {
    const colaborador = await this.findOne(id);
    await this.repository.remove(colaborador);
  }

  async addHistorico(
    colaboradorId: number,
    dto: CreateHistoricoDto,
  ): Promise<HistoricoColaboradorEntity> {
    const colaborador = await this.findOne(colaboradorId);
    const historicoEntry = this.historicoRepository.create({
      ...dto,
      colaborador,
    });
    return this.historicoRepository.save(historicoEntry);
  }

  async findHistorico(colaboradorId: number): Promise<HistoricoColaboradorEntity[]> {
    await this.findOne(colaboradorId);
    return this.historicoRepository.find({
      where: { colaborador: { id: colaboradorId } },
      order: { dataEvento: 'DESC' },
    });
  }
}