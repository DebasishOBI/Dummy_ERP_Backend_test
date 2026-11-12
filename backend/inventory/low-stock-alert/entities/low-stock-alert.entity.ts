export class LowStockAlert {
  id: string;
  itemId: string;
  storeId: string;
  currentStock: number;
  reorderPoint: number;
  priority: 'HIGH' | 'NORMAL';
  triggeredAt: Date;
  acknowledged: boolean;
}
