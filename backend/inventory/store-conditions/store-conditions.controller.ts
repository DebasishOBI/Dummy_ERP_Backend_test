import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { StoreConditionsService } from './store-conditions.service';
import { CreateStoreConditionDto } from './dto/create-store-condition.dto';

@Controller('inventory/store-conditions')
export class StoreConditionsController {
  constructor(private readonly storeConditionsService: StoreConditionsService) {}

  @Post()
  create(@Body() dto: CreateStoreConditionDto) {
    return this.storeConditionsService.create(dto);
  }

  @Get()
  findAll(@Query('storeId') storeId?: string) {
    return this.storeConditionsService.findAll(storeId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storeConditionsService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storeConditionsService.remove(id);
  }
}
