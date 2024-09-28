import { Module } from '@nestjs/common';
import { ParagraphEditionModule } from 'src/modules/paragraph-edition/paragraph-edition.module';
import { ParagraphController } from 'src/modules/paragraph/paragraph.controller';
import { ParagraphService } from 'src/modules/paragraph/paragraph.service';

@Module({
  imports: [ParagraphEditionModule],
  controllers: [ParagraphController],
  providers: [ParagraphService],
  exports: [ParagraphService],
})
export class ParagraphModule {}
