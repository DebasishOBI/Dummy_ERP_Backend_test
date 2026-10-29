import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { GeneralInfoService } from './general-info.service';
import { GeneralInfo } from './entities/general-info.entity';

@Controller('procurement/general-info')
export class GeneralInfoController {
  constructor(private readonly generalInfoService: GeneralInfoService) {}

  @Post()
  create(@Body() data: Omit<GeneralInfo, 'id'>) {
    return this.generalInfoService.create(data);
  }

  @Get()
  findAll(@Query('category') category?: string) {
    return this.generalInfoService.findAll(category);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.generalInfoService.findOne(id);
  }
}
