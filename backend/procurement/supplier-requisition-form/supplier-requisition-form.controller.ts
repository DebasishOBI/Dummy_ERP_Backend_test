import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { SupplierRequisitionFormService } from './supplier-requisition-form.service';
import { CreateSupplierRequisitionFormDto } from './dto/create-supplier-requisition-form.dto';
import { UpdateSupplierRequisitionFormDto } from './dto/update-supplier-requisition-form.dto';

@Controller('procurement/supplier-requisition-form')
export class SupplierRequisitionFormController {
  constructor(private readonly supplierRequisitionFormService: SupplierRequisitionFormService) {}

  @Post()
  create(@Body() dto: CreateSupplierRequisitionFormDto) {
    return this.supplierRequisitionFormService.create(dto);
  }

  @Get()
  findAll(@Query('storeId') storeId?: string) {
    return this.supplierRequisitionFormService.findAll(storeId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.supplierRequisitionFormService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateSupplierRequisitionFormDto) {
    return this.supplierRequisitionFormService.update(id, dto);
  }

  @Post(':id/submit')
  submit(@Param('id') id: string) {
    return this.supplierRequisitionFormService.submit(id);
  }

  @Post(':id/approve')
  approve(@Param('id') id: string) {
    return this.supplierRequisitionFormService.approve(id);
  }

  @Post(':id/reject')
  reject(@Param('id') id: string) {
    return this.supplierRequisitionFormService.reject(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.supplierRequisitionFormService.remove(id);
  }
}
