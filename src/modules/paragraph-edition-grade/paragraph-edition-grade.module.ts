import { Module } from '@nestjs/common';
import { ParagraphEditionGradeService } from 'src/modules/paragraph-edition-grade/paragraph-edition-grade.service';

@Module({
  providers: [ParagraphEditionGradeService],
  exports: [ParagraphEditionGradeService],
})
export class ParagraphEditionGradeModule {}
