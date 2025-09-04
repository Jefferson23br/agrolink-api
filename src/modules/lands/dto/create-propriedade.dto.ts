import { IsNotEmpty, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';

export class CreatePropriedadeDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsNumber()
  @IsOptional()
  areaTotalHectares?: number;

  @IsObject()
  @IsOptional()
  geometria?: any;
}