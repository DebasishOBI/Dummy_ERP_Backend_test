export class LowStockAlert {
  id: string;
  itemId: string;
  storeId: string;
  currentStock: number;
  reorderPoint: number;
  triggeredAt: Date;
  acknowledged: boolean;
}
