import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductEntity } from './product.entity';
import { SiloEntity } from './silo.entity';

export enum MovementType {
    ENTRADA = 'ENTRADA',
    SAIDA = 'SAIDA',
    AJUSTE_POSITIVO = 'AJUSTE_POSITIVO',
    AJUSTE_NEGATIVO = 'AJUSTE_NEGATIVO',
}

@Entity({ name: 'estoque_movimentacoes', schema: 'inventory' })
export class MovementEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ProductEntity, { nullable: false })
  @JoinColumn({ name: 'produto_id' })
  produto: ProductEntity;

  @ManyToOne(() => SiloEntity, { nullable: false })
  @JoinColumn({ name: 'silo_id' })
  silo: SiloEntity;

  @Column({ type: 'enum', enum: MovementType, nullable: false })
  tipo: MovementType;

  @Column({ type: 'numeric', precision: 15, scale: 3, nullable: false })
  quantidade: number;

  @Column({ type: 'text', nullable: true })
  observacao?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}