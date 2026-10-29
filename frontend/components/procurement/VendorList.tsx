import React from 'react';
import { useFetchSupplierRequisitions } from '../../customHooks/procurement/useFetchSupplierRequisitions';

interface VendorListProps {
  storeId: string;
}

/** Shows requisitions for the store, grouped by status, as a quick vendor-facing summary. */
export default function VendorList({ storeId }: VendorListProps) {
  const { requisitions, loading } = useFetchSupplierRequisitions(storeId);

  if (loading) return <p>Loading requisitions...</p>;

  return (
    <ul>
      {requisitions.map((r) => (
        <li key={r.id}>
          {r.itemId} — {r.quantity} units ({r.status})
        </li>
      ))}
    </ul>
  );
}
