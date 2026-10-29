import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { StockManagementService } from './stock-management.service';
import { CreateStockManagementDto } from './dto/create-stock-management.dto';
import { UpdateStockManagementDto } from './dto/update-stock-management.dto';

@Controller('inventory/stock-management')
export class StockManagementController {
  constructor(private readonly stockManagementService: StockManagementService) {}

  @Post()
  create(@Body() dto: CreateStockManagementDto) {
    return this.stockManagementService.create(dto);
  }

  @Get()
  findAll(@Query('storeId') storeId?: string) {
    return this.stockManagementService.findAll(storeId);
  }

  @Get('current')
  getCurrentStock(@Query('itemId') itemId: string, @Query('storeId') storeId: string) {
    return { currentStock: this.stockManagementService.getCurrentStock(itemId, storeId) };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stockManagementService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateStockManagementDto) {
    return this.stockManagementService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stockManagementService.remove(id);
  }
}
