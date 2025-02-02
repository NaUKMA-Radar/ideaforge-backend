import { Module } from '@nestjs/common';
import { ParagraphCommentModule } from 'src/modules/paragraph-comment/paragraph-comment.module';
import { ParagraphEditionModule } from 'src/modules/paragraph-edition/paragraph-edition.module';
import { ParagraphGradeModule } from 'src/modules/paragraph-grade/paragraph-grade.module';
import { ParagraphController } from 'src/modules/paragraph/paragraph.controller';
import { ParagraphService } from 'src/modules/paragraph/paragraph.service';

@Module({
  imports: [ParagraphEditionModule, ParagraphCommentModule, ParagraphGradeModule],
  controllers: [ParagraphController],
  providers: [ParagraphService],
  exports: [ParagraphService],
})
export class ParagraphModule {}
