import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { VendorService } from './vendor.service';
import { CreateVendorDto } from './dto/create-vendor.dto';

@Controller('procurement/vendor')
export class VendorController {
  constructor(private readonly vendorService: VendorService) {}

  @Post()
  create(@Body() dto: CreateVendorDto) {
    return this.vendorService.create(dto);
  }

  @Get()
  findAll(@Query('category') category?: string) {
    return this.vendorService.findAll(category);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vendorService.findOne(id);
  }

  @Patch(':id/deactivate')
  deactivate(@Param('id') id: string) {
    return this.vendorService.deactivate(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vendorService.remove(id);
  }
}
