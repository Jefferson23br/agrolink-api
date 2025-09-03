import { IsNotEmpty, IsNumber, IsObject, IsString } from 'class-validator';

export class CreateTalhaoDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsNumber()
  areaHectares: number;

  @IsObject()
  @IsNotEmpty()
  geometria: any; // Para a geometria, usaremos 'any' por enquanto para simplificar
}