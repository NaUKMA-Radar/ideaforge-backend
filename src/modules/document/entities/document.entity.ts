import { ApiProperty } from '@nestjs/swagger';
import { Document } from '@prisma/client';
import { JsonValue } from '@prisma/client/runtime/library';
import {
  IsBoolean,
  IsDate,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsUUID,
  MaxDate,
  Min,
} from 'class-validator';
import { DocumentTypeEntity } from 'src/modules/document-type/entities/document-type.entity';
import { StageEntity } from 'src/modules/stage/entities/stage.entity';
import { UserToDocumentEntity } from 'src/modules/user-to-document/entities/user-to-document.entity';

export class DocumentEntity implements Document {
  @ApiProperty({
    description: 'The UUID of the document',
    examples: ['b7af9cd4-5533-4737-862b-78bce985c987', '989d32c2-abd4-43d3-a420-ee175ae16b98'],
    default: '989d32c2-abd4-43d3-a420-ee175ae16b98',
  })
  @IsUUID()
  @IsNotEmpty()
  @IsDefined()
  id: string;

  @ApiProperty({
    description: 'The UUID of the stage of the document',
    examples: ['b7af9cd4-5533-4737-862b-78bce985c987', '989d32c2-abd4-43d3-a420-ee175ae16b98'],
    default: 'b7af9cd4-5533-4737-862b-78bce985c987',
  })
  @IsUUID()
  @IsNotEmpty()
  @IsDefined()
  stageId: string;

  @ApiProperty({
    description: 'Document type id',
    examples: [1, 2, 3, 4, 5],
    default: 1,
  })
  @Min(1)
  @IsNumber()
  @IsNotEmpty()
  @IsDefined()
  documentTypeId: number;

  @ApiProperty({
    description: 'Document is finalized',
    examples: [true, false],
    default: false,
  })
  @IsBoolean()
  @IsNotEmpty()
  @IsDefined()
  isFinalized: boolean;

  @ApiProperty({
    description: 'Initial data of the document',
    examples: [[{ question: 'What is your name?', answer: 'Oleksandr' }]],
    default: [{ question: 'What is your name?', answer: 'Oleksandr' }],
  })
  @IsNotEmpty()
  @IsDefined()
  initialData: JsonValue;

  @ApiProperty({
    description: 'Document creation date and time',
    examples: [new Date('2024-01-03'), new Date('2023-11-02'), new Date('2023-06-30')],
    default: new Date('2024-01-03'),
  })
  @IsDate()
  @MaxDate(new Date())
  @IsNotEmpty()
  @IsDefined()
  createdAt: Date;

  @ApiProperty({
    description: 'Document last updated date and time',
    examples: [new Date('2024-01-03'), new Date('2023-11-02'), new Date('2023-06-30')],
    default: new Date('2024-01-03'),
  })
  @IsDate()
  @MaxDate(new Date())
  @IsNotEmpty()
  @IsDefined()
  updatedAt: Date;

  @ApiProperty({ description: 'Document stage nested object' })
  stage?: StageEntity | null;

  @ApiProperty({ description: 'Document type nested object' })
  documentType?: DocumentTypeEntity | null;

  @ApiProperty({ description: 'The list of users in document' })
  usersToDocuments?: UserToDocumentEntity[];
}
