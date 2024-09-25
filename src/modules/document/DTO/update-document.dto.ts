import { ApiProperty } from '@nestjs/swagger';
import { JsonValue } from '@prisma/client/runtime/library';
import { IsBoolean, IsNumber, IsUUID, Min, ValidateIf } from 'class-validator';
import { DocumentEntity } from 'src/modules/document/entities/document.entity';

export class UpdateDocumentDto
  implements
    Pick<Partial<DocumentEntity>, 'stageId' | 'documentTypeId' | 'isFinalized' | 'initialData'>
{
  @ApiProperty({
    description: 'The UUID of the stage of the document',
    examples: ['b7af9cd4-5533-4737-862b-78bce985c987', '989d32c2-abd4-43d3-a420-ee175ae16b98'],
    default: 'b7af9cd4-5533-4737-862b-78bce985c987',
  })
  @IsUUID()
  @ValidateIf((_, value) => value)
  stageId?: string;

  @ApiProperty({
    description: 'Document type id',
    examples: [1, 2, 3, 4, 5],
    default: 1,
  })
  @Min(1)
  @IsNumber()
  @ValidateIf((_, value) => value)
  documentTypeId?: number;

  @ApiProperty({
    description: 'Document is finalized',
    examples: [true, false],
    default: false,
  })
  @IsBoolean()
  isFinalized?: boolean;

  @ApiProperty({
    description: 'Initial data of the document',
    examples: [[{ question: 'What is your name?', answer: 'Oleksandr' }]],
    default: [{ question: 'What is your name?', answer: 'Oleksandr' }],
  })
  @ValidateIf((_, value) => value)
  initialData?: JsonValue;
}
