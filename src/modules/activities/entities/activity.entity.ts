import {
  Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany,
  ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';
import { SafraEntity } from '../../crop-cycles/entities/safra.entity';
import { TaskTypeEntity } from '../../task-types/entities/task-type.entity';
import { ColaboradorEntity } from '../../people/entities/colaborador.entity';
import { MachineryEntity } from '../../assets/entities/machinery.entity';

export enum ActivityStatus {
  PENDENTE = 'PENDENTE',
  EM_ANDAMENTO = 'EM_ANDAMENTO',
  CONCLUIDA = 'CONCLUIDA',
  CANCELADA = 'CANCELADA',
}

@Entity({ name: 'atividades_agricolas', schema: 'operations' })
export class ActivityEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => SafraEntity, { nullable: false })
  @JoinColumn({ name: 'safra_id' })
  safra: SafraEntity;

  @ManyToOne(() => TaskTypeEntity, { nullable: false })
  @JoinColumn({ name: 'tipo_tarefa_id' })
  tipoTarefa: TaskTypeEntity;

  @ManyToMany(() => ColaboradorEntity)
  @JoinTable({
    name: 'atividades_colaboradores',
    schema: 'operations',
    joinColumn: { name: 'atividade_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'colaborador_id', referencedColumnName: 'id' },
  })
  colaboradores: ColaboradorEntity[];

  @ManyToMany(() => MachineryEntity)
  @JoinTable({
    name: 'atividades_maquinario',
    schema: 'operations',
    joinColumn: { name: 'atividade_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'maquinario_id', referencedColumnName: 'id' },
  })
  maquinario: MachineryEntity[];

  @Column({ nullable: true })
  descricao?: string;

  @Column({ name: 'quantidade_usada', type: 'numeric', precision: 15, scale: 3, nullable: true })
  quantidadeUsada?: number;

  @Column({ name: 'data_inicio', type: 'timestamptz' })
  dataInicio: Date;

  @Column({ name: 'data_fim', type: 'timestamptz' })
  dataFim: Date;

  @Column({ type: 'enum', enum: ActivityStatus, default: ActivityStatus.PENDENTE })
  status: ActivityStatus;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}