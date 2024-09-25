import { Module } from '@nestjs/common';
import { ProjectController } from 'src/modules/project/project.controller';
import { ProjectService } from 'src/modules/project/project.service';

@Module({
  controllers: [ProjectController],
  providers: [ProjectService],
  exports: [],
})
export class ProjectModule {}
