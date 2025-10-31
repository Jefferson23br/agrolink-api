import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpCode,
} from '@nestjs/common';
import { SilosService } from './silos.service';
import { CreateSiloDto } from './dto/create-silo.dto';
import { UpdateSiloDto } from './dto/update-silo.dto';

@Controller('silos')
export class SilosController {
  constructor(private readonly silosService: SilosService) {}

  @Post()
  create(@Body() createSiloDto: CreateSiloDto) {
    return this.silosService.create(createSiloDto);
  }

  @Get()
  findAll() {
    return this.silosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.silosService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSiloDto: UpdateSiloDto,
  ) {
    return this.silosService.update(id, updateSiloDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.silosService.remove(id);
  }

  @Get(':id/estoque')
  findSiloStock(@Param('id', ParseIntPipe) id: number) {
    return this.silosService.findStock(id);
  }

  @Get(':id/movimentacoes')
  findSiloMovements(@Param('id', ParseIntPipe) id: number) {
    return this.silosService.findMovements(id);
  }
}