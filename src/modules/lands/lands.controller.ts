import { Body, Controller, Get, Param, ParseIntPipe, Post, Patch, Delete, HttpCode } from '@nestjs/common';
import { LandsService } from './lands.service';
import { CreateTalhaoDto } from './dto/create-talhao.dto';
import { UpdateTalhaoDto } from './dto/update-talhao.dto';

@Controller('lands')
export class LandsController {
  constructor(private readonly landsService: LandsService) {}

  @Get()
  findAll() {
    return this.landsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.landsService.findOne(id);
  }

  @Post()
  create(@Body() createTalhaoDto: CreateTalhaoDto) {
    return this.landsService.create(createTalhaoDto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTalhaoDto: UpdateTalhaoDto,
  ) {
    return this.landsService.update(id, updateTalhaoDto);
  }

  // --- NOVO MÉTODO DE DELEÇÃO ABAIXO ---
  @Delete(':id')
  @HttpCode(204) // Define o código de status HTTP para 204 No Content
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.landsService.remove(id);
  }
}