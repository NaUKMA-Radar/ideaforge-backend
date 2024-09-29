import { Module } from '@nestjs/common';
import { ParagraphEditionCommentModule } from 'src/modules/paragraph-edition-comment/paragraph-edition-comment.module';
import { ParagraphEditionGradeModule } from 'src/modules/paragraph-edition-grade/paragraph-edition-grade.module';
import { ParagraphEditionController } from 'src/modules/paragraph-edition/paragraph-edition.controller';
import { ParagraphEditionService } from 'src/modules/paragraph-edition/paragraph-edition.service';

@Module({
  imports: [ParagraphEditionCommentModule, ParagraphEditionGradeModule],
  controllers: [ParagraphEditionController],
  providers: [ParagraphEditionService],
  exports: [ParagraphEditionService],
})
export class ParagraphEditionModule {}
