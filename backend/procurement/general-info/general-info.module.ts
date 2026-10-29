import { Module } from '@nestjs/common';
import { GeneralInfoController } from './general-info.controller';
import { GeneralInfoService } from './general-info.service';

@Module({
  controllers: [GeneralInfoController],
  providers: [GeneralInfoService],
  exports: [GeneralInfoService],
})
export class GeneralInfoModule {}
