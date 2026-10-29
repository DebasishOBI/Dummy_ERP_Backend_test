import React from 'react';
import { useFetchStockManagement } from '../../customHooks/inventory/useFetchStockManagement';

interface StockManagementTableProps {
  storeId: string;
}

export default function StockManagementTable({ storeId }: StockManagementTableProps) {
  const { stock, loading } = useFetchStockManagement(storeId);

  if (loading) return <p>Loading stock...</p>;

  return (
    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Current stock</th>
          <th>Unit</th>
        </tr>
      </thead>
      <tbody>
        {stock.map((s) => (
          <tr key={s.id}>
            <td>{s.itemId}</td>
            <td>{s.currentStock}</td>
            <td>{s.unit}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
