import { ApiProperty } from '@nestjs/swagger';
import { ParagraphEdition } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { Transform } from 'class-transformer';
import {
  IsDate,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  Max,
  MaxDate,
  Min,
} from 'class-validator';
import { ParagraphEditionCommentEntity } from 'src/modules/paragraph-edition-comment/entities/paragraph-edition-comment.entity';
import { ParagraphEntity } from 'src/modules/paragraph/entities/paragraph.entity';

export class ParagraphEditionEntity implements ParagraphEdition {
  @ApiProperty({
    description: 'The UUID of the paragraph edition',
    examples: ['b7af9cd4-5533-4737-862b-78bce985c987', '989d32c2-abd4-43d3-a420-ee175ae16b98'],
    default: '989d32c2-abd4-43d3-a420-ee175ae16b98',
  })
  @IsUUID()
  @IsNotEmpty()
  @IsDefined()
  id: string;

  @ApiProperty({
    description: 'The UUID of the paragraph of the paragraph edition',
    examples: ['b7af9cd4-5533-4737-862b-78bce985c987', '989d32c2-abd4-43d3-a420-ee175ae16b98'],
    default: 'b7af9cd4-5533-4737-862b-78bce985c987',
  })
  @IsUUID()
  @IsNotEmpty()
  @IsDefined()
  paragraphId: string;

  @ApiProperty({ description: 'Paragraph edition rating' })
  @IsNumber()
  @Min(0)
  @Max(10)
  @IsDefined()
  @Transform(field => parseFloat(Number(field.value).toFixed(9)))
  rating: Decimal;

  @ApiProperty({ description: 'Paragraph edition content' })
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  content: string;

  @ApiProperty({
    description: 'Paragraph edition creation date and time',
    examples: [new Date('2024-01-03'), new Date('2023-11-02'), new Date('2023-06-30')],
    default: new Date('2024-01-03'),
  })
  @IsDate()
  @MaxDate(new Date())
  @IsNotEmpty()
  @IsDefined()
  createdAt: Date;

  @ApiProperty({
    description: 'Paragraph edition last updated date and time',
    examples: [new Date('2024-01-03'), new Date('2023-11-02'), new Date('2023-06-30')],
    default: new Date('2024-01-03'),
  })
  @IsDate()
  @MaxDate(new Date())
  @IsNotEmpty()
  @IsDefined()
  updatedAt: Date;

  @ApiProperty({ description: 'Paragraph edition paragraph nested object' })
  paragraph?: ParagraphEntity | null;

  @ApiProperty({ description: 'The list of paragraph edition comments for paragraph edition' })
  paragraphEditionComments?: ParagraphEditionCommentEntity[];
}
