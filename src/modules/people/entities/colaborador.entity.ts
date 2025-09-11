import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export enum TipoContrato {
  CLT = 'CLT',
  PJ = 'PJ',
}

@Entity({ name: 'colaboradores', schema: 'people' })
export class ColaboradorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'nome_completo' })
  nomeCompleto: string;

  @Column()
  cpf: string;

  @Column({ nullable: true })
  rg?: string;

  @Column({ nullable: true })
  email?: string;

  @Column({ nullable: true })
  telefone?: string;

  @Column({ type: 'text', nullable: true })
  endereco?: string;

  @Column({ name: 'tipo_contrato', type: 'enum', enum: TipoContrato })
  tipoContrato: TipoContrato;

  @Column({ name: 'numero_contrato', nullable: true })
  numeroContrato?: string;

  @Column()
  funcao: string;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  remuneracao: number;

  @Column({ name: 'data_inicio', type: 'date' })
  dataInicio: Date;

  @Column({ name: 'data_fim', type: 'date', nullable: true })
  dataFim?: Date;

  @Column({ nullable: true })
  pis?: string;

  @Column({ nullable: true })
  ctps?: string;

  @Column({ name: 'url_documentos', type: 'text', nullable: true })
  urlDocumentos?: string;

  @Column({ default: true })
  ativo: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}