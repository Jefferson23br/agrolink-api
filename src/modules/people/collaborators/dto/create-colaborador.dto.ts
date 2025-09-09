import { IsBoolean, IsDateString, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { TipoContrato } from '../../entities/colaborador.entity';

export class CreateColaboradorDto {
  @IsString()
  @IsNotEmpty()
  nomeCompleto: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(11)
  @MaxLength(11)
  cpf: string;

  @IsString()
  @IsOptional()
  rg?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  telefone?: string;

  @IsString()
  @IsOptional()
  endereco?: string;

  @IsEnum(TipoContrato)
  @IsNotEmpty()
  tipoContrato: TipoContrato;

  @IsString()
  @IsOptional()
  numeroContrato?: string;

  @IsString()
  @IsNotEmpty()
  funcao: string;

  @IsNumber()
  @IsNotEmpty()
  remuneracao: number;

  @IsDateString()
  @IsNotEmpty()
  dataInicio: Date;

  @IsDateString()
  @IsOptional()
  dataFim?: Date;

  @IsString()
  @IsOptional()
  pis?: string;

  @IsString()
  @IsOptional()
  ctps?: string;

  @IsString()
  @IsOptional()
  urlDocumentos?: string;

  @IsBoolean()
  @IsOptional()
  ativo?: boolean;
}