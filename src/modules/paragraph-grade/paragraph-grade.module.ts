import { Module } from '@nestjs/common';
import { ParagraphGradeService } from 'src/modules/paragraph-grade/paragraph-grade.service';

@Module({
  providers: [ParagraphGradeService],
  exports: [ParagraphGradeService],
})
export class ParagraphGradeModule {}
