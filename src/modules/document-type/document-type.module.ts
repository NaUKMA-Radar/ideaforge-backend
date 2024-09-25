import { Module } from '@nestjs/common';
import { DocumentTypeController } from 'src/modules/document-type/document-type.controller';
import { DocumentTypeService } from 'src/modules/document-type/document-type.service';

@Module({
  controllers: [DocumentTypeController],
  providers: [DocumentTypeService],
})
export class DocumentTypeModule {}
