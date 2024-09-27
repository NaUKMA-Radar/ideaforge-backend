import { Module } from '@nestjs/common';
import { DocumentModule } from 'src/modules/document/document.module';
import { StageTypeModule } from 'src/modules/stage-type/stage-type.module';
import { StageController } from 'src/modules/stage/stage.controller';
import { StageService } from 'src/modules/stage/stage.service';

@Module({
  imports: [StageTypeModule, DocumentModule],
  controllers: [StageController],
  providers: [StageService],
  exports: [StageService],
})
export class StageModule {}
