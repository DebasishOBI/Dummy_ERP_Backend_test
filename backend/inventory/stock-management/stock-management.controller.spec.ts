import { Test, TestingModule } from '@nestjs/testing';
import { StockManagementController } from './stock-management.controller';
import { StockManagementService } from './stock-management.service';

describe('StockManagementController', () => {
  let controller: StockManagementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StockManagementController],
      providers: [StockManagementService],
    }).compile();

    controller = module.get<StockManagementController>(StockManagementController);
  });

  it('is defined', () => {
    expect(controller).toBeDefined();
  });

  it('reports current stock for an item/store', () => {
    controller.create({ itemId: 'item-1', storeId: 'store-1', currentStock: 25, unit: 'pcs' });
    expect(controller.getCurrentStock('item-1', 'store-1')).toEqual({ currentStock: 25 });
  });
});
