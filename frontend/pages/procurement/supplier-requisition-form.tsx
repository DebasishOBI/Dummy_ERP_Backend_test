import React, { useState } from 'react';
import SupplierRequisitionForm from '../../components/procurement/SupplierRequisitionForm';
import VendorList from '../../components/procurement/VendorList';

export default function SupplierRequisitionFormPage() {
  const storeId = 'store-1';
  const [lastCreatedId, setLastCreatedId] = useState<string | null>(null);

  return (
    <main>
      <h1>Supplier Requisition Form</h1>
      <SupplierRequisitionForm storeId={storeId} onCreated={setLastCreatedId} />
      {lastCreatedId && <p>Created requisition {lastCreatedId}</p>}
      <VendorList storeId={storeId} />
    </main>
  );
}
