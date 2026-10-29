import { Module } from '@nestjs/common';
import { ThresholdsModule } from './inventory/thresholds/thresholds.module';
import { StockManagementModule } from './inventory/stock-management/stock-management.module';
import { LowStockAlertModule } from './inventory/low-stock-alert/low-stock-alert.module';
import { StoreConditionsModule } from './inventory/store-conditions/store-conditions.module';
import { SupplierRequisitionFormModule } from './procurement/supplier-requisition-form/supplier-requisition-form.module';
import { VendorModule } from './procurement/vendor/vendor.module';
import { GeneralInfoModule } from './procurement/general-info/general-info.module';
import { DeliveryNotesModule } from './procurement/delivery-notes/delivery-notes.module';

@Module({
  imports: [
    ThresholdsModule,
    StockManagementModule,
    LowStockAlertModule,
    StoreConditionsModule,
    SupplierRequisitionFormModule,
    VendorModule,
    GeneralInfoModule,
    DeliveryNotesModule,
  ],
})
export class AppModule {}
