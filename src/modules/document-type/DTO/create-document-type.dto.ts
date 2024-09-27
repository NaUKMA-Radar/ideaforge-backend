import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { DocumentTypeEntity } from 'src/modules/document-type/entities/document-type.entity';

export class CreateDocumentTypeDto implements Pick<DocumentTypeEntity, 'name'> {
  @ApiProperty({
    description: 'The name of the document type',
    examples: ['presentation'],
    default: 'presentation',
  })
  @MaxLength(50)
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  name: string;
}
