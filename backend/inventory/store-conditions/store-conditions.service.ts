import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { StoreCondition } from './entities/store-condition.entity';
import { CreateStoreConditionDto } from './dto/create-store-condition.dto';

@Injectable()
export class StoreConditionsService {
  private readonly conditions: StoreCondition[] = [];

  create(dto: CreateStoreConditionDto): StoreCondition {
    const condition: StoreCondition = { id: randomUUID(), ...dto };
    this.conditions.push(condition);
    return condition;
  }

  findAll(storeId?: string): StoreCondition[] {
    return storeId ? this.conditions.filter((c) => c.storeId === storeId) : this.conditions;
  }

  findOne(id: string): StoreCondition {
    const condition = this.conditions.find((c) => c.id === id);
    if (!condition) throw new NotFoundException(`Store condition ${id} not found`);
    return condition;
  }

  remove(id: string): void {
    const index = this.conditions.findIndex((c) => c.id === id);
    if (index === -1) throw new NotFoundException(`Store condition ${id} not found`);
    this.conditions.splice(index, 1);
  }
}
