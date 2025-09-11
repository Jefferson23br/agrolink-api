import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ColaboradorEntity } from './colaborador.entity';

export enum TipoEventoHistorico {
  AUMENTO_SALARIO = 'AUMENTO_SALARIO',
  FALTA = 'FALTA',
  FERIAS = 'FERIAS',
  REGISTRO_HORAS = 'REGISTRO_HORAS',
  ADVERTENCIA = 'ADVERTENCIA',
  PROMOCAO = 'PROMOCAO',
  OUTRO = 'OUTRO',
}

@Entity({ name: 'historico_colaborador', schema: 'people' })
export class HistoricoColaboradorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ColaboradorEntity, { nullable: false })
  @JoinColumn({ name: 'colaborador_id' })
  colaborador: ColaboradorEntity;

  @Column({ name: 'tipo_evento', type: 'enum', enum: TipoEventoHistorico })
  tipoEvento: TipoEventoHistorico;

  @Column({ name: 'data_evento', type: 'date' })
  dataEvento: Date;

  @Column({ type: 'text' })
  descricao: string;

  @Column({ name: 'detalhes_json', type: 'jsonb', nullable: true })
  detalhesJson?: object;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}