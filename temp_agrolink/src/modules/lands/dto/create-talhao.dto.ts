import { IsNotEmpty, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';

export class CreateTalhaoDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsNumber()
  @IsOptional() 
  areaHectares?: number;

  @IsObject()
  @IsNotEmpty()
  geometria: any;

  @IsNumber()
  @IsNotEmpty()
  propriedadeId: number;
}