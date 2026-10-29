import { Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { LowStockAlertService } from './low-stock-alert.service';

@Controller('inventory/low-stock-alert')
export class LowStockAlertController {
  constructor(private readonly lowStockAlertService: LowStockAlertService) {}

  @Post('check')
  checkAndAlert(@Query('itemId') itemId: string, @Query('storeId') storeId: string) {
    return this.lowStockAlertService.checkAndAlert(itemId, storeId);
  }

  @Get()
  findAll(@Query('storeId') storeId?: string) {
    return this.lowStockAlertService.findAll(storeId);
  }

  @Patch(':id/acknowledge')
  acknowledge(@Param('id') id: string) {
    return this.lowStockAlertService.acknowledge(id);
  }
}
