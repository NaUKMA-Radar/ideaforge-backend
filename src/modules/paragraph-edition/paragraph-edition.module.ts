import { Module } from '@nestjs/common';
import { ParagraphEditionCommentModule } from 'src/modules/paragraph-edition-comment/paragraph-edition-comment.module';
import { ParagraphEditionController } from 'src/modules/paragraph-edition/paragraph-edition.controller';
import { ParagraphEditionService } from 'src/modules/paragraph-edition/paragraph-edition.service';

@Module({
  imports: [ParagraphEditionCommentModule],
  controllers: [ParagraphEditionController],
  providers: [ParagraphEditionService],
  exports: [ParagraphEditionService],
})
export class ParagraphEditionModule {}
