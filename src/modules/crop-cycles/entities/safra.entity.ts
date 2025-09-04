import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TalhaoEntity } from '../../lands/entities/talhao.entity';

@Entity({ name: 'safras', schema: 'operations' })
export class SafraEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'ano_safra', type: 'varchar', length: 50, nullable: false })
  anoSafra: string;

  @Column({ name: 'data_inicio_planejado', type: 'date', nullable: true })
  dataInicioPlanejado: Date;

  @Column({ name: 'data_fim_planejado', type: 'date', nullable: true })
  dataFimPlanejado: Date;

  @Column({ type: 'varchar', length: 50, default: 'Planejada' })
  status: string;

  @Column({ name: 'talhao_id', type: 'int', nullable: false })
  talhaoId: number;

  @ManyToOne(() => TalhaoEntity)
  @JoinColumn({ name: 'talhao_id', referencedColumnName: 'id' })
  talhao: TalhaoEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}