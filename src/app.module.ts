import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './core/database/database.module';
import { LandsModule } from './modules/lands/lands.module';
import { CropCyclesModule } from './modules/crop-cycles/crop-cycles.module';
import { TaskTypesModule } from './modules/task-types/task-types.module';
import { ActivitiesModule } from './modules/activities/activities.module';
import { CropsModule } from './modules/crops/crops.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { PeopleModule } from './modules/people/people.module';
import { AssetsModule } from './modules/assets/assets.module';



@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    LandsModule,
    CropCyclesModule,
    TaskTypesModule,
    ActivitiesModule,
    CropsModule,
    InventoryModule,
    PeopleModule,
    AssetsModule, 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}