import { Module } from '@nestjs/common';
import { ParagraphEditionController } from 'src/modules/paragraph-edition/paragraph-edition.controller';
import { ParagraphEditionService } from 'src/modules/paragraph-edition/paragraph-edition.service';

@Module({
  imports: [],
  controllers: [ParagraphEditionController],
  providers: [ParagraphEditionService],
  exports: [ParagraphEditionService],
})
export class ParagraphEditionModule {}
