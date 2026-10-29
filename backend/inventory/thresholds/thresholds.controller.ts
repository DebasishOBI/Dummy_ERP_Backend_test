import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ThresholdsService } from './thresholds.service';
import { CreateThresholdDto } from './dto/create-threshold.dto';
import { UpdateThresholdDto } from './dto/update-threshold.dto';

@Controller('inventory/thresholds')
export class ThresholdsController {
  constructor(private readonly thresholdsService: ThresholdsService) {}

  @Post()
  create(@Body() dto: CreateThresholdDto) {
    return this.thresholdsService.create(dto);
  }

  @Get()
  findAll(@Query('storeId') storeId?: string) {
    return this.thresholdsService.findAll(storeId);
  }

  /** Action: inventory.checkReorderLevel - evaluate stock against the configured reorder point. */
  @Get('check-reorder-level')
  checkReorderLevel(
    @Query('itemId') itemId: string,
    @Query('storeId') storeId: string,
    @Query('currentStock') currentStock: string,
  ) {
    return this.thresholdsService.isBelowReorderPoint(itemId, storeId, Number(currentStock));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.thresholdsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateThresholdDto) {
    return this.thresholdsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.thresholdsService.remove(id);
  }
}
