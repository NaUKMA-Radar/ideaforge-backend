import { Module } from '@nestjs/common';
import { ParagraphController } from 'src/modules/paragraph/paragraph.controller';
import { ParagraphService } from 'src/modules/paragraph/paragraph.service';

@Module({
  imports: [],
  controllers: [ParagraphController],
  providers: [ParagraphService],
  exports: [ParagraphService],
})
export class ParagraphModule {}
