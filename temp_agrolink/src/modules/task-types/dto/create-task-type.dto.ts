import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTaskTypeDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsOptional()
  descricao?: string;
}