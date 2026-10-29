import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { StockManagement } from './entities/stock-management.entity';
import { CreateStockManagementDto } from './dto/create-stock-management.dto';
import { UpdateStockManagementDto } from './dto/update-stock-management.dto';

@Injectable()
export class StockManagementService {
  private readonly records: StockManagement[] = [];

  create(dto: CreateStockManagementDto): StockManagement {
    const record: StockManagement = { id: randomUUID(), ...dto, updatedAt: new Date() };
    this.records.push(record);
    return record;
  }

  findAll(storeId?: string): StockManagement[] {
    return storeId ? this.records.filter((r) => r.storeId === storeId) : this.records;
  }

  findOne(id: string): StockManagement {
    const record = this.records.find((r) => r.id === id);
    if (!record) throw new NotFoundException(`Stock record ${id} not found`);
    return record;
  }

  update(id: string, dto: UpdateStockManagementDto): StockManagement {
    const record = this.findOne(id);
    Object.assign(record, dto, { updatedAt: new Date() });
    return record;
  }

  remove(id: string): void {
    const index = this.records.findIndex((r) => r.id === id);
    if (index === -1) throw new NotFoundException(`Stock record ${id} not found`);
    this.records.splice(index, 1);
  }

  /** Current available stock for an item at a store (0 when there is no record yet). */
  getCurrentStock(itemId: string, storeId: string): number {
    return this.records.find((r) => r.itemId === itemId && r.storeId === storeId)?.currentStock ?? 0;
  }

  /** Applies a stock movement (positive = received, negative = consumed/requisitioned). */
  adjustStock(itemId: string, storeId: string, delta: number): StockManagement {
    const record = this.records.find((r) => r.itemId === itemId && r.storeId === storeId);
    if (!record) throw new NotFoundException(`No stock record for item ${itemId} at store ${storeId}`);
    record.currentStock += delta;
    record.updatedAt = new Date();
    return record;
  }
}
