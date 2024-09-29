import { Module } from '@nestjs/common';
import { ParagraphEditionCommentController } from 'src/modules/paragraph-edition-comment/paragraph-edition-comment.controller';
import { ParagraphEditionCommentService } from 'src/modules/paragraph-edition-comment/paragraph-edition-comment.service';

@Module({
  controllers: [ParagraphEditionCommentController],
  providers: [ParagraphEditionCommentService],
  exports: [ParagraphEditionCommentService],
})
export class ParagraphEditionCommentModule {}
