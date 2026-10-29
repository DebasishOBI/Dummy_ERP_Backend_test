import { useEffect, useState } from 'react';

export interface StockRecord {
  id: string;
  itemId: string;
  storeId: string;
  currentStock: number;
  unit: string;
}

/** Fetches current stock records for a store. */
export function useFetchStockManagement(storeId: string) {
  const [stock, setStock] = useState<StockRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetch(`/api/inventory/stock-management?storeId=${storeId}`)
      .then((res) => res.json())
      .then((data) => {
        if (active) setStock(data);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [storeId]);

  return { stock, loading };
}
