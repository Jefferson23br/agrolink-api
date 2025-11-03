import {
  Controller, Get, Post, Body, Patch,
  Param, Delete, ParseIntPipe, HttpCode,
} from '@nestjs/common';
import { MachineryService } from './machinery.service';
import { CreateMachineryDto } from './dto/create-machinery.dto';
import { UpdateMachineryDto } from './dto/update-machinery.dto';

@Controller('machinery')
export class MachineryController {
  constructor(private readonly machineryService: MachineryService) {}

  @Post()
  create(@Body() createMachineryDto: CreateMachineryDto) {
    return this.machineryService.create(createMachineryDto);
  }

  @Get()
  findAll() {
    return this.machineryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.machineryService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMachineryDto: UpdateMachineryDto,
  ) {
    return this.machineryService.update(id, updateMachineryDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.machineryService.remove(id);
  }
}