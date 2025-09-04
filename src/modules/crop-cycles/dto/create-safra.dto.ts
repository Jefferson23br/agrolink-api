import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateSafraDto {
  @IsString()
  @IsNotEmpty()
  anoSafra: string;

  @IsNumber()
  @IsNotEmpty()
  talhaoId: number;

  @IsDateString()
  @IsOptional()
  dataInicioPlanejado?: Date;

  @IsDateString()
  @IsOptional()
  dataFimPlanejado?: Date;
}