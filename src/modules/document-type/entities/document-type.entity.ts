import { ApiProperty } from '@nestjs/swagger';
import { DocumentType } from '@prisma/client';
import {
  IsDate,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxDate,
  MaxLength,
} from 'class-validator';
import { DocumentEntity } from 'src/modules/document/entities/document.entity';

export class DocumentTypeEntity implements DocumentType {
  @ApiProperty({
    description: 'The id of the document type',
    examples: [1, 2, 3, 4, 5],
    default: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  @IsDefined()
  id: number;

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

  @ApiProperty({
    description: 'Document type creation date and time',
    examples: [new Date('2024-01-03'), new Date('2023-11-02'), new Date('2023-06-30')],
    default: new Date('2024-01-03'),
  })
  @IsDate()
  @MaxDate(new Date())
  @IsNotEmpty()
  @IsDefined()
  createdAt: Date;

  @ApiProperty({
    description: 'Document type last updated date and time',
    examples: [new Date('2024-01-03'), new Date('2023-11-02'), new Date('2023-06-30')],
    default: new Date('2024-01-03'),
  })
  @IsDate()
  @MaxDate(new Date())
  @IsNotEmpty()
  @IsDefined()
  updatedAt: Date;

  @ApiProperty({ description: 'The list of documents for the document type' })
  documents?: DocumentEntity[];
}
