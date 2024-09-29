import { Module } from '@nestjs/common';
import { ParagraphCommentController } from 'src/modules/paragraph-comment/paragraph-comment.controller';
import { ParagraphCommentService } from 'src/modules/paragraph-comment/paragraph-comment.service';

@Module({
  controllers: [ParagraphCommentController],
  providers: [ParagraphCommentService],
  exports: [ParagraphCommentService],
})
export class ParagraphCommentModule {}
