import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  Min,
  ValidateIf,
} from 'class-validator';
import { ParagraphEntity } from 'src/modules/paragraph/entities/paragraph.entity';

export class CreateParagraphDto
  implements
    Pick<Required<ParagraphEntity>, 'ordinalId' | 'content'>,
    Pick<Partial<ParagraphEntity>, 'documentId'>
{
  @ApiProperty({
    description: 'The UUID of the document of the paragraph',
    examples: ['b7af9cd4-5533-4737-862b-78bce985c987', '989d32c2-abd4-43d3-a420-ee175ae16b98'],
    default: 'b7af9cd4-5533-4737-862b-78bce985c987',
  })
  @IsUUID()
  @ValidateIf((_, value) => value)
  documentId?: string;

  @ApiProperty({
    description: 'Paragraph ordinal id',
    examples: [1, 2, 3, 4, 5],
    default: 1,
  })
  @Min(1)
  @IsNumber()
  @IsNotEmpty()
  @IsDefined()
  ordinalId: number;

  @ApiProperty({ description: 'Paragraph content' })
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  content: string;
}
