import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import type { Geometry } from 'geojson'; // <--- MUDANÇA AQUI: Adicionado "type"

@Entity({ name: 'talhoes', schema: 'lands' })
export class TalhaoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  nome: string;

  @Column({ name: 'area_hectares', type: 'decimal', precision: 10, scale: 2, nullable: true })
  areaHectares: number;

  @Column({
    type: 'geometry',
    spatialFeatureType: 'Polygon',
    srid: 4326,
    nullable: false,
  })
  geometria: Geometry;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}