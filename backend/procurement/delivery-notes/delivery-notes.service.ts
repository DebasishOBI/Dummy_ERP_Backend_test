import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { DeliveryNote } from './entities/delivery-note.entity';

@Injectable()
export class DeliveryNotesService {
  private readonly notes: DeliveryNote[] = [];

  create(data: Omit<DeliveryNote, 'id' | 'receivedAt'>): DeliveryNote {
    const note: DeliveryNote = { id: randomUUID(), ...data, receivedAt: new Date() };
    this.notes.push(note);
    return note;
  }

  findByRequisition(requisitionId: string): DeliveryNote[] {
    return this.notes.filter((n) => n.requisitionId === requisitionId);
  }

  findOne(id: string): DeliveryNote {
    const note = this.notes.find((n) => n.id === id);
    if (!note) throw new NotFoundException(`Delivery note ${id} not found`);
    return note;
  }
}
