import React from 'react';
import { useFetchThresholds } from '../../customHooks/inventory/useFetchThresholds';

interface ThresholdListProps {
  storeId: string;
}

export default function ThresholdList({ storeId }: ThresholdListProps) {
  const { thresholds, loading } = useFetchThresholds(storeId);

  if (loading) return <p>Loading thresholds...</p>;

  return (
    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Reorder point</th>
          <th>Reorder quantity</th>
        </tr>
      </thead>
      <tbody>
        {thresholds.map((t) => (
          <tr key={t.id}>
            <td>{t.itemId}</td>
            <td>{t.reorderPoint}</td>
            <td>{t.reorderQuantity}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
