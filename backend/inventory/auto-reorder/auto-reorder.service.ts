import { Injectable, NotFoundException } from '@nestjs/common';
import { StockManagementService } from '../stock-management/stock-management.service';
import { ThresholdsService } from '../thresholds/thresholds.service';
import { SupplierRequisitionFormService } from '../../procurement/supplier-requisition-form/supplier-requisition-form.service';
import { CreateSupplierRequisitionFormDto } from '../../procurement/supplier-requisition-form/dto/create-supplier-requisition-form.dto';

/**
 * Auto Reorder Service
 * Checks current stock against reorder point and creates a requisition if needed.
 */
@Injectable()
export class AutoReorderService {
  constructor(
    private readonly stockService: StockManagementService,
    private readonly thresholdsService: ThresholdsService,
    private readonly requisitionService: SupplierRequisitionFormService,
  ) {}

  /**
   * Trigger auto reorder for a specific item and store.
   * @param itemId Item identifier
   * @param storeId Store identifier
   * @returns requisition id if created, null otherwise
   */
  async trigger(itemId: string, storeId: string): Promise<string | null> {
    const currentStock = this.stockService.getCurrentStock(itemId, storeId);
    const { isBelowReorder, reorderQuantity } = this.thresholdsService.isBelowReorderPoint(itemId, storeId, currentStock);
    if (!isBelowReorder) return null;
    if (reorderQuantity <= 0) {
      throw new NotFoundException('Reorder quantity is zero');
    }
    const dto: CreateSupplierRequisitionFormDto = {
      itemId,
      storeId,
      quantity: reorderQuantity,
      createdBy: 'system-auto-reorder-service',
    };
    const requisition = this.requisitionService.create(dto);
    this.requisitionService.submit(requisition.id);
    return requisition.id;
  }
}
