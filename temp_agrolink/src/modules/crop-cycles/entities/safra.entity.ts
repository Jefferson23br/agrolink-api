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
import { CulturaEntity } from '../../crops/entities/cultura.entity';

@Entity({ name: 'safras', schema: 'operations' })
export class SafraEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'talhao_id', type: 'int', nullable: false })
  talhaoId: number;

  @Column({ name: 'cultura_id', type: 'int', nullable: false })
  culturaId: number;

  @Column({ name: 'ano_safra', type: 'varchar', length: 50, nullable: false })
  anoSafra: string;

  @Column({ name: 'data_inicio_planejado', type: 'date', nullable: true })
  dataInicioPlanejado: Date;

  @Column({ name: 'data_fim_planejado', type: 'date', nullable: true })
  dataFimPlanejado: Date;

  @Column({ type: 'varchar', length: 50, default: 'Planejada' })
  status: string;

  @ManyToOne(() => TalhaoEntity)
  @JoinColumn({ name: 'talhao_id' })
  talhao: TalhaoEntity;

  @ManyToOne(() => CulturaEntity)
  @JoinColumn({ name: 'cultura_id' })
  cultura: CulturaEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}