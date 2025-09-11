import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { PropriedadesService } from './propriedades.service';
import { CreatePropriedadeDto } from './dto/create-propriedade.dto';
import { UpdatePropriedadeDto } from './dto/update-propriedade.dto';

@Controller('propriedades')
export class PropriedadesController {
  constructor(private readonly service: PropriedadesService) {}

  @Post()
  create(@Body() dto: CreatePropriedadeDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePropriedadeDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}