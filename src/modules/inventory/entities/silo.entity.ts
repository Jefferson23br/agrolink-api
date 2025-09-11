import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'silos', schema: 'inventory' })
export class SiloEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
  nome: string;

  @Column({ type: 'numeric', precision: 15, scale: 3, nullable: false })
  capacidade: number;

  @Column({ name: 'unidade_medida', type: 'varchar', length: 50, nullable: false })
  unidadeMedida: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}