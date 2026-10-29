import { Module } from '@nestjs/common';
import { SupplierRequisitionFormController } from './supplier-requisition-form.controller';
import { SupplierRequisitionFormService } from './supplier-requisition-form.service';

@Module({
  controllers: [SupplierRequisitionFormController],
  providers: [SupplierRequisitionFormService],
  exports: [SupplierRequisitionFormService],
})
export class SupplierRequisitionFormModule {}
