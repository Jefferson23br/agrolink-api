import { PartialType } from '@nestjs/mapped-types';
import { CreateTalhaoDto } from './create-talhao.dto';

export class UpdateTalhaoDto extends PartialType(CreateTalhaoDto) {}