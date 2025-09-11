import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly repository: Repository<ProductEntity>,
  ) {}

  create(dto: CreateProductDto) {
    const product = this.repository.create(dto);
    return this.repository.save(product);
  }

  findAll() {
    return this.repository.find();
  }

  async findOne(id: number) {
    const product = await this.repository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Produto com o ID #${id} não encontrado.`);
    }
    return product;
  }

  async update(id: number, dto: UpdateProductDto) {
    const product = await this.repository.preload({ id, ...dto });
    if (!product) {
      throw new NotFoundException(`Produto com o ID #${id} não encontrado.`);
    }
    return this.repository.save(product);
  }

  async remove(id: number): Promise<void> {
    const product = await this.findOne(id);
    await this.repository.remove(product);
  }
}