import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

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

  @IsNumber()
  @IsOptional()
  quantidadeUsada?: number;

  @IsDateString()
  @IsOptional()
  dataInicio?: Date;

  @IsString()
  @IsOptional()
  status?: string;
}