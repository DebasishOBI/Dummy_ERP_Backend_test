export type RequisitionStatus = 'DRAFT' | 'SUBMITTED' | 'APPROVED' | 'REJECTED';

export class SupplierRequisitionForm {
  id: string;
  itemId: string;
  storeId: string;
  quantity: number;
  status: RequisitionStatus;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}
