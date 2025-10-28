import {
  IsArray, IsDateString, IsEnum, IsNotEmpty,
  IsNumber, IsOptional, IsString,
} from 'class-validator';
import { ActivityStatus } from '../entities/activity.entity';

export class CreateActivityDto {
  @IsNumber()
  @IsNotEmpty()
  safraId: number;

  @IsNumber()
  @IsNotEmpty()
  tipoTarefaId: number;

  @IsString()
  @IsOptional()
  descricao?: string;

  @IsDateString()
  @IsNotEmpty()
  dataInicio: Date;

  @IsDateString()
  @IsNotEmpty()
  dataFim: Date;

  @IsEnum(ActivityStatus)
  @IsOptional()
  status?: ActivityStatus;

  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  colaboradorIds?: number[];

  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  maquinarioIds?: number[];
}