import {
  IsEnum, IsNotEmpty, IsNumber,
  IsOptional, IsPositive, IsString,
} from 'class-validator';
import { MovementType } from '../entities/movement.entity';
import { Type } from 'class-transformer';

export class CreateMovementDto {
  @IsNumber()
  @IsNotEmpty()
  produtoId: number;

  @IsNumber()
  @IsNotEmpty()
  siloId: number;

  @IsEnum(MovementType)
  @IsNotEmpty()
  tipo: MovementType;

  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  quantidade: number;

  @IsString()
  @IsOptional()
  observacao?: string;
}