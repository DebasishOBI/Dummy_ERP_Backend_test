import { Test, TestingModule } from '@nestjs/testing';
import { VendorController } from './vendor.controller';
import { VendorService } from './vendor.service';

describe('VendorController', () => {
  let controller: VendorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VendorController],
      providers: [VendorService],
    }).compile();

    controller = module.get<VendorController>(VendorController);
  });

  it('is defined', () => {
    expect(controller).toBeDefined();
  });

  it('creates an active vendor and can deactivate it', () => {
    const created = controller.create({ name: 'Acme Supplies', contactEmail: 'a@acme.test', contactPhone: '000', category: 'general' });
    expect(created.active).toBe(true);
    const deactivated = controller.deactivate(created.id);
    expect(deactivated.active).toBe(false);
  });
});
