import { Module } from '@nestjs/common';
import { StageTypeModule } from 'src/modules/stage-type/stage-type.module';
import { StageController } from 'src/modules/stage/stage.controller';
import { StageService } from 'src/modules/stage/stage.service';

@Module({
  imports: [StageTypeModule],
  controllers: [StageController],
  providers: [StageService],
  exports: [StageService],
})
export class StageModule {}
