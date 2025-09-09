import {
  Controller, Get, Post, Body, Patch,
  Param, Delete, HttpCode, ParseIntPipe,
} from '@nestjs/common';
import { CollaboratorsService } from './collaborators.service';
import { CreateColaboradorDto } from './dto/create-colaborador.dto';
import { UpdateColaboradorDto } from './dto/update-colaborador.dto';

@Controller('collaborators')
export class CollaboratorsController {
  constructor(private readonly collaboratorsService: CollaboratorsService) {}

  @Post()
  create(@Body() createColaboradorDto: CreateColaboradorDto) {
    return this.collaboratorsService.create(createColaboradorDto);
  }

  @Get()
  findAll() {
    return this.collaboratorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.collaboratorsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateColaboradorDto: UpdateColaboradorDto,
  ) {
    return this.collaboratorsService.update(id, updateColaboradorDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.collaboratorsService.remove(id);
  }
}