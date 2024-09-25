import { Module } from '@nestjs/common';
import { StageTypeController } from 'src/modules/stage-type/stage-type.controller';
import { StageTypeService } from 'src/modules/stage-type/stage-type.service';

@Module({
  controllers: [StageTypeController],
  providers: [StageTypeService],
})
export class StageTypeModule {}
