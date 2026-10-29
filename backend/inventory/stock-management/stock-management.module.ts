import { Module } from '@nestjs/common';
import { StockManagementController } from './stock-management.controller';
import { StockManagementService } from './stock-management.service';

@Module({
  controllers: [StockManagementController],
  providers: [StockManagementService],
  exports: [StockManagementService],
})
export class StockManagementModule {}
