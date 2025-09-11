import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateSiloDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsNumber()
  @IsPositive()
  capacidade: number;

  @IsString()
  @IsNotEmpty()
  unidadeMedida: string;
}