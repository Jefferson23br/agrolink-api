import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export enum TipoMaquinario {
  TRATOR = 'TRATOR',
  COLHEITADEIRA = 'COLHEITADEIRA',
  PULVERIZADOR = 'PULVERIZADOR',
  SEMEADORA = 'SEMEADORA',
  IMPLEMENTO = 'IMPLEMENTO',
}

export enum StatusMaquinario {
  ATIVO = 'ATIVO',
  EM_MANUTENCAO = 'EM_MANUTENCAO',
  INATIVO = 'INATIVO',
}

@Entity({ name: 'maquinario', schema: 'assets' })
export class MachineryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  identificacao: string;

  @Column()
  marca: string;

  @Column()
  modelo: string;

  @Column()
  ano: number;

  @Column({ type: 'enum', enum: TipoMaquinario })
  tipo: TipoMaquinario;

  @Column({ type: 'enum', enum: StatusMaquinario, default: StatusMaquinario.ATIVO })
  status: StatusMaquinario;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}