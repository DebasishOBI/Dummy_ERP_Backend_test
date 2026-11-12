import { Test, TestingModule } from '@nestjs/testing';
import { LowStockAlertService } from './low-stock-alert.service';
import { ThresholdsService } from '../thresholds/thresholds.service';
import { StockManagementService } from '../stock-management/stock-management.service';

describe('LowStockAlertService', () => {
  let service: LowStockAlertService;
  let thresholdsService: ThresholdsService;
  let stockService: StockManagementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LowStockAlertService,
        {
          provide: ThresholdsService,
          useValue: {
            isBelowReorderPoint: jest.fn(),
          },
        },
        {
          provide: StockManagementService,
          useValue: {
            getCurrentStock: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<LowStockAlertService>(LowStockAlertService);
    thresholdsService = module.get<ThresholdsService>(ThresholdsService);
    stockService = module.get<StockManagementService>(StockManagementService);
  });

  it('should set priority to HIGH when currentStock < 0.5 * reorderPoint', () => {
    jest.spyOn(stockService, 'getCurrentStock').mockReturnValue(30);
    jest.spyOn(thresholdsService, 'isBelowReorderPoint').mockReturnValue({
      isBelowReorder: true,
      reorderPoint: 100,
      reorderQuantity: 50,
    });

    const alert = service.checkAndAlert('item1', 'store1');
    expect(alert).not.toBeNull();
    // @ts-ignore
    expect(alert.priority).toBe('HIGH');
  });

  it('should set priority to NORMAL when currentStock >= 0.5 * reorderPoint', () => {
    jest.spyOn(stockService, 'getCurrentStock').mockReturnValue(60);
    jest.spyOn(thresholdsService, 'isBelowReorderPoint').mockReturnValue({
      isBelowReorder: true,
      reorderPoint: 100,
      reorderQuantity: 50,
    });

    const alert = service.checkAndAlert('item1', 'store1');
    expect(alert).not.toBeNull();
    // @ts-ignore
    expect(alert.priority).toBe('NORMAL');
  });
});