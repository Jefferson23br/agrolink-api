import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PropriedadeEntity } from './propriedade.entity';

@Entity({ name: 'talhoes', schema: 'lands' })
export class TalhaoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'propriedade_id', type: 'int', nullable: false })
  propriedadeId: number;
  
  @Column({ type: 'varchar', length: 255, nullable: false })
  nome: string;

  @Column({
    name: 'area_hectares',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  areaHectares: number;

  @Column({
    type: 'geometry',
    spatialFeatureType: 'Polygon',
    srid: 4326,
    nullable: false,
  })
  geometria;

  @ManyToOne(() => PropriedadeEntity, (propriedade) => propriedade.talhoes)
  @JoinColumn({ name: 'propriedade_id', referencedColumnName: 'id' })
  propriedade: PropriedadeEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}