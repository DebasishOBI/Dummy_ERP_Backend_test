import React from 'react';
import ThresholdList from '../../components/inventory/ThresholdList';
import StockManagementTable from '../../components/inventory/StockManagementTable';

export default function ThresholdsPage() {
  const storeId = 'store-1';
  return (
    <main>
      <h1>Stock Monitoring &amp; Alerts</h1>
      <ThresholdList storeId={storeId} />
      <StockManagementTable storeId={storeId} />
    </main>
  );
}
