import {
  Entity, PrimaryGeneratedColumn, Column,
  UpdateDateColumn, OneToOne, JoinColumn, ManyToOne,
} from 'typeorm';
import { ProductEntity } from './product.entity';
import { SiloEntity } from './silo.entity';

@Entity({ name: 'estoque_niveis', schema: 'inventory' })
export class StockLevelEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ProductEntity, { nullable: false })
  @JoinColumn({ name: 'produto_id' })
  produto: ProductEntity;

  @ManyToOne(() => SiloEntity, { nullable: false })
  @JoinColumn({ name: 'silo_id' })
  silo: SiloEntity;

  @Column({ type: 'numeric', precision: 15, scale: 3, default: 0 })
  quantidade_atual: number;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}