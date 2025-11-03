import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';
import { TipoMaquinario, StatusMaquinario } from '../../entities/machinery.entity';

export class CreateMachineryDto {
  @IsString()
  @IsNotEmpty()
  identificacao: string;

  @IsString()
  @IsNotEmpty()
  marca: string;

  @IsString()
  @IsNotEmpty()
  modelo: string;

  @IsInt()
  @Min(1950)
  ano: number;

  @IsEnum(TipoMaquinario)
  @IsNotEmpty()
  tipo: TipoMaquinario;

  @IsEnum(StatusMaquinario)
  @IsOptional()
  status?: StatusMaquinario;
}