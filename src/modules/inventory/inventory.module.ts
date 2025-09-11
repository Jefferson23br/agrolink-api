import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MovementsController } from './movements/movements.controller';
import { MovementsService } from './movements/movements.service';
import { MovementEntity } from './entities/movement.entity';
import { StockLevelEntity } from './entities/stock-level.entity';
import { SiloEntity } from './entities/silo.entity';
import { SilosModule } from './silos/silos.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductEntity,
      MovementEntity,
      StockLevelEntity,
      SiloEntity, 
    ]),
    SilosModule,
  ],
  controllers: [ProductsController, MovementsController],
  providers: [ProductsService, MovementsService],
})
export class InventoryModule {}