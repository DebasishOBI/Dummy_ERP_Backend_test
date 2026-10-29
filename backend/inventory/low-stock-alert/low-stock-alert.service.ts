import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { LowStockAlert } from './entities/low-stock-alert.entity';
import { ThresholdsService } from '../thresholds/thresholds.service';
import { StockManagementService } from '../stock-management/stock-management.service';

/**
 * The "Low Stock Alert" feature: watches stock against the configured reorder point and raises an alert.
 * Deliberately stops there - it does NOT create a purchase requisition (see procurement/supplier-requisition-form
 * for that). Extending this feature to also auto-create a requisition is the scenario used in chat testing.
 */
@Injectable()
export class LowStockAlertService {
  private readonly alerts: LowStockAlert[] = [];

  constructor(
    private readonly thresholdsService: ThresholdsService,
    private readonly stockManagementService: StockManagementService,
  ) {}

  checkAndAlert(itemId: string, storeId: string): LowStockAlert | null {
    const currentStock = this.stockManagementService.getCurrentStock(itemId, storeId);
    const { isBelowReorder, reorderPoint } = this.thresholdsService.isBelowReorderPoint(itemId, storeId, currentStock);
    if (!isBelowReorder) return null;
    const alert: LowStockAlert = {
      id: randomUUID(),
      itemId,
      storeId,
      currentStock,
      reorderPoint,
      triggeredAt: new Date(),
      acknowledged: false,
    };
    this.alerts.push(alert);
    return alert;
  }

  findAll(storeId?: string): LowStockAlert[] {
    return storeId ? this.alerts.filter((a) => a.storeId === storeId) : this.alerts;
  }

  acknowledge(id: string): LowStockAlert | undefined {
    const alert = this.alerts.find((a) => a.id === id);
    if (alert) alert.acknowledged = true;
    return alert;
  }
}
