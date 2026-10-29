import { Module } from '@nestjs/common';
import { LowStockAlertController } from './low-stock-alert.controller';
import { LowStockAlertService } from './low-stock-alert.service';
import { ThresholdsModule } from '../thresholds/thresholds.module';
import { StockManagementModule } from '../stock-management/stock-management.module';

@Module({
  imports: [ThresholdsModule, StockManagementModule],
  controllers: [LowStockAlertController],
  providers: [LowStockAlertService],
  exports: [LowStockAlertService],
})
export class LowStockAlertModule {}
