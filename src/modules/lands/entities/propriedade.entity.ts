import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TalhaoEntity } from './talhao.entity';

@Entity({ name: 'propriedades', schema: 'lands' })
export class PropriedadeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  nome: string;

  @Column({
    name: 'area_total_hectares',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  areaTotalHectares: number;

  @Column({
    type: 'geometry',
    spatialFeatureType: 'Polygon',
    srid: 4326,
    nullable: true,
  })
  geometria;

  @OneToMany(() => TalhaoEntity, (talhao) => talhao.propriedade)
  talhoes: TalhaoEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}