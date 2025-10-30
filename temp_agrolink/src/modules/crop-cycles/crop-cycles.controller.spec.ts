import { Test, TestingModule } from '@nestjs/testing';
import { CropCyclesController } from './crop-cycles.controller';

describe('CropCyclesController', () => {
  let controller: CropCyclesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CropCyclesController],
    }).compile();

    controller = module.get<CropCyclesController>(CropCyclesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
