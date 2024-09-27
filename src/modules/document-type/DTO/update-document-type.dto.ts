import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString, MaxLength, ValidateIf } from 'class-validator';
import { DocumentTypeEntity } from 'src/modules/document-type/entities/document-type.entity';

export class UpdateDocumentTypeDto implements Pick<Partial<DocumentTypeEntity>, 'name'> {
  @ApiProperty({
    description: 'The name of the document type',
    examples: ['presentation'],
    default: 'presentation',
  })
  @MaxLength(50)
  @IsString()
  @ValidateIf((_, value) => value)
  name?: string;
}
