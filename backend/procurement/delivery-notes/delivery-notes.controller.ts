import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { DeliveryNotesService } from './delivery-notes.service';
import { DeliveryNote } from './entities/delivery-note.entity';

@Controller('procurement/delivery-notes')
export class DeliveryNotesController {
  constructor(private readonly deliveryNotesService: DeliveryNotesService) {}

  @Post()
  create(@Body() data: Omit<DeliveryNote, 'id' | 'receivedAt'>) {
    return this.deliveryNotesService.create(data);
  }

  @Get()
  findByRequisition(@Query('requisitionId') requisitionId: string) {
    return this.deliveryNotesService.findByRequisition(requisitionId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deliveryNotesService.findOne(id);
  }
}
