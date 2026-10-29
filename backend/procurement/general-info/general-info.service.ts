import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { GeneralInfo } from './entities/general-info.entity';

@Injectable()
export class GeneralInfoService {
  private readonly records: GeneralInfo[] = [];

  create(data: Omit<GeneralInfo, 'id'>): GeneralInfo {
    const record: GeneralInfo = { id: randomUUID(), ...data };
    this.records.push(record);
    return record;
  }

  findAll(category?: string): GeneralInfo[] {
    return category ? this.records.filter((r) => r.category === category) : this.records;
  }

  findOne(id: string): GeneralInfo {
    const record = this.records.find((r) => r.id === id);
    if (!record) throw new NotFoundException(`General info ${id} not found`);
    return record;
  }
}
