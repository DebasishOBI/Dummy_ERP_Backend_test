import { useEffect, useState } from 'react';

export interface SupplierRequisition {
  id: string;
  itemId: string;
  storeId: string;
  quantity: number;
  status: 'DRAFT' | 'SUBMITTED' | 'APPROVED' | 'REJECTED';
}

/** Fetches purchase requisitions raised for a store. */
export function useFetchSupplierRequisitions(storeId: string) {
  const [requisitions, setRequisitions] = useState<SupplierRequisition[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetch(`/api/procurement/supplier-requisition-form?storeId=${storeId}`)
      .then((res) => res.json())
      .then((data) => {
        if (active) setRequisitions(data);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [storeId]);

  return { requisitions, loading };
}
