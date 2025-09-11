import { Controller, Post, Body, Get, Param, ParseIntPipe } from '@nestjs/common';
import { MovementsService } from './movements.service';
import { CreateMovementDto } from '../dto/create-movement.dto';

@Controller('movements')
export class MovementsController {
  constructor(private readonly movementsService: MovementsService) {}

  @Post()
  create(@Body() createMovementDto: CreateMovementDto) {
    console.log('Dados recebidos no controlador:', createMovementDto);
    return this.movementsService.create(createMovementDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.movementsService.findOne(id);
  }
}