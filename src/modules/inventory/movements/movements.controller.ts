import { Controller, Post, Body } from '@nestjs/common';
import { MovementsService } from './movements.service';
import { CreateMovementDto } from '../dto/create-movement.dto';

@Controller('movements')
export class MovementsController {
  constructor(private readonly movementsService: MovementsService) {}

  @Post()
  create(@Body() createMovementDto: CreateMovementDto) {
    return this.movementsService.create(createMovementDto);
  }
}