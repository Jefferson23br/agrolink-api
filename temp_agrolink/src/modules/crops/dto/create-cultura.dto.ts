import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCulturaDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsOptional()
  descricao?: string;
}