import { Module } from '@nestjs/common';
import { StoreConditionsController } from './store-conditions.controller';
import { StoreConditionsService } from './store-conditions.service';

@Module({
  controllers: [StoreConditionsController],
  providers: [StoreConditionsService],
  exports: [StoreConditionsService],
})
export class StoreConditionsModule {}
