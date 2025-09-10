import { IsDateString, IsEnum, IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';
import { TipoEventoHistorico } from '../../entities/historico-colaborador.entity';

export class CreateHistoricoDto {
  @IsEnum(TipoEventoHistorico)
  @IsNotEmpty()
  tipoEvento: TipoEventoHistorico;

  @IsDateString()
  @IsNotEmpty()
  dataEvento: Date;

  @IsString()
  @IsNotEmpty()
  descricao: string;

  @IsObject()
  @IsOptional()
  detalhesJson?: object;
}