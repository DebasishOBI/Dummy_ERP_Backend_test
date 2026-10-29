import { PartialType } from '@nestjs/mapped-types';
import { CreateSupplierRequisitionFormDto } from './create-supplier-requisition-form.dto';

export class UpdateSupplierRequisitionFormDto extends PartialType(CreateSupplierRequisitionFormDto) {}
