import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SafraEntity } from '../../crop-cycles/entities/safra.entity';
import { TaskTypeEntity } from '../../task-types/entities/task-type.entity';

@Entity({ name: 'atividades_agricolas', schema: 'operations' })
export class ActivityEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'safra_id', type: 'int' })
  safraId: number;

  @Column({ name: 'tipo_tarefa_id', type: 'int' })
  tipoTarefaId: number;

  @Column({ type: 'text', nullable: true })
  descricao: string;

  @Column({ name: 'quantidade_usada', type: 'decimal', precision: 10, scale: 2, nullable: true })
  quantidadeUsada: number;

  @Column({ name: 'data_inicio', type: 'timestamptz', nullable: true })
  dataInicio: Date;

  @Column({ name: 'data_fim', type: 'timestamptz', nullable: true })
  dataFim: Date;

  @Column({ type: 'varchar', length: 50, default: 'Agendada' })
  status: string;

  @ManyToOne(() => SafraEntity)
  @JoinColumn({ name: 'safra_id' })
  safra: SafraEntity;

  @ManyToOne(() => TaskTypeEntity)
  @JoinColumn({ name: 'tipo_tarefa_id' })
  tipoTarefa: TaskTypeEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}