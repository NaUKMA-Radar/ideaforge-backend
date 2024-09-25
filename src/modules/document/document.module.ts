import { Module } from '@nestjs/common';
import { DocumentTypeModule } from 'src/modules/document-type/document-type.module';
import { DocumentController } from 'src/modules/document/document.controller';
import { DocumentService } from 'src/modules/document/document.service';

@Module({
  imports: [DocumentTypeModule],
  controllers: [DocumentController],
  providers: [DocumentService],
  exports: [DocumentService],
})
export class DocumentModule {}
