import { useEffect, useState } from 'react';

export interface Threshold {
  id: string;
  itemId: string;
  storeId: string;
  reorderPoint: number;
  reorderQuantity: number;
}

/** Fetches the reorder-point thresholds configured for a store. */
export function useFetchThresholds(storeId: string) {
  const [thresholds, setThresholds] = useState<Threshold[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetch(`/api/inventory/thresholds?storeId=${storeId}`)
      .then((res) => res.json())
      .then((data) => {
        if (active) setThresholds(data);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [storeId]);

  return { thresholds, loading };
}
