import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Vendor } from './entities/vendor.entity';
import { CreateVendorDto } from './dto/create-vendor.dto';

@Injectable()
export class VendorService {
  private readonly vendors: Vendor[] = [];

  create(dto: CreateVendorDto): Vendor {
    const vendor: Vendor = { id: randomUUID(), ...dto, active: true };
    this.vendors.push(vendor);
    return vendor;
  }

  findAll(category?: string): Vendor[] {
    return category ? this.vendors.filter((v) => v.category === category) : this.vendors;
  }

  findOne(id: string): Vendor {
    const vendor = this.vendors.find((v) => v.id === id);
    if (!vendor) throw new NotFoundException(`Vendor ${id} not found`);
    return vendor;
  }

  deactivate(id: string): Vendor {
    const vendor = this.findOne(id);
    vendor.active = false;
    return vendor;
  }

  remove(id: string): void {
    const index = this.vendors.findIndex((v) => v.id === id);
    if (index === -1) throw new NotFoundException(`Vendor ${id} not found`);
    this.vendors.splice(index, 1);
  }
}
