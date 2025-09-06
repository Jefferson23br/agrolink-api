import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateMovementDto } from '../dto/create-movement.dto';
import { MovementEntity, MovementType } from '../entities/movement.entity';
import { StockLevelEntity } from '../entities/stock-level.entity';
import { ProductEntity } from '../entities/product.entity';
import { SiloEntity } from '../entities/silo.entity';

@Injectable()
export class MovementsService {
  constructor(

    private readonly dataSource: DataSource,
  ) {}

  async create(createMovementDto: CreateMovementDto): Promise<MovementEntity> {
    return this.dataSource.transaction(async (manager) => {
      const { produtoId, siloId, tipo, quantidade, observacao } = createMovementDto;

      const produto = await manager.findOneBy(ProductEntity, { id: produtoId });
      if (!produto) {
        throw new NotFoundException(`Produto com ID ${produtoId} não encontrado.`);
      }

      const silo = await manager.findOneBy(SiloEntity, { id: siloId });
      if (!silo) {
        throw new NotFoundException(`Silo com ID ${siloId} não encontrado.`);
      }

      const novaMovimentacao = manager.create(MovementEntity, {
        produto,
        silo,
        tipo,
        quantidade,
        observacao,
      });

      console.log('OBJETO QUE SERÁ SALVO:', novaMovimentacao);
      const movimentacaoSalva = await manager.save(novaMovimentacao);

      let nivelEstoque = await manager.findOne(StockLevelEntity, {
        where: {
          produto: { id: produtoId },
          silo: { id: siloId },
        },
      });

      if (!nivelEstoque) {
        if (tipo === MovementType.SAIDA || tipo === MovementType.AJUSTE_NEGATIVO) {
          throw new BadRequestException(
            `Não é possível fazer uma saída. Não há estoque para o produto #${produtoId} no silo #${siloId}.`,
          );
        }
        nivelEstoque = manager.create(StockLevelEntity, {
          produto,
          silo,
          quantidade_atual: 0,
        });
      }

      if (tipo === MovementType.ENTRADA || tipo === MovementType.AJUSTE_POSITIVO) {
        nivelEstoque.quantidade_atual = Number(nivelEstoque.quantidade_atual) + quantidade;
      } else {
        if (Number(nivelEstoque.quantidade_atual) < quantidade) {
          throw new BadRequestException(
            `Estoque insuficiente para a saída no silo #${siloId}. Saldo atual: ${nivelEstoque.quantidade_atual}.`,
          );
        }
        nivelEstoque.quantidade_atual = Number(nivelEstoque.quantidade_atual) - quantidade;
      }
      
      await manager.save(nivelEstoque);

      return movimentacaoSalva;
    });
  }
}