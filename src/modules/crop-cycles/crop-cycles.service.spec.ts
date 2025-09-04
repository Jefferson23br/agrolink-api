import { Test, TestingModule } from '@nestjs/testing';
import { CropCyclesService } from './crop-cycles.service';

describe('CropCyclesService', () => {
  let service: CropCyclesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CropCyclesService],
    }).compile();

    service = module.get<CropCyclesService>(CropCyclesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
