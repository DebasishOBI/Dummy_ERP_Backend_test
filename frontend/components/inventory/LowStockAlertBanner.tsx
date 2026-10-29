import React from 'react';

interface LowStockAlertBannerProps {
  itemId: string;
  currentStock: number;
  onAcknowledge: () => void;
}

/** Shown on the Low Stock Alert feature's screen when an item has fallen below its reorder point. */
export default function LowStockAlertBanner({ itemId, currentStock, onAcknowledge }: LowStockAlertBannerProps) {
  return (
    <div role="alert">
      <strong>Low stock:</strong> item {itemId} is at {currentStock} units.
      <button onClick={onAcknowledge}>Acknowledge</button>
    </div>
  );
}
