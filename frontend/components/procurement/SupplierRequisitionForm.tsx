import React, { useState } from 'react';

interface SupplierRequisitionFormProps {
  storeId: string;
  onCreated: (requisitionId: string) => void;
}

export default function SupplierRequisitionForm({ storeId, onCreated }: SupplierRequisitionFormProps) {
  const [itemId, setItemId] = useState('');
  const [quantity, setQuantity] = useState(0);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const response = await fetch('/api/procurement/supplier-requisition-form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ itemId, storeId, quantity, createdBy: 'current-user' }),
    });
    const created = await response.json();
    onCreated(created.id);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Item
        <input value={itemId} onChange={(e) => setItemId(e.target.value)} />
      </label>
      <label>
        Quantity
        <input type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
      </label>
      <button type="submit">Create requisition</button>
    </form>
  );
}
