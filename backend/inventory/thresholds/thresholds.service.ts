import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Threshold } from './entities/threshold.entity';
import { CreateThresholdDto } from './dto/create-threshold.dto';
import { UpdateThresholdDto } from './dto/update-threshold.dto';

@Injectable()
export class ThresholdsService {
  private readonly thresholds: Threshold[] = [];

  create(dto: CreateThresholdDto): Threshold {
    const threshold: Threshold = { id: randomUUID(), ...dto, createdAt: new Date(), updatedAt: new Date() };
    this.thresholds.push(threshold);
    return threshold;
  }

  findAll(storeId?: string): Threshold[] {
    return storeId ? this.thresholds.filter((t) => t.storeId === storeId) : this.thresholds;
  }

  findOne(id: string): Threshold {
    const threshold = this.thresholds.find((t) => t.id === id);
    if (!threshold) throw new NotFoundException(`Threshold ${id} not found`);
    return threshold;
  }

  update(id: string, dto: UpdateThresholdDto): Threshold {
    const threshold = this.findOne(id);
    Object.assign(threshold, dto, { updatedAt: new Date() });
    return threshold;
  }

  remove(id: string): void {
    const index = this.thresholds.findIndex((t) => t.id === id);
    if (index === -1) throw new NotFoundException(`Threshold ${id} not found`);
    this.thresholds.splice(index, 1);
  }

  /** The reorder check other modules call: does this item/store need a new purchase requisition? */
  isBelowReorderPoint(
    itemId: string,
    storeId: string,
    currentStock: number,
  ): { isBelowReorder: boolean; reorderPoint: number; reorderQuantity: number } {
    const threshold = this.thresholds.find((t) => t.itemId === itemId && t.storeId === storeId);
    if (!threshold) return { isBelowReorder: false, reorderPoint: 0, reorderQuantity: 0 };
    return {
      isBelowReorder: currentStock < threshold.reorderPoint,
      reorderPoint: threshold.reorderPoint,
      reorderQuantity: threshold.reorderQuantity,
    };
  }
}
