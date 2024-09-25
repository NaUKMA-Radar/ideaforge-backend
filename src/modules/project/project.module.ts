import { Module } from '@nestjs/common';
import { ProjectController } from 'src/modules/project/project.controller';
import { ProjectService } from 'src/modules/project/project.service';
import { StageModule } from 'src/modules/stage/stage.module';

@Module({
  imports: [StageModule],
  controllers: [ProjectController],
  providers: [ProjectService],
  exports: [],
})
export class ProjectModule {}
