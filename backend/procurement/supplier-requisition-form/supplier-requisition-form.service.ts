import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { SupplierRequisitionForm } from './entities/supplier-requisition-form.entity';
import { CreateSupplierRequisitionFormDto } from './dto/create-supplier-requisition-form.dto';
import { UpdateSupplierRequisitionFormDto } from './dto/update-supplier-requisition-form.dto';

/** Action: procurement.createRequisition - create a purchase requisition with the requested items. */
@Injectable()
export class SupplierRequisitionFormService {
  private readonly requisitions: SupplierRequisitionForm[] = [];

  create(dto: CreateSupplierRequisitionFormDto): SupplierRequisitionForm {
    const requisition: SupplierRequisitionForm = {
      id: randomUUID(),
      ...dto,
      status: 'DRAFT',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.requisitions.push(requisition);
    return requisition;
  }

  findAll(storeId?: string): SupplierRequisitionForm[] {
    return storeId ? this.requisitions.filter((r) => r.storeId === storeId) : this.requisitions;
  }

  findOne(id: string): SupplierRequisitionForm {
    const requisition = this.requisitions.find((r) => r.id === id);
    if (!requisition) throw new NotFoundException(`Requisition ${id} not found`);
    return requisition;
  }

  update(id: string, dto: UpdateSupplierRequisitionFormDto): SupplierRequisitionForm {
    const requisition = this.findOne(id);
    Object.assign(requisition, dto, { updatedAt: new Date() });
    return requisition;
  }

  submit(id: string): SupplierRequisitionForm {
    const requisition = this.findOne(id);
    requisition.status = 'SUBMITTED';
    requisition.updatedAt = new Date();
    return requisition;
  }

  approve(id: string): SupplierRequisitionForm {
    const requisition = this.findOne(id);
    requisition.status = 'APPROVED';
    requisition.updatedAt = new Date();
    return requisition;
  }

  reject(id: string): SupplierRequisitionForm {
    const requisition = this.findOne(id);
    requisition.status = 'REJECTED';
    requisition.updatedAt = new Date();
    return requisition;
  }

  remove(id: string): void {
    const index = this.requisitions.findIndex((r) => r.id === id);
    if (index === -1) throw new NotFoundException(`Requisition ${id} not found`);
    this.requisitions.splice(index, 1);
  }
}
