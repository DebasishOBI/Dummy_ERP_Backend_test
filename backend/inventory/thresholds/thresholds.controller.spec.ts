import { Test, TestingModule } from '@nestjs/testing';
import { ThresholdsController } from './thresholds.controller';
import { ThresholdsService } from './thresholds.service';

describe('ThresholdsController', () => {
  let controller: ThresholdsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ThresholdsController],
      providers: [ThresholdsService],
    }).compile();

    controller = module.get<ThresholdsController>(ThresholdsController);
  });

  it('is defined', () => {
    expect(controller).toBeDefined();
  });

  it('flags stock below the reorder point', () => {
    controller.create({ itemId: 'item-1', storeId: 'store-1', reorderPoint: 10, reorderQuantity: 50 });
    const result = controller.checkReorderLevel('item-1', 'store-1', '5');
    expect(result.isBelowReorder).toBe(true);
    expect(result.reorderQuantity).toBe(50);
  });
});
