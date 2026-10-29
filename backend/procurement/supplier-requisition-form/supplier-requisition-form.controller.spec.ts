import { Test, TestingModule } from '@nestjs/testing';
import { SupplierRequisitionFormController } from './supplier-requisition-form.controller';
import { SupplierRequisitionFormService } from './supplier-requisition-form.service';

describe('SupplierRequisitionFormController', () => {
  let controller: SupplierRequisitionFormController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SupplierRequisitionFormController],
      providers: [SupplierRequisitionFormService],
    }).compile();

    controller = module.get<SupplierRequisitionFormController>(SupplierRequisitionFormController);
  });

  it('is defined', () => {
    expect(controller).toBeDefined();
  });

  it('creates a requisition as DRAFT and moves it to SUBMITTED', () => {
    const created = controller.create({ itemId: 'item-1', storeId: 'store-1', quantity: 50, createdBy: 'system' });
    expect(created.status).toBe('DRAFT');
    const submitted = controller.submit(created.id);
    expect(submitted.status).toBe('SUBMITTED');
  });
});
